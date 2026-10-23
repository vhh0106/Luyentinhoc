import React, { useState, useEffect } from 'react';
import { Assignment, ExerciseResult, SubjectId, TeacherAccount } from '../types';
import { SUBJECTS_MAP } from '../data/curriculum';
import {
  getAssignments,
  saveAssignment,
  deleteAssignment,
  generateRandomPin,
  getResults
} from '../services/storage';
import {
  Plus,
  Trash2,
  Copy,
  Check,
  Users,
  BookOpen,
  Award,
  Layers,
  LogOut,
  X,
  FileCode,
  Download,
  Calendar,
  KeyRound
} from 'lucide-react';

interface TeacherDashboardProps {
  teacher: TeacherAccount;
  onLogout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacher, onLogout }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [selectedAssignmentFilter, setSelectedAssignmentFilter] = useState<string | null>(null);

  // Form state
  const [classCode, setClassCode] = useState('');
  const [note, setNote] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([
    'go',
    'go-tv',
    'chuot',
    'thuat-toan'
  ]);
  const [copiedPin, setCopiedPin] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setAssignments(getAssignments());
    setResults(getResults());
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

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode.trim()) {
      alert('Vui lòng nhập mã lớp học (Ví dụ: 3A, 4B, 5C)');
      return;
    }
    if (selectedSubjects.length === 0) {
      alert('Vui lòng chọn ít nhất 1 chủ đề bài tập');
      return;
    }

    const pin = generateRandomPin();
    const newAssignment: Assignment = {
      id: `assign-${Date.now()}`,
      classCode: classCode.trim().toUpperCase(),
      pin,
      subjects: selectedSubjects,
      teacherName: teacher.name,
      createdAt: new Date().toISOString(),
      note: note.trim() || `Bài tập Tin học lớp ${classCode.trim().toUpperCase()}`
    };

    saveAssignment(newAssignment);
    loadData();
    setShowModal(false);
    setClassCode('');
    setNote('');

    alert(`🎉 Đã tạo bài tập thành công!\n\nMã lớp: ${newAssignment.classCode}\nMã PIN: ${newAssignment.pin}\n\nThầy/Cô hãy gửi mã lớp và mã PIN này cho các em học sinh.`);
  };

  const handleDeleteAssignment = (id: string) => {
    if (window.confirm('Thầy/Cô có chắc chắn muốn xóa bài tập này không?')) {
      deleteAssignment(id);
      loadData();
    }
  };

  const handleCopyPin = (pin: string, code: string) => {
    navigator.clipboard.writeText(`Mã lớp: ${code} - Mã PIN: ${pin}`);
    setCopiedPin(pin);
    setTimeout(() => setCopiedPin(null), 2500);
  };

  // Export standalone HTML bundle if requested
  const handleExportOfflineBundle = () => {
    const htmlBundle = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tin Học Tiểu Học - Bản Ngoại Tuyến</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #f8fafc; color: #1e293b; }
    .card { background: white; padding: 2rem; border-radius: 1rem; border: 1px solid #e2e8f0; max-width: 800px; margin: 0 auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; margin-bottom: 0.5rem; }
    .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🎓 Tin Học Tiểu Học - Kết Nối Tri Thức</h1>
    <p>Gói bài tập ngoại tuyến dành cho lớp: <strong>${assignments[0]?.classCode || '3A'}</strong></p>
    <p>Mã PIN truy cập: <strong>${assignments[0]?.pin || 'KNTT03'}</strong></p>
    <p>10 chủ đề: Gõ phím, Gõ tiếng Việt, Chuột, Kĩ năng máy tính, Word, Excel, PowerPoint, Thuật toán, Công dân số, AI.</p>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlBundle], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TinHoc_KetNoiTriThuc_Lop${assignments[0]?.classCode || 'Demo'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredResults = selectedAssignmentFilter
    ? results.filter(r => r.pin === selectedAssignmentFilter)
    : results;

  return (
    <div className="space-y-8">
      {/* Top Banner & Profile Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
            <span>Không gian làm việc của Giáo Viên</span>
            <span>·</span>
            <span>Bộ sách Kết Nối Tri Thức</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Kính chào {teacher.name}! 👨‍🏫
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Trường: {teacher.school || 'Tiểu học Kết Nối Tri Thức'} · Quản trị menu bài tập và mã PIN tham gia của các lớp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bài tập mới</span>
          </button>

          <button
            onClick={onLogout}
            className="px-3 py-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
            title="Đăng xuất tài khoản"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Bài tập đã giao</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {assignments.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Được gán theo từng mã lớp</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Lớp học kích hoạt</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 tabular-nums">
            {new Set(assignments.map(a => a.classCode)).size}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Ví dụ: 3A, 4B, 5C...</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Lượt học sinh nộp bài</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700 tabular-nums">
            {results.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            <button
              onClick={() => setShowResultsModal(true)}
              className="text-blue-600 hover:underline font-semibold"
            >
              Xem chi tiết điểm số →
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>Kho chủ đề Kết Nối Tri Thức</span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-700 tabular-nums">
            10 / 10
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Gõ phím, Chuột, Word, AI...</div>
        </div>
      </div>

      {/* Assignments Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 className="text-lg font-bold text-slate-900">
              Danh Sách Bài Tập Theo Lớp & Mã PIN ({assignments.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportOfflineBundle}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              title="Xuất gói HTML để mở offline"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Xuất bản ngoại tuyến</span>
            </button>
          </div>
        </div>

        {assignments.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Chưa có bài tập nào</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Thầy/Cô hãy bấm nút "Tạo bài tập mới" để soạn menu trò chơi và cấp mã PIN cho học sinh làm bài nhé!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tạo bài tập ngay
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map(item => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-600 text-white font-black text-sm rounded-lg shadow-xs">
                        LỚP {item.classCode}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>

                    <button
                      onClick={() => handleDeleteAssignment(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Xóa bài tập này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{item.note}</h3>

                  {/* PIN Display Banner */}
                  <div className="mt-3 p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                        Mã PIN học sinh:
                      </span>
                      <span className="font-mono text-xl font-black text-blue-900 tracking-widest">
                        {item.pin}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyPin(item.pin, item.classCode)}
                      className="px-3 py-1.5 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                    >
                      {copiedPin === item.pin ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép PIN</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Included Subjects */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Menu trò chơi được gán ({item.subjects.length} chủ đề):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.subjects.map(sId => {
                        const sub = SUBJECTS_MAP[sId];
                        if (!sub) return null;
                        return (
                          <span
                            key={sId}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
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
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    GV phụ trách: <strong className="text-slate-700">{item.teacherName}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedAssignmentFilter(item.pin);
                      setShowResultsModal(true);
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Xem điểm bài này →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE ASSIGNMENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Tạo Bài Tập Mới Cho Lớp</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chọn mã lớp và menu các trò chơi trong chương trình Kết Nối Tri Thức
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mã Lớp Học *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: 3A, 4B, 5C..."
                    value={classCode}
                    onChange={e => setClassCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Học sinh sẽ nhập đúng mã này</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ghi Chú / Tên Đợt Bài Tập
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Luyện tập tuần 10"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject Selection Menu */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Soạn Menu Trò Chơi ({selectedSubjects.length} đã chọn)
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={handleSelectAllSubjects}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Chọn tất cả 10 môn
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      type="button"
                      onClick={handleClearAllSubjects}
                      className="text-slate-500 hover:text-rose-600 hover:underline"
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
                            ? 'bg-blue-50/80 border-blue-400 shadow-xs'
                            : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{sub.emoji}</span>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{sub.name}</div>
                            <div className="text-[11px] text-slate-500">{sub.meta}</div>
                          </div>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'
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
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Tạo bài tập & Cấp mã PIN</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT RESULTS MODAL */}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Bảng Kết Quả Học Sinh Đã Luyện Tập</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Thống kê kết quả nộp bài của học sinh theo mã PIN
                </p>
              </div>
              <button
                onClick={() => {
                  setShowResultsModal(false);
                  setSelectedAssignmentFilter(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedAssignmentFilter && (
              <div className="mb-4 flex items-center justify-between p-2.5 bg-blue-50 text-blue-800 rounded-xl text-xs font-semibold">
                <span>Đang lọc theo mã PIN: <strong>{selectedAssignmentFilter}</strong></span>
                <button
                  onClick={() => setSelectedAssignmentFilter(null)}
                  className="text-blue-600 hover:underline"
                >
                  Xem tất cả các lớp
                </button>
              </div>
            )}

            {filteredResults.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs italic">
                Chưa có học sinh nào nộp kết quả cho đợt bài này.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3">Học sinh</th>
                      <th className="p-3">Lớp / PIN</th>
                      <th className="p-3">Bài học</th>
                      <th className="p-3 text-center">Điểm</th>
                      <th className="p-3 text-center">Độ chính xác</th>
                      <th className="p-3 text-right">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResults.map(res => (
                      <tr key={res.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{res.studentName}</td>
                        <td className="p-3 font-mono text-slate-600">
                          {res.classCode} · {res.pin}
                        </td>
                        <td className="p-3 font-medium text-slate-700">
                          {res.lessonTitle}
                        </td>
                        <td className="p-3 text-center font-bold text-emerald-600">
                          {res.score}
                        </td>
                        <td className="p-3 text-center font-bold tabular-nums">
                          {res.accuracy}%
                        </td>
                        <td className="p-3 text-right text-slate-400 font-mono text-[11px]">
                          {new Date(res.completedAt).toLocaleTimeString('vi-VN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex justify-end pt-4 mt-6 border-t border-slate-100">
              <button
                onClick={() => {
                  setShowResultsModal(false);
                  setSelectedAssignmentFilter(null);
                }}
                className="px-5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
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
