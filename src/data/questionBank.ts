import { QuizQuestion } from '../types';

// Curated authentic questions adhering strictly to CTGDPT 2018 Tin học Tiểu học (Lớp 3, 4, 5) - Bộ sách Kết Nối Tri Thức Với Cuộc Sống
export const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  // CHỦ ĐỀ A: MÁY TÍNH VÀ EM (PHẦN CỨNG, THIẾT BỊ VÀO - RA, AN TOÀN ĐIỆN)
  hardware: [
    {
      id: 1,
      question: 'Máy tính để bàn gồm có mấy bộ phận cơ bản nhất?',
      options: ['2 bộ phận (Màn hình, chuột)', '3 bộ phận (Bàn phím, chuột, màn hình)', '4 bộ phận (Thân máy, màn hình, bàn phím, chuột)', '5 bộ phận'],
      correctIndex: 2,
      explanation: 'Theo SGK Tin học 3 Kết Nối Tri Thức, máy tính để bàn gồm 4 bộ phận cơ bản: Thân máy, Màn hình, Bàn phím và Chuột.'
    },
    {
      id: 2,
      question: 'Bộ phận nào được coi là "bộ não" của máy tính, điều khiển mọi hoạt động của máy tính?',
      options: ['Màn hình', 'Bàn phím', 'Bộ xử lý (CPU) bên trong thân máy', 'Chuột máy tính'],
      correctIndex: 2,
      explanation: 'Bộ xử lý trung tâm (CPU) nằm trong thân máy tính là bộ não xử lý thông tin và chỉ huy mọi hoạt động.'
    },
    {
      id: 3,
      question: 'Thiết bị nào sau đây là thiết bị đưa thông tin vào (thiết bị vào)?',
      options: ['Màn hình', 'Máy in', 'Loa', 'Bàn phím và chuột'],
      correctIndex: 3,
      explanation: 'Bàn phím và chuột nhận tín hiệu từ người dùng để đưa thông tin vào máy tính xử lý.'
    },
    {
      id: 4,
      question: 'Thiết bị nào sau đây là thiết bị đưa thông tin ra (thiết bị ra)?',
      options: ['Màn hình và máy in', 'Chuột', 'Bàn phím', 'Máy quét (Scanner)'],
      correctIndex: 0,
      explanation: 'Màn hình hiển thị hình ảnh, máy in in văn bản và loa phát âm thanh là các thiết bị ra.'
    },
    {
      id: 5,
      question: 'Tư thế ngồi học máy tính nào sau đây là đúng khoa học?',
      options: [
        'Ngồi sát màn hình, cúi sát mặt để nhìn rõ chữ',
        'Lưng thẳng, mắt ngang tầm màn hình khoảng cách 50 - 80cm, hai chân đặt thoải mái',
        'Nằm bò ra bàn phím khi mỏi lưng',
        'Ngồi chéo chân và tựa sát vào một bên'
      ],
      correctIndex: 1,
      explanation: 'Ngồi thẳng lưng, khoảng cách từ mắt đến màn hình từ 50-80cm giúp bảo vệ cột sống và thị lực.'
    },
    {
      id: 6,
      question: 'Để tắt máy tính đúng cách và an toàn, em cần thực hiện các thao tác nào?',
      options: [
        'Rút ngay dây nguồn điện của máy tính ra khỏi ổ cắm',
        'Bấm vào nút Start -> chọn Power -> chọn Shut down',
        'Bấm giữ nút nguồn trên thân máy tính trong 10 giây',
        'Chỉ cần tắt công tắc màn hình là xong'
      ],
      correctIndex: 1,
      explanation: 'Tắt máy qua lệnh Start -> Power -> Shut down giúp hệ điều hành lưu trữ dữ liệu an toàn trước khi ngắt nguồn.'
    },
    {
      id: 7,
      question: 'Khi nhìn thấy dây cắm điện của máy tính bị hở hoặc có mùi khét, em nên làm gì?',
      options: [
        'Tự lấy kéo hoặc băng dính dán lại',
        'Lấy tay chạm vào kiểm tra xem có điện không',
        'Không chạm vào và báo ngay cho thầy cô giáo hoặc người lớn xử lý',
        'Tiếp tục ngồi học bình thường không quan tâm'
      ],
      correctIndex: 2,
      explanation: 'Tuyệt đối không chạm vào thiết bị điện hở để phòng tránh tai nạn điện giật; cần báo ngay cho người lớn.'
    },
    {
      id: 8,
      question: 'Máy tính xách tay (Laptop) có điểm gì khác biệt so với máy tính để bàn?',
      options: [
        'Không có màn hình',
        'Màn hình, thân máy, bàn phím và vùng cảm ứng chuột được tích hợp chung trong một khối nhỏ gọn',
        'Không cần pin và không di chuyển được',
        'Chỉ dùng để nghe nhạc chứ không học tập được'
      ],
      correctIndex: 1,
      explanation: 'Máy tính xách tay tích hợp tất cả các bộ phận vào một khối gọn nhẹ, dễ dàng mang đi học tập.'
    },
    {
      id: 9,
      question: 'Thiết bị nào sau đây dùng để lưu trữ dữ liệu và mang đi dễ dàng giữa các máy tính?',
      options: ['Thẻ nhớ và USB', 'Dây nguồn máy tính', 'Bàn phím cơ', 'Miếng lót chuột'],
      correctIndex: 0,
      explanation: 'Thẻ nhớ và ổ đĩa flash USB là thiết bị lưu trữ dữ liệu di động phổ biến.'
    },
    {
      id: 10,
      question: 'Quy tắc an toàn trong phòng máy tính của trường học là gì?',
      options: [
        'Mang đồ ăn, nước ngọt vào phòng máy để uống khi khát',
        'Chạy nhảy, đùa nghịch xô đẩy nhau quanh bàn máy tính',
        'Không mang đồ ăn uống, không nghịch dây điện, làm theo hướng dẫn của giáo viên',
        'Tự ý tháo ốc vít của thùng máy để xem bên trong'
      ],
      correctIndex: 2,
      explanation: 'Giữ vệ sinh, không mang đồ ăn uống vào phòng máy và tuân thủ nội quy giúp phòng máy bền đẹp và an toàn.'
    },
    {
      id: 11,
      question: 'Màn hình cảm ứng trên điện thoại thông minh hoặc máy tính bảng đóng vai trò gì?',
      options: ['Chỉ là thiết bị vào', 'Chỉ là thiết bị ra', 'Vừa là thiết bị vào vừa là thiết bị ra', 'Không phải thiết bị vào ra'],
      correctIndex: 2,
      explanation: 'Màn hình cảm ứng vừa hiển thị thông tin (ra) vừa nhận thao tác chạm tay của người dùng (vào).'
    },
    {
      id: 12,
      question: 'Để âm thanh phát ra không làm phiền bạn bên cạnh trong phòng máy, em nên dùng:',
      options: ['Loa thùng công suất lớn', 'Tai nghe (Headphone)', 'Bật loa to hết cỡ', 'Tắt máy tính'],
      correctIndex: 1,
      explanation: 'Tai nghe giúp em nghe rõ bài giảng mà không gây ồn ào ảnh hưởng tới các bạn xung quanh.'
    }
  ],

  // CHỦ ĐỀ: BÀN PHÍM VÀ KỸ THUẬT GÕ PHÍM 10 NGÓN
  typing: [
    {
      id: 1,
      question: 'Hai phím nào trên hàng phím cơ sở có gờ nổi để đặt hai ngón tay trỏ?',
      options: ['Phím A và Phím L', 'Phím F và Phím J', 'Phím G và Phím H', 'Phím Q và Phím P'],
      correctIndex: 1,
      explanation: 'Phím F và Phím J có gờ nổi giúp học sinh định vị tay đúng vị trí xuất phát mà không cần nhìn xuống phím.'
    },
    {
      id: 2,
      question: 'Hàng phím xuất phát (hàng phím cơ sở) gồm có những phím chữ nào?',
      options: [
        'Q W E R T Y U I O P',
        'A S D F G H J K L ;',
        'Z X C V B N M , . /',
        '1 2 3 4 5 6 7 8 9 0'
      ],
      correctIndex: 1,
      explanation: 'Hàng phím cơ sở chứa các phím: A, S, D, F, G, H, J, K, L, ;.'
    },
    {
      id: 3,
      question: 'Phím dài nhất trên bàn phím là phím gì và do ngón tay nào phụ trách?',
      options: ['Phím Enter - ngón út', 'Phím Shift - ngón trỏ', 'Phím cách (Space) - hai ngón tay cái', 'Phím Backspace - ngón giữa'],
      correctIndex: 2,
      explanation: 'Phím cách (Space) dùng để tạo khoảng trắng giữa các từ, do hai ngón cái của hai bàn tay phụ trách.'
    },
    {
      id: 4,
      question: 'Ngón áp út tay trái trên hàng phím cơ sở phụ trách phím nào?',
      options: ['Phím A', 'Phím S', 'Phím D', 'Phím F'],
      correctIndex: 1,
      explanation: 'Theo thứ tự đặt tay hàng cơ sở bên trái: Ngón út (A), Ngón áp út (S), Ngón giữa (D), Ngón trỏ (F).'
    },
    {
      id: 5,
      question: 'Khi muốn viết hoa một chữ cái, em giữ phím nào trong khi gõ chữ đó?',
      options: ['Phím Ctrl', 'Phím Alt', 'Phím Shift', 'Phím Tab'],
      correctIndex: 2,
      explanation: 'Giữ phím Shift kết hợp gõ chữ cái sẽ tạo ra chữ hoa tương ứng.'
    },
    {
      id: 6,
      question: 'Phím nào dùng để xóa ký tự ở bên TRÁI con trỏ soạn thảo?',
      options: ['Phím Delete', 'Phím Backspace', 'Phím Enter', 'Phím Space'],
      correctIndex: 1,
      explanation: 'Phím Backspace (phím xóa lùi) xóa ký tự đứng ngay trước (bên trái) con trỏ.'
    },
    {
      id: 7,
      question: 'Phím nào dùng để xóa ký tự ở bên PHẢI con trỏ soạn thảo?',
      options: ['Phím Delete', 'Phím Backspace', 'Phím Esc', 'Phím Shift'],
      correctIndex: 0,
      explanation: 'Phím Delete xóa ký tự đứng ngay sau (bên phải) con trỏ soạn thảo.'
    },
    {
      id: 8,
      question: 'Để xuống dòng trong khi soạn thảo văn bản, em nhấn phím nào?',
      options: ['Phím Enter', 'Phím Space', 'Phím Tab', 'Phím Esc'],
      correctIndex: 0,
      explanation: 'Nhấn phím Enter để tạo một đoạn văn mới và đưa con trỏ xuống đầu dòng tiếp theo.'
    },
    {
      id: 9,
      question: 'Lợi ích của việc rèn luyện thói quen gõ 10 ngón đúng tư thế là gì?',
      options: [
        'Gõ nhanh hơn, chính xác hơn, không bị mỏi mắt và cổ',
        'Bàn phím không bao giờ bị hỏng',
        'Không cần bật màn hình máy tính',
        'Chỉ dùng để chơi trò chơi điện tử'
      ],
      correctIndex: 0,
      explanation: 'Gõ 10 ngón giúp tăng tốc độ gõ, tập trung mắt nhìn lên màn hình và giảm áp lực lên ngón tay.'
    },
    {
      id: 10,
      question: 'Khi muốn bật chế độ gõ toàn bộ chữ hoa, em nhấn phím nào?',
      options: ['Phím Caps Lock', 'Phím Num Lock', 'Phím Scroll Lock', 'Phím Esc'],
      correctIndex: 0,
      explanation: 'Phím Caps Lock có đèn báo; khi bật lên, tất cả chữ cái gõ vào đều là chữ hoa in hoa.'
    }
  ],

  // CHỦ ĐỀ: GÕ TIẾNG VIỆT (TELEX, VNI, BỘ DẤU THANH)
  vietnameseTyping: [
    {
      id: 1,
      question: 'Trong kiểu gõ Telex, để có chữ "ă" em gõ chữ nào sau đây?',
      options: ['aa', 'aw', 'as', 'af'],
      correctIndex: 1,
      explanation: 'Quy tắc Telex: a + w = ă.'
    },
    {
      id: 2,
      question: 'Trong kiểu gõ Telex, để gõ chữ "đ" em nhấn phím nào?',
      options: ['d + w', 'd + d', 'd + s', 'd + a'],
      correctIndex: 1,
      explanation: 'Quy tắc Telex: d + d = đ.'
    },
    {
      id: 3,
      question: 'Để gõ dấu HUYỀN (\) trong kiểu gõ Telex, em dùng phím nào?',
      options: ['Phím S', 'Phím F', 'Phím R', 'Phím X'],
      correctIndex: 1,
      explanation: 'Trong kiểu Telex: phím F dùng để bỏ dấu huyền (\).'
    },
    {
      id: 4,
      question: 'Để gõ dấu SẮC (/) trong kiểu gõ Telex, em dùng phím nào?',
      options: ['Phím S', 'Phím F', 'Phím J', 'Phím R'],
      correctIndex: 0,
      explanation: 'Trong kiểu Telex: phím S dùng để bỏ dấu sắc (/).'
    },
    {
      id: 5,
      question: 'Để gõ dấu HỎI (?) trong kiểu gõ Telex, em dùng phím nào?',
      options: ['Phím X', 'Phím J', 'Phím R', 'Phím S'],
      correctIndex: 2,
      explanation: 'Trong kiểu Telex: phím R dùng để bỏ dấu hỏi (?).'
    },
    {
      id: 6,
      question: 'Để gõ dấu NẶNG (.) trong kiểu gõ Telex, em dùng phím nào?',
      options: ['Phím J', 'Phím X', 'Phím F', 'Phím S'],
      correctIndex: 0,
      explanation: 'Trong kiểu Telex: phím J dùng để bỏ dấu nặng (.).'
    },
    {
      id: 7,
      question: 'Để gõ dấu NGÃ (~) trong kiểu gõ Telex, em dùng phím nào?',
      options: ['Phím X', 'Phím R', 'Phím F', 'Phím J'],
      correctIndex: 0,
      explanation: 'Trong kiểu Telex: phím X dùng để bỏ dấu ngã (~).'
    },
    {
      id: 8,
      question: 'Trong kiểu gõ Telex, chuỗi phím nào sau đây tạo thành từ "Trường"?',
      options: ['Truwowngf', 'Truowngf', 'Truwongf', 'Truongf'],
      correctIndex: 0,
      explanation: 'T + r + u + w + o + w + n + g + f = Trường (u + w = ư, o + w = ơ, f = huyền).'
    },
    {
      id: 9,
      question: 'Phần mềm gõ tiếng Việt thông dụng và chuẩn nhất hiện nay trên máy tính là gì?',
      options: ['Unikey', 'Windows Media Player', 'Paint', 'Calculator'],
      correctIndex: 0,
      explanation: 'Unikey (hoặc EVKey) là phần mềm gõ tiếng Việt phổ biến nhất được dạy trong chương trình SGK.'
    },
    {
      id: 10,
      question: 'Để gõ được tiếng Việt, biểu tượng phần mềm Unikey ở góc dưới màn hình cần ở trạng thái nào?',
      options: ['Chữ E màu xanh (English)', 'Chữ V màu đỏ (Việt Nam)', 'Dấu chéo màu đen', 'Biểu tượng loa'],
      correctIndex: 1,
      explanation: 'Biểu tượng chữ V màu đỏ biểu thị chế độ gõ tiếng Việt đang được kích hoạt.'
    }
  ],

  // CHỦ ĐỀ: THAO TÁC VỚI CHUỘT MÁY TÍNH
  mouse: [
    {
      id: 1,
      question: 'Chuột máy tính thông thường gồm có các bộ phận nào?',
      options: ['Nút cuộn và dây điện', 'Nút chuột trái, nút chuột phải và con lăn (nút cuộn)', 'Bàn phím mini', 'Màn hình nhỏ'],
      correctIndex: 1,
      explanation: 'Chuột chuẩn có 3 bộ phận chính: Nút trái, nút phải và con lăn ở giữa.'
    },
    {
      id: 2,
      question: 'Thao tác "nhấp chuột" (Click) là thao tác như thế nào?',
      options: [
        'Nhấn nút chuột trái một lần rồi thả ngón tay ra ngay',
        'Nhấn giữ nút chuột trái không buông',
        'Nhấn nút chuột phải hai lần liên tiếp',
        'Lăn con lăn thật nhanh'
      ],
      correctIndex: 0,
      explanation: 'Nhấp chuột (Left click) là nhấn nút trái chuột 1 lần rồi thả tay ra để chọn một đối tượng.'
    },
    {
      id: 3,
      question: 'Thao tác "nhấp đúp chuột" (Double Click) dùng để làm gì?',
      options: [
        'Xóa một thư mục',
        'Mở một tệp, phần mềm hoặc thư mục trên màn hình nền',
        'Tắt nguồn máy tính',
        'Đổi hình nền máy tính'
      ],
      correctIndex: 1,
      explanation: 'Nhấp đúp chuột trái 2 lần liên tiếp nhanh chóng dùng để mở ứng dụng hoặc tệp tin.'
    },
    {
      id: 4,
      question: 'Thao tác "kéo thả chuột" (Drag and drop) được thực hiện như thế nào?',
      options: [
        'Bấm chuột phải rồi nhấc chuột lên khỏi mặt bàn',
        'Nhấn và giữ nút chuột trái, di chuyển con trỏ đến vị trí mới rồi thả tay ra',
        'Lăn con lăn liên tục 5 lần',
        'Nhấn cả hai nút chuột cùng một lúc'
      ],
      correctIndex: 1,
      explanation: 'Kéo thả chuột: Nhấn giữ nút trái -> Di chuyển chuột đến vị trí đích -> Thả nút chuột.'
    },
    {
      id: 5,
      question: 'Con lăn (nút cuộn) ở giữa hai nút chuột có tác dụng chính là gì?',
      options: [
        'Tắt máy tính ngay lập tức',
        'Cuộn trang màn hình lên hoặc xuống để xem văn bản dài',
        'Chỉnh âm lượng loa to nhỏ',
        'Đổi màu của con trỏ chuột'
      ],
      correctIndex: 1,
      explanation: 'Con lăn dùng để cuộn trang web hoặc văn bản dài lên xuống rất tiện lợi.'
    },
    {
      id: 6,
      question: 'Khi nhấp nút chuột PHẢI vào một biểu tượng, điều gì sẽ xảy ra?',
      options: [
        'Máy tính bị đơ',
        'Một bảng chọn ngữ cảnh (Menu) hiện ra với các lệnh thao tác',
        'Ứng dụng bị xóa ngay lập tức',
        'Tập tin tự động được in ra máy in'
      ],
      correctIndex: 1,
      explanation: 'Nhấp chuột phải sẽ mở thực đơn ngữ cảnh (Context Menu) chứa các tùy chọn như Open, Copy, Delete, Rename...'
    },
    {
      id: 7,
      question: 'Cách cầm chuột đúng và thoải mái cho bàn tay là:',
      options: [
        'Dùng cả hai bàn tay bóp chặt chuột',
        'Đặt lòng bàn tay lên lưng chuột, ngón trỏ đặt lên nút trái, ngón giữa đặt lên nút phải',
        'Cầm nghiêng chuột một góc 90 độ',
        'Chỉ dùng ngón út để điều khiển chuột'
      ],
      correctIndex: 1,
      explanation: 'Lòng bàn tay ôm nhẹ lưng chuột, ngón trỏ trên nút trái, ngón giữa trên nút phải, các ngón còn lại ôm hai bên thân chuột.'
    },
    {
      id: 8,
      question: 'Vật dụng nào giúp chuột quang di chuyển mượt mà và chính xác hơn?',
      options: ['Bát nước', 'Miếng lót chuột (Mouse pad)', 'Tấm kính trong suốt trơn bóng', 'Tấm vải ẩm ướt'],
      correctIndex: 1,
      explanation: 'Miếng lót chuột tạo độ ma sát vừa đủ để cảm biến quang học nhận diện chuyển động chính xác.'
    },
    {
      id: 9,
      question: 'Khi con trỏ chuột biến thành hình mũi tên hai đầu ↔ hoặc ↕, thao tác có thể thực hiện là gì?',
      options: ['Không thể làm gì', 'Thay đổi kích thước cửa sổ hoặc độ rộng của cột/hàng', 'Gõ chữ', 'Xóa file'],
      correctIndex: 1,
      explanation: 'Mũi tên hai đầu báo hiệu người dùng có thể kéo thả để co giãn kích thước cửa sổ hoặc khung hình.'
    },
    {
      id: 10,
      question: 'Khi di chuyển chuột vào một đường liên kết (link) trên trang web, con trỏ chuột chuyển sang hình gì?',
      options: ['Hình bàn tay chỉ ngón trỏ 👆', 'Hình chiếc đồng hồ cát', 'Hình dấu nhân màu đỏ', 'Hình vòng tròn xoay'],
      correctIndex: 0,
      explanation: 'Hình bàn tay chỉ ngón trỏ báo hiệu đây là một liên kết có thể nhấp chuột để mở trang mới.'
    }
  ],

  // CHỦ ĐỀ C: TỆP VÀ THƯ MỤC - TỔ CHỨC LƯU TRỮ THÔNG TIN
  folders: [
    {
      id: 1,
      question: 'Thư mục (Folder) trong máy tính có biểu tượng mặc định màu gì?',
      options: ['Màu vàng hình chiếc cặp/kẹp tài liệu', 'Màu đỏ hình quả táo', 'Màu xanh lục hình ngôi sao', 'Màu đen'],
      correctIndex: 0,
      explanation: 'Trong hệ điều hành Windows, thư mục được thể hiện bằng biểu tượng kẹp hồ sơ màu vàng.'
    },
    {
      id: 2,
      question: 'Thư mục có tác dụng gì trong việc quản lý máy tính?',
      options: [
        'Làm cho máy tính nặng hơn',
        'Giúp sắp xếp, lưu trữ và phân loại các tệp dữ liệu một cách khoa học, dễ tìm kiếm',
        'Để che giấu virus',
        'Không có tác dụng gì'
      ],
      correctIndex: 1,
      explanation: 'Thư mục như những ngăn kéo trong tủ sách, giúp phân loại tài liệu theo môn học, năm học ngăn nắp.'
    },
    {
      id: 3,
      question: 'Tên tệp trong máy tính gồm có mấy phần chính?',
      options: ['1 phần duy nhất', '2 phần (Phần tên và phần mở rộng/đuôi tệp), cách nhau bằng dấu chấm', '3 phần', '4 phần'],
      correctIndex: 1,
      explanation: 'Tên tệp gồm 2 phần: <Tên tệp>.<Phần mở rộng>, ví dụ: BaiHoc.docx, AnhTruong.png.'
    },
    {
      id: 4,
      question: 'Để tạo một thư mục mới (New Folder) trong cửa sổ File Explorer, em chọn lệnh nào?',
      options: ['Bấm chuột phải -> chọn New -> chọn Folder', 'Bấm phím F5', 'Bấm phím Esc', 'Tắt màn hình'],
      correctIndex: 0,
      explanation: 'Nhấp chuột phải vào vùng trống -> chọn New -> chọn Folder để tạo thư mục mới.'
    },
    {
      id: 5,
      question: 'Phím tắt nào trên bàn phím dùng để ĐỔI TÊN (Rename) một tệp hoặc thư mục đang chọn?',
      options: ['Phím F2', 'Phím F1', 'Phím F5', 'Phím Enter'],
      correctIndex: 0,
      explanation: 'Phím F2 là phím tắt chuẩn để đổi tên tệp hoặc thư mục trong Windows.'
    },
    {
      id: 6,
      question: 'Khi xóa một tệp tin, tệp tin đó tạm thời được chuyển vào đâu để có thể khôi phục lại khi cần?',
      options: ['Thùng rác (Recycle Bin)', 'Ổ cứng ngoài', 'Màn hình Desktop', 'Hộp thư Gmail'],
      correctIndex: 0,
      explanation: 'Tệp bị xóa sẽ nằm trong Thùng rác (Recycle Bin); người dùng có thể Restore lại nếu lỡ xóa nhầm.'
    },
    {
      id: 7,
      question: 'Tổ hợp phím tắt nào dùng để SAO CHÉP (Copy) một tệp hoặc thư mục?',
      options: ['Ctrl + C', 'Ctrl + V', 'Ctrl + X', 'Ctrl + Z'],
      correctIndex: 0,
      explanation: 'Ctrl + C dùng để sao chép (Copy) đối tượng vào bộ nhớ đệm.'
    },
    {
      id: 8,
      question: 'Tổ hợp phím tắt nào dùng để DÁN (Paste) tệp hoặc thư mục đã sao chép vào vị trí mới?',
      options: ['Ctrl + V', 'Ctrl + C', 'Ctrl + S', 'Ctrl + P'],
      correctIndex: 0,
      explanation: 'Ctrl + V dùng để dán (Paste) tệp hoặc văn bản đã sao chép.'
    },
    {
      id: 9,
      question: 'Tổ chức các thư mục theo dạng nào giúp quản lý thông tin khoa học nhất?',
      options: ['Dạng ngẫu nhiên', 'Dạng cây thư mục (Cây phân cấp: Thư mục mẹ chứa các thư mục con)', 'Không cần tạo thư mục', 'Lưu hết ra màn hình chính Desktop'],
      correctIndex: 1,
      explanation: 'Cấu trúc cây thư mục (thư mục gốc -> thư mục mẹ -> thư mục con) giúp quản lý hàng nghìn tệp ngăn nắp.'
    },
    {
      id: 10,
      question: 'Tệp có phần mở rộng ".docx" thường là tệp của phần mềm nào?',
      options: ['Microsoft Word (Soạn thảo văn bản)', 'Microsoft Excel (Bảng tính)', 'Paint (Vẽ hình)', 'Windows Media Player (Nghe nhạc)'],
      correctIndex: 0,
      explanation: '.docx là định dạng tài liệu soạn thảo chuẩn của phần mềm Microsoft Word.'
    }
  ],

  // CHỦ ĐỀ B: MẠNG MÁY TÍNH VÀ INTERNET
  internet: [
    {
      id: 1,
      question: 'Internet là gì theo định nghĩa trong SGK Tin học Kết Nối Tri Thức?',
      options: [
        'Mạng kết nối hàng triệu máy tính và thiết bị thông minh trên toàn cầu để chia sẻ thông tin',
        'Một chiếc máy tính siêu to khổng lồ đặt ở thủ đô',
        'Trò chơi điện tử trên điện thoại',
        'Chương trình vẽ tranh'
      ],
      correctIndex: 0,
      explanation: 'Internet là mạng thông tin toàn cầu kết nối các mạng máy tính trên thế giới lại với nhau.'
    },
    {
      id: 2,
      question: 'Phần mềm nào sau đây là trình duyệt web (Web Browser) dùng để truy cập Internet?',
      options: ['Google Chrome và Microsoft Edge', 'Microsoft Excel', 'Unikey', 'Phần mềm diệt virus'],
      correctIndex: 0,
      explanation: 'Google Chrome, Microsoft Edge, Cốc Cốc, Firefox là các trình duyệt web phổ biến.'
    },
    {
      id: 3,
      question: 'Địa chỉ trang web thường bắt đầu bằng cụm ký tự nào sau đây?',
      options: ['http:// hoặc https://', 'file:////', 'ftp:////', 'mailto:'],
      correctIndex: 0,
      explanation: 'Giao thức http:// hoặc https:// là phần mở đầu địa chỉ của các trang web trên mạng.'
    },
    {
      id: 4,
      question: 'Để tìm kiếm thông tin về bài học Lịch sử hoặc Địa lý trên Internet, em gõ gì vào ô tìm kiếm?',
      options: ['Từ khóa (Keywords) ngắn gọn, rõ nghĩa liên quan đến nội dung cần tìm', 'Một bức tranh', 'Gõ cả quyển sách vào', 'Chỉ gõ dấu chấm hỏi'],
      correctIndex: 0,
      explanation: 'Từ khóa rõ ràng (ví dụ: "di tích Cố đô Huế", "vịnh Hạ Long") giúp máy tìm kiếm trả về kết quả chính xác nhất.'
    },
    {
      id: 5,
      question: 'Trang tìm kiếm thông tin phổ biến nhất hiện nay trên thế giới là trang web nào?',
      options: ['www.google.com', 'www.paint.net', 'www.calc.gov', 'www.keyboard.vn'],
      correctIndex: 0,
      explanation: 'Google là máy tìm kiếm lớn nhất và quen thuộc nhất với học sinh và thầy cô.'
    },
    {
      id: 6,
      question: 'Khi sử dụng Internet, lợi ích lớn nhất đối với học sinh tiểu học là gì?',
      options: [
        'Chơi game thâu đêm không cần ngủ',
        'Tìm kiếm tài liệu học tập, xem bài giảng bổ ích và khám phá thế giới xung quanh',
        'Nói chuyện với người lạ không quen biết',
        'Mua đồ chơi trực tuyến không cần xin phép bố mẹ'
      ],
      correctIndex: 1,
      explanation: 'Internet là kho tàng tri thức khổng lồ giúp các em học tập, nghiên cứu và giải trí lành mạnh.'
    },
    {
      id: 7,
      question: 'Mạng không dây (Wi-Fi) kết nối máy tính vào Internet thông qua thiết bị nào?',
      options: ['Bộ định tuyến không dây (Wi-Fi Router)', 'Bàn phím cơ', 'Màn hình máy tính', 'Ổ cắm điện'],
      correctIndex: 0,
      explanation: 'Wi-Fi Router phát sóng vô tuyến để kết nối máy tính và điện thoại vào mạng Internet.'
    },
    {
      id: 8,
      question: 'Tác hại của việc ngồi dùng Internet và chơi game quá nhiều giờ trong ngày là gì?',
      options: [
        'Mắt bị cận thị, mệt mỏi, suy giảm thể lực và giảm sút kết quả học tập',
        'Giúp cơ thể cao lớn hơn',
        'Giúp mắt sáng hơn như mắt đại bàng',
        'Không có bất kỳ tác hại nào'
      ],
      correctIndex: 0,
      explanation: 'Học sinh chỉ nên dùng máy tính từ 30-45 phút mỗi lần và cần nghỉ ngơi, tập thể dục để bảo vệ sức khỏe.'
    },
    {
      id: 9,
      question: 'Một liên kết (Hyperlink) trên trang web có đặc điểm nhận biết là gì?',
      options: [
        'Chữ thường có màu xanh dương, có gạch chân và con trỏ chuột đổi thành hình bàn tay khi chỉ vào',
        'Chữ màu đen mờ không bấm được',
        'Chữ bị xóa mất',
        'Không có đặc điểm gì'
      ],
      correctIndex: 0,
      explanation: 'Siêu liên kết giúp chuyển hướng người xem sang trang web hoặc tệp tài liệu khác khi nhấp chuột.'
    },
    {
      id: 10,
      question: 'Khi gặp một trang web có nội dung bạo lực, rùng rợn hoặc không phù hợp với lứa tuổi, em nên:',
      options: [
        'Tò mò xem tiếp một mình',
        'Lập tức đóng trang web đó lại và báo cho bố mẹ hoặc thầy cô giáo',
        'Rủ các bạn cùng lớp vào xem',
        'Lưu lại để xem đi xem lại'
      ],
      correctIndex: 1,
      explanation: 'Luôn chủ động đóng trang web xấu và tâm sự ngay với bố mẹ để được hướng dẫn an toàn.'
    }
  ],

  // CHỦ ĐỀ D: CÔNG DÂN SỐ, AN TOÀN TRÊN MẠNG VÀ ĐẠO ĐỨC PHÁP LUẬT
  digitalCitizenship: [
    {
      id: 1,
      question: 'Thông tin nào sau đây thuộc thông tin bí mật cá nhân KHÔNG ĐƯỢC tùy tiện chia sẻ lên mạng?',
      options: [
        'Họ tên đầy đủ, ngày sinh, số điện thoại, địa chỉ nhà và mật khẩu tài khoản',
        'Tên một bài thơ trong sách giáo khoa',
        'Tên thủ đô của nước Việt Nam',
        'Màu sắc của bầu trời'
      ],
      correctIndex: 0,
      explanation: 'Thông tin cá nhân nếu bị lộ có thể khiến kẻ xấu lợi dụng để lừa đảo hoặc gây nguy hiểm cho gia đình.'
    },
    {
      id: 2,
      question: 'Mật khẩu tài khoản học tập nào sau đây là mật khẩu mạnh và an toàn nhất?',
      options: ['12345678', 'nguyenvana', 'HocTin@2026!Tot', '000000'],
      correctIndex: 2,
      explanation: 'Mật khẩu mạnh dài trên 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt (@, !, #).'
    },
    {
      id: 3,
      question: 'Khi sử dụng lại hình ảnh, video của người khác trên mạng để làm bài tập, em cần chú ý điều gì?',
      options: [
        'Tự nhận là do chính mình sáng tác',
        'Tôn trọng bản quyền tác giả: Ghi rõ nguồn trích dẫn và tác giả của bức ảnh',
        'Xóa chữ ký của tác giả đi để không ai biết',
        'Không cần quan tâm ai vẽ'
      ],
      correctIndex: 1,
      explanation: 'Tôn trọng quyền tác giả là nét đẹp văn hóa văn minh số được dạy trong SGK Kết Nối Tri Thức.'
    },
    {
      id: 4,
      question: 'Hành vi bắt nạt trên mạng (Cyberbullying) là hành vi như thế nào?',
      options: [
        'Giúp đỡ bạn giải bài tập khó qua mạng',
        'Gửi lời chúc mừng sinh nhật bạn',
        'Đăng lời lẽ chế giễu, bôi nhọ, xúc phạm danh dự hoặc cô lập bạn trên môi trường số',
        'Rủ bạn cùng học bài'
      ],
      correctIndex: 2,
      explanation: 'Xúc phạm, bêu riếu bạn bè trên mạng gây tổn thương tinh thần nghiêm trọng và là hành vi sai trái.'
    },
    {
      id: 5,
      question: 'Khi nhận được tin nhắn từ người lạ tự xưng là bạn của bố mẹ yêu cầu gửi mã OTP hoặc mở cửa nhà, em nên:',
      options: [
        'Tin ngay và làm theo lời họ dặn',
        'Tuyệt đối không làm theo, báo ngay cho bố mẹ để xác nhận thông tin',
        'Đưa hết chìa khóa nhà cho họ',
        'Gửi hết mật khẩu của bố mẹ'
      ],
      correctIndex: 1,
      explanation: 'Kẻ xấu thường giả mạo người quen để lừa đảo. Cần bình tĩnh báo cho bố mẹ kiểm tra.'
    },
    {
      id: 6,
      question: 'Dấu chân kỹ thuật số (Digital Footprint) là gì?',
      options: [
        'Vết bẩn dính trên bàn phím máy tính',
        'Toàn bộ những dấu vết, thông tin, hình ảnh, bài đăng mà em để lại khi sử dụng Internet',
        'Bàn chân người máy',
        'Trò chơi chạy thi trên máy tính'
      ],
      correctIndex: 1,
      explanation: 'Mọi hoạt động trên Internet đều để lại dấu vết số lâu dài, vì vậy hãy luôn suy nghĩ kỹ trước khi đăng tải bất cứ điều gì.'
    },
    {
      id: 7,
      question: 'Để bảo vệ máy tính khỏi virus và phần mềm độc hại, em nên làm gì?',
      options: [
        'Cài đặt phần mềm diệt virus chính hãng và không bấm vào các đường link lạ',
        'Mở tất cả các tệp đính kèm gửi từ người lạ',
        'Tải game từ các trang web lậu không rõ nguồn gốc',
        'Tắt hết các chế độ bảo mật của máy tính'
      ],
      correctIndex: 0,
      explanation: 'Cài phần mềm diệt virus và cảnh giác trước link lạ giúp máy tính an toàn.'
    },
    {
      id: 8,
      question: 'Quy tắc ứng xử văn minh và lịch sự khi gửi tin nhắn hoặc bình luận trên mạng là gì?',
      options: [
        'Dùng từ ngữ thô tục, chửi bậy',
        'Tôn trọng người khác, dùng lời lẽ lễ phép, lịch sự, không lan truyền tin bịa đặt',
        'Viết toàn chữ in hoa để quát mắng người khác',
        'Spam gửi tin nhắn liên tục 100 lần để quấy rối'
      ],
      correctIndex: 1,
      explanation: 'Lời nói nhã nhặn, tôn trọng bạn bè và cộng đồng thể hiện người học sinh văn minh.'
    },
    {
      id: 9,
      question: 'Tại sao em không nên chia sẻ vị trí trực tiếp (Check-in thời gian thực) của mình lên mạng xã hội?',
      options: [
        'Vì kẻ gian có thể biết em đang ở đâu và nhà đang vắng người để thực hiện hành vi xấu',
        'Vì làm tốn dung lượng pin',
        'Vì mạng sẽ bị ngắt kết nối',
        'Không có lý do gì'
      ],
      correctIndex: 0,
      explanation: 'Chia sẻ vị trí công khai tiềm ẩn rủi ro rất lớn về an ninh cá nhân và gia đình.'
    },
    {
      id: 10,
      question: 'Sau khi sử dụng máy tính công cộng ở trường hoặc thư viện, thao tác quan trọng nhất trước khi đứng dậy là:',
      options: [
        'Để nguyên tất cả tài khoản cá nhân đang đăng nhập',
        'Đăng xuất (Log out) toàn bộ tài khoản cá nhân và xóa lịch sử duyệt web',
        'Rút dây mạng Internet',
        'Xóa tài liệu của người khác'
      ],
      correctIndex: 1,
      explanation: 'Đăng xuất tài khoản ngăn người sử dụng sau truy cập vào thư từ hoặc thông tin riêng tư của em.'
    }
  ],

  // CHỦ ĐỀ E: SOẠN THẢO VĂN BẢN WORD
  word: [
    {
      id: 1,
      question: 'Biểu tượng nút lệnh B (Bold) trên thanh công cụ Word có tác dụng gì?',
      options: ['In đậm chữ', 'In nghiêng chữ', 'Gạch chân dưới chữ', 'Tô màu nền'],
      correctIndex: 0,
      explanation: 'Nút lệnh B (Ctrl + B) dùng để định dạng chữ in đậm nổi bật.'
    },
    {
      id: 2,
      question: 'Biểu tượng nút lệnh I (Italic) trên thanh công cụ Word có tác dụng gì?',
      options: ['In đậm chữ', 'In nghiêng chữ', 'Gạch chân chữ', 'Đổi phông chữ'],
      correctIndex: 1,
      explanation: 'Nút lệnh I (Ctrl + I) dùng để làm chữ nghiêng tao nhã.'
    },
    {
      id: 3,
      question: 'Biểu tượng nút lệnh U (Underline) có tác dụng gì?',
      options: ['Gạch chân dưới chữ', 'In hoa', 'Đổi màu chữ', 'Tăng cỡ chữ'],
      correctIndex: 0,
      explanation: 'Nút lệnh U (Ctrl + U) tạo đường gạch chân dưới các từ được chọn.'
    },
    {
      id: 4,
      question: 'Nút lệnh nào dùng để căn chỉnh đoạn văn bản nằm CHÍNH GIỮA trang giấy (Center)?',
      options: ['Căn lề trái (Align Left)', 'Căn giữa (Center - Ctrl + E)', 'Căn lề phải (Align Right)', 'Căn đều hai bên (Justify)'],
      correctIndex: 1,
      explanation: 'Căn giữa thường dùng để trình bày tiêu đề bài văn, bài thơ hoặc tên tác giả.'
    },
    {
      id: 5,
      question: 'Để chèn một bức ảnh minh họa vào văn bản Word, em vào dải lệnh nào?',
      options: ['Dải lệnh Insert -> chọn Pictures', 'Dải lệnh View', 'Dải lệnh Help', 'Dải lệnh File -> Print'],
      correctIndex: 0,
      explanation: 'Dải lệnh Insert (Chèn) chứa các công cụ chèn bảng (Table), chèn ảnh (Pictures), hình vẽ (Shapes).'
    },
    {
      id: 6,
      question: 'Để lưu bài soạn thảo vào máy tính lần đầu tiên, em dùng lệnh nào?',
      options: ['File -> Save (hoặc nhấn Ctrl + S)', 'File -> Close', 'File -> New', 'File -> Exit'],
      correctIndex: 0,
      explanation: 'Lệnh Save (Ctrl + S) giúp lưu lại văn bản vào thư mục học tập trên máy tính.'
    },
    {
      id: 7,
      question: 'Phông chữ (Font) thông dụng nhất cho văn bản tiếng Việt là gì?',
      options: ['Times New Roman và Arial', 'Webdings', 'Wingdings', 'Symbol'],
      correctIndex: 0,
      explanation: 'Times New Roman, Arial và Calibri là các phông chữ chuẩn hỗ trợ gõ tiếng Việt có dấu đẹp mắt.'
    },
    {
      id: 8,
      question: 'Để chèn một bảng (Table) gồm các hàng và cột vào bài tập, em chọn:',
      options: ['Insert -> Table', 'Home -> Font', 'View -> Zoom', 'Layout -> Margins'],
      correctIndex: 0,
      explanation: 'Insert -> Table cho phép học sinh chọn số hàng và số cột để tạo thời khóa biểu hoặc bảng điểm.'
    },
    {
      id: 9,
      question: 'Tổ hợp phím tắt nào dùng để khôi phục thao tác vừa thực hiện nhầm (Undo)?',
      options: ['Ctrl + Z', 'Ctrl + Y', 'Ctrl + A', 'Ctrl + S'],
      correctIndex: 0,
      explanation: 'Ctrl + Z (Undo) là phím thần kỳ giúp học sinh lấy lại nội dung vừa lỡ tay xóa hoặc định dạng sai.'
    },
    {
      id: 10,
      question: 'Tổ hợp phím nào dùng để chọn toàn bộ văn bản (Select All)?',
      options: ['Ctrl + A', 'Ctrl + B', 'Ctrl + C', 'Ctrl + D'],
      correctIndex: 0,
      explanation: 'Ctrl + A chọn toàn bộ tất cả chữ và hình ảnh có trong tài liệu.'
    }
  ],

  // CHỦ ĐỀ E: BẢNG TÍNH ĐIỆN TỬ EXCEL
  excel: [
    {
      id: 1,
      question: 'Trong phần mềm Microsoft Excel, một trang tính (Worksheet) được cấu tạo bởi:',
      options: ['Các hàng (được đánh số 1, 2, 3...) và các cột (được đặt tên bằng chữ cái A, B, C...)', 'Chỉ có các bức tranh', 'Chỉ có đoạn văn', 'Các trang trình chiếu'],
      correctIndex: 0,
      explanation: 'Bảng tính Excel gồm lưới các cột (A, B, C...) và các hàng (1, 2, 3...) giao nhau tạo thành các ô tính.'
    },
    {
      id: 2,
      question: 'Giao điểm giữa một cột và một hàng trong bảng tính được gọi là gì?',
      options: ['Ô tính (Cell)', 'Trang giấy', 'Hình khối', 'Thư mục'],
      correctIndex: 0,
      explanation: 'Mỗi giao điểm được gọi là một ô tính (Cell), có địa chỉ xác định như A1, B2, C10.'
    },
    {
      id: 3,
      question: 'Địa chỉ ô B5 có ý nghĩa là gì?',
      options: ['Ô nằm ở cột B và hàng 5', 'Ô nằm ở hàng B và cột 5', 'Phép nhân B nhân 5', 'Trang thứ 5 của sách'],
      correctIndex: 0,
      explanation: 'Quy ước địa chỉ ô tính: Tên cột viết trước, số hàng viết sau (Cột B, hàng 5 -> B5).'
    },
    {
      id: 4,
      question: 'Khi bắt đầu nhập một công thức tính toán trong Excel, ký tự đầu tiên bắt buộc phải là:',
      options: ['Dấu bằng (=)', 'Dấu cộng (+)', 'Dấu hỏi (?)', 'Dấu chấm (.)'],
      correctIndex: 0,
      explanation: 'Mọi công thức hoặc hàm tính toán trong Excel đều phải bắt đầu bằng dấu bằng (=).'
    },
    {
      id: 5,
      question: 'Hàm nào trong Excel dùng để tính TỔNG các số trong một vùng dữ liệu?',
      options: ['Hàm SUM', 'Hàm AVERAGE', 'Hàm COUNT', 'Hàm MAX'],
      correctIndex: 0,
      explanation: 'Hàm =SUM(A1:A5) cộng tổng toàn bộ các số từ ô A1 đến ô A5.'
    },
    {
      id: 6,
      question: 'Hàm nào trong Excel dùng để tính GIÁ TRỊ TRUNG BÌNH CỘNG của các số?',
      options: ['Hàm AVERAGE', 'Hàm SUM', 'Hàm MIN', 'Hàm TODAY'],
      correctIndex: 0,
      explanation: 'Hàm =AVERAGE(B2:D2) tính điểm trung bình của 3 môn học một cách tự động.'
    },
    {
      id: 7,
      question: 'Hàm nào dùng để tìm số LỚN NHẤT trong một danh sách điểm số?',
      options: ['Hàm MAX', 'Hàm MIN', 'Hàm SUM', 'Hàm LEN'],
      correctIndex: 0,
      explanation: 'Hàm =MAX() tìm giá trị điểm số cao nhất trong danh sách.'
    },
    {
      id: 8,
      question: 'Dạng biểu đồ nào thích hợp nhất để so sánh điểm số giữa các bạn học sinh trong lớp?',
      options: ['Biểu đồ cột (Column Chart)', 'Biểu đồ hình tròn chỉ 1 phần trăm', 'Không dùng biểu đồ nào', 'Vẽ tranh phong cảnh'],
      correctIndex: 0,
      explanation: 'Biểu đồ cột giúp trực quan hóa dữ liệu, dễ dàng so sánh độ cao thấp của điểm số.'
    },
    {
      id: 9,
      question: 'Khi thay đổi số liệu trong ô tính, kết quả của công thức có tự động cập nhật không?',
      options: [
        'Có, Excel sẽ tự động tính toán lại kết quả mới ngay lập tức',
        'Không bao giờ, phải gõ lại công thức từ đầu',
        'Máy tính sẽ báo lỗi ngay lập tức',
        'Phải khởi động lại máy tính mới đổi kết quả'
      ],
      correctIndex: 0,
      explanation: 'Đây là ưu điểm vượt trội của bảng tính: Tự động tính toán lại khi dữ liệu nguồn thay đổi.'
    },
    {
      id: 10,
      question: 'Tệp bảng tính Excel thường có phần mở rộng (đuôi tệp) là gì?',
      options: ['.xlsx', '.docx', '.pptx', '.mp3'],
      correctIndex: 0,
      explanation: '.xlsx là định dạng tệp chuẩn của sổ làm việc Microsoft Excel.'
    }
  ],

  // CHỦ ĐỀ E: BÀI TRÌNH CHIẾU POWERPOINT
  powerpoint: [
    {
      id: 1,
      question: 'Mỗi trang trong một bài thuyết trình PowerPoint được gọi là gì?',
      options: ['Trang chiếu (Slide)', 'Ô tính', 'Trang văn bản', 'Thư mục'],
      correctIndex: 0,
      explanation: 'Một bài trình chiếu gồm tập hợp nhiều trang chiếu (Slide) được sắp xếp theo trình tự.'
    },
    {
      id: 2,
      question: 'Phím tắt nào trên bàn phím dùng để BẮT ĐẦU TRÌNH CHIẾU toàn màn hình từ trang đầu tiên?',
      options: ['Phím F5', 'Phím F1', 'Phím Esc', 'Phím Space'],
      correctIndex: 0,
      explanation: 'Phím F5 là phím tắt phổ biến nhất để bắt đầu trình chiếu bài thuyết trình trước cả lớp.'
    },
    {
      id: 3,
      question: 'Phím nào dùng để THOÁT KHỎI chế độ trình chiếu và quay lại màn hình chỉnh sửa?',
      options: ['Phím Esc (Escape)', 'Phím Enter', 'Phím Shift', 'Phím Tab'],
      correctIndex: 0,
      explanation: 'Phím Esc ở góc trên cùng bên trái bàn phím dùng để thoát chế độ trình chiếu.'
    },
    {
      id: 4,
      question: 'Hiệu ứng chuyển tiếp giữa các trang chiếu (từ trang này sang trang khác) nằm ở dải lệnh nào?',
      options: ['Dải lệnh Transitions', 'Dải lệnh Animations', 'Dải lệnh Home', 'Dải lệnh Review'],
      correctIndex: 0,
      explanation: 'Transitions là hiệu ứng chuyển trang (như Fade, Push, Wipe).'
    },
    {
      id: 5,
      question: 'Hiệu ứng xuất hiện hoặc chuyển động của các đối tượng (chữ, hình ảnh) TRONG MỘT trang chiếu nằm ở dải lệnh nào?',
      options: ['Dải lệnh Animations', 'Dải lệnh Transitions', 'Dải lệnh Design', 'Dải lệnh View'],
      correctIndex: 0,
      explanation: 'Animations là hiệu ứng chuyển động cho từng hình ảnh hoặc đoạn chữ trên slide.'
    },
    {
      id: 6,
      question: 'Để thêm một trang chiếu mới (New Slide), em bấm tổ hợp phím nào?',
      options: ['Ctrl + M', 'Ctrl + N', 'Ctrl + S', 'Ctrl + P'],
      correctIndex: 0,
      explanation: 'Ctrl + M (hoặc nút New Slide trên thẻ Home) dùng để thêm một trang chiếu mới vào bài.'
    },
    {
      id: 7,
      question: 'Nguyên tắc trình bày chữ trên trang chiếu PowerPoint nào sau đây là hợp lý nhất?',
      options: [
        'Chép toàn bộ cả trang sách chữ chi chít không có khoảng trống',
        'Chữ ngắn gọn, dùng gạch đầu dòng, phông chữ to rõ ràng và màu tương phản với nền',
        'Chọn chữ màu vàng nhạt trên nền trắng tinh',
        'Không cần viết chữ gì'
      ],
      correctIndex: 1,
      explanation: 'Trang chiếu cần trực quan, súc tích, chữ to dễ đọc từ xa và phối màu tương phản hài hòa.'
    },
    {
      id: 8,
      question: 'Để bài thuyết trình thêm sinh động và thu hút sự chú ý của người nghe, em nên kết hợp:',
      options: [
        'Văn bản ngắn gọn cùng hình ảnh minh họa đẹp, sơ đồ và biểu đồ trực quan',
        'Chèn 100 hiệu ứng chớp nháy liên tục gây hoa mắt',
        'Chỉ dùng một màn hình đen tuyền',
        'Tắt hết màn hình máy chiếu'
      ],
      correctIndex: 0,
      explanation: 'Hình ảnh đẹp và sơ đồ minh họa giúp khán giả tiếp thu thông tin nhanh chóng và ghi nhớ sâu sắc.'
    },
    {
      id: 9,
      question: 'Chức năng "Design Theme" trong PowerPoint giúp em làm gì?',
      options: [
        'Áp dụng mẫu bố cục, màu sắc và phông chữ đồng bộ đẹp mắt cho toàn bộ các slide',
        'Xóa toàn bộ bài thuyết trình',
        'Tắt máy tính',
        'Gõ tiếng Anh tự động'
      ],
      correctIndex: 0,
      explanation: 'Design Themes cung cấp các mẫu thiết kế chuyên nghiệp, giúp bài thuyết trình đồng bộ và trang nhã.'
    },
    {
      id: 10,
      question: 'Tệp bài trình chiếu PowerPoint thường có đuôi mở rộng là gì?',
      options: ['.pptx', '.xlsx', '.docx', '.mp4'],
      correctIndex: 0,
      explanation: '.pptx là định dạng tài liệu chuẩn của phần mềm trình chiếu Microsoft PowerPoint.'
    }
  ],

  // CHỦ ĐỀ F: TƯ DUY THUẬT TOÁN VÀ GIẢI QUYẾT VẤN ĐỀ
  algorithm: [
    {
      id: 1,
      question: 'Thuật toán (Algorithm) là gì theo khái niệm trong SGK Tin học Kết Nối Tri Thức?',
      options: [
        'Một dãy các chỉ dẫn từng bước rõ ràng, tuần tự để giải quyết một bài toán hoặc hoàn thành công việc',
        'Một trò chơi bắn súng trên máy tính',
        'Một loại virus máy tính',
        'Một linh kiện phần cứng đắt tiền'
      ],
      correctIndex: 0,
      explanation: 'Thuật toán là chuỗi các thao tác thực hiện theo một trật tự xác định để đi từ đầu vào (Input) đến kết quả (Output).'
    },
    {
      id: 2,
      question: 'Ba cấu trúc điều khiển cơ bản của mọi thuật toán là gì?',
      options: [
        'Cấu trúc Tuần tự (Sequential), Cấu trúc Rẽ nhánh (Selection), Cấu trúc Lặp (Iteration/Loop)',
        'Cấu trúc Ngẫu nhiên, Cấu trúc May rủi, Cấu trúc Tự do',
        'Cấu trúc Mở máy, Cấu trúc Tắt máy, Cấu trúc Khởi động',
        'Cấu trúc Bàn phím, Chuột và Màn hình'
      ],
      correctIndex: 0,
      explanation: 'Tuần tự (làm từng bước), Rẽ nhánh (Nếu... thì...), Lặp (lặp lại hành động) là 3 trụ cột của tư duy lập trình.'
    },
    {
      id: 3,
      question: 'Trong tình huống: "NẾU trời mưa THÌ em mang áo mưa, NẾU KHÔNG THÌ em đội mũ nón". Đây là ví dụ của cấu trúc nào?',
      options: ['Cấu trúc Rẽ nhánh (If - Then - Else)', 'Cấu trúc Lặp lại vô hạn', 'Cấu trúc Tuần tự', 'Không phải cấu trúc thuật toán'],
      correctIndex: 0,
      explanation: 'Hành động phụ thuộc vào điều kiện (trời mưa hay không) chính là cấu trúc rẽ nhánh.'
    },
    {
      id: 4,
      question: 'Trong tình huống: "Bác nông dân gieo từng hạt ngô vào từng hốc đất cho đến khi hết luống ngô". Đây là ví dụ của cấu trúc nào?',
      options: ['Cấu trúc Lặp (Loop)', 'Cấu trúc Rẽ nhánh', 'Cấu trúc Đứng yên', 'Cấu trúc Nhảy cóc'],
      correctIndex: 0,
      explanation: 'Hành động gieo hạt được lặp đi lặp lại nhiều lần cho đến khi thỏa mãn điều kiện kết thúc luống ngô.'
    },
    {
      id: 5,
      question: 'Khi lập trình điều khiển Robot vượt qua mê cung, việc đầu tiên em cần làm là:',
      options: [
        'Phân tích bản đồ mê cung, quan sát vị trí xuất phát, chướng ngại vật và đích đến',
        'Bấm chạy thử lung tung không cần suy nghĩ',
        'Tắt máy tính đi ngủ',
        'Vẽ thêm chướng ngại vật'
      ],
      correctIndex: 0,
      explanation: 'Quan sát và phân tích đề bài là bước then chốt đầu tiên của tư duy giải quyết vấn đề.'
    },
    {
      id: 6,
      question: 'Lỗi chương trình (Bug) trong lập trình có nghĩa là gì?',
      options: [
        'Một sai sót hoặc khiếm khuyết trong các câu lệnh khiến chương trình không chạy đúng như mong muốn',
        'Con côn trùng bò vào màn hình',
        'Một món quà phần thưởng',
        'Tên của chiếc chuột máy tính'
      ],
      correctIndex: 0,
      explanation: 'Bug là lỗi trong mã lệnh; quá trình tìm và sửa lỗi đó gọi là Gỡ lỗi (Debugging).'
    },
    {
      id: 7,
      question: 'Nếu Robot đang hướng mặt về phía ĐÔNG, sau khi nhận lệnh "Quay trái 90 độ", Robot sẽ hướng mặt về phía nào?',
      options: ['Phía BẮC', 'Phía NAM', 'Phía TÂY', 'Vẫn hướng phía ĐÔNG'],
      correctIndex: 0,
      explanation: 'Theo la bàn định hướng: Đông quay sang trái 90 độ sẽ hướng về phía Bắc.'
    },
    {
      id: 8,
      question: 'Lợi ích của việc sử dụng khối lệnh LẶP (Repeat 4 times) thay vì gõ 4 lần lệnh "Đi thẳng 1 bước" là gì?',
      options: [
        'Làm cho chương trình ngắn gọn, sáng sủa và dễ kiểm tra sửa chữa hơn',
        'Làm cho máy tính chạy chậm đi',
        'Không có lợi ích gì',
        'Robot đi sai hướng'
      ],
      correctIndex: 0,
      explanation: 'Vòng lặp giúp tối ưu hóa số lượng câu lệnh, tránh lặp lại mã nguồn thừa.'
    },
    {
      id: 9,
      question: 'Để pha một cốc sữa nóng thơm ngon, bước nào sau đây phải thực hiện TRƯỚC TIÊN?',
      options: [
        'Chuẩn bị cốc sạch, sữa đặc và nước ấm sạch sẽ',
        'Uống ngay sữa',
        'Đậy nắp cốc cất đi',
        'Rửa sạch thìa sau khi uống'
      ],
      correctIndex: 0,
      explanation: 'Chuẩn bị nguyên liệu và dụng cụ là bước đầu vào bắt buộc trước khi tiến hành pha chế.'
    },
    {
      id: 10,
      question: 'Tư duy máy tính (Computational Thinking) giúp ích gì cho học sinh trong cuộc sống hàng ngày?',
      options: [
        'Rèn luyện óc phân tích logic, biết chia việc lớn phức tạp thành các việc nhỏ để giải quyết từng bước hiệu quả',
        'Biến con người thành người máy vô cảm',
        'Chỉ có ích khi ngồi trước màn hình máy tính',
        'Làm bài thi không cần học'
      ],
      correctIndex: 0,
      explanation: 'Tư duy máy tính là kỹ năng giải quyết vấn đề cốt lõi giúp học sinh thành công trong mọi môn học và đời sống.'
    }
  ],

  // CHỦ ĐỀ G: TRÍ TUỆ NHÂN TẠO (AI) DÀNH CHO TIỂU HỌC
  ai: [
    {
      id: 1,
      question: 'Trí tuệ nhân tạo (AI - Artificial Intelligence) là gì theo cách hiểu đơn giản nhất?',
      options: [
        'Khả năng của máy tính hoặc robot mô phỏng các hoạt động trí tuệ của con người (như học hỏi, suy nghĩ, nhận diện hình ảnh, hiểu tiếng nói)',
        'Một loại siêu năng lực kỳ bí trong phim hoạt hình',
        'Một chiếc bàn phím thông minh biết phát sáng',
        'Một người ngoài hành tinh'
      ],
      correctIndex: 0,
      explanation: 'AI là công nghệ giúp máy tính có thể học tập từ dữ liệu và thực hiện các nhiệm vụ thông minh như con người.'
    },
    {
      id: 2,
      question: 'Ứng dụng nào sau đây trong đời sống thường ngày SỬ DỤNG Trí tuệ nhân tạo (AI)?',
      options: [
        'Nhận diện khuôn mặt mở khóa điện thoại, dịch ngôn ngữ tự động và xe tự lái',
        'Bật công tắc bóng đèn sợi đốt bằng tay',
        'Mở vòi nước cơ bằng vặn ốc',
        'Dùng thước kẻ đo độ dài cuốn vở'
      ],
      correctIndex: 0,
      explanation: 'FaceID, Google Translate, trợ lý giọng nói và xe tự lái là các ứng dụng AI tiêu biểu.'
    },
    {
      id: 3,
      question: 'AI có bao giờ đưa ra câu trả lời sai hoặc bị "ảo giác" (hallucination) tạo thông tin giả không?',
      options: [
        'Có, AI vẫn có thể trả lời sai hoặc nhầm lẫn, vì vậy học sinh luôn cần tự mình kiểm chứng lại với sách giáo khoa và thầy cô',
        'Không bao giờ, AI luôn biết tuốt và đúng 100%',
        'Chỉ có người dùng sai chứ AI không bao giờ sai',
        'AI không biết nói dối'
      ],
      correctIndex: 0,
      explanation: 'AI được huấn luyện trên dữ liệu và vẫn có sai số; luôn có tinh thần phản biện và kiểm tra lại thông tin.'
    },
    {
      id: 4,
      question: 'Câu lệnh nhắc (Prompt) gửi tới AI là gì?',
      options: [
        'Lời yêu cầu hoặc câu hỏi bằng ngôn ngữ tự nhiên mà con người nhập vào để hướng dẫn AI thực hiện nhiệm vụ',
        'Một loại virus phá hủy máy tính',
        'Nút nguồn bật máy tính',
        'Một bức ảnh bị hỏng'
      ],
      correctIndex: 0,
      explanation: 'Prompt là câu lệnh, gợi ý giúp mô hình AI hiểu mong muốn của người dùng để phản hồi chính xác.'
    },
    {
      id: 5,
      question: 'Để AI gợi ý ý tưởng cho một bài thuyết trình về bảo vệ môi trường hay nhất, em nên viết Prompt như thế nào?',
      options: [
        '"Môi trường."',
        '"Hãy đóng vai một bạn học sinh lớp 4, gợi ý 3 hành động cụ thể và dễ làm ở trường để bảo vệ môi trường, kèm lời giải thích ngắn."',
        '"Làm nhanh lên!"',
        '"Viết cái gì cũng được."'
      ],
      correctIndex: 1,
      explanation: 'Prompt chi tiết có vai trò, đối tượng cụ thể, số lượng yêu cầu sẽ giúp AI trả về kết quả hữu ích nhất.'
    },
    {
      id: 6,
      question: 'Thái độ đúng đắn và trung thực của một học sinh tiểu học khi sử dụng công cụ AI là:',
      options: [
        'Nhờ AI làm hộ toàn bộ bài tập về nhà rồi chép lại nộp cho thầy cô để lấy điểm 10',
        'Sử dụng AI như một người bạn gợi ý ý tưởng, sau đó tự mình suy nghĩ, viết bài và học hỏi kiến thức',
        'Nói dối rằng mình tự nghĩ ra toàn bộ mà không dùng AI',
        'Từ chối mọi công nghệ hiện đại'
      ],
      correctIndex: 1,
      explanation: 'Trung thực trong học tập là đạo đức hàng đầu; dùng AI để tham khảo ý tưởng, không để AI làm thay tư duy của mình.'
    },
    {
      id: 7,
      question: 'AI học hỏi và trở nên thông minh nhờ yếu tố quan trọng nhất nào?',
      options: [
        'Dữ liệu (Data) lớn và các thuật toán học máy (Machine Learning) do con người huấn luyện',
        'Tự động uống thuốc bổ',
        'Nhờ dòng điện chạy nhanh hơn',
        'Tự sinh ra từ không khí'
      ],
      correctIndex: 0,
      explanation: 'Dữ liệu phong phú và chính xác là "thức ăn" giúp các mô hình AI học hỏi và nhận diện quy luật.'
    },
    {
      id: 8,
      question: 'Điều nào sau đây con người làm tốt hơn AI và AI KHÔNG THỂ thay thế được con người?',
      options: [
        'Tình yêu thương, lòng trắc ẩn, cảm xúc chân thành và đạo đức lương tâm',
        'Tính toán phép tính cộng hàng triệu chữ số trong 1 giây',
        'Lưu trữ hàng triệu cuốn sách',
        'Chơi cờ vua siêu tốc'
      ],
      correctIndex: 0,
      explanation: 'Trái tim, tình cảm, sự thấu hiểu và lòng nhân ái là phẩm chất độc nhất vô nhị chỉ con người mới có.'
    },
    {
      id: 9,
      question: 'Khi sử dụng các công cụ AI trò chuyện trực tuyến, em CẦN TRÁNH làm điều gì?',
      options: [
        'Nhập số điện thoại, mật khẩu, địa chỉ nhà hoặc bí mật gia đình vào khung chat của AI',
        'Hỏi AI cách giải thích một hiện tượng thiên nhiên (như cầu vồng hình thành thế nào)',
        'Hỏi AI cách nói câu "Xin chào" bằng tiếng Nhật',
        'Yêu cầu AI kể một câu chuyện cổ tích vui nhộn'
      ],
      correctIndex: 0,
      explanation: 'Tuyệt đối không chia sẻ dữ liệu cá nhân hay bí mật gia đình vào các công cụ AI trực tuyến.'
    },
    {
      id: 10,
      question: 'Mục tiêu của việc học và làm quen với AI từ lứa tuổi tiểu học là:',
      options: [
        'Hiểu bản chất công nghệ, biết cách làm chủ công nghệ an toàn, tự tin trở thành công dân số tương lai',
        'Để không phải đi học ở trường nữa',
        'Để máy tính làm thay tất cả mọi việc',
        'Chỉ để chơi trò chơi điện tử'
      ],
      correctIndex: 0,
      explanation: 'Làm quen sớm với AI giúp các em có tư duy khoa học, tự tin hội nhập và sử dụng công nghệ phục vụ cuộc sống.'
    }
  ]
};
