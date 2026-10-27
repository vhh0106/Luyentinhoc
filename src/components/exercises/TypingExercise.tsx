import React, { useState, useEffect, useRef } from 'react';
import { Lesson, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ThemeToggleButton } from '../common/ThemeToggleButton';
import { getTelexKeysForChar, isVietnameseChar, getTelexExplanation } from '../../services/telex';
import { Sparkles, RotateCcw, ArrowLeft, CheckCircle2, Award, Flame, HelpCircle, BookOpen } from 'lucide-react';

interface TypingExerciseProps {
  lesson: Lesson;
  subjectId: SubjectId;
  subjectEmoji: string;
  subjectName: string;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

// Finger mapping for color-coded keyboard
const FINGER_GROUPS: Record<string, { finger: string; hand: string; color: string; border: string }> = {
  // Left Hand
  '1': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 text-rose-800', border: 'border-rose-300' },
  'Q': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 text-rose-800', border: 'border-rose-300' },
  'A': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 text-rose-800', border: 'border-rose-300' },
  'Z': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 text-rose-800', border: 'border-rose-300' },

  '2': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 text-amber-800', border: 'border-amber-300' },
  'W': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 text-amber-800', border: 'border-amber-300' },
  'S': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 text-amber-800', border: 'border-amber-300' },
  'X': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 text-amber-800', border: 'border-amber-300' },

  '3': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-300' },
  'E': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-300' },
  'D': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-300' },
  'C': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-300' },

  '4': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },
  '5': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },
  'R': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },
  'T': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },
  'F': { finger: 'Ngón trỏ (Có gờ)', hand: 'Tay trái', color: 'bg-blue-200 text-blue-900 font-bold', border: 'border-blue-500' },
  'G': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },
  'V': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },
  'B': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 text-blue-800', border: 'border-blue-300' },

  // Space
  ' ': { finger: 'Ngón cái', hand: 'Hai tay', color: 'bg-indigo-100 text-indigo-800', border: 'border-indigo-300' },

  // Right Hand
  '6': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  '7': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  'Y': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  'U': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  'J': { finger: 'Ngón trỏ (Có gờ)', hand: 'Tay phải', color: 'bg-cyan-200 text-cyan-900 font-bold', border: 'border-cyan-500' },
  'H': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  'N': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },
  'M': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 text-cyan-800', border: 'border-cyan-300' },

  '8': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 text-teal-800', border: 'border-teal-300' },
  'I': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 text-teal-800', border: 'border-teal-300' },
  'K': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 text-teal-800', border: 'border-teal-300' },
  ',': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 text-teal-800', border: 'border-teal-300' },

  '9': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 text-purple-800', border: 'border-purple-300' },
  'O': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 text-purple-800', border: 'border-purple-300' },
  'L': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 text-purple-800', border: 'border-purple-300' },
  '.': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 text-purple-800', border: 'border-purple-300' },

  '0': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 text-fuchsia-800', border: 'border-fuchsia-300' },
  'P': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 text-fuchsia-800', border: 'border-fuchsia-300' },
  ';': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 text-fuchsia-800', border: 'border-fuchsia-300' },
  '/': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 text-fuchsia-800', border: 'border-fuchsia-300' }
};

export const TypingExercise: React.FC<TypingExerciseProps> = ({
  lesson,
  subjectId,
  subjectEmoji,
  subjectName,
  onComplete,
  onBack
}) => {
  const targetText = lesson.target || 'f j f j ff jj';
  const [typed, setTyped] = useState('');
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showTelexCheatSheet, setShowTelexCheatSheet] = useState(false);
  const [activeKey, setActiveKey] = useState<string>('');
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // Telex step tracking for Vietnamese accented characters (e.g. for 'ò', step 0 is 'o', step 1 is 'f')
  const [telexStep, setTelexStep] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const currentChar = typed.length < targetText.length ? targetText[typed.length] : '';
  const isVN = isVietnameseChar(currentChar);
  const telexKeys = getTelexKeysForChar(currentChar);

  // The actual physical key expected on keyboard at current micro-step
  const currentExpectedKey = telexKeys[telexStep] || telexKeys[0] || currentChar;
  const currentKeyUpper = currentExpectedKey === ' ' ? ' ' : currentExpectedKey.toUpperCase();

  const fingerGuide = FINGER_GROUPS[currentKeyUpper] || {
    finger: 'Ngón tay phù hợp',
    hand: 'Bàn tay',
    color: 'bg-slate-100 text-slate-700',
    border: 'border-slate-300'
  };

  const finishExercise = () => {
    const elapsed = Math.max(1, Math.round(((Date.now() - (startTime || Date.now())) / 1000)));
    const accuracyCalc = Math.max(0, Math.round(((targetText.length - errors) / (targetText.length + errors)) * 100));
    setIsFinished(true);
    soundService.playSuccessCelebration();
    onComplete(100, accuracyCalc, elapsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    if (e.key === 'Backspace') {
      if (telexStep > 0) {
        setTelexStep(0);
      } else if (typed.length > 0) {
        setTyped(prev => prev.slice(0, -1));
        setTelexStep(0);
        setCombo(0);
      }
      return;
    }

    // Ignore special modifier keys like Shift, Control, Alt, etc.
    if (e.key.length > 1) return;

    const pressed = e.key;
    setActiveKey(pressed.toUpperCase());

    // Check Case 1: The user typed the exact character (or Unikey/EVKey produced it directly)
    if (
      pressed === currentChar ||
      (pressed.length === 1 && currentChar.length === 1 && pressed.normalize() === currentChar.normalize())
    ) {
      e.preventDefault();
      soundService.playKeyCorrect();
      const nextTyped = typed + currentChar;
      setTyped(nextTyped);
      setTelexStep(0);
      setCombo(c => {
        const nextC = c + 1;
        if (nextC > maxCombo) setMaxCombo(nextC);
        return nextC;
      });

      if (nextTyped.length === targetText.length) {
        finishExercise();
      }
      return;
    }

    // Check Case 2: Telex step-by-step key matching (e.g. for 'ò': step 0 is 'o', step 1 is 'f')
    const expectedKey = telexKeys[telexStep];
    const isStepMatch =
      expectedKey &&
      (pressed === expectedKey || pressed.toLowerCase() === expectedKey.toLowerCase());

    if (isStepMatch) {
      e.preventDefault();
      soundService.playKeyCorrect();
      const nextStep = telexStep + 1;

      if (nextStep >= telexKeys.length) {
        // All Telex keystrokes completed -> character is formed!
        const nextTyped = typed + currentChar;
        setTyped(nextTyped);
        setTelexStep(0);
        setCombo(c => {
          const nextC = c + 1;
          if (nextC > maxCombo) setMaxCombo(nextC);
          return nextC;
        });

        if (nextTyped.length === targetText.length) {
          finishExercise();
        }
      } else {
        // Advance to next Telex keystroke (e.g. from 'o' to 'f')
        setTelexStep(nextStep);
      }
    } else {
      // Key mismatch
      e.preventDefault();
      soundService.playKeyError();
      setErrors(prev => prev + 1);
      setCombo(0);
    }
  };

  // Support native composition or direct typing from IME inputs
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    if (!val) return;
    const lastChar = val[val.length - 1];

    if (lastChar === currentChar || lastChar.normalize() === currentChar.normalize()) {
      soundService.playKeyCorrect();
      const nextTyped = typed + currentChar;
      setTyped(nextTyped);
      setTelexStep(0);
      e.currentTarget.value = '';

      if (nextTyped.length === targetText.length) {
        finishExercise();
      }
    }
  };

  const handleKeyUp = () => {
    setActiveKey('');
  };

  const resetExercise = () => {
    setTyped('');
    setErrors(0);
    setStartTime(null);
    setTelexStep(0);
    setCombo(0);
    setIsFinished(false);
    inputRef.current?.focus();
  };

  // Accuracy & speed metrics
  const totalPresses = typed.length + errors;
  const accuracy = totalPresses > 0 ? Math.round((typed.length / totalPresses) * 100) : 100;
  const elapsedSec = startTime ? Math.max(1, Math.round((Date.now() - startTime) / 1000)) : 0;
  const wpm = elapsedSec > 0 ? Math.round((typed.length / 5) / (elapsedSec / 60)) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <div className="flex items-center gap-3">
          <ThemeToggleButton />

          <button
            onClick={() => setShowTelexCheatSheet(!showTelexCheatSheet)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quy tắc Telex</span>
          </button>

          <button
            onClick={resetExercise}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Luyện lại
          </button>

          <label className="inline-flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showKeyboard}
              onChange={e => setShowKeyboard(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Hiện bàn phím ảo
          </label>
        </div>
      </div>

      {/* Telex Quick Reference Card (Collapsible) */}
      {showTelexCheatSheet && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs space-y-2 animate-bounce-gentle">
          <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Bảng tra cứu quy tắc gõ tiếng Việt Telex (Sách Kết Nối Tri Thức)
            </span>
            <button
              onClick={() => setShowTelexCheatSheet(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold"
            >
              Đóng ×
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Dấu Sắc (/)</strong>: gõ phím <strong className="text-rose-600 dark:text-rose-400">S</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Dấu Huyền (\)</strong>: gõ phím <strong className="text-rose-600 dark:text-rose-400">F</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Dấu Hỏi (?)</strong>: gõ phím <strong className="text-rose-600 dark:text-rose-400">R</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Dấu Ngã (~)</strong>: gõ phím <strong className="text-rose-600 dark:text-rose-400">X</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Dấu Nặng (.)</strong>: gõ phím <strong className="text-rose-600 dark:text-rose-400">J</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Chữ Â / Ê / Ô</strong>: gõ <strong className="text-rose-600 dark:text-rose-400">AA / EE / OO</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Chữ Ă / Ơ / Ư</strong>: gõ <strong className="text-rose-600 dark:text-rose-400">AW / OW / UW</strong>
            </div>
            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-blue-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <strong className="text-blue-700 dark:text-blue-400">Chữ Đ</strong>: gõ <strong className="text-rose-600 dark:text-rose-400">DD</strong>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Title Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <span>{subjectEmoji} {subjectName}</span>
              <span>·</span>
              <span>Cấp {lesson.level} · Bài {lesson.id}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{lesson.desc}</p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            {combo >= 3 && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-xs font-bold text-xs animate-bounce-gentle">
                <Flame className="w-4 h-4 fill-amber-200" />
                <span>Combo {combo}x</span>
              </div>
            )}
            <div className="text-center px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Độ chính xác</span>
              <span className={`text-lg font-bold tabular-nums ${accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {accuracy}%
              </span>
            </div>
            <div className="text-center px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Tốc độ (WPM)</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400 tabular-nums">{wpm}</span>
            </div>
            <div className="text-center px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Số lỗi</span>
              <span className="text-lg font-bold text-rose-600 dark:text-rose-400 tabular-nums">{errors}</span>
            </div>
          </div>
        </div>

        {/* Text Display Box */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-900 text-white font-mono text-lg md:text-xl leading-relaxed tracking-wider select-none relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap gap-x-1">
            {targetText.split('').map((char, index) => {
              let charStyle = 'text-slate-400';
              if (index < typed.length) {
                charStyle = 'text-emerald-400 font-bold bg-emerald-950/60 rounded px-0.5';
              } else if (index === typed.length) {
                charStyle = 'text-white bg-blue-600 rounded px-1 animate-pulse font-bold shadow-sm';
              }
              return (
                <span key={index} className={charStyle}>
                  {char === ' ' ? '␣' : char}
                </span>
              );
            })}
          </div>

          {/* Focused input supporting both keydown and IME input */}
          <input
            ref={inputRef}
            type="text"
            className="absolute inset-0 opacity-0 cursor-default"
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            onKeyUp={handleKeyUp}
            onBlur={() => inputRef.current?.focus()}
            disabled={isFinished}
            autoFocus
          />
        </div>

        {/* Real-time Finger & Telex Guidance Callout */}
        {!isFinished && currentChar && (
          <div className="mt-4 p-3.5 bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800 rounded-2xl text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">Phím cần gõ:</span>
              <span className="px-3 py-1 font-mono text-base font-black bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-slate-600 rounded-xl shadow-xs">
                {currentExpectedKey === ' ' ? 'Phím cách (Space)' : currentExpectedKey.toUpperCase()}
              </span>

              <span className="text-slate-400">→</span>
              <span className={`px-2.5 py-0.5 rounded-lg font-bold text-xs ${fingerGuide.color}`}>
                Dùng {fingerGuide.finger} ({fingerGuide.hand})
              </span>

              {/* Telex Formula Tag for Vietnamese */}
              {isVN && (
                <div className="ml-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700 rounded-xl text-xs font-semibold shadow-2xs">
                  <span>💡 Để được chữ "{currentChar}":</span>
                  <span className="font-mono font-bold text-blue-700 dark:text-blue-300">
                    {telexKeys.map(k => k.toUpperCase()).join(' + ')}
                  </span>
                  {telexStep > 0 && (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold ml-1">(Đã gõ bước {telexStep}/{telexKeys.length})</span>
                  )}
                </div>
              )}
            </div>

            <span className="text-[11px] text-slate-500 dark:text-slate-400 italic shrink-0">
              Hỗ trợ gõ trực tiếp Telex hoặc bật sẵn Unikey
            </span>
          </div>
        )}
      </div>

      {/* Interactive Color-coded Keyboard */}
      {showKeyboard && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm select-none">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
            <span>SƠ ĐỒ BÀN PHÍM CHUẨN 10 NGÓN</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-300"></span> Ngón trỏ trái (F)
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-300 ml-2"></span> Ngón trỏ phải (J)
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs max-w-2xl mx-auto">
            {/* Number Row */}
            <div className="flex justify-center gap-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map(k => (
                <div
                  key={k}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                    currentKeyUpper === k
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-md z-10'
                      : activeKey === k
                      ? 'bg-blue-100 border-blue-400 scale-95'
                      : FINGER_GROUPS[k]?.color || 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {k}
                </div>
              ))}
            </div>

            {/* QWERTY Row */}
            <div className="flex justify-center gap-1">
              {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map(k => (
                <div
                  key={k}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                    currentKeyUpper === k
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-md z-10'
                      : activeKey === k
                      ? 'bg-blue-100 border-blue-400 scale-95'
                      : FINGER_GROUPS[k]?.color || 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {k}
                </div>
              ))}
            </div>

            {/* Home Row (ASDF - JKL;) */}
            <div className="flex justify-center gap-1">
              {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'].map(k => {
                const isHomeBump = k === 'F' || k === 'J';
                return (
                  <div
                    key={k}
                    className={`w-10 h-10 flex flex-col items-center justify-center rounded-xl border text-sm font-bold relative transition-all ${
                      currentKeyUpper === k
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-md z-10'
                        : activeKey === k
                        ? 'bg-blue-100 border-blue-400 scale-95'
                        : FINGER_GROUPS[k]?.color || 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{k}</span>
                    {isHomeBump && (
                      <span className="w-2.5 h-0.5 bg-slate-600 rounded-full mt-0.5 opacity-60"></span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center gap-1">
              {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map(k => (
                <div
                  key={k}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all ${
                    currentKeyUpper === k
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-110 shadow-md z-10'
                      : activeKey === k
                      ? 'bg-blue-100 border-blue-400 scale-95'
                      : FINGER_GROUPS[k]?.color || 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {k}
                </div>
              ))}
            </div>

            {/* Space Bar Row */}
            <div className="flex justify-center pt-1">
              <div
                className={`w-64 h-10 flex items-center justify-center rounded-xl border text-xs font-bold tracking-wider transition-all ${
                  currentKeyUpper === ' '
                    ? 'bg-blue-600 text-white ring-4 ring-blue-300 scale-105 shadow-md'
                    : activeKey === ' '
                    ? 'bg-blue-100 border-blue-400'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                }`}
              >
                Phím cách (Space) — Hai ngón cái
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Victory Celebration Modal */}
      {isFinished && (
        <>
          <ConfettiEffect durationMs={4500} />
          <div className="p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-emerald-950/60 dark:via-teal-950/40 dark:to-slate-900 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 shadow-xl text-center animate-bounce-gentle">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Hoan hô! Em đã hoàn thành xuất sắc!</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Độ chính xác: <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{accuracy}%</strong> · Tốc độ: <strong className="text-blue-700 dark:text-blue-400 font-bold">{wpm} WPM</strong>
              {maxCombo > 5 && (
                <span className="block text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                  🔥 Chuỗi gõ chuẩn xác dài nhất: {maxCombo} phím liên tục!
                </span>
              )}
            </p>

            <div className="flex justify-center gap-1 my-4">
              {[1, 2, 3].map(star => (
                <Sparkles
                  key={star}
                  className={`w-7 h-7 ${accuracy >= 80 ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                />
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={resetExercise}
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
              >
                Luyện lại bài này
              </button>
              <button
                onClick={onBack}
                className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm inline-flex items-center gap-2"
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
