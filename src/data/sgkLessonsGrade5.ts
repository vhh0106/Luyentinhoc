import { Lesson } from '../types';

/**
 * 16 BÀI HỌC SGK TIN HỌC 5 - BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Mỗi bài học có đúng 5 CÂU HỎI TRẮC NGHIỆM CHUYÊN SÂU (tổng cộng 80 câu hỏi).
 * Tất cả phương án có độ dài cân bằng tuyệt đối, loại bỏ mẹo chọn câu dài nhất.
 */
export const SGK_LESSONS_GRADE_5: Lesson[] = [
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM
  {
    id: 1,
    level: 1,
    grade: 5,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 1: Em có thể làm gì với máy tính?',
    desc: 'Khám phá vai trò của máy tính trong học tập, giao tiếp, sáng tạo sản phẩm số và thói quen an toàn.',
    type: 'quiz',
    questions: [
      {
        id: 5011,
        grade: 5,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Sản phẩm nào sau đây được xem là một "sản phẩm số" do học sinh tự tạo ra bằng máy tính?',
        options: [
          'Bài trình chiếu giới thiệu danh lam thắng cảnh',
          'Bức tranh vẽ bằng bút sáp màu trên tờ giấy',
          'Mô hình ngôi nhà làm bằng bìa các-tông cứng',
          'Cuốn tập vở ô ly ghi bài chép tay trên lớp'
        ],
        correctIndex: 0,
        explanation: 'Sản phẩm số là sản phẩm được tạo ra, lưu trữ và xử lý dưới dạng dữ liệu điện tử trên máy tính.'
      },
      {
        id: 5012,
        grade: 5,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi cần thảo luận nhóm trực tuyến với các bạn ở xa, em có thể sử dụng ứng dụng nào?',
        options: [
          'Phần mềm họp trực tuyến như Google Meet',
          'Phần mềm máy tính bỏ túi Calculator',
          'Phần mềm soạn thảo văn bản Word cơ bản',
          'Phần mềm gõ dấu bàn phím tiếng Việt Unikey'
        ],
        correctIndex: 0,
        explanation: 'Google Meet, Zoom, MS Teams là các ứng dụng hội nghị trực tuyến giúp giao tiếp và học nhóm từ xa.'
      },
      {
        id: 5013,
        grade: 5,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Thao tác an toàn nhất trước khi rút thẻ nhớ hoặc USB ra khỏi máy tính để bàn là gì?',
        options: [
          'Chọn lệnh Eject an toàn trên thanh tác vụ',
          'Rút phích cắm nguồn điện của toàn bộ máy',
          'Tắt ngay màn hình máy tính rồi rút nhanh ra',
          'Kéo mạnh thiết bị ra ngoài khi đèn đang nhấp nháy'
        ],
        correctIndex: 0,
        explanation: 'Lệnh Eject giúp hệ điều hành hoàn tất việc ghi dữ liệu vào USB trước khi ngắt kết nối an toàn.'
      },
      {
        id: 5014,
        grade: 5,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Thiết bị thông minh nào sau đây tích hợp bộ vi xử lý và có thể kết nối mạng Internet?',
        options: [
          'Đồng hồ thông minh theo dõi sức khỏe cá nhân',
          'Chiếc đồng hồ báo thức cơ học chạy bằng dây cót',
          'Bình giữ nhiệt đựng nước nóng bằng kim loại',
          'Thước kẻ kẻ bảng bằng nhựa dẻo trong suốt'
        ],
        correctIndex: 0,
        explanation: 'Đồng hồ thông minh (Smartwatch) là thiết bị số thông minh có chip xử lý và kết nối Internet.'
      },
      {
        id: 5015,
        grade: 5,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Để bảo vệ sức khỏe khi sử dụng máy tính liên tục trong một giờ, em nên thực hiện điều gì?',
        options: [
          'Nghỉ ngơi và nhìn ra xa trong vài phút',
          'Tăng độ sáng màn hình lên mức cao tối đa',
          'Ngồi thật sát mắt vào sát tấm kính màn hình',
          'Bật âm lượng loa to hết cỡ để nghe rõ ràng'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc 20-20-20 khuyên sau một khoảng thời gian làm việc nên cho mắt nghỉ ngơi nhìn xa để thư giãn.'
      }
    ]
  },

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET
  {
    id: 2,
    level: 2,
    grade: 5,
    topicCode: 'cd2_mang_internet',
    title: 'Bài 2: Tìm kiếm thông tin trên website',
    desc: 'Lựa chọn website uy tín, tra cứu thông tin học tập và nhận diện các biểu hiện của tin giả, lừa đảo.',
    type: 'quiz',
    questions: [
      {
        id: 5021,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Địa chỉ trang web nào sau đây có độ tin cậy cao nhất khi tra cứu thông tin học tập của Bộ Giáo dục?',
        options: [
          'Trang web chính thống có đuôi tên miền .gov.vn',
          'Trang mạng xã hội do một cá nhân tự mở tự do',
          'Trang web chứa nhiều quảng cáo trò chơi điện tử',
          'Trang blog cá nhân không có tên tác giả rõ ràng'
        ],
        correctIndex: 0,
        explanation: 'Tên miền .gov.vn dành riêng cho các cơ quan chính phủ và bộ ngành nhà nước Việt Nam, độ uy tín cao nhất.'
      },
      {
        id: 5022,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Dấu hiệu nào sau đây cho thấy một bài viết trên Internet có nguy cơ là tin giả mạo hoặc sai sự thật?',
        options: [
          'Không nêu rõ nguồn trích dẫn và tác giả bài viết',
          'Được đăng trên cổng thông tin báo chí nhà nước',
          'Có hình ảnh chụp thực tế rõ ràng và có địa điểm',
          'Số liệu thống kê được đối chiếu từ viện nghiên cứu'
        ],
        correctIndex: 0,
        explanation: 'Tin giả thường có tiêu đề giật gân, thiếu căn cứ khoa học, không có tên tác giả và không trích dẫn nguồn.'
      },
      {
        id: 5023,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Biểu tượng hình ổ khóa nhỏ nằm ở đầu thanh địa chỉ của trình duyệt web có ý nghĩa gì?',
        options: [
          'Trang web sử dụng giao thức bảo mật mã hóa HTTPS',
          'Trang web đã bị khóa và người dùng không thể xem',
          'Máy tính của em đang bị nhiễm phần mềm gián điệp',
          'Trình duyệt web yêu cầu nạp tiền để xem nội dung'
        ],
        correctIndex: 0,
        explanation: 'Biểu tượng ổ khóa báo hiệu kết nối an toàn (HTTPS), dữ liệu truyền đi giữa máy và máy chủ được mã hóa.'
      },
      {
        id: 5024,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Khi tìm kiếm thông tin về một di tích lịch sử, em nên thu thập thông tin từ nguồn nào?',
        options: [
          'Website của bảo tàng hoặc cơ quan văn hóa uy tín',
          'Mục bình luận chưa được kiểm duyệt trên mạng xã hội',
          'Trang web chuyên rao vặt mua bán các đồ cổ xưa',
          'Bài chia sẻ ẩn danh trên diễn đàn trò chơi trực tuyến'
        ],
        correctIndex: 0,
        explanation: 'Website của bảo tàng, cơ quan văn hóa hoặc sách lịch sử số hóa cung cấp thông tin chuẩn xác nhất.'
      },
      {
        id: 5025,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Nếu vô tình nhấp vào một liên kết lạ và xuất hiện cảnh báo virus, em cần làm gì ngay lập tức?',
        options: [
          'Đóng tab trình duyệt web đó và thông báo người lớn',
          'Nhấn tải tệp phần mềm được đề xuất trên màn hình',
          'Nhập ngay họ tên và số điện thoại vào bảng yêu cầu',
          'Chuyển tiếp đường liên kết đó cho tất cả bạn bè xem'
        ],
        correctIndex: 0,
        explanation: 'Cần đóng ngay trang web giả mạo cảnh báo và nhờ cha mẹ hoặc thầy cô giáo kiểm tra máy tính.'
      }
    ]
  },
  {
    id: 3,
    level: 2,
    grade: 5,
    topicCode: 'cd2_mang_internet',
    title: 'Bài 3: Tìm kiếm thông tin trong giải quyết vấn đề',
    desc: 'Phương pháp thu thập thông tin đa chiều, kiểm chứng chéo số liệu và tóm tắt nội dung giải quyết nhiệm vụ.',
    type: 'quiz',
    questions: [
      {
        id: 5031,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Khi cần chuẩn bị bài thuyết trình về bảo vệ môi trường, bước đầu tiên em cần làm là gì?',
        options: [
          'Xác định rõ câu hỏi và thông tin cốt lõi cần tìm',
          'Mở phần mềm trình chiếu và chọn hiệu ứng âm thanh',
          'Sao chép toàn bộ một bài viết dài trên mạng về máy',
          'In ngay ra giấy tất cả các hình ảnh tìm thấy trên mạng'
        ],
        correctIndex: 0,
        explanation: 'Bước đầu tiên là xác định mục tiêu và câu hỏi cần giải quyết, giúp tìm kiếm đúng trọng tâm và tiết kiệm thời gian.'
      },
      {
        id: 5032,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Thao tác nào sau đây giúp em kiểm chứng độ chính xác của một thông tin vừa tìm thấy trên mạng?',
        options: [
          'Đối chiếu với các nguồn tài liệu chính thống khác',
          'Chỉ tin vào bài viết xuất hiện đầu tiên trên kết quả',
          'Hỏi ý kiến của một người bạn vừa mới quen qua mạng',
          'Xem số lượt thích ngẫu nhiên trên trang mạng xã hội'
        ],
        correctIndex: 0,
        explanation: 'Kiểm chứng chéo (so sánh thông tin giữa nhiều nguồn uy tín độc lập) là phương pháp xác thực thông tin hiệu quả.'
      },
      {
        id: 5033,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Khi thu thập thông tin từ nhiều trang web khác nhau, thói quen ghi chép tốt nhất là gì?',
        options: [
          'Ghi lại tóm tắt ý chính kèm theo tên trang web nguồn',
          'Lưu ảnh chụp toàn bộ màn hình vào một thư mục lộn xộn',
          'Sao chép nguyên văn tất cả các trang web vào tệp Word',
          'Chỉ đọc lướt qua mắt mà không cần ghi chép lại điều gì'
        ],
        correctIndex: 0,
        explanation: 'Ghi chú tóm tắt nội dung chính và lưu lại địa chỉ nguồn giúp tổng hợp bài làm mạch lạc và trích dẫn chuẩn.'
      },
      {
        id: 5034,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Trong giải quyết vấn đề, thông tin có chất lượng tốt cần đáp ứng tiêu chí nào sau đây?',
        options: [
          'Thông tin phải chính xác, cập nhật và đúng chủ đề',
          'Thông tin phải có độ dài hàng trăm trang tài liệu',
          'Thông tin sử dụng nhiều từ ngữ khó hiểu và phức tạp',
          'Thông tin được đăng tải bởi tài khoản ẩn danh bất kỳ'
        ],
        correctIndex: 0,
        explanation: 'Thông tin có giá trị là thông tin chính xác, tin cậy, mới nhất và phù hợp trực tiếp với vấn đề cần giải quyết.'
      },
      {
        id: 5035,
        grade: 5,
        topicCode: 'cd2_mang_internet',
        question: 'Sau khi tìm kiếm đầy đủ thông tin cho bài học, công việc tiếp theo của em là gì?',
        options: [
          'Tổng hợp, sắp xếp các ý logic và trình bày báo cáo',
          'Xóa hết toàn bộ các dữ liệu vừa thu thập được trên máy',
          'Đăng toàn bộ nội dung thô lên diễn đàn trực tuyến mở',
          'Để nguyên các thông tin rời rạc và không cần xử lý thêm'
        ],
        correctIndex: 0,
        explanation: 'Sau thu thập là bước chọn lọc, sắp xếp theo dàn ý hợp lý và biên tập thành bài thuyết trình hoặc báo cáo.'
      }
    ]
  },

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN
  {
    id: 4,
    level: 3,
    grade: 5,
    topicCode: 'cd3_luu_tru_tim_kiem',
    title: 'Bài 4: Cây thư mục',
    desc: 'Cấu trúc cây thư mục phân cấp nhiều tầng, đường dẫn tệp tin và tìm kiếm tệp bằng phần mở rộng.',
    type: 'quiz',
    questions: [
      {
        id: 5041,
        grade: 5,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Đường dẫn tệp "D:\\HocTap\\TinHoc5\\BaiTap.docx" cho biết tệp "BaiTap.docx" nằm ở vị trí nào?',
        options: [
          'Trong thư mục TinHoc5 thuộc thư mục HocTap trên ổ D',
          'Trực tiếp ngay trên màn hình nền chính của máy tính',
          'Nằm trong thư mục gốc của ổ đĩa hệ thống C của máy',
          'Nằm bên ngoài ổ đĩa D và không thuộc thư mục nào cả'
        ],
        correctIndex: 0,
        explanation: 'Đường dẫn phân cấp: Ổ D -> Thư mục HocTap -> Thư mục con TinHoc5 -> Tệp BaiTap.docx.'
      },
      {
        id: 5042,
        grade: 5,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Kí tự nào sau đây được sử dụng để phân cách giữa các cấp thư mục trong đường dẫn trên Windows?',
        options: [
          'Dấu gạch chéo ngược có dạng kí hiệu "\\"',
          'Dấu chấm hỏi nghi vấn có dạng kí hiệu "?"',
          'Dấu sao nhân tính toán có dạng kí hiệu "*"',
          'Dấu hai chấm liên tiếp có dạng kí hiệu "::"'
        ],
        correctIndex: 0,
        explanation: 'Hệ điều hành Windows dùng dấu gạch chéo ngược (\\) để phân tách tên ổ đĩa, các thư mục và tệp.'
      },
      {
        id: 5043,
        grade: 5,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Để tìm kiếm nhanh tất cả các tệp trình chiếu PowerPoint trong một thư mục, em gõ cụm từ nào vào ô tìm kiếm?',
        options: [
          'Gõ kí hiệu đại diện tìm kiếm có đuôi "*.pptx"',
          'Gõ tên phần mềm xử lý văn bản có tên "*.docx"',
          'Gõ định dạng hình ảnh nén thông dụng "*.jpg"',
          'Gõ tệp âm thanh nghe bài hát có đuôi "*.mp3"'
        ],
        correctIndex: 0,
        explanation: 'Dấu sao (*) đại diện cho tên tệp bất kỳ; *.pptx sẽ lọc ra tất cả các tệp bài trình chiếu PowerPoint.'
      },
      {
        id: 5044,
        grade: 5,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Lợi ích cốt lõi nhất của việc tổ chức tệp tin theo mô hình cây thư mục nhiều cấp là gì?',
        options: [
          'Giúp quản lý dữ liệu ngăn nắp và tìm kiếm rất nhanh',
          'Làm cho dung lượng bộ nhớ của ổ đĩa tăng gấp đôi',
          'Giúp máy tính tự động sửa chữa các lỗi của phần cứng',
          'Ngăn ngừa hoàn toàn máy tính không bị mất nguồn điện'
        ],
        correctIndex: 0,
        explanation: 'Cây thư mục phân cấp khoa học giúp sắp xếp dữ liệu có hệ thống, tiết kiệm thời gian tìm kiếm.'
      },
      {
        id: 5045,
        grade: 5,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Trong cây thư mục, một thư mục con có thể chứa những đối tượng nào sau đây?',
        options: [
          'Nhiều tệp tin và các thư mục cấp con hơn nữa',
          'Chỉ duy nhất một tệp văn bản và không chứa gì khác',
          'Chỉ các nút bấm chức năng trên bàn phím máy tính',
          'Không thể chứa thêm bất kỳ thư mục con nào khác'
        ],
        correctIndex: 0,
        explanation: 'Một thư mục có thể chứa đồng thời nhiều tệp tin và nhiều nhánh thư mục con lồng nhau.'
      }
    ]
  },

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ
  {
    id: 5,
    level: 4,
    grade: 5,
    topicCode: 'cd4_dao_duc_phap_luat',
    title: 'Bài 5: Bản quyền nội dung thông tin',
    desc: 'Hiểu về quyền tác giả, tôn trọng bản quyền số, cách trích dẫn nguồn hợp lệ và bảo vệ sản phẩm cá nhân.',
    type: 'quiz',
    questions: [
      {
        id: 5051,
        grade: 5,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Hành vi nào sau đây thể hiện sự tôn trọng bản quyền khi sử dụng tài liệu tìm thấy trên mạng?',
        options: [
          'Ghi rõ tên tác giả và địa chỉ nguồn gốc tài liệu',
          'Xóa tên tác giả gốc rồi thay bằng họ tên của mình',
          'Sao chép toàn bộ nội dung và nhận là do mình viết ra',
          'Đem bán tài liệu của người khác để kiếm tiền cá nhân'
        ],
        correctIndex: 0,
        explanation: 'Tôn trọng bản quyền thể hiện qua việc xin phép hoặc ghi rõ nguồn trích dẫn và tác giả của tác phẩm.'
      },
      {
        id: 5052,
        grade: 5,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Biểu tượng chữ C nằm trong vòng tròn kín © thường xuất hiện trên các ấn phẩm số có ý nghĩa gì?',
        options: [
          'Tác phẩm đã được đăng ký và bảo hộ bản quyền',
          'Tác phẩm được phép tự do sao chép bán thương mại',
          'Tác phẩm này đã hết hạn sử dụng trên môi trường số',
          'Tác phẩm do trẻ em dưới mười tuổi vẽ minh họa'
        ],
        correctIndex: 0,
        explanation: 'Kí hiệu © là viết tắt của Copyright (Bản quyền), thông báo tác phẩm được pháp luật bảo vệ quyền tác giả.'
      },
      {
        id: 5053,
        grade: 5,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Khi sử dụng một bức ảnh đẹp trên Internet để chèn vào bài thuyết trình môn Lịch sử, em nên làm gì?',
        options: [
          'Ghi dòng chú thích nguồn gốc trang web lấy bức ảnh',
          'Cắt bỏ chữ ký của tác giả bức ảnh để ảnh trông đẹp hơn',
          'Tự nhận mình là người chụp ra bức ảnh nổi tiếng đó',
          'Tải bức ảnh lên trang cá nhân và rao bán kiếm lời'
        ],
        correctIndex: 0,
        explanation: 'Cần ghi chú thích nguồn ảnh (Ví dụ: Ảnh: Báo Tuổi Trẻ) để tôn trọng tác quyền của tác giả chụp ảnh.'
      },
      {
        id: 5054,
        grade: 5,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Việc tự ý sao chép phần mềm có bản quyền mà không trả phí bản quyền được gọi là hành vi gì?',
        options: [
          'Hành vi vi phạm bản quyền và pháp luật sở hữu trí tuệ',
          'Hành vi sáng tạo và tiết kiệm tài chính rất đáng khen',
          'Hành động chia sẻ văn minh trong cộng đồng học tập',
          'Thao tác chuẩn được các nhà lập trình phần mềm khuyến khích'
        ],
        correctIndex: 0,
        explanation: 'Sử dụng phần mềm bẻ khóa (crack) hoặc sao chép lậu là hành vi vi phạm bản quyền và tiềm ẩn nguy cơ nhiễm virus.'
      },
      {
        id: 5055,
        grade: 5,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Nếu em tự sáng tác một bài thơ và vẽ tranh minh họa bằng máy tính, ai là người giữ bản quyền tác phẩm đó?',
        options: [
          'Chính bản thân em là tác giả sở hữu bản quyền đó',
          'Công ty sản xuất ra chiếc máy tính mà em đã sử dụng',
          'Nhà trường nơi em đang theo học các môn văn hóa',
          'Bất kỳ người nào tìm thấy tệp ảnh đó trên Internet'
        ],
        correctIndex: 0,
        explanation: 'Người trực tiếp sáng tạo ra tác phẩm trí tuệ là chủ sở hữu quyền tác giả đối với tác phẩm đó.'
      }
    ]
  },

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC
  {
    id: 6,
    level: 5,
    grade: 5,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 6: Định dạng kí tự và bố trí hình ảnh trong văn bản',
    desc: 'Thiết lập phông chữ, cỡ chữ, màu sắc và sử dụng tính năng Wrap Text để bố trí ảnh hài hòa trong văn bản.',
    type: 'quiz',
    questions: [
      {
        id: 5061,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Công cụ Wrap Text trong phần mềm Word có chức năng chính là gì đối với hình ảnh chèn vào văn bản?',
        options: [
          'Thiết lập kiểu bố cục chữ bao quanh hình ảnh chèn vào',
          'Thay đổi màu sắc các nét vẽ trong hình ảnh minh họa',
          'Xóa toàn bộ các đoạn văn bản xung quanh bức tranh ảnh',
          'Tự động dịch các dòng chữ tiếng Việt sang ngôn ngữ khác'
        ],
        correctIndex: 0,
        explanation: 'Wrap Text (Text Wrapping) quy định cách dòng chữ chảy quanh bức ảnh (Square, Tight, Behind Text, In Front of Text).'
      },
      {
        id: 5062,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi muốn thay đổi kích thước của một bức ảnh mà vẫn giữ nguyên tỉ lệ chiều dài và chiều rộng, em nên kéo thả ở đâu?',
        options: [
          'Kéo thả một trong bốn nút tròn ở bốn góc của ảnh',
          'Kéo nút vuông ở chính giữa cạnh trên của bức ảnh',
          'Kéo nút vuông ở chính giữa cạnh dưới của bức ảnh',
          'Kéo nút vuông nằm ở chính giữa cạnh bên của bức ảnh'
        ],
        correctIndex: 0,
        explanation: 'Kéo thả 4 chốt ở các góc giúp phóng to thu nhỏ đồng dạng mà không làm hình ảnh bị méo mó.'
      },
      {
        id: 5063,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Tổ hợp phím tắt nào sau đây dùng để căn lề giữa (Center) cho tiêu đề đoạn văn bản đang chọn?',
        options: [
          'Nhấn giữ tổ hợp phím Ctrl và nhấn phím E',
          'Nhấn giữ tổ hợp phím Ctrl và nhấn phím L',
          'Nhấn giữ tổ hợp phím Ctrl và nhấn phím R',
          'Nhấn giữ tổ hợp phím Ctrl và nhấn phím J'
        ],
        correctIndex: 0,
        explanation: 'Ctrl+E căn giữa (Center), Ctrl+L căn trái (Left), Ctrl+R căn phải (Right), Ctrl+J căn đều hai bên (Justify).'
      },
      {
        id: 5064,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Trong các kiểu bố trí ảnh Wrap Text, kiểu "Square" làm cho đoạn văn bản hiển thị như thế nào?',
        options: [
          'Các dòng chữ bao bọc thành khung vuông quanh bức ảnh',
          'Bức ảnh nằm chìm hoàn toàn ở dưới các dòng chữ viết',
          'Bức ảnh đè che khuất toàn bộ nội dung dòng chữ phía dưới',
          'Dòng chữ bị ngắt đôi và bức ảnh nằm riêng biệt một hàng'
        ],
        correctIndex: 0,
        explanation: 'Kiểu Square tạo khung chữ nhật đều đặn bao quanh bức ảnh, tạo bố cục trang báo rất gọn gàng.'
      },
      {
        id: 5065,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để làm nổi bật một từ khóa quan trọng trong bài văn, thao tác định dạng kí tự nào là phù hợp nhất?',
        options: [
          'Chọn chữ đậm (Bold) hoặc đổi màu chữ nổi bật hơn',
          'Xóa từ khóa đó đi và để lại một khoảng trống trắng',
          'Đổi phông chữ của toàn bộ cả trang thành phông lạ mắt',
          'Chuyển từ khóa đó sang trang tiếp theo của tài liệu'
        ],
        correctIndex: 0,
        explanation: 'In đậm (Ctrl+B) hoặc tô màu chữ (Font Color) giúp người đọc dễ chú ý đến thuật ngữ và từ khóa quan trọng.'
      }
    ]
  },
  {
    id: 7,
    level: 5,
    grade: 5,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 7: Thực hành soạn thảo văn bản',
    desc: 'Tạo bảng biểu (Table), định dạng viền bảng, gộp tách ô (Merge/Split) và trình bày thời khóa biểu đẹp mắt.',
    type: 'quiz',
    questions: [
      {
        id: 5071,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để chèn một bảng biểu (Table) vào văn bản Word, em chọn dải lệnh nào trên thanh công cụ?',
        options: [
          'Chọn dải lệnh Insert rồi nháy chuột vào nút Table',
          'Chọn dải lệnh Home rồi chọn biểu tượng cây bút chì',
          'Chọn dải lệnh View rồi chọn chế độ xem toàn màn hình',
          'Chọn dải lệnh Help rồi gõ câu hỏi tìm kiếm trợ giúp'
        ],
        correctIndex: 0,
        explanation: 'Thao tác chèn bảng: Insert -> Table -> chọn số hàng (rows) và số cột (columns).'
      },
      {
        id: 5072,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi muốn gộp nhiều ô liền kề trong bảng thành một ô duy nhất, em sử dụng lệnh nào sau đây?',
        options: [
          'Chọn các ô cần gộp rồi chọn lệnh Merge Cells',
          'Chọn các ô cần gộp rồi chọn lệnh Split Cells',
          'Nhấn phím Delete trên bàn phím máy tính một lần',
          'Nhấn tổ hợp phím Ctrl và Z để quay lại thao tác cũ'
        ],
        correctIndex: 0,
        explanation: 'Lệnh Merge Cells (Gộp ô) kết hợp các ô được chọn thành một ô lớn duy nhất (thường dùng cho tiêu đề bảng).'
      },
      {
        id: 5073,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi con trỏ soạn thảo đang ở ô cuối cùng bên phải của bảng, nhấn phím Tab sẽ có tác dụng gì?',
        options: [
          'Tự động chèn thêm một hàng mới ở phía dưới cùng bảng',
          'Xóa toàn bộ nội dung trong ô cuối cùng đó ngay tức thì',
          'Đóng phần mềm Word lại và lưu tệp vào trong máy tính',
          'Tự động đổi màu nền của toàn bộ bảng sang màu trắng'
        ],
        correctIndex: 0,
        explanation: 'Nhấn Tab ở ô cuối cùng của bảng sẽ nhanh chóng sinh ra một hàng trống mới với cấu trúc cột tương tự.'
      },
      {
        id: 5074,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để thay đổi độ rộng của một cột trong bảng cho vừa vặn với nội dung, em đưa chuột vào vị trí nào?',
        options: [
          'Đưa con trỏ vào đường viền ngăn cách giữa hai cột',
          'Nhấp đúp chuột trái vào khoảng trắng ngoài mép trang giấy',
          'Nhấn tổ hợp phím tắt Ctrl và phím cách trên bàn phím',
          'Đưa con trỏ chuột vào vị trí góc dưới bên trái màn hình'
        ],
        correctIndex: 0,
        explanation: 'Đưa con trỏ chuột vào vạch ngăn cách cột đến khi hiện mũi tên hai chiều rồi kéo sang trái hoặc phải.'
      },
      {
        id: 5075,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi thiết kế Thời khóa biểu bằng bảng biểu trong Word, cách định dạng nào giúp bảng dễ nhìn nhất?',
        options: [
          'Tô màu nền tiêu đề hàng cột và căn lề giữa các nội dung',
          'Dùng màu chữ đỏ chói trên nền xanh đậm cho tất cả ô',
          'Không kẻ đường viền phân cách giữa các ngày và tiết học',
          'Để chữ của các tiết học viết dính liền không có dấu cách'
        ],
        correctIndex: 0,
        explanation: 'Tô màu nhẹ cho hàng tiêu đề (Shading), căn lề giữa (Center) và kẻ viền rõ ràng giúp bảng biểu khoa học, dễ đọc.'
      }
    ]
  },
  {
    id: 8,
    level: 5,
    grade: 5,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 8: Làm quen với phần mềm đồ hoạ tạo sản phẩm số',
    desc: 'Sử dụng các công cụ hình mẫu (Shapes), thao tác xoay (Rotate), lật (Flip) và tô màu để sáng tạo hình vẽ đồ họa.',
    type: 'quiz',
    questions: [
      {
        id: 5081,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi sử dụng công cụ vẽ hình Elip trong phần mềm đồ họa, để vẽ được một hình tròn hoàn hảo, em nhấn giữ phím nào?',
        options: [
          'Nhấn giữ phím Shift trong khi kéo thả chuột để vẽ',
          'Nhấn giữ phím Ctrl trong khi kéo thả chuột để vẽ',
          'Nhấn giữ phím Alt trong khi kéo thả chuột để vẽ',
          'Nhấn giữ phím Enter trong khi kéo thả chuột để vẽ'
        ],
        correctIndex: 0,
        explanation: 'Giữ phím Shift khi dùng công cụ Oval sẽ vẽ ra hình tròn chuẩn; giữ Shift khi dùng Rectangle sẽ vẽ hình vuông.'
      },
      {
        id: 5082,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Thao tác "Flip horizontal" trong phần mềm vẽ đồ họa có tác dụng gì đối với hình ảnh đang chọn?',
        options: [
          'Lật đối xứng hình ảnh theo chiều ngang từ trái sang phải',
          'Lật ngược hình ảnh theo chiều thẳng đứng từ trên xuống',
          'Xoay tròn hình ảnh một góc đúng chín mươi độ theo kim đồng hồ',
          'Thu nhỏ kích thước của hình ảnh đi một nửa so với ban đầu'
        ],
        correctIndex: 0,
        explanation: 'Flip horizontal là lật đối xứng theo phương ngang (gương phản chiếu trái - phải).'
      },
      {
        id: 5083,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để sao chép nhanh một hình vẽ mẫu vừa tạo thành một hình mới giống hệt, thao tác nhanh nhất là gì?',
        options: [
          'Chọn hình mẫu đó rồi nhấn tổ hợp phím Ctrl C và Ctrl V',
          'Vẽ lại hình mới từ đầu bằng mắt và ước lượng kích thước',
          'Xóa hình cũ đi rồi mở lại tệp mới để bắt đầu vẽ lại',
          'Nhấn nút nguồn tắt máy tính rồi mở lại phần mềm vẽ đồ họa'
        ],
        correctIndex: 0,
        explanation: 'Sao chép (Ctrl+C) và Dán (Ctrl+V) giúp nhân bản đối tượng đồ họa chính xác kích thước và màu sắc.'
      },
      {
        id: 5084,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi dùng công cụ thùng sơn (Fill with color) để tô màu một vùng kín, nếu hình vẽ bị hở nét thì điều gì sẽ xảy ra?',
        options: [
          'Màu sơn sẽ bị tràn ra toàn bộ màn hình xung quanh',
          'Phần mềm đồ họa sẽ tự động đóng lại mà không báo trước',
          'Màu sơn sẽ biến mất và không có bất kỳ vùng nào đổi màu',
          'Nét vẽ xung quanh sẽ tự động nối liền lại với nhau ngay'
        ],
        correctIndex: 0,
        explanation: 'Nếu vùng vẽ bị hở nét (dù chỉ 1 điểm pixel), màu tô sẽ tràn ra ngoài bao trùm toàn bộ nền trang vẽ.'
      },
      {
        id: 5085,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Công cụ vẽ hình mẫu (Shapes) trong phần mềm đồ họa mang lại ưu điểm gì so với việc vẽ tự do bằng cọ vẽ?',
        options: [
          'Tạo các nét vẽ chuẩn xác, thẳng thớm và cân đối',
          'Làm cho tệp hình vẽ có dung lượng cực kỳ lớn',
          'Tự động phát ra âm thanh sinh động khi bắt đầu vẽ',
          'Chỉ cho phép người dùng sử dụng đúng hai màu đen trắng'
        ],
        correctIndex: 0,
        explanation: 'Shapes cung cấp các hình mẫu chuẩn học (ngôi sao, mũi tên, hình chữ nhật...) giúp hình vẽ sắc nét và đều đặn.'
      }
    ]
  },
  {
    id: 9,
    level: 5,
    grade: 5,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 9: Thực hành tạo sản phẩm số và đồ dùng gia đình',
    desc: 'Thiết kế thiệp chúc mừng, nhãn vở cá nhân và lịch học tập, kết hợp màu sắc hài hòa và lưu tệp chuẩn.',
    type: 'quiz',
    questions: [
      {
        id: 5091,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi thiết kế một tấm thiệp chúc mừng ngày Nhà giáo Việt Nam 20-11, thông tin nào sau đây là quan trọng nhất?',
        options: [
          'Lời chúc ý nghĩa gửi thầy cô cùng ngày tháng kỷ niệm',
          'Bảng thống kê điểm số tất cả các môn học của em',
          'Địa chỉ trang web tải các trò chơi điện tử miễn phí',
          'Bản đồ hướng dẫn đường đi từ nhà đến siêu thị lớn'
        ],
        correctIndex: 0,
        explanation: 'Thiệp chúc mừng 20-11 cần có thông điệp tri ân, lời chúc tốt đẹp gửi đến thầy cô và ngày kỷ niệm.'
      },
      {
        id: 5092,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Trên một chiếc nhãn vở học sinh tự thiết kế, những thông tin cơ bản nào bắt buộc phải có?',
        options: [
          'Trường học, Họ tên học sinh, Lớp học và Tên môn học',
          'Danh sách các món ăn yêu thích của học sinh đó',
          'Mật khẩu truy cập máy tính phòng thực hành tin học',
          'Giá tiền chiếc cặp sách mà học sinh đã mua ở cửa hàng'
        ],
        correctIndex: 0,
        explanation: 'Nhãn vở chuẩn gồm: Tên trường, Lớp, Môn học, Họ và tên học sinh, Niên khóa để phân biệt tập vở.'
      },
      {
        id: 5093,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Nguyên tắc phối màu nào sau đây giúp sản phẩm số của em đẹp mắt và dễ đọc nội dung văn bản?',
        options: [
          'Chữ màu đậm trên nền sáng hoặc chữ sáng trên nền tối',
          'Dùng thật nhiều màu sắc rực rỡ lẫn lộn trên cùng một chữ',
          'Chữ màu vàng nhạt đặt trên nền giấy có màu trắng tinh',
          'Chữ màu xanh đen đậm đặt trên nền bức tranh màu đen tối'
        ],
        correctIndex: 0,
        explanation: 'Độ tương phản (Contrast) giữa chữ và nền là yếu tố quan trọng nhất giúp văn bản nổi bật và dễ đọc.'
      },
      {
        id: 5094,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để lưu lại sản phẩm số vừa thiết kế xong nhằm tránh bị mất khi mất điện đột ngột, em thực hiện thao tác nào?',
        options: [
          'Nhấn tổ hợp phím Ctrl và phím S trên bàn phím máy tính',
          'Rút ngay dây nguồn máy tính ra khỏi ổ cắm trên tường',
          'Nhấn nút nguồn tắt màn hình máy tính rồi ra khỏi phòng',
          'Nháy nút đóng dấu X màu đỏ ở góc trên cùng bên phải'
        ],
        correctIndex: 0,
        explanation: 'Tổ hợp phím Ctrl+S là phím tắt lưu tệp (Save) thông dụng nhất trong mọi ứng dụng máy tính.'
      },
      {
        id: 5095,
        grade: 5,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Sau khi hoàn thành sản phẩm thiệp chúc mừng điện tử, em có thể chia sẻ sản phẩm số đó bằng cách nào?',
        options: [
          'Gửi tệp ảnh qua thư điện tử hoặc in ra giấy màu trang trọng',
          'Xóa ngay tệp đó khỏi thùng rác của hệ điều hành máy tính',
          'Không cho bất kỳ ai xem và khóa vĩnh viễn tệp trên máy',
          'Đổi đuôi tệp thành định dạng không thể mở được trên máy tính'
        ],
        correctIndex: 0,
        explanation: 'Sản phẩm số có thể chia sẻ linh hoạt: gửi file qua email, tin nhắn hoặc in ấn chất lượng cao tặng thầy cô.'
      }
    ]
  },

  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  {
    id: 10,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 10: Cấu trúc tuần tự',
    desc: 'Hiểu bản chất cấu trúc thuật toán tuần tự: các bước thực thi lần lượt từ trên xuống dưới, không bỏ sót.',
    type: 'quiz',
    questions: [
      {
        id: 5101,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Đặc điểm cơ bản nhất của Cấu trúc tuần tự trong thuật toán và chương trình máy tính là gì?',
        options: [
          'Các bước lệnh được thực hiện lần lượt từ trên xuống dưới',
          'Các bước lệnh được thực hiện ngẫu nhiên không cần thứ tự',
          'Máy tính tự động chọn một lệnh bất kỳ để làm trước',
          'Các bước lệnh luôn được lặp đi lặp lại mãi mãi không dừng'
        ],
        correctIndex: 0,
        explanation: 'Cấu trúc tuần tự thực hiện từng câu lệnh nối tiếp nhau theo đúng trình tự từ đầu đến cuối.'
      },
      {
        id: 5102,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Xét kịch bản pha nước chanh đường: (1) Vắt chanh vào cốc; (2) Cho nước lọc vào; (3) Thêm đường và khuấy đều. Nếu đảo bước (3) lên trước bước (2) thì sẽ xảy ra điều gì?',
        options: [
          'Đường khó tan hơn hoặc có thể làm thay đổi kết quả',
          'Nước chanh sẽ tự động biến thành nước sôi nóng',
          'Cốc thủy tinh sẽ bị nứt vỡ ngay lập tức do nhiệt độ',
          'Hương vị cốc nước chanh không có bất kỳ điểm nào khác'
        ],
        correctIndex: 0,
        explanation: 'Thứ tự các bước trong cấu trúc tuần tự có thể ảnh hưởng lớn đến tính tiện lợi và kết quả cuối cùng.'
      },
      {
        id: 5103,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong Scratch, nếu em ghép chồng 3 khối lệnh chuyển động theo chiều dọc từ trên xuống, nhân vật sẽ thực hiện như thế nào?',
        options: [
          'Thực hiện khối lệnh trên cùng trước rồi đến khối lệnh phía dưới',
          'Thực hiện khối lệnh dưới cùng trước rồi mới đến khối lệnh trên',
          'Thực hiện đồng thời cả 3 khối lệnh trong cùng một tích tắc',
          'Chỉ thực hiện đúng khối lệnh ở giữa và bỏ qua 2 khối còn lại'
        ],
        correctIndex: 0,
        explanation: 'Khối lệnh trong Scratch thực thi tuần tự từ trên xuống dưới theo thứ tự ghép nối.'
      },
      {
        id: 5104,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Thuật toán tính diện tích hình chữ nhật theo cấu trúc tuần tự gồm các bước chuẩn nào sau đây?',
        options: [
          'Nhập chiều dài và chiều rộng, tính Tích của hai cạnh, hiển thị diện tích',
          'Hiển thị kết quả diện tích trước rồi mới đi đo chiều dài của hình chữ nhật',
          'Nhập chiều dài, hiển thị diện tích ngay mà không cần biết chiều rộng của hình',
          'Tính tổng chu vi trước rồi chia đều cho bốn cạnh của hình chữ nhật đó'
        ],
        correctIndex: 0,
        explanation: 'Quy trình tuần tự: Nhận dữ liệu đầu vào (Dài, Rộng) -> Xử lý (Dài x Rộng) -> Xuất kết quả (Diện tích).'
      },
      {
        id: 5105,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Nếu trong một dãy lệnh tuần tự có một lệnh bị sai vị trí, kết quả của chương trình sẽ ra sao?',
        options: [
          'Chương trình có thể cho ra kết quả sai lệch so với mong muốn ban đầu',
          'Máy tính sẽ tự động sửa lại vị trí lệnh mà không cần lập trình viên',
          'Màn hình máy tính sẽ lập tức bị tắt nguồn và không thể mở lại',
          'Chương trình vẫn luôn hoạt động hoàn hảo và không bao giờ xảy ra lỗi'
        ],
        correctIndex: 0,
        explanation: 'Sai thứ tự lệnh trong cấu trúc tuần tự dẫn đến lỗi logic (Logic error), làm sai kết quả đầu ra.'
      }
    ]
  },
  {
    id: 11,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 11: Cấu trúc lặp',
    desc: 'Nhận biết hiện tượng lặp trong đời sống và các dạng lệnh lặp: lặp có số lần cố định và lặp liên tục.',
    type: 'quiz',
    questions: [
      {
        id: 5111,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Hiện tượng nào sau đây trong tự nhiên diễn ra theo quy luật của Cấu trúc lặp?',
        options: [
          'Chu kỳ ngày và đêm luân phiên lặp lại hàng ngày',
          'Một ngôi sao băng bay vụt qua bầu trời một lần duy nhất',
          'Một quả bóng bay bị nổ tung khi va vào cành cây gai nhọn',
          'Một bức tường gạch cũ kỹ bị sụp đổ sau trận mưa bão'
        ],
        correctIndex: 0,
        explanation: 'Ngày và đêm, bốn mùa xuân hạ thu đông, kim đồng hồ quay là các hiện tượng lặp lại theo chu kỳ trong tự nhiên.'
      },
      {
        id: 5112,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong phần mềm Scratch, khối lệnh "lặp lại 10 lần" (repeat 10) thuộc loại cấu trúc lặp nào?',
        options: [
          'Cấu trúc lặp với số lần biết trước cố định',
          'Cấu trúc lặp vô hạn không bao giờ dừng lại',
          'Cấu trúc rẽ nhánh điều kiện nếu thì thông thường',
          'Cấu trúc tuần tự chỉ thực hiện đúng một lần'
        ],
        correctIndex: 0,
        explanation: 'Khối `repeat n` lặp lại các lệnh bên trong đúng số lần đã được chỉ định trước (ở đây là 10 lần).'
      },
      {
        id: 5113,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khối lệnh "liên tục" (forever) trong Scratch thường được dùng trong trường hợp nào sau đây?',
        options: [
          'Tạo vòng lặp chính của trò chơi hoạt động suốt trận đấu',
          'Chỉ để chạy đúng một câu lệnh duy nhất khi bắt đầu nhấn cờ xanh',
          'Tự động tắt phần mềm Scratch sau khi học sinh làm xong bài',
          'Tính toán một phép cộng hai số rồi lập tức dừng hẳn chương trình'
        ],
        correctIndex: 0,
        explanation: 'Khối `forever` lặp vô tận, thường làm vòng lặp chính (game loop) kiểm tra phím bấm, tính điểm, chuyển động nhân vật.'
      },
      {
        id: 5114,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Lợi ích lớn nhất của việc sử dụng Cấu trúc lặp trong chương trình lập trình máy tính là gì?',
        options: [
          'Giúp mã nguồn ngắn gọn, dễ hiểu và tránh phải viết lại lệnh trùng lặp',
          'Làm cho máy tính tiêu tốn ít điện năng hơn trong suốt quá trình chạy',
          'Giúp chương trình tự động dịch sang nhiều ngôn ngữ trên toàn thế giới',
          'Làm cho kích thước phông chữ trên màn hình hiển thị to hơn trước'
        ],
        correctIndex: 0,
        explanation: 'Vòng lặp giúp tối ưu hóa thuật toán, không phải viết lặp lại hàng chục dòng lệnh giống hệt nhau.'
      },
      {
        id: 5115,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để nhân vật chú mèo Scratch bước đi 4 cạnh tạo thành một hình vuông, em cần lặp lại mấy lần thao tác "Đi 100 bước và Xoay 90 độ"?',
        options: [
          'Cần lặp lại đúng bốn lần liên tiếp thao tác đó',
          'Cần lặp lại đúng ba lần liên tiếp thao tác đó',
          'Cần lặp lại đúng năm lần liên tiếp thao tác đó',
          'Cần lặp lại đúng tám lần liên tiếp thao tác đó'
        ],
        correctIndex: 0,
        explanation: 'Hình vuông có 4 cạnh và 4 góc vuông 90 độ bằng nhau, nên lặp lại 4 lần nhóm lệnh: Đi 100 bước, xoay 90 độ.'
      }
    ]
  },
  {
    id: 12,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 12: Thực hành sử dụng lệnh lặp',
    desc: 'Lập trình chuyển động đổi trang phục hoạt hình và vẽ các hình đa giác đều bằng khối bút vẽ kết hợp vòng lặp.',
    type: 'quiz',
    questions: [
      {
        id: 5121,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để vẽ một hình tam giác đều có 3 góc bằng nhau, góc xoay của nhân vật sau mỗi cạnh vẽ phải là bao nhiêu độ?',
        options: [
          'Góc xoay đúng bằng một trăm hai mươi độ',
          'Góc xoay đúng bằng sáu mươi độ góc nhọn',
          'Góc xoay đúng bằng chín mươi độ góc vuông',
          'Góc xoay đúng bằng một trăm tám mươi độ'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc vẽ đa giác đều n cạnh: Góc xoay ngoài = 360 / n. Với tam giác đều: 360 / 3 = 120 độ.'
      },
      {
        id: 5122,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong Scratch, để nhân vật trông như đang chuyển động bước đi sinh động, người ta thường dùng khối lệnh nào bên trong vòng lặp?',
        options: [
          'Khối lệnh đổi sang trang phục kế tiếp (next costume)',
          'Khối lệnh đổi phông nền sân khấu sang màu đen kịt',
          'Khối lệnh đổi tên của nhân vật sang một tên mới lạ',
          'Khối lệnh xóa toàn bộ các nét vẽ hiện có trên sân khấu'
        ],
        correctIndex: 0,
        explanation: 'Lệnh `next costume` luân chuyển giữa các dáng đi (costumes) tạo hiệu ứng hoạt hình mượt mà như bước đi.'
      },
      {
        id: 5123,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để nhân vật không bước đi quá nhanh đến mức mắt người không kịp nhìn thấy, em cần thêm khối lệnh nào vào sau mỗi bước đi?',
        options: [
          'Khối lệnh đợi một khoảng thời gian ngắn (wait seconds)',
          'Khối lệnh dừng toàn bộ chương trình ngay lập tức (stop all)',
          'Khối lệnh ẩn nhân vật biến mất khỏi sân khấu (hide)',
          'Khối lệnh phóng to kích thước nhân vật lên mức tối đa'
        ],
        correctIndex: 0,
        explanation: 'Khối `wait 0.1 secs` tạm hoãn giữa các khung hình, giúp mắt người quan sát được từng bước chuyển động nhịp nhàng.'
      },
      {
        id: 5124,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khối lệnh "nếu chạm cạnh thì bật lại" (if on edge, bounce) thường được đặt ở đâu trong kịch bản di chuyển?',
        options: [
          'Đặt bên trong vòng lặp chuyển động của nhân vật',
          'Đặt ở bên ngoài và phía trước khi nhấn cờ xanh',
          'Đặt trong phần định nghĩa âm thanh của phông nền',
          'Đặt ở trang phục thứ hai của nhân vật đang vẽ'
        ],
        correctIndex: 0,
        explanation: 'Lệnh bật lại khi chạm cạnh cần nằm trong vòng lặp di chuyển để nhân vật không bị chạy mất ra ngoài biên sân khấu.'
      },
      {
        id: 5125,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Muốn vẽ một hình ngôi sao năm cánh hoặc ngũ giác đều, số lần lặp lại của khối lệnh lặp phải là bao nhiêu?',
        options: [
          'Số lần lặp lại được đặt đúng bằng năm lần',
          'Số lần lặp lại được đặt đúng bằng mười lần',
          'Số lần lặp lại được đặt đúng bằng ba lần',
          'Số lần lặp lại được đặt đúng bằng tám lần'
        ],
        correctIndex: 0,
        explanation: 'Hình ngũ giác đều hoặc ngôi sao năm cánh có 5 đỉnh/cạnh tương ứng với 5 lần lặp.'
      }
    ]
  },
  {
    id: 13,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 13: Cấu trúc rẽ nhánh',
    desc: 'Phân biệt cấu trúc rẽ nhánh dạng thiếu (Nếu ... thì) và dạng đủ (Nếu ... thì ... không thì ...); ứng dụng cảm biến.',
    type: 'quiz',
    questions: [
      {
        id: 5131,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Cấu trúc rẽ nhánh dạng thiếu trong Scratch được biểu diễn bằng khối lệnh nào sau đây?',
        options: [
          'Khối lệnh "nếu <điều kiện> thì" (if <condition> then)',
          'Khối lệnh "nếu <điều kiện> thì ... không thì ..." (if else)',
          'Khối lệnh "lặp lại cho đến khi <điều kiện>" (repeat until)',
          'Khối lệnh "đợi cho đến khi <điều kiện>" (wait until)'
        ],
        correctIndex: 0,
        explanation: 'Khối `if <condition> then` là cấu trúc rẽ nhánh dạng thiếu: nếu điều kiện đúng thì thực hiện, sai thì bỏ qua.'
      },
      {
        id: 5132,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong câu: "Nếu trời mưa thì em đi ô tô, không thì em đi xe đạp", phần hành động khi trời KHÔNG MƯA là gì?',
        options: [
          'Hành động em tự đi đến trường bằng chiếc xe đạp',
          'Hành động em được phụ huynh chở bằng chiếc xe ô tô',
          'Hành động em ở nhà ngủ và không đến trường học tập',
          'Hành động em mang theo chiếc áo mưa màu xanh biển'
        ],
        correctIndex: 0,
        explanation: 'Đây là rẽ nhánh dạng đủ (if-else). Khi điều kiện "trời mưa" là Sai (không mưa), hành động nhánh "không thì" được thực thi: đi xe đạp.'
      },
      {
        id: 5133,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khối lệnh cảm biến nào sau đây thường được đặt vào ô điều kiện hình lục giác của cấu trúc rẽ nhánh?',
        options: [
          'Khối cảm biến "đang chạm vào nhân vật hoặc con trỏ chuột"',
          'Khối chuyển động "di chuyển mười bước về phía trước"',
          'Khối âm thanh "phát ra tiếng kêu meo meo cho đến hết"',
          'Khối sự kiện "khi bấm vào biểu tượng lá cờ màu xanh"'
        ],
        correctIndex: 0,
        explanation: 'Các khối cảm biến màu xanh lơ hình lục giác (touching mouse-pointer, touching color...) trả về Đúng/Sai làm điều kiện.'
      },
      {
        id: 5134,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong một trò chơi Scratch, nếu nhân vật chạm vào chướng ngại vật màu đỏ thì trừ 1 điểm, ngược lại thì cộng 1 điểm. Em dùng khối lệnh nào?',
        options: [
          'Khối lệnh rẽ nhánh dạng đủ: nếu ... thì ... không thì ...',
          'Khối lệnh rẽ nhánh dạng thiếu chỉ có một nhánh nếu thì',
          'Khối lệnh lặp lại mười lần chuyển động về phía trước',
          'Khối lệnh dừng toàn bộ mọi hoạt động của chương trình'
        ],
        correctIndex: 0,
        explanation: 'Cần xử lý 2 trường hợp đối lập nhau (chạm thì trừ điểm, không chạm thì cộng điểm) nên dùng khối `if ... then ... else ...`.'
      },
      {
        id: 5135,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Điều kiện kiểm tra trong cấu trúc rẽ nhánh của máy tính có thể nhận những giá trị kết quả nào?',
        options: [
          'Chỉ có thể nhận một trong hai giá trị là Đúng hoặc Sai',
          'Có thể nhận bất kỳ một con số ngẫu nhiên từ 1 đến 100',
          'Chỉ nhận giá trị là một đoạn văn bản ghi tên người dùng',
          'Có thể nhận đồng thời cả hai giá trị Đúng và Sai cùng lúc'
        ],
        correctIndex: 0,
        explanation: 'Điều kiện logic (Boolean) trong khoa học máy tính luôn chỉ có 2 trạng thái chân lý: Đúng (True) hoặc Sai (False).'
      }
    ]
  },
  {
    id: 14,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 14: Sử dụng biến trong chương trình',
    desc: 'Hiểu khái niệm biến nhớ, tạo biến Điểm số (Score), Thời gian (Timer) và phân biệt lệnh gán với lệnh tăng giảm.',
    type: 'quiz',
    questions: [
      {
        id: 5141,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong lập trình, "Biến" (Variable) được hiểu là gì và dùng để làm công việc gì?',
        options: [
          'Là một ô nhớ có tên dùng để lưu trữ dữ liệu có thể thay đổi',
          'Là tên gọi của một nhân vật hoạt hình xuất hiện trên sân khấu',
          'Là một bài hát phát ra trong lúc trò chơi đang hoạt động',
          'Là kích thước của cửa sổ phần mềm khi hiển thị toàn màn hình'
        ],
        correctIndex: 0,
        explanation: 'Biến là vùng nhớ có tên dùng để lưu giữ giá trị (số, chuỗi) và giá trị đó có thể thay đổi trong quá trình chạy chương trình.'
      },
      {
        id: 5142,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để bắt đầu một lượt chơi mới với số điểm ban đầu bằng 0, em sử dụng lệnh nào sau đây?',
        options: [
          'Đặt biến "Diem_so" thành 0 (set variable to 0)',
          'Thay đổi biến "Diem_so" một lượng 1 (change by 1)',
          'Xóa vĩnh viễn biến "Diem_so" ra khỏi danh mục mã lệnh',
          'Nhân đôi biến "Diem_so" lên thành hai biến độc lập'
        ],
        correctIndex: 0,
        explanation: 'Lệnh `set variable to 0` gán giá trị khởi tạo ban đầu cho biến (khởi tạo điểm số về 0 khi bắt đầu game).'
      },
      {
        id: 5143,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Mỗi khi chú mèo bắt được một chú chuột thì được cộng thêm 5 điểm, em sử dụng khối lệnh nào?',
        options: [
          'Thay đổi biến "Diem_so" một lượng 5 (change by 5)',
          'Đặt giá trị của biến "Diem_so" thành số 5 cố định',
          'Lấy giá trị của biến "Diem_so" trừ bớt đi năm đơn vị',
          'Đổi tên của biến "Diem_so" thành tên gọi là Chuột'
        ],
        correctIndex: 0,
        explanation: 'Lệnh `change variable by 5` cộng thêm 5 vào giá trị hiện tại của biến.'
      },
      {
        id: 5144,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để tạo một đồng hồ đếm ngược từ 30 giây về 0 giây, trong vòng lặp sau mỗi 1 giây em cần thực hiện lệnh gì?',
        options: [
          'Thay đổi biến "Thoi_gian" một lượng là -1 (change by -1)',
          'Thay đổi biến "Thoi_gian" một lượng là +1 (change by 1)',
          'Đặt giá trị của biến "Thoi_gian" trở về con số 0 ngay',
          'Đặt giá trị của biến "Thoi_gian" bằng con số 60 giây'
        ],
        correctIndex: 0,
        explanation: 'Đếm ngược mỗi giây giảm đi 1 đơn vị, tương ứng với lệnh `change Thoi_gian by -1`.'
      },
      {
        id: 5145,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi tích dấu chọn vào ô vuông bên cạnh tên biến trong danh sách, điều gì sẽ hiển thị trên sân khấu?',
        options: [
          'Một bảng nhỏ hiển thị tên và giá trị hiện tại của biến',
          'Nhân vật trên sân khấu sẽ tự động tăng kích thước gấp đôi',
          'Toàn bộ các câu lệnh trong khu vực kịch bản sẽ biến mất',
          'Phần mềm sẽ tự động lưu dự án lên trên mạng đám mây'
        ],
        correctIndex: 0,
        explanation: 'Tích dấu chọn sẽ bật màn hình hiển thị biến (variable monitor) trên sân khấu để người chơi theo dõi điểm số/thời gian.'
      }
    ]
  },
  {
    id: 15,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 15: Sử dụng biểu thức trong chương trình',
    desc: 'Làm quen các khối phép toán so sánh, biểu thức số học (+, -, *, /) và khối lấy số ngẫu nhiên (Pick random).',
    type: 'quiz',
    questions: [
      {
        id: 5151,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong nhóm lệnh Các phép toán (Operators) của Scratch, phép tính nhân hai số được kí hiệu bằng dấu gì?',
        options: [
          'Kí hiệu dấu sao có hình dạng là dấu "*"',
          'Kí hiệu chữ cái x viết thường có hình dạng là "x"',
          'Kí hiệu dấu chấm tròn nằm ở chính giữa trang',
          'Kí hiệu dấu hai chấm dùng trong phép chia tính toán'
        ],
        correctIndex: 0,
        explanation: 'Trong mọi ngôn ngữ lập trình, phép nhân được ký hiệu bằng dấu sao (*), phép chia là gạch chéo (/).'
      },
      {
        id: 5152,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khối lệnh "lấy ngẫu nhiên từ 1 đến 10" (pick random 1 to 10) sẽ trả về kết quả như thế nào?',
        options: [
          'Một số tự nhiên bất kỳ trong khoảng từ một đến mười',
          'Luôn luôn trả về con số một trong tất cả mọi lần chạy',
          'Luôn luôn trả về con số mười trong tất cả mọi lần chạy',
          'Trả về tổng của tất cả các số từ một cộng đến mười'
        ],
        correctIndex: 0,
        explanation: 'Khối `pick random a to b` sinh ra một giá trị ngẫu nhiên trong khoảng chỉ định, rất hữu ích khi làm game.'
      },
      {
        id: 5153,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Biểu thức so sánh: "Diem_so > 50" sẽ trả về giá trị là "ĐÚNG" khi nào?',
        options: [
          'Khi giá trị lưu trong biến Diem_so lớn hơn năm mươi',
          'Khi giá trị lưu trong biến Diem_so nhỏ hơn năm mươi',
          'Khi giá trị lưu trong biến Diem_so bằng đúng năm mươi',
          'Khi giá trị lưu trong biến Diem_so bằng đúng số không'
        ],
        correctIndex: 0,
        explanation: 'Phép so sánh lớn hơn (>) chỉ đúng khi toán tử vế trái có giá trị thực sự lớn hơn vế phải.'
      },
      {
        id: 5154,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để kiểm tra xem người chơi đã đạt đủ 100 điểm để chiến thắng hay chưa, em kết hợp biểu thức nào vào khối "nếu ... thì"?',
        options: [
          'Biểu thức so sánh bằng: Diem_so = 100',
          'Biểu thức cộng hai số: Diem_so + 100',
          'Biểu thức lấy ngẫu nhiên: pick random 1 to 100',
          'Biểu thức ghép chữ cái: join Diem_so và 100'
        ],
        correctIndex: 0,
        explanation: 'Dùng biểu thức so sánh `=` hoặc `>=` để kiểm tra điều kiện đạt mốc điểm chiến thắng.'
      },
      {
        id: 5155,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong Scratch, khối phép toán hình lục giác nhọn hai đầu được dùng để làm gì?',
        options: [
          'Chứa biểu thức logic trả về kết quả Đúng hoặc Sai',
          'Chứa các con số thực hiện phép cộng trừ nhân chia thông thường',
          'Chứa một đoạn nhạc bài hát được phát ra từ nhân vật',
          'Chứa hình ảnh chụp lại từ webcam của chiếc máy tính'
        ],
        correctIndex: 0,
        explanation: 'Khối hình lục giác là biểu thức điều kiện logic (Boolean: >, <, =, and, or, not) lắp vào các khối rẽ nhánh/lặp.'
      }
    ]
  },
  {
    id: 16,
    level: 6,
    grade: 5,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 16: Từ kịch bản đến chương trình',
    desc: 'Xây dựng hoàn chỉnh trò chơi đố vui toán học từ ý tưởng, kịch bản, sử dụng khối hỏi đáp và kiểm tra đáp án.',
    type: 'quiz',
    questions: [
      {
        id: 5161,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi lập trình trò chơi đố vui trong Scratch, để nhân vật đưa ra câu hỏi và chờ người chơi nhập câu trả lời, em dùng khối lệnh nào?',
        options: [
          'Khối lệnh "hỏi ... và đợi" trong nhóm lệnh Cảm biến',
          'Khối lệnh "nói ... trong 2 giây" trong nhóm lệnh Hiển thị',
          'Khối lệnh "nghĩ ... trong 2 giây" trong nhóm lệnh Hiển thị',
          'Khối lệnh "phát âm thanh" trong nhóm lệnh Âm thanh'
        ],
        correctIndex: 0,
        explanation: 'Khối `ask [câu hỏi] and wait` hiển thị hộp thoại cho người chơi gõ câu trả lời từ bàn phím.'
      },
      {
        id: 5162,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Nội dung câu trả lời mà người dùng vừa gõ từ bàn phím vào ô nhập sẽ tự động được lưu trữ vào đâu trong Scratch?',
        options: [
          'Lưu vào khối cảm biến "câu trả lời" (answer)',
          'Lưu trực tiếp vào tên của phông nền sân khấu',
          'Lưu vào vị trí tọa độ X và Y của chú mèo',
          'Lưu vào mức âm lượng của chiếc loa máy tính'
        ],
        correctIndex: 0,
        explanation: 'Khối cảm biến `answer` (câu trả lời) tự động nhận và lưu nội dung người dùng vừa gõ từ bàn phím.'
      },
      {
        id: 5163,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Quy trình chuẩn các bước để hoàn thành một dự án phần mềm hoặc trò chơi Scratch từ con số 0 là gì?',
        options: [
          'Xây dựng kịch bản, thiết kế nhân vật, lập trình mã lệnh, chạy thử và sửa lỗi',
          'Lắp ghép lệnh bừa bãi không cần kịch bản hay kế hoạch suy nghĩ từ trước',
          'Sao chép bài làm của bạn cùng lớp rồi đổi tên thành sản phẩm của mình',
          'Chỉ cần vẽ phông nền sân khấu thật đẹp là chương trình tự động chạy được'
        ],
        correctIndex: 0,
        explanation: 'Quy trình khoa học: 1. Ý tưởng & Kịch bản -> 2. Thiết kế nhân vật/phông nền -> 3. Lập trình mã lệnh -> 4. Chạy thử & Gỡ lỗi (Debug).'
      },
      {
        id: 5164,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi kiểm tra xem câu trả lời của người chơi có đúng với đáp án của câu hỏi đố vui hay không, em sử dụng cấu trúc nào?',
        options: [
          'Khối lệnh "nếu <câu trả lời = đáp án> thì ... không thì ..."',
          'Khối lệnh "lặp lại mười lần" di chuyển về phía trước',
          'Khối lệnh "ẩn nhân vật" biến mất ngay khỏi sân khấu',
          'Khối lệnh "đổi phông nền" sang phông nền kế tiếp'
        ],
        correctIndex: 0,
        explanation: 'Cấu trúc `if answer = DapAn then (chúc mừng + cộng điểm) else (báo sai + thử lại)` là chuẩn mực cho game đố vui.'
      },
      {
        id: 5165,
        grade: 5,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Hoạt động "Chạy thử và sửa lỗi" (Testing & Debugging) trong quá trình hoàn thiện dự án có ý nghĩa gì?',
        options: [
          'Tìm ra những lỗi bất hợp lý để điều chỉnh chương trình hoạt động chuẩn xác',
          'Làm cho máy tính tự động xóa bỏ toàn bộ kịch bản lệnh đã hoàn thành',
          'Biến chương trình Scratch thành một bức tranh vẽ tĩnh không thể cử động',
          'Ngăn không cho người chơi khác có thể bấm phím tham gia trải nghiệm'
        ],
        correctIndex: 0,
        explanation: 'Chạy thử nhiều tình huống giúp phát hiện lỗi sai logic, hoàn thiện chương trình chạy ổn định và mượt mà.'
      }
    ]
  }
];
