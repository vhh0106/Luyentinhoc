import { QuizQuestion } from '../types';

/**
 * BỘ CÂU HỎI TRẮC NGHIỆM TIN HỌC TIỂU HỌC PHÂN HÓA THEO KHỐI LỚP 3, 4, 5
 * Chuẩn chương trình GDPT 2018 - Bộ sách "Kết Nối Tri Thức Với Cuộc Sống"
 * 
 * NGUYÊN TẮC BIÊN SOẠN BẮT BUỘC:
 * 1. KỶ LUẬT CÂN BẰNG ĐỘ DÀI: Tất cả 4 phương án A, B, C, D có số từ và cấu trúc câu tương đương nhau.
 *    Tuyệt đối không để đáp án đúng dài hơn phương án nhiễu (chống mẹo chọn câu dài nhất).
 * 2. NÂNG CAO ĐỘ KHÓ: Tình huống thực tế, phân tích bước làm, nhận diện lỗi sai, đoán kết quả Scratch.
 * 3. PHÂN BIỆT RÕ RÀNG THEO KHỐI LỚP: Bám sát mục tiêu cụ thể của từng cuốn SGK Tin học 3, 4, 5.
 */

// ============================================================================
// KHỐI LỚP 3: NỀN TẢNG THÔNG TIN, THIẾT BỊ, THAO TÁC CƠ BẢN VÀ BẢO MẬT BẢN THÂN
// ============================================================================
export const QUESTIONS_GRADE_3: Record<string, QuizQuestion[]> = {
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM (Bài 1 - 5)
  cd1_may_tinh_va_em: [
    {
      id: 301,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Khi nghe tiếng chuông đồng hồ báo thức reo vào buổi sáng, bạn Minh quyết định rời giường để chuẩn bị đi học. Tiếng chuông reo đóng vai trò là gì?',
      options: [
        'Là thông tin giúp Minh ra quyết định',
        'Là quyết định hành động của bạn Minh',
        'Là kết quả cuối cùng sau khi thức dậy',
        'Là công cụ nhắc nhở thay cho phụ huynh'
      ],
      correctIndex: 0,
      explanation: 'Tiếng chuông reo là thông tin tiếp nhận được qua thính giác, từ đó não bộ đưa ra quyết định thức dậy.'
    },
    {
      id: 302,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Bạn An nhìn thấy bầu trời có nhiều mây đen xám xịt và quyết định mang theo áo mưa trước khi đến trường. Đâu là thông tin trong tình huống trên?',
      options: [
        'Bầu trời xuất hiện nhiều mây đen xám',
        'Hành động quyết định mang theo áo mưa',
        'Quãng đường từ nhà đi đến trường học',
        'Thời gian lúc bạn An rời khỏi ngôi nhà'
      ],
      correctIndex: 0,
      explanation: 'Bầu trời nhiều mây đen là thông tin quan sát được qua thị giác; mang áo mưa là quyết định dựa trên thông tin đó.'
    },
    {
      id: 303,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Trong các dạng thông tin thường gặp ở thế giới xung quanh, tiếng chim hót líu lo trên cành cây thuộc dạng thông tin nào?',
      options: [
        'Dạng âm thanh mà tai nghe được',
        'Dạng hình ảnh mà mắt nhìn thấy',
        'Dạng chữ viết được in trên giấy',
        'Dạng kí hiệu toán học trên bảng'
      ],
      correctIndex: 0,
      explanation: 'Ba dạng thông tin cơ bản lớp 3 được học là: chữ viết, hình ảnh và âm thanh. Tiếng chim hót là dạng âm thanh.'
    },
    {
      id: 304,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Bộ phận nào của cơ thể con người thực hiện nhiệm vụ xử lí thông tin thu nhận được để đưa ra suy nghĩ và quyết định hành động?',
      options: [
        'Bộ não nằm ở bên trong hộp sọ',
        'Đôi mắt nhìn thấy mọi vật thể',
        'Đôi tai lắng nghe các âm thanh',
        'Đôi bàn tay thực hiện cầm nắm'
      ],
      correctIndex: 0,
      explanation: 'Mắt, tai, mũi, da là các giác quan tiếp nhận thông tin; bộ não là cơ quan trung ương xử lí thông tin và ra quyết định.'
    },
    {
      id: 305,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Trên máy tính để bàn, bộ phận nào quan trọng nhất, chứa bộ xử lí CPU đóng vai trò như "bộ não" điều khiển mọi hoạt động của máy tính?',
      options: [
        'Thân máy tính để bàn (Case)',
        'Màn hình hiển thị hình ảnh',
        'Bàn phím nhập các chữ cái',
        'Chuột điều khiển con trỏ'
      ],
      correctIndex: 0,
      explanation: 'Thân máy chứa bộ xử lí (CPU), được ví như bộ não điều khiển toàn bộ hoạt động tính toán của máy tính.'
    },
    {
      id: 306,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Điểm khác biệt nổi bật của màn hình điện thoại thông minh và máy tính bảng so với màn hình máy tính để bàn truyền thống là gì?',
      options: [
        'Vừa hiển thị vừa dùng để nhập lệnh',
        'Chỉ có khả năng hiển thị các dòng chữ',
        'Cần gắn thêm chuột rời để điều khiển',
        'Không thể hiển thị được màu sắc sống động'
      ],
      correctIndex: 0,
      explanation: 'Màn hình cảm ứng của điện thoại thông minh và máy tính bảng vừa là thiết bị xuất (hiển thị) vừa thay thế chuột và bàn phím (thiết bị nhập).'
    },
    {
      id: 307,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Khi sử dụng máy tính, khoảng cách an toàn từ mắt của em đến màn hình máy tính nên duy trì trong khoảng nào để bảo vệ thị lực?',
      options: [
        'Khoảng từ 50 cm đến 80 cm',
        'Khoảng từ 10 cm đến 20 cm',
        'Khoảng từ 20 cm đến 35 cm',
        'Khoảng trên 120 cm trở lên'
      ],
      correctIndex: 0,
      explanation: 'SGK Tin học 3 quy định tư thế ngồi chuẩn: mắt ngang tầm màn hình và cách màn hình khoảng 50 - 80 cm.'
    },
    {
      id: 308,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Để đảm bảo an toàn về điện trong phòng thực hành Tin học, hành động nào sau đây là hoàn toàn ĐÚNG quy tắc?',
      options: [
        'Dùng chổi lông mềm khô phủi bụi',
        'Dùng khăn ướt sũng nước để lau',
        'Tự cắm lại dây khi ổ cắm bị lỏng',
        'Dùng que nhọn chọc vào khe cắm'
      ],
      correctIndex: 0,
      explanation: 'Chỉ dùng chổi mềm khô hoặc khăn khô mềm để vệ sinh máy tính; tuyệt đối không dùng khăn ướt hoặc kim loại chạm vào nguồn điện.'
    },
    {
      id: 309,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Quy trình tắt máy tính để bàn an toàn, không làm hỏng thiết bị và mất dữ liệu được thực hiện theo thứ tự nào sau đây?',
      options: [
        'Đóng phần mềm, nháy Start > Power > Shut down',
        'Nhấn giữ nút công tắc nguồn trên thân máy tính',
        'Rút trực tiếp phích cắm điện ra khỏi ổ cắm tường',
        'Chỉ tắt công tắc màn hình rồi rời khỏi phòng học'
      ],
      correctIndex: 0,
      explanation: 'Quy trình tắt máy đúng: Đóng các phần mềm đang làm việc -> Chọn Start -> Chọn Power -> Chọn lệnh Shut down -> Tắt công tắc màn hình.'
    },
    {
      id: 310,
      grade: 3,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Hai phím nào trên hàng phím cơ sở có gờ nổi đặc biệt giúp học sinh định vị ngón tay trỏ mà không cần nhìn xuống bàn phím?',
      options: [
        'Phím F và phím J ở giữa hàng',
        'Phím A và phím L ở hai bên',
        'Phím G và phím H ở giữa phím',
        'Phím S và phím K ở cạnh ngoài'
      ],
      correctIndex: 0,
      explanation: 'Phím F (ngón trỏ trái) và phím J (ngón trỏ phải) có gờ nổi nhỏ là vị trí mốc xuất phát chuẩn cho 10 ngón tay.'
    }
  ],

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET (Bài 6)
  cd2_mang_internet: [
    {
      id: 311,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      question: 'Khi truy cập Internet trên máy tính, học sinh tiểu học có thể khám phá những nội dung bổ ích nào sau đây?',
      options: [
        'Tin tức học tập và phim hoạt hình thiếu nhi',
        'Trò chơi bạo lực và phim ảnh người lớn tuổi',
        'Trang web mua bán đổi tiền trên mạng xã hội',
        'Các ứng dụng đòi hỏi cung cấp mã số ngân hàng'
      ],
      correctIndex: 0,
      explanation: 'Internet cung cấp kho tri thức khổng lồ về học tập, lịch sử, văn hóa và giải trí lành mạnh phù hợp lứa tuổi.'
    },
    {
      id: 312,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      question: 'Nếu trong khi dùng Internet, màn hình xuất hiện trang web có nội dung bạo lực hoặc hình ảnh đáng sợ, em nên làm gì ngay lập tức?',
      options: [
        'Đóng trang web và báo ngay cho thầy cô, bố mẹ',
        'Tiếp tục nhấn xem tiếp vì cảm thấy tò mò',
        'Gửi liên kết trang web đó cho các bạn trong lớp',
        'Nhập họ tên của mình vào để đăng ký xem thêm'
      ],
      correctIndex: 0,
      explanation: 'Khi gặp nội dung xấu hoặc đáng sợ, cần đóng trang web ngay và thông báo cho người lớn đáng tin cậy để được hỗ trợ.'
    },
    {
      id: 313,
      grade: 3,
      topicCode: 'cd2_mang_internet',
      question: 'Đặc điểm nào sau đây là ĐÚNG khi nói về nguồn thông tin khổng lồ trên mạng Internet?',
      options: [
        'Rất đa dạng nhưng có cả thông tin chưa đúng',
        'Tất cả mọi thông tin đều hoàn toàn chính xác',
        'Không bao giờ thay đổi hay cập nhật nội dung',
        'Chỉ có sẵn văn bản chứ không có hình ảnh đẹp'
      ],
      correctIndex: 0,
      explanation: 'Thông tin trên Internet rất phong phú nhưng cũng chứa nhiều thông tin sai lệch hoặc chưa được kiểm chứng.'
    }
  ],

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN (Bài 7 - 9)
  cd3_luu_tru_tim_kiem: [
    {
      id: 314,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Mục đích chính của việc sắp xếp sách vở trên giá sách hoặc quần áo trong tủ theo từng ngăn ngăn nắp là gì?',
      options: [
        'Giúp việc tìm kiếm đồ vật nhanh và dễ dàng hơn',
        'Làm cho số lượng đồ vật tăng lên nhiều hơn nữa',
        'Để người khác không thể tìm thấy đồ vật của mình',
        'Chỉ để trang trí cho căn phòng trông đẹp mắt hơn'
      ],
      correctIndex: 0,
      explanation: 'Sắp xếp hợp lí theo phân loại giúp chúng ta quản lí đồ đạc gọn gàng và tìm kiếm nhanh chóng khi cần.'
    },
    {
      id: 315,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Trong máy tính, thông tin được tổ chức lưu trữ dưới dạng sơ đồ hình cây. Phát biểu nào sau đây là SAI?',
      options: [
        'Trong một thư mục mẹ, hai thư mục con được trùng tên',
        'Một thư mục có thể chứa nhiều tệp và thư mục con',
        'Ổ đĩa C: và ổ đĩa D: được gọi là các thư mục gốc',
        'Hai tệp ở hai thư mục khác nhau có thể trùng tên nhau'
      ],
      correctIndex: 0,
      explanation: 'Trong cùng một thư mục mẹ, các tệp hoặc thư mục con KHÔNG ĐƯỢC PHÉP trùng tên nhau.'
    },
    {
      id: 316,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Biểu tượng hình kẹp giấy màu vàng xuất hiện trong cửa sổ quản lý tệp trên máy tính đại diện cho đối tượng nào?',
      options: [
        'Thư mục (Folder) dùng để chứa các tệp tin',
        'Tệp văn bản Word chứa những bài thơ học tập',
        'Tệp hình ảnh chụp quang cảnh trường tiểu học',
        'Phần mềm trò chơi được cài đặt trên ổ đĩa'
      ],
      correctIndex: 0,
      explanation: 'Thư mục trong hệ điều hành Windows thường có biểu tượng cặp kẹp giấy hoặc chiếc cặp màu vàng.'
    },
    {
      id: 317,
      grade: 3,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Để tạo một thư mục mới trong cửa sổ làm việc với tệp của máy tính, em chọn nút lệnh nào trên dải lệnh Home?',
      options: [
        'Chọn nút lệnh New folder màu vàng',
        'Chọn nút lệnh Rename để sửa lại tên',
        'Chọn nút lệnh Delete để loại bỏ tệp',
        'Chọn nút lệnh Cut để di chuyển thư mục'
      ],
      correctIndex: 0,
      explanation: 'Nút lệnh "New folder" trên dải lệnh Home được sử dụng để tạo một thư mục con mới.'
    }
  ],

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA SỐ (Bài 10)
  cd4_dao_duc_phap_luat: [
    {
      id: 318,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      question: 'Những thông tin nào sau đây thuộc về "thông tin cá nhân và gia đình" mà học sinh cần phải giữ bí mật trên mạng?',
      options: [
        'Họ tên, địa chỉ nhà ở, số điện thoại, mật khẩu',
        'Tên các môn học em được học ở trường tiểu học',
        'Tên bài hát thiếu nhi mà cả lớp cùng yêu thích',
        'Danh sách các cuốn sách giáo khoa lớp 3 em đang học'
      ],
      correctIndex: 0,
      explanation: 'Họ tên đầy đủ, địa chỉ nhà, ngày sinh, số điện thoại bố mẹ và mật khẩu là thông tin riêng tư cần bảo vệ tuyệt đối.'
    },
    {
      id: 319,
      grade: 3,
      topicCode: 'cd4_dao_duc_phap_luat',
      question: 'Khi một người lạ trên mạng trò chuyện và hỏi xin địa chỉ nhà cùng số điện thoại của em, cách xử lí đúng nhất là gì?',
      options: [
        'Từ chối cung cấp và báo ngay cho cha mẹ biết',
        'Vui vẻ nhắn ngay địa chỉ nhà cho người đó biết',
        'Hỏi người đó xem có tặng quà gì cho em không',
        'Gửi thêm hình ảnh chụp toàn bộ ngôi nhà của em'
      ],
      correctIndex: 0,
      explanation: 'Không tuỳ tiện cung cấp thông tin riêng tư cho người lạ trên mạng và phải báo ngay cho phụ huynh hoặc thầy cô.'
    }
  ],

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC (Bài 11 - 13)
  cd5_ung_dung_tin_hoc: [
    {
      id: 320,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Biểu tượng của phần mềm trình chiếu Microsoft PowerPoint dùng để tạo các trang chiếu thuyết trình có dạng như thế nào?',
      options: [
        'Hình chữ P màu cam nổi bật trên nền đỏ cam',
        'Hình chữ W màu xanh lam trên nền xanh nước biển',
        'Hình chữ X màu xanh lá cây trên nền ô vuông',
        'Hình chiếc kéo nhỏ màu bạc dùng cắt dán hình'
      ],
      correctIndex: 0,
      explanation: 'PowerPoint có biểu tượng chữ P màu cam (Word chữ W màu xanh, Excel chữ X màu xanh lá).'
    },
    {
      id: 321,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Trong phần mềm trình chiếu PowerPoint, khi muốn bắt đầu trình chiếu bài giảng toàn màn hình, em nhấn phím tắt nào?',
      options: [
        'Nhấn phím F5 trên hàng phím chức năng',
        'Nhấn phím Esc ở góc trên cùng bên trái',
        'Nhấn phím Enter trên hàng phím cơ sở',
        'Nhấn phím Spacebar trên hàng phím cách'
      ],
      correctIndex: 0,
      explanation: 'Phím F5 dùng để bắt đầu trình chiếu toàn màn hình từ trang đầu tiên; phím Esc dùng để thoát khỏi chế độ trình chiếu.'
    },
    {
      id: 322,
      grade: 3,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Thao tác "nháy đúp chuột" (double-click) được thực hiện như thế nào trên chuột máy tính?',
      options: [
        'Nhấn nút chuột trái hai lần liên tiếp thật nhanh',
        'Nhấn nút chuột phải hai lần liên tiếp thật nhanh',
        'Nhấn giữ nút chuột trái rồi di chuyển con trỏ đi',
        'Lăn bánh xe ở giữa thân chuột lên phía trên'
      ],
      correctIndex: 0,
      explanation: 'Nháy đúp chuột là thao tác dùng ngón trỏ nhấn nút chuột trái 2 lần liên tiếp nhanh và dứt khoát.'
    }
  ],

  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH (Bài 14 - 16)
  cd6_giai_quyet_van_de: [
    {
      id: 323,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Khi thực hiện công việc đánh răng mỗi ngày, việc chia nhỏ công việc thành 5 bước tuần tự giúp mang lại lợi ích gì?',
      options: [
        'Giúp công việc rõ ràng, dễ hiểu và dễ thực hiện đúng',
        'Làm cho thời gian hoàn thành công việc bị kéo dài hơn',
        'Khiến cho các bước thực hiện trở nên phức tạp khó nhớ',
        'Chỉ để ghi chép vào trong vở chứ không áp dụng thực tế'
      ],
      correctIndex: 0,
      explanation: 'Chia một việc lớn thành các việc nhỏ tuần tự giúp chúng ta dễ hiểu, dễ làm theo và không bị bỏ sót bước nào.'
    },
    {
      id: 324,
      grade: 3,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Câu nói nào sau đây diễn đạt một công việc được thực hiện theo điều kiện đúng với cấu trúc "Nếu ... thì ..."?',
      options: [
        'Nếu trời mưa to thì em sẽ mặc áo mưa khi đi học',
        'Em thức dậy vào buổi sáng và ăn sáng cùng cả gia đình',
        'Mỗi buổi chiều sau giờ học em thường quét dọn nhà cửa',
        'Em rất thích học môn Tin học và môn Mỹ thuật ở trường'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc theo điều kiện: "Nếu <điều kiện xảy ra> thì <thực hiện việc tương ứng>".'
    }
  ]
};

// ============================================================================
// KHỐI LỚP 4: PHẦN CỨNG - PHẦN MỀM, TÌM KIẾM INTERNET, BẢN QUYỀN, SOẠN THẢO VĂN BẢN VÀ SCRATCH CƠ BẢN
// ============================================================================
export const QUESTIONS_GRADE_4: Record<string, QuizQuestion[]> = {
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM (Bài 1 - 2)
  cd1_may_tinh_va_em: [
    {
      id: 401,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Trong các đối tượng sau đây của máy tính, nhóm nào bao gồm toàn bộ là các thiết bị PHẦN CỨNG (Hardware)?',
      options: [
        'Màn hình, bàn phím, thân máy, chuột, loa máy tính',
        'Hệ điều hành Windows, phần mềm Word, thân máy tính',
        'Phần mềm gõ Unikey, bàn phím máy tính, phần mềm Paint',
        'Trình duyệt web Chrome, loa máy tính, chuột cảm ứng'
      ],
      correctIndex: 0,
      explanation: 'Phần cứng là các bộ phận vật lý có thể nhìn thấy và chạm tay vào: màn hình, chuột, bàn phím, thân máy, loa...'
    },
    {
      id: 402,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Phát biểu nào sau đây mô tả ĐÚNG NHẤT về mối quan hệ phụ thuộc giữa phần cứng và phần mềm máy tính?',
      options: [
        'Phần mềm lưu ở phần cứng và điều khiển phần cứng chạy',
        'Phần cứng có thể tự làm việc mà không cần phần mềm',
        'Phần mềm có thể tự hoạt động khi không có phần cứng',
        'Phần cứng và phần mềm hoàn toàn độc lập, không liên quan'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm được cài đặt và lưu trữ trong phần cứng, đồng thời gửi chỉ thị điều khiển phần cứng thực hiện nhiệm vụ.'
    },
    {
      id: 403,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Hành động nào sau đây khi sử dụng máy tính có thể trực tiếp làm HỎNG PHẦN CỨNG hoặc gây lỗi hỏng phần mềm?',
      options: [
        'Tắt máy bằng cách nhấn giữ nút nguồn trên thân máy',
        'Đặt máy tính ở nơi khô ráo, thoáng mát và sạch sẽ',
        'Dùng chổi lông mềm quét nhẹ bụi bẩn bám trên phím',
        'Đóng các tài liệu đang soạn thảo trước khi Shut down'
      ],
      correctIndex: 0,
      explanation: 'Nhấn giữ nút nguồn đột ngột ngắt nguồn điện khi ổ đĩa đang đọc ghi, dễ gây hỏng ổ cứng và lỗi tệp hệ thống.'
    },
    {
      id: 404,
      grade: 4,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Khi muốn gõ kí tự phía trên của phím có 2 kí tự (ví dụ gõ dấu cộng + trên phím dấu =), em thực hiện thao tác nào?',
      options: [
        'Nhấn giữ phím Shift kết hợp gõ phím chứa kí tự đó',
        'Nhấn giữ phím Ctrl kết hợp gõ phím chứa kí tự đó',
        'Nhấn giữ phím Alt kết hợp gõ phím chứa kí tự đó',
        'Bật đèn phím Caps Lock rồi gõ trực tiếp phím đó'
      ],
      correctIndex: 0,
      explanation: 'Phím Shift kết hợp với phím có 2 kí tự dùng để gõ kí tự nằm ở nửa trên của phím.'
    }
  ],

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET (Bài 3)
  cd2_mang_internet: [
    {
      id: 405,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      question: 'Trên một trang web tin tức, dấu hiệu trực quan nào giúp em nhận biết một đoạn văn bản hoặc hình ảnh có chứa "Siêu liên kết" (Hyperlink)?',
      options: [
        'Con trỏ chuột chuyển từ hình mũi tên thành bàn tay',
        'Đoạn văn bản đó tự động nhấp nháy nhiều màu sắc',
        'Màn hình máy tính phát ra tiếng chuông báo hiệu lớn',
        'Phông chữ của dòng đó tự động phóng to gấp hai lần'
      ],
      correctIndex: 0,
      explanation: 'Khi di chuyển con trỏ chuột vào vị trí chứa siêu liên kết, con trỏ sẽ tự động chuyển thành hình bàn tay trỏ ngón.'
    },
    {
      id: 406,
      grade: 4,
      topicCode: 'cd2_mang_internet',
      question: 'Nếu học sinh cố tình truy cập vào các trang web có nội dung xấu, không phù hợp lứa tuổi thì có thể gặp tác hại nghiêm trọng nào?',
      options: [
        'Có nguy cơ bị kẻ xấu lừa đảo, bắt nạt và suy nghĩ lệch lạc',
        'Làm cho tốc độ đường truyền mạng Internet bị chậm lại',
        'Làm hỏng ngay lập tức bàn phím và chuột của máy tính',
        'Không gặp bất kì rủi ro nào nếu dùng trình duyệt ẩn danh'
      ],
      correctIndex: 0,
      explanation: 'Trang web xấu chứa nhiều cạm bẫy: lừa đảo, đe doạ bắt nạt trực tuyến, tiêm nhiễm suy nghĩ sai lệch và lãng phí thời gian.'
    }
  ],

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN (Bài 4 - 5)
  cd3_luu_tru_tim_kiem: [
    {
      id: 407,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Khi cần tìm kiếm tài liệu trên Internet về các đời vua Hùng dựng nước để làm bài tập Lịch sử, từ khoá nào sau đây là NGẮN GỌN và CHÍNH XÁC nhất?',
      options: [
        'Các đời vua Hùng',
        'Lịch sử dựng nước của dân tộc Việt Nam ngày xưa',
        'Em muốn tìm bài tập về các vị vua ở nước ta',
        'Vua Hùng có bao nhiêu người con và dựng nước'
      ],
      correctIndex: 0,
      explanation: 'Từ khoá tốt là cụm từ ngắn gọn, chứa đựng chính xác nội dung trọng tâm cần tìm kiếm (ở đây là "Các đời vua Hùng").'
    },
    {
      id: 408,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Điểm khác nhau cơ bản giữa thao tác "Sao chép" (Copy) và thao tác "Di chuyển" (Move to / Cut) một tệp tin là gì?',
      options: [
        'Sao chép giữ tệp ở cả nơi cũ, di chuyển chỉ còn ở nơi mới',
        'Sao chép làm tệp biến mất, di chuyển làm tệp nhân đôi lên',
        'Sao chép chỉ áp dụng cho ảnh, di chuyển chỉ áp dụng cho tệp',
        'Hai thao tác này hoàn toàn giống nhau, không có khác biệt'
      ],
      correctIndex: 0,
      explanation: 'Sao chép (Copy) tạo thêm bản sao tại nơi mới và giữ nguyên tệp ở nơi cũ; Di chuyển (Cut/Move) chuyển tệp sang nơi mới và xoá khỏi nơi cũ.'
    },
    {
      id: 409,
      grade: 4,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Khi thao tác với tệp và thư mục trên máy tính, hành động nào sau đây là NGUY HIỂM và TUYỆT ĐỐI KHÔNG ĐƯỢC làm?',
      options: [
        'Tự ý xoá các tệp trong thư mục hệ thống Windows ở ổ đĩa C:',
        'Đổi tên một tệp văn bản do chính em tự tạo trong thư mục riêng',
        'Tạo một thư mục mới có tên là BaiTap để lưu trữ các bài tập',
        'Sao chép một bức ảnh vẽ ở lớp 3 sang thư mục của lớp 4'
      ],
      correctIndex: 0,
      explanation: 'Thư mục Windows ở ổ C: chứa các tệp hệ thống cốt lõi; xoá nhầm sẽ làm lỗi hệ điều hành và tê liệt máy tính.'
    }
  ],

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA SỐ (Bài 6)
  cd4_dao_duc_phap_luat: [
    {
      id: 410,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      question: 'Trong các phần mềm sau đây, phần mềm nào là "Phần mềm miễn phí" (Freeware) mà tác giả cho phép tải về và sử dụng tự do không phải trả tiền?',
      options: [
        'Phần mềm gõ tiếng Việt Unikey',
        'Bộ phần mềm văn phòng Microsoft Office',
        'Phần mềm thiết kế đồ hoạ Adobe Photoshop',
        'Trò chơi thương mại trả phí trên mạng'
      ],
      correctIndex: 0,
      explanation: 'Unikey, Scratch, Kiran\'s Typing Tutor là những phần mềm miễn phí được tác giả cho phép cộng đồng sử dụng tự do.'
    },
    {
      id: 411,
      grade: 4,
      topicCode: 'cd4_dao_duc_phap_luat',
      question: 'Tại sao chúng ta nên sử dụng phần mềm có bản quyền chính hãng thay vì tìm kiếm các bản "bẻ khoá" (crack) trôi nổi trên mạng?',
      options: [
        'Tránh virus độc hại, bảo vệ dữ liệu và tuân thủ pháp luật',
        'Vì phần mềm bẻ khoá có nhiều chức năng nâng cao hơn hẳn',
        'Để máy tính không bao giờ phải kết nối với mạng Internet',
        'Vì phần mềm bẻ khoá bắt buộc phải có máy tính cấu hình cao'
      ],
      correctIndex: 0,
      explanation: 'Phần mềm lậu thường bị chèn mã độc/virus, đánh cắp mật khẩu, gây lỗi hệ thống và vi phạm quyền sở hữu trí tuệ.'
    }
  ],

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC (Bài 7 - 11)
  cd5_ung_dung_tin_hoc: [
    {
      id: 412,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Trong phần mềm soạn thảo văn bản Word, phím Delete và phím Backspace khác nhau ở đặc điểm cốt lõi nào?',
      options: [
        'Delete xoá kí tự bên phải, Backspace xoá kí tự bên trái con trỏ',
        'Delete xoá kí tự bên trái, Backspace xoá kí tự bên phải con trỏ',
        'Delete dùng viết hoa chữ cái, Backspace dùng ngắt đoạn văn bản',
        'Delete xoá toàn bộ văn bản, Backspace chỉ xoá được hình ảnh chèn'
      ],
      correctIndex: 0,
      explanation: 'Khi con trỏ soạn thảo nhấp nháy giữa 2 kí tự: phím Backspace xoá kí tự bên TRÁI, phím Delete xoá kí tự bên PHẢI.'
    },
    {
      id: 413,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Để gõ từ "Hương sen" theo kiểu gõ Telex chuẩn tiếng Việt, em phải nhấn các phím chữ cái nào trên bàn phím?',
      options: [
        'Huowng sen',
        'Huongws sen',
        'Huongr sen',
        'Huongj sen'
      ],
      correctIndex: 0,
      explanation: 'Trong kiểu gõ Telex: ow thành ơ, uw thành ư, w thành ư (hoặc huowng thành hương).'
    },
    {
      id: 414,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Trong phần mềm trình chiếu PowerPoint, muốn tạo hiệu ứng xuất hiện sinh động khi chuyển từ trang chiếu này sang trang chiếu khác, em dùng dải lệnh nào?',
      options: [
        'Dải lệnh Transitions trên thanh công cụ',
        'Dải lệnh Animations trên thanh công cụ',
        'Dải lệnh Review trên thanh công cụ',
        'Dải lệnh View trên thanh công cụ'
      ],
      correctIndex: 0,
      explanation: 'Dải lệnh Transitions dùng để chọn hiệu ứng chuyển tiếp giữa các trang chiếu (Slide Transitions).'
    },
    {
      id: 415,
      grade: 4,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Để định dạng một đoạn văn bản có kiểu chữ vừa IN ĐẬM vừa IN NGHIÊNG trong phần mềm Word, em lần lượt chọn hai nút lệnh nào?',
      options: [
        'Nút lệnh chữ B (Bold) và nút lệnh chữ I (Italic)',
        'Nút lệnh chữ B (Bold) và nút lệnh chữ U (Underline)',
        'Nút lệnh chữ I (Italic) và nút lệnh chữ U (Underline)',
        'Nút lệnh màu chữ Font Color và nút phông chữ Font'
      ],
      correctIndex: 0,
      explanation: 'Chữ B (Bold) là in đậm, chữ I (Italic) là in nghiêng, chữ U (Underline) là gạch chân.'
    }
  ],

  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH (Bài 13 - 16)
  cd6_giai_quyet_van_de: [
    {
      id: 416,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Trong môi trường lập trình trực quan Scratch, khối lệnh bắt đầu với biểu tượng "Lá cờ màu xanh" thuộc nhóm lệnh nào sau đây?',
      options: [
        'Nhóm lệnh Sự kiện (Events) màu vàng',
        'Nhóm lệnh Chuyển động (Motion) màu xanh lam',
        'Nhóm lệnh Điều khiển (Control) màu da cam',
        'Nhóm lệnh Cảm biến (Sensing) màu xanh lơ'
      ],
      correctIndex: 0,
      explanation: 'Khối lệnh "Khi bấm vào lá cờ xanh" thuộc nhóm lệnh Sự kiện (Events), là điểm khởi đầu kích hoạt chạy chương trình.'
    },
    {
      id: 417,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Để nhân vật chú mèo trong Scratch di chuyển một quãng đường về phía trước rồi tạm dừng 1 giây mới đi tiếp, em ghép các lệnh nào?',
      options: [
        'Lệnh "di chuyển 10 bước" nối tiếp lệnh "đợi 1 giây"',
        'Lệnh "quay phải 90 độ" nối tiếp lệnh "bật lại nếu chạm cạnh"',
        'Lệnh "nhấc bút vẽ" nối tiếp lệnh "chọn màu bút vẽ xanh"',
        'Lệnh "nói Xin chào" nối tiếp lệnh "lướt trong 1 giây ngẫu nhiên"'
      ],
      correctIndex: 0,
      explanation: 'Lắp ghép tuần tự: lệnh "di chuyển 10 bước" (nhóm Chuyển động) nối phía dưới là lệnh "đợi 1 giây" (nhóm Điều khiển).'
    },
    {
      id: 418,
      grade: 4,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Khi lập trình cho nhân vật chạy tới sát mép sân khấu thì quay đầu lại, không bị đi mất tích ra ngoài màn hình, em sử dụng lệnh nào?',
      options: [
        'Lệnh "bật lại nếu chạm cạnh" trong nhóm Chuyển động',
        'Lệnh "xoá tất cả hình vẽ" trong nhóm lệnh Bút vẽ',
        'Lệnh "phát âm thanh meow đến hết" trong nhóm Âm thanh',
        'Lệnh "chuyển sang trang phục kế tiếp" trong nhóm Hiển thị'
      ],
      correctIndex: 0,
      explanation: 'Lệnh "bật lại nếu chạm cạnh" (If on edge, bounce) giúp nhân vật bật ngược lại khi đi chạm vào đường biên sân khấu.'
    }
  ]
};

// ============================================================================
// KHỐI LỚP 5: CÂY THƯ MỤC NÂNG CAO, SẢN PHẨM SỐ, BỐ TRÍ VĂN BẢN & SCRATCH CHUYÊN SÂU
// ============================================================================
export const QUESTIONS_GRADE_5: Record<string, QuizQuestion[]> = {
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM (Bài 1)
  cd1_may_tinh_va_em: [
    {
      id: 501,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Học sinh lớp 5 có thể tự tạo ra những "Sản phẩm số" ý nghĩa nào sau đây phục vụ học tập và sinh hoạt Đội?',
      options: [
        'Bài trình chiếu thuyết trình, thiệp chúc mừng, album ảnh kỉ niệm',
        'Các thiết bị bàn phím cơ và màn hình máy tính điện tử cao cấp',
        'Dây cáp mạng Internet và các ổ cắm điện chống giật trong trường',
        'Con chip vi xử lí CPU và bảng mạch điện tử của thân máy tính'
      ],
      correctIndex: 0,
      explanation: 'Sản phẩm số là sản phẩm tạo ra bằng phần mềm trên máy tính: bài trình chiếu, thiệp điện tử, video, chương trình Scratch...'
    },
    {
      id: 502,
      grade: 5,
      topicCode: 'cd1_may_tinh_va_em',
      question: 'Khi làm việc nhóm để hoàn thành bài tập chung, phần mềm nào sau đây giúp các bạn thảo luận trực tuyến hiệu quả nhất?',
      options: [
        'Các ứng dụng họp trực tuyến như Google Meet, Zoom hoặc Teams',
        'Phần mềm gõ mười ngón bàn phím Kiran\'s Typing Tutor trên máy',
        'Phần mềm xem video đa phương tiện Windows Media Player của máy',
        'Phần mềm đồ hoạ Paint khi vẽ các khối hình học cơ bản'
      ],
      correctIndex: 0,
      explanation: 'Google Meet, Zoom, Microsoft Teams là các công cụ giao tiếp và họp trực tuyến hỗ trợ học tập cộng tác từ xa.'
    }
  ],

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET (Bài 2)
  cd2_mang_internet: [
    {
      id: 503,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      question: 'Khi cắm thiết bị nhớ USB vào máy tính để sao chép bài học, thao tác RÚT USB AN TOÀN đúng kĩ thuật là gì?',
      options: [
        'Nháy nút Eject trong khay hệ thống trước khi rút thiết bị',
        'Rút mạnh thiết bị ra khỏi cổng cắm khi đèn USB đang chớp sáng',
        'Tắt màn hình máy tính rồi lập tức giật phích cắm USB ra',
        'Không cần làm thao tác gì đặc biệt, cứ rút thẳng tay ra'
      ],
      correctIndex: 0,
      explanation: 'Cần nháy chuột vào biểu tượng USB ở khay hệ thống, chọn lệnh "Eject" (ngắt kết nối an toàn) trước khi rút để tránh mất dữ liệu.'
    },
    {
      id: 504,
      grade: 5,
      topicCode: 'cd2_mang_internet',
      question: 'Trên giao diện một website tin tức dành cho thiếu nhi, biểu tượng chiếc Kính lúp thường được dùng để thực hiện chức năng gì?',
      options: [
        'Mở ô tìm kiếm thông tin bằng từ khoá trên website đó',
        'Quay trở lại trang chủ chính của tờ báo điện tử',
        'Phóng to toàn bộ kích thước chữ của bài báo lên gấp đôi',
        'Đổi màu nền của trang web sang chế độ đọc ban đêm'
      ],
      correctIndex: 0,
      explanation: 'Biểu tượng kính lúp là quy ước quốc tế cho công cụ tìm kiếm (Search box).'
    }
  ],

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN (Bài 3 - 4)
  cd3_luu_tru_tim_kiem: [
    {
      id: 505,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Trước khi tham gia chuyến dã ngoại ngoại khoá ở vùng núi cao, việc tìm kiếm thông tin nào sau đây là QUAN TRỌNG NHẤT để chuẩn bị trang phục?',
      options: [
        'Dự báo thời tiết và nhiệt độ tại địa điểm tham quan',
        'Danh sách tên các bạn học sinh trong ban chỉ huy Đội',
        'Giá bán các loại đồ chơi lưu niệm ở khu du lịch đó',
        'Lịch sử hình thành của các ngọn núi xung quanh khu vực'
      ],
      correctIndex: 0,
      explanation: 'Thu thập thông tin thời tiết, nhiệt độ giúp giải quyết vấn đề chuẩn bị quần áo ấm, giày leo núi và đồ bảo hộ phù hợp.'
    },
    {
      id: 506,
      grade: 5,
      topicCode: 'cd3_luu_tru_tim_kiem',
      question: 'Khi không nhớ chính xác một tệp tài liệu đã lưu ở thư mục nào trong ổ đĩa D:, công cụ nào trong File Explorer giúp em tìm nhanh nhất?',
      options: [
        'Ô Search ở góc trên bên phải cửa sổ File Explorer',
        'Nút lệnh New folder trên thanh công cụ Home',
        'Nút lệnh Delete để dọn dẹp các tệp tin trong máy',
        'Thanh địa chỉ Address bar ở đầu cửa sổ làm việc'
      ],
      correctIndex: 0,
      explanation: 'Ô tìm kiếm (Search box) ở góc phải File Explorer cho phép gõ tên tệp hoặc phần tên tệp để tìm tự động trên toàn ổ đĩa.'
    }
  ],

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HÓA SỐ (Bài 5)
  cd4_dao_duc_phap_luat: [
    {
      id: 507,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      question: 'Khi đưa một bài thơ hay của nhà thơ khác vào bài trình chiếu hoặc bài báo tường của lớp mình, hành vi nào sau đây là ĐÚNG ĐẠO ĐỨC và LUẬT BẢN QUYỀN?',
      options: [
        'Ghi rõ tên tác giả và nguồn xuất bản của bài thơ đó',
        'Xoá tên tác giả và thay thế bằng tên của chính mình',
        'Không ghi tên ai để mọi người nghĩ mình tự sáng tác',
        'Chỉ xin phép bạn cùng bàn mà không cần ghi rõ tác giả'
      ],
      correctIndex: 0,
      explanation: 'Tôn trọng bản quyền nội dung thông tin: khi sử dụng tác phẩm của người khác phải ghi rõ tên tác giả và nguồn gốc tác phẩm.'
    },
    {
      id: 508,
      grade: 5,
      topicCode: 'cd4_dao_duc_phap_luat',
      question: 'Bạn Bình vô tình thấy cuốn sổ nhật kí của bạn An để quên trong ngăn bàn. Hành động nào sau đây của Bình thể hiện sự TÔN TRỌNG QUYỀN RIÊNG TƯ?',
      options: [
        'Cất giữ cẩn thận và trả lại cho An, không đọc trộm',
        'Mở ra đọc rồi kể nội dung bí mật cho cả lớp cùng nghe',
        'Chụp ảnh các trang nhật kí rồi đăng lên nhóm mạng xã hội',
        'Cất giấu luôn cuốn nhật kí không bao giờ trả lại cho bạn'
      ],
      correctIndex: 0,
      explanation: 'Nhật kí, tin nhắn, email là tài sản riêng tư; đọc trộm hoặc phát tán thông tin riêng tư là vi phạm đạo đức và pháp luật.'
    }
  ],

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC (Bài 6 - 9)
  cd5_ung_dung_tin_hoc: [
    {
      id: 509,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Trong phần mềm Word, khi chèn hình ảnh minh hoạ vào văn bản, chế độ bố trí ảnh nào giúp các dòng chữ TỰ ĐỘNG BAO QUANH khung hình chữ nhật của ảnh?',
      options: [
        'Chế độ bố trí Square trong bảng chọn Layout Options',
        'Chế độ In Line with Text giữ ảnh nằm trên dòng chữ',
        'Chế độ Behind Text giấu toàn bộ bức ảnh ra sau chữ',
        'Chế độ Top and Bottom ngăn không cho chữ ở hai bên ảnh'
      ],
      correctIndex: 0,
      explanation: 'Chế độ Square (trong Layout Options) làm cho văn bản tự động chảy và bao quanh 4 cạnh của khung hình ảnh một cách đẹp mắt.'
    },
    {
      id: 510,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Trong phần mềm đồ hoạ Paint, muốn sao chép một hình quả bóng bay thành nhiều quả bóng bay khác màu, em dùng công cụ nào trước tiên?',
      options: [
        'Dùng công cụ Select để bao quanh chọn quả bóng bay',
        'Dùng công cụ bút vẽ Brushes để tô màu cho quả bóng',
        'Dùng công cụ tẩy Eraser để xoá đi các nét vẽ thừa',
        'Dùng công cụ kính lúp Magnifier để phóng to trang vẽ'
      ],
      correctIndex: 0,
      explanation: 'Bước đầu tiên để sao chép một hình thể trong Paint là dùng công cụ chọn (Select) để khoanh vùng đối tượng.'
    },
    {
      id: 511,
      grade: 5,
      topicCode: 'cd5_ung_dung_tin_hoc',
      question: 'Trong phần mềm Paint, để lật ngược một hình vẽ theo chiều ngang (đối xứng trái sang phải), em sử dụng lệnh nào trong mục Rotate?',
      options: [
        'Chọn lệnh Flip horizontal trong mục Rotate',
        'Chọn lệnh Flip vertical trong mục Rotate',
        'Chọn lệnh Rotate right 90 trong mục Rotate',
        'Chọn lệnh Resize and Skew trên thanh công cụ'
      ],
      correctIndex: 0,
      explanation: 'Lệnh Flip horizontal lật đối xứng hình theo trục ngang (trái - phải); Flip vertical lật đối xứng theo trục dọc (trên - dưới).'
    }
  ],

  // CHỦ ĐỀ 6: THUẬT TOÁN & LẬP TRÌNH SCRATCH NÂNG CAO (Bài 10 - 16)
  cd6_giai_quyet_van_de: [
    {
      id: 512,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Trong thuật toán, khái niệm "Cấu trúc tuần tự" có nghĩa là các lệnh trong chương trình được thực hiện theo nguyên tắc nào?',
      options: [
        'Thực hiện lần lượt từng lệnh một theo thứ tự từ trên xuống dưới',
        'Thực hiện ngẫu nhiên bất kì lệnh nào không cần theo thứ tự',
        'Chỉ thực hiện lệnh đầu tiên rồi dừng lại không chạy tiếp',
        'Các lệnh chạy đồng thời cùng một lúc và kết thúc cùng lúc'
      ],
      correctIndex: 0,
      explanation: 'Cấu trúc tuần tự: các thao tác/câu lệnh được thực hiện lần lượt, tuần tự theo thứ tự đã sắp đặt từ trên xuống dưới.'
    },
    {
      id: 513,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Trong phần mềm Scratch, cấu trúc lặp nào sau đây giúp nhân vật lặp lại các hành động VÔ TẬN mà KHÔNG BAO GIỜ TỰ DỪNG LẠI?',
      options: [
        'Khối lệnh "liên tục" trong nhóm Điều khiển',
        'Khối lệnh "lặp lại 10 lần" trong nhóm Điều khiển',
        'Khối lệnh "lặp lại cho đến khi" trong nhóm Điều khiển',
        'Khối lệnh "nếu ... thì" trong nhóm Điều khiển'
      ],
      correctIndex: 0,
      explanation: 'Khối lệnh "liên tục" (Forever loop) chạy mãi mãi cho đến khi người dùng nháy nút màu đỏ để dừng chương trình.'
    },
    {
      id: 514,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Khối lệnh rẽ nhánh dạng đủ "nếu <điều kiện> thì <lệnh 1> nếu không thì <lệnh 2>" sẽ thực hiện <lệnh 2> trong trường hợp nào?',
      options: [
        'Khi điều kiện kiểm tra nhận kết quả là SAI (False)',
        'Khi điều kiện kiểm tra nhận kết quả là ĐÚNG (True)',
        'Khi chương trình vừa bắt đầu bấm vào lá cờ xanh',
        'Khi người chơi bấm vào nút màu đỏ trên sân khấu'
      ],
      correctIndex: 0,
      explanation: 'Dạng đủ: nếu điều kiện ĐÚNG thì làm lệnh 1; nếu điều kiện SAI (nếu không thì) sẽ làm lệnh 2.'
    },
    {
      id: 515,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Cho đoạn chương trình Scratch: Lệnh 1: "đặt a thành 5"; Lệnh 2: "thay đổi a một lượng 3". Sau khi chạy xong, giá trị của biến a bằng bao nhiêu?',
      options: [
        'Biến a nhận giá trị là 8',
        'Biến a nhận giá trị là 5',
        'Biến a nhận giá trị là 3',
        'Biến a nhận giá trị là 15'
      ],
      correctIndex: 0,
      explanation: 'Ban đầu a = 5; thay đổi một lượng 3 nghĩa là cộng thêm 3: a = 5 + 3 = 8.'
    },
    {
      id: 516,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Khi lập trình nhập dữ liệu từ bàn phím bằng khối lệnh "hỏi [Tên bạn là gì?] và đợi", câu trả lời của người dùng được lưu tự động vào đâu?',
      options: [
        'Lưu vào biến có sẵn mang tên "trả lời" (Answer)',
        'Lưu vào biến Điểm số do người dùng tự tạo trước đó',
        'Lưu thành một tệp văn bản mới trên màn hình nền máy tính',
        'Lưu trực tiếp vào nhóm lệnh Chuyển động của nhân vật'
      ],
      correctIndex: 0,
      explanation: 'Trong Scratch, nội dung nhập từ bàn phím sau lệnh "hỏi ... và đợi" luôn được lưu tự động vào khối biến "trả lời" (Answer).'
    },
    {
      id: 517,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Biểu thức Scratch tính chu vi của hình chữ nhật có hai cạnh là hai biến a và b được xây dựng bằng phép toán nào sau đây?',
      options: [
        'Phép toán nhân [ (a + b) * 2 ]',
        'Phép toán cộng [ a + b + 2 ]',
        'Phép toán nhân [ a * b * 2 ]',
        'Phép toán chia [ (a + b) / 2 ]'
      ],
      correctIndex: 0,
      explanation: 'Công thức toán học tính chu vi hình chữ nhật: C = (dài + rộng) * 2, tương ứng trong Scratch là khối phép nhân của (a + b) với 2.'
    },
    {
      id: 518,
      grade: 5,
      topicCode: 'cd6_giai_quyet_van_de',
      question: 'Trong trò chơi "Mèo bắt bóng", để kiểm tra xem chú mèo đã chạm vào quả bóng hay chưa, ta sử dụng khối cảm biến nào trong nhóm Cảm biến?',
      options: [
        'Khối lệnh "đang chạm [Beachball]?"',
        'Khối lệnh "khoảng cách tới con trỏ chuột"',
        'Khối lệnh "chuột được nhấn?"',
        'Khối lệnh "phím khoảng trắng được bấm?"'
      ],
      correctIndex: 0,
      explanation: 'Khối lệnh cảm biến va chạm hình lục giác "đang chạm [tên nhân vật]?" trả về Đúng khi 2 nhân vật tiếp xúc với nhau.'
    }
  ]
};

// Helper: Lấy danh sách câu hỏi bám sát chuẩn SGK theo khối lớp và chủ đề
export function getQuestionsByGradeAndTopic(grade: 3 | 4 | 5, topicKey: string): QuizQuestion[] {
  let bank: Record<string, QuizQuestion[]>;
  if (grade === 3) bank = QUESTIONS_GRADE_3;
  else if (grade === 4) bank = QUESTIONS_GRADE_4;
  else bank = QUESTIONS_GRADE_5;

  return bank[topicKey] || [];
}

// Danh mục 6 Chủ đề chuẩn SGK Tin học Kết Nối Tri Thức
export interface SGKTopicMeta {
  code: string;
  name: string;
  emoji: string;
  desc: string;
  lessonsByGrade: {
    3: string[];
    4: string[];
    5: string[];
  };
}

export const SGK_TOPICS_LIST: SGKTopicMeta[] = [
  {
    code: 'cd1_may_tinh_va_em',
    name: 'Chủ đề 1: Máy tính và em',
    emoji: '💻',
    desc: 'Khám phá phần cứng, thiết bị thông minh, an toàn điện và tư thế ngồi chuẩn',
    lessonsByGrade: {
      3: ['Bài 1: Thông tin và quyết định', 'Bài 2: Xử lí thông tin', 'Bài 3: Máy tính và em', 'Bài 4: Làm việc với máy tính', 'Bài 5: Sử dụng bàn phím'],
      4: ['Bài 1: Phần cứng và phần mềm máy tính', 'Bài 2: Gõ bàn phím đúng cách'],
      5: ['Bài 1: Em có thể làm gì với máy tính?']
    }
  },
  {
    code: 'cd2_mang_internet',
    name: 'Chủ đề 2: Mạng máy tính và Internet',
    emoji: '🌐',
    desc: 'Khám phá thế giới thông tin trên web, siêu liên kết và tác hại trang web xấu',
    lessonsByGrade: {
      3: ['Bài 6: Khám phá thông tin trên Internet'],
      4: ['Bài 3: Thông tin trên trang web'],
      5: ['Bài 2: Tìm kiếm thông tin trên website']
    }
  },
  {
    code: 'cd3_luu_tru_tim_kiem',
    name: 'Chủ đề 3: Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin',
    emoji: '📁',
    desc: 'Cây thư mục, tệp tin, máy tìm kiếm Google, từ khoá và thao tác Copy/Move',
    lessonsByGrade: {
      3: ['Bài 7: Sắp xếp để dễ tìm', 'Bài 8: Sơ đồ hình cây', 'Bài 9: Thực hành tệp và thư mục'],
      4: ['Bài 4: Tìm kiếm thông tin trên Internet', 'Bài 5: Thao tác với tệp và thư mục'],
      5: ['Bài 3: Tìm kiếm thông tin trong giải quyết vấn đề', 'Bài 4: Cây thư mục']
    }
  },
  {
    code: 'cd4_dao_duc_phap_luat',
    name: 'Chủ đề 4: Đạo đức, pháp luật và văn hoá trong môi trường số',
    emoji: '🛡️',
    desc: 'Bảo vệ dữ liệu cá nhân, bản quyền phần mềm, quyền tác giả và tính riêng tư',
    lessonsByGrade: {
      3: ['Bài 10: Bảo vệ thông tin khi dùng máy tính'],
      4: ['Bài 6: Sử dụng phần mềm khi được phép'],
      5: ['Bài 5: Bản quyền nội dung thông tin']
    }
  },
  {
    code: 'cd5_ung_dung_tin_hoc',
    name: 'Chủ đề 5: Ứng dụng tin học',
    emoji: '🎨',
    desc: 'Soạn thảo Word (Delete vs Backspace, bố trí ảnh), PowerPoint (Transitions), đồ hoạ Paint',
    lessonsByGrade: {
      3: ['Bài 11: Bài trình chiếu của em', 'Bài 12: Tìm hiểu thế giới tự nhiên', 'Bài 13: Luyện tập sử dụng chuột'],
      4: ['Bài 7: Tạo bài trình chiếu', 'Bài 8: Định dạng văn bản', 'Bài 9: Hiệu ứng chuyển trang', 'Bài 10: Phần mềm soạn thảo', 'Bài 11: Chỉnh sửa văn bản'],
      5: ['Bài 6: Định dạng kí tự & bố trí hình ảnh', 'Bài 7: Thực hành soạn thảo', 'Bài 8A: Làm quen phần mềm đồ hoạ', 'Bài 9A: Tạo sản phẩm số đồ hoạ']
    }
  },
  {
    code: 'cd6_giai_quyet_van_de',
    name: 'Chủ đề 6: Giải quyết vấn đề với sự trợ giúp của máy tính',
    emoji: '🤖',
    desc: 'Tư duy thuật toán, cấu trúc tuần tự, 3 dạng lệnh lặp, rẽ nhánh thiếu/đủ và biến nhớ Scratch',
    lessonsByGrade: {
      3: ['Bài 14: Em thực hiện công việc như thế nào?', 'Bài 15: Công việc theo điều kiện Nếu-Thì', 'Bài 16: Sự trợ giúp của máy tính'],
      4: ['Bài 13: Chơi với máy tính', 'Bài 14: Khám phá Scratch', 'Bài 15: Diễn tả ý tưởng', 'Bài 16: Chương trình của em'],
      5: ['Bài 10: Cấu trúc tuần tự', 'Bài 11: Cấu trúc lặp', 'Bài 12: Thực hành lệnh lặp', 'Bài 13: Cấu trúc rẽ nhánh', 'Bài 14: Biến trong chương trình', 'Bài 15: Biểu thức toán học', 'Bài 16: Từ kịch bản đến chương trình']
    }
  }
];
