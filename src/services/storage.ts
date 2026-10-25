import { Assignment, ExerciseResult, SubjectId, TeacherAccount, StudentAccount } from '../types';
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
  serverTimestamp
} from 'firebase/firestore';

const STORAGE_KEYS = {
  TEACHERS: 'tinhoc_teachers_v1',
  ASSIGNMENTS: 'tinhoc_assignments_v1',
  RESULTS: 'tinhoc_results_v1',
  STUDENTS: 'tinhoc_students_v1',
  CURRENT_TEACHER: 'tinhoc_current_teacher_v1',
  CURRENT_STUDENT: 'tinhoc_current_student_v1',
};

const DEFAULT_ADMIN_ACCOUNT: TeacherAccount = {
  username: 'admin',
  password: 'admin123',
  name: 'Quản trị viên Hệ thống (Admin)',
  role: 'admin',
  school: 'Tiểu học Kết Nối Tri Thức',
  assignedClasses: [],
  createdAt: '2026-01-01T00:00:00.000Z'
};

// Initialize storage and clean up any legacy example/demo assignments
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  // Purge legacy demo-3a and demo-4b if they exist from earlier sessions
  try {
    const rawAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    if (rawAssignments) {
      const parsed: Assignment[] = JSON.parse(rawAssignments);
      const filtered = parsed.filter(a => a.id !== 'demo-3a' && a.id !== 'demo-4b');
      if (filtered.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(filtered));
        deleteDoc(doc(db, 'assignments', 'demo-3a')).catch(() => {});
        deleteDoc(doc(db, 'assignments', 'demo-4b')).catch(() => {});
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

  // Pre-fetch real teachers, assignments, and students from Cloud Firestore
  fetchTeachersFromCloud().catch(() => {});
  fetchAssignmentsFromCloud().catch(() => {});
  fetchStudentsFromCloud().catch(() => {});
}


// Assignments
export function getAssignments(): Assignment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse assignments', e);
    return [];
  }
}

export async function fetchAssignmentsFromCloud(): Promise<Assignment[]> {
  try {
    const colRef = collection(db, 'assignments');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const cloudAssignments: Assignment[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Assignment;
        if (data.id === 'demo-3a' || data.id === 'demo-4b') {
          deleteDoc(doc(db, 'assignments', docSnap.id)).catch(() => {});
        } else {
          cloudAssignments.push(data);
        }
      });

      // Merge with local assignments without losing newer ones
      const local = getAssignments().filter(a => a.id !== 'demo-3a' && a.id !== 'demo-4b');
      const mergedMap = new Map<string, Assignment>();
      local.forEach(a => mergedMap.set(a.id, a));
      cloudAssignments.forEach(a => mergedMap.set(a.id, a));
      const merged = Array.from(mergedMap.values());
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.warn('[Firestore] fetchAssignmentsFromCloud offline or error:', err);
  }
  return getAssignments();
}

export function saveAssignment(assignment: Assignment): void {
  const current = getAssignments();
  // Replace existing assignment for the same id or same classCode so each class has a clear curriculum config
  const index = current.findIndex(
    a => a.id === assignment.id || a.classCode.toUpperCase() === assignment.classCode.toUpperCase()
  );
  if (index >= 0) {
    current[index] = assignment;
  } else {
    current.unshift(assignment);
  }
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(current));

  // Sync to Cloud
  syncAssignmentToCloud(assignment).catch(e => console.warn('Could not sync assignment to cloud:', e));
}

export async function syncAssignmentToCloud(assignment: Assignment): Promise<void> {
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

export function deleteAssignment(id: string): void {
  const current = getAssignments().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(current));

  // Delete from Cloud
  try {
    const safeId = id.replace(/[^a-zA-Z0-9_\-]/g, '_');
    deleteDoc(doc(db, 'assignments', safeId)).catch(() => {});
  } catch (e) {
    console.warn('[Firestore] deleteAssignment error:', e);
  }
}

export function findAssignmentByClass(classCode: string): Assignment | undefined {
  const cleanClass = classCode.trim().toUpperCase();
  return getAssignments().find(a => a.classCode.toUpperCase() === cleanClass);
}

export async function findAssignmentByClassCloud(classCode: string): Promise<Assignment | undefined> {
  const cleanClass = classCode.trim().toUpperCase();
  try {
    const colRef = collection(db, 'assignments');
    const q = query(colRef, where('classCode', '==', cleanClass), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const found = snapshot.docs[0].data() as Assignment;
      saveAssignment(found);
      return found;
    }
  } catch (err) {
    console.warn('[Firestore] findAssignmentByClassCloud error:', err);
  }
  return findAssignmentByClass(cleanClass);
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
    const raw = localStorage.getItem(STORAGE_KEYS.TEACHERS);
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
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(merged));
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
  localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(list));
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
  localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(remaining));

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
    const raw = localStorage.getItem(STORAGE_KEYS.RESULTS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveResult(result: ExerciseResult): void {
  const list = getResults();
  const existingIdx = list.findIndex(r => r.id === result.id);
  if (existingIdx >= 0) {
    list[existingIdx] = result;
  } else {
    list.unshift(result);
  }
  // Keep last 300 results locally
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(list.slice(0, 300)));

  // Sync to Cloud Firestore immediately
  syncResultToCloud(result).catch(err => {
    console.warn('[Firestore] Failed to sync result to cloud:', err);
  });
}

export async function syncResultToCloud(result: ExerciseResult): Promise<void> {
  try {
    const safeId = result.id.replace(/[^a-zA-Z0-9_\-]/g, '_');
    await setDoc(doc(db, 'results', safeId), {
      id: result.id,
      studentName: result.studentName,
      classCode: result.classCode,
      pin: result.pin || '',
      subjectId: result.subjectId,
      lessonId: result.lessonId,
      lessonTitle: result.lessonTitle || '',
      score: result.score,
      accuracy: result.accuracy,
      timeSpentSeconds: result.timeSpentSeconds || 0,
      completedAt: result.completedAt
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
  try {
    const colRef = collection(db, 'results');
    const q = query(
      colRef,
      where('studentName', '==', studentName.trim()),
      where('classCode', '==', classCode.trim().toUpperCase())
    );
    const snapshot = await getDocs(q);
    const cloudResults: ExerciseResult[] = [];
    snapshot.forEach(docSnap => {
      cloudResults.push(docSnap.data() as ExerciseResult);
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
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(merged.slice(0, 300)));

      return merged.filter(
        r => r.studentName === studentName && r.classCode === classCode.trim().toUpperCase()
      );
    }
  } catch (err) {
    console.warn('[Firestore] fetchStudentResultsFromCloud error:', err);
  }

  // Fallback to local
  return getResults().filter(
    r => r.studentName === studentName && r.classCode === classCode.trim().toUpperCase()
  );
}

/**
 * Fetch all results for a specific class code (for Teacher dashboard across all PCs).
 */
export async function fetchClassResultsFromCloud(classCode: string): Promise<ExerciseResult[]> {
  try {
    const colRef = collection(db, 'results');
    const q = query(
      colRef,
      where('classCode', '==', classCode.trim().toUpperCase())
    );
    const snapshot = await getDocs(q);
    const cloudResults: ExerciseResult[] = [];
    snapshot.forEach(docSnap => {
      cloudResults.push(docSnap.data() as ExerciseResult);
    });

    if (cloudResults.length > 0) {
      const localResults = getResults();
      const map = new Map<string, ExerciseResult>();
      localResults.forEach(r => map.set(r.id, r));
      cloudResults.forEach(r => map.set(r.id, r));
      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(merged.slice(0, 300)));
      return cloudResults;
    }
  } catch (err) {
    console.warn('[Firestore] fetchClassResultsFromCloud error:', err);
  }

  return getResults().filter(r => r.classCode === classCode.trim().toUpperCase());
}

// ==========================================
// STUDENT ROSTER MANAGEMENT (CRUD & CLOUD)
// ==========================================

export function getStudents(): StudentAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
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
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(merged));
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
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(current));

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
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(merged));

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
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(current));

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
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(remaining));

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

