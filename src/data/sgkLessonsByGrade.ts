import { Lesson, QuizQuestion } from '../types';
import { rotateQuestionOptions } from './curriculum';
import { SGK_LESSONS_GRADE_3 as SGK_LESSONS_GRADE_3_BASE } from './sgkLessonsGrade3';
import { SGK_LESSONS_GRADE_4 as SGK_LESSONS_GRADE_4_BASE } from './sgkLessonsGrade4';
import { SGK_LESSONS_GRADE_5 as SGK_LESSONS_GRADE_5_BASE } from './sgkLessonsGrade5';
import { SGK_EXTRA_GRADE_3 } from './sgkExtraGrade3';
import { SGK_EXTRA_GRADE_4 } from './sgkExtraGrade4';
import { SGK_EXTRA_GRADE_5 } from './sgkExtraGrade5';

/**
 * Hàm ghép 10 câu hỏi cho mỗi bài học SGK:
 * - Phần 1: Câu 1 - 5 (Nhận biết & Khái niệm cốt lõi)
 * - Phần 2: Câu 6 - 10 (Thông hiểu & Vận dụng thực tế)
 */
function attachTenQuestions(baseLessons: Lesson[], extraMap: Record<number, QuizQuestion[]>): Lesson[] {
  return baseLessons.map(lesson => {
    const part1Questions: QuizQuestion[] = (lesson.questions || []).slice(0, 5).map((q, idx) => ({
      ...q,
      part: 1 as const,
      id: q.id || (lesson.id * 100 + (idx + 1))
    }));

    const part2Questions: QuizQuestion[] = (extraMap[lesson.id] || []).slice(0, 5).map((q, idx) => ({
      ...q,
      part: 2 as const,
      id: q.id || (lesson.id * 100 + 10 + (idx + 1))
    }));

    const tenQuestions = [...part1Questions, ...part2Questions];

    return {
      ...lesson,
      questions: tenQuestions
    };
  });
}

// Re-export full 10-question grade lesson lists for explicit access
export const SGK_LESSONS_GRADE_3: Lesson[] = attachTenQuestions(SGK_LESSONS_GRADE_3_BASE, SGK_EXTRA_GRADE_3);
export const SGK_LESSONS_GRADE_4: Lesson[] = attachTenQuestions(SGK_LESSONS_GRADE_4_BASE, SGK_EXTRA_GRADE_4);
export const SGK_LESSONS_GRADE_5: Lesson[] = attachTenQuestions(SGK_LESSONS_GRADE_5_BASE, SGK_EXTRA_GRADE_5);

/**
 * DANH SÁCH BÀI HỌC VÀ CÂU HỎI CHUẨN 100% THEO SÁCH GIÁO KHOA TIN HỌC (BỘ KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
 * Phân chia độc lập và chính xác cho từng khối lớp:
 * - LỚP 3: 16 BÀI HỌC (Bài 1 -> Bài 16) × 10 câu hỏi/bài = 160 câu hỏi (Phần 1: 5 câu, Phần 2: 5 câu)
 * - LỚP 4: 16 BÀI HỌC (Bài 1 -> Bài 16) × 10 câu hỏi/bài = 160 câu hỏi (Phần 1: 5 câu, Phần 2: 5 câu)
 * - LỚP 5: 16 BÀI HỌC (Bài 1 -> Bài 16) × 10 câu hỏi/bài = 160 câu hỏi (Phần 1: 5 câu, Phần 2: 5 câu)
 * Tổng cộng 480 câu hỏi trắc nghiệm chuyên sâu.
 *
 * TIÊU CHUẨN BIÊN SOẠN BẮT BUỘC:
 * 1. TUYỆT ĐỐI CÂN BẰNG ĐỘ DÀI: Cả 4 phương án A, B, C, D đều có số từ và cấu trúc câu tương đương nhau.
 *    Học sinh không thể dùng mẹo chọn câu dài nhất để đoán mò đáp án đúng.
 * 2. ĐỘ KHÓ VÀ TÌNH HUỐNG SÂU SẮC: Trắc nghiệm dựa trên tình huống thực hành, phím tắt, thao tác File Explorer, Word, PPT và thuật toán Scratch.
 * 3. ĐÚNG CHỦ ĐỀ VÀ TÊN BÀI THEO MỤC LỤC SGK KẾT NỐI TRI THỨC.
 * 4. ĐỦ 10 CÂU HỎI MỖI BÀI (5 câu Phần 1, 5 câu Phần 2).
 */

// Helper để lấy 16 bài học chính thức theo khối lớp với 10 câu hỏi mỗi bài (Phần 1 & Phần 2)
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
