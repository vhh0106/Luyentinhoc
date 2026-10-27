import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Tooltip,
  Legend
} from 'recharts';
import { SubjectId } from '../../types';
import { SUBJECTS_MAP, SUBJECT_LESSONS } from '../../data/curriculum';
import { getResults } from '../../services/storage';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Flame,
  Star,
  Medal
} from 'lucide-react';

interface StudentProgressChartProps {
  completedLessonIds: string[];
  assignedSubjects?: SubjectId[];
  studentName: string;
  classCode: string;
  onSelectSubject?: (subjectId: SubjectId) => void;
  onOpenAchievements?: () => void;
  onOpenLeaderboard?: () => void;
  onClose?: () => void;
}

// Visual color palette for 10 subjects
const SUBJECT_COLORS: Record<SubjectId, { main: string; light: string; gradient: [string, string] }> = {
  go: { main: '#3b82f6', light: '#dbeafe', gradient: ['#3b82f6', '#1d4ed8'] },
  'go-tv': { main: '#f43f5e', light: '#ffe4e6', gradient: ['#f43f5e', '#be123c'] },
  chuot: { main: '#f59e0b', light: '#fef3c7', gradient: ['#f59e0b', '#b45309'] },
  ic3: { main: '#6366f1', light: '#e0e7ff', gradient: ['#6366f1', '#4338ca'] },
  word: { main: '#0284c7', light: '#e0f2fe', gradient: ['#0284c7', '#0369a1'] },
  excel: { main: '#10b981', light: '#d1fae5', gradient: ['#10b981', '#047857'] },
  powerpoint: { main: '#ea580c', light: '#ffedd5', gradient: ['#ea580c', '#c2410c'] },
  'thuat-toan': { main: '#8b5cf6', light: '#ede9fe', gradient: ['#8b5cf6', '#6d28d9'] },
  cdso: { main: '#06b6d4', light: '#cffafe', gradient: ['#06b6d4', '#0e7490'] },
  ai: { main: '#ec4899', light: '#fce7f3', gradient: ['#ec4899', '#be185d'] },
  sgk: { main: '#0d9488', light: '#f0fdfa', gradient: ['#0d9488', '#0f766e'] }
};

export const StudentProgressChart: React.FC<StudentProgressChartProps> = ({
  completedLessonIds,
  assignedSubjects,
  studentName,
  classCode,
  onSelectSubject,
  onOpenAchievements,
  onOpenLeaderboard,
  onClose
}) => {
  const [chartType, setChartType] = useState<'radial' | 'donut'>('radial');
  const [filterMode, setFilterMode] = useState<'assigned' | 'all'>('assigned');
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState<SubjectId | null>(null);

  // Load results from storage to compute accuracy and points
  const results = useMemo(() => {
    return getResults().filter(r => r.studentName === studentName && r.classCode === classCode);
  }, [studentName, classCode]);

  // Compute stats for active subjects (strictly respect assignedSubjects in 'assigned' mode, including when empty)
  const allSubjectIds = Object.keys(SUBJECTS_MAP) as SubjectId[];
  const activeSubjectIds =
    filterMode === 'assigned' && assignedSubjects !== undefined
      ? assignedSubjects
      : allSubjectIds;

  const subjectStats = useMemo(() => {
    return activeSubjectIds.map(sId => {
      const info = SUBJECTS_MAP[sId];
      const lessons = SUBJECT_LESSONS[sId] || [];
      const totalLessons = lessons.length;

      // Count completed
      const completedCount = lessons.filter(l =>
        completedLessonIds.includes(`${sId}-${l.id}`)
      ).length;

      const completionRate = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

      // Accuracy from results
      const subjectResults = results.filter(r => r.subjectId === sId);
      const avgAccuracy = subjectResults.length > 0
        ? Math.round(subjectResults.reduce((acc, r) => acc + (r.accuracy || 100), 0) / subjectResults.length)
        : (completedCount > 0 ? 100 : 0);

      const colors = SUBJECT_COLORS[sId] || { main: '#3b82f6', light: '#dbeafe', gradient: ['#3b82f6', '#1d4ed8'] };

      return {
        id: sId,
        name: info?.name || sId,
        emoji: info?.emoji || '📚',
        totalLessons,
        completedCount,
        completionRate,
        avgAccuracy,
        color: colors.main,
        lightColor: colors.light,
        gradient: colors.gradient
      };
    });
  }, [activeSubjectIds, completedLessonIds, results]);

  // Total lessons and overall completion
  const totalAvailableLessons = subjectStats.reduce((sum, s) => sum + s.totalLessons, 0);
  const totalCompletedLessons = subjectStats.reduce((sum, s) => sum + s.completedCount, 0);
  const overallPercentage = totalAvailableLessons > 0
    ? Math.round((totalCompletedLessons / totalAvailableLessons) * 100)
    : 0;

  // Data for Recharts RadialBarChart
  // RadialBar displays concentric rings sorted by completion
  const radialData = useMemo(() => {
    return subjectStats.map(s => ({
      name: `${s.emoji} ${s.name}`,
      percent: s.completionRate,
      completed: s.completedCount,
      total: s.totalLessons,
      fill: s.color,
      subjectId: s.id
    })).sort((a, b) => a.percent - b.percent);
  }, [subjectStats]);

  // Data for Recharts Donut PieChart
  // Shows contribution of completed lessons per subject, with remaining quota
  const donutData = useMemo(() => {
    const list = subjectStats.map(s => ({
      name: `${s.emoji} ${s.name}`,
      value: s.completedCount > 0 ? s.completedCount : 1, // small sliver if 0 so visible
      actualCompleted: s.completedCount,
      total: s.totalLessons,
      percent: s.completionRate,
      color: s.color,
      subjectId: s.id
    }));
    return list;
  }, [subjectStats]);

  // Milestones badges (65 unique lessons total)
  const milestones = [
    { title: 'Bắt đầu hành trình', count: 1, icon: '🌱', achieved: totalCompletedLessons >= 1 },
    { title: 'Chăm chỉ luyện tập', count: 10, icon: '⚡', achieved: totalCompletedLessons >= 10 },
    { title: 'Chiến binh Tin học', count: 25, icon: '🛡️', achieved: totalCompletedLessons >= 25 },
    { title: 'Bậc thầy 10 ngón', count: 45, icon: '👑', achieved: totalCompletedLessons >= 45 },
    { title: 'Nhà vô địch số', count: 65, icon: '🏆', achieved: totalCompletedLessons >= 65 },
  ];

  // Custom tooltip for Radial Bar
  const CustomRadialTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-slate-200 text-xs z-50">
          <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-1">
            <span>{data.name}</span>
          </div>
          <div className="space-y-1 text-slate-600">
            <div className="flex justify-between gap-4">
              <span>Đã hoàn thành:</span>
              <strong className="text-blue-600">{data.completed} / {data.total} bài</strong>
            </div>
            <div className="flex justify-between gap-4">
              <span>Tỉ lệ hoàn thành:</span>
              <strong className="text-emerald-600">{data.percent}%</strong>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white p-6 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-blue-100">
              <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
              <span>BẢNG TIẾN ĐỘ HỌC TẬP THÔNG MINH</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">
              Tiến độ của {studentName} · Lớp {classCode} 📊
            </h2>
            <p className="text-xs text-blue-100 max-w-xl">
              Theo dõi tỉ lệ hoàn thành 10 kĩ năng Tin học chuẩn chương trình GDPT 2018 Kết Nối Tri Thức.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <div className="text-2xl font-black text-amber-300">{overallPercentage}%</div>
              <div className="text-[10px] font-semibold text-blue-100 uppercase tracking-wider">Tổng hoàn thành</div>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <div className="text-2xl font-black text-emerald-300">{totalCompletedLessons}/{totalAvailableLessons}</div>
              <div className="text-[10px] font-semibold text-blue-100 uppercase tracking-wider">Bài học đã xong</div>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center font-bold text-sm transition-colors"
                title="Đóng bảng tiến độ"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Controls row */}
        <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Filter subject toggle */}
          <div className="flex items-center bg-white/15 backdrop-blur-md p-1 rounded-xl border border-white/20">
            <button
              onClick={() => setFilterMode('assigned')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterMode === 'assigned'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Môn được giao ({assignedSubjects ? assignedSubjects.length : 0} môn)
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Tổng quan chương trình (10 môn)
            </button>
          </div>

          {/* Chart mode toggle */}
          <div className="flex items-center bg-white/15 backdrop-blur-md p-1 rounded-xl border border-white/20">
            <button
              onClick={() => setChartType('radial')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartType === 'radial'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Vòng tròn đa tầng (Radial Bar)
            </button>
            <button
              onClick={() => setChartType('donut')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                chartType === 'donut'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Vành khăn tỷ trọng (Donut)
            </button>
          </div>


        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Chart Area */}
          <div className="lg:col-span-7 bg-slate-50/70 dark:bg-slate-800/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 flex flex-col items-center justify-center relative min-h-[380px]">
            {/* Center Gauge Indicator in middle of chart */}
            <div className="w-full h-80 relative flex items-center justify-center">
              {chartType === 'radial' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="18%"
                    outerRadius="100%"
                    data={radialData}
                    startAngle={180}
                    endAngle={-180}
                  >
                    <RadialBar
                      background={{ fill: '#334155' }}
                      dataKey="percent"
                      cornerRadius={10}
                    />
                    <Tooltip content={<CustomRadialTooltip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={115}
                      paddingAngle={3}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomRadialTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}

              {/* Central Badge Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full bg-white/95 dark:bg-slate-800 shadow-md border-2 border-indigo-100 dark:border-indigo-900 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-xl">🌟</span>
                  <div className="text-xl font-black text-slate-900 dark:text-white leading-none mt-0.5">
                    {overallPercentage}%
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter mt-1">
                    Hoàn thành
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Chart Legend */}
            <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2">
              💡 Rê chuột vào từng vòng màu để xem số bài đã làm của từng môn
            </div>
          </div>

          {/* Right Highlights & Milestones */}
          <div className="lg:col-span-5 space-y-4">
            {/* Overall status card */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-indigo-950/60 p-5 rounded-3xl border border-indigo-100 dark:border-indigo-900">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                  <Trophy className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {overallPercentage >= 80
                      ? 'Xuất sắc! Em sắp chinh phục tất cả!'
                      : overallPercentage >= 50
                      ? 'Rất tốt! Em đã đi được hơn nửa chặng đường!'
                      : overallPercentage >= 20
                      ? 'Khởi đầu tuyệt vời! Hãy tiếp tục phát huy!'
                      : 'Hãy bắt đầu làm bài để ghi điểm nhé!'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {totalCompletedLessons} bài đã làm xong trên tổng số {totalAvailableLessons} bài.
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-indigo-200/70 dark:bg-indigo-950 h-3 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, overallPercentage)}%` }}
                />
              </div>
            </div>

            {/* Milestones list */}
            <div className="bg-white dark:bg-slate-800/90 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  Mốc thành tích học tập
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                    {milestones.filter(m => m.achieved).length} / {milestones.length} Đã đạt
                  </span>
                  {onOpenAchievements && (
                    <button
                      onClick={onOpenAchievements}
                      className="text-[10px] font-bold text-amber-800 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900 px-2.5 py-1 rounded-lg border border-amber-300 dark:border-amber-800 transition-colors flex items-center gap-1"
                    >
                      <Trophy className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span>Kho Huy Hiệu</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border text-xs transition-all ${
                      m.achieved
                        ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-slate-800 dark:text-slate-100 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{m.icon}</span>
                      <span>{m.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {m.achieved ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đạt
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {totalCompletedLessons}/{m.count} bài
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 10 Subjects Detailed Cards Grid with Circular Progress Indicators */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Chi tiết tiến độ từng môn học ({subjectStats.length} môn)
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Nhấp "Luyện tập ngay" để chuyển đến môn học
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {subjectStats.map(s => {
              const isSelected = selectedSubjectDetail === s.id;
              const radius = 22;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (s.completionRate / 100) * circumference;

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSubjectDetail(s.id === selectedSubjectDetail ? null : s.id)}
                  className={`bg-white dark:bg-slate-800/90 p-4 rounded-3xl border transition-all duration-200 flex flex-col justify-between cursor-pointer hover:shadow-md ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900 shadow-md'
                      : 'border-slate-200/80 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div>
                    {/* Top row: Emoji & Mini circular SVG gauge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center text-xl shadow-2xs">
                        {s.emoji}
                      </div>

                      {/* Circular SVG Progress Ring */}
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            stroke="#334155"
                            strokeWidth="4"
                            fill="transparent"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r={radius}
                            stroke={s.color}
                            strokeWidth="4"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="transparent"
                            className="transition-all duration-700 ease-out"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-black text-slate-800 dark:text-slate-100">
                          {s.completionRate}%
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                      {s.name}
                    </h4>

                    <div className="mt-2 space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                      <div className="flex items-center justify-between">
                        <span>Đã làm:</span>
                        <strong className="text-slate-800 dark:text-white font-bold">
                          {s.completedCount} / {s.totalLessons} bài
                        </strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Độ chính xác:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {s.avgAccuracy}%
                        </strong>
                      </div>
                    </div>
                  </div>

                  {/* Action button: only allow starting exercise if subject is currently assigned */}
                  {onSelectSubject && (!assignedSubjects || assignedSubjects.includes(s.id)) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSubject(s.id);
                      }}
                      className="mt-3 w-full py-1.5 px-2 rounded-xl text-[11px] font-bold text-white transition-all shadow-2xs flex items-center justify-center gap-1 hover:opacity-95"
                      style={{ backgroundColor: s.color }}
                    >
                      <span>Luyện tập ngay</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {subjectStats.length === 0 && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500 dark:text-slate-400">
              Hiện chưa có môn học nào được giao cho Lớp {classCode}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
