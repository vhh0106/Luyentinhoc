import React, { useState, useEffect } from 'react';
import { StudentSession, TeacherAccount } from './types';
import { SUBJECTS_MAP } from './data/curriculum';
import { initializeStorage } from './services/storage';
import { AuthModal } from './components/AuthModal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { HeroRobotCanvas } from './components/3d/HeroRobotCanvas';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  ShieldCheck,
  Award,
  ArrowRight,
  Monitor,
  CheckCircle2,
  ChevronRight,
  School
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'home' | 'login' | 'teacher_dash' | 'student_dash'>('home');
  const [authRole, setAuthRole] = useState<'teacher' | 'student'>('student');
  const [currentTeacher, setCurrentTeacher] = useState<TeacherAccount | null>(null);
  const [currentStudent, setCurrentStudent] = useState<StudentSession | null>(null);

  useEffect(() => {
    initializeStorage();
  }, []);

  const handleStartRole = (role: 'teacher' | 'student') => {
    setAuthRole(role);
    setView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTeacherLoginSuccess = (teacher: TeacherAccount) => {
    setCurrentTeacher(teacher);
    setView('teacher_dash');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStudentLoginSuccess = (session: StudentSession) => {
    setCurrentStudent(session);
    setView('student_dash');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setCurrentTeacher(null);
    setCurrentStudent(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-slate-50 to-indigo-50/40 flex flex-col text-slate-800">
      {/* Universal Top Bar Contract: 3 Zones with gap-8 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div
            onClick={() => setView('home')}
            className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 leading-none">
                Tin Học Tiểu Học
              </span>
              <span className="text-[11px] font-semibold text-blue-600 tracking-wide mt-0.5">
                Bộ sách Kết Nối Tri Thức
              </span>
            </div>
          </div>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setView('home')}
              className={`hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 ${view === 'home' ? 'text-blue-600' : ''}`}
            >
              Trang chủ
            </button>
            <a
              href="#subjects-catalog"
              onClick={() => view !== 'home' && setView('home')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              10 Chủ đề BGD
            </a>
            <button
              onClick={() => handleStartRole('teacher')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Dành cho Giáo viên
            </button>
            <button
              onClick={() => handleStartRole('student')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Dành cho Học sinh
            </button>
            <a
              href="#pedagogical-goals"
              onClick={() => view !== 'home' && setView('home')}
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
            >
              Mục tiêu bài giảng
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentTeacher && view === 'teacher_dash' ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Đăng xuất
              </button>
            ) : currentStudent && view === 'student_dash' ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => handleStartRole('student')}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs whitespace-nowrap shrink-0"
              >
                Vào luyện tập ngay →
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* VIEW: TEACHER DASHBOARD */}
        {view === 'teacher_dash' && currentTeacher && (
          <TeacherDashboard teacher={currentTeacher} onLogout={handleLogout} />
        )}

        {/* VIEW: STUDENT DASHBOARD */}
        {view === 'student_dash' && currentStudent && (
          <StudentDashboard session={currentStudent} onLogout={handleLogout} />
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
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
              {/* Left Column: Heading, Badges & Role Cards */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-50 via-indigo-50 to-teal-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-700 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse-subtle" />
                  <span>Chương trình GDPT 2018 · Bộ sách Kết Nối Tri Thức</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  Luyện Tin Học Tiểu Học <br />
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent">
                    Bộ Sách Kết Nối Tri Thức
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  Nền tảng thực hành trực quan dành cho học sinh tiểu học với 2 phân quyền Giáo viên - Học sinh, quản lý mã lớp, tạo mã PIN nhanh chóng và 10 trò chơi rèn luyện kỹ năng số toàn diện.
                </p>

                {/* Two Role Entrance Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Teacher Card */}
                  <div
                    onClick={() => handleStartRole('teacher')}
                    className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-bl-full pointer-events-none" />
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                        👨‍🏫
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        Dành Cho Giáo Viên
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                        Đăng nhập tài khoản riêng, soạn menu bài tập, chia theo mã lớp (3A, 4B...), cấp mã PIN và xem kết quả.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>Đăng nhập giáo viên</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Student Card */}
                  <div
                    onClick={() => handleStartRole('student')}
                    className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 text-white p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-sm pointer-events-none" />
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center text-2xl mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                        👧👦
                      </div>
                      <h3 className="text-lg font-black text-white">
                        Dành Cho Học Sinh
                      </h3>
                      <p className="text-xs text-emerald-100 mt-1.5 leading-relaxed">
                        Nhập Tên, Mã lớp và Mã PIN để mở bài tập, luyện gõ 10 ngón, luyện chuột và tích lũy sao thưởng.
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
                      <span>Nhập mã PIN làm bài ngay</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Interactive Mascot Canvas */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full bg-gradient-to-tr from-blue-50/90 via-indigo-50/70 to-teal-50/90 rounded-3xl border border-blue-200/80 p-4 shadow-xl relative overflow-hidden group">
                  {/* Subtle decorative glowing background shapes */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-400/20 via-teal-300/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

                  {/* Header info badge inside 3D frame */}
                  <div className="flex items-center justify-between px-3 py-2 bg-white/85 backdrop-blur-xs rounded-2xl border border-slate-200/60 text-xs mb-1 shadow-2xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-base">🤖</span> Chú Robot Tri Thức 3D
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-lg text-[10px] font-bold">
                      Tương tác 3D
                    </span>
                  </div>

                  {/* Three.js Canvas */}
                  <HeroRobotCanvas />
                </div>
              </div>
            </section>

            {/* Subject Catalog Section: 10 Modules */}
            <section id="subjects-catalog" className="space-y-6 pt-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Nội dung chương trình chuẩn
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  10 Chủ Đề Luyện Tập Toàn Diện
                </h2>
                <p className="text-xs text-slate-500">
                  Được biên soạn bám sát từng bài học thực hành theo sách giáo khoa Tin học Kết Nối Tri Thức với Cuộc Sống
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.values(SUBJECTS_MAP).map(sub => (
                  <div
                    key={sub.id}
                    onClick={() => handleStartRole('student')}
                    className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl mb-3 shadow-2xs">
                        {sub.emoji}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className="text-[11px] font-bold text-slate-500">{sub.meta}</span>
                        <span className="px-1.5 py-0.2 bg-teal-50 text-teal-700 rounded text-[10px] font-bold border border-teal-200">
                          10+ câu hỏi/bài
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{sub.name}</h4>

                      <ul className="mt-2.5 space-y-1 text-[11px] text-slate-500">
                        {sub.objectives.slice(0, 1).map((obj, i) => (
                          <li key={i} className="line-clamp-2">· {obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-100 text-[11px] font-semibold text-blue-600 flex items-center justify-between">
                      <span>Vào luyện tập</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pedagogical Principles & Trust */}
            <section id="pedagogical-goals" className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
              <div className="max-w-2xl">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Phương pháp giáo dục
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  Đồng hành cùng Thầy Cô và Học Sinh Tiểu Học
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Ứng dụng giúp số hóa bài giảng và hoạt động thực hành phòng máy một cách trực quan, hứng khởi và an toàn tuyệt đối.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Mô phỏng chân thực</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bàn phím 10 ngón màu sắc, bộ gõ tiếng Việt, thao tác chuột kéo thả và phần mềm văn phòng mô phỏng chuẩn giao diện thực tế.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">An toàn & Không cần cài đặt</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Chạy hoàn toàn trên trình duyệt máy tính, không chứa quảng cáo, bảo vệ thông tin học sinh và tương thích mọi màn hình.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Quản lý lớp học linh hoạt</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Thầy cô dễ dàng cấp mã PIN ngẫu nhiên 6 ký tự cho từng lớp 3A, 4B... Học sinh chỉ cần nhập mã PIN để vào đúng bài tập được giao.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Tin Học Tiểu Học</span>
            <span>·</span>
            <span>Bộ sách Kết Nối Tri Thức với Cuộc Sống</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleStartRole('teacher')} className="hover:text-slate-800">
              Cổng Giáo Viên
            </button>
            <button onClick={() => handleStartRole('student')} className="hover:text-slate-800">
              Cổng Học Sinh
            </button>
            <span>Được tạo bởi Vũ Hoàng Hiệp</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
