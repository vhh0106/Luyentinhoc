import { ExerciseResult, StudentAccount } from '../types';
import { fetchClassResultsFromCloud, getResults, fetchStudentsFromCloud, getStudents } from './storage';
import { fetchClassAchievementsFromCloud } from './achievements';
import { ACHIEVEMENTS_MAP } from '../data/achievements';
import { db } from './firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

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
 * Pure aggregation function that calculates stars, scores, rankings and favorites
 * from given class results, achievements, and registered student accounts.
 */
export function buildLeaderboardEntries(
  classCode: string,
  currentStudentName: string,
  allResults: ExerciseResult[],
  classAchievements: Map<string, string[]>,
  registeredStudents: StudentAccount[]
): ClassroomLeaderboardEntry[] {
  const cleanClass = classCode.trim().toUpperCase();
  const cleanCurrentName = currentStudentName.trim();

  // Filter results for this classroom
  const filteredResults = allResults.filter(r => r.classCode.trim().toUpperCase() === cleanClass);

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

  // 1. Initialize studentMap with all real registered students in this class
  registeredStudents
    .filter(st => (st.classCode || '').trim().toUpperCase() === cleanClass)
    .forEach(st => {
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

  // 2. Accumulate exercise results
  for (const res of filteredResults) {
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

  // Ensure current student exists in map even if they haven't submitted yet
  if (cleanCurrentName && !studentMap.has(cleanCurrentName)) {
    studentMap.set(cleanCurrentName, {
      studentName: cleanCurrentName,
      lessonScores: new Map(),
      totalScoreSum: 0,
      totalAccuracySum: 0,
      exerciseCount: 0,
      subjectCounts: new Map()
    });
  }

  // 3. Build list of entries
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
      ai: { emoji: '🤖', name: 'Khám phá AI' },
      sgk: { emoji: '📖', name: 'Bài học SGK' }
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
      isCurrentStudent: cleanCurrentName ? sData.studentName.toLowerCase() === cleanCurrentName.toLowerCase() : false,
      streakCount: Math.min(completedLessonsCount, 7),
      favoriteSubjectEmoji: favInfo.emoji,
      favoriteSubjectName: favInfo.name
    });
  });

  // 4. Sort entries descending: totalStars > averageScore > completedLessonsCount
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

/**
 * Fetches one-off classroom leaderboard from Firestore and local cache.
 */
export async function fetchClassroomLeaderboard(
  classCode: string,
  currentStudentName: string
): Promise<ClassroomLeaderboardEntry[]> {
  const cleanClass = classCode.trim().toUpperCase();

  // 1. Fetch live classroom results, achievements and real registered students from Firestore
  const [classResults, classAchievements, registeredStudents] = await Promise.all([
    fetchClassResultsFromCloud(cleanClass),
    fetchClassAchievementsFromCloud(cleanClass),
    fetchStudentsFromCloud(cleanClass)
  ]);

  // Merge with local results
  const localResults = getResults().filter(r => r.classCode.toUpperCase() === cleanClass);
  const resultMap = new Map<string, ExerciseResult>();
  classResults.forEach(r => resultMap.set(r.id, r));
  localResults.forEach(r => resultMap.set(r.id, r));
  const allResults = Array.from(resultMap.values());

  // Merge registered students with local storage
  const studentMap = new Map<string, StudentAccount>();
  getStudents().filter(s => s.classCode.toUpperCase() === cleanClass).forEach(s => studentMap.set(s.id, s));
  registeredStudents.forEach(s => studentMap.set(s.id, s));

  return buildLeaderboardEntries(
    cleanClass,
    currentStudentName,
    allResults,
    classAchievements,
    Array.from(studentMap.values())
  );
}

/**
 * Subscribes to real-time updates for Classroom Leaderboard using Firestore onSnapshot.
 * Whenever any student in the class completes an exercise, gets higher scores,
 * unlocks an achievement badge, or a teacher adds new students to the class roster,
 * the leaderboard updates instantly in real-time across all devices.
 */
export function subscribeToClassroomLeaderboard(
  classCode: string,
  currentStudentName: string,
  onUpdate: (entries: ClassroomLeaderboardEntry[]) => void
): () => void {
  const cleanClass = classCode.trim().toUpperCase();
  const cleanCurrentName = currentStudentName.trim();

  // State caches for real-time aggregation
  let latestResults: ExerciseResult[] = getResults().filter(r => r.classCode.toUpperCase() === cleanClass);
  let latestAchievements = new Map<string, string[]>();
  let latestStudents: StudentAccount[] = getStudents().filter(s => s.classCode.toUpperCase() === cleanClass);

  // Initial immediate call with cached/local data (0ms initial render)
  const initial = buildLeaderboardEntries(
    cleanClass,
    cleanCurrentName,
    latestResults,
    latestAchievements,
    latestStudents
  );
  onUpdate(initial);

  const notify = () => {
    const updated = buildLeaderboardEntries(
      cleanClass,
      cleanCurrentName,
      latestResults,
      latestAchievements,
      latestStudents
    );
    onUpdate(updated);
  };

  const unsubscribers: (() => void)[] = [];

  // 1. Real-time Results Subscription
  try {
    const resultsCol = collection(db, 'results');
    const qResults = query(resultsCol, where('classCode', '==', cleanClass));
    const unsubResults = onSnapshot(
      qResults,
      snapshot => {
        const cloudResults: ExerciseResult[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as ExerciseResult;
          if (data && data.studentName && data.classCode) {
            cloudResults.push(data);
          }
        });

        const resultMap = new Map<string, ExerciseResult>();
        getResults().filter(r => r.classCode.toUpperCase() === cleanClass).forEach(r => resultMap.set(r.id, r));
        cloudResults.forEach(r => resultMap.set(r.id, r));
        latestResults = Array.from(resultMap.values());
        notify();
      },
      err => {
        console.warn('[Firestore] Realtime leaderboard results listener error:', err);
      }
    );
    unsubscribers.push(unsubResults);
  } catch (err) {
    console.warn('[Firestore] Realtime leaderboard results listener setup error:', err);
  }

  // 2. Real-time Achievements Subscription
  try {
    const achievementsCol = collection(db, 'achievements');
    const qAchievements = query(achievementsCol, where('classCode', '==', cleanClass));
    const unsubAchievements = onSnapshot(
      qAchievements,
      snapshot => {
        const map = new Map<string, string[]>();
        snapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data && data.studentName && data.achievementId) {
            const key = data.studentName.trim();
            const existing = map.get(key) || [];
            if (!existing.includes(data.achievementId)) {
              existing.push(data.achievementId);
              map.set(key, existing);
            }
          }
        });
        latestAchievements = map;
        notify();
      },
      err => {
        console.warn('[Firestore] Realtime leaderboard achievements listener error:', err);
      }
    );
    unsubscribers.push(unsubAchievements);
  } catch (err) {
    console.warn('[Firestore] Realtime leaderboard achievements listener setup error:', err);
  }

  // 3. Real-time Students Roster Subscription
  try {
    const studentsCol = collection(db, 'students');
    const qStudents = query(studentsCol, where('classCode', '==', cleanClass));
    const unsubStudents = onSnapshot(
      qStudents,
      snapshot => {
        const cloudStudents: StudentAccount[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as StudentAccount;
          if (data && data.studentName && data.classCode) {
            cloudStudents.push(data);
          }
        });

        const studentMap = new Map<string, StudentAccount>();
        getStudents().filter(s => s.classCode.toUpperCase() === cleanClass).forEach(s => studentMap.set(s.id, s));
        cloudStudents.forEach(s => studentMap.set(s.id, s));
        latestStudents = Array.from(studentMap.values());
        notify();
      },
      err => {
        console.warn('[Firestore] Realtime leaderboard students listener error:', err);
      }
    );
    unsubscribers.push(unsubStudents);
  } catch (err) {
    console.warn('[Firestore] Realtime leaderboard students listener setup error:', err);
  }

  return () => {
    unsubscribers.forEach(u => {
      try {
        u();
      } catch (e) {}
    });
  };
}
