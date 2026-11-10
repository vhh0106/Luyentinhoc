import { QuizQuestion } from '../types';

/**
 * 80 CÂU HỎI PHẦN 2 (CÂU 6 - 10) CHO 16 BÀI HỌC SGK TIN HỌC 5
 * Bám sát SGK Tin học 5 Kết Nối Tri Thức Với Cuộc Sống.
 * Tập trung vào mức độ Thông hiểu và Vận dụng thực hành (Máy tính đời sống, bản quyền, Word nâng cao, đồ họa, biến, rẽ nhánh, lặp, AI).
 * Chuẩn kỷ luật 4 phương án cân bằng độ dài, chống đoán mò.
 */
export const SGK_EXTRA_GRADE_5: Record<number, QuizQuestion[]> = {
  // Bài 1: Em có thể làm gì với máy tính? (id: 1)
  1: [
    {
      id: 5016,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Trong lĩnh vực y tế, máy tính kết hợp với thiết bị y tế hiện đại hỗ trợ các bác sĩ công việc quan trọng nào?',
      options: [
        'Chụp cắt lớp CT, siêu âm và phân tích chẩn đoán hình ảnh bệnh án',
        'Tự động đi phát thuốc và dọn dẹp phòng bệnh nhân vào ban đêm',
        'Thay thế hoàn toàn sự chăm sóc và tình cảm của người thân bệnh nhân',
        'Làm cho các loại thuốc kháng sinh tự động tăng tác dụng chữa bệnh'
      ],
      correctIndex: 0,
      explanation: 'Máy tính xử lí tín hiệu hình ảnh y khoa phức tạp (CT scanner, MRI, X-quang) hỗ trợ bác sĩ chẩn đoán chính xác.'
    },
    {
      id: 5017,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Tại các nhà máy sản xuất tự động hóa thông minh, dây chuyền cánh tay Robot điều khiển bởi máy tính mang lại lợi ích gì?',
      options: [
        'Lắp ráp chính xác, tốc độ cao và thay thế con người ở môi trường độc hại',
        'Làm cho nhà máy không bao giờ cần phải tiêu thụ điện năng sản xuất',
        'Tự động mua nguyên vật liệu mà không cần đến sự quản lí của ban giám đốc',
        'Biến toàn bộ phế thải công nghiệp thành những sản phẩm vàng bạc quý giá'
      ],
      correctIndex: 0,
      explanation: 'Robot công nghiệp hoạt động bền bỉ, độ chính xác cơ khí tính bằng mi-li-mét và đảm bảo an toàn lao động.'
    },
    {
      id: 5018,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Trong ngành hàng không, hệ thống máy tính trên máy bay đóng vai trò thiết yếu nào trong mỗi chuyến bay an toàn?',
      options: [
        'Hệ thống lái tự động, dẫn đường vệ tinh GPS và liên lạc kiểm soát không lưu',
        'Tự động phục vụ nước uống và thức ăn nóng hổi cho từng hành khách trên khoang',
        'Tự động thay đổi kích thước cánh máy bay to nhỏ tùy thích theo ý muốn của phi công',
        'Làm cho máy bay có thể bay mãi trên bầu trời mà không bao giờ cần phải hạ cánh'
      ],
      correctIndex: 0,
      explanation: 'Máy tính điều khiển hệ thống lái tự động (Autopilot), phân tích luồng không khí và dẫn đường qua vệ tinh.'
    },
    {
      id: 5019,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Thiết bị thông minh đeo tay (Smartwatch) là một ví dụ sinh động của máy tính thu nhỏ vì nó có khả năng nào?',
      options: [
        'Đo nhịp tim, đếm số bước chân vận động, nhận thông báo và đồng bộ dữ liệu',
        'Thay thế hoàn toàn một chiếc tivi màn hình cong 65 inch trong phòng khách',
        'Tự động nấu chín thức ăn cho người đeo khi cảm thấy đói bụng vào buổi chiều',
        'Có thể hoạt động suốt mười năm mà không bao giờ cần phải sạc lại nguồn pin'
      ],
      correctIndex: 0,
      explanation: 'Smartwatch tích hợp cảm biến sinh học, vi xử lí và phần mềm để theo dõi sức khỏe và kết nối mạng.'
    },
    {
      id: 5020,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Dù máy tính rất thông minh và xử lí dữ liệu khổng lồ, điểm khác biệt then chốt giữa con người và máy tính là gì?',
      options: [
        'Con người có cảm xúc, trí tưởng tượng sáng tạo và khả năng tư duy đạo đức',
        'Con người tính toán số học nhanh hơn máy tính hàng triệu lần mỗi giây',
        'Con người không bao giờ cảm thấy mệt mỏi hay cần phải ngủ nghỉ lấy lại sức',
        'Con người chỉ có thể ghi nhớ được đúng một số điện thoại duy nhất trong đời'
      ],
      correctIndex: 0,
      explanation: 'Máy tính chỉ làm theo thuật toán lập trình sẵn, con người là chủ thể sở hữu lương tâm, cảm xúc và óc sáng tạo.'
    }
  ],

  // Bài 2: Tìm kiếm thông tin trên website (id: 2)
  2: [
    {
      id: 5026,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khái niệm "Địa chỉ trang web" (URL) có vai trò tương đương với đối tượng nào trong đời sống hàng ngày?',
      options: [
        'Địa chỉ nhà ở cụ thể giúp người đưa thư tìm đến đúng nơi cần giao nhận',
        'Một bức tranh phong cảnh vẽ cánh đồng hoa được đóng khung treo trên tường',
        'Tên gọi thân mật ở nhà của một người bạn thân học cùng lớp mẫu giáo',
        'Chiếc chìa khóa kim loại dùng để mở ổ khóa cửa ra vào của lớp học'
      ],
      correctIndex: 0,
      explanation: 'URL (Uniform Resource Locator) là địa chỉ định danh duy nhất của tài nguyên trên mạng Internet toàn cầu.'
    },
    {
      id: 5027,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi sử dụng ô tìm kiếm nội bộ (Search box) có sẵn trên một trang web học tập, kết quả tìm được sẽ là gì?',
      options: [
        'Các bài viết, tư liệu và tài liệu nằm bên trong chính trang web đó',
        'Tất cả mọi thông tin của tất cả các trang web khác trên toàn thế giới',
        'Danh sách số điện thoại cá nhân của những người đang truy cập website',
        'Lịch sử duyệt web của chiếc máy tính để bàn đặt ở phòng hiệu trưởng'
      ],
      correctIndex: 0,
      explanation: 'Ô tìm kiếm nội bộ của website (Site Search) giới hạn phạm vi rà soát dữ liệu trong nội dung của trang đó.'
    },
    {
      id: 5028,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Để lọc thông tin tìm kiếm trên Google chỉ lấy các tài liệu ở định dạng tệp PDF (.pdf), em dùng cú pháp nào?',
      options: [
        'Gõ thêm cụm từ "filetype:pdf" vào sau từ khóa tìm kiếm trên Google',
        'Gõ liên tiếp năm dấu chấm hỏi và năm dấu chấm than vào ô tìm kiếm',
        'Chuyển ngôn ngữ của trình duyệt sang tiếng Pháp hoặc tiếng Nhật Bản',
        'Nhấn phím Caps Lock trên bàn phím máy tính mười lần liên tiếp nhau'
      ],
      correctIndex: 0,
      explanation: 'Cú pháp "filetype:pdf" là toán tử tìm kiếm chuyên biệt lọc kết quả chính xác theo đuôi định dạng tệp.'
    },
    {
      id: 5029,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Đặc điểm nào của một trang web chứng tỏ thông tin bài viết có độ tin cậy và giá trị học thuật cao?',
      options: [
        'Có tác giả chuyên gia rõ ràng, nguồn trích dẫn uy tín và ngày cập nhật gần nhất',
        'Có thật nhiều hình ảnh nhấp nháy quảng cáo mỹ phẩm và trò chơi cá cược',
        'Bài viết có tiêu đề giật gân, phóng đại và không có tên của tác giả bài viết',
        'Trang web có giao diện màu mè và tự động mở ra mười cửa sổ phụ quảng cáo'
      ],
      correctIndex: 0,
      explanation: 'Tính tin cậy của thông tin số dựa trên: Tác giả chuyên môn, tổ chức phát hành, nguồn trích dẫn và thời gian cập nhật.'
    },
    {
      id: 5030,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi tìm thấy nhiều thông tin trái ngược nhau về cùng một sự kiện lịch sử trên mạng, em nên làm gì?',
      options: [
        'Đối chiếu với sách giáo khoa Lịch sử và tham khảo ý kiến của thầy cô giáo',
        'Tin ngay vào bài viết xuất hiện đầu tiên có nhiều lượt bình luận tranh cãi',
        'Tự ý chọn bừa một thông tin bất kì mà em cảm thấy đọc thuận tai nhất',
        'Chia sẻ cả hai thông tin sai lệch lên mạng xã hội để người khác tự đoán'
      ],
      correctIndex: 0,
      explanation: 'Kiểm chứng chéo thông tin (Fact-checking) với nguồn chính thống (SGK, giáo viên) là kĩ năng xử lí thông tin thiết yếu.'
    }
  ],

  // Bài 3: Tìm kiếm thông tin trong giải quyết vấn đề (id: 3)
  3: [
    {
      id: 5036,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Bước đầu tiên và quan trọng nhất trước khi bắt tay vào tìm kiếm thông tin trên Internet để giải quyết vấn đề là gì?',
      options: [
        'Xác định rõ vấn đề cần giải quyết và mục tiêu thông tin cần tìm là gì',
        'Bật máy tính lên và gõ ngẫu nhiên bất kì từ ngữ nào hiện ra trong đầu',
        'Tải về tất cả các tệp tài liệu xuất hiện trên màn hình mà không cần đọc',
        'Chia sẻ đường link của các trang web quảng cáo cho tất cả bạn bè trong lớp'
      ],
      correctIndex: 0,
      explanation: 'Quy trình giải quyết vấn đề: Xác định mục tiêu và yêu cầu thông tin trước khi tiến hành thu thập dữ liệu.'
    },
    {
      id: 5037,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi làm dự án học tập "Các loài hoa đặc trưng của bốn mùa", việc thu thập thông tin nên bao gồm các dạng nào?',
      options: [
        'Thu thập cả văn bản mô tả, hình ảnh màu sắc rõ nét và video về các loài hoa',
        'Chỉ tìm đúng một câu ca dao ngắn và không tìm thêm bất kì thông tin nào khác',
        'Chỉ sao chép toàn bộ một trang từ điển tiếng Anh dài mà không dịch nghĩa',
        'Chỉ vẽ các hình vẽ trừu tượng bằng phần mềm Paint mà không tìm tư liệu thật'
      ],
      correctIndex: 0,
      explanation: 'Thu thập tư liệu đa phương tiện (chữ viết, hình ảnh, video) giúp sản phẩm dự án sinh động, thuyết phục.'
    },
    {
      id: 5038,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Sau khi thu thập được nhiều tư liệu trên Internet, bước "Chọn lọc và Xử lí thông tin" yêu cầu học sinh làm gì?',
      options: [
        'Loại bỏ thông tin thừa, kiểm tra tính đúng đắn và sắp xếp theo dàn ý bài học',
        'Dán nguyên vẹn toàn bộ các trang web vào bài làm mà không cần đọc lại',
        'Xóa hết toàn bộ bài làm và báo cáo với cô giáo là trên mạng không có thông tin',
        'Chỉ giữ lại những câu chữ có màu sắc sặc sỡ nhất để làm đẹp cho bài nộp'
      ],
      correctIndex: 0,
      explanation: 'Chọn lọc dữ liệu, tổng hợp và cấu trúc hóa thông tin theo mạch nội dung là bước quyết định chất lượng bài làm.'
    },
    {
      id: 5039,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi tìm kiếm cách sơ cứu khi bị bỏng nước sôi tại nhà, nguồn tin nào sau đây là an toàn và đáng tin cậy nhất?',
      options: [
        'Cổng thông tin chính thức của Bộ Y tế hoặc bệnh viện đa khoa uy tín',
        'Một bài đăng không rõ người viết chia sẻ mẹo đắp lá cây lạ lên vết thương',
        'Một đoạn video clip vui nhộn trên mạng xã hội thử thách nhúng tay vào nước đá',
        'Một bình luận dưới bài viết của một tài khoản ẩn danh không có hình đại diện'
      ],
      correctIndex: 0,
      explanation: 'Thông tin y tế, sức khỏe bắt buộc phải lấy từ cơ quan y tế chính thức (Bộ Y tế, WHO) để tránh tai biến nguy hiểm.'
    },
    {
      id: 5040,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Việc ghi chép lại nguồn gốc trang web và tên tác giả khi thu thập thông tin trên mạng thể hiện phẩm chất gì?',
      options: [
        'Tính trung thực, tôn trọng bản quyền và trách nhiệm của người làm nghiên cứu',
        'Sự yếu kém và phụ thuộc hoàn toàn vào kiến thức của người khác trên mạng',
        'Làm cho bài thuyết trình trở nên rườm rà và không thể chấm điểm cao được',
        'Làm tốn bộ nhớ lưu trữ của tệp tài liệu và làm cho máy tính chạy chậm đi'
      ],
      correctIndex: 0,
      explanation: 'Trích dẫn nguồn là phẩm chất cốt lõi của tính trung thực học thuật và đạo đức thông tin của người học.'
    }
  ],

  // Bài 4: Cây thư mục (id: 4)
  4: [
    {
      id: 5046,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Đường dẫn (File Path) ví dụ: "D:\\HocTap\\Lop5\\TinHoc\\BaiKiemTra.docx" cho em biết điều gì?',
      options: [
        'Đường đi chính xác qua từng cấp thư mục từ ổ đĩa D để tìm đến tệp bài kiểm tra',
        'Thời gian mà chiếc máy tính để bàn được sản xuất tại nhà máy linh kiện điện tử',
        'Số lượng học sinh đang ngồi học trong phòng thực hành Tin học của trường',
        'Mật khẩu bảo vệ của tài khoản ngân hàng của gia đình bạn học sinh đó'
      ],
      correctIndex: 0,
      explanation: 'Đường dẫn (Path) mô tả phân cấp vị trí: Ổ đĩa -> Thư mục mẹ -> Thư mục con -> Tệp tin đích.'
    },
    {
      id: 5047,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Trong cửa sổ File Explorer, ngăn bên trái (Navigation Pane) hiển thị cấu trúc cây thư mục dưới dạng nào?',
      options: [
        'Cây phân cấp thu gọn và mở rộng bằng các mũi tên tam giác nhỏ bên cạnh',
        'Một danh sách gồm các bức tranh hoạt hình di chuyển vòng tròn liên tục',
        'Một bàn phím ảo hiển thị đầy đủ các chữ cái và chữ số tiếng Việt',
        'Một biểu đồ hình quạt thể hiện nhiệt độ của thùng máy tính để bàn'
      ],
      correctIndex: 0,
      explanation: 'Ngăn Navigation Pane hiển thị cây thư mục phân nhánh, bấm mũi tên để mở rộng hoặc thu gọn các nhánh con.'
    },
    {
      id: 5048,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Khi một thư mục mẹ bị xóa bỏ (Delete), tất cả các thư mục con và tệp tin nằm bên trong thư mục đó sẽ ra sao?',
      options: [
        'Tất cả thư mục con và tệp tin bên trong cũng bị xóa đồng thời cùng thư mục mẹ',
        'Các tệp tin bên trong sẽ tự động nhảy sang màn hình Desktop của máy tính',
        'Các thư mục con sẽ tự động biến thành các tệp văn bản Word trắng tinh',
        'Không có bất kì thay đổi nào vì thư mục con không liên quan tới thư mục mẹ'
      ],
      correctIndex: 0,
      explanation: 'Xóa thư mục mẹ sẽ xóa toàn bộ cây nhánh và nội dung bên trong; cần kiểm tra cẩn thận trước khi xóa.'
    },
    {
      id: 5049,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Tại sao em KHÔNG NÊN lưu trữ các tệp bài học quan trọng của mình trực tiếp trong ổ đĩa hệ thống C: ?',
      options: [
        'Ổ đĩa C chứa tệp hệ điều hành, dễ bị mất dữ liệu khi cài lại máy tính',
        'Ổ đĩa C không cho phép lưu trữ bất kì một tệp văn bản nào vào bên trong',
        'Lưu vào ổ C sẽ làm cho chiếc bàn phím máy tính bị kẹt phím Enter ngay',
        'Ổ C là ổ đĩa chỉ dành riêng cho các bạn học sinh lớp Một và lớp Hai dùng'
      ],
      correctIndex: 0,
      explanation: 'Ổ C: là ổ cài đặt Windows, khi máy bị lỗi phải cài lại sẽ bị format sạch; dữ liệu cá nhân nên lưu ở ổ D: hoặc E:.'
    },
    {
      id: 5050,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Thao tác kéo thả một thư mục từ ổ đĩa D sang một vị trí thư mục khác trên cùng ổ đĩa D sẽ thực hiện việc gì?',
      options: [
        'Di chuyển thư mục đó sang vị trí mới (Move folder)',
        'Tạo ra một bản sao nhân đôi chép sang thư mục mới (Copy)',
        'Xóa sạch toàn bộ nội dung của thư mục đó vào thùng rác',
        'Đổi tên thư mục thành tên mặc định New Folder tự động'
      ],
      correctIndex: 0,
      explanation: 'Kéo thả tệp/thư mục trên cùng một ổ đĩa tương đương với thao tác Di chuyển (Move).'
    }
  ],

  // Bài 5: Bản quyền nội dung thông tin (id: 5)
  5: [
    {
      id: 5056,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Biểu tượng chữ C tròn: © (Copyright) xuất hiện bên dưới một cuốn sách hoặc trang web có ý nghĩa pháp lí là gì?',
      options: [
        'Bản quyền đã được đăng kí bảo hộ, cấm sao chép trái phép nếu chưa được đồng ý',
        'Đây là một trang web miễn phí cho phép mọi người tự do sao chép bán lấy tiền',
        'Trang web này đã ngừng hoạt động và không còn bất kì thông tin nào hữu ích',
        'Biểu tượng trang trí nghệ thuật cho đẹp mắt mà không có bất kì ý nghĩa nào'
      ],
      correctIndex: 0,
      explanation: 'Kí hiệu © (Copyright) khẳng định quyền tác giả và quyền sở hữu trí tuệ được pháp luật quốc tế bảo vệ.'
    },
    {
      id: 5057,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Hành vi sao chép nguyên văn một bài văn của người khác trên mạng rồi dán vào bài thi và ghi tên mình là hành vi gì?',
      options: [
        'Hành vi đạo văn (Plagiarism) gian lận học thuật và vi phạm quyền tác giả',
        'Hành vi sáng tạo tài tình thể hiện kĩ năng Tin học xuất sắc của học sinh',
        'Một phương pháp học tập hiện đại được các nhà khoa học khuyến khích làm theo',
        'Hành động giúp tác giả gốc trở nên nổi tiếng hơn trên mạng xã hội toàn cầu'
      ],
      correctIndex: 0,
      explanation: 'Đạo văn là hành vi chiếm đoạt sản phẩm trí tuệ của người khác làm của mình, bị xử lí nghiêm khắc trong giáo dục.'
    },
    {
      id: 5058,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Giấy phép Creative Commons (CC) thường được các tác giả sử dụng nhằm mục đích gì?',
      options: [
        'Cho phép cộng đồng sử dụng và chia sẻ tác phẩm kèm theo một số điều kiện quy định',
        'Cấm tuyệt đối mọi người không được phép đọc hay nhìn thấy tác phẩm của mình',
        'Bắt buộc người xem phải trả tiền mặt trực tiếp cho tác giả sau mỗi lượt xem',
        'Tự động xóa bỏ tác phẩm khỏi Internet sau khi đăng tải được hai mươi bốn giờ'
      ],
      correctIndex: 0,
      explanation: 'Giấy phép CC (Creative Commons) chuẩn hóa việc chia sẻ tài nguyên giáo dục mở có ghi nhận công lao tác giả.'
    },
    {
      id: 5059,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Để sử dụng hình ảnh trên mạng một cách an toàn và hợp pháp cho dự án học tập, em nên tìm ảnh ở nguồn nào?',
      options: [
        'Tìm kiếm hình ảnh trong miền công cộng (Public Domain) hoặc có giấy phép CC',
        'Tải trộm ảnh cá nhân trên trang Facebook riêng tư của những người không quen',
        'Chụp trộm ảnh tài liệu mật của cơ quan nhà nước đưa lên mạng xã hội',
        'Dùng phần mềm chỉnh sửa xóa sạch tên tác giả gốc để nhận là ảnh của mình'
      ],
      correctIndex: 0,
      explanation: 'Kho ảnh công cộng (Public domain / Creative Commons như Unsplash, Pixabay, Wikimedia) cho phép tái sử dụng hợp pháp.'
    },
    {
      id: 5060,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Khi chia sẻ video bài thuyết trình của nhóm lên YouTube, nếu sử dụng bài hát có bản quyền làm nhạc nền thì chuyện gì có thể xảy ra?',
      options: [
        'Video có thể bị tắt tiếng hoặc bị gỡ bỏ do vi phạm bản quyền âm nhạc',
        'Kênh YouTube của trường sẽ tự động được tặng nút vàng vinh danh',
        'Chiếc máy tính dùng để tải video sẽ tự động bị hỏng loa không nghe được',
        'Tác giả bài hát sẽ đến tận lớp học để tặng quà cho các bạn học sinh'
      ],
      correctIndex: 0,
      explanation: 'Hệ thống tự động Content ID của YouTube quét bản quyền âm thanh và sẽ tắt tiếng hoặc gỡ video vi phạm.'
    }
  ],

  // Bài 6: Định dạng kí tự và bố trí hình ảnh trong văn bản (id: 6)
  6: [
    {
      id: 5066,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Hộp thoại Font trong phần mềm Microsoft Word cho phép em tùy chỉnh những thuộc tính kí tự nâng cao nào?',
      options: [
        'Phông chữ, kiểu chữ, cỡ chữ, màu chữ, khoảng cách giữa các kí tự và hiệu ứng chữ',
        'Tùy chỉnh số lượng trang giấy in ra từ chiếc máy in laser kết nối với máy tính',
        'Tùy chỉnh tốc độ quay của quạt làm mát nằm bên trong thùng máy tính để bàn',
        'Tùy chỉnh độ phân giải của chiếc webcam gắn trên đỉnh màn hình máy tính'
      ],
      correctIndex: 0,
      explanation: 'Hộp thoại Font (Ctrl + D) cung cấp đầy đủ các thuộc tính chuyên sâu về định dạng kí tự (Font, Character Spacing).'
    },
    {
      id: 5067,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Tùy chọn Text Wrapping dạng "Square" khi chèn ảnh vào trang văn bản Word có tác dụng gì?',
      options: [
        'Đoạn văn bản sẽ tự động bao bọc xung quanh bốn cạnh của bức ảnh theo hình chữ nhật',
        'Hình ảnh sẽ biến thành một khối vuông màu đen che khuất toàn bộ bài viết',
        'Văn bản sẽ tự động chạy xuyên thẳng qua tâm giữa của bức tranh minh họa',
        'Bức ảnh sẽ tự động bay nhảy liên tục từ trang đầu tiên đến trang cuối cùng'
      ],
      correctIndex: 0,
      explanation: 'Kiểu Square bố trí văn bản uốn quanh khung chữ nhật của ảnh, tạo cảm giác trình bày báo chí chuyên nghiệp.'
    },
    {
      id: 5068,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để áp dụng kiểu chữ nghệ thuật uốn lượn có bóng đổ cho tiêu đề của bài báo tường, em dùng công cụ nào?',
      options: [
        'Công cụ WordArt trong tab Insert của phần mềm Word',
        'Nút lệnh Subscript (chỉ số dưới ví dụ H2O) ở tab Home',
        'Nút lệnh Strikethrough (gạch ngang qua giữa từ ngữ)',
        'Nút lệnh Clear All Formatting (xóa sạch mọi định dạng chữ)'
      ],
      correctIndex: 0,
      explanation: 'WordArt là công cụ tạo chữ nghệ thuật với nhiều hiệu ứng 3D, bóng đổ, viền màu phong phú cho tiêu đề.'
    },
    {
      id: 5069,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khoảng cách giữa các dòng trong đoạn văn bản (Line Spacing) chuẩn thường dùng trong tài liệu học tập là bao nhiêu?',
      options: [
        'Khoảng cách 1.15 dòng hoặc 1.5 dòng để mắt dễ đọc, thoáng đãng',
        'Khoảng cách 0.2 dòng làm cho các dòng chữ đè sát sạt lên nhau',
        'Khoảng cách 10 dòng làm cho mỗi trang giấy chỉ chứa được hai dòng chữ',
        'Không cần quan tâm vì các dòng chữ tự động cách nhau ngẫu nhiên'
      ],
      correctIndex: 0,
      explanation: 'Line spacing 1.15 hoặc 1.5 tạo độ thoáng tối ưu, chống mỏi mắt và giúp việc đọc tài liệu trôi chảy.'
    },
    {
      id: 5070,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để cắt bỏ phần rìa thừa xung quanh của một bức ảnh trực tiếp ngay trong Word, em chọn công cụ nào?',
      options: [
        'Công cụ "Crop" trong tab Picture Format',
        'Công cụ "Rotate" dùng để xoay ảnh nghiêng',
        'Công cụ "Delete" dùng để xóa ảnh hoàn toàn',
        'Công cụ "Align" dùng để căn lề cho bức ảnh'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Crop trong tab Picture Format cho phép xén bớt các chi tiết thừa ở viền ngoài bức ảnh nhanh chóng.'
    }
  ],

  // Bài 7: Thực hành soạn thảo văn bản (id: 7)
  7: [
    {
      id: 5076,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi muốn chèn một bảng (Table) gồm 4 cột và 5 hàng vào văn bản, em thực hiện thao tác nào?',
      options: [
        'Vào tab Insert -> Chọn Table -> Rê chuột chọn vùng lưới 4 cột x 5 hàng',
        'Vào tab Home -> Chọn nút Bold in đậm -> Nhấn phím Enter năm lần',
        'Vào tab View -> Chọn Ruler thước kẻ -> Kéo dài thanh thước kẻ ra hai bên',
        'Vào tab Layout -> Chọn Margins căn lề -> Chọn kiểu căn lề Narrow hẹp'
      ],
      correctIndex: 0,
      explanation: 'Tab Insert -> Table là nơi tạo bảng biểu trực quan theo số cột (Columns) và số hàng (Rows) mong muốn.'
    },
    {
      id: 5077,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để gộp nhiều ô liền nhau trong bảng thành một ô duy nhất (Merge Cells), em dùng lệnh nào trong tab Layout của bảng?',
      options: [
        'Chọn các ô cần gộp rồi nhấp nút lệnh "Merge Cells"',
        'Chọn các ô cần gộp rồi nhấp nút lệnh "Split Cells"',
        'Chọn các ô cần gộp rồi bấm phím Delete trên bàn phím',
        'Chọn các ô cần gộp rồi tắt phần mềm Microsoft Word đi'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Merge Cells gộp các ô liền kề thành một ô lớn, thường dùng làm ô tiêu đề chung cho nhiều cột.'
    },
    {
      id: 5078,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để điều chỉnh độ rộng của một cột trong bảng cho vừa khít với nội dung chữ viết bên trong, em thao tác ra sao?',
      options: [
        'Nhấp đúp chuột vào đường kẻ dọc phân cách giữa hai cột trong bảng',
        'Bôi đen toàn bộ trang văn bản rồi nhấn phím Caps Lock trên bàn phím',
        'Nhấn giữ phím Shift và lăn bánh lăn chuột máy tính liên tục mười lần',
        'Xóa toàn bộ chiếc bảng đó đi rồi vẽ lại một chiếc bảng mới to hơn'
      ],
      correctIndex: 0,
      explanation: 'Nhấp đúp vào đường viền cột (AutoFit to Contents) tự động co giãn cột vừa khớp với từ dài nhất trong cột.'
    },
    {
      id: 5079,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Thao tác tô màu nền cho một ô trong bảng (Shading) có tác dụng gì đối với việc trình bày dữ liệu?',
      options: [
        'Làm nổi bật dòng tiêu đề hoặc các con số tổng kết quan trọng trong bảng',
        'Làm cho chiếc bảng tự động biến mất và chuyển thành một bức tranh',
        'Khóa không cho bất kì ai được phép gõ thêm chữ cái vào trong ô đó',
        'Làm cho các con số tính toán tự động tăng lên gấp mười lần giá trị'
      ],
      correctIndex: 0,
      explanation: 'Tô màu nền (Shading) giúp phân biệt trực quan giữa hàng tiêu đề và các hàng dữ liệu chi tiết.'
    },
    {
      id: 5080,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Trước khi in văn bản ra giấy bằng máy in, tính năng "Print Preview" (Xem trước khi in) giúp em kiểm tra điều gì?',
      options: [
        'Xem trước cách bố trí trang, lề trang, lỗi ngắt trang để chỉnh sửa kịp thời',
        'Xem trước màu sắc của loại mực in đang có trong hộp mực của máy in',
        'Đo đạc độ dày của từng tờ giấy trắng đang được nạp vào khay giấy in',
        'Kiểm tra nhiệt độ của phòng học xem có đủ mát để mở máy in hay không'
      ],
      correctIndex: 0,
      explanation: 'Print Preview (Ctrl + P) hiển thị trang in y như thật, giúp rà soát bố cục, tránh lãng phí giấy in khi có lỗi.'
    }
  ],

  // Bài 8: Làm quen với phần mềm đồ hoạ tạo sản phẩm số (id: 8)
  8: [
    {
      id: 5086,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Phần mềm đồ họa ứng dụng (như Paint, Canva, Paint.NET) giúp học sinh tạo ra những sản phẩm số nào sau đây?',
      options: [
        'Thiệp chúc mừng ngày 20/11, áp phích cổ động, tranh vẽ và sơ đồ tư duy',
        'Một chiếc bàn phím máy tính để bàn bằng nhựa có gắn đèn led nhiều màu',
        'Một chiếc quạt điện quay mát đặt ở góc phòng học của các bạn học sinh',
        'Một đôi giày thể thao chạy bộ chuyên nghiệp dùng trong giờ thể dục'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm đồ họa hỗ trợ thiết kế các sản phẩm số (Digital Artifacts) như thiệp, poster, banner tuyên truyền.'
    },
    {
      id: 5087,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Công cụ vẽ hình mẫu có sẵn (Shapes) trong các phần mềm đồ họa giúp em vẽ nhanh chóng các đối tượng nào?',
      options: [
        'Hình ngôi sao, hình tròn, hình chữ nhật, hình mũi tên và đám mây đối thoại',
        'Một bài văn tả cảnh hoàng hôn trên biển dài năm trang giấy tập viết',
        'Bảng cửu chương nhân chia toán học từ bảng hai đến bảng chín hoàn chỉnh',
        'Một đoạn video clip ca nhạc có đầy đủ phụ đề tiếng Anh và tiếng Việt'
      ],
      correctIndex: 0,
      explanation: 'Công cụ Shapes chứa thư viện hình học chuẩn giúp vẽ nhanh các khối hình chính xác, thẩm mỹ.'
    },
    {
      id: 5088,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Công cụ đổ màu (Fill with color / Thùng sơn) hoạt động dựa trên nguyên tắc nào khi tô màu vùng kín?',
      options: [
        'Tô kín toàn bộ một vùng màu có đường biên bao quanh khép kín hoàn toàn',
        'Tô loang ra toàn bộ bức tranh nếu đường viền có một khe hở dù rất nhỏ',
        'Chỉ tô được màu đen và màu trắng mà không thể chọn được màu sắc khác',
        'Tự động xóa sạch toàn bộ các nét vẽ đã có trên trang giấy của phần mềm'
      ],
      correctIndex: 0,
      explanation: 'Công cụ thùng sơn lấp đầy màu cho vùng biên kín; nếu nét vẽ bị hở, màu sẽ tràn ra toàn bộ nền tranh.'
    },
    {
      id: 5089,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi thiết kế một tấm thiệp chúc mừng thầy cô, nguyên tắc phối màu sắc nào mang lại tính thẩm mỹ cao nhất?',
      options: [
        'Chọn tông màu chủ đạo trang nhã, màu chữ tương phản rõ rệt với màu nền',
        'Dùng tất cả 50 màu sắc khác nhau cùng lúc khiến bức tranh trở nên lòe loẹt',
        'Dùng màu chữ trùng khít với màu nền làm cho không ai có thể đọc được chữ',
        'Chỉ dùng duy nhất màu xám đen u tối cho toàn bộ tấm thiệp chúc mừng'
      ],
      correctIndex: 0,
      explanation: 'Phối màu thẩm mỹ: Tông màu chủ đạo hài hòa, thông điệp chữ rõ ràng, độ tương phản tốt giữa chữ và nền thiệp.'
    },
    {
      id: 5090,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Định dạng tệp hình ảnh phổ biến và chuẩn quốc tế thường được lưu sau khi thiết kế xong sản phẩm đồ họa là gì?',
      options: [
        'Định dạng ảnh .PNG (ảnh sắc nét trong suốt) hoặc .JPG (ảnh chụp nén nhẹ)',
        'Định dạng văn bản .DOCX của phần mềm soạn thảo văn bản Word',
        'Định dạng bảng tính .XLSX của phần mềm bảng tính văn phòng Excel',
        'Định dạng bài giảng .PPTX của phần mềm trình chiếu PowerPoint'
      ],
      correctIndex: 0,
      explanation: 'PNG và JPG là hai định dạng ảnh chuẩn đa nền tảng, tương thích trên mọi thiết bị máy tính và điện thoại.'
    }
  ],

  // Bài 9: Thực hành tạo sản phẩm số và đồ dùng gia đình (id: 9)
  9: [
    {
      id: 5096,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Một sản phẩm số (Digital Product) do học sinh tự làm ra mang lại ý nghĩa giáo dục thiết thực nào?',
      options: [
        'Ứng dụng kiến thức Tin học vào phục vụ sinh hoạt thực tế và tặng người thân',
        'Để bán lấy một số tiền thật lớn làm giàu cho bản thân và gia đình',
        'Làm cho học sinh không cần phải tham gia các hoạt động tập thể ở trường',
        'Để khoe khoang và chê bai những người bạn không biết sử dụng máy tính'
      ],
      correctIndex: 0,
      explanation: 'Sản phẩm số thể hiện năng lực vận dụng công nghệ giải quyết nhu cầu đời sống (nhãn vở, thời khóa biểu, thiệp tặng).'
    },
    {
      id: 5097,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi thiết kế một tấm Thời khóa biểu cá nhân để dán ở góc học tập, các thông tin bắt buộc phải có là gì?',
      options: [
        'Các thứ trong tuần, các tiết học buổi sáng, buổi chiều và tên môn học cụ thể',
        'Toàn bộ danh sách số điện thoại của các bạn học sinh trong khối lớp Một',
        'Một câu chuyện ngụ ngôn dài về chú rùa và thỏ chạy thi trong rừng sâu',
        'Công thức nấu các món ăn ngon vào ngày tết nguyên đán của gia đình em'
      ],
      correctIndex: 0,
      explanation: 'Thời khóa biểu cần rõ ràng: Cột thứ (Thứ 2 đến Thứ 6), hàng tiết học (Tiết 1-5), tên môn học và giờ giấc.'
    },
    {
      id: 5098,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để in sản phẩm nhãn vở hoặc thiệp chúc mừng ra giấy vừa vặn kích thước mong muốn, em cần lưu ý điều gì?',
      options: [
        'Chọn khổ giấy in phù hợp (A4, A5) và thiết lập tỉ lệ kích thước trang in chuẩn',
        'Bật máy in lên và bấm in liên tục một trăm bản mà không cần xem trước',
        'Vẽ sản phẩm tràn ra ngoài mép giấy màn hình mà không cần quan tâm đến lề',
        'Rút phích cắm điện của máy in ra rồi cắm lại thật nhanh trong lúc đang in'
      ],
      correctIndex: 0,
      explanation: 'Thiết lập kích thước trang (Page Setup) và canh lề trước khi in đảm bảo sản phẩm ra giấy chuẩn tỉ lệ thực tế.'
    },
    {
      id: 5099,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi cùng các bạn trong nhóm phối hợp làm một cuốn Kỉ yếu ảnh của lớp, công việc nào thể hiện sự hợp tác tốt?',
      options: [
        'Phân công công việc rõ ràng: bạn thu thập ảnh, bạn viết lời chúc, bạn thiết kế',
        'Một bạn ôm toàn bộ công việc làm một mình và không cho các bạn khác tham gia',
        'Mỗi bạn tự thiết kế một kiểu lộn xộn rồi cãi nhau trong giờ thực hành Tin học',
        'Không bạn nào chịu làm bài và chờ đợi nhóm bạn khác làm xong để sao chép'
      ],
      correctIndex: 0,
      explanation: 'Kĩ năng làm việc nhóm số (Digital Collaboration) đòi hỏi phân công mạch lạc, tôn trọng ý kiến và phối hợp đồng bộ.'
    },
    {
      id: 5100,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Sau khi hoàn thành sản phẩm số, bước tự đánh giá theo các tiêu chí (Đẹp mắt, Đầy đủ thông tin, Sáng tạo) giúp ích gì?',
      options: [
        'Giúp em nhận ra điểm mạnh, điểm cần cải thiện để nâng cao tay nghề thiết kế',
        'Làm cho sản phẩm tự động được điểm mười mà không cần nộp cho thầy cô giáo',
        'Làm mất thời gian vô ích vì sản phẩm làm ra rồi thì không bao giờ cần sửa',
        'Khiến cho máy tính tự động xuất bản sản phẩm lên trên đài truyền hình quốc gia'
      ],
      correctIndex: 0,
      explanation: 'Tự đánh giá theo tiêu chí rubric giúp học sinh phát triển năng lực tự chủ, tự học và hoàn thiện sản phẩm.'
    }
  ],

  // Bài 10: Cấu trúc tuần tự (id: 10)
  10: [
    {
      id: 5106,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Bản chất của "Cấu trúc tuần tự" (Sequential Structure) trong lập trình và đời sống được định nghĩa là gì?',
      options: [
        'Các câu lệnh hoặc hành động được thực hiện lần lượt theo đúng thứ tự từ trên xuống dưới',
        'Các hành động nhảy cóc ngẫu nhiên không tuân theo bất kì thứ tự trước sau nào',
        'Hành động này lặp đi lặp lại vô tận mãi mãi mà không bao giờ chuyển sang hành động khác',
        'Hành động chỉ được làm khi có người lớn nhắc nhở còn bình thường thì đứng yên'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc tuần tự: Lệnh sau chỉ được thực thi khi lệnh trước đó đã hoàn thành trọn vẹn theo trình tự tuyến tính.'
    },
    {
      id: 5107,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong Scratch, nếu em ghép 3 khối lệnh: [Đi 10 bước] -> [Xoay phải 90 độ] -> [Nói "Chào!"], thứ tự chạy sẽ là gì?',
      options: [
        'Nhân vật đi 10 bước trước, sau đó xoay phải 90 độ, rồi mới nói "Chào!"',
        'Nhân vật nói "Chào!" trước, sau đó đi 10 bước, rồi mới xoay người lại',
        'Cả ba hành động cùng diễn ra đồng thời trong đúng một phần nghìn giây',
        'Nhân vật chỉ xoay người mà bỏ qua không thèm đi bước nào và không chào'
      ],
      correctIndex: 0,
      explanation: 'Scratch thực thi ngăn xếp khối lệnh (Stack) theo nguyên tắc cấu trúc tuần tự từ khối trên cùng xuống dưới.'
    },
    {
      id: 5108,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong quy trình rút tiền từ máy ATM: Bước nào bắt buộc phải thực hiện trước bước máy nhả tiền mặt?',
      options: [
        'Đưa thẻ vào máy và nhập đúng mã PIN bảo mật của chủ tài khoản',
        'Cầm tiền cất vào ví và quay lưng đi về nhà nấu cơm tối',
        'Nhận hóa đơn in giấy và gửi lời cảm ơn tới chiếc máy ATM',
        'Rút tiền xong rồi mới đưa thẻ ngân hàng vào trong khe nhận thẻ'
      ],
      correctIndex: 0,
      explanation: 'Xác thực mã PIN là điều kiện tuần tự tiên quyết phải thực hiện thành công thì ATM mới cho phép giao dịch tiền.'
    },
    {
      id: 5109,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi lập trình cho chú rùa vẽ một hình vuông trong Scratch, quy trình tuần tự gồm các thao tác lặp lại là gì?',
      options: [
        'Đi thẳng một đoạn rồi xoay 90 độ, lặp lại tuần tự bốn lần như vậy',
        'Chỉ đi thẳng một mạch không xoay người và đi mãi ra ngoài mép màn hình',
        'Xoay tròn tại chỗ 360 độ liên tục mà không di chuyển bất kì bước nào',
        'Nhảy lên cao rồi rơi xuống đất mà không cần dùng đến cây bút vẽ'
      ],
      correctIndex: 0,
      explanation: 'Hình vuông có 4 cạnh bằng nhau và 4 góc vuông 90 độ: [Di chuyển a bước -> Quay 90 độ] x 4 lần.'
    },
    {
      id: 5110,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh [Đợi 1 giây] (Wait 1 seconds) chèn vào giữa hai lệnh chuyển động trong cấu trúc tuần tự có tác dụng gì?',
      options: [
        'Tạo khoảng dừng nhịp nhàng giúp mắt người quan sát rõ từng bước chuyển động',
        'Làm cho chiếc máy tính bị đơ máy và không bao giờ chạy được tiếp nữa',
        'Tự động tăng tốc độ xử lí của bộ não nhân vật lên gấp mười lần bình thường',
        'Xóa bỏ toàn bộ các khối lệnh nằm ở phía sau khối lệnh đợi một giây đó'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Wait tạo độ trễ thời gian (delay) cần thiết để người xem kịp quan sát và cảm nhận hiệu ứng chuyển động.'
    }
  ],

  // Bài 11: Cấu trúc lặp (id: 11)
  11: [
    {
      id: 5116,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong đời sống hàng ngày, hiện tượng nào sau đây là ví dụ minh họa rõ nét nhất cho "Cấu trúc lặp"?',
      options: [
        'Kim giây của đồng hồ quay đều đặn 60 giây hoàn thành một vòng tuần hoàn',
        'Một tiếng sét bất ngờ đánh xuống ngọn cây trong cơn bão mùa hè',
        'Một bạn học sinh bị ngã xe một lần duy nhất vào năm ngoái',
        'Ngày sinh nhật của em chỉ diễn ra đúng một ngày trong năm'
      ],
      correctIndex: 0,
      explanation: 'Kim đồng hồ quay đều đặn, mặt trời mọc rồi lặn mỗi ngày là các ví dụ tự nhiên kinh điển của cấu trúc lặp.'
    },
    {
      id: 5117,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Vòng lặp "Lặp lại [10] lần" (Repeat [10]) trong Scratch thuộc loại cấu trúc lặp nào?',
      options: [
        'Vòng lặp với số lần biết trước (Lặp xác định)',
        'Vòng lặp vô tận không bao giờ kết thúc (Lặp mãi mãi)',
        'Vòng lặp không xác định chờ một điều kiện xảy ra',
        'Vòng lặp ngẫu nhiên không tuân theo quy luật nào'
      ],
      correctIndex: 0,
      explanation: 'Khối "Repeat n" là vòng lặp với số lần lặp được xác định chính xác trước (Fixed loop).'
    },
    {
      id: 5118,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Vòng lặp "Liên tục" (Forever) trong Scratch thường được sử dụng trong tình huống lập trình nào?',
      options: [
        'Lập trình cho nhân vật luôn luôn di chuyển hoặc liên tục lắng nghe tương tác bàn phím',
        'Chỉ cho nhân vật cử động đúng một bước chân rồi dừng hẳn mãi mãi',
        'Khi muốn tắt phần mềm Scratch và đóng cửa sổ làm việc lại',
        'Khi muốn xóa sạch toàn bộ các nhân vật đang có trên sân khấu'
      ],
      correctIndex: 0,
      explanation: 'Khối lệnh Forever là vòng lặp game loop chính, giữ cho nhân vật luôn vận động và sẵn sàng đón nhận sự kiện điều khiển.'
    },
    {
      id: 5119,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Để vẽ một hình tam giác đều có 3 cạnh bằng nhau, số lần lặp và góc quay của nhân vật trong Scratch là bao nhiêu?',
      options: [
        'Lặp lại 3 lần, mỗi lần di chuyển một đoạn rồi xoay 120 độ',
        'Lặp lại 4 lần, mỗi lần di chuyển một đoạn rồi xoay 90 độ',
        'Lặp lại 5 lần, mỗi lần di chuyển một đoạn rồi xoay 72 độ',
        'Lặp lại 6 lần, mỗi lần di chuyển một đoạn rồi xoay 60 độ'
      ],
      correctIndex: 0,
      explanation: 'Góc quay ngoài của đa giác đều n cạnh: 360 / n. Với tam giác đều: 360 / 3 = 120 độ; lặp 3 lần.'
    },
    {
      id: 5120,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Lợi ích to lớn nhất của việc áp dụng cấu trúc lặp vào chương trình máy tính là gì?',
      options: [
        'Làm cho chương trình ngắn gọn, sáng sủa, tiết kiệm bộ nhớ và dễ sửa lỗi',
        'Làm cho chương trình trở nên dài dòng hàng triệu trang mã lệnh phức tạp',
        'Làm cho máy tính phải chạy hết công suất và tiêu tốn nhiều năng lượng',
        'Khiến cho người khác đọc vào không thể hiểu được ý tưởng của tác giả'
      ],
      correctIndex: 0,
      explanation: 'Vòng lặp loại bỏ sự lặp lại thủ công dư thừa, nâng cao tính cấu trúc và vẻ đẹp tối ưu của thuật toán.'
    }
  ],

  // Bài 12: Thực hành sử dụng lệnh lặp (id: 12)
  12: [
    {
      id: 5126,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh "Lặp lại cho đến khi <điều kiện>" (Repeat until <condition>) trong Scratch sẽ dừng lặp lại khi nào?',
      options: [
        'Dừng lại ngay khi điều kiện kiểm tra bên trong trở thành ĐÚNG',
        'Dừng lại ngay khi điều kiện kiểm tra bên trong vẫn còn SAI',
        'Không bao giờ dừng lại dù có bất kì điều gì xảy ra trên màn hình',
        'Tự động dừng lại sau đúng mười giây kể từ lúc bấm lá cờ xanh'
      ],
      correctIndex: 0,
      explanation: 'Repeat until lặp liên tục khi điều kiện còn Sai, và chấm dứt vòng lặp ngay khi điều kiện thỏa mãn (Đúng).'
    },
    {
      id: 5127,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi lập trình nhân vật con cá bơi qua bơi lại trên sân khấu, khối lệnh nào giúp cá tự động quay đầu khi chạm bờ tường?',
      options: [
        'Khối lệnh "Bật lại nếu chạm cạnh" (If on edge, bounce)',
        'Khối lệnh "Ẩn thân" (Hide) trong nhóm lệnh ngoại hình Looks',
        'Khối lệnh "Xóa tất cả" (Erase all) trong phần mở rộng bút vẽ Pen',
        'Khối lệnh "Dừng lại tất cả" (Stop all) trong nhóm lệnh Control'
      ],
      correctIndex: 0,
      explanation: 'Khối lệnh "If on edge, bounce" phát hiện va chạm mép sân khấu và phản xạ đảo hướng chuyển động thông minh.'
    },
    {
      id: 5128,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Để vẽ một hình tròn hoàn chỉnh bằng phần mở rộng Bút vẽ (Pen) trong Scratch, em lập trình vòng lặp như thế nào?',
      options: [
        'Lặp lại 360 lần: [Di chuyển 1 bước -> Xoay 1 độ]',
        'Lặp lại 4 lần: [Di chuyển 100 bước -> Xoay 90 độ]',
        'Lặp lại 2 lần: [Di chuyển 50 bước -> Xoay 180 độ]',
        'Lặp lại 1 lần: [Di chuyển 360 bước mà không cần xoay]'
      ],
      correctIndex: 0,
      explanation: 'Hình tròn tương đương đa giác 360 cạnh cực nhỏ: Lặp 360 lần mỗi lần tiến 1 bước và xoay 1 độ (tổng 360 độ).'
    },
    {
      id: 5129,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong trò chơi nhặt táo rơi, vòng lặp điều khiển quả táo rơi từ trên đỉnh màn hình xuống dưới đáy diễn ra như thế nào?',
      options: [
        'Liên tục thay đổi tọa độ Y một lượng âm (như: Thay đổi Y một lượng -5)',
        'Liên tục thay đổi tọa độ X một lượng dương (như: Thay đổi X một lượng +10)',
        'Đặt quả táo nằm yên ở chính giữa sân khấu tọa độ X=0, Y=0 mãi mãi',
        'Cho quả táo xoay tròn tại chỗ 360 độ mà không hề di chuyển xuống dưới'
      ],
      correctIndex: 0,
      explanation: 'Trục thẳng đứng Y: Giảm Y (Y âm) làm nhân vật rơi xuống, tăng Y (Y dương) làm nhân vật bay lên cao.'
    },
    {
      id: 5130,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi một vòng lặp bị lỗi lặp vô tận không có điểm dừng làm cho chương trình bị đơ, nút nào trên Scratch giúp em dừng khẩn cấp?',
      options: [
        'Nút hình bát giác màu đỏ (Nút Stop dừng lại) cạnh lá cờ xanh',
        'Nút phóng to toàn màn hình ở góc trên cùng bên phải',
        'Nút chuyển đổi ngôn ngữ hình quả địa cầu bên góc trái',
        'Nút thu nhỏ cửa sổ trình duyệt web xuống thanh Taskbar'
      ],
      correctIndex: 0,
      explanation: 'Nút bát giác màu đỏ (Stop) dừng ngay lập tức mọi kịch bản và vòng lặp đang chạy trong dự án Scratch.'
    }
  ],

  // Bài 13: Cấu trúc rẽ nhánh (id: 13)
  13: [
    {
      id: 5136,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh rẽ nhánh đầy đủ: "Nếu <điều kiện> thì ... Nếu không thì ..." (If ... then ... else ...) hoạt động ra sao?',
      options: [
        'Nếu điều kiện Đúng thì làm nhánh 1; nếu điều kiện Sai thì làm nhánh 2',
        'Thực hiện đồng thời cả hai nhánh cùng lúc dù điều kiện Đúng hay Sai',
        'Bỏ qua cả hai nhánh và tự động tắt chương trình phần mềm Scratch đi',
        'Chỉ thực hiện nhánh 2 mà không bao giờ thèm kiểm tra điều kiện'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc If-Then-Else rẽ thành 2 ngã độc lập: Thỏa điều kiện đi nhánh Then, không thỏa điều kiện rẽ nhánh Else.'
    },
    {
      id: 5137,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong trò chơi hỏi đáp trắc nghiệm trên Scratch: Khối lệnh kiểm tra câu trả lời của người chơi đúng hay sai là khối nào?',
      options: [
        'Khối điều kiện so sánh: <(trả lời) = [đáp án đúng]>',
        'Khối lệnh di chuyển: [di chuyển 10 bước] về phía trước',
        'Khối lệnh âm thanh: [phát âm thanh Meow cho đến hết]',
        'Khối lệnh ngoại hình: [đổi trang phục sang costume2]'
      ],
      correctIndex: 0,
      explanation: 'Khối phép toán so sánh bằng <(answer) = [đáp án]> kiểm tra sự trùng khớp giữa câu trả lời nhập vào và đáp án.'
    },
    {
      id: 5138,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi lập trình điều khiển xe ô tô tránh chướng ngại vật: "Nếu <đang chạm [Tảng đá]?> thì [Lùi lại 20 bước]". Đây là cấu trúc gì?',
      options: [
        'Cấu trúc rẽ nhánh dạng thiếu (Nếu ... thì ...)',
        'Cấu trúc rẽ nhánh dạng đủ (Nếu ... thì ... Nếu không thì ...)',
        'Cấu trúc lặp tuần hoàn vô tận không có điều kiện dừng',
        'Cấu trúc tuần tự đơn giản không có bất kì điều kiện nào'
      ],
      correctIndex: 0,
      explanation: 'Chỉ có nhánh hành động khi điều kiện Đúng mà không có nhánh "Nếu không thì", đây là dạng rẽ nhánh khuyết (If-Then).'
    },
    {
      id: 5139,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối cảm biến hình lục giác màu xanh ngọc <đang chạm [con trỏ chuột]?> (touching mouse-pointer?) trả về giá trị gì?',
      options: [
        'Trả về giá trị Đúng (True) hoặc giá trị Sai (False)',
        'Trả về một chuỗi các chữ cái bài hát thiếu nhi Việt Nam',
        'Trả về tọa độ X và Y của tâm chiếc màn hình máy tính',
        'Trả về màu sắc của bộ lông nhân vật chú mèo Scratch'
      ],
      correctIndex: 0,
      explanation: 'Các khối lục giác là biểu thức logic (Boolean), chỉ trả về một trong hai trạng thái chân lí: True hoặc False.'
    },
    {
      id: 5140,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong hệ thống điều hòa tự động: "Nếu nhiệt độ phòng > 30 độ thì bật máy lạnh; nếu không thì tắt máy". Quyết định khi nhiệt độ là 28 độ là gì?',
      options: [
        'Tắt máy lạnh vì điều kiện nhiệt độ > 30 độ không thỏa mãn (Sai)',
        'Bật máy lạnh ở mức tối đa vì 28 độ là nhiệt độ rất nóng nực',
        'Làm cho chiếc máy lạnh phát ra tiếng chuông báo động cứu hỏa',
        'Tự động tăng nhiệt độ phòng lên mức 50 độ C ngay lập tức'
      ],
      correctIndex: 0,
      explanation: 'Vì 28 > 30 là Sai, hệ thống rẽ vào nhánh Else (nhánh "Nếu không thì"), ra quyết định Tắt máy lạnh.'
    }
  ],

  // Bài 14: Sử dụng biến trong chương trình (id: 14)
  14: [
    {
      id: 5146,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khái niệm "Biến" (Variable) trong lập trình máy tính được hiểu một cách trực quan và dễ nhớ nhất là gì?',
      options: [
        'Một chiếc hộp có dán nhãn dùng để lưu trữ dữ liệu có thể thay đổi được',
        'Một bức tranh phong cảnh tĩnh vẽ trên trang giấy không bao giờ đổi',
        'Một phím bấm cố định nằm ở góc ngoài cùng của bàn phím máy tính',
        'Một dây cáp nối giữa chuột máy tính và thùng máy tính để bàn'
      ],
      correctIndex: 0,
      explanation: 'Biến số (Variable) như chiếc hộp nhớ có tên nhãn, dùng để lưu trữ giá trị số, chữ và có thể cập nhật trong khi chạy.'
    },
    {
      id: 5147,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong trò chơi hái táo, để lưu trữ và tăng điểm số mỗi khi bắt được một quả táo, em cần tạo đối tượng nào?',
      options: [
        'Tạo một biến số mới đặt tên là [Điểm số] (hoặc Score)',
        'Tạo một nhân vật chú mèo Scratch mới đặt ở góc dưới',
        'Tạo một bức ảnh phông nền sân khấu mới màu xanh lam',
        'Cắm thêm một chiếc USB dung lượng lớn vào thân máy tính'
      ],
      correctIndex: 0,
      explanation: 'Biến số "Điểm số" là đối tượng lưu trữ trạng thái game, tăng lên mỗi khi người chơi hoàn thành nhiệm vụ.'
    },
    {
      id: 5148,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi bắt đầu một ván chơi mới, khối lệnh nào giúp đưa điểm số của người chơi quay trở về mốc xuất phát ban đầu?',
      options: [
        'Khối lệnh: [Đặt [Điểm số] thành [0]] (Set [Score] to [0])',
        'Khối lệnh: [Thay đổi [Điểm số] một lượng [1]] (Change by 1)',
        'Khối lệnh: [Xóa tất cả các biến số] trong phần mềm Scratch',
        'Khối lệnh: [Ẩn biến số [Điểm số]] không cho hiển thị lên'
      ],
      correctIndex: 0,
      explanation: 'Khối "Set variable to 0" khởi tạo lại giá trị ban đầu cho biến số khi bắt đầu một phiên chơi mới.'
    },
    {
      id: 5149,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Nếu ban đầu biến [Điểm số] đang là 5, khi chạy lệnh [Thay đổi [Điểm số] một lượng [2]], giá trị mới của biến là bao nhiêu?',
      options: [
        'Giá trị mới là 7 (vì 5 + 2 = 7)',
        'Giá trị mới là 2 (vì số 2 vừa được gõ vào)',
        'Giá trị mới là 10 (vì 5 nhân với 2 bằng 10)',
        'Giá trị mới quay trở về 0 ngay lập tức'
      ],
      correctIndex: 0,
      explanation: 'Lệnh "Change variable by n" cộng thêm giá trị n vào giá trị hiện tại của biến: 5 + 2 = 7.'
    },
    {
      id: 5150,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi lập trình đồng hồ đếm ngược thời gian trong trò chơi, khối lệnh thay đổi biến [Thời gian] sau mỗi giây là khối nào?',
      options: [
        'Khối lệnh: [Thay đổi [Thời gian] một lượng [-1]]',
        'Khối lệnh: [Thay đổi [Thời gian] một lượng [10]]',
        'Khối lệnh: [Đặt [Thời gian] thành [1000]]',
        'Khối lệnh: [Xóa biến số [Thời gian] đi]'
      ],
      correctIndex: 0,
      explanation: 'Đếm ngược (Countdown) đòi hỏi trừ bớt 1 đơn vị sau mỗi giây: Thay đổi thời gian một lượng -1.'
    }
  ],

  // Bài 15: Sử dụng biểu thức trong chương trình (id: 15)
  15: [
    {
      id: 5156,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Nhóm lệnh Các phép toán (Operators - màu xanh lá cây) trong Scratch cung cấp những công cụ tính toán nào sau đây?',
      options: [
        'Các phép tính cộng, trừ, nhân, chia, phép so sánh và lấy số ngẫu nhiên',
        'Các công cụ vẽ tranh tô màu và tẩy xóa nét vẽ trên sân khấu',
        'Các khối lệnh điều khiển nhân vật chạy nhảy và lộn nhào',
        'Các khối lệnh bật tắt nguồn điện của màn hình máy tính'
      ],
      correctIndex: 0,
      explanation: 'Nhóm Operators chuyên xử lí biểu thức số học (+, -, *, /), so sánh (<, =, >) và hàm ngẫu nhiên (Pick random).'
    },
    {
      id: 5157,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh [Lấy ngẫu nhiên từ [1] đến [10]] (Pick random [1] to [10]) có tác dụng hữu ích gì trong trò chơi?',
      options: [
        'Tạo ra tính bất ngờ, xuất hiện chướng ngại vật ở các vị trí ngẫu nhiên khác nhau',
        'Làm cho chiếc máy tính luôn luôn trả về một con số cố định là số 5',
        'Làm cho màn hình máy tính tự động bị đổi màu sắc liên tục mười lần',
        'Làm cho bàn phím máy tính tự động nhảy chữ mà không cần người bấm'
      ],
      correctIndex: 0,
      explanation: 'Sinh số ngẫu nhiên (Randomization) là yếu tố cốt lõi tạo nên sự hấp dẫn, không đoán trước được trong trò chơi.'
    },
    {
      id: 5158,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Biểu thức logic kết hợp: <(Điểm số > 10) VÀ (Thời gian > 0)> sẽ trả về kết quả ĐÚNG khi nào?',
      options: [
        'Khi CẢ HAI điều kiện đều đồng thời xảy ra đúng (Điểm trên 10 và vẫn còn thời gian)',
        'Chỉ cần một trong hai điều kiện xảy ra đúng là hệ thống đã chấp nhận',
        'Khi cả hai điều kiện đều bị sai thì biểu thức mới trở thành đúng',
        'Biểu thức này luôn luôn sai trong mọi trường hợp trên phần mềm Scratch'
      ],
      correctIndex: 0,
      explanation: 'Phép toán logic VÀ (AND) chỉ trả về kết quả Đúng khi tất cả các mệnh đề thành phần đều đồng thời Đúng.'
    },
    {
      id: 5159,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh [Kết hợp [Xin chào ] và [Tên]] (Join [apple] [banana]) trong Scratch dùng để làm công việc gì?',
      options: [
        'Ghép nối hai chuỗi chữ cái lại với nhau thành một câu hoàn chỉnh',
        'Thực hiện phép tính nhân hai số học lại với nhau thành tích số',
        'Xóa bỏ toàn bộ các chữ cái nguyên âm có trong tên của nhân vật',
        'Tự động gửi bức thư điện tử tới địa chỉ của bạn học sinh đó'
      ],
      correctIndex: 0,
      explanation: 'Khối Join nối các chuỗi văn bản (String concatenation), ví dụ ghép "Xin chào " + Tên học sinh thành "Xin chào Minh".'
    },
    {
      id: 5160,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Biểu thức tính điểm trung bình của ba bài kiểm tra Toán, Tiếng Việt và Tin học được lập trình ra sao?',
      options: [
        'Biểu thức: ((Điểm Toán + Điểm Tiếng Việt + Điểm Tin học) / 3)',
        'Biểu thức: (Điểm Toán + Điểm Tiếng Việt + Điểm Tin học * 3)',
        'Biểu thức: (Điểm Toán * Điểm Tiếng Việt * Điểm Tin học / 3)',
        'Biểu thức: (Điểm Toán - Điểm Tiếng Việt - Điểm Tin học + 3)'
      ],
      correctIndex: 0,
      explanation: 'Trung bình cộng: Tính tổng tất cả các điểm thành phần trong ngoặc trước, sau đó chia cho số lượng môn (chia 3).'
    }
  ],

  // Bài 16: Từ kịch bản đến chương trình (id: 16)
  16: [
    {
      id: 5166,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Quy trình chuẩn các bước để chuyển đổi từ một ý tưởng trong đầu thành một chương trình Scratch hoàn chỉnh là gì?',
      options: [
        'Xây dựng kịch bản chi tiết -> Thiết kế nhân vật, sân khấu -> Lắp ráp khối lệnh -> Chạy thử và sửa lỗi',
        'Lắp khối lệnh ngẫu nhiên trước -> Sau đó mới nghĩ xem chương trình làm gì -> Tắt máy tính đi ngủ',
        'Vẽ tranh thật nhiều trên giấy -> Không cần mở máy tính lên làm -> Nộp bài thi cho cô giáo chấm',
        'Sao chép bài của bạn khác về máy -> Đổi tên tác giả thành tên mình -> Nộp bài dự thi sáng tạo'
      ],
      correctIndex: 0,
      explanation: 'Vòng đời phát triển phần mềm: Lên ý tưởng/kịch bản -> Chuẩn bị tài nguyên -> Lập trình mã -> Thử nghiệm & gỡ lỗi (Debug).'
    },
    {
      id: 5167,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Hoạt động "Gỡ lỗi" (Debugging) trong lập trình máy tính được hiểu là hoạt động gì?',
      options: [
        'Tìm kiếm, phát hiện nguyên nhân sai sót trong chương trình và chỉnh sửa lại cho đúng',
        'Bắt các con côn trùng kiến, gián chui vào bên trong thùng máy tính để bàn',
        'Dùng khăn ướt lau sạch bụi bẩn bám trên bề mặt các phím bấm của bàn phím',
        'Xóa bỏ toàn bộ dự án đang làm và không bao giờ học môn Tin học nữa'
      ],
      correctIndex: 0,
      explanation: 'Debugging là kĩ năng then chốt của lập trình viên, rà soát logic để tìm và khắc phục các sai sót thuật toán.'
    },
    {
      id: 5168,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi lập trình dự án Trí tuệ nhân tạo (AI) nhận diện biển báo giao thông, bước huấn luyện máy tính (Training) cần điều gì?',
      options: [
        'Cung cấp nhiều hình ảnh mẫu đa dạng của từng loại biển báo kèm nhãn tên chính xác',
        'Chỉ cung cấp đúng một bức ảnh mờ tối và bắt máy tính phải tự đoán mò',
        'Bật máy tính lên để đó trong mười ngày mà không đưa bất kì dữ liệu mẫu nào vào',
        'Dùng bút màu vẽ trực tiếp các biển báo lên trên mặt kính của màn hình máy'
      ],
      correctIndex: 0,
      explanation: 'Học máy (Machine Learning) đòi hỏi tập dữ liệu huấn luyện (Training Data) đủ lớn và chuẩn nhãn để nhận diện đúng.'
    },
    {
      id: 5169,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Thái độ kiên trì, không nản lòng khi chương trình gặp lỗi chạy chưa đúng như mong muốn thể hiện đức tính gì của học sinh?',
      options: [
        'Phẩm chất kiên trì, tư duy phản biện và tinh thần dám đối mặt giải quyết khó khăn',
        'Sự yếu đuối và không có năng khiếu học tập các môn khoa học công nghệ',
        'Làm mất thời gian vô ích và nên từ bỏ ngay lập tức chuyển sang việc khác',
        'Thói quen dựa dẫm vào thầy cô giáo và bắt thầy cô phải làm bài hộ cho mình'
      ],
      correctIndex: 0,
      explanation: 'Lập trình rèn luyện tính kiên nhẫn, thử và sai khoa học, không bỏ cuộc trước các thử thách hóc búa.'
    },
    {
      id: 5170,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Dự án Tin học cuối cấp Tiểu học (Lớp 5) là cơ hội tuyệt vời để học sinh thể hiện năng lực tổng hợp nào sau đây?',
      options: [
        'Vận dụng toàn diện kiến thức Tin học 3, 4, 5 để tạo sản phẩm số có ích phục vụ cộng đồng',
        'Chứng minh rằng mình có thể chơi game máy tính giỏi hơn tất cả các bạn trong trường',
        'Khoe khoang chiếc máy tính đắt tiền mới được bố mẹ mua tặng vào ngày sinh nhật',
        'Tranh giành phần thưởng của các bạn học sinh lớp dưới trong ngày hội sáng tạo trẻ'
      ],
      correctIndex: 0,
      explanation: 'Dự án cuối cấp kết tinh kiến thức thông tin, văn phòng, đồ họa, an toàn mạng và lập trình thành sản phẩm số ý nghĩa.'
    }
  ]
};
