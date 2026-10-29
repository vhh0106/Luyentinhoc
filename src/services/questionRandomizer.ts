import { Lesson, QuizQuestion } from '../types';
import { QUESTION_BANK } from '../data/questionBank';
import {
  QUESTIONS_GRADE_3,
  QUESTIONS_GRADE_4,
  QUESTIONS_GRADE_5
} from '../data/sgkQuestionsByGrade';
import {
  SGK_LESSONS_GRADE_3,
  SGK_LESSONS_GRADE_4,
  SGK_LESSONS_GRADE_5
} from '../data/sgkLessonsByGrade';

/**
 * 32-bit FNV-1a hash function for strings
 */
export function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Mulberry32 pseudo-random number generator initialized with an integer seed.
 * Yields identical sequences for identical seeds, and divergent sequences for different accounts.
 */
export function createPRNG(seedNumber: number): () => number {
  let a = seedNumber >>> 0;
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffles an array deterministically or pseudo-randomly using a provided PRNG
 */
export function shuffleWithPRNG<T>(array: T[], prng: () => number): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Gathers a wide candidate pool of questions for a lesson across:
 * 1. The lesson's own questions.
 * 2. Sibling lessons in the same SGK topic/unit.
 * 3. The comprehensive QUESTION_BANK matching the subject and topic.
 */
export function getCandidatePoolForLesson(
  lesson: Lesson,
  subjectId: string,
  grade: 3 | 4 | 5 = 3
): QuizQuestion[] {
  const map = new Map<string, QuizQuestion>();

  // 1. Add current lesson questions
  if (lesson.questions && Array.isArray(lesson.questions)) {
    lesson.questions.forEach(q => {
      if (q && q.question && q.options && q.options.length >= 2) {
        map.set(q.question.trim().toLowerCase(), q);
      }
    });
  }

  // 2. Add sibling questions from SGK lessons in the same grade and topic
  const gradeSgkLessons =
    grade === 3 ? SGK_LESSONS_GRADE_3 : grade === 4 ? SGK_LESSONS_GRADE_4 : SGK_LESSONS_GRADE_5;

  const topicCode = lesson.topicCode;
  if (topicCode) {
    // Collect from matching topic in grade lessons
    gradeSgkLessons
      .filter(l => l.topicCode === topicCode)
      .forEach(l => {
        (l.questions || []).forEach(q => {
          if (q && q.question && q.options && q.options.length >= 2) {
            map.set(q.question.trim().toLowerCase(), q);
          }
        });
      });

    // Also collect from QUESTIONS_GRADE_3/4/5
    const gradePool =
      grade === 3 ? QUESTIONS_GRADE_3 : grade === 4 ? QUESTIONS_GRADE_4 : QUESTIONS_GRADE_5;
    const topicQuestions = gradePool[topicCode];
    if (Array.isArray(topicQuestions)) {
      topicQuestions.forEach(q => {
        if (q && q.question && q.options && q.options.length >= 2) {
          map.set(q.question.trim().toLowerCase(), q);
        }
      });
    }
  }

  // 3. Add from general subject QUESTION_BANK
  const subjectKeyMap: Record<string, string> = {
    ic3: 'ic3',
    cdso: 'citizenship',
    ai: 'ai',
    word: 'word',
    excel: 'excel',
    powerpoint: 'powerpoint',
    'thuat-toan': 'algorithms',
    go: 'typing',
    'go-tv': 'typing_vn',
    chuot: 'mouse'
  };

  const bankKey = subjectKeyMap[subjectId];
  if (bankKey && Array.isArray(QUESTION_BANK[bankKey])) {
    QUESTION_BANK[bankKey].forEach(q => {
      if (q && q.question && q.options && q.options.length >= 2) {
        // Only include if no topic restriction or if matches
        map.set(q.question.trim().toLowerCase(), q);
      }
    });
  }

  const pool = Array.from(map.values());
  return pool.length > 0 ? pool : (lesson.questions || []);
}

export interface PersonalizedQuizPayload {
  questions: QuizQuestion[];
  examCode: string;
  totalPoolSize: number;
}

/**
 * Generates a personalized test paper for a specific student account.
 * - Uses the student's unique identifier (classCode, studentCode, studentName, PIN)
 *   combined with the lesson, grade, and attempt counter as seed.
 * - Selects a subset of questions from the wide candidate pool.
 * - Randomizes the A, B, C, D choices within each question and adjusts correctIndex.
 * - Generates a verifiable Exam Code (Mã đề thi).
 */
export function generatePersonalizedQuiz(params: {
  lesson: Lesson;
  subjectId: string;
  grade: 3 | 4 | 5;
  studentIdentifier: string;
  attempt?: number;
  targetCount?: number;
}): PersonalizedQuizPayload {
  const {
    lesson,
    subjectId,
    grade = 3,
    studentIdentifier,
    attempt = 1,
    targetCount = 5
  } = params;

  // Build unique account seed
  const cleanId = (studentIdentifier || 'hocsinh').trim().toLowerCase().replace(/\s+/g, '_');
  const seedString = `${cleanId}#sub:${subjectId}#les:${lesson.id}#gr:${grade}#att:${attempt}`;
  const seedNum = hashString(seedString);
  const prng = createPRNG(seedNum);

  // Generate 3-digit readable exam code: e.g. "Đề 301" or "Đề 418"
  const examNumber = 100 + (Math.abs(seedNum) % 900);
  const examCode = `MĐ-${examNumber}`;

  // Gather candidate pool
  const candidatePool = getCandidatePoolForLesson(lesson, subjectId, grade);

  // If pool has more questions than targetCount, shuffle with account PRNG and slice
  let selectedQuestions: QuizQuestion[] = [];
  if (candidatePool.length <= targetCount) {
    selectedQuestions = shuffleWithPRNG(candidatePool, prng);
  } else {
    // Prioritize the base questions of the lesson first if available
    const primaryQuestions = lesson.questions && lesson.questions.length > 0 ? lesson.questions : [];
    const poolWithoutPrimary = candidatePool.filter(
      q => !primaryQuestions.some(pq => pq.question.trim().toLowerCase() === q.question.trim().toLowerCase())
    );

    // Shuffle both parts
    const shuffledPrimary = shuffleWithPRNG(primaryQuestions, prng);
    const shuffledExtra = shuffleWithPRNG(poolWithoutPrimary, prng);

    // Merge: pick a mix of primary and extra questions so each student gets unique questions
    const combinedShuffled = shuffleWithPRNG([...shuffledPrimary, ...shuffledExtra], prng);
    selectedQuestions = combinedShuffled.slice(0, targetCount);
  }

  // Shuffle the options (A, B, C, D) inside each question and update correctIndex
  const finalizedQuestions: QuizQuestion[] = selectedQuestions.map((q, idx) => {
    if (!q.options || q.options.length <= 1) {
      return { ...q, id: idx + 1 };
    }

    const originalCorrectText = q.options[q.correctIndex];
    // Create per-question sub-PRNG to scramble options
    const qSeed = hashString(`${seedString}#q:${idx}#txt:${q.question.slice(0, 10)}`);
    const qPrng = createPRNG(qSeed);
    const shuffledOptions = shuffleWithPRNG(q.options, qPrng);
    const newCorrectIndex = shuffledOptions.findIndex(opt => opt === originalCorrectText);

    return {
      ...q,
      id: idx + 1,
      options: shuffledOptions,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
    };
  });

  return {
    questions: finalizedQuestions,
    examCode,
    totalPoolSize: candidatePool.length
  };
}
