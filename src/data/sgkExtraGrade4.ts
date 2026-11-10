import { QuizQuestion } from '../types';

/**
 * 80 CÂU HỎI PHẦN 2 (CÂU 6 - 10) CHO 16 BÀI HỌC SGK TIN HỌC 4
 * Bám sát SGK Tin học 4 Kết Nối Tri Thức Với Cuộc Sống.
 * Tập trung vào mức độ Thông hiểu và Vận dụng thực hành (Phần cứng, phần mềm, Word, PPT, Scratch).
 * Chuẩn kỷ luật 4 phương án cân bằng độ dài, chống đoán mò.
 */
export const SGK_EXTRA_GRADE_4: Record<number, QuizQuestion[]> = {
  // Bài 1: Phần cứng và phần mềm máy tính (id: 1)
  1: [
    {
      id: 4016,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi em cắm một chiếc USB vào máy tính để sao chép bài học, chiếc USB đó thuộc thành phần nào?',
      options: [
        'Thuộc về Phần cứng (thiết bị lưu trữ dữ liệu sờ thấy được)',
        'Thuộc về Phần mềm (chương trình cài đặt chạy trong máy)',
        'Thuộc về hệ điều hành Windows điều khiển toàn bộ máy tính',
        'Thuộc về mạng Internet toàn cầu kết nối các máy tính với nhau'
      ],
      correctIndex: 0,
      explanation: 'USB là thiết bị phần cứng lưu trữ di động có thể cầm nắm, cắm rút vật lí trực tiếp vào máy tính.'
    },
    {
      id: 4017,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Mối quan hệ tương hỗ giữa Phần cứng và Phần mềm của máy tính được thể hiện chuẩn xác qua phát biểu nào?',
      options: [
        'Phần cứng là thể xác, phần mềm là linh hồn chỉ huy phần cứng hoạt động',
        'Phần cứng có thể tự vận hành thông minh mà không cần bất kì phần mềm nào',
        'Phần mềm có thể tự hiển thị hình ảnh mà không cần đến màn hình máy tính',
        'Phần cứng và phần mềm là hai đối tượng hoàn toàn giống hệt nhau về bản chất'
      ],
      correctIndex: 0,
      explanation: 'Phần cứng cần phần mềm ra lệnh điều khiển để hoạt động; phần mềm cần phần cứng làm môi trường thực thi.'
    },
    {
      id: 4018,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Hệ điều hành Windows (hoặc macOS, Android) được xếp vào loại phần mềm nào sau đây trong máy tính?',
      options: [
        'Phần mềm hệ thống quản lí và điều khiển toàn bộ thiết bị máy tính',
        'Phần mềm ứng dụng chỉ dùng để vẽ tranh và tô màu nghệ thuật',
        'Phần mềm diệt virus máy tính do một công ty tư nhân phát hành',
        'Thiết bị phần cứng nằm ở bên trong thùng máy tính để bàn'
      ],
      correctIndex: 0,
      explanation: 'Hệ điều hành là phần mềm hệ thống cốt lõi, làm nền tảng cho mọi phần mềm ứng dụng khác hoạt động.'
    },
    {
      id: 4019,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Đối tượng nào sau đây được phân loại chính xác là Phần mềm ứng dụng giúp học sinh học tập và giải trí?',
      options: [
        'Phần mềm soạn thảo Word và phần mềm lập trình trực quan Scratch',
        'Màn hình tinh thể lỏng hiển thị màu sắc sắc nét của máy tính',
        'Bàn phím cơ có dây nối trực tiếp vào thân máy tính để bàn',
        'Thanh bộ nhớ RAM cắm trên bo mạch chủ bên trong thùng máy'
      ],
      correctIndex: 0,
      explanation: 'Word, PowerPoint, Scratch, phần mềm gõ phím là các phần mềm ứng dụng phục vụ nhu cầu cụ thể của con người.'
    },
    {
      id: 4020,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi loa máy tính bị hỏng màng loa không phát ra được tiếng, đây là lỗi thuộc về thành phần nào?',
      options: [
        'Lỗi thuộc về thiết bị phần cứng phát âm thanh của máy tính',
        'Lỗi thuộc về phần mềm nghe nhạc Windows Media Player',
        'Lỗi do bài hát trên mạng Internet bị mất hết giai điệu',
        'Lỗi do bàn phím máy tính bị kẹt phím Spacebar dài'
      ],
      correctIndex: 0,
      explanation: 'Loa là thiết bị phần cứng xuất âm thanh, hỏng hóc cơ học ở màng loa là sự cố phần cứng.'
    }
  ],

  // Bài 2: Gõ bàn phím đúng cách (id: 2)
  2: [
    {
      id: 4026,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Lợi ích lớn nhất của việc rèn luyện thói quen gõ bàn phím chuẩn 10 ngón mà không cần nhìn bàn phím là gì?',
      options: [
        'Tăng tốc độ gõ, giảm sai sót và mắt tập trung quan sát màn hình',
        'Làm cho bàn phím máy tính không bao giờ bị bám bụi bẩn',
        'Giúp máy tính hoạt động nhanh hơn mà không bị nóng máy',
        'Làm cho chữ viết in ra giấy tự động có nhiều màu sắc đẹp'
      ],
      correctIndex: 0,
      explanation: 'Gõ 10 ngón giúp tăng tốc độ gõ (WPM), mắt tập trung vào tài liệu trên màn hình và giảm căng thẳng cơ cổ.'
    },
    {
      id: 4027,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Trên hàng phím cơ sở, ngón trỏ tay phải phụ trách hai phím chữ nào theo đúng quy tắc gõ 10 ngón?',
      options: [
        'Phụ trách phím có gờ J và vươn sang trái một phím để gõ phím H',
        'Phụ trách phím A và vươn sang phím S ở bên cạnh hàng phím',
        'Phụ trách phím K và phím L ở góc bên phải của bàn phím',
        'Phụ trách phím Spacebar dài nằm ở hàng phím dưới cùng'
      ],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay phải đặt ở phím gờ J và mở rộng sang trái để gõ phím H.'
    },
    {
      id: 4028,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Để gõ dấu chấm cảm (!) ở hàng phím số phía trên, em cần phối hợp ngón tay như thế nào?',
      options: [
        'Nhấn giữ phím Shift bằng một tay và ngón út tay kia gõ phím số 1',
        'Nhấn giữ phím Caps Lock rồi gõ liên tiếp hai lần vào phím số 1',
        'Nhấn đồng thời cả phím cách Spacebar và phím Enter trên bàn phím',
        'Chỉ cần gõ nhẹ một lần vào phím số 1 mà không cần nhấn thêm phím nào'
      ],
      correctIndex: 0,
      explanation: 'Kí tự phía trên của hàng phím số (như !, @, #, $) yêu cầu nhấn giữ phím Shift kết hợp gõ phím số tương ứng.'
    },
    {
      id: 4029,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Sau khi vươn ngón tay lên gõ các phím Q, W, E, R ở hàng phím trên, ngón tay của em cần làm gì ngay lập tức?',
      options: [
        'Thu ngón tay ngay về vị trí xuất phát trên hàng phím cơ sở',
        'Giữ nguyên ngón tay tại hàng phím trên để chờ câu tiếp theo',
        'Nhấc toàn bộ cả hai bàn tay rời khỏi bàn phím máy tính',
        'Đặt hai ngón tay trỏ lên trên màn hình cảm ứng của máy'
      ],
      correctIndex: 0,
      explanation: 'Quy tắc vàng của gõ 10 ngón: Sau khi vươn ngón tay gõ ở hàng trên hoặc dưới, ngón tay luôn thu về hàng cơ sở.'
    },
    {
      id: 4030,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      part: 2,
      question: 'Khi gõ tiếng Việt kiểu Telex, để gõ được chữ cái "Đ" viết hoa ở đầu câu, em thực hiện thao tác gõ nào?',
      options: [
        'Nhấn giữ phím Shift và gõ liên tiếp hai chữ "D" (hoặc bật Caps Lock)',
        'Gõ chữ "D" rồi gõ thêm chữ số 9 trên hàng phím số máy tính',
        'Gõ chữ "D" rồi nhấn phím cách Spacebar hai lần liên tiếp',
        'Gõ chữ "D" kết hợp nhấn chuột phải vào giữa trang văn bản'
      ],
      correctIndex: 0,
      explanation: 'Trong kiểu gõ Telex: dd ra đ; kết hợp phím Shift (hoặc bật Caps Lock) để viết in hoa chữ Đ.'
    }
  ],

  // Bài 3: Thông tin trên trang web (id: 3)
  3: [
    {
      id: 4036,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Một trang web đa phương tiện hiện đại thường tích hợp những dạng thông tin phong phú nào sau đây?',
      options: [
        'Văn bản, hình ảnh tĩnh, âm thanh, video clip và các siêu liên kết',
        'Chỉ có các dòng chữ đen trắng mà không thể chèn thêm hình ảnh',
        'Chỉ phát ra các âm thanh bài hát mà không hiển thị được chữ viết',
        'Chỉ chứa duy nhất các con số tính toán trong bảng tính văn phòng'
      ],
      correctIndex: 0,
      explanation: 'Trang web hiện đại là môi trường đa phương tiện (Multimedia) kết hợp văn bản, đồ họa, âm thanh, video và liên kết.'
    },
    {
      id: 4037,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Siêu văn bản (Hypertext) khác biệt cơ bản với văn bản in truyền thống trên sách báo ở điểm đặc trưng nào?',
      options: [
        'Chứa các liên kết giúp người đọc nhấp chuột chuyển sang trang khác',
        'Được in ra bằng loại mực phát sáng lấp lánh trong bóng tối',
        'Không bao giờ có thể đọc được bằng mắt thường của con người',
        'Chỉ có thể lưu trữ được trên đĩa mềm dung lượng nhỏ thời xưa'
      ],
      correctIndex: 0,
      explanation: 'Siêu văn bản chứa các siêu liên kết (Hyperlinks) cho phép điều hướng linh hoạt giữa các tài liệu trên mạng.'
    },
    {
      id: 4038,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi đọc tin tức trên một trang web, nếu thấy một từ ngữ có màu xanh dương và gạch chân ở dưới, điều đó có ý nghĩa gì?',
      options: [
        'Đó là một liên kết, khi nhấp chuột vào sẽ mở ra trang thông tin liên quan',
        'Đó là một từ ngữ viết sai chính tả bị hệ thống gạch chân báo lỗi',
        'Đó là một mật khẩu bảo vệ bí mật không được phép nhấp chuột vào',
        'Đó là một kí tự đặc biệt dùng để tắt màn hình máy tính đang mở'
      ],
      correctIndex: 0,
      explanation: 'Chữ màu xanh có gạch chân là dấu hiệu nhận biết trực quan phổ biến nhất của một đường siêu liên kết web.'
    },
    {
      id: 4039,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Thao tác nào giúp em lưu lại địa chỉ của một trang web học tập hay (Bookmark) để lần sau mở lại nhanh chóng?',
      options: [
        'Nhấp vào biểu tượng hình ngôi sao (Bookmark / Dấu trang) trên trình duyệt',
        'Tắt màn hình máy tính để lưu lại hình ảnh trang web đang hiển thị',
        'Ghi địa chỉ trang web bằng bút mực lên trên vỏ nhựa của màn hình',
        'Nhấn phím Backspace liên tục mười lần để ghi nhớ địa chỉ web'
      ],
      correctIndex: 0,
      explanation: 'Tính năng Bookmark (ngôi sao trên thanh địa chỉ trình duyệt) giúp đánh dấu và quản lí các website yêu thích.'
    },
    {
      id: 4040,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi duyệt web, hành động nào sau đây giúp em tự bảo vệ mình trước những nguy cơ lừa đảo trực tuyến?',
      options: [
        'Kiểm tra địa chỉ trang web có ổ khóa bảo mật (https://) và nguồn tin cậy',
        'Bấm vào mọi quảng cáo trúng thưởng hiện lên bất ngờ trên trang web',
        'Nhập số điện thoại và mật khẩu gia đình theo mọi lời mời trên mạng',
        'Tải về tất cả các tệp lạ đính kèm mà người không quen biết gửi tới'
      ],
      correctIndex: 0,
      explanation: 'Biểu tượng ổ khóa và tiền tố https:// chứng minh trang web có chứng chỉ mã hóa dữ liệu an toàn và đáng tin cậy.'
    }
  ],

  // Bài 4: Tìm kiếm thông tin trên Internet (id: 4)
  4: [
    {
      id: 4046,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Máy tìm kiếm (như Google, Bing, Cốc Cốc) hoạt động dựa trên nguyên lí nào để trả về kết quả cho em?',
      options: [
        'Tìm kiếm các trang web chứa từ khóa (Keyword) mà người dùng nhập vào',
        'Tự động viết ra một bài văn hoàn toàn mới trong vòng một giây',
        'Tìm kiếm vị trí của các bạn học sinh đang ngồi trong lớp học',
        'Đo đạc nhiệt độ ngoài trời bằng cảm biến gắn trên máy tính để bàn'
      ],
      correctIndex: 0,
      explanation: 'Máy tìm kiếm sử dụng thuật toán đối chiếu từ khóa (Keywords) với cơ sở dữ liệu khổng lồ của các trang web.'
    },
    {
      id: 4047,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Để tìm kiếm thông tin về "Di tích lịch sử Văn Miếu Quốc Tử Giám", cách đặt từ khóa nào sau đây là ngắn gọn và hiệu quả nhất?',
      options: [
        '"Văn Miếu Quốc Tử Giám lịch sử"',
        '"Chào bác Google bác có biết Văn Miếu ở đâu không ạ chỉ cho cháu với"',
        'Chỉ gõ đúng một chữ cái "V" vào ô tìm kiếm của trình duyệt',
        '"Hôm nay là thứ hai em muốn đi chơi Văn Miếu cùng cả lớp 4A"'
      ],
      correctIndex: 0,
      explanation: 'Từ khóa tìm kiếm cần ngắn gọn, cô đọng, loại bỏ các từ chào hỏi dư thừa để máy tìm kiếm trả kết quả chính xác nhất.'
    },
    {
      id: 4048,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi em muốn tìm kiếm CHÍNH XÁC một cụm từ mà không bị tách rời các chữ, em nên đặt cụm từ đó trong kí hiệu nào?',
      options: [
        'Đặt cụm từ tìm kiếm bên trong cặp dấu ngoặc kép: "cụm từ"',
        'Đặt cụm từ tìm kiếm bên trong cặp dấu ngoặc đơn: (cụm từ)',
        'Gõ thêm dấu chấm hỏi ở cuối mỗi chữ cái trong cụm từ',
        'Gõ dấu gạch chéo ngược phân cách giữa tất cả các chữ cái'
      ],
      correctIndex: 0,
      explanation: 'Dấu ngoặc kép "..." là cú pháp tìm kiếm nâng cao yêu cầu máy tìm kiếm trả về đúng nguyên văn thứ tự cụm từ đó.'
    },
    {
      id: 4049,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi máy tìm kiếm trả về hàng triệu kết quả trong danh sách, kết quả nào thường được ưu tiên hiển thị ở các vị trí đầu tiên?',
      options: [
        'Các trang web có nội dung phù hợp nhất và độ uy tín tin cậy cao',
        'Các trang web chứa nhiều lỗi chính tả và virus độc hại nhất',
        'Các trang web được tạo ra vào ngày hôm qua có ít người xem',
        'Các trang web ngẫu nhiên được máy tính bốc thăm may rủi'
      ],
      correctIndex: 0,
      explanation: 'Thuật toán tìm kiếm xếp hạng (PageRank) ưu tiên những trang web có độ liên quan cao nhất và nguồn gốc tin cậy.'
    },
    {
      id: 4050,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      part: 2,
      question: 'Khi tìm kiếm hình ảnh minh họa cho bài thuyết trình môn Khoa học, em nên chọn tab chức năng nào trên trang tìm kiếm Google?',
      options: [
        'Chọn tab "Hình ảnh" (Images) ngay dưới thanh ô nhập từ khóa',
        'Chọn tab "Tin tức" (News) để đọc các bài báo thời sự hàng ngày',
        'Chọn tab "Bản đồ" (Maps) để tìm đường đi tới trường học',
        'Chọn tab "Tài chính" (Finance) để theo dõi giá cả thị trường'
      ],
      correctIndex: 0,
      explanation: 'Tab "Hình ảnh" (Images) lọc riêng kết quả dạng tranh ảnh, đồ họa phù hợp để tải về làm tư liệu thuyết trình.'
    }
  ],

  // Bài 5: Thao tác với tệp và thư mục (id: 5)
  5: [
    {
      id: 4056,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Để sao chép một tệp bài làm từ thư mục này sang thư mục khác, em sử dụng cặp lệnh chuẩn nào sau đây?',
      options: [
        'Lệnh "Copy" (sao chép) rồi sang thư mục mới chọn lệnh "Paste" (dán)',
        'Lệnh "Cut" (cắt bỏ) rồi chọn lệnh "Delete" (xóa vĩnh viễn tệp)',
        'Lệnh "Rename" (đổi tên) rồi chọn lệnh "Properties" (thuộc tính)',
        'Lệnh "Open" (mở tệp) rồi tắt màn hình máy tính để tự sao chép'
      ],
      correctIndex: 0,
      explanation: 'Cặp lệnh Copy (Ctrl + C) và Paste (Ctrl + V) dùng để tạo bản sao tệp ở một vị trí thư mục mới.'
    },
    {
      id: 4057,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Sự khác biệt cốt lõi giữa lệnh "Cut" (Cắt) và lệnh "Copy" (Sao chép) khi làm việc với tệp là gì?',
      options: [
        'Lệnh "Cut" di chuyển tệp gốc đi nơi khác; lệnh "Copy" giữ lại tệp gốc và tạo thêm bản sao',
        'Lệnh "Cut" làm tệp biến mất vĩnh viễn; lệnh "Copy" đổi tên tệp thành tên mới',
        'Lệnh "Cut" chỉ áp dụng cho hình ảnh; lệnh "Copy" chỉ áp dụng cho tệp văn bản',
        'Hai lệnh này hoàn toàn giống hệt nhau không có bất kì điểm khác biệt nào'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Cut di chuyển hẳn tệp gốc sang vị trí mới, còn Copy nhân bản tệp (vị trí cũ vẫn còn nguyên).'
    },
    {
      id: 4058,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Khi muốn chọn đồng thời nhiều tệp nằm LIÊN TIẾP nhau trong danh sách, em giữ phím nào khi nhấp chuột?',
      options: [
        'Nhấn giữ phím Shift trên bàn phím khi nhấp chuột chọn tệp đầu và tệp cuối',
        'Nhấn giữ phím Spacebar dài khi nhấp chuột chọn từng tệp một',
        'Nhấn giữ phím Caps Lock trên bàn phím trong suốt quá trình chọn',
        'Nhấn giữ phím Esc ở góc trên cùng bên trái của bàn phím'
      ],
      correctIndex: 0,
      explanation: 'Giữ phím Shift chọn khối tệp liên tiếp; giữ phím Ctrl chọn các tệp rời rạc không liên tiếp.'
    },
    {
      id: 4059,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Một tệp tài liệu trong máy tính thường có hai phần: "Tên tệp" và "Phần mở rộng" được phân cách bởi kí hiệu gì?',
      options: [
        'Phân cách nhau bởi một dấu chấm (.) ví dụ: BaiTap.docx',
        'Phân cách nhau bởi một dấu gạch chéo ngược (\\) ví dụ: BaiTap\\docx',
        'Phân cách nhau bởi một dấu chấm hỏi (?) ví dụ: BaiTap?docx',
        'Phân cách nhau bởi một dấu sao (*) ví dụ: BaiTap*docx'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc tệp: [Tên_tệp].[Phần_mở_rộng] (như .docx cho Word, .pptx cho PowerPoint, .png cho ảnh).'
    },
    {
      id: 4060,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      part: 2,
      question: 'Phần mở rộng của tệp (đuôi tệp như .docx, .xlsx, .pptx, .sb3) cho hệ điều hành và người dùng biết điều gì?',
      options: [
        'Cho biết định dạng tệp và phần mềm tương ứng dùng để mở tệp đó',
        'Cho biết dung lượng pin còn lại của chiếc máy tính xách tay',
        'Cho biết ngày sinh nhật của người đã tạo ra tệp tài liệu đó',
        'Cho biết vị trí địa lí của ngôi trường mà học sinh đang theo học'
      ],
      correctIndex: 0,
      explanation: 'Phần mở rộng định danh loại tệp tin, giúp hệ điều hành gọi đúng phần mềm chuyên dụng để mở và xử lí.'
    }
  ],

  // Bài 6: Sử dụng phần mềm khi được phép (id: 6)
  6: [
    {
      id: 4066,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Phần mềm nguồn mở hoặc phần mềm miễn phí (Freeware) cho phép người dùng quyền sử dụng như thế nào?',
      options: [
        'Được phép tải về, cài đặt và sử dụng miễn phí theo quy định của tác giả',
        'Bắt buộc phải trả một số tiền rất lớn hàng tháng mới được mở phần mềm',
        'Chỉ được mở xem đúng một lần duy nhất rồi tự động bị xóa khỏi máy',
        'Bị pháp luật nghiêm cấm không được phép cài đặt vào máy tính trường học'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm miễn phí và nguồn mở cho phép người dùng tự do sử dụng phục vụ học tập theo giấy phép của nhà phát triển.'
    },
    {
      id: 4067,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Hành vi tự ý bẻ khóa (crack) phần mềm có bản quyền thương mại để sử dụng "chùa" là hành vi như thế nào?',
      options: [
        'Vi phạm pháp luật về bản quyền và tiềm ẩn nguy cơ nhiễm virus độc hại',
        'Là hành động thông minh, tiết kiệm tiền và được nhà nước khuyến khích',
        'Là việc làm bắt buộc của tất cả các bạn học sinh giỏi Tin học',
        'Giúp máy tính chạy nhanh hơn gấp mười lần so với bản quyền chính hãng'
      ],
      correctIndex: 0,
      explanation: 'Bẻ khóa phần mềm vi phạm quyền sở hữu trí tuệ và các file crack thường bị kẻ xấu cài mã độc, trojan nguy hiểm.'
    },
    {
      id: 4068,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Khi sử dụng các hình ảnh, bài thơ của tác giả khác trên mạng đưa vào bài thuyết trình của lớp, em cần làm gì để thể hiện sự tôn trọng?',
      options: [
        'Ghi rõ nguồn gốc tác giả và đường link nơi em đã trích dẫn hình ảnh đó',
        'Xóa tên tác giả đi và nhận đó là tác phẩm do chính tay em tự vẽ',
        'Đổi tên bài thơ thành tên của bạn thân cùng bàn để tặng bạn nhân ngày vui',
        'Tuyên bố với cả lớp rằng mọi bức ảnh trên Internet đều thuộc quyền sở hữu của em'
      ],
      correctIndex: 0,
      explanation: 'Trích dẫn nguồn tác giả là quy tắc đạo đức tối thiểu trong môi trường số, thể hiện sự trung thực và tôn trọng bản quyền.'
    },
    {
      id: 4069,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Phần mềm dùng thử (Trialware / Shareware) có đặc điểm sử dụng nào sau đây mà người dùng cần lưu ý?',
      options: [
        'Cho phép dùng thử miễn phí trong một thời gian ngắn, sau đó phải mua bản quyền',
        'Cho phép dùng miễn phí trọn đời mà không bao giờ bị giới hạn tính năng',
        'Chỉ cho phép giáo viên sử dụng còn học sinh thì tuyệt đối bị cấm đoán',
        'Là phần mềm độc hại do kẻ xấu tạo ra để phá hủy ổ đĩa của máy tính'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm dùng thử cho trải nghiệm tính năng trong 15-30 ngày trước khi người dùng quyết định mua bản quyền chính thức.'
    },
    {
      id: 4070,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      part: 2,
      question: 'Tại sao việc tôn trọng bản quyền phần mềm và nội dung số lại đóng vai trò quan trọng trong xã hội hiện đại?',
      options: [
        'Bảo vệ công sức sáng tạo của tác giả và khuyến khích ra đời nhiều phần mềm hay',
        'Để các công ty phần mềm không thể bán được sản phẩm ra thị trường quốc tế',
        'Làm cho số lượng máy tính sản xuất ra trên thế giới bị sụt giảm nhanh chóng',
        'Để học sinh không cần phải học cách sử dụng máy tính và mạng Internet nữa'
      ],
      correctIndex: 0,
      explanation: 'Tôn trọng bản quyền thúc đẩy sự sáng tạo, bảo vệ quyền lợi chính đáng của các kĩ sư, lập trình viên và nghệ sĩ.'
    }
  ],

  // Bài 7: Tạo bài trình chiếu (id: 7)
  7: [
    {
      id: 4076,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi thiết kế bài trình chiếu bằng PowerPoint, để tạo phong cách đồng bộ đẹp mắt cho toàn bộ các trang, em nên áp dụng tính năng nào?',
      options: [
        'Chọn một mẫu định dạng chủ đề có sẵn trong tab "Design" (Theme)',
        'Mỗi trang chiếu em chọn một màu nền sặc sỡ và nhấp nháy khác nhau',
        'Chỉ để trang màu trắng trơn và không chèn bất kì hình ảnh minh họa nào',
        'Chèn 20 bức ảnh chồng lấn lên nhau che kín hết toàn bộ phần chữ viết'
      ],
      correctIndex: 0,
      explanation: 'Các Theme trong tab Design được chuyên gia phối màu, phông chữ chuẩn giúp bài thuyết trình chuyên nghiệp, đồng bộ.'
    },
    {
      id: 4077,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khung chữ nhật nét đứt sẵn có trên trang chiếu dùng để nhấp chuột vào gõ tiêu đề hoặc nội dung được gọi là gì?',
      options: [
        'Khung giữ chỗ văn bản (Placeholder / Text box)',
        'Chiếc máy in văn bản kết nối từ xa với máy tính',
        'Một bức ảnh tĩnh được khóa chặt không thể chỉnh sửa',
        'Một biểu đồ hình tròn thống kê kết quả học tập'
      ],
      correctIndex: 0,
      explanation: 'Khung Placeholder trên slide hướng dẫn vị trí nhập tiêu đề (Title) và nội dung (Content) theo bố cục định sẵn.'
    },
    {
      id: 4078,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để thay đổi bố cục sắp xếp của các khung nội dung trên một trang chiếu có sẵn, em nhấp vào nút lệnh nào?',
      options: [
        'Nút lệnh "Layout" trên dải lệnh Home',
        'Nút lệnh "Cut" hình chiếc kéo trên dải lệnh',
        'Nút lệnh "Paste" hình chiếc cặp tài liệu',
        'Nút lệnh "Font Size" để tăng giảm kích thước chữ'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Layout cung cấp các mẫu bố cục slide như: Title Slide, Title and Content, Two Content, Comparison.'
    },
    {
      id: 4079,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để chèn một bức ảnh tư liệu từ ổ đĩa máy tính vào trang chiếu, em thực hiện thao tác qua dải lệnh nào?',
      options: [
        'Vào tab "Insert", chọn nút lệnh "Pictures" rồi chọn tệp ảnh',
        'Vào tab "View", chọn chế độ xem "Slide Sorter" thu nhỏ',
        'Vào tab "Review", chọn nút kiểm tra chính tả "Spelling"',
        'Vào tab "File", chọn lệnh "Print" để in ấn ra trang giấy'
      ],
      correctIndex: 0,
      explanation: 'Tab Insert (Chèn) -> Pictures là quy trình chuẩn để đưa hình ảnh từ máy tính hoặc Internet vào trang chiếu.'
    },
    {
      id: 4080,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi muốn xóa một trang chiếu (Slide) bị thừa không còn cần thiết, em chọn trang chiếu đó ở khung bên trái rồi bấm phím gì?',
      options: [
        'Bấm phím "Delete" (hoặc phím Backspace) trên bàn phím',
        'Bấm phím cách dài Spacebar mười lần liên tiếp',
        'Bấm phím Shift kết hợp lăn bánh lăn chuột máy tính',
        'Bấm phím Caps Lock ở góc bên trái của bàn phím'
      ],
      correctIndex: 0,
      explanation: 'Chọn trang slide cần xóa ở bảng điều hướng bên trái và nhấn Delete giúp loại bỏ slide nhanh chóng.'
    }
  ],

  // Bài 8: Định dạng văn bản trên trang chiếu (id: 8)
  8: [
    {
      id: 4086,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để làm nổi bật các ý chính trong trang chiếu, em nên định dạng kiểu chữ như thế nào?',
      options: [
        'Chọn kiểu chữ đậm (nút Bold - chữ B) hoặc đổi màu chữ tương phản',
        'Gõ toàn bộ bài học thành một đoạn văn duy nhất không xuống dòng',
        'Dùng màu chữ xám mờ trên nền xám tối để thử tài người nhìn',
        'Thu nhỏ cỡ chữ xuống thật bé để trang chiếu chứa được 1000 từ'
      ],
      correctIndex: 0,
      explanation: 'Chữ in đậm (B) và màu sắc tương phản giúp mắt người xem định vị ngay lập tức các từ khóa chính trên slide.'
    },
    {
      id: 4087,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để tạo các dấu đầu dòng (Bullet points) hình chấm tròn cho từng ý kiến liệt kê trên slide, em dùng nút lệnh nào?',
      options: [
        'Nút lệnh "Bullets" trong nhóm Paragraph của tab Home',
        'Nút lệnh "Underline" gạch chân toàn bộ các dòng chữ',
        'Nút lệnh "Italic" in nghiêng các chữ cái sang bên phải',
        'Nút lệnh "Text Shadow" tạo bóng đổ cho từng chữ cái'
      ],
      correctIndex: 0,
      explanation: 'Bullets tạo danh sách dấu đầu dòng dạng biểu tượng (chấm tròn, ô vuông, dấu tích) giúp các ý kiến mạch lạc, rành mạch.'
    },
    {
      id: 4088,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Cỡ chữ tối thiểu khuyến nghị khi trình bày nội dung cho người ngồi dưới lớp theo dõi rõ ràng là bao nhiêu?',
      options: [
        'Khoảng từ 24 pt đến 32 pt cho nội dung và 36 pt đến 44 pt cho tiêu đề',
        'Cỡ chữ từ 8 pt đến 10 pt giống như in trên từ điển bỏ túi',
        'Cỡ chữ tùy ý bất kì không cần quan tâm đến khoảng cách người xem',
        'Cỡ chữ càng bé càng tốt để người xem phải tập trung căng mắt nhìn'
      ],
      correctIndex: 0,
      explanation: 'Quy chuẩn thuyết trình phòng học: Tiêu đề từ 36pt trở lên, nội dung từ 24pt trở lên để học sinh cuối lớp đọc rõ.'
    },
    {
      id: 4089,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để căn giữa tiêu đề của bài thuyết trình trên khung trang chiếu, em chọn nút căn lề nào?',
      options: [
        'Nút lệnh "Center" (hoặc nhấn tổ hợp phím Ctrl + E)',
        'Nút lệnh "Align Left" (căn sát lề bên trái slide)',
        'Nút lệnh "Align Right" (căn sát lề bên phải slide)',
        'Nút lệnh "Justify" (căn đều hai bên lề đoạn văn)'
      ],
      correctIndex: 0,
      explanation: 'Nút Center (Ctrl + E) căn chỉnh đoạn văn hoặc tiêu đề vào chính giữa khung chứa để tạo sự cân đối thị giác.'
    },
    {
      id: 4090,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi sao chép một đoạn văn bản từ trang web dán vào slide, nếu phông chữ bị lỗi hoặc quá to, em nên làm gì?',
      options: [
        'Dùng công cụ định dạng lại phông chữ chuẩn tiếng Việt và cỡ chữ vừa vặn',
        'Xóa bỏ toàn bộ bài thuyết trình và tắt máy tính không làm nữa',
        'Để nguyên đoạn chữ bị lỗi đó chiếu lên cho thầy cô và các bạn xem',
        'Dùng bút dạ vẽ đè trực tiếp lên mặt kính màn hình máy tính'
      ],
      correctIndex: 0,
      explanation: 'Đoạn văn sao chép từ web cần định dạng lại phông chữ Unicode (như Arial, Times New Roman, Calibri) và cỡ chữ chuẩn slide.'
    }
  ],

  // Bài 9: Hiệu ứng chuyển trang (id: 9)
  9: [
    {
      id: 4096,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Hiệu ứng chuyển trang chiếu (Slide Transitions) là hiệu ứng xuất hiện khi nào trong buổi thuyết trình?',
      options: [
        'Khi bài trình chiếu chuyển đổi từ trang này sang trang tiếp theo',
        'Khi bài hát đang phát bỗng nhiên bị tắt nguồn âm thanh',
        'Khi chiếc máy chiếu kết nối với máy tính bị mất điện đột ngột',
        'Khi người thuyết trình bắt đầu bước chân lên trên bục giảng'
      ],
      correctIndex: 0,
      explanation: 'Transitions là hiệu ứng thị giác diễn ra tại thời điểm chuyển tiếp giữa trang chiếu trước và trang chiếu kế tiếp.'
    },
    {
      id: 4097,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để cài đặt hiệu ứng chuyển trang cho các slide trong bài PowerPoint, em vào dải lệnh (tab) nào sau đây?',
      options: [
        'Vào tab "Transitions" trên thanh công cụ của phần mềm',
        'Vào tab "Animations" dùng cho từng đối tượng hình ảnh con',
        'Vào tab "Insert" dùng để chèn hình ảnh và bảng biểu số liệu',
        'Vào tab "Home" dùng để định dạng phông chữ và đoạn văn bản'
      ],
      correctIndex: 0,
      explanation: 'Tab Transitions chuyên quản lí các hiệu ứng chuyển tiếp slide (như Fade, Push, Wipe, Split, Reveal).'
    },
    {
      id: 4098,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Lưu ý sư phạm quan trọng nhất khi chọn hiệu ứng chuyển trang cho một bài thuyết trình học tập là gì?',
      options: [
        'Chọn hiệu ứng nhẹ nhàng, nhất quán và không làm khán giả bị chóng mặt',
        'Chọn hiệu ứng xoay tít vòng tròn phức tạp nhất ở tất cả các trang',
        'Mỗi trang chiếu chọn một hiệu ứng kỳ lạ khác nhau để gây bất ngờ',
        'Cài đặt thời gian chuyển trang thật chậm mất mười phút cho một trang'
      ],
      correctIndex: 0,
      explanation: 'Hiệu ứng chuyển trang cần trang nhã, nhẹ nhàng (như Fade, Push), tránh lạm dụng hiệu ứng rối mắt làm phân tâm người học.'
    },
    {
      id: 4099,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Nút lệnh "Apply To All" trong tab Transitions có chức năng tiện lợi nào sau đây?',
      options: [
        'Áp dụng cùng một kiểu hiệu ứng đã chọn cho TẤT CẢ các slide trong bài',
        'Xóa sạch toàn bộ hình ảnh và chữ viết trên tất cả các trang chiếu',
        'Bắt đầu chiếu toàn màn hình bài thuyết trình ngay lập tức từ đầu',
        'Lưu tệp bài trình chiếu thành một định dạng video clip âm nhạc'
      ],
      correctIndex: 0,
      explanation: 'Nút "Apply To All" giúp thiết lập đồng bộ hiệu ứng chuyển tiếp cho toàn bộ slide chỉ bằng một cú nhấp chuột.'
    },
    {
      id: 4100,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi đang trình chiếu toàn màn hình (Slide Show), để thoát khỏi chế độ chiếu quay về cửa sổ soạn thảo, em nhấn phím nào?',
      options: [
        'Nhấn phím Esc (Escape) ở góc trên cùng bên trái bàn phím',
        'Nhấn phím F5 trên hàng phím chức năng của bàn phím',
        'Nhấn phím Spacebar dài nằm ở hàng phím dưới cùng',
        'Nhấn phím Enter dùng để chuyển tiếp sang trang tiếp theo'
      ],
      correctIndex: 0,
      explanation: 'Phím Esc (Escape) là phím thoát tiêu chuẩn dùng để chấm dứt phiên trình chiếu toàn màn hình.'
    }
  ],

  // Bài 10: Phần mềm soạn thảo văn bản (id: 10)
  10: [
    {
      id: 4106,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi soạn thảo văn bản trong Microsoft Word, biểu tượng con trỏ soạn thảo có hình dạng nhận biết là gì?',
      options: [
        'Một vạch thẳng đứng màu đen nhấp nháy liên tục',
        'Một mũi tên màu trắng chỉ chéo lên góc trên',
        'Một hình tròn màu đỏ đang xoay quanh đồng hồ',
        'Một dấu cộng màu xanh lá cây nằm ở góc màn hình'
      ],
      correctIndex: 0,
      explanation: 'Con trỏ soạn thảo (Insertion Point) là vạch đứng nhấp nháy, báo hiệu vị trí kí tự tiếp theo sẽ xuất hiện.'
    },
    {
      id: 4107,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để lưu lại tệp văn bản vừa soạn thảo xong vào ổ đĩa máy tính, em nhấn tổ hợp phím tắt nhanh nào sau đây?',
      options: [
        'Tổ hợp phím Ctrl + S (Save lưu tệp tài liệu)',
        'Tổ hợp phím Ctrl + P (Print in ấn văn bản)',
        'Tổ hợp phím Ctrl + C (Copy sao chép văn bản)',
        'Tổ hợp phím Ctrl + Z (Undo hoàn tác thao tác)'
      ],
      correctIndex: 0,
      explanation: 'Ctrl + S (Save) là phím tắt kinh điển trên hầu hết các phần mềm để lưu nhanh dữ liệu đang làm việc.'
    },
    {
      id: 4108,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Quy tắc đặt dấu câu chuẩn trong Tiếng Việt khi soạn thảo văn bản trên máy tính là quy tắc nào?',
      options: [
        'Dấu câu (., :, ;) gõ sát từ đứng trước, tiếp theo là một dấu cách',
        'Gõ dấu cách trước rồi mới gõ dấu chấm, sau đó gõ chữ tiếp luôn',
        'Gõ liên tiếp năm dấu cách trước khi gõ một dấu phẩy ngắt câu',
        'Tuyệt đối không bao giờ được phép gõ các dấu chấm phẩy vào bài'
      ],
      correctIndex: 0,
      explanation: 'Quy tắc chính tả văn bản: Dấu câu sát từ đứng trước; sau dấu câu là một dấu cách (Space) rồi mới đến từ kế tiếp.'
    },
    {
      id: 4109,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để mở một tệp văn bản đã lưu từ trước trên máy tính ra chỉnh sửa tiếp, em chọn lệnh nào trong bảng chọn File?',
      options: [
        'Chọn lệnh "Open" (hoặc nhấn tổ hợp phím Ctrl + O)',
        'Chọn lệnh "New" (tạo một trang văn bản trắng tinh mới)',
        'Chọn lệnh "Close" (đóng cửa sổ văn bản đang làm việc)',
        'Chọn lệnh "Export" (xuất văn bản ra định dạng tệp khác)'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Open (Ctrl + O) duyệt tìm và mở các tệp tài liệu đã lưu trên ổ cứng hoặc thiết bị nhớ.'
    },
    {
      id: 4110,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi đang gõ một bài thơ, em muốn ngắt xuống dòng mới nhưng chưa hết một đoạn thơ, em nhấn phím nào?',
      options: [
        'Nhấn phím Enter trên bàn phím máy tính',
        'Nhấn giữ phím Spacebar cho chữ tự trôi',
        'Nhấn phím Caps Lock để viết hoa chữ cái',
        'Nhấn phím Tab để lùi đầu dòng một đoạn'
      ],
      correctIndex: 0,
      explanation: 'Phím Enter ngắt dòng chuyển con trỏ soạn thảo xuống dòng mới để tiếp tục viết câu thơ tiếp theo.'
    }
  ],

  // Bài 11: Chỉnh sửa văn bản (id: 11)
  11: [
    {
      id: 4116,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Thao tác "chọn" (bôi đen) một phần văn bản trước khi thực hiện các lệnh định dạng có mục đích là gì?',
      options: [
        'Xác định rõ phạm vi văn bản mà lệnh chỉnh sửa sẽ tác động lên',
        'Để máy tính tự động xóa bỏ vĩnh viễn đoạn văn bản được chọn',
        'Làm cho đoạn văn bản đó tự động biến đổi thành một bức tranh',
        'Để chiếc máy in tự động in ra giấy đoạn văn bản được bôi đen'
      ],
      correctIndex: 0,
      explanation: 'Nguyên tắc bất di bất dịch của soạn thảo: Chọn (bôi đen) đối tượng trước, sau đó mới áp dụng lệnh thao tác.'
    },
    {
      id: 4117,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để nhanh chóng khôi phục lại trạng thái văn bản trước đó khi em vừa lỡ tay xóa nhầm một đoạn, em dùng lệnh nào?',
      options: [
        'Lệnh "Undo" (nút mũi tên cong quay lại hoặc phím Ctrl + Z)',
        'Lệnh "Redo" (nút mũi tên tiến về phía trước hoặc Ctrl + Y)',
        'Lệnh "Delete" (tiếp tục nhấn phím xóa trên bàn phím máy tính)',
        'Tắt nguồn điện của máy tính để văn bản tự động phục hồi lại'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Undo (Ctrl + Z) hoàn tác hành động vừa thực hiện, cứu vãn dữ liệu khi học sinh lỡ tay xóa nhầm.'
    },
    {
      id: 4118,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để tìm nhanh một từ ngữ xuất hiện ở nhiều nơi trong tài liệu dài và thay thế bằng từ ngữ mới, em dùng công cụ nào?',
      options: [
        'Công cụ "Find and Replace" (Tìm kiếm và Thay thế, phím Ctrl + H)',
        'Ngồi đọc từng dòng từ đầu đến cuối trang để xóa và gõ lại bằng tay',
        'Dùng bút xóa quét trực tiếp lên mặt kính màn hình của máy tính',
        'Sao chép toàn bộ văn bản ra giấy nháp rồi gõ lại từ đầu một trang mới'
      ],
      correctIndex: 0,
      explanation: 'Công cụ Find & Replace (Ctrl + H) tự động tìm và thay thế hàng loạt từ ngữ trong tích tắc với độ chính xác tuyệt đối.'
    },
    {
      id: 4119,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để sao chép định dạng (Format Painter) từ một đoạn tiêu đề đẹp sang cho các đoạn tiêu đề khác, em dùng nút biểu tượng gì?',
      options: [
        'Nút lệnh có hình chiếc chổi quét sơn (Format Painter) ở tab Home',
        'Nút lệnh có hình cây kéo cắt giấy (Cut) ở góc trên bên trái',
        'Nút lệnh có hình chiếc kính lúp (Search) tìm kiếm từ vựng',
        'Nút lệnh có hình cuốn sổ tay ghi chú nhỏ màu vàng trên thanh công cụ'
      ],
      correctIndex: 0,
      explanation: 'Format Painter (hình chổi sơn) sao chép toàn bộ màu sắc, phông chữ, cỡ chữ từ đoạn này áp dụng sang đoạn khác.'
    },
    {
      id: 4120,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi muốn di chuyển một đoạn văn từ cuối bài lên trên đầu bài, thứ tự các thao tác chuẩn xác là gì?',
      options: [
        'Bôi đen đoạn văn -> Chọn lệnh Cut -> Đặt con trỏ ở đầu bài -> Chọn lệnh Paste',
        'Bôi đen đoạn văn -> Chọn lệnh Delete -> Tắt máy tính -> Bật lại máy tính',
        'Bôi đen đoạn văn -> Chọn lệnh Copy -> Không làm gì thêm đoạn văn sẽ tự bay lên',
        'Nhấn phím Backspace xóa hết từng chữ rồi gõ lại từ đầu ở vị trí mới'
      ],
      correctIndex: 0,
      explanation: 'Quy trình di chuyển: Chọn văn bản -> Cut (Ctrl + X) -> Chọn vị trí đích -> Paste (Ctrl + V).'
    }
  ],

  // Bài 12: Thực hành công cụ đa phương tiện & luyện gõ bàn phím (id: 12)
  12: [
    {
      id: 4126,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi chèn tệp âm thanh hoặc video vào bài thuyết trình PowerPoint, phần mềm cho phép em tùy chỉnh điều gì?',
      options: [
        'Tùy chỉnh tự động phát khi mở slide và điều chỉnh âm lượng phù hợp',
        'Làm cho chiếc máy tính tự động tăng gấp đôi dung lượng bộ nhớ RAM',
        'Thay đổi lời bài hát của ca sĩ thành giọng hát của chính bản thân em',
        'Xóa bỏ toàn bộ các bức tranh phong cảnh đang có trong bài thuyết trình'
      ],
      correctIndex: 0,
      explanation: 'PowerPoint cho phép thiết lập chế độ phát video/audio: tự động (Automatically) hoặc khi nhấp chuột (On Click), chỉnh âm lượng.'
    },
    {
      id: 4127,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Chỉ số WPM (Words Per Minute) hiển thị trong các phần mềm luyện gõ mười ngón phản ánh điều gì của người gõ?',
      options: [
        'Số từ gõ được trong thời gian một phút (tốc độ gõ phím)',
        'Số lượng phím bấm bị hỏng trên bàn phím của chiếc máy tính',
        'Thời gian em đã ngồi trước màn hình máy tính tính bằng giờ',
        'Điểm số môn Toán học của học sinh trong kì thi giữa học kì'
      ],
      correctIndex: 0,
      explanation: 'WPM là đơn vị đo lường tốc độ đánh máy chuẩn quốc tế, thể hiện số từ chuẩn gõ được trong một phút.'
    },
    {
      id: 4128,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Để hình ảnh chèn vào văn bản Word không đè lên chữ và chữ tự động bao quanh ảnh đẹp mắt, em dùng tính năng nào?',
      options: [
        'Tính năng "Wrap Text" (chọn kiểu Square hoặc Tight)',
        'Tính năng "Crop" dùng để cắt tỉa bớt các cạnh thừa của ảnh',
        'Tính năng "Delete" xóa hình ảnh đó ra khỏi tài liệu Word',
        'Tính năng "Rotate" xoay bức ảnh lộn ngược 180 độ theo trục dọc'
      ],
      correctIndex: 0,
      explanation: 'Wrap Text (Text Wrapping) điều khiển cách văn bản uốn lượn xung quanh khung hình ảnh (như Square, Tight, In Front of Text).'
    },
    {
      id: 4129,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Khi thay đổi kích thước của một bức ảnh, thao tác nào giúp ảnh không bị méo mó, biến dạng tỉ lệ?',
      options: [
        'Kéo thả chuột tại một trong bốn nút tròn ở bốn góc của bức ảnh',
        'Kéo mạnh nút tròn ở chính giữa cạnh bên trái hoặc bên phải ảnh',
        'Kéo nút tròn ở chính giữa cạnh trên cùng hoặc cạnh dưới cùng',
        'Nhấn phím Enter liên tục trên bàn phím cho bức ảnh tự co giãn'
      ],
      correctIndex: 0,
      explanation: 'Kéo thả chuột ở 4 góc giữ nguyên tỉ lệ khung hình (Aspect Ratio), tránh làm hình ảnh bị méo mó bè ngang hay dẹp dọc.'
    },
    {
      id: 4130,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      part: 2,
      question: 'Sự kết hợp hài hòa giữa văn bản, hình ảnh minh họa sắc nét và sơ đồ trực quan trong bài học giúp ích gì cho học sinh?',
      options: [
        'Giúp học sinh tiếp thu kiến thức nhanh hơn, ghi nhớ sâu và hứng thú học tập',
        'Làm cho học sinh bị phân tâm và không thể hiểu được nội dung bài giảng',
        'Làm cho dung lượng tệp tăng lên khiến máy tính không thể lưu trữ được',
        'Khiến cho bài học trở nên rắc rối và khó hiểu hơn so với sách giáo khoa'
      ],
      correctIndex: 0,
      explanation: 'Đa phương tiện (hình ảnh, sơ đồ, chữ viết) kích thích đa giác quan, giúp người học ghi nhớ kiến thức bền vững.'
    }
  ],

  // Bài 13: Chơi với máy tính (id: 13)
  13: [
    {
      id: 4136,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Các trò chơi giáo dục rèn luyện tư duy trên máy tính (như giải mê cung, xếp hình khối) mang lại lợi ích gì cho học sinh?',
      options: [
        'Rèn luyện óc quan sát, tư duy logic, phản xạ nhanh và tính kiên trì',
        'Giúp học sinh có thể bỏ ăn cơm và thức thâu đêm mà không mệt mỏi',
        'Làm cho học sinh không cần phải làm bài tập các môn học ở trường',
        'Biến bàn phím máy tính thành chiếc cần điều khiển máy bay thực tế'
      ],
      correctIndex: 0,
      explanation: 'Trò chơi giáo dục tích hợp tính giải trí và rèn luyện kỹ năng giải quyết vấn đề, phản xạ và tư duy logic.'
    },
    {
      id: 4137,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi tham gia trò chơi trực tuyến, nếu có người lạ trong game rủ cá cược ăn tiền hoặc đòi mua vật phẩm ảo, em cần làm gì?',
      options: [
        'Tuyệt đối từ chối, thoát khỏi trò chơi và thông báo ngay cho bố mẹ biết',
        'Lén lấy thẻ ngân hàng của bố mẹ nạp tiền vào game để chơi cá cược',
        'Đồng ý tham gia ngay vì nghĩ rằng mình sẽ dễ dàng kiếm được nhiều tiền',
        'Mời thêm các bạn nhỏ tuổi hơn trong trường cùng tham gia cá cược chung'
      ],
      correctIndex: 0,
      explanation: 'Cá cược và giao dịch tiền ảo là cạm bẫy lừa đảo nguy hiểm, học sinh phải kiên quyết từ chối và báo ngay cho người lớn.'
    },
    {
      id: 4138,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Quy định lành mạnh về thời gian chơi trò chơi trên máy tính cho lứa tuổi học sinh tiểu học là khoảng bao lâu mỗi ngày?',
      options: [
        'Khoảng 30 phút đến 45 phút sau khi đã hoàn thành xong bài tập về nhà',
        'Chơi liên tục từ sáng đến tối bất kì khi nào cảm thấy rảnh rỗi',
        'Chơi thâu đêm suốt sáng đến 3 giờ sáng trước ngày đi thi học kì',
        'Không cần giới hạn thời gian vì chơi game máy tính càng nhiều càng tốt'
      ],
      correctIndex: 0,
      explanation: 'Chơi game điều độ dưới 45 phút/ngày giúp giải trí lành mạnh, không gây ảnh hưởng tiêu cực tới thị lực và học tập.'
    },
    {
      id: 4139,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Dấu hiệu nào sau đây cảnh báo một học sinh đang có nguy cơ bị nghiện trò chơi điện tử trên máy tính?',
      options: [
        'Luôn bồn chồn nghĩ về game, bỏ bê học hành và cáu gắt khi bị nhắc nhở',
        'Hoàn thành bài tập về nhà đầy đủ và tích cực tham gia đá bóng cùng bạn',
        'Thích đọc sách khoa học khám phá thế giới tự nhiên vào ngày cuối tuần',
        'Ngủ đúng giờ vào lúc chín giờ tối và thức dậy tập thể dục buổi sáng'
      ],
      correctIndex: 0,
      explanation: 'Bỏ bê việc học, thay đổi tính khí, thức đêm chơi game là các biểu hiện tiêu cực của hội chứng nghiện game.'
    },
    {
      id: 4140,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Cách tốt nhất để cân bằng giữa học tập trên máy tính và vui chơi rèn luyện sức khỏe thể chất là gì?',
      options: [
        'Lên lịch biểu khoa học: học tập tập trung, chơi game vừa phải và chơi thể thao ngoài trời',
        'Dành trọn vẹn 24 giờ trong ngày chỉ ngồi trong phòng kín bật máy tính',
        'Vừa ăn cơm vừa đặt chiếc máy tính bảng trước mặt để xem video clip',
        'Không bao giờ vận động chân tay mà chỉ nằm bấm bàn phím máy tính'
      ],
      correctIndex: 0,
      explanation: 'Lối sống số lành mạnh đòi hỏi kết hợp hài hòa giữa công nghệ phục vụ học tập và vận động thể thao ngoài trời.'
    }
  ],

  // Bài 14: Khám phá môi trường lập trình trực quan (id: 14)
  14: [
    {
      id: 4146,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Trong môi trường lập trình trực quan Scratch, nhân vật mặc định đầu tiên xuất hiện trên sân khấu là nhân vật nào?',
      options: [
        'Chú mèo Scratch màu vàng cam quen thuộc',
        'Một chú robot màu xanh lá cây có cánh quạt',
        'Một chú chim bồ câu đang bay lượn trên trời',
        'Một chiếc xe đua màu đỏ chạy trên đường cao tốc'
      ],
      correctIndex: 0,
      explanation: 'Chú mèo vàng Scratch (Scratch Cat) là linh vật và nhân vật (Sprite) mặc định của phần mềm Scratch.'
    },
    {
      id: 4147,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khu vực Sân khấu (Stage) trong cửa sổ phần mềm Scratch có vai trò hiển thị điều gì?',
      options: [
        'Là nơi nhân vật hoạt động, biểu diễn và hiển thị kết quả của chương trình',
        'Là nơi chứa kho mã lệnh lập trình được chia theo từng nhóm màu sắc',
        'Là nơi lưu trữ các tệp bài tập văn bản Word do học sinh tự soạn thảo',
        'Là chiếc bàn phím máy tính dùng để nhập các con số tính toán'
      ],
      correctIndex: 0,
      explanation: 'Sân khấu (Stage) là màn hình hiển thị trực quan nơi các nhân vật di chuyển, nói chuyện và tương tác.'
    },
    {
      id: 4148,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Để ghép các khối lệnh lại với nhau trong Scratch tạo thành một kịch bản, em thực hiện thao tác chuột nào?',
      options: [
        'Kéo khối lệnh từ kho lệnh thả vào khu vực soạn thảo cho khớp mộng ghép',
        'Nhấp chuột phải vào màn hình rồi nhấn phím Caps Lock trên bàn phím',
        'Dùng bút dạ vẽ các mũi tên nối giữa các khối lệnh trên màn hình kính',
        'Tắt màn hình máy tính rồi bật lại để các khối lệnh tự động hút vào nhau'
      ],
      correctIndex: 0,
      explanation: 'Thao tác kéo thả khối lệnh (Drag and Drop Blocks) ghép khít vào nhau theo mộng ghép như trò chơi xếp hình Lego.'
    },
    {
      id: 4149,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh màu xanh lam "Di chuyển 10 bước" (Move 10 steps) thuộc nhóm lệnh nào trong phần mềm Scratch?',
      options: [
        'Nhóm lệnh Chuyển động (Motion)',
        'Nhóm lệnh Hiển thị ngoại hình (Looks)',
        'Nhóm lệnh Âm thanh phát ra (Sound)',
        'Nhóm lệnh Điều khiển vòng lặp (Control)'
      ],
      correctIndex: 0,
      explanation: 'Nhóm lệnh Motion (màu xanh lam) phụ trách điều khiển hướng đi, tọa độ X/Y và sự chuyển động của nhân vật.'
    },
    {
      id: 4150,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Biểu tượng Lá cờ màu xanh (Green Flag) nằm ở góc trên của Sân khấu Scratch có chức năng gì?',
      options: [
        'Bắt đầu kích hoạt cho chương trình Scratch chạy',
        'Dừng khẩn cấp toàn bộ các hoạt động của nhân vật',
        'Xóa sạch toàn bộ nhân vật đang có trên sân khấu',
        'Tắt máy tính và khởi động lại hệ điều hành Windows'
      ],
      correctIndex: 0,
      explanation: 'Nhấp biểu tượng lá cờ xanh (Green flag) để khởi động kịch bản bắt đầu bằng khối lệnh "Khi bấm vào lá cờ xanh".'
    }
  ],

  // Bài 15: Tạo chương trình máy tính để diễn tả ý tưởng (id: 15)
  15: [
    {
      id: 4156,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khối lệnh màu tím "Nói [Xin chào!] trong [2] giây" (Say [Hello!] for [2] seconds) thuộc nhóm lệnh nào?',
      options: [
        'Nhóm lệnh Hiển thị (Looks - màu tím)',
        'Nhóm lệnh Chuyển động (Motion - màu xanh lam)',
        'Nhóm lệnh Cảm biến (Sensing - màu xanh ngọc)',
        'Nhóm lệnh Các phép toán (Operators - màu xanh lá)'
      ],
      correctIndex: 0,
      explanation: 'Nhóm lệnh Looks (màu tím) quản lí lời thoại bóng bóng nói/nghĩ, trang phục (Costume) và hiệu ứng thị giác.'
    },
    {
      id: 4157,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Để nhân vật phát ra âm thanh tiếng mèo kêu "Meow" trong Scratch, em sử dụng khối lệnh thuộc nhóm nào?',
      options: [
        'Nhóm lệnh Âm thanh (Sound - màu hồng cánh sen)',
        'Nhóm lệnh Chuyển động (Motion - màu xanh dương)',
        'Nhóm lệnh Điều khiển (Control - màu vàng cam)',
        'Nhóm lệnh Sự kiện (Events - màu vàng tươi)'
      ],
      correctIndex: 0,
      explanation: 'Nhóm lệnh Sound phụ trách phát âm thanh, nốt nhạc, điều chỉnh âm lượng và hiệu ứng âm thanh.'
    },
    {
      id: 4158,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi muốn thay đổi phông nền sân khấu (Backdrop) sang hình ảnh một bãi biển đẹp, em nhấp vào nút nào?',
      options: [
        'Nút "Chọn phông nền" (Choose a Backdrop) ở góc dưới bên phải màn hình',
        'Nút "Chọn trang phục" (Choose a Costume) trong tab trang phục',
        'Nút "Lưu tệp" (Save to your computer) trên thanh thực đơn File',
        'Nút "Phóng to màn hình" ở góc trên cùng bên phải cửa sổ trình duyệt'
      ],
      correctIndex: 0,
      explanation: 'Nút Choose a Backdrop (hình bức ảnh phong cảnh) cho phép chọn bối cảnh sân khấu từ thư viện của Scratch.'
    },
    {
      id: 4159,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Một kịch bản hoàn chỉnh diễn tả ý tưởng chú mèo đi dạo và chào bạn gồm chuỗi các bước tuần tự nào sau đây?',
      options: [
        'Khi bấm lá cờ xanh -> Di chuyển 50 bước -> Nói "Xin chào các bạn!" trong 2 giây',
        'Nói tạm biệt -> Tắt máy tính -> Đi lùi lại mười bước -> Chạy thật nhanh',
        'Đứng yên mãi mãi không di chuyển -> Phát ra tiếng chuông báo thức reo',
        'Xóa nhân vật khỏi sân khấu -> Bắt đầu vẽ lại chú mèo từ đầu bằng bút dạ'
      ],
      correctIndex: 0,
      explanation: 'Kịch bản tuần tự rõ ràng: Bắt đầu sự kiện -> Di chuyển nhân vật -> Nhân vật hiển thị lời chào mừng.'
    },
    {
      id: 4160,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Ý nghĩa to lớn của việc học lập trình Scratch đối với học sinh tiểu học là gì?',
      options: [
        'Học cách diễn đạt ý tưởng sáng tạo thành các câu chuyện tương tác và trò chơi',
        'Để trở thành thợ sửa chữa các linh kiện dây điện bị hỏng của máy tính để bàn',
        'Làm cho học sinh không cần phải đọc sách giáo khoa và học bài môn Tiếng Việt',
        'Để chiếc máy tính tự động làm bài thi học kì thay cho tất cả học sinh trong lớp'
      ],
      correctIndex: 0,
      explanation: 'Lập trình Scratch rèn luyện tư duy máy tính (Computational Thinking), khơi nguồn sáng tạo số và giải quyết vấn đề.'
    }
  ],

  // Bài 16: Chương trình của em (id: 16)
  16: [
    {
      id: 4166,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Cấu trúc lặp "Lặp lại [10] lần" (Repeat [10]) trong Scratch giúp lập trình viên giải quyết vấn đề gì?',
      options: [
        'Tránh việc phải kéo ghép lặp đi lặp lại cùng một nhóm khối lệnh nhiều lần',
        'Làm cho chương trình chạy chậm hơn gấp mười lần so với bình thường',
        'Làm cho nhân vật tự động biến mất vĩnh viễn khỏi màn hình sân khấu',
        'Làm cho bàn phím máy tính tự động bị khóa không thể gõ được nữa'
      ],
      correctIndex: 0,
      explanation: 'Vòng lặp (Loop) giúp tối ưu mã nguồn, thực thi các hành động tuần hoàn mà không cần lặp lại dòng lệnh thủ công.'
    },
    {
      id: 4167,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi lập trình cho nhân vật bước đi tạo cảm giác chuyển động chân thật, em cho nhân vật thay đổi đối tượng nào?',
      options: [
        'Khối lệnh "Trang phục kế tiếp" (Next costume) sau mỗi bước di chuyển ngắn',
        'Khối lệnh đổi tên nhân vật thành tên mới sau mỗi bước chân đi',
        'Khối lệnh tắt âm thanh của toàn bộ dàn máy tính để bàn đang mở',
        'Khối lệnh đổi màu sắc toàn bộ giao diện của hệ điều hành Windows'
      ],
      correctIndex: 0,
      explanation: 'Chuyển đổi luân phiên giữa các trang phục (Costumes) kết hợp di chuyển tạo hiệu ứng hoạt hình (Animation) sinh động.'
    },
    {
      id: 4168,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi chạy chương trình, nếu chú mèo đi chạm vào mép màn hình sân khấu mà bị lộn ngược đầu xuống đất, em xử lí thế nào?',
      options: [
        'Đặt kiểu xoay hướng là "Trái - Phải" (Set rotation style left-right)',
        'Xóa bỏ chú mèo và tắt máy tính không chơi phần mềm Scratch nữa',
        'Dùng tay quay ngược chiếc màn hình máy tính lại 180 độ',
        'Bấm nút chiếc đĩa mềm để lưu lại chương trình đang bị lộn ngược'
      ],
      correctIndex: 0,
      explanation: 'Khối lệnh "set rotation style left-right" khóa trục xoay theo chiều ngang, ngăn nhân vật bị lộn ngược khi chạm mép.'
    },
    {
      id: 4169,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Để lưu sản phẩm dự án Scratch của em vào máy tính để hôm sau mở ra học tiếp, em chọn lệnh nào trong bảng chọn File?',
      options: [
        'Chọn lệnh "Lưu về máy tính" (Save to your computer) - tệp có đuôi .sb3',
        'Chọn lệnh "Tải từ máy tính" (Load from your computer) để mở bài cũ',
        'Chọn lệnh "Khởi động lại" (Restart) để xóa sạch toàn bộ các khối lệnh',
        'Nhấn nút dấu nhân màu đỏ ở góc trên cùng bên phải cửa sổ làm việc'
      ],
      correctIndex: 0,
      explanation: 'Lệnh "Save to your computer" tải tệp dự án định dạng .sb3 về thư mục lưu trữ trên máy tính.'
    },
    {
      id: 4170,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      part: 2,
      question: 'Khi chia sẻ sản phẩm lập trình Scratch của mình cho thầy cô và các bạn trong lớp cùng xem, em nên làm gì?',
      options: [
        'Tự tin thuyết minh về ý tưởng, cách chơi và lắng nghe góp ý chân thành để hoàn thiện',
        'Tự hào giấu kín chương trình không cho bất kì ai được phép chạm vào xem thử',
        'Chê bai các sản phẩm lập trình của các bạn khác trong lớp là xấu xí và đơn giản',
        'Tuyên bố rằng chương trình của mình là hoàn hảo nhất và không cần học hỏi thêm'
      ],
      correctIndex: 4,
      explanation: 'Tự tin thuyết trình sản phẩm số, tôn trọng sản phẩm của bạn và cầu thị học hỏi là phẩm chất đẹp của công dân số.'
    }
  ]
};
// Fix correctIndex for 4170 (correct option is first option at index 0)
SGK_EXTRA_GRADE_4[16][4].correctIndex = 0;
