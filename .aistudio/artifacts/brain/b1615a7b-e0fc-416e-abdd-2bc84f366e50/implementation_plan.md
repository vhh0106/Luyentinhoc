# Tin Học Tiểu Học - Kết Nối Tri Thức

Nền tảng trực tuyến luyện tập và thực hành Tin học dành cho học sinh tiểu học theo chương trình giáo dục phổ thông mới của Bộ Giáo dục và Đào tạo (bộ sách Kết Nối Tri Thức), với hai phân quyền rõ ràng cho Giáo viên và Học sinh, hệ thống mã lớp học và mã PIN tham gia làm bài, cùng 10 mô-đun trò chơi tương tác mô phỏng kiến thức thực tế.

## User Review & Critical Decisions

> [!IMPORTANT]
> Dưới đây là các quyết định thiết kế đã được làm rõ và thống nhất dựa trên phản hồi của người dùng:

- **Confirmed Decision 1 - Kiến trúc mã nguồn**: Xây dựng theo mô hình ứng dụng web hiện đại chia tách chuẩn mực giữa cấu trúc (HTML), phong cách trực quan (CSS Tailwind & design tokens) và các module logic/thành phần tương tác (JS/TS components), đảm bảo hiệu năng và dễ mở rộng.
- **Confirmed Decision 2 - Mức độ tương tác của 10 chủ đề**: Xây dựng 10 bộ trò chơi và mô phỏng tương tác sinh động, bao gồm:
  1. *Luyện gõ phím*: Bàn phím ảo trực quan, hướng dẫn vị trí đặt ngón, đo tốc độ gõ (WPM) và độ chính xác (Accuracy).
  2. *Gõ tiếng Việt*: Bộ gõ mô phỏng kiểu Telex/VNI với quy tắc đặt dấu thanh chuẩn mực.
  3. *Luyện chuột*: Game rèn luyện thao tác di chuyển, nhấp đơn, nhấp đúp và kéo thả (drag & drop) bắt mục tiêu vui nhộn.
  4. *Kĩ năng máy tính (IC3)*: Mô phỏng nhận diện phần cứng, tập tin và thư mục trên hệ điều hành.
  5. *Soạn thảo Word*: Giao diện mô phỏng thanh công cụ Ribbon, đổi font, căn lề và định dạng văn bản trực quan.
  6. *Bảng tính Excel*: Ô tính tương tác, tính tổng SUM, trung bình AVERAGE và vẽ biểu đồ hình cột.
  7. *Trình chiếu PowerPoint*: Tạo slide mới, chọn bố cục, thêm tiêu đề và chèn hình ảnh hoạt họa.
  8. *Tư duy thuật toán*: Trò chơi ghép khối lệnh logic (tuần tự, rẽ nhánh Nếu-Thì, lặp lại) điều khiển nhân vật vượt mê cung.
  9. *Công dân số*: 10 thẻ tình huống thực tế về an toàn thông tin cá nhân, bản quyền và phòng tránh lừa đảo mạng.
  10. *Dùng AI*: Trắc nghiệm tư duy phân biệt trí tuệ nhân tạo, cách đặt câu hỏi prompt thông minh và kiểm chứng thông tin.
- **Confirmed Decision 3 - Lưu trữ dữ liệu**: Sử dụng `localStorage` trình duyệt để lưu trữ bền vững danh sách giáo viên, lớp học, bài tập phân quyền, mã PIN tự sinh và bảng kết quả điểm số/lịch sử học sinh.

---

## 1. Overview & Core Concept

- **Mục tiêu sản phẩm**: Tạo ra một môi trường học tập tin học thân thiện, vui tươi nhưng nghiêm túc về mặt sư phạm dành cho học sinh tiểu học lớp 3, 4, 5 theo chương trình Kết Nối Tri Thức.
- **Đối tượng người dùng**:
  - *Giáo viên*: Đăng nhập tài khoản, tạo bộ bài tập từ menu tổng 10 chủ đề, gán cho từng mã lớp (ví dụ: `3A`, `4B`, `5C`), tự động sinh mã PIN ngẫu nhiên bảo mật 6 ký tự, theo dõi thống kê các lớp và bài tập đã giao.
  - *Học sinh*: Chọn vai trò Học sinh, nhập Họ tên, Mã lớp và Mã PIN do giáo viên cung cấp để mở khóa danh sách bài tập được chỉ định, tham gia chơi game/làm bài và nhận ngay phản hồi đánh giá kèm điểm thưởng sao.
- **Giá trị cốt lõi**: Giúp học sinh rèn luyện kỹ năng thực hành công nghệ ngay trên trình duyệt mà không cần cài đặt phần mềm phức tạp, đồng thời giúp thầy cô dễ dàng quản lý lớp học linh hoạt.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Màn hình chào & Chọn vai trò**: Giao diện chọn 2 cánh cửa trực quan: Thầy/Cô (Giáo viên) hoặc Em học sinh (Học sinh).
2. **Đăng nhập Giáo viên**: Nhập tên tài khoản & mật khẩu (hỗ trợ tạo tài khoản nhanh). Sau khi vào Dashboard:
   - Xem tổng quan số bài tập đã tạo, số chủ đề đang kích hoạt.
   - Bấm nút "Tạo bài tập mới": Chọn mã lớp (ví dụ `3A`), tích chọn các môn học trong menu 10 môn chuẩn.
   - Nhận mã PIN tự động (ví dụ `KT8392`) để gửi cho học sinh trong lớp.
   - Xem danh sách bài tập đã giao, mã PIN, ngày tạo và thao tác xóa/quản lý.
3. **Đăng nhập Học sinh**:
   - Nhập Họ và tên, Mã lớp học (ví dụ `3A`), Mã PIN (ví dụ `KT8392`).
   - Kiểm tra mã PIN hợp lệ: nếu đúng sẽ hiển thị thông báo chào mừng kèm tên giáo viên và mở khóa đúng các bài tập được giao.
4. **Khu vực luyện tập tương tác (10 Chủ đề)**:
   - Học sinh chọn môn -> Chọn cấp độ / bài học cụ thể -> Vào phòng tương tác game.
   - Game có thanh tiến độ (Progress bar), đồng hồ đếm thời gian, bảng đếm lỗi và độ chính xác thời gian thực.
   - Màn hình chúc mừng kết thúc bài học với hiệu ứng rực rỡ và nút sang bài kế tiếp.

### Visual Identity & Theme

- **Phong cách thẩm mỹ**: Thân thiện với lứa tuổi học sinh tiểu học, khoa học, trực quan, tuân thủ nguyên tắc WCAG và bộ quy chuẩn sư phạm giáo dục.
- **Bảng màu (Color Palette)**:
  - Nền chủ đạo: Sáng trong lành, dịu mắt (`#F8FAFC` và dải gradient xanh dương - tím êm dịu).
  - Màu thương hiệu chính: Xanh dương hoàng gia (`#2563EB` / `#3B82F6`) tạo cảm giác tin cậy và tri thức.
  - Màu nhấn hành động: Vàng hổ phách (`#F59E0B`) tượng trưng cho ngôi sao điểm thưởng, Xanh ngọc lục bảo (`#10B981`) cho kết quả đúng và hoàn thành xuất sắc.
  - Phông chữ: `Plus Jakarta Sans` kết hợp phông hiển thị rõ ràng, nét chữ tròn trịa dễ đọc cho trẻ nhỏ.
- **Micro-interactions**: Phản hồi nút bấm $\le 150\text{ms}$, hiệu ứng phím gõ nảy sáng khi bấm đúng, cảnh báo rung nhẹ khi gõ nhầm kèm chỉ dẫn ngón tay chuẩn.

---

## 3. Key Product Decisions & Trade-Offs

- **Quyết định 1: Tách cấu trúc mã nguồn thành các module chuyên biệt**:
  - *Lựa chọn*: Tách riêng biệt lớp dữ liệu (`src/data/curriculum.ts`), các mini-game tương tác (`src/components/exercises/*`), màn hình nghiệp vụ (`TeacherDashboard`, `StudentDashboard`, `AuthModal`), và lớp dịch vụ lưu trữ (`src/services/storage.ts`).
  - *Lý do*: Đảm bảo mã nguồn gọn gàng, đúng chuẩn công nghệ, dễ dàng kiểm thử và tải mượt mà trên mọi thiết bị máy tính trường học.
- **Quyết định 2: Hỗ trợ bộ gõ và phím trực quan trên trình duyệt**:
  - *Lựa chọn*: Xây dựng bàn phím ảo SVG/CSS với sơ đồ phân vùng màu sắc 10 ngón tay theo tiêu chuẩn công thái học bàn phím quốc tế.
  - *Lý do*: Học sinh tiểu học chưa thuộc mặt phím sẽ được chỉ dẫn trực quan ngay ngón tay nào cần gõ phím nào (ví dụ: ngón trỏ trái cho F, ngón trỏ phải cho J).

---

## 4. Technical Architecture & Data Strategy

### Kiến trúc tổng thể và luồng dữ liệu

```
┌────────────────────────────────────────────────────────┐
│                   App.tsx (Root Controller)            │
│  - Điều phối Router chế độ: Home / Login / Dashboard    │
│  - Quản lý phiên làm việc Role: Teacher | Student      │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   ┌───────────────────┐       ┌────────────────────────┐
   │ TeacherDashboard  │       │    StudentDashboard    │
   │ - Tạo bài tập     │       │ - Nhận bài theo mã PIN │
   │ - Cấp mã PIN lớp  │       │ - Chọn môn & bài học   │
   │ - Danh sách lớp   │       │ - Mở ExerciseRunner    │
   └─────────┬─────────┘       └───────────┬────────────┘
             │                             │
             ▼                             ▼
   ┌────────────────────────────────────────────────────┐
   │         10 Interactive Exercise Engines            │
   │ 1. TypingExercise   (Bàn phím 10 ngón ảo)          │
   │ 2. VietnameseTyping (Bộ gõ Telex/VNI mô phỏng)     │
   │ 3. MouseExercise    (Bắn bóng, nhấp đúp, kéo thả)  │
   │ 4. ComputerSkills   (Nhận diện linh kiện & ổ đĩa)  │
   │ 5. WordSimulator    (Soạn thảo & định dạng text)   │
   │ 6. ExcelSimulator   (Nhập bảng & tính hàm SUM/AVG) │
   │ 7. PowerPointSim    (Thêm slide & bố cục trình bày)│
   │ 8. AlgorithmEngine  (Ghép lệnh logic giải mê cung) │
   │ 9. DigitalCitizen   (10 tình huống an toàn số)     │
   │ 10. AIAssistantQuiz (Phân biệt AI & prompt đúng)   │
   └────────────────────────────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
   ┌───────────────────┐       ┌────────────────────────┐
   │  curriculum.ts    │       │     storage.ts         │
   │  Dữ liệu Kết Nối  │       │  localStorage Manager  │
   │  Tri Thức chuẩn   │       │  (assignments, stats)  │
   └───────────────────┘       └────────────────────────┘
```

### Cấu trúc dữ liệu chính (Data Schema)

- **Teacher**: `{ username: string, passwordHash: string, name: string, createdAt: string }`
- **Assignment**:
  ```ts
  interface Assignment {
    id: string;
    classCode: string;      // Ví dụ: '3A', '4B'
    pin: string;            // Ví dụ: 'KNTT01'
    subjects: string[];     // ['go', 'chuot', 'thuat-toan', ...]
    teacherName: string;
    createdAt: string;
    note?: string;
  }
  ```
- **StudentSession**: `{ name: string, classCode: string, pin: string, assignment: Assignment }`
- **LessonProgress**: `{ studentName: string, subjectId: string, lessonId: number, score: number, accuracy: number, completedAt: string }`

---

## 5. Kế hoạch triển khai chi tiết

1. **Cấu hình & Tinh chỉnh Entry Point**:
   - Cập nhật `metadata.json` với tên thương hiệu *"Luyện Tin Học Tiểu Học - Kết Nối Tri Thức"*, mô tả chuẩn.
   - Cập nhật `index.html` với tiêu đề tiếng Việt, thẻ meta chuẩn SEO, favicon và nạp font `Plus Jakarta Sans`.
2. **Kho dữ liệu chương trình học (`src/data/curriculum.ts`)**:
   - Định nghĩa đầy đủ 10 chủ đề với icon, mô tả theo yêu cầu của người dùng.
   - Soạn thảo ngân hàng bài tập thực hành chi tiết cho từng chủ đề (bài tập gõ hàng cơ sở, hàng trên, câu tục ngữ tiếng Việt, game chuột kéo thả, bài tập thuật toán mê cung, bài tập văn phòng Word/Excel/PowerPoint mô phỏng, bộ câu đố công dân số và AI).
3. **Module quản lý lưu trữ (`src/services/storage.ts`)**:
   - Quản lý lưu/đọc tài khoản giáo viên, bài tập lớp học, mã PIN ngẫu nhiên 6 ký tự dễ nhớ, kết quả học sinh.
   - Hạt giống dữ liệu mặc định (seed data) với tài khoản mẫu để giáo viên và học sinh thử nghiệm ngay tức thì.
4. **Bộ 10 Mô-đun Game & Luyện tập tương tác (`src/components/exercises/`)**:
   - Xây dựng từng engine bài tập với giao diện đồ họa sống động, có âm thanh tương tác trực quan (Web Audio API vui nhộn không cần file mp3 ngoài) và bảng theo dõi kết quả.
5. **Giao diện người dùng hoàn chỉnh**:
   - Trang chủ phân vai (Giáo viên / Học sinh).
   - Trang Đăng nhập & Xác thực PIN tiện dụng.
   - Dashboard Giáo viên: Tạo bài tập, chọn môn trong menu tổng, quản lý danh sách mã PIN và lớp học.
   - Dashboard Học sinh: Xem các môn được giáo viên phân công, bấm vào học và làm bài tập.
6. **Kiểm tra và biên dịch**: Chạy `compile_applet` để xác thực toàn bộ hệ thống hoạt động hoàn hảo không lỗi cú pháp hay thiếu import.
7. **Bảng Tiến Độ Học Tập Trực Quan (Progress Dashboard)**:
   - Tích hợp thư viện `recharts` với biểu đồ tròn RadialBar và Donut PieChart đa tầng.
   - Hiển thị tỷ lệ hoàn thành 10 môn học, tổng số bài học, điểm số chính xác và các mốc huy hiệu đạt được.
   - Thẻ hiển thị từng môn học tích hợp vòng tròn SVG Circular Progress Ring sắc nét.
8. **Hệ Thống Huy Hiệu Kỹ Thuật Số (Achievement System)**:
   - 33 danh hiệu số vinh danh chia thành 4 cấp độ: Đồng (🥉), Bạc (🥈), Vàng (🥇), Kim Cương (💎).
   - Bộ huy hiệu chuyên biệt cho từng môn trong 10 môn học: "Typing Master" (Gõ phím), "Logic Genius" (Thuật toán), "Digital Citizen" (Công dân số), "Bút Son Tiếng Việt", "Xạ Thủ Chuột Siêu Tốc", "Chuyên Gia Máy Tính IC3", "Bậc Thầy Word", "Thần Đồng Tính Toán Excel", "Phù Thủy Thuyết Trình PowerPoint", "Nhà Phát Minh Tương Lai AI".
   - Popup chúc mừng hiệu ứng pháo hoa canvas (Confetti) và âm thanh kèn trumpet (Web Audio API) khi mở khóa thành tích mới trong thời gian thực.
   - Bảng vàng danh dự `AchievementShowcaseModal` cho phép học sinh tra cứu, lọc theo môn học/trạng thái và xem chi tiết tiêu chí đạt được.
