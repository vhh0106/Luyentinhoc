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
  password?: string;
  name: string;
  role?: 'admin' | 'teacher';
  school?: string;
  assignedClasses?: string[];
  createdAt: string;
}

export interface StudentAccount {
  id: string;
  studentName: string;
  classCode: string;
  studentCode?: string;
  gender?: 'Nam' | 'Nữ' | 'Khác';
  pin?: string;
  createdAt: string;
  note?: string;
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
  studentCode?: string;
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

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface Achievement {
  id: string;
  title: string;
  subjectId: SubjectId | 'all';
  tier: BadgeTier;
  icon: string;
  description: string;
  criteriaDescription: string;
  targetCount: number;
  minAccuracy?: number;
  checkUnlocked: (context: {
    completedLessonIds: string[];
    results: ExerciseResult[];
  }) => {
    isUnlocked: boolean;
    currentProgress: number;
    targetProgress: number;
  };
}

export interface StudentAchievementRecord {
  achievementId: string;
  unlockedAt: string;
}
