import React, { useState } from 'react';
import { TeacherAccount } from '../../types';
import { saveTeacher, deleteTeacher } from '../../services/storage';
import {
  ShieldCheck,
  UserPlus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Check,
  Copy,
  X,
  RefreshCw,
  KeyRound,
  AlertCircle,
  Users,
  School
} from 'lucide-react';

interface TeacherManagementProps {
  teachers: TeacherAccount[];
  currentTeacher: TeacherAccount;
  onRefresh: () => Promise<void>;
  isSyncing?: boolean;
}

export const TeacherManagement: React.FC<TeacherManagementProps> = ({
  teachers,
  currentTeacher,
  onRefresh,
  isSyncing = false
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<TeacherAccount | null>(null);

  // Form fields
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'teacher' | 'admin'>('teacher');
  const [formSchool, setFormSchool] = useState('Tiểu học Kết Nối Tri Thức');
  const [formClasses, setFormClasses] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // UI states
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<string | null>(null);
  const [copiedUser, setCopiedUser] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const toggleShowPassword = (username: string) => {
    setVisiblePasswords(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const handleOpenCreate = () => {
    setEditingAccount(null);
    setFormUsername('');
    setFormPassword('123456');
    setFormName('');
    setFormRole('teacher');
    setFormSchool(currentTeacher.school || 'Tiểu học Kết Nối Tri Thức');
    setFormClasses('');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (account: TeacherAccount) => {
    setEditingAccount(account);
    setFormUsername(account.username);
    setFormPassword(account.password || '');
    setFormName(account.name);
    setFormRole(account.role || 'teacher');
    setFormSchool(account.school || 'Tiểu học Kết Nối Tri Thức');
    setFormClasses((account.assignedClasses || []).join(', '));
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanUsername = formUsername.trim().toLowerCase();
    const cleanPassword = formPassword.trim();
    const cleanName = formName.trim();

    if (!cleanUsername || !/^[a-zA-Z0-9_\-.]+$/.test(cleanUsername)) {
      setFormError('Tên đăng nhập chỉ được chứa chữ cái không dấu, số, dấu gạch dưới hoặc dấu chấm.');
      return;
    }
    if (!cleanPassword || cleanPassword.length < 4) {
      setFormError('Mật khẩu phải có ít nhất 4 ký tự.');
      return;
    }
    if (!cleanName) {
      setFormError('Vui lòng nhập Họ và tên giáo viên.');
      return;
    }

    if (
      !editingAccount &&
      teachers.some(t => t.username.toLowerCase() === cleanUsername)
    ) {
      setFormError(`Tên đăng nhập "${cleanUsername}" đã tồn tại. Vui lòng chọn tên khác.`);
      return;
    }

    const parsedClasses = formClasses
      .split(/[,;\s]+/)
      .map(c => c.trim().toUpperCase())
      .filter(Boolean);

    setIsSaving(true);
    try {
      const record: TeacherAccount = {
        username: cleanUsername,
        password: cleanPassword,
        name: cleanName,
        role: cleanUsername === 'admin' ? 'admin' : formRole,
        school: formSchool.trim() || 'Tiểu học Kết Nối Tri Thức',
        assignedClasses: parsedClasses,
        createdAt: editingAccount ? editingAccount.createdAt : new Date().toISOString()
      };

      await saveTeacher(record);
      await onRefresh();
      setIsModalOpen(false);
      showToast(
        editingAccount
          ? `Đã cập nhật tài khoản giáo viên "${record.name}" (${record.username})`
          : `Đã tạo tài khoản giáo viên "${record.name}" (${record.username})`
      );
    } catch (err) {
      setFormError('Không thể lưu tài khoản giáo viên. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (account: TeacherAccount) => {
    if (account.username.toLowerCase() === 'admin') return;
    await deleteTeacher(account.username);
    setConfirmDeleteUser(null);
    await onRefresh();
    showToast(`Đã xóa tài khoản giáo viên "${account.name}" (${account.username}).`);
  };

  const handleCopyCredentials = (account: TeacherAccount) => {
    const text = `Tài khoản Giáo viên: ${account.name} | Tên đăng nhập: ${account.username} | Mật khẩu: ${account.password || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedUser(account.username);
    setTimeout(() => setCopiedUser(null), 2000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-emerald-700 hover:text-emerald-950 p-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">
                Phân Quyền Quản Trị & Tài Khoản Giáo Viên
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase">
                Chỉ dành cho Admin
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Cấp tài khoản, mật khẩu và phân công lớp dạy cho từng giáo viên trong trường (không cho phép tự do đăng nhập)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tạo tài khoản Giáo viên mới</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isSyncing}
            className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            title="Đồng bộ danh sách giáo viên từ Cloud Firestore"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-black tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">STT</th>
                <th className="py-3.5 px-4">Họ và tên Giáo viên</th>
                <th className="py-3.5 px-4">Tên đăng nhập</th>
                <th className="py-3.5 px-4">Mật khẩu</th>
                <th className="py-3.5 px-4 text-center">Vai trò</th>
                <th className="py-3.5 px-4">Lớp phụ trách</th>
                <th className="py-3.5 px-4">Trường</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teachers.map((acc, idx) => {
                const isRootAdmin = acc.username.toLowerCase() === 'admin';
                const isShowPass = !!visiblePasswords[acc.username];
                const isDeleting = confirmDeleteUser === acc.username;

                return (
                  <tr key={acc.username} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-400 tabular-nums">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{acc.name}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-lg">
                        {acc.username}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1.5 font-mono">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                          {isShowPass ? acc.password || '—' : '••••••••'}
                        </span>
                        <button
                          onClick={() => toggleShowPassword(acc.username)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded"
                          title={isShowPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        >
                          {isShowPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {acc.role === 'admin' || isRootAdmin ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                          Quản trị viên (Admin)
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          Giáo viên
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {acc.assignedClasses && acc.assignedClasses.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {acc.assignedClasses.map(c => (
                            <span
                              key={c}
                              className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-bold text-[11px]"
                            >
                              Lớp {c}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">Tất cả các lớp</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {acc.school || 'Tiểu học Kết Nối Tri Thức'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isDeleting ? (
                        <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl">
                          <span className="text-[11px] font-bold text-rose-800">Xóa GV?</span>
                          <button
                            onClick={() => handleDelete(acc)}
                            className="px-2 py-0.5 bg-rose-600 text-white rounded-md text-[11px] font-bold hover:bg-rose-700"
                          >
                            Có
                          </button>
                          <button
                            onClick={() => setConfirmDeleteUser(null)}
                            className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 text-[11px] font-semibold"
                          >
                            Không
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => handleCopyCredentials(acc)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                            title="Sao chép tài khoản & mật khẩu để gửi cho giáo viên"
                          >
                            {copiedUser === acc.username ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleOpenEdit(acc)}
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Chỉnh sửa hoặc đổi mật khẩu"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {!isRootAdmin && (
                            <button
                              onClick={() => setConfirmDeleteUser(acc.username)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Xóa tài khoản giáo viên"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT TEACHER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingAccount ? 'Cập Nhật Tài Khoản Giáo Viên' : 'Tạo Tài Khoản Giáo Viên Mới'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chỉ tài khoản được tạo tại đây mới có quyền đăng nhập vào cổng Giáo viên
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Họ và tên Giáo viên *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cô Nguyễn Thị Hoa"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tên đăng nhập *
                  </label>
                  <input
                    type="text"
                    required
                    disabled={!!editingAccount}
                    placeholder="VD: gv_hoa01"
                    value={formUsername}
                    onChange={e => setFormUsername(e.target.value.toLowerCase())}
                    className="w-full px-3.5 py-2.5 bg-slate-50 disabled:bg-slate-100 disabled:text-slate-500 border border-slate-300 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mật khẩu đăng nhập *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập mật khẩu..."
                    value={formPassword}
                    onChange={e => setFormPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-indigo-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phân quyền hệ thống
                  </label>
                  <select
                    value={formRole}
                    disabled={editingAccount?.username.toLowerCase() === 'admin'}
                    onChange={e => setFormRole(e.target.value as 'teacher' | 'admin')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option value="teacher">Giáo viên bộ môn</option>
                    <option value="admin">Quản trị viên (Admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Các lớp phụ trách (cách nhau dấu phẩy)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 3A, 3B, 4A (để trống = tất cả)"
                    value={formClasses}
                    onChange={e => setFormClasses(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Đơn vị / Trường học
                </label>
                <input
                  type="text"
                  value={formSchool}
                  onChange={e => setFormSchool(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  {isSaving
                    ? 'Đang lưu...'
                    : editingAccount
                    ? 'Lưu cập nhật'
                    : 'Tạo tài khoản Giáo viên'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
