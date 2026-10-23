import React, { useState } from 'react';
import { Lesson, SubjectId } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
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
  Presentation
} from 'lucide-react';

interface OfficeSimulatorProps {
  lesson: Lesson;
  subjectId: SubjectId;
  subjectEmoji: string;
  subjectName: string;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

export const OfficeSimulator: React.FC<OfficeSimulatorProps> = ({
  lesson,
  subjectId,
  subjectEmoji,
  subjectName,
  onComplete,
  onBack
}) => {
  // Word state
  const [wordText, setWordText] = useState('EM YÊU TRƯỜNG EM\n\nEm yêu trường em\nVới bao bạn thân\nVà cô giáo hiền\nNhư yêu quê hương\nCắp sách đến trường trong muôn vàn yêu thương.');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [textColor, setTextColor] = useState('#1e293b');
  const [fontSize, setFontSize] = useState('16');
  const [fontFamily, setFontFamily] = useState('Times New Roman');

  // Excel state
  const [excelData, setExcelData] = useState([
    { name: 'Nguyễn Văn An', math: 9, viet: 8, info: 10 },
    { name: 'Trần Thị Bình', math: 8, viet: 9, info: 9 },
    { name: 'Lê Hoàng Cúc', math: 10, viet: 10, info: 10 }
  ]);
  const [formulaMode, setFormulaMode] = useState(false);

  // PowerPoint state
  const [slides, setSlides] = useState([
    { id: 1, title: 'CON VẬT EM YÊU THÍCH', subtitle: 'Học sinh: Nguyễn Văn An - Lớp 3A', bg: 'bg-white' },
    { id: 2, title: 'CHÚ MÈO MƯỚP NHÀ EM', subtitle: 'Bộ lông mềm mại và đôi mắt tròn xoe', bg: 'bg-amber-50' }
  ]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Completed tasks checklist
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const tasks = lesson.tasks || [
    'Thực hiện các thao tác định dạng cơ bản',
    'Kiểm tra lại nội dung bài tập',
    'Lưu sản phẩm hoàn chỉnh'
  ];

  const toggleTask = (index: number) => {
    soundService.playKeyCorrect();
    setCompletedTasks(prev => {
      const next = prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index];
      if (next.length === tasks.length) {
        soundService.playSuccessCelebration();
        setIsFinished(true);
        onComplete(100, 100, 60);
      }
      return next;
    });
  };

  const addNewSlide = () => {
    soundService.playStarChime();
    const newId = slides.length + 1;
    setSlides(prev => [
      ...prev,
      { id: newId, title: `Trang chiếu mới #${newId}`, subtitle: 'Nhấp để nhập phụ đề', bg: 'bg-blue-50' }
    ]);
    setActiveSlideIndex(slides.length);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <div className="text-xs text-slate-500 font-medium">
          Mô phỏng thực hành phần mềm Kết Nối Tri Thức
        </div>
      </div>

      {/* Title Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            {subjectEmoji} {subjectName} · Cấp {lesson.level} · Bài {lesson.id}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">{lesson.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{lesson.desc}</p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 font-medium block">Nhiệm vụ đã hoàn thành</span>
          <span className="text-lg font-bold text-emerald-600 tabular-nums">
            {completedTasks.length} / {tasks.length}
          </span>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Software Simulator (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden flex flex-col">
          {/* Top Titlebar of simulated App */}
          <div className="px-4 py-2 bg-slate-800 text-white flex items-center justify-between text-xs font-semibold select-none">
            <div className="flex items-center gap-2">
              {subjectId === 'word' && <FileText className="w-4 h-4 text-blue-400" />}
              {subjectId === 'excel' && <FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
              {subjectId === 'powerpoint' && <Presentation className="w-4 h-4 text-orange-400" />}
              <span>
                {subjectId === 'word' && 'Tập Tin Soạn Thảo - Microsoft Word (Giả lập)'}
                {subjectId === 'excel' && 'Bảng Điểm Học Tập - Microsoft Excel (Giả lập)'}
                {subjectId === 'powerpoint' && 'Bài Thuyết Trình Mẫu - Microsoft PowerPoint (Giả lập)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
            </div>
          </div>

          {/* SIMULATOR: WORD */}
          {subjectId === 'word' && (
            <div className="flex flex-col flex-1">
              {/* Ribbon Toolbar */}
              <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-3 text-xs select-none">
                <select
                  value={fontFamily}
                  onChange={e => setFontFamily(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-medium text-xs focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Arial">Arial</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>

                <select
                  value={fontSize}
                  onChange={e => setFontSize(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-medium text-xs focus:ring-1 focus:ring-blue-500"
                >
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="22">22</option>
                  <option value="26">26</option>
                </select>

                <div className="h-5 w-px bg-slate-300"></div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsBold(!isBold)}
                    className={`p-1.5 rounded font-bold ${isBold ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsItalic(!isItalic)}
                    className={`p-1.5 rounded italic ${isItalic ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsUnderline(!isUnderline)}
                    className={`p-1.5 rounded underline ${isUnderline ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                  >
                    <Underline className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="h-5 w-px bg-slate-300"></div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTextAlign('left')}
                    className={`p-1.5 rounded ${textAlign === 'left' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setTextAlign('center')}
                    className={`p-1.5 rounded ${textAlign === 'center' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setTextAlign('right')}
                    className={`p-1.5 rounded ${textAlign === 'right' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-slate-500 text-[11px]">Màu chữ:</span>
                  <input
                    type="color"
                    value={textColor}
                    onChange={e => setTextColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border border-slate-300"
                  />
                </div>
              </div>

              {/* Document Page Canvas */}
              <div className="p-8 bg-slate-200 min-h-[360px] flex justify-center">
                <textarea
                  value={wordText}
                  onChange={e => setWordText(e.target.value)}
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    textAlign,
                    color: textColor
                  }}
                  className="w-full max-w-xl h-80 p-8 bg-white shadow-md border border-slate-300 rounded-sm resize-none focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* SIMULATOR: EXCEL */}
          {subjectId === 'excel' && (
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded border border-slate-300 font-bold">fx</span>
                  <input
                    type="text"
                    value={formulaMode ? '=SUM(B2:D4) [Đang tự động tính tổng]' : 'Bấm nút "Tự động tính hàm SUM" để tính toán'}
                    readOnly
                    className="px-3 py-1 bg-slate-50 border border-slate-300 rounded w-72 text-slate-700 font-mono text-xs"
                  />
                </div>

                <button
                  onClick={() => {
                    soundService.playStarChime();
                    setFormulaMode(true);
                  }}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded text-xs transition-colors flex items-center gap-1"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  Tự động tính hàm SUM & Vẽ biểu đồ
                </button>
              </div>

              {/* Spreadsheet Grid */}
              <div className="overflow-x-auto border border-slate-300 rounded-lg">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold">
                      <th className="p-2 border-r border-slate-300 w-10 text-center">#</th>
                      <th className="p-2 border-r border-slate-300">A - Họ và tên</th>
                      <th className="p-2 border-r border-slate-300 w-24 text-center">B - Toán</th>
                      <th className="p-2 border-r border-slate-300 w-24 text-center">C - Tiếng Việt</th>
                      <th className="p-2 border-r border-slate-300 w-24 text-center">D - Tin học</th>
                      <th className="p-2 w-28 text-center bg-emerald-50 text-emerald-900">E - Tổng (SUM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, index) => {
                      const sum = row.math + row.viet + row.info;
                      return (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="p-2 border-r border-slate-300 text-center font-mono text-slate-400 bg-slate-50">
                            {index + 2}
                          </td>
                          <td className="p-2 border-r border-slate-300 font-medium">{row.name}</td>
                          <td className="p-2 border-r border-slate-300 text-center font-mono">{row.math}</td>
                          <td className="p-2 border-r border-slate-300 text-center font-mono">{row.viet}</td>
                          <td className="p-2 border-r border-slate-300 text-center font-mono">{row.info}</td>
                          <td className="p-2 text-center font-mono font-bold bg-emerald-50/50 text-emerald-800">
                            {formulaMode ? sum : '---'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bar Chart Visualizer */}
              {formulaMode && (
                <div className="mt-4 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                  <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    Biểu đồ cột tổng điểm học tập
                  </div>
                  <div className="space-y-2 pt-2">
                    {excelData.map((r, i) => {
                      const total = r.math + r.viet + r.info;
                      const pct = Math.round((total / 30) * 100);
                      return (
                        <div key={i} className="flex items-center gap-3 text-xs">
                          <span className="w-28 font-medium truncate text-slate-700">{r.name}</span>
                          <div className="flex-1 bg-slate-200 h-4 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                          <span className="font-mono font-bold text-emerald-800">{total} điểm</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SIMULATOR: POWERPOINT */}
          {subjectId === 'powerpoint' && (
            <div className="flex flex-col flex-1">
              {/* Ribbon */}
              <div className="p-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs select-none">
                <button
                  onClick={addNewSlide}
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Slide (Thêm trang mới)
                </button>
                <span className="text-slate-500">Trang {activeSlideIndex + 1} / {slides.length}</span>
              </div>

              {/* PPT Workspace */}
              <div className="flex flex-1 min-h-[350px] bg-slate-200 p-4 gap-4">
                {/* Thumbnails Sidebar */}
                <div className="w-36 space-y-2">
                  {slides.map((s, idx) => (
                    <div
                      key={s.id}
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`p-2 rounded-lg border-2 cursor-pointer transition-all ${
                        activeSlideIndex === idx
                          ? 'border-orange-500 bg-white shadow-md scale-102'
                          : 'border-slate-300 bg-slate-100 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-slate-400 mb-1">Slide {idx + 1}</div>
                      <div className="h-12 bg-slate-50 rounded border border-slate-200 flex items-center justify-center text-[10px] p-1 text-center font-medium line-clamp-2">
                        {s.title}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Big Active Slide Canvas */}
                <div
                  className={`flex-1 rounded-xl shadow-lg border border-slate-300 p-8 flex flex-col items-center justify-center text-center ${slides[activeSlideIndex]?.bg || 'bg-white'}`}
                >
                  <input
                    type="text"
                    value={slides[activeSlideIndex]?.title || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setSlides(prev =>
                        prev.map((s, idx) => (idx === activeSlideIndex ? { ...s, title: val } : s))
                      );
                    }}
                    className="text-2xl font-black text-slate-900 border-b-2 border-transparent hover:border-slate-300 focus:border-orange-500 focus:outline-none w-full text-center bg-transparent py-1 mb-2"
                  />

                  <input
                    type="text"
                    value={slides[activeSlideIndex]?.subtitle || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setSlides(prev =>
                        prev.map((s, idx) => (idx === activeSlideIndex ? { ...s, subtitle: val } : s))
                      );
                    }}
                    className="text-sm text-slate-600 border-b-2 border-transparent hover:border-slate-300 focus:border-orange-500 focus:outline-none w-full text-center bg-transparent py-1"
                  />

                  <div className="mt-6 p-4 rounded-xl border border-dashed border-slate-300 text-3xl">
                    🐱 🐾 ⭐
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Interactive Task Checklist (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Yêu cầu cần làm (Checklist)
              </h3>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Em hãy thực hiện thao tác trên màn hình mô phỏng, sau đó bấm đánh dấu vào từng nhiệm vụ khi đã làm xong:
            </p>

            <div className="space-y-3">
              {tasks.map((task, idx) => {
                const isChecked = completedTasks.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white border-slate-300'
                      }`}
                    >
                      {isChecked && '✓'}
                    </div>
                    <span className={`text-xs font-semibold leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {task}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                soundService.playSuccessCelebration();
                setIsFinished(true);
                onComplete(100, 100, 60);
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Nộp bài thực hành
            </button>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      {isFinished && (
        <>
          <ConfettiEffect durationMs={4500} />
          <div className="p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-white rounded-3xl border-2 border-blue-300 shadow-xl text-center animate-bounce-gentle">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Chúc mừng em đã hoàn thành bài thực hành!</h2>
          <p className="text-sm text-slate-600 mt-1">
            Kĩ năng văn phòng công nghệ thông tin Kết Nối Tri Thức đạt chuẩn xuất sắc.
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={onBack}
              className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Quay lại danh sách bài học
            </button>
          </div>
        </div>
      </>
    )}
    </div>
  );
};
