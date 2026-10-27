import { Lesson } from '../types';

/**
 * 16 BÀI HỌC SGK TIN HỌC 4 - BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Mỗi bài học có đúng 5 CÂU HỎI TRẮC NGHIỆM CHUYÊN SÂU (tổng cộng 80 câu hỏi).
 * Tất cả phương án có độ dài cân bằng tuyệt đối, loại bỏ mẹo chọn câu dài nhất.
 */
export const SGK_LESSONS_GRADE_4: Lesson[] = [
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM
  {
    id: 1,
    level: 1,
    grade: 4,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 1: Phần cứng và phần mềm máy tính',
    desc: 'Phân biệt phần cứng (thiết bị sờ thấy được) và phần mềm (chương trình cài đặt); mối quan hệ tương hỗ.',
    type: 'quiz',
    questions: [
      {
        id: 4011,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Đối tượng nào sau đây thuộc về Phần cứng (Hardware) của máy tính mà em có thể sờ thấy trực tiếp?',
        options: [
          'Bàn phím máy tính và chuột máy tính cầm tay',
          'Hệ điều hành Windows cài đặt trong máy tính',
          'Phần mềm gõ dấu tiếng Việt Unikey trên màn hình',
          'Trò chơi lập trình Scratch hiển thị trên màn hình'
        ],
        correctIndex: 0,
        explanation: 'Phần cứng là các thiết bị vật lý cụ thể (chuột, bàn phím, màn hình, thân máy) có thể nhìn thấy và cầm nắm được.'
      },
      {
        id: 4012,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khẳng định nào sau đây diễn tả đúng nhất mối quan hệ giữa Phần cứng và Phần mềm máy tính?',
        options: [
          'Phần cứng và phần mềm cần kết hợp để hoạt động được',
          'Phần cứng có thể tự chạy tốt mà không cần phần mềm',
          'Phần mềm có thể tự hiển thị mà không cần màn hình',
          'Phần cứng và phần mềm hoàn toàn độc lập với nhau'
        ],
        correctIndex: 0,
        explanation: 'Phần cứng là thể xác, phần mềm là linh hồn. Không có phần mềm thì phần cứng không hoạt động được và ngược lại.'
      },
      {
        id: 4013,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi em mua một chiếc máy tính mới về nhà, đối tượng nào sau đây là Phần mềm máy tính?',
        options: [
          'Phần mềm duyệt web Google Chrome cài trên máy',
          'Dây cáp nguồn nối thân máy tính với ổ cắm điện',
          'Thanh bộ nhớ RAM gắn ở bên trong thân máy tính',
          'Hộp vỏ kim loại bảo vệ bên ngoài của thân máy'
        ],
        correctIndex: 0,
        explanation: 'Google Chrome là chương trình phần mềm ứng dụng được cài đặt vào bộ nhớ máy tính để duyệt web.'
      },
      {
        id: 4014,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Một bộ máy tính để bàn có đầy đủ màn hình, thân máy, bàn phím nhưng chưa cài hệ điều hành thì có dùng được không?',
        options: [
          'Không thể sử dụng được vì thiếu phần mềm điều khiển',
          'Vẫn soạn thảo văn bản và vẽ tranh được bình thường',
          'Vẫn lướt web xem video bài giảng được bình thường',
          'Chỉ chơi được các trò chơi điện tử cài sẵn trong chip'
        ],
        correctIndex: 0,
        explanation: 'Nếu không có hệ điều hành (phần mềm hệ thống), phần cứng máy tính không thể khởi động và nhận lệnh của con người.'
      },
      {
        id: 4015,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Thiết bị nào sau đây vừa tiếp nhận thông tin từ người dùng vừa hiển thị kết quả làm việc trên màn hình cảm ứng?',
        options: [
          'Màn hình cảm ứng của điện thoại hoặc máy tính bảng',
          'Bàn phím cơ có dây cắm vào thân máy tính để bàn',
          'Chuột quang không dây sử dụng pin tiểu gắn ngoài',
          'Máy in phun màu kết nối qua cổng cáp nối máy tính'
        ],
        correctIndex: 0,
        explanation: 'Màn hình cảm ứng vừa là thiết bị nhập (chạm tay ra lệnh) vừa là thiết bị xuất (hiển thị hình ảnh).'
      }
    ]
  },
  {
    id: 2,
    level: 1,
    grade: 4,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 2: Gõ bàn phím đúng cách',
    desc: 'Phân công 10 ngón tay gõ các hàng phím và kỹ năng dùng phím Shift để gõ ký hiệu trên.',
    type: 'quiz',
    questions: [
      {
        id: 4021,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Để gõ được ký hiệu dấu chấm cảm (!) nằm ở phần trên của phím số 1, em cần thực hiện thao tác nào?',
        options: [
          'Nhấn giữ phím Shift rồi gõ vào phím số 1',
          'Chỉ cần gõ một lần duy nhất vào phím số 1',
          'Bật đèn phím Caps Lock rồi gõ vào phím số 1',
          'Nhấn phím cách Spacebar rồi mới gõ phím số 1'
        ],
        correctIndex: 0,
        explanation: 'Với các phím có 2 ký hiệu, muốn gõ ký hiệu phía trên (như !, @, #, $, %, ^) phải nhấn giữ phím Shift đồng thời gõ phím đó.'
      },
      {
        id: 4022,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Ngón tay nào sau đây có nhiệm vụ phụ trách gõ phím dài nhất (phím cách Spacebar)?',
        options: [
          'Hai ngón tay cái của cả bàn tay trái và phải',
          'Hai ngón trỏ đặt ở trên phím F và phím J',
          'Hai ngón út đặt ở mép ngoài cùng bàn phím',
          'Hai ngón giữa của bàn tay trái và bàn tay phải'
        ],
        correctIndex: 0,
        explanation: 'Hai ngón tay cái luôn đặt hờ trên phím cách (Spacebar) để tạo khoảng cách giữa các từ khi gõ văn bản.'
      },
      {
        id: 4023,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Lợi ích nổi bật của việc luyện tập gõ bàn phím bằng 10 ngón đúng vị trí ngón tay là gì?',
        options: [
          'Gõ chữ nhanh hơn và mắt không cần nhìn bàn phím',
          'Làm cho bàn phím máy tính không bao giờ bị bám bụi',
          'Giúp máy tính không bao giờ bị nhiễm virus độc hại',
          'Làm cho màn hình máy tính hiển thị chữ to hơn trước'
        ],
        correctIndex: 0,
        explanation: 'Kỹ năng gõ 10 ngón (touch typing) giúp tăng tốc độ gõ vượt trội, gõ chính xác và mắt luôn nhìn thẳng vào màn hình.'
      },
      {
        id: 4024,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Để gõ chữ cái "H" in hoa khi tay phải đang gõ chữ H, tay trái của em cần nhấn giữ phím nào?',
        options: [
          'Nhấn giữ phím Shift bên trái bằng ngón út',
          'Nhấn giữ phím Enter trên bàn phím bằng ngón cái',
          'Nhấn giữ phím cách Spacebar bằng ngón tay trỏ',
          'Nhấn giữ phím Alt nằm ở góc dưới bàn phím'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc phối hợp hai tay: Khi gõ ký tự in hoa bằng tay phải, ngón út tay trái nhấn giữ phím Shift bên trái.'
      },
      {
        id: 4025,
        grade: 4,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Phím Caps Lock trên bàn phím máy tính thường được sử dụng trong trường hợp nào sau đây?',
        options: [
          'Khi cần gõ liên tiếp một đoạn văn bản toàn chữ in hoa',
          'Khi muốn xóa ký tự đứng ở phía bên trái con trỏ chuột',
          'Khi muốn xuống dòng bắt đầu một đoạn văn bản mới toanh',
          'Khi muốn lưu bài tập đang soạn thảo vào trong ổ đĩa'
        ],
        correctIndex: 0,
        explanation: 'Phím Caps Lock bật đèn khóa chữ hoa, giúp gõ liên tục nhiều chữ in hoa mà không cần giữ phím Shift.'
      }
    ]
  },

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET
  {
    id: 3,
    level: 2,
    grade: 4,
    topicCode: 'cd2_mang_internet',
    title: 'Bài 3: Thông tin trên trang web',
    desc: 'Nhận diện 4 dạng thông tin đa phương tiện và siêu liên kết (hyperlink) dẫn đến các trang nội dung khác.',
    type: 'quiz',
    questions: [
      {
        id: 4031,
        grade: 4,
        topicCode: 'cd2_mang_internet',
        question: 'Dấu hiệu nào sau đây cho biết một dòng chữ hoặc một hình ảnh trên trang web là một Siêu liên kết (Hyperlink)?',
        options: [
          'Con trỏ chuột chuyển thành hình bàn tay trỏ ngón',
          'Dòng chữ đó tự động đổi sang màu xám mờ nhạt',
          'Hình ảnh đó lập tức biến mất khỏi trang web ngay',
          'Màn hình máy tính phát ra tiếng chuông báo động lớn'
        ],
        correctIndex: 0,
        explanation: 'Khi rê chuột qua một siêu liên kết (hyperlink), con trỏ chuột hình mũi tên sẽ chuyển thành hình bàn tay chỉ ngón trỏ.'
      },
      {
        id: 4032,
        grade: 4,
        topicCode: 'cd2_mang_internet',
        question: 'Một trang web tin tức hiện đại thường tích hợp những dạng thông tin nào sau đây?',
        options: [
          'Văn bản chữ viết, hình ảnh, âm thanh và các video',
          'Chỉ duy nhất có các dòng chữ viết màu đen trắng',
          'Chỉ duy nhất có các bức ảnh chụp không có chữ viết',
          'Chỉ duy nhất có các tệp ghi âm giọng nói con người'
        ],
        correctIndex: 0,
        explanation: 'Trang web là môi trường đa phương tiện, tích hợp phong phú cả văn bản, hình ảnh đồ họa, âm thanh và video clip.'
      },
      {
        id: 4033,
        grade: 4,
        topicCode: 'cd2_mang_internet',
        question: 'Khi em nháy chuột vào một Siêu liên kết trên trang báo điện tử, điều gì sẽ diễn ra tiếp theo?',
        options: [
          'Trình duyệt sẽ mở ra một trang nội dung chi tiết mới',
          'Máy tính sẽ tự động xóa bài báo đó khỏi ổ đĩa cứng',
          'Bàn phím máy tính sẽ ngừng hoạt động trong vài phút',
          'Màn hình máy tính bị tắt nguồn và chuyển màu đen'
        ],
        correctIndex: 0,
        explanation: 'Siêu liên kết chứa địa chỉ web dẫn người xem đến một bài viết, hình ảnh hoặc trang web mới.'
      },
      {
        id: 4034,
        grade: 4,
        topicCode: 'cd2_mang_internet',
        question: 'Dòng chữ thể hiện siêu liên kết trên một trang web thường có đặc điểm hình thức nào nổi bật?',
        options: [
          'Có màu xanh dương nổi bật và thường có gạch chân ở dưới',
          'Có màu vàng nhạt trùng màu với màu nền của trang web',
          'Bị làm mờ đi hoàn toàn khiến mắt người không đọc được',
          'Bị gạch chéo một đường kẻ màu đỏ từ góc trái sang phải'
        ],
        correctIndex: 0,
        explanation: 'Văn bản siêu liên kết thường được định dạng màu xanh dương và có đường gạch chân để người dùng dễ nhận biết.'
      },
      {
        id: 4035,
        grade: 4,
        topicCode: 'cd2_mang_internet',
        question: 'Thao tác nháy nút mũi tên quay sang trái (Back) ở góc trên thanh công cụ trình duyệt web có tác dụng gì?',
        options: [
          'Quay trở lại trang web vừa xem ở thời điểm trước đó',
          'Mở ra một trang web tìm kiếm hoàn toàn mới tinh',
          'Tải lại nội dung trang web hiện tại từ máy chủ',
          'Đóng hoàn toàn cửa sổ trình duyệt web đang xem'
        ],
        correctIndex: 0,
        explanation: 'Nút Back (mũi tên trái) đưa người dùng quay lại trang web trước đó trong lịch sử duyệt web.'
      }
    ]
  },

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN
  {
    id: 4,
    level: 3,
    grade: 4,
    topicCode: 'cd3_luu_tru_tim_kiem',
    title: 'Bài 4: Tìm kiếm thông tin trên Internet',
    desc: 'Sử dụng công cụ tìm kiếm Google, lựa chọn từ khoá thông minh và kỹ thuật dùng dấu ngoặc kép.',
    type: 'quiz',
    questions: [
      {
        id: 4041,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Khi cần tìm kiếm hình ảnh loài hoa sen trên máy tìm kiếm Google, em nên nhập từ khóa nào ngắn gọn và hiệu quả nhất?',
        options: [
          'Nhập từ khóa ngắn gọn: "hoa sen"',
          'Nhập cả câu dài: "Hãy cho tôi xem ảnh hoa sen đẹp"',
          'Nhập một dấu chấm hỏi chấm vào ô tìm kiếm',
          'Không cần nhập từ khóa mà chỉ bấm nút Enter'
        ],
        correctIndex: 0,
        explanation: 'Từ khóa tìm kiếm nên ngắn gọn, chứa từ trọng tâm như "hoa sen" để công cụ tìm kiếm lọc kết quả chính xác nhất.'
      },
      {
        id: 4042,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Khi đặt từ khóa tìm kiếm vào trong cặp dấu ngoặc kép (Ví dụ: "Hồ Gươm Hà Nội"), kết quả tìm được sẽ thế nào?',
        options: [
          'Chỉ tìm các trang chứa chính xác cụm từ trong ngoặc',
          'Tìm tất cả các trang web có chữ Hồ hoặc chữ Hà Nội',
          'Máy tìm kiếm sẽ báo lỗi không thực hiện được lệnh',
          'Kết quả tìm kiếm sẽ bị dịch sang tiếng nước ngoài'
        ],
        correctIndex: 0,
        explanation: 'Đặt từ khóa trong dấu ngoặc kép giúp tìm kiếm cụm từ chính xác theo đúng thứ tự các từ, tránh kết quả tản mạn.'
      },
      {
        id: 4043,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Sau khi nhận được danh sách kết quả tìm kiếm, em nên làm gì để chọn được thông tin chính xác và an toàn?',
        options: [
          'Đọc tóm tắt và chọn các trang web uy tín của nhà nước',
          'Nhấp chuột bừa vào các liên kết có quảng cáo nhấp nháy',
          'Tin tưởng tuyệt đối vào trang đầu tiên mà không kiểm chứng',
          'Tải về tất cả các tệp lạ đính kèm trên mọi trang kết quả'
        ],
        correctIndex: 0,
        explanation: 'Nên ưu tiên các cổng thông tin chính thống (.gov, .edu, trang báo uy tín) và kiểm tra nguồn gốc bài viết.'
      },
      {
        id: 4044,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Khi cần tìm tài liệu phục vụ bài học Lịch sử về "Chiến thắng Điện Biên Phủ", từ khóa nào sau đây là tốt nhất?',
        options: [
          'Từ khóa: "Chiến thắng Điện Biên Phủ 1954"',
          'Từ khóa chung chung: "Chiến tranh ngày xưa"',
          'Từ khóa câu dài: "Có ai biết bài học này không chỉ tôi"',
          'Chỉ gõ duy nhất một chữ cái "Đ" vào ô tìm kiếm'
        ],
        correctIndex: 0,
        explanation: 'Từ khóa cụ thể kết hợp mốc thời gian (1954) giúp máy tìm kiếm lọc ra các nguồn tư liệu lịch sử chuẩn xác nhất.'
      },
      {
        id: 4045,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Để lọc chỉ xem kết quả là các tệp Hình ảnh sau khi tìm kiếm trên Google, em nhấp vào mục nào ở thanh menu?',
        options: [
          'Nhấp vào mục Hình ảnh (Images) trên thanh công cụ',
          'Nhấp vào mục Video để xem các hình ảnh tĩnh',
          'Nhấp vào mục Bản đồ để tìm đường đi tới thư viện',
          'Nhấp vào mục Tin tức để chỉ đọc các bài viết chữ'
        ],
        correctIndex: 0,
        explanation: 'Thẻ Hình ảnh (Images) trên Google lọc riêng kho ảnh minh họa liên quan trực tiếp đến từ khóa tìm kiếm.'
      }
    ]
  },
  {
    id: 5,
    level: 3,
    grade: 4,
    topicCode: 'cd3_luu_tru_tim_kiem',
    title: 'Bài 5: Thao tác với tệp và thư mục',
    desc: 'Thực hành tạo thư mục mới (New Folder), đổi tên (Rename), xoá (Delete) và phân biệt Sao chép (Copy) vs Di chuyển (Cut).',
    type: 'quiz',
    questions: [
      {
        id: 4051,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Điểm khác biệt cơ bản giữa thao tác Sao chép (Copy) và thao tác Di chuyển (Cut) một tệp tin là gì?',
        options: [
          'Sao chép giữ lại tệp gốc, di chuyển thì mất tệp gốc',
          'Sao chép làm mất tệp gốc, di chuyển thì giữ lại tệp gốc',
          'Hai thao tác này hoàn toàn giống nhau không có điểm khác',
          'Sao chép chỉ áp dụng cho ảnh, di chuyển chỉ cho văn bản'
        ],
        correctIndex: 0,
        explanation: 'Sao chép (Copy) tạo thêm bản sao mới ở nơi đến và giữ nguyên bản gốc; Di chuyển (Cut) dời hẳn tệp đi, nơi cũ không còn.'
      },
      {
        id: 4052,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Để đổi tên cho một thư mục đã có trên màn hình máy tính, em nháy chuột phải vào thư mục và chọn lệnh nào?',
        options: [
          'Chọn lệnh Đổi tên (Rename) trong thực đơn',
          'Chọn lệnh Xóa bỏ (Delete) trong thực đơn',
          'Chọn lệnh Sao chép (Copy) trong thực đơn',
          'Chọn lệnh Mở ra (Open) trong thực đơn'
        ],
        correctIndex: 0,
        explanation: 'Lệnh Rename (hoặc phím F2) cho phép gõ lại tên mới cho thư mục hoặc tệp tin.'
      },
      {
        id: 4053,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Khi em lỡ tay xóa nhầm một tệp bài học vào thùng rác Recycle Bin, em có thể làm gì để lấy lại tệp đó?',
        options: [
          'Mở Recycle Bin, nháy chuột phải vào tệp và chọn Restore',
          'Tệp đã bị xóa vĩnh viễn và không bao giờ lấy lại được',
          'Cài đặt lại toàn bộ hệ điều hành Windows cho máy tính',
          'Rút phích cắm điện để máy tính quay ngược thời gian lại'
        ],
        correctIndex: 0,
        explanation: 'Thùng rác Recycle Bin tạm giữ các tệp đã xóa. Mở Recycle Bin -> nháy chuột phải vào tệp -> chọn Restore để khôi phục.'
      },
      {
        id: 4054,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Để tạo một Thư mục mới bên trong cửa sổ File Explorer, em sử dụng tổ hợp phím tắt nhanh nào sau đây?',
        options: [
          'Nhấn tổ hợp phím Ctrl + Shift + N trên bàn phím',
          'Nhấn tổ hợp phím Ctrl + C trên bàn phím máy tính',
          'Nhấn tổ hợp phím Ctrl + V trên bàn phím máy tính',
          'Nhấn tổ hợp phím Ctrl + P trên bàn phím máy tính'
        ],
        correctIndex: 0,
        explanation: 'Tổ hợp phím Ctrl+Shift+N là phím tắt tiêu chuẩn tạo nhanh một thư mục mới (New Folder) trong Windows.'
      },
      {
        id: 4055,
        grade: 4,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Thao tác nào sau đây giúp em chọn cùng lúc nhiều tệp tin liên tiếp nhau trong một thư mục?',
        options: [
          'Nhấn giữ phím Shift và nháy chuột chọn tệp đầu và tệp cuối',
          'Chỉ cần nháy chuột một lần vào khoảng trống của thư mục',
          'Nhấn phím Delete trên bàn phím máy tính liên tục',
          'Tắt cửa sổ thư mục đi rồi mở lại cửa sổ đó lên'
        ],
        correctIndex: 0,
        explanation: 'Nhấn giữ phím Shift cho phép chọn một dải tệp tin liên tiếp từ tệp đầu đến tệp cuối nhanh chóng.'
      }
    ]
  },

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ
  {
    id: 6,
    level: 4,
    grade: 4,
    topicCode: 'cd4_dao_duc_phap_luat',
    title: 'Bài 6: Sử dụng phần mềm khi được phép',
    desc: 'Hiểu khái niệm bản quyền phần mềm, phân biệt phần mềm miễn phí và trả phí, tác hại của phần mềm bẻ khoá (crack).',
    type: 'quiz',
    questions: [
      {
        id: 4061,
        grade: 4,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Phần mềm nào sau đây là Phần mềm miễn phí (Freeware) mà mọi người được phép tải và sử dụng hợp pháp không mất tiền?',
        options: [
          'Phần mềm gõ tiếng Việt Unikey và phần mềm Scratch',
          'Bộ phần mềm văn phòng Microsoft Office bản quyền',
          'Phần mềm chỉnh sửa ảnh chuyên nghiệp Adobe Photoshop',
          'Hệ điều hành máy tính Windows bản quyền thương mại'
        ],
        correctIndex: 0,
        explanation: 'Unikey và Scratch là phần mềm miễn phí cho cộng đồng giáo dục; các phần mềm thương mại như MS Office, Photoshop cần trả phí bản quyền.'
      },
      {
        id: 4062,
        grade: 4,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Hành vi cố tình tải và sử dụng phần mềm bẻ khóa (phần mềm lậu, crack) mang lại nguy cơ nguy hiểm nào?',
        options: [
          'Dễ bị nhiễm virus mã độc đánh cắp mật khẩu dữ liệu',
          'Làm cho bàn phím máy tính bị mòn chữ nhanh hơn trước',
          'Làm cho màn hình máy tính bị giảm độ sáng vĩnh viễn',
          'Làm cho máy tính không thể kết nối được với chuột'
        ],
        correctIndex: 0,
        explanation: 'Phần mềm bẻ khóa thường bị kẻ xấu cài cắm mã độc (malware, virus, trojan) để chiếm đoạt tài khoản và phá hoại máy tính.'
      },
      {
        id: 4063,
        grade: 4,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Tôn trọng quyền tác giả phần mềm thể hiện hành vi văn minh nào của một công dân số tiểu học?',
        options: [
          'Sử dụng phần mềm có bản quyền hoặc phần mềm miễn phí',
          'Chia sẻ các đường link tải phần mềm lậu lên mạng xã hội',
          'Sao chép lén phần mềm có bản quyền của bạn sang máy mình',
          'Tìm kiếm cách bẻ khóa để không phải trả phí cho tác giả'
        ],
        correctIndex: 0,
        explanation: 'Sử dụng phần mềm có bản quyền chính hãng hoặc dùng các giải pháp miễn phí hợp pháp là biểu hiện tôn trọng pháp luật và tác giả.'
      },
      {
        id: 4064,
        grade: 4,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Biểu tượng chữ C nằm trong vòng tròn kín (©) gắn liền với phần mềm hoặc bài viết có ý nghĩa là gì?',
        options: [
          'Tác phẩm đã được đăng ký quyền sở hữu trí tuệ (Bản quyền)',
          'Phần mềm này hoàn toàn miễn phí cho tất cả mọi người',
          'Tệp tin này đang bị lỗi kỹ thuật không mở được',
          'Biểu tượng thông báo máy tính đang bị nhiễm virus độc'
        ],
        correctIndex: 0,
        explanation: 'Ký hiệu © (Copyright) là dấu hiệu bản quyền quốc tế, xác nhận tác phẩm được bảo vệ bởi pháp luật sở hữu trí tuệ.'
      },
      {
        id: 4065,
        grade: 4,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Khi cài đặt một phần mềm mới vào máy tính, việc đọc kỹ Điều khoản sử dụng (License Terms) giúp em điều gì?',
        options: [
          'Hiểu rõ quyền hạn và trách nhiệm khi sử dụng phần mềm',
          'Làm cho phần mềm tự động tăng tốc độ xử lí gấp đôi',
          'Giúp máy tính không bao giờ bị đầy dung lượng bộ nhớ',
          'Làm cho phần mềm tự động dịch sang tiếng nước ngoài'
        ],
        correctIndex: 0,
        explanation: 'Đọc điều khoản sử dụng giúp người dùng biết phần mềm có miễn phí không, được dùng cho mục đích cá nhân hay thương mại.'
      }
    ]
  },

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC
  {
    id: 7,
    level: 5,
    grade: 4,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 7: Tạo bài trình chiếu',
    desc: 'Khởi động PowerPoint, tạo bài trình chiếu mới, thêm trang chiếu (New Slide) và chọn bố cục (Layout).',
    type: 'quiz',
    questions: [
      {
        id: 4071,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để chèn thêm một trang chiếu mới vào bài trình chiếu trong PowerPoint, em nhấp vào nút lệnh nào ở dải lệnh Home?',
        options: [
          'Nhấp vào nút lệnh New Slide trong dải lệnh Home',
          'Nhấp vào nút lệnh Delete để chèn thêm trang chiếu',
          'Nhấp vào nút lệnh Save để tạo một trang chiếu mới',
          'Nhấp vào nút lệnh Cut để chèn thêm một trang chiếu'
        ],
        correctIndex: 0,
        explanation: 'Nút lệnh New Slide (hoặc tổ hợp phím Ctrl+M) dùng để tạo thêm một trang chiếu mới vào bài thuyết trình.'
      },
      {
        id: 4072,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Trong phần mềm PowerPoint, khung nét đứt trên trang chiếu dùng để gõ chữ được gọi là gì?',
        options: [
          'Khung văn bản có tên gọi là Text Box',
          'Khung tranh ảnh có tên gọi là Picture Box',
          'Khung hình vẽ có tên gọi là Shape Box',
          'Khung bảng biểu có tên gọi là Table Box'
        ],
        correctIndex: 0,
        explanation: 'Text Box (khung văn bản) là nơi người dùng nhấp chuột vào để gõ tiêu đề hoặc nội dung văn bản trên slide.'
      },
      {
        id: 4073,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để lưu lại bài trình chiếu em vừa hoàn thành vào máy tính, em sử dụng tổ hợp phím tắt nào?',
        options: [
          'Nhấn tổ hợp phím Ctrl + S trên bàn phím',
          'Nhấn tổ hợp phím Ctrl + C trên bàn phím',
          'Nhấn tổ hợp phím Ctrl + V trên bàn phím',
          'Nhấn tổ hợp phím Ctrl + Z trên bàn phím'
        ],
        correctIndex: 0,
        explanation: 'Tổ hợp phím Ctrl+S (Save) là lệnh lưu tệp tin nhanh và chuẩn xác trong hầu hết các phần mềm máy tính.'
      },
      {
        id: 4074,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để xóa bỏ một trang chiếu bị thừa không cần dùng trong bài trình chiếu, em thực hiện thao tác nào?',
        options: [
          'Chọn trang chiếu ở cột bên trái rồi nhấn phím Delete',
          'Nhấn tổ hợp phím Ctrl + S trên bàn phím máy tính',
          'Nhấp đúp chuột trái vào chính giữa khung văn bản',
          'Tắt màn hình máy tính rồi bật lại màn hình máy'
        ],
        correctIndex: 0,
        explanation: 'Nhấp chọn trang chiếu ở ngăn thu nhỏ (Slide Thumbnail) bên trái và nhấn phím Delete để xóa trang đó.'
      },
      {
        id: 4075,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Mục Layout trong dải lệnh Home của phần mềm PowerPoint có chức năng quan trọng gì?',
        options: [
          'Thay đổi cách sắp xếp bố cục tiêu đề và nội dung slide',
          'Đổi màu sắc của toàn bộ phím bấm trên bàn phím',
          'Tăng tốc độ chạy của quạt tản nhiệt trong thân máy',
          'Tự động viết nội dung bài thuyết trình cho học sinh'
        ],
        correctIndex: 0,
        explanation: 'Layout cho phép chọn mẫu bố cục sắp xếp sẵn (tiêu đề, hai cột so sánh, ảnh kèm nội dung) trên trang chiếu.'
      }
    ]
  },
  {
    id: 8,
    level: 5,
    grade: 4,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 8: Định dạng văn bản trên trang chiếu',
    desc: 'Chọn phông chữ chuẩn, cỡ chữ dễ đọc, màu sắc tương phản và danh sách dấu đầu dòng (Bullets).',
    type: 'quiz',
    questions: [
      {
        id: 4081,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi thiết kế bài trình chiếu chiếu lên máy chiếu lớn trong lớp, cỡ chữ phần nội dung nên chọn là bao nhiêu để dễ đọc?',
        options: [
          'Cỡ chữ từ 24 pt đến 32 pt dễ đọc từ xa',
          'Cỡ chữ siêu nhỏ từ 8 pt đến 10 pt thật nhỏ',
          'Cỡ chữ khổng lồ từ 120 pt đến 200 pt toàn trang',
          'Chỉ chọn cỡ chữ 12 pt giống như đọc trong sách'
        ],
        correctIndex: 0,
        explanation: 'Trên slide thuyết trình, tiêu đề nên từ 36-44pt, phần nội dung nên từ 24-32pt để cả lớp ngồi dưới cùng vẫn đọc rõ.'
      },
      {
        id: 4082,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Nguyên tắc phối màu giữa màu chữ và màu nền trang chiếu nào sau đây giúp khán giả nhìn rõ ràng nhất?',
        options: [
          'Chữ màu đậm trên nền sáng hoặc chữ sáng trên nền tối',
          'Chữ màu vàng tươi viết ở trên nền màu trắng tinh',
          'Chữ màu xanh da trời viết ở trên nền màu xanh nước biển',
          'Chữ màu xám mờ viết ở trên nền màu xám tro đục'
        ],
        correctIndex: 0,
        explanation: 'Độ tương phản cao (chữ tối trên nền sáng hoặc chữ sáng trên nền tối) giúp bài trình chiếu rõ ràng và chuyên nghiệp.'
      },
      {
        id: 4083,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để liệt kê các ý chính trong bài bằng các dấu chấm tròn đầu dòng trong PowerPoint, em dùng công cụ nào?',
        options: [
          'Nút lệnh Bullets trong nhóm Paragraph dải Home',
          'Nút lệnh Font Color hình chữ A có gạch chân màu',
          'Nút lệnh Align Left căn thẳng mép bên trái dòng',
          'Nút lệnh Line Spacing điều chỉnh khoảng cách dòng'
        ],
        correctIndex: 0,
        explanation: 'Nút lệnh Bullets dùng để tạo danh sách có dấu đầu dòng (chấm tròn, ô vuông, dấu tích) giúp các ý mạch lạc.'
      },
      {
        id: 4084,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để làm cho một dòng tiêu đề trở nên đậm hơn và nổi bật hơn trên trang chiếu, em dùng tổ hợp phím nào?',
        options: [
          'Nhấn tổ hợp phím Ctrl + B trên bàn phím máy tính',
          'Nhấn tổ hợp phím Ctrl + I để in nghiêng dòng chữ',
          'Nhấn tổ hợp phím Ctrl + U để gạch chân dòng chữ',
          'Nhấn tổ hợp phím Ctrl + Z để hủy bỏ dòng tiêu đề'
        ],
        correctIndex: 0,
        explanation: 'Phím tắt Ctrl+B (Bold) làm cho văn bản được in đậm, tạo điểm nhấn nổi bật cho tiêu đề.'
      },
      {
        id: 4085,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Phông chữ nào sau đây là phông chữ tiếng Việt chuẩn, rõ ràng, không bị lỗi dấu thường dùng trên trang chiếu?',
        options: [
          'Phông chữ Arial hoặc phông chữ Times New Roman',
          'Phông chữ tượng hình tiếng nước ngoài xa lạ',
          'Phông chữ uốn lượn rối mắt không đọc được dấu',
          'Phông chữ gồm toàn các ký hiệu toán học đặc biệt'
        ],
        correctIndex: 0,
        explanation: 'Arial, Calibri và Times New Roman là các phông chữ Unicode chuẩn quốc tế, hiển thị tiếng Việt sắc nét và không bị lỗi dấu.'
      }
    ]
  },
  {
    id: 9,
    level: 5,
    grade: 4,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 9: Hiệu ứng chuyển trang',
    desc: 'Áp dụng hiệu ứng chuyển đổi giữa các trang chiếu trong dải lệnh Transitions sinh động, hấp dẫn.',
    type: 'quiz',
    questions: [
      {
        id: 4091,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để tạo hiệu ứng xuất hiện chuyển tiếp giữa các trang chiếu, em chọn dải lệnh nào trong PowerPoint?',
        options: [
          'Chọn dải lệnh Transitions trên thanh công cụ',
          'Chọn dải lệnh Animations trên thanh công cụ',
          'Chọn dải lệnh Review trên thanh công cụ',
          'Chọn dải lệnh View trên thanh công cụ'
        ],
        correctIndex: 0,
        explanation: 'Dải lệnh Transitions phụ trách hiệu ứng chuyển đổi giữa các trang chiếu (Slide Transitions).'
      },
      {
        id: 4092,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Hiệu ứng chuyển trang nào sau đây tạo cảm giác trang chiếu trước mờ dần và trang sau hiện rõ dần?',
        options: [
          'Hiệu ứng Fade (mờ dần và hiện dần)',
          'Hiệu ứng Push (đẩy mạnh từ dưới lên)',
          'Hiệu ứng Wipe (quét ngang qua màn hình)',
          'Hiệu ứng Split (tách đôi sang hai bên)'
        ],
        correctIndex: 0,
        explanation: 'Hiệu ứng Fade là hiệu ứng chuyển trang trang nhã, làm trang chiếu hiện tại mờ dần và trang mới hiện rõ.'
      },
      {
        id: 4093,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Lời khuyên nào sau đây là đúng đắn khi sử dụng hiệu ứng chuyển trang trong một bài trình chiếu?',
        options: [
          'Nên chọn hiệu ứng nhẹ nhàng và đồng nhất trong bài',
          'Mỗi một trang chiếu phải chọn một hiệu ứng thật chóng mặt',
          'Đặt thời gian chuyển trang thật chậm trên 30 giây một trang',
          'Bật âm thanh tiếng còi hú inh ỏi mỗi khi chuyển trang'
        ],
        correctIndex: 0,
        explanation: 'Nên dùng hiệu ứng nhẹ nhàng, nhất quán để hỗ trợ bài nói, tránh lạm dụng gây phân tán sự chú ý của người nghe.'
      },
      {
        id: 4094,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để xem trước hiệu ứng chuyển trang vừa chọn hoạt động thế nào trên slide, em nhấn nút lệnh nào ở dải Transitions?',
        options: [
          'Nút lệnh Preview hình ngôi sao ở góc ngoài cùng bên trái',
          'Nút lệnh Delete ở bàn phím để xem trước hiệu ứng',
          'Nút lệnh Save để đóng bài trình chiếu lại ngay lập tức',
          'Nút lệnh New Slide để chèn thêm một trang chiếu mới'
        ],
        correctIndex: 0,
        explanation: 'Nút Preview (Xem trước) ở bên trái dải Transitions cho phép xem ngay chuyển động của slide mà không cần bật F5.'
      },
      {
        id: 4095,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Nút lệnh "Apply to All" trong dải lệnh Transitions của phần mềm PowerPoint có chức năng gì?',
        options: [
          'Áp dụng hiệu ứng chuyển trang hiện tại cho toàn bộ các slide',
          'Xóa toàn bộ tất cả hiệu ứng trên mọi trang chiếu lập tức',
          'Tự động chuyển bài thuyết trình thành một đoạn phim hoạt hình',
          'Đổi màu nền của tất cả các trang chiếu sang màu trắng tinh'
        ],
        correctIndex: 0,
        explanation: 'Lệnh Apply to All áp dụng hiệu ứng chuyển trang đang chọn cho toàn bộ các trang trong bài thuyết trình.'
      }
    ]
  },
  {
    id: 10,
    level: 5,
    grade: 4,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 10: Phần mềm soạn thảo văn bản',
    desc: 'Làm quen Microsoft Word, vị trí con trỏ soạn thảo và quy tắc gõ dấu câu tiếng Việt chuẩn ngữ pháp.',
    type: 'quiz',
    questions: [
      {
        id: 4101,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Quy tắc đặt dấu câu (như dấu chấm, dấu phẩy, dấu hai chấm) trong soạn thảo văn bản Word là gì?',
        options: [
          'Gõ sát vào từ đứng trước, rồi mới gõ dấu cách',
          'Gõ dấu cách trước rồi mới gõ dấu chấm phẩy sau',
          'Gõ dấu cách ở cả phía trước và phía sau dấu câu',
          'Không bao giờ cần gõ dấu cách sau các dấu câu'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc vàng trong soạn thảo: Dấu chấm, phẩy, hai chấm phải gõ liền sát chữ cái trước, sau đó là 1 dấu cách.'
      },
      {
        id: 4102,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Vạch thẳng đứng nhấp nháy liên tục trên trang soạn thảo văn bản Word được gọi là gì?',
        options: [
          'Con trỏ soạn thảo chỉ vị trí xuất hiện chữ gõ',
          'Con trỏ chuột dùng để chọn các lệnh menu',
          'Thanh cuộn trang để di chuyển màn hình lên xuống',
          'Đường kẻ lề trang văn bản quy định độ rộng dòng'
        ],
        correctIndex: 0,
        explanation: 'Vạch đứng nhấp nháy là con trỏ soạn thảo (insertion point), cho biết chữ tiếp theo em gõ sẽ xuất hiện tại đó.'
      },
      {
        id: 4103,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để bắt đầu một đoạn văn mới trong phần mềm soạn thảo Word, em cần nhấn phím nào trên bàn phím?',
        options: [
          'Nhấn phím Enter trên bàn phím máy tính',
          'Nhấn phím Tab trên bàn phím máy tính',
          'Nhấn phím Shift trên bàn phím máy tính',
          'Nhấn phím cách Spacebar thật nhiều lần'
        ],
        correctIndex: 0,
        explanation: 'Phím Enter dùng để kết thúc một đoạn văn và đưa con trỏ soạn thảo xuống đầu dòng của đoạn văn kế tiếp.'
      },
      {
        id: 4104,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Biểu tượng của phần mềm soạn thảo văn bản Microsoft Word trên màn hình máy tính có màu sắc và chữ cái gì?',
        options: [
          'Màu xanh nước biển đậm với chữ cái W màu trắng',
          'Màu xanh lá cây tươi với chữ cái X màu trắng',
          'Màu cam đỏ rực rỡ với chữ cái P màu trắng',
          'Màu vàng kim loại với chữ cái N màu trắng'
        ],
        correctIndex: 0,
        explanation: 'Biểu tượng Microsoft Word là hình chữ nhật màu xanh lam với chữ "W" (Word) màu trắng đặc trưng.'
      },
      {
        id: 4105,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi gõ xong câu: "Em yêu trường em.", vị trí đặt dấu chấm câu nào sau đây là hoàn toàn ĐÚNG quy tắc?',
        options: [
          'Đặt dấu chấm sát chữ "em" rồi gõ một dấu cách',
          'Gõ chữ "em", gõ dấu cách rồi mới gõ dấu chấm',
          'Gõ dấu chấm cách xa chữ "em" tới hai khoảng trắng',
          'Gõ dấu chấm ở đầu dòng tiếp theo của trang văn bản'
        ],
        correctIndex: 0,
        explanation: 'Dấu chấm phải đặt sát ký tự cuối cùng của từ, sau đó mới gõ dấu cách trước khi bắt đầu câu mới.'
      }
    ]
  },
  {
    id: 11,
    level: 5,
    grade: 4,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 11: Chỉnh sửa văn bản',
    desc: 'Phân biệt chính xác chức năng của phím Delete và phím Backspace, các phím tắt chọn và sao chép văn bản.',
    type: 'quiz',
    questions: [
      {
        id: 4111,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Sự khác biệt chính xác giữa phím Delete và phím Backspace khi xóa ký tự trong Word là gì?',
        options: [
          'Delete xóa ký tự bên phải con trỏ, Backspace xóa bên trái',
          'Delete xóa ký tự bên trái con trỏ, Backspace xóa bên phải',
          'Cả hai phím đều xóa ký tự ở bên phải của con trỏ',
          'Cả hai phím đều xóa ký tự ở bên trái của con trỏ'
        ],
        correctIndex: 0,
        explanation: 'Phím Backspace xóa ký tự đứng ngay trước (bên trái) con trỏ; phím Delete xóa ký tự đứng ngay sau (bên phải) con trỏ.'
      },
      {
        id: 4112,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để sao chép (Copy) một đoạn văn bản đã được chọn sang vị trí mới, em dùng cặp phím tắt nào?',
        options: [
          'Nhấn Ctrl + C để sao chép và Ctrl + V để dán',
          'Nhấn Ctrl + X để sao chép và Ctrl + Z để dán',
          'Nhấn Ctrl + S để sao chép và Ctrl + O để dán',
          'Nhấn Ctrl + P để sao chép và Ctrl + F để dán'
        ],
        correctIndex: 0,
        explanation: 'Ctrl+C (Copy) để chép dữ liệu vào bộ nhớ đệm Clipboard, sau đó Ctrl+V (Paste) để dán dữ liệu ra vị trí mới.'
      },
      {
        id: 4113,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi em lỡ tay xóa mất một đoạn văn quan trọng, thao tác nào giúp em khôi phục lại ngay lập tức?',
        options: [
          'Nhấn tổ hợp phím Undo (Ctrl + Z) để hoàn tác',
          'Đóng phần mềm Word lại ngay mà không cần lưu bài',
          'Nhấn phím Delete thêm vài lần nữa trên bàn phím',
          'Tắt màn hình máy tính rồi bật lại màn hình lên'
        ],
        correctIndex: 0,
        explanation: 'Lệnh Undo (Ctrl+Z) là cứu cánh giúp quay lui và hủy bỏ thao tác sai vừa thực hiện tức thì.'
      },
      {
        id: 4114,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để chọn nhanh (bôi đen) toàn bộ văn bản trong tệp Word, em sử dụng tổ hợp phím nào sau đây?',
        options: [
          'Nhấn tổ hợp phím Ctrl + A trên bàn phím máy tính',
          'Nhấn tổ hợp phím Ctrl + B trên bàn phím máy tính',
          'Nhấn tổ hợp phím Ctrl + S trên bàn phím máy tính',
          'Nhấn tổ hợp phím Ctrl + C trên bàn phím máy tính'
        ],
        correctIndex: 0,
        explanation: 'Tổ hợp phím Ctrl+A (Select All) chọn toàn bộ toàn bộ nội dung văn bản trong tài liệu.'
      },
      {
        id: 4115,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Thao tác kéo thả chuột qua một khối văn bản có tác dụng gì trước khi ta thực hiện căn lề hay đổi phông?',
        options: [
          'Chọn khối văn bản (bôi đen) để chuẩn bị định dạng',
          'Xóa vĩnh viễn khối văn bản đó ra khỏi trang tài liệu',
          'Lưu khối văn bản đó thành một tệp bài học mới tinh',
          'In khối văn bản đó ra máy in mà không cần hỏi người dùng'
        ],
        correctIndex: 0,
        explanation: 'Thao tác chọn (bôi đen) xác định vùng văn bản cần áp dụng các thay đổi về phông chữ, cỡ chữ, màu sắc.'
      }
    ]
  },
  {
    id: 12,
    level: 5,
    grade: 4,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 12: Thực hành công cụ đa phương tiện & luyện gõ bàn phím',
    desc: 'Khai thác tệp âm thanh, video học tập bổ ích và rèn luyện kỹ năng gõ bàn phím tốc độ cao.',
    type: 'quiz',
    questions: [
      {
        id: 4121,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Nút điều khiển có biểu tượng hình tam giác hướng sang phải (▶) trong phần mềm nghe nhạc dùng để làm gì?',
        options: [
          'Bắt đầu phát tệp âm thanh hoặc xem đoạn video (Play)',
          'Tạm dừng phát tệp âm thanh đang nghe (Pause)',
          'Tăng âm lượng loa máy tính lên mức cao nhất (Volume)',
          'Tắt hoàn toàn phần mềm nghe nhạc trên màn hình'
        ],
        correctIndex: 0,
        explanation: 'Biểu tượng tam giác ▶ là nút Play quốc tế dùng để bắt đầu chạy bài nhạc hoặc video.'
      },
      {
        id: 4122,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi sử dụng tai nghe (Headphone) để nghe bài giảng tiếng Anh trên máy tính, em nên chú ý điều gì?',
        options: [
          'Điều chỉnh âm lượng vừa phải để bảo vệ màng nhĩ tai',
          'Bật âm lượng ở mức to tối đa 100% để nghe thật to',
          'Đeo tai nghe liên tục suốt 8 tiếng không tháo ra',
          'Chỉ đeo tai nghe vào một bên tai và để âm lượng cực đại'
        ],
        correctIndex: 0,
        explanation: 'Nghe âm thanh quá lớn trong thời gian dài sẽ làm tổn thương thính giác vĩnh viễn, nên nghe ở mức 50-60%.'
      },
      {
        id: 4123,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để đánh giá kỹ năng gõ bàn phím 10 ngón, phần mềm luyện gõ thường đo lường chỉ số quan trọng nào?',
        options: [
          'Tốc độ gõ từ trên phút (WPM) và độ chính xác (%)',
          'Độ lớn của tiếng gõ lách cách phát ra từ bàn phím',
          'Số lượng vết bẩn in trên bề mặt các phím bấm',
          'Độ dài ngón tay của học sinh khi đặt trên bàn phím'
        ],
        correctIndex: 0,
        explanation: 'Hai tiêu chí đánh giá chuẩn là WPM (Words Per Minute - số từ gõ trong 1 phút) và Tỷ lệ chính xác (Accuracy %).'
      },
      {
        id: 4124,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Nút điều khiển có biểu tượng hai vạch thẳng song song đứng (⏸) trong trình phát video có chức năng gì?',
        options: [
          'Tạm dừng phát video tại thời điểm hiện tại (Pause)',
          'Bắt đầu phát video từ đầu trang chiếu bài giảng',
          'Tua nhanh video đến đoạn kết thúc của chương trình',
          'Tắt toàn bộ màn hình máy tính của học sinh ngay'
        ],
        correctIndex: 0,
        explanation: 'Biểu tượng hai vạch song song (Pause) dùng để tạm dừng phát bài giảng để học sinh ghi chép bài học.'
      },
      {
        id: 4125,
        grade: 4,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để rèn luyện kỹ năng gõ 10 ngón hiệu quả, nguyên tắc quan trọng nhất trong quá trình luyện tập là gì?',
        options: [
          'Gõ đúng ngón tay được phân công cho từng phím bấm',
          'Cố gõ thật nhanh dù sai nhiều lỗi chính tả cũng được',
          'Chỉ dùng hai ngón tay trỏ mổ cò từng phím một trên bàn',
          'Luôn luôn nhìn chằm chằm vào bàn phím trong khi gõ'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc cốt lõi: Gõ đúng vị trí ngón tay của từng phím, ưu tiên độ chính xác trước rồi tốc độ sẽ tăng dần.'
      }
    ]
  },

  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  {
    id: 13,
    level: 6,
    grade: 4,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 13: Chơi với máy tính',
    desc: 'Làm quen tư duy điều khiển nhân vật qua trò chơi học tập, phân tích hành động tuần tự theo quy tắc.',
    type: 'quiz',
    questions: [
      {
        id: 4131,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong các trò chơi điều khiển nhân vật trên máy tính, nhân vật di chuyển được là nhờ yếu tố nào?',
        options: [
          'Nhờ các lệnh điều khiển do con người lập trình sẵn',
          'Do nhân vật có linh hồn tự biết suy nghĩ hành động',
          'Do màn hình máy tính tự tưởng tượng ra chuyển động',
          'Do chuột máy tính tự động di chuyển không cần bấm'
        ],
        correctIndex: 0,
        explanation: 'Mọi chuyển động của nhân vật trong game đều được điều khiển bởi các dòng lệnh logic do lập trình viên thiết kế.'
      },
      {
        id: 4132,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Nếu ta muốn nhân vật Mèo tiến lên 2 bước rồi quay sang phải, thứ tự các lệnh sắp xếp phải như thế nào?',
        options: [
          'Lệnh Tiến 1 bước, Tiến 1 bước, rồi đến lệnh Quay phải',
          'Lệnh Quay phải đặt trước rồi mới đến hai lệnh Tiến',
          'Chỉ cần một lệnh Quay phải là nhân vật tự động chạy tới',
          'Các lệnh sắp xếp lộn xộn thế nào nhân vật cũng đi đúng'
        ],
        correctIndex: 0,
        explanation: 'Máy tính thực hiện lệnh tuần tự từ trên xuống dưới, muốn tiến rồi mới quay thì lệnh tiến phải đặt trước lệnh quay.'
      },
      {
        id: 4133,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi nhân vật trong trò chơi đi sai đường vào ngõ cụt, bài học tư duy lập trình rút ra là gì?',
        options: [
          'Kiểm tra lại từng bước lệnh để tìm ra lỗi sai và sửa',
          'Đập vỡ bàn phím máy tính vì nhân vật không nghe lời',
          'Bỏ cuộc ngay lập tức và không bao giờ học máy tính nữa',
          'Tắt máy tính đi ngủ và đổ lỗi do màn hình bị hỏng'
        ],
        correctIndex: 0,
        explanation: 'Đó là kỹ năng gỡ lỗi (Debug) - bình tĩnh xem lại từng câu lệnh để tìm ra bước sai logic và chỉnh sửa lại.'
      },
      {
        id: 4134,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong mê cung học tập, để nhân vật quay người sang bên trái một góc vuông, em dùng lệnh quay bao nhiêu độ?',
        options: [
          'Dùng lệnh quay sang trái một góc vuông bằng 90 độ',
          'Dùng lệnh quay sang trái một góc bẹt bằng 180 độ',
          'Dùng lệnh quay sang trái tròn một vòng bằng 360 độ',
          'Dùng lệnh quay sang trái một góc nhỏ bằng 10 độ'
        ],
        correctIndex: 0,
        explanation: 'Góc vuông trong hình học và lập trình chuyển hướng góc rẽ ngã tư chuẩn là 90 độ.'
      },
      {
        id: 4135,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Lợi ích chính của việc học lập trình qua các trò chơi giải đố mê cung trên máy tính là gì?',
        options: [
          'Rèn luyện tư duy logic và kỹ năng giải quyết vấn đề',
          'Làm quen với các trò chơi cờ bạc trực tuyến nguy hiểm',
          'Giúp học sinh lười suy nghĩ và ỷ lại vào máy tính',
          'Làm cho mắt học sinh nhanh mỏi và suy giảm trí nhớ'
        ],
        correctIndex: 0,
        explanation: 'Lập trình qua trò chơi giúp phát triển tư duy thuật toán, kiên nhẫn và khả năng phân tích vấn đề từng bước.'
      }
    ]
  },
  {
    id: 14,
    level: 6,
    grade: 4,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 14: Khám phá môi trường lập trình trực quan',
    desc: 'Làm quen giao diện Scratch: Vùng chứa lệnh (Blocks), Vùng lập trình (Scripts area), Sân khấu (Stage), Nhân vật (Sprite).',
    type: 'quiz',
    questions: [
      {
        id: 4141,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong phần mềm lập trình trực quan Scratch, khu vực hiển thị kết quả chuyển động của nhân vật có tên là gì?',
        options: [
          'Sân khấu của chương trình (khu vực Stage)',
          'Vùng chứa các khối lệnh (Blocks palette)',
          'Khu vực lắp ghép lệnh (Scripts area)',
          'Bảng danh mục các tệp tin lưu trong máy'
        ],
        correctIndex: 0,
        explanation: 'Sân khấu (Stage) là màn hình hiển thị trực quan nơi nhân vật (Sprite) biểu diễn các hoạt động theo lệnh đã lập trình.'
      },
      {
        id: 4142,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Nút biểu tượng Lá cờ màu xanh (Green Flag) nằm ở góc phía trên sân khấu Scratch có tác dụng gì?',
        options: [
          'Bắt đầu chạy chương trình điều khiển nhân vật',
          'Dừng lại toàn bộ hoạt động của tất cả nhân vật',
          'Xóa vĩnh viễn nhân vật Mèo khỏi sân khấu biểu diễn',
          'Lưu bài lập trình vào trong thư mục máy tính'
        ],
        correctIndex: 0,
        explanation: 'Nút lá cờ xanh (Green Flag) là nút xuất phát chuẩn để bắt đầu chạy kịch bản Scratch.'
      },
      {
        id: 4143,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Mỗi đối tượng tham gia diễn xuất trên sân khấu Scratch (như chú Mèo, chú Chó, quả Bóng) được gọi là gì?',
        options: [
          'Được gọi là Nhân vật của chương trình (Sprite)',
          'Được gọi là Dòng mã lệnh của chương trình (Code)',
          'Được gọi là Phông nền phía sau sân khấu (Backdrop)',
          'Được gọi là Thư mục lưu trữ bài làm (Folder)'
        ],
        correctIndex: 0,
        explanation: 'Trong Scratch, các đối tượng hoạt hình chuyển động trên sân khấu được gọi là Sprite (Nhân vật).'
      },
      {
        id: 4144,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Nút biểu tượng hình tròn màu đỏ nằm bên cạnh lá cờ xanh trong Scratch dùng để làm gì?',
        options: [
          'Dừng lại toàn bộ hoạt động của chương trình (Stop)',
          'Tăng tốc độ chạy của chú Mèo lên mức nhanh nhất',
          'Tự động sao chép thêm một nhân vật mới lên sân khấu',
          'Mở bài tập Scratch mới từ kho thư viện trực tuyến'
        ],
        correctIndex: 0,
        explanation: 'Nút đỏ (Stop) dùng để dừng ngay lập tức mọi hoạt động và âm thanh đang chạy của dự án Scratch.'
      },
      {
        id: 4145,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Cách thực hiện để lắp ghép các khối lệnh với nhau trong khu vực lập trình của Scratch là gì?',
        options: [
          'Kéo khối lệnh thả khớp vào mấu ghép của khối lệnh trước',
          'Gõ từng dòng chữ tiếng Anh bằng bàn phím vào ô trống',
          'Nháy đúp chuột thật nhanh vào biểu tượng thùng rác',
          'Nhấn phím Enter trên bàn phím liên tiếp mười lần'
        ],
        correctIndex: 0,
        explanation: 'Scratch là lập trình kéo thả trực quan (Drag and Drop): kéo khối lệnh từ bảng bên trái thả khớp vào mấu ghép.'
      }
    ]
  },
  {
    id: 15,
    level: 6,
    grade: 4,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 15: Tạo chương trình máy tính để diễn tả ý tưởng',
    desc: 'Lắp ghép các khối lệnh cơ bản: di chuyển, xoay hướng, nói lời thoại và lệnh đợi tạo nhịp điệu sinh động.',
    type: 'quiz',
    questions: [
      {
        id: 4151,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để nhân vật chú Mèo di chuyển một quãng ngắn về phía trước trên sân khấu, em sử dụng khối lệnh nào?',
        options: [
          'Khối lệnh "di chuyển 10 bước" (move 10 steps)',
          'Khối lệnh "xoay phải 15 độ" (turn right 15 degrees)',
          'Khối lệnh "nói Xin chào! trong 2 giây" (say Hello)',
          'Khối lệnh "đặt kích thước thành 100%" (set size)'
        ],
        correctIndex: 0,
        explanation: 'Khối lệnh màu xanh dương `di chuyển ... bước` trong nhóm Chuyển động (Motion) giúp nhân vật tiến về phía trước.'
      },
      {
        id: 4152,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Tại sao giữa hai hành động của nhân vật, chúng ta nên chèn thêm khối lệnh "đợi 1 giây" (wait 1 seconds)?',
        options: [
          'Để mắt người quan sát kịp nhìn thấy hành động rõ ràng',
          'Để làm cho máy tính bị treo đơ không hoạt động được',
          'Để nhân vật vĩnh viễn không bao giờ chuyển động nữa',
          'Để nhân vật tự động biến mất khỏi sân khấu Scratch'
        ],
        correctIndex: 0,
        explanation: 'Máy tính thực hiện lệnh cực nhanh trong vài phần nghìn giây. Lệnh `đợi 1 giây` tạo độ trễ cần thiết để mắt người theo dõi được.'
      },
      {
        id: 4153,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khối lệnh nào sau đây dùng để hiển thị bóng thoại có lời chào của nhân vật trên đầu trong một khoảng thời gian?',
        options: [
          'Khối lệnh "nói [Xin chào!] trong [2] giây"',
          'Khối lệnh "phát âm thanh [Meo] cho đến hết"',
          'Khối lệnh "thay đổi kích thước một lượng [10]"',
          'Khối lệnh "đi tới điểm x: [0] y: [0] trên sân khấu"'
        ],
        correctIndex: 0,
        explanation: 'Khối lệnh `say ... for ... seconds` thuộc nhóm Hiển thị (Looks) tạo bóng thoại như truyện tranh trên đầu nhân vật.'
      },
      {
        id: 4154,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để phát ra âm thanh tiếng kêu "Meo meo" vui nhộn của chú Mèo, em chọn khối lệnh trong nhóm lệnh nào?',
        options: [
          'Nhóm lệnh Âm thanh (Sound) có màu tím hoa cà',
          'Nhóm lệnh Chuyển động (Motion) có màu xanh dương',
          'Nhóm lệnh Điều khiển (Control) có màu vàng cam',
          'Nhóm lệnh Cảm biến (Sensing) có màu xanh lam nhạt'
        ],
        correctIndex: 0,
        explanation: 'Nhóm lệnh Âm thanh (Sound) màu hồng tím chứa các lệnh phát nhạc, phát tiếng kêu của nhân vật.'
      },
      {
        id: 4155,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khối lệnh sự kiện nào sau đây thường được đặt ở vị trí trên cùng của mọi kịch bản trong Scratch?',
        options: [
          'Khối lệnh "khi bấm vào [Lá cờ xanh]" (when flag clicked)',
          'Khối lệnh "di chuyển 10 bước" (move 10 steps)',
          'Khối lệnh "dừng lại tất cả" (stop all script)',
          'Khối lệnh "đặt hướng bằng 90" (point in direction)'
        ],
        correctIndex: 0,
        explanation: 'Khối lệnh có đỉnh vòm `when flag clicked` là sự kiện khởi động chuẩn cho mọi chuỗi lệnh trong Scratch.'
      }
    ]
  },
  {
    id: 16,
    level: 6,
    grade: 4,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 16: Chương trình của em',
    desc: 'Sử dụng vòng lặp "lặp lại 10 lần", lệnh "nếu chạm cạnh thì bật lại" để hoàn thành dự án hoạt hình hoàn chỉnh.',
    type: 'quiz',
    questions: [
      {
        id: 4161,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi muốn nhân vật thực hiện lặp đi lặp lại hành động bước đi 10 lần liên tục, em lồng khối lệnh vào đâu?',
        options: [
          'Lồng vào bên trong khối lệnh "lặp lại 10 lần" (repeat 10)',
          'Ghép liên tiếp 100 khối lệnh giống hệt nhau nối dài',
          'Chỉ cần bấm chuột liên tục thật nhanh vào lá cờ xanh',
          'Lồng vào bên trong khối lệnh dừng lại tất cả (stop all)'
        ],
        correctIndex: 0,
        explanation: 'Vòng lặp `lặp lại ... lần` trong nhóm Điều khiển (Control) giúp ngắn gọn chương trình, tái sử dụng lệnh thông minh.'
      },
      {
        id: 4162,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để nhân vật không bị chạy biến mất ra khỏi mép ngoài của sân khấu Scratch, em cần thêm khối lệnh nào?',
        options: [
          'Khối lệnh "nếu chạm cạnh, bật lại" (if on edge, bounce)',
          'Khối lệnh "ẩn nhân vật đi" (hide) trong nhóm hiển thị',
          'Khối lệnh "xóa tất cả hình vẽ" (erase all) trong nhóm bút',
          'Khối lệnh "dừng lại kịch bản này" (stop this script)'
        ],
        correctIndex: 0,
        explanation: 'Lệnh `nếu chạm cạnh, bật lại` tự động phát hiện khi nhân vật chạm mép sân khấu và quay ngược hướng lại.'
      },
      {
        id: 4163,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi chạy thử chương trình thấy chú Mèo bị lộn ngược đầu xuống đất khi quay đầu, em cần đặt kiểu xoay nào?',
        options: [
          'Đặt kiểu xoay trái - phải (set rotation style left-right)',
          'Đặt kiểu xoay tự do xung quanh (all around)',
          'Đặt kích thước nhân vật giảm xuống còn 10 phần trăm',
          'Xóa chú Mèo đi và chọn một nhân vật Quả bóng mới'
        ],
        correctIndex: 0,
        explanation: 'Lệnh `set rotation style left-right` giữ cho nhân vật luôn đứng thẳng người, chỉ quay mặt sang trái hoặc sang phải.'
      },
      {
        id: 4164,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để lưu bài dự án Scratch em vừa làm xong về máy tính cá nhân, em vào bảng chọn nào?',
        options: [
          'Vào menu File rồi chọn Lưu về máy tính (Save to your computer)',
          'Vào menu Edit rồi chọn Khôi phục lại nhân vật cũ đã xóa',
          'Nháy chuột vào biểu tượng lá cờ màu xanh trên sân khấu',
          'Tắt cửa sổ trình duyệt web đi mà không cần thao tác gì'
        ],
        correctIndex: 0,
        explanation: 'Vào Tập tin (File) -> Lưu về máy tính (Save to your computer) để lưu tệp có phần mở rộng `.sb3` về máy.'
      },
      {
        id: 4165,
        grade: 4,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Sau khi hoàn thành một chương trình Scratch, bước làm nào giúp sản phẩm của em hoàn thiện hơn?',
        options: [
          'Chạy thử nhiều lần để phát hiện lỗi và nhờ bạn bè góp ý',
          'Đóng máy tính ngay mà không cần kiểm tra lại kết quả chạy',
          'Xóa toàn bộ mã lệnh đi để không cho ai xem bài làm của mình',
          'Đổi tên tệp bài làm thành một dãy ký tự lạ không có nghĩa'
        ],
        correctIndex: 0,
        explanation: 'Kiểm thử (Testing) và tiếp thu góp ý là thói quen của lập trình viên giỏi để cải tiến sản phẩm ngày một hoàn hảo.'
      }
    ]
  }
];
