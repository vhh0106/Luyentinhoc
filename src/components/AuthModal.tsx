import React, { useState, useEffect, useMemo } from 'react';
import { StudentSession, TeacherAccount, StudentAccount } from '../types';
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
  Users
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

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setIsValidating(true);
    try {
      const authRes = await authenticateTeacherCloud(cleanUser, cleanPass);
      if (authRes.error || !authRes.account) {
        setError(authRes.error || 'Tài khoản hoặc mật khẩu không chính xác.');
        setIsValidating(false);
        return;
      }
      onTeacherLogin(authRes.account);
    } catch (err) {
      setError('Có lỗi xảy ra khi xác thực với hệ thống Cloud.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanName = studentName.trim();
    const cleanClass = classCode.trim().toUpperCase();
    const cleanPin = pin.trim().toUpperCase();

    if (!cleanClass) {
      setError('Vui lòng nhập mã lớp học (Ví dụ: 3A, 4B, 5C).');
      return;
    }
    if (!cleanName) {
      setError('Vui lòng chọn hoặc nhập họ và tên của em.');
      return;
    }
    if (!cleanPin) {
      setError('Vui lòng nhập mã PIN cá nhân do thầy cô cung cấp.');
      return;
    }

    setIsValidating(true);
    try {
      // 1. Authenticate personal PIN with Firestore Cloud
      const authRes = await authenticateStudentCloud(cleanClass, cleanName, cleanPin);
      if (authRes.error || !authRes.student) {
        setError(authRes.error || 'Thông tin đăng nhập học sinh chưa chính xác.');
        setIsValidating(false);
        return;
      }

      const verifiedStudent = authRes.student;

      // 2. Load curriculum subjects currently assigned to this student's class
      let classAssignment = await findAssignmentByClassCloud(cleanClass);
      if (!classAssignment) {
        classAssignment = {
          id: `unassigned-${cleanClass}`,
          classCode: cleanClass,
          pin: verifiedStudent.pin || cleanPin,
          subjects: [],
          teacherName: '',
          createdAt: new Date().toISOString(),
          note: ''
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
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white/95 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chọn vai trò</span>
        </button>
      </div>

      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl transition-colors">
        <div className="text-center mb-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3 shadow-inner ${
              role === 'teacher' ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
            }`}
          >
            {role === 'teacher' ? '👨‍🏫' : '👧👦'}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {role === 'teacher' ? 'Đăng Nhập Giáo Viên / Admin' : 'Đăng Nhập Tài Khoản Học Sinh'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
            {role === 'teacher'
              ? 'Dành cho Admin và các tài khoản Giáo viên đã được cấp quyền'
              : 'Chọn lớp, tên học sinh và nhập Mã PIN cá nhân của em'}
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-2xl text-xs leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {role === 'teacher' ? (
          <form onSubmit={handleTeacherSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                Tên đăng nhập *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
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
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
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
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-bold tracking-wider focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
              />
              {rosterClasses.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Chọn nhanh lớp:</span>
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
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      Lớp {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                2. Tài khoản học sinh (Họ tên hoặc Mã HS) *
              </label>
              {studentsInSelectedClass.length > 0 ? (
                <div className="space-y-2">
                  <select
                    required
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium">
                      -- Chọn tên của em trong Lớp {classCode.toUpperCase()} --
                    </option>
                    {studentsInSelectedClass.map(s => (
                      <option
                        key={s.id}
                        value={s.studentName}
                        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                      >
                        {s.studentCode ? `${s.studentCode} - ` : ''}{s.studentName}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
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
                  className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-mono font-black tracking-widest focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Mỗi học sinh có 1 Mã PIN cá nhân riêng (Ví dụ: 3A-01, PIN12...). Nếu chưa nhớ, em hãy hỏi Thầy/Cô nhé.
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
                  <span>Đang kiểm tra tài khoản & bài tập...</span>
                </>
              ) : (
                <span>Vào Làm Bài Tập Ngay →</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
