import { Lesson } from '../types';

/**
 * 16 BÀI HỌC SGK TIN HỌC 3 - BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
 * Mỗi bài học có đúng 5 CÂU HỎI TRẮC NGHIỆM CHUYÊN SÂU (tổng cộng 80 câu hỏi).
 * Tất cả phương án có độ dài cân bằng tuyệt đối, loại bỏ mẹo chọn câu dài nhất.
 */
export const SGK_LESSONS_GRADE_3: Lesson[] = [
  // CHỦ ĐỀ 1: MÁY TÍNH VÀ EM
  {
    id: 1,
    level: 1,
    grade: 3,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 1: Thông tin và quyết định',
    desc: 'Nhận biết thông tin xung quanh và cách thông tin giúp con người ra quyết định hành động.',
    type: 'quiz',
    questions: [
      {
        id: 3011,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi nghe tiếng chuông đồng hồ báo thức reo vào buổi sáng, bạn Minh quyết định thức dậy đi học. Tiếng chuông reo đóng vai trò là gì?',
        options: [
          'Là thông tin giúp Minh ra quyết định',
          'Là quyết định hành động của bạn Minh',
          'Là kết quả cuối cùng sau khi thức dậy',
          'Là công cụ thay thế cho lời phụ huynh'
        ],
        correctIndex: 0,
        explanation: 'Tiếng chuông reo là thông tin tai nghe được, giúp não bộ của Minh đưa ra quyết định rời giường đi học.'
      },
      {
        id: 3012,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Bạn An nhìn thấy bầu trời có nhiều mây đen xám xịt và quyết định mang theo áo mưa. Đâu là thông tin trong tình huống trên?',
        options: [
          'Bầu trời xuất hiện nhiều mây đen xám',
          'Hành động quyết định mang theo áo mưa',
          'Quãng đường từ nhà đi đến trường học',
          'Thời gian lúc bạn An rời khỏi ngôi nhà'
        ],
        correctIndex: 0,
        explanation: 'Mây đen là thông tin quan sát được qua mắt; việc mang áo mưa là quyết định dựa trên thông tin đó.'
      },
      {
        id: 3013,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi đi trên đường gặp đèn tín hiệu giao thông chuyển sang màu đỏ, người tham gia giao thông cần phải làm gì?',
        options: [
          'Dừng xe lại trước vạch dừng quy định',
          'Tăng tốc thật nhanh để vượt qua đường',
          'Bấm còi xe liên tục để xin nhường lối',
          'Quan sát hai bên rồi tiếp tục di chuyển'
        ],
        correctIndex: 0,
        explanation: 'Đèn đỏ là thông tin chỉ dẫn giao thông, quyết định đúng quy định là phải dừng xe lại trước vạch dừng.'
      },
      {
        id: 3014,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Thầy giáo thể dục thổi hồi còi dài để báo hiệu kết thúc giờ chạy bền. Hồi còi của thầy đóng vai trò là gì?',
        options: [
          'Là thông tin để học sinh dừng chạy lại',
          'Là quyết định cá nhân của mỗi học sinh',
          'Là dụng cụ đo lường thời gian chạy bộ',
          'Là phần thưởng dành cho người về trước'
        ],
        correctIndex: 0,
        explanation: 'Tiếng còi dài là thông tin phát ra từ thầy giáo giúp học sinh đưa ra quyết định dừng cuộc chạy bền.'
      },
      {
        id: 3015,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Trong giờ ra chơi, nghe thấy ba hồi trống trường vang lên giục giã, các bạn học sinh nhanh chóng quyết định làm gì?',
        options: [
          'Nhanh chóng xếp hàng bước vào lớp học',
          'Tiếp tục chạy nhảy vui đùa ngoài sân',
          'Xin phép bác bảo vệ mở cổng đi về nhà',
          'Ngồi yên tại ghế đá dưới gốc cây bàng'
        ],
        correctIndex: 0,
        explanation: 'Ba hồi trống trường là thông tin báo hiệu hết giờ ra chơi, quyết định đúng là xếp hàng vào lớp học bài.'
      }
    ]
  },
  {
    id: 2,
    level: 1,
    grade: 3,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 2: Xử lí thông tin',
    desc: 'Khám phá quá trình con người thu nhận thông tin qua giác quan, não bộ xử lí và ra quyết định.',
    type: 'quiz',
    questions: [
      {
        id: 3021,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Bộ phận nào trên cơ thể con người thực hiện việc xử lí thông tin để đưa ra quyết định hành động?',
        options: [
          'Bộ não nằm bên trong đầu con người',
          'Đôi mắt nhìn thấy mọi vật xung quanh',
          'Đôi tai lắng nghe các loại âm thanh',
          'Đôi bàn tay thực hiện cầm nắm đồ vật'
        ],
        correctIndex: 0,
        explanation: 'Bộ não là cơ quan trung ương tiếp nhận dữ liệu từ các giác quan và xử lí thông tin để ra quyết định.'
      },
      {
        id: 3022,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Trong các dạng thông tin thường gặp, tiếng còi xe cấp cứu đang chạy trên đường thuộc dạng thông tin nào?',
        options: [
          'Dạng âm thanh mà tai nghe thấy được',
          'Dạng hình ảnh mà mắt nhìn thấy được',
          'Dạng văn bản in chữ trên trang giấy',
          'Dạng con số ghi lại trong cuốn sổ tay'
        ],
        correctIndex: 0,
        explanation: 'Ba dạng thông tin cơ bản gồm: chữ viết, hình ảnh và âm thanh. Tiếng còi xe là dạng âm thanh.'
      },
      {
        id: 3023,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Bức tranh phong cảnh vẽ cánh đồng lúa chín vàng treo trên tường phòng khách thuộc dạng thông tin nào sau đây?',
        options: [
          'Dạng hình ảnh mà mắt quan sát được',
          'Dạng âm thanh phát ra từ tự nhiên',
          'Dạng văn bản gồm các dòng chữ viết',
          'Dạng số liệu tính toán trong bài tập'
        ],
        correctIndex: 0,
        explanation: 'Bức tranh phong cảnh là thông tin dạng hình ảnh được thu nhận qua thị giác (mắt).'
      },
      {
        id: 3024,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi đọc một bài thơ hay trong sách giáo khoa Tiếng Việt 3, em đang tiếp nhận thông tin ở dạng nào?',
        options: [
          'Dạng văn bản in chữ trên trang sách',
          'Dạng âm thanh phát ra từ loa máy tính',
          'Dạng hình vẽ chuyển động trên màn ảnh',
          'Dạng mùi vị bốc lên từ bông hoa hồng'
        ],
        correctIndex: 0,
        explanation: 'Bài thơ được in bằng chữ viết trên giấy thuộc dạng thông tin văn bản.'
      },
      {
        id: 3025,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Trình tự các bước xử lí thông tin của con người diễn ra theo thứ tự logic nào sau đây?',
        options: [
          'Thu nhận thông tin, Xử lí, Ra quyết định',
          'Ra quyết định, Thu nhận, rồi mới Xử lí',
          'Xử lí thông tin trước, Thu nhận, Ra lệnh',
          'Hành động trước rồi mới tiếp nhận dữ liệu'
        ],
        correctIndex: 0,
        explanation: 'Quy trình xử lí thông tin: Giác quan thu nhận thông tin -> Não bộ xử lí -> Đưa ra quyết định hành động.'
      }
    ]
  },
  {
    id: 3,
    level: 1,
    grade: 3,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 3: Máy tính và em',
    desc: 'Nhận biết 4 bộ phận cơ bản của máy tính để bàn và các loại máy tính thông dụng khác.',
    type: 'quiz',
    questions: [
      {
        id: 3031,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Bộ phận nào của máy tính để bàn đóng vai trò chứa bộ xử lí trung tâm (bộ não của máy tính)?',
        options: [
          'Thân máy tính (hộp chữ nhật đứng)',
          'Màn hình hiển thị hình ảnh dữ liệu',
          'Bàn phím dùng để nhập các chữ cái',
          'Chuột máy tính dùng để điều khiển con trỏ'
        ],
        correctIndex: 0,
        explanation: 'Thân máy tính chứa CPU (bộ xử lí) - đóng vai trò bộ não điều khiển mọi hoạt động của máy tính.'
      },
      {
        id: 3032,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Thiết bị nào sau đây của máy tính để bàn có chức năng hiển thị kết quả làm việc ra cho mắt em quan sát?',
        options: [
          'Màn hình của máy tính để bàn',
          'Bàn phím gồm nhiều phím bấm',
          'Chuột máy tính có nút bấm trái',
          'Thân máy tính chứa nguồn điện'
        ],
        correctIndex: 0,
        explanation: 'Màn hình máy tính là thiết bị xuất hiển thị hình ảnh, chữ viết và kết quả làm việc.'
      },
      {
        id: 3033,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Máy tính xách tay (Laptop) có điểm gì tiện lợi nổi bật hơn so với máy tính để bàn?',
        options: [
          'Gọn nhẹ và dễ dàng mang theo đi lại',
          'Có kích thước màn hình lớn hơn rất nhiều',
          'Không bao giờ cần phải nạp lại năng lượng',
          'Không sử dụng các loại bàn phím để gõ'
        ],
        correctIndex: 0,
        explanation: 'Máy tính xách tay tích hợp sẵn màn hình, bàn phím, pin trong một khối gọn nhẹ, dễ mang theo.'
      },
      {
        id: 3034,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Trên máy tính bảng (Tablet), người dùng điều khiển máy tính bằng cách thao tác như thế nào?',
        options: [
          'Chạm ngón tay trực tiếp trên màn hình cảm ứng',
          'Cắm dây chuột và bàn phím rời vào máy tính',
          'Nói thật to vào loa của máy tính để ra lệnh',
          'Dùng bút chì gõ mạnh lên trên màn hình máy'
        ],
        correctIndex: 0,
        explanation: 'Máy tính bảng sử dụng màn hình cảm ứng, người dùng chạm hoặc vuốt ngón tay trực tiếp để điều khiển.'
      },
      {
        id: 3035,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Thiết bị nào sau đây của máy tính để bàn giúp em nhập thông tin dạng chữ và số vào máy tính?',
        options: [
          'Bàn phím gồm nhiều hàng phím chữ và số',
          'Màn hình hiển thị các hình ảnh đa sắc màu',
          'Loa phát ra âm thanh giai điệu bài hát hay',
          'Máy in in các trang văn bản ra mặt giấy trắng'
        ],
        correctIndex: 0,
        explanation: 'Bàn phím máy tính là thiết bị nhập dữ liệu chữ, số và các ký hiệu điều khiển cơ bản.'
      }
    ]
  },
  {
    id: 4,
    level: 1,
    grade: 3,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 4: Làm việc với máy tính',
    desc: 'Thực hành tư thế ngồi chuẩn khi dùng máy tính, khoảng cách an toàn và quy trình bật tắt máy.',
    type: 'quiz',
    questions: [
      {
        id: 3041,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khoảng cách an toàn và chuẩn khoa học từ mắt học sinh đến màn hình máy tính nên là bao nhiêu?',
        options: [
          'Khoảng từ 50 xăng-ti-mét đến 80 xăng-ti-mét',
          'Khoảng từ 10 xăng-ti-mét đến 20 xăng-ti-mét',
          'Khoảng từ 20 xăng-ti-mét đến 35 xăng-ti-mét',
          'Khoảng cách trên 150 xăng-ti-mét càng xa càng tốt'
        ],
        correctIndex: 0,
        explanation: 'Khoảng cách chuẩn từ mắt đến màn hình là 50 - 80 cm để bảo vệ thị lực và tránh mỏi mắt.'
      },
      {
        id: 3042,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi kết thúc buổi học thực hành Tin học, thao tác tắt máy tính đúng quy trình kỹ thuật là gì?',
        options: [
          'Vào nút Start rồi chọn Power và chọn Shut down',
          'Rút trực tiếp phích cắm điện của máy tính ra ngoài',
          'Nhấn giữ nút công tắc nguồn trên thân máy tính thật lâu',
          'Tắt ngay màn hình máy tính rồi lập tức đứng dậy ra về'
        ],
        correctIndex: 0,
        explanation: 'Quy trình tắt máy chuẩn trong hệ điều hành Windows là Start -> Power -> Shut down để hệ thống lưu dữ liệu an toàn.'
      },
      {
        id: 3043,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Tư thế ngồi học Tin học nào sau đây là đúng chuẩn để tránh bị vẹo cột sống và đau lưng?',
        options: [
          'Ngồi thẳng lưng, hai bàn chân đặt phẳng trên sàn nhà',
          'Cúi gập sát đầu vào sát mép bàn để nhìn cho rõ màn hình',
          'Tựa hẳn nghiêng người sang một bên tay vịn của chiếc ghế',
          'Vắt chéo hai chân lên trên ghế và ngồi sát vào bàn phím'
        ],
        correctIndex: 0,
        explanation: 'Ngồi thẳng lưng, mắt ngang tầm màn hình, hai chân chạm sàn giúp cơ thể thư giãn và bảo vệ cột sống.'
      },
      {
        id: 3044,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Khi sử dụng máy tính trong phòng thực hành, hành động nào sau đây bị NGHIÊM CẤM vì gây mất an toàn điện?',
        options: [
          'Chọc que sắt hoặc tay ướt vào các ổ cắm điện',
          'Bật công tắc nguồn trên thân máy theo hướng dẫn',
          'Điều chỉnh độ nghiêng màn hình vừa với tầm mắt',
          'Gõ phím nhẹ nhàng và cẩn thận bằng hai bàn tay'
        ],
        correctIndex: 0,
        explanation: 'Tuyệt đối không chọc vật kim loại hoặc sờ tay ướt vào ổ điện, dây dẫn vì nguy cơ bị điện giật chết người.'
      },
      {
        id: 3045,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Sau khoảng bao nhiêu phút ngồi học với máy tính, em nên đứng dậy vận động nhẹ và cho mắt nghỉ ngơi?',
        options: [
          'Sau khoảng ba mươi phút ngồi học tập trung',
          'Sau khoảng năm tiếng đồng hồ ngồi liên tục',
          'Sau khoảng tám tiếng đồng hồ không nghỉ giải lao',
          'Chỉ nghỉ khi nào mắt bị đau rát chảy nước mắt'
        ],
        correctIndex: 0,
        explanation: 'Quy tắc khoa học: Cứ sau 30 phút dùng máy tính, học sinh nên đứng dậy nhìn xa để mắt thư giãn và vận động cơ thể.'
      }
    ]
  },
  {
    id: 5,
    level: 1,
    grade: 3,
    topicCode: 'cd1_may_tinh_va_em',
    title: 'Bài 5: Sử dụng bàn phím',
    desc: 'Làm quen các hàng phím chính, hai phím có gờ định vị F và J trên hàng phím cơ sở.',
    type: 'quiz',
    questions: [
      {
        id: 3051,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Hai phím nào trên hàng phím cơ sở có gờ nhô lên để giúp em đặt đúng ngón tay mà không cần nhìn?',
        options: [
          'Phím F và phím J trên hàng cơ sở',
          'Phím A và phím L trên hàng cơ sở',
          'Phím G và phím H trên hàng cơ sở',
          'Phím S và phím K trên hàng cơ sở'
        ],
        correctIndex: 0,
        explanation: 'Phím F (ngón trỏ trái) và phím J (ngón trỏ phải) là 2 phím có gờ định vị trên hàng phím cơ sở.'
      },
      {
        id: 3052,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Phím dài nhất nằm ở hàng phím dưới cùng của bàn phím máy tính có tên gọi và chức năng là gì?',
        options: [
          'Phím cách (Spacebar) dùng để tạo dấu cách từ',
          'Phím Enter dùng để thực hiện việc xuống dòng',
          'Phím Shift dùng để chuyển sang gõ chữ hoa',
          'Phím Tab dùng để nhảy sang một vị trí cố định'
        ],
        correctIndex: 0,
        explanation: 'Phím dài nhất là phím cách (Spacebar), do hai ngón tay cái phụ trách để tạo khoảng cách giữa các từ.'
      },
      {
        id: 3053,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Hàng phím nào sau đây chứa các phím định vị cơ bản A, S, D, F, G, H, J, K, L trên bàn phím?',
        options: [
          'Hàng phím cơ sở nằm ở giữa bàn phím',
          'Hàng phím trên nằm phía trên hàng cơ sở',
          'Hàng phím dưới nằm phía dưới hàng cơ sở',
          'Hàng phím số nằm ở trên cùng của bàn phím'
        ],
        correctIndex: 0,
        explanation: 'Hàng phím cơ sở là hàng phím quan trọng nhất, nơi 8 ngón tay xuất phát và trở về khi gõ.'
      },
      {
        id: 3054,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Hai ngón tay nào của hai bàn tay chịu trách nhiệm bấm phím cách (Spacebar)?',
        options: [
          'Hai ngón tay cái của cả hai bàn tay',
          'Hai ngón tay trỏ đặt trên phím F và J',
          'Hai ngón tay út đặt ở hai mép ngoài cùng',
          'Hai ngón tay giữa của cả hai bàn tay'
        ],
        correctIndex: 0,
        explanation: 'Hai ngón tay cái luôn đặt nhẹ trên phím cách và luân phiên bấm phím này để cách các từ.'
      },
      {
        id: 3055,
        grade: 3,
        topicCode: 'cd1_may_tinh_va_em',
        question: 'Để đưa con trỏ soạn thảo xuống dòng mới bắt đầu một đoạn văn mới, em nhấn phím nào?',
        options: [
          'Nhấn phím Enter trên khu vực phím chính',
          'Nhấn phím Shift nằm ở hai bên bàn phím',
          'Nhấn phím Caps Lock để bật đèn hoa',
          'Nhấn phím Backspace để xóa ký tự bên trái'
        ],
        correctIndex: 0,
        explanation: 'Phím Enter có chức năng thực thi lệnh hoặc xuống dòng mới trong khi soạn thảo văn bản.'
      }
    ]
  },

  // CHỦ ĐỀ 2: MẠNG MÁY TÍNH VÀ INTERNET
  {
    id: 6,
    level: 2,
    grade: 3,
    topicCode: 'cd2_mang_internet',
    title: 'Bài 6: Khám phá thông tin trên Internet',
    desc: 'Lợi ích của mạng Internet trong học tập, giải trí và kỹ năng chọn lọc nội dung bổ ích cùng người lớn.',
    type: 'quiz',
    questions: [
      {
        id: 3061,
        grade: 3,
        topicCode: 'cd2_mang_internet',
        question: 'Mạng Internet mang lại lợi ích nổi bật nào sau đây cho học sinh tiểu học trong học tập?',
        options: [
          'Cung cấp kho kiến thức phong phú để học hỏi',
          'Giúp học sinh chơi điện tử suốt ngày không nghỉ',
          'Thay thế hoàn toàn sự chăm sóc của bố mẹ ở nhà',
          'Làm cho học sinh không cần phải đến trường học'
        ],
        correctIndex: 0,
        explanation: 'Internet là kho tàng thông tin khổng lồ hỗ trợ tra cứu bài học, xem phim khoa học và học tiếng Anh.'
      },
      {
        id: 3062,
        grade: 3,
        topicCode: 'cd2_mang_internet',
        question: 'Khi đang xem video học tập trên mạng mà xuất hiện hình ảnh bạo lực hoặc dọa dẫm, em nên làm gì?',
        options: [
          'Tắt ngay trang web đó và báo cho cha mẹ biết',
          'Tiếp tục nhấn xem hết toàn bộ video đáng sợ đó',
          'Tải đoạn phim bạo lực đó về máy tính cá nhân',
          'Gửi đường liên kết video đó cho bạn bè cùng xem'
        ],
        correctIndex: 0,
        explanation: 'Học sinh lớp 3 cần nhờ người lớn hỗ trợ, tắt ngay nội dung xấu và chia sẻ với cha mẹ hoặc thầy cô.'
      },
      {
        id: 3063,
        grade: 3,
        topicCode: 'cd2_mang_internet',
        question: 'Để sử dụng Internet an toàn và hiệu quả, học sinh lớp 3 nên tuân thủ nguyên tắc quan trọng nào?',
        options: [
          'Chỉ sử dụng Internet khi có sự đồng ý của người lớn',
          'Tự do mở bất kỳ trang web nào xuất hiện trên màn hình',
          'Sử dụng máy tính liên tục trong bóng tối nhiều giờ liền',
          'Kết bạn và trò chuyện bí mật với những người xa lạ'
        ],
        correctIndex: 0,
        explanation: 'Trẻ em tiểu học cần có sự giám sát, hướng dẫn của cha mẹ hoặc thầy cô khi truy cập mạng Internet.'
      },
      {
        id: 3064,
        grade: 3,
        topicCode: 'cd2_mang_internet',
        question: 'Kênh thông tin học tập nào sau đây trên Internet là phù hợp và bổ ích cho học sinh lớp 3?',
        options: [
          'Các kênh video bài giảng khoa học dành cho thiếu nhi',
          'Các trang mạng xã hội chứa nhiều lời nói tục tĩu',
          'Các trò chơi điện tử bạo lực chém giết kinh dị',
          'Các trang web quảng cáo cờ bạc tiền ảo trên mạng'
        ],
        correctIndex: 0,
        explanation: 'Video khoa học, bài học tiếng Anh thiếu nhi, chuyện cổ tích hoạt hình là nguồn học bổ ích cho học sinh lớp 3.'
      },
      {
        id: 3065,
        grade: 3,
        topicCode: 'cd2_mang_internet',
        question: 'Khi một người lạ trên mạng Internet hỏi thăm trường học và địa chỉ nhà em, em nên ứng xử thế nào?',
        options: [
          'Không trả lời và báo ngay cho bố mẹ hoặc thầy cô',
          'Nhắn tin gửi ngay địa chỉ số nhà cho người đó biết',
          'Hẹn gặp người lạ đó sau giờ tan học ở cổng trường',
          'Hỏi xin thêm quà bánh rồi mới đồng ý gửi địa chỉ nhà'
        ],
        correctIndex: 0,
        explanation: 'Tuyệt đối không tiết lộ thông tin cho người lạ trên mạng và phải báo ngay cho cha mẹ để đảm bảo an toàn.'
      }
    ]
  },

  // CHỦ ĐỀ 3: TỔ CHỨC LƯU TRỮ, TÌM KIẾM VÀ TRAO ĐỔI THÔNG TIN
  {
    id: 7,
    level: 3,
    grade: 3,
    topicCode: 'cd3_luu_tru_tim_kiem',
    title: 'Bài 7: Sắp xếp để dễ tìm',
    desc: 'Lợi ích của việc phân loại và sắp xếp đồ vật, tài liệu ngăn nắp theo quy luật khoa học.',
    type: 'quiz',
    questions: [
      {
        id: 3071,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Lợi ích lớn nhất của việc sắp xếp sách vở và đồ dùng học tập ngăn nắp, có trật tự là gì?',
        options: [
          'Giúp tìm kiếm đồ dùng nhanh chóng khi cần dùng',
          'Làm cho chiếc cặp sách trở nên nặng nề hơn trước',
          'Làm cho bạn bè không thể mượn được đồ dùng học tập',
          'Làm mất nhiều thời gian hơn trong mỗi buổi đến lớp'
        ],
        correctIndex: 0,
        explanation: 'Sắp xếp ngăn nắp theo nhóm giúp tiết kiệm thời gian và tìm thấy đồ dùng ngay lập tức khi cần.'
      },
      {
        id: 3072,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Trong thư viện trường học, các cuốn sách thường được thủ thư sắp xếp theo cách nào sau đây?',
        options: [
          'Phân loại theo từng chủ đề hoặc môn học cụ thể',
          'Xếp lộn xộn các loại sách lẫn lộn vào với nhau',
          'Để tất cả sách vào trong một góc phòng tối tăm',
          'Xếp sách hoàn toàn ngẫu nhiên không cần thứ tự'
        ],
        correctIndex: 0,
        explanation: 'Thư viện luôn phân loại sách theo môn học, khối lớp hoặc chủ đề để bạn đọc tra cứu thuận tiện.'
      },
      {
        id: 3073,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Bạn Hoa có nhiều bức ảnh chụp gia đình và ảnh chụp bạn bè trên lớp. Hoa nên sắp xếp ảnh thế nào?',
        options: [
          'Tạo hai nhóm riêng: Nhóm ảnh gia đình và Nhóm ảnh bạn bè',
          'Để tất cả ảnh lộn xộn chung một chỗ không chia nhóm',
          'Xóa bớt toàn bộ ảnh để không phải tốn công sắp xếp',
          'Chỉ lưu lại đúng một bức ảnh duy nhất trên thiết bị'
        ],
        correctIndex: 0,
        explanation: 'Phân loại ảnh thành hai nhóm riêng biệt giúp quản lý khoa học và dễ xem lại khi muốn.'
      },
      {
        id: 3074,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Trong tủ thuốc gia đình, các loại thuốc thường được phân loại theo tiêu chí nào để tránh uống nhầm?',
        options: [
          'Phân chia theo nhóm thuốc uống và thuốc bôi ngoài da',
          'Để lẫn lộn tất cả các vỉ thuốc chung vào một hộp',
          'Xếp thuốc theo màu sắc viên thuốc đỏ xanh vàng',
          'Xếp thuốc theo kích thước to nhỏ của hộp giấy ngoài'
        ],
        correctIndex: 0,
        explanation: 'Phân chia rõ ràng thuốc uống và thuốc bôi ngoài da giúp tránh nhầm lẫn nguy hiểm đến tính mạng.'
      },
      {
        id: 3075,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Việc sắp xếp đồ vật bừa bãi, không có trật tự trong phòng học sẽ dẫn đến hậu quả tiêu cực nào?',
        options: [
          'Mất rất nhiều thời gian bới tìm khi cần sử dụng',
          'Giúp căn phòng trông đẹp mắt và khoa học hơn trước',
          'Giúp học sinh rèn luyện được tính cẩn thận chu đáo',
          'Làm cho đồ vật không bao giờ bị hỏng hay thất lạc'
        ],
        correctIndex: 0,
        explanation: 'Đồ đạc bừa bãi khiến căn phòng bừa bộn và mất rất nhiều thời gian, công sức tìm kiếm khi cần.'
      }
    ]
  },
  {
    id: 8,
    level: 3,
    grade: 3,
    topicCode: 'cd3_luu_tru_tim_kiem',
    title: 'Bài 8: Sơ đồ hình cây. Tổ chức thông tin trong máy tính',
    desc: 'Hiểu cấu trúc sơ đồ hình cây, thư mục mẹ, thư mục con và tệp tin trong máy tính.',
    type: 'quiz',
    questions: [
      {
        id: 3081,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Trong sơ đồ hình cây để quản lý thông tin trong máy tính, thư mục mẹ tương ứng với bộ phận nào của cây?',
        options: [
          'Tương ứng với gốc hoặc cành lớn của cây',
          'Tương ứng với chiếc lá nhỏ nhất trên cây',
          'Tương ứng với giọt sương đọng trên chiếc lá',
          'Tương ứng với bông hoa đang nở trên cành'
        ],
        correctIndex: 0,
        explanation: 'Thư mục mẹ giống như gốc hoặc cành lớn, từ đó mọc ra các cành con (thư mục con) và lá (các tệp tin).'
      },
      {
        id: 3082,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Biểu tượng của một Thư mục (Folder) trong hệ điều hành máy tính thường có hình dạng và màu sắc gì?',
        options: [
          'Hình chiếc kẹp tài liệu có màu vàng quen thuộc',
          'Hình tờ giấy trắng có góc phía trên bị gấp lại',
          'Hình nốt nhạc màu xanh đang phát ra âm thanh',
          'Hình quả địa cầu đang xoay tròn trên màn hình'
        ],
        correctIndex: 0,
        explanation: 'Thư mục (Folder) có biểu tượng hình cặp/kẹp tài liệu màu vàng dùng để chứa các thư mục con và tệp.'
      },
      {
        id: 3083,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Trong một Thư mục trên máy tính, em có thể chứa được những đối tượng nào sau đây?',
        options: [
          'Chứa được các tệp tin và các thư mục con khác',
          'Chỉ chứa được đúng một bức tranh vẽ duy nhất',
          'Chỉ chứa được các phím bấm của bàn phím máy tính',
          'Không thể chứa được bất kỳ loại dữ liệu số nào'
        ],
        correctIndex: 0,
        explanation: 'Thư mục là nơi lưu trữ có thể chứa nhiều tệp tin và các thư mục con bên trong nó.'
      },
      {
        id: 3084,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Trong sơ đồ hình cây của máy tính, đối tượng nào đóng vai trò tương ứng như các chiếc lá ở đầu cành?',
        options: [
          'Các tệp tin chứa dữ liệu cụ thể trong máy',
          'Các ổ đĩa cứng C, D, E của hệ thống máy tính',
          'Các thư mục mẹ nằm ở vị trí cao nhất trên cây',
          'Màn hình và bàn phím nối với thân máy tính'
        ],
        correctIndex: 0,
        explanation: 'Các tệp tin (File) nằm ở các nhánh con cuối cùng, đóng vai trò như những chiếc lá trên cây.'
      },
      {
        id: 3085,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Một thư mục nằm bên trong một thư mục khác được gọi bằng thuật ngữ chính xác là gì?',
        options: [
          'Được gọi là Thư mục con của thư mục chứa nó',
          'Được gọi là Tệp tin văn bản của thư mục đó',
          'Được gọi là Ổ đĩa cứng gắn ngoài của máy tính',
          'Được gọi là Thiết bị nhập dữ liệu của máy tính'
        ],
        correctIndex: 0,
        explanation: 'Thư mục nằm bên trong thư mục khác được gọi là thư mục con (Subfolder).'
      }
    ]
  },
  {
    id: 9,
    level: 3,
    grade: 3,
    topicCode: 'cd3_luu_tru_tim_kiem',
    title: 'Bài 9: Thực hành với tệp và thư mục trong máy tính',
    desc: 'Quan sát cấu trúc thư mục, nhận biết tệp văn bản, tệp hình ảnh và tệp âm thanh.',
    type: 'quiz',
    questions: [
      {
        id: 3091,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Để mở xem nội dung bên trong một thư mục trên màn hình máy tính, em sử dụng thao tác chuột nào?',
        options: [
          'Nháy đúp chuột trái vào biểu tượng thư mục đó',
          'Nhấn giữ chuột phải và kéo thư mục đi chỗ khác',
          'Di chuyển con trỏ chuột lướt qua biểu tượng thư mục',
          'Chỉ nháy một lần duy nhất vào nút cuộn giữa của chuột'
        ],
        correctIndex: 0,
        explanation: 'Thao tác mở thư mục chuẩn là nháy đúp chuột (nháy 2 lần nhanh liên tiếp nút chuột trái).'
      },
      {
        id: 3092,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Một tệp bài tập vẽ tranh bằng phần mềm Paint thường thuộc loại tệp nào sau đây?',
        options: [
          'Tệp hình ảnh lưu trữ bức tranh em vừa vẽ',
          'Tệp âm thanh ghi lại tiếng hát của học sinh',
          'Tệp văn bản chứa hàng nghìn trang chữ viết',
          'Tệp phim hoạt hình chiếu trên rạp chiếu bóng'
        ],
        correctIndex: 0,
        explanation: 'Phần mềm Paint tạo ra các tệp hình ảnh (đuôi .png, .jpg, .bmp) hiển thị hình vẽ của em.'
      },
      {
        id: 3093,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Khi đặt tên cho một thư mục học tập mới, cách đặt tên nào sau đây là khoa học và dễ nhớ nhất?',
        options: [
          'Đặt tên rõ ràng như: "Bai_tap_Tin_hoc_3"',
          'Đặt tên bằng một dấu chấm hoặc để trống tên',
          'Đặt tên bằng các ký tự lạ khó đọc như "???@@@"',
          'Đặt tên trùng lặp với tên của hệ điều hành máy tính'
        ],
        correctIndex: 0,
        explanation: 'Tên thư mục nên ngắn gọn, có ý nghĩa thể hiện rõ nội dung bên trong như "Bai_tap_Tin_hoc_3".'
      },
      {
        id: 3094,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Một bài hát thiếu nhi được thu âm và lưu vào máy tính thuộc dạng tệp nào sau đây?',
        options: [
          'Tệp âm thanh phát ra giai điệu khi mở lên',
          'Tệp hình ảnh vẽ phong cảnh quê hương đất nước',
          'Tệp văn bản chứa các dòng chữ gõ bằng bàn phím',
          'Tệp chương trình điều khiển toàn bộ hệ thống máy'
        ],
        correctIndex: 0,
        explanation: 'Bài hát được lưu trữ dưới dạng tệp âm thanh (Audio file như .mp3, .wav).'
      },
      {
        id: 3095,
        grade: 3,
        topicCode: 'cd3_luu_tru_tim_kiem',
        question: 'Để đóng một cửa sổ thư mục đang mở trên màn hình máy tính, em nháy chuột vào nút nào ở góc trên bên phải?',
        options: [
          'Nút có dấu nhân màu đỏ (Close) ở góc trên',
          'Nút có dấu gạch ngang (Minimize) ở góc trên',
          'Nút có hình ô vuông (Maximize) ở góc trên',
          'Nút có hình kính lúp (Search) ở thanh tìm kiếm'
        ],
        correctIndex: 0,
        explanation: 'Nút dấu nhân (X) ở góc trên cùng bên phải cửa sổ dùng để đóng cửa sổ thư mục hoặc ứng dụng.'
      }
    ]
  },

  // CHỦ ĐỀ 4: ĐẠO ĐỨC, PHÁP LUẬT VÀ VĂN HOÁ TRONG MÔI TRƯỜNG SỐ
  {
    id: 10,
    level: 4,
    grade: 3,
    topicCode: 'cd4_dao_duc_phap_luat',
    title: 'Bài 10: Bảo vệ thông tin khi dùng máy tính',
    desc: 'Nhận diện thông tin bí mật cá nhân và nguyên tắc không chia sẻ cho người lạ trên không gian mạng.',
    type: 'quiz',
    questions: [
      {
        id: 3101,
        grade: 3,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Thông tin nào sau đây thuộc về thông tin bí mật cá nhân mà em TUYỆT ĐỐI KHÔNG được tiết lộ cho người lạ?',
        options: [
          'Mật khẩu đăng nhập tài khoản học tập và số nhà của em',
          'Tên một bài hát thiếu nhi mà em yêu thích nghe',
          'Màu sắc của chiếc áo đồng phục trường em đang mặc',
          'Tên loài vật nuôi đáng yêu nuôi trong gia đình em'
        ],
        correctIndex: 0,
        explanation: 'Mật khẩu, địa chỉ nhà, số điện thoại là thông tin cá nhân quan trọng cần bảo mật tuyệt đối.'
      },
      {
        id: 3102,
        grade: 3,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Khi sử dụng máy tính chung trong phòng thực hành của nhà trường, em cần lưu ý điều gì trước khi ra về?',
        options: [
          'Đăng xuất khỏi tài khoản cá nhân của em trên máy tính',
          'Để nguyên tài khoản đang đăng nhập cho bạn khác dùng',
          'Đổi mật khẩu máy tính của trường thành mật khẩu riêng',
          'Lưu mật khẩu cá nhân lên trên màn hình nền máy tính'
        ],
        correctIndex: 0,
        explanation: 'Cần đăng xuất tài khoản trên máy tính công cộng để tránh người khác mạo danh hoặc xem trộm thông tin.'
      },
      {
        id: 3103,
        grade: 3,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Nếu có một tài khoản lạ trên mạng nhắn tin hứa tặng quà miễn phí và đòi em gửi địa chỉ nhà, em sẽ làm gì?',
        options: [
          'Từ chối ngay lập tức và kể lại sự việc cho bố mẹ biết',
          'Nhắn tin gửi ngay số nhà và số điện thoại của bố mẹ',
          'Rủ thêm các bạn cùng lớp gửi thông tin để cùng nhận quà',
          'Hẹn gặp người lạ đó ở công viên để nhận món quà tặng'
        ],
        correctIndex: 0,
        explanation: 'Đây là chiêu trò lừa đảo nguy hiểm, học sinh phải từ chối và báo ngay cho cha mẹ để được bảo vệ.'
      },
      {
        id: 3104,
        grade: 3,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Một mật khẩu bảo vệ tài khoản tốt và an toàn cho học sinh tiểu học nên có đặc điểm nào sau đây?',
        options: [
          'Gồm cả chữ cái, chữ số và không dễ đoán như ngày sinh',
          'Chỉ gồm một chữ số 1 duy nhất cho dễ nhớ khỏi quên',
          'Lấy đúng họ và tên của mình viết hoa toàn bộ chữ',
          'Chia sẻ công khai mật khẩu cho tất cả bạn bè trong lớp'
        ],
        correctIndex: 0,
        explanation: 'Mật khẩu an toàn nên kết hợp chữ cái và con số, tránh lấy thông tin dễ đoán như ngày sinh hay tên bản thân.'
      },
      {
        id: 3105,
        grade: 3,
        topicCode: 'cd4_dao_duc_phap_luat',
        question: 'Tại sao em không nên cho bạn bè mượn tài khoản học tập cá nhân của mình để sử dụng?',
        options: [
          'Để bảo vệ kết quả học tập và tránh bị làm xáo trộn bài',
          'Để bạn bè cảm thấy sợ hãi và nể phục bản thân mình',
          'Vì máy tính sẽ tự động bốc khói khi có người khác gõ',
          'Vì bàn phím máy tính chỉ nhận diện dấu vân tay của một người'
        ],
        correctIndex: 0,
        explanation: 'Mỗi học sinh có tài khoản riêng để lưu điểm số và bài tập; dùng chung dễ làm mất bài và lộ thông tin riêng.'
      }
    ]
  },

  // CHỦ ĐỀ 5: ỨNG DỤNG TIN HỌC
  {
    id: 11,
    level: 5,
    grade: 3,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 11: Bài trình chiếu của em',
    desc: 'Làm quen phần mềm trình chiếu PowerPoint, tạo trang chiếu đầu tiên và thêm tiêu đề sinh động.',
    type: 'quiz',
    questions: [
      {
        id: 3111,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Phần mềm nào sau đây thường được sử dụng để tạo các bài trình chiếu giới thiệu trước lớp?',
        options: [
          'Phần mềm trình chiếu PowerPoint sinh động',
          'Phần mềm máy tính cầm tay Calculator',
          'Phần mềm gõ dấu tiếng Việt Unikey',
          'Phần mềm nghe nhạc và xem phim Windows Media'
        ],
        correctIndex: 0,
        explanation: 'PowerPoint là phần mềm trình chiếu thông dụng cho phép tạo các trang chiếu gồm chữ, ảnh, âm thanh.'
      },
      {
        id: 3112,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Trang chiếu đầu tiên trong một bài trình chiếu thường chứa nội dung thông tin quan trọng nào?',
        options: [
          'Tiêu đề bài trình chiếu và tên người trình bày',
          'Lời chào tạm biệt và cảm ơn khán giả lắng nghe',
          'Toàn bộ danh sách các câu hỏi ôn tập cuối kỳ',
          'Một bức tranh ngẫu nhiên không có dòng chữ nào'
        ],
        correctIndex: 0,
        explanation: 'Trang chiếu mở đầu (Title Slide) luôn ghi rõ Tiêu đề bài thuyết trình và họ tên học sinh thực hiện.'
      },
      {
        id: 3113,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để bắt đầu trình chiếu toàn màn hình bài thuyết trình từ trang đầu, em có thể nhấn phím nào trên bàn phím?',
        options: [
          'Nhấn phím chức năng F5 trên hàng phím trên cùng',
          'Nhấn phím Enter trên hàng phím cơ sở của bàn phím',
          'Nhấn phím Spacebar dài nhất ở hàng phím dưới cùng',
          'Nhấn phím Esc ở góc bên trái trên cùng bàn phím'
        ],
        correctIndex: 0,
        explanation: 'Phím F5 là phím tắt tiêu chuẩn để bắt đầu trình chiếu toàn màn hình từ trang đầu tiên.'
      },
      {
        id: 3114,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để thoát khỏi chế độ trình chiếu toàn màn hình quay về màn hình soạn thảo, em nhấn phím nào?',
        options: [
          'Nhấn phím Esc ở góc trên cùng bên trái bàn phím',
          'Nhấn phím Enter ở khu vực hàng phím cơ sở bàn phím',
          'Nhấn phím cách Spacebar ở hàng phím dưới cùng bàn phím',
          'Nhấn phím Shift nằm ở hai bên của bàn phím máy tính'
        ],
        correctIndex: 0,
        explanation: 'Phím Esc (Escape) ở góc trên cùng bên trái bàn phím dùng để thoát khỏi chế độ trình chiếu toàn màn hình.'
      },
      {
        id: 3115,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi tạo bài trình chiếu giới thiệu bản thân, em nên chọn màu chữ như thế nào so với màu nền?',
        options: [
          'Màu chữ tương phản rõ rệt với màu nền của trang',
          'Màu chữ trùng khít hoàn toàn với màu sắc của nền',
          'Dùng màu chữ xám mờ trên nền màu xám tro đục',
          'Chữ màu vàng nhạt viết trên nền màu trắng tinh khôi'
        ],
        correctIndex: 0,
        explanation: 'Màu chữ tương phản nổi bật so với màu nền (ví dụ chữ đậm trên nền sáng) giúp cả lớp nhìn rõ chữ.'
      }
    ]
  },
  {
    id: 12,
    level: 5,
    grade: 3,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 12: Tìm hiểu về thế giới tự nhiên',
    desc: 'Ứng dụng phần mềm mô phỏng khám phá các hành tinh trong hệ mặt trời và đời sống sinh vật.',
    type: 'quiz',
    questions: [
      {
        id: 3121,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Phần mềm mô phỏng thế giới tự nhiên giúp học sinh tìm hiểu điều gì một cách trực quan?',
        options: [
          'Quan sát chuyển động của Trái Đất và Mặt Trời',
          'Chơi trò chơi điện tử bắn súng trực tuyến trên mạng',
          'Sửa chữa các lỗi phần cứng bên trong máy tính',
          'Tự động làm thay bài tập toán về nhà cho học sinh'
        ],
        correctIndex: 0,
        explanation: 'Phần mềm mô phỏng giúp học sinh quan sát chuyển động của Trái Đất, Mặt Trăng, hành tinh sinh động.'
      },
      {
        id: 3122,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi sử dụng phần mềm học tập mô phỏng, thao tác nhấp chuột vào một hành tinh có tác dụng gì?',
        options: [
          'Hiển thị thông tin chi tiết và hình ảnh của hành tinh đó',
          'Lập tức tắt nguồn máy tính của học sinh ngay lập tức',
          'Xóa toàn bộ các tệp tin bài học đã lưu trong ổ đĩa máy',
          'Làm cho màn hình máy tính bị đổi màu sắc hoàn toàn'
        ],
        correctIndex: 0,
        explanation: 'Nhấp chuột vào hành tinh sẽ mở ra bảng thông tin chi tiết về kích thước, quỹ đạo và đặc điểm của hành tinh.'
      },
      {
        id: 3123,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Lợi ích của việc học qua phần mềm mô phỏng so với việc chỉ đọc chữ trên sách in là gì?',
        options: [
          'Hình ảnh chuyển động sinh động giúp hiểu bài nhanh hơn',
          'Giúp học sinh không cần phải suy nghĩ hay làm bài tập',
          'Làm cho học sinh không cần phải nghe cô giáo giảng bài',
          'Tự động ghi điểm mười cho học sinh vào sổ học bạ'
        ],
        correctIndex: 0,
        explanation: 'Mô phỏng hình ảnh 3D chuyển động giúp học sinh dễ hình dung hiện tượng tự nhiên và ghi nhớ lâu hơn.'
      },
      {
        id: 3124,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Trong phần mềm mô phỏng hệ mặt trời, hành tinh nào sau đây là nơi con người và muôn loài đang sinh sống?',
        options: [
          'Trái Đất hành tinh xanh trong hệ mặt trời',
          'Sao Hỏa hành tinh đỏ có nhiều bụi đất cát',
          'Sao Kim hành tinh sáng chói trên bầu trời đêm',
          'Sao Mộc hành tinh có kích thước khổng lồ nhất'
        ],
        correctIndex: 0,
        explanation: 'Trái Đất là hành tinh thứ ba tính từ Mặt Trời, là cái nôi nuôi dưỡng sự sống của muôn loài.'
      },
      {
        id: 3125,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để quan sát Trái Đất quay từ nhiều góc nhìn khác nhau trong phần mềm 3D, em thực hiện thao tác nào?',
        options: [
          'Nhấn giữ chuột trái và kéo xoay quả địa cầu',
          'Gõ liên tiếp các phím chữ cái trên bàn phím',
          'Tắt nguồn màn hình máy tính rồi bật lại ngay',
          'Rút dây chuột máy tính ra khỏi thân máy tính'
        ],
        correctIndex: 0,
        explanation: 'Nhấn giữ chuột trái và kéo di chuyển (drag) cho phép xoay quả địa cầu 3D để quan sát các châu lục.'
      }
    ]
  },
  {
    id: 13,
    level: 5,
    grade: 3,
    topicCode: 'cd5_ung_dung_tin_hoc',
    title: 'Bài 13: Luyện tập sử dụng chuột',
    desc: 'Thành thạo 5 thao tác chuột: di chuyển, nháy chuột trái, nháy đúp chuột, nháy chuột phải và kéo thả.',
    type: 'quiz',
    questions: [
      {
        id: 3131,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Thao tác nhấn nút chuột trái một lần rồi thả tay ra ngay lập tức được gọi là thao tác gì?',
        options: [
          'Thao tác nháy chuột (nháy chuột trái)',
          'Thao tác nháy đúp chuột hai lần liên tiếp',
          'Thao tác nháy chuột phải để mở menu',
          'Thao tác kéo thả chuột để di chuyển vật thể'
        ],
        correctIndex: 0,
        explanation: 'Nhấn nút chuột trái 1 lần rồi thả ngón tay ra gọi là nháy chuột (dùng để chọn đối tượng).'
      },
      {
        id: 3132,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Để di chuyển một biểu tượng tệp từ vị trí này sang vị trí khác trên màn hình, em sử dụng thao tác nào?',
        options: [
          'Thao tác kéo thả chuột (nhấn giữ chuột trái và kéo)',
          'Thao tác nháy chuột phải liên tiếp nhiều lần',
          'Thao tác lăn bánh lăn ở giữa thân chuột lên xuống',
          'Thao tác nhấc bổng cả con chuột lên khỏi mặt bàn'
        ],
        correctIndex: 0,
        explanation: 'Kéo thả chuột (Drag and drop) là nhấn giữ chuột trái, di chuyển con trỏ tới đích rồi thả tay.'
      },
      {
        id: 3133,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Khi em nháy nút chuột phải vào một đối tượng trên màn hình, điều gì sẽ xuất hiện?',
        options: [
          'Một bảng thực đơn lệnh (menu) thao tác nhanh',
          'Máy tính sẽ tự động tắt nguồn ngay lập tức',
          'Màn hình máy tính bị thu nhỏ lại góc dưới',
          'Tất cả các chữ cái trên bàn phím bị vô hiệu hóa'
        ],
        correctIndex: 0,
        explanation: 'Nháy chuột phải mở bảng thực đơn ngữ cảnh (Context menu) liệt kê các lệnh như Open, Copy, Delete...'
      },
      {
        id: 3134,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Thao tác nháy nhanh nút chuột trái hai lần liên tiếp được gọi bằng tên chuẩn là gì?',
        options: [
          'Thao tác nháy đúp chuột (Double click)',
          'Thao tác kéo thả chuột trên mặt bàn phẳng',
          'Thao tác nháy chuột phải mở bảng chọn lệnh',
          'Thao tác cuộn bánh lăn chuột ở chính giữa'
        ],
        correctIndex: 0,
        explanation: 'Nháy nút chuột trái 2 lần thật nhanh gọi là nháy đúp (Double click), dùng để mở tệp hoặc phần mềm.'
      },
      {
        id: 3135,
        grade: 3,
        topicCode: 'cd5_ung_dung_tin_hoc',
        question: 'Ngón tay trỏ của bàn tay phải khi cầm chuột đúng cách sẽ đặt lên vị trí nào của con chuột?',
        options: [
          'Đặt lên nút chuột trái của chuột máy tính',
          'Đặt lên nút chuột phải của chuột máy tính',
          'Đặt lên bánh lăn chuột ở chính giữa thân chuột',
          'Đặt tì sát xuống mặt bàn di chuột phía dưới'
        ],
        correctIndex: 0,
        explanation: 'Cách cầm chuột chuẩn: ngón trỏ đặt lên nút chuột trái, ngón giữa đặt lên nút chuột phải.'
      }
    ]
  },

  // CHỦ ĐỀ 6: GIẢI QUYẾT VẤN ĐỀ VỚI SỰ TRỢ GIÚP CỦA MÁY TÍNH
  {
    id: 14,
    level: 6,
    grade: 3,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 14: Em thực hiện công việc như thế nào?',
    desc: 'Chia nhỏ công việc thành các bước tuần tự rõ ràng theo trình tự logic trước sau.',
    type: 'quiz',
    questions: [
      {
        id: 3141,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Quy trình thực hiện công việc "Rửa tay bằng xà phòng" gồm các bước theo thứ tự hợp lí nào sau đây?',
        options: [
          'Làm ướt tay, xoa xà phòng, rửa sạch với nước, lau khô',
          'Lau khô tay bằng khăn, xoa xà phòng rồi mới làm ướt tay',
          'Xoa xà phòng vào tay khô, lau khăn rồi mới rửa với nước',
          'Rửa sạch với nước trước rồi mới lấy xà phòng xoa lên tay'
        ],
        correctIndex: 0,
        explanation: 'Các bước thực hiện công việc phải tuân theo thứ tự tuần tự logic: làm ướt -> tạo bọt xà phòng -> rửa sạch -> lau khô.'
      },
      {
        id: 3142,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Để chuẩn bị sách vở cho ngày đi học ngày mai, bước đầu tiên em cần phải làm là gì?',
        options: [
          'Xem thời khóa biểu các môn học của ngày mai',
          'Cho toàn bộ tất cả sách vở ở nhà vào trong cặp sách',
          'Mặc quần áo đồng phục đi học trước khi đi ngủ',
          'Đi ngủ ngay mà không cần xem lại đồ dùng học tập'
        ],
        correctIndex: 0,
        explanation: 'Bước đầu tiên luôn là xem thời khóa biểu để biết ngày mai học những môn gì, sau đó mới soạn sách vở tương ứng.'
      },
      {
        id: 3143,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Việc chia một công việc lớn thành các bước nhỏ tuần tự mang lại lợi ích gì cho học sinh?',
        options: [
          'Giúp công việc dễ thực hiện và tránh bị bỏ sót bước',
          'Làm cho công việc trở nên rắc rối và khó khăn hơn nhiều',
          'Làm tốn nhiều thời gian hơn so với làm tự do tùy ý',
          'Làm cho máy tính không thể hiểu được các bước làm'
        ],
        correctIndex: 0,
        explanation: 'Chia nhỏ thành các bước rõ ràng giúp chúng ta làm việc có phương pháp, hiệu quả và không bị quên bước.'
      },
      {
        id: 3144,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Thứ tự các bước đúng khi em muốn vẽ một bức tranh bằng phần mềm đồ họa Paint là gì?',
        options: [
          'Mở phần mềm Paint, vẽ hình nét viền, tô màu, lưu tệp',
          'Lưu tệp trước khi vẽ, mở Paint, tô màu rồi mới vẽ nét',
          'Tô màu vào khoảng trống trước rồi mới mở phần mềm Paint',
          'Đóng phần mềm Paint lại rồi mới bắt đầu suy nghĩ hình vẽ'
        ],
        correctIndex: 0,
        explanation: 'Trình tự vẽ tranh: Khởi động Paint -> phác nét hình cơ bản -> tô màu hoàn thiện -> lưu lại vào tệp.'
      },
      {
        id: 3145,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong quy trình "Đánh răng buổi tối", bước súc miệng sạch bằng nước sạch được thực hiện khi nào?',
        options: [
          'Được thực hiện sau khi đã chải sạch các mặt răng',
          'Được thực hiện trước khi lấy kem đánh răng ra bàn chải',
          'Được thực hiện trong khi đang ngủ say trên giường',
          'Được thực hiện trước khi đi tắm vào buổi chiều'
        ],
        correctIndex: 0,
        explanation: 'Súc miệng sạch bằng nước được thực hiện sau khi đã chải sạch kỹ các mặt của hàm răng.'
      }
    ]
  },
  {
    id: 15,
    level: 6,
    grade: 3,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 15: Công việc được thực hiện theo điều kiện',
    desc: 'Làm quen với cấu trúc điều kiện dạng "Nếu ... thì ..." trong đời sống và lập luận hàng ngày.',
    type: 'quiz',
    questions: [
      {
        id: 3151,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong câu: "Nếu trời mưa thì em mang theo áo mưa", phần điều kiện cần kiểm tra là phần nào?',
        options: [
          'Trời có mưa hay không có mưa',
          'Em mang theo chiếc áo mưa đi học',
          'Con đường từ nhà đi đến trường học',
          'Chiếc cặp sách em mang trên đôi vai'
        ],
        correctIndex: 0,
        explanation: 'Trong cấu trúc "Nếu [Điều kiện] thì [Hành động]", điều kiện là "trời mưa" và hành động là "mang áo mưa".'
      },
      {
        id: 3152,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Câu nào sau đây thể hiện đúng cấu trúc thực hiện công việc phụ thuộc vào điều kiện?',
        options: [
          'Nếu ngày mai là Chủ nhật thì em được đi chơi công viên',
          'Mỗi buổi sáng em thức dậy và đánh răng rửa mặt sạch sẽ',
          'Mặt trời luôn luôn mọc ở hướng Đông và lặn ở hướng Tây',
          'Mỗi tuần có bảy ngày và mỗi ngày có hai mươi tư giờ'
        ],
        correctIndex: 0,
        explanation: 'Câu "Nếu ngày mai là Chủ nhật thì..." có từ khóa "Nếu... thì..." thể hiện hành động chỉ xảy ra khi điều kiện thỏa mãn.'
      },
      {
        id: 3153,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi đèn tín hiệu giao thông chuyển sang màu xanh, hành động đúng theo quy tắc là gì?',
        options: [
          'Người tham gia giao thông được phép di chuyển đi tiếp',
          'Mọi phương tiện giao thông phải lập tức dừng xe lại',
          'Tất cả các phương tiện phải bấm còi báo động liên tục',
          'Người lái xe phải quay đầu xe chạy ngược chiều lại'
        ],
        correctIndex: 0,
        explanation: 'Điều kiện đèn xanh cho phép các phương tiện tiếp tục di chuyển qua ngã tư an toàn.'
      },
      {
        id: 3154,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Trong câu: "Nếu đạt điểm 10 môn Tin học thì em được bố khen thưởng", hành động khen thưởng xảy ra khi nào?',
        options: [
          'Chỉ xảy ra khi em thực sự đạt được điểm 10',
          'Xảy ra ngay cả khi em không làm bài kiểm tra',
          'Xảy ra khi em đi học muộn vào buổi sáng',
          'Không bao giờ xảy ra trong bất kỳ tình huống nào'
        ],
        correctIndex: 0,
        explanation: 'Hành động khen thưởng chỉ diễn ra khi điều kiện (đạt điểm 10 môn Tin học) trở thành sự thật.'
      },
      {
        id: 3155,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Cấu trúc điều kiện "Nếu ... thì ..." giúp con người và máy tính đưa ra quyết định dựa trên điều gì?',
        options: [
          'Dựa trên việc kiểm tra một điều kiện Đúng hay Sai',
          'Dựa trên sự may rủi ngẫu nhiên không có quy luật',
          'Dựa trên cảm xúc vui buồn nhất thời của con người',
          'Dựa trên độ sáng tối của màn hình hiển thị máy tính'
        ],
        correctIndex: 0,
        explanation: 'Cấu trúc điều kiện luôn kiểm tra điều kiện: Nếu Đúng (True) thì thực hiện hành động đã định.'
      }
    ]
  },
  {
    id: 16,
    level: 6,
    grade: 3,
    topicCode: 'cd6_giai_quyet_van_de',
    title: 'Bài 16: Công việc của em và sự trợ giúp của máy tính',
    desc: 'Nhận biết các công việc máy tính giúp con người thực hiện nhanh chóng, chính xác và hiệu quả.',
    type: 'quiz',
    questions: [
      {
        id: 3161,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Máy tính có thể giúp học sinh tiểu học giải quyết tốt nhất công việc nào sau đây trong học tập?',
        options: [
          'Tính toán số học nhanh và tìm kiếm thông tin khoa học',
          'Tự động ăn cơm thay cho học sinh vào mỗi bữa ăn',
          'Tự động tập thể dục buổi sáng thay cho học sinh',
          'Tự động đi ngủ vào buổi tối thay cho học sinh'
        ],
        correctIndex: 0,
        explanation: 'Máy tính là công cụ xử lí thông tin mạnh mẽ, giúp tính toán cực nhanh, lưu trữ và tìm kiếm tài liệu học tập.'
      },
      {
        id: 3162,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Bác sĩ trong bệnh viện thường sử dụng máy tính vào công việc quan trọng nào sau đây?',
        options: [
          'Lưu trữ hồ sơ bệnh án và phân tích kết quả chụp chiếu',
          'Làm công việc quét dọn vệ sinh tất cả các phòng bệnh',
          'Nấu các bữa ăn dinh dưỡng hàng ngày cho người bệnh',
          'Tự động sản xuất ra các viên thuốc uống trực tiếp'
        ],
        correctIndex: 0,
        explanation: 'Máy tính hỗ trợ bác sĩ quản lý hồ sơ khám bệnh, hiển thị kết quả siêu âm, chụp X-quang chuẩn xác.'
      },
      {
        id: 3163,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Dù máy tính rất thông minh và làm việc nhanh, điều gì con người làm được mà máy tính KHÔNG THỂ có?',
        options: [
          'Tình cảm yêu thương, cảm xúc và khả năng sáng tạo',
          'Khả năng tính toán các phép cộng trừ với số lớn',
          'Khả năng lưu trữ hàng triệu cuốn sách vào bộ nhớ',
          'Khả năng làm việc liên tục cả ngày mà không bị mệt'
        ],
        correctIndex: 0,
        explanation: 'Máy tính chỉ làm theo lệnh con người cài đặt; chỉ con người mới có trái tim, cảm xúc, đạo đức và sự sáng tạo độc đáo.'
      },
      {
        id: 3164,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Cô thủ thư trong thư viện trường học sử dụng máy tính để giúp ích gì cho công tác quản lý?',
        options: [
          'Quản lý danh mục sách và theo dõi việc mượn trả sách',
          'Tự động đọc to toàn bộ các cuốn sách trong thư viện',
          'Làm công việc lau chùi quét dọn bụi bẩn trên giá sách',
          'Tự động ngăn cản không cho học sinh bước vào thư viện'
        ],
        correctIndex: 0,
        explanation: 'Máy tính giúp thủ thư tra cứu vị trí sách và lưu thông tin học sinh mượn trả sách chính xác, nhanh chóng.'
      },
      {
        id: 3165,
        grade: 3,
        topicCode: 'cd6_giai_quyet_van_de',
        question: 'Khi sử dụng máy tính để hỗ trợ giải bài tập về nhà, thái độ học tập đúng đắn của học sinh là gì?',
        options: [
          'Tự mình suy nghĩ và dùng máy tính để tra cứu gợi ý',
          'Sao chép y nguyên bài giải trên mạng mà không cần hiểu',
          'Nhờ bạn khác làm hộ qua mạng rồi nộp cho thầy cô',
          'Bật trò chơi điện tử chơi suốt buổi tối thay vì học'
        ],
        correctIndex: 0,
        explanation: 'Máy tính là công cụ hỗ trợ gợi ý kiến thức; học sinh cần tự giác tư duy để nắm vững kiến thức bài học.'
      }
    ]
  }
];
