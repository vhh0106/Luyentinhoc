import React, { useState, useMemo, useEffect } from 'react';
import { Lesson, QuizQuestion, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ThemeToggleButton } from '../common/ThemeToggleButton';
import { generatePersonalizedQuiz } from '../../services/questionRandomizer';
import {
  ArrowLeft,
  RotateCcw,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Star,
  Shuffle,
  Lock,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  ShieldCheck,
  HelpCircle,
  FileText,
  Clock
} from 'lucide-react';

interface QuizExerciseProps {
  lesson: Lesson;
  subjectId: SubjectId;
  subjectEmoji: string;
  subjectName: string;
  grade?: 3 | 4 | 5;
  studentName?: string;
  studentCode?: string;
  classCode?: string;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

export const QuizExercise: React.FC<QuizExerciseProps> = ({
  lesson,
  subjectId,
  subjectEmoji,
  subjectName,
  grade = 3,
  studentName = 'Học sinh',
  studentCode = '',
  classCode = '3A',
  onComplete,
  onBack
}) => {
  const [attempt, setAttempt] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Records student's selected option index for each question: { [questionIndex]: optionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'wrong'>('all');

  // Unique identifier for this student account
  const studentIdentifier = useMemo(() => {
    return `${classCode}_${studentCode || studentName}`.trim();
  }, [classCode, studentCode, studentName]);

  // Generate personalized test paper with unique questions and shuffled option choices
  const { questions, examCode } = useMemo(() => {
    return generatePersonalizedQuiz({
      lesson,
      subjectId,
      grade,
      studentIdentifier,
      attempt,
      targetCount: 5
    });
  }, [lesson, subjectId, grade, studentIdentifier, attempt]);

  // Reset timer & state when lesson changes or on new attempt
  useEffect(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setSecondsElapsed(0);
    setReviewFilter('all');
  }, [lesson.id, attempt]);

  // Timer while taking the test
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsElapsed(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = questions[currentIndex] || questions[0];
  const currentSelectedOption = userAnswers[currentIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const isAllAnswered = answeredCount >= questions.length;

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optIdx
    }));
    // Tactile gentle click sound without leaking right/wrong
    soundService.playTypingSound();
  };

  const handleSubmitQuiz = () => {
    if (isSubmitted) return;

    // Calculate score
    let correct = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    setIsSubmitted(true);
    soundService.playSuccessCelebration();

    const finalAccuracy = Math.round((correct / questions.length) * 100);
    onComplete(finalAccuracy, finalAccuracy, Math.max(15, secondsElapsed));
  };

  const handleRestartWithNewExam = () => {
    // Increment attempt to trigger generation of a new distinct test paper
    setAttempt(a => a + 1);
  };

  // Evaluation stats
  const correctCount = useMemo(() => {
    if (!isSubmitted) return 0;
    return questions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length;
  }, [isSubmitted, questions, userAnswers]);

  const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;

  // Filtered list for review mode
  const filteredReviewQuestions = useMemo(() => {
    return questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
      const isCorrect = userAnswers[idx] === q.correctIndex;
      if (reviewFilter === 'correct') return isCorrect;
      if (reviewFilter === 'wrong') return !isCorrect;
      return true;
    });
  }, [questions, userAnswers, reviewFilter]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m > 0 ? `${m}p ` : ''}${s}s`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          {!isSubmitted ? (
            <button
              onClick={handleRestartWithNewExam}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs cursor-pointer active:scale-95"
              title="Đổi mã đề thi mới dành riêng cho tài khoản"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đổi đề thi khác</span>
            </button>
          ) : (
            <button
              onClick={handleRestartWithNewExam}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm đề mới khác</span>
            </button>
          )}
        </div>
      </div>

      {/* Lesson Banner & Per-Account Test Credentials */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            {/* Meta Tags Bar */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider border ${
                grade === 3
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  : grade === 4
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
              }`}>
                {grade === 3 ? '📘 SGK Tin học 3' : grade === 4 ? '📗 SGK Tin học 4' : '📙 SGK Tin học 5'}
              </span>

              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {subjectEmoji} {subjectName} · Bài {lesson.id}
              </span>

              {/* Unique Exam Code */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-black bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                <FileText className="w-3 h-3 text-amber-600" />
                <span>{examCode}</span>
              </span>

              {/* Account Identifier Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <User className="w-3 h-3 text-blue-500" />
                <span>{studentName}{studentCode ? ` (${studentCode})` : ''}</span>
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {lesson.desc}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center md:flex-col items-end gap-2 md:gap-1 shrink-0">
            <div className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Thời gian: {formatTime(secondsElapsed)}</span>
            </div>
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Đã làm: <span className="font-mono text-blue-600 dark:text-blue-400 font-black">{answeredCount}</span>/{questions.length} câu
            </div>
          </div>
        </div>

        {/* Locked Feedback Mode Banner (During Test) */}
        {!isSubmitted ? (
          <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/60 to-amber-50/80 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-200/80 dark:bg-amber-900/80 text-amber-800 dark:text-amber-200 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">
                <strong>Chế độ Kiểm tra Cá nhân hóa:</strong> Khóa hiển thị đúng/sai để chống nhìn bài bạn. Đáp án và giải thích chi tiết sẽ mở ngay sau khi em nộp bài!
              </span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-amber-200/60 dark:bg-amber-900/60 text-[10px] font-black uppercase tracking-wider shrink-0">
              Chống sao chép
            </span>
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Đã mở khóa đáp án và lời giải chi tiết cho <strong>{examCode}</strong>. Em hãy xem lại các câu làm đúng và câu cần rút kinh nghiệm ở bên dưới nhé!
            </span>
          </div>
        )}

        {/* Question Pill Navigator */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1">
            Câu hỏi:
          </span>
          {questions.map((_, qIdx) => {
            const isCurrent = qIdx === currentIndex;
            const isAnswered = userAnswers[qIdx] !== undefined;
            const isCorrect = isSubmitted && userAnswers[qIdx] === questions[qIdx].correctIndex;
            const isWrong = isSubmitted && isAnswered && !isCorrect;

            let pillStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';

            if (isSubmitted) {
              if (isCorrect) {
                pillStyle = 'bg-emerald-500 text-white border-emerald-600 font-black';
              } else if (isWrong) {
                pillStyle = 'bg-rose-500 text-white border-rose-600 font-black';
              } else {
                pillStyle = 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300';
              }
            } else {
              if (isCurrent) {
                pillStyle = 'bg-indigo-600 text-white border-indigo-600 font-black ring-2 ring-indigo-300 dark:ring-indigo-800 scale-105';
              } else if (isAnswered) {
                pillStyle = 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 font-bold';
              }
            }

            return (
              <button
                key={qIdx}
                type="button"
                onClick={() => setCurrentIndex(qIdx)}
                className={`min-w-[34px] h-8 px-2 rounded-xl text-xs flex items-center justify-center border transition-all cursor-pointer ${pillStyle}`}
                title={`Chuyển tới Câu ${qIdx + 1} (${isAnswered ? 'Đã chọn đáp án' : 'Chưa trả lời'})`}
              >
                <span>{qIdx + 1}</span>
                {isSubmitted && isCorrect && <Check className="w-2.5 h-2.5 ml-0.5 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ACTIVE TEST TAKING VIEW (When not submitted yet) */}
      {!isSubmitted && currentQ && (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6 animate-in fade-in duration-200">
          {/* Question Text */}
          <div className="flex items-start gap-3.5">
            <span className="w-9 h-9 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-black flex items-center justify-center shrink-0 text-sm shadow-2xs">
              {currentIndex + 1}
            </span>
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Câu hỏi {currentIndex + 1} / {questions.length} · {examCode}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>
          </div>

          {/* Options Grid (Locked Right/Wrong Feedback) */}
          <div className="grid grid-cols-1 gap-3 pt-1">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = currentSelectedOption === idx;

              let btnStyle = 'bg-slate-50/90 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-slate-750';

              if (isSelected) {
                btnStyle = 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-600 dark:border-indigo-500 text-indigo-950 dark:text-white ring-2 ring-indigo-400/50 dark:ring-indigo-500/50 font-bold shadow-xs';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-xs sm:text-sm transition-all flex items-center gap-3.5 cursor-pointer active:scale-[0.99] ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-[10px]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Locked Notice & Navigation Controls */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left">
              {currentSelectedOption !== undefined ? (
                <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                  <span>✓ Em đã chọn đáp án câu này (Có thể chọn lại nếu muốn đổi)</span>
                </span>
              ) : (
                <span>Nhấp chọn một phương án A, B, C hoặc D để ghi nhận câu trả lời.</span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(i => i - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>
              )}

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(i => i + 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                    isAllAnswered
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white ring-2 ring-emerald-300'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  <span>Nộp bài & Xem kết quả</span>
                  <span>🎯</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FINAL SUBMITTED VIEW: Celebration Card + Full Answer Review & Detailed Explanations */}
      {isSubmitted && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <ConfettiEffect durationMs={4500} />

          {/* Celebration Score Summary Card */}
          <div className="p-8 bg-gradient-to-br from-indigo-50/90 via-white to-teal-50/80 dark:from-slate-900 dark:via-slate-850 dark:to-teal-950/40 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-400 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md text-3xl">
              🏆
            </div>

            <div>
              <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                Kết Quả Bài Kiểm Tra Cá Nhân Hóa · {examCode}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Chúc mừng {studentName} đã hoàn thành bài!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-lg mx-auto">
                Điểm số đã được ghi nhận vào hệ thống và đồng bộ tức thời lên Bảng Vàng Lớp {classCode}.
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Số câu đúng</div>
                <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5 font-mono">
                  {correctCount} / {questions.length}
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Độ chính xác</div>
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 font-mono">
                  {accuracy}%
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Thời gian</div>
                <div className="text-xl font-black text-slate-800 dark:text-slate-200 mt-0.5 font-mono">
                  {formatTime(secondsElapsed)}
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đánh giá Sao</div>
                <div className="flex items-center justify-center gap-1 mt-1 text-amber-400">
                  {[1, 2, 3].map(s => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= Math.ceil((correctCount / questions.length) * 3)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestartWithNewExam}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-indigo-500" />
                <span>Làm lại bài này (Đổi mã đề mới)</span>
              </button>
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Quay lại danh sách bài học</span>
              </button>
            </div>
          </div>

          {/* DETAILED ANSWER KEY & EXPLANATIONS REVIEW SECTION */}
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                  <Eye className="w-4 h-4" />
                  <span>Giải Mã Đáp Án & Lời Giải Chi Tiết</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Xem Lại Toàn Bộ Câu Hỏi Trong Đề ({examCode})
                </h3>
              </div>

              {/* Review Filter Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'all'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Tất cả ({questions.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('correct')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'correct'
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Đúng ({correctCount})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  Sai ({questions.length - correctCount})
                </button>
              </div>
            </div>

            {/* List of Review Questions */}
            <div className="space-y-6">
              {filteredReviewQuestions.map(({ q, idx }) => {
                const userChoiceIdx = userAnswers[idx];
                const isUserCorrect = userChoiceIdx === q.correctIndex;

                return (
                  <div
                    key={idx}
                    className={`p-6 rounded-2xl border space-y-4 transition-all ${
                      isUserCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-800/60'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-800/60'
                    }`}
                  >
                    {/* Question Header & Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                            isUserCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                          {q.question}
                        </h4>
                      </div>

                      <div className="shrink-0">
                        {isUserCorrect ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Chính xác</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Chưa đúng</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Options Breakdown */}
                    <div className="space-y-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const letter = String.fromCharCode(65 + optIdx);
                        const isChosenByStudent = userChoiceIdx === optIdx;
                        const isActualCorrect = optIdx === q.correctIndex;

                        let optBoxStyle = 'bg-white/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                        let badgeElement = null;

                        if (isActualCorrect) {
                          optBoxStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-300 dark:ring-emerald-800';
                          badgeElement = (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black shrink-0">
                              ✓ Đáp án đúng
                            </span>
                          );
                        } else if (isChosenByStudent && !isActualCorrect) {
                          optBoxStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-300 dark:ring-rose-800';
                          badgeElement = (
                            <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black shrink-0">
                              ✗ Lựa chọn của em
                            </span>
                          );
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${optBoxStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${
                                  isActualCorrect
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : isChosenByStudent
                                    ? 'bg-rose-600 text-white border-rose-600'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300'
                                }`}
                              >
                                {letter}
                              </span>
                              <span className="leading-relaxed">{opt}</span>
                            </div>
                            {badgeElement}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Pedagogical Explanation */}
                    {q.explanation && (
                      <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-slate-800/90 border border-amber-200 dark:border-slate-700 text-xs leading-relaxed text-slate-800 dark:text-slate-200 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-900 dark:text-amber-300 block mb-0.5">
                            Lời giải thích & Lời khuyên bài học:
                          </strong>
                          <span>{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
