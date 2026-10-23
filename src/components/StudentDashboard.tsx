import React, { useState } from 'react';
import { Lesson, StudentSession, SubjectId } from '../types';
import { SUBJECTS_MAP, SUBJECT_LESSONS } from '../data/curriculum';
import { TypingExercise } from './exercises/TypingExercise';
import { MouseExercise } from './exercises/MouseExercise';
import { AlgorithmExercise } from './exercises/AlgorithmExercise';
import { OfficeSimulator } from './exercises/OfficeSimulator';
import { QuizExercise } from './exercises/QuizExercise';
import { saveResult } from '../services/storage';
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
  Filter
} from 'lucide-react';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [exerciseMode, setExerciseMode] = useState<'interactive' | 'quiz'>('interactive');
  const [isMuted, setIsMuted] = useState(soundService.getMuted());
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundService.setMuted(next);
  };

  const handleSelectSubject = (sId: SubjectId) => {
    soundService.playKeyCorrect();
    setSelectedSubjectId(sId);
    setSelectedLevel('all');
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
    if (!completedLessonIds.includes(key)) {
      setCompletedLessonIds(prev => [...prev, key]);
    }

    // Persist result
    saveResult({
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
    });
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

        {/* Level Filter Tabs & Search Bar */}
        {(() => {
          const maxLevel = currentLessons.reduce((max, l) => Math.max(max, l.level), 1);
          const levelsList = Array.from({ length: maxLevel }, (_, i) => i + 1);

          const filteredLessons = currentLessons.filter(lesson => {
            const matchLevel = selectedLevel === 'all' || lesson.level === selectedLevel;
            const matchSearch =
              !searchQuery.trim() ||
              lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              lesson.desc.toLowerCase().includes(searchQuery.toLowerCase());
            return matchLevel && matchSearch;
          });

          return (
            <div className="space-y-4">
              {/* Level Selector Pills */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Chọn Cấp độ học tập ({maxLevel} cấp · {currentLessons.length} bài)
                    </span>
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
                      {currentLessons.length}
                    </span>
                  </button>

                  {levelsList.map(lvl => {
                    const countInLevel = currentLessons.filter(l => l.level === lvl).length;
                    const completedInLevel = currentLessons.filter(l => l.level === lvl && completedLessonIds.includes(`${selectedSubjectId}-${l.id}`)).length;
                    const isAllDone = countInLevel > 0 && completedInLevel === countInLevel;

                    return (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          selectedLevel === lvl
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {isAllDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        <span>Cấp {lvl}</span>
                        <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${selectedLevel === lvl ? 'bg-blue-800/80 text-white' : 'bg-slate-200 text-slate-700'}`}>
                          {countInLevel} bài
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status Header */}
              <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                <span>
                  Đang hiển thị <strong>{filteredLessons.length}</strong> bài học{' '}
                  {selectedLevel !== 'all' ? `thuộc Cấp ${selectedLevel}` : `thuộc toàn bộ ${maxLevel} cấp`}
                </span>
                <span className="text-[11px] text-blue-600 font-semibold">
                  Mỗi bài gồm ít nhất 10 câu hỏi SGK Kết Nối Tri Thức
                </span>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLessons.map(lesson => {
                  const isCompleted = completedLessonIds.includes(`${selectedSubjectId}-${lesson.id}`);
                  const isInteractive = ['go', 'go-tv', 'chuot', 'thuat-toan', 'word', 'excel', 'powerpoint'].includes(selectedSubjectId || '');

                  return (
                    <div
                      key={lesson.id}
                      className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[11px] font-bold border border-blue-200">
                              Cấp {lesson.level} · Bài {lesson.id}
                            </span>
                            <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md text-[11px] font-bold border border-teal-200 flex items-center gap-1">
                              <FileText className="w-3 h-3 text-teal-600" />
                              {lesson.questions?.length || 10} câu hỏi SGK
                            </span>
                          </div>

                          {isCompleted && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Đã hoàn thành
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-slate-900 text-base leading-snug">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{lesson.desc}</p>
                      </div>

                      {/* Action Buttons: Dual mode for practical + quiz */}
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                        {isInteractive ? (
                          <>
                            <button
                              onClick={() => handleSelectLesson(lesson, 'interactive')}
                              className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                            >
                              <Gamepad2 className="w-3.5 h-3.5" />
                              <span>🎮 Thực hành</span>
                            </button>

                            <button
                              onClick={() => handleSelectLesson(lesson, 'quiz')}
                              className="flex-1 py-2 px-3 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5 text-teal-600" />
                              <span>📝 Trắc nghiệm 10 câu</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleSelectLesson(lesson, 'quiz')}
                            className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            <span>Bắt đầu làm 10 câu hỏi trắc nghiệm</span>
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
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-100 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>Chương trình Kết Nối Tri Thức · Lớp {classCode}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Chào mừng em {name}! 👧👦
            </h1>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              Em đã tham gia thành công lớp học bằng mã PIN <strong>{pin}</strong>. Bài tập được giao bởi thầy/cô <strong>{assignment.teacherName}</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
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

          <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            ✓ Trạng thái: Đang học tốt
          </div>
        </div>

        {/* Badges Collection */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <div>
              <span className="text-xs font-bold text-slate-800 block">Huy hiệu đạt được</span>
              <span className="text-[11px] text-slate-500">
                {completedLessonIds.length >= 3 ? 'Đã mở khóa 3 huy hiệu vinh danh!' : 'Hoàn thành thêm bài để mở khóa huy hiệu'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              title="Bàn tay vàng gõ phím"
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border ${
                completedLessonIds.some(id => id.startsWith('go'))
                  ? 'bg-blue-100 border-blue-300 shadow-xs scale-105'
                  : 'bg-slate-100 border-slate-200 grayscale opacity-40'
              }`}
            >
              ⌨️
            </span>
            <span
              title="Xạ thủ chuột siêu tốc"
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border ${
                completedLessonIds.some(id => id.startsWith('chuot'))
                  ? 'bg-amber-100 border-amber-300 shadow-xs scale-105'
                  : 'bg-slate-100 border-slate-200 grayscale opacity-40'
              }`}
            >
              🖱️
            </span>
            <span
              title="Nhà lập trình Robot nhí"
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border ${
                completedLessonIds.some(id => id.startsWith('thuat-toan'))
                  ? 'bg-purple-100 border-purple-300 shadow-xs scale-105'
                  : 'bg-slate-100 border-slate-200 grayscale opacity-40'
              }`}
            >
              🤖
            </span>
            <span
              title="Hiệp sĩ số an toàn"
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm border ${
                completedLessonIds.some(id => id.startsWith('cdso') || id.startsWith('ai'))
                  ? 'bg-teal-100 border-teal-300 shadow-xs scale-105'
                  : 'bg-slate-100 border-slate-200 grayscale opacity-40'
              }`}
            >
              🛡️
            </span>
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

            return (
              <div
                key={sId}
                onClick={() => handleSelectSubject(sId)}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-blue-50 border border-slate-100 flex items-center justify-center text-3xl transition-colors">
                      {subject.emoji}
                    </div>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-bold">
                      {subject.meta}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {subject.name}
                  </h3>

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
                  <span>Bắt đầu làm bài</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
