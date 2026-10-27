import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ComposedChart,
  Line,
  Area,
  Cell
} from 'recharts';
import { Assignment, ExerciseResult, SubjectId, StudentAccount } from '../../types';
import { SUBJECTS_MAP, SUBJECT_LESSONS } from '../../data/curriculum';
import { getStudents } from '../../services/storage';
import {
  BarChart3,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Users,
  Layers,
  Sparkles,
  RefreshCw,
  Filter,
  ArrowUpRight,
  Info,
  Calendar,
  Zap,
  Target
} from 'lucide-react';

interface ClassPerformanceAnalyticsProps {
  assignments: Assignment[];
  results: ExerciseResult[];
  students?: StudentAccount[];
  onRefreshCloud?: () => Promise<void>;
  isRefreshing?: boolean;
}

// 10 subjects color palette matching app design
const SUBJECT_COLORS: Record<SubjectId, { main: string; light: string; border: string }> = {
  go: { main: '#2563eb', light: '#dbeafe', border: '#93c5fd' },
  'go-tv': { main: '#e11d48', light: '#ffe4e6', border: '#fda4af' },
  chuot: { main: '#059669', light: '#d1fae5', border: '#6ee7b7' },
  ic3: { main: '#d97706', light: '#fef3c7', border: '#fcd34d' },
  word: { main: '#2563eb', light: '#eff6ff', border: '#bfdbfe' },
  excel: { main: '#16a34a', light: '#f0fdf4', border: '#bbf7d0' },
  powerpoint: { main: '#ea580c', light: '#fff7ed', border: '#fed7aa' },
  'thuat-toan': { main: '#7c3aed', light: '#f5f3ff', border: '#ddd6fe' },
  cdso: { main: '#0891b2', light: '#ecfeff', border: '#a5f3fc' },
  ai: { main: '#db2777', light: '#fdf2f8', border: '#fbcfe8' },
  sgk: { main: '#0d9488', light: '#f0fdfa', border: '#99f6e4' }
};

export const ClassPerformanceAnalytics: React.FC<ClassPerformanceAnalyticsProps> = ({
  assignments,
  results,
  students: propStudents,
  onRefreshCloud,
  isRefreshing = false
}) => {
  const allStudents = useMemo(() => propStudents || getStudents(), [propStudents]);

  // Extract distinct class codes from assignments, registered students, and results
  const classCodes = useMemo(() => {
    const set = new Set<string>();
    assignments.forEach(a => set.add(a.classCode.toUpperCase()));
    allStudents.forEach(s => set.add(s.classCode.toUpperCase()));
    results.forEach(r => set.add(r.classCode.toUpperCase()));
    return Array.from(set).sort();
  }, [assignments, allStudents, results]);

  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [timeUnit, setTimeUnit] = useState<'minutes' | 'hours'>('minutes');
  const [activeChartTab, setActiveChartTab] = useState<'both' | 'completion' | 'time'>('both');

  // Filtered results for the selected class
  const classResults = useMemo(() => {
    if (selectedClass === 'ALL') {
      return results;
    }
    return results.filter(r => r.classCode.toUpperCase() === selectedClass.toUpperCase());
  }, [results, selectedClass]);

  // Distinct real students in the selected class (from roster + submissions)
  const studentNames = useMemo(() => {
    const set = new Set<string>();
    if (selectedClass === 'ALL') {
      allStudents.forEach(s => set.add(s.studentName.trim()));
      classResults.forEach(r => set.add(r.studentName.trim()));
    } else {
      allStudents
        .filter(s => s.classCode.toUpperCase() === selectedClass.toUpperCase())
        .forEach(s => set.add(s.studentName.trim()));
      classResults.forEach(r => set.add(r.studentName.trim()));
    }
    return Array.from(set);
  }, [allStudents, classResults, selectedClass]);

  // Calculate subject-level aggregated performance metrics strictly from real data
  const subjectPerformanceData = useMemo(() => {
    const allSubjectIds = Object.keys(SUBJECTS_MAP) as SubjectId[];

    return allSubjectIds.map(subId => {
      const subInfo = SUBJECTS_MAP[subId];
      const totalLessons = SUBJECT_LESSONS[subId]?.length || 10;
      const subResults = classResults.filter(r => r.subjectId === subId);

      // Total time spent in seconds
      const rawSeconds = subResults.reduce((sum, r) => sum + (r.timeSpentSeconds || 0), 0);
      const totalMinutes = Number((rawSeconds / 60).toFixed(1));

      // Average score and accuracy
      const avgScore = subResults.length > 0
        ? Math.round(subResults.reduce((s, r) => s + r.score, 0) / subResults.length)
        : 0;

      const avgAccuracy = subResults.length > 0
        ? Math.round(subResults.reduce((s, r) => s + r.accuracy, 0) / subResults.length)
        : 0;

      // Completion rate calculation:
      // Percentage of unique lessons completed by students in the class
      const uniqueStudentLessons = new Set(subResults.map(r => `${r.studentName.trim()}_${r.lessonId}`)).size;
      const studentCount = Math.max(1, studentNames.length);
      const completionRate = studentNames.length > 0
        ? Math.min(100, Math.round((uniqueStudentLessons / (studentCount * totalLessons)) * 100))
        : 0;

      const totalTimeDisplay = timeUnit === 'hours'
        ? Number((totalMinutes / 60).toFixed(2))
        : Math.round(totalMinutes);

      const avgTimePerStudentMinutes = studentNames.length > 0
        ? Number((totalMinutes / studentCount).toFixed(1))
        : 0;
      const avgTimePerLessonMinutes = subResults.length > 0
        ? Number((totalMinutes / subResults.length).toFixed(1))
        : 0;

      return {
        subjectId: subId,
        subjectName: subInfo.name,
        shortName: `${subInfo.emoji} ${subInfo.name.split(' ')[0]}`,
        fullNameWithEmoji: `${subInfo.emoji} ${subInfo.name}`,
        emoji: subInfo.emoji,
        totalLessons,
        submissionsCount: subResults.length,
        completionRate,
        totalTimeMinutes: Math.round(totalMinutes),
        totalTimeDisplay,
        avgTimePerStudentMinutes,
        avgTimePerLessonMinutes,
        avgScore,
        avgAccuracy,
        color: SUBJECT_COLORS[subId].main,
        lightColor: SUBJECT_COLORS[subId].light,
        borderColor: SUBJECT_COLORS[subId].border
      };
    });
  }, [classResults, studentNames, timeUnit]);

  // Overall Class Summary Metrics
  const classSummary = useMemo(() => {
    const totalRates = subjectPerformanceData.reduce((sum, s) => sum + s.completionRate, 0);
    const avgCompletion = Math.round(totalRates / subjectPerformanceData.length);

    const totalMinutes = subjectPerformanceData.reduce((sum, s) => sum + s.totalTimeMinutes, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);

    // Subject with highest completion
    const sortedByCompletion = [...subjectPerformanceData].sort((a, b) => b.completionRate - a.completionRate);
    const highestCompletionSubject = sortedByCompletion[0];

    // Subject with most time spent
    const sortedByTime = [...subjectPerformanceData].sort((a, b) => b.totalTimeMinutes - a.totalTimeMinutes);
    const mostTimeSubject = sortedByTime[0];

    return {
      avgCompletion,
      totalMinutes,
      totalHours,
      highestCompletionSubject,
      mostTimeSubject,
      studentCount: studentNames.length
    };
  }, [subjectPerformanceData, studentNames]);


  // Custom Recharts Tooltip for Completion Rate Chart
  const CustomCompletionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 text-xs space-y-1.5 z-50">
          <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-1">
            <span>{data.fullNameWithEmoji}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Tỉ lệ hoàn thành TB:</span>
            <strong className="text-blue-600 font-extrabold text-sm">{data.completionRate}%</strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Tổng thời gian luyện tập:</span>
            <strong className="text-amber-600 font-bold">{data.totalTimeMinutes} phút</strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Điểm số trung bình:</span>
            <strong className="text-emerald-600 font-bold">{data.avgScore} / 100</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom Recharts Tooltip for Time Spent Chart
  const CustomTimeTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 text-xs space-y-1.5 z-50">
          <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-1">
            <span>{data.fullNameWithEmoji}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">Tổng thời gian cả lớp:</span>
            <strong className="text-amber-600 font-extrabold text-sm">
              {data.totalTimeMinutes} phút ({Math.floor(data.totalTimeMinutes / 60)}h {data.totalTimeMinutes % 60}p)
            </strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">TB mỗi học sinh:</span>
            <strong className="text-indigo-600 font-bold">{data.avgTimePerStudentMinutes} phút</strong>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">TB mỗi bài tập:</span>
            <strong className="text-slate-700 font-bold">{data.avgTimePerLessonMinutes} phút / bài</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Control Header: Class Switcher & Cloud Status */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black shadow-sm">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Hiệu Suất Lớp Học (Class Performance)
              </h2>
              <p className="text-xs text-slate-500">
                Trực quan hóa tỉ lệ hoàn thành và thời gian luyện tập 10 môn qua Recharts
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block" />

          {/* Classroom Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setSelectedClass('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedClass === 'ALL'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả các lớp
            </button>
            {classCodes.map(code => (
              <button
                key={code}
                onClick={() => setSelectedClass(code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedClass === code
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lớp {code}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Chart View Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveChartTab('both')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                activeChartTab === 'both' ? 'bg-white text-blue-600 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Song song
            </button>
            <button
              onClick={() => setActiveChartTab('completion')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                activeChartTab === 'completion' ? 'bg-white text-blue-600 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Hoàn thành (%)
            </button>
            <button
              onClick={() => setActiveChartTab('time')}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                activeChartTab === 'time' ? 'bg-white text-amber-600 shadow-2xs' : 'hover:text-slate-900'
              }`}
            >
              Thời gian (phút)
            </button>
          </div>

          {onRefreshCloud && (
            <button
              onClick={onRefreshCloud}
              disabled={isRefreshing}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
              title="Lấy dữ liệu nộp bài mới nhất từ Firestore"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards: 4 Core Analytics Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Average Completion */}
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-blue-50/30 p-5 rounded-3xl border border-blue-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-blue-700 uppercase tracking-wider mb-2">
            <span>Tỉ Lệ Hoàn Thành TB</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {classSummary.avgCompletion}%
          </div>
          <div className="mt-2 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-700"
              style={{ width: `${classSummary.avgCompletion}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
            <span>Sĩ số tham gia: <strong>{classSummary.studentCount} bạn</strong></span>
            <span className="text-blue-600 font-semibold">Chuẩn BGD</span>
          </div>
        </div>

        {/* Card 2: Total Time Spent */}
        <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 p-5 rounded-3xl border border-amber-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
            <span>Tổng Thời Gian Luyện</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-950">
            {classSummary.totalHours} <span className="text-base font-bold text-amber-700">giờ</span>
          </div>
          <div className="text-xs text-amber-900/80 font-medium mt-1">
            Tương đương {classSummary.totalMinutes.toLocaleString('vi-VN')} phút
          </div>
          <div className="text-[11px] text-slate-500 mt-2">
            Trung bình <strong>{classSummary.studentCount > 0 ? Math.round(classSummary.totalMinutes / classSummary.studentCount) : 0} phút</strong> / học sinh
          </div>
        </div>

        {/* Card 3: Highest Completed Subject */}
        <div className="bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/30 p-5 rounded-3xl border border-emerald-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Môn Dẫn Đầu Tiến Độ</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900 line-clamp-1 flex items-center gap-1.5">
            <span>{classSummary.highestCompletionSubject?.emoji}</span>
            <span>{classSummary.highestCompletionSubject?.subjectName}</span>
          </div>
          <div className="text-2xl font-black text-emerald-600 mt-1">
            {classSummary.highestCompletionSubject?.completionRate}% hoàn thành
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Đạt chuẩn kiến thức nhanh nhất
          </div>
        </div>

        {/* Card 4: Most Time Spent Subject */}
        <div className="bg-gradient-to-br from-purple-50/80 via-white to-purple-50/30 p-5 rounded-3xl border border-purple-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold text-purple-700 uppercase tracking-wider mb-2">
            <span>Môn Dành Nhiều Thời Gian</span>
            <Zap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900 line-clamp-1 flex items-center gap-1.5">
            <span>{classSummary.mostTimeSubject?.emoji}</span>
            <span>{classSummary.mostTimeSubject?.subjectName}</span>
          </div>
          <div className="text-2xl font-black text-purple-700 mt-1">
            {classSummary.mostTimeSubject?.totalTimeMinutes} phút
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Các em tập trung thực hành sâu
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Average Completion Rate per Subject */}
        {(activeChartTab === 'both' || activeChartTab === 'completion') && (
          <div className={`bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 ${
            activeChartTab === 'completion' ? 'lg:col-span-2' : ''
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Biểu Đồ 1: Tỉ Lệ Hoàn Thành (%)</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Tỉ lệ hoàn thành trung bình của cả lớp ({selectedClass === 'ALL' ? 'Toàn khối' : `Lớp ${selectedClass}`})
                </h3>
              </div>
              <div className="text-xs text-slate-500 font-semibold">
                Mục tiêu: <span className="text-emerald-600 font-black">≥ 70%</span>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={val => `${val}%`}
                  />
                  <Tooltip content={<CustomCompletionTooltip />} />
                  <ReferenceLine y={70} stroke="#10b981" strokeDasharray="4 4" label={{ value: 'Chuẩn 70%', position: 'insideTopRight', fill: '#059669', fontSize: 10, fontWeight: 700 }} />
                  <Bar
                    dataKey="completionRate"
                    name="Tỉ lệ hoàn thành"
                    radius={[6, 6, 0, 0]}
                  >
                    {subjectPerformanceData.map((entry) => (
                      <Cell key={entry.subjectId} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>Cột màu đại diện cho 10 môn Tin học</span>
              </span>
              <span className="text-slate-400 text-[11px]">
                Đường đứt nét xanh lá: Ngưỡng đạt chuẩn Kết Nối Tri Thức
              </span>
            </div>
          </div>
        )}

        {/* CHART 2: Time Spent per Subject */}
        {(activeChartTab === 'both' || activeChartTab === 'time') && (
          <div className={`bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4 ${
            activeChartTab === 'time' ? 'lg:col-span-2' : ''
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Biểu Đồ 2: Thời Gian Luyện Tập</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  Thời lượng đầu tư theo từng môn học ({timeUnit === 'minutes' ? 'Phút' : 'Giờ'})
                </h3>
              </div>

              {/* Time unit toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold text-slate-600">
                <button
                  onClick={() => setTimeUnit('minutes')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeUnit === 'minutes' ? 'bg-white text-amber-600 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  Phút
                </button>
                <button
                  onClick={() => setTimeUnit('hours')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeUnit === 'hours' ? 'bg-white text-amber-600 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  Giờ
                </button>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    tickFormatter={val => `${val} ${timeUnit === 'minutes' ? 'p' : 'h'}`}
                  />
                  <Tooltip content={<CustomTimeTooltip />} />
                  <Bar
                    dataKey="totalTimeDisplay"
                    name="Thời gian luyện tập"
                    radius={[6, 6, 0, 0]}
                    fill="#f59e0b"
                  >
                    {subjectPerformanceData.map((entry) => (
                      <Cell key={entry.subjectId} fill={entry.color} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Tổng thời gian cả lớp: <strong>{classSummary.totalHours} giờ</strong></span>
              </span>
              <span className="text-slate-400 text-[11px]">
                Di chuột vào từng cột để xem thời gian trung bình mỗi bạn
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Dual Correlation Chart: Completion vs Time Correlation */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-700">
              <Target className="w-4 h-4 text-purple-600" />
              <span>Biểu Đồ 3: Tương Quan Tiến Độ & Thời Lượng Đầu Tư</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
              Phân tích đa chiều: Tỉ lệ hoàn thành (%) so với Thời lượng học sinh thực hành (Phút)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-blue-600">
              <span className="w-3 h-3 rounded-sm bg-blue-600" />
              <span>Hoàn thành (%)</span>
            </span>
            <span className="flex items-center gap-1 text-amber-600">
              <span className="w-3 h-1 bg-amber-500" />
              <span>Thời gian (phút)</span>
            </span>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={subjectPerformanceData} margin={{ top: 15, right: 15, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="shortName"
                tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              {/* Left Axis: Completion % */}
              <YAxis
                yAxisId="left"
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: '#2563eb' }}
                tickFormatter={val => `${val}%`}
              />
              {/* Right Axis: Minutes */}
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#d97706' }}
                tickFormatter={val => `${val}p`}
              />
              <Tooltip content={<CustomCompletionTooltip />} />
              <Bar
                yAxisId="left"
                dataKey="completionRate"
                name="Tỉ lệ hoàn thành"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                barSize={28}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalTimeMinutes"
                name="Thời gian (phút)"
                stroke="#d97706"
                strokeWidth={3}
                dot={{ r: 5, fill: '#d97706', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Gợi ý sư phạm cho Thầy/Cô:</strong> Môn có thanh xanh cao và đường cam cao (như <em>Gõ phím, Thuật toán</em>) chứng tỏ học sinh dành nhiều thời gian và nắm chắc bài. Nếu môn nào có đường cam cao nhưng thanh xanh thấp, học sinh đang gặp vướng mắc và cần giáo viên hướng dẫn thêm.
          </p>
        </div>
      </div>

      {/* Comprehensive 10-Subject Performance Breakdown Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Bảng Tổng Hợp Chi Tiết 10 Môn Học ({selectedClass === 'ALL' ? 'Toàn Trường' : `Lớp ${selectedClass}`})
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {subjectPerformanceData.length} chủ đề GDPT 2018
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-black uppercase tracking-wider text-slate-500">
                <th className="py-3 px-5">Chủ đề</th>
                <th className="py-3 px-4 text-center">Tiến độ TB</th>
                <th className="py-3 px-4 text-center">Tổng thời lượng</th>
                <th className="py-3 px-4 text-center">TB / Học sinh</th>
                <th className="py-3 px-4 text-center">Điểm TB</th>
                <th className="py-3 px-4 text-center">Độ chính xác</th>
                <th className="py-3 px-5 text-right">Đánh giá sư phạm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {subjectPerformanceData.map(subject => {
                const isExcellent = subject.completionRate >= 80;
                const isGood = subject.completionRate >= 60;

                return (
                  <tr key={subject.subjectId} className="hover:bg-slate-50/80 transition-colors">
                    {/* Subject Name & Emoji */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl shrink-0">{subject.emoji}</span>
                        <div>
                          <div className="font-extrabold text-slate-900 text-sm">
                            {subject.subjectName}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {subject.totalLessons} bài học chuẩn Kết Nối Tri Thức
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Completion Rate Progress */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex flex-col items-center gap-1 w-28">
                        <span className="font-extrabold text-slate-900 text-xs">
                          {subject.completionRate}%
                        </span>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${subject.completionRate}%`,
                              backgroundColor: subject.color
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Total Time Spent */}
                    <td className="py-3.5 px-4 text-center font-bold text-amber-900">
                      <span className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
                        {subject.totalTimeMinutes} phút
                      </span>
                    </td>

                    {/* Avg Time Per Student */}
                    <td className="py-3.5 px-4 text-center font-semibold text-slate-600">
                      {subject.avgTimePerStudentMinutes} phút / bạn
                    </td>

                    {/* Average Score */}
                    <td className="py-3.5 px-4 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded-md ${
                        subject.avgScore >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                      }`}>
                        {subject.avgScore} đ
                      </span>
                    </td>

                    {/* Average Accuracy */}
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">
                      {subject.avgAccuracy}%
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-5 text-right">
                      {isExcellent ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Xuất sắc</span>
                        </span>
                      ) : isGood ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          <span>Đạt chuẩn</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Cần rèn thêm</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
