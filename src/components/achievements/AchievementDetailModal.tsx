import React from 'react';
import { EvaluatedAchievement } from '../../services/achievements';
import { SUBJECTS_MAP } from '../../data/curriculum';
import { SubjectId } from '../../types';
import { X, CheckCircle2, Lock, ArrowRight, Sparkles, Award } from 'lucide-react';

interface AchievementDetailModalProps {
  evaluated: EvaluatedAchievement | null;
  onClose: () => void;
  onSelectSubject?: (subjectId: SubjectId) => void;
}

export const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({
  evaluated,
  onClose,
  onSelectSubject
}) => {
  if (!evaluated) return null;

  const { achievement, isUnlocked, unlockedAt, currentProgress, targetProgress, percentage } = evaluated;
  const subject = achievement.subjectId !== 'all' ? SUBJECTS_MAP[achievement.subjectId] : null;

  const tierLabels = {
    bronze: '🥉 Cấp Đồng (Khởi Đầu)',
    silver: '🥈 Cấp Bạc (Tiến Bộ)',
    gold: '🥇 Cấp Vàng (Bậc Thầy)',
    diamond: '💎 Cấp Kim Cương (Đại Sứ Toàn Năng)'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative animate-scaleUp">
        {/* Top Header Background */}
        <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 p-6 text-white text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors font-bold text-sm"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-bold text-blue-100 mb-3">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>{tierLabels[achievement.tier]}</span>
          </div>

          {/* Large Central Medallion */}
          <div className="relative mx-auto w-24 h-24 mb-2 flex items-center justify-center">
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl shadow-xl transition-all ${
                isUnlocked
                  ? 'bg-white/95 border-4 border-amber-300 ring-4 ring-amber-400/30'
                  : 'bg-slate-200/90 border-4 border-slate-300 grayscale'
              }`}
            >
              {achievement.icon}
            </div>

            {isUnlocked && (
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-7 h-7 text-amber-300 animate-spin-slow" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-black tracking-tight">{achievement.title}</h3>

          {subject && (
            <p className="text-xs text-blue-100 mt-1 flex items-center justify-center gap-1.5">
              <span>{subject.emoji}</span>
              <span>Thuộc môn: {subject.name}</span>
            </p>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Meaning / Description */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Ý nghĩa danh hiệu
            </span>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
              {achievement.description}
            </p>
          </div>

          {/* Criteria & Current Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">Điều kiện mở khóa:</span>
              <span className="text-slate-600 font-semibold">
                {currentProgress} / {targetProgress} bài ({percentage}%)
              </span>
            </div>

            <div className="text-xs text-slate-600 font-medium bg-blue-50/70 text-blue-900 px-3 py-2 rounded-xl border border-blue-200/70">
              🎯 {achievement.criteriaDescription}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Unlock Status Stamp */}
          <div className="pt-2">
            {isUnlocked ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold">Đã vinh danh và mở khóa thành công! 🎉</div>
                  {unlockedAt && (
                    <div className="text-[11px] text-emerald-600">
                      Thời gian: {new Date(unlockedAt).toLocaleDateString('vi-VN')} {new Date(unlockedAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2.5 text-xs text-amber-800">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold">Huy hiệu chưa mở khóa</div>
                  <div className="text-[11px] text-amber-700">
                    Em cần hoàn thành thêm <strong>{Math.max(0, targetProgress - currentProgress)}</strong> bài học nữa để rinh huy hiệu này nhé!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center gap-2">
            {achievement.subjectId !== 'all' && onSelectSubject && (
              <button
                onClick={() => {
                  onSelectSubject(achievement.subjectId as SubjectId);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Luyện tập môn này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={onClose}
              className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
