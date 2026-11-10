import { QuizQuestion } from '../types';

/**
 * 80 CÂU HỎI PHẦN 2 (CÂU 6 - 10) CHO 16 BÀI HỌC SGK TIN HỌC 3
 * Bám sát SGK Tin học 3 Kết Nối Tri Thức Với Cuộc Sống.
 * Tập trung vào mức độ Thông hiểu và Vận dụng thực tế.
 * Chuẩn kỷ luật 4 phương án cân bằng độ dài, chống đoán mò.
 */
export const SGK_EXTRA_GRADE_3: Record<number, QuizQuestion[]> = {
  // Bài 1: Thông tin và quyết định (id: 1)
  1: [
    {
      id: 3016,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi đi bộ muốn qua đường an toàn, người đi bộ quan sát thấy vạch kẻ trắng và đèn xanh cho người đi bộ bật sáng. Quyết định đúng là gì?',
      options: [
        'Bước qua đường trên lối vạch quy định',
        'Đứng chờ tiếp cho đến khi đèn đỏ bật',
        'Quay ngược trở lại không qua đường nữa',
        'Chạy thật nhanh chéo sang ngã tư khác'
      ],
      correctIndex: 0,
      explanation: 'Vạch trắng và đèn xanh là thông tin hướng dẫn giao thông; quyết định chuẩn là đi đúng làn vạch người đi bộ.'
    },
    {
      id: 3017,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Bạn Lan xem Thời khóa biểu ngày mai có môn Mỹ thuật nên bạn chủ động xếp hộp màu và giấy vẽ vào cặp. Thời khóa biểu đóng vai trò gì?',
      options: [
        'Là thông tin giúp Lan chuẩn bị bài học',
        'Là quyết định của riêng cá nhân bạn Lan',
        'Là phần thưởng của cô giáo chủ nhiệm tặng',
        'Là dụng cụ vẽ tranh trong giờ Mỹ thuật'
      ],
      correctIndex: 0,
      explanation: 'Thời khóa biểu mang thông tin lịch học các môn, giúp học sinh ra quyết định chuẩn bị đồ dùng học tập phù hợp.'
    },
    {
      id: 3018,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Bác tài xế lái xe nhìn thấy biển báo cấm rẽ trái cắm ở đầu ngã tư. Quyết định lái xe an toàn và đúng luật của bác là gì?',
      options: [
        'Không được rẽ trái mà đi thẳng hoặc rẽ phải',
        'Tăng ga nhanh rẽ sang trái trước khi bị nhắc',
        'Dừng xe lại giữa đường chờ cảnh sát giao thông',
        'Bấm còi xe thật to rồi tiếp tục rẽ sang trái'
      ],
      correctIndex: 0,
      explanation: 'Biển báo giao thông là thông tin chỉ dẫn cấm; quyết định chuẩn là tuân thủ không rẽ trái.'
    },
    {
      id: 3019,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Cuối giờ học, cô giáo dặn cả lớp: "Ngày mai các em mặc đồng phục thể thao để thi chạy". Lời dặn của cô giúp học sinh đưa ra quyết định gì?',
      options: [
        'Mặc đúng đồng phục thể thao vào sáng mai',
        'Nghỉ học ở nhà không cần đến trường nữa',
        'Mang theo bút màu và sách bài tập Mỹ thuật',
        'Mượn trước trang phục biểu diễn văn nghệ'
      ],
      correctIndex: 0,
      explanation: 'Lời dặn là thông tin truyền đạt từ giáo viên, giúp học sinh quyết định chuẩn bị đúng trang phục ngày mai.'
    },
    {
      id: 3020,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Bạn Nam đạp xe tới gần ngã tư thấy đèn tín hiệu chuyển sang màu vàng nhấp nháy chậm. Bạn Nam nên đưa ra quyết định nào sau đây?',
      options: [
        'Đi chậm lại và chú ý quan sát xung quanh',
        'Đạp xe thật nhanh để vượt qua ngã tư gấp',
        'Dừng hẳn xe lại dắt lên trên vỉa hè ngồi',
        'Nhắm mắt đạp xe qua đường vì được ưu tiên'
      ],
      correctIndex: 0,
      explanation: 'Đèn vàng nhấp nháy báo hiệu cần giảm tốc độ và quan sát an toàn trước khi di chuyển tiếp.'
    }
  ],

  // Bài 2: Xử lí thông tin (id: 2)
  2: [
    {
      id: 3026,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi chuông điện thoại của bố reo, em nghe thấy chuông, đoán là có người gọi và mang máy lại cho bố. Quá trình xử lí thông tin diễn ra ở đâu?',
      options: [
        'Diễn ra trong bộ não của em để ra quyết định',
        'Chỉ diễn ra ở trong chiếc điện thoại thông minh',
        'Diễn ra ở đôi bàn tay khi cầm vào chiếc máy',
        'Diễn ra tại loa phát ra tiếng chuông điện thoại'
      ],
      correctIndex: 0,
      explanation: 'Tai thu nhận âm thanh chuông, bộ não xử lí thông tin nhận ra người gọi và chỉ huy tay mang điện thoại cho bố.'
    },
    {
      id: 3027,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Một tấm ảnh chụp cả gia đình em đi nghỉ mát ở bãi biển thuộc dạng thông tin gì và em tiếp nhận qua giác quan nào?',
      options: [
        'Dạng hình ảnh và tiếp nhận qua đôi mắt (thị giác)',
        'Dạng âm thanh và tiếp nhận qua đôi tai (thính giác)',
        'Dạng văn bản và tiếp nhận qua các đầu ngón tay',
        'Dạng mùi vị và tiếp nhận qua khứu giác của mũi'
      ],
      correctIndex: 0,
      explanation: 'Bức ảnh chụp chứa thông tin dạng hình ảnh và màu sắc, được thu nhận qua thị giác của con người.'
    },
    {
      id: 3028,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Trong giờ chính tả, cô giáo đọc từng câu văn cho học sinh nghe và chép vào vở. Em đã chuyển đổi thông tin từ dạng nào sang dạng nào?',
      options: [
        'Từ dạng âm thanh (nghe) sang dạng chữ viết văn bản',
        'Từ dạng hình ảnh (nhìn) sang dạng âm thanh phát ra',
        'Từ dạng văn bản in sẵn sang dạng hình vẽ minh họa',
        'Từ dạng số liệu tính toán sang dạng âm nhạc thiếu nhi'
      ],
      correctIndex: 0,
      explanation: 'Tai thu nhận âm thanh lời cô đọc, bộ não xử lí và tay viết ra chữ viết văn bản trên trang vở.'
    },
    {
      id: 3029,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi vô tình chạm tay vào một chiếc cốc nước rất nóng, phản xạ tự nhiên của em là rụt tay lại ngay. Bộ phận nào đã chỉ huy hành động này?',
      options: [
        'Hệ thống thần kinh và não bộ xử lí ra lệnh rụt tay',
        'Chiếc cốc nước nóng tự đẩy ngón tay của em ra xa',
        'Không khí xung quanh làm ngón tay tự động co lại',
        'Đôi mắt nhìn thấy cốc nước rồi ra lệnh cho bàn tay'
      ],
      correctIndex: 0,
      explanation: 'Da tay cảm nhận nhiệt độ nóng truyền tín hiệu về hệ thần kinh trung ương, não xử lí khẩn cấp phát lệnh rút tay để tránh bỏng.'
    },
    {
      id: 3030,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Thiết bị nào của máy tính có vai trò tiếp nhận thông tin từ bên ngoài vào tương tự như các giác quan của con người?',
      options: [
        'Bàn phím, chuột máy tính và máy quét (thiết bị vào)',
        'Màn hình hiển thị hình ảnh và máy in phun màu văn bản',
        'Loa phát ra âm thanh và tai nghe gắn vào máy tính',
        'Thùng máy tính để bàn chứa bộ nguồn cấp dòng điện'
      ],
      correctIndex: 0,
      explanation: 'Bàn phím, chuột, micro, webcam là các thiết bị vào, giúp máy tính thu nhận dữ liệu như các giác quan thu nhận thông tin.'
    }
  ],

  // Bài 3: Máy tính và em (id: 3)
  3: [
    {
      id: 3036,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi cầm chuột máy tính bằng tay phải, ngón tay trỏ của em theo đúng chuẩn tư thế sẽ đặt lên vị trí nào của chuột?',
      options: [
        'Đặt lên nút chuột bên trái để thực hiện nhấp chọn',
        'Đặt lên nút chuột bên phải để mở menu ngữ cảnh phụ',
        'Đặt lên cạnh bên hông để giữ chặt thân chuột máy',
        'Đặt lên sợi dây cáp nối giữa chuột và thân máy tính'
      ],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay phải đặt ở nút trái, ngón giữa đặt ở nút phải, lòng bàn tay ôm nhẹ lưng chuột.'
    },
    {
      id: 3037,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Màn hình cảm ứng của máy tính bảng và điện thoại thông minh kết hợp đồng thời hai chức năng cơ bản nào?',
      options: [
        'Vừa là thiết bị hiển thị vừa là thiết bị nhập lệnh',
        'Chỉ dùng để hiển thị hình ảnh mà không điều khiển được',
        'Chỉ dùng để lưu trữ dữ liệu và không thể phát sáng',
        'Thay thế hoàn toàn bộ xử lí trung tâm CPU của máy tính'
      ],
      correctIndex: 0,
      explanation: 'Màn hình cảm ứng hiển thị kết quả làm việc và đồng thời cho phép ngón tay chạm trực tiếp để nhập lệnh điều khiển.'
    },
    {
      id: 3038,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Để nghe được giai điệu bài hát thiếu nhi phát ra từ máy tính mà không làm ảnh hưởng tới người xung quanh, em nên dùng thiết bị nào?',
      options: [
        'Tai nghe cá nhân cắm vào cổng âm thanh của máy tính',
        'Màn hình vi tính chỉnh độ sáng lên mức cao tối đa',
        'Chuột máy tính có đèn led chiếu sáng nhiều sắc màu',
        'Bàn phím cơ có tiếng gõ lách cách phát ra nhịp nhàng'
      ],
      correctIndex: 0,
      explanation: 'Tai nghe (Headphone) là thiết bị xuất âm thanh cá nhân giúp nghe âm thanh rõ ràng và giữ trật tự cho không gian chung.'
    },
    {
      id: 3039,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Bộ phận nào của máy tính giúp em nhập họ và tên của mình bằng chữ cái có dấu vào phần mềm học tập?',
      options: [
        'Bàn phím máy tính chứa các phím chữ cái và chữ số',
        'Màn hình máy tính hiển thị các bài tập kiểm tra trắc nghiệm',
        'Chuột máy tính điều khiển con trỏ di chuyển qua lại',
        'Thân máy tính chứa bộ xử lí trung tâm và bộ nhớ dữ liệu'
      ],
      correctIndex: 0,
      explanation: 'Bàn phím máy tính là thiết bị nhập chính dùng để gõ các chữ cái, con số và kí tự văn bản.'
    },
    {
      id: 3040,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Trên máy tính xách tay (Laptop), bộ phận cảm ứng phẳng nằm ngay dưới bàn phím được dùng để thay thế cho thiết bị nào?',
      options: [
        'Thay thế cho chuột máy tính truyền thống (Touchpad)',
        'Thay thế cho màn hình hiển thị hình ảnh của máy tính',
        'Thay thế cho loa phát ra âm thanh của máy tính xách tay',
        'Thay thế cho ổ cắm nguồn điện gắn vào pin của máy tính'
      ],
      correctIndex: 0,
      explanation: 'Vùng cảm ứng chuột (Touchpad) trên laptop cho phép di ngón tay để điều khiển con trỏ thay cho chuột rời.'
    }
  ],

  // Bài 4: Làm việc với máy tính (id: 4)
  4: [
    {
      id: 3046,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Tư thế ngồi đúng khoa học khi làm việc trước máy tính để bảo vệ mắt và cột sống là tư thế nào?',
      options: [
        'Lưng thẳng tự nhiên, hai bàn chân đặt bằng phẳng trên sàn',
        'Cúi sát mặt vào màn hình để nhìn rõ từng chữ cái nhỏ',
        'Nằm nghiêng trên ghế và gác một chân lên mặt bàn học',
        'Ngồi vẹo sang một bên và chống cằm liên tục trong giờ học'
      ],
      correctIndex: 0,
      explanation: 'Ngồi thẳng lưng, mắt nhìn ngang hoặc hơi chúc xuống màn hình, hai chân chạm sàn giúp bảo vệ cột sống và thị lực.'
    },
    {
      id: 3047,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khoảng cách an toàn và phù hợp từ mắt của em đến màn hình máy tính để không bị cận thị và mỏi mắt là bao nhiêu?',
      options: [
        'Khoảng từ 50 xăng-ti-mét đến 80 xăng-ti-mét (chiều dài cánh tay)',
        'Khoảng 10 xăng-ti-mét tính từ trán tới sát mặt kính màn hình',
        'Khoảng trên 2 mét cách xa khỏi bàn đặt máy tính học tập',
        'Khoảng cách tùy ý bất kì không cần quan tâm đến cự li ngồi'
      ],
      correctIndex: 0,
      explanation: 'Khoảng cách từ 50cm đến 80cm (khoảng một sải tay) là cự li chuẩn giúp mắt điều tiết dễ chịu khi nhìn màn hình.'
    },
    {
      id: 3048,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Để tắt máy tính (Shut down) an toàn và đúng quy trình kỹ thuật, em cần thực hiện các thao tác nào sau đây?',
      options: [
        'Vào Start menu, chọn biểu tượng Power rồi chọn nút Shut down',
        'Rút ngay phích cắm nguồn điện trực tiếp từ ổ cắm trên tường',
        'Nhấn giữ nút nguồn trên thân máy tính cho đến khi máy tắt ngấm',
        'Tắt cầu dao điện tổng của cả phòng thực hành Tin học trường'
      ],
      correctIndex: 0,
      explanation: 'Quy trình chuẩn: Start -> Power -> Shut down giúp hệ điều hành lưu lại dữ liệu và tắt các phần mềm an toàn.'
    },
    {
      id: 3049,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Trong phòng thực hành Tin học, nếu phát hiện dây điện máy tính bị tróc vỏ hoặc có mùi khét, em phải làm gì?',
      options: [
        'Báo ngay cho thầy cô giáo phụ trách phòng máy để xử lí an toàn',
        'Tự ý dùng tay không kéo mạnh sợi dây điện ra khỏi ổ cắm',
        'Lấy nước đổ trực tiếp lên thân máy tính để làm mát kịp thời',
        'Im lặng không nói gì và tiếp tục ngồi chơi trò chơi trên máy'
      ],
      correctIndex: 0,
      explanation: 'Học sinh không được chạm vào dây điện hở vì nguy cơ điện giật; phải lập tức thông báo cho giáo viên xử lí.'
    },
    {
      id: 3050,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Sau mỗi khoảng 30 đến 45 phút học tập trên máy tính, em nên thực hiện hoạt động nào để giữ gìn sức khỏe?',
      options: [
        'Đứng dậy vận động nhẹ nhàng và nhìn ra xa để mắt được nghỉ ngơi',
        'Tiếp tục chuyển sang chơi trò chơi điện tử trên máy tính bảng',
        'Bật độ sáng màn hình lên mức cao nhất để kích thích mắt tỉnh táo',
        'Ngồi yên tại chỗ nhắm mắt trong 2 giây rồi gõ phím tiếp tục ngay'
      ],
      correctIndex: 0,
      explanation: 'Quy tắc 20-20-20 và nghỉ ngơi sau mỗi 30-45 phút giúp cơ thể giải tỏa căng thẳng cơ xương và bảo vệ thị giác.'
    }
  ],

  // Bài 5: Sử dụng bàn phím (id: 5)
  5: [
    {
      id: 3056,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Phím dài nhất nằm ở hàng phím dưới cùng của bàn phím dùng để tạo khoảng cách giữa hai từ được gọi là phím gì?',
      options: [
        'Phím cách (phím Spacebar dài)',
        'Phím Enter dùng để chuyển dòng',
        'Phím Shift viết hoa chữ cái',
        'Phím Backspace xóa kí tự'
      ],
      correctIndex: 0,
      explanation: 'Phím Spacebar (phím cách) có hình dạng thanh dài nhất bàn phím, do ngón cái phụ trách tạo dấu cách giữa các từ.'
    },
    {
      id: 3057,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi đặt 10 ngón tay ở vị trí xuất phát trên hàng phím cơ sở, hai ngón tay cái sẽ được đặt nhẹ nhàng lên phím nào?',
      options: [
        'Đặt nhẹ nhàng lên phím cách (Spacebar)',
        'Đặt lên hai phím có gờ nổi F và J',
        'Đặt lên hai phím Shift ở hai bên',
        'Đặt lên phím Enter và phím Backspace'
      ],
      correctIndex: 0,
      explanation: 'Tám ngón tay đặt trên các phím A, S, D, F và J, K, L, ;; hai ngón cái đặt nhẹ trên phím cách dài.'
    },
    {
      id: 3058,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Để xuống một dòng mới khi đang soạn thảo văn bản hoặc gửi lệnh đi, em nhấn phím nào trên bàn phím?',
      options: [
        'Phím Enter trên bàn phím',
        'Phím Caps Lock viết hoa',
        'Phím Tab nhảy bước dài',
        'Phím Esc hủy bỏ thao tác'
      ],
      correctIndex: 0,
      explanation: 'Phím Enter có chức năng kết thúc một đoạn văn và di chuyển con trỏ soạn thảo xuống dòng kế tiếp.'
    },
    {
      id: 3059,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi đèn phím Caps Lock trên bàn phím đang bật sáng, các chữ cái em gõ ra trên màn hình sẽ có đặc điểm gì?',
      options: [
        'Tất cả các chữ cái gõ ra đều tự động viết in hoa',
        'Tất cả các chữ cái gõ ra đều chuyển thành chữ in thường',
        'Mọi kí tự gõ ra đều tự động biến mất trên màn hình',
        'Chữ cái gõ ra sẽ tự động được gạch chân phía dưới'
      ],
      correctIndex: 0,
      explanation: 'Phím Caps Lock dùng để bật/tắt chế độ gõ chữ in hoa toàn bộ trên bàn phím máy tính.'
    },
    {
      id: 3060,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Để xóa một chữ cái viết sai nằm ở ngay phía BÊN TRÁI của con trỏ soạn thảo văn bản, em dùng phím nào?',
      options: [
        'Phím Backspace (phím có mũi tên chỉ sang trái)',
        'Phím Delete (phím dùng để xóa kí tự bên phải)',
        'Phím Spacebar (phím dùng để tạo khoảng cách)',
        'Phím Shift (phím phối hợp để gõ chữ in hoa)'
      ],
      correctIndex: 0,
      explanation: 'Phím Backspace xóa kí tự bên trái con trỏ, còn phím Delete xóa kí tự ở bên phải con trỏ soạn thảo.'
    }
  ],

  // Bài 6: Khám phá thông tin trên Internet (id: 6)
  6: [
    {
      id: 3066,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Phần mềm dùng để mở và duyệt xem nội dung các trang web trên mạng Internet được gọi chung là gì?',
      options: [
        'Trình duyệt web (như Google Chrome, Cốc Cốc, Edge)',
        'Phần mềm gõ tiếng Việt Unikey trên máy tính để bàn',
        'Phần mềm tính toán tự động Microsoft Excel văn phòng',
        'Phần mềm diệt virus máy tính cài đặt từ nhà sản xuất'
      ],
      correctIndex: 0,
      explanation: 'Trình duyệt web (Web Browser) là ứng dụng chuyên biệt dùng để đọc và hiển thị các trang thông tin trên Internet.'
    },
    {
      id: 3067,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi di chuyển con trỏ chuột vào một dòng chữ hoặc hình ảnh có liên kết (hyperlink), con trỏ chuột thường đổi sang hình gì?',
      options: [
        'Hình bàn tay có ngón trỏ chỉ vào liên kết',
        'Hình đồng hồ cát đang xoay chuyển vòng tròn',
        'Hình mũi tên bốn hướng điều khiển kích thước',
        'Hình dấu cộng màu đen dùng để chọn ô tính'
      ],
      correctIndex: 0,
      explanation: 'Biểu tượng bàn tay chỉ ngón trỏ báo hiệu đây là siêu liên kết, nhấp chuột vào sẽ chuyển sang trang web mới.'
    },
    {
      id: 3068,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Dòng kí tự nào sau đây là ví dụ chuẩn về địa chỉ của một trang web chính thống trên Internet?',
      options: [
        'https://moet.gov.vn (trang Bộ Giáo dục và Đào tạo)',
        'C:\\ThuMucHocTap\\BaiKiemTraTinHocLop3.docx',
        'vhh0106@gmail.com (đây là một địa chỉ hòm thư điện tử)',
        'Lop 3A Truong Tieu Hoc Ket Noi Tri Thuc @2026'
      ],
      correctIndex: 0,
      explanation: 'Địa chỉ website (URL) bắt đầu bằng http:// hoặc https:// và kết thúc bằng tên miền như .gov.vn, .edu.vn.'
    },
    {
      id: 3069,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi đang tìm kiếm tư liệu học tập trên mạng, nếu xuất hiện trang web có hình ảnh đáng sợ hoặc nội dung xấu, em nên làm gì?',
      options: [
        'Đóng ngay trang web đó lại và báo cho thầy cô hoặc cha mẹ biết',
        'Tò mò bấm vào xem tiếp và tải các hình ảnh xấu đó về máy',
        'Chia sẻ đường link trang web đó cho các bạn trong lớp cùng xem',
        'Nhập số điện thoại của gia đình theo yêu cầu của trang web đó'
      ],
      correctIndex: 0,
      explanation: 'Đóng trang web độc hại và thông báo cho người lớn là cách ứng xử an toàn, thông minh của học sinh tiểu học.'
    },
    {
      id: 3070,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Để quay trở lại trang web em vừa xem ở ngay trước đó, em nhấp chuột vào nút lệnh có biểu tượng nào trên trình duyệt?',
      options: [
        'Nút mũi tên chỉ sang trái (nút Back quay lại)',
        'Nút mũi tên xoay tròn (nút Reload tải lại trang)',
        'Nút dấu nhân (nút Close đóng cửa sổ duyệt web)',
        'Nút hình ngôi nhà (nút Home về trang chủ mặc định)'
      ],
      correctIndex: 0,
      explanation: 'Nút mũi tên sang trái (Back) đưa em về trang web trước, mũi tên sang phải (Forward) đi tới trang kế tiếp.'
    }
  ],

  // Bài 7: Sắp xếp để dễ tìm (id: 7)
  7: [
    {
      id: 3076,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Việc sắp xếp sách giáo khoa và vở bài tập theo từng môn học trên giá sách ở góc học tập mang lại lợi ích gì?',
      options: [
        'Giúp em tìm kiếm sách vở nhanh chóng và học tập ngăn nắp',
        'Làm cho chiếc giá sách trở nên nặng hơn và dễ bị gãy đổ',
        'Mất rất nhiều thời gian mỗi khi cần lấy một cuốn vở ra viết',
        'Không mang lại bất kì lợi ích nào cho sinh hoạt hàng ngày'
      ],
      correctIndex: 0,
      explanation: 'Sắp xếp phân loại khoa học giúp tiết kiệm thời gian tìm kiếm đồ dùng học tập và rèn luyện thói quen ngăn nắp.'
    },
    {
      id: 3077,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Mẹ phân loại quần áo trong tủ: ngăn để quần áo mùa hè, ngăn để áo ấm mùa đông. Tiêu chí sắp xếp ở đây là gì?',
      options: [
        'Sắp xếp theo mùa và mục đích sử dụng trang phục',
        'Sắp xếp theo thứ tự ngẫu nhiên tiện tay nhét vào',
        'Sắp xếp dựa theo độ dài ngắn của từng chiếc mắc áo',
        'Sắp xếp theo giá tiền mua của từng bộ quần áo đẹp'
      ],
      correctIndex: 0,
      explanation: 'Tiêu chí sắp xếp là mùa và mục đích sử dụng, giúp dễ dàng chọn trang phục phù hợp với thời tiết.'
    },
    {
      id: 3078,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Trong danh bạ điện thoại của bố mẹ, tên của mọi người thường được tự động sắp xếp theo quy tắc nào để dễ tìm?',
      options: [
        'Sắp xếp theo thứ tự bảng chữ cái từ A đến Z của tên gọi',
        'Sắp xếp theo ngày sinh nhật từ đầu năm đến cuối năm',
        'Sắp xếp theo độ tuổi từ người nhỏ tuổi đến người lớn tuổi',
        'Sắp xếp theo độ dài ngắn của số điện thoại gọi đi'
      ],
      correctIndex: 0,
      explanation: 'Thứ tự bảng chữ cái Alphabet (A-Z) là quy tắc sắp xếp kinh điển giúp tra cứu tên người nhanh nhất.'
    },
    {
      id: 3079,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Nếu một tủ thuốc gia đình để lộn xộn các loại thuốc không nhãn mác, hậu quả nguy hiểm nào có thể xảy ra khi khẩn cấp?',
      options: [
        'Khó tìm được thuốc kịp thời và có nguy cơ uống nhầm thuốc',
        'Tủ thuốc sẽ tự động bị hỏng khóa và không mở ra được nữa',
        'Các vỉ thuốc sẽ tự động biến thành các loại kẹo ngọt ngon',
        'Không có bất kì nguy cơ nào vì thuốc nào cũng giống nhau'
      ],
      correctIndex: 0,
      explanation: 'Không sắp xếp nhãn mác rõ ràng sẽ khiến người nhà mất thời gian tìm kiếm lúc cấp cứu và dễ gây tai nạn uống nhầm.'
    },
    {
      id: 3080,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Lợi ích nổi bật và quan trọng nhất của việc sắp xếp đồ vật hoặc thông tin một cách hợp lí, khoa học là gì?',
      options: [
        'Tiết kiệm thời gian, công sức và tìm kiếm chính xác, dễ dàng',
        'Để người khác không bao giờ có thể tìm ra được đồ dùng của mình',
        'Làm cho số lượng đồ vật trong phòng tăng lên gấp nhiều lần',
        'Giúp máy tính hoạt động mà không cần phải cắm nguồn điện'
      ],
      correctIndex: 0,
      explanation: 'Mục tiêu cốt lõi của sắp xếp phân loại trong đời sống và Tin học là tìm kiếm nhanh chóng, chính xác.'
    }
  ],

  // Bài 8: Sơ đồ hình cây. Tổ chức thông tin trong máy tính (id: 8)
  8: [
    {
      id: 3086,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Trong cấu trúc sơ đồ hình cây, gốc cây (thư mục gốc) đóng vai trò là thành phần nào sau đây?',
      options: [
        'Thành phần cao nhất chứa tất cả các nhánh và lá bên trong',
        'Thành phần nhỏ nhất nằm ở tận cùng bên dưới của sơ đồ',
        'Thành phần bị ẩn đi và không bao giờ mở ra xem được',
        'Một tệp văn bản đơn lẻ không chứa bất kì thư mục nào'
      ],
      correctIndex: 0,
      explanation: 'Thư mục gốc (Root folder hoặc ổ đĩa) là nơi xuất phát cao nhất, từ đó phân nhánh ra các thư mục con.'
    },
    {
      id: 3087,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Một thư mục mẹ (Folder) trong máy tính có thể chứa bên trong những thành phần dữ liệu nào?',
      options: [
        'Có thể chứa các thư mục con và các tệp tài liệu bên trong',
        'Chỉ có thể chứa đúng một tệp duy nhất rồi tự động bị khóa',
        'Không bao giờ được phép chứa thêm bất kì thư mục nào khác',
        'Chỉ chứa được các bức ảnh và không lưu được bài tập Word'
      ],
      correctIndex: 0,
      explanation: 'Thư mục có thể chứa đồng thời nhiều thư mục con và các tệp tin thuộc nhiều định dạng khác nhau.'
    },
    {
      id: 3088,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Trên hệ điều hành Windows, thư mục (Folder) thường được minh họa bằng biểu tượng có hình ảnh gì?',
      options: [
        'Hình chiếc kẹp tài liệu màu vàng quen thuộc',
        'Hình quả địa cầu màu xanh da trời đang quay',
        'Hình thùng rác tái chế màu bạc trên màn hình',
        'Hình nốt nhạc màu đỏ phát ra âm thanh vui nhộn'
      ],
      correctIndex: 0,
      explanation: 'Biểu tượng chiếc cặp/kẹp hồ sơ màu vàng (Yellow folder icon) là biểu tượng kinh điển của thư mục.'
    },
    {
      id: 3089,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Sơ đồ cây gia phả: "Ông bà -> Bố mẹ, Chú bác -> Các con cháu" là ví dụ thực tế tương ứng với sơ đồ nào?',
      options: [
        'Sơ đồ hình cây phân cấp nhiều tầng trong Tin học',
        'Sơ đồ hình tròn khép kín không có điểm bắt đầu',
        'Sơ đồ đường thẳng một chiều không thể phân nhánh',
        'Sơ đồ ngẫu nhiên không tuân theo bất kì quy luật nào'
      ],
      correctIndex: 0,
      explanation: 'Cây gia phả là ví dụ minh họa trực quan và dễ hiểu nhất về cấu trúc sơ đồ hình cây phân cấp.'
    },
    {
      id: 3090,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Khi tạo cây thư mục để lưu bài tập lớp 3, cách tổ chức nào sau đây là khoa học và dễ tìm kiếm nhất?',
      options: [
        'Thư mục "Lop 3" chứa các thư mục con: "Toan", "Tieng Viet", "Tin hoc"',
        'Để tất cả hàng trăm bài tập lộn xộn trực tiếp ngoài màn hình Desktop',
        'Đặt tên thư mục bằng những kí tự ngẫu nhiên như "123", "abc", "xyz"',
        'Tạo 50 thư mục rỗng lồng vào nhau mà không đặt tên rõ ràng'
      ],
      correctIndex: 0,
      explanation: 'Tổ chức theo khối lớp và chia thành các thư mục môn học con giúp việc tìm kiếm bài tập cực kì ngăn nắp.'
    }
  ],

  // Bài 9: Thực hành với tệp và thư mục trong máy tính (id: 9)
  9: [
    {
      id: 3096,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Để tạo một thư mục mới trong cửa sổ File Explorer, em nhấp chuột vào nút lệnh nào trên dải lệnh?',
      options: [
        'Nút lệnh "New folder" (Thư mục mới)',
        'Nút lệnh "Delete" (Xóa bỏ thư mục)',
        'Nút lệnh "Rename" (Đổi tên thư mục)',
        'Nút lệnh "Properties" (Xem thuộc tính)'
      ],
      correctIndex: 0,
      explanation: 'Nút "New folder" hoặc tổ hợp phím Ctrl + Shift + N dùng để tạo nhanh một thư mục mới.'
    },
    {
      id: 3097,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Thao tác nhấp chuột phải vào thư mục rồi chọn lệnh "Rename" được dùng để thực hiện công việc gì?',
      options: [
        'Đổi tên mới cho thư mục theo ý muốn của em',
        'Xóa vĩnh viễn thư mục đó ra khỏi ổ cứng máy tính',
        'Tạo một bản sao nhân đôi chép sang ổ đĩa khác',
        'Khóa mật khẩu bảo vệ thư mục không cho ai mở'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Rename (hoặc phím F2) cho phép gõ lại tên mới cho tệp hoặc thư mục đã chọn.'
    },
    {
      id: 3098,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Khi không còn cần sử dụng một tệp bài tập nháp cũ, em chọn lệnh nào để chuyển tệp đó vào Thùng rác?',
      options: [
        'Chọn lệnh "Delete" (hoặc nhấn phím Delete trên bàn phím)',
        'Chọn lệnh "Copy" để sao chép thành một bản tài liệu mới',
        'Chọn lệnh "Cut" để di chuyển tệp sang một thư mục ẩn',
        'Chọn lệnh "Open" để mở tệp đó lên xem lại nội dung'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Delete chuyển tệp không dùng vào thùng rác (Recycle Bin) để giải phóng không gian lưu trữ.'
    },
    {
      id: 3099,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Để mở xem các tệp tài liệu nằm bên trong của một thư mục, em thực hiện thao tác chuột nào lên thư mục đó?',
      options: [
        'Nhấp đúp chuột (nhấn nút chuột trái hai lần liên tiếp thật nhanh)',
        'Nhấp chuột phải một lần rồi bấm phím cách trên bàn phím',
        'Giữ chuột trái và kéo rê biểu tượng thư mục ra góc màn hình',
        'Chỉ trỏ chuột vào thư mục mà không bấm bất kì nút chuột nào'
      ],
      correctIndex: 0,
      explanation: 'Thao tác nhấp đúp chuột trái (Double Click) là thao tác tiêu chuẩn để mở tệp hoặc thư mục trong máy tính.'
    },
    {
      id: 3100,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Để tránh nhầm lẫn khi tìm kiếm, tên của một tệp bài làm Tin học nên được đặt theo cách nào sau đây?',
      options: [
        'Đặt tên rõ nghĩa, không dấu: Bai_Ve_Ngoi_Nha_An_Lop3A',
        'Đặt tên bằng một dấu chấm hoặc một khoảng trắng duy nhất',
        'Đặt tên bằng kí tự lạ như: ???***///$$$###@@@',
        'Không cần đặt tên mà để mặc định là New Microsoft Word Document'
      ],
      correctIndex: 0,
      explanation: 'Tên tệp rõ ràng, chứa tên bài học và tên người làm giúp giáo viên và học sinh dễ dàng phân loại, chấm điểm.'
    }
  ],

  // Bài 10: Bảo vệ thông tin khi dùng máy tính (id: 10)
  10: [
    {
      id: 3106,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Thông tin cá nhân nào sau đây của em và gia đình TUYỆT ĐỐI KHÔNG được cung cấp cho người lạ trên mạng?',
      options: [
        'Mật khẩu tài khoản, số điện thoại riêng và địa chỉ nhà ở',
        'Tên bài hát thiếu nhi mà em yêu thích nghe trên YouTube',
        'Màu sắc chiếc bút mực mà em dùng để viết bài ở lớp',
        'Tên nhân vật hoạt hình Tom và Jerry mà em hay xem'
      ],
      correctIndex: 0,
      explanation: 'Mật khẩu, địa chỉ nhà, số điện thoại là thông tin riêng tư nhạy cảm, kẻ xấu có thể lợi dụng gây hại cho gia đình.'
    },
    {
      id: 3107,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Khi đặt mật khẩu (Password) bảo vệ tài khoản học tập, mật khẩu nào sau đây được coi là an toàn và khó đoán?',
      options: [
        'Mật khẩu gồm cả chữ hoa, chữ thường, số và kí tự đặc biệt',
        'Mật khẩu là dãy số liên tiếp đơn giản: 123456 hoặc 000000',
        'Mật khẩu trùng với đúng ngày tháng năm sinh nhật của em',
        'Mật khẩu đặt đúng bằng tên riêng không dấu của bản thân em'
      ],
      correctIndex: 0,
      explanation: 'Mật khẩu mạnh kết hợp chữ hoa, chữ thường, số và kí hiệu, không dùng ngày sinh hay số điện thoại dễ đoán.'
    },
    {
      id: 3108,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Khi sử dụng máy tính chung ở phòng máy của trường hoặc nơi công cộng, trước khi đứng dậy ra về em cần làm gì?',
      options: [
        'Đăng xuất (Log out) khỏi tài khoản cá nhân và đóng ứng dụng',
        'Để nguyên tài khoản đang đăng nhập để người khác dùng tiếp',
        'Ghi mật khẩu của mình lên mặt bàn học cho các bạn cùng biết',
        'Đổi mật khẩu tài khoản thành chữ số 1 rồi bỏ về không đăng xuất'
      ],
      correctIndex: 0,
      explanation: 'Đăng xuất tài khoản trên thiết bị công cộng giúp bảo vệ thông tin cá nhân không bị người khác truy cập trái phép.'
    },
    {
      id: 3109,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Một người lạ trên mạng nhắn tin hứa tặng em điện thoại xịn và yêu cầu gửi ảnh thẻ căn cước của bố mẹ. Em nên làm gì?',
      options: [
        'Tuyệt đối không gửi và thông báo ngay cho bố mẹ hoặc thầy cô biết',
        'Lén lấy thẻ căn cước chụp ảnh gửi ngay để nhận phần quà giá trị',
        'Gửi kèm thêm cả số tài khoản ngân hàng của gia đình cho người đó',
        'Rủ các bạn trong lớp cùng làm theo để được nhận nhiều điện thoại'
      ],
      correctIndex: 0,
      explanation: 'Đây là chiêu trò lừa đảo nguy hiểm trên mạng; học sinh phải lập tức báo cho người lớn để kịp thời ngăn chặn.'
    },
    {
      id: 3110,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Tác hại nguy hiểm nhất của việc để lộ mật khẩu tài khoản học tập hoặc thư điện tử cho người khác là gì?',
      options: [
        'Kẻ xấu có thể mạo danh em để gửi tin nhắn xấu hoặc xóa hết bài làm',
        'Máy tính của em sẽ tự động bị hỏng màn hình và không bật lên được',
        'Bàn phím máy tính sẽ tự động bị đổi các vị trí phím chữ cái',
        'Chuột máy tính sẽ tự động phát ra tiếng kêu tít tít liên tục'
      ],
      correctIndex: 0,
      explanation: 'Lộ mật khẩu khiến tài khoản bị chiếm đoạt, kẻ xấu có thể mạo danh em để lừa đảo hoặc phá hủy dữ liệu học tập.'
    }
  ],

  // Bài 11: Bài trình chiếu của em (id: 11)
  11: [
    {
      id: 3116,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Phần mềm thông dụng nhất hiện nay được sử dụng để thiết kế các bài trình chiếu sinh động trên máy tính là gì?',
      options: [
        'Phần mềm Microsoft PowerPoint (hoặc Google Slides)',
        'Phần mềm gõ mười ngón bàn phím Mario Teaches Typing',
        'Phần mềm máy tính cầm tay tính toán phép cộng Calculator',
        'Phần mềm nghe nhạc và xem video Windows Media Player'
      ],
      correctIndex: 0,
      explanation: 'Microsoft PowerPoint là phần mềm ứng dụng chuyên nghiệp dùng để tạo các bài thuyết trình, bài giảng điện tử.'
    },
    {
      id: 3117,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Trang đầu tiên (Trang tiêu đề) của một bài trình chiếu giới thiệu bản thân thường chứa nội dung nào sau đây?',
      options: [
        'Tên chủ đề bài trình chiếu, họ tên người trình bày và lớp học',
        'Toàn bộ danh sách bài tập toán học khó của cả học kì một',
        'Một đoạn văn bản dài 500 từ kể lại chuyến tham quan dã ngoại',
        'Bảng điểm chi tiết tất cả các môn học của các bạn trong lớp'
      ],
      correctIndex: 0,
      explanation: 'Trang tiêu đề giới thiệu tên chủ đề thuyết trình và thông tin người báo cáo (tên, lớp, trường).'
    },
    {
      id: 3118,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để thêm một trang chiếu mới (New Slide) vào bài thuyết trình đang làm, em nhấp vào nút lệnh nào?',
      options: [
        'Nút lệnh "New Slide" trên dải lệnh Home (phím Ctrl + M)',
        'Nút lệnh "Delete" trên bàn phím để xóa bớt một trang cũ',
        'Nút lệnh "Save" hình chiếc đĩa mềm để lưu tệp trình chiếu',
        'Nút lệnh "Close" hình dấu nhân màu đỏ ở góc trên cùng'
      ],
      correctIndex: 0,
      explanation: 'Nút "New Slide" hoặc tổ hợp phím tắt Ctrl + M dùng để chèn thêm một trang chiếu mới vào bài.'
    },
    {
      id: 3119,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi trình bày nội dung chữ viết trên một trang chiếu, quy tắc nào giúp khán giả dễ theo dõi nhất?',
      options: [
        'Chữ viết ngắn gọn, cỡ chữ to rõ ràng và màu tương phản với nền',
        'Gõ thật nhiều chữ li ti phủ kín toàn bộ trang chiếu từ trên xuống',
        'Dùng màu chữ vàng nhạt trên nền màu trắng tinh khó quan sát',
        'Dùng 10 phông chữ khác nhau trên cùng một trang chiếu ngắn'
      ],
      correctIndex: 0,
      explanation: 'Quy tắc trình chiếu: Chữ ngắn gọn, nổi bật, cỡ chữ đủ lớn và độ tương phản cao với màu nền slide.'
    },
    {
      id: 3120,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để bắt đầu chiếu toàn màn hình bài thuyết trình từ trang đầu tiên cho thầy cô và các bạn xem, em nhấn phím nào?',
      options: [
        'Nhấn phím F5 trên hàng phím chức năng của bàn phím',
        'Nhấn phím Spacebar trên hàng phím dưới cùng bàn phím',
        'Nhấn phím Caps Lock ở phía bên trái của bàn phím máy tính',
        'Nhấn phím Esc ở góc trên cùng bên trái của bàn phím'
      ],
      correctIndex: 0,
      explanation: 'Phím F5 là phím tắt kinh điển để bắt đầu trình chiếu bài thuyết trình ở chế độ toàn màn hình từ trang đầu tiên.'
    }
  ],

  // Bài 12: Tìm hiểu về thế giới tự nhiên (id: 12)
  12: [
    {
      id: 3126,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Sử dụng phần mềm giáo dục mô phỏng thế giới tự nhiên trên máy tính giúp học sinh khám phá điều gì?',
      options: [
        'Quan sát trực quan đời sống động thực vật và các hiện tượng thiên nhiên',
        'Thay thế hoàn toàn việc ăn uống và sinh hoạt hàng ngày của con người',
        'Làm cho chiếc máy tính tự động tưới nước cho cây xanh ngoài vườn',
        'Tạo ra các loài động vật thật chạy nhảy trong phòng khách gia đình'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm mô phỏng giúp học sinh quan sát sinh động các hiện tượng tự nhiên mà mắt thường khó thấy trực tiếp.'
    },
    {
      id: 3127,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để tìm kiếm video mô tả quá trình phát triển từ nòng nọc thành ếch, từ khóa tìm kiếm nào sau đây là hiệu quả nhất?',
      options: [
        '"Vòng đời của loài ếch" hoặc "Sự phát triển của ếch"',
        'Chỉ gõ một chữ cái "E" duy nhất vào ô tìm kiếm Google',
        'Gõ câu hỏi: "Chào bạn bạn có biết con ếch ở đâu không ạ"',
        'Gõ địa chỉ nhà của em vào thanh tìm kiếm của trình duyệt'
      ],
      correctIndex: 0,
      explanation: 'Từ khóa ngắn gọn, chính xác, chứa các thuật ngữ trọng tâm giúp máy tìm kiếm trả về đúng video cần học.'
    },
    {
      id: 3128,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi sử dụng mô hình 3D quả địa cầu trên máy tính, em dùng chuột thực hiện thao tác nào để phóng to xem rõ một lục địa?',
      options: [
        'Lăn bánh lăn chuột về phía trước để phóng to hình ảnh',
        'Nhấp chuột phải liên tục vào thanh tiêu đề trên cùng',
        'Nhấn phím Caps Lock trên bàn phím để phóng to bản đồ',
        'Rút dây chuột máy tính ra rồi cắm lại vào cổng USB khác'
      ],
      correctIndex: 0,
      explanation: 'Bánh lăn chuột (Scroll wheel) là công cụ thu phóng (Zoom in/Zoom out) trực quan trên hầu hết các phần mềm bản đồ 3D.'
    },
    {
      id: 3129,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Lợi ích nổi bật của việc học tập thế giới tự nhiên qua hình ảnh và video trên Internet là gì?',
      options: [
        'Mở rộng hiểu biết về những vùng đất xa xôi mà em chưa có dịp đặt chân tới',
        'Làm cho em không cần phải học bài và làm bài tập về nhà nữa',
        'Giúp các loài động vật hoang dã tự động đến gần làm quen với em',
        'Biến màn hình máy tính thành một chiếc kính viễn vọng không gian thực tế'
      ],
      correctIndex: 0,
      explanation: 'Internet cung cấp kho tri thức khổng lồ về địa lý, thiên nhiên toàn cầu, giúp học sinh mở rộng tầm nhìn hiểu biết.'
    },
    {
      id: 3130,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi xem các thông tin về khoa học tự nhiên trên mạng, em nên ưu tiên lựa chọn nguồn thông tin nào để đảm bảo độ chính xác?',
      options: [
        'Website giáo dục chính thống, kênh khoa học uy tín có kiểm duyệt',
        'Các trang mạng xã hội không rõ tác giả đăng tải thông tin giật gân',
        'Bất kì bài viết nào xuất hiện đầu tiên không cần kiểm chứng tác giả',
        'Các đường link quảng cáo trò chơi điện tử nhấp nháy trên màn hình'
      ],
      correctIndex: 0,
      explanation: 'Chọn nguồn website giáo dục uy tín (như National Geographic, cổng Bộ GD&ĐT) đảm bảo kiến thức chuẩn xác.'
    }
  ],

  // Bài 13: Luyện tập sử dụng chuột (id: 13)
  13: [
    {
      id: 3136,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Thao tác nhấn nút chuột trái một lần rồi thả ngón tay ra ngay lập tức được gọi là thao tác gì?',
      options: [
        'Thao tác nhấp chuột (Click chuột trái)',
        'Thao tác nhấp đúp chuột (Double click)',
        'Thao tác kéo thả chuột (Drag and drop)',
        'Thao tác di chuyển chuột tự do trên bàn'
      ],
      correctIndex: 0,
      explanation: 'Nhấp chuột (Click) là thao tác cơ bản nhất, dùng để chọn một đối tượng hoặc bấm một nút lệnh.'
    },
    {
      id: 3137,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để mở nhanh một trò chơi học tập trên màn hình nền Desktop, em thực hiện thao tác chuột nào lên biểu tượng trò chơi?',
      options: [
        'Nhấp đúp chuột trái vào biểu tượng trò chơi',
        'Chỉ trỏ chuột vào biểu tượng rồi để yên tay',
        'Nhấp chuột phải một lần rồi bấm phím cách',
        'Lăn bánh lăn chuột liên tục trên bàn di chuột'
      ],
      correctIndex: 0,
      explanation: 'Nhấp đúp chuột trái (Double click) là thao tác tiêu chuẩn để khởi động một phần mềm trên Desktop.'
    },
    {
      id: 3138,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Thao tác nhấn giữ nút chuột trái, di chuyển con trỏ đưa tệp vào thư mục rồi thả ngón tay ra gọi là gì?',
      options: [
        'Thao tác kéo thả chuột (Drag and drop)',
        'Thao tác nhấp chuột phải mở thực đơn ngữ cảnh',
        'Thao tác cuộn trang màn hình lên xuống',
        'Thao tác khóa nút chuột trái trên bàn di'
      ],
      correctIndex: 0,
      explanation: 'Kéo thả chuột (Drag and Drop) dùng để di chuyển đối tượng, sắp xếp tệp hoặc vẽ hình trên máy tính.'
    },
    {
      id: 3139,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Bánh lăn (nút cuộn) nằm ở giữa hai nút chuột trái và phải thường được dùng để làm công việc gì?',
      options: [
        'Cuộn màn hình văn bản lên trên hoặc xuống dưới dễ dàng',
        'Bật tắt nguồn điện cấp cho toàn bộ dàn máy tính để bàn',
        'Xóa sạch toàn bộ các thư mục bài tập đang mở trên máy tính',
        'Thay đổi màu sắc đèn led của bàn phím cơ kết nối máy tính'
      ],
      correctIndex: 0,
      explanation: 'Nút cuộn (Scroll wheel) giúp di chuyển màn hình trang web, tài liệu lên hoặc xuống mà không cần kéo thanh cuộn.'
    },
    {
      id: 3140,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi muốn mở bảng chọn chức năng phụ (menu ngữ cảnh) chứa các lệnh như Cut, Copy, Rename, em nhấp nút chuột nào?',
      options: [
        'Nhấp nút chuột phải vào đối tượng cần thao tác',
        'Nhấp nút chuột trái một lần vào thanh tiêu đề',
        'Nhấn giữ đồng thời hai nút chuột trong mười giây',
        'Lăn bánh lăn chuột ngược chiều kim đồng hồ'
      ],
      correctIndex: 0,
      explanation: 'Nhấp chuột phải (Right-click) mở bảng chọn ngữ cảnh (Context Menu) hiển thị các tác vụ có thể thực hiện với đối tượng.'
    }
  ],

  // Bài 14: Em thực hiện công việc như thế nào? (id: 14)
  14: [
    {
      id: 3146,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Việc chia một công việc lớn thành các bước nhỏ tuần tự rõ ràng mang lại lợi ích gì trong giải quyết vấn đề?',
      options: [
        'Giúp công việc trở nên dễ làm, không bị bỏ sót và dễ thành công',
        'Làm cho công việc trở nên rắc rối và mất nhiều thời gian hơn',
        'Làm cho máy tính không thể hỗ trợ con người giải quyết bài toán',
        'Khiến cho các bạn trong nhóm không biết phải bắt đầu từ đâu'
      ],
      correctIndex: 0,
      explanation: 'Chia nhỏ vấn đề thành các bước tuần tự (tư duy thuật toán) là kỹ năng cốt lõi giúp giải quyết mọi nhiệm vụ hiệu quả.'
    },
    {
      id: 3147,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong quy trình các bước đánh răng buổi sáng, bước nào sau đây bắt buộc phải thực hiện TRƯỚC bước chải răng?',
      options: [
        'Lấy kem đánh răng lên bàn chải và súc miệng bằng nước sạch',
        'Rửa sạch bàn chải đánh răng và cắm vào cốc đựng bàn chải',
        'Lau khô miệng bằng khăn bông mềm treo trên giá khăn mặt',
        'Cất tuýp kem đánh răng vào lại ngăn tủ thuốc của gia đình'
      ],
      correctIndex: 0,
      explanation: 'Quy trình tuần tự đòi hỏi phải lấy kem đánh răng trước thì mới có thể tiến hành chải răng.'
    },
    {
      id: 3148,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Thứ tự các bước hợp lí để pha một cốc nước cam ngon là gì?',
      options: [
        'Rửa cam -> Cắt đôi quả cam -> Vắt lấy nước -> Thêm đường và khuấy đều',
        'Thêm đường -> Uống hết -> Cắt cam -> Rửa vỏ cam sau khi uống xong',
        'Vắt cam khi chưa cắt quả -> Cho đá lạnh -> Rửa quả cam sau cùng',
        'Uống nước trước -> Sau đó mới vắt cam vào chiếc cốc rỗng'
      ],
      correctIndex: 0,
      explanation: 'Các bước phải diễn ra theo đúng thứ tự nhân quả: Sơ chế -> Chế biến -> Hoàn thiện sản phẩm.'
    },
    {
      id: 3149,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Bản vẽ hướng dẫn từng bước gấp chiếc máy bay giấy từ một tờ giấy trắng tương ứng với khái niệm nào trong Tin học?',
      options: [
        'Thuật toán (Quy trình các bước chỉ dẫn từng bước để hoàn thành việc)',
        'Một bức tranh phong cảnh vẽ tự do không theo quy tắc nào',
        'Một tệp văn bản bài tập Word lưu trên ổ đĩa máy tính',
        'Một loại virus máy tính lây lan qua thư điện tử trên mạng'
      ],
      correctIndex: 0,
      explanation: 'Bản hướng dẫn từng bước (Step-by-step instructions) chính là dạng biểu diễn cơ bản của một thuật toán.'
    },
    {
      id: 3150,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Nếu em thực hiện sai thứ tự các bước trong quy trình nấu một gói mì tôm (như chưa đun sôi nước đã đổ vào ăn), hậu quả là gì?',
      options: [
        'Mì sẽ không chín được và món ăn không đạt được kết quả như mong muốn',
        'Bát mì sẽ tự động nấu chín thơm ngon hơn bình thường gấp đôi',
        'Không có bất kì ảnh hưởng nào vì thứ tự các bước không quan trọng',
        'Chiếc bếp gas sẽ tự động biến thành một chiếc máy tính xách tay'
      ],
      correctIndex: 0,
      explanation: 'Thực hiện sai thứ tự các bước trong quy trình sẽ dẫn đến kết quả sai lệch hoặc hỏng công việc.'
    }
  ],

  // Bài 15: Công việc được thực hiện theo điều kiện (id: 15)
  15: [
    {
      id: 3156,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong câu: "Nếu ngày mai trời mưa thì em sẽ đi học bằng áo mưa", phần đóng vai trò là ĐIỀU KIỆN là gì?',
      options: [
        'Điều kiện là: "Ngày mai trời mưa"',
        'Điều kiện là: "Em sẽ đi học bằng áo mưa"',
        'Điều kiện là: "Em thức dậy vào buổi sáng"',
        'Điều kiện là: "Bạn Lan mang theo chiếc ô che"'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc "Nếu [Điều kiện] Thì [Việc cần làm]". Ở đây điều kiện cần kiểm tra là "Ngày mai trời mưa".'
    },
    {
      id: 3157,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi tham gia giao thông trên đường phố, việc dừng xe trước vạch dừng chỉ được thực hiện khi thỏa mãn điều kiện nào?',
      options: [
        'Khi đèn tín hiệu giao thông chuyển sang màu đỏ',
        'Khi trời bỗng nhiên đổ cơn mưa rào mùa hạ',
        'Khi nhìn thấy có người quen đang đi ở phía sau',
        'Khi đồng hồ đeo tay chỉ đúng mười giờ trưa'
      ],
      correctIndex: 0,
      explanation: 'Điều kiện luật giao thông: "Nếu gặp đèn đỏ thì phải dừng xe lại trước vạch dừng".'
    },
    {
      id: 3158,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Quy tắc: "Nếu bài kiểm tra đạt từ 9 điểm trở lên thì được nhận bông hoa điểm mười". Nếu bạn Nam đạt 8 điểm thì điều gì xảy ra?',
      options: [
        'Bạn Nam chưa được nhận bông hoa điểm mười vì điều kiện chưa thỏa mãn',
        'Bạn Nam vẫn được nhận bông hoa điểm mười vì 8 điểm là điểm tốt',
        'Bạn Nam bị cô giáo phạt trừ hai bông hoa của tuần trước',
        'Bài kiểm tra của bạn Nam tự động được cộng thêm hai điểm nữa'
      ],
      correctIndex: 0,
      explanation: 'Vì 8 < 9, điều kiện không thỏa mãn (Sai), nên công việc nhận bông hoa điểm mười không được thực hiện.'
    },
    {
      id: 3159,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Cấu trúc diễn tả một công việc chỉ được thực hiện khi một điều kiện cho trước xảy ra đúng được gọi là cấu trúc gì?',
      options: [
        'Cấu trúc rẽ nhánh (điều kiện dạng Nếu - Thì)',
        'Cấu trúc tuần tự thực hiện lần lượt từ trên xuống',
        'Cấu trúc lặp đi lặp lại vô tận không bao giờ dừng',
        'Cấu trúc song song hai việc cùng làm một lúc'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc rẽ nhánh (Conditional structure) là cấu trúc điều khiển công việc dựa trên kết quả kiểm tra điều kiện.'
    },
    {
      id: 3160,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong chương trình điều khiển Robot: "Nếu phía trước có bức tường thì Robot rẽ phải". Nếu phía trước trống trải thì Robot làm gì?',
      options: [
        'Robot không rẽ phải mà tiếp tục đi thẳng về phía trước',
        'Robot tự động tắt nguồn và đứng yên tại chỗ mãi mãi',
        'Robot quay tròn liên tục mười vòng rồi mới dừng lại',
        'Robot tự động biến mất khỏi bản đồ mê cung thử thách'
      ],
      correctIndex: 0,
      explanation: 'Khi điều kiện "gặp bức tường" không xảy ra, Robot bỏ qua lệnh rẽ phải và tiếp tục hành động đi thẳng bình thường.'
    }
  ],

  // Bài 16: Công việc của em và sự trợ giúp của máy tính (id: 16)
  16: [
    {
      id: 3166,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Công việc nào sau đây máy tính có thể hỗ trợ em thực hiện với tốc độ cực nhanh, chính xác và không biết mệt mỏi?',
      options: [
        'Thực hiện các phép tính số học lớn và lưu trữ hàng nghìn cuốn sách',
        'Tự động đi bộ đến trường học thay cho học sinh vào mỗi buổi sáng',
        'Tự động ăn cơm và uống sữa để bổ sung chất dinh dưỡng cho cơ thể',
        'Tự động quét dọn sân trường và tưới nước cho các bồn hoa cây cảnh'
      ],
      correctIndex: 0,
      explanation: 'Máy tính là công cụ tính toán và xử lí thông tin siêu việt, xử lí hàng triệu phép tính trong tích tắc.'
    },
    {
      id: 3167,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi em muốn luyện tập gõ bàn phím nhanh mười ngón, phần mềm máy tính hỗ trợ em bằng cách nào?',
      options: [
        'Hướng dẫn ngón tay đặt đúng phím, tính tốc độ gõ và báo lỗi sai kịp thời',
        'Tự động gõ thay toàn bộ chữ cho em mà em không cần cử động ngón tay',
        'Làm cho bàn phím máy tính tự phát ra tiếng đàn piano du dương',
        'Tự động tắt máy tính mỗi khi em gõ đúng một chữ cái trên màn hình'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm luyện gõ bàn phím mô phỏng bàn tay, phản hồi lỗi sai tức thời và đo đạc tốc độ WPM của học sinh.'
    },
    {
      id: 3168,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Điều nào sau đây máy tính KHÔNG THỂ thay thế con người thực hiện được trong cuộc sống?',
      options: [
        'Cảm nhận tình cảm yêu thương, lòng trắc ẩn và sự quan tâm bạn bè',
        'Lưu trữ hàng triệu bức ảnh kỉ niệm của gia đình trong ổ cứng',
        'Truyền gửi thông tin liên lạc đi xa qua đường truyền Internet',
        'Chơi các ván cờ vua theo các quy tắc và nước đi đã được lập trình'
      ],
      correctIndex: 0,
      explanation: 'Máy tính là công cụ do con người tạo ra, không có cảm xúc, tình cảm hay lương tri như con người.'
    },
    {
      id: 3169,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Để chuẩn bị một bài thuyết trình về bảo vệ môi trường, máy tính hỗ trợ em những khâu công việc nào?',
      options: [
        'Tìm kiếm hình ảnh tư liệu trên mạng, gõ bài viết và tạo slide trình chiếu',
        'Tự động đứng lên bục giảng thuyết trình thay cho em trước cả lớp',
        'Tự động quét dọn toàn bộ rác thải nhựa ở bãi biển ngoài đời thực',
        'Tự động chấm điểm mười cho bài thuyết trình mà không cần cô giáo'
      ],
      correctIndex: 0,
      explanation: 'Máy tính giúp thu thập thông tin, soạn thảo tài liệu và trình chiếu hình ảnh trực quan cho bài thuyết trình.'
    },
    {
      id: 3170,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Thái độ đúng đắn, thông minh nhất của học sinh tiểu học khi sử dụng máy tính phục vụ học tập hàng ngày là gì?',
      options: [
        'Sử dụng máy tính có mục đích rõ ràng, điều độ thời gian và có sự giám sát của người lớn',
        'Ngồi chơi trò chơi điện tử thâu đêm suốt sáng quên cả việc học bài trên lớp',
        'Tin tưởng tuyệt đối vào mọi thông tin trên mạng mà không cần kiểm chứng lại',
        'Tự ý tải các phần mềm lạ không rõ nguồn gốc về cài đặt vào máy tính gia đình'
      ],
      correctIndex: 0,
      explanation: 'Sử dụng máy tính thông minh, có chừng mực thời gian, phục vụ việc học bổ ích dưới sự hướng dẫn của gia đình.'
    }
  ]
};
