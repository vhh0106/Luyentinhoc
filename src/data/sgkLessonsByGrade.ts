import { Lesson } from '../types';
import { rotateQuestionOptions } from './curriculum';
import { SGK_LESSONS_GRADE_3 } from './sgkLessonsGrade3';
import { SGK_LESSONS_GRADE_4 } from './sgkLessonsGrade4';
import { SGK_LESSONS_GRADE_5 } from './sgkLessonsGrade5';

// Re-export full grade lesson lists for explicit access
export { SGK_LESSONS_GRADE_3 } from './sgkLessonsGrade3';
export { SGK_LESSONS_GRADE_4 } from './sgkLessonsGrade4';
export { SGK_LESSONS_GRADE_5 } from './sgkLessonsGrade5';

/**
 * DANH SÁCH BÀI HỌC VÀ CÂU HỎI CHUẨN 100% THEO SÁCH GIÁO KHOA TIN HỌC (BỘ KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
 * Phân chia độc lập và chính xác cho từng khối lớp:
 * - LỚP 3: 16 BÀI HỌC (Bài 1 -> Bài 16) × 5 câu hỏi/bài = 80 câu hỏi
 * - LỚP 4: 16 BÀI HỌC (Bài 1 -> Bài 16) × 5 câu hỏi/bài = 80 câu hỏi
 * - LỚP 5: 16 BÀI HỌC (Bài 1 -> Bài 16) × 5 câu hỏi/bài = 80 câu hỏi
 * Tổng cộng 240 câu hỏi trắc nghiệm chuyên sâu.
 *
 * TIÊU CHUẨN BIÊN SOẠN BẮT BUỘC:
 * 1. TUYỆT ĐỐI CÂN BẰNG ĐỘ DÀI: Cả 4 phương án A, B, C, D đều có số từ và cấu trúc câu tương đương nhau.
 *    Học sinh không thể dùng mẹo chọn câu dài nhất để đoán mò đáp án đúng.
 * 2. ĐỘ KHÓ VÀ TÌNH HUỐNG SÂU SẮC: Trắc nghiệm dựa trên tình huống thực hành, phím tắt, thao tác File Explorer, Word, PPT và thuật toán Scratch.
 * 3. ĐÚNG CHỦ ĐỀ VÀ TÊN BÀI THEO MỤC LỤC SGK KẾT NỐI TRI THỨC.
 * 4. ĐỦ 5 CÂU HỎI MỖI BÀI.
 */

// Helper để lấy 16 bài học chính thức theo khối lớp với 5 câu hỏi mỗi bài
export function getOfficialSgkLessonsForGrade(grade: 3 | 4 | 5): Lesson[] {
  let lessons: Lesson[] = [];
  if (grade === 3) lessons = SGK_LESSONS_GRADE_3;
  else if (grade === 4) lessons = SGK_LESSONS_GRADE_4;
  else lessons = SGK_LESSONS_GRADE_5;

  // Xoay phương án câu hỏi tất định để đáp án không bị thiên vị vị trí
  return lessons.map(lesson => ({
    ...lesson,
    questions: (lesson.questions || []).map((q, idx) => rotateQuestionOptions(q, lesson.id * 11 + idx))
  }));
}
