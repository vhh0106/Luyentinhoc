import { SubjectId, SubjectInfo, Lesson, QuizQuestion, MazeConfig } from '../types';
import { QUESTION_BANK } from './questionBank';

export const SUBJECTS_MAP: Record<SubjectId, SubjectInfo> = {
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

// Lấy bộ câu hỏi ĐỘC LẬP, KHÔNG TRÙNG LẶP cho từng bài học (cắt theo lát cắt riêng biệt)
// Đồng thời đảo vị trí đáp án A/B/C/D một cách tất định để đáp án đúng phân bổ đều
function getUniqueQuestionsForLesson(
  bankKey: keyof typeof QUESTION_BANK,
  lessonIndex: number, // 1-based index (1, 2, 3...)
  countPerLesson: number
): QuizQuestion[] {
  const pool = QUESTION_BANK[bankKey] || [];
  const startIdx = (lessonIndex - 1) * countPerLesson;
  const slice = pool.slice(startIdx, startIdx + countPerLesson);

  return slice.map((q, idx) => {
    const opts = [...q.options];
    const correctAnswerText = opts[q.correctIndex];
    const len = opts.length;

    // Xoay vòng vị trí các phương án dựa trên chỉ số bài và câu hỏi để đáp án đúng rơi đều vào A, B, C, D
    const shift = (lessonIndex * 3 + idx) % len;
    const rotatedOptions = opts.map((_, i) => opts[(i - shift + len) % len]);
    const newCorrectIndex = rotatedOptions.indexOf(correctAnswerText);

    return {
      id: idx + 1,
      question: q.question,
      options: rotatedOptions,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
      explanation: q.explanation
    };
  });
}

// 1. LUYỆN GÕ PHÍM: 8 CẤP · 8 BÀI ĐỘC LẬP (Mỗi bài 1 hàng phím/kỹ năng riêng + 4 câu hỏi riêng)
const buildTypingLessons = (): Lesson[] => {
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
      target: '1 2 3 4 5 6 7 8 9 0 2025 2026 Lop 3A 4B 5C 100 diem tot'
    },
    {
      level: 5,
      title: 'Bài 5: Phím Shift và chữ in hoa, ký tự đặc biệt',
      desc: 'Phối hợp hai tay nhấn giữ phím Shift để gõ chữ cái đầu câu, tên riêng và dấu chấm cảm.',
      target: 'Tin Hoc Tieu Hoc! Ket Noi Tri Thuc Voi Cuoc Song @2026#'
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
      target: 'Em yeu mai truong tieu hoc. May tinh la nguoi ban than thiet cua em.'
    },
    {
      level: 8,
      title: 'Bài 8: Thử thách gõ đoạn văn tốc độ cao',
      desc: 'Tổng hợp kỹ năng 10 ngón gõ trôi chảy đoạn văn dài với tốc độ và độ chính xác cao.',
      target: 'Phong thuc hanh Tin hoc cua truong em rat sach dep. Chung em ngoi dung tu the va luyen go muoi ngon moi ngay.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'typing',
      target: item.target,
      questions: getUniqueQuestionsForLesson('typing', id, 4)
    };
  });
};

// 2. GÕ TIẾNG VIỆT: 7 CẤP · 7 BÀI ĐỘC LẬP (Mỗi bài 1 quy tắc Telex riêng + 4 câu hỏi riêng)
const buildVietnameseTypingLessons = (): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Bỏ 5 dấu thanh cơ bản (Sắc: S, Huyền: F, Hỏi: R, Ngã: X, Nặng: J)',
      desc: 'Luyện gõ chữ cái trước, bỏ dấu thanh ở cuối từ với 5 phím S, F, R, X, J.',
      target: 'má cá lá bà gà nhà cả quả cỏ sữa ngõ vẽ mẹ bạn học tập'
    },
    {
      level: 2,
      title: 'Bài 2: Gõ chữ cái có mũ Â, Ê, Ô (aa, ee, oo)',
      desc: 'Luyện gõ lặp đôi chữ cái aa -> â, ee -> ê, oo -> ô kết hợp dấu thanh.',
      target: 'sân trường mây trắng cây cầu con bê ngày tết cô giáo dòng sông ô tô'
    },
    {
      level: 3,
      title: 'Bài 3: Gõ chữ cái có móc Ă, Ơ, Ư (aw, ow, uw)',
      desc: 'Sử dụng phím W để tạo dấu trăng và dấu móc: aw -> ă, ow -> ơ, uw -> ư.',
      target: 'vầng trăng rằm khăn quàng lá cờ mơ ước bức tranh thư viện chăm ngoan'
    },
    {
      level: 4,
      title: 'Bài 4: Gõ chữ Đ (dd) và các từ ghép tiếng Việt hoàn chỉnh',
      desc: 'Gõ hai lần phím d (dd) để tạo chữ đ và ghép vần tiếng Việt chuẩn xác.',
      target: 'đường đi đồng đội đất nước Việt Nam tươi đẹp bảng đen phấn trắng'
    },
    {
      level: 5,
      title: 'Bài 5: Luyện gõ câu ca dao, tục ngữ Việt Nam',
      desc: 'Rèn nhịp độ gõ tiếng Việt có dấu qua những câu ca dao, tục ngữ giàu ý nghĩa.',
      target: 'Công cha như núi Thái Sơn. Nghĩa mẹ như nước trong nguồn chảy ra.'
    },
    {
      level: 6,
      title: 'Bài 6: Gõ đoạn văn SGK Tin học Kết Nối Tri Thức',
      desc: 'Trình bày đoạn văn bản chuẩn chính tả và quy tắc dấu câu tiếng Việt.',
      target: 'Máy tính giúp chúng em kết nối tri thức với cuộc sống sinh động và bổ ích.'
    },
    {
      level: 7,
      title: 'Bài 7: Thử thách gõ đoạn thơ thiếu nhi Việt Nam',
      desc: 'Hoàn thiện kỹ năng gõ tiếng Việt tốc độ cao qua những vần thơ thiếu nhi tươi sáng.',
      target: 'Trường em ngói mới đỏ tươi, rợp bóng cây xanh đón chào ngày mới vui tươi.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'typing',
      target: item.target,
      questions: getUniqueQuestionsForLesson('vietnameseTyping', id, 4)
    };
  });
};

// 3. LUYỆN CHUỘT: 6 CẤP · 6 BÀI (Mỗi bài 1 chế độ trò chơi tương tác chuột hoàn toàn khác nhau + 4 câu hỏi riêng)
const buildMouseLessons = (): Lesson[] => {
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
      title: item.title,
      desc: item.desc,
      type: item.type,
      questions: getUniqueQuestionsForLesson('mouse', id, 4)
    };
  });
};

// 4. KĨ NĂNG MÁY TÍNH (IC3): 8 CẤP · 8 BÀI ĐỘC LẬP (Mỗi bài 5 câu hỏi riêng biệt hoàn toàn)
const buildIC3Lessons = (): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Các bộ phận cơ bản của máy tính để bàn và Laptop',
      desc: 'Nhận biết Thân máy, Màn hình, Bàn phím, Chuột và đặc điểm của Laptop, Máy tính bảng.'
    },
    {
      level: 2,
      title: 'Bài 2: Thiết bị vào (Input) và Thiết bị ra (Output)',
      desc: 'Phân biệt rõ nhóm thiết bị tiếp nhận thông tin vào và thiết bị xuất thông tin ra.'
    },
    {
      level: 3,
      title: 'Bài 3: Tư thế ngồi học đúng và Quy tắc an toàn điện phòng máy',
      desc: 'Rèn tư thế ngồi bảo vệ mắt, cột sống và kỹ năng phòng tránh tai nạn điện.'
    },
    {
      level: 4,
      title: 'Bài 4: Bật, tắt máy tính đúng quy trình và Màn hình nền Desktop',
      desc: 'Thao tác tắt máy bằng lệnh Shut down an toàn và làm quen cửa sổ Windows.'
    },
    {
      level: 5,
      title: 'Bài 5: Tệp tin (File) và Tổ chức cây thư mục (Folder) khoa học',
      desc: 'Cách tạo thư mục mới, đặt tên tệp/thư mục rõ ràng và phân cấp thư mục mẹ - con.'
    },
    {
      level: 6,
      title: 'Bài 6: Sao chép (Copy), Di chuyển (Cut), Đổi tên và Khôi phục tệp',
      desc: 'Thực hiện các thao tác quản lý tệp, phím tắt F2, Ctrl+C, Ctrl+V và Thùng rác Recycle Bin.'
    },
    {
      level: 7,
      title: 'Bài 7: Thiết bị lưu trữ dữ liệu: Ổ đĩa cứng, USB và Thẻ nhớ',
      desc: 'Tìm hiểu các ổ đĩa C:, D:, đơn vị đo dung lượng KB, MB, GB và cách dùng USB an toàn.'
    },
    {
      level: 8,
      title: 'Bài 8: Mạng Internet, Trình duyệt Web và Tìm kiếm bằng từ khóa',
      desc: 'Sử dụng trình duyệt Chrome/Edge, tìm kiếm thông tin học tập với từ khóa và đánh dấu trang.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'quiz',
      questions: getUniqueQuestionsForLesson('ic3', id, 5)
    };
  });
};

// 5. SOẠN THẢO WORD: 6 CẤP · 6 BÀI ĐỘC LẬP (Mỗi bài 1 đề bài văn bản riêng + 4 câu hỏi riêng)
const buildWordLessons = (): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Soạn thảo đoạn văn "Em yêu trường em" & Chèn ảnh trường học',
      desc: 'Gõ tiêu đề, nội dung đoạn văn, định dạng phông Times New Roman 18pt và chèn ảnh minh họa.'
    },
    {
      level: 2,
      title: 'Bài 2: Trình bày "Nội quy phòng Tin học" & Tạo bảng phân công',
      desc: 'Gõ văn bản nội quy, định dạng phông Arial 16pt, căn giữa tiêu đề và chèn bảng (Table).'
    },
    {
      level: 3,
      title: 'Bài 3: Định dạng đoạn văn "Quê hương tươi đẹp" & Phối màu chữ',
      desc: 'Thực hành in đậm, căn giữa, chọn cỡ chữ 22pt nổi bật và chèn hình ảnh quê hương.'
    },
    {
      level: 4,
      title: 'Bài 4: Thiết kế "Thời khóa biểu của em" với công cụ Bảng biểu',
      desc: 'Soạn thảo kế hoạch học tập hàng tuần, định dạng chữ rõ ràng và chèn bảng thời khóa biểu.'
    },
    {
      level: 5,
      title: 'Bài 5: Viết bài tuyên truyền "Bảo vệ môi trường xanh - sạch - đẹp"',
      desc: 'Trình bày thông điệp trồng cây xanh, định dạng Times New Roman 20pt và minh họa trực quan.'
    },
    {
      level: 6,
      title: 'Bài 6: Lập "Kế hoạch đọc sách tuần này" & Hoàn thiện lưu tệp',
      desc: 'Tổng hợp kỹ năng định dạng chữ, tạo bảng theo dõi sách đọc và lưu tài liệu hoàn chỉnh.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'word',
      questions: getUniqueQuestionsForLesson('word', id, 4)
    };
  });
};

// 6. BẢNG TÍNH EXCEL: 6 CẤP · 6 BÀI ĐỘC LẬP (Mỗi bài 1 bảng dữ liệu riêng + 4 câu hỏi riêng)
const buildExcelLessons = (): Lesson[] => {
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
      title: item.title,
      desc: item.desc,
      type: 'excel',
      questions: getUniqueQuestionsForLesson('excel', id, 4)
    };
  });
};

// 7. TRÌNH CHIẾU POWERPOINT: 6 CẤP · 6 BÀI ĐỘC LẬP (Mỗi bài 1 chủ đề thuyết trình riêng + 4 câu hỏi riêng)
const buildPowerPointLessons = (): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Thiết kế bài trình chiếu "Giới thiệu trường tiểu học của em"',
      desc: 'Tạo trang tiêu đề, thêm trang chiếu mới, chọn màu nền và trình chiếu giới thiệu trường.'
    },
    {
      level: 2,
      title: 'Bài 2: Bài thuyết trình "Thế giới động vật đáng yêu quanh em"',
      desc: 'Soạn nội dung giới thiệu loài vật có ích, chèn nhãn hình ảnh và tạo hiệu ứng chuyển trang.'
    },
    {
      level: 3,
      title: 'Bài 3: Bài thuyết trình "An toàn trên mạng Internet"',
      desc: 'Thiết kế các slide tuyên truyền quy tắc bảo mật thông tin cá nhân trên không gian mạng.'
    },
    {
      level: 4,
      title: 'Bài 4: Bài thuyết trình "Danh lam thắng cảnh quê hương Việt Nam"',
      desc: 'Giới thiệu vẻ đẹp Vịnh Hạ Long và Cố đô Huế với mẫu thiết kế Theme trang nhã.'
    },
    {
      level: 5,
      title: 'Bài 5: Bài thuyết trình "An toàn giao thông cho nụ cười trẻ thơ"',
      desc: 'Trình bày thông điệp đội mũ bảo hiểm và chấp hành đèn tín hiệu giao thông.'
    },
    {
      level: 6,
      title: 'Bài 6: Bài thuyết trình "Ước mơ nghề nghiệp tương lai của em"',
      desc: 'Tổng hợp kỹ năng thiết kế nhiều trang chiếu, hiệu ứng Transitions và thuyết trình toàn màn hình.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'powerpoint',
      questions: getUniqueQuestionsForLesson('powerpoint', id, 4)
    };
  });
};

// 8. TƯ DUY THUẬT TOÁN: 8 CẤP · 8 MÊ CUNG ĐỘC LẬP (Mỗi bài 1 bản đồ mê cung riêng + 4 câu hỏi riêng)
const buildAlgorithmLessons = (): Lesson[] => {
  const items: { level: number; title: string; desc: string; maze: MazeConfig }[] = [
    {
      level: 1,
      title: 'Bài 1: Đường thẳng tuần tự về đích',
      desc: 'Xếp chuỗi lệnh "Đi thẳng" tuần tự đưa Robot đi dọc hànhlang về thẳng cờ chiến thắng.',
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
      title: 'Bài 2: Khúc cua góc vuông chữ L',
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
      title: 'Bài 4: Hành trình bậc thang lặp lại',
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
      title: 'Bài 5: Lựa chọn ngã rẽ thông minh',
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

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'algorithm',
      maze: item.maze,
      questions: getUniqueQuestionsForLesson('algorithm', id, 4)
    };
  });
};

// 9. CÔNG DÂN SỐ: 6 CẤP · 6 BÀI ĐỘC LẬP (Mỗi bài 5 câu hỏi tình huống riêng biệt)
const buildDigitalCitizenshipLessons = (): Lesson[] => {
  const items = [
    {
      level: 1,
      title: 'Bài 1: Bảo vệ thông tin cá nhân và quyền riêng tư trên mạng',
      desc: 'Nhận biết các thông tin bí mật của bản thân, gia đình và quản lý dấu chân kỹ thuật số.'
    },
    {
      level: 2,
      title: 'Bài 2: Quy tắc tạo mật khẩu mạnh và bảo mật tài khoản học tập',
      desc: 'Cách đặt mật khẩu an toàn, giữ bí mật mã OTP và đăng xuất khỏi máy tính dùng chung.'
    },
    {
      level: 3,
      title: 'Bài 3: Ứng xử văn minh và Phòng chống bắt nạt qua mạng (Cyberbullying)',
      desc: 'Giao tiếp lịch sự, nhân ái trên môi trường số và kỹ năng xử lý khi gặp hành vi bắt nạt.'
    },
    {
      level: 4,
      title: 'Bài 4: Nhận diện tin giả (Fake News) và Cảnh giác lừa đảo trực tuyến',
      desc: 'Rèn tư duy phản biện, kiểm chứng nguồn tin chính thống và tránh bẫy trúng thưởng ảo.'
    },
    {
      level: 5,
      title: 'Bài 5: Tôn trọng quyền tác giả và Bản quyền nội dung số (Copyright)',
      desc: 'Hiểu giá trị lao động sáng tạo, biết ghi nguồn trích dẫn và nói không với đạo văn.'
    },
    {
      level: 6,
      title: 'Bài 6: Phòng chống Virus mã độc và Giữ gìn sức khỏe số lành mạnh',
      desc: 'Bảo vệ máy tính trước phần mềm độc hại và cân bằng thời gian sử dụng màn hình khoa học.'
    }
  ];

  return items.map((item, idx) => {
    const id = idx + 1;
    return {
      id,
      level: item.level,
      title: item.title,
      desc: item.desc,
      type: 'quiz',
      questions: getUniqueQuestionsForLesson('digitalCitizenship', id, 5)
    };
  });
};

// 10. DÙNG AI: 4 CẤP · 4 BÀI ĐỘC LẬP (Mỗi bài 5 câu hỏi riêng biệt)
const buildAILessons = (): Lesson[] => {
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
      title: item.title,
      desc: item.desc,
      type: 'quiz',
      questions: getUniqueQuestionsForLesson('ai', id, 5)
    };
  });
};

// Build all subjects lessons (Total: 65 completely unique lessons, 0 duplicate questions)
export const SUBJECT_LESSONS: Record<SubjectId, Lesson[]> = {
  go: buildTypingLessons(),
  'go-tv': buildVietnameseTypingLessons(),
  chuot: buildMouseLessons(),
  ic3: buildIC3Lessons(),
  word: buildWordLessons(),
  excel: buildExcelLessons(),
  powerpoint: buildPowerPointLessons(),
  'thuat-toan': buildAlgorithmLessons(),
  cdso: buildDigitalCitizenshipLessons(),
  ai: buildAILessons()
};
