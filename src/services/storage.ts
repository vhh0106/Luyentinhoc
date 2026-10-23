import { Assignment, ExerciseResult, SubjectId, TeacherAccount } from '../types';

const STORAGE_KEYS = {
  TEACHERS: 'tinhoc_teachers_v1',
  ASSIGNMENTS: 'tinhoc_assignments_v1',
  RESULTS: 'tinhoc_results_v1',
  CURRENT_TEACHER: 'tinhoc_current_teacher_v1',
  CURRENT_STUDENT: 'tinhoc_current_student_v1',
};

// Seed initial default demo assignment if storage is clean
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  const existingAssignments = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
  if (!existingAssignments || JSON.parse(existingAssignments).length === 0) {
    const demoAssignment1: Assignment = {
      id: 'demo-3a',
      classCode: '3A',
      pin: 'KNTT03',
      subjects: ['go', 'go-tv', 'chuot', 'ic3', 'thuat-toan', 'cdso'],
      teacherName: 'Cô Nguyễn Thị Hoa',
      createdAt: new Date().toISOString(),
      note: 'Bài tập tuần 10 - Ôn tập gõ phím & chuột'
    };

    const demoAssignment2: Assignment = {
      id: 'demo-4b',
      classCode: '4B',
      pin: 'KNTT04',
      subjects: ['go', 'go-tv', 'chuot', 'ic3', 'word', 'excel', 'powerpoint', 'thuat-toan', 'cdso', 'ai'],
      teacherName: 'Thầy Trần Văn Nam',
      createdAt: new Date().toISOString(),
      note: 'Chinh phục trọn bộ 10 kĩ năng Tin học Kết Nối Tri Thức'
    };

    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify([demoAssignment1, demoAssignment2]));
  }

  const existingTeachers = localStorage.getItem(STORAGE_KEYS.TEACHERS);
  if (!existingTeachers || JSON.parse(existingTeachers).length === 0) {
    const demoTeacher: TeacherAccount = {
      username: 'giaovien',
      name: 'Cô Nguyễn Thị Hoa',
      school: 'Tiểu học Kết Nối Tri Thức',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify([demoTeacher]));
  }
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

export function saveAssignment(assignment: Assignment): void {
  const current = getAssignments();
  const index = current.findIndex(a => a.id === assignment.id);
  if (index >= 0) {
    current[index] = assignment;
  } else {
    current.unshift(assignment);
  }
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(current));
}

export function deleteAssignment(id: string): void {
  const current = getAssignments().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(current));
}

export function findAssignmentByPinAndClass(pin: string, classCode: string): Assignment | undefined {
  const list = getAssignments();
  const cleanPin = pin.trim().toUpperCase();
  const cleanClass = classCode.trim().toUpperCase();
  return list.find(
    a => a.pin.toUpperCase() === cleanPin && a.classCode.toUpperCase() === cleanClass
  );
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

// Teachers
export function getTeachers(): TeacherAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEACHERS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveTeacher(teacher: TeacherAccount): void {
  const list = getTeachers();
  const idx = list.findIndex(t => t.username === teacher.username);
  if (idx >= 0) {
    list[idx] = teacher;
  } else {
    list.push(teacher);
  }
  localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(list));
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
  list.unshift(result);
  // Keep last 100 results
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(list.slice(0, 100)));
}
