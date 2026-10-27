import React, { useState } from 'react';
import { Lesson, QuizQuestion, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ThemeToggleButton } from '../common/ThemeToggleButton';
import { ArrowLeft, RotateCcw, Award, CheckCircle2, XCircle, AlertCircle, HelpCircle, Star } from 'lucide-react';

interface QuizExerciseProps {
  lesson: Lesson;
  subjectId: SubjectId;
  subjectEmoji: string;
  subjectName: string;
  grade?: 3 | 4 | 5;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

export const QuizExercise: React.FC<QuizExerciseProps> = ({
  lesson,
  subjectId,
  subjectEmoji,
  subjectName,
  grade = 3,
  onComplete,
  onBack
}) => {
  const questions: QuizQuestion[] = lesson.questions || [
    {
      id: 1,
      question: 'Thiết bị nào sau đây dùng để nhập dữ liệu chữ và số vào máy tính?',
      options: ['Bàn phím máy tính', 'Màn hình', 'Loa âm thanh', 'Máy in'],
      correctIndex: 0,
      explanation: 'Bàn phím là thiết bị nhập chính gồm các phím chữ cái, chữ số và phím chức năng.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      soundService.playKeyCorrect();
      setCorrectCount(c => c + 1);
    } else {
      soundService.playKeyError();
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundService.playSuccessCelebration();
      const finalAccuracy = Math.round((correctCount / questions.length) * 100);
      onComplete(finalAccuracy, finalAccuracy, 40);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const accuracy = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <button
            onClick={restartQuiz}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm lại từ đầu
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider border ${
                grade === 3
                  ? 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                  : grade === 4
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
              }`}>
                {grade === 3 ? '📘 SGK Tin học 3' : grade === 4 ? '📗 SGK Tin học 4' : '📙 SGK Tin học 5'} · Kết Nối Tri Thức
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {subjectEmoji} {subjectName} · Cấp {lesson.level} · Bài {lesson.id}
              </span>
              {currentQ.topicCode && (
                <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-md text-[10px] font-bold">
                  Chủ đề {currentQ.topicCode}
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{lesson.desc}</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Tiến độ câu hỏi</span>
            <span className="text-lg font-black text-teal-600 dark:text-teal-400 tabular-nums">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* 5-Question Progress Pill Dots */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto pb-1">
          {questions.map((_, qIdx) => {
            const isCurrent = qIdx === currentIndex;
            const isPast = qIdx < currentIndex;
            return (
              <div
                key={qIdx}
                className={`flex-1 min-w-[28px] h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-teal-600 text-white ring-2 ring-teal-300 dark:ring-teal-500 shadow-xs'
                    : isPast
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}
                title={`Câu hỏi ${qIdx + 1}`}
              >
                {qIdx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Question Card */}
      {!isFinished && (
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
              {currentIndex + 1}
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-teal-50/40 dark:hover:bg-slate-750';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold ring-2 ring-emerald-300 dark:ring-emerald-700';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/80 border-rose-400 text-rose-950 dark:text-rose-200 font-semibold ring-2 ring-rose-200 dark:ring-rose-800';
                } else {
                  btnStyle = 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-xl border-2 text-left text-sm transition-all flex items-center gap-3.5 ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isAnswered && isSelected
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed animate-pulse-subtle ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Chính xác! Em làm rất tốt!
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Chưa chính xác, cùng xem giải thích nhé:
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={nextQuestion}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
              >
                {currentIndex + 1 < questions.length ? 'Câu tiếp theo →' : 'Xem kết quả bài làm'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Finished Celebration Modal */}
      {isFinished && (
        <>
          <ConfettiEffect durationMs={4500} />
          <div className="p-8 bg-gradient-to-br from-teal-50 via-emerald-50 to-white dark:from-slate-900 dark:via-teal-950/60 dark:to-slate-900 rounded-3xl border-2 border-teal-300 dark:border-teal-700 shadow-xl text-center animate-bounce-gentle backdrop-blur-xl">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Em đã hoàn thành bài trắc nghiệm tình huống!</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Số câu trả lời đúng: <strong className="text-teal-700 dark:text-teal-400 font-bold">{correctCount} / {questions.length}</strong> (Độ chính xác {accuracy}%)
            </p>
            <div className="flex justify-center gap-1.5 my-4">
              {[1, 2, 3].map(s => (
                <Star
                  key={s}
                  className={`w-7 h-7 ${s <= Math.ceil((correctCount / questions.length) * 3) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'}`}
                />
              ))}
            </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
            >
              Luyện lại bài này
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2.5 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Tiếp tục bài kế tiếp
            </button>
          </div>
        </div>
      </>
    )}
    </div>
  );
};
