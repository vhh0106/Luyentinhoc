import { SubjectId, SubjectInfo, Lesson, QuizQuestion, MazeConfig } from '../types';
import { QUESTION_BANK } from './questionBank';
import {
  QUESTIONS_GRADE_3,
  QUESTIONS_GRADE_4,
  QUESTIONS_GRADE_5,
  getQuestionsByGradeAndTopic,
  SGK_TOPICS_LIST
} from './sgkQuestionsByGrade';
import { getOfficialSgkLessonsForGrade } from './sgkLessonsByGrade';

export const SUBJECTS_MAP: Record<SubjectId, SubjectInfo> = {
  sgk: {
    id: 'sgk',
    emoji: '📚',
    name: 'SGK Kết Nối Tri Thức',
    meta: '16 bài · Chuẩn SGK',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-amber-800 bg-amber-50 border-amber-300',
    lightBg: 'bg-amber-50/70',
    objectives: [
      'Bám sát chuẩn 16 bài học chính thức trong từng cuốn SGK Tin học 3, 4, 5 (NXB Giáo Dục Việt Nam)',
      'Phân biệt rõ rệt 100% mục tiêu, chủ đề và tên bài học riêng biệt theo từng khối lớp',
      'Bộ câu hỏi cân bằng độ dài tuyệt đối chống mẹo đoán đáp án và nâng cao tư duy thực hành'
    ]
  },
  go: {
    id: 'go',
    emoji: '⌨️',
    name: 'Luyện gõ phím',
    meta: '8 cấp · 8 bài',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    lightBg: 'bg-blue-50/60',
    objectives: [
      'Hình thành thói quen gõ phím đúng tư thế, đúng 10 ngón',
      'Tăng dần tốc độ và độ chính xác qua từng hàng phím riêng biệt',
      'Nền tảng cho mọi hoạt động học tập và làm việc trên máy tính'
    ]
  },
  'go-tv': {
    id: 'go-tv',
    emoji: '🇻🇳',
    name: 'Gõ tiếng Việt',
    meta: '7 cấp · 7 bài',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-rose-700 bg-rose-50 border-rose-200',
    lightBg: 'bg-rose-50/60',
    objectives: [
      'Gõ tiếng Việt có dấu chính xác, trôi chảy theo kiểu Telex và VNI',
      'Giữ gìn sự trong sáng của tiếng Việt trên môi trường số',
      'Nền tảng để viết bài văn, bài thơ và trình bày văn bản khoa học'
    ]
  },
  chuot: {
    id: 'chuot',
    emoji: '🖱️',
    name: 'Luyện chuột',
    meta: '6 cấp · 6 bài',
    gradeLevel: 'Lớp 3',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    lightBg: 'bg-amber-50/60',
    objectives: [
      'Làm chủ thao tác chuột chính xác, linh hoạt qua 6 trò chơi tương tác khác nhau',
      'Rèn sự phối hợp tay – mắt và khả năng tập trung',
      'Thành thạo di chuyển, nhấp đơn, nhấp đúp và kéo thả chuột'
    ]
  },
  ic3: {
    id: 'ic3',
    emoji: '💻',
    name: 'Kĩ năng máy tính',
    meta: '8 cấp · 8 bài',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    lightBg: 'bg-indigo-50/60',
    objectives: [
      'Hiểu cách máy tính, thiết bị vào - ra, phần mềm và Internet vận hành',
      'Tổ chức, lưu trữ tệp và cây thư mục một cách khoa học',
      'Tự tin sử dụng công nghệ an toàn trong học tập và cuộc sống'
    ]
  },
  word: {
    id: 'word',
    emoji: '📝',
    name: 'Soạn thảo Word',
    meta: '6 cấp · 6 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
    lightBg: 'bg-sky-50/60',
    objectives: [
      'Trình bày văn bản rõ ràng, khoa học và có tính thẩm mỹ',
      'Biết định dạng phông chữ, căn lề, chèn ảnh và bảng biểu',
      'Kĩ năng văn phòng thiết yếu cho học tập và công việc sau này'
    ]
  },
  excel: {
    id: 'excel',
    emoji: '📊',
    name: 'Bảng tính Excel',
    meta: '6 cấp · 6 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    lightBg: 'bg-emerald-50/60',
    objectives: [
      'Tổ chức và quản lý dữ liệu hàng, cột, ô tính có hệ thống',
      'Dùng công thức =SUM, =AVERAGE, =MAX để tính toán tự động',
      'Bước đầu hình thành tư duy xử lý và trực quan hóa dữ liệu bằng biểu đồ'
    ]
  },
  powerpoint: {
    id: 'powerpoint',
    emoji: '📽️',
    name: 'Trình chiếu PowerPoint',
    meta: '6 cấp · 6 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-orange-700 bg-orange-50 border-orange-200',
    lightBg: 'bg-orange-50/60',
    objectives: [
      'Trình bày ý tưởng mạch lạc bằng chữ, hình ảnh và bố cục trang chiếu',
      'Phát triển óc sáng tạo với mẫu nền Theme và hiệu ứng chuyển trang',
      'Tự tin thuyết trình, chia sẻ kiến thức trước thầy cô và bạn bè'
    ]
  },
  'thuat-toan': {
    id: 'thuat-toan',
    emoji: '🤖',
    name: 'Tư duy thuật toán',
    meta: '8 cấp · 8 câu đố',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    lightBg: 'bg-purple-50/60',
    objectives: [
      'Phân tích vấn đề và chia nhỏ thành từng bước tuần tự trên 8 bản đồ mê cung',
      'Rèn luyện tư duy logic: tuần tự, rẽ nhánh Nếu-Thì, vòng lặp và gỡ lỗi',
      'Nền móng vững chắc cho lập trình và khoa học máy tính'
    ]
  },
  cdso: {
    id: 'cdso',
    emoji: '🛡️',
    name: 'Công dân số',
    meta: '6 cấp · 6 bài',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    lightBg: 'bg-teal-50/60',
    objectives: [
      'Biết tự bảo vệ bản thân, mật khẩu và thông tin cá nhân trên mạng',
      'Nhận diện rủi ro, tin giả và các chiêu trò lừa đảo trực tuyến',
      'Ứng xử văn minh, có trách nhiệm và tôn trọng quyền tác giả'
    ]
  },
  ai: {
    id: 'ai',
    emoji: '🧠',
    name: 'Dùng AI',
    meta: '4 cấp · 4 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-violet-700 bg-violet-50 border-violet-200',
    lightBg: 'bg-violet-50/60',
    objectives: [
      'Hiểu AI là gì, làm được gì và những giới hạn của AI',
      'Học cách ra lệnh (Prompt) thông minh và kiểm chứng thông tin',
      'Sử dụng AI có đạo đức, trung thực trong học tập và sẵn sàng cho tương lai'
    ]
  }
};

// Hàm xoay vòng phương án tất định để đáp án đúng phân bổ ngẫu nhiên A, B, C, D
export function rotateQuestionOptions(q: QuizQuestion, seed: number): QuizQuestion {
  const opts = [...q.options];
  const correctAnswerText = opts[q.correctIndex];
  const len = opts.length;

  const shift = (seed * 3 + 1) % len;
  const rotatedOptions = opts.map((_, i) => opts[(i - shift + len) % len]);
  const newCorrectIndex = rotatedOptions.indexOf(correctAnswerText);

  return {
    ...q,
    options: rotatedOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
  };
}

// Lấy bộ câu hỏi từ ngân hàng chung và xoay vị trí đáp án
function getUniqueQuestionsForLesson(
  bankKey: keyof typeof QUESTION_BANK,
  lessonIndex: number,
  countPerLesson: number
): QuizQuestion[] {
  const pool = QUESTION_BANK[bankKey] || [];
  const startIdx = (lessonIndex - 1) * countPerLesson;
  const slice = pool.slice(startIdx, startIdx + countPerLesson);

  return slice.map((q, idx) => rotateQuestionOptions(q, lessonIndex * 7 + idx));
}

// ============================================================================
// 0. BÀI HỌC CHÍNH THỨC SGK TIN HỌC KẾT NỐI TRI THỨC (16 BÀI THEO TỪNG LỚP 3, 4, 5)
// ============================================================================
const buildSGKThemeLessons = (grade: 3 | 4 | 5): Lesson[] => {
  return getOfficialSgkLessonsForGrade(grade);
};

// ============================================================================
// 1. LUYỆN GÕ PHÍM (8 CẤP)
// ============================================================================
const buildTypingLessons = (grade: 3 | 4 | 5 = 3): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Hàng phím cơ sở (A S D F - J K L ;)',
      desc: 'Đặt 8 ngón tay lên hàng phím xuất phát, định vị hai phím có gờ F và J.',
      target: 'f j d k s l a ; asdf jkl; fall flask salad glad half flash'
    },
    {
      level: 2,
      title: 'Bài 2: Hàng phím trên (Q W E R T - Y U I O P)',
      desc: 'Vươn các ngón tay từ hàng cơ sở lên hàng phím trên rồi thu về vị trí chuẩn.',
      target: 'r u e i w o q p t y tree wire pour rope quiet power write'
    },
    {
      level: 3,
      title: 'Bài 3: Hàng phím dưới (Z X C V B - N M , . /)',
      desc: 'Di chuyển linh hoạt các ngón tay xuống hàng phím dưới và phối hợp 3 hàng chữ.',
      target: 'v m c , x . z / b n van cab max box zone zero climb balance'
    },
    {
      level: 4,
      title: 'Bài 4: Hàng phím số (1 2 3 4 5 6 7 8 9 0)',
      desc: 'Làm chủ hàng phím số phía trên cùng để gõ ngày tháng và số liệu chính xác.',
      target: `1 2 3 4 5 6 7 8 9 0 2026 Lop ${grade}A ${grade}B ${grade}C 100 diem`
    },
    {
      level: 5,
      title: 'Bài 5: Phím Shift và chữ in hoa, ký tự đặc biệt',
      desc: 'Phối hợp hai tay nhấn giữ phím Shift để gõ chữ cái đầu câu, tên riêng và dấu chấm cảm.',
      target: `Tin Hoc Tieu Hoc Lop ${grade}! Ket Noi Tri Thuc Voi Cuoc Song @2026#`
    },
    {
      level: 6,
      title: 'Bài 6: Luyện gõ từ vựng tiếng Anh Tin học thông dụng',
      desc: 'Gõ nhanh các thuật ngữ máy tính quen thuộc bằng tiếng Anh chuẩn 10 ngón.',
      target: 'computer keyboard mouse screen folder file internet browser robot code'
    },
    {
      level: 7,
      title: 'Bài 7: Luyện gõ câu ngắn hoàn chỉnh chuẩn dấu câu',
      desc: 'Rèn kỹ năng gõ câu hoàn chỉnh có chữ hoa đầu câu và dấu chấm sát từ cuối.',
      target: `Em la hoc sinh lop ${grade}. May tinh la nguoi ban than thiet giup em hoc tap tot.`
    },
    {
      level: 8,
      title: 'Bài 8: Thử thách gõ đoạn văn tốc độ cao',
      desc: 'Tổng hợp kỹ năng 10 ngón gõ trôi chảy đoạn văn dài với tốc độ và độ chính xác cao.',
      target: `Phong thuc hanh Tin hoc cua truong em rat sach dep. Chung em ngoi dung tu the va luyen go muoi ngon moi ngay de hoc tap thanh thao.`
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'typing',
      target: item.target,
      questions: getUniqueQuestionsForLesson('typing', id, 4)
    };
  });
};

// ============================================================================
// 2. GÕ TIẾNG VIỆT (7 CẤP)
// ============================================================================
const buildVietnameseTypingLessons = (grade: 3 | 4 | 5 = 3): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Bỏ 5 dấu thanh cơ bản (Sắc: S, Huyền: F, Hỏi: R, Ngã: X, Nặng: J)',
      desc: 'Nắm vững quy tắc gõ 5 dấu thanh tiếng Việt theo kiểu Telex chuẩn.',
      target: 'ca sắc cá, ca huyền cà, ca hỏi cả, ca ngã cã, ca nặng cạ'
    },
    {
      level: 2,
      title: 'Bài 2: Gõ các chữ cái tiếng Việt đặc trưng (Â, Ă, Đ, Ê, Ô, Ơ, Ư)',
      desc: 'Gõ gấp đôi chữ cái (aa, ee, oo, dd) và thêm chữ w (aw, ow, uw).',
      target: 'aa ra â, ee ra ê, oo ra ô, dd ra đ, aw ra ă, ow ra ơ, uw ra ư'
    },
    {
      level: 3,
      title: 'Bài 3: Ghép từ đôi và từ ghép tiếng Việt có dấu',
      desc: 'Luyện gõ từ vựng tiếng Việt có dấu hoàn chỉnh và đặt đúng vị trí dấu thanh.',
      target: 'học tập chăm chỉ, bạn bè thân thiện, trường lớp khang trang, thầy cô kính yêu'
    },
    {
      level: 4,
      title: 'Bài 4: Gõ tên các tỉnh thành và danh lam thắng cảnh Việt Nam',
      desc: 'Kết hợp phím Shift viết hoa chữ cái đầu và gõ dấu tiếng Việt chính xác.',
      target: 'Hà Nội, Thành phố Hồ Chí Minh, Đà Nẵng, Vịnh Hạ Long, Cố đô Huế, Nha Trang'
    },
    {
      level: 5,
      title: 'Bài 5: Luyện gõ khổ thơ ngắn "Em yêu trường em"',
      desc: 'Rèn luyện kỹ năng ngắt dòng bằng phím Enter và giữ nhịp gõ thơ mượt mà.',
      target: 'Em yêu trường em, với bao bạn thân, và cô giáo hiền, như yêu quê hương.'
    },
    {
      level: 6,
      title: 'Bài 6: Gõ đoạn văn miêu tả quê hương đất nước',
      desc: 'Luyện gõ trôi chảy đoạn văn tiếng Việt có đầy đủ dấu chấm, dấu phẩy.',
      target: 'Việt Nam quê hương ta tươi đẹp biết bao. Cánh đồng lúa chín vàng rực rỡ và những dòng sông êm đềm chảy xuôi ra biển lớn.'
    },
    {
      level: 7,
      title: 'Bài 7: Thử thách gõ tiếng Việt tốc độ cao không lỗi chính tả',
      desc: 'Bài kiểm tra tổng hợp kỹ năng gõ tiếng Việt thành thạo, đạt chuẩn độ chính xác trên 90%.',
      target: 'Học sinh tiểu học chăm ngoan học giỏi, tích cực rèn luyện kỹ năng Tin học để vững bước vào kỷ nguyên số.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'typing',
      target: item.target,
      questions: getUniqueQuestionsForLesson('vietnameseTyping', id, 4)
    };
  });
};

// ============================================================================
// 3. LUYỆN CHUỘT (6 CẤP)
// ============================================================================
const buildMouseLessons = (grade: 3 | 4 | 5 = 3): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Di chuyển chuột bắt sao lấp lánh',
      desc: 'Luyện phối hợp tay và mắt điều khiển con trỏ chuột chạm vào các ngôi sao trên bầu trời.',
      type: 'move_star'
    },
    {
      level: 2,
      title: 'Bài 2: Nhấp chuột trái (Click) làm nổ bóng bay',
      desc: 'Luyện ngón trỏ nhấp nút chuột trái nhẹ nhàng, chính xác vào từng quả bóng màu sắc.',
      type: 'click_bubbles'
    },
    {
      level: 3,
      title: 'Bài 3: Phản xạ nhấp chuột nhanh siêu tốc',
      desc: 'Tăng tốc độ di chuyển và nhấp chuột trái vào các mục tiêu nhỏ xuất hiện nhanh.',
      type: 'click_bubbles_fast'
    },
    {
      level: 4,
      title: 'Bài 4: Nhấp đúp chuột (Double-click) mở rương kho báu',
      desc: 'Bấm nhanh 2 lần liên tiếp nút chuột trái để mở khóa 4 chiếc rương kho báu tri thức.',
      type: 'double_click'
    },
    {
      level: 5,
      title: 'Bài 5: Kéo thả chuột (Drag & Drop) lắp ráp bộ máy tính',
      desc: 'Nhấn giữ nút chuột trái để kéo Màn hình, Bàn phím, Chuột, Thân máy thả vào đúng ô.',
      type: 'drag_drop'
    },
    {
      level: 6,
      title: 'Bài 6: Kéo thả phân loại rác bảo vệ môi trường phòng máy',
      desc: 'Thực hành kéo thả các loại rác vào đúng 3 thùng Hữu cơ, Tái chế và Vô cơ.',
      type: 'drag_drop_recycle'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: item.type,
      questions: getUniqueQuestionsForLesson('mouse', id, 4)
    };
  });
};

// ============================================================================
// 4. KĨ NĂNG MÁY TÍNH (IC3) - PHÂN HÓA RÕ THEO KHỐI LỚP 3, 4, 5
// ============================================================================
const buildIC3Lessons = (grade: 3 | 4 | 5 = 3): Lesson[] => {
  if (grade === 3) {
    const items = [
      { level: 1, title: 'Bài 1: Thông tin và quyết định trong đời sống hàng ngày', desc: 'Nhận biết thông tin và cách não bộ đưa ra quyết định hành động tương ứng.' },
      { level: 2, title: 'Bài 2: Ba dạng thông tin thường gặp: Chữ, Hình ảnh, Âm thanh', desc: 'Phân loại các hiện tượng xung quanh em thành 3 dạng thông tin cơ bản.' },
      { level: 3, title: 'Bài 3: Các bộ phận cơ bản của máy tính để bàn và Laptop', desc: 'Tìm hiểu chức năng của Thân máy, Màn hình, Bàn phím, Chuột và vùng cảm ứng.' },
      { level: 4, title: 'Bài 4: Tư thế ngồi chuẩn và Quy tắc an toàn điện phòng máy', desc: 'Rèn tư thế mắt cách màn hình 50-80cm và không dùng khăn ướt lau máy tính.' },
      { level: 5, title: 'Bài 5: Bật và Tắt máy tính đúng cách (Start > Power > Shut down)', desc: 'Thực hiện quy trình tắt máy an toàn, tuyệt đối không rút dây điện đột ngột.' },
      { level: 6, title: 'Bài 6: Sắp xếp để dễ tìm và Phân loại đồ vật, dữ liệu', desc: 'Phân nhóm các đồ vật, tệp tin theo đặc điểm chung để tìm kiếm nhanh chóng.' },
      { level: 7, title: 'Bài 7: Sơ đồ hình cây và Cấu trúc ổ đĩa C:, D: trong máy tính', desc: 'Khám phá thư mục gốc, thư mục mẹ, thư mục con và quy tắc không trùng tên.' },
      { level: 8, title: 'Bài 8: Khám phá thế giới thông tin phong phú trên Internet', desc: 'Học tập bổ ích từ Internet và biết đóng trang web xấu báo cho người lớn.' }
    ];
    return items.map((item, idx) => {
      const qPool = [...QUESTIONS_GRADE_3.cd1_may_tinh_va_em, ...QUESTIONS_GRADE_3.cd3_luu_tru_tim_kiem];
      const start = (idx * 2) % Math.max(1, qPool.length - 3);
      const qSlice = qPool.slice(start, start + 3).map((q, qIdx) => rotateQuestionOptions(q, idx * 3 + qIdx));
      return { id: idx + 1, level: item.level, grade: 3, title: item.title, desc: item.desc, type: 'quiz', questions: qSlice };
    });
  }

  if (grade === 4) {
    const items = [
      { level: 1, title: 'Bài 1: Phân biệt Phần cứng (Hardware) và Phần mềm (Software)', desc: 'Nhận diện các thiết bị vật lý và các chương trình cài đặt trong máy tính.' },
      { level: 2, title: 'Bài 2: Mối quan hệ tương hỗ giữa Phần cứng và Phần mềm', desc: 'Hiểu cách phần mềm lưu trữ trên phần cứng và gửi lệnh điều khiển hoạt động.' },
      { level: 3, title: 'Bài 3: Gõ bàn phím đúng cách kết hợp phím Shift và hàng số', desc: 'Gõ chữ in hoa, ký tự trên và rèn tư thế cổ tay thả lỏng khi làm việc.' },
      { level: 4, title: 'Bài 4: Bốn dạng thông tin trên trang web và Siêu liên kết Hyperlink', desc: 'Nhận diện liên kết khi con trỏ chuột chuyển thành hình bàn tay trỏ ngón.' },
      { level: 5, title: 'Bài 5: Tìm kiếm thông tin trên Internet bằng máy tìm kiếm Google', desc: 'Các bước nhập địa chỉ máy tìm kiếm và lựa chọn kết quả hiển thị uy tín.' },
      { level: 6, title: 'Bài 6: Kỹ năng chọn từ khóa tìm kiếm ngắn gọn, chính xác', desc: 'Xác định đúng trọng tâm nội dung cần tìm để nhận kết quả hữu ích nhất.' },
      { level: 7, title: 'Bài 7: Thao tác tệp và thư mục: Sao chép (Copy) và Di chuyển (Cut)', desc: 'Phân biệt tệp còn ở nơi cũ (Copy) hay chỉ chuyển sang nơi mới (Move to).' },
      { level: 8, title: 'Bài 8: Tác hại khi xóa nhầm tệp hệ thống Windows và phòng tránh', desc: 'Tuyệt đối không can thiệp tệp hệ điều hành ở ổ C: gây treo máy tính.' }
    ];
    return items.map((item, idx) => {
      const qPool = [...QUESTIONS_GRADE_4.cd1_may_tinh_va_em, ...QUESTIONS_GRADE_4.cd3_luu_tru_tim_kiem];
      const start = (idx * 2) % Math.max(1, qPool.length - 3);
      const qSlice = qPool.slice(start, start + 3).map((q, qIdx) => rotateQuestionOptions(q, idx * 3 + qIdx));
      return { id: idx + 1, level: item.level, grade: 4, title: item.title, desc: item.desc, type: 'quiz', questions: qSlice };
    });
  }

  // Grade 5
  const items = [
    { level: 1, title: 'Bài 1: Em có thể làm gì với máy tính và Tạo ra sản phẩm số', desc: 'Sử dụng máy tính để sáng tạo bài trình chiếu, album ảnh số và bài báo tường.' },
    { level: 2, title: 'Bài 2: Hợp tác trực tuyến qua Google Meet, Zoom và Microsoft Teams', desc: 'Thảo luận nhóm, chia sẻ màn hình và hoàn thành bài tập chung hiệu quả.' },
    { level: 3, title: 'Bài 3: Cấu trúc website chuyên đề, trang chủ và thanh tìm kiếm kính lúp', desc: 'Khai thác kho tài liệu số trên các cổng thông tin thiếu nhi chính thống.' },
    { level: 4, title: 'Bài 4: Sử dụng thiết bị nhớ USB an toàn và lệnh ngắt kết nối Eject', desc: 'Cắm đúng chiều cổng USB và chọn Eject trước khi rút để tránh mất dữ liệu.' },
    { level: 5, title: 'Bài 5: Tìm kiếm và chọn lọc thông tin trong giải quyết vấn đề', desc: 'Thu thập thông tin thời tiết, địa điểm trước khi đưa ra quyết định thực tế.' },
    { level: 6, title: 'Bài 6: Cây thư mục nhiều cấp và Công cụ tìm kiếm Search trong File Explorer', desc: 'Tìm nhanh tệp tin bằng tên hoặc từ khoá khi không nhớ rõ vị trí thư mục.' },
    { level: 7, title: 'Bài 7: Tôn trọng quyền riêng tư: Nhật ký, thư điện tử và tin nhắn', desc: 'Không đọc trộm thông tin riêng tư và rèn luyện đạo đức ứng xử môi trường số.' },
    { level: 8, title: 'Bài 8: Bản quyền nội dung thông tin và Quy tắc trích dẫn nguồn tác giả', desc: 'Tôn trọng quyền sở hữu trí tuệ của bài viết, bức ảnh, bài thơ và video.' }
  ];
  return items.map((item, idx) => {
    const qPool = [...QUESTIONS_GRADE_5.cd1_may_tinh_va_em, ...QUESTIONS_GRADE_5.cd2_mang_internet, ...QUESTIONS_GRADE_5.cd3_luu_tru_tim_kiem];
    const start = (idx * 2) % Math.max(1, qPool.length - 3);
    const qSlice = qPool.slice(start, start + 3).map((q, qIdx) => rotateQuestionOptions(q, idx * 3 + qIdx));
    return { id: idx + 1, level: item.level, grade: 5, title: item.title, desc: item.desc, type: 'quiz', questions: qSlice };
  });
};

// ============================================================================
// 5. SOẠN THẢO WORD (6 CẤP) - PHÂN HÓA LỚP 3, 4, 5
// ============================================================================
const buildWordLessons = (grade: 3 | 4 | 5 = 4): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Soạn thảo văn bản & Định dạng phông chữ, cỡ chữ',
      desc: 'Nhận biết con trỏ soạn thảo nhấp nháy, chọn phông chữ và kích cỡ chữ rõ ràng.'
    },
    {
      level: 2,
      title: 'Bài 2: Kiểu chữ Đậm (B), Nghiêng (I), Gạch chân (U) & Căn lề',
      desc: 'Làm nổi bật tiêu đề bài học và các ghi chú quan trọng bằng tổ hợp định dạng.'
    },
    {
      level: 3,
      title: 'Bài 3: Phân biệt phím Delete (xoá bên phải) và Backspace (xoá bên trái)',
      desc: 'Thao tác xoá kí tự và khối văn bản chính xác tại vị trí con trỏ nhấp nháy.'
    },
    {
      level: 4,
      title: 'Bài 4: Sao chép (Copy) và Di chuyển (Cut) đoạn văn bản',
      desc: 'Tiết kiệm thời gian soạn thảo bằng thao tác sao chép các khổ thơ lặp lại.'
    },
    {
      level: 5,
      title: 'Bài 5: Chèn hình ảnh và Bố trí văn bản bao quanh ảnh (Square)',
      desc: 'Đưa hình ảnh minh hoạ vào bài viết và chọn chế độ Square để chữ bao quanh ảnh.'
    },
    {
      level: 6,
      title: 'Bài 6: Hoàn thiện bài báo tường số & Lưu tệp tài liệu an toàn',
      desc: 'Tổng hợp kỹ năng định dạng, tạo danh sách gạch đầu dòng Bullets và lưu tệp.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    // If grade 4 or 5, inject SGK Word questions
    let gradeQuestions: QuizQuestion[] = [];
    if (grade === 4 && QUESTIONS_GRADE_4.cd5_ung_dung_tin_hoc) {
      gradeQuestions = QUESTIONS_GRADE_4.cd5_ung_dung_tin_hoc.slice(0, 3);
    } else if (grade === 5 && QUESTIONS_GRADE_5.cd5_ung_dung_tin_hoc) {
      gradeQuestions = QUESTIONS_GRADE_5.cd5_ung_dung_tin_hoc.slice(0, 3);
    } else {
      gradeQuestions = getUniqueQuestionsForLesson('word', id, 3);
    }

    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'word',
      questions: gradeQuestions.map((q, qIdx) => rotateQuestionOptions(q, id * 4 + qIdx))
    };
  });
};

// ============================================================================
// 6. BẢNG TÍNH EXCEL (6 CẤP)
// ============================================================================
const buildExcelLessons = (grade: 3 | 4 | 5 = 4): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Bảng điểm thi đua Tổ 1 & Tính tổng bằng hàm SUM',
      desc: 'Nhập bổ sung điểm số còn thiếu vào ô tính và lập công thức =SUM(B2:D2) tính tổng điểm.'
    },
    {
      level: 2,
      title: 'Bài 2: Tính điểm trung bình học tập bằng hàm AVERAGE',
      desc: 'Hoàn thiện bảng điểm 3 môn và sử dụng hàm =AVERAGE(B2:D2) tính điểm trung bình tự động.'
    },
    {
      level: 3,
      title: 'Bài 3: Tìm điểm số cao nhất trong tổ bằng hàm MAX',
      desc: 'Nhập dữ liệu số liệu và dùng hàm =MAX(B2:D2) để tìm điểm cao nhất của từng học sinh.'
    },
    {
      level: 4,
      title: 'Bài 4: Thống kê "Phong trào Kế hoạch nhỏ" quyên góp giấy vụn',
      desc: 'Lập bảng theo dõi số ki-lô-gam giấy vụn 3 đợt và dùng hàm =SUM tính tổng quyên góp.'
    },
    {
      level: 5,
      title: 'Bài 5: Bảng theo dõi "Số sách đọc tại Thư viện" trung bình mỗi tháng',
      desc: 'Nhập số đầu sách đọc trong 3 tháng và tính trung bình cộng bằng hàm =AVERAGE.'
    },
    {
      level: 6,
      title: 'Bài 6: Tổng kết "Hội khỏe Phù Đổng" & Vẽ biểu đồ cột so sánh',
      desc: 'Xác định thành tích cao nhất với hàm =MAX, vẽ biểu đồ cột trực quan và lưu sổ tính.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'excel',
      questions: getUniqueQuestionsForLesson('excel', id, 4)
    };
  });
};

// ============================================================================
// 7. TRÌNH CHIẾU POWERPOINT (6 CẤP) - PHÂN HÓA LỚP 3, 4, 5
// ============================================================================
const buildPowerPointLessons = (grade: 3 | 4 | 5 = 4): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Làm quen phần mềm trình chiếu PowerPoint (Biểu tượng chữ P cam)',
      desc: 'Khởi động phần mềm, thêm trang chiếu mới New Slide và nhập tiêu đề thuyết trình.'
    },
    {
      level: 2,
      title: 'Bài 2: Chèn hình ảnh minh hoạ (Insert > Picture) & Thay đổi kích thước',
      desc: 'Đưa hình ảnh từ máy tính vào trang chiếu và kéo thả các góc tròn để co giãn ảnh.'
    },
    {
      level: 3,
      title: 'Bài 3: Định dạng phông chữ, cỡ chữ và màu chữ trên trang chiếu',
      desc: 'Chọn phông chữ dễ đọc, cỡ chữ từ 28-36pt và màu sắc hài hòa với nền bài thuyết trình.'
    },
    {
      level: 4,
      title: 'Bài 4: Hiệu ứng chuyển tiếp trang chiếu sinh động (Dải lệnh Transitions)',
      desc: 'Áp dụng các hiệu ứng chuyển trang như Fade, Push, Wipe và Flip cho từng slide.'
    },
    {
      level: 5,
      title: 'Bài 5: Trình chiếu toàn màn hình bằng phím F5 và Phím Esc để thoát',
      desc: 'Luyện tập chuyển trang bằng các phím mũi tên và thuyết trình tự tin trước lớp.'
    },
    {
      level: 6,
      title: 'Bài 6: Thiết kế bài trình chiếu đa phương tiện hoàn chỉnh & Lưu tệp',
      desc: 'Tổng hợp kỹ năng tạo sản phẩm số trình chiếu giới thiệu danh lam thắng cảnh quê hương.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    let questions = getUniqueQuestionsForLesson('powerpoint', id, 3);
    if (grade === 3 && QUESTIONS_GRADE_3.cd5_ung_dung_tin_hoc) {
      questions = QUESTIONS_GRADE_3.cd5_ung_dung_tin_hoc.slice(0, 3);
    } else if (grade === 4 && QUESTIONS_GRADE_4.cd5_ung_dung_tin_hoc) {
      questions = QUESTIONS_GRADE_4.cd5_ung_dung_tin_hoc.slice(2, 5);
    }
    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'powerpoint',
      questions: questions.map((q, qIdx) => rotateQuestionOptions(q, id * 3 + qIdx))
    };
  });
};

// ============================================================================
// 8. TƯ DUY THUẬT TOÁN & LẬP TRÌNH SCRATCH - PHÂN HÓA LỚP 3, 4, 5
// ============================================================================
const buildAlgorithmLessons = (grade: 3 | 4 | 5 = 3): Lesson[] => {
  const mazes: { level: number; title: string; desc: string; maze: MazeConfig }[] = [
    {
      level: 1,
      title: 'Bài 1: Cấu trúc tuần tự đưa Robot về đích',
      desc: 'Xếp chuỗi lệnh "Đi thẳng" tuần tự đưa Robot đi dọc hành lang về thẳng cờ chiến thắng.',
      maze: {
        gridSize: 5,
        start: [0, 2],
        goal: [4, 2],
        walls: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]],
        initialDirection: 'down',
        maxCommands: 5
      }
    },
    {
      level: 2,
      title: 'Bài 2: Khúc cua góc vuông và Rẽ phải 90°',
      desc: 'Kết hợp lệnh "Đi thẳng" và "Quay phải 90°" tại góc cua để đưa Robot về đích.',
      maze: {
        gridSize: 5,
        start: [0, 0],
        goal: [3, 3],
        walls: [[1, 0], [1, 1], [1, 2], [2, 2], [3, 1]],
        initialDirection: 'right',
        maxCommands: 7
      }
    },
    {
      level: 3,
      title: 'Bài 3: Vượt chướng ngại vật đá ngầm',
      desc: 'Quan sát tảng đá chắn đường và lập trình cho Robot rẽ vòng qua khe trống an toàn.',
      maze: {
        gridSize: 5,
        start: [0, 0],
        goal: [4, 4],
        walls: [[0, 2], [1, 2], [3, 2], [4, 2], [2, 0]],
        initialDirection: 'down',
        maxCommands: 10
      }
    },
    {
      level: 4,
      title: 'Bài 4: Quy luật lặp lại trong mê cung bậc thang',
      desc: 'Nhận diện quy luật đi ngang rồi rẽ xuống lặp lại trên bản đồ lưới 5x5.',
      maze: {
        gridSize: 5,
        start: [0, 1],
        goal: [4, 4],
        walls: [[0, 3], [1, 0], [2, 1], [2, 3], [3, 1], [4, 2]],
        initialDirection: 'right',
        maxCommands: 9
      }
    },
    {
      level: 5,
      title: 'Bài 5: Cấu trúc rẽ nhánh lựa chọn lối đi',
      desc: 'Phân tích hai ngã rẽ trong mê cung để chọn nhánh không bị tường đá chặn lối.',
      maze: {
        gridSize: 5,
        start: [4, 0],
        goal: [0, 4],
        walls: [[3, 0], [3, 1], [1, 2], [2, 2], [3, 3]],
        initialDirection: 'right',
        maxCommands: 10
      }
    },
    {
      level: 6,
      title: 'Bài 6: Mê cung chữ Z kích thước 6x6',
      desc: 'Chia đường đi lớn trên sân 6x6 thành 3 chặng nhỏ để vượt qua dãy tường đá.',
      maze: {
        gridSize: 6,
        start: [0, 0],
        goal: [5, 5],
        walls: [[1, 0], [1, 1], [1, 2], [3, 3], [3, 4], [3, 5]],
        initialDirection: 'right',
        maxCommands: 12
      }
    },
    {
      level: 7,
      title: 'Bài 7: Tối ưu hóa lộ trình ngắn nhất',
      desc: 'Tìm con đường ngắn nhất tốn ít khối lệnh nhất để đưa Robot tới cờ đích.',
      maze: {
        gridSize: 6,
        start: [1, 1],
        goal: [5, 4],
        walls: [[2, 1], [2, 2], [2, 3], [4, 2], [4, 3], [4, 5]],
        initialDirection: 'right',
        maxCommands: 9
      }
    },
    {
      level: 8,
      title: 'Bài 8: Chinh phục Đảo Ngọc Robot toàn năng',
      desc: 'Thử thách tổng hợp điều hướng Robot vượt qua mê cung đá phức tạp về đích.',
      maze: {
        gridSize: 6,
        start: [5, 0],
        goal: [0, 5],
        walls: [[4, 1], [3, 1], [2, 1], [3, 3], [2, 3], [1, 3], [1, 4]],
        initialDirection: 'up',
        maxCommands: 12
      }
    }
  ];

  return mazes.map((item, idx) => {
    const id = idx + 1;
    let questions: QuizQuestion[] = [];
    if (grade === 3 && QUESTIONS_GRADE_3.cd6_giai_quyet_van_de) {
      questions = QUESTIONS_GRADE_3.cd6_giai_quyet_van_de;
    } else if (grade === 4 && QUESTIONS_GRADE_4.cd6_giai_quyet_van_de) {
      questions = QUESTIONS_GRADE_4.cd6_giai_quyet_van_de;
    } else if (grade === 5 && QUESTIONS_GRADE_5.cd6_giai_quyet_van_de) {
      const start = (idx * 2) % Math.max(1, QUESTIONS_GRADE_5.cd6_giai_quyet_van_de.length - 2);
      questions = QUESTIONS_GRADE_5.cd6_giai_quyet_van_de.slice(start, start + 3);
    } else {
      questions = getUniqueQuestionsForLesson('algorithm', id, 3);
    }

    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'algorithm',
      maze: item.maze,
      questions: questions.map((q, qIdx) => rotateQuestionOptions(q, id * 4 + qIdx))
    };
  });
};

// ============================================================================
// 9. CÔNG DÂN SỐ - PHÂN HÓA LỚP 3, 4, 5
// ============================================================================
const buildDigitalCitizenshipLessons = (grade: 3 | 4 | 5 = 3): Lesson[] => {
  if (grade === 3) {
    const items = [
      { level: 1, title: 'Bài 1: Bảo vệ thông tin cá nhân của em và gia đình', desc: 'Họ tên, địa chỉ nhà, số điện thoại, mật khẩu là dữ liệu bí mật cần giữ an toàn.' },
      { level: 2, title: 'Bài 2: Nhận biết nguy cơ khi người lạ hỏi xin thông tin trên mạng', desc: 'Không tuỳ tiện cung cấp thông tin và báo ngay cho cha mẹ khi bị hỏi xin.' },
      { level: 3, title: 'Bài 3: Đặt mật khẩu bí mật cho tài khoản máy tính của em', desc: 'Quy tắc đặt mật khẩu bảo vệ thiết bị, không chia sẻ mật khẩu cho bạn bè.' },
      { level: 4, title: 'Bài 4: Nhận biết thông tin không phù hợp lứa tuổi trên Internet', desc: 'Tránh xa các trang web bạo lực, dọa dẫm khiến em cảm thấy sợ hãi lo lắng.' },
      { level: 5, title: 'Bài 5: Nhờ người lớn hỗ trợ khi gặp tình huống nguy hiểm trên mạng', desc: 'Chia sẻ cởi mở với thầy cô giáo và phụ huynh về những trang web em truy cập.' },
      { level: 6, title: 'Bài 6: Xây dựng thói quen sử dụng máy tính văn minh, điều độ', desc: 'Nghỉ giải lao sau 30 phút dùng máy tính để giữ gìn mắt và sức khoẻ.' }
    ];
    return items.map((item, idx) => {
      const qPool = [...QUESTIONS_GRADE_3.cd2_mang_internet, ...QUESTIONS_GRADE_3.cd4_dao_duc_phap_luat];
      const start = (idx * 2) % Math.max(1, qPool.length - 2);
      const qSlice = qPool.slice(start, start + 3).map((q, qIdx) => rotateQuestionOptions(q, idx * 3 + qIdx));
      return { id: idx + 1, level: item.level, grade: 3, title: item.title, desc: item.desc, type: 'quiz', questions: qSlice };
    });
  }

  if (grade === 4) {
    const items = [
      { level: 1, title: 'Bài 1: Nhận diện 4 dạng thông tin và Siêu liên kết trên trang web', desc: 'Văn bản, hình ảnh, âm thanh, video và dấu hiệu bàn tay trỏ ngón siêu liên kết.' },
      { level: 2, title: 'Bài 2: Tác hại của việc cố tình truy cập trang web không lành mạnh', desc: 'Nguy cơ bị kẻ xấu lừa đảo, đe doạ bắt nạt và tiếp thu suy nghĩ lệch lạc.' },
      { level: 3, title: 'Bài 3: Sử dụng phần mềm khi được phép và Khái niệm Bản quyền', desc: 'Hiểu giá trị bản quyền và quyền sở hữu trí tuệ của tác giả phần mềm.' },
      { level: 4, title: 'Bài 4: Phân biệt Phần mềm miễn phí và Phần mềm có bản quyền trả phí', desc: 'Unikey, Scratch là miễn phí; Microsoft Office, Photoshop cần mua bản quyền.' },
      { level: 5, title: 'Bài 5: Tác hại của virus máy tính khi dùng phần mềm bẻ khoá (Crack)', desc: 'Phần mềm lậu dễ bị gắn mã độc đánh cắp mật khẩu và làm lỗi hệ điều hành.' },
      { level: 6, title: 'Bài 6: Tôn trọng quyền tác giả và Nói không với phần mềm lậu', desc: 'Rèn ý thức tuân thủ pháp luật và sử dụng công nghệ an toàn, có trách nhiệm.' }
    ];
    return items.map((item, idx) => {
      const qPool = [...QUESTIONS_GRADE_4.cd2_mang_internet, ...QUESTIONS_GRADE_4.cd4_dao_duc_phap_luat];
      const start = (idx * 2) % Math.max(1, qPool.length - 2);
      const qSlice = qPool.slice(start, start + 3).map((q, qIdx) => rotateQuestionOptions(q, idx * 3 + qIdx));
      return { id: idx + 1, level: item.level, grade: 4, title: item.title, desc: item.desc, type: 'quiz', questions: qSlice };
    });
  }

  // Grade 5
  const items = [
    { level: 1, title: 'Bài 1: Khái niệm Bản quyền nội dung thông tin (Copyright)', desc: 'Tác giả có quyền cho phép hoặc không cho phép người khác sử dụng tác phẩm.' },
    { level: 2, title: 'Bài 2: Quy tắc ghi rõ nguồn gốc tác giả khi sử dụng bài viết, tranh ảnh', desc: 'Ghi rõ tên tác giả, nguồn sưu tầm hoặc diễn đạt "phỏng theo câu chuyện".' },
    { level: 3, title: 'Bài 3: Tôn trọng tính riêng tư của người khác trong không gian số', desc: 'Không đọc trộm nhật ký, thư từ, tin nhắn riêng tư của bạn bè và người thân.' },
    { level: 4, title: 'Bài 4: Đạo đức khi tạo ra và chia sẻ sản phẩm số trên mạng', desc: 'Không sao chép bài làm của bạn, không phát tán thông tin sai sự thật.' },
    { level: 5, title: 'Bài 5: Hợp tác trực tuyến văn minh, nhân ái và bảo mật tài khoản', desc: 'Ứng xử lịch sự trên các nhóm thảo luận Google Meet, Zoom và mạng xã hội.' },
    { level: 6, title: 'Bài 6: Bảo vệ dữ liệu cá nhân khi chia sẻ qua thiết bị nhớ USB', desc: 'Sử dụng lệnh Eject ngắt an toàn để tránh hỏng dữ liệu và nhiễm virus.' }
  ];
  return items.map((item, idx) => {
    const qPool = [...QUESTIONS_GRADE_5.cd4_dao_duc_phap_luat];
    const start = (idx * 2) % Math.max(1, qPool.length - 2);
    const qSlice = qPool.slice(start, start + 3).map((q, qIdx) => rotateQuestionOptions(q, idx * 3 + qIdx));
    return { id: idx + 1, level: item.level, grade: 5, title: item.title, desc: item.desc, type: 'quiz', questions: qSlice };
  });
};

// ============================================================================
// 10. DÙNG AI (4 CẤP)
// ============================================================================
const buildAILessons = (grade: 3 | 4 | 5 = 4): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Khám phá Trí tuệ nhân tạo (AI) quanh em trong đời sống',
      desc: 'Tìm hiểu khái niệm AI và các ứng dụng quen thuộc như nhận diện khuôn mặt, dịch thuật, trợ lý ảo.'
    },
    {
      level: 2,
      title: 'Bài 2: Cách AI học tập từ dữ liệu và Những giới hạn của AI',
      desc: 'Hiểu vai trò của dữ liệu huấn luyện, hiện tượng ảo giác AI và phẩm chất riêng có của con người.'
    },
    {
      level: 3,
      title: 'Bài 3: Kỹ năng viết câu lệnh Prompt rõ ràng, thông minh và an toàn',
      desc: 'Cách đặt câu hỏi có bối cảnh, đối tượng cụ thể cho AI và nguyên tắc bảo mật thông tin cá nhân.'
    },
    {
      level: 4,
      title: 'Bài 4: Đạo đức, sự trung thực và nguyên tắc kiểm chứng khi dùng AI',
      desc: 'Sử dụng AI làm người bạn gợi ý học tập, kiểm chứng với SGK và không để AI làm thay bài tập.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      grade,
      title: item.title,
      desc: item.desc,
      type: 'quiz',
      questions: getUniqueQuestionsForLesson('ai', id, 5)
    };
  });
};

// ============================================================================
// HÀM LẤY DANH SÁCH BÀI HỌC VÀ CÂU HỎI THEO ĐÚNG KHỐI LỚP (LỚP 3, 4, 5)
// ============================================================================
export function getLessonsForGrade(subjectId: SubjectId, grade: 3 | 4 | 5): Lesson[] {
  switch (subjectId) {
    case 'sgk':
      return buildSGKThemeLessons(grade);
    case 'go':
      return buildTypingLessons(grade);
    case 'go-tv':
      return buildVietnameseTypingLessons(grade);
    case 'chuot':
      return buildMouseLessons(grade);
    case 'ic3':
      return buildIC3Lessons(grade);
    case 'word':
      return buildWordLessons(grade);
    case 'excel':
      return buildExcelLessons(grade);
    case 'powerpoint':
      return buildPowerPointLessons(grade);
    case 'thuat-toan':
      return buildAlgorithmLessons(grade);
    case 'cdso':
      return buildDigitalCitizenshipLessons(grade);
    case 'ai':
      return buildAILessons(grade);
    default:
      return [];
  }
}

// Bảng bài học mặc định cho khả năng tương thích ngược
export const SUBJECT_LESSONS: Record<SubjectId, Lesson[]> = {
  sgk: buildSGKThemeLessons(3),
  go: buildTypingLessons(3),
  'go-tv': buildVietnameseTypingLessons(3),
  chuot: buildMouseLessons(3),
  ic3: buildIC3Lessons(3),
  word: buildWordLessons(4),
  excel: buildExcelLessons(4),
  powerpoint: buildPowerPointLessons(4),
  'thuat-toan': buildAlgorithmLessons(3),
  cdso: buildDigitalCitizenshipLessons(3),
  ai: buildAILessons(4)
};
