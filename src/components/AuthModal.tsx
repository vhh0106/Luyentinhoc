import React, { useState, useEffect, useMemo } from 'react';
import { StudentSession, TeacherAccount, StudentAccount, Assignment, SubjectId } from '../types';
import { SUBJECTS_MAP } from '../data/curriculum';
import {
  authenticateTeacherCloud,
  authenticateStudentCloud,
  findAssignmentByClassCloud,
  getStudents,
  fetchStudentsFromCloud
} from '../services/storage';
import {
  ArrowLeft,
  KeyRound,
  User,
  Lock,
  AlertCircle,
  Cloud,
  Loader2,
  Users,
  ShieldCheck
} from 'lucide-react';

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
  // Teacher / Admin state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Student state (Single Personal PIN)
  const [studentName, setStudentName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [pin, setPin] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  // Registered students from teacher's roster
  const [rosterStudents, setRosterStudents] = useState<StudentAccount[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (role === 'student') {
      setRosterStudents(getStudents());
      fetchStudentsFromCloud()
        .then(cloudList => {
          setRosterStudents(cloudList);
        })
        .catch(() => {});
    }
  }, [role]);

  // Available classes in roster
  const rosterClasses = useMemo(() => {
    const set = new Set<string>();
    rosterStudents.forEach(s => {
      if (s.classCode.trim()) set.add(s.classCode.trim().toUpperCase());
    });
    return Array.from(set).sort();
  }, [rosterStudents]);

  // Students belonging to currently entered classCode
  const studentsInSelectedClass = useMemo(() => {
    const clean = classCode.trim().toUpperCase();
    if (!clean) return [];
    return rosterStudents.filter(s => s.classCode.toUpperCase() === clean);
  }, [rosterStudents, classCode]);

  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Vui lòng nhập tên đăng nhập Giáo viên hoặc Admin.');
      return;
    }
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu đăng nhập.');
      return;
    }

    setIsValidating(true);
    try {
      const result = await authenticateTeacherCloud(username, password);
      if (result.error || !result.account) {
        setError(result.error || 'Sai tên đăng nhập hoặc mật khẩu.');
        setIsValidating(false);
        return;
      }
      onTeacherLogin(result.account);
    } catch (err) {
      setError('Không thể xác thực tài khoản lúc này. Vui lòng thử lại.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanClass = classCode.trim().toUpperCase();
    const cleanName = studentName.trim();
    const cleanPin = pin.trim().toUpperCase();

    if (!cleanClass) {
      setError('Em vui lòng chọn hoặc nhập Mã lớp học (Ví dụ: 3A, 4B).');
      return;
    }
    if (!cleanName) {
      setError('Em vui lòng chọn hoặc nhập Họ và tên (hoặc Mã học sinh) của mình.');
      return;
    }
    if (!cleanPin) {
      setError('Em vui lòng nhập Mã PIN cá nhân của mình do thầy/cô cấp.');
      return;
    }

    setIsValidating(true);
    try {
      // 1. Authenticate student using their personal Student Account & single Student PIN
      const authRes = await authenticateStudentCloud(cleanClass, cleanName, cleanPin);
      if (authRes.error || !authRes.student) {
        setError(authRes.error || 'Thông tin đăng nhập học sinh chưa chính xác.');
        setIsValidating(false);
        return;
      }

      const verifiedStudent = authRes.student;

      // 2. Load curriculum subjects assigned to this student's class (or all 10 subjects by default)
      let classAssignment = await findAssignmentByClassCloud(cleanClass);
      if (!classAssignment) {
        classAssignment = {
          id: `default-${cleanClass}`,
          classCode: cleanClass,
          pin: verifiedStudent.pin || cleanPin,
          subjects: Object.keys(SUBJECTS_MAP) as SubjectId[],
          teacherName: 'Giáo viên Tin học',
          createdAt: new Date().toISOString(),
          note: `Chương trình Tin học Lớp ${cleanClass}`
        };
      }

      onStudentLogin({
        name: verifiedStudent.studentName,
        studentCode: verifiedStudent.studentCode,
        classCode: verifiedStudent.classCode.toUpperCase(),
        pin: verifiedStudent.pin || cleanPin,
        assignment: classAssignment
      });
    } catch (err) {
      setError('Có lỗi khi kết nối kiểm tra tài khoản. Em vui lòng thử lại.');
    } finally {
      setIsValidating(false);
    }
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
            {role === 'teacher' ? 'Đăng Nhập Giáo Viên / Admin' : 'Đăng Nhập Tài Khoản Học Sinh'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {role === 'teacher'
              ? 'Dành cho Admin và các tài khoản Giáo viên đã được cấp quyền'
              : 'Chọn lớp, tên học sinh và nhập Mã PIN cá nhân của em'}
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
                Tên đăng nhập *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Nhập tên đăng nhập (VD: admin hoặc gv_hoa)"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mật khẩu *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Admin RBAC Notice */}
            <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-xs text-indigo-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-indigo-800">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Phân quyền Quản trị viên (Admin):</span>
              </div>
              <p className="text-[11px] text-indigo-900/80 leading-relaxed">
                Chỉ tài khoản do <strong>Admin</strong> cấp mới đăng nhập được. Tài khoản Admin mặc định để tạo giáo viên: Tên đăng nhập <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-indigo-200">admin</code> / Mật khẩu <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-indigo-200">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-xl text-sm shadow-md transition-all mt-2 flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang xác thực tài khoản...</span>
                </>
              ) : (
                <span>Đăng Nhập Hệ Thống</span>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                1. Lớp của em *
              </label>
              <input
                type="text"
                required
                placeholder="Nhập mã lớp (VD: 3A, 4B, 5C...)"
                value={classCode}
                onChange={e => {
                  setClassCode(e.target.value.toUpperCase());
                  setStudentName('');
                }}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold tracking-wider focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
              />
              {rosterClasses.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  <span className="text-[11px] text-slate-400 font-medium">Chọn nhanh lớp:</span>
                  {rosterClasses.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setClassCode(c);
                        setStudentName('');
                      }}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border transition-all ${
                        classCode.toUpperCase() === c
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Lớp {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                2. Tài khoản học sinh (Họ tên hoặc Mã HS) *
              </label>
              {studentsInSelectedClass.length > 0 ? (
                <div className="space-y-2">
                  <select
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="">-- Chọn tên của em trong Lớp {classCode.toUpperCase()} --</option>
                    {studentsInSelectedClass.map(s => (
                      <option key={s.id} value={s.studentName}>
                        {s.studentCode ? `${s.studentCode} - ` : ''}{s.studentName}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span>Lớp {classCode.toUpperCase()} có {studentsInSelectedClass.length} tài khoản học sinh.</span>
                  </div>
                </div>
              ) : (
                <input
                  type="text"
                  required
                  placeholder="Nhập Họ và tên hoặc Mã học sinh của em"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                3. Mã PIN học sinh của em *
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Nhập mã PIN riêng của em"
                  value={pin}
                  onChange={e => setPin(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-black tracking-widest text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
                />
              </div>
            </div>

            {/* Cloud Sync Announcement */}
            <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-200/80 text-[11.5px] text-blue-900 flex items-start gap-2">
              <Cloud className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong className="font-semibold text-blue-950">1 Mã PIN học sinh duy nhất:</strong> Em dùng đúng Mã PIN tài khoản của mình để đăng nhập trên bất kỳ máy tính nào và lưu toàn bộ tiến độ.
              </p>
            </div>

            <button
              type="submit"
              disabled={isValidating}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl text-sm shadow-md transition-all mt-2 flex items-center justify-center gap-2"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang đăng nhập tài khoản...</span>
                </>
              ) : (
                <span>Đăng Nhập Vào Học 🚀</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
