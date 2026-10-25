import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  // ================= 1. LUYỆN GÕ PHÍM (GO - 8 BÀI) =================
  {
    id: 'typing-novice',
    title: 'Tập Sự 10 Ngón',
    subjectId: 'go',
    tier: 'bronze',
    icon: '⌨️',
    description: 'Bắt đầu hành trình đặt đúng 10 ngón tay lên hàng phím cơ sở.',
    criteriaDescription: 'Hoàn thành 2 bài luyện gõ phím',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('go-') && !id.startsWith('go-tv-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'typing-pro',
    title: 'Bàn Tay Vàng',
    subjectId: 'go',
    tier: 'silver',
    icon: '⚡',
    description: 'Gõ phím chuẩn xác các hàng phím trên, dưới và chữ số.',
    criteriaDescription: 'Hoàn thành 5 bài luyện gõ phím',
    targetCount: 5,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('go-') && !id.startsWith('go-tv-')).length;
      return {
        isUnlocked: count >= 5,
        currentProgress: count,
        targetProgress: 5
      };
    }
  },
  {
    id: 'typing-master',
    title: 'Typing Master',
    subjectId: 'go',
    tier: 'gold',
    icon: '👑',
    description: 'Làm chủ trọn vẹn 8 cấp độ bàn phím với tốc độ và độ chính xác cao.',
    criteriaDescription: 'Hoàn thành trọn bộ 8 bài luyện gõ phím',
    targetCount: 8,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('go-') && !id.startsWith('go-tv-')).length;
      return {
        isUnlocked: count >= 8,
        currentProgress: count,
        targetProgress: 8
      };
    }
  },

  // ================= 2. GÕ TIẾNG VIỆT (GO-TV - 7 BÀI) =================
  {
    id: 'viet-starter',
    title: 'Chiến Binh Dấu Thanh',
    subjectId: 'go-tv',
    tier: 'bronze',
    icon: '🇻🇳',
    description: 'Thành thạo cách bỏ dấu Sắc, Huyền, Hỏi, Ngã, Nặng theo kiểu Telex và VNI.',
    criteriaDescription: 'Hoàn thành 2 bài gõ tiếng Việt',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('go-tv-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'viet-fluent',
    title: 'Bút Son Tiếng Việt',
    subjectId: 'go-tv',
    tier: 'silver',
    icon: '✍️',
    description: 'Gõ trôi chảy các chữ cái có mũ, có móc và từ ghép tiếng Việt.',
    criteriaDescription: 'Hoàn thành 4 bài gõ tiếng Việt',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('go-tv-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },
  {
    id: 'viet-master',
    title: 'Đại Sứ Tiếng Việt Số',
    subjectId: 'go-tv',
    tier: 'gold',
    icon: '📜',
    description: 'Làm chủ hoàn toàn nghệ thuật gõ tiếng Việt có dấu chuẩn đẹp trên máy tính.',
    criteriaDescription: 'Hoàn thành trọn bộ 7 bài gõ tiếng Việt',
    targetCount: 7,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('go-tv-')).length;
      return {
        isUnlocked: count >= 7,
        currentProgress: count,
        targetProgress: 7
      };
    }
  },

  // ================= 3. LUYỆN CHUỘT (CHUOT - 6 BÀI) =================
  {
    id: 'mouse-cadet',
    title: 'Tập Sự Chuột Nhí',
    subjectId: 'chuot',
    tier: 'bronze',
    icon: '🖱️',
    description: 'Làm quen với thao tác cầm chuột, di chuyển con trỏ và nhấp chuột trái.',
    criteriaDescription: 'Hoàn thành 2 bài luyện chuột',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('chuot-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'mouse-ace',
    title: 'Xạ Thủ Chuột Siêu Tốc',
    subjectId: 'chuot',
    tier: 'silver',
    icon: '🎯',
    description: 'Phối hợp tay mắt nhanh nhẹn, nhấp đúp mở rương và bắt mục tiêu chuẩn xác.',
    criteriaDescription: 'Hoàn thành 4 bài luyện chuột',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('chuot-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },
  {
    id: 'mouse-master',
    title: 'Bậc Thầy Chuột Quang',
    subjectId: 'chuot',
    tier: 'gold',
    icon: '🏆',
    description: 'Chinh phục cả 6 chế độ điều khiển chuột từ nhấp đơn, nhấp đúp đến kéo thả.',
    criteriaDescription: 'Hoàn thành trọn bộ 6 bài luyện chuột',
    targetCount: 6,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('chuot-')).length;
      return {
        isUnlocked: count >= 6,
        currentProgress: count,
        targetProgress: 6
      };
    }
  },

  // ================= 4. KĨ NĂNG MÁY TÍNH (IC3 - 8 BÀI) =================
  {
    id: 'ic3-explorer',
    title: 'Khám Phá Phần Cứng',
    subjectId: 'ic3',
    tier: 'bronze',
    icon: '💻',
    description: 'Nhận biết thân máy, màn hình, bàn phím, chuột và thiết bị vào - ra.',
    criteriaDescription: 'Hoàn thành 2 bài kĩ năng máy tính IC3',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('ic3-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'ic3-detective',
    title: 'Thám Tử Hệ Điều Hành',
    subjectId: 'ic3',
    tier: 'silver',
    icon: '🔍',
    description: 'Quản lý cây thư mục, tệp tin và an toàn điện trong phòng máy.',
    criteriaDescription: 'Hoàn thành 5 bài kĩ năng máy tính IC3',
    targetCount: 5,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('ic3-')).length;
      return {
        isUnlocked: count >= 5,
        currentProgress: count,
        targetProgress: 5
      };
    }
  },
  {
    id: 'ic3-champion',
    title: 'Chuyên Gia Máy Tính Nhí',
    subjectId: 'ic3',
    tier: 'gold',
    icon: '🏅',
    description: 'Làm chủ toàn bộ kiến thức phần cứng, tệp thư mục, lưu trữ và mạng Internet.',
    criteriaDescription: 'Hoàn thành trọn bộ 8 bài kĩ năng máy tính IC3',
    targetCount: 8,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('ic3-')).length;
      return {
        isUnlocked: count >= 8,
        currentProgress: count,
        targetProgress: 8
      };
    }
  },

  // ================= 5. SOẠN THẢO VĂN BẢN (WORD - 6 BÀI) =================
  {
    id: 'word-novice',
    title: 'Người Soạn Chữ Đẹp',
    subjectId: 'word',
    tier: 'bronze',
    icon: '📝',
    description: 'Biết chọn phông chữ, cỡ chữ và màu sắc để mở đầu văn bản học tập.',
    criteriaDescription: 'Hoàn thành 2 bài soạn thảo Word',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('word-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'word-stylist',
    title: 'Họa Sĩ Văn Bản',
    subjectId: 'word',
    tier: 'silver',
    icon: '🎨',
    description: 'Căn lề chuẩn mực, chèn ảnh minh họa và bảng biểu khoa học.',
    criteriaDescription: 'Hoàn thành 4 bài soạn thảo Word',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('word-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },
  {
    id: 'word-master',
    title: 'Bậc Thầy Soạn Thảo',
    subjectId: 'word',
    tier: 'gold',
    icon: '📘',
    description: 'Trình bày trọn vẹn cả 6 chủ đề văn bản mẫu chuẩn đẹp và chuyên nghiệp.',
    criteriaDescription: 'Hoàn thành trọn bộ 6 bài soạn thảo Word',
    targetCount: 6,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('word-')).length;
      return {
        isUnlocked: count >= 6,
        currentProgress: count,
        targetProgress: 6
      };
    }
  },

  // ================= 6. BẢNG TÍNH ĐIỆN TỬ (EXCEL - 6 BÀI) =================
  {
    id: 'excel-explorer',
    title: 'Người Bạn Ô Tính',
    subjectId: 'excel',
    tier: 'bronze',
    icon: '📊',
    description: 'Làm quen hàng, cột, địa chỉ ô và nhập dữ liệu số liệu lớp học.',
    criteriaDescription: 'Hoàn thành 2 bài bảng tính Excel',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('excel-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'excel-wizard',
    title: 'Thần Đồng Tính Toán',
    subjectId: 'excel',
    tier: 'silver',
    icon: '🧮',
    description: 'Thành thạo dùng các hàm SUM, AVERAGE, MAX để tính toán tự động.',
    criteriaDescription: 'Hoàn thành 4 bài bảng tính Excel',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('excel-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },
  {
    id: 'excel-master',
    title: 'Bậc Thầy Bảng Tính',
    subjectId: 'excel',
    tier: 'gold',
    icon: '📈',
    description: 'Tự tin tạo biểu đồ hình cột trực quan và hoàn thành cả 6 bảng tính.',
    criteriaDescription: 'Hoàn thành trọn bộ 6 bài bảng tính Excel',
    targetCount: 6,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('excel-')).length;
      return {
        isUnlocked: count >= 6,
        currentProgress: count,
        targetProgress: 6
      };
    }
  },

  // ================= 7. TRÌNH CHIẾU POWERPOINT (POWERPOINT - 6 BÀI) =================
  {
    id: 'ppt-starter',
    title: 'Nghệ Sĩ Slide',
    subjectId: 'powerpoint',
    tier: 'bronze',
    icon: '📽️',
    description: 'Tạo slide tiêu đề và trang nội dung đầu tiên cho bài học trực quan.',
    criteriaDescription: 'Hoàn thành 2 bài trình chiếu PowerPoint',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('powerpoint-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'ppt-storyteller',
    title: 'Người Kể Chuyện Sinh Động',
    subjectId: 'powerpoint',
    tier: 'silver',
    icon: '✨',
    description: 'Kết hợp hài hòa màu nền, hình ảnh minh họa và hiệu ứng chuyển trang mượt mà.',
    criteriaDescription: 'Hoàn thành 4 bài trình chiếu PowerPoint',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('powerpoint-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },
  {
    id: 'ppt-master',
    title: 'Phù Thủy Thuyết Trình',
    subjectId: 'powerpoint',
    tier: 'gold',
    icon: '🎪',
    description: 'Hoàn thành xuất sắc cả 6 chủ đề thuyết trình tương tác để tự tin đứng trước lớp.',
    criteriaDescription: 'Hoàn thành trọn bộ 6 bài trình chiếu PowerPoint',
    targetCount: 6,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('powerpoint-')).length;
      return {
        isUnlocked: count >= 6,
        currentProgress: count,
        targetProgress: 6
      };
    }
  },

  // ================= 8. TƯ DUY THUẬT TOÁN (THUAT-TOAN - 8 BÀI) =================
  {
    id: 'algorithm-solver',
    title: 'Thám Tử Mê Cung',
    subjectId: 'thuat-toan',
    tier: 'bronze',
    icon: '🧩',
    description: 'Chia nhỏ vấn đề thành các bước tuần tự (Đi thẳng, Rẽ trái, Rẽ phải).',
    criteriaDescription: 'Hoàn thành 2 bài thuật toán mê cung',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('thuat-toan-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'algorithm-commander',
    title: 'Chỉ Huy Robot Nhí',
    subjectId: 'thuat-toan',
    tier: 'silver',
    icon: '🤖',
    description: 'Điều khiển Robot vượt qua chướng ngại vật đá và các khúc cua chữ Z.',
    criteriaDescription: 'Hoàn thành 5 bài thuật toán lập trình',
    targetCount: 5,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('thuat-toan-')).length;
      return {
        isUnlocked: count >= 5,
        currentProgress: count,
        targetProgress: 5
      };
    }
  },
  {
    id: 'logic-genius',
    title: 'Logic Genius',
    subjectId: 'thuat-toan',
    tier: 'gold',
    icon: '🧠',
    description: 'Giải quyết trọn vẹn cả 8 bản đồ mê cung logic với số bước lệnh tối ưu nhất.',
    criteriaDescription: 'Hoàn thành trọn bộ 8 bài thuật toán & tư duy logic',
    targetCount: 8,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('thuat-toan-')).length;
      return {
        isUnlocked: count >= 8,
        currentProgress: count,
        targetProgress: 8
      };
    }
  },

  // ================= 9. CÔNG DÂN SỐ & AN TOÀN MẠNG (CDSO - 6 BÀI) =================
  {
    id: 'safety-shield',
    title: 'Tấm Khiên Mạng',
    subjectId: 'cdso',
    tier: 'bronze',
    icon: '🛡️',
    description: 'Biết bảo mật mật khẩu cá nhân và không chia sẻ thông tin riêng tư cho người lạ.',
    criteriaDescription: 'Hoàn thành 2 bài công dân số',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('cdso-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'cyber-guardian',
    title: 'Người Gác Cổng Số',
    subjectId: 'cdso',
    tier: 'silver',
    icon: '👮',
    description: 'Nhận diện các đường link độc hại, tin giả và ứng xử văn minh trong không gian mạng.',
    criteriaDescription: 'Hoàn thành 4 bài công dân số',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('cdso-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },
  {
    id: 'digital-citizen',
    title: 'Digital Citizen',
    subjectId: 'cdso',
    tier: 'gold',
    icon: '🌐',
    description: 'Hiệp sĩ số chân chính: tôn trọng bản quyền, phòng chống bắt nạt mạng và lan tỏa điều tích cực.',
    criteriaDescription: 'Hoàn thành trọn bộ 6 bài công dân số & an toàn mạng',
    targetCount: 6,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('cdso-')).length;
      return {
        isUnlocked: count >= 6,
        currentProgress: count,
        targetProgress: 6
      };
    }
  },

  // ================= 10. TRÍ TUỆ NHÂN TẠO AI (AI - 4 BÀI) =================
  {
    id: 'ai-curious',
    title: 'Bạn Đồng Hành AI',
    subjectId: 'ai',
    tier: 'bronze',
    icon: '🤖',
    description: 'Hiểu khái niệm trí tuệ nhân tạo và những trợ thủ AI quen thuộc quanh em.',
    criteriaDescription: 'Hoàn thành 1 bài học về AI',
    targetCount: 1,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('ai-')).length;
      return {
        isUnlocked: count >= 1,
        currentProgress: count,
        targetProgress: 1
      };
    }
  },
  {
    id: 'prompt-expert',
    title: 'Chuyên Gia Lệnh Prompt',
    subjectId: 'ai',
    tier: 'silver',
    icon: '💡',
    description: 'Biết đặt câu hỏi rõ ràng, chi tiết để AI hỗ trợ học tập hiệu quả nhất.',
    criteriaDescription: 'Hoàn thành 2 bài học về AI',
    targetCount: 2,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('ai-')).length;
      return {
        isUnlocked: count >= 2,
        currentProgress: count,
        targetProgress: 2
      };
    }
  },
  {
    id: 'ai-innovator',
    title: 'Nhà Phát Minh Tương Lai',
    subjectId: 'ai',
    tier: 'gold',
    icon: '🚀',
    description: 'Sử dụng AI có trách nhiệm, luôn kiểm chứng thông tin và nuôi dưỡng tư duy sáng tạo độc lập.',
    criteriaDescription: 'Hoàn thành trọn bộ 4 bài học về AI & Trí tuệ nhân tạo',
    targetCount: 4,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.filter(id => id.startsWith('ai-')).length;
      return {
        isUnlocked: count >= 4,
        currentProgress: count,
        targetProgress: 4
      };
    }
  },

  // ================= SPECIAL CROSS-DISCIPLINARY ACHIEVEMENTS =================
  {
    id: 'all-rounder',
    title: 'Tân Binh Toàn Năng',
    subjectId: 'all',
    tier: 'silver',
    icon: '🌟',
    description: 'Khám phá và hoàn thành ít nhất 1 bài tập ở cả 10 môn học Tin học!',
    criteriaDescription: 'Trải nghiệm đủ 10 chủ đề Tin học Kết Nối Tri Thức',
    targetCount: 10,
    checkUnlocked: ({ completedLessonIds }) => {
      const subjectsWithAtLeastOne = new Set<string>();
      completedLessonIds.forEach(id => {
        const prefix = id.split('-')[0];
        if (id.startsWith('go-tv-')) {
          subjectsWithAtLeastOne.add('go-tv');
        } else if (id.startsWith('go-')) {
          subjectsWithAtLeastOne.add('go');
        } else {
          subjectsWithAtLeastOne.add(prefix);
        }
      });
      const count = subjectsWithAtLeastOne.size;
      return {
        isUnlocked: count >= 10,
        currentProgress: count,
        targetProgress: 10
      };
    }
  },
  {
    id: 'century-star',
    title: 'Ngôi Sao Chăm Chỉ',
    subjectId: 'all',
    tier: 'gold',
    icon: '⭐',
    description: 'Chăm chỉ vượt qua 25 bài học thực hành và bài tập trắc nghiệm.',
    criteriaDescription: 'Hoàn thành 25 bài học bất kỳ',
    targetCount: 25,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.length;
      return {
        isUnlocked: count >= 25,
        currentProgress: count,
        targetProgress: 25
      };
    }
  },
  {
    id: 'grand-master',
    title: 'Đại Sứ Tin Học',
    subjectId: 'all',
    tier: 'diamond',
    icon: '💎',
    description: 'Chinh phục 50 bài học! Danh hiệu cao quý nhất dành cho học sinh xuất sắc toàn diện.',
    criteriaDescription: 'Hoàn thành 50 bài học và giữ vững tinh thần hiếu học',
    targetCount: 50,
    checkUnlocked: ({ completedLessonIds }) => {
      const count = completedLessonIds.length;
      return {
        isUnlocked: count >= 50,
        currentProgress: count,
        targetProgress: 50
      };
    }
  }
];

export const ACHIEVEMENTS_MAP: Record<string, Achievement> = ACHIEVEMENTS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, Achievement>
);
