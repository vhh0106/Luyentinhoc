import React, { useState, useEffect } from 'react';
import { StudentSession, TeacherAccount } from './types';
import { SUBJECTS_MAP } from './data/curriculum';
import { initializeStorage } from './services/storage';
import { AuthModal } from './components/AuthModal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { HeroRobotCanvas } from './components/3d/HeroRobotCanvas';
import { AnimatedBackground } from './components/common/AnimatedBackground';
import { ThemeToggleButton } from './components/common/ThemeToggleButton';
import {
  ArcadeGameCenter,
  ARCADE_GAMES_CATALOG,
  ArcadeGameId
} from './components/games/ArcadeGameCenter';
import { FeedbackModal } from './components/common/FeedbackModal';
import { TopicCompletionTimeTable } from './components/home/TopicCompletionTimeTable';
import {
  ArrowRight,
  ArrowLeft,
  Monitor,
  ShieldCheck,
  Users,
  Gamepad2,
  Play,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Home,
  Mail,
  Phone,
  MessageSquareHeart,
  MessageSquarePlus
} from 'lucide-react';
import { FacebookIcon } from './components/common/FacebookIcon';

export default function App() {
  const [view, setView] = useState<'home' | 'login' | 'teacher_dash' | 'student_dash' | 'arcade'>('home');
  const [authRole, setAuthRole] = useState<'teacher' | 'student'>('student');
  const [currentTeacher, setCurrentTeacher] = useState<TeacherAccount | null>(null);
  const [currentStudent, setCurrentStudent] = useState<StudentSession | null>(null);
  const [selectedArcadeGame, setSelectedArcadeGame] = useState<ArcadeGameId>('space-typing');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    initializeStorage();
  }, []);

  // Close user dropdown when clicking outside
  useEffect(() => {
    if (!showUserMenu) return;
    const handleClickOutside = () => setShowUserMenu(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showUserMenu]);

  // Ensure only one account role (Student OR Teacher/Admin) is active at any time
  useEffect(() => {
    if (view === 'student_dash' && currentStudent && currentTeacher) {
      setCurrentTeacher(null);
    } else if (view === 'teacher_dash' && currentTeacher && currentStudent) {
      setCurrentStudent(null);
    }
  }, [view, currentStudent, currentTeacher]);

  const handleStartRole = (role: 'teacher' | 'student') => {
    setShowUserMenu(false);
    if (role === 'teacher' && currentTeacher && !currentStudent) {
      setView('teacher_dash');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (role === 'student' && currentStudent && !currentTeacher) {
      setView('student_dash');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setAuthRole(role);
    setView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchArcade = (gameId: ArcadeGameId = 'space-typing') => {
    setShowUserMenu(false);
    setSelectedArcadeGame(gameId);
    setView('arcade');
  };

  const handleTeacherLoginSuccess = (teacher: TeacherAccount) => {
    // Automatically log out any active student account when teacher/admin logs in
    setCurrentStudent(null);
    setCurrentTeacher(teacher);
    setShowUserMenu(false);
    setView('teacher_dash');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStudentLoginSuccess = (session: StudentSession) => {
    // Automatically log out any active teacher/admin account when student logs in
    setCurrentTeacher(null);
    setCurrentStudent(session);
    setShowUserMenu(false);
    setView('student_dash');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentTeacher(null);
    setCurrentStudent(null);
    setShowUserMenu(false);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackNavigation = () => {
    setShowUserMenu(false);
    if (view === 'login') {
      setView('home');
    } else if (view === 'student_dash' || view === 'teacher_dash') {
      setView('home');
    } else {
      setView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Full-Viewport Game Shell owns 100% of the screen without website navbar or footer
  if (view === 'arcade') {
    return (
      <ArcadeGameCenter
        initialGameId={selectedArcadeGame}
        studentName={currentStudent?.name || 'Khách trải nghiệm'}
        classCode={currentStudent?.classCode || 'Tự do'}
        onExit={() => setView(currentStudent ? 'student_dash' : 'home')}
      />
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden">
      {/* Dynamic Animated Blue Gradient & Floating Elements */}
      <AnimatedBackground />

      {/* Universal Top Bar: Brand + Back Button — Navigation Links — User Profile Dropdown & Theme Switcher */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Zone 1: Back Button (when not on home) + Single-line Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            {view !== 'home' && (
              <button
                type="button"
                onClick={handleBackNavigation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer active:scale-95"
                title="Quay lại màn hình trước"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setView('home')}
              className="flex items-center gap-2.5 group cursor-pointer text-left shrink-0"
              title="KidTech — Hướng đến kỹ năng công nghệ cho trẻ"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                🚀
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-none">
                  KidTech
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:inline leading-tight mt-0.5">
                  Hướng đến kỹ năng công nghệ cho trẻ
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button
              type="button"
              onClick={() => setView('home')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                view === 'home' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              Trang chủ
            </button>
            <button
              type="button"
              onClick={() => handleLaunchArcade('space-typing')}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Trò chơi Tin học
            </button>
            <a
              href="#subjects-catalog"
              onClick={() => view !== 'home' && setView('home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              10 Chủ đề
            </a>
            <a
              href="#thong-ke-tien-do"
              onClick={() => view !== 'home' && setView('home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Thống kê tiến độ
            </a>
            <button
              type="button"
              onClick={() => handleStartRole('teacher')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                view === 'teacher_dash' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              Giáo viên
            </button>
            <button
              type="button"
              onClick={() => handleStartRole('student')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                view === 'student_dash' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
              }`}
            >
              Học sinh
            </button>
          </nav>

          {/* Zone 3: Theme Switcher & User Profile Dropdown (or Primary Login Action) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            <ThemeToggleButton />

            {currentStudent && view !== 'teacher_dash' ? (
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(prev => !prev)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white transition-all cursor-pointer shadow-2xs"
                  title="Bấm vào tên học sinh để mở menu tài khoản / Đăng xuất"
                >
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                    🎓
                  </span>
                  <span className="max-w-[150px] sm:max-w-[210px] truncate">
                    {currentStudent.name}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-black shrink-0">
                    Lớp {currentStudent.classCode}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        Học sinh · Lớp {currentStudent.classCode}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white truncate mt-0.5">
                        {currentStudent.name}
                      </div>
                      {currentStudent.pin && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Mã PIN cá nhân: {currentStudent.pin}
                        </div>
                      )}
                    </div>

                    <div className="py-1">
                      {view !== 'student_dash' && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            setView('student_dash');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>Góc học tập của em</span>
                        </button>
                      )}

                      {view !== 'home' && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            setView('home');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                        >
                          <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Về Trang chủ</span>
                        </button>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-xs font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất tài khoản</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : currentTeacher ? (
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setShowUserMenu(prev => !prev)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-blue-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white transition-all cursor-pointer shadow-2xs"
                  title="Bấm vào tên giáo viên để mở menu tài khoản / Đăng xuất"
                >
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                    👨‍🏫
                  </span>
                  <span className="max-w-[160px] sm:max-w-[220px] truncate">
                    {currentTeacher.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform ${
                      showUserMenu ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {currentTeacher.role === 'admin' || currentTeacher.username.toLowerCase() === 'admin'
                          ? 'Quản trị viên (Admin)'
                          : 'Tài khoản Giáo viên'}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white truncate mt-0.5">
                        {currentTeacher.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        Tài khoản: @{currentTeacher.username}
                      </div>
                    </div>

                    <div className="py-1">
                      {view !== 'teacher_dash' && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            setView('teacher_dash');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span>Bảng quản lý Giáo viên</span>
                        </button>
                      )}

                      {view !== 'home' && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            setView('home');
                          }}
                          className="w-full px-4 py-2 text-left text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                        >
                          <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Về Trang chủ</span>
                        </button>
                      )}
                    </div>

                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-xs font-black text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-2.5 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất tài khoản</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleStartRole('student')}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl transition-transform active:scale-95 shadow-sm whitespace-nowrap shrink-0"
              >
                Vào luyện tập →
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 relative z-10">
        {/* VIEW: TEACHER DASHBOARD */}
        {view === 'teacher_dash' && currentTeacher && (
          <TeacherDashboard
            teacher={currentTeacher}
            onLogout={handleLogout}
            onBackHome={() => setView('home')}
          />
        )}

        {/* VIEW: STUDENT DASHBOARD */}
        {view === 'student_dash' && currentStudent && (
          <StudentDashboard
            session={currentStudent}
            onLogout={handleLogout}
            onBackHome={() => setView('home')}
          />
        )}

        {/* VIEW: LOGIN / PIN MODAL */}
        {view === 'login' && (
          <AuthModal
            role={authRole}
            onTeacherLogin={handleTeacherLoginSuccess}
            onStudentLogin={handleStudentLoginSuccess}
            onBack={() => setView('home')}
          />
        )}

        {/* VIEW: HOME SCREEN */}
        {view === 'home' && (
          <div className="space-y-16">
            {/* 3D Immersive Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
              {/* Left Column: Heading, Unboxed Kicker & Role Cards */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-4">
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-400 tracking-wide uppercase">
                    KidTech · Hướng đến kỹ năng công nghệ cho trẻ · Bộ sách Kết Nối Tri Thức
                  </div>

                  <h1
                    className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.14]"
                    style={{ textWrap: 'balance' }}
                  >
                    KidTech — Hướng Đến Kỹ Năng Công Nghệ Cho Trẻ
                  </h1>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    Nền tảng thực hành phòng máy dành cho học sinh tiểu học với 10 chủ đề kỹ năng số chuẩn BGD, kết hợp đấu trường trò chơi tương tác giúp rèn phản xạ gõ 10 ngón, an toàn mạng và tư duy thuật toán.
                  </p>
                </div>

                {/* Two Role Entrance Cards + Quick Game CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Student Card (Dominant Focal Anchor) */}
                  <div
                    onClick={() => handleStartRole('student')}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white p-6 rounded-3xl shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-blue-100 mb-2">
                        Cổng Học Sinh · Lớp 3, 4, 5
                      </div>
                      <h2 className="text-xl font-black text-white flex items-center gap-2">
                        <span>👧👦 Dành Cho Học Sinh</span>
                      </h2>
                      <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                        Chọn lớp, tên học sinh và nhập Mã PIN cá nhân để làm bài tập thầy cô giao, tích lũy sao và mở khóa huy hiệu.
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
                      <span>Đăng nhập làm bài ngay</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Teacher Card */}
                  <div
                    onClick={() => handleStartRole('teacher')}
                    className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                        Cổng Giáo Viên · Quản lý lớp
                      </div>
                      <h2 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        👨‍🏫 Dành Cho Giáo Viên
                      </h2>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        Quản lý danh sách lớp, cấp mã PIN học sinh, giao chủ đề bài tập theo lớp và thống kê điểm số trực tiếp trên Đám mây.
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                      <span>Đăng nhập quản lý lớp</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Interactive Mascot Canvas */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="w-full h-full bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white">
                      🤖 Bạn Đồng Hành Robot 3D
                    </span>
                    <span>Nhấp chuột vào Robot để tương tác</span>
                  </div>

                  <div className="my-auto">
                    <HeroRobotCanvas />
                  </div>
                </div>
              </div>
            </section>

            {/* Full-Width Quantitative & Quick Feature Bar Below Hero Split */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/90 dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800">
              <div className="space-y-1">
                <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono tabular-nums">
                  10 Chủ đề
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Bám sát SGK Tin học Lớp 3, 4, 5 Kết Nối Tri Thức
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                  80+ Bài học
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Kết hợp mô phỏng thực hành và câu hỏi trắc nghiệm
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                  3 Mini-Game
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Trò chơi luyện gõ phím, diệt Virus và giải mê cung Robot
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono tabular-nums">
                  100% Đám mây
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Đồng bộ bài giao và bảng điểm tức thời giữa các thiết bị
                </div>
              </div>
            </section>

            {/* Average Completion Time Statistics by Topic for Teachers */}
            <TopicCompletionTimeTable onOpenTeacherPortal={() => handleStartRole('teacher')} />

            {/* Interactive Educational Arcade Games Section */}
            <section id="arcade-games" className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4" />
                    <span>Góc Trò Chơi Tin Học · Vừa Học Vừa Chơi</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
                    style={{ textWrap: 'balance' }}
                  >
                    Đấu Trường Trò Chơi Rèn Phản Xạ Kỹ Năng Số
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                    3 trò chơi tương tác toàn màn hình giúp học sinh hào hứng rèn luyện gõ phím 10 ngón, nhận biết an toàn thông tin trên Internet và điều khiển Robot vượt mê cung thuật toán.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleLaunchArcade('space-typing')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 text-xs font-bold transition-opacity flex items-center gap-2 whitespace-nowrap shrink-0 self-start md:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Mở Đấu Trường Game Toàn Màn Hình</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {ARCADE_GAMES_CATALOG.map((game, idx) => (
                  <div
                    key={game.id}
                    onClick={() => handleLaunchArcade(game.id)}
                    className="bg-white/95 dark:bg-slate-900/95 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        0{idx + 1} · {game.subtitle}
                      </div>

                      <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {game.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {game.objective}
                      </p>
                    </div>

                    <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                      <span>Chơi ngay toàn màn hình</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Subject Catalog Section: 10 Modules */}
            <section id="subjects-catalog" className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Nội dung chương trình chuẩn · Lớp 3, 4, 5
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  10 Chủ Đề Luyện Tập Toàn Diện
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                  Được biên soạn bám sát từng bài học thực hành theo sách giáo khoa Tin học Kết Nối Tri Thức với Cuộc Sống.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.values(SUBJECTS_MAP).map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => handleStartRole('student')}
                    className="bg-white/95 dark:bg-slate-900/95 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-blue-500/15 dark:hover:shadow-blue-500/10 hover:border-blue-500 dark:hover:border-blue-400 hover:ring-2 hover:ring-blue-500/20 dark:hover:ring-blue-400/20 hover:-translate-y-1.5 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer flex flex-col justify-between group will-change-transform"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/70 border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        {sub.emoji}
                      </div>

                      {/* Clean unboxed metadata with typographic separator */}
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                        <span>{sub.meta}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{sub.id === 'sgk' ? '16 bài SGK' : 'Thực hành & Quiz'}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {sub.name}
                      </h3>

                      <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {sub.objectives[0]}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between">
                      <span>Vào luyện tập</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300 font-bold">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pedagogical Principles & Trust */}
            <section id="pedagogical-goals" className="bg-white/95 dark:bg-slate-900/95 p-8 md:p-10 rounded-3xl border border-slate-200/90 dark:border-slate-800 space-y-8">
              <div className="max-w-2xl space-y-1.5">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Phương pháp giáo dục trực quan
                </div>
                <h2
                  className="text-2xl font-black text-slate-900 dark:text-white"
                  style={{ textWrap: 'balance' }}
                >
                  Đồng Hành Cùng Thầy Cô Và Học Sinh Tiểu Học
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ứng dụng giúp số hóa bài giảng và hoạt động thực hành phòng máy một cách trực quan, hứng khởi và an toàn.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Mô phỏng chân thực</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Bàn phím 10 ngón màu sắc, bộ gõ tiếng Việt, thao tác chuột kéo thả và phần mềm văn phòng mô phỏng chuẩn giao diện thực tế.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">An toàn & Không cần cài đặt</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Chạy hoàn toàn trên trình duyệt máy tính, không chứa quảng cáo, bảo vệ thông tin học sinh và tương thích mọi màn hình.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quản lý lớp học linh hoạt</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Thầy cô dễ dàng giao bài theo mã lớp 3A, 4B... Học sinh đăng nhập bằng Mã PIN cá nhân để vào đúng bài tập được giao.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800/80 mt-16 pt-10 pb-8 relative z-10 transition-colors">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          {/* Contact & Feedback Highlight Box in Footer */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 dark:from-slate-800/90 dark:via-blue-950/40 dark:to-slate-800/90 rounded-3xl p-6 sm:p-8 border border-blue-200/80 dark:border-slate-700/80 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-bold">
                <MessageSquareHeart className="w-3.5 h-3.5 text-rose-500" />
                <span>Liên hệ & Hòm thư góp ý</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Bạn có ý kiến đóng góp hoặc cần hỗ trợ về phần mềm?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
                Thầy Vũ Hoàng Hiệp luôn lắng nghe mọi đóng góp từ quý thầy cô, phụ huynh và các em học sinh để liên tục nâng cấp bài học, giao diện và trò chơi.
              </p>
            </div>

            {/* Quick Contact Chips & Open Feedback Form */}
            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="mailto:vhh0106@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 shadow-2xs transition-all cursor-pointer"
                title="Gửi email cho thầy Hiệp"
              >
                <Mail className="w-4 h-4 text-rose-500" />
                <span>vhh0106@gmail.com</span>
              </a>

              <a
                href="https://zalo.me/0348554851"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 shadow-2xs transition-all cursor-pointer"
                title="Chat Zalo hoặc gọi 034 855 4851"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>034 855 4851 (Zalo)</span>
              </a>

              <a
                href="https://www.facebook.com/vhh0106"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 shadow-2xs transition-all cursor-pointer"
                title="Trang Facebook cá nhân Vũ Hoàng Hiệp"
              >
                <FacebookIcon className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </a>

              <button
                type="button"
                onClick={() => setShowFeedbackModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Điền Form Góp Ý</span>
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-200">KidTech — Hướng đến kỹ năng công nghệ cho trẻ</span>
              <span>·</span>
              <span>Bộ sách Kết Nối Tri Thức với Cuộc Sống</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => handleLaunchArcade('space-typing')}
                className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                Trò Chơi Tin Học
              </button>
              <button
                type="button"
                onClick={() => handleStartRole('teacher')}
                className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cổng Giáo Viên
              </button>
              <button
                type="button"
                onClick={() => handleStartRole('student')}
                className="hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cổng Học Sinh
              </button>
              <button
                type="button"
                onClick={() => setShowFeedbackModal(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline font-bold transition-colors cursor-pointer"
              >
                Gửi góp ý
              </button>
              <span>Tác giả: Vũ Hoàng Hiệp</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Feedback & Contact Modal */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        defaultRole={currentTeacher ? 'teacher' : currentStudent ? 'student' : 'student'}
        defaultName={currentTeacher?.name || currentStudent?.name || ''}
      />
    </div>
  );
}
