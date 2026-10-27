import { Assignment, ExerciseResult, SubjectId, TeacherAccount, StudentAccount, ClassRecord, UserFeedback } from '../types';
import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  limit,
  onSnapshot
} from 'firebase/firestore';

const STORAGE_KEYS = {
  TEACHERS: 'tinhoc_teachers_v1',
  ASSIGNMENTS: 'tinhoc_assignments_v1',
  RESULTS: 'tinhoc_results_v1',
  STUDENTS: 'tinhoc_students_v1',
  CLASSES: 'tinhoc_classes_v1',
  CURRENT_TEACHER: 'tinhoc_current_teacher_v1',
  CURRENT_STUDENT: 'tinhoc_current_student_v1',
  DELETED_ASSIGNMENT_IDS: 'tinhoc_deleted_assignment_ids_v1',
  DELETED_STUDENT_IDS: 'tinhoc_deleted_student_ids_v1',
  DELETED_CLASS_CODES: 'tinhoc_deleted_class_codes_v1',
  FEEDBACKS: 'tinhoc_feedbacks_v1',
};

export function getDeletedAssignmentIds(): Set<string> {
  try {
    const raw = safeGetItem(STORAGE_KEYS.DELETED_ASSIGNMENT_IDS);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function addDeletedAssignmentId(id: string): void {
  const set = getDeletedAssignmentIds();
  set.add(id);
  safeSetItem(STORAGE_KEYS.DELETED_ASSIGNMENT_IDS, JSON.stringify(Array.from(set)));
}

export function removeDeletedAssignmentId(id: string): void {
  const set = getDeletedAssignmentIds();
  if (set.has(id)) {
    set.delete(id);
    safeSetItem(STORAGE_KEYS.DELETED_ASSIGNMENT_IDS, JSON.stringify(Array.from(set)));
  }
}

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {}
  return null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (e) {}
}

const DEFAULT_ADMIN_ACCOUNT: TeacherAccount = {
  username: 'admin',
  password: 'admin123',
  name: 'Quản trị viên Hệ thống (Admin)',
  role: 'admin',
  school: 'Tiểu học Kết Nối Tri Thức',
  assignedClasses: [],
  createdAt: '2026-01-01T00:00:00.000Z'
};

// Initialize storage, clean legacy items, and execute bidirectional cloud sync
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  // Purge legacy demo assignments & deleted assignments
  try {
    const rawAssignments = safeGetItem(STORAGE_KEYS.ASSIGNMENTS);
    if (rawAssignments) {
      const parsed: Assignment[] = JSON.parse(rawAssignments);
      const deletedIds = getDeletedAssignmentIds();
      deletedIds.add('assign-1792762830495'); // Specifically purge the stale duplicate test assignment
      const filtered = parsed.filter(
        a => a && a.id && a.id !== 'demo-3a' && a.id !== 'demo-4b' && a.id !== 'assign-1792762830495' && !deletedIds.has(a.id)
      );
      if (filtered.length !== parsed.length) {
        safeSetItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(filtered));
        deleteDoc(doc(db, 'assignments', 'demo-3a')).catch(() => {});
        deleteDoc(doc(db, 'assignments', 'demo-4b')).catch(() => {});
        deleteDoc(doc(db, 'assignments', 'assign-1792762830495')).catch(() => {});
      }
    }
  } catch (e) {
    console.warn('Error cleaning demo assignments:', e);
  }

  // Ensure default Admin account exists locally
  const teachers = getTeachers();
  if (!teachers.some(t => t.username.toLowerCase() === 'admin')) {
    saveTeacher(DEFAULT_ADMIN_ACCOUNT);
  }

  // Execute full bidirectional cloud sync (pushes unsynced local data to Cloud & pulls latest Cloud state)
  syncAllWithCloud().catch(err => {
    console.warn('[Sync] Initial sync error:', err);
  });
}


// Assignments
export function getAssignments(): Assignment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = safeGetItem(STORAGE_KEYS.ASSIGNMENTS);
    const parsed: Assignment[] = raw ? JSON.parse(raw) : [];
    const deletedIds = getDeletedAssignmentIds();
    return parsed.filter(a => a && a.id && a.id !== 'demo-3a' && a.id !== 'demo-4b' && !deletedIds.has(a.id));
  } catch (e) {
    console.error('Failed to parse assignments', e);
    return [];
  }
}

export async function fetchAssignmentsFromCloud(): Promise<Assignment[]> {
  const deletedIds = getDeletedAssignmentIds();
  try {
    const colRef = collection(db, 'assignments');
    const snapshot = await getDocs(colRef);
    const cloudAssignments: Assignment[] = [];
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as Assignment;
      const docId = docSnap.id;
      if (docId === 'demo-3a' || docId === 'demo-4b' || (data && (data.id === 'demo-3a' || data.id === 'demo-4b'))) {
        deleteDoc(docSnap.ref).catch(() => {});
        continue;
      }
      if (deletedIds.has(docId) || (data && deletedIds.has(data.id))) {
        deleteDoc(docSnap.ref).catch(() => {});
        continue;
      }
      if (data && data.classCode) {
        cloudAssignments.push(data);
      }
    }

    // De-duplicate per classCode keeping newest
    const classMap = new Map<string, Assignment>();
    cloudAssignments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    cloudAssignments.forEach(a => {
      const key = a.classCode.toUpperCase();
      if (!classMap.has(key)) {
        classMap.set(key, a);
      } else {
        // Stale duplicate assignment for the same class: remove from Firestore
        const oldSafeId = (a.id || '').replace(/[^a-zA-Z0-9_\-]/g, '_');
        if (oldSafeId) {
          deleteDoc(doc(db, 'assignments', oldSafeId)).catch(() => {});
        }
      }
    });

    const uniqueList = Array.from(classMap.values());
    safeSetItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(uniqueList));
    return uniqueList;
  } catch (err) {
    console.warn('[Firestore] fetchAssignmentsFromCloud offline or error:', err);
  }
  return getAssignments();
}

export function saveAssignment(assignment: Assignment): void {
  removeDeletedAssignmentId(assignment.id);
  const safeId = assignment.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
  removeDeletedAssignmentId(safeId);
  const cleanClass = assignment.classCode.trim().toUpperCase();
  removeDeletedAssignmentId(`assign-${cleanClass}`);

  const current = getAssignments();
  // Replace existing assignment for the same id or same classCode so each class has a clear curriculum config
  const index = current.findIndex(
    a => a.id === assignment.id || a.classCode.toUpperCase() === cleanClass
  );
  if (index >= 0) {
    current[index] = assignment;
  } else {
    current.unshift(assignment);
  }
  if (typeof window !== 'undefined') {
    safeSetItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(current));
  }

  // Sync to Cloud
  syncAssignmentToCloud(assignment).catch(e => console.warn('Could not sync assignment to cloud:', e));
}

export async function syncAssignmentToCloud(assignment: Assignment): Promise<void> {
  const deletedIds = getDeletedAssignmentIds();
  if (deletedIds.has(assignment.id)) return;

  try {
    const safeId = assignment.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
    await setDoc(doc(db, 'assignments', safeId), {
      id: assignment.id,
      classCode: assignment.classCode.trim().toUpperCase(),
      pin: assignment.pin || '',
      subjects: assignment.subjects,
      teacherName: assignment.teacherName || '',
      createdAt: assignment.createdAt,
      note: assignment.note || ''
    });
  } catch (err) {
    console.warn('[Firestore] syncAssignmentToCloud error:', err);
  }
}

export async function deleteAssignment(id: string, classCode?: string): Promise<void> {
  const existing = getAssignments();
  const targetObj = existing.find(a => a.id === id);
  const cleanClass = (classCode || targetObj?.classCode || '').trim().toUpperCase();

  addDeletedAssignmentId(id);
  const safeId = id.replace(/[^a-zA-Z0-9_\-]/g, '_');
  addDeletedAssignmentId(safeId);
  if (cleanClass) {
    addDeletedAssignmentId(`assign-${cleanClass}`);
  }

  const current = existing.filter(
    a =>
      a.id !== id &&
      a.id !== safeId &&
      (!cleanClass || a.classCode.trim().toUpperCase() !== cleanClass)
  );
  safeSetItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(current));

  // Delete from Cloud
  try {
    await deleteDoc(doc(db, 'assignments', safeId)).catch(() => {});
    if (id !== safeId) {
      await deleteDoc(doc(db, 'assignments', id)).catch(() => {});
    }
    const qById = query(collection(db, 'assignments'), where('id', '==', id));
    const snapById = await getDocs(qById);
    for (const d of snapById.docs) {
      await deleteDoc(d.ref).catch(() => {});
    }
    if (cleanClass) {
      await deleteDoc(doc(db, 'assignments', `assign-${cleanClass}`)).catch(() => {});
      const qByClass = query(collection(db, 'assignments'), where('classCode', '==', cleanClass));
      const snapByClass = await getDocs(qByClass);
      for (const d of snapByClass.docs) {
        addDeletedAssignmentId(d.id);
        const data = d.data() as Assignment;
        if (data?.id) addDeletedAssignmentId(data.id);
        await deleteDoc(d.ref).catch(() => {});
      }
    }
  } catch (e) {
    console.warn('[Firestore] deleteAssignment error:', e);
  }
}

export function findAssignmentByClass(classCode: string): Assignment | undefined {
  const cleanClass = classCode.trim().toUpperCase();
  const deletedIds = getDeletedAssignmentIds();
  return getAssignments().find(
    a => a.classCode.toUpperCase() === cleanClass && !deletedIds.has(a.id)
  );
}

export async function findAssignmentByClassCloud(classCode: string): Promise<Assignment | undefined> {
  const cleanClass = classCode.trim().toUpperCase();
  const deletedIds = getDeletedAssignmentIds();
  try {
    const colRef = collection(db, 'assignments');
    const q = query(colRef, where('classCode', '==', cleanClass));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const validDocs = snapshot.docs
        .filter(d => {
          const data = d.data() as Assignment;
          return !deletedIds.has(d.id) && (!data?.id || !deletedIds.has(data.id));
        })
        .map(d => d.data() as Assignment)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      if (validDocs.length > 0) {
        const found = validDocs[0];
        saveAssignment(found);
        return found;
      }
    }

    // Cloud responded and has no active assignment for this class -> purge stale local cache for this class
    const remaining = getAssignments().filter(a => a.classCode.toUpperCase() !== cleanClass);
    safeSetItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(remaining));
    return undefined;
  } catch (err) {
    console.warn('[Firestore] findAssignmentByClassCloud error:', err);
    return findAssignmentByClass(cleanClass);
  }
}

export function findAssignmentByPinAndClass(pin: string, classCode: string): Assignment | undefined {
  const list = getAssignments();
  const cleanPin = pin.trim().toUpperCase();
  const cleanClass = classCode.trim().toUpperCase();
  return list.find(
    a => a.pin.toUpperCase() === cleanPin && a.classCode.toUpperCase() === cleanClass
  );
}

export async function findAssignmentByPinAndClassCloud(pin: string, classCode: string): Promise<Assignment | undefined> {
  const localMatch = findAssignmentByPinAndClass(pin, classCode);
  if (localMatch) return localMatch;

  try {
    const cleanPin = pin.trim().toUpperCase();
    const cleanClass = classCode.trim().toUpperCase();
    const colRef = collection(db, 'assignments');
    const q = query(
      colRef,
      where('classCode', '==', cleanClass),
      where('pin', '==', cleanPin),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const found = snapshot.docs[0].data() as Assignment;
      saveAssignment(found);
      return found;
    }
  } catch (err) {
    console.warn('[Firestore] findAssignmentByPinAndClassCloud query failed:', err);
  }
  return undefined;
}

// Random unique PIN generator (6 alphanumeric uppercase chars, readable)
export function generateRandomPin(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let pin = '';
  for (let i = 0; i < 6; i++) {
    pin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pin;
}

// ==========================================
// TEACHERS & ADMIN RBAC MANAGEMENT
// ==========================================

export function getTeachers(): TeacherAccount[] {
  if (typeof window === 'undefined') return [DEFAULT_ADMIN_ACCOUNT];
  try {
    const raw = safeGetItem(STORAGE_KEYS.TEACHERS);
    const parsed: TeacherAccount[] = raw ? JSON.parse(raw) : [];
    if (!parsed.some(t => t.username.toLowerCase() === 'admin')) {
      parsed.unshift(DEFAULT_ADMIN_ACCOUNT);
    }
    return parsed;
  } catch (e) {
    return [DEFAULT_ADMIN_ACCOUNT];
  }
}

export async function fetchTeachersFromCloud(): Promise<TeacherAccount[]> {
  try {
    const colRef = collection(db, 'teachers');
    const snapshot = await getDocs(colRef);
    const cloudTeachers: TeacherAccount[] = [];
    snapshot.forEach(docSnap => {
      cloudTeachers.push(docSnap.data() as TeacherAccount);
    });

    const local = getTeachers();
    const map = new Map<string, TeacherAccount>();
    local.forEach(t => map.set(t.username.toLowerCase(), t));
    cloudTeachers.forEach(t => map.set(t.username.toLowerCase(), t));

    if (!map.has('admin')) {
      map.set('admin', DEFAULT_ADMIN_ACCOUNT);
      syncTeacherToCloud(DEFAULT_ADMIN_ACCOUNT).catch(() => {});
    } else {
      const adm = map.get('admin')!;
      if (!adm.role) adm.role = 'admin';
      if (!adm.password) adm.password = 'admin123';
      map.set('admin', adm);
    }

    const merged = Array.from(map.values());
    safeSetItem(STORAGE_KEYS.TEACHERS, JSON.stringify(merged));
    return merged;
  } catch (err) {
    console.warn('[Firestore] fetchTeachersFromCloud error:', err);
    return getTeachers();
  }
}

export async function saveTeacher(teacher: TeacherAccount): Promise<void> {
  const list = getTeachers();
  const cleanUsername = teacher.username.trim().toLowerCase();
  const normalized: TeacherAccount = {
    ...teacher,
    username: cleanUsername,
    password: teacher.password || '123456',
    role: cleanUsername === 'admin' ? 'admin' : teacher.role || 'teacher',
    school: teacher.school || 'Tiểu học Kết Nối Tri Thức',
    assignedClasses: teacher.assignedClasses || []
  };

  const idx = list.findIndex(t => t.username.toLowerCase() === cleanUsername);
  if (idx >= 0) {
    list[idx] = normalized;
  } else {
    list.push(normalized);
  }
  safeSetItem(STORAGE_KEYS.TEACHERS, JSON.stringify(list));
  await syncTeacherToCloud(normalized);
}

export async function syncTeacherToCloud(teacher: TeacherAccount): Promise<void> {
  try {
    const safeUsername = teacher.username.trim().toLowerCase().replace(/[^a-zA-Z0-9_\-]/g, '_');
    await setDoc(doc(db, 'teachers', safeUsername), {
      username: teacher.username.trim().toLowerCase(),
      password: teacher.password || '123456',
      name: teacher.name.trim(),
      role: teacher.username.trim().toLowerCase() === 'admin' ? 'admin' : teacher.role || 'teacher',
      school: teacher.school || 'Tiểu học Kết Nối Tri Thức',
      assignedClasses: teacher.assignedClasses || [],
      createdAt: teacher.createdAt
    });
  } catch (err) {
    console.warn('[Firestore] syncTeacherToCloud error:', err);
  }
}

export async function deleteTeacher(username: string): Promise<void> {
  const clean = username.trim().toLowerCase();
  if (clean === 'admin') return; // Never delete primary admin

  const remaining = getTeachers().filter(t => t.username.toLowerCase() !== clean);
  safeSetItem(STORAGE_KEYS.TEACHERS, JSON.stringify(remaining));

  try {
    const safeUsername = clean.replace(/[^a-zA-Z0-9_\-]/g, '_');
    await deleteDoc(doc(db, 'teachers', safeUsername));
  } catch (err) {
    console.warn('[Firestore] deleteTeacher error:', err);
  }
}

export async function authenticateTeacherCloud(
  username: string,
  password: string
): Promise<{ account?: TeacherAccount; error?: string }> {
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  const teachers = await fetchTeachersFromCloud();
  const found = teachers.find(t => t.username.toLowerCase() === cleanUser);

  if (!found) {
    return {
      error: `Tài khoản "${cleanUser}" không tồn tại. Vui lòng liên hệ Quản trị viên (Admin) để được cấp tài khoản giáo viên.`
    };
  }

  const expectedPass = found.password || (cleanUser === 'admin' ? 'admin123' : '');
  if (expectedPass !== cleanPass) {
    return {
      error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.'
    };
  }

  return { account: found };
}

// Results & Progress
export function getResults(): ExerciseResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = safeGetItem(STORAGE_KEYS.RESULTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveResult(result: ExerciseResult): Promise<void> {
  const list = getResults();
  const existingIdx = list.findIndex(r => r.id === result.id);
  if (existingIdx >= 0) {
    list[existingIdx] = result;
  } else {
    list.unshift(result);
  }
  // Keep last 500 results locally
  if (typeof window !== 'undefined') {
    safeSetItem(STORAGE_KEYS.RESULTS, JSON.stringify(list.slice(0, 500)));
  }

  // Sync to Cloud Firestore immediately
  try {
    await syncResultToCloud(result);
  } catch (err) {
    console.warn('[Firestore] Failed to sync result to cloud:', err);
  }
}

export async function syncResultToCloud(result: ExerciseResult): Promise<void> {
  try {
    const safeId = (result.id || `res_${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '_');
    await setDoc(doc(db, 'results', safeId), {
      id: result.id,
      studentName: result.studentName.trim(),
      classCode: result.classCode.trim().toUpperCase(),
      pin: (result.pin || '').trim().toUpperCase(),
      subjectId: result.subjectId,
      lessonId: result.lessonId,
      lessonTitle: result.lessonTitle || '',
      score: Math.min(100, Math.max(0, Math.round(result.score))),
      accuracy: Math.min(100, Math.max(0, Math.round(result.accuracy))),
      timeSpentSeconds: Math.max(0, Math.round(result.timeSpentSeconds || 0)),
      completedAt: result.completedAt || new Date().toISOString()
    });
    console.log(`[Firestore] Synced result ${result.id} to cloud.`);
  } catch (err) {
    console.warn('[Firestore] syncResultToCloud error:', err);
  }
}

/**
 * Fetch all results for a given student from Cloud Firestore.
 * This guarantees that when a student sits at a DIFFERENT PC, all their past
 * scores, accuracy, and completed lessons are loaded into the app.
 */
export async function fetchStudentResultsFromCloud(
  studentName: string,
  classCode: string
): Promise<ExerciseResult[]> {
  const cleanName = studentName.trim();
  const cleanClass = classCode.trim().toUpperCase();

  try {
    const colRef = collection(db, 'results');
    const q = query(
      colRef,
      where('classCode', '==', cleanClass)
    );
    const snapshot = await getDocs(q);
    const cloudResults: ExerciseResult[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as ExerciseResult;
      if (data && data.studentName && data.classCode) {
        cloudResults.push(data);
      }
    });

    if (cloudResults.length > 0) {
      // Merge with local results
      const localResults = getResults();
      const map = new Map<string, ExerciseResult>();
      localResults.forEach(r => map.set(r.id, r));
      cloudResults.forEach(r => map.set(r.id, r));
      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      safeSetItem(STORAGE_KEYS.RESULTS, JSON.stringify(merged.slice(0, 500)));

      const normTarget = cleanName.normalize('NFC').toLowerCase();
      return merged.filter(
        r =>
          r.classCode.trim().toUpperCase() === cleanClass &&
          r.studentName.trim().normalize('NFC').toLowerCase() === normTarget
      );
    }
  } catch (err) {
    console.warn('[Firestore] fetchStudentResultsFromCloud error:', err);
  }

  // Fallback to local
  const normTarget = cleanName.normalize('NFC').toLowerCase();
  return getResults().filter(
    r =>
      r.classCode.trim().toUpperCase() === cleanClass &&
      r.studentName.trim().normalize('NFC').toLowerCase() === normTarget
  );
}

/**
 * Fetch all results for a specific class code or all classes (for Teacher dashboard across all PCs).
 */
export async function fetchAllResultsFromCloud(classCode?: string): Promise<ExerciseResult[]> {
  const cleanClass = classCode && classCode.toUpperCase() !== 'ALL' ? classCode.trim().toUpperCase() : undefined;

  try {
    const colRef = collection(db, 'results');
    const q = cleanClass
      ? query(colRef, where('classCode', '==', cleanClass))
      : query(colRef);

    const snapshot = await getDocs(q);
    const cloudResults: ExerciseResult[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as ExerciseResult;
      if (data && data.studentName && data.classCode) {
        cloudResults.push(data);
      }
    });

    const localResults = getResults();
    const map = new Map<string, ExerciseResult>();
    localResults.forEach(r => map.set(r.id, r));
    cloudResults.forEach(r => map.set(r.id, r));
    const merged = Array.from(map.values()).sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    safeSetItem(STORAGE_KEYS.RESULTS, JSON.stringify(merged.slice(0, 500)));

    return cleanClass
      ? merged.filter(r => r.classCode.trim().toUpperCase() === cleanClass)
      : merged;
  } catch (err) {
    console.warn('[Firestore] fetchAllResultsFromCloud error:', err);
    const local = getResults();
    return cleanClass
      ? local.filter(r => r.classCode.trim().toUpperCase() === cleanClass)
      : local;
  }
}

export async function fetchClassResultsFromCloud(classCode: string): Promise<ExerciseResult[]> {
  return fetchAllResultsFromCloud(classCode);
}

/**
 * Subscribe to real-time updates for results from Cloud Firestore.
 * Automatically updates when any student submits an exercise from any device.
 */
export function subscribeToResults(
  callback: (results: ExerciseResult[]) => void,
  classCode?: string
): () => void {
  const cleanClass = classCode && classCode.toUpperCase() !== 'ALL' ? classCode.trim().toUpperCase() : undefined;

  try {
    const colRef = collection(db, 'results');
    const q = cleanClass
      ? query(colRef, where('classCode', '==', cleanClass))
      : query(colRef);

    const unsubscribe = onSnapshot(
      q,
      snapshot => {
        const cloudResults: ExerciseResult[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as ExerciseResult;
          if (data && data.studentName && data.classCode) {
            cloudResults.push(data);
          }
        });

        const localResults = getResults();
        const map = new Map<string, ExerciseResult>();
        localResults.forEach(r => map.set(r.id, r));
        cloudResults.forEach(r => map.set(r.id, r));
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        );
        safeSetItem(STORAGE_KEYS.RESULTS, JSON.stringify(merged.slice(0, 500)));
        callback(cleanClass ? merged.filter(r => r.classCode.trim().toUpperCase() === cleanClass) : merged);
      },
      err => {
        console.warn('[Firestore] subscribeToResults snapshot error:', err);
      }
    );
    return unsubscribe;
  } catch (err) {
    console.warn('[Firestore] subscribeToResults setup error:', err);
    return () => {};
  }
}

// ==========================================
// STUDENT ROSTER MANAGEMENT (CRUD & CLOUD)
// ==========================================

export function getStudents(): StudentAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = safeGetItem(STORAGE_KEYS.STUDENTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getStudentsByClass(classCode: string): StudentAccount[] {
  const clean = classCode.trim().toUpperCase();
  return getStudents().filter(s => s.classCode.toUpperCase() === clean);
}

export async function fetchStudentsFromCloud(classCode?: string): Promise<StudentAccount[]> {
  try {
    const colRef = collection(db, 'students');
    const q = classCode
      ? query(colRef, where('classCode', '==', classCode.trim().toUpperCase()))
      : query(colRef);

    const snapshot = await getDocs(q);
    const cloudStudents: StudentAccount[] = [];
    snapshot.forEach(docSnap => {
      cloudStudents.push(docSnap.data() as StudentAccount);
    });

    if (cloudStudents.length > 0) {
      const local = getStudents();
      const map = new Map<string, StudentAccount>();
      local.forEach(s => map.set(s.id, s));
      cloudStudents.forEach(s => map.set(s.id, s));
      const merged = Array.from(map.values());
      safeSetItem(STORAGE_KEYS.STUDENTS, JSON.stringify(merged));
      return classCode
        ? merged.filter(s => s.classCode.toUpperCase() === classCode.trim().toUpperCase())
        : merged;
    }
  } catch (err) {
    console.warn('[Firestore] fetchStudentsFromCloud error:', err);
  }
  return classCode ? getStudentsByClass(classCode) : getStudents();
}

export async function saveStudent(student: StudentAccount): Promise<void> {
  const current = getStudents();
  const idx = current.findIndex(s => s.id === student.id);
  if (idx >= 0) {
    current[idx] = student;
  } else {
    current.push(student);
  }
  safeSetItem(STORAGE_KEYS.STUDENTS, JSON.stringify(current));

  // Sync to Cloud Firestore
  try {
    const safeId = student.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
    await setDoc(doc(db, 'students', safeId), {
      id: student.id,
      studentName: student.studentName.trim(),
      classCode: student.classCode.trim().toUpperCase(),
      studentCode: student.studentCode || '',
      gender: student.gender || 'Khác',
      pin: student.pin || '',
      createdAt: student.createdAt,
      note: student.note || ''
    });
  } catch (err) {
    console.warn('[Firestore] saveStudent cloud error:', err);
  }
}

export async function saveStudentsBatch(students: StudentAccount[]): Promise<void> {
  const current = getStudents();
  const map = new Map<string, StudentAccount>();
  current.forEach(s => map.set(s.id, s));
  students.forEach(s => map.set(s.id, s));
  const merged = Array.from(map.values());
  safeSetItem(STORAGE_KEYS.STUDENTS, JSON.stringify(merged));

  // Sync batch to cloud
  for (const s of students) {
    try {
      const safeId = s.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
      await setDoc(doc(db, 'students', safeId), {
        id: s.id,
        studentName: s.studentName.trim(),
        classCode: s.classCode.trim().toUpperCase(),
        studentCode: s.studentCode || '',
        gender: s.gender || 'Khác',
        pin: s.pin || '',
        createdAt: s.createdAt,
        note: s.note || ''
      });
    } catch (e) {
      console.warn('[Firestore] saveStudentsBatch error:', e);
    }
  }
}

export async function deleteStudent(id: string): Promise<void> {
  const current = getStudents().filter(s => s.id !== id);
  safeSetItem(STORAGE_KEYS.STUDENTS, JSON.stringify(current));

  try {
    const safeId = id.replace(/[^a-zA-Z0-9_\-]/g, '_');
    await deleteDoc(doc(db, 'students', safeId));
  } catch (err) {
    console.warn('[Firestore] deleteStudent error:', err);
  }
}

export async function deleteStudentsByClass(classCode: string): Promise<void> {
  const clean = classCode.trim().toUpperCase();
  const toDelete = getStudents().filter(s => s.classCode.toUpperCase() === clean);
  const remaining = getStudents().filter(s => s.classCode.toUpperCase() !== clean);
  safeSetItem(STORAGE_KEYS.STUDENTS, JSON.stringify(remaining));

  for (const s of toDelete) {
    try {
      const safeId = s.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
      await deleteDoc(doc(db, 'students', safeId));
    } catch (e) {}
  }
}

export function findStudentInClass(classCode: string, studentName: string): StudentAccount | undefined {
  const cleanClass = classCode.trim().toUpperCase();
  const cleanName = studentName.trim().toLowerCase();
  return getStudents().find(
    s => s.classCode.toUpperCase() === cleanClass && s.studentName.trim().toLowerCase() === cleanName
  );
}

/**
 * Authenticate a student using their personal account & single personal PIN.
 */
export async function authenticateStudentCloud(
  classCode: string,
  studentNameOrCode: string,
  pin: string
): Promise<{ student?: StudentAccount; error?: string }> {
  const cleanClass = classCode.trim().toUpperCase();
  const cleanInput = studentNameOrCode.trim().toLowerCase();
  const cleanPin = pin.trim().toUpperCase();

  const classRoster = await fetchStudentsFromCloud(cleanClass);

  if (classRoster.length === 0) {
    return {
      error: `Lớp ${cleanClass} hiện chưa có danh sách tài khoản học sinh. Em hãy nhờ thầy/cô tạo tài khoản học sinh cho lớp ${cleanClass} nhé!`
    };
  }

  const matched = classRoster.find(
    s =>
      s.studentName.trim().toLowerCase() === cleanInput ||
      (s.studentCode && s.studentCode.trim().toLowerCase() === cleanInput)
  );

  if (!matched) {
    return {
      error: `Không tìm thấy tài khoản học sinh "${studentNameOrCode}" trong danh sách Lớp ${cleanClass}. Em hãy chọn đúng tên của mình nhé!`
    };
  }

  if ((matched.pin || '').trim().toUpperCase() !== cleanPin) {
    return {
      error: `Mã PIN đăng nhập của em "${matched.studentName}" chưa chính xác. Em hãy kiểm tra lại Mã PIN cá nhân do thầy/cô cấp nhé!`
    };
  }

  return { student: matched };
}

// ==========================================
// CLASSES MANAGEMENT (CLOUD & LOCAL)
// ==========================================

export function getClasses(): ClassRecord[] {
  if (typeof window === 'undefined') return [{ id: '3A', classCode: '3A', name: 'Lớp 3A' }];
  try {
    const raw = safeGetItem(STORAGE_KEYS.CLASSES);
    const parsed: ClassRecord[] = raw ? JSON.parse(raw) : [];
    // Also derive from students and assignments so any existing class is never lost
    const set = new Map<string, ClassRecord>();
    parsed.forEach(c => set.set(c.classCode.toUpperCase(), c));
    getStudents().forEach(s => {
      const code = (s.classCode || '').trim().toUpperCase();
      if (code && !set.has(code)) {
        set.set(code, { id: code, classCode: code, name: `Lớp ${code}` });
      }
    });
    getAssignments().forEach(a => {
      const code = (a.classCode || '').trim().toUpperCase();
      if (code && !set.has(code)) {
        set.set(code, { id: code, classCode: code, name: `Lớp ${code}` });
      }
    });
    if (set.size === 0) {
      set.set('3A', { id: '3A', classCode: '3A', name: 'Lớp 3A' });
    }
    const list = Array.from(set.values()).sort((a, b) => a.classCode.localeCompare(b.classCode));
    return list;
  } catch (e) {
    return [{ id: '3A', classCode: '3A', name: 'Lớp 3A' }];
  }
}

export async function fetchClassesFromCloud(): Promise<ClassRecord[]> {
  try {
    const colRef = collection(db, 'classes');
    const snapshot = await getDocs(colRef);
    const cloudClasses: ClassRecord[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as ClassRecord;
      if (data && data.classCode) {
        cloudClasses.push(data);
      }
    });

    const local = getClasses();
    const map = new Map<string, ClassRecord>();
    local.forEach(c => map.set(c.classCode.toUpperCase(), c));
    cloudClasses.forEach(c => map.set(c.classCode.toUpperCase(), c));
    const merged = Array.from(map.values()).sort((a, b) => a.classCode.localeCompare(b.classCode));

    if (typeof window !== 'undefined') {
      safeSetItem(STORAGE_KEYS.CLASSES, JSON.stringify(merged));
    }
    return merged;
  } catch (err) {
    console.warn('[Firestore] fetchClassesFromCloud error:', err);
    return getClasses();
  }
}

export async function saveClass(classCode: string, name?: string, teacherName?: string): Promise<void> {
  const clean = classCode.trim().toUpperCase();
  if (!clean) return;

  const current = getClasses();
  const existingIdx = current.findIndex(c => c.classCode.toUpperCase() === clean);
  const record: ClassRecord = {
    id: clean,
    classCode: clean,
    name: name?.trim() || `Lớp ${clean}`,
    teacherName: teacherName || '',
    createdAt: new Date().toISOString()
  };

  if (existingIdx >= 0) {
    current[existingIdx] = { ...current[existingIdx], ...record };
  } else {
    current.push(record);
  }
  if (typeof window !== 'undefined') {
    safeSetItem(STORAGE_KEYS.CLASSES, JSON.stringify(current));
  }

  try {
    await setDoc(doc(db, 'classes', clean), {
      id: clean,
      classCode: clean,
      name: record.name,
      teacherName: record.teacherName,
      createdAt: record.createdAt
    });
    console.log(`[Firestore] Synced class ${clean} to cloud.`);
  } catch (err) {
    console.warn('[Firestore] saveClass error:', err);
  }
}

export async function deleteClass(classCode: string): Promise<void> {
  const clean = classCode.trim().toUpperCase();
  const remaining = getClasses().filter(c => c.classCode.toUpperCase() !== clean);
  if (typeof window !== 'undefined') {
    safeSetItem(STORAGE_KEYS.CLASSES, JSON.stringify(remaining));
  }
  try {
    await deleteDoc(doc(db, 'classes', clean));
  } catch (err) {
    console.warn('[Firestore] deleteClass error:', err);
  }
}

export function subscribeToClasses(callback: (classes: ClassRecord[]) => void): () => void {
  try {
    const colRef = collection(db, 'classes');
    return onSnapshot(
      colRef,
      snapshot => {
        const cloud: ClassRecord[] = [];
        snapshot.forEach(docSnap => {
          const d = docSnap.data() as ClassRecord;
          if (d && d.classCode) cloud.push(d);
        });
        const local = getClasses();
        const map = new Map<string, ClassRecord>();
        local.forEach(c => map.set(c.classCode.toUpperCase(), c));
        cloud.forEach(c => map.set(c.classCode.toUpperCase(), c));
        const merged = Array.from(map.values()).sort((a, b) => a.classCode.localeCompare(b.classCode));
        if (typeof window !== 'undefined') {
          safeSetItem(STORAGE_KEYS.CLASSES, JSON.stringify(merged));
        }
        callback(merged);
      },
      err => console.warn('[Firestore] subscribeToClasses error:', err)
    );
  } catch (e) {
    console.warn('[Firestore] subscribeToClasses setup error:', e);
    return () => {};
  }
}

export function subscribeToStudents(callback: (students: StudentAccount[]) => void, classCode?: string): () => void {
  try {
    const cleanClass = classCode && classCode.toUpperCase() !== 'ALL' ? classCode.trim().toUpperCase() : undefined;
    const colRef = collection(db, 'students');
    const q = cleanClass ? query(colRef, where('classCode', '==', cleanClass)) : query(colRef);
    return onSnapshot(
      q,
      snapshot => {
        const cloudStudents: StudentAccount[] = [];
        snapshot.forEach(docSnap => {
          const d = docSnap.data() as StudentAccount;
          if (d && d.id) cloudStudents.push(d);
        });
        const local = getStudents();
        const map = new Map<string, StudentAccount>();
        local.forEach(s => map.set(s.id, s));
        cloudStudents.forEach(s => map.set(s.id, s));
        const merged = Array.from(map.values());
        if (typeof window !== 'undefined') {
          safeSetItem(STORAGE_KEYS.STUDENTS, JSON.stringify(merged));
        }
        callback(cleanClass ? merged.filter(s => s.classCode.toUpperCase() === cleanClass) : merged);
      },
      err => console.warn('[Firestore] subscribeToStudents error:', err)
    );
  } catch (e) {
    console.warn('[Firestore] subscribeToStudents setup error:', e);
    return () => {};
  }
}

export function subscribeToAssignments(callback: (assignments: Assignment[]) => void): () => void {
  try {
    const colRef = collection(db, 'assignments');
    return onSnapshot(
      colRef,
      snapshot => {
        const deletedIds = getDeletedAssignmentIds();
        const cloud: Assignment[] = [];
        snapshot.forEach(docSnap => {
          const d = docSnap.data() as Assignment;
          const docId = docSnap.id;
          if (docId === 'demo-3a' || docId === 'demo-4b' || (d && (d.id === 'demo-3a' || d.id === 'demo-4b'))) {
            deleteDoc(docSnap.ref).catch(() => {});
            return;
          }
          if (deletedIds.has(docId) || (d && deletedIds.has(d.id))) {
            deleteDoc(docSnap.ref).catch(() => {});
            return;
          }
          if (d && d.id && d.classCode) cloud.push(d);
        });

        // De-duplicate assignments per classCode (keep newest)
        const classMap = new Map<string, Assignment>();
        cloud.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        cloud.forEach(a => {
          const key = a.classCode.toUpperCase();
          if (!classMap.has(key)) {
            classMap.set(key, a);
          } else {
            // Delete duplicate older assignments from cloud
            const oldSafeId = (a.id || '').replace(/[^a-zA-Z0-9_\-]/g, '_');
            if (oldSafeId) {
              deleteDoc(doc(db, 'assignments', oldSafeId)).catch(() => {});
            }
          }
        });

        const merged = Array.from(classMap.values());
        if (typeof window !== 'undefined') {
          safeSetItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(merged));
        }
        callback(merged);
      },
      err => console.warn('[Firestore] subscribeToAssignments error:', err)
    );
  } catch (e) {
    console.warn('[Firestore] subscribeToAssignments setup error:', e);
    return () => {};
  }
}

export function subscribeToTeachers(callback: (teachers: TeacherAccount[]) => void): () => void {
  try {
    const colRef = collection(db, 'teachers');
    return onSnapshot(
      colRef,
      snapshot => {
        const cloud: TeacherAccount[] = [];
        snapshot.forEach(docSnap => {
          const d = docSnap.data() as TeacherAccount;
          if (d && d.username) cloud.push(d);
        });
        const local = getTeachers();
        const map = new Map<string, TeacherAccount>();
        local.forEach(t => map.set(t.username.toLowerCase(), t));
        cloud.forEach(t => map.set(t.username.toLowerCase(), t));
        if (!map.has('admin')) map.set('admin', DEFAULT_ADMIN_ACCOUNT);
        const merged = Array.from(map.values());
        if (typeof window !== 'undefined') {
          safeSetItem(STORAGE_KEYS.TEACHERS, JSON.stringify(merged));
        }
        callback(merged);
      },
      err => console.warn('[Firestore] subscribeToTeachers error:', err)
    );
  } catch (e) {
    console.warn('[Firestore] subscribeToTeachers setup error:', e);
    return () => {};
  }
}

/**
 * Complete bidirectional cloud synchronization:
 * 1. Pushes any local results, students, assignments, classes, and teachers not yet on Cloud up to Firestore.
 * 2. Fetches all latest data from Cloud and merges with local cache.
 * 3. Ensures 100% parity between Google AI Studio dev preview and the shared link on any device.
 */
export async function syncAllWithCloud(): Promise<{
  resultsCount: number;
  studentsCount: number;
  classesCount: number;
  assignmentsCount: number;
  teachersCount: number;
  feedbacksCount?: number;
}> {
  try {
    // 1. Fetch Cloud collections
    const [cloudResSnap, cloudStuSnap, cloudAssignSnap, cloudClassSnap, cloudTeacherSnap] =
      await Promise.all([
        getDocs(collection(db, 'results')),
        getDocs(collection(db, 'students')),
        getDocs(collection(db, 'assignments')),
        getDocs(collection(db, 'classes')),
        getDocs(collection(db, 'teachers'))
      ]);

    const cloudResIds = new Set<string>();
    cloudResSnap.forEach(d => cloudResIds.add(d.id));

    const cloudStuIds = new Set<string>();
    cloudStuSnap.forEach(d => cloudStuIds.add(d.id));

    const cloudAssignIds = new Set<string>();
    cloudAssignSnap.forEach(d => cloudAssignIds.add(d.id));

    const cloudClassCodes = new Set<string>();
    cloudClassSnap.forEach(d => {
      const dData = d.data() as ClassRecord;
      if (dData && dData.classCode) cloudClassCodes.add(dData.classCode.toUpperCase());
    });

    // Clean any deleted assignments that still exist in Cloud
    const deletedAssignIds = getDeletedAssignmentIds();
    for (const d of cloudAssignSnap.docs) {
      const dData = d.data() as Assignment;
      if (deletedAssignIds.has(d.id) || (dData && deletedAssignIds.has(dData.id))) {
        await deleteDoc(d.ref).catch(() => {});
      }
    }

    // 2. Push any unsynced local results to Cloud
    const localResults = getResults();
    for (const r of localResults) {
      const safeId = (r.id || `res_${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '_');
      if (!cloudResIds.has(safeId)) {
        await syncResultToCloud(r);
      }
    }

    // 3. Push any unsynced local students to Cloud
    const localStudents = getStudents();
    for (const s of localStudents) {
      const safeId = s.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
      if (!cloudStuIds.has(safeId)) {
        await saveStudent(s);
      }
    }

    // 4. Cloud assignments are authoritative (saveAssignment pushes immediately when created).
    // Do NOT re-push local assignments that are absent in Cloud, otherwise deleted assignments in another browser would be resurrected.

    // 5. Push any unsynced local classes to Cloud
    const localClasses = getClasses();
    for (const c of localClasses) {
      if (!cloudClassCodes.has(c.classCode.toUpperCase())) {
        await saveClass(c.classCode, c.name, c.teacherName);
      }
    }

    // 6. Now pull all latest data down to refresh local cache
    const [finalTeachers, finalAssignments, finalStudents, finalClasses, finalResults, finalFeedbacks] =
      await Promise.all([
        fetchTeachersFromCloud(),
        fetchAssignmentsFromCloud(),
        fetchStudentsFromCloud(),
        fetchClassesFromCloud(),
        fetchAllResultsFromCloud(),
        fetchFeedbacksFromCloud()
      ]);

    return {
      resultsCount: finalResults.length,
      studentsCount: finalStudents.length,
      classesCount: finalClasses.length,
      assignmentsCount: finalAssignments.length,
      teachersCount: finalTeachers.length,
      feedbacksCount: finalFeedbacks.length
    };
  } catch (err) {
    console.warn('[Sync] syncAllWithCloud error:', err);
    return {
      resultsCount: getResults().length,
      studentsCount: getStudents().length,
      classesCount: getClasses().length,
      assignmentsCount: getAssignments().length,
      teachersCount: getTeachers().length,
      feedbacksCount: getFeedbacks().length
    };
  }
}

// ==========================================
// FEEDBACKS CRUD & REAL-TIME FIRESTORE SYNC
// ==========================================

export function getFeedbacks(): UserFeedback[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = safeGetItem(STORAGE_KEYS.FEEDBACKS);
    if (!raw) return [];
    const list: UserFeedback[] = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.error('Failed to parse feedbacks from local storage:', e);
    return [];
  }
}

export async function fetchFeedbacksFromCloud(): Promise<UserFeedback[]> {
  try {
    const colRef = collection(db, 'feedbacks');
    const snapshot = await getDocs(colRef);
    const cloudFeedbacks: UserFeedback[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as UserFeedback;
      if (data && data.id) {
        cloudFeedbacks.push(data);
      }
    });

    // Sort descending by createdAt
    cloudFeedbacks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Merge with local storage
    if (typeof window !== 'undefined') {
      const local = getFeedbacks();
      const map = new Map<string, UserFeedback>();
      local.forEach(f => map.set(f.id, f));
      cloudFeedbacks.forEach(f => map.set(f.id, f));
      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      safeSetItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(merged));
      return merged;
    }

    return cloudFeedbacks;
  } catch (e) {
    console.warn('[Firestore] fetchFeedbacksFromCloud error:', e);
    return getFeedbacks();
  }
}

export async function saveFeedback(feedback: UserFeedback): Promise<void> {
  const safeId = (feedback.id || `fb_${Date.now()}`).replace(/[^a-zA-Z0-9_\-]/g, '_');
  const normalizedFeedback: UserFeedback = {
    ...feedback,
    id: safeId,
    status: feedback.status || 'pending',
    createdAt: feedback.createdAt || new Date().toISOString()
  };

  // 1. Optimistic save to Local Storage immediately
  const local = getFeedbacks();
  const filtered = local.filter(f => f.id !== safeId);
  const updated = [normalizedFeedback, ...filtered];
  safeSetItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(updated));

  // 2. Push to Firestore
  try {
    const docRef = doc(db, 'feedbacks', safeId);
    await setDoc(docRef, normalizedFeedback);
  } catch (err) {
    console.warn('[Firestore] Error saving feedback to cloud:', err);
  }
}

export async function updateFeedback(id: string, updates: Partial<UserFeedback>): Promise<void> {
  const safeId = id.replace(/[^a-zA-Z0-9_\-]/g, '_');
  const local = getFeedbacks();
  const existing = local.find(f => f.id === safeId);
  if (!existing) return;

  const updatedFeedback: UserFeedback = {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  // 1. Local storage update
  const newLocal = local.map(f => (f.id === safeId ? updatedFeedback : f));
  safeSetItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(newLocal));

  // 2. Cloud update
  try {
    const docRef = doc(db, 'feedbacks', safeId);
    await setDoc(docRef, updatedFeedback, { merge: true });
  } catch (err) {
    console.warn('[Firestore] updateFeedback cloud error:', err);
  }
}

export async function deleteFeedback(id: string): Promise<void> {
  const safeId = id.replace(/[^a-zA-Z0-9_\-]/g, '_');

  // 1. Remove from local storage
  const local = getFeedbacks();
  const filtered = local.filter(f => f.id !== safeId);
  safeSetItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(filtered));

  // 2. Remove from Firestore
  try {
    const docRef = doc(db, 'feedbacks', safeId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('[Firestore] deleteFeedback cloud error:', err);
  }
}

export function subscribeToFeedbacks(callback: (feedbacks: UserFeedback[]) => void): () => void {
  try {
    const colRef = collection(db, 'feedbacks');
    return onSnapshot(
      colRef,
      snapshot => {
        const cloudFeedbacks: UserFeedback[] = [];
        snapshot.forEach(docSnap => {
          const d = docSnap.data() as UserFeedback;
          if (d && d.id) cloudFeedbacks.push(d);
        });

        // Merge with local items in case of offline writes
        const local = getFeedbacks();
        const map = new Map<string, UserFeedback>();
        local.forEach(f => map.set(f.id, f));
        cloudFeedbacks.forEach(f => map.set(f.id, f));
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        if (typeof window !== 'undefined') {
          safeSetItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(merged));
        }

        callback(merged);
      },
      err => console.warn('[Firestore] subscribeToFeedbacks error:', err)
    );
  } catch (e) {
    console.warn('[Firestore] subscribeToFeedbacks setup error:', e);
    return () => {};
  }
}



