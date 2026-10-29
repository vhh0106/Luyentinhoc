import React, { useState, useEffect, useMemo } from 'react';
import {
  ClassroomLeaderboardEntry,
  fetchClassroomLeaderboard,
  subscribeToClassroomLeaderboard
} from '../../services/leaderboard';
import {
  Trophy,
  Star,
  Award,
  Medal,
  RefreshCw,
  Search,
  Crown,
  Sparkles,
  Flame,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  ChevronRight,
  Info,
  X,
  Zap,
  Target,
  Radio
} from 'lucide-react';

interface ClassroomLeaderboardProps {
  classCode: string;
  currentStudentName: string;
  onClose?: () => void;
}

export const ClassroomLeaderboard: React.FC<ClassroomLeaderboardProps> = ({
  classCode,
  currentStudentName,
  onClose
}) => {
  const [entries, setEntries] = useState<ClassroomLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [justUpdated, setJustUpdated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'stars' | 'lessons' | 'accuracy'>('stars');
  const [filterMode, setFilterMode] = useState<'all' | 'top5' | 'nearMe'>('all');
  const [selectedStudent, setSelectedStudent] = useState<ClassroomLeaderboardEntry | null>(null);

  const loadLeaderboardData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClassroomLeaderboard(classCode, currentStudentName);
      setEntries(data);
      setLastUpdated(new Date());
      setJustUpdated(true);
      setTimeout(() => setJustUpdated(false), 2000);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeToClassroomLeaderboard(classCode, currentStudentName, (data) => {
      setEntries(data);
      setLastUpdated(new Date());
      setIsLoading(false);
      setJustUpdated(true);
      const timer = setTimeout(() => setJustUpdated(false), 2000);
      return () => clearTimeout(timer);
    });

    return () => {
      unsubscribe();
    };
  }, [classCode, currentStudentName]);

  // Current student entry
  const currentStudentEntry = useMemo(() => {
    return entries.find(e => e.isCurrentStudent);
  }, [entries]);

  // Student directly above current student (for motivation)
  const studentAbove = useMemo(() => {
    if (!currentStudentEntry || currentStudentEntry.rank <= 1) return null;
    return entries.find(e => e.rank === currentStudentEntry.rank - 1);
  }, [entries, currentStudentEntry]);

  // Top 3 Podium Students
  const top1 = entries.find(e => e.rank === 1);
  const top2 = entries.find(e => e.rank === 2);
  const top3 = entries.find(e => e.rank === 3);

  // Filter & Sort
  const filteredEntries = useMemo(() => {
    let result = [...entries];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(e => e.studentName.toLowerCase().includes(query));
    }

    // View filter
    if (filterMode === 'top5') {
      result = result.filter(e => e.rank <= 5);
    } else if (filterMode === 'nearMe' && currentStudentEntry) {
      const myRank = currentStudentEntry.rank;
      result = result.filter(e => Math.abs(e.rank - myRank) <= 2);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'stars') {
        return b.totalStars - a.totalStars;
      }
      if (sortBy === 'lessons') {
        return b.completedLessonsCount - a.completedLessonsCount;
      }
      if (sortBy === 'accuracy') {
        return b.averageAccuracy - a.averageAccuracy;
      }
      return 0;
    });

    return result;
  }, [entries, searchQuery, sortBy, filterMode, currentStudentEntry]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-6 md:p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/30 backdrop-blur-md border border-amber-300/40 flex items-center justify-center text-3xl shadow-inner shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-amber-100 uppercase tracking-wider mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs font-bold">
                  Bảng Vàng Lớp {classCode}
                </span>
                <span>·</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all ${
                  justUpdated
                    ? 'bg-emerald-400 text-slate-950 border-white shadow-md scale-105'
                    : 'bg-emerald-500/30 border-emerald-300/40 text-emerald-100'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span>{justUpdated ? 'Vừa nhận điểm mới!' : 'Realtime: Cập nhật trực tiếp'}</span>
                </span>
                <span className="text-[11px] text-amber-200/90 font-mono font-medium hidden sm:inline">
                  {lastUpdated.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
                Bảng Xếp Hạng Tích Lũy Sao ⭐
              </h2>
              <p className="text-xs md:text-sm text-amber-100 mt-1 max-w-xl">
                Tuyên dương các bạn có tổng số Sao cao nhất từ kết quả luyện tập và huy hiệu kĩ năng Tin học. Tự động cập nhật tức thì khi có bạn nộp bài.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadLeaderboardData}
              disabled={isLoading}
              className="px-3.5 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20 shadow-xs cursor-pointer active:scale-95"
              title="Đồng bộ lại tức thời với Cloud Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Đang cập nhật...' : 'Đồng bộ lại'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors"
                title="Đóng bảng xếp hạng"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Current Student Standing Strip */}
      {currentStudentEntry && (
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 dark:from-slate-900 dark:via-indigo-950/60 dark:to-slate-900 p-4 px-6 border-b border-indigo-100 dark:border-indigo-900 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-md shrink-0">
              #{currentStudentEntry.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-blue-900 dark:text-blue-200">
                  Vị trí của em ({currentStudentName})
                </span>
                <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-[10px] font-bold">
                  Hạng {currentStudentEntry.rank} / {entries.length}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Em đã tích lũy được <strong className="text-amber-600 dark:text-amber-400 font-extrabold">{currentStudentEntry.totalStars} ⭐</strong> ({currentStudentEntry.completedLessonsCount} bài học · {currentStudentEntry.badgesCount} huy hiệu)
              </p>
            </div>
          </div>

          {studentAbove ? (
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-blue-200/80 dark:border-blue-800 shadow-2xs text-xs">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                Chỉ cần thêm <strong className="text-amber-600 dark:text-amber-400 font-black">{studentAbove.totalStars - currentStudentEntry.totalStars + 1} ⭐</strong> nữa là em vượt lên hạng #{studentAbove.rank} của bạn <strong>{studentAbove.studentName}</strong>!
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-950/80 px-3.5 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700 text-xs font-bold text-amber-900 dark:text-amber-200 shadow-2xs">
              <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>Tuyệt vời! Em đang dẫn đầu toàn lớp học! 👑</span>
            </div>
          )}
        </div>
      )}

      {/* Top 3 Podium (Bục vinh quang 1-2-3) */}
      <div className="p-6 md:p-8 bg-slate-50/60 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 border border-amber-200 rounded-full text-xs font-black text-amber-900 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>TOP 3 XUẤT SẮC NHẤT LỚP {classCode}</span>
          </div>
          <p className="text-xs text-slate-500">Các kiện tướng Tin học tích lũy nhiều sao nhất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end max-w-3xl mx-auto">
          {/* Top 2 - Silver (Left) */}
          {top2 && (
            <div className="order-2 md:order-1 bg-white dark:bg-slate-800 p-5 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600" />
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black flex items-center justify-center text-xl shadow-inner mb-3 border border-slate-200 dark:border-slate-600">
                🥈
              </div>
              <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-full text-[11px] font-black uppercase mb-1">
                Hạng 2 · Á Quân
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug line-clamp-1">
                {top2.studentName}
              </h4>
              <div className="mt-2 flex items-center gap-1 text-amber-600 dark:text-amber-400 font-black text-lg">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                <span>{top2.totalStars} Sao</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {top2.completedLessonsCount} bài · {top2.averageAccuracy}% chính xác
              </div>
              {top2.isCurrentStudent && (
                <span className="mt-2 px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-bold">
                  Là bạn đó! ✨
                </span>
              )}
            </div>
          )}

          {/* Top 1 - Gold Champion (Center, elevated) */}
          {top1 && (
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-800 p-6 rounded-3xl border-2 border-amber-400 dark:border-amber-500 shadow-lg hover:shadow-xl transition-all flex flex-col items-center text-center relative overflow-hidden md:-translate-y-3">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />
              <div className="absolute top-2 right-2">
                <Crown className="w-6 h-6 text-amber-500 fill-amber-400" />
              </div>
              <div className="w-16 h-16 rounded-3xl bg-amber-400 text-amber-950 font-black flex items-center justify-center text-3xl shadow-md mb-3 border-2 border-amber-300">
                🥇
              </div>
              <span className="px-3 py-0.5 bg-amber-400 text-amber-950 rounded-full text-xs font-black uppercase mb-1 shadow-2xs">
                Quán Quân Lớp {classCode}
              </span>
              <h3 className="font-black text-slate-950 dark:text-white text-lg leading-snug line-clamp-1">
                {top1.studentName}
              </h3>
              <div className="mt-2 flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-black text-2xl">
                <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                <span>{top1.totalStars} Sao</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                {top1.completedLessonsCount} bài hoàn thành · {top1.badgesCount} huy hiệu
              </div>
              {top1.isCurrentStudent && (
                <span className="mt-2 px-2.5 py-0.5 bg-blue-600 text-white rounded-md text-[11px] font-bold shadow-2xs">
                  Ngôi vương của em! 👑
                </span>
              )}
            </div>
          )}

          {/* Top 3 - Bronze (Right) */}
          {top3 && (
            <div className="order-3 md:order-3 bg-white dark:bg-slate-800 p-5 rounded-3xl border-2 border-amber-200/70 dark:border-amber-800/70 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600/40 via-amber-700/50 to-amber-600/40" />
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-black flex items-center justify-center text-xl shadow-inner mb-3 border border-amber-200 dark:border-amber-700/50">
                🥉
              </div>
              <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 rounded-full text-[11px] font-black uppercase mb-1">
                Hạng 3 · Đồng
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-snug line-clamp-1">
                {top3.studentName}
              </h4>
              <div className="mt-2 flex items-center gap-1 text-amber-600 dark:text-amber-400 font-black text-lg">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
                <span>{top3.totalStars} Sao</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {top3.completedLessonsCount} bài · {top3.averageAccuracy}% chính xác
              </div>
              {top3.isCurrentStudent && (
                <span className="mt-2 px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-bold">
                  Là bạn đó! ✨
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Control Bar: Filter, Search & Sort */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Filter Modes */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              Tất cả ({entries.length} bạn)
            </button>
            <button
              onClick={() => setFilterMode('top5')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterMode === 'top5'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              Top 5 Xuất sắc 🏆
            </button>
            {currentStudentEntry && (
              <button
                onClick={() => setFilterMode('nearMe')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === 'nearMe'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                }`}
              >
                Gần thứ hạng của em 🎯
              </button>
            )}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm tên bạn học..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 md:w-56"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300">
              <button
                onClick={() => setSortBy('stars')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  sortBy === 'stars' ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Sắp xếp theo số Sao ⭐"
              >
                ⭐ Sao
              </button>
              <button
                onClick={() => setSortBy('lessons')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  sortBy === 'lessons' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Sắp xếp theo số bài đã hoàn thành"
              >
                📚 Bài
              </button>
              <button
                onClick={() => setSortBy('accuracy')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  sortBy === 'accuracy' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-2xs' : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Sắp xếp theo độ chính xác"
              >
                🎯 Độ đúng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Classroom Table / Leaderboard List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-6 w-16 text-center">Hạng</th>
              <th className="py-3 px-4">Học sinh</th>
              <th className="py-3 px-4 text-center">Tổng số Sao</th>
              <th className="py-3 px-4 text-center">Bài đã làm</th>
              <th className="py-3 px-4 text-center">Điểm TB</th>
              <th className="py-3 px-4 text-center">Độ chính xác</th>
              <th className="py-3 px-4 text-center">Huy hiệu</th>
              <th className="py-3 px-6 text-right">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {filteredEntries.map(entry => {
              const isTop1 = entry.rank === 1;
              const isTop2 = entry.rank === 2;
              const isTop3 = entry.rank === 3;

              return (
                <tr
                  key={entry.studentName}
                  className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors ${
                    entry.isCurrentStudent ? 'bg-blue-50/70 dark:bg-blue-950/40 font-semibold' : ''
                  }`}
                >
                  {/* Rank Column */}
                  <td className="py-3 px-6 text-center">
                    {isTop1 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-400 text-amber-950 font-black shadow-xs">
                        🥇
                      </span>
                    ) : isTop2 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black shadow-xs">
                        🥈
                      </span>
                    ) : isTop3 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black border border-amber-300 dark:border-amber-700 shadow-xs">
                        🥉
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                        #{entry.rank}
                      </span>
                    )}
                  </td>

                  {/* Student Name */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs">
                        {entry.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                            {entry.studentName}
                          </span>
                          {entry.isCurrentStudent && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
                              Em
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>Môn yêu thích: {entry.favoriteSubjectEmoji} {entry.favoriteSubjectName}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Total Stars ⭐ */}
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 font-black text-sm text-amber-700 dark:text-amber-300 shadow-2xs">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                      <span>{entry.totalStars}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {entry.lessonStars} bài + {entry.badgeStars} huy hiệu
                    </div>
                  </td>

                  {/* Completed Lessons */}
                  <td className="py-3 px-4 text-center font-bold text-slate-700 dark:text-slate-200">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {entry.completedLessonsCount} bài
                    </span>
                  </td>

                  {/* Average Score */}
                  <td className="py-3 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                    <span className={`px-2 py-0.5 rounded-md ${
                      entry.averageScore >= 90
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60'
                        : 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60'
                    }`}>
                      {entry.averageScore} đ
                    </span>
                  </td>

                  {/* Average Accuracy */}
                  <td className="py-3 px-4 text-center font-bold text-slate-800 dark:text-slate-200">
                    <span className={`px-2 py-0.5 rounded-md ${
                      entry.averageAccuracy >= 95
                        ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60'
                        : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {entry.averageAccuracy}%
                    </span>
                  </td>

                  {/* Badges count */}
                  <td className="py-3 px-4 text-center font-bold text-amber-700 dark:text-amber-400">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs">
                      <Trophy className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{entry.badgesCount}</span>
                    </span>
                  </td>

                  {/* Details Button */}
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => setSelectedStudent(entry)}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      <span>Xem</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredEntries.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
                  Không tìm thấy bạn học nào phù hợp với từ khóa "{searchQuery}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Star Rules Guide */}
      <div className="p-4 px-6 bg-slate-50 dark:bg-slate-850/80 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2 flex-wrap">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-semibold text-slate-700 dark:text-slate-200">Quy tắc tích lũy Sao ⭐:</span>
          <span>Đạt ≥ 90 điểm: <strong>3 ⭐</strong></span>
          <span>·</span>
          <span>Đạt ≥ 75 điểm: <strong>2 ⭐</strong></span>
          <span>·</span>
          <span>Đạt ≥ 50 điểm: <strong>1 ⭐</strong></span>
          <span>·</span>
          <span>Mở khóa huy hiệu kĩ thuật số: <strong>+1 đến +5 ⭐</strong></span>
        </div>

        <div className="text-[11px] text-slate-400 dark:text-slate-500">
          Cập nhật lần cuối: {lastUpdated.toLocaleTimeString('vi-VN')}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 font-black flex items-center justify-center text-xl shadow-sm">
                  #{selectedStudent.rank}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {selectedStudent.studentName}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Lớp {classCode} · {selectedStudent.isCurrentStudent ? 'Đang đăng nhập' : 'Học sinh'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                    Tổng số Sao Tích Lũy
                  </div>
                  <div className="text-2xl font-black text-amber-700 dark:text-amber-400 mt-0.5 flex items-center gap-1.5">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                    <span>{selectedStudent.totalStars} Sao</span>
                  </div>
                </div>
                <div className="text-right text-xs text-amber-900/80 dark:text-amber-200/80">
                  <div>Bài học: <strong>+{selectedStudent.lessonStars} ⭐</strong></div>
                  <div>Huy hiệu: <strong>+{selectedStudent.badgeStars} ⭐</strong></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Bài đã hoàn thành</div>
                  <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedStudent.completedLessonsCount} bài
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Huy hiệu đạt được</div>
                  <div className="text-lg font-black text-amber-700 dark:text-amber-400 mt-0.5">
                    {selectedStudent.badgesCount} 🏆
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Điểm trung bình</div>
                  <div className="text-lg font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {selectedStudent.averageScore} / 100
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Độ chính xác</div>
                  <div className="text-lg font-black text-blue-700 dark:text-blue-400 mt-0.5">
                    {selectedStudent.averageAccuracy}%
                  </div>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 rounded-2xl border border-blue-200/70 dark:border-blue-800/80 text-xs text-blue-900 dark:text-blue-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Chuyên môn nổi bật nhất: <strong>{selectedStudent.favoriteSubjectEmoji} {selectedStudent.favoriteSubjectName}</strong>
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
