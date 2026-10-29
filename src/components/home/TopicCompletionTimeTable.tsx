import React, { useState, useEffect, useMemo } from 'react';
import { ExerciseResult, SubjectId } from '../../types';
import { SUBJECTS_MAP } from '../../data/curriculum';
import { getResults, subscribeToResults, fetchAllResultsFromCloud } from '../../services/storage';
import {
  Clock,
  TrendingUp,
  Award,
  Zap,
  BarChart2,
  ChevronDown,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface TopicCompletionTimeTableProps {
  onOpenTeacherPortal?: () => void;
}

interface SubjectStatRow {
  subjectId: SubjectId;
  name: string;
  emoji: string;
  gradeLevel: string;
  count: number;
  avgTimeSeconds: number;
  avgScore: number;
  avgAccuracy: number;
  minTimeSeconds: number;
  maxTimeSeconds: number;
}

export const TopicCompletionTimeTable: React.FC<TopicCompletionTimeTableProps> = ({
  onOpenTeacherPortal
}) => {
  const [results, setResults] = useState<ExerciseResult[]>(() => getResults());
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | '3' | '4' | '5'>('ALL');
  const [sortBy, setSortBy] = useState<'time-asc' | 'time-desc' | 'count-desc' | 'score-desc'>('count-desc');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Initial load
    const initial = getResults();
    if (initial.length > 0) {
      setResults(initial);
    }

    // 2. Fetch fresh cloud data
    setIsLoading(true);
    fetchAllResultsFromCloud()
      .then(fresh => {
        if (fresh && fresh.length > 0) {
          setResults(fresh);
        }
      })
      .catch(err => {
        console.warn('TopicCompletionTimeTable fetchAllResults error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // 3. Realtime updates across devices
    const unsubscribe = subscribeToResults(liveResults => {
      if (liveResults && liveResults.length > 0) {
        setResults(liveResults);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Filter results by grade level (based on classCode, e.g. 3A -> Grade 3)
  const filteredResults = useMemo(() => {
    if (selectedGrade === 'ALL') return results;
    return results.filter(r => {
      const cleanClass = (r.classCode || '').trim();
      return cleanClass.startsWith(selectedGrade);
    });
  }, [results, selectedGrade]);

  // Aggregate statistics per subject
  const subjectStats: SubjectStatRow[] = useMemo(() => {
    const map = new Map<
      SubjectId,
      {
        count: number;
        totalTime: number;
        totalScore: number;
        totalAcc: number;
        minTime: number;
        maxTime: number;
      }
    >();

    // Initialize all curriculum subjects so none are omitted
    (Object.keys(SUBJECTS_MAP) as SubjectId[]).forEach(id => {
      map.set(id, {
        count: 0,
        totalTime: 0,
        totalScore: 0,
        totalAcc: 0,
        minTime: Infinity,
        maxTime: 0
      });
    });

    // Accumulate from filtered results
    filteredResults.forEach(r => {
      if (!r.subjectId) return;
      let entry = map.get(r.subjectId);
      if (!entry) {
        entry = {
          count: 0,
          totalTime: 0,
          totalScore: 0,
          totalAcc: 0,
          minTime: Infinity,
          maxTime: 0
        };
        map.set(r.subjectId, entry);
      }

      const time = Math.max(1, r.timeSpentSeconds || 0);
      entry.count += 1;
      entry.totalTime += time;
      entry.totalScore += Math.max(0, r.score || 0);
      entry.totalAcc += Math.max(0, r.accuracy || 0);
      if (time < entry.minTime) entry.minTime = time;
      if (time > entry.maxTime) entry.maxTime = time;
    });

    // Map to rows
    const rows: SubjectStatRow[] = [];
    map.forEach((data, subId) => {
      const info = SUBJECTS_MAP[subId];
      if (!info) return;

      const count = data.count;
      const avgTimeSeconds = count > 0 ? Math.round(data.totalTime / count) : 0;
      const avgScore = count > 0 ? Math.round(data.totalScore / count) : 0;
      const avgAccuracy = count > 0 ? Math.round(data.totalAcc / count) : 0;

      rows.push({
        subjectId: subId,
        name: info.name,
        emoji: info.emoji,
        gradeLevel: info.gradeLevel,
        count,
        avgTimeSeconds,
        avgScore,
        avgAccuracy,
        minTimeSeconds: data.minTime === Infinity ? 0 : data.minTime,
        maxTimeSeconds: data.maxTime
      });
    });

    // Apply sorting
    rows.sort((a, b) => {
      if (sortBy === 'time-asc') {
        if (a.count === 0) return 1;
        if (b.count === 0) return -1;
        return a.avgTimeSeconds - b.avgTimeSeconds;
      }
      if (sortBy === 'time-desc') {
        return b.avgTimeSeconds - a.avgTimeSeconds;
      }
      if (sortBy === 'score-desc') {
        return b.avgScore - a.avgScore;
      }
      // default: count-desc
      return b.count - a.count;
    });

    return rows;
  }, [filteredResults, sortBy]);

  // Overall metrics
  const totalSubmissions = filteredResults.length;
  const overallAvgTime = useMemo(() => {
    if (totalSubmissions === 0) return 0;
    const total = filteredResults.reduce((sum, r) => sum + (r.timeSpentSeconds || 0), 0);
    return Math.round(total / totalSubmissions);
  }, [filteredResults, totalSubmissions]);

  const overallAvgScore = useMemo(() => {
    if (totalSubmissions === 0) return 0;
    const total = filteredResults.reduce((sum, r) => sum + (r.score || 0), 0);
    return Math.round(total / totalSubmissions);
  }, [filteredResults, totalSubmissions]);

  // Fastest and Deepest topics with at least 5 submissions
  const activeRows = subjectStats.filter(s => s.count >= 5);
  const fastestTopic = useMemo(() => {
    if (activeRows.length === 0) return null;
    return [...activeRows].sort((a, b) => a.avgTimeSeconds - b.avgTimeSeconds)[0];
  }, [activeRows]);

  const deepestTopic = useMemo(() => {
    if (activeRows.length === 0) return null;
    return [...activeRows].sort((a, b) => b.avgTimeSeconds - a.avgTimeSeconds)[0];
  }, [activeRows]);

  const formatSeconds = (sec: number): string => {
    if (!sec || sec <= 0) return '0s';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    if (m > 0 && s > 0) return `${m}p ${s}s`;
    if (m > 0) return `${m} phút`;
    return `${s} giây`;
  };

  const getPaceStatus = (avgTime: number, count: number, accuracy: number) => {
    if (count === 0) {
      return {
        label: 'Chưa có bài nộp',
        color: 'text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
      };
    }
    if (avgTime <= 35 && accuracy >= 80) {
      return {
        label: '⚡ Phản xạ rất nhanh',
        color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800'
      };
    }
    if (avgTime <= 55) {
      return {
        label: '⏱️ Nhịp độ tiêu chuẩn',
        color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800'
      };
    }
    return {
      label: '⏳ Cần rèn luyện thêm',
      color: 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800'
    };
  };

  return (
    <section id="thong-ke-tien-do" className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="uppercase tracking-wider">
              Thống Kê Tiến Độ & Thời Gian Hoàn Thành Bài Học
            </span>
            {isLoading && (
              <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin ml-1" />
            )}
          </div>
          <h2
            className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Thời Gian Trung Bình Học Sinh Hoàn Thành Các Chủ Đề
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
            Tổng hợp thời gian thực hành từ {totalSubmissions.toLocaleString('vi-VN')} lượt nộp bài thực tế trên hệ thống Đám mây. Giúp giáo viên đánh giá mức độ thuần thục của học sinh ở từng kỹ năng số.
          </p>
        </div>

        {/* Teacher Portal Quick Entry */}
        {onOpenTeacherPortal && (
          <button
            type="button"
            onClick={onOpenTeacherPortal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap self-start md:self-auto shrink-0"
          >
            <span>Quản lý & Bảng vàng lớp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* KPI Highlight Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Overall Average Time */}
        <div className="bg-white/95 dark:bg-slate-900/95 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>Thời gian TB toàn trường</span>
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-700 dark:text-blue-300 tabular-nums">
            {formatSeconds(overallAvgTime)}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Trung bình mỗi lượt kiểm tra 5 câu
          </div>
        </div>

        {/* Card 2: Total Analyzed Submissions */}
        <div className="bg-white/95 dark:bg-slate-900/95 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>Tổng lượt nộp bài phân tích</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 tabular-nums">
            {totalSubmissions.toLocaleString('vi-VN')}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Đồng bộ thời gian thực từ Firestore
          </div>
        </div>

        {/* Card 3: Fastest Topic */}
        <div className="bg-white/95 dark:bg-slate-900/95 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>Chủ đề hoàn thành nhanh nhất</span>
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white truncate">
            {fastestTopic ? `${fastestTopic.emoji} ${fastestTopic.name}` : 'Đang tổng hợp...'}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            {fastestTopic ? `TB: ${formatSeconds(fastestTopic.avgTimeSeconds)} (${fastestTopic.count} bài)` : '---'}
          </div>
        </div>

        {/* Card 4: Most Comprehensive / Longest Topic */}
        <div className="bg-white/95 dark:bg-slate-900/95 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1">
            <span>Chủ đề cần nhiều thời gian nhất</span>
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white truncate">
            {deepestTopic ? `${deepestTopic.emoji} ${deepestTopic.name}` : 'Đang tổng hợp...'}
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-bold mt-1">
            {deepestTopic ? `TB: ${formatSeconds(deepestTopic.avgTimeSeconds)} (${deepestTopic.count} bài)` : '---'}
          </div>
        </div>
      </div>

      {/* Filter and Sorting Control Bar */}
      <div className="bg-white/95 dark:bg-slate-900/95 p-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Grade Filter Pill Group */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Khối lớp:</span>
          </span>

          {[
            { id: 'ALL', label: 'Tất cả khối' },
            { id: '3', label: 'Khối 3 (3A, 3B, 3C)' },
            { id: '4', label: 'Khối 4 (4A, 4B, 4C, 4D)' },
            { id: '5', label: 'Khối 5 (5A, 5B, 5D)' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedGrade(tab.id as 'ALL' | '3' | '4' | '5')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline font-medium">
            Sắp xếp theo:
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="count-desc">Số lượt nộp (Nhiều nhất)</option>
            <option value="time-asc">Thời gian hoàn thành (Nhanh nhất)</option>
            <option value="time-desc">Thời gian hoàn thành (Lâu nhất)</option>
            <option value="score-desc">Điểm số trung bình (Cao nhất)</option>
          </select>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-3.5 px-5">Chủ đề bài học</th>
                <th className="py-3.5 px-4 text-center">Khối áp dụng</th>
                <th className="py-3.5 px-4 text-center">Lượt nộp bài</th>
                <th className="py-3.5 px-4">Thời gian trung bình</th>
                <th className="py-3.5 px-4 text-center">Điểm TB</th>
                <th className="py-3.5 px-4 text-center">Độ chính xác</th>
                <th className="py-3.5 px-5 text-right">Đánh giá tiến độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {subjectStats.map((row, idx) => {
                const pace = getPaceStatus(row.avgTimeSeconds, row.count, row.avgAccuracy);
                // Calculate relative bar width (0-100%) against a baseline of 90s
                const timePercentage = Math.min(100, Math.max(8, Math.round((row.avgTimeSeconds / 90) * 100)));

                return (
                  <tr
                    key={row.subjectId}
                    className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Subject info */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform">
                          {row.emoji}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {row.name}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {SUBJECTS_MAP[row.subjectId]?.meta || 'Chuẩn GDPT 2018'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Grade Level */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                        {row.gradeLevel}
                      </span>
                    </td>

                    {/* Submissions count */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {row.count.toLocaleString('vi-VN')}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {totalSubmissions > 0
                          ? `${Math.round((row.count / totalSubmissions) * 100)}% tổng số`
                          : '0%'}
                      </div>
                    </td>

                    {/* Average completion time with bar indicator */}
                    <td className="py-3.5 px-4 min-w-[170px]">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-900 dark:text-white mb-1">
                        <span>{formatSeconds(row.avgTimeSeconds)}</span>
                        {row.count > 0 && (
                          <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                            (Nhanh nhất: {formatSeconds(row.minTimeSeconds)})
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            row.avgTimeSeconds <= 35
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              : row.avgTimeSeconds <= 55
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500'
                          }`}
                          style={{ width: `${row.count > 0 ? timePercentage : 0}%` }}
                        />
                      </div>
                    </td>

                    {/* Average Score */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-sm ${
                          row.avgScore >= 80
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : row.avgScore >= 65
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {row.count > 0 ? `${row.avgScore}đ` : '---'}
                      </span>
                    </td>

                    {/* Average Accuracy */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`font-mono font-bold text-xs ${
                          row.avgAccuracy >= 80
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : row.avgAccuracy >= 65
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {row.count > 0 ? `${row.avgAccuracy}%` : '---'}
                      </span>
                    </td>

                    {/* Pace / Progress Evaluation Badge */}
                    <td className="py-3.5 px-5 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[11px] font-bold border ${pace.color}`}
                      >
                        {pace.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info note inside table */}
        <div className="p-4 bg-slate-50/50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>
              Dữ liệu được cập nhật tự động tức thì mỗi khi có học sinh nộp bài tập từ bất kỳ máy tính nào.
            </span>
          </div>
          <div className="text-[11px] font-medium">
            Chuẩn thời gian tham chiếu: 30s - 60s cho mỗi bộ 5 câu hỏi thực hành.
          </div>
        </div>
      </div>
    </section>
  );
};
