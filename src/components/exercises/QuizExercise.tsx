import React, { useState } from 'react';
import { Lesson, QuizQuestion, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ArrowLeft, RotateCcw, Award, CheckCircle2, XCircle, AlertCircle, HelpCircle, Star } from 'lucide-react';

interface QuizExerciseProps {
  lesson: Lesson;
  subjectId: SubjectId;
  subjectEmoji: string;
  subjectName: string;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

export const QuizExercise: React.FC<QuizExerciseProps> = ({
  lesson,
  subjectId,
  subjectEmoji,
  subjectName,
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
      onComplete(100, finalAccuracy, 40);
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
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <button
          onClick={restartQuiz}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Làm lại từ đầu
        </button>
      </div>

      {/* Lesson Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">
              {subjectEmoji} {subjectName} · Cấp {lesson.level} · Bài {lesson.id}
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">{lesson.title}</h1>
            <p className="text-sm text-slate-600 mt-1">{lesson.desc}</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 font-medium block">Tiến độ câu hỏi</span>
            <span className="text-lg font-black text-teal-700 tabular-nums">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* 10-Question Progress Pill Dots */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100 overflow-x-auto pb-1">
          {questions.map((_, qIdx) => {
            const isCurrent = qIdx === currentIndex;
            const isPast = qIdx < currentIndex;
            return (
              <div
                key={qIdx}
                className={`flex-1 min-w-[28px] h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  isCurrent
                    ? 'bg-teal-600 text-white ring-2 ring-teal-300 shadow-xs'
                    : isPast
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-400'
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
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center shrink-0 text-sm">
              {currentIndex + 1}
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-teal-400 hover:bg-teal-50/40';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-2 ring-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold ring-2 ring-rose-200';
                } else {
                  btnStyle = 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-60';
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
                        : 'bg-white text-slate-700 border-slate-300'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed animate-pulse-subtle ${
                selectedOption === currentQ.correctIndex
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                {selectedOption === currentQ.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Chính xác! Em làm rất tốt!
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-600" />
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
          <div className="p-8 bg-gradient-to-br from-teal-50 via-emerald-50 to-white rounded-3xl border-2 border-teal-300 shadow-xl text-center animate-bounce-gentle">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Em đã hoàn thành bài trắc nghiệm tình huống!</h2>
            <p className="text-sm text-slate-600 mt-1">
              Số câu trả lời đúng: <strong className="text-teal-700 font-bold">{correctCount} / {questions.length}</strong> (Độ chính xác {accuracy}%)
            </p>
            <div className="flex justify-center gap-1.5 my-4">
              {[1, 2, 3].map(s => (
                <Star
                  key={s}
                  className={`w-7 h-7 ${s <= Math.ceil((correctCount / questions.length) * 3) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                />
              ))}
            </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={restartQuiz}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
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
