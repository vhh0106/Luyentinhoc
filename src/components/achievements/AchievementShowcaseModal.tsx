import React, { useState, useMemo } from 'react';
import { EvaluatedAchievement, evaluateAchievements } from '../../services/achievements';
import { AchievementBadgeCard } from './AchievementBadgeCard';
import { AchievementDetailModal } from './AchievementDetailModal';
import { ExerciseResult, SubjectId } from '../../types';
import { SUBJECTS_MAP } from '../../data/curriculum';
import {
  Trophy,
  Award,
  Filter,
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  Search,
  BookOpen
} from 'lucide-react';

interface AchievementShowcaseModalProps {
  studentName: string;
  classCode: string;
  completedLessonIds: string[];
  results: ExerciseResult[];
  onClose: () => void;
  onSelectSubject?: (subjectId: SubjectId) => void;
}

export const AchievementShowcaseModal: React.FC<AchievementShowcaseModalProps> = ({
  studentName,
  classCode,
  completedLessonIds,
  results,
  onClose,
  onSelectSubject
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingBadge, setInspectingBadge] = useState<EvaluatedAchievement | null>(null);

  // Evaluate all achievements
  const evaluatedList = useMemo(() => {
    return evaluateAchievements(studentName, classCode, completedLessonIds, results);
  }, [studentName, classCode, completedLessonIds, results]);

  // Summary counts
  const totalCount = evaluatedList.length;
  const unlockedCount = evaluatedList.filter(e => e.isUnlocked).length;
  const bronzeCount = evaluatedList.filter(e => e.isUnlocked && e.achievement.tier === 'bronze').length;
  const silverCount = evaluatedList.filter(e => e.isUnlocked && e.achievement.tier === 'silver').length;
  const goldCount = evaluatedList.filter(e => e.isUnlocked && e.achievement.tier === 'gold').length;
  const diamondCount = evaluatedList.filter(e => e.isUnlocked && e.achievement.tier === 'diamond').length;
  const completionRate = Math.round((unlockedCount / totalCount) * 100);

  // Filter list
  const filteredList = useMemo(() => {
    return evaluatedList.filter(item => {
      // Status filter
      if (statusFilter === 'unlocked' && !item.isUnlocked) return false;
      if (statusFilter === 'locked' && item.isUnlocked) return false;

      // Subject filter
      if (selectedSubjectFilter !== 'all') {
        if (selectedSubjectFilter === 'special' && item.achievement.subjectId !== 'all') return false;
        if (selectedSubjectFilter !== 'special' && item.achievement.subjectId !== selectedSubjectFilter) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.achievement.title.toLowerCase().includes(query);
        const matchDesc = item.achievement.description.toLowerCase().includes(query);
        const matchCriteria = item.achievement.criteriaDescription.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchCriteria) return false;
      }

      return true;
    });
  }, [evaluatedList, statusFilter, selectedSubjectFilter, searchQuery]);

  const subjectOptions = Object.values(SUBJECTS_MAP);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-5xl h-[92vh] max-h-[820px] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative animate-scaleUp">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-700 text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors font-bold"
            title="Đóng kho huy hiệu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-blue-100 mb-2">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>KHO HUY HIỆU & VINH DANH THÀNH TÍCH</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                Bảng Vàng Danh Dự: {studentName} 🎖️
              </h2>
              <p className="text-xs text-blue-100 max-w-xl mt-1">
                Thu thập các huy hiệu quý giá khi vượt qua các mốc bài tập trong 10 môn học Tin học Kết Nối Tri Thức.
              </p>
            </div>

            {/* Quick Stat Island */}
            <div className="flex items-center gap-3">
              <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
                <div className="text-2xl font-black text-amber-300">
                  {unlockedCount} / {totalCount}
                </div>
                <div className="text-[10px] font-bold text-blue-100 uppercase tracking-wider">
                  Huy hiệu đã đạt ({completionRate}%)
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 text-xs font-bold">
                <span title="Huy hiệu Vàng" className="flex items-center gap-1">
                  🥇 {goldCount}
                </span>
                <span className="text-white/40">|</span>
                <span title="Huy hiệu Bạc" className="flex items-center gap-1">
                  🥈 {silverCount}
                </span>
                <span className="text-white/40">|</span>
                <span title="Huy hiệu Đồng" className="flex items-center gap-1">
                  🥉 {bronzeCount}
                </span>
                {diamondCount > 0 && (
                  <>
                    <span className="text-white/40">|</span>
                    <span title="Huy hiệu Kim Cương" className="flex items-center gap-1">
                      💎 {diamondCount}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Status Segmented Buttons */}
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Tất cả ({totalCount})
              </button>
              <button
                onClick={() => setStatusFilter('unlocked')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  statusFilter === 'unlocked'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Đã đạt ({unlockedCount})</span>
              </button>
              <button
                onClick={() => setStatusFilter('locked')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  statusFilter === 'locked'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Chưa đạt ({totalCount - unlockedCount})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm tên huy hiệu..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Subject Pills Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin text-xs">
            <span className="text-slate-500 font-bold text-[11px] whitespace-nowrap uppercase tracking-wider flex items-center gap-1 mr-1">
              <BookOpen className="w-3.5 h-3.5" />
              Môn:
            </span>

            <button
              onClick={() => setSelectedSubjectFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubjectFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Toàn bộ môn
            </button>

            {subjectOptions.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectFilter(s.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedSubjectFilter === s.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{s.emoji}</span>
                <span>{s.name}</span>
              </button>
            ))}

            <button
              onClick={() => setSelectedSubjectFilter('special')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                selectedSubjectFilter === 'special'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>✨</span>
              <span>Đặc biệt</span>
            </button>
          </div>
        </div>

        {/* Badges Grid Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin">
          {filteredList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredList.map(evaluated => (
                <AchievementBadgeCard
                  key={evaluated.achievement.id}
                  evaluated={evaluated}
                  onClick={() => setInspectingBadge(evaluated)}
                  onPracticeSubject={onSelectSubject}
                />
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-300 text-slate-500 space-y-2">
              <span className="text-3xl">🔍</span>
              <p className="text-sm font-bold text-slate-700">
                Không tìm thấy huy hiệu nào phù hợp với bộ lọc hiện tại
              </p>
              <button
                onClick={() => {
                  setStatusFilter('all');
                  setSelectedSubjectFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Detail Inspection Modal */}
        {inspectingBadge && (
          <AchievementDetailModal
            evaluated={inspectingBadge}
            onClose={() => setInspectingBadge(null)}
            onSelectSubject={onSelectSubject}
          />
        )}
      </div>
    </div>
  );
};
