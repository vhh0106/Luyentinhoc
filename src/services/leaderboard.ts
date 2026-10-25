import { ExerciseResult } from '../types';
import { fetchClassResultsFromCloud, getResults, fetchStudentsFromCloud } from './storage';
import { fetchClassAchievementsFromCloud } from './achievements';
import { ACHIEVEMENTS_MAP } from '../data/achievements';

export interface ClassroomLeaderboardEntry {
  studentName: string;
  totalStars: number;
  lessonStars: number;
  badgeStars: number;
  completedLessonsCount: number;
  averageScore: number;
  averageAccuracy: number;
  badgesCount: number;
  rank: number;
  isCurrentStudent: boolean;
  streakCount: number;
  favoriteSubjectEmoji: string;
  favoriteSubjectName: string;
}


/**
 * Calculates accumulated stars for a lesson based on score.
 * 90-100: 3 stars ⭐⭐⭐
 * 75-89: 2 stars ⭐⭐
 * 50-74: 1 star ⭐
 */
export function calculateLessonStars(score: number): number {
  if (score >= 90) return 3;
  if (score >= 75) return 2;
  if (score >= 50) return 1;
  return 0;
}

/**
 * Calculates bonus stars from an achievement tier:
 * bronze: 1, silver: 2, gold: 3, diamond: 5
 */
export function calculateBadgeStars(badgeId: string): number {
  const badge = ACHIEVEMENTS_MAP[badgeId];
  if (!badge) return 1;
  switch (badge.tier) {
    case 'diamond': return 5;
    case 'gold': return 3;
    case 'silver': return 2;
    case 'bronze':
    default: return 1;
  }
}

/**
 * Fetches real-time exercise results and achievements from Firestore for the classroom,
 * aggregates stars per student, and generates an ordered leaderboard.
 */
export async function fetchClassroomLeaderboard(
  classCode: string,
  currentStudentName: string
): Promise<ClassroomLeaderboardEntry[]> {
  const cleanClass = classCode.trim().toUpperCase();
  const cleanCurrentName = currentStudentName.trim();

  // 1. Fetch live classroom results, achievements and real registered students from Firestore
  const [classResults, classAchievements, registeredStudents] = await Promise.all([
    fetchClassResultsFromCloud(cleanClass),
    fetchClassAchievementsFromCloud(cleanClass),
    fetchStudentsFromCloud(cleanClass)
  ]);

  // Merge with local results in case offline or newly submitted
  const localResults = getResults().filter(r => r.classCode.toUpperCase() === cleanClass);
  const resultMap = new Map<string, ExerciseResult>();
  classResults.forEach(r => resultMap.set(r.id, r));
  localResults.forEach(r => resultMap.set(r.id, r));
  const allResults = Array.from(resultMap.values());

  // Group by student
  const studentMap = new Map<
    string,
    {
      studentName: string;
      lessonScores: Map<string, { score: number; accuracy: number; subjectId: string }>;
      totalScoreSum: number;
      totalAccuracySum: number;
      exerciseCount: number;
      subjectCounts: Map<string, number>;
    }
  >();

  // Initialize studentMap with all real registered students in this class
  registeredStudents.forEach(st => {
    const sName = st.studentName.trim();
    if (!studentMap.has(sName)) {
      studentMap.set(sName, {
        studentName: sName,
        lessonScores: new Map(),
        totalScoreSum: 0,
        totalAccuracySum: 0,
        exerciseCount: 0,
        subjectCounts: new Map()
      });
    }
  });

  for (const res of allResults) {
    const sName = res.studentName.trim();
    if (!studentMap.has(sName)) {
      studentMap.set(sName, {
        studentName: sName,
        lessonScores: new Map(),
        totalScoreSum: 0,
        totalAccuracySum: 0,
        exerciseCount: 0,
        subjectCounts: new Map()
      });
    }

    const sData = studentMap.get(sName)!;
    sData.totalScoreSum += res.score;
    sData.totalAccuracySum += res.accuracy;
    sData.exerciseCount += 1;

    // Track best score for unique lesson
    const lessonKey = `${res.subjectId}-${res.lessonId}`;
    const prev = sData.lessonScores.get(lessonKey);
    if (!prev || res.score > prev.score) {
      sData.lessonScores.set(lessonKey, {
        score: res.score,
        accuracy: res.accuracy,
        subjectId: res.subjectId
      });
    }

    // Count favorite subject
    const prevSubCount = sData.subjectCounts.get(res.subjectId) || 0;
    sData.subjectCounts.set(res.subjectId, prevSubCount + 1);
  }

  // Ensure current student exists in map even if they haven't completed an exercise yet
  if (!studentMap.has(cleanCurrentName)) {
    studentMap.set(cleanCurrentName, {
      studentName: cleanCurrentName,
      lessonScores: new Map(),
      totalScoreSum: 0,
      totalAccuracySum: 0,
      exerciseCount: 0,
      subjectCounts: new Map()
    });
  }

  // 2. Build list of entries
  const entries: ClassroomLeaderboardEntry[] = [];

  studentMap.forEach(sData => {
    let lessonStars = 0;
    sData.lessonScores.forEach(({ score }) => {
      lessonStars += calculateLessonStars(score);
    });

    // Badge bonus stars
    const badges = classAchievements.get(sData.studentName) || [];
    let badgeStars = 0;
    badges.forEach(bId => {
      badgeStars += calculateBadgeStars(bId);
    });

    const totalStars = lessonStars + badgeStars;
    const completedLessonsCount = sData.lessonScores.size;
    const averageScore = sData.exerciseCount > 0 ? Math.round(sData.totalScoreSum / sData.exerciseCount) : 0;
    const averageAccuracy = sData.exerciseCount > 0 ? Math.round(sData.totalAccuracySum / sData.exerciseCount) : 0;

    // Find favorite subject
    let favoriteSub = 'go';
    let maxSubCount = 0;
    sData.subjectCounts.forEach((count, subId) => {
      if (count > maxSubCount) {
        maxSubCount = count;
        favoriteSub = subId;
      }
    });

    const subjectEmojis: Record<string, { emoji: string; name: string }> = {
      go: { emoji: '⌨️', name: 'Gõ 10 ngón' },
      'go-tv': { emoji: '🇻🇳', name: 'Gõ tiếng Việt' },
      chuot: { emoji: '🖱️', name: 'Chuột máy tính' },
      ic3: { emoji: '🖥️', name: 'Kiến thức số' },
      word: { emoji: '📝', name: 'Soạn thảo Word' },
      excel: { emoji: '📊', name: 'Bảng tính Excel' },
      powerpoint: { emoji: '🎨', name: 'Trình chiếu PPT' },
      'thuat-toan': { emoji: '🧩', name: 'Thuật toán Maze' },
      cdso: { emoji: '🛡️', name: 'An toàn mạng' },
      ai: { emoji: '🤖', name: 'Khám phá AI' }
    };

    const favInfo = subjectEmojis[favoriteSub] || { emoji: '💻', name: 'Tin học' };

    entries.push({
      studentName: sData.studentName,
      totalStars,
      lessonStars,
      badgeStars,
      completedLessonsCount,
      averageScore,
      averageAccuracy,
      badgesCount: badges.length,
      rank: 0,
      isCurrentStudent: sData.studentName.toLowerCase() === cleanCurrentName.toLowerCase(),
      streakCount: Math.min(completedLessonsCount, 7),
      favoriteSubjectEmoji: favInfo.emoji,
      favoriteSubjectName: favInfo.name
    });
  });

  // 3. Sort entries descending: totalStars > averageScore > completedLessonsCount
  entries.sort((a, b) => {
    if (b.totalStars !== a.totalStars) {
      return b.totalStars - a.totalStars;
    }
    if (b.averageScore !== a.averageScore) {
      return b.averageScore - a.averageScore;
    }
    return b.completedLessonsCount - a.completedLessonsCount;
  });

  // Assign ranks
  entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  return entries;
}
