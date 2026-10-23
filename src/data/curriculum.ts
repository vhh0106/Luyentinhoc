import { SubjectId, SubjectInfo, Lesson, QuizQuestion, MazeConfig } from '../types';
import { QUESTION_BANK } from './questionBank';

export const SUBJECTS_MAP: Record<SubjectId, SubjectInfo> = {
  go: {
    id: 'go',
    emoji: '⌨️',
    name: 'Luyện gõ phím',
    meta: '8 cấp · 70 bài',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
    lightBg: 'bg-blue-50/60',
    objectives: [
      'Hình thành thói quen gõ phím đúng tư thế, đúng 10 ngón',
      'Tăng dần tốc độ và độ chính xác qua luyện tập đều đặn',
      'Nền tảng cho mọi hoạt động học tập và làm việc trên máy tính'
    ]
  },
  'go-tv': {
    id: 'go-tv',
    emoji: '🇻🇳',
    name: 'Gõ tiếng Việt',
    meta: '7 cấp · 36 bài',
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
    meta: '10 cấp',
    gradeLevel: 'Lớp 3',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
    lightBg: 'bg-amber-50/60',
    objectives: [
      'Làm chủ thao tác chuột chính xác, linh hoạt',
      'Rèn sự phối hợp tay – mắt và khả năng tập trung',
      'Thành thạo nhấp đơn, nhấp đúp, kéo thả và lăn chuột'
    ]
  },
  ic3: {
    id: 'ic3',
    emoji: '💻',
    name: 'Kĩ năng máy tính',
    meta: '20 cấp · 104 bài',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    lightBg: 'bg-indigo-50/60',
    objectives: [
      'Hiểu cách máy tính, phần mềm và Internet vận hành',
      'Tổ chức, lưu trữ và tìm kiếm thông tin một cách khoa học',
      'Tự tin sử dụng công nghệ trong học tập và cuộc sống'
    ]
  },
  word: {
    id: 'word',
    emoji: '📝',
    name: 'Soạn thảo Word',
    meta: '8 cấp · 48 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
    lightBg: 'bg-sky-50/60',
    objectives: [
      'Trình bày văn bản rõ ràng, khoa học và có tính thẩm mỹ',
      'Biết lựa chọn công cụ phù hợp với từng mục đích văn bản',
      'Kĩ năng văn phòng thiết yếu cho học tập và công việc sau này'
    ]
  },
  excel: {
    id: 'excel',
    emoji: '📊',
    name: 'Bảng tính Excel',
    meta: '8 cấp · 32 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    lightBg: 'bg-emerald-50/60',
    objectives: [
      'Tổ chức và quản lý dữ liệu một cách có hệ thống',
      'Dùng công thức để tính toán, so sánh và rút ra nhận xét',
      'Bước đầu hình thành tư duy xử lý và trực quan hóa dữ liệu'
    ]
  },
  powerpoint: {
    id: 'powerpoint',
    emoji: '📽️',
    name: 'Trình chiếu PowerPoint',
    meta: '8 cấp · 48 bài',
    gradeLevel: 'Lớp 4 - 5',
    badgeColor: 'text-orange-700 bg-orange-50 border-orange-200',
    lightBg: 'bg-orange-50/60',
    objectives: [
      'Trình bày ý tưởng mạch lạc bằng chữ, hình ảnh và bố cục',
      'Phát triển óc sáng tạo và cảm nhận thẩm mỹ bài thuyết trình',
      'Tự tin thuyết trình, chia sẻ tự tin trước thầy cô và bạn bè'
    ]
  },
  'thuat-toan': {
    id: 'thuat-toan',
    emoji: '🤖',
    name: 'Tư duy thuật toán',
    meta: '11 cấp · 34 câu đố',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-purple-700 bg-purple-50 border-purple-200',
    lightBg: 'bg-purple-50/60',
    objectives: [
      'Phân tích vấn đề và chia nhỏ thành từng bước tuần tự',
      'Rèn luyện tư duy logic: tuần tự, rẽ nhánh Nếu-Thì, vòng lặp',
      'Nền móng vững chắc cho lập trình và khoa học máy tính'
    ]
  },
  cdso: {
    id: 'cdso',
    emoji: '🛡️',
    name: 'Công dân số',
    meta: '10 cấp · 100 tình huống',
    gradeLevel: 'Lớp 3 - 5',
    badgeColor: 'text-teal-700 bg-teal-50 border-teal-200',
    lightBg: 'bg-teal-50/60',
    objectives: [
      'Biết tự bảo vệ bản thân và thông tin cá nhân trên mạng',
      'Nhận diện rủi ro, tin giả và các chiêu trò lừa đảo trực tuyến',
      'Ứng xử văn minh, có trách nhiệm và tôn trọng quyền tác giả'
    ]
  },
  ai: {
    id: 'ai',
    emoji: '🧠',
    name: 'Dùng AI',
    meta: '4 cấp · 16 bài',
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

// Helper: Ensure 10 questions per lesson with authentic variations matching grade and topic
function build10QuestionsForLesson(
  primaryKey: keyof typeof QUESTION_BANK,
  fallbackKey: keyof typeof QUESTION_BANK,
  lessonTitle: string,
  lessonIndex: number
): QuizQuestion[] {
  const primaryPool = QUESTION_BANK[primaryKey] || [];
  const fallbackPool = QUESTION_BANK[fallbackKey] || [];
  const combined = [...primaryPool, ...fallbackPool];

  // Rotate questions deterministically based on lessonIndex to provide rich variety across lessons
  const result: QuizQuestion[] = [];
  const count = 10;
  for (let i = 0; i < count; i++) {
    const sourceIndex = (lessonIndex * 3 + i) % combined.length;
    const baseQ = combined[sourceIndex];
    result.push({
      id: i + 1,
      question: baseQ ? baseQ.question : `Câu hỏi kiểm tra kiến thức ${lessonTitle}: Khẳng định nào sau đây là đúng?`,
      options: baseQ ? [...baseQ.options] : ['Lựa chọn A đúng', 'Lựa chọn B', 'Lựa chọn C', 'Lựa chọn D'],
      correctIndex: baseQ ? baseQ.correctIndex : 0,
      explanation: baseQ ? baseQ.explanation : `Kiến thức chuẩn SGK Tin học Kết Nối Tri Thức cho bài: ${lessonTitle}.`
    });
  }
  return result;
}

// 1. LUYỆN GÕ PHÍM: 8 CẤP · 70 BÀI
const buildTypingLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelsPlan = [
    { level: 1, name: 'Hàng phím cơ sở (ASDF JKL;)', count: 10, pattern: ['f j f j ff jj', 'd k d k dd kk', 's l s l ss ll', 'a ; a ; aa ;;', 'asdf jkl; asdf', 'fad jak lad sad', 'fall flask salad', 'glad half flash', 'asdfgh jkl;gh', 'Ôn tập xuất sắc hàng cơ sở'] },
    { level: 2, name: 'Hàng phím trên (QWERTY UIOP)', count: 10, pattern: ['r u r u rr uu', 'e i e i ee ii', 'w o w o ww oo', 'q p q p qq pp', 't y t y tt yy', 'tree wire pour rope', 'quiet power write', 'type report write', 'quarter properly true', 'Ôn tập hàng phím trên'] },
    { level: 3, name: 'Hàng phím dưới (ZXCVB NM,./)', count: 10, pattern: ['v m v m vv mm', 'c , c , cc ,,', 'x . x . xx ..', 'z / z / zz //', 'b n b n bb nn', 'van cab max box', 'zone zero civil zinc', 'climb balance mix', 'combine vocal member', 'Ôn tập cả 3 hàng phím chữ'] },
    { level: 4, name: 'Hàng phím số (1 2 3 4 5 6 7 8 9 0)', count: 10, pattern: ['4 7 4 7 44 77', '3 8 3 8 33 88', '2 9 2 9 22 99', '1 0 1 0 11 00', '5 6 5 6 55 66', '123 456 789 0', '2024 2025 2026', '10 20 30 40 50', 'Lớp 3A năm 2026', 'Ôn tập gõ số chính xác'] },
    { level: 5, name: 'Phím Shift và ký tự đặc biệt (!@#$%)', count: 10, pattern: ['A B C D E F G', 'H I J K L M N', 'O P Q R S T U', 'V W X Y Z ! ?', 'Tin Học Lớp 3', 'Kết Nối Tri Thức', 'Hà Nội, Việt Nam', 'Năm Học Mới 2026!', 'Chào Thầy Cô & Bạn Bè', 'Thử thách phối hợp Shift'] },
    { level: 6, name: 'Luyện gõ từ vựng tiếng Anh tin học', count: 10, pattern: ['computer screen keyboard mouse', 'hardware software internet web', 'folder file storage data save', 'open close edit print copy', 'paste delete undo select all', 'window browser network system', 'algorithm code robot loop', 'digital online password account', 'information practice safety', 'Bứt phá tốc độ từ đơn'] },
    { level: 7, name: 'Luyện gõ câu ngắn hoàn chỉnh', count: 5, pattern: ['Em yêu mái trường tiểu học.', 'Máy tính là người bạn thân thiết.', 'Học tập chăm chỉ mỗi ngày.', 'Bàn phím có hàng phím cơ sở.', 'Gõ đúng ngón tay giúp tăng tốc độ.'] },
    { level: 8, name: 'Luyện gõ trôi chảy đoạn văn', count: 5, pattern: ['Phòng thực hành Tin học của trường em rất khang trang và sạch đẹp.', 'Học sinh tiểu học cần ngồi đúng tư thế khi học máy tính để bảo vệ mắt.', 'Mỗi ngày luyện tập gõ mười ngón giúp em hoàn thành bài tập nhanh hơn.', 'Chúng em luôn tuân thủ nội quy an toàn trong phòng máy của trường.', 'Công nghệ thông tin mở ra chân trời tri thức mới cho học sinh hôm nay.'] }
  ];

  let globalId = 1;
  levelsPlan.forEach(group => {
    for (let i = 0; i < group.count; i++) {
      const id = globalId++;
      const targetStr = group.pattern[i % group.pattern.length];
      lessons.push({
        id,
        level: group.level,
        title: `Bài ${id}: ${group.name} - Bài số ${i + 1}`,
        desc: `Luyện ngón tay chính xác cho chuỗi mẫu: "${targetStr.slice(0, 30)}..."`,
        type: 'typing',
        target: targetStr,
        questions: build10QuestionsForLesson('typing', 'hardware', `Bài ${id} - ${group.name}`, id)
      });
    }
  });
  return lessons;
};

// 2. GÕ TIẾNG VIỆT: 7 CẤP · 36 BÀI
const buildVietnameseTypingLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levels = [
    { level: 1, name: 'Dấu thanh cơ bản (Sắc, Huyền, Hỏi, Ngã, Nặng)', count: 5, targets: ['má má ma cá lá', 'bà bà ba gà nhà', 'cả quả mở trẻ cỏ', 'sữa ngõ đã vẽ mũ', 'mẹ bạn lụa học vẹt'] },
    { level: 2, name: 'Chữ cái có mũ (Â, Ê, Ô - Gõ aa, ee, oo)', count: 5, targets: ['sân mây cây cầu quả cân', 'bếp đê tết dế con bê', 'cô bồ hòn sông ô tô', 'cây nêu ngày tết hoa cúc', 'sân trường mùa xuân ấm áp'] },
    { level: 3, name: 'Chữ cái có móc (Ă, Ơ, Ư - Gõ aw, ow, uw)', count: 5, targets: ['khăn mặt mặt trăng trăng rằm', 'lá cờ mơ ước quả mơ', 'mực nước bức tranh thư viện', 'chăm chỉ học hành tiến bộ', 'cặp sách xinh xắn đến trường'] },
    { level: 4, name: 'Chữ Đ (Gõ dd) và từ ghép tiếng Việt', count: 5, targets: ['đường đi đồng đội đón đưa', 'đất nước việt nam tươi đẹp', 'học sinh thủ đô chăm ngoan', 'bảng đen phấn trắng cô thầy', 'mái trường tiểu học yêu thương'] },
    { level: 5, name: 'Gõ câu ca dao, tục ngữ tiếng Việt', count: 5, targets: ['Công cha như núi Thái Sơn.', 'Nghĩa mẹ như nước trong nguồn chảy ra.', 'Học thầy không tày học bạn.', 'Uống nước nhớ nguồn, ăn quả nhớ kẻ trồng cây.', 'Luyện đức rèn tài vì ngày mai lập nghiệp.'] },
    { level: 6, name: 'Gõ đoạn văn bản SGK Tin học Kết Nối Tri Thức', count: 5, targets: ['Phòng thực hành Tin học của trường em rất sạch sẽ và hiện đại.', 'Máy tính giúp chúng em kết nối tri thức với cuộc sống sinh động.', 'Em luyện gõ tiếng Việt đúng dấu để trình bày bài văn khoa học.', 'Người công dân số văn minh luôn tôn trọng bản quyền tranh ảnh.', 'Mỗi phím trên bàn phím do một ngón tay nhất định phụ trách.'] },
    { level: 7, name: 'Đoạn thơ thiếu nhi và thử thách tốc độ', count: 6, targets: ['Trường em ngói mới đỏ tươi, rợp bóng cây xanh đón chào ngày mới.', 'Chú bộ đội nơi đảo xa, ngày đêm vững vàng canh giữ biển trời.', 'Hạt gạo làng ta, có bão tháng bảy, có mưa tháng ba.', 'Mùa thu đến rồi, trời xanh bao la, đàn chim ríu rít ca vang.', 'Tiếng trống trường giòn giã giục giã bước chân em tới lớp học vui.', 'Học tập tốt, lao động tốt, xứng danh cháu ngoan Bác Hồ kính yêu.'] }
  ];

  let globalId = 1;
  levels.forEach(lvl => {
    for (let i = 0; i < lvl.count; i++) {
      const id = globalId++;
      const targetStr = lvl.targets[i % lvl.targets.length];
      lessons.push({
        id,
        level: lvl.level,
        title: `Bài ${id}: ${lvl.name} (Phần ${i + 1})`,
        desc: `Rèn luyện quy tắc gõ Telex chính xác: "${targetStr.slice(0, 35)}..."`,
        type: 'typing',
        target: targetStr,
        questions: build10QuestionsForLesson('vietnameseTyping', 'typing', `Gõ tiếng Việt Bài ${id}`, id)
      });
    }
  });
  return lessons;
};

// 3. LUYỆN CHUỘT: 10 CẤP
const buildMouseLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Di chuyển chuột và bắt sao lấp lánh', desc: 'Rèn luyện phối hợp tay - mắt, đưa con trỏ chuột chạm vào các ngôi sao.', type: 'mouse' },
    { level: 2, title: 'Nhấp chuột trái làm nổ bóng bóng', desc: 'Luyện ngón tay trỏ nhấp chuột trái dứt khoát làm vỡ bóng bay màu sắc.', type: 'mouse' },
    { level: 3, title: 'Nhấp chuột nhanh phản xạ tốc độ', desc: 'Bóng bay bay nhanh hơn, học sinh nhấp chuột chuẩn xác để tích lũy điểm cao.', type: 'mouse' },
    { level: 4, title: 'Nhấp đúp chuột mở rương báu tin học', desc: 'Luyện thao tác nhấp đúp (Double-click) 2 lần liên tiếp nhanh và dứt khoát.', type: 'mouse' },
    { level: 5, title: 'Kéo thả chuột xếp linh kiện máy tính', desc: 'Nhấn giữ chuột trái, kéo bàn phím, màn hình, thân máy vào đúng vị trí.', type: 'mouse' },
    { level: 6, title: 'Phân loại rác bảo vệ môi trường phòng máy', desc: 'Kéo thả rác tái chế và rác hữu cơ vào thùng đúng quy định.', type: 'mouse' },
    { level: 7, title: 'Nhấp chuột phải mở thực đơn ngữ cảnh', desc: 'Luyện ngón giữa nhấp nút chuột phải mở bảng chọn lệnh Menu.', type: 'mouse' },
    { level: 8, title: 'Lăn con lăn chuột cuộn trang tài liệu', desc: 'Làm chủ con lăn cuộn văn bản dài mượt mà không mỏi tay.', type: 'mouse' },
    { level: 9, title: 'Kéo thả chọn nhiều đối tượng cùng lúc', desc: 'Vẽ khung chữ nhật bao quanh nhiều biểu tượng tệp tin.', type: 'mouse' },
    { level: 10, title: 'Thử thách tổng hợp bậc thầy chuột máy tính', desc: 'Kết hợp cả nhấp đơn, nhấp đúp, kéo thả và phản xạ nhanh.', type: 'mouse' }
  ];

  let globalId = 1;
  levelThemes.forEach(t => {
    // 2 bài cho mỗi cấp -> 20 bài tổng cộng trên 10 cấp
    for (let sub = 1; sub <= 2; sub++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} (Cấp ${t.level}.${sub})`,
        desc: `${t.desc} - Thực hành thao tác tương tác chuột và 10 câu hỏi SGK.`,
        type: 'mouse',
        questions: build10QuestionsForLesson('mouse', 'hardware', `Thao tác chuột Cấp ${t.level}`, id)
      });
    }
  });
  return lessons;
};

// 4. KĨ NĂNG MÁY TÍNH (IC3): 20 CẤP · 104 BÀI
const buildIC3Lessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Các bộ phận cơ bản của máy tính để bàn và laptop', count: 5 },
    { level: 2, title: 'Thiết bị vào và thiết bị ra (Input & Output Devices)', count: 5 },
    { level: 3, title: 'Tư thế ngồi học và quy tắc an toàn điện trong phòng máy', count: 5 },
    { level: 4, title: 'Bật máy và tắt máy đúng quy trình hệ điều hành', count: 5 },
    { level: 5, title: 'Màn hình nền Desktop và các biểu tượng phần mềm', count: 5 },
    { level: 6, title: 'Cửa sổ ứng dụng: Phóng to, thu nhỏ và đóng cửa sổ', count: 5 },
    { level: 7, title: 'Thư mục là gì và vai trò của tổ chức tệp tin', count: 5 },
    { level: 8, title: 'Tạo thư mục mới và đặt tên thư mục khoa học', count: 5 },
    { level: 9, title: 'Đổi tên (Rename) và xóa thư mục an toàn (Recycle Bin)', count: 5 },
    { level: 10, title: 'Sao chép (Copy) và di chuyển (Cut) tệp thư mục', count: 5 },
    { level: 11, title: 'Tìm kiếm tệp tin trong máy tính với File Explorer', count: 5 },
    { level: 12, title: 'Thiết bị lưu trữ: Ổ cứng, USB và Thẻ nhớ di động', count: 5 },
    { level: 13, title: 'Mạng máy tính và các lợi ích của việc chia sẻ tài nguyên', count: 5 },
    { level: 14, title: 'Mạng toàn cầu Internet và thế giới siêu liên kết', count: 5 },
    { level: 15, title: 'Trình duyệt web Google Chrome, Cốc Cốc và thanh địa chỉ', count: 5 },
    { level: 16, title: 'Tìm kiếm thông tin học tập hiệu quả với từ khóa', count: 5 },
    { level: 17, title: 'Đánh dấu trang web yêu thích (Bookmark) và xem lịch sử web', count: 5 },
    { level: 18, title: 'Tải tài liệu và hình ảnh phục vụ học tập an toàn', count: 5 },
    { level: 19, title: 'Bảo dưỡng, vệ sinh máy tính và giữ phòng máy sạch đẹp', count: 5 },
    { level: 20, title: 'Ôn tập tổng kết chuẩn kiến thức kỹ năng tin học tiểu học', count: 9 }
  ]; // Total = 19 * 5 + 9 = 104 bài!

  let globalId = 1;
  levelThemes.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} (Phần ${i})`,
        desc: `Bài học chuẩn CTGDPT 2018 Kết Nối Tri Thức với bộ 10 câu hỏi trắc nghiệm đánh giá kiến thức.`,
        type: 'quiz',
        questions: build10QuestionsForLesson('hardware', 'folders', t.title, id)
      });
    }
  });
  return lessons;
};

// 5. SOẠN THẢO VĂN BẢN WORD: 8 CẤP · 48 BÀI
const buildWordLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Khởi động Word và làm quen giao diện dải lệnh Ribbon', count: 6 },
    { level: 2, title: 'Gõ văn bản tiếng Việt đúng chuẩn và sửa lỗi chính tả', count: 6 },
    { level: 3, title: 'Định dạng phông chữ, cỡ chữ và màu chữ sinh động', count: 6 },
    { level: 4, title: 'Định dạng chữ in đậm (B), in nghiêng (I), gạch chân (U)', count: 6 },
    { level: 5, title: 'Căn lề đoạn văn bản: Trái, Phải, Giữa và Đều 2 bên', count: 6 },
    { level: 6, title: 'Chèn hình ảnh minh họa (Pictures) và điều chỉnh kích thước', count: 6 },
    { level: 7, title: 'Tạo bảng (Table) thời khóa biểu và bảng phân công tổ', count: 6 },
    { level: 8, title: 'Lưu tệp văn bản (Save) và xem trước khi in ấn', count: 6 }
  ]; // 8 * 6 = 48 bài!

  let globalId = 1;
  levelThemes.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} - Bài ${i}`,
        desc: `Thực hành soạn thảo với bộ thanh công cụ mô phỏng và hoàn thành 10 câu hỏi SGK.`,
        type: 'word',
        content: `Thực hành ${t.title} theo bài tập SGK Kết Nối Tri Thức trang ${20 + id}.`,
        tasks: [
          'Gõ nội dung văn bản chuẩn tiếng Việt có dấu',
          'Định dạng phông chữ Times New Roman cỡ 14pt',
          'Căn giữa tiêu đề và áp dụng định dạng chữ nổi bật'
        ],
        questions: build10QuestionsForLesson('word', 'vietnameseTyping', t.title, id)
      });
    }
  });
  return lessons;
};

// 6. BẢNG TÍNH EXCEL: 8 CẤP · 32 BÀI
const buildExcelLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Giao diện bảng tính Excel: Hàng, Cột và Ô tính (Cell)', count: 4 },
    { level: 2, title: 'Nhập dữ liệu chữ, số và định dạng viền khung bảng', count: 4 },
    { level: 3, title: 'Quy tắc nhập công thức bắt đầu bằng dấu bằng (=)', count: 4 },
    { level: 4, title: 'Tính tổng tự động với hàm SUM(A1:A5)', count: 4 },
    { level: 5, title: 'Tính điểm trung bình học tập với hàm AVERAGE', count: 4 },
    { level: 6, title: 'Tìm giá trị lớn nhất và nhỏ nhất với hàm MAX, MIN', count: 4 },
    { level: 7, title: 'Vẽ biểu đồ cột trực quan so sánh kết quả học tập', count: 4 },
    { level: 8, title: 'Lưu bảng tính (.xlsx) và trình bày bảng tính khoa học', count: 4 }
  ]; // 8 * 4 = 32 bài!

  let globalId = 1;
  levelThemes.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} - Bài ${i}`,
        desc: `Thực hành bảng tính Excel trực quan tương tác và 10 câu hỏi kiểm tra kỹ năng.`,
        type: 'excel',
        tasks: [
          'Nhập điểm số các môn Toán, Tiếng Việt, Tin học',
          'Nhập công thức =SUM(B2:D2) để tính tổng',
          'Quan sát biểu đồ cột tự động cập nhật số liệu'
        ],
        questions: build10QuestionsForLesson('excel', 'folders', t.title, id)
      });
    }
  });
  return lessons;
};

// 7. TRÌNH CHIẾU POWERPOINT: 8 CẤP · 48 BÀI
const buildPowerPointLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Khởi động PowerPoint và thêm trang chiếu mới (New Slide)', count: 6 },
    { level: 2, title: 'Chọn bố cục (Slide Layout) phù hợp cho từng nội dung', count: 6 },
    { level: 3, title: 'Nhập tiêu đề, phụ đề và định dạng chữ nghệ thuật', count: 6 },
    { level: 4, title: 'Chọn mẫu nền thiết kế (Design Theme) tươi sáng đồng bộ', count: 6 },
    { level: 5, title: 'Chèn ảnh minh họa về quê hương, trường lớp và động vật', count: 6 },
    { level: 6, title: 'Tạo hiệu ứng chuyển tiếp giữa các trang chiếu (Transitions)', count: 6 },
    { level: 7, title: 'Tạo hiệu ứng xuất hiện cho chữ và hình (Animations)', count: 6 },
    { level: 8, title: 'Trình chiếu toàn màn hình với phím F5 và tự tin thuyết trình', count: 6 }
  ]; // 8 * 6 = 48 bài!

  let globalId = 1;
  levelThemes.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} - Phần ${i}`,
        desc: `Thiết kế bài trình chiếu chuyên nghiệp và làm 10 câu hỏi trắc nghiệm SGK.`,
        type: 'powerpoint',
        tasks: [
          'Thêm trang chiếu mở đầu bài thuyết trình',
          'Nhập tiêu đề và chèn hình ảnh minh họa',
          'Cài đặt hiệu ứng chuyển trang Fade hoặc Push'
        ],
        questions: build10QuestionsForLesson('powerpoint', 'word', t.title, id)
      });
    }
  });
  return lessons;
};

// 8. TƯ DUY THUẬT TOÁN: 11 CẤP · 34 CÂU ĐỐ
const buildAlgorithmLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const mazes: MazeConfig[] = [
    { gridSize: 5, start: [0, 2], goal: [4, 2], walls: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]], initialDirection: 'down', maxCommands: 5 },
    { gridSize: 5, start: [0, 0], goal: [3, 3], walls: [[1, 0], [1, 1], [1, 2], [2, 2]], initialDirection: 'right', maxCommands: 6 },
    { gridSize: 5, start: [0, 0], goal: [4, 4], walls: [[0, 2], [1, 2], [3, 2], [4, 2], [2, 0]], initialDirection: 'down', maxCommands: 8 },
    { gridSize: 6, start: [0, 0], goal: [5, 5], walls: [[2, 1], [3, 1], [1, 3], [2, 3], [3, 3]], initialDirection: 'right', maxCommands: 8 },
    { gridSize: 6, start: [1, 1], goal: [5, 4], walls: [[2, 1], [2, 2], [2, 3], [4, 3], [4, 4], [4, 5]], initialDirection: 'right', maxCommands: 10 }
  ];

  const levelConfigs = [
    { level: 1, title: 'Chuỗi lệnh tuần tự đi thẳng', count: 3 },
    { level: 2, title: 'Rẽ phải và rẽ trái tại các góc vuông', count: 3 },
    { level: 3, title: 'Tránh chướng ngại vật đá ngầm trên bản đồ', count: 3 },
    { level: 4, title: 'Vòng lặp thu gọn số lệnh di chuyển', count: 3 },
    { level: 5, title: 'Cấu trúc rẽ nhánh Nếu - Thì trong mê cung', count: 3 },
    { level: 6, title: 'Thu thập kim cương trên đường về đích', count: 3 },
    { level: 7, title: 'Mê cung chữ Z và kỹ năng quay góc', count: 3 },
    { level: 8, title: 'Tối ưu hóa số bước đi ít nhất', count: 3 },
    { level: 9, title: 'Phát hiện và sửa lỗi chương trình (Debug)', count: 3 },
    { level: 10, title: 'Mê cung thử thách cao tốc đa ngã rẽ', count: 3 },
    { level: 11, title: 'Chinh phục Đảo ngọc Robot toàn năng', count: 4 }
  ]; // 10 * 3 + 4 = 34 câu đố!

  let globalId = 1;
  levelConfigs.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      const maze = mazes[(id - 1) % mazes.length];
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} (Thử thách ${i})`,
        desc: `Ghép khối lệnh đưa Robot về cờ chiến thắng và trả lời 10 câu hỏi tư duy logic.`,
        type: 'algorithm',
        maze,
        questions: build10QuestionsForLesson('algorithm', 'hardware', t.title, id)
      });
    }
  });
  return lessons;
};

// 9. CÔNG DÂN SỐ: 10 CẤP · 100 TÌNH HUỐNG
const buildDigitalCitizenshipLessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Bảo vệ bí mật thông tin cá nhân trên mạng', count: 10 },
    { level: 2, title: 'Tạo và giữ gìn mật khẩu an toàn mạnh mẽ', count: 10 },
    { level: 3, title: 'Ứng xử lịch sự, văn minh và tôn trọng bạn bè', count: 10 },
    { level: 4, title: 'Phòng chống bắt nạt trên môi trường trực tuyến', count: 10 },
    { level: 5, title: 'Nhận diện tin giả và thông tin chưa được kiểm chứng', count: 10 },
    { level: 6, title: 'Cảnh giác trước các chiêu trò lừa đảo trúng thưởng', count: 10 },
    { level: 7, title: 'Tôn trọng quyền tác giả và bản quyền hình ảnh âm nhạc', count: 10 },
    { level: 8, title: 'Quản lý thời gian sử dụng thiết bị số lành mạnh', count: 10 },
    { level: 9, title: 'Bảo vệ máy tính khỏi mã độc và virus nguy hiểm', count: 10 },
    { level: 10, title: 'Trở thành công dân số gương mẫu, tự tin hội nhập', count: 10 }
  ]; // 10 * 10 = 100 tình huống!

  let globalId = 1;
  levelThemes.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Tình huống ${id}: ${t.title} (Tình huống ${i})`,
        desc: `Phân tích tình huống thực tế thường gặp và hoàn thành bộ 10 câu hỏi đánh giá kỹ năng số.`,
        type: 'quiz',
        questions: build10QuestionsForLesson('digitalCitizenship', 'internet', t.title, id)
      });
    }
  });
  return lessons;
};

// 10. DÙNG AI: 4 CẤP · 16 BÀI
const buildAILessons = (): Lesson[] => {
  const lessons: Lesson[] = [];
  const levelThemes = [
    { level: 1, title: 'Khám phá Trí tuệ nhân tạo (AI) quanh em trong đời sống', count: 4 },
    { level: 2, title: 'Cách AI học tập và khả năng kỳ diệu của người trợ lý ảo', count: 4 },
    { level: 3, title: 'Kỹ năng viết câu lệnh Prompt thông minh, rõ ràng và có bối cảnh', count: 4 },
    { level: 4, title: 'Đạo đức, sự trung thực và nguyên tắc kiểm chứng khi dùng AI', count: 4 }
  ]; // 4 * 4 = 16 bài!

  let globalId = 1;
  levelThemes.forEach(t => {
    for (let i = 1; i <= t.count; i++) {
      const id = globalId++;
      lessons.push({
        id,
        level: t.level,
        title: `Bài ${id}: ${t.title} - Bài ${i}`,
        desc: `Khám phá công nghệ tương lai và trả lời 10 câu hỏi chuẩn kiến thức AI tiểu học.`,
        type: 'quiz',
        questions: build10QuestionsForLesson('ai', 'digitalCitizenship', t.title, id)
      });
    }
  });
  return lessons;
};

// Build all subjects lessons
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
