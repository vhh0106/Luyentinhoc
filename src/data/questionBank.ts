import { QuizQuestion } from '../types';

// Bộ câu hỏi trắc nghiệm độc lập, KHÔNG TRÙNG LẶP giữa các bài học
// Bám sát CTGDPT 2018 Tin học Tiểu học (Lớp 3, 4, 5) - Bộ sách Kết Nối Tri Thức Với Cuộc Sống
export const QUESTION_BANK: Record<string, QuizQuestion[]> = {
  // ============================================================================
  // 1. LUYỆN GÕ PHÍM (8 bài x 4 câu = 32 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  typing: [
    // Bài 1: Hàng phím cơ sở
    {
      id: 1,
      question: 'Hai phím nào trên hàng phím cơ sở có gờ nổi nhỏ để giúp em đặt đúng hai ngón tay trỏ mà không cần nhìn bàn phím?',
      options: ['Phím A và Phím L', 'Phím F và Phím J', 'Phím G và Phím H', 'Phím D và Phím K'],
      correctIndex: 1,
      explanation: 'Phím F (ngón trỏ trái) và Phím J (ngón trỏ phải) có gờ nổi định vị chuẩn cho 10 ngón tay.'
    },
    {
      id: 2,
      question: 'Hàng phím cơ sở (hàng phím xuất phát) gồm các phím chữ nào theo thứ tự từ trái sang phải?',
      options: ['Q W E R T Y U I O P', 'A S D F G H J K L ;', 'Z X C V B N M , . /', '1 2 3 4 5 6 7 8 9 0'],
      correctIndex: 1,
      explanation: 'Hàng phím cơ sở nằm ở giữa khu vực phím chữ, gồm A, S, D, F, G, H, J, K, L, ;.'
    },
    {
      id: 3,
      question: 'Trên hàng phím cơ sở, bốn ngón tay trái (út, áp út, giữa, trỏ) đặt lần lượt lên các phím nào?',
      options: ['A, S, D, F', 'Q, W, E, R', 'Z, X, C, V', 'J, K, L, ;'],
      correctIndex: 0,
      explanation: 'Tay trái đặt chuẩn tại hàng cơ sở: Ngón út (A), Ngón áp út (S), Ngón giữa (D), Ngón trỏ (F).'
    },
    {
      id: 4,
      question: 'Trên hàng phím cơ sở, ngón trỏ tay trái ngoài phím F còn phụ trách thêm phím chữ nào ngay bên cạnh?',
      options: ['Phím G', 'Phím H', 'Phím S', 'Phím A'],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay trái phụ trách cả phím F và vươn sang phải một phím để gõ phím G.'
    },

    // Bài 2: Hàng phím trên
    {
      id: 5,
      question: 'Hàng phím trên nằm ngay phía trên hàng phím cơ sở gồm những chữ cái nào?',
      options: ['Q W E R T Y U I O P', 'A S D F G H J K L', 'Z X C V B N M', 'F1 F2 F3 F4 F5'],
      correctIndex: 0,
      explanation: 'Hàng phím trên gồm 10 phím chữ cái Q, W, E, R, T, Y, U, I, O, P.'
    },
    {
      id: 6,
      question: 'Để gõ phím E trên hàng phím trên, em vươn ngón tay nào từ hàng phím cơ sở lên?',
      options: ['Ngón giữa tay trái (từ phím D vươn lên)', 'Ngón út tay trái', 'Ngón cái tay phải', 'Ngón út tay phải'],
      correctIndex: 0,
      explanation: 'Ngón giữa tay trái đặt ở phím D sẽ vươn lên trên để gõ phím E rồi thu về phím D.'
    },
    {
      id: 7,
      question: 'Hai phím R và T trên hàng phím trên do ngón tay nào phụ trách?',
      options: ['Ngón trỏ tay trái', 'Ngón út tay trái', 'Ngón giữa tay phải', 'Ngón áp út tay phải'],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay trái phụ trách cả hai phím R và T ở hàng phím trên.'
    },
    {
      id: 8,
      question: 'Hai phím Y và U trên hàng phím trên do ngón tay nào phụ trách?',
      options: ['Ngón trỏ tay phải', 'Ngón út tay phải', 'Ngón cái tay trái', 'Ngón giữa tay trái'],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay phải từ phím J vươn lên để gõ phím U và phím Y.'
    },

    // Bài 3: Hàng phím dưới
    {
      id: 9,
      question: 'Hàng phím dưới nằm ngay phía dưới hàng phím cơ sở gồm các phím nào?',
      options: ['Z X C V B N M , . /', 'Q W E R T Y U I O P', 'A S D F G H J K L ;', '1 2 3 4 5 6 7 8 9 0'],
      correctIndex: 0,
      explanation: 'Hàng phím dưới chứa các chữ cái Z, X, C, V, B, N, M và các dấu phẩy, chấm, gạch chéo.'
    },
    {
      id: 10,
      question: 'Sau khi vươn ngón tay xuống gõ một phím ở hàng phím dưới, ngón tay cần làm gì ngay sau đó?',
      options: ['Thu ngay về vị trí xuất phát trên hàng phím cơ sở', 'Giữ nguyên ở hàng phím dưới', 'Nhấc hẳn tay ra khỏi bàn phím', 'Đặt lên phím cách'],
      correctIndex: 0,
      explanation: 'Nguyên tắc gõ 10 ngón: Sau khi gõ phím ở hàng trên hoặc hàng dưới, ngón tay luôn thu về hàng cơ sở.'
    },
    {
      id: 11,
      question: 'Trên hàng phím dưới, hai phím V và B do ngón tay nào phụ trách?',
      options: ['Ngón trỏ tay trái', 'Ngón út tay trái', 'Ngón áp út tay phải', 'Ngón giữa tay phải'],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay trái từ phím F đưa xuống gõ phím V và phím B.'
    },
    {
      id: 12,
      question: 'Trên hàng phím dưới, hai phím N và M do ngón tay nào phụ trách?',
      options: ['Ngón trỏ tay phải', 'Ngón út tay phải', 'Ngón giữa tay trái', 'Ngón cái tay phải'],
      correctIndex: 0,
      explanation: 'Ngón trỏ tay phải từ phím J đưa xuống gõ phím N và phím M.'
    },

    // Bài 4: Hàng phím số
    {
      id: 13,
      question: 'Hàng phím số (1, 2, 3, ..., 9, 0) nằm ở vị trí nào trong khu vực chính của bàn phím?',
      options: ['Nằm ngay phía trên hàng phím trên (QWERTY)', 'Nằm dưới cùng bàn phím', 'Nằm ở giữa hàng cơ sở và hàng dưới', 'Nằm ở mặt sau màn hình'],
      correctIndex: 0,
      explanation: 'Hàng phím số nằm phía trên hàng QWERTY, gồm các chữ số từ 1 đến 9 và số 0.'
    },
    {
      id: 14,
      question: 'Khi gõ chữ số theo quy tắc 10 ngón, phím số 1 do ngón tay nào phụ trách?',
      options: ['Ngón út tay trái', 'Ngón trỏ tay trái', 'Ngón cái tay phải', 'Ngón giữa tay phải'],
      correctIndex: 0,
      explanation: 'Ngón út tay trái vươn từ phím A lên hàng số để gõ phím số 1.'
    },
    {
      id: 15,
      question: 'Trên hàng phím số, phím số 0 do ngón tay nào phụ trách?',
      options: ['Ngón út tay phải', 'Ngón trỏ tay phải', 'Ngón út tay trái', 'Ngón cái tay trái'],
      correctIndex: 0,
      explanation: 'Ngón út tay phải phụ trách phím số 0 ở cuối hàng phím số.'
    },
    {
      id: 16,
      question: 'Phím dài nhất nằm ở hàng dưới cùng của bàn phím là phím gì và dùng ngón nào để nhấn?',
      options: ['Phím cách (Spacebar) - dùng hai ngón tay cái', 'Phím Enter - dùng ngón út', 'Phím Shift - dùng ngón giữa', 'Phím Backspace - dùng ngón trỏ'],
      correctIndex: 0,
      explanation: 'Phím cách (Spacebar) dùng để tạo khoảng trống giữa các chữ, do hai ngón cái đảm nhiệm.'
    },

    // Bài 5: Phím Shift và ký tự đặc biệt
    {
      id: 17,
      question: 'Để gõ một chữ cái IN HOA bằng phím Shift, em phối hợp hai tay như thế nào cho đúng chuẩn?',
      options: [
        'Một tay nhấn giữ phím Shift, tay kia gõ phím chữ cần viết hoa',
        'Dùng một ngón tay bấm Shift rồi thả ra mới bấm chữ',
        'Nhấn cả hai phím Shift cùng lúc',
        'Bấm phím Space cùng phím chữ'
      ],
      correctIndex: 0,
      explanation: 'Khi gõ chữ bên tay phải thì ngón út tay trái giữ Shift, và ngược lại.'
    },
    {
      id: 18,
      question: 'Để gõ các ký hiệu nằm ở nửa trên của phím số (như !, @, #, $, %), em cần nhấn giữ phím nào khi gõ phím số đó?',
      options: ['Phím Shift', 'Phím Caps Lock', 'Phím Ctrl', 'Phím Tab'],
      correctIndex: 0,
      explanation: 'Giữ phím Shift + phím số sẽ xuất hiện ký tự đặc biệt in ở phía trên của phím số đó (ví dụ Shift + 1 = !).'
    },
    {
      id: 19,
      question: 'Phím nào trên bàn phím khi bật đèn sáng sẽ giúp em gõ toàn bộ chữ cái đều là chữ IN HOA mà không cần giữ phím Shift?',
      options: ['Phím Caps Lock', 'Phím Spacebar', 'Phím Esc', 'Phím Delete'],
      correctIndex: 0,
      explanation: 'Phím Caps Lock dùng để bật/tắt chế độ viết hoa liên tục.'
    },
    {
      id: 20,
      question: 'Khi muốn gõ dấu chấm hỏi (?) nằm ở phía trên phím dấu gạch chéo (/), em thao tác thế nào?',
      options: ['Giữ phím Shift (bên trái) + nhấn phím /', 'Nhấn phím Ctrl + /', 'Nhấn phím Alt + /', 'Chỉ nhấn phím /'],
      correctIndex: 0,
      explanation: 'Vì dấu ? nằm ở nửa trên của phím /, em cần giữ phím Shift kết hợp nhấn phím /.'
    },

    // Bài 6: Từ vựng tiếng Anh Tin học
    {
      id: 21,
      question: 'Trong tiếng Anh tin học, từ "Keyboard" có nghĩa là bộ phận nào của máy tính?',
      options: ['Bàn phím máy tính', 'Màn hình máy tính', 'Chuột máy tính', 'Máy in'],
      correctIndex: 0,
      explanation: 'Keyboard là bàn phím, Mouse là chuột, Screen/Monitor là màn hình.'
    },
    {
      id: 22,
      question: 'Khi gõ liên tiếp nhiều từ trên một dòng, giữa hai từ liền nhau cần có mấy khoảng trắng (dấu cách)?',
      options: ['Đúng 1 khoảng trắng (1 lần nhấn phím Space)', '3 khoảng trắng', 'Không cần khoảng trắng nào', '5 khoảng trắng'],
      correctIndex: 0,
      explanation: 'Quy tắc chuẩn soạn thảo: Giữa hai từ chỉ gõ đúng 1 dấu cách.'
    },
    {
      id: 23,
      question: 'Phím Backspace (có mũi tên trỏ sang trái ←) dùng để làm gì khi em gõ nhầm một chữ cái?',
      options: ['Xóa ký tự nằm ngay bên TRÁI con trỏ soạn thảo', 'Xóa toàn bộ trang văn bản', 'Tắt màn hình máy tính', 'Xuống dòng mới'],
      correctIndex: 0,
      explanation: 'Phím Backspace giúp xóa lùi ký tự vừa gõ sai ở ngay bên trái con trỏ.'
    },
    {
      id: 24,
      question: 'Phím Delete trên bàn phím khác với phím Backspace ở điểm nào?',
      options: ['Phím Delete xóa ký tự nằm ngay bên PHẢI con trỏ soạn thảo', 'Phím Delete dùng để viết hoa', 'Phím Delete dùng để tạo khoảng trắng', 'Phím Delete dùng để lưu bài'],
      correctIndex: 0,
      explanation: 'Backspace xóa bên trái con trỏ, còn Delete xóa ký tự bên phải con trỏ.'
    },

    // Bài 7: Gõ câu ngắn hoàn chỉnh
    {
      id: 25,
      question: 'Theo quy tắc gõ văn bản chuẩn, dấu chấm (.) hoặc dấu phẩy (,) cuối câu được đặt như thế nào?',
      options: [
        'Gõ sát ngay vào chữ đứng trước nó, sau đó mới nhấn phím cách (Space)',
        'Nhấn phím cách rồi mới gõ dấu chấm',
        'Đặt dấu chấm ở đầu dòng tiếp theo',
        'Không cần dùng dấu câu'
      ],
      correctIndex: 0,
      explanation: 'Dấu chấm, dấu phẩy luôn đặt sát vào từ đứng trước và có một khoảng trắng ở phía sau.'
    },
    {
      id: 26,
      question: 'Chữ cái đầu tiên của một câu mới hoặc tên riêng cần được trình bày như thế nào?',
      options: ['Viết hoa chữ cái đầu tiên', 'Viết chữ thường toàn bộ', 'Viết bằng chữ số', 'Gạch bỏ chữ đầu tiên'],
      correctIndex: 0,
      explanation: 'Đầu câu, sau dấu chấm và tên riêng phải luôn viết hoa chữ cái đầu.'
    },
    {
      id: 27,
      question: 'Đơn vị WPM (Words Per Minute) hiển thị khi luyện gõ phím có ý nghĩa là gì?',
      options: ['Tốc độ gõ phím tính bằng số từ gõ được trong một phút', 'Số lần bấm nhầm phím', 'Nhiệt độ của bàn phím', 'Độ sáng của màn hình'],
      correctIndex: 0,
      explanation: 'WPM (Words Per Minute) đo tốc độ gõ phím của em nhanh hay chậm.'
    },
    {
      id: 28,
      question: 'Khi bắt đầu học gõ 10 ngón, yếu tố nào quan trọng hơn giữa "Gõ thật nhanh" và "Gõ đúng ngón, chính xác"?',
      options: ['Gõ đúng ngón tay và chính xác trước, tốc độ sẽ tăng dần sau', 'Đập bàn phím thật nhanh bằng 2 ngón trỏ', 'Nhìn chằm chằm vào bàn phím không nhìn màn hình', 'Bỏ qua các dấu câu'],
      correctIndex: 0,
      explanation: 'Rèn thói quen đặt đúng ngón và gõ chính xác sẽ giúp em tăng tốc độ bền vững mà không bị sai lỗi.'
    },

    // Bài 8: Gõ đoạn văn hoàn chỉnh
    {
      id: 29,
      question: 'Khi đang gõ đoạn văn bản và muốn kết thúc đoạn hiện tại để xuống dòng bắt đầu đoạn mới, em nhấn phím nào?',
      options: ['Phím Enter', 'Phím Esc', 'Phím Caps Lock', 'Phím F1'],
      correctIndex: 0,
      explanation: 'Phím Enter dùng để ngắt đoạn văn và đưa con trỏ xuống dòng mới.'
    },
    {
      id: 30,
      question: 'Khi gõ một đoạn văn dài chưa hết ý, nếu chữ chạy đến sát lề phải của trang giấy trong phần mềm soạn thảo thì em làm gì?',
      options: ['Cứ tiếp tục gõ bình thường, phần mềm sẽ tự động xuống dòng', 'Phải nhấn phím Enter ở cuối mỗi hàng', 'Phải nhấn phím Space 20 lần', 'Tắt máy mở lại'],
      correctIndex: 0,
      explanation: 'Phần mềm soạn thảo tự động xuống dòng khi hết lề ngang; chỉ nhấn Enter khi thật sự kết thúc đoạn văn.'
    },
    {
      id: 31,
      question: 'Tư thế cổ tay và bàn tay đúng khi gõ đoạn văn dài để không bị mỏi tay là gì?',
      options: ['Thả lỏng vai, cổ tay thẳng tự nhiên, các ngón tay cong nhẹ trên hàng cơ sở', 'Gồng cứng cánh tay và đập mạnh phím', 'Tì chặt cằm lên bàn phím', 'Chỉ dùng một bàn tay gõ cả đoạn văn'],
      correctIndex: 0,
      explanation: 'Thả lỏng vai và giữ cổ tay tự nhiên giúp máu lưu thông tốt, gõ lâu không mỏi.'
    },
    {
      id: 32,
      question: 'Lợi ích toàn diện của việc thành thạo gõ 10 ngón không nhìn bàn phím (Touch Typing) là gì?',
      options: ['Mắt nhìn thẳng màn hình để phát hiện lỗi ngay, tốc độ soạn bài nhanh và bảo vệ cột sống cổ', 'Không cần học chính tả nữa', 'Làm bàn phím phát ra nhạc', 'Máy tính không cần cắm điện'],
      correctIndex: 0,
      explanation: 'Gõ 10 ngón giúp mắt tập trung vào văn bản trên màn hình, phát hiện lỗi tức thì và giữ tư thế ngồi thẳng.'
    }
  ],

  // ============================================================================
  // 2. GÕ TIẾNG VIỆT (7 bài x 4 câu = 28 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  vietnameseTyping: [
    // Bài 1: Dấu thanh cơ bản
    {
      id: 1,
      question: 'Trong kiểu gõ Telex, để gõ dấu SẮC (/) và dấu HUYỀN (\\), em dùng cặp phím nào?',
      options: ['Sắc = S, Huyền = F', 'Sắc = F, Huyền = S', 'Sắc = R, Huyền = X', 'Sắc = 1, Huyền = 2'],
      correctIndex: 0,
      explanation: 'Quy tắc Telex chuẩn: phím S là dấu Sắc, phím F là dấu Huyền.'
    },
    {
      id: 2,
      question: 'Trong kiểu gõ Telex, để gõ dấu HỎI (?) và dấu NGÃ (~), em dùng cặp phím nào?',
      options: ['Hỏi = R, Ngã = X', 'Hỏi = J, Ngã = S', 'Hỏi = F, Ngã = R', 'Hỏi = 3, Ngã = 4'],
      correctIndex: 0,
      explanation: 'Quy tắc Telex chuẩn: phím R là dấu Hỏi, phím X là dấu Ngã.'
    },
    {
      id: 3,
      question: 'Trong kiểu gõ Telex, để gõ dấu NẶNG (.), em nhấn phím chữ nào?',
      options: ['Phím J', 'Phím Z', 'Phím W', 'Phím K'],
      correctIndex: 0,
      explanation: 'Trong kiểu gõ Telex, phím J dùng để bỏ dấu Nặng (.).'
    },
    {
      id: 4,
      question: 'Theo quy tắc gõ tiếng Việt chuẩn, em nên gõ các chữ cái và dấu thanh theo trình tự nào?',
      options: ['Gõ hết các chữ cái của từ rồi mới gõ phím dấu thanh ở cuối từ', 'Gõ dấu thanh trước rồi mới gõ chữ cái', 'Gõ dấu cách trước khi gõ dấu thanh', 'Bấm phím Enter trước khi bỏ dấu'],
      correctIndex: 0,
      explanation: 'Gõ chữ cái trước rồi bỏ dấu thanh ở cuối từ giúp phần mềm tự động đặt dấu đúng vị trí nguyên âm.'
    },

    // Bài 2: Chữ cái có mũ (Â, Ê, Ô)
    {
      id: 5,
      question: 'Trong kiểu gõ Telex, để gõ được chữ "â", em gõ liên tiếp hai phím nào?',
      options: ['a + a (aa)', 'a + w (aw)', 'a + s (as)', 'a + e (ae)'],
      correctIndex: 0,
      explanation: 'Gõ đúp hai chữ a liên tiếp (aa) sẽ tạo thành chữ â có mũ.'
    },
    {
      id: 6,
      question: 'Trong kiểu gõ Telex, để gõ được chữ "ê" và chữ "ô", em gõ như thế nào?',
      options: ['ee để được ê, oo để được ô', 'ew để được ê, ow để được ô', 'es để được ê, os để được ô', 'ed để được ê, od để được ô'],
      correctIndex: 0,
      explanation: 'Trong Telex, các chữ cái có nón/mũ (â, ê, ô) đều được gõ bằng cách lặp lại chính chữ cái đó: aa, ee, oo.'
    },
    {
      id: 7,
      question: 'Để gõ từ "cây" theo kiểu Telex, dãy phím đúng cần gõ là gì?',
      options: ['c + a + a + y (caay)', 'c + a + w + y (cawy)', 'c + a + s + y (casy)', 'c + e + e + y (ceey)'],
      correctIndex: 0,
      explanation: 'Gõ c-a-a-y (hoặc c-a-y-a) sẽ tạo thành từ "cây".'
    },
    {
      id: 8,
      question: 'Để gõ từ "trường" hay "cô giáo", chữ "cô" trong kiểu Telex được gõ bằng những phím nào?',
      options: ['c + o + o (coo)', 'c + o + w (cow)', 'c + o + s (cos)', 'c + o + f (cof)'],
      correctIndex: 0,
      explanation: 'c + o + o = cô (hai chữ o liên tiếp tạo chữ ô).'
    },

    // Bài 3: Chữ cái có móc (Ă, Ơ, Ư)
    {
      id: 9,
      question: 'Trong kiểu gõ Telex, phím chữ nào dùng để thêm dấu móc tạo thành các chữ ă, ơ, ư?',
      options: ['Phím W', 'Phím Q', 'Phím Z', 'Phím J'],
      correctIndex: 0,
      explanation: 'Phím W trong Telex dùng để tạo dấu á (aw -> ă) và dấu móc (ow -> ơ, uw -> ư).'
    },
    {
      id: 10,
      question: 'Để gõ từ "trăng" theo kiểu Telex, em gõ dãy phím nào sau đây?',
      options: ['t + r + a + w + n + g (trawng)', 't + r + a + a + n + g (traang)', 't + r + a + s + n + g (trasng)', 't + r + a + f + n + g (trafng)'],
      correctIndex: 0,
      explanation: 'a + w = ă, nên gõ trawng sẽ được chữ "trăng".'
    },
    {
      id: 11,
      question: 'Để gõ từ "mơ ước" theo kiểu Telex, từ "mơ" được gõ như thế nào?',
      options: ['m + o + w (mow)', 'm + o + o (moo)', 'm + o + r (mor)', 'm + o + j (moj)'],
      correctIndex: 0,
      explanation: 'o + w = ơ, vì vậy m + o + w tạo thành chữ "mơ".'
    },
    {
      id: 12,
      question: 'Trong kiểu gõ Telex, chuỗi phím nào sau đây tạo thành từ "Trường"?',
      options: ['Truwowngf', 'Truoongf', 'Truongf', 'Traawngf'],
      correctIndex: 0,
      explanation: 'uw = ư, ow = ơ, f = dấu huyền -> Truwowngf = Trường.'
    },

    // Bài 4: Chữ Đ và từ ghép tiếng Việt
    {
      id: 13,
      question: 'Trong kiểu gõ Telex, để gõ được chữ "đ" (hoặc "Đ"), em nhấn phím nào?',
      options: ['Gõ hai lần phím d (dd)', 'Gõ d + w (dw)', 'Gõ d + s (ds)', 'Gõ d + f (df)'],
      correctIndex: 0,
      explanation: 'Gõ hai chữ d liên tiếp (dd) sẽ tạo ra chữ đ.'
    },
    {
      id: 14,
      question: 'Để gõ từ "đồng đội" theo kiểu Telex, chữ "đồng" được gõ bằng chuỗi phím nào?',
      options: ['ddoongf', 'doongf', 'ddowngf', 'ddongf'],
      correctIndex: 0,
      explanation: 'dd = đ, oo = ô, ng, f = dấu huyền -> ddoongf = đồng.'
    },
    {
      id: 15,
      question: 'Nếu em lỡ gõ nhầm dấu thanh và muốn xóa riêng dấu thanh vừa bỏ (theo kiểu Telex), phím nào có tác dụng xóa dấu?',
      options: ['Phím Z', 'Phím M', 'Phím P', 'Phím L'],
      correctIndex: 0,
      explanation: 'Trong kiểu gõ Telex, phím Z dùng để xóa dấu thanh của từ đang gõ.'
    },
    {
      id: 16,
      question: 'Trong kiểu gõ VNI (gõ dấu bằng phím số), để có chữ "đ" và dấu Sắc, người ta gõ phím số nào?',
      options: ['d + 9 để được đ, phím 1 để được dấu Sắc', 'd + 1 để được đ, phím 9 để được dấu Sắc', 'd + 5 để được đ', 'd + 0 để được đ'],
      correctIndex: 0,
      explanation: 'Trong kiểu VNI: 1=Sắc, 2=Huyền, 3=Hỏi, 4=Ngã, 5=Nặng, 6=Mũ, 7=Móc, 8=Trăng, 9=Gạch ngang chữ đ.'
    },

    // Bài 5: Gõ câu ca dao, tục ngữ
    {
      id: 17,
      question: 'Phần mềm nào cài trên máy tính giúp chúng ta gõ được chữ tiếng Việt có dấu?',
      options: ['Unikey (hoặc EVKey)', 'Microsoft Paint', 'Windows Calculator', 'File Explorer'],
      correctIndex: 0,
      explanation: 'Unikey là bộ gõ tiếng Việt tiêu chuẩn giúp chuyển đổi tổ hợp phím Telex/VNI thành chữ có dấu.'
    },
    {
      id: 18,
      question: 'Biểu tượng của phần mềm Unikey ở góc dưới bên phải màn hình (Taskbar) phải hiển thị chữ gì để gõ được tiếng Việt?',
      options: ['Chữ V màu đỏ', 'Chữ E màu xanh', 'Chữ X màu xám', 'Hình chiếc loa'],
      correctIndex: 0,
      explanation: 'Chữ V (Việt Nam) là chế độ gõ tiếng Việt; chữ E (English) là chế độ tắt gõ dấu.'
    },
    {
      id: 19,
      question: 'Trong phần mềm Unikey, bảng mã chuẩn quốc gia được dùng phổ biến nhất để gõ tiếng Việt là bảng mã nào?',
      options: ['Bảng mã Unicode', 'Bảng mã ASCII', 'Bảng mã Binary', 'Bảng mã Hex'],
      correctIndex: 0,
      explanation: 'Bảng mã Unicode kết hợp kiểu gõ Telex là cấu hình chuẩn nhất trên mọi máy tính hiện nay.'
    },
    {
      id: 20,
      question: 'Tổ hợp phím tắt mặc định nào giúp chuyển đổi nhanh giữa chế độ gõ tiếng Việt (V) và tiếng Anh (E) trong Unikey?',
      options: ['Ctrl + Shift (hoặc Alt + Z)', 'Ctrl + C', 'Ctrl + V', 'Alt + F4'],
      correctIndex: 0,
      explanation: 'Nhấn Ctrl + Shift (hoặc Alt + Z) giúp bật/tắt nhanh chế độ gõ tiếng Việt.'
    },

    // Bài 6: Gõ đoạn văn SGK Kết Nối Tri Thức
    {
      id: 21,
      question: 'Để gõ cụm từ "Kết nối tri thức" theo kiểu Telex, chữ "Kết" được gõ như thế nào?',
      options: ['K + e + e + t + s (Keets)', 'K + e + w + t + s (Kewts)', 'K + e + t + f (Ketf)', 'K + e + e + t + j (Keetj)'],
      correctIndex: 0,
      explanation: 'K (viết hoa) + ee (ê) + t + s (dấu sắc) = Kết.'
    },
    {
      id: 22,
      question: 'Để gõ chữ "Cuộc sống" theo kiểu Telex, chuỗi phím nào là đúng?',
      options: ['Cuoocj soongs', 'Cuowcj songs', 'Cuocj soongf', 'Cuoocs soongj'],
      correctIndex: 0,
      explanation: 'oo = ô, j = dấu nặng (Cuộc); oo = ô, s = dấu sắc (sống).'
    },
    {
      id: 23,
      question: 'Khi đang gõ văn bản tiếng Việt mà cần gõ một từ tiếng Anh (ví dụ: "Internet" hoặc "Windows") không muốn bị biến thành chữ có dấu, em làm gì?',
      options: ['Tạm chuyển Unikey sang chữ E hoặc gõ lặp phím dấu để hoàn tác', 'Rút dây bàn phím ra', 'Khởi động lại máy tính', 'Xóa cả bài văn'],
      correctIndex: 0,
      explanation: 'Chuyển nhanh sang chế độ E (Ctrl + Shift) giúp gõ các từ tiếng Anh như Windows, Word không bị dính dấu.'
    },
    {
      id: 24,
      question: 'Vì sao chúng ta nên giữ gìn sự trong sáng của tiếng Việt khi nhắn tin và soạn thảo trên máy tính?',
      options: ['Giúp văn bản rõ ràng, dễ hiểu, thể hiện sự tôn trọng người đọc và yêu tiếng mẹ đẻ', 'Vì gõ không dấu làm hỏng bàn phím', 'Vì máy tính không hiểu tiếng Anh', 'Để tốn nhiều thời gian hơn'],
      correctIndex: 0,
      explanation: 'Viết tiếng Việt đúng chính tả, đủ dấu là nét đẹp văn hóa của học sinh thời đại số.'
    },

    // Bài 7: Đoạn thơ thiếu nhi và thử thách tốc độ
    {
      id: 25,
      question: 'Khi trình bày một bài thơ trên máy tính, sau mỗi câu thơ em nhấn phím nào để xuống dòng câu thơ tiếp theo?',
      options: ['Phím Enter', 'Phím Space', 'Phím Tab', 'Phím Backspace'],
      correctIndex: 0,
      explanation: 'Mỗi câu thơ nằm trên một dòng riêng, vì vậy kết thúc mỗi câu thơ ta nhấn phím Enter.'
    },
    {
      id: 26,
      question: 'Để gõ chữ "Bác Hồ kính yêu" theo kiểu Telex, chữ "Bác" và "Hồ" cần lưu ý điều gì?',
      options: ['Viết hoa chữ cái đầu B và H vì là tên riêng thể hiện lòng kính trọng', 'Viết chữ thường toàn bộ', 'Không bỏ dấu thanh', 'Viết dính liền không có dấu cách'],
      correctIndex: 0,
      explanation: 'Danh từ riêng chỉ tên người phải luôn được viết hoa chữ cái đầu tiên của mỗi tiếng.'
    },
    {
      id: 27,
      question: 'Để gõ từ "ngói mới" theo kiểu Telex, dãy phím nào sau đây là chính xác?',
      options: ['ngois mowis', 'ngoif mowif', 'ngoir mowir', 'ngoois moois'],
      correctIndex: 0,
      explanation: 'ng + o + i + s = ngói; m + ow (ơ) + i + s = mới.'
    },
    {
      id: 28,
      question: 'Khi luyện gõ đoạn thơ dài có dấu tiếng Việt, bí quyết nào giúp em đạt độ chính xác trên 95%?',
      options: ['Đọc nhẩm từng cụm từ, gõ nhịp nhàng đúng tổ hợp Telex và không vội vàng', 'Nhắm mắt bấm đại các phím', 'Chỉ gõ chữ cái bỏ qua hết các dấu thanh', 'Dùng 1 ngón tay duy nhất'],
      correctIndex: 0,
      explanation: 'Đọc theo cụm từ và gõ đều nhịp giúp tay phản xạ chính xác cả chữ cái lẫn dấu thanh.'
    }
  ],

  // ============================================================================
  // 3. LUYỆN CHUỘT (6 bài x 4 câu = 24 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  mouse: [
    // Bài 1: Di chuyển chuột bắt sao
    {
      id: 1,
      question: 'Chuột máy tính thông thường có ba bộ phận điều khiển chính nào ở mặt trên?',
      options: ['Nút chuột trái, nút chuột phải và con lăn (nút cuộn)', 'Màn hình, loa và dây điện', 'Phím Enter, phím Space và phím Esc', 'Ổ cắm USB và đèn pin'],
      correctIndex: 0,
      explanation: 'Mặt trên của chuột gồm nút trái, nút phải và con lăn ở giữa.'
    },
    {
      id: 2,
      question: 'Khi cầm chuột máy tính bằng tay phải, ngón trỏ và ngón giữa của em đặt ở đâu?',
      options: ['Ngón trỏ đặt lên nút chuột trái, ngón giữa đặt lên nút chuột phải', 'Cả hai ngón đều đặt lên nút phải', 'Ngón út đặt lên nút trái', 'Ngón cái đặt lên con lăn'],
      correctIndex: 0,
      explanation: 'Tư thế chuẩn: Ngón trỏ phụ trách nút trái và con lăn, ngón giữa phụ trách nút phải.'
    },
    {
      id: 3,
      question: 'Khi em di chuyển chuột trên mặt bàn sang bên phải, con trỏ chuột (hình mũi tên) trên màn hình sẽ di chuyển đi đâu?',
      options: ['Di chuyển sang bên phải tương ứng theo tay em', 'Di chuyển ngược lại sang bên trái', 'Đứng yên một chỗ', 'Biến mất khỏi màn hình'],
      correctIndex: 0,
      explanation: 'Cảm biến quang học bên dưới chuột giúp con trỏ trên màn hình di chuyển đồng bộ theo hướng tay.'
    },
    {
      id: 4,
      question: 'Vật dụng nào đặt dưới chuột máy tính giúp chuột di chuyển êm ái và cảm biến chính xác hơn?',
      options: ['Miếng lót chuột (Mouse pad)', 'Tấm gương soi bóng loáng', 'Khăn ướt sũng nước', 'Quyển vở gồ ghề'],
      correctIndex: 0,
      explanation: 'Miếng lót chuột phẳng và có độ nhám vừa phải giúp mắt quang học của chuột nhận diện tốt nhất.'
    },

    // Bài 2: Nhấp chuột trái (Click)
    {
      id: 5,
      question: 'Thao tác "Nhấp chuột" (Click chuột trái) được thực hiện như thế nào?',
      options: ['Dùng ngón trỏ nhấn nút chuột trái một lần rồi thả ngón tay ra ngay', 'Nhấn giữ chặt nút chuột trái 10 giây', 'Nhấn nút chuột phải 3 lần', 'Nhấc bổng chuột lên khỏi bàn'],
      correctIndex: 0,
      explanation: 'Nhấp chuột (Click) là nhấn nút trái 1 lần nhẹ nhàng rồi thả ra.'
    },
    {
      id: 6,
      question: 'Tác dụng chính của thao tác nhấp chuột trái một lần vào một biểu tượng trên màn hình là gì?',
      options: ['Để chọn (đánh dấu) biểu tượng hoặc nút lệnh đó', 'Để xóa vĩnh viễn biểu tượng đó', 'Để tắt nguồn máy tính', 'Để đổi mật khẩu máy tính'],
      correctIndex: 0,
      explanation: 'Nhấp chuột trái 1 lần vào biểu tượng dùng để chọn đối tượng hoặc bấm nút lệnh.'
    },
    {
      id: 7,
      question: 'Khi di chuyển con trỏ chuột vào một nút bấm hoặc đường liên kết (Link), con trỏ mũi tên thường biến thành hình gì?',
      options: ['Hình bàn tay chỉ ngón trỏ 👆', 'Hình chiếc kéo cắt', 'Hình thùng rác', 'Hình đám mây'],
      correctIndex: 0,
      explanation: 'Hình bàn tay báo hiệu vị trí đó có thể nhấp chuột vào để thực hiện lệnh hoặc mở trang mới.'
    },
    {
      id: 8,
      question: 'Nếu em cầm chuột bị lệch hoặc đặt chuột trên mặt kính trong suốt thì điều gì thường xảy ra?',
      options: ['Con trỏ chuột di chuyển giật cục hoặc không chạy theo ý muốn', 'Máy tính chạy nhanh gấp đôi', 'Màn hình tự động sáng hơn', 'Loa phát ra tiếng nhạc'],
      correctIndex: 0,
      explanation: 'Tia sáng cảm biến của chuột quang bị xuyên qua mặt kính trong suốt nên cần đặt trên bề mặt không trong suốt.'
    },

    // Bài 3: Phản xạ nhấp chuột nhanh
    {
      id: 9,
      question: 'Để di chuyển con trỏ chuột đi quãng đường dài trên màn hình mà không bị mỏi vai, em nên cử động bộ phận nào?',
      options: ['Đặt nhẹ cổ tay làm điểm tựa và lắc nhẹ cổ tay linh hoạt', 'Nhấc cả cánh tay chạy quanh phòng', 'Cúi đầu sát xuống mặt bàn', 'Dùng hai tay đẩy chuột'],
      correctIndex: 0,
      explanation: 'Tựa nhẹ cổ tay xuống mặt bàn và điều khiển bằng cổ tay giúp thao tác nhanh và chính xác.'
    },
    {
      id: 10,
      question: 'Khi đang di chuyển chuột mà chuột chạm vào mép bàn học không đẩy tiếp được nữa, em xử lý thế nào?',
      options: ['Nhấc nhẹ chuột lên, đặt lại vào giữa miếng lót chuột rồi di chuyển tiếp', 'Đẩy chuột rơi xuống đất', 'Tắt máy tính bật lại', 'Xoay ngược chuột lại'],
      correctIndex: 0,
      explanation: 'Khi nhấc chuột lên khỏi mặt bàn, con trỏ trên màn hình sẽ đứng yên để em đặt chuột lại vị trí thuận lợi.'
    },
    {
      id: 11,
      question: 'Khi con trỏ chuột đang hiển thị vòng tròn xoay nhỏ bên cạnh mũi tên, điều đó báo hiệu gì?',
      options: ['Máy tính đang xử lý công việc, em hãy kiên nhẫn đợi một chút', 'Chuột máy tính đã bị hỏng hoàn toàn', 'Máy tính bị mất điện', 'Bàn phím bị kẹt phím'],
      correctIndex: 0,
      explanation: 'Vòng tròn xoay báo hiệu hệ điều hành đang tải chương trình hoặc xử lý lệnh.'
    },
    {
      id: 12,
      question: 'Tại sao không nên bấm nút chuột quá mạnh hoặc đập chuột xuống mặt bàn?',
      options: ['Vì sẽ làm hỏng công tắc nút bấm và mắt thần cảm biến bên trong chuột', 'Vì làm chữ trên màn hình to ra', 'Vì làm tốn điện của trường', 'Không có ảnh hưởng gì'],
      correctIndex: 0,
      explanation: 'Nút chuột rất nhạy, chỉ cần nhấn nhẹ nhàng để bảo vệ thiết bị bền lâu.'
    },

    // Bài 4: Nhấp đúp chuột (Double-click)
    {
      id: 13,
      question: 'Thao tác "Nhấp đúp chuột" (Double-click) được thực hiện như thế nào?',
      options: ['Nhấn nút chuột trái 2 lần liên tiếp thật nhanh rồi thả ra', 'Nhấn nút chuột trái 1 lần rồi đợi 5 giây nhấn lần nữa', 'Nhấn cùng lúc cả nút trái và nút phải', 'Nhấn nút chuột phải 2 lần'],
      correctIndex: 0,
      explanation: 'Nhấp đúp chuột là bấm nút trái 2 lần liên tiếp nhanh và giữ yên vị trí chuột.'
    },
    {
      id: 14,
      question: 'Trên màn hình nền Desktop, thao tác nhấp đúp chuột vào biểu tượng phần mềm (như Word hoặc Google Chrome) có tác dụng gì?',
      options: ['Khởi động (mở) phần mềm hoặc thư mục đó lên', 'Xóa phần mềm khỏi máy tính', 'Đổi hình nền Desktop', 'Tắt loa máy tính'],
      correctIndex: 0,
      explanation: 'Nhấp đúp chuột vào biểu tượng trên Desktop là cách phổ biến nhất để mở ứng dụng hoặc thư mục.'
    },
    {
      id: 15,
      question: 'Lỗi thường gặp nhất khiến học sinh nhấp đúp chuột nhưng phần mềm chưa mở lên là gì?',
      options: ['Hai lần bấm cách nhau quá chậm hoặc vừa bấm vừa làm chuột bị trượt đi chỗ khác', 'Do chưa bật loa máy tính', 'Do màn hình quá sáng', 'Do chưa nhấn phím Caps Lock'],
      correctIndex: 0,
      explanation: 'Để nhấp đúp thành công, bàn tay cần giữ chuột đứng yên và ngón trỏ bấm 2 nhịp nhanh liên tiếp.'
    },
    {
      id: 16,
      question: 'Trong phần mềm soạn thảo văn bản, khi em nhấp đúp chuột trái vào một từ thì điều gì xảy ra?',
      options: ['Từ đó sẽ được bôi đen (chọn) nhanh chóng', 'Từ đó bị xóa mất', 'Máy tính tự động lưu bài', 'Phông chữ đổi sang màu đỏ'],
      correctIndex: 0,
      explanation: 'Nhấp đúp chuột vào một từ trong văn bản giúp chọn nhanh từ đó để định dạng.'
    },

    // Bài 5: Kéo thả chuột lắp ráp linh kiện
    {
      id: 17,
      question: 'Thao tác "Kéo thả chuột" (Drag and Drop) gồm các bước tuần tự nào?',
      options: [
        'Nhấn và giữ nút chuột trái tại đối tượng -> Di chuyển chuột đến vị trí mới -> Thả nút chuột ra',
        'Nhấp chuột phải -> Nhấc chuột lên cao -> Bấm phím Enter',
        'Lăn con lăn 3 vòng -> Nhấn nút trái',
        'Chỉ di chuyển chuột mà không bấm nút nào'
      ],
      correctIndex: 0,
      explanation: 'Kéo thả chuột: Nhấn giữ nút trái -> Kéo sang đích -> Thả ngón tay.'
    },
    {
      id: 18,
      question: 'Thao tác kéo thả chuột thường được ứng dụng để làm việc gì trên máy tính?',
      options: ['Di chuyển biểu tượng, sắp xếp tệp vào thư mục hoặc vẽ hình trong phần mềm đồ họa', 'Bật nguồn màn hình', 'Gõ chữ tiếng Việt có dấu', 'Tăng giảm âm lượng loa thùng'],
      correctIndex: 0,
      explanation: 'Kéo thả giúp di chuyển cửa sổ, kéo tệp vào thư mục và lắp ghép khối lệnh lập trình.'
    },
    {
      id: 19,
      question: 'Khi đưa con trỏ chuột vào mép viền của một cửa sổ phần mềm và thấy mũi tên hai đầu (↔), em có thể kéo thả để làm gì?',
      options: ['Thay đổi kích thước rộng, hẹp của cửa sổ đó', 'Xóa phần mềm đó', 'Tắt máy tính', 'In tài liệu ra giấy'],
      correctIndex: 0,
      explanation: 'Khi xuất hiện mũi tên 2 đầu ở viền cửa sổ, kéo thả chuột sẽ giúp phóng rộng hoặc thu hẹp cửa sổ.'
    },
    {
      id: 20,
      question: 'Trên máy tính xách tay (Laptop) khi không cắm chuột rời, bộ phận nào thay thế cho chuột máy tính?',
      options: ['Vùng cảm ứng chuột (Touchpad) nằm phía dưới bàn phím', 'Camera phía trên màn hình', 'Nút nguồn của máy', 'Khe cắm tai nghe'],
      correctIndex: 0,
      explanation: 'Touchpad là bàn di chuột cảm ứng tích hợp sẵn trên mọi máy tính xách tay.'
    },

    // Bài 6: Chuột phải, Con lăn & Phân loại
    {
      id: 21,
      question: 'Khi em nhấp nút chuột PHẢI (Right-click) vào một tệp hoặc thư mục, điều gì sẽ xuất hiện?',
      options: ['Bảng chọn ngữ cảnh (Menu) chứa các lệnh như Open, Rename, Copy, Delete', 'Máy tính tự động tắt', 'Màn hình chuyển sang màu đen', 'Bàn phím bị khóa'],
      correctIndex: 0,
      explanation: 'Nhấp chuột phải dùng để mở thực đơn lệnh nhanh (Context Menu) cho đối tượng đang trỏ tới.'
    },
    {
      id: 22,
      question: 'Con lăn (nút cuộn) nằm ở giữa nút chuột trái và nút chuột phải dùng để làm gì?',
      options: ['Cuộn trang văn bản hoặc trang web lên trên và xuống dưới để đọc tiếp nội dung', 'Đổi màu vỏ chuột', 'Xóa sạch dữ liệu trong ổ cứng', 'Chụp ảnh màn hình'],
      correctIndex: 0,
      explanation: 'Lăn nút cuộn lên/xuống giúp xem nội dung các trang tài liệu dài nhanh chóng.'
    },
    {
      id: 23,
      question: 'Để chọn cùng lúc nhiều biểu tượng nằm gần nhau trên màn hình bằng chuột, em làm thế nào?',
      options: ['Kéo thả chuột tạo một khung hình chữ nhật bao quanh các biểu tượng đó', 'Nhấp chuột phải liên tục 10 lần', 'Lăn nút cuộn thật nhanh', 'Rút dây chuột ra cắm lại'],
      correctIndex: 0,
      explanation: 'Kéo thả chuột tạo vùng chọn chữ nhật giúp bôi chọn nhiều tệp tin cùng một lúc.'
    },
    {
      id: 24,
      question: 'Sau khi hoàn thành giờ thực hành trong phòng máy, em nên để chuột và bàn phím như thế nào?',
      options: ['Sắp xếp chuột và bàn phím ngay ngắn, gọn gàng trên mặt bàn trước khi ra về', 'Để chuột treo lơ lửng dưới gầm bàn', 'Tháo rời viên pin chuột mang về', 'Quấn chặt dây chuột quanh màn hình'],
      correctIndex: 0,
      explanation: 'Giữ gìn thiết bị ngăn nắp, gọn gàng sau giờ học là ý thức tốt của học sinh.'
    }
  ],

  // ============================================================================
  // 4. KĨ NĂNG MÁY TÍNH - IC3 (8 bài x 5 câu = 40 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  ic3: [
    // Bài 1: Các bộ phận cơ bản của máy tính để bàn và laptop
    {
      id: 1,
      question: 'Một bộ máy tính để bàn chuẩn gồm 4 bộ phận cơ bản nào?',
      options: ['Thân máy, màn hình, bàn phím và chuột', 'Màn hình, máy in, loa và tai nghe', 'Bàn phím, chuột, ổn áp và quạt điện', 'Thân máy, tivi, tủ lạnh và chuột'],
      correctIndex: 0,
      explanation: 'Theo SGK Tin học 3 Kết Nối Tri Thức, 4 bộ phận cơ bản của máy tính để bàn là: Thân máy, Màn hình, Bàn phím và Chuột.'
    },
    {
      id: 2,
      question: 'Bộ phận nào chứa bộ xử lý trung tâm (CPU) và được ví như "bộ não" điều khiển mọi hoạt động của máy tính?',
      options: ['Thân máy tính (Case)', 'Màn hình máy tính', 'Chuột máy tính', 'Miếng lót chuột'],
      correctIndex: 0,
      explanation: 'Thân máy chứa CPU và bộ nhớ, đóng vai trò là bộ não xử lý mọi thông tin.'
    },
    {
      id: 3,
      question: 'Bộ phận nào của máy tính có hình dạng giống chiếc tivi và dùng để hiển thị kết quả làm việc?',
      options: ['Màn hình (Monitor)', 'Thân máy', 'Bàn phím', 'Ổ đĩa USB'],
      correctIndex: 0,
      explanation: 'Màn hình hiển thị chữ viết, hình ảnh, video để người dùng quan sát.'
    },
    {
      id: 4,
      question: 'Máy tính xách tay (Laptop) và máy tính bảng (Tablet) có ưu điểm nổi bật gì so với máy tính để bàn?',
      options: ['Nhỏ gọn, các bộ phận gắn liền một khối và có pin nên dễ dàng mang theo', 'Nặng hơn máy tính để bàn 10 lần', 'Không có màn hình hiển thị', 'Phải luôn cắm dây điện mới bật sáng được'],
      correctIndex: 0,
      explanation: 'Laptop và máy tính bảng tích hợp gọn nhẹ kèm pin sạc, thuận tiện di chuyển.'
    },
    {
      id: 5,
      question: 'Trên máy tính bảng và điện thoại thông minh, người dùng điều khiển thiết bị chủ yếu bằng cách nào?',
      options: ['Chạm và vuốt ngón tay trực tiếp lên màn hình cảm ứng', 'Phải luôn cắm bàn phím sắt cỡ lớn', 'Dùng điều khiển tivi từ xa', 'Quay tay cầm cơ học'],
      correctIndex: 0,
      explanation: 'Màn hình cảm ứng cho phép thao tác trực tiếp bằng ngón tay hoặc bút cảm ứng.'
    },

    // Bài 2: Thiết bị vào và thiết bị ra (Input & Output)
    {
      id: 6,
      question: 'Thiết bị nào sau đây thuộc nhóm "Thiết bị vào" (tiếp nhận thông tin từ con người đưa vào máy tính)?',
      options: ['Bàn phím, chuột và micro thu âm', 'Màn hình và máy chiếu', 'Loa và tai nghe', 'Máy in giấy'],
      correctIndex: 0,
      explanation: 'Bàn phím (nhập chữ), chuột (điều khiển), micro (thu giọng nói) là các thiết bị đưa thông tin vào.'
    },
    {
      id: 7,
      question: 'Thiết bị nào sau đây thuộc nhóm "Thiết bị ra" (đưa thông tin từ máy tính ra cho con người nhận biết)?',
      options: ['Màn hình, loa, tai nghe và máy in', 'Bàn phím và chuột', 'Máy quét ảnh (Scanner)', 'Webcam ghi hình'],
      correctIndex: 0,
      explanation: 'Màn hình (xuất hình ảnh), loa/tai nghe (xuất âm thanh), máy in (in ra giấy) là thiết bị ra.'
    },
    {
      id: 8,
      question: 'Trong giờ học trực tuyến, thiết bị nào giúp thu hình ảnh khuôn mặt của em truyền vào máy tính để thầy cô nhìn thấy?',
      options: ['Camera / Webcam', 'Loa máy tính', 'Máy in', 'Chuột quang'],
      correctIndex: 0,
      explanation: 'Webcam (Camera) là thiết bị vào có nhiệm vụ thu nhận hình ảnh đưa vào máy tính.'
    },
    {
      id: 9,
      question: 'Vì sao màn hình cảm ứng trên máy tính bảng được gọi là thiết bị "Vừa vào, vừa ra"?',
      options: ['Vì nó vừa hiển thị hình ảnh ra cho em xem, vừa nhận thao tác chạm tay của em đưa vào máy', 'Vì nó có 2 dây cắm điện', 'Vì nó nặng gấp đôi màn hình thường', 'Vì nó không dùng điện'],
      correctIndex: 0,
      explanation: 'Màn hình cảm ứng kết hợp cả chức năng hiển thị (Output) và nhận lệnh chạm (Input).'
    },
    {
      id: 10,
      question: 'Để nghe bài giảng có âm thanh trong phòng tin học mà không làm ồn đến các bạn xung quanh, em nên dùng thiết bị ra nào?',
      options: ['Tai nghe (Headphone)', 'Loa thùng công suất lớn', 'Máy chiếu', 'Máy in'],
      correctIndex: 0,
      explanation: 'Tai nghe giúp truyền âm thanh riêng cho người đeo, giữ trật tự chung cho phòng học.'
    },

    // Bài 3: Tư thế ngồi học và quy tắc an toàn điện phòng máy
    {
      id: 11,
      question: 'Khoảng cách hợp lý từ mắt em đến màn hình máy tính khi ngồi học là bao nhiêu để bảo vệ mắt không bị cận thị?',
      options: ['Từ 50 cm đến 80 cm', 'Dưới 10 cm (ghé sát mắt vào màn hình)', 'Cách xa 5 mét', 'Tì trán trực tiếp vào màn hình'],
      correctIndex: 0,
      explanation: 'Khoảng cách 50 - 80 cm cùng tư thế lưng thẳng giúp bảo vệ thị lực và cột sống.'
    },
    {
      id: 12,
      question: 'Mỗi lần ngồi học hoặc làm việc liên tục với máy tính, học sinh tiểu học nên giải lao sau khoảng thời gian bao lâu?',
      options: ['Sau mỗi 30 đến 45 phút nên đứng dậy vận động nhẹ và nhìn xa cho mắt nghỉ ngơi', 'Ngồi liên tục 8 tiếng không đứng dậy', 'Cứ 1 phút nghỉ 30 phút', 'Không bao giờ cần nghỉ ngơi'],
      correctIndex: 0,
      explanation: 'Nghỉ giải lao sau mỗi 30 - 45 phút giúp mắt điều tiết và cơ thể khỏe mạnh.'
    },
    {
      id: 13,
      question: 'Hành động nào sau đây bị NGHIÊM CẤM trong phòng thực hành Tin học để phòng tránh tai nạn điện giật?',
      options: ['Dùng tay ướt chạm vào ổ điện hoặc tự ý cắm, rút dây nguồn máy tính', 'Ngồi ngay ngắn trước máy tính được phân công', 'Báo cho thầy cô khi máy tính không lên nguồn', 'Giữ bàn học khô ráo, sạch sẽ'],
      correctIndex: 0,
      explanation: 'Nước dẫn điện rất mạnh; tuyệt đối không để tay ướt chạm vào thiết bị điện hay tự ý nghịch ổ cắm.'
    },
    {
      id: 14,
      question: 'Vì sao chúng ta không được mang đồ ăn, nước ngọt vào vừa ăn uống vừa dùng máy tính?',
      options: ['Vì nước đổ vào bàn phím, thân máy sẽ gây chập điện và vụn thức ăn làm kẹt hỏng phím', 'Vì máy tính sẽ ăn hết thức ăn', 'Vì màn hình sẽ đổi màu', 'Vì chuột sẽ chạy mất'],
      correctIndex: 0,
      explanation: 'Chất lỏng đổ vào linh kiện điện tử sẽ gây đoản mạch, chập cháy và hỏng máy tính.'
    },
    {
      id: 15,
      question: 'Khi phát hiện dây điện dưới bàn máy tính bị tróc vỏ hoặc có mùi khét, việc đầu tiên em phải làm là gì?',
      options: ['Tránh xa chỗ đó và báo ngay lập tức cho thầy cô giáo hoặc người lớn', 'Lấy tay sờ vào chỗ dây hở xem có nóng không', 'Đổ nước lên dây điện đang cắm', 'Dùng thước sắt chọc vào ổ điện'],
      correctIndex: 0,
      explanation: 'An toàn là trên hết: Không chạm vào thiết bị có dấu hiệu rò điện và báo ngay cho thầy cô.'
    },

    // Bài 4: Bật, tắt máy tính đúng cách và màn hình nền Desktop
    {
      id: 16,
      question: 'Để tắt máy tính an toàn trong hệ điều hành Windows sau khi học xong, em thực hiện thao tác nào?',
      options: ['Nhấp vào nút Start (biểu tượng cửa sổ) -> chọn Power -> chọn Shut down', 'Rút phích cắm điện ra khỏi tường ngay lập tức', 'Đập mạnh vào màn hình', 'Chỉ tắt màn hình còn thân máy để chạy suốt đêm'],
      correctIndex: 0,
      explanation: 'Tắt máy bằng lệnh Shut down giúp máy tính đóng các phần mềm và lưu hệ thống an toàn.'
    },
    {
      id: 17,
      question: 'Màn hình đầu tiên hiện ra sau khi máy tính khởi động xong được gọi là gì?',
      options: ['Màn hình nền (Desktop)', 'Màn hình tắt máy', 'Cửa sổ soạn thảo', 'Thùng rác'],
      correctIndex: 0,
      explanation: 'Màn hình nền (Desktop) chứa các biểu tượng phần mềm (Icons) và thanh tác vụ (Taskbar) ở dưới cùng.'
    },
    {
      id: 18,
      question: 'Thanh ngang nằm dọc ở cạnh dưới cùng của màn hình nền Desktop (có nút Start và đồng hồ) gọi là gì?',
      options: ['Thanh tác vụ (Taskbar)', 'Thanh tiêu đề', 'Thanh công thức', 'Thanh cuộn dọc'],
      correctIndex: 0,
      explanation: 'Thanh tác vụ (Taskbar) hiển thị nút Start, các chương trình đang mở và khay hệ thống.'
    },
    {
      id: 19,
      question: 'Ở góc trên bên phải của mỗi cửa sổ phần mềm luôn có 3 nút điều khiển: Nút dấu nhân (✕) có tác dụng gì?',
      options: ['Đóng (Close) cửa sổ phần mềm đó lại', 'Phóng to cửa sổ toàn màn hình', 'Thu nhỏ cửa sổ xuống thanh Taskbar', 'In màn hình ra giấy'],
      correctIndex: 0,
      explanation: 'Ba nút góc trên bên phải cửa sổ gồm: Thu nhỏ (—), Phóng to (□) và Đóng cửa sổ (✕).'
    },
    {
      id: 20,
      question: 'Lệnh "Restart" trong menu Power của nút Start được dùng khi nào?',
      options: ['Khi cần khởi động lại máy tính (máy tự tắt rồi tự bật lại ngay)', 'Khi muốn cất máy tính vào tủ nghỉ hẳn', 'Khi muốn xóa hết tệp tin', 'Khi muốn mở phần mềm vẽ tranh'],
      correctIndex: 0,
      explanation: 'Restart giúp khởi động lại hệ điều hành khi máy vừa cài đặt phần mềm hoặc hoạt động chậm.'
    },

    // Bài 5: Quản lý tệp và cây thư mục
    {
      id: 21,
      question: 'Trong máy tính, biểu tượng hình "chiếc kẹp hồ sơ màu vàng" dùng để biểu thị đối tượng nào?',
      options: ['Thư mục (Folder)', 'Tệp văn bản Word', 'Trình duyệt Internet', 'Phần mềm nghe nhạc'],
      correctIndex: 0,
      explanation: 'Thư mục (Folder) có biểu tượng màu vàng, dùng để chứa các tệp tin và các thư mục con.'
    },
    {
      id: 22,
      question: 'Một thư mục nằm bên trong một thư mục khác được gọi là gì?',
      options: ['Thư mục con (Subfolder)', 'Thư mục gốc', 'Tệp tin rác', 'Ổ đĩa cứng'],
      correctIndex: 0,
      explanation: 'Thư mục bên ngoài gọi là thư mục mẹ, thư mục nằm bên trong gọi là thư mục con.'
    },
    {
      id: 23,
      question: 'Tên của một tệp tin (File) trong máy tính thường gồm hai phần nào ngăn cách nhau bởi dấu chấm (.)?',
      options: ['Phần tên tệp và phần mở rộng (đuôi tệp), ví dụ: BaiTap.docx', 'Phần họ và phần chữ lót', 'Phần ngày và phần tháng', 'Phần đầu và phần cuối không có dấu chấm'],
      correctIndex: 0,
      explanation: 'Phần tên do người dùng đặt, phần mở rộng (như .docx, .xlsx, .pptx, .jpg) cho biết loại tệp.'
    },
    {
      id: 24,
      question: 'Cách đặt tên thư mục và tệp tin nào sau đây là KHOA HỌC và dễ tìm kiếm nhất cho học sinh?',
      options: ['Đặt tên ngắn gọn, rõ ràng theo môn học hoặc nội dung (ví dụ: TinHoc_Lop4, BaiTap_SoanThao)', 'Đặt tên toàn số ngẫu nhiên như 11111, 99999, abcxyz', 'Đặt trùng tên tất cả là New Folder (1), New Folder (2)', 'Dùng các ký tự cấm như / \\ : * ? " < > |'],
      correctIndex: 0,
      explanation: 'Đặt tên phản ánh đúng nội dung và phân loại theo môn học giúp tra cứu tài liệu nhanh chóng.'
    },
    {
      id: 25,
      question: 'Để tạo một thư mục mới trong cửa sổ quản lý tệp File Explorer, em thực hiện thế nào?',
      options: ['Nhấp chuột phải vào vùng trống -> chọn New -> chọn Folder -> gõ tên thư mục và nhấn Enter', 'Nhấn phím Delete trên bàn phím', 'Đóng cửa sổ File Explorer lại', 'Nhấp đúp vào Thùng rác'],
      correctIndex: 0,
      explanation: 'Chuột phải -> New -> Folder là thao tác chuẩn để tạo thư mục mới.'
    },

    // Bài 6: Sao chép, Đổi tên, Xóa và Tìm kiếm tệp tin
    {
      id: 26,
      question: 'Khi em chọn một thư mục và nhấn phím tắt F2 trên bàn phím, em đang thực hiện thao tác gì?',
      options: ['Đổi tên (Rename) thư mục đó', 'Xóa vĩnh viễn thư mục', 'Sao chép thư mục sang máy khác', 'Mở trình duyệt web'],
      correctIndex: 0,
      explanation: 'Phím F2 (hoặc Chuột phải -> Rename) dùng để sửa lại tên của tệp hoặc thư mục.'
    },
    {
      id: 27,
      question: 'Sự khác nhau giữa lệnh "Sao chép" (Copy - Ctrl + C) và lệnh "Di chuyển" (Cut - Ctrl + X) tệp tin là gì?',
      options: [
        'Copy giữ nguyên tệp ở thư mục cũ và tạo bản sao ở thư mục mới; còn Cut chuyển hẳn tệp sang thư mục mới',
        'Copy làm mất tệp cũ, còn Cut tạo ra 10 tệp mới',
        'Hai lệnh hoàn toàn giống hệt nhau',
        'Cả hai lệnh đều xóa tệp vào thùng rác'
      ],
      correctIndex: 0,
      explanation: 'Copy + Paste tạo thêm một bản sao mới; Cut + Paste di dời tệp từ chỗ cũ sang chỗ mới.'
    },
    {
      id: 28,
      question: 'Khi em lỡ tay xóa nhầm một tệp bài tập quan trọng bằng phím Delete, em có thể vào đâu trên Desktop để khôi phục (Restore) lại?',
      options: ['Thùng rác (Recycle Bin)', 'Trình duyệt Google Chrome', 'Phần mềm máy tính bỏ túi Calculator', 'Cài đặt âm thanh'],
      correctIndex: 0,
      explanation: 'Tệp vừa xóa được lưu tạm trong Recycle Bin; nhấp chuột phải vào tệp chọn Restore sẽ đưa tệp về vị trí cũ.'
    },
    {
      id: 29,
      question: 'Tại sao em KHÔNG ĐƯỢC tự ý xóa hoặc di chuyển các tệp, thư mục của người khác hoặc của hệ thống máy tính?',
      options: ['Vì sẽ làm mất bài học của bạn khác hoặc làm hỏng hệ điều hành khiến máy không chạy được', 'Vì làm chuột máy tính nặng hơn', 'Vì màn hình sẽ bị vỡ', 'Không ảnh hưởng gì cả'],
      correctIndex: 0,
      explanation: 'Tôn trọng dữ liệu của người khác và không xóa tệp hệ thống (như trong ổ C:\\Windows) là nguyên tắc bắt buộc.'
    },
    {
      id: 30,
      question: 'Để tìm nhanh một tệp bài tập trong máy tính khi em nhớ tên tệp nhưng quên mất lưu ở thư mục nào, em dùng công cụ gì trong File Explorer?',
      options: ['Ô tìm kiếm (Search box) ở góc trên bên phải cửa sổ File Explorer', 'Nút tắt máy Shut down', 'Phím Caps Lock', 'Nút chỉnh âm lượng'],
      correctIndex: 0,
      explanation: 'Gõ tên tệp vào ô Search trong File Explorer giúp máy tính tự động rà soát và tìm ra tệp trong vài giây.'
    },

    // Bài 7: Thiết bị lưu trữ (Ổ cứng, USB, Thẻ nhớ)
    {
      id: 31,
      question: 'Trong cửa sổ "This PC", các ổ đĩa cứng bên trong máy tính thường được ký hiệu bằng các chữ cái nào?',
      options: ['Ổ đĩa C:, D:, E:', 'Ổ đĩa 1, 2, 3', 'Ổ đĩa @, #, $', 'Ổ đĩa Word, Excel'],
      correctIndex: 0,
      explanation: 'Hệ điều hành Windows đặt tên các phân vùng ổ đĩa bằng chữ cái kèm dấu hai chấm như C:, D:, E:.'
    },
    {
      id: 32,
      question: 'Ổ đĩa C: (Local Disk C:) trong máy tính thường chứa dữ liệu quan trọng gì nên học sinh hạn chế lưu bài tập lộn xộn vào đó?',
      options: ['Chứa Hệ điều hành Windows và các phần mềm cài đặt của máy tính', 'Không chứa gì cả', 'Chỉ chứa các tệp rác', 'Chỉ dùng để cắm chuột'],
      correctIndex: 0,
      explanation: 'Ổ C: chứa hệ điều hành; học sinh nên lưu bài tập vào thư mục riêng ở ổ D: hoặc E:.'
    },
    {
      id: 33,
      question: 'Thiết bị lưu trữ nhỏ gọn bằng ngón tay cái, cắm vào cổng USB của máy tính để sao chép bài tập mang về nhà gọi là gì?',
      options: ['Ổ đĩa flash USB (thường gọi tắt là USB)', 'Đĩa than cổ điển', 'Bàn phím rời', 'Tai nghe không dây'],
      correctIndex: 0,
      explanation: 'USB Flash Drive là thiết bị lưu trữ di động tiện lợi, dung lượng lớn và dễ sử dụng.'
    },
    {
      id: 34,
      question: 'Đơn vị nào sau đây được dùng để đo DUNG LƯỢNG lưu trữ dữ liệu trong máy tính và USB?',
      options: ['Byte (B), Kilobyte (KB), Megabyte (MB), Gigabyte (GB), Terabyte (TB)', 'Milimét (mm), Centimét (cm), Mét (m)', 'Gam (g), Kilôgam (kg), Tấn', 'Giây, Phút, Giờ'],
      correctIndex: 0,
      explanation: 'Dung lượng bộ nhớ máy tính được đo bằng B, KB, MB, GB, TB.'
    },
    {
      id: 35,
      question: 'Trước khi rút thiết bị USB ra khỏi thân máy tính, em nên chú ý điều gì để không bị hỏng dữ liệu trong USB?',
      options: ['Đóng tất cả các tệp đang mở trong USB và chọn lệnh ngắt kết nối an toàn (Eject)', 'Vừa đang chép dở tệp vừa giật mạnh USB ra ngay', 'Bẻ cong đầu cắm USB', 'Nhúng USB vào nước cho mát'],
      correctIndex: 0,
      explanation: 'Đóng tệp và bấm Eject trước khi rút giúp đảm bảo dữ liệu đã ghi xong hoàn toàn, tránh lỗi hỏng tệp.'
    },

    // Bài 8: Mạng Internet & Trình duyệt tìm kiếm thông tin
    {
      id: 36,
      question: 'Mạng Internet mang lại lợi ích thiết thực nào cho việc học tập của học sinh tiểu học?',
      options: ['Tra cứu kiến thức khoa học, học ngoại ngữ, xem video bài giảng và trao đổi bài học', 'Giúp máy tính tự làm bài kiểm tra không cần học', 'Để thức khuya chơi game suốt đêm', 'Làm cho sách giáo khoa biến mất'],
      correctIndex: 0,
      explanation: 'Internet là thư viện tri thức toàn cầu hỗ trợ đắc lực cho việc tự học và khám phá thế giới.'
    },
    {
      id: 37,
      question: 'Để mở và xem các trang web trên Internet, máy tính cần sử dụng phần mềm thuộc loại nào?',
      options: ['Trình duyệt web (Web Browser) như Google Chrome, Microsoft Edge, Cốc Cốc, Firefox', 'Phần mềm bảng tính Excel', 'Phần mềm gõ tiếng Việt Unikey', 'Phần mềm vẽ Paint'],
      correctIndex: 0,
      explanation: 'Trình duyệt web là cánh cửa giúp người dùng truy cập vào các trang web trên mạng Internet.'
    },
    {
      id: 38,
      question: 'Khi muốn tìm hiểu về "Vịnh Hạ Long" trên máy tìm kiếm Google, cụm từ "Vịnh Hạ Long" mà em gõ vào ô tìm kiếm được gọi là gì?',
      options: ['Từ khóa tìm kiếm (Keyword)', 'Mật khẩu tài khoản', 'Tên ổ đĩa cứng', 'Phần mở rộng của tệp'],
      correctIndex: 0,
      explanation: 'Từ khóa (Keyword) càng cụ thể và chính xác thì kết quả tìm kiếm càng sát với nội dung em cần.'
    },
    {
      id: 39,
      question: 'Trên trình duyệt web, nút biểu tượng "Ngôi sao ⭐" nằm ở cuối thanh địa chỉ trang web có chức năng gì?',
      options: ['Đánh dấu trang web yêu thích (Bookmark) để lần sau mở lại nhanh mà không cần tìm lại', 'Xóa trang web đó khỏi Internet', 'Tắt nguồn máy tính', 'In trang web ra máy in'],
      correctIndex: 0,
      explanation: 'Bookmark (Dấu trang) giúp lưu lại địa chỉ các trang web học tập bổ ích.'
    },
    {
      id: 40,
      question: 'Khi tải một bức ảnh từ trên mạng Internet về máy tính để làm bài trình chiếu, em nên lưu bức ảnh đó như thế nào?',
      options: ['Chọn "Save image as...", lưu vào đúng thư mục bài học và đặt tên tệp rõ nghĩa', 'Lưu lung tung khắp nơi không đặt tên', 'Tải các tệp có đuôi .exe lạ không rõ nguồn gốc', 'Chụp ảnh bằng máy in'],
      correctIndex: 0,
      explanation: 'Lưu ảnh vào đúng thư mục dự án với tên rõ ràng giúp em dễ dàng chèn vào Word hoặc PowerPoint.'
    }
  ],

  // ============================================================================
  // 5. SOẠN THẢO WORD (6 bài x 4 câu = 24 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  word: [
    // Bài 1: Giao diện Word và nhập văn bản
    {
      id: 1,
      question: 'Biểu tượng của phần mềm soạn thảo văn bản Microsoft Word thường có màu gì và chữ cái gì?',
      options: ['Màu xanh dương có chữ W màu trắng', 'Màu xanh lá cây có chữ X', 'Màu cam đỏ có chữ P', 'Màu vàng hình chiếc cặp'],
      correctIndex: 0,
      explanation: 'Microsoft Word có biểu tượng chữ W nền xanh dương đặc trưng.'
    },
    {
      id: 2,
      question: 'Trong cửa sổ Microsoft Word, vạch thẳng đứng nhấp nháy trên trang giấy trắng báo hiệu vị trí chữ sẽ xuất hiện khi gõ gọi là gì?',
      options: ['Con trỏ soạn thảo', 'Con trỏ chuột', 'Thanh cuộn ngang', 'Thước đo lề'],
      correctIndex: 0,
      explanation: 'Con trỏ soạn thảo (dạng vạch đứng | nhấp nháy) cho biết vị trí hiện tại để nhập hoặc xóa ký tự.'
    },
    {
      id: 3,
      question: 'Hệ thống các thẻ lệnh nằm ngang phía trên cửa sổ Word (như Home, Insert, Layout, View) được gọi là gì?',
      options: ['Dải lệnh (Ribbon)', 'Thanh trạng thái (Status bar)', 'Màn hình nền Desktop', 'Thùng rác Recycle Bin'],
      correctIndex: 0,
      explanation: 'Dải lệnh Ribbon tập hợp các công cụ định dạng, chèn ảnh, bố cục trang theo từng nhóm trực quan.'
    },
    {
      id: 4,
      question: 'Thẻ lệnh nào trên dải Ribbon chứa các công cụ định dạng chữ cơ bản nhất như Phông chữ, Cỡ chữ, In đậm, Căn lề?',
      options: ['Thẻ Home', 'Thẻ Insert', 'Thẻ View', 'Thẻ Help'],
      correctIndex: 0,
      explanation: 'Thẻ Home là thẻ mặc định chứa nhóm lệnh Font (chữ) và Paragraph (đoạn văn).'
    },

    // Bài 2: Định dạng Phông chữ, Cỡ chữ và Màu chữ
    {
      id: 5,
      question: 'Trước khi bấm nút đổi phông chữ, cỡ chữ hoặc màu chữ cho một dòng tiêu đề đã gõ, bước ĐẦU TIÊN em bắt buộc phải làm là gì?',
      options: ['Kéo thả chuột bôi đen (chọn) dòng tiêu đề cần định dạng', 'Nhấn phím Delete xóa dòng tiêu đề đi', 'Đóng phần mềm Word lại', 'Nhấn phím Enter 5 lần'],
      correctIndex: 0,
      explanation: 'Nguyên tắc vàng trong Word: "Chọn đối tượng trước, thực hiện lệnh định dạng sau".'
    },
    {
      id: 6,
      question: 'Các phông chữ (Font) nào sau đây hiển thị tiếng Việt có dấu rõ ràng, chuẩn đẹp trong chương trình học?',
      options: ['Times New Roman, Arial, Calibri, Tahoma', 'Wingdings và Webdings (chỉ toàn ký hiệu hình vẽ)', 'Symbol', 'Barcode'],
      correctIndex: 0,
      explanation: 'Times New Roman và Arial là hai phông chữ chuẩn Unicode phổ biến nhất cho văn bản tiếng Việt.'
    },
    {
      id: 7,
      question: 'Khi trình bày một văn bản, cỡ chữ (Font Size) của dòng TIÊU ĐỀ nên như thế nào so với cỡ chữ của phần nội dung bài viết?',
      options: ['Cỡ chữ tiêu đề nên lớn hơn (ví dụ 16 - 20pt) để nổi bật chủ đề văn bản', 'Cỡ chữ tiêu đề phải nhỏ li ti không đọc được', 'Tiêu đề không được phép có chữ', 'Cỡ chữ tiêu đề bắt buộc là 1pt'],
      correctIndex: 0,
      explanation: 'Tiêu đề có cỡ chữ lớn hơn và in đậm giúp người đọc nhận biết ngay nội dung chính của văn bản.'
    },
    {
      id: 8,
      question: 'Nút lệnh có hình chữ "A" kèm một vạch màu đỏ ở ngay bên dưới trong nhóm Font dùng để làm gì?',
      options: ['Thay đổi màu sắc của chữ (Font Color)', 'Xóa toàn bộ văn bản', 'Chèn bảng biểu', 'Kiểm tra lỗi chính tả'],
      correctIndex: 0,
      explanation: 'Nút Font Color (chữ A có gạch màu dưới chân) cho phép chọn màu sắc cho đoạn chữ đang bôi đen.'
    },

    // Bài 3: In đậm (B), In nghiêng (I), Gạch chân (U)
    {
      id: 9,
      question: 'Trên thẻ Home, ba nút lệnh B, I, U có ý nghĩa lần lượt là gì?',
      options: [
        'B: In đậm (Bold), I: In nghiêng (Italic), U: Gạch chân (Underline)',
        'B: Bảng biểu, I: In ấn, U: Lưu bài',
        'B: Bên trái, I: Ở giữa, U: Bên phải',
        'B: Xóa chữ, I: Sao chép, U: Dán chữ'
      ],
      correctIndex: 0,
      explanation: 'B (Bold - đậm), I (Italic - nghiêng), U (Underline - gạch chân) là 3 kiểu chữ nhấn mạnh cơ bản.'
    },
    {
      id: 10,
      question: 'Tổ hợp phím tắt nào trên bàn phím dùng để bật/tắt nhanh chế độ chữ IN ĐẬM (Bold)?',
      options: ['Ctrl + B', 'Ctrl + I', 'Ctrl + U', 'Ctrl + S'],
      correctIndex: 0,
      explanation: 'Nhấn Ctrl + B giúp in đậm nhanh đoạn văn bản đang chọn.'
    },
    {
      id: 11,
      question: 'Nếu một dòng chữ đang được In đậm (nút B đang sáng), làm thế nào để bỏ In đậm trở về chữ bình thường?',
      options: ['Bôi đen dòng chữ đó rồi nhấp lại vào nút B (hoặc nhấn Ctrl + B) một lần nữa', 'Phải xóa hết dòng chữ đó đi gõ lại từ đầu', 'Tắt máy tính khởi động lại', 'Nhấn phím Space'],
      correctIndex: 0,
      explanation: 'Các nút B, I, U hoạt động như công tắc bật/tắt: bấm lần 1 để bật, bấm lần 2 để tắt định dạng đó.'
    },
    {
      id: 12,
      question: 'Tổ hợp phím tắt thần kỳ nào giúp em "Hoàn tác" (Undo) để lấy lại nội dung vừa lỡ tay xóa hoặc định dạng nhầm?',
      options: ['Ctrl + Z', 'Ctrl + P', 'Ctrl + F', 'Alt + F4'],
      correctIndex: 0,
      explanation: 'Ctrl + Z (Undo) giúp quay lại bước ngay trước đó khi em thao tác nhầm.'
    },

    // Bài 4: Căn lề đoạn văn bản
    {
      id: 13,
      question: 'Trong nhóm Paragraph trên thẻ Home, có 4 kiểu căn lề đoạn văn bản nào?',
      options: ['Căn lề trái, Căn giữa, Căn lề phải và Căn đều hai bên', 'Căn trên, Căn dưới, Căn chéo và Căn tròn', 'Chỉ có căn trái và căn phải', 'Căn theo màu sắc'],
      correctIndex: 0,
      explanation: '4 nút căn lề chuẩn gồm: Align Left (Trái), Center (Giữa), Align Right (Phải), Justify (Đều hai bên).'
    },
    {
      id: 14,
      question: 'Dòng tiêu đề của bài văn hoặc tên bài thơ thường dùng kiểu căn lề nào để nằm cân đối ở chính giữa trang giấy?',
      options: ['Căn giữa (Center - Ctrl + E)', 'Căn lề trái (Align Left)', 'Căn lề phải (Align Right)', 'Không căn lề'],
      correctIndex: 0,
      explanation: 'Căn giữa (Center) đặt dòng tiêu đề nằm ngay trục giữa trang giấy rất trang trọng và đẹp mắt.'
    },
    {
      id: 15,
      question: 'Đối với các đoạn văn xuôi dài nhiều dòng, kiểu căn lề nào giúp cả mép bên trái và mép bên phải của đoạn văn đều thẳng hàng tăm tắp?',
      options: ['Căn đều hai bên (Justify - Ctrl + J)', 'Căn giữa (Center)', 'Căn lề phải (Align Right)', 'Xóa khoảng trắng'],
      correctIndex: 0,
      explanation: 'Căn đều hai bên (Justify) được dùng trong sách giáo khoa và văn bản hành chính để hai lề thẳng đẹp.'
    },
    {
      id: 16,
      question: 'Công cụ "Line and Paragraph Spacing" (biểu tượng có mũi tên lên xuống cạnh các dòng kẻ) dùng để làm gì?',
      options: ['Điều chỉnh khoảng cách thưa hoặc dày giữa các dòng trong đoạn văn', 'Đổi màu nền trang giấy', 'Chèn hình ảnh từ máy tính', 'Xóa bảng biểu'],
      correctIndex: 0,
      explanation: 'Line Spacing (như 1.15 hoặc 1.5) giúp các dòng chữ thoáng đãng, dễ đọc hơn.'
    },

    // Bài 5: Chèn hình ảnh và Bảng biểu (Insert Pictures & Table)
    {
      id: 17,
      question: 'Để chèn một bức ảnh minh họa có sẵn trong máy tính vào trang văn bản Word, em chọn trình tự nào?',
      options: ['Chọn thẻ Insert -> nhấp nút Pictures -> chọn tệp ảnh -> nhấn Insert', 'Chọn thẻ File -> chọn Close', 'Chọn thẻ View -> chọn Zoom', 'Nhấn phím Backspace'],
      correctIndex: 0,
      explanation: 'Thẻ Insert (Chèn) -> Pictures dùng để đưa hình ảnh vào minh họa cho bài viết.'
    },
    {
      id: 18,
      question: 'Sau khi chèn ảnh vào Word, muốn thu nhỏ hoặc phóng to bức ảnh cân đối mà không bị méo hình, em kéo thả chuột ở đâu?',
      options: ['Kéo thả tại các nút chấm tròn ở 4 GÓC của khung ảnh', 'Kéo ở cạnh giữa làm ảnh bị dẹp ngang', 'Nhấn phím Delete', 'Gõ phím Space liên tục'],
      correctIndex: 0,
      explanation: 'Kéo các chấm tròn ở 4 góc ảnh giúp giữ nguyên tỉ lệ chiều rộng và chiều cao của bức ảnh.'
    },
    {
      id: 19,
      question: 'Để tạo một bảng Thời khóa biểu gồm các hàng và các cột trong Word, em vào thẻ lệnh nào?',
      options: ['Thẻ Insert -> chọn nút Table -> quét chọn số cột và số hàng', 'Thẻ Home -> chọn Font', 'Thẻ Review -> chọn Spelling', 'Thẻ File -> chọn Print'],
      correctIndex: 0,
      explanation: 'Insert -> Table giúp tạo bảng biểu để trình bày thời khóa biểu, danh sách tổ khoa học.'
    },
    {
      id: 20,
      question: 'Khi con trỏ đang nằm trong một ô của bảng (Table) trong Word, nhấn phím nào giúp di chuyển nhanh sang ô kế tiếp bên phải?',
      options: ['Phím Tab', 'Phím Enter', 'Phím Esc', 'Phím Caps Lock'],
      correctIndex: 0,
      explanation: 'Trong bảng Word, nhấn phím Tab sẽ chuyển con trỏ sang ô tiếp theo; còn nhấn Enter sẽ làm ô hiện tại cao thêm 1 dòng.'
    },

    // Bài 6: Lưu văn bản và Hoàn thiện trang in
    {
      id: 21,
      question: 'Để lưu tệp văn bản Word đang soạn thảo vào máy tính, em nhấn tổ hợp phím tắt nào?',
      options: ['Ctrl + S (hoặc vào File -> Save)', 'Ctrl + C', 'Ctrl + V', 'Ctrl + X'],
      correctIndex: 0,
      explanation: 'Ctrl + S là phím tắt lưu bài; học sinh nên bấm Ctrl + S thường xuyên trong lúc làm bài để tránh mất dữ liệu.'
    },
    {
      id: 22,
      question: 'Tệp văn bản sau khi lưu bằng phần mềm Microsoft Word (phiên bản hiện đại) sẽ có đuôi mở rộng mặc định là gì?',
      options: ['.docx', '.xlsx', '.pptx', '.mp3'],
      correctIndex: 0,
      explanation: '.docx là phần mở rộng chuẩn của tài liệu Microsoft Word.'
    },
    {
      id: 23,
      question: 'Khi muốn chọn TOÀN BỘ tất cả các đoạn chữ và hình ảnh trong bài soạn thảo cùng một lúc, em nhấn tổ hợp phím nào?',
      options: ['Ctrl + A (Select All)', 'Ctrl + Z', 'Ctrl + B', 'Ctrl + N'],
      correctIndex: 0,
      explanation: 'Ctrl + A giúp chọn nhanh toàn bộ nội dung trong văn bản.'
    },
    {
      id: 24,
      question: 'Vì sao trước khi nộp bài hoặc in văn bản, em nên đọc soát lại toàn bộ trang văn bản từ đầu đến cuối?',
      options: ['Để phát hiện và sửa kịp thời các lỗi chính tả, lỗi dấu cách và căn chỉnh bố cục cân đối đẹp mắt', 'Để làm máy tính nóng lên', 'Để xóa hết bài vừa làm', 'Không cần đọc lại bao giờ'],
      correctIndex: 0,
      explanation: 'Kiểm tra lại chính tả và bố cục trang là thói quen cẩn thận giúp bài văn hoàn chỉnh đạt điểm tối đa.'
    }
  ],

  // ============================================================================
  // 6. BẢNG TÍNH EXCEL (6 bài x 4 câu = 24 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  excel: [
    // Bài 1: Giao diện Excel - Hàng, Cột và Ô tính
    {
      id: 1,
      question: 'Trong phần mềm bảng tính Microsoft Excel, các CỘT (Columns) và các HÀNG (Rows) được đánh dấu như thế nào?',
      options: [
        'Các cột được đặt tên bằng chữ cái (A, B, C, D...), các hàng được đánh số thứ tự (1, 2, 3, 4...)',
        'Cả cột và hàng đều dùng chữ cái',
        'Cả cột và hàng đều dùng dấu chấm hỏi',
        'Không có cột và hàng'
      ],
      correctIndex: 0,
      explanation: 'Cột thẳng đứng ký hiệu bằng chữ cái A, B, C...; Hàng nằm ngang ký hiệu bằng số 1, 2, 3...'
    },
    {
      id: 2,
      question: 'Vùng giao nhau giữa một cột và một hàng trên trang tính Excel tạo thành một ô hình chữ nhật được gọi là gì?',
      options: ['Ô tính (Cell)', 'Trang chiếu (Slide)', 'Thư mục (Folder)', 'Đoạn văn (Paragraph)'],
      correctIndex: 0,
      explanation: 'Mỗi ô trên lưới bảng tính được gọi là một Ô tính (Cell).'
    },
    {
      id: 3,
      question: 'Địa chỉ của một ô tính được viết theo quy tắc nào? Ví dụ ô nằm ở Cột C và Hàng 4 có địa chỉ là gì?',
      options: ['Tên cột viết trước, số hàng viết sau -> Địa chỉ là C4', 'Số hàng viết trước, tên cột viết sau -> 4C', 'Viết dấu cộng ở giữa -> C+4', 'Không có địa chỉ'],
      correctIndex: 0,
      explanation: 'Địa chỉ ô luôn ghép từ Tên cột + Số hàng (ví dụ: A1, B2, C4, D10).'
    },
    {
      id: 4,
      question: 'Ký hiệu vùng dữ liệu "B2:D2" trong Excel có ý nghĩa là gì?',
      options: ['Khối các ô tính liên tiếp từ ô B2 đến ô D2 (gồm B2, C2 và D2)', 'Chỉ tính riêng 2 ô B2 và D2, bỏ qua ô C2', 'Phép chia ô B2 cho ô D2', 'Xóa dữ liệu từ B2 đến D2'],
      correctIndex: 0,
      explanation: 'Dấu hai chấm (:) biểu thị một vùng (khối) các ô liền kề nhau từ ô đầu đến ô cuối.'
    },

    // Bài 2: Nhập dữ liệu chữ, số và quy tắc công thức
    {
      id: 5,
      question: 'Mặc định trong Excel, khi em nhập một HỌ TÊN (dữ liệu chữ) và một ĐIỂM SỐ (dữ liệu số) vào ô tính thì chúng tự động căn lề thế nào?',
      options: ['Dữ liệu chữ tự động căn thẳng lề TRÁI, dữ liệu số tự động căn thẳng lề PHẢI của ô', 'Cả chữ và số đều nhảy ra ngoài ô', 'Chữ căn phải, số căn trái', 'Tự động biến mất'],
      correctIndex: 0,
      explanation: 'Excel tự động căn trái cho văn bản (Text) và căn phải cho con số (Number) để dễ so sánh hàng đơn vị, hàng chục.'
    },
    {
      id: 6,
      question: 'Khi muốn Excel thực hiện tính toán công thức hoặc hàm, ký tự ĐẦU TIÊN bắt buộc phải gõ vào ô tính là dấu gì?',
      options: ['Dấu bằng (=)', 'Dấu cộng (+)', 'Dấu chấm than (!)', 'Dấu sao (*)'],
      correctIndex: 0,
      explanation: 'Nếu không có dấu bằng (=) ở đầu, Excel sẽ hiểu đó chỉ là dòng chữ thông thường chứ không tính toán.'
    },
    {
      id: 7,
      question: 'Trong công thức toán học của Excel, phép NHÂN và phép CHIA được viết bằng ký hiệu nào trên bàn phím?',
      options: ['Phép nhân dùng dấu sao (*), phép chia dùng dấu gạch chéo (/)', 'Phép nhân dùng chữ x, phép chia dùng dấu hai chấm (:)', 'Phép nhân dùng dấu chấm (.), phép chia dùng dấu hỏi (?)', 'Không tính được nhân chia'],
      correctIndex: 0,
      explanation: 'Quy ước toán tử trong Excel: Cộng (+), Trừ (-), Nhân (*), Chia (/).'
    },
    {
      id: 8,
      question: 'Sau khi gõ xong dữ liệu hoặc công thức vào một ô tính, em nhấn phím nào để hoàn tất và nhận kết quả?',
      options: ['Phím Enter', 'Phím Esc', 'Phím Backspace', 'Phím Delete'],
      correctIndex: 0,
      explanation: 'Nhấn Enter để xác nhận dữ liệu và cho phép Excel tính ra kết quả của công thức.'
    },

    // Bài 3: Tính tổng tự động với hàm SUM
    {
      id: 9,
      question: 'Hàm nào trong Excel được dùng để tính TỔNG của các con số trong một vùng ô tính?',
      options: ['Hàm SUM', 'Hàm AVERAGE', 'Hàm MAX', 'Hàm MIN'],
      correctIndex: 0,
      explanation: 'SUM (trong tiếng Anh nghĩa là Tổng) dùng để cộng tất cả các số trong vùng được chọn.'
    },
    {
      id: 10,
      question: 'Công thức nào sau đây viết ĐÚNG cú pháp để tính tổng điểm 3 môn của bạn học sinh ở các ô B2, C2, D2?',
      options: ['=SUM(B2:D2)', 'SUM(B2:D2) (thiếu dấu bằng)', '=SUM(B2-D2)', '=TOTAL(B2:D2)'],
      correctIndex: 0,
      explanation: 'Cú pháp chuẩn: =SUM(ô_đầu:ô_cuối), bắt đầu bằng dấu = và tên hàm SUM.'
    },
    {
      id: 11,
      question: 'Nếu tại ô B2 có số 9, ô C2 có số 8, ô D2 có số 10, thì công thức =SUM(B2:D2) sẽ trả về kết quả là bao nhiêu?',
      options: ['27', '9', '10', '17'],
      correctIndex: 0,
      explanation: '9 + 8 + 10 = 27.'
    },
    {
      id: 12,
      question: 'Điều kỳ diệu gì sẽ xảy ra ở ô Tổng điểm =SUM(B2:D2) nếu em sửa điểm môn Toán ở ô B2 từ 9 thành 10?',
      options: ['Ô Tổng điểm sẽ tự động cập nhật ngay lập tức lên thành 28 mà không cần gõ lại công thức', 'Ô Tổng điểm vẫn giữ nguyên số 27 cũ', 'Ô Tổng điểm bị xóa trắng', 'Máy tính bị tắt nguồn'],
      correctIndex: 0,
      explanation: 'Sử dụng địa chỉ ô trong hàm giúp bảng tính tự động tính lại kết quả ngay khi số liệu gốc thay đổi.'
    },

    // Bài 4: Tính điểm trung bình với hàm AVERAGE
    {
      id: 13,
      question: 'Để tính ĐIỂM TRUNG BÌNH CỘNG của các môn học trong Excel, em sử dụng hàm nào?',
      options: ['Hàm AVERAGE', 'Hàm SUM', 'Hàm COUNT', 'Hàm UPPER'],
      correctIndex: 0,
      explanation: 'Hàm AVERAGE tính trung bình cộng bằng cách lấy tổng các số chia cho số lượng các số đó.'
    },
    {
      id: 14,
      question: 'Công thức nào sau đây tính đúng điểm trung bình cộng 3 môn học nằm tại các ô B3, C3, D3?',
      options: ['=AVERAGE(B3:D3)', '=SUM(B3:D3)', '=AVG(B3;D3)', 'AVERAGE(B3:D3)'],
      correctIndex: 0,
      explanation: '=AVERAGE(B3:D3) sẽ cộng giá trị B3, C3, D3 rồi chia cho 3.'
    },
    {
      id: 15,
      question: 'Nếu điểm 3 môn Toán, Tiếng Việt, Tin học lần lượt là 8, 9, 10 thì công thức =AVERAGE(B2:D2) cho kết quả là bao nhiêu?',
      options: ['9', '27', '8', '10'],
      correctIndex: 0,
      explanation: '(8 + 9 + 10) / 3 = 27 / 3 = 9.'
    },
    {
      id: 16,
      question: 'Thanh dài nằm phía trên các tiêu đề cột A, B, C có biểu tượng chữ "fx" dùng để hiển thị công thức bên trong ô đang chọn gọi là gì?',
      options: ['Thanh công thức (Formula Bar)', 'Thanh tác vụ (Taskbar)', 'Thanh cuộn dọc', 'Thanh trạng thái'],
      correctIndex: 0,
      explanation: 'Khi nhấp vào ô có công thức, ô tính hiện kết quả còn Thanh công thức (fx) hiển thị công thức gốc.'
    },

    // Bài 5: Tìm giá trị lớn nhất với hàm MAX, MIN
    {
      id: 17,
      question: 'Để tìm ra số điểm CAO NHẤT (lớn nhất) trong danh sách điểm của cả tổ, em dùng hàm nào trong Excel?',
      options: ['Hàm MAX', 'Hàm MIN', 'Hàm SUM', 'Hàm AVERAGE'],
      correctIndex: 0,
      explanation: 'Hàm MAX (Maximum) trả về số có giá trị lớn nhất trong vùng dữ liệu.'
    },
    {
      id: 18,
      question: 'Ngược lại với hàm MAX, hàm nào trong Excel giúp tìm ra giá trị NHỎ NHẤT (thấp nhất) trong một dãy số?',
      options: ['Hàm MIN', 'Hàm MAX', 'Hàm COUNT', 'Hàm SUM'],
      correctIndex: 0,
      explanation: 'Hàm MIN (Minimum) trả về số nhỏ nhất trong vùng ô tính được chọn.'
    },
    {
      id: 19,
      question: 'Cho các ô B2 = 8, C2 = 10, D2 = 9. Kết quả của công thức =MAX(B2:D2) là bao nhiêu?',
      options: ['10', '8', '9', '27'],
      correctIndex: 0,
      explanation: 'Trong ba số 8, 10, 9 thì số lớn nhất (MAX) là 10.'
    },
    {
      id: 20,
      question: 'Hàm COUNT(B2:B10) trong Excel có tác dụng gì khi thống kê bảng danh sách lớp?',
      options: ['Đếm xem có bao nhiêu ô chứa dữ liệu số trong vùng từ B2 đến B10', 'Cộng tổng các số từ B2 đến B10', 'Xóa các số từ B2 đến B10', 'Đổi màu chữ các ô'],
      correctIndex: 0,
      explanation: 'Hàm COUNT dùng để đếm số lượng các ô có chứa giá trị số.'
    },

    // Bài 6: Biểu đồ trực quan và Lưu sổ tính (.xlsx)
    {
      id: 21,
      question: 'Việc tạo Biểu đồ cột (Column Chart) từ bảng số liệu điểm thi trong Excel giúp ích gì cho người xem?',
      options: ['Giúp quan sát trực quan, dễ dàng so sánh cao thấp giữa các bạn học sinh chỉ bằng một cái nhìn', 'Làm mất hết các con số trong bảng', 'Chỉ để trang trí cho tốn giấy', 'Làm máy tính không lưu bài được'],
      correctIndex: 0,
      explanation: 'Biểu đồ trực quan hóa các con số khô khan thành các cột cao thấp sinh động, dễ hiểu.'
    },
    {
      id: 22,
      question: 'Để chèn một biểu đồ cột minh họa cho bảng dữ liệu đang chọn trong Excel, em vào thẻ lệnh nào trên thanh Ribbon?',
      options: ['Thẻ Insert -> chọn nhóm Charts (Biểu đồ)', 'Thẻ File -> chọn Exit', 'Thẻ View -> chọn Gridlines', 'Thẻ Help'],
      correctIndex: 0,
      explanation: 'Bôi đen bảng số liệu -> vào thẻ Insert -> chọn Column Chart để vẽ biểu đồ cột.'
    },
    {
      id: 23,
      question: 'Để kẻ đường viền khung bảng (Borders) rõ ràng cho các ô tính trước khi in ra giấy, em dùng nút lệnh nào trên thẻ Home?',
      options: ['Nút Borders (biểu tượng khung ô vuông có 4 ô nhỏ) -> chọn All Borders', 'Nút Italic (chữ I nghiêng)', 'Nút Undo', 'Nút Zoom'],
      correctIndex: 0,
      explanation: 'Mặc định đường lưới mờ trong Excel không in ra giấy; chọn All Borders sẽ kẻ khung bảng sắc nét.'
    },
    {
      id: 24,
      question: 'Tệp bảng tính sau khi lưu bằng phần mềm Microsoft Excel có phần mở rộng (đuôi tệp) chuẩn là gì?',
      options: ['.xlsx', '.docx', '.pptx', '.png'],
      correctIndex: 0,
      explanation: '.xlsx là định dạng tệp sổ tính chuẩn của Microsoft Excel.'
    }
  ],

  // ============================================================================
  // 7. TRÌNH CHIẾU POWERPOINT (6 bài x 4 câu = 24 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  powerpoint: [
    // Bài 1: Trang chiếu (Slide) và Thêm trang mới
    {
      id: 1,
      question: 'Phần mềm Microsoft PowerPoint được sử dụng với mục đích chính là gì?',
      options: [
        'Tạo bài trình chiếu sinh động gồm chữ, hình ảnh, hiệu ứng để thuyết trình trước lớp hoặc hội nghị',
        'Dùng để diệt virus máy tính',
        'Dùng để điều khiển quạt điện trong phòng',
        'Chỉ dùng để tính toán kế toán'
      ],
      correctIndex: 0,
      explanation: 'PowerPoint là công cụ thiết kế bài trình chiếu hỗ trợ thuyết trình trực quan và thu hút.'
    },
    {
      id: 2,
      question: 'Mỗi trang nội dung nằm trong một bài trình chiếu PowerPoint được gọi là gì?',
      options: ['Trang chiếu (Slide)', 'Ô tính (Cell)', 'Thư mục (Folder)', 'Thanh công thức'],
      correctIndex: 0,
      explanation: 'Bài thuyết trình gồm nhiều trang chiếu (Slide) nối tiếp nhau theo mạch nội dung.'
    },
    {
      id: 3,
      question: 'Tổ hợp phím tắt nào dùng để THÊM MỘT TRANG CHIẾU MỚI (New Slide) vào bài thuyết trình đang làm?',
      options: ['Ctrl + M', 'Ctrl + C', 'Ctrl + Z', 'Alt + F4'],
      correctIndex: 0,
      explanation: 'Trong PowerPoint, nhấn Ctrl + M (hoặc bấm nút New Slide trên thẻ Home) sẽ tạo thêm một Slide mới.'
    },
    {
      id: 4,
      question: 'Trang chiếu đầu tiên (Slide 1) của bài thuyết trình thường được gọi là trang gì và chứa thông tin gì?',
      options: ['Trang tiêu đề (Title Slide) - chứa Tên chủ đề bài thuyết trình và Tên tác giả/nhóm thực hiện', 'Trang kết thúc cảm ơn', 'Trang chỉ chứa bảng tính', 'Trang để trống hoàn toàn'],
      correctIndex: 0,
      explanation: 'Slide mở đầu giới thiệu tên đề tài thuyết trình và tên người trình bày.'
    },

    // Bài 2: Bố cục (Layout) và Trình bày chữ trên Slide
    {
      id: 5,
      question: 'Nguyên tắc vàng khi viết chữ lên một trang chiếu PowerPoint để khán giả ngồi xa vẫn đọc rõ là gì?',
      options: [
        'Viết ý chính ngắn gọn dưới dạng gạch đầu dòng, dùng phông chữ to rõ ràng',
        'Chép nguyên xi cả trang sách giáo khoa dày đặc chữ nhỏ li ti lên 1 slide',
        'Chọn cỡ chữ siêu nhỏ 8pt',
        'Viết chữ không có khoảng cách'
      ],
      correctIndex: 0,
      explanation: 'Slide chỉ nên nêu từ khóa và ý chính ngắn gọn để người nghe vừa quan sát vừa lắng nghe em thuyết trình.'
    },
    {
      id: 6,
      question: 'Khi chọn màu chữ và màu nền cho trang chiếu, em cần tuân thủ quy tắc phối màu nào để chữ dễ đọc nhất?',
      options: [
        'Màu chữ và màu nền phải có độ tương phản cao (ví dụ: nền sáng dùng chữ đậm tối; nền tối dùng chữ trắng sáng)',
        'Nền màu vàng nhạt kết hợp chữ màu vàng nhạt',
        'Nền màu đen kết hợp chữ màu đen',
        'Nền màu trắng tinh kết hợp chữ màu trắng tinh'
      ],
      correctIndex: 0,
      explanation: 'Độ tương phản giữa màu chữ và màu nền giúp chữ nổi bật, không gây mỏi mắt cho người xem.'
    },
    {
      id: 7,
      question: 'Nút lệnh "Layout" (Bố cục) nằm bên cạnh nút New Slide trên thẻ Home dùng để làm gì?',
      options: ['Thay đổi cách sắp xếp các khung chứa tiêu đề, văn bản và hình ảnh trên trang chiếu', 'Xóa bài thuyết trình', 'Tắt máy chiếu', 'Kiểm tra kết nối mạng'],
      correctIndex: 0,
      explanation: 'Slide Layout cung cấp các mẫu khung bố cục sẵn như: Chỉ tiêu đề, Tiêu đề và Nội dung, So sánh 2 cột...'
    },
    {
      id: 8,
      question: 'Muốn xóa một trang chiếu (Slide) bị dư ở cột thu nhỏ bên trái màn hình PowerPoint, em làm thế nào?',
      options: ['Nhấp chọn Slide đó ở cột bên trái rồi nhấn phím Delete trên bàn phím', 'Nhấn phím F5', 'Nhấn phím Caps Lock', 'Rút dây màn hình'],
      correctIndex: 0,
      explanation: 'Chọn Slide ở danh sách thu nhỏ bên trái -> nhấn phím Delete (hoặc chuột phải chọn Delete Slide) để xóa.'
    },

    // Bài 3: Mẫu thiết kế (Design Theme)
    {
      id: 9,
      question: 'Để chọn một mẫu nền thiết kế màu sắc và phông chữ đồng bộ, đẹp mắt cho toàn bộ bài trình chiếu, em vào thẻ lệnh nào?',
      options: ['Thẻ Design (Thiết kế) -> chọn một mẫu trong nhóm Themes', 'Thẻ File -> chọn Print', 'Thẻ View -> chọn Ruler', 'Thẻ Review'],
      correctIndex: 0,
      explanation: 'Thẻ Design chứa bộ sưu tập các Themes giúp trang trí toàn bộ các slide chuyên nghiệp chỉ với 1 cú nhấp chuột.'
    },
    {
      id: 10,
      question: 'Tại sao các trang chiếu trong cùng một bài thuyết trình nên sử dụng chung một tông màu thiết kế (Design Theme) thống nhất?',
      options: ['Tạo sự hài hòa, chuyên nghiệp và giúp người xem tập trung vào mạch nội dung', 'Để tốn nhiều bộ nhớ hơn', 'Vì máy tính chỉ có 1 màu', 'Để không gõ được chữ'],
      correctIndex: 0,
      explanation: 'Sự đồng bộ về phông chữ và màu nền giúp bài thuyết trình có tính thẩm mỹ cao.'
    },
    {
      id: 11,
      question: 'Trong cột danh sách các Slide thu nhỏ ở bên trái, nếu em muốn đổi thứ tự đưa Slide số 3 lên vị trí số 2 thì em làm cách nào?',
      options: ['Nhấn giữ chuột trái vào Slide số 3 rồi kéo thả lên vị trí số 2', 'Phải xóa hết làm lại từ đầu', 'Nhấn phím Esc 3 lần', 'Đổi tên tệp tin'],
      correctIndex: 0,
      explanation: 'Kéo thả chuột trực tiếp trên thanh danh sách Slide bên trái giúp sắp xếp lại thứ tự các trang chiếu dễ dàng.'
    },
    {
      id: 12,
      question: 'Trang chiếu cuối cùng của một bài thuyết trình thường dùng để hiển thị nội dung gì?',
      options: ['Tóm tắt thông điệp chính và lời Cảm ơn thầy cô, các bạn đã lắng nghe', 'Bắt đầu giới thiệu tên đề tài', 'Để màn hình báo lỗi', 'Không được phép có trang cuối'],
      correctIndex: 0,
      explanation: 'Lời chào và cảm ơn ở slide cuối thể hiện sự lịch sự, tôn trọng khán giả của người thuyết trình.'
    },

    // Bài 4: Chèn hình ảnh, Biểu tượng (Stickers/Icons) và Hình khối (Shapes)
    {
      id: 13,
      question: 'Vì sao một bài thuyết trình PowerPoint tốt nên kết hợp cả chữ ngắn gọn và hình ảnh minh họa?',
      options: ['Hình ảnh trực quan giúp minh họa rõ ý tưởng, gây hứng thú và giúp khán giả nhớ bài lâu hơn', 'Vì hình ảnh làm chữ bị ẩn đi', 'Vì PowerPoint không cho phép gõ chữ', 'Để không phải nói thuyết trình'],
      correctIndex: 0,
      explanation: '"Một bức ảnh có giá trị hơn ngàn lời nói" - hình ảnh đúng chủ đề giúp bài trình chiếu cuốn hút.'
    },
    {
      id: 14,
      question: 'Để chèn các hình khối như mũi tên, ngôi sao, hình chữ nhật hay khung hội thoại vào Slide, em chọn công cụ nào trong thẻ Insert?',
      options: ['Insert -> Shapes (Hình khối)', 'Insert -> Audio', 'File -> Save', 'View -> Slide Show'],
      correctIndex: 0,
      explanation: 'Công cụ Shapes trong thẻ Insert cung cấp hàng chục hình khối để vẽ sơ đồ và nhãn trang trí.'
    },
    {
      id: 15,
      question: 'Khi chọn hình ảnh minh họa cho bài thuyết trình về "An toàn giao thông", em nên chọn ảnh như thế nào?',
      options: ['Ảnh rõ nét, đúng chủ đề giao thông (đèn tín hiệu, đội mũ bảo hiểm) và kích thước vừa vặn', 'Ảnh mờ nhòe không nhìn rõ hoặc ảnh không liên quan gì đến giao thông', 'Chèn 20 bức ảnh chồng đè lên mặt chữ làm che khuất hết chữ', 'Ảnh có nội dung bạo lực'],
      correctIndex: 0,
      explanation: 'Hình ảnh phải sát chủ đề, rõ nét và được bố trí gọn gàng không đè lên phần văn bản.'
    },
    {
      id: 16,
      question: 'Trong thẻ Insert của PowerPoint, công cụ "WordArt" dùng để làm gì?',
      options: ['Tạo chữ nghệ thuật có kiểu dáng, bóng đổ và màu sắc nổi bật cho tiêu đề', 'Kiểm tra virus', 'Tắt âm thanh', 'Chia cột bảng tính'],
      correctIndex: 0,
      explanation: 'WordArt giúp tạo các dòng chữ nghệ thuật bắt mắt cho tiêu đề trang chiếu.'
    },

    // Bài 5: Hiệu ứng chuyển trang (Transitions) và Hoạt họa (Animations)
    {
      id: 17,
      question: 'Hiệu ứng chuyển động khi lật từ trang chiếu này sang trang chiếu tiếp theo (như Fade, Push, Wipe) nằm ở thẻ lệnh nào?',
      options: ['Thẻ Transitions (Chuyển tiếp trang)', 'Thẻ Home', 'Thẻ File', 'Thẻ Review'],
      correctIndex: 0,
      explanation: 'Transitions là hiệu ứng chuyển cảnh giữa các Slide.'
    },
    {
      id: 18,
      question: 'Hiệu ứng làm cho một bức ảnh hoặc một dòng chữ bay vào, phóng to hay nhấp nháy NGAY TRÊN MỘT TRANG CHIẾU nằm ở thẻ lệnh nào?',
      options: ['Thẻ Animations (Hoạt họa đối tượng)', 'Thẻ Transitions', 'Thẻ Design', 'Thẻ Layout'],
      correctIndex: 0,
      explanation: 'Animations dùng cho từng đối tượng (chữ, ảnh) bên trong slide; còn Transitions dùng cho cả trang slide.'
    },
    {
      id: 19,
      question: 'Trong thẻ Transitions, nút lệnh "Apply To All" có tác dụng gì?',
      options: ['Áp dụng kiểu hiệu ứng chuyển trang đang chọn cho TẤT CẢ các trang chiếu trong bài', 'Xóa hết tất cả hiệu ứng', 'Đóng phần mềm PowerPoint', 'Chỉ áp dụng cho chữ cuối cùng'],
      correctIndex: 0,
      explanation: 'Apply To All giúp đồng bộ một hiệu ứng chuyển trang mượt mà cho toàn bộ các slide.'
    },
    {
      id: 20,
      question: 'Khi sử dụng hiệu ứng trong bài thuyết trình học tập, em nên dùng như thế nào cho hợp lý?',
      options: ['Dùng hiệu ứng vừa phải, nhẹ nhàng, thống nhất để dẫn dắt sự chú ý của người xem', 'Chèn 15 hiệu ứng xoay tròn chớp nháy liên tục trên 1 câu làm khán giả chóng mặt', 'Cho hiệu ứng chạy chậm 1 phút mới hiện ra 1 chữ', 'Bật âm thanh tiếng nổ thật to ở mọi dòng chữ'],
      correctIndex: 0,
      explanation: 'Hiệu ứng tinh tế, vừa đủ giúp bài thuyết trình chuyên nghiệp và không gây rối mắt.'
    },

    // Bài 6: Trình chiếu toàn màn hình (Slide Show) và Kỹ năng thuyết trình
    {
      id: 21,
      question: 'Phím tắt nào trên bàn phím dùng để BẮT ĐẦU TRÌNH CHIẾU toàn màn hình ngay từ trang chiếu đầu tiên (Slide 1)?',
      options: ['Phím F5', 'Phím F2', 'Phím Caps Lock', 'Phím Backspace'],
      correctIndex: 0,
      explanation: 'Nhấn phím F5 (hoặc bấm biểu tượng chiếc màn chiếu Slide Show) để bắt đầu trình chiếu.'
    },
    {
      id: 22,
      question: 'Trong khi đang trình chiếu toàn màn hình, để chuyển sang trang chiếu kế tiếp, em có thể nhấn phím nào?',
      options: ['Nhấp chuột trái, nhấn phím Mũi tên sang phải (→), phím Space hoặc phím Enter', 'Nhấn tổ hợp Ctrl + Alt + Delete', 'Tắt công tắc màn hình', 'Nhấn phím F2'],
      correctIndex: 0,
      explanation: 'Khi trình chiếu, nhấp chuột trái hoặc nhấn phím mũi tên phải / phím cách sẽ tiến tới slide tiếp theo.'
    },
    {
      id: 23,
      question: 'Muốn THOÁT khỏi chế độ trình chiếu toàn màn hình để quay về màn hình chỉnh sửa PowerPoint, em nhấn phím nào ở góc trên bên trái bàn phím?',
      options: ['Phím Esc (Escape)', 'Phím Shift', 'Phím Tab', 'Phím Insert'],
      correctIndex: 0,
      explanation: 'Phím Esc giúp kết thúc và thoát khỏi chế độ trình chiếu toàn màn hình bất cứ lúc nào.'
    },
    {
      id: 24,
      question: 'Tệp bài trình chiếu sau khi lưu bằng phần mềm Microsoft PowerPoint có phần mở rộng (đuôi tệp) mặc định là gì?',
      options: ['.pptx', '.docx', '.xlsx', '.txt'],
      correctIndex: 0,
      explanation: '.pptx là định dạng tệp chuẩn của bài trình chiếu Microsoft PowerPoint.'
    }
  ],

  // ============================================================================
  // 8. TƯ DUY THUẬT TOÁN (8 bài x 4 câu = 32 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  algorithm: [
    // Bài 1: Chuỗi lệnh tuần tự
    {
      id: 1,
      question: 'Theo SGK Tin học Kết Nối Tri Thức, "Thuật toán" (Algorithm) được hiểu là gì?',
      options: [
        'Một dãy các bước chỉ dẫn rõ ràng, sắp xếp theo trình tự xác định để giải quyết một nhiệm vụ',
        'Một thiết bị phần cứng gắn trong màn hình',
        'Một loại virus làm chậm máy tính',
        'Một bức tranh vẽ bằng phần mềm Paint'
      ],
      correctIndex: 0,
      explanation: 'Thuật toán là các bước thực hiện từng bước từ đầu vào (Input) đến kết quả đầu ra (Output).'
    },
    {
      id: 2,
      question: 'Trong "Cấu trúc tuần tự", các câu lệnh được Robot hoặc máy tính thực hiện như thế nào?',
      options: ['Thực hiện lần lượt từng lệnh từ trên xuống dưới theo đúng thứ tự đã sắp xếp, không bỏ sót bước nào', 'Thực hiện lệnh cuối cùng trước rồi mới làm lệnh đầu tiên', 'Chọn ngẫu nhiên 1 lệnh bất kỳ để làm', 'Bỏ qua tất cả các lệnh'],
      correctIndex: 0,
      explanation: 'Cấu trúc tuần tự thực hiện các bước nối tiếp nhau theo đúng thứ tự trước - sau.'
    },
    {
      id: 3,
      question: 'Để đánh răng sạch sẽ mỗi sáng, thứ tự các bước tuần tự nào sau đây là hợp lý nhất?',
      options: [
        'B1: Lấy bàn chải và kem -> B2: Tra kem lên bàn chải -> B3: Chải răng kỹ các mặt -> B4: Súc miệng sạch bằng nước',
        'B1: Súc miệng -> B2: Cất bàn chải -> B3: Tra kem đánh răng',
        'B1: Chải răng khô -> B2: Đi học -> B3: Lấy kem đánh răng',
        'Làm bước nào trước cũng giống nhau'
      ],
      correctIndex: 0,
      explanation: 'Trong thuật toán tuần tự, nếu đảo lộn thứ tự các bước thì công việc sẽ không đạt kết quả đúng.'
    },
    {
      id: 4,
      question: 'Nếu Robot đang đứng ở ô (0, 2) và nhìn thẳng xuống dưới, cần đi thẳng 4 ô để tới cờ đích ở ô (4, 2) thì em xếp mấy khối lệnh "Đi thẳng"?',
      options: ['4 khối lệnh "Đi thẳng 1 bước" liên tiếp', '1 khối lệnh "Đi thẳng" và 3 khối lệnh "Quay trái"', '4 khối lệnh "Quay phải"', 'Không cần khối lệnh nào'],
      correctIndex: 0,
      explanation: 'Mỗi khối "Đi thẳng" giúp Robot tiến 1 ô theo hướng đang nhìn, vậy 4 ô thẳng hàng cần 4 bước đi thẳng.'
    },

    // Bài 2: Rẽ phải và rẽ trái tại góc vuông
    {
      id: 5,
      question: 'Khối lệnh "Quay phải 90°" hoặc "Quay trái 90°" làm thay đổi điều gì của Robot?',
      options: ['Chỉ làm Robot xoay đổi hướng nhìn ngay tại ô đang đứng, chưa di chuyển sang ô khác', 'Làm Robot nhảy vọt đi 3 ô', 'Làm Robot bay qua tường đá', 'Làm Robot biến mất'],
      correctIndex: 0,
      explanation: 'Lệnh Quay trái / Quay phải chỉ đổi hướng mặt của Robot tại chỗ; muốn tiến sang ô mới phải thêm lệnh Đi thẳng.'
    },
    {
      id: 6,
      question: 'Nếu Robot đang hướng mặt sang PHẢI (hướng Đông ►), sau khi thực hiện 1 lệnh "Quay phải 90°", Robot sẽ nhìn về hướng nào?',
      options: ['Nhìn xuống DƯỚI (hướng Nam ▼)', 'Nhìn lên TRÊN (hướng Bắc ▲)', 'Nhìn sang TRÁI (hướng Tây ◄)', 'Vẫn nhìn sang PHẢI'],
      correctIndex: 0,
      explanation: 'Theo chiều kim đồng hồ: Đang nhìn sang Phải (►) mà quay phải 90° sẽ xoay mặt xuống Dưới (▼).'
    },
    {
      id: 7,
      question: 'Nếu Robot đang hướng mặt sang PHẢI (►), sau khi thực hiện 1 lệnh "Quay trái 90°", Robot sẽ nhìn về hướng nào?',
      options: ['Nhìn lên TRÊN (▲)', 'Nhìn xuống DƯỚI (▼)', 'Nhìn sang TRÁI (◄)', 'Đứng quay lưng lại'],
      correctIndex: 0,
      explanation: 'Ngược chiều kim đồng hồ: Đang nhìn sang Phải (►) mà quay trái 90° sẽ xoay mặt lên Trên (▲).'
    },
    {
      id: 8,
      question: 'Để Robot đang nhìn lên TRÊN (▲) quay ngược hẳn lại nhìn xuống DƯỚI (▼) (quay 180 độ), em cần mấy lệnh quay 90 độ cùng chiều?',
      options: ['2 lệnh "Quay phải 90°" (hoặc 2 lệnh "Quay trái 90°") liên tiếp', 'Chỉ cần 1 lệnh "Quay phải 90°"', '5 lệnh "Đi thẳng"', 'Không thể quay ngược lại được'],
      correctIndex: 0,
      explanation: '90° + 90° = 180°, vì vậy quay 2 lần liên tiếp cùng chiều sẽ đổi hướng ngược lại.'
    },

    // Bài 3: Tránh chướng ngại vật
    {
      id: 9,
      question: 'Trên bản đồ mê cung, khi gặp ô có tảng đá chướng ngại vật (🪨) chắn ngay trước mặt, Robot cần được lập trình như thế nào?',
      options: ['Rẽ sang hướng trống không có đá để đi vòng qua chướng ngại vật rồi mới tiến về đích', 'Cứ đi thẳng đâm xuyên qua tảng đá', 'Đứng yên tại chỗ không đi nữa', 'Xóa cờ đích đi'],
      correctIndex: 0,
      explanation: 'Robot không thể đi xuyên qua tường hoặc đá, nên thuật toán phải tìm đường vòng hợp lệ.'
    },
    {
      id: 10,
      question: 'Trước khi bắt tay vào xếp các khối lệnh điều khiển Robot vượt mê cung nhiều chướng ngại vật, bước đầu tiên em nên làm là gì?',
      options: ['Quan sát bản đồ, xác định vị trí xuất phát, hướng nhìn ban đầu của Robot, vị trí đá và vạch sẵn đường đi tới đích', 'Bấm đại các nút lệnh không cần nhìn bản đồ', 'Tắt màn hình đi', 'Chỉ bấm nút Xóa hết'],
      correctIndex: 0,
      explanation: 'Phân tích bài toán và tìm đường đi trên bản đồ trước khi viết lệnh là kỹ năng cốt lõi của lập trình viên.'
    },
    {
      id: 11,
      question: 'Điều gì sẽ xảy ra nếu lệnh "Đi thẳng" điều khiển Robot bước ra ngoài mép biên của lưới mê cung?',
      options: ['Chương trình báo lỗi va vào tường rào biên và Robot dừng lại, chưa hoàn thành nhiệm vụ', 'Robot tự động chiến thắng ngay', 'Mê cung tự nở rộng ra gấp đôi', 'Không có chuyện gì xảy ra'],
      correctIndex: 0,
      explanation: 'Mọi bước di chuyển của Robot đều phải nằm trong phạm vi giới hạn của bản đồ lưới.'
    },
    {
      id: 12,
      question: 'Trong bài toán giải quyết vấn đề bằng máy tính, "Đầu vào" (Input) và "Đầu ra" (Output) của trò chơi mê cung Robot là gì?',
      options: [
        'Input: Bản đồ mê cung và vị trí đầu của Robot; Output: Chuỗi lệnh đưa Robot về đúng ô cờ đích',
        'Input: Loa máy tính; Output: Bàn phím',
        'Input: Màn hình tắt; Output: Màn hình bật',
        'Không có Input và Output'
      ],
      correctIndex: 0,
      explanation: 'Xác định rõ thông tin đã cho (Input) và kết quả cần đạt (Output) giúp xây dựng thuật toán chính xác.'
    },

    // Bài 4: Cấu trúc Lặp (Loop)
    {
      id: 13,
      question: 'Trong lập trình, "Cấu trúc Lặp" (Loop) được sử dụng khi nào?',
      options: ['Khi cần thực hiện lặp đi lặp lại một hành động hoặc một nhóm lệnh giống nhau nhiều lần', 'Khi chỉ làm một việc duy nhất 1 lần rồi nghỉ', 'Khi muốn tắt máy tính', 'Khi không có câu lệnh nào'],
      correctIndex: 0,
      explanation: 'Vòng lặp giúp gom các thao tác lặp đi lặp lại thành một khối lệnh ngắn gọn.'
    },
    {
      id: 14,
      question: 'Thay vì xếp 5 khối lệnh "Đi thẳng 1 bước" giống hệt nhau nối đuôi nhau, khối lệnh Lặp viết gọn lại như thế nào?',
      options: ['Lặp lại 5 lần: [ Đi thẳng 1 bước ]', 'Nếu gặp tường thì dừng', 'Quay trái 5 lần', 'Đi thẳng 1 bước rồi dừng'],
      correctIndex: 0,
      explanation: 'Khối "Lặp lại 5 lần [Đi thẳng 1 bước]" cho kết quả giống hệt 5 lệnh rời nhưng chương trình ngắn gọn hơn nhiều.'
    },
    {
      id: 15,
      question: 'Hoạt động nào trong tự nhiên và đời sống hàng ngày là ví dụ điển hình của Cấu trúc Lặp?',
      options: ['Trái Đất tự quay quanh trục của nó hết ngày này qua ngày khác; học sinh đi bộ từng bước tới trường', 'Mưa rơi một giọt duy nhất', 'Ăn sáng một lần trong cả năm', 'Mở khóa cửa một lần'],
      correctIndex: 0,
      explanation: 'Chu kỳ ngày - đêm hoặc bước chân đi bộ lặp lại liên tục cho đến khi tới trường là cấu trúc lặp.'
    },
    {
      id: 16,
      question: 'Để vẽ một hình vuông có 4 cạnh bằng nhau và 4 góc vuông, Robot vẽ tranh sẽ lặp lại cụm lệnh "[Đi thẳng vẽ 1 cạnh -> Quay phải 90°]" mấy lần?',
      options: ['Lặp lại 4 lần', 'Lặp lại 2 lần', 'Lặp lại 10 lần', 'Chỉ làm 1 lần'],
      correctIndex: 0,
      explanation: 'Hình vuông có 4 cạnh và 4 góc vuông giống nhau, nên lặp lại 4 lần cặp lệnh (Vẽ cạnh + Quay 90°) sẽ khép kín hình vuông.'
    },

    // Bài 5: Cấu trúc Rẽ nhánh (Nếu - Thì)
    {
      id: 17,
      question: 'Câu nói: "NẾU đèn tín hiệu giao thông màu đỏ THÌ em dừng xe lại, NẾU KHÔNG THÌ em được phép đi tiếp" mô tả cấu trúc thuật toán nào?',
      options: ['Cấu trúc Rẽ nhánh (If - Then - Else)', 'Cấu trúc Tuần tự thẳng tắp', 'Cấu trúc Lặp vô tận', 'Không phải thuật toán'],
      correctIndex: 0,
      explanation: 'Khi một hành động được quyết định dựa trên một ĐIỀU KIỆN đúng hay sai, đó là cấu trúc Rẽ nhánh.'
    },
    {
      id: 18,
      question: 'Trong khối lệnh rẽ nhánh "Nếu <Điều kiện> Thì <Hành động A>", khi nào <Hành động A> được máy tính thực hiện?',
      options: ['Chỉ thực hiện khi <Điều kiện> được kiểm tra là ĐÚNG', 'Thực hiện ngay cả khi điều kiện bị SAI', 'Không bao giờ thực hiện', 'Chỉ thực hiện khi tắt máy'],
      correctIndex: 0,
      explanation: 'Trong cấu trúc Khuyết (Nếu... Thì...), hành động chỉ diễn ra khi điều kiện thỏa mãn (Đúng).'
    },
    {
      id: 19,
      question: 'Nếu áp dụng quy tắc: "NẾU tổng điểm >= 9 THÌ xếp loại Xuất sắc, NẾU KHÔNG THÌ xếp loại Chăm chỉ", bạn An đạt 10 điểm sẽ được xếp loại gì?',
      options: ['Xếp loại Xuất sắc (vì điều kiện 10 >= 9 là Đúng)', 'Xếp loại Chăm chỉ', 'Không được xếp loại', 'Bị trừ điểm'],
      correctIndex: 0,
      explanation: 'Vì 10 >= 9 là điều kiện Đúng, chương trình sẽ thực hiện nhánh sau từ khóa THÌ.'
    },
    {
      id: 20,
      question: 'Khi Robot đi trong mê cung có gắn cảm biến: "NẾU phía trước có đá chắn THÌ Quay phải 90°, NẾU KHÔNG THÌ Đi thẳng", gặp ô trống không có đá Robot sẽ làm gì?',
      options: ['Robot sẽ Đi thẳng 1 bước (thực hiện nhánh NẾU KHÔNG THÌ)', 'Robot sẽ Quay phải 90°', 'Robot tự tắt nguồn', 'Robot đi lùi'],
      correctIndex: 0,
      explanation: 'Vì phía trước trống (điều kiện "có đá" là Sai), Robot thực hiện lệnh ở nhánh "Nếu không thì" là Đi thẳng.'
    },

    // Bài 6: Chia nhỏ bài toán (Decomposition)
    {
      id: 21,
      question: 'Khi gặp một mê cung rộng lớn hoặc một công việc phức tạp, phương pháp "Chia để trị" trong tư duy máy tính khuyên em làm gì?',
      options: ['Chia nhiệm vụ lớn thành các chặng nhỏ đơn giản hơn để giải quyết lần lượt từng chặng', 'Bỏ cuộc ngay vì thấy dài', 'Làm tất cả mọi thứ rối tung cùng một lúc', 'Đợi người khác làm hộ'],
      correctIndex: 0,
      explanation: 'Chia bài toán lớn thành các bài toán con (Decomposition) giúp mọi vấn đề phức tạp trở nên dễ dàng.'
    },
    {
      id: 22,
      question: 'Trong mê cung chữ Z có một khúc cua ở giữa, em có thể chia đường đi của Robot thành mấy chặng nhỏ?',
      options: ['3 chặng: Chặng 1 đi ngang đầu tiên -> Chặng 2 rẽ xuống khúc giữa -> Chặng 3 rẽ ngang về đích', 'Không thể chia được', '100 chặng ngẫu nhiên', 'Đi chéo xuyên tường'],
      correctIndex: 0,
      explanation: 'Chia đường chữ Z thành 3 đoạn thẳng nối với nhau bằng các góc quay giúp em đếm bước đi cực kỳ chính xác.'
    },
    {
      id: 23,
      question: 'Ba cấu trúc điều khiển cơ bản nhất tạo nên MỌI chương trình máy tính trên thế giới là gì?',
      options: ['Tuần tự, Rẽ nhánh và Lặp', 'Bàn phím, Chuột và Màn hình', 'Sao chép, Cắt và Dán', 'Đậm, Nghiêng và Gạch chân'],
      correctIndex: 0,
      explanation: 'Mọi phần mềm, trò chơi từ đơn giản đến phức tạp đều được xây dựng từ 3 cấu trúc: Tuần tự, Rẽ nhánh và Lặp.'
    },
    {
      id: 24,
      question: 'Ngôn ngữ lập trình trực quan kéo thả khối lệnh (như Scratch hoặc Blockly) có ưu điểm gì cho học sinh tiểu học?',
      options: ['Các câu lệnh được thiết kế thành các khối ghép hình màu sắc như xếp gạch Lego, không sợ gõ sai cú pháp', 'Chỉ toàn chữ số 0 và 1', 'Phải nhớ hàng nghìn từ tiếng Pháp', 'Không chạy được trên máy tính'],
      correctIndex: 0,
      explanation: 'Lập trình kéo thả khối lệnh giúp học sinh tập trung rèn tư duy thuật toán một cách trực quan, sinh động.'
    },

    // Bài 7: Tối ưu hóa số bước lệnh
    {
      id: 25,
      question: 'Trong một mê cung có hai con đường đều dẫn tới cờ đích: Đường A tốn 6 bước lệnh, Đường B tốn 12 bước lệnh. Lập trình viên giỏi sẽ chọn đường nào?',
      options: ['Chọn Đường A (6 bước lệnh) vì ngắn gọn, tối ưu thời gian và tiết kiệm năng lượng cho Robot', 'Chọn Đường B cho Robot đi mỏi chân', 'Đi lòng vòng 50 bước', 'Không đi đường nào'],
      correctIndex: 0,
      explanation: 'Tối ưu hóa thuật toán là tìm ra cách giải quyết đúng đắn với số bước thực hiện ít nhất và nhanh nhất.'
    },
    {
      id: 26,
      question: 'Giả sử mỗi bài tập mê cung có quy định "Tối đa 8 khối lệnh", quy định này rèn luyện cho em kỹ năng gì?',
      options: ['Suy nghĩ tìm lộ trình ngắn nhất, tránh các lệnh quay vòng dư thừa không cần thiết', 'Bấm đại cho đủ 8 lệnh', 'Làm hạn chế máy tính', 'Không có ý nghĩa gì'],
      correctIndex: 0,
      explanation: 'Giới hạn số khối lệnh khuyến khích học sinh loại bỏ thao tác thừa (như Quay trái rồi lại Quay phải ngay tại chỗ).'
    },
    {
      id: 27,
      question: 'Trong chuỗi lệnh: "[Đi thẳng -> Quay trái -> Quay phải -> Đi thẳng]", hai lệnh nào ở giữa đang tự triệt tiêu nhau và có thể xóa bỏ cho gọn?',
      options: ['Cặp lệnh "Quay trái -> Quay phải" đứng liền nhau', 'Hai lệnh "Đi thẳng"', 'Không có lệnh nào thừa', 'Xóa hết cả 4 lệnh'],
      correctIndex: 0,
      explanation: 'Quay trái 90° rồi lập tức Quay phải 90° ngay tại chỗ thì Robot vẫn nhìn về hướng cũ, nên bỏ đi sẽ tiết kiệm được 2 lệnh!'
    },
    {
      id: 28,
      question: 'Thay vì cho Robot thực hiện 3 lần liên tiếp lệnh "Quay phải 90°" (tốn 3 khối lệnh), em có thể thay bằng 1 khối lệnh duy nhất nào mà hướng mặt Robot vẫn giống hệt?',
      options: ['1 khối lệnh "Quay trái 90°"', '1 khối lệnh "Đi thẳng"', '2 khối lệnh "Đi thẳng"', 'Không thay thế được'],
      correctIndex: 0,
      explanation: 'Quay phải 3 lần (270 độ theo chiều kim đồng hồ) chính là Quay trái 1 lần (90 độ ngược chiều kim đồng hồ)!'
    },

    // Bài 8: Phát hiện và sửa lỗi chương trình (Debugging)
    {
      id: 29,
      question: 'Trong tin học và lập trình, thuật ngữ "Bug" (Lỗi) và "Debug" (Gỡ lỗi) có nghĩa là gì?',
      options: [
        'Bug là lỗi sai trong chương trình; Debug là quá trình kiểm tra, tìm ra nguyên nhân lỗi và sửa lại cho đúng',
        'Bug là phần thưởng; Debug là xóa chương trình',
        'Bug là chuột máy tính; Debug là miếng lót chuột',
        'Bug là màn hình; Debug là bàn phím'
      ],
      correctIndex: 0,
      explanation: 'Mọi lập trình viên đều gặp Bug; kỹ năng quan sát để Debug (sửa lỗi) giúp chương trình hoàn thiện.'
    },
    {
      id: 30,
      question: 'Khi em nhấn "Chạy thử chương trình" mà thấy Robot đi đúng được 3 bước đầu, đến bước thứ 4 thì rẽ nhầm hướng đâm vào đá, em nên sửa như thế nào?',
      options: [
        'Giữ nguyên 3 bước đầu đã đúng, chỉ kiểm tra và sửa lại khối lệnh từ bước thứ 4 trở đi',
        'Xóa sạch toàn bộ chương trình và tắt máy',
        'Bấm chạy lại 10 lần mà không sửa lệnh nào',
        'Đổ lỗi cho máy tính bị hỏng'
      ],
      correctIndex: 0,
      explanation: 'Theo dõi từng bước chạy của Robot giúp khoanh vùng đúng vị trí lệnh bị sai để chỉnh sửa nhanh chóng.'
    },
    {
      id: 31,
      question: 'Tại sao việc chạy thử (Test) chương trình từng đoạn ngắn lại là thói quen rất tốt khi giải các mê cung khó?',
      options: ['Giúp kiểm tra ngay xem Robot đã đi đúng hướng đến điểm giữa chưa trước khi viết tiếp đoạn cuối', 'Làm tốn pin máy tính', 'Làm mê cung biến mất', 'Không nên chạy thử'],
      correctIndex: 0,
      explanation: 'Viết lệnh đến đâu kiểm thử (Test) đến đó giúp phát hiện lỗi sớm và dễ sửa hơn rất nhiều.'
    },
    {
      id: 32,
      question: 'Tư duy thuật toán học được từ môn Tin học giúp ích gì cho em khi học môn Toán hoặc làm việc nhà?',
      options: ['Biết lập kế hoạch từng bước rõ ràng, làm việc có trình tự khoa học và bình tĩnh tìm cách sửa sai khi gặp vướng mắc', 'Chỉ áp dụng được cho Robot trong màn hình', 'Giúp không cần làm việc nhà', 'Chỉ dùng để vẽ tranh'],
      correctIndex: 0,
      explanation: 'Tư duy thuật toán là kỹ năng sống quý giá giúp em giải quyết mọi công việc học tập và đời sống một cách thông minh.'
    }
  ],

  // ============================================================================
  // 9. CÔNG DÂN SỐ (6 bài x 5 câu = 30 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  digitalCitizenship: [
    // Bài 1: Bảo vệ thông tin cá nhân trên mạng
    {
      id: 1,
      question: 'Những thông tin nào sau đây thuộc về "Thông tin cá nhân riêng tư" cần được giữ bí mật trên mạng Internet?',
      options: [
        'Họ tên đầy đủ, ngày sinh, địa chỉ nhà riêng, số điện thoại của bố mẹ, tên trường lớp và mật khẩu tài khoản',
        'Tên thủ đô Hà Nội của nước Việt Nam',
        'Công thức tính chu vi hình chữ nhật',
        'Bài thơ Hạt gạo làng ta trong sách giáo khoa'
      ],
      correctIndex: 0,
      explanation: 'Thông tin cá nhân và gia đình là dữ liệu riêng tư cần được bảo vệ, không đăng công khai lên mạng.'
    },
    {
      id: 2,
      question: 'Nếu một người mới quen trong trò chơi trực tuyến hỏi địa chỉ nhà và giờ bố mẹ em đi làm vắng để "đến tặng quà miễn phí", em phải làm gì?',
      options: ['Tuyệt đối không cho biết, từ chối ngay và kể lại cho bố mẹ nghe', 'Vui vẻ nhắn ngay địa chỉ nhà và số điện thoại', 'Hẹn gặp người lạ đó ở công viên một mình', 'Chụp ảnh sổ hộ khẩu gia đình gửi cho họ'],
      correctIndex: 0,
      explanation: 'Kẻ xấu trên mạng có thể đóng giả người tốt tặng quà để lấy thông tin gia đình; luôn cảnh giác và báo cho bố mẹ.'
    },
    {
      id: 3,
      question: 'Tại sao em không nên đăng tải công khai vị trí thời gian thực (Check-in trực tiếp) khi đang đi chơi xa cùng gia đình?',
      options: ['Vì kẻ gian có thể biết cả gia đình đang đi vắng không có ai ở nhà hoặc theo dõi vị trí của em', 'Vì làm điện thoại nặng hơn', 'Vì mạng Internet cấm đăng ảnh', 'Không có nguy cơ gì'],
      correctIndex: 0,
      explanation: 'Giữ kín lịch trình di chuyển giúp đảm bảo an toàn cho bản thân và ngôi nhà của gia đình.'
    },
    {
      id: 4,
      question: '"Dấu chân kỹ thuật số" (Digital Footprint) trên môi trường mạng là gì?',
      options: ['Toàn bộ những bài đăng, bình luận, hình ảnh, lịch sử hoạt động mà một người để lại khi sử dụng Internet', 'Vết giày dép in trên sàn phòng máy tính', 'Hình vẽ bàn chân trong phần mềm Paint', 'Tên một loại bàn phím'],
      correctIndex: 0,
      explanation: 'Những gì đăng lên mạng rất khó xóa bỏ hoàn toàn và tạo thành dấu chân số của em, vì vậy hãy cân nhắc kỹ trước khi đăng.'
    },
    {
      id: 5,
      question: 'Trước khi đăng bức ảnh chụp chung có mặt các bạn cùng lớp lên mạng, hành động lịch sự và tôn trọng quyền riêng tư là gì?',
      options: ['Hỏi ý kiến và được sự đồng ý của các bạn cùng thầy cô/bố mẹ trước khi đăng', 'Tự ý đăng những bức ảnh dìm hàng làm bạn xấu hổ', 'Đăng kèm số điện thoại của bạn lên mạng', 'Không cần hỏi ai cả'],
      correctIndex: 0,
      explanation: 'Mỗi cá nhân đều có quyền đối với hình ảnh của mình; xin phép trước khi đăng là biểu hiện của công dân số văn minh.'
    },

    // Bài 2: Tạo và giữ mật khẩu mạnh, an toàn
    {
      id: 6,
      question: 'Trong các mật khẩu dưới đây, mật khẩu nào là MẬT KHẨU MẠNH và khó bị kẻ xấu đoán ra nhất?',
      options: ['TinHoc#2026!Vui', '123456', 'abcdef', 'nguyenvanan'],
      correctIndex: 0,
      explanation: 'Mật khẩu mạnh có độ dài từ 8 ký tự trở lên, kết hợp chữ HOA, chữ thường, chữ số và ký hiệu đặc biệt (#, !, @).'
    },
    {
      id: 7,
      question: 'Vì sao không nên đặt mật khẩu tài khoản là "123456" hoặc chính ngày tháng năm sinh của mình?',
      options: ['Vì đây là những dãy số quá phổ biến, người lạ hoặc phần mềm dò mật khẩu có thể đoán trúng ngay trong vài giây', 'Vì bàn phím không gõ được số 123456', 'Vì máy tính sẽ không lưu được', 'Vì quá dài khó nhớ'],
      correctIndex: 0,
      explanation: '123456, 000000 hay ngày sinh là những mật khẩu yếu nhất, rất dễ bị đánh cắp tài khoản.'
    },
    {
      id: 8,
      question: 'Em có thể chia sẻ mật khẩu tài khoản học tập của mình cho những ai?',
      options: ['Chỉ chia sẻ với bố mẹ (người giám hộ); không tiết lộ cho người lạ hay bạn bè trên mạng', 'Viết mật khẩu dán lên bảng tin của trường cho cả trường biết', 'Bình luận mật khẩu dưới video trên mạng', 'Nhắn cho bất kỳ ai hỏi thăm'],
      correctIndex: 0,
      explanation: 'Mật khẩu giống như chìa khóa ngôi nhà số của em, chỉ bố mẹ mới nên biết để hỗ trợ em.'
    },
    {
      id: 9,
      question: 'Sau khi đăng nhập tài khoản cá nhân trên máy tính dùng chung ở phòng tin học hoặc thư viện, việc BẮT BUỘC phải làm trước khi đứng dậy là gì?',
      options: ['Đăng xuất (Log out / Sign out) khỏi tài khoản và đóng trình duyệt', 'Bấm nút "Lưu mật khẩu mãi mãi" trên máy công cộng', 'Để nguyên màn hình đang mở tài khoản rồi đi về', 'Tắt mỗi công tắc màn hình'],
      correctIndex: 0,
      explanation: 'Đăng xuất (Log out) ngăn người dùng tiếp theo sử dụng trái phép tài khoản của em.'
    },
    {
      id: 10,
      question: 'Mã xác thực OTP (One-Time Password) gửi về điện thoại của bố mẹ dùng để làm gì và có được đọc cho người lạ không?',
      options: ['Dùng để xác nhận bảo mật giao dịch/đăng nhập; TUYỆT ĐỐI KHÔNG đọc mã OTP cho bất kỳ người lạ nào', 'Là mã trúng thưởng trò chơi nên gửi cho tất cả mọi người', 'Là số thứ tự xếp hàng', 'Là mật khẩu Wi-Fi miễn phí'],
      correctIndex: 0,
      explanation: 'Lộ mã OTP cho kẻ gian có thể làm mất tài khoản hoặc mất tiền trong ngân hàng của bố mẹ.'
    },

    // Bài 3: Ứng xử văn minh & Phòng chống bắt nạt trên mạng
    {
      id: 11,
      question: 'Quy tắc vàng về giao tiếp văn minh khi nhắn tin, bình luận trên không gian mạng là gì?',
      options: [
        'Sử dụng ngôn từ lịch sự, lễ phép, tôn trọng người khác giống như khi đang trò chuyện trực tiếp ngoài đời thực',
        'Vì không ai nhìn thấy mặt mình nên muốn nói năng thô lỗ thế nào cũng được',
        'Viết toàn chữ IN HOA kèm lời lẽ quát tháo bạn bè',
        'Gửi hàng trăm tin nhắn rác làm phiền nhóm lớp'
      ],
      correctIndex: 0,
      explanation: 'Phía sau màn hình máy tính đều là con người thật có cảm xúc; hãy luôn giữ thái độ lịch sự và nhân ái.'
    },
    {
      id: 12,
      question: 'Hành vi nào sau đây được gọi là "Bắt nạt qua mạng" (Cyberbullying) và cần bị lên án?',
      options: [
        'Cố tình đăng ảnh chế giễu, tung tin đồn xấu, lập nhóm tẩy chay hoặc nhắn tin đe dọa làm bạn tổn thương',
        'Nhắn tin hỏi thăm khi bạn bị ốm nghỉ học',
        'Hướng dẫn bạn cách giải bài toán khó',
        'Chúc mừng khi bạn đạt giải thưởng'
      ],
      correctIndex: 0,
      explanation: 'Bắt nạt qua mạng gây tổn thương tinh thần nặng nề cho nạn nhân và vi phạm quy tắc đạo đức học đường.'
    },
    {
      id: 13,
      question: 'Nếu chẳng may em (hoặc một người bạn cùng lớp) bị kẻ xấu nhắn tin trêu chọc, đe dọa hoặc bắt nạt trên mạng, cách xử lý đúng nhất là gì?',
      options: [
        'Không nhắn tin cãi lại, chụp màn hình làm bằng chứng, chặn (Block) tài khoản đó và tâm sự ngay với bố mẹ, thầy cô giáo',
        'Sợ hãi giấu kín một mình không dám nói với ai',
        'Làm theo mọi yêu cầu của kẻ bắt nạt',
        'Gọi hội bạn lên mạng chửi bới lại'
      ],
      correctIndex: 0,
      explanation: 'Bố mẹ và thầy cô luôn ở bên bảo vệ em; hãy lưu bằng chứng, chặn kẻ xấu và báo ngay cho người lớn tin cậy.'
    },
    {
      id: 14,
      question: 'Khi thấy một bài đăng trên mạng đang chế giễu, nói xấu một người bạn trong trường, em nên làm gì?',
      options: [
        'Không bấm Thích (Like), không bình luận hùa theo, không chia sẻ (Share) và báo cho thầy cô biết để giúp đỡ bạn',
        'Bấm Chia sẻ (Share) ngay cho nhiều người cùng xem',
        'Vào bình luận trêu chọc thêm cho vui',
        'Tải ảnh về đăng lại lên trang của mình'
      ],
      correctIndex: 0,
      explanation: 'Không tiếp tay lan truyền nội dung bắt nạt là hành động dũng cảm bảo vệ bạn bè.'
    },
    {
      id: 15,
      question: 'Khi thảo luận nhóm học tập trực tuyến mà ý kiến của bạn khác với ý kiến của em, em nên phản hồi như thế nào?',
      options: ['Lắng nghe hết ý kiến của bạn và trao đổi lại bằng lời lẽ nhẹ nhàng, tôn trọng, có lý lẽ xây dựng', 'Kích bạn ra khỏi nhóm học tập ngay lập tức', 'Chê bai bạn là ngốc nghếch', 'Tắt máy không thèm học nữa'],
      correctIndex: 0,
      explanation: 'Tôn trọng sự khác biệt và trao đổi văn minh giúp cả nhóm cùng tiến bộ.'
    },

    // Bài 4: Nhận diện tin giả & Cảnh giác lừa đảo trực tuyến
    {
      id: 16,
      question: 'Mọi thông tin, bài viết, video đăng tải tràn lan trên mạng xã hội có phải lúc nào cũng đúng sự thật 100% không?',
      options: [
        'Không; trên mạng có cả thông tin chính thống bổ ích lẫn tin giả (Fake News), tin sai sự thật chưa kiểm chứng',
        'Tất cả những gì viết trên mạng đều đúng 100%',
        'Video nào có nhiều lượt xem thì chắc chắn là thật',
        'Chỉ có sách giấy mới có lỗi còn mạng xã hội không bao giờ sai'
      ],
      correctIndex: 0,
      explanation: 'Bất kỳ ai cũng có thể đăng bài lên mạng xã hội, vì vậy cần có tư duy phản biện và kiểm chứng nguồn tin.'
    },
    {
      id: 17,
      question: 'Dấu hiệu nào giúp em nhận biết một thông báo trên mạng có khả năng rất cao là LỪA ĐẢO (Scam)?',
      options: [
        'Thông báo "Chúc mừng bạn trúng thưởng iPhone miễn phí, hãy bấm ngay vào link lạ và nhập mật khẩu/số thẻ ngân hàng để nhận quà"',
        'Thông báo lịch nghỉ lễ Tết đăng trên trang web chính thức của nhà trường',
        'Bài giảng Tin học của thầy cô giáo trên lớp',
        'Trang web tra từ điển tiếng Anh của nhà xuất bản giáo dục'
      ],
      correctIndex: 0,
      explanation: 'Chiêu trò "trúng thưởng quà lớn miễn phí yêu cầu bấm link lạ, đóng phí hoặc nhập mật khẩu" là bẫy lừa đảo phổ biến nhất.'
    },
    {
      id: 18,
      question: 'Để kiểm tra xem một thông tin về khoa học, lịch sử hay giáo dục trên mạng có đáng tin cậy hay không, em nên đối chiếu với đâu?',
      options: [
        'Đối chiếu với Sách giáo khoa, hỏi thầy cô giáo, bố mẹ hoặc xem trên các trang báo điện tử chính thống của Nhà nước (.gov.vn, .edu.vn)',
        'Tin ngay lời đồn của một tài khoản ẩn danh không rõ tên tuổi',
        'Xem số lượng biểu tượng cảm xúc dưới bài viết',
        'Không cần kiểm tra, cứ chia sẻ ngay'
      ],
      correctIndex: 0,
      explanation: 'Nguồn tin chính thống (.edu.vn, .gov.vn), sách giáo khoa và thầy cô là thước đo kiểm chứng chuẩn xác nhất.'
    },
    {
      id: 19,
      question: 'Tác hại của việc vội vàng bấm nút "Chia sẻ" (Share) các tin đồn thất thiệt, tin giả chưa kiểm chứng lên mạng là gì?',
      options: ['Gây hoang mang lo lắng cho cộng đồng, ảnh hưởng xấu đến người khác và có thể vi phạm pháp luật', 'Giúp mình trở nên nổi tiếng tốt đẹp', 'Làm mạng Internet chạy nhanh hơn', 'Không gây ảnh hưởng gì cho ai'],
      correctIndex: 0,
      explanation: 'Mỗi công dân số cần có trách nhiệm: "Kiểm chứng trước khi tin, suy nghĩ kỹ trước khi chia sẻ".'
    },
    {
      id: 20,
      question: 'Nếu nhận được cuộc gọi video hoặc tin nhắn giọng nói có khuôn mặt/giọng giống người thân đang hốt hoảng vay tiền gấp (nghi ngờ dùng công nghệ giả mạo Deepfake), gia đình cần làm gì?',
      options: ['Bình tĩnh gọi điện thoại trực tiếp qua số di động thật của người thân đó để xác minh, tuyệt đối không chuyển tiền ngay', 'Chuyển tiền ngay lập tức không cần hỏi lại', 'Gửi hết mật khẩu ngân hàng qua tin nhắn', 'Xóa danh bạ điện thoại'],
      correctIndex: 0,
      explanation: 'Luôn xác minh qua cuộc gọi điện thoại thông thường hoặc gặp trực tiếp để phòng chống lừa đảo công nghệ cao.'
    },

    // Bài 5: Tôn trọng quyền tác giả và bản quyền số
    {
      id: 21,
      question: '"Quyền tác giả" (Bản quyền - Copyright) đối với một bức tranh vẽ, bài văn, bản nhạc hay đoạn code phần mềm là gì?',
      options: [
        'Quyền của người đã lao động sáng tạo ra tác phẩm đó được ghi nhận tên tác giả và bảo vệ tác phẩm không bị sao chép trái phép',
        'Ai tìm thấy bức tranh trên mạng trước thì người đó trở thành người vẽ',
        'Mọi thứ trên Internet đều không có tác giả',
        'Chỉ có sách in mới có tác giả còn bài trên mạng thì không'
      ],
      correctIndex: 0,
      explanation: 'Mỗi bài viết, bức ảnh, bản nhạc đều là công sức trí tuệ của tác giả và được pháp luật bảo hộ bản quyền.'
    },
    {
      id: 22,
      question: 'Khi em sưu tầm một bức ảnh hoặc một đoạn thông tin hay trên mạng để đưa vào bài thuyết trình của mình, em cần làm gì để tôn trọng bản quyền?',
      options: ['Ghi rõ nguồn trích dẫn và tên tác giả ở cuối bức ảnh hoặc cuối trang chiếu (ví dụ: Nguồn ảnh: Báo Thiếu niên Tiền phong)', 'Xóa tên tác giả trên bức ảnh rồi ghi tên mình vào', 'Nói với cô giáo rằng chính em tự chụp bức ảnh đó ở Bắc Cực', 'Cấm các bạn khác nhìn vào bức ảnh'],
      correctIndex: 0,
      explanation: 'Ghi rõ nguồn và tên tác giả khi trích dẫn tư liệu phục vụ học tập là hành động trung thực và tôn trọng bản quyền.'
    },
    {
      id: 23,
      question: 'Hành vi "Đạo văn" (Plagiarism) trong học tập là hành vi như thế nào?',
      options: ['Sao chép nguyên văn bài viết, sản phẩm của người khác rồi nộp dưới tên của mình như thể do mình tự làm ra', 'Đọc sách tham khảo để mở rộng vốn từ rồi tự viết bài bằng lời văn của mình', 'Trích dẫn một câu danh ngôn và ghi rõ tên nhà văn', 'Cùng bạn thảo luận nhóm theo phân công của cô giáo'],
      correctIndex: 0,
      explanation: 'Đạo văn là hành vi thiếu trung thực; học sinh cần tự suy nghĩ và diễn đạt bằng chính sự hiểu biết của mình.'
    },
    {
      id: 24,
      question: 'Vì sao chúng ta nên sử dụng các phần mềm có bản quyền hợp pháp hoặc phần mềm nguồn mở miễn phí thay vì tải các bản bẻ khóa (Crack) lậu trên mạng?',
      options: ['Vì phần mềm bẻ khóa lậu vừa vi phạm bản quyền tác giả, vừa thường bị cài cắm sẵn virus và mã độc đánh cắp dữ liệu', 'Vì phần mềm lậu giúp máy tính sạch hơn', 'Vì phần mềm bản quyền làm hỏng màn hình', 'Không có sự khác biệt nào'],
      correctIndex: 0,
      explanation: 'Phần mềm không rõ nguồn gốc (Crack) là con đường ngắn nhất khiến máy tính bị nhiễm virus và mã độc tống tiền.'
    },
    {
      id: 25,
      question: 'Ký hiệu quốc tế nào thường được đặt bên cạnh tên tác giả hoặc tên tổ chức ở cuối trang web để báo hiệu tác phẩm được bảo hộ Bản quyền?',
      options: ['Chữ C nằm trong vòng tròn: © (Copyright)', 'Dấu chấm hỏi: ?', 'Dấu cộng: +', 'Chữ Z nằm trong hình vuông'],
      correctIndex: 0,
      explanation: 'Biểu tượng © (viết tắt của từ Copyright) là ký hiệu quốc tế chỉ bản quyền tác giả.'
    },

    // Bài 6: Bảo vệ máy tính khỏi mã độc & Cân bằng sức khỏe số
    {
      id: 26,
      question: 'Virus máy tính và phần mềm độc hại (Malware) là gì?',
      options: [
        'Những chương trình xấu được viết ra nhằm xâm nhập trái phép, làm hỏng tệp tin, đánh cắp mật khẩu hoặc làm tê liệt máy tính',
        'Một loài vi khuẩn gây cảm cúm cho con người qua đường hô hấp',
        'Bụi bẩn bám trên vỏ màn hình máy tính',
        'Một trò chơi học toán bổ ích'
      ],
      correctIndex: 0,
      explanation: 'Virus máy tính là các đoạn mã độc lây lan qua tệp tải về từ mạng hoặc thiết bị USB bị nhiễm độc.'
    },
    {
      id: 27,
      question: 'Biện pháp nào sau đây giúp bảo vệ máy tính của gia đình và phòng học an toàn trước virus máy tính?',
      options: [
        'Bật phần mềm bảo vệ/diệt virus (như Windows Security), cập nhật hệ điều hành và không bấm vào đường link hay tệp đính kèm lạ',
        'Tắt hết mọi hàng rào bảo mật để tải tệp lạ trên mạng',
        'Cắm mọi chiếc USB nhặt được ngoài đường vào máy tính mở xem',
        'Lấy khăn ướt lau ổ cứng'
      ],
      correctIndex: 0,
      explanation: 'Kết hợp phần mềm diệt virus với thói quen cẩn trọng không mở tệp lạ giúp bảo vệ máy tính an toàn.'
    },
    {
      id: 28,
      question: 'Thói quen sử dụng máy tính và thiết bị thông minh nào sau đây thể hiện "Sức khỏe số lành mạnh" (Digital Wellbeing)?',
      options: [
        'Sử dụng máy tính đúng mục đích học tập trong khung giờ quy định, kết hợp đọc sách giấy, chơi thể thao ngoài trời và giúp đỡ gia đình',
        'Ngồi dán mắt vào màn hình suốt 6 tiếng mỗi ngày, bỏ cả bữa ăn và giờ ngủ',
        'Mang điện thoại vào chăn xem lén lúc nửa đêm làm hại mắt',
        'Cáu gắt khi bố mẹ nhắc nhở tắt máy đi ngủ'
      ],
      correctIndex: 0,
      explanation: 'Làm chủ công nghệ là biết cân bằng thời gian sử dụng màn hình với vận động thể chất và gắn kết gia đình.'
    },
    {
      id: 29,
      question: 'Khi đang dùng máy tính mà gặp một hình ảnh hoặc nội dung xấu, đáng sợ khiến em cảm thấy bất an, em nên làm gì ngay lập tức?',
      options: ['Đóng cửa sổ trang web đó lại (hoặc tắt màn hình) và nói ngay với bố mẹ, thầy cô để được hỗ trợ chặn trang web đó', 'Cố xem tiếp rồi gửi cho bạn bè cùng sợ', 'Giấu bố mẹ và tự bấm vào các nút quảng cáo bên trong', 'Đập vỡ màn hình máy tính'],
      correctIndex: 0,
      explanation: 'Đóng ngay nội dung xấu và chia sẻ với bố mẹ, thầy cô là cách xử lý thông minh và an toàn nhất.'
    },
    {
      id: 30,
      question: 'Phẩm chất cốt lõi của một "Công dân số gương mẫu" lứa tuổi thiếu nhi là gì?',
      options: ['An toàn bảo mật, Trung thực tôn trọng bản quyền, Ứng xử lịch sự nhân ái và Biết làm chủ thời gian sử dụng công nghệ', 'Biết chơi mọi trò chơi điện tử trên mạng', 'Có thật nhiều tài khoản mạng xã hội ảo', 'Dành toàn bộ thời gian rảnh trên mạng'],
      correctIndex: 0,
      explanation: 'An toàn - Văn minh - Trung thực - Lành mạnh là 4 trụ cột của người công dân số thời đại mới.'
    }
  ],

  // ============================================================================
  // 10. DÙNG AI (4 bài x 5 câu = 20 câu hỏi hoàn toàn khác nhau)
  // ============================================================================
  ai: [
    // Bài 1: Khám phá Trí tuệ nhân tạo (AI) quanh em
    {
      id: 1,
      question: 'Chữ viết tắt "AI" (Artificial Intelligence) trong môn Tin học có nghĩa tiếng Việt là gì?',
      options: ['Trí tuệ nhân tạo', 'Mạng máy tính nội bộ', 'Bộ nhớ lưu trữ ngoài', 'Bàn phím thông minh'],
      correctIndex: 0,
      explanation: 'AI (Artificial Intelligence) là Trí tuệ nhân tạo - công nghệ giúp máy tính mô phỏng khả năng học hỏi và suy luận của con người.'
    },
    {
      id: 2,
      question: 'Thiết bị hoặc ứng dụng nào dưới đây trong cuộc sống hàng ngày có ứng dụng công nghệ Trí tuệ nhân tạo (AI)?',
      options: [
        'Mở khóa khuôn mặt (FaceID), Trợ lý ảo giọng nói, Google Dịch tự động và Robot hút bụi tự tránh đồ vật',
        'Chiếc thước kẻ nhựa trong hộp bút',
        'Bóng đèn dây tóc bật bằng công tắc tay',
        'Chiếc xe đạp đạp bằng sức chân thông thường'
      ],
      correctIndex: 0,
      explanation: 'Nhận diện khuôn mặt, hiểu giọng nói, dịch thuật thông minh và tự động tìm đường đều sử dụng các mô hình AI.'
    },
    {
      id: 3,
      question: 'Điểm khác biệt lớn nhất giữa một chương trình máy tính truyền thống và một hệ thống Trí tuệ nhân tạo (AI) là gì?',
      options: [
        'AI có khả năng "học hỏi" từ dữ liệu để nhận diện quy luật và xử lý các tình huống mới linh hoạt hơn',
        'AI không cần dùng đến máy tính hay điện năng',
        'Chương trình truyền thống biết buồn vui như người thật',
        'AI chỉ biết làm phép cộng 1 + 1'
      ],
      correctIndex: 0,
      explanation: 'Nhờ công nghệ Học máy (Machine Learning), AI có thể học từ hàng triệu ví dụ dữ liệu để ngày càng chính xác hơn.'
    },
    {
      id: 4,
      question: 'Trong lĩnh vực y tế và bảo vệ môi trường, con người ứng dụng AI để làm những việc có ích nào?',
      options: ['Hỗ trợ bác sĩ đọc ảnh chụp X-quang phát hiện bệnh sớm, dự báo thời tiết bão lũ và nhận diện cháy rừng từ vệ tinh', 'Thay thế hoàn toàn tình yêu thương của bác sĩ', 'Tạo ra nhiều rác thải nhựa hơn', 'Làm trái đất nóng lên'],
      correctIndex: 0,
      explanation: 'AI là trợ thủ đắc lực giúp các nhà khoa học và bác sĩ phân tích dữ liệu lớn nhằm cứu người và bảo vệ thiên nhiên.'
    },
    {
      id: 5,
      question: 'Trong học tập ngoại ngữ (như tiếng Anh), các ứng dụng AI có thể hỗ trợ học sinh tiểu học như thế nào?',
      options: ['Lắng nghe em phát âm, chỉ ra từ phát âm chưa chuẩn để luyện nói và giải thích nghĩa từ vựng sinh động', 'Đi thi nói tiếng Anh thay cho em ở trường', 'Giúp em thuộc bài mà không cần đọc hay nghe gì cả', 'Xóa môn tiếng Anh khỏi thời khóa biểu'],
      correctIndex: 0,
      explanation: 'AI nhận diện giọng nói giúp học sinh luyện phát âm ngoại ngữ mọi lúc mọi nơi rất hiệu quả.'
    },

    // Bài 2: Cách AI học tập từ dữ liệu và giới hạn của AI
    {
      id: 6,
      question: 'Để một chương trình AI có thể phân biệt được đâu là ảnh "Con mèo" và đâu là ảnh "Con chó", các kỹ sư đã dạy AI bằng cách nào?',
      options: [
        'Cung cấp cho AI hàng nghìn bức ảnh mẫu về mèo và chó có gắn nhãn đúng để AI tự học các đặc điểm nhận dạng',
        'Đưa cho máy tính một con mèo thật để máy tính nuôi',
        'Gõ chữ "Con mèo" 3 lần vào bàn phím',
        'AI tự nhiên sinh ra đã biết hết không cần dữ liệu'
      ],
      correctIndex: 0,
      explanation: 'AI học qua dữ liệu huấn luyện (Training Data): càng có nhiều dữ liệu mẫu chuẩn xác thì AI nhận diện càng giỏi.'
    },
    {
      id: 7,
      question: 'Nếu dữ liệu dùng để dạy (huấn luyện) cho AI bị sai lệch hoặc thiếu chính xác thì kết quả do AI đưa ra sẽ như thế nào?',
      options: ['AI cũng sẽ học theo cái sai đó và đưa ra kết quả sai lệch, thiếu chính xác', 'AI vẫn luôn đúng 100% không bao giờ sai', 'Máy tính sẽ tự động biến dữ liệu sai thành đúng', 'Không ảnh hưởng gì tới kết quả'],
      correctIndex: 0,
      explanation: 'Trong khoa học dữ liệu có nguyên tắc: Dữ liệu đầu vào sai sẽ dẫn đến kết quả đầu ra sai (Garbage In, Garbage Out).'
    },
    {
      id: 8,
      question: 'Hiện tượng "Ảo giác AI" (AI Hallucination) là hiện tượng gì mà người dùng cần hết sức lưu ý?',
      options: [
        'Khi AI không biết chắc câu trả lời nhưng vẫn tự suy diễn và viết ra một thông tin sai sự thật với giọng văn rất tự tin',
        'Màn hình máy tính bị nhòe màu cầu vồng',
        'AI hiện hình bước ra khỏi màn hình',
        'Máy tính chạy quá nhanh'
      ],
      correctIndex: 0,
      explanation: 'AI tạo sinh ghép các từ theo xác suất ngôn ngữ nên đôi khi bịa ra sự kiện hoặc con số không có thật.'
    },
    {
      id: 9,
      question: 'Điều gì dưới đây là phẩm chất quý giá của CON NGƯỜI mà máy móc hay AI dù hiện đại đến đâu cũng KHÔNG CÓ ĐƯỢC?',
      options: ['Trái tim biết yêu thương, lòng nhân ái, sự đồng cảm chân thành, lương tâm đạo đức và trách nhiệm công dân', 'Khả năng cộng trừ các con số lớn', 'Khả năng lưu trữ nhiều văn bản', 'Khả năng tìm kiếm từ khóa nhanh'],
      correctIndex: 0,
      explanation: 'AI chỉ là công cụ tính toán mô phỏng; chỉ có con người mới có cảm xúc thật, tình thương yêu và đạo đức.'
    },
    {
      id: 10,
      question: 'Ai là người phải chịu trách nhiệm cuối cùng khi sử dụng kết quả do AI tạo ra trong học tập và công việc?',
      options: ['Chính con người (người sử dụng AI) phải kiểm tra và chịu trách nhiệm về sản phẩm của mình', 'Chiếc bàn phím chịu trách nhiệm', 'Đổ hết lỗi cho con Robot AI', 'Không ai phải chịu trách nhiệm'],
      correctIndex: 0,
      explanation: 'AI chỉ là công cụ hỗ trợ; con người luôn là chủ thể quyết định, kiểm duyệt và chịu trách nhiệm.'
    },

    // Bài 3: Kỹ năng viết câu lệnh Prompt thông minh
    {
      id: 11,
      question: 'Khi trò chuyện với trợ lý AI, câu yêu cầu hoặc hướng dẫn mà em gõ vào khung chat để giao việc cho AI được gọi là gì?',
      options: ['Câu lệnh nhắc (Prompt)', 'Địa chỉ ô tính (Cell Address)', 'Phần mở rộng tệp (File Extension)', 'Tường lửa (Firewall)'],
      correctIndex: 0,
      explanation: 'Prompt là lời nhắc, câu hỏi hoặc chỉ dẫn đầu vào giúp AI hiểu yêu cầu của người dùng.'
    },
    {
      id: 12,
      question: 'Một câu lệnh Prompt tốt để AI trả lời rõ ràng, dễ hiểu cho học sinh tiểu học cần có những yếu tố nào?',
      options: [
        'Nêu rõ yêu cầu cụ thể, bối cảnh đối tượng (ví dụ: giải thích cho học sinh lớp 4 dễ hiểu) và định dạng mong muốn (ví dụ: gạch đầu dòng 3 ý)',
        'Chỉ gõ đúng 1 chữ cộc lốc không đầu không cuối',
        'Gõ các ký hiệu vô nghĩa @#$%^&*',
        'Viết câu hỏi mập mờ không rõ muốn hỏi về môn gì'
      ],
      correctIndex: 0,
      explanation: 'Prompt càng rõ ràng về Chủ đề + Đối tượng + Cách trình bày thì câu trả lời của AI càng chất lượng.'
    },
    {
      id: 13,
      question: 'Trong 4 câu lệnh Prompt dưới đây nhằm tìm hiểu về vòng tuần hoàn của nước, câu Prompt nào thông minh và hiệu quả nhất?',
      options: [
        '"Hãy giải thích ngắn gọn 4 bước của vòng tuần hoàn nước trong tự nhiên bằng lời văn sinh động, dễ hiểu cho học sinh lớp 4."',
        '"Nước."',
        '"Nói cái gì cũng được."',
        '"Làm hộ bài tập!"'
      ],
      correctIndex: 0,
      explanation: 'Câu lệnh nêu rõ chủ đề (vòng tuần hoàn nước), số lượng (4 bước) và lứa tuổi (học sinh lớp 4).'
    },
    {
      id: 14,
      question: 'Nếu sau lần hỏi đầu tiên, câu trả lời của AI còn hơi dài và khó hiểu, em nên làm gì tiếp theo?',
      options: ['Đặt tiếp câu lệnh yêu cầu AI giải thích lại ngắn gọn hơn và lấy ví dụ thực tế gần gũi hơn', 'Bỏ cuộc tắt máy ngay', 'Chép nguyên đoạn khó hiểu đó vào vở dù mình không hiểu gì', 'Mắng mỏ chiếc máy tính'],
      correctIndex: 0,
      explanation: 'Em có thể trao đổi tiếp để tinh chỉnh yêu cầu, giúp AI giải thích lại cho đến khi em thật sự hiểu bài.'
    },
    {
      id: 15,
      question: 'Thông tin nào TUYỆT ĐỐI KHÔNG ĐƯỢC nhập vào câu lệnh Prompt khi trò chuyện với các công cụ AI trực tuyến?',
      options: ['Họ tên thật kèm địa chỉ nhà, số điện thoại gia đình, mật khẩu tài khoản và thông tin bí mật riêng tư', 'Câu hỏi về lịch sử пирамид Ai Cập', 'Câu hỏi cách giải thích hiện tượng cầu vồng', 'Yêu cầu gợi ý 5 từ vựng tiếng Anh về mùa hè'],
      correctIndex: 0,
      explanation: 'Nguyên tắc bảo mật số: Không bao giờ nhập dữ liệu cá nhân, mật khẩu hay bí mật gia đình vào khung chat AI.'
    },

    // Bài 4: Đạo đức, sự trung thực và kiểm chứng khi dùng AI
    {
      id: 16,
      question: 'Cách sử dụng AI nào sau đây là ĐÚNG ĐẮN và giúp em ngày càng học giỏi, thông minh hơn?',
      options: [
        'Tự mình suy nghĩ làm bài trước, sau đó dùng AI để tham khảo thêm ý tưởng hoặc nhờ AI giải thích chỗ chưa hiểu',
        'Mỗi khi cô giáo giao bài văn đều bắt AI viết hộ từ đầu đến cuối rồi chép y nguyên nộp lấy điểm',
        'Không thèm đọc sách giáo khoa nữa vì đã có AI làm hộ tất cả',
        'Dùng AI để tạo tin giả trêu chọc các bạn trong lớp'
      ],
      correctIndex: 0,
      explanation: 'Nếu để AI làm thay toàn bộ, bộ não của em sẽ lười suy nghĩ; hãy dùng AI như người bạn gợi ý để rèn tư duy của chính mình.'
    },
    {
      id: 17,
      question: 'Khi AI cung cấp một thông tin về sự kiện lịch sử hoặc số liệu khoa học, bước quan trọng tiếp theo em cần thực hiện là gì?',
      options: ['Kiểm chứng (Fact-check) lại thông tin đó với Sách giáo khoa hoặc nguồn tài liệu chính thống trước khi sử dụng', 'Tin tưởng tuyệt đối 100% không cần xem lại sách', 'Đăng ngay lên mạng xã hội khoe mọi người', 'Sửa lại sách giáo khoa theo lời AI'],
      correctIndex: 0,
      explanation: 'Luôn kiểm chứng chéo thông tin từ AI với Sách giáo khoa và thầy cô giáo để tránh nhầm lẫn.'
    },
    {
      id: 18,
      question: 'Hành vi sử dụng công cụ AI để ghép mặt bạn bè vào hình ảnh xấu hoặc giả mạo giọng nói của người khác nhằm trêu đùa là đúng hay sai?',
      options: [
        'Là hành vi SAI TRÁI nghiêm trọng, xâm phạm danh dự, quyền riêng tư của người khác và vi phạm đạo đức số',
        'Chỉ là trò đùa vui vô hại không sao cả',
        'Là cách thể hiện mình giỏi tin học',
        'Được khuyến khích làm thường xuyên'
      ],
      correctIndex: 0,
      explanation: 'Tuyệt đối không dùng AI để tạo ảnh ghép giả mạo (Deepfake) gây tổn hại danh dự và tinh thần của người khác.'
    },
    {
      id: 19,
      question: 'Nếu trong một dự án học tập, nhóm của em có sử dụng AI để hỗ trợ tìm ý tưởng hoặc tạo một bức tranh minh họa, nhóm em nên làm gì khi báo cáo trước lớp?',
      options: ['Trung thực chia sẻ rõ phần nào do nhóm tự viết, phần hình ảnh nào có sự hỗ trợ của công cụ AI', 'Nói dối thầy cô rằng bức tranh kỹ thuật số đó do nhóm tự vẽ tay bằng cọ', 'Giấu kín không cho ai biết', 'Xóa tên các bạn trong nhóm'],
      correctIndex: 0,
      explanation: 'Sự trung thực và minh bạch khi sử dụng công cụ AI là phẩm chất đạo đức quan trọng của học sinh thời đại mới.'
    },
    {
      id: 20,
      question: 'Thông điệp quan trọng nhất dành cho học sinh tiểu học khi bước vào kỷ nguyên Trí tuệ nhân tạo (AI) là gì?',
      options: [
        '"Em làm chủ công nghệ - Dùng AI thông minh, an toàn, trung thực để học tập sâu hơn chứ không để AI suy nghĩ thay mình"',
        '"Hãy để AI làm hết mọi bài tập để em chỉ việc đi chơi"',
        '"Sợ hãi và tránh xa tất cả các loại máy tính"',
        '"Tin vào mọi điều AI nói mà không cần học ở trường"'
      ],
      correctIndex: 0,
      explanation: 'Làm chủ AI với tư duy độc lập, trung thực và nhân văn sẽ giúp các em tỏa sáng trong tương lai.'
    }
  ]
};
