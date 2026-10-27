import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { soundService } from '../../services/sound';

interface ThemeToggleButtonProps {
  className?: string;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ className = '' }) => {
  const { theme, setTheme, isDark } = useTheme();

  const handleSelectMode = (newMode: 'light' | 'dark') => {
    if (theme === newMode) return;
    soundService.playKeyCorrect();
    setTheme(newMode);
  };

  return (
    <div
      role="group"
      aria-label="Chế độ hiển thị Sáng hoặc Tối"
      className={`inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800/90 border border-slate-300/80 dark:border-slate-700/80 shadow-inner select-none transition-colors ${className}`}
    >
      {/* Light Mode Segment Button */}
      <button
        type="button"
        onClick={() => handleSelectMode('light')}
        aria-pressed={!isDark}
        title="Bật giao diện Sáng (Ban ngày)"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black transition-all duration-200 ${
          !isDark
            ? 'bg-white text-blue-700 shadow-sm shadow-blue-500/10 scale-[1.02]'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 animate-spin-slow' : ''}`} />
        <span>Sáng</span>
      </button>

      {/* Dark Mode Segment Button */}
      <button
        type="button"
        onClick={() => handleSelectMode('dark')}
        aria-pressed={isDark}
        title="Bật giao diện Tối (Ban đêm)"
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black transition-all duration-200 ${
          isDark
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30 scale-[1.02]'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-300' : ''}`} />
        <span>Tối</span>
      </button>
    </div>
  );
};
