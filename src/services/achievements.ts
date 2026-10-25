import { Achievement, ExerciseResult, StudentAchievementRecord, SubjectId } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';
import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where
} from 'firebase/firestore';

function getStorageKey(studentName: string, classCode: string): string {
  return `tinhoc_achievements_${studentName.trim().toLowerCase()}_${classCode.trim().toLowerCase()}`;
}

export function getStudentUnlockedAchievements(
  studentName: string,
  classCode: string
): StudentAchievementRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getStorageKey(studentName, classCode));
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse student achievements', e);
    return [];
  }
}

export function saveStudentAchievement(
  studentName: string,
  classCode: string,
  achievementId: string
): void {
  const current = getStudentUnlockedAchievements(studentName, classCode);
  if (!current.some(item => item.achievementId === achievementId)) {
    const unlockedAt = new Date().toISOString();
    const updated: StudentAchievementRecord[] = [
      ...current,
      {
        achievementId,
        unlockedAt
      }
    ];
    localStorage.setItem(getStorageKey(studentName, classCode), JSON.stringify(updated));

    // Sync to Cloud Firestore so it is retained across all computers
    syncAchievementToCloud(studentName, classCode, achievementId, unlockedAt).catch(err => {
      console.warn('[Firestore] Error syncing achievement to cloud:', err);
    });
  }
}

async function syncAchievementToCloud(
  studentName: string,
  classCode: string,
  achievementId: string,
  unlockedAt: string
): Promise<void> {
  try {
    const rawId = `${studentName}_${classCode}_${achievementId}`;
    const safeDocId = rawId.replace(/[^a-zA-Z0-9_\-]/g, '_');
    await setDoc(doc(db, 'achievements', safeDocId), {
      id: safeDocId,
      studentName: studentName.trim(),
      classCode: classCode.trim().toUpperCase(),
      achievementId,
      unlockedAt
    });
    console.log(`[Firestore] Synced achievement badge ${achievementId} for student ${studentName}`);
  } catch (err) {
    console.warn('[Firestore] syncAchievementToCloud error:', err);
  }
}

/**
 * Fetches all unlocked achievement badges for a student from Firestore cloud.
 * Guarantees that when logging in from any other computer, all earned badges appear.
 */
export async function fetchStudentAchievementsFromCloud(
  studentName: string,
  classCode: string
): Promise<StudentAchievementRecord[]> {
  try {
    const colRef = collection(db, 'achievements');
    const q = query(
      colRef,
      where('studentName', '==', studentName.trim()),
      where('classCode', '==', classCode.trim().toUpperCase())
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const cloudRecords: StudentAchievementRecord[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.achievementId && data.unlockedAt) {
          cloudRecords.push({
            achievementId: data.achievementId,
            unlockedAt: data.unlockedAt
          });
        }
      });

      const localRecords = getStudentUnlockedAchievements(studentName, classCode);
      const map = new Map<string, StudentAchievementRecord>();
      localRecords.forEach(r => map.set(r.achievementId, r));
      cloudRecords.forEach(r => map.set(r.achievementId, r));
      const merged = Array.from(map.values());
      localStorage.setItem(getStorageKey(studentName, classCode), JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.warn('[Firestore] fetchStudentAchievementsFromCloud error:', err);
  }

  return getStudentUnlockedAchievements(studentName, classCode);
}

/**
 * Fetch all unlocked achievements for all students in a classroom from Firestore.
 * Used to calculate achievement bonus stars in the Classroom Leaderboard.
 */
export async function fetchClassAchievementsFromCloud(
  classCode: string
): Promise<Map<string, string[]>> {
  const map = new Map<string, string[]>();
  try {
    const colRef = collection(db, 'achievements');
    const q = query(
      colRef,
      where('classCode', '==', classCode.trim().toUpperCase())
    );
    const snapshot = await getDocs(q);
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (data.studentName && data.achievementId) {
        const key = data.studentName.trim();
        const existing = map.get(key) || [];
        if (!existing.includes(data.achievementId)) {
          existing.push(data.achievementId);
          map.set(key, existing);
        }
      }
    });
  } catch (err) {
    console.warn('[Firestore] fetchClassAchievementsFromCloud error:', err);
  }
  return map;
}

export interface EvaluatedAchievement {
  achievement: Achievement;
  isUnlocked: boolean;
  unlockedAt?: string;
  currentProgress: number;
  targetProgress: number;
  percentage: number;
}

export function evaluateAchievements(
  studentName: string,
  classCode: string,
  completedLessonIds: string[],
  results: ExerciseResult[]
): EvaluatedAchievement[] {
  const savedRecords = getStudentUnlockedAchievements(studentName, classCode);
  const savedMap = new Map<string, string>();
  savedRecords.forEach(r => savedMap.set(r.achievementId, r.unlockedAt));

  return ACHIEVEMENTS.map(achievement => {
    const evaluation = achievement.checkUnlocked({ completedLessonIds, results });
    const isPreviouslyUnlocked = savedMap.has(achievement.id);
    const isUnlocked = isPreviouslyUnlocked || evaluation.isUnlocked;

    // If it's unlocked for the first time without a saved record, auto-persist it
    let unlockedAt = savedMap.get(achievement.id);
    if (!isPreviouslyUnlocked && evaluation.isUnlocked) {
      unlockedAt = new Date().toISOString();
      saveStudentAchievement(studentName, classCode, achievement.id);
    }

    const currentProgress = evaluation.isUnlocked
      ? evaluation.targetProgress
      : Math.min(evaluation.currentProgress, evaluation.targetProgress);

    const percentage = evaluation.targetProgress > 0
      ? Math.min(100, Math.round((currentProgress / evaluation.targetProgress) * 100))
      : 0;

    return {
      achievement,
      isUnlocked,
      unlockedAt,
      currentProgress,
      targetProgress: evaluation.targetProgress,
      percentage
    };
  });
}

/**
 * Check for newly unlocked achievements after finishing an exercise.
 * Saves any newly unlocked achievements and returns them to trigger celebration UI.
 */
export function checkNewAchievements(
  studentName: string,
  classCode: string,
  completedLessonIds: string[],
  results: ExerciseResult[]
): Achievement[] {
  const currentSaved = getStudentUnlockedAchievements(studentName, classCode);
  const previouslyUnlockedIds = new Set(currentSaved.map(r => r.achievementId));

  const newlyUnlocked: Achievement[] = [];

  for (const achievement of ACHIEVEMENTS) {
    if (!previouslyUnlockedIds.has(achievement.id)) {
      const evaluation = achievement.checkUnlocked({ completedLessonIds, results });
      if (evaluation.isUnlocked) {
        saveStudentAchievement(studentName, classCode, achievement.id);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}
