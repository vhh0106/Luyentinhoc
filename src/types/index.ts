export type SubjectId =
  | 'go'
  | 'go-tv'
  | 'chuot'
  | 'ic3'
  | 'word'
  | 'excel'
  | 'powerpoint'
  | 'thuat-toan'
  | 'cdso'
  | 'ai';

export interface SubjectInfo {
  id: SubjectId;
  emoji: string;
  name: string;
  meta: string;
  objectives: string[];
  gradeLevel: string;
  badgeColor: string;
  lightBg: string;
}

export interface Lesson {
  id: number;
  level: number;
  title: string;
  desc: string;
  type?: string;
  target?: string;
  content?: string;
  items?: any[];
  tasks?: string[];
  questions?: QuizQuestion[];
  maze?: MazeConfig;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MazeConfig {
  gridSize: number;
  start: [number, number];
  goal: [number, number];
  walls: [number, number][];
  initialDirection: 'up' | 'down' | 'left' | 'right';
  maxCommands?: number;
}

export interface TeacherAccount {
  username: string;
  name: string;
  school?: string;
  createdAt: string;
}

export interface Assignment {
  id: string;
  classCode: string;
  pin: string;
  subjects: SubjectId[];
  teacherName: string;
  createdAt: string;
  note?: string;
}

export interface StudentSession {
  name: string;
  classCode: string;
  pin: string;
  assignment: Assignment;
}

export interface ExerciseResult {
  id: string;
  studentName: string;
  classCode: string;
  pin: string;
  subjectId: SubjectId;
  lessonId: number;
  lessonTitle: string;
  score: number;
  accuracy: number;
  timeSpentSeconds: number;
  completedAt: string;
}
