import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Lesson, StudentSession, SubjectId, ExerciseResult, Achievement } from '../types';
import { SUBJECTS_MAP, SUBJECT_LESSONS } from '../data/curriculum';
import { TypingExercise } from './exercises/TypingExercise';
import { MouseExercise } from './exercises/MouseExercise';
import { AlgorithmExercise } from './exercises/AlgorithmExercise';
import { OfficeSimulator } from './exercises/OfficeSimulator';
import { QuizExercise } from './exercises/QuizExercise';
import { saveResult, getResults, fetchStudentResultsFromCloud } from '../services/storage';
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

interface StudentDashboardProps {
  session: StudentSession;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ session, onLogout }) => {
  const { name, classCode, pin, assignment } = session;

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
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);

  // Sync with Cloud Firestore on mount or on-demand
  const syncWithCloud = useCallback(async () => {
    setIsCloudSyncing(true);
    try {
      const [cloudRes, cloudAch] = await Promise.all([
        fetchStudentResultsFromCloud(name, classCode),
        fetchStudentAchievementsFromCloud(name, classCode)
      ]);

      if (cloudRes && cloudRes.length > 0) {
        setStudentResults(cloudRes);
        const lessonKeys = Array.from(new Set(cloudRes.map(r => `${r.subjectId}-${r.lessonId}`)));
        setCompletedLessonIds(prev => Array.from(new Set([...prev, ...lessonKeys])));
      }
      setCloudSynced(true);
    } catch (err) {
      console.warn('[Dashboard] Could not sync with cloud:', err);
    } finally {
      setIsCloudSyncing(false);
    }
  }, [name, classCode]);

  useEffect(() => {
    syncWithCloud();
  }, [syncWithCloud]);

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

    // Persist result
    const newResult: ExerciseResult = {
      id: `res-${Date.now()}`,
      studentName: name,
      classCode,
      pin,
      subjectId: selectedSubjectId,
      lessonId: selectedLesson.id,
      lessonTitle: selectedLesson.title,
      score,
      accuracy,
      timeSpentSeconds: timeSpent,
      completedAt: new Date().toISOString()
    };

    saveResult(newResult);
    const updatedResults = [newResult, ...studentResults];
    setStudentResults(updatedResults);

    // Evaluate for newly unlocked digital badges
    const newUnlocks = checkNewAchievements(name, classCode, nextCompleted, updatedResults);
    if (newUnlocks.length > 0) {
      setNewlyUnlockedBadges(newUnlocks);
    }
  };

  const selectedSubject = selectedSubjectId ? SUBJECTS_MAP[selectedSubjectId] : null;
  const currentLessons = selectedSubjectId ? SUBJECT_LESSONS[selectedSubjectId] || [] : [];

  // EXERCISE VIEW
  if (currentView === 'exercise' && selectedSubject && selectedLesson) {
    let ExerciseComponent = null;

    // If student selected quiz mode OR if this is a theory/situation module (ic3, cdso, ai)
    const isQuizMode =
      exerciseMode === 'quiz' ||
      ['ic3', 'cdso', 'ai'].includes(selectedSubjectId || '');

    if (isQuizMode) {
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
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>Học sinh: {name}</span>
            <span>·</span>
            <span>Lớp {classCode}</span>
          </div>

          <button
            onClick={toggleSound}
            className="p-2 text-slate-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
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
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về danh sách môn</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 text-slate-600 hover:bg-white rounded-lg border border-slate-200 transition-colors"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>

        {/* Subject Header */}
        <div className={`p-8 rounded-3xl border border-slate-200/80 shadow-xs ${selectedSubject.lightBg}`}>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl shrink-0">
              {selectedSubject.emoji}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                {selectedSubject.meta} · Dành cho {selectedSubject.gradeLevel}
              </div>
              <h1 className="text-2xl font-black text-slate-900">{selectedSubject.name}</h1>

              <div className="mt-3 space-y-1">
                {selectedSubject.objectives.map((obj, i) => (
                  <div key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{obj}</span>
                  </div>
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
              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Filter className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Trạng thái bài tập:
                    </span>
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === 'all'
                            ? 'bg-white text-blue-700 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Tất cả ({currentLessons.length})
                      </button>
                      <button
                        onClick={() => setStatusFilter('todo')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === 'todo'
                            ? 'bg-amber-500 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        ⏳ Chưa làm ({todoCountInSubject})
                      </button>
                      <button
                        onClick={() => setStatusFilter('done')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          statusFilter === 'done'
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        ✅ Đã làm xong ({doneCountInSubject})
                      </button>
                    </div>
                  </div>

                  {/* Search Input */}
                  <div className="relative max-w-xs w-full">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Tìm bài học theo tên..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>Tất cả các cấp</span>
                    <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${selectedLevel === 'all' ? 'bg-blue-800/80 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      {doneCountInSubject}/{currentLessons.length} xong
                    </span>
                  </button>

                  {levelsList.map(lvl => {
                    const countInLevel = currentLessons.filter(l => l.level === lvl).length;
                    const completedInLevel = currentLessons.filter(l => l.level === lvl && isLessonDone(l.id)).length;
                    const isAllDone = countInLevel > 0 && completedInLevel === countInLevel;

                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          selectedLevel === lvl
                            ? 'bg-blue-600 text-white shadow-xs'
                            : isAllDone
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isAllDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        <span>Cấp {lvl}</span>
                        <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${selectedLevel === lvl ? 'bg-blue-800/80 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {completedInLevel}/{countInLevel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs text-slate-600 px-1 flex-wrap gap-2">
                <span>
                  Đang hiển thị <strong>{filteredLessons.length}</strong> bài học · Đã hoàn thành{' '}
                  <strong className="text-emerald-600">{doneCountInSubject}</strong> bài · Chưa làm{' '}
                  <strong className="text-amber-600">{todoCountInSubject}</strong> bài
                </span>
                <span className="text-[11px] text-blue-600 font-semibold">
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
                      className={`p-5 rounded-3xl border shadow-xs transition-all flex flex-col justify-between space-y-4 ${
                        isCompleted
                          ? 'bg-emerald-50/25 border-emerald-300 hover:border-emerald-400 hover:shadow-md'
                          : 'bg-white border-slate-200/80 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11px] font-bold border border-blue-200">
                              Cấp {lesson.level} · Bài {lesson.id}
                            </span>
                            <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md text-[11px] font-bold border border-teal-200 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-teal-600" />
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
                            <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-lg text-[11px] font-bold border border-amber-200">
                              ⏳ Chưa làm
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-base leading-snug flex items-start gap-2">
                          {isCompleted && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          <span>{lesson.title}</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{lesson.desc}</p>

                        {/* Score & Accuracy Summary Row for Completed Lesson */}
                        {isCompleted && (
                          <div className="mt-3 p-2.5 rounded-xl bg-white/90 border border-emerald-200 flex items-center justify-between text-xs">
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
    <div className="space-y-8">
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAchievementShowcase(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-yellow-950 shadow-sm"
              title="Xem Kho Huy Hiệu & Vinh Danh 10 Môn Học"
            >
              <Trophy className="w-4 h-4 fill-amber-700 text-amber-700" />
              <span>Kho Huy Hiệu ({unlockedAchievementsCount}/{evaluatedAchievements.length}) 🏆</span>
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
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Thoát</span>
            </button>
          </div>
        </div>

        {/* Note / Task info from teacher */}
        {assignment.note && (
          <div className="mt-4 pt-4 border-t border-white/20 text-xs text-blue-100 flex items-center gap-2">
            <span className="font-bold text-amber-300">📌 Lời dặn của thầy/cô:</span>
            <span>{assignment.note}</span>
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
          assignedSubjects={assignment.subjects}
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
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-xs">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400 animate-pulse-subtle" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Tiến độ bài học đã hoàn thành</div>
              <div className="text-[11px] text-slate-500">
                Đã xong <strong>{completedLessonIds.length}</strong> bài tập thực hành
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowProgressDashboard(!showProgressDashboard)}
            className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <PieChartIcon className="w-3.5 h-3.5" />
            <span>{showProgressDashboard ? 'Thu gọn biểu đồ' : 'Xem biểu đồ tròn'}</span>
            {showProgressDashboard ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Badges Collection Showcase */}
        <div
          onClick={() => setShowAchievementShowcase(true)}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center text-xl shadow-2xs">
                🏆
              </div>
              <div>
                <div className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <span>Hệ Thống Huy Hiệu Tin Học</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                    {unlockedAchievementsCount}/{evaluatedAchievements.length} Đã Đạt
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
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
              className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-full border border-amber-300 transition-colors flex items-center gap-1 shrink-0"
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
                    ? 'bg-amber-50 border-amber-300 shadow-2xs scale-105'
                    : 'bg-slate-100 border-slate-200 grayscale opacity-45'
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
            <div className="text-[11px] font-bold text-slate-400 pl-1 shrink-0">
              +{Math.max(0, evaluatedAchievements.length - 8)} danh hiệu...
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Subjects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-lg font-bold text-slate-900">
              Các Chủ Đề Luyện Tập Của Em ({assignment.subjects.length} môn)
            </h2>
          </div>
          <span className="text-xs text-slate-500">Nhấp vào môn học để bắt đầu luyện tập</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {assignment.subjects.map(sId => {
            const subject = SUBJECTS_MAP[sId];
            if (!subject) return null;

            const subjectLessons = SUBJECT_LESSONS[sId] || [];
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
                className={`bg-white p-6 rounded-3xl border shadow-xs hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                  completedInSub > 0 ? 'border-emerald-200/90' : 'border-slate-200/80'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-blue-50 border border-slate-100 flex items-center justify-center text-3xl transition-colors">
                      {subject.emoji}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold">
                        {subject.meta}
                      </span>
                      {completedInSub > 0 ? (
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Đã làm {completedInSub}/{totalInSub} bài</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-bold">
                          Chưa làm (0/{totalInSub})
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {subject.name}
                  </h3>

                  {/* Progress & Average Score Bar */}
                  <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-600">Tiến độ: {pctDone}%</span>
                      {avgSubScore !== null && (
                        <span className="text-emerald-700">Điểm TB: {avgSubScore} đ</span>
                      )}
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${pctDone}%` }}
                      />
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    {subject.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold shrink-0">✓</span>
                        <span className="line-clamp-2">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{completedInSub > 0 ? 'Tiếp tục làm bài' : 'Bắt đầu làm bài'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
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
