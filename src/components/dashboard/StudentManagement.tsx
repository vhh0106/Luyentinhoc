import React, { useState, useMemo, useEffect } from 'react';
import { StudentAccount, ExerciseResult, Assignment, ClassRecord } from '../../types';
import {
  saveStudent,
  saveStudentsBatch,
  deleteStudent,
  deleteStudentsByClass,
  generateRandomPin,
  getClasses,
  saveClass,
  subscribeToClasses
} from '../../services/storage';
import {
  Users,
  UserPlus,
  Upload,
  Search,
  Edit3,
  Trash2,
  X,
  Check,
  Copy,
  RefreshCw,
  Download,
  KeyRound,
  AlertCircle,
  GraduationCap,
  FolderPlus
} from 'lucide-react';

interface StudentManagementProps {
  students: StudentAccount[];
  results: ExerciseResult[];
  assignments: Assignment[];
  onRefresh: () => Promise<void>;
  isSyncing?: boolean;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  students,
  results,
  assignments,
  onRefresh,
  isSyncing = false
}) => {
  // Collect all distinct class codes from cloud classes collection, students, and assignments
  const [classesList, setClassesList] = useState<ClassRecord[]>(() => getClasses());
  const [newClassInput, setNewClassInput] = useState('');
  const [showAddClassInput, setShowAddClassInput] = useState(false);

  useEffect(() => {
    const unsub = subscribeToClasses(liveClasses => {
      setClassesList(liveClasses);
    });
    return () => unsub();
  }, []);

  const classCodes = useMemo(() => {
    const set = new Set<string>();
    classesList.forEach(c => {
      if (c.classCode.trim()) set.add(c.classCode.trim().toUpperCase());
    });
    students.forEach(s => {
      if (s.classCode.trim()) set.add(s.classCode.trim().toUpperCase());
    });
    assignments.forEach(a => {
      if (a.classCode.trim()) set.add(a.classCode.trim().toUpperCase());
    });
    return Array.from(set).sort();
  }, [classesList, students, assignments]);

  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal states (Create / Edit Single Student)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentAccount | null>(null);
  const [formName, setFormName] = useState('');
  const [formClass, setFormClass] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formGender, setFormGender] = useState<'Nam' | 'Nữ' | 'Khác'>('Nam');
  const [formPin, setFormPin] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Batch Import Modal state
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const [batchClass, setBatchClass] = useState('');
  const [batchText, setBatchText] = useState('');
  const [batchError, setBatchError] = useState<string | null>(null);

  // Inline Delete Confirmation state
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmClearClass, setConfirmClearClass] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered students list
  const filteredStudents = useMemo(() => {
    return students
      .filter(s => {
        if (selectedClass !== 'ALL' && s.classCode.toUpperCase() !== selectedClass.toUpperCase()) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          const matchName = s.studentName.toLowerCase().includes(q);
          const matchCode = (s.studentCode || '').toLowerCase().includes(q);
          const matchClass = s.classCode.toLowerCase().includes(q);
          return matchName || matchCode || matchClass;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.classCode !== b.classCode) return a.classCode.localeCompare(b.classCode);
        return (a.studentCode || a.studentName).localeCompare(b.studentCode || b.studentName, 'vi');
      });
  }, [students, selectedClass, searchQuery]);

  // Compute real stats per student from results
  const studentStatsMap = useMemo(() => {
    const map = new Map<string, { submissions: number; avgScore: number; totalStars: number }>();
    students.forEach(s => {
      const sNameNorm = (s.studentName || '').trim().normalize('NFC').toLowerCase();
      const sClassNorm = (s.classCode || '').trim().toUpperCase();
      const sPinNorm = (s.pin || '').trim().toUpperCase();

      const sResults = results.filter(r => {
        const rClassNorm = (r.classCode || '').trim().toUpperCase();
        if (rClassNorm !== sClassNorm) return false;

        const rNameNorm = (r.studentName || '').trim().normalize('NFC').toLowerCase();
        const rPinNorm = (r.pin || '').trim().toUpperCase();

        // 1. Match by exact normalized Vietnamese name
        if (rNameNorm === sNameNorm) return true;

        // 2. Match by student personal PIN within same class
        if (sPinNorm && rPinNorm && sPinNorm === rPinNorm) return true;

        return false;
      });

      const submissions = sResults.length;
      const avgScore =
        submissions > 0
          ? Math.round(sResults.reduce((acc, r) => acc + r.score, 0) / submissions)
          : 0;
      const totalStars = sResults.reduce((acc, r) => {
        if (r.score >= 90) return acc + 3;
        if (r.score >= 75) return acc + 2;
        if (r.score >= 50) return acc + 1;
        return acc;
      }, 0);
      map.set(s.id, { submissions, avgScore, totalStars });
    });
    return map;
  }, [students, results]);

  // Add new custom class filter tab
  const handleAddClassTab = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newClassInput.trim().toUpperCase();
    if (!clean) return;
    await saveClass(clean, `Lớp ${clean}`);
    setSelectedClass(clean);
    setNewClassInput('');
    setShowAddClassInput(false);
    await onRefresh();
    showToast(`Đã thêm Lớp ${clean} và đồng bộ lên đám mây Cloud!`);
  };

  // Open Modal for Creating a Student
  const handleOpenCreate = () => {
    const defaultClass = selectedClass !== 'ALL' ? selectedClass : classCodes[0] || '3A';
    const existingInClass = students.filter(
      s => s.classCode.toUpperCase() === defaultClass.toUpperCase()
    );
    const nextNum = String(existingInClass.length + 1).padStart(2, '0');

    setEditingStudent(null);
    setFormName('');
    setFormClass(defaultClass);
    setFormCode(`${defaultClass}-${nextNum}`);
    setFormGender('Nam');
    setFormPin(generateRandomPin());
    setFormNote('');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open Modal for Editing a Student
  const handleOpenEdit = (student: StudentAccount) => {
    setEditingStudent(student);
    setFormName(student.studentName);
    setFormClass(student.classCode);
    setFormCode(student.studentCode || '');
    setFormGender(student.gender || 'Nam');
    setFormPin(student.pin || generateRandomPin());
    setFormNote(student.note || '');
    setFormError(null);
    setIsFormOpen(true);
  };

  // Submit Create or Update Student
  const handleSaveStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = formName.trim();
    const cleanClass = formClass.trim().toUpperCase();

    if (!cleanName) {
      setFormError('Vui lòng nhập Họ và tên học sinh.');
      return;
    }
    if (!cleanClass) {
      setFormError('Vui lòng nhập Mã lớp (Ví dụ: 3A, 4B, 5C).');
      return;
    }

    setIsSaving(true);
    try {
      const existingInClass = students.filter(s => s.classCode.toUpperCase() === cleanClass);
      const autoCode =
        formCode.trim() || `${cleanClass}-${String(existingInClass.length + 1).padStart(2, '0')}`;

      const record: StudentAccount = {
        id: editingStudent ? editingStudent.id : `stu_${cleanClass}_${Date.now()}`,
        studentName: cleanName,
        classCode: cleanClass,
        studentCode: autoCode.toUpperCase(),
        gender: formGender,
        pin: formPin.trim().toUpperCase() || generateRandomPin(),
        createdAt: editingStudent ? editingStudent.createdAt : new Date().toISOString(),
        note: formNote.trim()
      };

      await saveClass(cleanClass, `Lớp ${cleanClass}`);
      await saveStudent(record);
      await onRefresh();
      setIsFormOpen(false);
      showToast(
        editingStudent
          ? `Đã cập nhật học sinh "${record.studentName}" (Lớp ${record.classCode})`
          : `Đã thêm học sinh "${record.studentName}" vào Lớp ${record.classCode}`
      );
    } catch (err) {
      setFormError('Có lỗi khi lưu tài khoản học sinh. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  // Batch Import Students
  const handleOpenBatch = () => {
    const defaultClass = selectedClass !== 'ALL' ? selectedClass : classCodes[0] || '3A';
    setBatchClass(defaultClass);
    setBatchText('');
    setBatchError(null);
    setIsBatchOpen(true);
  };

  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBatchError(null);

    const cleanClass = batchClass.trim().toUpperCase();
    if (!cleanClass) {
      setBatchError('Vui lòng nhập Mã lớp học (Ví dụ: 3A, 4B).');
      return;
    }

    const lines = batchText
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setBatchError('Vui lòng nhập danh sách tên học sinh (mỗi dòng 1 học sinh).');
      return;
    }

    setIsSaving(true);
    try {
      const existingInClass = students.filter(s => s.classCode.toUpperCase() === cleanClass);
      let startIdx = existingInClass.length + 1;

      const newStudents: StudentAccount[] = lines.map((line, idx) => {
        // Support format: "Nguyễn Văn A | Nam | Ghi chú" or just "Nguyễn Văn A"
        const parts = line.split('|').map(p => p.trim());
        const name = parts[0];
        const genderRaw = (parts[1] || '').toLowerCase();
        const gender: 'Nam' | 'Nữ' | 'Khác' =
          genderRaw === 'nữ' || genderRaw === 'nu'
            ? 'Nữ'
            : genderRaw === 'khác'
            ? 'Khác'
            : 'Nam';
        const note = parts[2] || '';
        const seq = String(startIdx + idx).padStart(2, '0');

        return {
          id: `stu_${cleanClass}_${Date.now()}_${idx}`,
          studentName: name,
          classCode: cleanClass,
          studentCode: `${cleanClass}-${seq}`,
          gender,
          pin: generateRandomPin(),
          createdAt: new Date().toISOString(),
          note
        };
      });

      await saveClass(cleanClass, `Lớp ${cleanClass}`);
      await saveStudentsBatch(newStudents);
      await onRefresh();
      setSelectedClass(cleanClass);
      setIsBatchOpen(false);
      showToast(`Đã nhập thành công ${newStudents.length} học sinh vào Lớp ${cleanClass}!`);
    } catch (err) {
      setBatchError('Lỗi khi nhập danh sách học sinh. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete single student
  const handleConfirmDeleteStudent = async (student: StudentAccount) => {
    await deleteStudent(student.id);
    setConfirmDeleteId(null);
    await onRefresh();
    showToast(`Đã xóa tài khoản học sinh "${student.studentName}".`);
  };

  // Delete all students in class
  const handleConfirmClearClass = async (classCodeToClear: string) => {
    await deleteStudentsByClass(classCodeToClear);
    setConfirmClearClass(null);
    await onRefresh();
    showToast(`Đã xóa toàn bộ danh sách học sinh Lớp ${classCodeToClear}.`);
  };

  // Copy student account info (only 1 personal PIN for the student)
  const handleCopyStudentAccount = (student: StudentAccount) => {
    const text = `Học sinh: ${student.studentName} | Mã HS: ${student.studentCode || ''} | Lớp: ${student.classCode} | Mã PIN đăng nhập: ${student.pin || ''}`;
    navigator.clipboard.writeText(text);
    setCopiedId(student.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export CSV Roster
  const handleExportCsv = () => {
    if (filteredStudents.length === 0) return;
    const headers = ['Mã HS', 'Họ và tên', 'Lớp', 'Giới tính', 'Mã PIN cá nhân', 'Số bài đã nộp', 'Điểm TB', 'Ghi chú'];
    const rows = filteredStudents.map(s => {
      const st = studentStatsMap.get(s.id) || { submissions: 0, avgScore: 0 };
      return [
        s.studentCode || '',
        `"${s.studentName.replace(/"/g, '""')}"`,
        s.classCode,
        s.gender || 'Nam',
        s.pin || '',
        st.submissions,
        st.avgScore,
        `"${(s.note || '').replace(/"/g, '""')}"`
      ].join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DanhSachHocSinh_${selectedClass === 'ALL' ? 'ToanTruong' : `Lop_${selectedClass}`}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-600 hover:text-emerald-800 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Toolbar: Class Tabs + Action Buttons */}
      <div className="bg-white dark:bg-slate-900/90 p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Quản Lý Danh Sách Tài Khoản Học Sinh Theo Lớp
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thêm mới, nhập theo danh sách lớp, chỉnh sửa, xóa và đồng bộ trực tiếp lên Cloud Firestore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleOpenCreate}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Thêm học sinh</span>
            </button>

            <button
              onClick={handleOpenBatch}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4" />
              <span>Nhập nhanh cả lớp</span>
            </button>

            {filteredStudents.length > 0 && (
              <button
                onClick={handleExportCsv}
                className="px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                title="Xuất danh sách ra file Excel/CSV"
              >
                <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>Xuất CSV</span>
              </button>
            )}

            <button
              onClick={async () => {
                await onRefresh();
                showToast('Đã đồng bộ dữ liệu học sinh & điểm nộp bài từ Cloud Firestore!');
              }}
              disabled={isSyncing}
              className="px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs bg-white dark:bg-slate-800"
              title="Đồng bộ danh sách & điểm nộp bài từ Cloud Firestore"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="text-xs font-bold">
                {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ danh sách'}
              </span>
            </button>
          </div>
        </div>

        {/* Class Filter Bar & Search */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedClass('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedClass === 'ALL'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Tất cả ({students.length})
            </button>

            {classCodes.map(code => {
              const count = students.filter(s => s.classCode.toUpperCase() === code).length;
              return (
                <button
                  key={code}
                  onClick={() => setSelectedClass(code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedClass === code
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>Lớp {code}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      selectedClass === code
                        ? 'bg-blue-700 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {showAddClassInput ? (
              <form onSubmit={handleAddClassTab} className="inline-flex items-center gap-1">
                <input
                  type="text"
                  placeholder="VD: 3A"
                  value={newClassInput}
                  onChange={e => setNewClassInput(e.target.value.toUpperCase())}
                  className="w-20 px-2.5 py-1 text-xs font-bold border border-blue-400 dark:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddClassInput(false)}
                  className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddClassInput(true)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors flex items-center gap-1"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>+ Thêm lớp</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Tìm tên hoặc mã học sinh..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-xl text-xs font-medium focus:bg-white dark:focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {selectedClass !== 'ALL' && filteredStudents.length > 0 && (
              <>
                {confirmClearClass === selectedClass ? (
                  <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 px-2.5 py-1 rounded-xl text-xs">
                    <span className="text-rose-800 dark:text-rose-200 font-bold">Xóa cả lớp {selectedClass}?</span>
                    <button
                      onClick={() => handleConfirmClearClass(selectedClass)}
                      className="px-2 py-0.5 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => setConfirmClearClass(null)}
                      className="px-1.5 py-0.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmClearClass(selectedClass)}
                    className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl transition-colors flex items-center gap-1"
                    title={`Xóa toàn bộ học sinh lớp ${selectedClass}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Xóa danh sách lớp {selectedClass}</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Users className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">
                {searchQuery
                  ? 'Không tìm thấy học sinh phù hợp'
                  : selectedClass === 'ALL'
                  ? 'Chưa có tài khoản học sinh nào trong hệ thống'
                  : `Lớp ${selectedClass} chưa có danh sách học sinh`}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thầy/Cô có thể thêm từng học sinh hoặc bấm nút <strong>"Nhập nhanh cả lớp"</strong> để dán danh sách học sinh từ Excel/Word vào lớp học.
              </p>
            </div>
            {!searchQuery && (
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  onClick={handleOpenCreate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Thêm 1 học sinh</span>
                </button>
                <button
                  onClick={handleOpenBatch}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>Nhập danh sách lớp</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-black tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">STT</th>
                  <th className="py-3.5 px-4">Mã HS</th>
                  <th className="py-3.5 px-4">Họ và tên học sinh</th>
                  <th className="py-3.5 px-4 text-center">Lớp</th>
                  <th className="py-3.5 px-4 text-center">Giới tính</th>
                  <th className="py-3.5 px-4 text-center">Mã PIN</th>
                  <th className="py-3.5 px-4 text-center">Bài đã nộp</th>
                  <th className="py-3.5 px-4 text-center">Điểm TB</th>
                  <th className="py-3.5 px-4">Ghi chú</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredStudents.map((student, idx) => {
                  const stats = studentStatsMap.get(student.id) || {
                    submissions: 0,
                    avgScore: 0,
                    totalStars: 0
                  };
                  const isDeleting = confirmDeleteId === student.id;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-400 dark:text-slate-500 tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {student.studentCode || '—'}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {student.studentName}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-black text-xs">
                          {student.classCode}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-300 font-medium">
                        {student.gender || 'Nam'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
                          {student.pin || '—'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold tabular-nums">
                        {stats.submissions > 0 ? (
                          <span className="text-blue-700 dark:text-blue-400">{stats.submissions} bài</span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 font-normal">Chưa nộp</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {stats.submissions > 0 ? (
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold ${
                              stats.avgScore >= 80
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            }`}
                          >
                            {stats.avgScore} đ
                          </span>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600">—</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400 max-w-[180px] truncate">
                        {student.note || '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {isDeleting ? (
                          <div className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl">
                            <span className="text-[11px] font-bold text-rose-800">Xóa?</span>
                            <button
                              onClick={() => handleConfirmDeleteStudent(student)}
                              className="px-2 py-0.5 bg-rose-600 text-white rounded-md text-[11px] font-bold hover:bg-rose-700"
                            >
                              Có
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 text-[11px] font-semibold"
                            >
                              Không
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={() => handleCopyStudentAccount(student)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Sao chép thông tin tài khoản"
                            >
                              {copiedId === student.id ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleOpenEdit(student)}
                              className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Chỉnh sửa thông tin học sinh"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(student.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Xóa học sinh"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL 1: CREATE / EDIT SINGLE STUDENT */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {editingStudent ? 'Chỉnh Sửa Tài Khoản Học Sinh' : 'Thêm Tài Khoản Học Sinh Mới'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Lưu trữ đồng bộ trên Đám mây để học sinh đăng nhập từ mọi máy tính
                </p>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
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

            <form onSubmit={handleSaveStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Họ và tên học sinh *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ và tên đầy đủ..."
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mã lớp học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 3A, 4B, 5C..."
                    value={formClass}
                    onChange={e => setFormClass(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mã học sinh (Tự động / Tùy chỉnh)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 3A-01"
                    value={formCode}
                    onChange={e => setFormCode(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Giới tính
                  </label>
                  <select
                    value={formGender}
                    onChange={e => setFormGender(e.target.value as 'Nam' | 'Nữ' | 'Khác')}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mã PIN cá nhân
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={formPin}
                      onChange={e => setFormPin(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-emerald-800 uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setFormPin(generateRandomPin())}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                      title="Tạo mã PIN ngẫu nhiên mới"
                    >
                      <KeyRound className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Ghi chú
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Tổ trưởng tổ 1, Máy số 05..."
                  value={formNote}
                  onChange={e => setFormNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  {isSaving ? 'Đang lưu...' : editingStudent ? 'Lưu thay đổi' : 'Thêm học sinh'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BATCH IMPORT CLASS ROSTER */}
      {isBatchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Nhập Nhanh Danh Sách Học Sinh Theo Lớp
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dán danh sách họ tên học sinh (mỗi dòng 1 em) để tạo tài khoản hàng loạt
                </p>
              </div>
              <button
                onClick={() => setIsBatchOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {batchError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{batchError}</span>
              </div>
            )}

            <form onSubmit={handleBatchSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mã Lớp Học *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 3A, 4B, 5C..."
                  value={batchClass}
                  onChange={e => setBatchClass(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Danh sách học sinh (Mỗi dòng 1 học sinh) *
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Hỗ trợ: Họ tên | Giới tính | Ghi chú
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder={`Nhập mỗi học sinh trên 1 dòng, ví dụ:\nNguyễn Minh Khôi | Nam | Máy 01\nTrần Bảo Ngọc | Nữ | Máy 02\nLê Hoàng Nam`}
                  value={batchText}
                  onChange={e => setBatchText(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium leading-relaxed focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBatchOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isSaving ? 'Đang nhập...' : 'Nhập danh sách vào lớp'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
