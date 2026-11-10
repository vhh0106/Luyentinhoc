import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Lesson, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ThemeToggleButton } from '../common/ThemeToggleButton';
import { convertTelex, removeVietnameseAccents } from '../../services/telex';
import {
  Sparkles,
  RotateCcw,
  ArrowLeft,
  CheckCircle2,
  Award,
  Flame,
  HelpCircle,
  BookOpen,
  Volume2,
  VolumeX,
  FastForward,
  Check,
  Zap,
  Shield
} from 'lucide-react';

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
  '1': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-700' },
  'Q': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-700' },
  'A': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-700' },
  'Z': { finger: 'Ngón út', hand: 'Tay trái', color: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300', border: 'border-rose-300 dark:border-rose-700' },

  '2': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
  'W': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
  'S': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },
  'X': { finger: 'Ngón áp út', hand: 'Tay trái', color: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700' },

  '3': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700' },
  'E': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700' },
  'D': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700' },
  'C': { finger: 'Ngón giữa', hand: 'Tay trái', color: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700' },

  '4': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  '5': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  'R': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  'T': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  'F': { finger: 'Ngón trỏ (Có gờ)', hand: 'Tay trái', color: 'bg-blue-200 dark:bg-blue-900/80 text-blue-950 dark:text-blue-200 font-bold', border: 'border-blue-500' },
  'G': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  'V': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },
  'B': { finger: 'Ngón trỏ', hand: 'Tay trái', color: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700' },

  // Space
  ' ': { finger: 'Ngón cái', hand: 'Hai tay', color: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300', border: 'border-indigo-300 dark:border-indigo-700' },

  // Right Hand
  '6': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  '7': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  'Y': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  'U': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  'J': { finger: 'Ngón trỏ (Có gờ)', hand: 'Tay phải', color: 'bg-cyan-200 dark:bg-cyan-900/80 text-cyan-950 dark:text-cyan-200 font-bold', border: 'border-cyan-500' },
  'H': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  'N': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },
  'M': { finger: 'Ngón trỏ', hand: 'Tay phải', color: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700' },

  '8': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300', border: 'border-teal-300 dark:border-teal-700' },
  'I': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300', border: 'border-teal-300 dark:border-teal-700' },
  'K': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300', border: 'border-teal-300 dark:border-teal-700' },
  ',': { finger: 'Ngón giữa', hand: 'Tay phải', color: 'bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300', border: 'border-teal-300 dark:border-teal-700' },

  '9': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700' },
  'O': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700' },
  'L': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700' },
  '.': { finger: 'Ngón áp út', hand: 'Tay phải', color: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300', border: 'border-purple-300 dark:border-purple-700' },

  '0': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300', border: 'border-fuchsia-300 dark:border-fuchsia-700' },
  'P': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300', border: 'border-fuchsia-300 dark:border-fuchsia-700' },
  ';': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300', border: 'border-fuchsia-300 dark:border-fuchsia-700' },
  '/': { finger: 'Ngón út', hand: 'Tay phải', color: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300', border: 'border-fuchsia-300 dark:border-fuchsia-700' }
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
  const [rawBuffer, setRawBuffer] = useState('');
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showTelexCheatSheet, setShowTelexCheatSheet] = useState(false);
  const [activeKey, setActiveKey] = useState<string>('');
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mode: 'easy' allows case-insensitivity and smooth typing.
  // 'strict' requires exact matching.
  const [typingMode, setTypingMode] = useState<'easy' | 'strict'>('easy');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const finishExercise = useCallback(() => {
    const elapsed = Math.max(1, Math.round(((Date.now() - (startTime || Date.now())) / 1000)));
    const totalChars = targetText.length;
    const accuracyCalc = Math.max(50, Math.round(((totalChars) / (totalChars + Math.max(0, errors - 2))) * 100));
    setIsFinished(true);
    if (soundEnabled) soundService.playSuccessCelebration();
    onComplete(100, Math.min(100, accuracyCalc), elapsed);
  }, [startTime, targetText.length, errors, soundEnabled, onComplete]);

  // Advance by a matched chunk (character or word)
  const commitMatched = useCallback((matchedChunk: string) => {
    setTyped(prev => {
      const nextTyped = prev + matchedChunk;
      if (nextTyped.length >= targetText.length) {
        finishExercise();
      }
      return nextTyped;
    });
    setRawBuffer('');
    setCombo(c => {
      const nextC = c + 1;
      if (nextC > maxCombo) setMaxCombo(nextC);
      return nextC;
    });
    if (soundEnabled) soundService.playKeyCorrect();
  }, [targetText.length, finishExercise, maxCombo, soundEnabled]);

  // Skip current word or character if student is stuck
  const handleSkip = useCallback(() => {
    if (isFinished) return;
    if (!startTime) setStartTime(Date.now());
    const remaining = targetText.slice(typed.length);
    if (!remaining) return;

    const nextSpace = remaining.indexOf(' ');
    const advanceBy = nextSpace === -1 ? remaining.length : (nextSpace === 0 ? 1 : nextSpace);
    commitMatched(remaining.slice(0, advanceBy));
    inputRef.current?.focus();
  }, [isFinished, startTime, typed.length, targetText, commitMatched]);

  // Main input processor: Supports standard keystrokes, Telex composition, and IME
  const handleKeyStroke = useCallback((key: string) => {
    if (isFinished) return;
    if (!startTime) setStartTime(Date.now());

    setActiveKey(key === ' ' ? ' ' : key.toUpperCase());
    setTimeout(() => setActiveKey(''), 150);

    const remaining = targetText.slice(typed.length);
    if (!remaining) return;

    // 1. Space Bar Press
    if (key === ' ') {
      // If rawBuffer converts to match target word, commit it plus space
      if (rawBuffer) {
        const converted = convertTelex(rawBuffer);
        if (
          remaining.startsWith(converted) ||
          (typingMode === 'easy' && remaining.toLowerCase().startsWith(converted.toLowerCase()))
        ) {
          const addSpace = remaining[converted.length] === ' ';
          commitMatched(remaining.slice(0, converted.length) + (addSpace ? ' ' : ''));
          return;
        }

        // Easy mode: check unaccented word match
        if (typingMode === 'easy') {
          const nextSpaceIdx = remaining.indexOf(' ');
          const targetWord = nextSpaceIdx === -1 ? remaining : remaining.slice(0, nextSpaceIdx);
          if (removeVietnameseAccents(targetWord).toLowerCase() === removeVietnameseAccents(converted).toLowerCase()) {
            commitMatched(targetWord + (nextSpaceIdx !== -1 ? ' ' : ''));
            return;
          }
        }
      }

      // If directly at space
      if (remaining[0] === ' ') {
        commitMatched(' ');
        return;
      }

      // Space mismatch
      if (soundEnabled) soundService.playKeyError();
      setErrors(e => e + 1);
      setCombo(0);
      return;
    }

    // 2. Direct character match when no rawBuffer is accumulated
    if (!rawBuffer) {
      const isDirect =
        key === remaining[0] ||
        (typingMode === 'easy' && key.toLowerCase() === remaining[0].toLowerCase());

      if (isDirect) {
        commitMatched(remaining[0]);
        return;
      }
    }

    // 3. Telex composition: combine buffer and convert
    const newRaw = rawBuffer + key;
    const converted = convertTelex(newRaw);

    // 3a. Does converted match the beginning of remaining text?
    // e.g. "hocj" -> "học", "as" -> "á", "aa" -> "â", "cá" -> "cá"
    if (
      remaining.startsWith(converted) ||
      (typingMode === 'easy' && remaining.toLowerCase().startsWith(converted.toLowerCase()))
    ) {
      commitMatched(remaining.slice(0, converted.length));
      return;
    }

    // 3b. Check if newRaw is on track towards the current word in remaining
    const nextSpaceIdx = remaining.indexOf(' ');
    const targetWord = nextSpaceIdx === -1 ? remaining : remaining.slice(0, nextSpaceIdx);
    const targetBase = removeVietnameseAccents(targetWord).toLowerCase();
    const convertedBase = removeVietnameseAccents(converted).toLowerCase();

    // If on track: e.g. "ho" towards "học", or "vieet" towards "việt", or "cha" towards "chăm"
    if (targetBase.startsWith(convertedBase) || newRaw.length <= targetWord.length + 2) {
      setRawBuffer(newRaw);
      if (soundEnabled) soundService.playTypingSound();
      return;
    }

    // Key mismatch
    if (soundEnabled) soundService.playKeyError();
    setErrors(prev => prev + 1);
    setCombo(0);
  }, [isFinished, startTime, typed.length, targetText, rawBuffer, commitMatched, typingMode, soundEnabled]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) return;
    if (!startTime) setStartTime(Date.now());

    // Tab key = Quick Skip
    if (e.key === 'Tab') {
      e.preventDefault();
      handleSkip();
      return;
    }

    // Backspace handling: delete from rawBuffer first, then from typed
    if (e.key === 'Backspace') {
      if (rawBuffer.length > 0) {
        setRawBuffer(prev => prev.slice(0, -1));
      } else if (typed.length > 0) {
        setTyped(prev => prev.slice(0, -1));
      }
      return;
    }

    // Ignore non-character control keys
    if (e.key.length > 1 && e.key !== 'Space') return;

    setActiveKey(e.key === ' ' ? ' ' : e.key.toUpperCase());
    handleKeyStroke(e.key);
  };

  // Support direct text entry from IME inputs (Unikey, EVKey, Gboard, mobile keyboards)
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value.normalize('NFC');
    e.currentTarget.value = '';
    if (!val) return;

    const remaining = targetText.slice(typed.length);
    if (!remaining) return;

    // Check if IME inputted characters match remaining text
    let matchLen = 0;
    while (matchLen < val.length && matchLen < remaining.length) {
      const c1 = val[matchLen];
      const c2 = remaining[matchLen];
      const isCharMatch = c1 === c2 || (typingMode === 'easy' && c1.toLowerCase() === c2.toLowerCase());
      if (isCharMatch) {
        matchLen++;
      } else {
        break;
      }
    }

    if (matchLen > 0) {
      commitMatched(remaining.slice(0, matchLen));
    } else {
      const converted = convertTelex(val);
      if (
        remaining.startsWith(converted) ||
        (typingMode === 'easy' && remaining.toLowerCase().startsWith(converted.toLowerCase()))
      ) {
        commitMatched(remaining.slice(0, converted.length));
      }
    }
  };

  const handleKeyUp = () => {
    setActiveKey('');
  };

  const handleVirtualKeyClick = (k: string) => {
    setActiveKey(k === ' ' ? ' ' : k.toUpperCase());
    setTimeout(() => setActiveKey(''), 180);
    handleKeyStroke(k);
    inputRef.current?.focus();
  };

  const resetExercise = () => {
    setTyped('');
    setRawBuffer('');
    setErrors(0);
    setStartTime(null);
    setCombo(0);
    setIsFinished(false);
    inputRef.current?.focus();
  };

  // Accuracy & speed metrics
  const totalPresses = typed.length + errors;
  const accuracy = totalPresses > 0 ? Math.round((typed.length / totalPresses) * 100) : 100;
  const elapsedSec = startTime ? Math.max(1, Math.round((Date.now() - startTime) / 1000)) : 0;
  const wpm = elapsedSec > 0 ? Math.round((typed.length / 5) / (elapsedSec / 60)) : 0;
  const progressPercent = Math.min(100, Math.round((typed.length / targetText.length) * 100));

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại bài học</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher: Easy Mode vs Standard Mode */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => {
                setTypingMode('easy');
                inputRef.current?.focus();
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                typingMode === 'easy'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Chế độ dễ gõ: Hỗ trợ gõ Telex trực tiếp và bộ gõ Unikey tự nhiên"
            >
              <Zap className="w-3 h-3" />
              <span>Dễ gõ & Linh hoạt</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTypingMode('strict');
                inputRef.current?.focus();
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                typingMode === 'strict'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Chế độ chuẩn: Yêu cầu chính xác chữ hoa, chữ thường và dấu thanh"
            >
              <Shield className="w-3 h-3" />
              <span>Chuẩn 10 ngón</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => setSoundEnabled(v => !v)}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? 'Tắt âm thanh gõ' : 'Bật âm thanh gõ'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <ThemeToggleButton />

          <button
            type="button"
            onClick={() => setShowTelexCheatSheet(!showTelexCheatSheet)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quy tắc Telex</span>
          </button>

          <button
            type="button"
            onClick={resetExercise}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Luyện lại
          </button>

          <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showKeyboard}
              onChange={e => setShowKeyboard(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Bàn phím ảo
          </label>
        </div>
      </div>

      {/* Telex Quick Reference Card (Collapsible) */}
      {showTelexCheatSheet && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 border border-blue-200 dark:border-blue-800 rounded-2xl text-xs space-y-2 animate-scale-up">
          <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Bảng tra cứu quy tắc gõ tiếng Việt Telex (Sách Kết Nối Tri Thức)
            </span>
            <button
              type="button"
              onClick={() => setShowTelexCheatSheet(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold cursor-pointer"
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

      {/* Lesson Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              <span>{subjectEmoji} {subjectName}</span>
              <span>·</span>
              <span>Cấp {lesson.level} · Bài {lesson.id}</span>
              {typingMode === 'easy' && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-black lowercase">
                  ✓ Hỗ trợ gõ Telex tự nhiên
                </span>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">{lesson.title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{lesson.desc}</p>
          </div>

          {/* HUD Metrics */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {combo >= 3 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-xs font-bold text-xs animate-bounce-gentle">
                <Flame className="w-3.5 h-3.5 fill-amber-200" />
                <span>Combo {combo}x</span>
              </div>
            )}
            <div className="text-center px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">Chính xác</span>
              <span className={`text-base font-bold tabular-nums ${accuracy >= 90 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                {accuracy}%
              </span>
            </div>
            <div className="text-center px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tốc độ (WPM)</span>
              <span className="text-base font-bold text-blue-600 dark:text-blue-400 tabular-nums">{wpm}</span>
            </div>
            <div className="text-center px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">Lỗi</span>
              <span className="text-base font-bold text-rose-600 dark:text-rose-400 tabular-nums">{errors}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Tiến độ bài gõ ({typed.length}/{targetText.length} ký tự)</span>
            <span className="text-blue-600 dark:text-blue-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-200 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Text Display Box (Click anywhere to focus) */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-6 rounded-2xl bg-slate-900 text-white font-mono text-xl md:text-2xl leading-relaxed tracking-wider select-none relative overflow-hidden border-2 border-slate-800 shadow-inner cursor-text"
        >
          <div className="relative z-10 flex flex-wrap gap-x-1 items-center min-h-[3.5rem]">
            {targetText.split('').map((char, index) => {
              let charStyle = 'text-slate-400';
              if (index < typed.length) {
                charStyle = 'text-emerald-400 font-bold bg-emerald-950/70 rounded px-1';
              } else if (index === typed.length) {
                charStyle = 'text-white bg-blue-600 rounded px-1.5 ring-2 ring-blue-400 animate-pulse font-bold shadow-md';
              }
              return (
                <span key={index} className={charStyle}>
                  {char === ' ' ? '␣' : char}
                </span>
              );
            })}
          </div>

          {/* Focused hidden input */}
          <input
            ref={inputRef}
            type="text"
            className="absolute inset-0 opacity-0 cursor-text w-full h-full"
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            onKeyUp={handleKeyUp}
            onBlur={() => {
              if (!isFinished) inputRef.current?.focus();
            }}
            disabled={isFinished}
            autoFocus
          />
        </div>

        {/* Live Telex Composition Preview (Subtle and informative, only when user has pending Telex keys) */}
        {rawBuffer && !isFinished && (
          <div className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 animate-fade-in">
            <span className="font-sans font-bold text-slate-500 dark:text-slate-400">Đang gõ Telex:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 font-bold border border-indigo-200 dark:border-indigo-700">{rawBuffer}</span>
            <span className="text-slate-400">→</span>
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold">{convertTelex(rawBuffer)}</span>
          </div>
        )}
      </div>

      {/* Interactive Color-coded Keyboard */}
      {showKeyboard && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm select-none">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
            <span className="font-bold">BÀN PHÍM ẢO MÀU SẮC (CÓ THỂ CLICK TRỰC TIẾP ĐỂ GÕ)</span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-300"></span> Ngón trỏ trái (F)
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-300 ml-2"></span> Ngón trỏ phải (J)
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs max-w-2xl mx-auto">
            {/* Number Row */}
            <div className="flex justify-center gap-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleVirtualKeyClick(k)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    activeKey === k
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800 scale-105 shadow-md z-10'
                      : FINGER_GROUPS[k]?.color || 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* QWERTY Row */}
            <div className="flex justify-center gap-1">
              {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleVirtualKeyClick(k)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    activeKey === k
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800 scale-105 shadow-md z-10'
                      : FINGER_GROUPS[k]?.color || 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Home Row (ASDF - JKL;) */}
            <div className="flex justify-center gap-1">
              {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'].map(k => {
                const isHomeBump = k === 'F' || k === 'J';
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => handleVirtualKeyClick(k)}
                    className={`w-10 h-10 flex flex-col items-center justify-center rounded-xl border text-sm font-bold relative transition-all cursor-pointer ${
                      activeKey === k
                        ? 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800 scale-105 shadow-md z-10'
                        : FINGER_GROUPS[k]?.color || 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>{k}</span>
                    {isHomeBump && (
                      <span className="w-2.5 h-0.5 bg-slate-600 dark:bg-slate-400 rounded-full mt-0.5 opacity-60"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Row */}
            <div className="flex justify-center gap-1">
              {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => handleVirtualKeyClick(k)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                    activeKey === k
                      ? 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800 scale-105 shadow-md z-10'
                      : FINGER_GROUPS[k]?.color || 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Space Bar Row */}
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => handleVirtualKeyClick(' ')}
                className={`w-64 h-10 flex items-center justify-center rounded-xl border text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  activeKey === ' '
                    ? 'bg-blue-600 text-white ring-4 ring-blue-300 dark:ring-blue-800 scale-105 shadow-md'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300'
                }`}
              >
                Phím cách (Space) — Hai ngón cái
              </button>
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
                type="button"
                onClick={resetExercise}
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs cursor-pointer"
              >
                Luyện lại bài này
              </button>
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
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
