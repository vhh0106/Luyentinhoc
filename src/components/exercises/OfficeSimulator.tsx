import React, { useState, useMemo, useEffect } from 'react';
import { Lesson, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ThemeToggleButton } from '../common/ThemeToggleButton';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Award,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  BarChart3,
  FileSpreadsheet,
  FileText,
  Presentation,
  Save,
  Image as ImageIcon,
  Table as TableIcon,
  Sparkles,
  Play,
  AlertCircle,
  Lock,
  Calculator
} from 'lucide-react';

interface OfficeSimulatorProps {
  lesson: Lesson;
  subjectId: SubjectId;
  subjectEmoji: string;
  subjectName: string;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

// Lesson-specific Word prompts so students must actually type & format from scratch (6 unique lessons)
const WORD_EXERCISES = [
  {
    sampleTitle: 'EM YÊU TRƯỜNG EM',
    sampleBody: 'Trường học là ngôi nhà thứ hai của em. Ở trường có thầy cô hiền từ và bạn bè thân thương.',
    targetFont: 'Times New Roman',
    targetSize: '18',
    requireBold: true,
    requireCenter: true,
    extraTool: 'image' as const
  },
  {
    sampleTitle: 'NỘI QUY PHÒNG TIN HỌC',
    sampleBody: 'Em ngồi đúng tư thế, giữ gìn bàn phím và chuột máy tính sạch đẹp, tắt máy đúng cách.',
    targetFont: 'Arial',
    targetSize: '16',
    requireBold: true,
    requireCenter: true,
    extraTool: 'table' as const
  },
  {
    sampleTitle: 'QUÊ HƯƠNG TƯƠI ĐẸP',
    sampleBody: 'Việt Nam quê hương ta có cánh đồng lúa chín vàng và những dòng sông hiền hòa.',
    targetFont: 'Times New Roman',
    targetSize: '22',
    requireBold: true,
    requireCenter: true,
    extraTool: 'image' as const
  },
  {
    sampleTitle: 'THỜI KHÓA BIỂU CỦA EM',
    sampleBody: 'Mỗi ngày đến lớp em đều chuẩn bị đầy đủ sách vở và hoàn thành bài tập chăm chỉ.',
    targetFont: 'Arial',
    targetSize: '18',
    requireBold: true,
    requireCenter: true,
    extraTool: 'table' as const
  },
  {
    sampleTitle: 'BẢO VỆ MÔI TRƯỜNG XANH',
    sampleBody: 'Chúng em tích cực trồng cây xanh, bỏ rác đúng nơi quy định và tiết kiệm điện nước mỗi ngày.',
    targetFont: 'Times New Roman',
    targetSize: '20',
    requireBold: true,
    requireCenter: true,
    extraTool: 'image' as const
  },
  {
    sampleTitle: 'KẾ HOẠCH ĐỌC SÁCH TUẦN NÀY',
    sampleBody: 'Đọc sách mỗi ngày giúp em mở rộng kho tàng tri thức, rèn luyện ngôn ngữ và nuôi dưỡng tâm hồn.',
    targetFont: 'Arial',
    targetSize: '16',
    requireBold: true,
    requireCenter: true,
    extraTool: 'table' as const
  }
];

// Lesson-specific Excel datasets where students must fill missing scores and type real formulas (6 unique lessons)
const EXCEL_EXERCISES = [
  {
    title: 'Bảng Điểm Thi Đua Tổ 1',
    formulaType: 'SUM' as const,
    formulaHint: '=SUM(B2:D2)',
    rows: [
      { name: 'Nguyễn Văn An', math: '9', viet: '8', info: '' },
      { name: 'Trần Bảo Ngọc', math: '10', viet: '', info: '9' },
      { name: 'Lê Minh Khôi', math: '', viet: '8', info: '9' }
    ],
    targetScores: [
      { math: 9, viet: 8, info: 10 },
      { math: 10, viet: 9, info: 9 },
      { math: 8, viet: 8, info: 9 }
    ]
  },
  {
    title: 'Bảng Điểm Trung Bình Học Tập',
    formulaType: 'AVERAGE' as const,
    formulaHint: '=AVERAGE(B2:D2)',
    rows: [
      { name: 'Phạm Gia Huy', math: '8', viet: '9', info: '' },
      { name: 'Hoàng Thanh Trúc', math: '10', viet: '', info: '10' },
      { name: 'Đỗ Tuấn Kiệt', math: '', viet: '7', info: '8' }
    ],
    targetScores: [
      { math: 8, viet: 9, info: 10 },
      { math: 10, viet: 10, info: 10 },
      { math: 9, viet: 7, info: 8 }
    ]
  },
  {
    title: 'Tìm Điểm Cao Nhất Với Hàm MAX',
    formulaType: 'MAX' as const,
    formulaHint: '=MAX(B2:D2)',
    rows: [
      { name: 'Vũ Minh Châu', math: '8', viet: '10', info: '' },
      { name: 'Bùi Quốc Bảo', math: '9', viet: '', info: '8' },
      { name: 'Đặng Khánh Linh', math: '', viet: '9', info: '9' }
    ],
    targetScores: [
      { math: 8, viet: 10, info: 9 },
      { math: 9, viet: 7, info: 8 },
      { math: 10, viet: 9, info: 9 }
    ]
  },
  {
    title: 'Thống Kê Kế Hoạch Nhỏ (Số Kg Giấy Vụn)',
    formulaType: 'SUM' as const,
    formulaHint: '=SUM(B2:D2)',
    rows: [
      { name: 'Tổ 1 Đoàn Kết', math: '7', viet: '8', info: '' },
      { name: 'Tổ 2 Chăm Ngoan', math: '9', viet: '', info: '8' },
      { name: 'Tổ 3 Sáng Tạo', math: '', viet: '9', info: '10' }
    ],
    targetScores: [
      { math: 7, viet: 8, info: 9 },
      { math: 9, viet: 10, info: 8 },
      { math: 8, viet: 9, info: 10 }
    ]
  },
  {
    title: 'Số Sách Đọc Tại Thư Viện Trung Bình',
    formulaType: 'AVERAGE' as const,
    formulaHint: '=AVERAGE(B2:D2)',
    rows: [
      { name: 'Ngô Phương Anh', math: '6', viet: '9', info: '' },
      { name: 'Trịnh Hải Đăng', math: '8', viet: '', info: '10' },
      { name: 'Lý Ngọc Diệp', math: '', viet: '8', info: '9' }
    ],
    targetScores: [
      { math: 6, viet: 9, info: 9 },
      { math: 8, viet: 9, info: 10 },
      { math: 10, viet: 8, info: 9 }
    ]
  },
  {
    title: 'Tổng Kết Hội Khỏe Phù Đổng Cấp Trường',
    formulaType: 'MAX' as const,
    formulaHint: '=MAX(B2:D2)',
    rows: [
      { name: 'Đinh Quang Minh', math: '9', viet: '8', info: '' },
      { name: 'Phan Thảo Nguyên', math: '8', viet: '', info: '9' },
      { name: 'Mai Đức Anh', math: '', viet: '9', info: '8' }
    ],
    targetScores: [
      { math: 9, viet: 8, info: 10 },
      { math: 8, viet: 10, info: 9 },
      { math: 9, viet: 9, info: 8 }
    ]
  }
];

// Lesson-specific PowerPoint topics (6 unique lessons)
const PPT_TOPICS = [
  {
    topicName: 'Giới thiệu trường tiểu học của em',
    suggestedTitle1: 'TRƯỜNG TIỂU HỌC CỦA EM',
    suggestedSub1: 'Ngôi trường xanh - sạch - đẹp và thân thiện',
    suggestedTitle2: 'PHÒNG HỌC TIN HỌC',
    suggestedSub2: 'Nơi chúng em khám phá công nghệ số'
  },
  {
    topicName: 'Con vật đáng yêu quanh em',
    suggestedTitle1: 'THẾ GIỚI ĐỘNG VẬT QUANH EM',
    suggestedSub1: 'Tìm hiểu những loài vật nuôi có ích',
    suggestedTitle2: 'CHÚ MÈO MƯỚP NHÀ EM',
    suggestedSub2: 'Bộ lông mềm mại và rất chăm bắt chuột'
  },
  {
    topicName: 'An toàn trên mạng Internet',
    suggestedTitle1: 'CÔNG DÂN SỐ VĂN MINH',
    suggestedSub1: 'Bảo vệ thông tin cá nhân trên môi trường mạng',
    suggestedTitle2: 'QUY TẮC 5 KHÔNG TRÊN MẠNG',
    suggestedSub2: 'Không chia sẻ mật khẩu cho người lạ'
  },
  {
    topicName: 'Danh lam thắng cảnh quê hương Việt Nam',
    suggestedTitle1: 'CẢNH ĐẸP ĐẤT NƯỚC VIỆT NAM',
    suggestedSub1: 'Tự hào di sản thiên nhiên và văn hóa dân tộc',
    suggestedTitle2: 'VỊNH HẠ LONG KỲ VĨ',
    suggestedSub2: 'Hàng nghìn hòn đảo đá vôi giữa làn nước xanh biếc'
  },
  {
    topicName: 'An toàn giao thông cho nụ cười trẻ thơ',
    suggestedTitle1: 'EM HỌC AN TOÀN GIAO THÔNG',
    suggestedSub1: 'Đi bộ trên vỉa hè và đội mũ bảo hiểm đạt chuẩn',
    suggestedTitle2: 'TÍN HIỆU ĐÈN GIAO THÔNG',
    suggestedSub2: 'Đèn đỏ dừng lại, đèn xanh mới đi, đèn vàng đi chậm'
  },
  {
    topicName: 'Ước mơ nghề nghiệp tương lai của em',
    suggestedTitle1: 'ƯỚC MƠ TƯƠNG LAI CỦA EM',
    suggestedSub1: 'Chăm chỉ học tập và rèn luyện để thực hiện ước mơ',
    suggestedTitle2: 'KỸ SƯ CÔNG NGHỆ THÔNG TIN',
    suggestedSub2: 'Sáng tạo phần mềm và robot hữu ích phục vụ cuộc sống'
  }
];

export const OfficeSimulator: React.FC<OfficeSimulatorProps> = ({
  lesson,
  subjectId,
  subjectEmoji,
  subjectName,
  onComplete,
  onBack
}) => {
  const [startTime] = useState<number>(() => Date.now());
  const [submitWarning, setSubmitWarning] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Pick exercise config deterministically by lesson.id
  const wordConfig = useMemo(
    () => WORD_EXERCISES[(lesson.id - 1) % WORD_EXERCISES.length],
    [lesson.id]
  );
  const excelConfig = useMemo(
    () => EXCEL_EXERCISES[(lesson.id - 1) % EXCEL_EXERCISES.length],
    [lesson.id]
  );
  const pptConfig = useMemo(
    () => PPT_TOPICS[(lesson.id - 1) % PPT_TOPICS.length],
    [lesson.id]
  );

  // ==========================================
  // 1. WORD SIMULATOR STATE (STARTS UNDONE!)
  // ==========================================
  const [wordTitle, setWordTitle] = useState('');
  const [wordBody, setWordBody] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [textColor, setTextColor] = useState('#1e293b');
  const [fontSize, setFontSize] = useState('12');
  const [fontFamily, setFontFamily] = useState('Courier New');
  const [insertedImage, setInsertedImage] = useState<string | null>(null);
  const [insertedTable, setInsertedTable] = useState<boolean>(false);
  const [wordSaved, setWordSaved] = useState<boolean>(false);

  // ==========================================
  // 2. EXCEL SIMULATOR STATE (STARTS UNDONE!)
  // ==========================================
  const [excelRows, setExcelRows] = useState(() =>
    excelConfig.rows.map(r => ({
      name: r.name,
      math: r.math,
      viet: r.viet,
      info: r.info,
      formula: ''
    }))
  );
  const [chartGenerated, setChartGenerated] = useState(false);
  const [excelSaved, setExcelSaved] = useState(false);

  // ==========================================
  // 3. POWERPOINT SIMULATOR STATE (STARTS UNDONE!)
  // ==========================================
  const [slides, setSlides] = useState([
    {
      id: 1,
      title: '',
      subtitle: '',
      theme: 'bg-white text-slate-900',
      sticker: '',
      transition: 'none'
    }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [hasPresented, setHasPresented] = useState(false);

  // Reset state if lesson changes
  useEffect(() => {
    setWordTitle('');
    setWordBody('');
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
    setTextAlign('left');
    setTextColor('#1e293b');
    setFontSize('12');
    setFontFamily('Courier New');
    setInsertedImage(null);
    setInsertedTable(false);
    setWordSaved(false);

    setExcelRows(
      excelConfig.rows.map(r => ({
        name: r.name,
        math: r.math,
        viet: r.viet,
        info: r.info,
        formula: ''
      }))
    );
    setChartGenerated(false);
    setExcelSaved(false);

    setSlides([
      {
        id: 1,
        title: '',
        subtitle: '',
        theme: 'bg-white text-slate-900',
        sticker: '',
        transition: 'none'
      }
    ]);
    setActiveSlideIndex(0);
    setIsPresenting(false);
    setHasPresented(false);
    setIsFinished(false);
    setSubmitWarning(null);
    setShowHint(false);
  }, [lesson.id, excelConfig]);

  // Helper to evaluate Excel formula string for a row (rowIndex is 0-based -> Excel row 2, 3, 4)
  const evaluateExcelRow = (
    row: { math: string; viet: string; info: string; formula: string },
    rowIndex: number
  ): { isValid: boolean; value: number | null } => {
    const m = Number(row.math);
    const v = Number(row.viet);
    const inf = Number(row.info);
    if (
      row.math.trim() === '' ||
      row.viet.trim() === '' ||
      row.info.trim() === '' ||
      isNaN(m) ||
      isNaN(v) ||
      isNaN(inf)
    ) {
      return { isValid: false, value: null };
    }

    const excelRowNum = rowIndex + 2; // Row 2, 3, 4
    const clean = row.formula.replace(/\s+/g, '').toUpperCase();
    if (!clean.startsWith('=')) return { isValid: false, value: null };

    const validRange = `B${excelRowNum}:D${excelRowNum}`;
    const validAdd = `=B${excelRowNum}+C${excelRowNum}+D${excelRowNum}`;

    if (excelConfig.formulaType === 'SUM') {
      if (clean === `=SUM(${validRange})` || clean === '=SUM(B2:D4)' || clean === validAdd) {
        return { isValid: true, value: m + v + inf };
      }
    } else if (excelConfig.formulaType === 'AVERAGE') {
      if (clean === `=AVERAGE(${validRange})` || clean === `=(B${excelRowNum}+C${excelRowNum}+D${excelRowNum})/3`) {
        return { isValid: true, value: Number(((m + v + inf) / 3).toFixed(1)) };
      }
    } else if (excelConfig.formulaType === 'MAX') {
      if (clean === `=MAX(${validRange})`) {
        return { isValid: true, value: Math.max(m, v, inf) };
      }
    }
    return { isValid: false, value: null };
  };

  // ==========================================================
  // REAL-TIME AUTOMATIC TASK VERIFICATION (NO FAKE CLICKING!)
  // ==========================================================
  const verifiedSteps = useMemo(() => {
    if (subjectId === 'word') {
      const step1Typed =
        wordTitle.trim().length >= 5 && wordBody.trim().length >= 20;
      const step2FontAndStyle =
        fontFamily === wordConfig.targetFont &&
        fontSize === wordConfig.targetSize &&
        isBold;
      const step3LayoutAndInsert =
        textAlign === 'center' &&
        (wordConfig.extraTool === 'image' ? !!insertedImage : insertedTable);
      const step4Saved =
        wordSaved && step1Typed && step2FontAndStyle && step3LayoutAndInsert;

      return [
        {
          label: `Bước 1: Gõ tiêu đề (≥ 5 ký tự) và nội dung văn bản (≥ 20 ký tự)`,
          done: step1Typed
        },
        {
          label: `Bước 2: Chọn phông chữ "${wordConfig.targetFont}", cỡ chữ "${wordConfig.targetSize}" và bật chữ In đậm (B)`,
          done: step2FontAndStyle
        },
        {
          label: `Bước 3: Chọn Căn giữa (Center) văn bản và bấm nút "${
            wordConfig.extraTool === 'image' ? 'Chèn Hình ảnh' : 'Chèn Bảng (Table)'
          }" trên thanh công cụ`,
          done: step3LayoutAndInsert
        },
        {
          label: `Bước 4: Bấm nút "Lưu tệp (Save)" trên thanh công cụ sau khi hoàn tất 3 bước trên`,
          done: step4Saved
        }
      ];
    }

    if (subjectId === 'excel') {
      const allScoresFilled = excelRows.every((r, idx) => {
        const target = excelConfig.targetScores[idx];
        return (
          Number(r.math) === target.math &&
          Number(r.viet) === target.viet &&
          Number(r.info) === target.info &&
          r.math.trim() !== '' &&
          r.viet.trim() !== '' &&
          r.info.trim() !== ''
        );
      });

      const allFormulasValid = excelRows.every(
        (r, idx) => evaluateExcelRow(r, idx).isValid
      );

      const step3Chart = chartGenerated && allScoresFilled && allFormulasValid;
      const step4Saved = excelSaved && step3Chart;

      return [
        {
          label: `Bước 1: Nhập đầy đủ các ô điểm còn trống trong bảng đúng theo số điểm yêu cầu`,
          done: allScoresFilled
        },
        {
          label: `Bước 2: Lập công thức hàm ${excelConfig.formulaType} vào cột E để tính toán cho từng học sinh (dòng 2, 3, 4)`,
          done: allFormulasValid
        },
        {
          label: `Bước 3: Bấm nút "Vẽ Biểu Đồ Cột" trên thanh công cụ để trực quan hóa dữ liệu`,
          done: step3Chart
        },
        {
          label: `Bước 4: Bấm nút "Lưu bảng tính (.xlsx)" để hoàn thành bài thực hành`,
          done: step4Saved
        }
      ];
    }

    // PowerPoint
    const slide1Filled =
      slides[0] &&
      slides[0].title.trim().length >= 4 &&
      slides[0].subtitle.trim().length >= 6;
    const slide2CreatedAndFilled =
      slides.length >= 2 &&
      slides.slice(1).some(s => s.title.trim().length >= 4 && s.subtitle.trim().length >= 4);
    const styledAndIllustrated =
      slides.some(s => s.theme !== 'bg-white text-slate-900') &&
      slides.some(s => s.sticker !== '');
    const transitionAndPresented =
      slides.some(s => s.transition !== 'none') &&
      hasPresented &&
      slide1Filled &&
      slide2CreatedAndFilled;

    return [
      {
        label: `Bước 1: Nhập Tiêu đề và Nội dung phụ đề cho Trang chiếu số 1 (Slide 1)`,
        done: slide1Filled
      },
      {
        label: `Bước 2: Bấm nút "+ Thêm Slide mới" và nhập Tiêu đề, Nội dung cho Trang chiếu số 2`,
        done: slide2CreatedAndFilled
      },
      {
        label: `Bước 3: Chọn Mẫu nền màu sắc (Design Theme) và Chèn Hình minh họa vào trang chiếu`,
        done: styledAndIllustrated
      },
      {
        label: `Bước 4: Chọn Hiệu ứng chuyển trang (Transition) và bấm nút "Trình chiếu (Slide Show)"`,
        done: transitionAndPresented
      }
    ];
  }, [
    subjectId,
    wordTitle,
    wordBody,
    fontFamily,
    fontSize,
    isBold,
    textAlign,
    insertedImage,
    insertedTable,
    wordSaved,
    wordConfig,
    excelRows,
    excelConfig,
    chartGenerated,
    excelSaved,
    slides,
    hasPresented
  ]);

  const completedCount = verifiedSteps.filter(s => s.done).length;
  const totalSteps = verifiedSteps.length;

  const handleSubmitPractice = () => {
    setSubmitWarning(null);
    if (completedCount === 0) {
      soundService.playKeyError();
      setSubmitWarning(
        'Em chưa thực hiện bước thực hành nào trên màn hình mô phỏng! Hãy làm theo hướng dẫn ở từng bước nhé.'
      );
      return;
    }

    const calculatedScore = Math.round((completedCount / totalSteps) * 100);
    const timeSpentSeconds = Math.max(10, Math.round((Date.now() - startTime) / 1000));

    soundService.playSuccessCelebration();
    setFinalScore(calculatedScore);
    setIsFinished(true);
    onComplete(calculatedScore, calculatedScore, timeSpentSeconds);
  };

  const addNewSlide = () => {
    soundService.playStarChime();
    const newId = slides.length + 1;
    setSlides(prev => [
      ...prev,
      {
        id: newId,
        title: '',
        subtitle: '',
        theme: prev[activeSlideIndex]?.theme || 'bg-white text-slate-900',
        sticker: '',
        transition: prev[activeSlideIndex]?.transition || 'none'
      }
    ]);
    setActiveSlideIndex(slides.length);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách bài học</span>
        </button>

        <div className="flex items-center gap-3">
          <ThemeToggleButton />
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            Thực hành tương tác trực tiếp · Tự động chấm từng bước
          </div>
        </div>
      </div>

      {/* Title Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            {subjectEmoji} {subjectName} · Cấp {lesson.level} · Bài {lesson.id}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{lesson.title}</h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Em hãy thực hiện trực tiếp các thao tác trên phần mềm giả lập bên dưới. Hệ thống sẽ <strong>tự động kiểm tra và đánh dấu hoàn thành</strong> từng bước!
          </p>
        </div>

        <div className="text-right shrink-0 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Tiến độ thực hành</span>
          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
            {completedCount} / {totalSteps} bước ({Math.round((completedCount / totalSteps) * 100)} điểm)
          </span>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Software Simulator (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden flex flex-col">
          {/* Top Titlebar of simulated App */}
          <div className="px-4 py-2.5 bg-slate-800 text-white flex items-center justify-between text-xs font-semibold select-none">
            <div className="flex items-center gap-2">
              {subjectId === 'word' && <FileText className="w-4 h-4 text-blue-400" />}
              {subjectId === 'excel' && <FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
              {subjectId === 'powerpoint' && <Presentation className="w-4 h-4 text-orange-400" />}
              <span>
                {subjectId === 'word' && 'Microsoft Word - Thực hành soạn thảo văn bản'}
                {subjectId === 'excel' && `Microsoft Excel - ${excelConfig.title}`}
                {subjectId === 'powerpoint' && `Microsoft PowerPoint - Đề tài: ${pptConfig.topicName}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
            </div>
          </div>

          {/* ===================================================== */}
          {/* SIMULATOR 1: MICROSOFT WORD                           */}
          {/* ===================================================== */}
          {subjectId === 'word' && (
            <div className="flex flex-col flex-1">
              {/* Prompt Reference Banner */}
              <div className="p-3 bg-blue-50/90 border-b border-blue-200 text-xs text-blue-950 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-blue-800 block">
                      📋 Yêu cầu bài thực hành Word:
                    </span>
                    <span className="text-[11px] text-slate-700">
                      Soạn thảo văn bản về chủ đề <strong>"{wordConfig.sampleTitle}"</strong>, định dạng phông chữ <strong>{wordConfig.targetFont}</strong>, cỡ chữ <strong>{wordConfig.targetSize}</strong>, chữ <strong>In đậm</strong>, <strong>Căn giữa</strong> và {wordConfig.extraTool === 'image' ? 'chèn Hình ảnh' : 'chèn Bảng'}.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHint(prev => !prev)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold shrink-0 border transition-colors flex items-center gap-1.5 ${
                      showHint
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý'}</span>
                  </button>
                </div>

                {showHint && (
                  <div className="p-2.5 bg-amber-50/90 border border-amber-200 rounded-xl text-[11px] text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-amber-800 block">💡 Gợi ý nội dung mẫu:</span>
                      <span>
                        Tiêu đề: <strong>"{wordConfig.sampleTitle}"</strong> — Nội dung: <em>"{wordConfig.sampleBody}"</em>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        soundService.playKeyCorrect();
                        setWordTitle(wordConfig.sampleTitle);
                        setWordBody(wordConfig.sampleBody);
                      }}
                      className="px-2.5 py-1 bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-[11px] font-bold shrink-0"
                    >
                      Chép văn bản mẫu để định dạng
                    </button>
                  </div>
                )}
              </div>

              {/* Word Ribbon Toolbar */}
              <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs select-none">
                <select
                  value={fontFamily}
                  onChange={e => {
                    soundService.playKeyCorrect();
                    setFontFamily(e.target.value);
                  }}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Courier New">Courier New (Mặc định)</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Arial">Arial</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>

                <select
                  value={fontSize}
                  onChange={e => {
                    soundService.playKeyCorrect();
                    setFontSize(e.target.value);
                  }}
                  className="px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="12">Cỡ 12</option>
                  <option value="14">Cỡ 14</option>
                  <option value="16">Cỡ 16</option>
                  <option value="18">Cỡ 18</option>
                  <option value="22">Cỡ 22</option>
                </select>

                <div className="h-5 w-px bg-slate-300"></div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setIsBold(!isBold);
                    }}
                    className={`p-1.5 rounded-lg font-bold border ${
                      isBold
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="In đậm (Bold)"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setIsItalic(!isItalic);
                    }}
                    className={`p-1.5 rounded-lg italic border ${
                      isItalic
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="In nghiêng (Italic)"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setIsUnderline(!isUnderline);
                    }}
                    className={`p-1.5 rounded-lg underline border ${
                      isUnderline
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="Gạch chân (Underline)"
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="h-5 w-px bg-slate-300"></div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setTextAlign('left');
                    }}
                    className={`p-1.5 rounded-lg border ${
                      textAlign === 'left'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="Căn lề trái"
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setTextAlign('center');
                    }}
                    className={`p-1.5 rounded-lg border ${
                      textAlign === 'center'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="Căn giữa (Center)"
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playKeyCorrect();
                      setTextAlign('right');
                    }}
                    className={`p-1.5 rounded-lg border ${
                      textAlign === 'right'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                    }`}
                    title="Căn lề phải"
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="h-5 w-px bg-slate-300"></div>

                {/* Insert Image & Insert Table */}
                <button
                  type="button"
                  onClick={() => {
                    soundService.playStarChime();
                    setInsertedImage('🏫 🌳 🇻🇳');
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border font-bold flex items-center gap-1 ${
                    insertedImage
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Chèn Hình ảnh</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playStarChime();
                    setInsertedTable(true);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg border font-bold flex items-center gap-1 ${
                    insertedTable
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Chèn Bảng (Table)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playStarChime();
                    setWordSaved(true);
                  }}
                  className={`ml-auto px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                    wordSaved
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{wordSaved ? 'Đã lưu tệp!' : 'Lưu tệp (Save)'}</span>
                </button>
              </div>

              {/* Document Page Canvas */}
              <div className="p-6 bg-slate-200 min-h-[380px] flex justify-center">
                <div
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    textAlign,
                    color: textColor
                  }}
                  className="w-full max-w-xl bg-white shadow-md border border-slate-300 rounded-sm p-6 space-y-4 flex flex-col"
                >
                  <input
                    type="text"
                    placeholder="Nhập tiêu đề văn bản tại đây (ít nhất 5 ký tự)..."
                    value={wordTitle}
                    onChange={e => {
                      setWordTitle(e.target.value);
                      setWordSaved(false);
                    }}
                    style={{ textAlign }}
                    className="w-full border-b border-dashed border-slate-300 pb-2 focus:border-blue-500 focus:outline-none bg-transparent"
                  />

                  <textarea
                    rows={5}
                    placeholder="Nhập nội dung đoạn văn bản tại đây (ít nhất 20 ký tự)..."
                    value={wordBody}
                    onChange={e => {
                      setWordBody(e.target.value);
                      setWordSaved(false);
                    }}
                    style={{ textAlign }}
                    className="w-full flex-1 resize-none focus:outline-none bg-transparent leading-relaxed"
                  />

                  {insertedImage && (
                    <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-center">
                      <div className="text-3xl mb-1">{insertedImage}</div>
                      <span className="text-[11px] font-sans font-semibold text-sky-800">
                        Hình minh họa đã chèn vào trang văn bản
                      </span>
                    </div>
                  )}

                  {insertedTable && (
                    <table className="w-full text-xs font-sans border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="border border-slate-300 p-1.5">Thứ</th>
                          <th className="border border-slate-300 p-1.5">Môn học</th>
                          <th className="border border-slate-300 p-1.5">Phòng học</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 p-1.5 text-center">Thứ Hai</td>
                          <td className="border border-slate-300 p-1.5 text-center">Tin học & Công nghệ</td>
                          <td className="border border-slate-300 p-1.5 text-center">Phòng máy 01</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* SIMULATOR 2: MICROSOFT EXCEL                          */}
          {/* ===================================================== */}
          {subjectId === 'excel' && (
            <div className="p-4 flex flex-col flex-1 space-y-4">
              {/* Target Instructions Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-emerald-600" />
                    <span>Đề bài thực hành Bảng tính Excel:</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHint(prev => !prev)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition-colors flex items-center gap-1.5 ${
                      showHint
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý công thức'}</span>
                  </button>
                </div>
                <p className="text-[11px] leading-relaxed">
                  1) Nhập bổ sung các ô điểm còn trống: Dòng 2 điền <strong>Tin học = {excelConfig.targetScores[0].info}</strong>; Dòng 3 điền <strong>Tiếng Việt = {excelConfig.targetScores[1].viet}</strong>; Dòng 4 điền <strong>Toán = {excelConfig.targetScores[2].math}</strong>.<br />
                  2) Tại cột <strong>E (Công thức)</strong>, hãy sử dụng hàm <strong>{excelConfig.formulaType}</strong> để tính kết quả cho từng bạn học sinh ở dòng 2, dòng 3 và dòng 4.
                </p>

                {showHint && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950">
                    <span className="font-bold text-amber-800 block mb-0.5">💡 Gợi ý cách viết công thức tại cột E:</span>
                    <span>
                      • Dòng 2 gõ: <code className="bg-white px-1.5 py-0.5 rounded border font-mono font-bold">={excelConfig.formulaType}(B2:D2)</code><br />
                      • Dòng 3 gõ: <code className="bg-white px-1.5 py-0.5 rounded border font-mono font-bold">={excelConfig.formulaType}(B3:D3)</code><br />
                      • Dòng 4 gõ: <code className="bg-white px-1.5 py-0.5 rounded border font-mono font-bold">={excelConfig.formulaType}(B4:D4)</code>
                    </span>
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-300 font-bold text-emerald-700">
                    fx
                  </span>
                  <span className="text-slate-600 font-medium">
                    Hàm yêu cầu: <strong className="font-mono text-slate-900">{excelConfig.formulaType}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playStarChime();
                      setChartGenerated(true);
                    }}
                    className={`px-3 py-1.5 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                      chartGenerated
                        ? 'bg-indigo-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>{chartGenerated ? 'Đã tạo Biểu đồ cột' : 'Vẽ Biểu Đồ Cột'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundService.playStarChime();
                      setExcelSaved(true);
                    }}
                    className={`px-3 py-1.5 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                      excelSaved
                        ? 'bg-emerald-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{excelSaved ? 'Đã lưu (.xlsx)!' : 'Lưu bảng tính (.xlsx)'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Spreadsheet Grid */}
              <div className="overflow-x-auto border border-slate-300 rounded-xl">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                      <th className="p-2.5 border-r border-slate-300 w-10 text-center">Dòng</th>
                      <th className="p-2.5 border-r border-slate-300">A - Họ và tên</th>
                      <th className="p-2.5 border-r border-slate-300 w-24 text-center">B - Toán</th>
                      <th className="p-2.5 border-r border-slate-300 w-24 text-center">C - Tiếng Việt</th>
                      <th className="p-2.5 border-r border-slate-300 w-24 text-center">D - Tin học</th>
                      <th className="p-2.5 border-r border-slate-300 w-44 text-center bg-amber-50 text-amber-900">
                        E - Nhập công thức (=...)
                      </th>
                      <th className="p-2.5 w-28 text-center bg-emerald-50 text-emerald-900">
                        Kết quả
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelRows.map((row, idx) => {
                      const rowNum = idx + 2;
                      const evaluated = evaluateExcelRow(row, idx);
                      const target = excelConfig.targetScores[idx];

                      return (
                        <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50/70">
                          <td className="p-2 border-r border-slate-300 text-center font-mono font-bold text-slate-500 bg-slate-50">
                            {rowNum}
                          </td>
                          <td className="p-2 border-r border-slate-300 font-bold text-slate-800">
                            {row.name}
                          </td>
                          {/* Column B: Math */}
                          <td className="p-1.5 border-r border-slate-300 text-center">
                            <input
                              type="number"
                              placeholder="Nhập điểm..."
                              value={row.math}
                              onChange={e => {
                                const val = e.target.value;
                                setExcelRows(prev =>
                                  prev.map((r, i) => (i === idx ? { ...r, math: val } : r))
                                );
                              }}
                              className={`w-full text-center font-mono font-bold py-1 rounded border ${
                                Number(row.math) === target.math && row.math.trim() !== ''
                                  ? 'bg-white border-slate-200 text-slate-900'
                                  : 'bg-amber-50 border-amber-400 text-amber-900'
                              }`}
                            />
                          </td>
                          {/* Column C: Viet */}
                          <td className="p-1.5 border-r border-slate-300 text-center">
                            <input
                              type="number"
                              placeholder="Nhập điểm..."
                              value={row.viet}
                              onChange={e => {
                                const val = e.target.value;
                                setExcelRows(prev =>
                                  prev.map((r, i) => (i === idx ? { ...r, viet: val } : r))
                                );
                              }}
                              className={`w-full text-center font-mono font-bold py-1 rounded border ${
                                Number(row.viet) === target.viet && row.viet.trim() !== ''
                                  ? 'bg-white border-slate-200 text-slate-900'
                                  : 'bg-amber-50 border-amber-400 text-amber-900'
                              }`}
                            />
                          </td>
                          {/* Column D: Info */}
                          <td className="p-1.5 border-r border-slate-300 text-center">
                            <input
                              type="number"
                              placeholder="Nhập điểm..."
                              value={row.info}
                              onChange={e => {
                                const val = e.target.value;
                                setExcelRows(prev =>
                                  prev.map((r, i) => (i === idx ? { ...r, info: val } : r))
                                );
                              }}
                              className={`w-full text-center font-mono font-bold py-1 rounded border ${
                                Number(row.info) === target.info && row.info.trim() !== ''
                                  ? 'bg-white border-slate-200 text-slate-900'
                                  : 'bg-amber-50 border-amber-400 text-amber-900'
                              }`}
                            />
                          </td>
                          {/* Column E: Formula Input */}
                          <td className="p-1.5 border-r border-slate-300 bg-amber-50/40">
                            <input
                              type="text"
                              placeholder="Nhập công thức (=...)"
                              value={row.formula}
                              onChange={e => {
                                const val = e.target.value;
                                setExcelRows(prev =>
                                  prev.map((r, i) => (i === idx ? { ...r, formula: val } : r))
                                );
                              }}
                              className={`w-full px-2 py-1 font-mono font-bold text-xs rounded border uppercase ${
                                evaluated.isValid
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                                  : 'bg-white border-amber-300 text-slate-800'
                              }`}
                            />
                          </td>
                          {/* Evaluated Result */}
                          <td className="p-2 text-center font-mono font-black bg-emerald-50/50">
                            {evaluated.isValid ? (
                              <span className="text-emerald-700 text-sm">{evaluated.value}</span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Chờ công thức</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bar Chart Visualizer */}
              {chartGenerated && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>Biểu đồ cột trực quan hóa kết quả ({excelConfig.formulaType})</span>
                  </div>
                  <div className="space-y-2 pt-1">
                    {excelRows.map((r, i) => {
                      const ev = evaluateExcelRow(r, i);
                      const val = ev.value || 0;
                      const maxPossible = excelConfig.formulaType === 'SUM' ? 30 : 10;
                      const pct = Math.min(100, Math.round((val / maxPossible) * 100));
                      return (
                        <div key={i} className="flex items-center gap-3 text-xs">
                          <span className="w-32 font-bold truncate text-slate-700">{r.name}</span>
                          <div className="flex-1 bg-slate-200 h-4 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-emerald-800 w-16 text-right">
                            {val} điểm
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================== */}
          {/* SIMULATOR 3: MICROSOFT POWERPOINT                     */}
          {/* ===================================================== */}
          {subjectId === 'powerpoint' && (
            <div className="flex flex-col flex-1">
              {/* Topic Banner */}
              <div className="p-3 bg-orange-50 border-b border-orange-200 text-xs text-orange-950 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-orange-800 block">
                      🎯 Chủ đề bài trình chiếu: {pptConfig.topicName}
                    </span>
                    <span className="text-[11px] text-slate-700">
                      Hãy thiết kế tối thiểu 2 trang chiếu (Slide), chọn mẫu nền, chèn hình minh họa và bật hiệu ứng trình chiếu.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHint(prev => !prev)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold shrink-0 border transition-colors flex items-center gap-1.5 ${
                      showHint
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý nội dung'}</span>
                  </button>
                </div>

                {showHint && (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950 space-y-1">
                    <span className="font-bold text-amber-800 block">💡 Gợi ý nội dung các trang chiếu:</span>
                    <div>
                      • <strong>Slide 1:</strong> Tiêu đề <em>"{pptConfig.suggestedTitle1}"</em> — Phụ đề: <em>"{pptConfig.suggestedSub1}"</em>
                    </div>
                    <div>
                      • <strong>Slide 2:</strong> Tiêu đề <em>"{pptConfig.suggestedTitle2}"</em> — Phụ đề: <em>"{pptConfig.suggestedSub2}"</em>
                    </div>
                  </div>
                )}
              </div>

              {/* PPT Ribbon Toolbar */}
              <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-2 text-xs select-none">
                <button
                  type="button"
                  onClick={addNewSlide}
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Thêm Slide mới</span>
                </button>

                {/* Theme Picker */}
                <select
                  value={slides[activeSlideIndex]?.theme || 'bg-white text-slate-900'}
                  onChange={e => {
                    soundService.playKeyCorrect();
                    const nextTheme = e.target.value;
                    setSlides(prev =>
                      prev.map((s, idx) =>
                        idx === activeSlideIndex ? { ...s, theme: nextTheme } : s
                      )
                    );
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-xs"
                >
                  <option value="bg-white text-slate-900">Mẫu nền: Trắng cơ bản</option>
                  <option value="bg-gradient-to-br from-amber-50 to-orange-100 text-orange-950">
                    Mẫu nền: Cam Năng Động
                  </option>
                  <option value="bg-gradient-to-br from-sky-50 to-indigo-100 text-indigo-950">
                    Mẫu nền: Xanh Tri Thức
                  </option>
                  <option value="bg-gradient-to-br from-emerald-50 to-teal-100 text-emerald-950">
                    Mẫu nền: Xanh Thiên Nhiên
                  </option>
                </select>

                {/* Insert Sticker/Image */}
                <select
                  value={slides[activeSlideIndex]?.sticker || ''}
                  onChange={e => {
                    soundService.playStarChime();
                    const stk = e.target.value;
                    setSlides(prev =>
                      prev.map((s, idx) =>
                        idx === activeSlideIndex ? { ...s, sticker: stk } : s
                      )
                    );
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-xs"
                >
                  <option value="">+ Chèn Hình minh họa...</option>
                  <option value="🏫 📚 🎒">🏫 Trường học & Sách vở</option>
                  <option value="🐱 🐶 🐰">🐱 Động vật đáng yêu</option>
                  <option value="💻 🌐 🛡️">💻 Máy tính & An toàn số</option>
                  <option value="🇻🇳 ⭐ 🌻">🇻🇳 Quê hương tươi đẹp</option>
                </select>

                {/* Transition Picker */}
                <select
                  value={slides[activeSlideIndex]?.transition || 'none'}
                  onChange={e => {
                    soundService.playKeyCorrect();
                    const tr = e.target.value;
                    setSlides(prev =>
                      prev.map((s, idx) =>
                        idx === activeSlideIndex ? { ...s, transition: tr } : s
                      )
                    );
                  }}
                  className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-semibold text-xs"
                >
                  <option value="none">Hiệu ứng: Chưa chọn</option>
                  <option value="fade">Hiệu ứng: Mờ dần (Fade)</option>
                  <option value="push">Hiệu ứng: Đẩy trang (Push)</option>
                  <option value="zoom">Hiệu ứng: Phóng to (Zoom)</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    soundService.playStarChime();
                    setIsPresenting(!isPresenting);
                    setHasPresented(true);
                  }}
                  className="ml-auto px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isPresenting ? 'Thoát Trình chiếu' : 'Trình chiếu (Slide Show)'}</span>
                </button>
              </div>

              {/* PPT Workspace */}
              <div className="flex flex-1 min-h-[360px] bg-slate-200 p-4 gap-4">
                {/* Thumbnails Sidebar */}
                {!isPresenting && (
                  <div className="w-36 space-y-2 overflow-y-auto max-h-80">
                    {slides.map((s, idx) => (
                      <div
                        key={s.id}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`p-2 rounded-xl border-2 cursor-pointer transition-all ${
                          activeSlideIndex === idx
                            ? 'border-orange-500 bg-white shadow-md'
                            : 'border-slate-300 bg-slate-100 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-slate-500 mb-1">
                          Trang {idx + 1}
                        </div>
                        <div
                          className={`h-14 rounded border border-slate-200 flex flex-col items-center justify-center text-[10px] p-1 text-center font-bold line-clamp-2 ${s.theme}`}
                        >
                          {s.title || '(Chưa nhập tiêu đề)'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Big Active Slide Canvas */}
                <div
                  className={`flex-1 rounded-2xl shadow-lg border border-slate-300 p-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${
                    slides[activeSlideIndex]?.theme || 'bg-white text-slate-900'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 mb-2">
                    Trang chiếu số {activeSlideIndex + 1} / {slides.length}
                    {slides[activeSlideIndex]?.transition !== 'none' &&
                      ` · Hiệu ứng: ${slides[activeSlideIndex]?.transition.toUpperCase()}`}
                  </span>

                  <input
                    type="text"
                    placeholder={`Nhập tiêu đề Trang ${activeSlideIndex + 1} tại đây...`}
                    value={slides[activeSlideIndex]?.title || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setSlides(prev =>
                        prev.map((s, idx) =>
                          idx === activeSlideIndex ? { ...s, title: val } : s
                        )
                      );
                    }}
                    className="text-2xl font-black border-b-2 border-dashed border-slate-400/50 focus:border-orange-500 focus:outline-none w-full text-center bg-transparent py-1.5 mb-3 placeholder:text-slate-400/70"
                  />

                  <input
                    type="text"
                    placeholder={`Nhập nội dung phụ đề cho Trang ${activeSlideIndex + 1}...`}
                    value={slides[activeSlideIndex]?.subtitle || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setSlides(prev =>
                        prev.map((s, idx) =>
                          idx === activeSlideIndex ? { ...s, subtitle: val } : s
                        )
                      );
                    }}
                    className="text-sm font-semibold border-b-2 border-dashed border-slate-400/50 focus:border-orange-500 focus:outline-none w-full text-center bg-transparent py-1.5 placeholder:text-slate-400/70"
                  />

                  {slides[activeSlideIndex]?.sticker ? (
                    <div className="mt-6 px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-slate-200 shadow-sm text-4xl">
                      {slides[activeSlideIndex].sticker}
                    </div>
                  ) : (
                    <div className="mt-6 px-5 py-3 rounded-xl border border-dashed border-slate-400/60 text-xs opacity-70">
                      Chưa có hình minh họa
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Auto-Verified Requirements Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Các Bước Cần Thực Hiện
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHint(prev => !prev)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                  showHint
                    ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                    : 'bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>{showHint ? 'Ẩn gợi ý' : 'Gợi ý'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Các ô dưới đây <strong>không thể bấm tích thủ công</strong>. Khi em làm đúng từng thao tác trên phần mềm bên trái, hệ thống sẽ tự động tích xanh ✅ và cộng điểm!
            </p>

            {submitWarning && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>{submitWarning}</span>
              </div>
            )}

            <div className="space-y-3">
              {verifiedSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    step.done
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border text-xs font-black ${
                      step.done
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-400'
                    }`}
                  >
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div className="flex-1">
                    <span
                      className={`text-xs font-bold leading-relaxed block ${
                        step.done ? 'text-emerald-900 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {step.label}
                    </span>
                    <span
                      className={`text-[10px] font-bold mt-1 inline-block ${
                        step.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {step.done ? '✅ Đã hoàn thành (+25 điểm)' : '⏳ Chưa thực hiện'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <button
              type="button"
              onClick={handleSubmitPractice}
              className={`w-full py-3 font-bold rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                completedCount === totalSteps
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedCount === totalSteps
                  ? 'Hoàn tất xuất sắc · Nộp bài (100 điểm)'
                  : `Chấm điểm & Nộp bài (${Math.round((completedCount / totalSteps) * 100)} điểm)`}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      {isFinished && (
        <>
          <ConfettiEffect durationMs={4500} />
          <div className="p-6 bg-gradient-to-br from-emerald-50 via-sky-50 to-white dark:from-emerald-950/60 dark:via-sky-950/40 dark:to-slate-900 rounded-3xl border-2 border-emerald-300 dark:border-emerald-700 shadow-xl text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Đã lưu kết quả bài thực hành: {finalScore} / 100 điểm!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Em đã hoàn thành {completedCount}/{totalSteps} bước kỹ năng {subjectName}. Bài học này đã được đánh dấu Hoàn thành (Done) kèm điểm số!
            </p>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={onBack}
                className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Quay lại danh sách bài học</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
