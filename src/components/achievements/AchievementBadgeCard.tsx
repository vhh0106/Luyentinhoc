import React from 'react';
import { EvaluatedAchievement } from '../../services/achievements';
import { SUBJECTS_MAP } from '../../data/curriculum';
import { Lock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { BadgeTier, SubjectId } from '../../types';

interface AchievementBadgeCardProps {
  evaluated: EvaluatedAchievement;
  onClick?: () => void;
  onPracticeSubject?: (subjectId: SubjectId) => void;
}

const TIER_CONFIG: Record<
  BadgeTier,
  {
    name: string;
    border: string;
    bgGradient: string;
    badgeBg: string;
    glow: string;
    ribbonColor: string;
  }
> = {
  bronze: {
    name: 'Đồng',
    border: 'border-amber-300/80',
    bgGradient: 'from-amber-50/90 via-orange-50/50 to-white',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    glow: 'shadow-amber-500/10',
    ribbonColor: 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-100'
  },
  silver: {
    name: 'Bạc',
    border: 'border-slate-300',
    bgGradient: 'from-slate-100/90 via-sky-50/50 to-white',
    badgeBg: 'bg-slate-200 text-slate-800 border-slate-300',
    glow: 'shadow-slate-500/10',
    ribbonColor: 'bg-gradient-to-r from-slate-500 to-slate-700 text-white'
  },
  gold: {
    name: 'Vàng',
    border: 'border-yellow-400',
    bgGradient: 'from-amber-100/70 via-yellow-50/60 to-white',
    badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    glow: 'shadow-yellow-500/20',
    ribbonColor: 'bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 text-yellow-950 font-black'
  },
  diamond: {
    name: 'Kim Cương',
    border: 'border-indigo-400',
    bgGradient: 'from-indigo-100/80 via-purple-50/60 to-white',
    badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    glow: 'shadow-indigo-500/25',
    ribbonColor: 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black'
  }
};

export const AchievementBadgeCard: React.FC<AchievementBadgeCardProps> = ({
  evaluated,
  onClick,
  onPracticeSubject
}) => {
  const { achievement, isUnlocked, unlockedAt, currentProgress, targetProgress, percentage } = evaluated;
  const tierConfig = TIER_CONFIG[achievement.tier];
  const subject = achievement.subjectId !== 'all' ? SUBJECTS_MAP[achievement.subjectId] : null;

  return (
    <div
      onClick={onClick}
      className={`relative rounded-3xl p-4.5 border transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
        isUnlocked
          ? `bg-gradient-to-b ${tierConfig.bgGradient} ${tierConfig.border} shadow-sm hover:shadow-md hover:-translate-y-1`
          : 'bg-slate-50/80 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/50 opacity-85'
      }`}
    >
      {/* Top Banner: Tier & Subject Indicator */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isUnlocked
              ? tierConfig.badgeBg
              : 'bg-slate-200 text-slate-600 border-slate-300'
          }`}
        >
          {achievement.tier === 'diamond'
            ? '💎 Kim Cương'
            : achievement.tier === 'gold'
            ? '🥇 Cấp Vàng'
            : achievement.tier === 'silver'
            ? '🥈 Cấp Bạc'
            : '🥉 Cấp Đồng'}
        </span>

        {subject ? (
          <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
            <span>{subject.emoji}</span>
            <span className="truncate max-w-[90px]">{subject.name}</span>
          </span>
        ) : (
          <span className="text-[10px] font-medium text-purple-600 flex items-center gap-1">
            <span>✨</span>
            <span>Toàn diện</span>
          </span>
        )}
      </div>

      {/* Medallion Display */}
      <div className="flex flex-col items-center text-center my-1">
        <div className="relative mb-2.5">
          {/* Outer Ring / Glow */}
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform duration-300 group-hover:scale-105 ${
              isUnlocked
                ? `bg-white border-2 ${tierConfig.border} ${tierConfig.glow}`
                : 'bg-slate-200/70 border border-slate-300 grayscale'
            }`}
          >
            {achievement.icon}
          </div>

          {/* Status overlay icon */}
          {isUnlocked ? (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs border-2 border-white">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-400 text-white flex items-center justify-center shadow-xs border-2 border-white">
              <Lock className="w-3 h-3" />
            </div>
          )}
        </div>

        <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {achievement.title}
        </h4>

        <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
          {achievement.description}
        </p>
      </div>

      {/* Bottom Criteria & Progress */}
      <div className="mt-3 pt-3 border-t border-slate-200/60">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="text-slate-500 text-[10px]">
            {isUnlocked ? 'Đã hoàn thành' : 'Tiến độ'}
          </span>
          <span className="font-bold text-slate-700">
            {currentProgress} / {targetProgress} ({percentage}%)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isUnlocked
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-2 text-[10px] text-slate-500 italic line-clamp-1">
          {achievement.criteriaDescription}
        </div>
      </div>
    </div>
  );
};
