import React, { useState, useEffect } from 'react';
import { Assignment, ExerciseResult, SubjectId, TeacherAccount, StudentAccount, ClassRecord, UserFeedback } from '../types';
import { SUBJECTS_MAP } from '../data/curriculum';
import {
  getAssignments,
  saveAssignment,
  deleteAssignment,
  getResults,
  fetchAssignmentsFromCloud,
  getStudents,
  fetchStudentsFromCloud,
  getTeachers,
  fetchTeachersFromCloud,
  fetchAllResultsFromCloud,
  subscribeToResults,
  getClasses,
  fetchClassesFromCloud,
  saveClass,
  deleteClass,
  subscribeToClasses,
  subscribeToStudents,
  subscribeToAssignments,
  subscribeToTeachers,
  getFeedbacks,
  subscribeToFeedbacks,
  syncAllWithCloud
} from '../services/storage';
import {
  Plus,
  Trash2,
  Check,
  Users,
  BookOpen,
  Award,
  Layers,
  LogOut,
  X,
  Calendar,
  BarChart3,
  GraduationCap,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  CloudCheck,
  ArrowLeft,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { ClassPerformanceAnalytics } from './dashboard/ClassPerformanceAnalytics';
import { StudentManagement } from './dashboard/StudentManagement';
import { TeacherManagement } from './dashboard/TeacherManagement';
import { FeedbackManagement } from './dashboard/FeedbackManagement';
import { ThemeToggleButton } from './common/ThemeToggleButton';

interface TeacherDashboardProps {
  teacher: TeacherAccount;
  onLogout: () => void;
  onBackHome?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacher, onLogout, onBackHome }) => {
  const isAdmin = teacher.role === 'admin' || teacher.username.toLowerCase() === 'admin';

  const [activeTab, setActiveTab] = useState<
    'teachers' | 'students' | 'assignments' | 'performance' | 'submissions' | 'feedbacks'
  >('students');
  const [teachersList, setTeachersList] = useState<TeacherAccount[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<StudentAccount[]>([]);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [classesList, setClassesList] = useState<ClassRecord[]>(() => getClasses());
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => getFeedbacks());
  const [showModal, setShowModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [selectedClassFilter, setSelectedClassFilter] = useState<string | null>(null);

  // Assignment Form state (assigned per classCode, no separate assignment PIN)
  const [classCode, setClassCode] = useState('');
  const [note, setNote] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([
    'go',
    'go-tv',
    'chuot',
    'thuat-toan'
  ]);
  const [formError, setFormError] = useState<string | null>(null);
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);
  const [confirmDeleteAssignId, setConfirmDeleteAssignId] = useState<string | null>(null);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    loadData();

    // Multi-collection real-time listeners: live updates across all devices & shared links
    const unsubResults = subscribeToResults(live => setResults(live));
    const unsubStudents = subscribeToStudents(live => setStudents(live));
    const unsubAssignments = subscribeToAssignments(live => setAssignments(live));
    const unsubClasses = subscribeToClasses(live => setClassesList(live));
    const unsubTeachers = subscribeToTeachers(live => setTeachersList(live));
    const unsubFeedbacks = subscribeToFeedbacks(live => setFeedbacks(live));

    return () => {
      unsubResults();
      unsubStudents();
      unsubAssignments();
      unsubClasses();
      unsubTeachers();
      unsubFeedbacks();
    };
  }, []);

  const loadData = async () => {
    setTeachersList(getTeachers());
    setAssignments(getAssignments());
    setStudents(getStudents());
    setResults(getResults());
    setClassesList(getClasses());
    setFeedbacks(getFeedbacks());
    setIsCloudSyncing(true);
    try {
      await syncAllWithCloud();
      setTeachersList(getTeachers());
      setAssignments(getAssignments());
      setStudents(getStudents());
      setResults(getResults());
      setClassesList(getClasses());
      setFeedbacks(getFeedbacks());
    } catch (err) {
      console.warn('TeacherDashboard cloud sync:', err);
    } finally {
      setIsCloudSyncing(false);
    }
  };

  const handleToggleSubject = (subId: SubjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subId) ? prev.filter(id => id !== subId) : [...prev, subId]
    );
  };

  const handleSelectAllSubjects = () => {
    const allIds = Object.keys(SUBJECTS_MAP) as SubjectId[];
    setSelectedSubjects(allIds);
  };

  const handleClearAllSubjects = () => {
    setSelectedSubjects([]);
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const cleanClass = classCode.trim().toUpperCase();
    if (!cleanClass) {
      setFormError('Vui lòng nhập mã lớp học (Ví dụ: 3A, 4B, 5C)');
      return;
    }
    if (selectedSubjects.length === 0) {
      setFormError('Vui lòng chọn ít nhất 1 chủ đề bài tập cho lớp');
      return;
    }

    const newAssignment: Assignment = {
      id: `assign-${cleanClass}`,
      classCode: cleanClass,
      pin: '',
      subjects: selectedSubjects,
      teacherName: teacher.name,
      createdAt: new Date().toISOString(),
      note: note.trim() || `Bài tập Tin học Lớp ${cleanClass}`
    };

    await saveClass(cleanClass, `Lớp ${cleanClass}`, teacher.name);
    saveAssignment(newAssignment);
    loadData();
    setShowModal(false);
    setClassCode('');
    setNote('');
    setActiveTab('assignments');
    setBannerNotice(
      `Đã cập nhật chương trình bài tập cho Lớp ${newAssignment.classCode} (${newAssignment.subjects.length} chủ đề). Học sinh lớp ${newAssignment.classCode} chỉ cần đăng nhập bằng Mã PIN cá nhân của mình để làm bài!`
    );
  };

  const handleDeleteAssignment = async (id: string) => {
    const target = assignments.find(a => a.id === id);
    const targetClass = target?.classCode?.trim().toUpperCase();
    // Optimistically remove from view immediately so the card disappears with zero lag
    setAssignments(prev =>
      prev.filter(
        a => a.id !== id && (!targetClass || a.classCode.trim().toUpperCase() !== targetClass)
      )
    );
    setConfirmDeleteAssignId(null);
    try {
      await deleteAssignment(id, targetClass);
    } catch (err) {
      console.error('Lỗi khi xóa cấu hình bài tập:', err);
    }
    await loadData();
  };

  const filteredResults = selectedClassFilter
    ? results.filter(r => r.classCode.toUpperCase() === selectedClassFilter.toUpperCase())
    : results;

  const activeClassCount = new Set([
    ...classesList.map(c => c.classCode.toUpperCase()),
    ...assignments.map(a => a.classCode.toUpperCase()),
    ...students.map(s => s.classCode.toUpperCase())
  ]).size;

  return (
    <div className="space-y-6">
      {/* Top Back Navigation Bar */}
      {onBackHome && (
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Trang chủ</span>
          </button>
        </div>
      )}

      {/* Top Banner & Profile Bar */}
      <div className="bg-white dark:bg-slate-900/95 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1">
            <span>{isAdmin ? 'Hệ thống Quản trị viên (Admin)' : 'Không gian làm việc của Giáo Viên'}</span>
            <span>·</span>
            <span>Bộ sách Kết Nối Tri Thức</span>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Kính chào {teacher.name}! 👨‍🏫
            </h1>
            {isAdmin ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Admin Quản Trị
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Giáo Viên ({teacher.username})
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Trường: {teacher.school || 'Tiểu học Kết Nối Tri Thức'} · Mỗi học sinh dùng 1 Mã PIN cá nhân duy nhất để đăng nhập tài khoản của mình.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <ThemeToggleButton />

          <button
            onClick={loadData}
            disabled={isCloudSyncing}
            className="px-3.5 py-2.5 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold rounded-xl text-sm shadow-xs transition-all flex items-center gap-2"
            title="Đồng bộ 2 chiều dữ liệu với Cloud Firestore"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-600 dark:text-emerald-400 ${isCloudSyncing ? 'animate-spin' : ''}`} />
            <span>{isCloudSyncing ? 'Đang đồng bộ Cloud...' : 'Đồng bộ Cloud'}</span>
          </button>

          <button
            onClick={() => {
              setFormError(null);
              setShowModal(true);
            }}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Giao bài tập cho lớp</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-2.5 text-rose-700 dark:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Đăng xuất tài khoản"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {bannerNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{bannerNotice}</span>
          </div>
          <button
            onClick={() => setBannerNotice(null)}
            className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-950 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Stats Overview */}
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${isAdmin ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-4`}>
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
            <span>Tài khoản học sinh</span>
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {students.length}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Mỗi học sinh có 1 Mã PIN riêng
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
            <span>Số lớp học</span>
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
            {activeClassCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {assignments.length} lớp đã cấu hình chủ đề
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
            <span>Lượt học sinh nộp bài</span>
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-400 tabular-nums">
            {results.length}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            <button
              onClick={() => setShowResultsModal(true)}
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Xem chi tiết điểm số →
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
            <span>{isAdmin ? 'Tài khoản Giáo viên' : 'Kho chủ đề Kết Nối Tri Thức'}</span>
            {isAdmin ? (
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            )}
          </div>
          <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300 tabular-nums">
            {isAdmin ? teachersList.length : '10 / 10'}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {isAdmin ? 'Được cấp quyền bởi Admin' : 'Gõ phím, Chuột, Word, AI...'}
          </div>
        </div>

        {isAdmin && (
          <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-2">
              <span>Hòm thư góp ý</span>
              <MessageSquare className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums flex items-center gap-2">
              <span>{feedbacks.length}</span>
              {feedbacks.filter(f => f.status === 'pending').length > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold animate-pulse">
                  {feedbacks.filter(f => f.status === 'pending').length} mới
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              <button
                type="button"
                onClick={() => setActiveTab('feedbacks')}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Quản lý góp ý realtime →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Teacher / Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-3 flex-wrap">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'students'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Quản lý Tài khoản Học sinh ({students.length})</span>
        </button>

        {isAdmin && (
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'teachers'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Quản lý Tài khoản Giáo viên ({teachersList.length})</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-amber-950">
              Admin
            </span>
          </button>
        )}

        {isAdmin && (
          <button
            onClick={() => setActiveTab('feedbacks')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'feedbacks'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Quản lý Hòm thư Góp ý ({feedbacks.length})</span>
            {feedbacks.filter(f => f.status === 'pending').length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-rose-500 text-white animate-pulse">
                {feedbacks.filter(f => f.status === 'pending').length} mới
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-amber-400 text-amber-950">
              Admin
            </span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'assignments'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Giao Bài tập theo Lớp ({assignments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'performance'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-amber-400" />
          <span>Hiệu Suất Lớp Học</span>
        </button>

        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'submissions'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Lịch sử Nộp bài & Điểm số ({results.length})</span>
        </button>
      </div>

      {/* TAB: ADMIN TEACHER ACCOUNTS MANAGEMENT */}
      {activeTab === 'teachers' && isAdmin && (
        <TeacherManagement
          teachers={teachersList}
          currentTeacher={teacher}
          onRefresh={loadData}
          isSyncing={isCloudSyncing}
        />
      )}

      {/* TAB: ADMIN FEEDBACKS MANAGEMENT */}
      {activeTab === 'feedbacks' && isAdmin && (
        <FeedbackManagement
          feedbacks={feedbacks}
          onRefresh={loadData}
          isSyncing={isCloudSyncing}
        />
      )}

      {/* TAB: STUDENT ACCOUNTS MANAGEMENT (CRUD BY CLASS) */}
      {activeTab === 'students' && (
        <StudentManagement
          students={students}
          results={results}
          assignments={assignments}
          onRefresh={loadData}
          isSyncing={isCloudSyncing}
        />
      )}

      {/* TAB: CLASS PERFORMANCE (RECHARTS) */}
      {activeTab === 'performance' && (
        <ClassPerformanceAnalytics
          assignments={assignments}
          results={results}
          students={students}
          onRefreshCloud={loadData}
          isRefreshing={isCloudSyncing}
        />
      )}

      {/* TAB: ASSIGNMENTS BY CLASS (NO SEPARATE ASSIGNMENT PIN) */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h2 className="text-lg font-bold text-slate-900">
                  Cấu Hình Bài Tập Theo Lớp ({assignments.length})
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Học sinh đăng nhập bằng <strong>Mã PIN cá nhân của học sinh</strong> sẽ tự động thấy danh sách chủ đề được giao cho lớp mình.
              </p>
            </div>
          </div>

          {assignments.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">
                Mặc định mở cả 10 chủ đề cho tất cả các lớp
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Nếu Thầy/Cô muốn giới hạn các chủ đề bài tập riêng cho từng lớp (VD: Lớp 3A chỉ học Gõ phím & Chuột), hãy bấm nút "Giao bài tập cho lớp" nhé!
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Giao bài tập theo lớp
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map(item => {
                const classStudentCount = students.filter(
                  s => s.classCode.toUpperCase() === item.classCode.toUpperCase()
                ).length;

                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-600 text-white font-black text-sm rounded-lg shadow-xs">
                            LỚP {item.classCode}
                          </span>
                          <span className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-xs rounded-lg">
                            Sĩ số: {classStudentCount} HS
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                            {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        {confirmDeleteAssignId === item.id ? (
                          <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 px-2 py-1 rounded-xl text-xs">
                            <span className="text-rose-800 dark:text-rose-200 font-bold">Xóa?</span>
                            <button
                              onClick={() => handleDeleteAssignment(item.id)}
                              className="px-2 py-0.5 bg-rose-600 text-white rounded-md font-bold hover:bg-rose-700"
                            >
                              Có
                            </button>
                            <button
                              onClick={() => setConfirmDeleteAssignId(null)}
                              className="px-1.5 py-0.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteAssignId(item.id)}
                            className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Xóa cấu hình bài tập lớp này"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.note}</h3>

                      {/* Included Subjects */}
                      <div className="mt-4">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                          Menu chủ đề mở cho Lớp {item.classCode} ({item.subjects.length} chủ đề):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.subjects.map(sId => {
                            const sub = SUBJECTS_MAP[sId];
                            if (!sub) return null;
                            return (
                              <span
                                key={sId}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200"
                              >
                                <span>{sub.emoji}</span>
                                <span>{sub.name}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Submissions button */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        GV giao bài: <strong className="text-slate-700 dark:text-slate-300">{item.teacherName}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedClassFilter(item.classCode);
                          setShowResultsModal(true);
                        }}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        Xem điểm Lớp {item.classCode} →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB: SUBMISSIONS HISTORY */}
      {activeTab === 'submissions' && (
        <div className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Lịch Sử Điểm Số & Bài Nộp Của Học Sinh ({results.length} bài nộp)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tổng hợp kết quả thực tế của học sinh từ các máy tính trong phòng máy
              </p>
            </div>
            {selectedClassFilter && (
              <button
                onClick={() => setSelectedClassFilter(null)}
                className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-semibold"
              >
                Xóa lọc Lớp: {selectedClassFilter}
              </button>
            )}
          </div>

          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
              Chưa có học sinh nào nộp bài tập.
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left border-collapse text-xs">
                <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <tr className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold">
                    <th className="py-2.5 px-4">Học sinh</th>
                    <th className="py-2.5 px-4">Lớp</th>
                    <th className="py-2.5 px-4">Chủ đề</th>
                    <th className="py-2.5 px-4">Bài học</th>
                    <th className="py-2.5 px-4 text-center">Điểm số</th>
                    <th className="py-2.5 px-4 text-center">Độ chính xác</th>
                    <th className="py-2.5 px-4 text-center">Thời gian</th>
                    <th className="py-2.5 px-4 text-right">Thời điểm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredResults.map(r => {
                    const sub = SUBJECTS_MAP[r.subjectId];
                    return (
                      <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50">
                        <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">
                          {r.studentName}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-slate-300">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">Lớp {r.classCode}</span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-700 dark:text-slate-300">
                          <span className="mr-1">{sub?.emoji}</span>
                          <span>{sub?.name || r.subjectId}</span>
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400 max-w-[200px] truncate">
                          {r.lessonTitle}
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-md font-bold ${
                            r.score >= 80 ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          }`}>
                            {r.score} đ
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-center text-slate-700 dark:text-slate-300 font-semibold">
                          {r.accuracy}%
                        </td>
                        <td className="py-2.5 px-4 text-center text-slate-500 dark:text-slate-400 font-mono">
                          {Math.round(r.timeSpentSeconds || 0)}s
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate-400 dark:text-slate-500 text-[11px]">
                          {new Date(r.completedAt).toLocaleTimeString('vi-VN')} {new Date(r.completedAt).toLocaleDateString('vi-VN')}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CREATE ASSIGNMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Giao Bài Tập Theo Lớp</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Chọn các chủ đề cho lớp học. Học sinh của lớp dùng Mã PIN cá nhân của mình để đăng nhập và làm bài.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateAssignment} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Mã Lớp Học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 3A, 4B, 5C..."
                    value={classCode}
                    onChange={e => setClassCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold text-sm focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                  />
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
                    Áp dụng tự động cho toàn bộ học sinh thuộc lớp này
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
                    Ghi Chú / Lời Dặn Cho Lớp
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Luyện tập tuần 10"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-medium text-sm focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject Selection Menu */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    Chọn Chủ Đề Luyện Tập ({selectedSubjects.length} đã chọn)
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleSelectAllSubjects}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Chọn tất cả ({Object.keys(SUBJECTS_MAP).length} môn)
                    </button>
                    <span className="text-slate-300 dark:text-slate-600">|</span>
                    <button
                      type="button"
                      onClick={handleClearAllSubjects}
                      className="text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:underline"
                    >
                      Bỏ chọn hết
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1">
                  {Object.values(SUBJECTS_MAP).map(sub => {
                    const isSelected = selectedSubjects.includes(sub.id);
                    return (
                      <div
                        key={sub.id}
                        onClick={() => handleToggleSubject(sub.id)}
                        className={`p-3 rounded-2xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/80 dark:bg-blue-950/70 border-blue-400 dark:border-blue-600 shadow-xs'
                            : 'bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{sub.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{sub.name}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{sub.meta}</div>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && '✓'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Lưu bài tập cho lớp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT RESULTS MODAL */}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-y-auto max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bảng Kết Quả Học Sinh Đã Luyện Tập</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Thống kê kết quả nộp bài của học sinh theo lớp
                </p>
              </div>
              <button
                onClick={() => {
                  setShowResultsModal(false);
                  setSelectedClassFilter(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedClassFilter && (
              <div className="mb-4 flex items-center justify-between p-2.5 bg-blue-50 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 rounded-xl text-xs font-semibold">
                <span>Đang lọc theo: <strong>Lớp {selectedClassFilter}</strong></span>
                <button
                  onClick={() => setSelectedClassFilter(null)}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Xem tất cả các lớp
                </button>
              </div>
            )}

            {filteredResults.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs italic">
                Chưa có học sinh nào nộp kết quả cho lớp này.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold">
                      <th className="p-3">Học sinh</th>
                      <th className="p-3">Lớp</th>
                      <th className="p-3">Bài học</th>
                      <th className="p-3 text-center">Điểm</th>
                      <th className="p-3 text-center">Độ chính xác</th>
                      <th className="p-3 text-right">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map(res => (
                      <tr key={res.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{res.studentName}</td>
                        <td className="p-3 font-bold text-blue-600 dark:text-blue-400">
                          Lớp {res.classCode}
                        </td>
                        <td className="p-3 font-medium text-slate-700 dark:text-slate-300">
                          {res.lessonTitle}
                        </td>
                        <td className="p-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                          {res.score}
                        </td>
                        <td className="p-3 text-center font-bold tabular-nums text-slate-700 dark:text-slate-300">
                          {res.accuracy}%
                        </td>
                        <td className="p-3 text-right text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                          {new Date(res.completedAt).toLocaleTimeString('vi-VN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end pt-4 mt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setShowResultsModal(false);
                  setSelectedClassFilter(null);
                }}
                className="px-5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
