import React, { useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface FloatingSparkle {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  symbol: string;
}

export const AnimatedBackground: React.FC = () => {
  const { isDark } = useTheme();

  // Subtle margin sparkles for elementary students (stay away from center text)
  const decorativeSparkles: FloatingSparkle[] = useMemo(() => [
    { id: 1, left: '3%', top: '12%', size: 'text-xl', delay: '0s', duration: '8s', symbol: '✨' },
    { id: 2, left: '95%', top: '16%', size: 'text-2xl', delay: '1.5s', duration: '9s', symbol: '⭐' },
    { id: 3, left: '2%', top: '60%', size: 'text-xl', delay: '2s', duration: '7.5s', symbol: '🌟' },
    { id: 4, left: '96%', top: '65%', size: 'text-xl', delay: '3s', duration: '8.5s', symbol: '✨' },
    { id: 5, left: '5%', top: '85%', size: 'text-lg', delay: '1s', duration: '7s', symbol: '🚀' },
    { id: 6, left: '94%', top: '88%', size: 'text-lg', delay: '2.5s', duration: '9s', symbol: '💻' },
  ], []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 transition-colors duration-500"
    >
      {/* Animated Gradient Canvas */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'bg-gradient-moving-dark' : 'bg-gradient-moving-light'
        }`}
      />

      {/* Floating Glowing Ambient Orbs (Soft, non-discoloring) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top-left Blue Orb */}
        <div
          className={`absolute -top-28 -left-28 w-96 h-96 rounded-full blur-3xl animate-pulse-orb ${
            isDark
              ? 'bg-blue-600/15 mix-blend-screen'
              : 'bg-blue-300/25 opacity-70'
          }`}
        />

        {/* Top-right Cyan Orb */}
        <div
          className={`absolute -top-24 -right-28 w-[28rem] h-[28rem] rounded-full blur-3xl animate-pulse-orb-2 ${
            isDark
              ? 'bg-indigo-600/15 mix-blend-screen'
              : 'bg-sky-200/35 opacity-70'
          }`}
        />

        {/* Bottom Ambient Glow */}
        <div
          className={`absolute -bottom-24 left-1/3 w-[32rem] h-[32rem] rounded-full blur-3xl animate-pulse-orb ${
            isDark
              ? 'bg-cyan-600/10 mix-blend-screen'
              : 'bg-indigo-100/30 opacity-60'
          }`}
        />
      </div>

      {/* Star Grid Pattern in Dark Mode */}
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      )}

      {/* Subtle Floating Sparkles at Margins */}
      {decorativeSparkles.map(item => (
        <div
          key={item.id}
          className={`absolute ${item.size} animate-float-gentle transition-opacity duration-500 ${
            isDark ? 'opacity-35 text-blue-200' : 'opacity-25 text-blue-500'
          }`}
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};
