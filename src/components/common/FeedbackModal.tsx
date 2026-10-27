import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Phone,
  Facebook,
  Send,
  Star,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Copy,
  ExternalLink,
  Heart
} from 'lucide-react';

import { UserFeedback } from '../../types';
import { saveFeedback, getFeedbacks, subscribeToFeedbacks } from '../../services/storage';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'student' | 'teacher' | 'parent';
  defaultName?: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'student',
  defaultName = ''
}) => {
  const [name, setName] = useState(defaultName);
  const [role, setRole] = useState<'student' | 'teacher' | 'parent' | 'other'>(defaultRole);
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('Góp ý phần luyện gõ bàn phím');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recentFeedbacks, setRecentFeedbacks] = useState<UserFeedback[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Sync defaultName when opened
  useEffect(() => {
    if (defaultName) setName(defaultName);
    if (defaultRole) setRole(defaultRole);
  }, [defaultName, defaultRole, isOpen]);

  // Load existing feedbacks and subscribe to real-time updates
  useEffect(() => {
    if (!isOpen) return;
    setRecentFeedbacks(getFeedbacks());
    const unsub = subscribeToFeedbacks(live => {
      setRecentFeedbacks(live);
    });
    return () => unsub();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newFeedback: UserFeedback = {
      id: 'fb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      name: name.trim() || 'Người dùng ẩn danh',
      role,
      contact: contact.trim(),
      category,
      rating,
      message: message.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to Firestore and LocalStorage simultaneously
    await saveFeedback(newFeedback);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-inner">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black tracking-tight">
                Liên Hệ & Điền Form Góp Ý
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                Kênh tiếp nhận ý kiến đóng góp cho tác giả Vũ Hoàng Hiệp
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Official Contact Info Box */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Thông tin liên hệ tác giả trực tiếp
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                Sẵn sàng hỗ trợ 24/7
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Email */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Email</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate select-all">
                      vhh0106@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href="mailto:vhh0106@gmail.com"
                    className="flex-1 text-center py-1 text-[11px] font-semibold rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 transition-colors"
                  >
                    Gửi mail
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('vhh0106@gmail.com', 'email')}
                    className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Sao chép email"
                  >
                    {copiedField === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* SĐT / Zalo */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">SĐT / Zalo</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate select-all">
                      034 855 4851
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href="https://zalo.me/0348554851"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 text-center py-1 text-[11px] font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <span>Mở Zalo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('0348554851', 'phone')}
                    className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Sao chép SĐT"
                  >
                    {copiedField === 'phone' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Facebook */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Facebook</div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                      Vũ Hoàng Hiệp
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    href="https://www.facebook.com/vhh0106"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 text-center py-1 text-[11px] font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 transition-colors inline-flex items-center justify-center gap-1"
                  >
                    <span>Xem Facebook</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy('https://www.facebook.com/vhh0106', 'fb')}
                    className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Sao chép liên kết"
                  >
                    {copiedField === 'fb' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Form Or Success State */}
          {isSubmitted ? (
            <div className="p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-slate-800 rounded-3xl border border-emerald-200 dark:border-emerald-800/80 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Đã Gửi Góp Ý Thành Công! 🎉
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Cảm ơn <strong className="text-blue-600 dark:text-blue-400">{name || 'bạn'}</strong> đã đóng góp ý kiến quý báu! Thầy Vũ Hoàng Hiệp sẽ tiếp thu và liên tục hoàn thiện ứng dụng Tin Học Tiểu Học ngày một tốt hơn.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-xs"
                >
                  Gửi thêm ý kiến khác
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
                >
                  Xong & Đóng
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Điền thông tin và nội dung góp ý
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên của bạn
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="VD: Bé Nam, Cô Lan, Thầy Tuấn..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Bạn là
                  </label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="student">🎓 Học sinh Tiểu học</option>
                    <option value="teacher">👨‍🏫 Thầy / Cô giáo</option>
                    <option value="parent">👨‍👩‍👧 Phụ huynh học sinh</option>
                    <option value="other">🌟 Khách trải nghiệm</option>
                  </select>
                </div>
              </div>

              {/* Category & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Chủ đề góp ý
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="Góp ý phần luyện gõ bàn phím">⌨️ Góp ý phần Luyện gõ bàn phím (độ khó, phím, quy tắc)</option>
                    <option value="Góp ý trò chơi Tin học">🎮 Góp ý Trò chơi Tin học & Mini-games</option>
                    <option value="Góp ý bài tập 10 chủ đề">📚 Góp ý Nội dung bài học & Trắc nghiệm SGK</option>
                    <option value="Báo lỗi kỹ thuật">🐛 Báo lỗi hệ thống / Giao diện</option>
                    <option value="Đề xuất tính năng mới">💡 Đề xuất tính năng mới</option>
                    <option value="Lời chúc & động viên">❤️ Lời chúc & Động viên tác giả</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    SĐT hoặc Email liên hệ lại (tuỳ chọn)
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={e => setContact(e.target.value)}
                    placeholder="Để tác giả phản hồi lại khi cần..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Đánh giá độ hài lòng của bạn về ứng dụng
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-slate-300 dark:text-slate-600 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 ml-2">
                    {rating === 5 && '🌟 Rất tuyệt vời!'}
                    {rating === 4 && '👍 Hài lòng, cần cải thiện thêm xíu'}
                    {rating === 3 && '🙂 Bình thường'}
                    {rating === 2 && '😕 Còn nhiều chỗ khó dùng'}
                    {rating === 1 && '😞 Cần sửa đổi nhiều'}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nội dung chi tiết góp ý của bạn <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ví dụ: Em thấy phần luyện gõ bàn phím nên cho phép gõ tự do hơn, không nên bắt buộc đúng quy tắc quá khắt khe, hoặc giao diện bài học nên thêm..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowHistory(prev => !prev)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>{showHistory ? 'Ẩn lịch sử góp ý' : `Xem các góp ý đã lưu (${recentFeedbacks.length})`}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi Góp Ý Ngay</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Feedback History (Toggleable) */}
          {showHistory && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Góp ý đã lưu trên thiết bị này:
              </div>
              {recentFeedbacks.length === 0 ? (
                <div className="text-xs text-slate-400 italic">Chưa có góp ý nào được lưu.</div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {recentFeedbacks.map(fb => (
                    <div
                      key={fb.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                        <span>{fb.name} ({fb.category})</span>
                        <span className="text-[10px] font-normal text-slate-400">
                          {new Date(fb.createdAt).toLocaleString('vi-VN')}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{fb.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
