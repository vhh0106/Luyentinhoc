import React, { useState, useMemo } from 'react';
import { UserFeedback, FeedbackStatus } from '../../types';
import { saveFeedback, updateFeedback, deleteFeedback } from '../../services/storage';
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Star,
  RefreshCw,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  X,
  Send,
  Sparkles,
  Award,
  Check,
  User,
  Users,
  GraduationCap,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

interface FeedbackManagementProps {
  feedbacks: UserFeedback[];
  onRefresh: () => Promise<void>;
  isSyncing?: boolean;
}

const CATEGORY_OPTIONS = [
  'Góp ý phần luyện gõ bàn phím',
  'Góp ý trò chơi Tin học',
  'Góp ý bài tập 10 chủ đề',
  'Báo lỗi kỹ thuật',
  'Đề xuất tính năng mới',
  'Lời chúc & động viên',
  'Khác'
];

export const FeedbackManagement: React.FC<FeedbackManagementProps> = ({
  feedbacks,
  onRefresh,
  isSyncing = false
}) => {
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRating, setSelectedRating] = useState<string>('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<UserFeedback | null>(null);
  const [replyingFeedback, setReplyingFeedback] = useState<UserFeedback | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Form state for Create / Edit
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState<'student' | 'teacher' | 'parent' | 'other'>('student');
  const [formContact, setFormContact] = useState('');
  const [formCategory, setFormCategory] = useState('Góp ý phần luyện gõ bàn phím');
  const [formRating, setFormRating] = useState(5);
  const [formStatus, setFormStatus] = useState<FeedbackStatus>('pending');
  const [formMessage, setFormMessage] = useState('');
  const [formAdminResponse, setFormAdminResponse] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for Reply
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState<FeedbackStatus>('resolved');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = feedbacks.length;
    const pending = feedbacks.filter(f => f.status === 'pending').length;
    const inProgress = feedbacks.filter(f => f.status === 'in_progress').length;
    const resolved = feedbacks.filter(f => f.status === 'resolved').length;
    const avgRating =
      total > 0
        ? (feedbacks.reduce((sum, f) => sum + (f.rating || 5), 0) / total).toFixed(1)
        : '5.0';
    return { total, pending, inProgress, resolved, avgRating };
  }, [feedbacks]);

  // Filtered feedbacks
  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(f => {
      // Search
      const s = searchTerm.toLowerCase().trim();
      const matchSearch =
        !s ||
        (f.name && f.name.toLowerCase().includes(s)) ||
        (f.message && f.message.toLowerCase().includes(s)) ||
        (f.contact && f.contact.toLowerCase().includes(s)) ||
        (f.category && f.category.toLowerCase().includes(s)) ||
        (f.adminResponse && f.adminResponse.toLowerCase().includes(s));

      if (!matchSearch) return false;

      // Status
      if (selectedStatus !== 'all' && f.status !== selectedStatus) return false;

      // Role
      if (selectedRole !== 'all' && f.role !== selectedRole) return false;

      // Category
      if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;

      // Rating
      if (selectedRating !== 'all' && String(f.rating) !== selectedRating) return false;

      return true;
    });
  }, [feedbacks, searchTerm, selectedStatus, selectedRole, selectedCategory, selectedRating]);

  // Handle open create modal
  const handleOpenCreate = () => {
    setEditingFeedback(null);
    setFormName('');
    setFormRole('student');
    setFormContact('');
    setFormCategory('Góp ý phần luyện gõ bàn phím');
    setFormRating(5);
    setFormStatus('pending');
    setFormMessage('');
    setFormAdminResponse('');
    setFormError(null);
    setIsCreateModalOpen(true);
  };

  // Handle open edit modal
  const handleOpenEdit = (fb: UserFeedback) => {
    setEditingFeedback(fb);
    setFormName(fb.name);
    setFormRole(fb.role || 'student');
    setFormContact(fb.contact || '');
    setFormCategory(fb.category || 'Góp ý phần luyện gõ bàn phím');
    setFormRating(fb.rating || 5);
    setFormStatus(fb.status || 'pending');
    setFormMessage(fb.message);
    setFormAdminResponse(fb.adminResponse || '');
    setFormError(null);
    setIsCreateModalOpen(true);
  };

  // Handle open reply modal
  const handleOpenReply = (fb: UserFeedback) => {
    setReplyingFeedback(fb);
    setReplyText(fb.adminResponse || '');
    setReplyStatus(fb.status === 'pending' ? 'resolved' : fb.status);
  };

  // Submit Create or Edit
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = formName.trim();
    const cleanMessage = formMessage.trim();

    if (!cleanName) {
      setFormError('Vui lòng nhập tên người gửi.');
      return;
    }
    if (!cleanMessage) {
      setFormError('Vui lòng nhập nội dung góp ý.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingFeedback) {
        await updateFeedback(editingFeedback.id, {
          name: cleanName,
          role: formRole,
          contact: formContact.trim(),
          category: formCategory,
          rating: formRating,
          status: formStatus,
          message: cleanMessage,
          adminResponse: formAdminResponse.trim()
        });
        showToast(`Đã cập nhật góp ý của "${cleanName}" thành công!`);
      } else {
        const newFb: UserFeedback = {
          id: `fb_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          name: cleanName,
          role: formRole,
          contact: formContact.trim(),
          category: formCategory,
          rating: formRating,
          status: formStatus,
          message: cleanMessage,
          adminResponse: formAdminResponse.trim(),
          createdAt: new Date().toISOString()
        };
        await saveFeedback(newFb);
        showToast(`Đã thêm góp ý mới từ "${cleanName}" thành công!`);
      }
      setIsCreateModalOpen(false);
    } catch (err) {
      setFormError('Có lỗi xảy ra khi lưu dữ liệu lên Cloud Firestore.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Submit Admin Reply
  const handleSaveReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyingFeedback) return;

    try {
      await updateFeedback(replyingFeedback.id, {
        status: replyStatus,
        adminResponse: replyText.trim()
      });
      showToast(`Đã gửi phản hồi cho "${replyingFeedback.name}"!`);
      setReplyingFeedback(null);
    } catch (err) {
      showToast('Lỗi khi cập nhật phản hồi.');
    }
  };

  // Quick Status Toggle
  const handleQuickStatusChange = async (fb: UserFeedback, newStatus: FeedbackStatus) => {
    await updateFeedback(fb.id, { status: newStatus });
    showToast(`Đã chuyển trạng thái sang "${getStatusLabel(newStatus)}"!`);
  };

  // Confirm and Execute Delete
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    await deleteFeedback(confirmDeleteId);
    showToast('Đã xóa góp ý thành công!');
    setConfirmDeleteId(null);
  };

  // Helpers
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <GraduationCap className="w-3 h-3" />
            Học sinh
          </span>
        );
      case 'teacher':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <ShieldCheck className="w-3 h-3" />
            Giáo viên
          </span>
        );
      case 'parent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Users className="w-3 h-3" />
            Phụ huynh
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <User className="w-3 h-3" />
            Khách
          </span>
        );
    }
  };

  const getStatusBadge = (status: FeedbackStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            Chờ xử lý
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
            <Sparkles className="w-3 h-3" />
            Đang xử lý
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Đã giải quyết
          </span>
        );
    }
  };

  const getStatusLabel = (status: FeedbackStatus) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'in_progress':
        return 'Đang xử lý';
      case 'resolved':
        return 'Đã giải quyết';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce-gentle">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-black">
              QUẢN TRỊ ADMIN
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Đồng bộ Realtime Cloud Firestore
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            Hòm Thư & Quản Lý Góp Ý Người Dùng
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Theo dõi, xử lý, phản hồi và phân loại ý kiến đóng góp từ học sinh, giáo viên và phụ huynh theo thời gian thực.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onRefresh}
            disabled={isSyncing}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
            title="Đồng bộ thủ công với Cloud Firestore"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Góp Ý / Ghi Chú</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">
            <span>Tổng góp ý</span>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {stats.total}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Tất cả nguồn gửi về</div>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">
            <span>Chờ xử lý</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
            {stats.pending}
          </div>
          <div className="text-[10px] text-amber-600/80 dark:text-amber-400/80 mt-0.5">Cần xem và phản hồi</div>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">
            <span>Đang xử lý</span>
            <Sparkles className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-sky-600 dark:text-sky-400 tabular-nums">
            {stats.inProgress}
          </div>
          <div className="text-[10px] text-sky-600/80 dark:text-sky-400/80 mt-0.5">Đang cải thiện tính năng</div>
        </div>

        <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">
            <span>Đã giải quyết</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {stats.resolved}
          </div>
          <div className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 mt-0.5">Hoàn tất phản hồi</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium mb-1.5">
            <span>Đánh giá trung bình</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-500 tabular-nums flex items-center gap-1">
            <span>{stats.avgRating}</span>
            <span className="text-xs font-normal text-slate-400">/ 5.0</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Mức độ hài lòng chung</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900/90 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên người gửi, nội dung góp ý, SĐT, email..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Clear Filters */}
          {(searchTerm || selectedStatus !== 'all' || selectedRole !== 'all' || selectedCategory !== 'all' || selectedRating !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
                setSelectedRole('all');
                setSelectedCategory('all');
                setSelectedRating('all');
              }}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 shrink-0 cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Trạng thái
            </label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả trạng thái ({feedbacks.length})</option>
              <option value="pending">Chờ xử lý ({stats.pending})</option>
              <option value="in_progress">Đang xử lý ({stats.inProgress})</option>
              <option value="resolved">Đã giải quyết ({stats.resolved})</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Người gửi
            </label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả đối tượng</option>
              <option value="student">🎓 Học sinh</option>
              <option value="teacher">👨‍🏫 Giáo viên</option>
              <option value="parent">👨‍👩‍👧 Phụ huynh</option>
              <option value="other">🌟 Khách trải nghiệm</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Chủ đề góp ý
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả chủ đề</option>
              {CATEGORY_OPTIONS.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Đánh giá sao
            </label>
            <select
              value={selectedRating}
              onChange={e => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả đánh giá</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 sao</option>
              <option value="4">⭐⭐⭐⭐ 4 sao</option>
              <option value="3">⭐⭐⭐ 3 sao</option>
              <option value="2">⭐⭐ 2 sao</option>
              <option value="1">⭐ 1 sao</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedbacks Cards List */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300 px-1">
          <span>Danh sách góp ý ({filteredFeedbacks.length} kết quả)</span>
          <span className="text-[11px] text-slate-400 font-normal">
            Nhấp chuột để xem chi tiết hoặc trả lời
          </span>
        </div>

        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white dark:bg-slate-900/90 p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              Không tìm thấy góp ý nào phù hợp
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc lọc lại theo trạng thái, người gửi, chủ đề.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {filteredFeedbacks.map(fb => (
              <div
                key={fb.id}
                className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-2xs hover:shadow-sm transition-all space-y-4"
              >
                {/* Header of Card */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {fb.name ? fb.name.charAt(0).toUpperCase() : 'U'}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {fb.name}
                        </span>
                        {getRoleBadge(fb.role)}
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {fb.category}
                        </span>
                      </div>

                      {/* Contact & Timestamp */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>{new Date(fb.createdAt).toLocaleString('vi-VN')}</span>

                        {fb.contact && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                              <Phone className="w-3 h-3 text-emerald-500" />
                              <span>{fb.contact}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars & Status */}
                  <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= (fb.rating || 5)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>

                    {getStatusBadge(fb.status)}
                  </div>
                </div>

                {/* Message Content */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {fb.message}
                </div>

                {/* Admin Response Note (if any) */}
                {fb.adminResponse && (
                  <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-900 dark:text-emerald-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Phản hồi từ Quản trị viên (Admin)
                      </span>
                      {fb.updatedAt && (
                        <span className="text-[10px] font-normal text-emerald-700 dark:text-emerald-400">
                          {new Date(fb.updatedAt).toLocaleString('vi-VN')}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {fb.adminResponse}
                    </p>
                  </div>
                )}

                {/* Card Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                  {/* Quick Status Select */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px] font-medium">Chuyển nhanh:</span>
                    <button
                      type="button"
                      onClick={() => handleQuickStatusChange(fb, 'pending')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        fb.status === 'pending'
                          ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 ring-1 ring-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      Chờ xử lý
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickStatusChange(fb, 'in_progress')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        fb.status === 'in_progress'
                          ? 'bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-200 ring-1 ring-sky-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      Đang xử lý
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickStatusChange(fb, 'resolved')}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        fb.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      Đã giải quyết
                    </button>
                  </div>

                  {/* Operation Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenReply(fb)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-blue-700 dark:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                    >
                      <Send className="w-3 h-3 text-blue-600" />
                      <span>{fb.adminResponse ? 'Sửa phản hồi' : 'Trả lời'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(fb)}
                      className="p-1.5 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Chỉnh sửa góp ý"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(fb.id)}
                      className="p-1.5 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                      title="Xóa góp ý này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-white" />
                <h3 className="font-bold text-base">
                  {editingFeedback ? 'Chỉnh Sửa Góp Ý' : 'Thêm Góp Ý / Ghi Chú Mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 rounded-xl text-xs font-bold border border-rose-200 dark:border-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tên người gửi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="VD: Bé Nam, Cô Lan, Thầy Tuấn..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Vai trò đối tượng
                  </label>
                  <select
                    value={formRole}
                    onChange={e => setFormRole(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="student">🎓 Học sinh Tiểu học</option>
                    <option value="teacher">👨‍🏫 Giáo viên</option>
                    <option value="parent">👨‍👩‍👧 Phụ huynh học sinh</option>
                    <option value="other">🌟 Khách trải nghiệm</option>
                  </select>
                </div>
              </div>

              {/* Contact & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    SĐT / Zalo / Email liên hệ
                  </label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={e => setFormContact(e.target.value)}
                    placeholder="034 855 4851, email@..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chủ đề góp ý
                  </label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Status & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Trạng thái xử lý
                  </label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as FeedbackStatus)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="pending">🟡 Chờ xử lý</option>
                    <option value="in_progress">🔵 Đang xử lý</option>
                    <option value="resolved">🟢 Đã giải quyết</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Đánh giá sao (1 - 5)
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= formRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nội dung góp ý <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formMessage}
                  onChange={e => setFormMessage(e.target.value)}
                  placeholder="Nội dung ý kiến đóng góp, mô tả lỗi hoặc đề xuất..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Admin Response Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phản hồi từ Admin (ghi chú hướng xử lý hoặc câu trả lời)
                </label>
                <textarea
                  rows={3}
                  value={formAdminResponse}
                  onChange={e => setFormAdminResponse(e.target.value)}
                  placeholder="Ghi chú kết quả xử lý hoặc lời cảm ơn gửi lại..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Đang lưu...' : editingFeedback ? 'Lưu Thay Đổi' : 'Tạo Góp Ý'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN REPLY MODAL */}
      {replyingFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-scale-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                <h3 className="font-bold text-base">
                  Phản Hồi Góp Ý: {replyingFeedback.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReplyingFeedback(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReply} className="p-6 space-y-4">
              {/* Original Message quote */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  Ý kiến của {replyingFeedback.name}:
                </div>
                <p className="italic">"{replyingFeedback.message}"</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Trạng thái sau khi phản hồi
                </label>
                <select
                  value={replyStatus}
                  onChange={e => setReplyStatus(e.target.value as FeedbackStatus)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="resolved">🟢 Đã giải quyết / Đã phản hồi</option>
                  <option value="in_progress">🔵 Đang xử lý</option>
                  <option value="pending">🟡 Chờ xử lý</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nội dung phản hồi hoặc ghi chú giải quyết
                </label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Ví dụ: Thầy Hiệp đã nhận được góp ý và vừa cập nhật lại phím gõ linh hoạt hơn. Cảm ơn em nhiều nhé!"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setReplyingFeedback(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu Phản Hồi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center space-y-4 animate-scale-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Xác nhận xóa góp ý này?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Góp ý sẽ bị xóa vĩnh viễn khỏi hệ thống và Cloud Firestore. Bạn không thể hoàn tác hành động này.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Xóa ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
