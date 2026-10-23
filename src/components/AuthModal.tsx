import React, { useState } from 'react';
import { StudentSession, TeacherAccount } from '../types';
import { findAssignmentByPinAndClass, getTeachers, saveTeacher, getAssignments } from '../services/storage';
import { ArrowLeft, KeyRound, User, Lock, GraduationCap, School, Check, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  role: 'teacher' | 'student';
  onTeacherLogin: (teacher: TeacherAccount) => void;
  onStudentLogin: (session: StudentSession) => void;
  onBack: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  role,
  onTeacherLogin,
  onStudentLogin,
  onBack
}) => {
  // Teacher state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Student state
  const [studentName, setStudentName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [pin, setPin] = useState('');

  const [error, setError] = useState<string | null>(null);

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername) {
      setError('Vui lòng nhập tên đăng nhập');
      return;
    }

    const teachers = getTeachers();
    const existing = teachers.find(t => t.username.toLowerCase() === cleanUsername);

    if (existing) {
      onTeacherLogin(existing);
    } else {
      // Auto register teacher
      const newTeacher: TeacherAccount = {
        username: cleanUsername,
        name: teacherName.trim() || `Thầy/Cô ${cleanUsername}`,
        school: 'Tiểu học Kết Nối Tri Thức',
        createdAt: new Date().toISOString()
      };
      saveTeacher(newTeacher);
      onTeacherLogin(newTeacher);
    }
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!studentName.trim()) {
      setError('Em vui lòng nhập Họ và tên của mình');
      return;
    }
    if (!classCode.trim()) {
      setError('Em vui lòng nhập Mã lớp học (Ví dụ: 3A, 4B)');
      return;
    }
    if (!pin.trim()) {
      setError('Em vui lòng nhập Mã PIN gồm 6 chữ số do thầy/cô cấp');
      return;
    }

    const assignment = findAssignmentByPinAndClass(pin, classCode);
    if (!assignment) {
      setError(`Không tìm thấy bài tập với Mã lớp "${classCode.toUpperCase()}" và Mã PIN "${pin.toUpperCase()}". Em hãy hỏi lại thầy cô hoặc bấm thử "Mã PIN mẫu" bên dưới nhé!`);
      return;
    }

    onStudentLogin({
      name: studentName.trim(),
      classCode: classCode.trim().toUpperCase(),
      pin: pin.trim().toUpperCase(),
      assignment
    });
  };

  const fillDemoTeacher = () => {
    setUsername('giaovien');
    setPassword('123456');
    setTeacherName('Cô Nguyễn Thị Hoa');
  };

  const fillDemoStudent = (code: string, demoPin: string) => {
    setStudentName('Nguyễn Văn An');
    setClassCode(code);
    setPin(demoPin);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors mb-6 shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại trang chọn vai trò</span>
      </button>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner ${
              role === 'teacher' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {role === 'teacher' ? '👨‍🏫' : '👧👦'}
          </div>

          <h2 className="text-2xl font-black text-slate-900">
            {role === 'teacher' ? 'Đăng Nhập Giáo Viên' : 'Học Sinh Tham Gia'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {role === 'teacher'
              ? 'Soạn menu trò chơi và quản lý mã PIN lớp học'
              : 'Nhập thông tin và mã PIN từ thầy/cô để bắt đầu'}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl text-xs leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {role === 'teacher' ? (
          <form onSubmit={handleTeacherSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: giaovien01"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Họ và tên giáo viên (tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Cô Nguyễn Thị Hoa"
                value={teacherName}
                onChange={e => setTeacherName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md transition-all mt-2"
            >
              Vào Trang Quản Lý Giáo Viên
            </button>

            {/* Quick Demo Credentials */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={fillDemoTeacher}
                className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <span>⚡ Điền nhanh tài khoản mẫu: Cô Nguyễn Thị Hoa</span>
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Họ và tên học sinh *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mã lớp học *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: 3A hoặc 4B..."
                value={classCode}
                onChange={e => setClassCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold tracking-wider focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mã PIN làm bài *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: KNTT03"
                  value={pin}
                  onChange={e => setPin(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-black tracking-widest text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md transition-all mt-2"
            >
              Vào Luyện Tập Ngay 🚀
            </button>

            {/* Quick Demo PINs for student testing */}
            <div className="pt-3 border-t border-slate-100 text-center space-y-1">
              <span className="text-[11px] text-slate-400 block font-medium">Hoặc thử ngay lớp mẫu có sẵn:</span>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoStudent('3A', 'KNTT03')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Lớp 3A (PIN: KNTT03)
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoStudent('4B', 'KNTT04')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  Lớp 4B (PIN: KNTT04)
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
