import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Lesson, StudentSession, SubjectId, ExerciseResult, Achievement, Assignment } from '../types';
import { SUBJECTS_MAP, SUBJECT_LESSONS, getLessonsForGrade } from '../data/curriculum';
import { TypingExercise } from './exercises/TypingExercise';
import { MouseExercise } from './exercises/MouseExercise';
import { AlgorithmExercise } from './exercises/AlgorithmExercise';
import { OfficeSimulator } from './exercises/OfficeSimulator';
import { QuizExercise } from './exercises/QuizExercise';
import {
  saveResult,
  getResults,
  fetchStudentResultsFromCloud,
  findAssignmentByClass,
  findAssignmentByClassCloud,
  subscribeToAssignments,
  getDeletedAssignmentIds
} from '../services/storage';
import { soundService } from '../services/sound';
import {
  ArrowLeft,
  LogOut,
  Sparkles,
  BookOpen,
  Award,
  Play,
  Volume2,
  VolumeX,
  Star,
  CheckCircle2,
  GraduationCap,
  Search,
  FileText,
  Gamepad2,
  Filter,
  Bot,
  PieChart as PieChartIcon,
  ChevronDown,
  ChevronUp,
  Trophy,
  ArrowRight,
  Cloud,
  CheckCheck,
  RefreshCw,
  Medal
} from 'lucide-react';
import { HeroRobotCanvas } from './3d/HeroRobotCanvas';
import { StudentProgressChart } from './dashboard/StudentProgressChart';
import { ClassroomLeaderboard } from './dashboard/ClassroomLeaderboard';
import { evaluateAchievements, checkNewAchievements, fetchStudentAchievementsFromCloud } from '../services/achievements';
import { AchievementShowcaseModal } from './achievements/AchievementShowcaseModal';
import { BadgeUnlockCelebration } from './achievements/BadgeUnlockCelebration';
import { ThemeToggleButton } from './common/ThemeToggleButton';
import {
  ArcadeGameCenter,
  ARCADE_GAMES_CATALOG,
  ArcadeGameId
} from './games/ArcadeGameCenter';

interface StudentDashboardProps {
  session: StudentSession;
  onLogout: () => void;
  onBackHome?: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ session, onLogout, onBackHome }) => {
  const { name, classCode, pin, assignment: initialAssignment } = session;
  const cleanClassCode = classCode.trim().toUpperCase();

  // Live assignment state synced with Teacher Dashboard & Firestore
  const [currentAssignment, setCurrentAssignment] = useState<Assignment>(() => {
    const deletedIds = getDeletedAssignmentIds();
    const stored = findAssignmentByClass(cleanClassCode);
    if (stored && !deletedIds.has(stored.id)) {
      return stored;
    }
    if (
      initialAssignment &&
      initialAssignment.id &&
      !initialAssignment.id.startsWith('default-') &&
      !initialAssignment.id.startsWith('unassigned-') &&
      !deletedIds.has(initialAssignment.id)
    ) {
      return initialAssignment;
    }
    return {
      id: `unassigned-${cleanClassCode}`,
      classCode: cleanClassCode,
      pin: pin || '',
      subjects: [],
      teacherName: '',
      createdAt: new Date().toISOString(),
      note: ''
    };
  });

  // Auto-detect student grade from classCode (e.g. 3A -> 3, 4B -> 4, 5C -> 5)
  const detectedGrade: 3 | 4 | 5 = useMemo(() => {
    const match = classCode.match(/([345])/);
    if (match) {
      const val = parseInt(match[1], 10);
      if (val === 3 || val === 4 || val === 5) return val as (3 | 4 | 5);
    }
    return 3;
  }, [classCode]);

  const [selectedGrade, setSelectedGrade] = useState<3 | 4 | 5>(detectedGrade);
  const [currentView, setCurrentView] = useState<'subjects' | 'lessons' | 'exercise'>('subjects');
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'done'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseMode, setExerciseMode] = useState<'interactive' | 'quiz'>('interactive');
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    const existing = getResults()
      .filter(
        r =>
          r.studentName.trim().toLowerCase() === name.trim().toLowerCase() &&
          r.classCode.toUpperCase() === classCode.toUpperCase()
      )
      .map(r => `${r.subjectId}-${r.lessonId}`);
    return Array.from(new Set(existing));
  });
  const [studentResults, setStudentResults] = useState<ExerciseResult[]>(() => {
    return getResults().filter(
      r =>
        r.studentName.trim().toLowerCase() === name.trim().toLowerCase() &&
        r.classCode.toUpperCase() === classCode.toUpperCase()
    );
  });
  const [showRobotMascot, setShowRobotMascot] = useState(false);
  const [showProgressDashboard, setShowProgressDashboard] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showAchievementShowcase, setShowAchievementShowcase] = useState(false);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<Achievement[]>([]);
  const [activeArcadeGame, setActiveArcadeGame] = useState<ArcadeGameId | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Sync with Cloud Firestore on mount or on-demand
  const syncWithCloud = useCallback(async () => {
    setIsCloudSyncing(true);
    try {
      const [cloudRes, , latestAssign] = await Promise.all([
        fetchStudentResultsFromCloud(name, classCode),
        fetchStudentAchievementsFromCloud(name, classCode),
        findAssignmentByClassCloud(cleanClassCode)
      ]);

      if (cloudRes && cloudRes.length > 0) {
        setStudentResults(cloudRes);
        const lessonKeys = Array.from(new Set(cloudRes.map(r => `${r.subjectId}-${r.lessonId}`)));
        setCompletedLessonIds(prev => Array.from(new Set([...prev, ...lessonKeys])));
      }

      const deletedIds = getDeletedAssignmentIds();
      if (latestAssign && !deletedIds.has(latestAssign.id)) {
        setCurrentAssignment(latestAssign);
      } else {
        setCurrentAssignment({
          id: `unassigned-${cleanClassCode}`,
          classCode: cleanClassCode,
          pin: pin || '',
          subjects: [],
          teacherName: '',
          createdAt: new Date().toISOString(),
          note: ''
        });
      }

      setCloudSynced(true);
    } catch (err) {
      console.warn('[Dashboard] Could not sync with cloud:', err);
    } finally {
      setIsCloudSyncing(false);
    }
  }, [name, classCode, cleanClassCode, pin]);

  useEffect(() => {
    syncWithCloud();

    // Real-time listener for class assignments so teacher deletions/updates reflect immediately
    const unsubAssignments = subscribeToAssignments(liveAssignments => {
      const deletedIds = getDeletedAssignmentIds();
      const match = liveAssignments.find(
        a =>
          a.classCode.trim().toUpperCase() === cleanClassCode &&
          !deletedIds.has(a.id)
      );
      if (match) {
        setCurrentAssignment(match);
      } else {
        setCurrentAssignment({
          id: `unassigned-${cleanClassCode}`,
          classCode: cleanClassCode,
          pin: pin || '',
          subjects: [],
          teacherName: '',
          createdAt: new Date().toISOString(),
          note: ''
        });
      }
    });

    return () => {
      unsubAssignments();
    };
  }, [syncWithCloud, cleanClassCode, pin]);

  // Available subjects strictly from active class assignment (filtered against deleted assignments)
  const availableSubjects = useMemo<SubjectId[]>(() => {
    const deletedIds = getDeletedAssignmentIds();
    if (!currentAssignment || deletedIds.has(currentAssignment.id)) {
      return [];
    }
    return (currentAssignment.subjects || []).filter(sId => Boolean(SUBJECTS_MAP[sId]));
  }, [currentAssignment]);

  // If teacher deletes the assignment or removes the currently viewed subject, return to subjects grid immediately
  useEffect(() => {
    if (selectedSubjectId && !availableSubjects.includes(selectedSubjectId)) {
      setSelectedSubjectId(null);
      setSelectedLesson(null);
      setCurrentView('subjects');
    }
  }, [availableSubjects, selectedSubjectId]);

  // Map of `${subjectId}-${lessonId}` -> best score, accuracy, stars, attempts
  const lessonStatsMap = useMemo(() => {
    const map = new Map<
      string,
      { bestScore: number; bestAccuracy: number; attempts: number; stars: number }
    >();
    studentResults.forEach(r => {
      const key = `${r.subjectId}-${r.lessonId}`;
      const prev = map.get(key);
      const bestScore = prev ? Math.max(prev.bestScore, r.score) : r.score;
      const bestAccuracy = prev ? Math.max(prev.bestAccuracy, r.accuracy) : r.accuracy;
      const attempts = (prev?.attempts || 0) + 1;
      const stars = bestScore >= 90 ? 3 : bestScore >= 75 ? 2 : bestScore >= 50 ? 1 : 0;
      map.set(key, { bestScore, bestAccuracy, attempts, stars });
    });
    return map;
  }, [studentResults]);

  // Evaluated achievements for current student
  const evaluatedAchievements = useMemo(() => {
    return evaluateAchievements(name, classCode, completedLessonIds, studentResults);
  }, [name, classCode, completedLessonIds, studentResults]);

  const unlockedAchievementsCount = evaluatedAchievements.filter(a => a.isUnlocked).length;

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundService.setMuted(next);
  };

  const handleSelectSubject = (sId: SubjectId) => {
    soundService.playKeyCorrect();
    setSelectedSubjectId(sId);
    setSelectedLevel('all');
    setStatusFilter('all');
    setSearchQuery('');
    setCurrentView('lessons');
  };

  const handleSelectLesson = (lesson: Lesson, mode: 'interactive' | 'quiz' = 'interactive') => {
    soundService.playKeyCorrect();
    setSelectedLesson(lesson);
    setExerciseMode(mode);
    setCurrentView('exercise');
  };

  const handleExerciseComplete = (score: number, accuracy: number, timeSpent: number) => {
    if (!selectedSubjectId || !selectedLesson) return;

    // Record completed lesson
    const key = `${selectedSubjectId}-${selectedLesson.id}`;
    const nextCompleted = completedLessonIds.includes(key)
      ? completedLessonIds
      : [...completedLessonIds, key];

    if (!completedLessonIds.includes(key)) {
      setCompletedLessonIds(nextCompleted);
    }

    // Persist result with unique ID and normalized fields
    const newResult: ExerciseResult = {
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      studentName: name.trim(),
      classCode: classCode.trim().toUpperCase(),
      pin: (pin || '').trim().toUpperCase(),
      subjectId: selectedSubjectId,
      lessonId: selectedLesson.id,
      lessonTitle: selectedLesson.title,
      score,
      accuracy,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString()
    };

    saveResult(newResult).catch(e => console.warn('[StudentDashboard] saveResult cloud sync:', e));
    const updatedResults = [newResult, ...studentResults];
    setStudentResults(updatedResults);

    // Evaluate for newly unlocked digital badges
    const newUnlocks = checkNewAchievements(name, classCode, nextCompleted, updatedResults);
    if (newUnlocks.length > 0) {
      setNewlyUnlockedBadges(newUnlocks);
    }
  };

  const handleArcadeGameComplete = useCallback(
    (gameId: ArcadeGameId, subjectId: SubjectId, score: number, accuracy: number, timeSpent: number) => {
      const gameMeta = ARCADE_GAMES_CATALOG.find(g => g.id === gameId);
      const lessonId = gameId === 'space-typing' ? 1 : gameId === 'cyber-shield' ? 2 : 3;
      const key = `${subjectId}-${lessonId}`;
      const nextCompleted = completedLessonIds.includes(key)
        ? completedLessonIds
        : [...completedLessonIds, key];

      if (!completedLessonIds.includes(key)) {
        setCompletedLessonIds(nextCompleted);
      }

      const newResult: ExerciseResult = {
        id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        studentName: name.trim(),
        classCode: classCode.trim().toUpperCase(),
        pin: (pin || '').trim().toUpperCase(),
        subjectId,
        lessonId,
        lessonTitle: `Game: ${gameMeta?.title || 'Đấu Trường Tin Học'}`,
        score,
        accuracy,
        timeSpentSeconds: timeSpent,
        completedAt: new Date().toISOString()
      };

      saveResult(newResult).catch(e => console.warn('[StudentDashboard] saveResult arcade sync:', e));
      setStudentResults(prev => {
        const updated = [newResult, ...prev];
        const newUnlocks = checkNewAchievements(name, classCode, nextCompleted, updated);
        if (newUnlocks.length > 0) {
          setNewlyUnlockedBadges(newUnlocks);
        }
        return updated;
      });
    },
    [completedLessonIds, name, classCode, pin]
  );

  const selectedSubject = selectedSubjectId ? SUBJECTS_MAP[selectedSubjectId] : null;
  const currentLessons = useMemo(() => {
    if (!selectedSubjectId) return [];
    return getLessonsForGrade(selectedSubjectId, selectedGrade);
  }, [selectedSubjectId, selectedGrade]);

  // Full-Viewport Arcade Game Shell (must be after all React Hooks!)
  if (activeArcadeGame) {
    return (
      <ArcadeGameCenter
        initialGameId={activeArcadeGame}
        studentName={name}
        classCode={classCode}
        defaultGrade={selectedGrade}
        onExit={() => setActiveArcadeGame(null)}
        onGameComplete={handleArcadeGameComplete}
      />
    );
  }

  // EXERCISE VIEW
  if (currentView === 'exercise' && selectedSubject && selectedLesson) {
    let ExerciseComponent = null;

    // If student selected quiz mode OR if this is a theory/situation module (ic3, cdso, ai, sgk)
    const isQuizMode =
      exerciseMode === 'quiz' ||
      ['ic3', 'cdso', 'ai', 'sgk'].includes(selectedSubjectId || '');

    if (isQuizMode) {
      ExerciseComponent = (
        <QuizExercise
          lesson={selectedLesson}
          subjectId={selectedSubjectId as SubjectId}
          subjectEmoji={selectedSubject.emoji}
          subjectName={selectedSubject.name}
          grade={selectedGrade}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentView('lessons')}
        />
      );
    } else if (selectedSubjectId === 'go' || selectedSubjectId === 'go-tv') {
      ExerciseComponent = (
        <TypingExercise
          lesson={selectedLesson}
          subjectId={selectedSubjectId}
          subjectEmoji={selectedSubject.emoji}
          subjectName={selectedSubject.name}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentView('lessons')}
        />
      );
    } else if (selectedSubjectId === 'chuot') {
      ExerciseComponent = (
        <MouseExercise
          lesson={selectedLesson}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentView('lessons')}
        />
      );
    } else if (selectedSubjectId === 'thuat-toan') {
      ExerciseComponent = (
        <AlgorithmExercise
          lesson={selectedLesson}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentView('lessons')}
        />
      );
    } else if (
      selectedSubjectId === 'word' ||
      selectedSubjectId === 'excel' ||
      selectedSubjectId === 'powerpoint'
    ) {
      ExerciseComponent = (
        <OfficeSimulator
          lesson={selectedLesson}
          subjectId={selectedSubjectId}
          subjectEmoji={selectedSubject.emoji}
          subjectName={selectedSubject.name}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentView('lessons')}
        />
      );
    } else {
      ExerciseComponent = (
        <QuizExercise
          lesson={selectedLesson}
          subjectId={selectedSubjectId as SubjectId}
          subjectEmoji={selectedSubject.emoji}
          subjectName={selectedSubject.name}
          onComplete={handleExerciseComplete}
          onBack={() => setCurrentView('lessons')}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Học sinh: {name}</span>
            <span>·</span>
            <span>Lớp {classCode}</span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <button
              onClick={toggleSound}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
            </button>
          </div>
        </div>

        {ExerciseComponent}
      </div>
    );
  }

  // LESSONS LIST VIEW
  if (currentView === 'lessons' && selectedSubject) {
    return (
      <div className="space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentView('subjects')}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về danh sách môn</span>
          </button>

          <div className="flex items-center gap-2">
            <ThemeToggleButton />
            <button
              onClick={toggleSound}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-500" />}
            </button>
          </div>
        </div>

        {/* Subject Header */}
        <div className={`p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs backdrop-blur-md dark:bg-slate-900/85 ${selectedSubject.lightBg}`}>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-3xl shrink-0">
              {selectedSubject.emoji}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                {selectedSubject.meta} · Dành cho {selectedSubject.gradeLevel}
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{selectedSubject.name}</h1>

              <div className="mt-3 space-y-1">
                {selectedSubject.objectives.map((obj, i) => (
                  <div key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>

              {/* Grade Switcher Tabs in Subject Header */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Khối lớp SGK:
                </span>
                {([3, 4, 5] as const).map(g => (
                  <button
                    key={g}
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setSelectedGrade(g);
                      setSelectedLevel('all');
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedGrade === g
                        ? g === 3
                          ? 'bg-blue-600 text-white shadow-xs'
                          : g === 4
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{g === 3 ? '📘 Lớp 3' : g === 4 ? '📗 Lớp 4' : '📙 Lớp 5'}</span>
                    {detectedGrade === g && (
                      <span className="text-[10px] px-1 rounded-sm bg-white/25 text-white font-medium">
                        (Lớp em)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Level Filter Tabs, Done/Todo Filter & Search Bar */}
        {(() => {
          const maxLevel = currentLessons.reduce((max, l) => Math.max(max, l.level), 1);
          const levelsList = Array.from({ length: maxLevel }, (_, i) => i + 1);

          const isLessonDone = (lessonId: number) => {
            const key = `${selectedSubjectId}-${lessonId}`;
            return completedLessonIds.includes(key) || lessonStatsMap.has(key);
          };

          const doneCountInSubject = currentLessons.filter(l => isLessonDone(l.id)).length;
          const todoCountInSubject = currentLessons.length - doneCountInSubject;

          const filteredLessons = currentLessons.filter(lesson => {
            const matchLevel = selectedLevel === 'all' || lesson.level === selectedLevel;
            const done = isLessonDone(lesson.id);
            const matchStatus =
              statusFilter === 'all' ||
              (statusFilter === 'done' && done) ||
              (statusFilter === 'todo' && !done);
            const matchSearch =
              !searchQuery.trim() ||
              lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              lesson.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchLevel && matchStatus && matchSearch;
          });

          return (
            <div className="space-y-4">
              {/* Level Selector & Status Filter Pills */}
              <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Trạng thái bài tập:
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                      <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === 'all'
                            ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-2xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        Tất cả ({currentLessons.length})
                      </button>
                      <button
                        onClick={() => setStatusFilter('todo')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === 'todo'
                            ? 'bg-amber-500 text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        ⏳ Chưa làm ({todoCountInSubject})
                      </button>
                      <button
                        onClick={() => setStatusFilter('done')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === 'done'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        ✅ Đã làm xong ({doneCountInSubject})
                      </button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative max-w-xs w-full">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" />
                    <input
                      type="text"
                      placeholder="Tìm bài học theo tên..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Level Pills Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-thin">
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedLevel === 'all'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{selectedSubjectId === 'sgk' ? `Tất cả 16 bài SGK Lớp ${selectedGrade}` : 'Tất cả các cấp'}</span>
                    <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${selectedLevel === 'all' ? 'bg-blue-800/80 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                      {doneCountInSubject}/{currentLessons.length} xong
                    </span>
                  </button>

                  {levelsList.map(lvl => {
                    const countInLevel = currentLessons.filter(l => l.level === lvl).length;
                    const completedInLevel = currentLessons.filter(l => l.level === lvl && isLessonDone(l.id)).length;
                    const isAllDone = countInLevel > 0 && completedInLevel === countInLevel;
                    const lvlLabel = selectedSubjectId === 'sgk' ? `Chủ đề ${lvl}` : `Cấp ${lvl}`;

                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          selectedLevel === lvl
                            ? 'bg-blue-600 text-white shadow-xs'
                            : isAllDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {isAllDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        <span>{lvlLabel}</span>
                        <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${selectedLevel === lvl ? 'bg-blue-800/80 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'}`}>
                          {completedInLevel}/{countInLevel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 px-1 flex-wrap gap-2">
                <span>
                  Đang hiển thị <strong>{filteredLessons.length}</strong> bài học · Đã hoàn thành{' '}
                  <strong className="text-emerald-600 dark:text-emerald-400">{doneCountInSubject}</strong> bài · Chưa làm{' '}
                  <strong className="text-amber-600 dark:text-amber-400">{todoCountInSubject}</strong> bài
                </span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                  Bài làm xong sẽ tự động đánh dấu Done ✅ kèm điểm số cao nhất của em
                </span>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLessons.map(lesson => {
                  const lessonKey = `${selectedSubjectId}-${lesson.id}`;
                  const stats = lessonStatsMap.get(lessonKey);
                  const isCompleted = completedLessonIds.includes(lessonKey) || !!stats;
                  const bestScore = stats ? stats.bestScore : 100;
                  const bestAccuracy = stats ? stats.bestAccuracy : 100;
                  const starsCount = stats ? stats.stars : 3;
                  const isInteractive = ['go', 'go-tv', 'chuot', 'thuat-toan', 'word', 'excel', 'powerpoint'].includes(selectedSubjectId || '');

                  return (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-3xl border shadow-xs backdrop-blur-md transition-all flex flex-col justify-between space-y-4 ${
                        isCompleted
                          ? 'bg-emerald-50/30 dark:bg-emerald-950/25 border-emerald-300 dark:border-emerald-800/80 hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-md'
                          : 'bg-white/85 dark:bg-slate-900/85 border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-md dark:hover:shadow-blue-950/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {selectedSubjectId === 'sgk' ? (
                              <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-md text-[11px] font-bold border border-indigo-200 dark:border-indigo-800">
                                Chủ đề {lesson.level} · Tin học {selectedGrade}
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 rounded-md text-[11px] font-bold border border-blue-200 dark:border-blue-800">
                                Cấp {lesson.level} · Bài {lesson.id}
                              </span>
                            )}
                            <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-300 rounded-md text-[11px] font-bold border border-teal-200 dark:border-teal-800 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                              {lesson.questions?.length || 5} câu hỏi SGK
                            </span>
                          </div>

                          {isCompleted ? (
                            <div className="flex items-center gap-1.5">
                              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-black shadow-2xs flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                                <span>Đã làm xong · {bestScore} điểm</span>
                              </span>
                            </div>
                          ) : (
                            <span className="px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 rounded-lg text-[11px] font-bold border border-amber-200 dark:border-amber-800">
                              ⏳ Chưa làm
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug flex items-start gap-2">
                          {isCompleted && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          <span>{lesson.title}</span>
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">{lesson.desc}</p>

                        {/* Score & Accuracy Summary Row for Completed Lesson */}
                        {isCompleted && (
                          <div className="mt-3 p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-emerald-800">
                                Điểm cao nhất: <strong className="text-sm font-black">{bestScore}/100</strong>
                              </span>
                              <span className="text-slate-300">|</span>
                              <span className="text-slate-600 font-medium">
                                Chính xác: <strong>{bestAccuracy}%</strong>
                              </span>
                            </div>
                            <span className="text-amber-500 text-xs font-bold">
                              {'⭐'.repeat(Math.max(1, starsCount))}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons: Dual mode for practical + quiz */}
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                        {isInteractive ? (
                          <>
                            <button
                              onClick={() => handleSelectLesson(lesson, 'interactive')}
                              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                                isCompleted
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                            >
                              <Gamepad2 className="w-3.5 h-3.5" />
                              <span>{isCompleted ? `✓ Thực hành lại (${bestScore}đ)` : '🎮 Thực hành'}</span>
                            </button>

                            <button
                              onClick={() => handleSelectLesson(lesson, 'quiz')}
                              className="flex-1 py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5 text-teal-600" />
                              <span>📝 Trắc nghiệm ({lesson.questions?.length || 4} câu)</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleSelectLesson(lesson, 'quiz')}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                              isCompleted
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-teal-600 hover:bg-teal-700 text-white'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                            <span>
                              {isCompleted
                                ? `Đã hoàn thành (${bestScore} điểm) · Làm lại trắc nghiệm`
                                : `Bắt đầu làm ${lesson.questions?.length || 5} câu hỏi trắc nghiệm`}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredLessons.length === 0 && (
                <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center text-slate-500 text-xs">
                  Không tìm thấy bài học nào phù hợp với bộ lọc.
                </div>
              )}
            </div>
          );
        })()}
      </div>
    );
  }

  // DEFAULT VIEW: SUBJECTS GRID ASSIGNED TO THIS CLASS
  return (
    <div className="space-y-6">


      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-blue-100 uppercase tracking-wider mb-2">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-300" />
                <span>Chương trình Kết Nối Tri Thức · Lớp {classCode}</span>
              </div>
              <span className="hidden sm:inline">·</span>
              {/* Cloud Sync Status Chip */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-xs text-white border border-white/30">
                <Cloud className={`w-3.5 h-3.5 ${isCloudSyncing ? 'text-amber-300 animate-pulse' : 'text-emerald-300'}`} />
                <span>{isCloudSyncing ? 'Đang đồng bộ Đám mây...' : 'Đám mây: Lưu trên mọi máy'}</span>
                <button
                  type="button"
                  onClick={syncWithCloud}
                  disabled={isCloudSyncing}
                  className="hover:text-amber-300 transition-colors p-0.5"
                  title="Nhấn để kiểm tra và tải điểm mới nhất từ Đám mây"
                >
                  <RefreshCw className={`w-3 h-3 ${isCloudSyncing ? 'animate-spin text-amber-300' : ''}`} />
                </button>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Chào mừng em {name}! 👧👦
            </h1>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Tài khoản học sinh: <strong>{session.studentCode ? `${session.studentCode} · ` : ''}{name}</strong> (Lớp <strong>{classCode}</strong> · Mã PIN cá nhân: <strong className="font-mono">{pin}</strong>).
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setActiveArcadeGame('space-typing')}
              className="px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 bg-sky-400 hover:bg-sky-300 text-slate-950 shadow-sm whitespace-nowrap shrink-0"
              title="Mở Đấu Trường 3 Trò Chơi Tin Học Tương Tác"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Chơi Game Tin Học 🎮</span>
            </button>

            <button
              onClick={() => setShowAchievementShowcase(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm whitespace-nowrap shrink-0"
              title="Xem Kho Huy Hiệu & Vinh Danh 10 Môn Học"
            >
              <Trophy className="w-4 h-4" />
              <span>Kho Huy Hiệu ({unlockedAchievementsCount}/{evaluatedAchievements.length})</span>
            </button>

            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                showLeaderboard ? 'bg-amber-400 text-slate-900 shadow-sm' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title="Bảng vàng vinh danh tích lũy Sao của lớp từ Firestore"
            >
              <Medal className="w-4 h-4 text-amber-300" />
              <span>{showLeaderboard ? 'Ẩn Bảng Vàng' : 'Bảng Vàng Lớp ⭐'}</span>
            </button>

            <button
              onClick={() => setShowProgressDashboard(!showProgressDashboard)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                showProgressDashboard ? 'bg-amber-400 text-slate-900 shadow-sm' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title="Bật/Tắt Bảng tiến độ tròn 10 môn Recharts"
            >
              <PieChartIcon className="w-3.5 h-3.5" />
              <span>{showProgressDashboard ? 'Ẩn Biểu Đồ' : 'Bảng Tiến Độ 📊'}</span>
            </button>

            <button
              onClick={() => setShowRobotMascot(!showRobotMascot)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                showRobotMascot ? 'bg-amber-400 text-slate-900 shadow-sm' : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              title="Bật/Tắt bạn Robot 3D đồng hành"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>{showRobotMascot ? 'Ẩn Robot 3D' : 'Bạn Robot 3D'}</span>
            </button>

            <button
              onClick={toggleSound}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-rose-500/90 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Note / Task info from teacher */}
        {currentAssignment.note && availableSubjects.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20 text-xs text-blue-100 flex items-center gap-2">
            <span className="font-bold text-amber-300">📌 Lời dặn của thầy/cô:</span>
            <span>{currentAssignment.note}</span>
          </div>
        )}
      </div>

      {/* Classroom Leaderboard from live Firestore */}
      {showLeaderboard && (
        <ClassroomLeaderboard
          classCode={classCode}
          currentStudentName={name}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* Visual Recharts Progress Dashboard */}
      {showProgressDashboard && (
        <StudentProgressChart
          completedLessonIds={completedLessonIds}
          assignedSubjects={availableSubjects}
          studentName={name}
          classCode={classCode}
          onSelectSubject={handleSelectSubject}
          onOpenAchievements={() => setShowAchievementShowcase(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onClose={() => setShowProgressDashboard(false)}
        />
      )}

      {/* 3D Robot Cheer Companion Card */}
      {showRobotMascot && (
        <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-teal-50/90 p-6 rounded-3xl border border-blue-200/80 shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-bold border border-blue-200 shadow-2xs">
              <span>🤖 Bạn Đồng Hành Học Tập</span>
            </div>
            <h3 className="text-xl font-black text-slate-900">
              Chào em {name}! Cùng chinh phục các thử thách Tin học nhé!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Em đã hoàn thành <strong>{completedLessonIds.length}</strong> bài tập. Hãy nhấp chuột vào chú Robot bên cạnh để xem bạn ấy vẫy tay chào em và đổi màu sắc nhé!
            </p>
          </div>
          <div className="md:col-span-5 max-w-sm mx-auto w-full">
            <HeroRobotCanvas />
          </div>
        </div>
      )}

      {/* Progress & Badges Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-xs">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400 animate-pulse-subtle" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Tiến độ bài học đã hoàn thành</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Đã xong <strong>{completedLessonIds.length}</strong> bài tập thực hành
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowProgressDashboard(!showProgressDashboard)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>{showProgressDashboard ? 'Thu gọn biểu đồ' : 'Xem biểu đồ tròn'}</span>
            {showProgressDashboard ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Badges Collection Showcase */}
        <div
          onClick={() => setShowAchievementShowcase(true)}
          className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl shadow-2xs">
                🏆
              </div>
              <div>
                <div className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                  <span>Hệ Thống Huy Hiệu Tin Học</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold">
                    {unlockedAchievementsCount}/{evaluatedAchievements.length} Đã Đạt
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {unlockedAchievementsCount > 0
                    ? `Em đã mở khóa ${unlockedAchievementsCount} danh hiệu vinh quang!`
                    : 'Hoàn thành bài tập để mở khóa huy hiệu 10 môn học'}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAchievementShowcase(true);
              }}
              className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900 px-3 py-1.5 rounded-full border border-amber-300 dark:border-amber-700 transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Mở Kho Huy Hiệu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Miniature Badges Row */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
            {evaluatedAchievements.slice(0, 8).map(item => (
              <div
                key={item.achievement.id}
                title={`${item.achievement.title} (${item.isUnlocked ? 'Đã đạt' : 'Chưa đạt'})`}
                className={`relative w-9 h-9 rounded-2xl flex items-center justify-center text-base border transition-all shrink-0 ${
                  item.isUnlocked
                    ? 'bg-amber-50 dark:bg-amber-950/80 border-amber-300 dark:border-amber-700 shadow-2xs scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 grayscale opacity-45'
                }`}
              >
                <span>{item.achievement.icon}</span>
                {item.isUnlocked && (
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[8px] text-white font-bold">
                    ✓
                  </span>
                )}
              </div>
            ))}
            <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 pl-1 shrink-0">
              +{Math.max(0, evaluatedAchievements.length - 8)} danh hiệu...
            </div>
          </div>
        </div>
      </div>

      {/* Grade Switcher Banner on Student Dashboard */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 dark:from-slate-900/90 dark:via-indigo-950/40 dark:to-slate-900/90 border border-indigo-200/80 dark:border-indigo-800 p-5 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
            📚
          </div>
          <div>
            <div className="text-xs font-black text-indigo-950 dark:text-indigo-200 uppercase tracking-wider flex items-center gap-2">
              <span>Chương trình SGK Tin học Kết Nối Tri Thức</span>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-200/80 dark:bg-indigo-900/80 text-indigo-900 dark:text-indigo-200 font-black">
                BGD 2018
              </span>
            </div>
            <div className="text-xs text-indigo-800 dark:text-indigo-300 mt-1">
              Đang chọn chương trình & câu hỏi: <strong className="font-black text-indigo-950 dark:text-white text-sm">Lớp {selectedGrade}</strong> (Khối lớp {classCode} của em)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Đổi khối lớp:</span>
          {([3, 4, 5] as const).map(g => (
            <button
              key={g}
              onClick={() => {
                soundService.playKeyCorrect();
                setSelectedGrade(g);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedGrade === g
                  ? g === 3
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                    : g === 4
                    ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                    : 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{g === 3 ? '📘 Lớp 3' : g === 4 ? '📗 Lớp 4' : '📙 Lớp 5'}</span>
              {detectedGrade === g && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/25 text-white font-semibold">
                  Lớp của em
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Educational Arcade Games Section on Student Dashboard */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4" />
              <span>Góc Trò Chơi Rèn Phản Xạ · Tích Lũy Điểm & Huy Hiệu</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              Đấu Trường Trò Chơi Tin Học (3 Mini-Game Tương Tác)
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Hoàn thành màn chơi để cộng điểm vào Bảng Vàng Lớp {classCode}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCADE_GAMES_CATALOG.map((game, idx) => (
            <div
              key={game.id}
              onClick={() => setActiveArcadeGame(game.id)}
              className="bg-white/95 dark:bg-slate-900/95 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  0{idx + 1} · {game.subtitle}
                </div>
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {game.objective}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Vào chơi ngay (Cấp Lớp {selectedGrade})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Subjects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Các Chủ Đề Bài Tập Được Giao ({availableSubjects.length} môn)
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Câu hỏi & bài tập theo chuẩn SGK Lớp {selectedGrade}
          </span>
        </div>

        {availableSubjects.length === 0 ? (
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-10 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center text-2xl mx-auto">
              📭
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Hiện chưa có bài tập nào được giao cho Lớp {classCode}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Thầy/cô chưa giao bài tập hoặc đã thu hồi bài tập của lớp. Khi thầy/cô giao bài tập mới, danh sách các môn học sẽ tự động hiển thị tại đây.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={syncWithCloud}
                disabled={isCloudSyncing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white shadow-xs transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                <span>{isCloudSyncing ? 'Đang kiểm tra...' : 'Kiểm tra bài tập mới'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {availableSubjects.map(sId => {
              const subject = SUBJECTS_MAP[sId];
              if (!subject) return null;

              const subjectLessons = getLessonsForGrade(sId, selectedGrade);
              const totalInSub = subjectLessons.length;
              const completedInSub = subjectLessons.filter(
                l => completedLessonIds.includes(`${sId}-${l.id}`) || lessonStatsMap.has(`${sId}-${l.id}`)
              ).length;
              const subResults = studentResults.filter(r => r.subjectId === sId);
              const avgSubScore =
                subResults.length > 0
                  ? Math.round(subResults.reduce((acc, r) => acc + r.score, 0) / subResults.length)
                  : null;
              const pctDone = totalInSub > 0 ? Math.round((completedInSub / totalInSub) * 100) : 0;

              return (
                <div
                  key={sId}
                  onClick={() => handleSelectSubject(sId)}
                  className={`bg-white/85 dark:bg-slate-900/85 backdrop-blur-md p-6 rounded-3xl border shadow-xs hover:border-blue-400 dark:hover:border-blue-400 hover:shadow-lg dark:hover:shadow-blue-950/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                    completedInSub > 0 ? 'border-emerald-200/90 dark:border-emerald-900/60' : 'border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-3xl transition-colors">
                        {subject.emoji}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-[11px] font-bold">
                          {subject.meta}
                        </span>
                        {completedInSub > 0 ? (
                          <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-full text-[11px] font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>Đã làm {completedInSub}/{totalInSub} bài</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-full text-[10px] font-bold">
                            Chưa làm (0/{totalInSub})
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {subject.name}
                    </h3>

                    {/* Progress & Average Score Bar */}
                    <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-slate-600 dark:text-slate-300">Tiến độ: {pctDone}%</span>
                        {avgSubScore !== null && (
                          <span className="text-emerald-700 dark:text-emerald-300">Điểm TB: {avgSubScore} đ</span>
                        )}
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${pctDone}%` }}
                        />
                      </div>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {subject.objectives.slice(0, 2).map((obj, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span className="line-clamp-2">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>{completedInSub > 0 ? 'Tiếp tục làm bài' : 'Bắt đầu làm bài'}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Achievement Showcase Modal */}
      {showAchievementShowcase && (
        <AchievementShowcaseModal
          studentName={name}
          classCode={classCode}
          completedLessonIds={completedLessonIds}
          results={studentResults}
          onClose={() => setShowAchievementShowcase(false)}
          onSelectSubject={(subjectId) => {
            setShowAchievementShowcase(false);
            handleSelectSubject(subjectId);
          }}
        />
      )}

      {/* Real-time Badge Unlock Celebration */}
      {newlyUnlockedBadges.length > 0 && (
        <BadgeUnlockCelebration
          unlockedAchievements={newlyUnlockedBadges}
          onClose={() => setNewlyUnlockedBadges([])}
          onViewShowcase={() => {
            setNewlyUnlockedBadges([]);
            setShowAchievementShowcase(true);
          }}
        />
      )}
    </div>
  );
};
