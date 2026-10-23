import React, { useState, useEffect } from 'react';
import { Lesson } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ArrowLeft, RotateCcw, Award, CheckCircle2, Star, Sparkles, Heart } from 'lucide-react';

interface MouseExerciseProps {
  lesson: Lesson;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

interface TargetBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji: string;
}

export const MouseExercise: React.FC<MouseExerciseProps> = ({
  lesson,
  onComplete,
  onBack
}) => {
  const [score, setScore] = useState(0);
  const [targetsHit, setTargetsHit] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [bubbles, setBubbles] = useState<TargetBubble[]>([]);
  const [chests, setChests] = useState<{ id: number; opened: boolean; reward: string }[]>([
    { id: 1, opened: false, reward: '💎 Kim cương tri thức' },
    { id: 2, opened: false, reward: '⭐ Ngôi sao chăm chỉ' },
    { id: 3, opened: false, reward: '🏆 Cúp vô địch chuột' },
    { id: 4, opened: false, reward: '🎁 Hộp quà công nghệ' },
  ]);

  // Drag & drop hardware state
  const [dragItems, setDragItems] = useState([
    { id: 'screen', name: 'Màn hình', emoji: '🖥️', placed: false },
    { id: 'keyboard', name: 'Bàn phím', emoji: '⌨️', placed: false },
    { id: 'mouse', name: 'Chuột', emoji: '🖱️', placed: false },
    { id: 'cpu', name: 'Thân máy', emoji: '🖲️', placed: false }
  ]);

  // Drag & drop recycling state
  const [recycleItems, setRecycleItems] = useState([
    { id: 'organic', name: 'Vỏ chuối', emoji: '🍌', targetBin: 'bin_organic', placed: false },
    { id: 'recycle', name: 'Chai nhựa', emoji: '🧴', targetBin: 'bin_recycle', placed: false },
    { id: 'paper', name: 'Giấy báo cũ', emoji: '📰', targetBin: 'bin_recycle', placed: false },
    { id: 'inorganic', name: 'Túi nilon rách', emoji: '🛍️', targetBin: 'bin_inorganic', placed: false }
  ]);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const isBubbleFast = lesson.type === 'click_bubbles_fast';
  const isRecycle = lesson.type === 'drag_drop_recycle';
  const totalRequired = lesson.type === 'double_click'
    ? 4
    : isRecycle
    ? 4
    : lesson.type === 'drag_drop'
    ? 4
    : isBubbleFast
    ? 12
    : 10;

  useEffect(() => {
    resetGame();
  }, [lesson.id]);

  const resetGame = () => {
    setScore(0);
    setTargetsHit(0);
    setIsFinished(false);

    if (
      lesson.type === 'move_star' ||
      lesson.type === 'click_bubbles' ||
      lesson.type === 'click_bubbles_fast'
    ) {
      generateBubbles();
    } else if (lesson.type === 'double_click') {
      setChests([
        { id: 1, opened: false, reward: '💎 Kim cương tri thức' },
        { id: 2, opened: false, reward: '⭐ Ngôi sao chăm chỉ' },
        { id: 3, opened: false, reward: '🏆 Cúp vô địch chuột' },
        { id: 4, opened: false, reward: '🎁 Hộp quà công nghệ' }
      ]);
    } else if (lesson.type === 'drag_drop') {
      setDragItems([
        { id: 'screen', name: 'Màn hình', emoji: '🖥️', placed: false },
        { id: 'keyboard', name: 'Bàn phím', emoji: '⌨️', placed: false },
        { id: 'mouse', name: 'Chuột', emoji: '🖱️', placed: false },
        { id: 'cpu', name: 'Thân máy', emoji: '🖲️', placed: false }
      ]);
    } else if (isRecycle) {
      setRecycleItems([
        { id: 'organic', name: 'Vỏ chuối', emoji: '🍌', targetBin: 'bin_organic', placed: false },
        { id: 'recycle', name: 'Chai nhựa', emoji: '🧴', targetBin: 'bin_recycle', placed: false },
        { id: 'paper', name: 'Giấy báo cũ', emoji: '📰', targetBin: 'bin_recycle', placed: false },
        { id: 'inorganic', name: 'Túi nilon rách', emoji: '🛍️', targetBin: 'bin_inorganic', placed: false }
      ]);
    }
  };

  const generateBubbles = () => {
    const emojis =
      lesson.type === 'move_star'
        ? ['⭐', '🌟', '✨', '💫']
        : ['🫧', '🎈', '🍭', '🍓', '🍎', '🍉', '🍕', '🍩'];
    const colors = [
      'bg-blue-500', 'bg-rose-500', 'bg-emerald-500',
      'bg-amber-500', 'bg-purple-500', 'bg-cyan-500'
    ];
    const newItems: TargetBubble[] = [];
    const count = isBubbleFast ? 8 : 6;
    for (let i = 0; i < count; i++) {
      newItems.push({
        id: Date.now() + i,
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 70) + 15,
        size: isBubbleFast ? 48 : Math.floor(Math.random() * 20) + 52,
        color: colors[i % colors.length],
        emoji: emojis[i % emojis.length]
      });
    }
    setBubbles(newItems);
  };

  const handleTargetHit = (id: number) => {
    soundService.playBubblePop();
    setScore(s => s + 10);
    const newCount = targetsHit + 1;
    setTargetsHit(newCount);

    setBubbles(prev => prev.filter(b => b.id !== id));

    if (newCount < totalRequired) {
      setTimeout(() => {
        const emojis = lesson.type === 'move_star' ? ['⭐', '🌟'] : ['🫧', '🎈', '🍭', '🍓'];
        const colors = ['bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-amber-500'];
        setBubbles(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: Math.floor(Math.random() * 70) + 15,
            size: isBubbleFast ? 48 : 55,
            color: colors[Math.floor(Math.random() * colors.length)],
            emoji: emojis[Math.floor(Math.random() * emojis.length)]
          }
        ]);
      }, isBubbleFast ? 150 : 300);
    } else {
      finishGame();
    }
  };

  const handleDoubleClickChest = (chestId: number) => {
    soundService.playChestOpen();
    setChests(prev =>
      prev.map(c => (c.id === chestId ? { ...c, opened: true } : c))
    );

    const openedCount = chests.filter(c => c.opened || c.id === chestId).length;
    setTargetsHit(openedCount);
    setScore(s => s + 25);

    if (openedCount === chests.length) {
      finishGame();
    }
  };

  const handleDropHardware = (slotId: string) => {
    if (activeDragId === slotId) {
      soundService.playStarChime();
      setDragItems(prev =>
        prev.map(item => (item.id === slotId ? { ...item, placed: true } : item))
      );
      const placedCount = dragItems.filter(item => item.placed || item.id === slotId).length;
      setTargetsHit(placedCount);
      setScore(s => s + 25);
      setActiveDragId(null);

      if (placedCount === dragItems.length) {
        finishGame();
      }
    } else {
      soundService.playKeyError();
      setActiveDragId(null);
    }
  };

  const handleDropRecycle = (binType: string) => {
    const item = recycleItems.find(r => r.id === activeDragId);
    if (item && item.targetBin === binType) {
      soundService.playStarChime();
      setRecycleItems(prev =>
        prev.map(r => (r.id === item.id ? { ...r, placed: true } : r))
      );
      const placedCount = recycleItems.filter(r => r.placed || r.id === item.id).length;
      setTargetsHit(placedCount);
      setScore(s => s + 25);
      setActiveDragId(null);

      if (placedCount === recycleItems.length) {
        finishGame();
      }
    } else {
      soundService.playKeyError();
      setActiveDragId(null);
    }
  };

  const finishGame = () => {
    setIsFinished(true);
    soundService.playSuccessCelebration();
    onComplete(100, 100, 30);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {isFinished && <ConfettiEffect durationMs={4000} />}

      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <button
          onClick={resetGame}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Chơi lại
        </button>
      </div>

      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            🖱️ Luyện chuột · Cấp {lesson.level} · Bài {lesson.id}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">{lesson.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{lesson.desc}</p>
        </div>

        {/* Progress & Score */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="block text-xs text-slate-500 font-medium">Tiến độ</span>
            <span className="text-lg font-bold text-amber-600 tabular-nums">
              {targetsHit} / {totalRequired}
            </span>
          </div>
          <div className="text-center px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
            <span className="block text-xs text-amber-700 font-medium">Điểm số</span>
            <span className="text-xl font-bold text-amber-800 tabular-nums">+{score}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-[460px] bg-gradient-to-b from-slate-900 via-slate-800 to-indigo-950 rounded-3xl border-2 border-slate-700 overflow-hidden select-none shadow-2xl">
        {/* Mode 1, 2, 5: Move Cursor & Click Bubbles */}
        {(lesson.type === 'move_star' ||
          lesson.type === 'click_bubbles' ||
          lesson.type === 'click_bubbles_fast') && (
          <>
            <div className="absolute top-4 left-4 text-xs font-semibold text-slate-300 bg-slate-800/90 px-3.5 py-1.5 rounded-full border border-slate-700 flex items-center gap-2 shadow-xs">
              {lesson.type === 'move_star' ? (
                <>⭐ Rà chuột chạm vào ngôi sao!</>
              ) : isBubbleFast ? (
                <>⚡ Phản xạ siêu tốc: Bấm nhanh bóng trước khi trôi đi!</>
              ) : (
                <>🎯 Nhấp chuột trái thật chuẩn xác vào bóng bóng!</>
              )}
            </div>

            {bubbles.map(bubble => (
              <button
                key={bubble.id}
                onMouseEnter={() => lesson.type === 'move_star' && handleTargetHit(bubble.id)}
                onClick={() =>
                  (lesson.type === 'click_bubbles' || isBubbleFast) && handleTargetHit(bubble.id)
                }
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-2xl shadow-xl transition-transform hover:scale-115 active:scale-95 cursor-pointer animate-pulse-subtle border-2 border-white/40 ${bubble.color}`}
              >
                {bubble.emoji}
              </button>
            ))}
          </>
        )}

        {/* Mode 3: Double Click Chests */}
        {lesson.type === 'double_click' && (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="text-sm text-amber-200 mb-6 bg-slate-800/90 px-5 py-2 rounded-full border border-amber-500/40 shadow-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Nhấp đúp chuột 2 lần liên tiếp (Double-click) vào rương để mở quà!</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
              {chests.map(chest => (
                <div
                  key={chest.id}
                  onDoubleClick={() => !chest.opened && handleDoubleClickChest(chest.id)}
                  className={`p-6 rounded-3xl border-2 text-center transition-all cursor-pointer select-none ${
                    chest.opened
                      ? 'bg-amber-950/60 border-amber-400 scale-105 shadow-xl'
                      : 'bg-slate-800/90 border-slate-600 hover:border-amber-400 hover:scale-103 shadow-md'
                  }`}
                >
                  <div className="text-5xl mb-2 animate-bounce-gentle">
                    {chest.opened ? '🔓' : '🎁'}
                  </div>
                  <div className="text-xs font-bold text-white">Rương #{chest.id}</div>
                  <div className="text-xs text-amber-300 mt-1 min-h-[1.5rem]">
                    {chest.opened ? chest.reward : 'Nhấp đúp mở'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode 4: Drag & Drop Computer Assembly */}
        {lesson.type === 'drag_drop' && (
          <div className="h-full flex flex-col justify-between p-6">
            <div className="text-xs text-center text-slate-300 bg-slate-800/90 px-4 py-2 rounded-xl mx-auto border border-slate-700">
              🖐️ Dùng chuột bấm giữ và kéo từng linh kiện máy tính ở dưới thả vào đúng vị trí bàn học bên trên!
            </div>

            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-800/50 rounded-2xl border border-dashed border-slate-600">
              {dragItems.map(item => (
                <div
                  key={item.id}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => handleDropHardware(item.id)}
                  className={`h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-colors ${
                    item.placed
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-inner'
                      : 'border-slate-500 bg-slate-900/60 text-slate-400 hover:border-amber-400'
                  }`}
                >
                  {item.placed ? (
                    <>
                      <span className="text-3xl mb-1">{item.emoji}</span>
                      <span className="text-xs font-semibold text-emerald-300">Đã lắp {item.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs text-slate-400 font-medium">Ô lắp:</span>
                      <span className="text-sm font-bold text-white mt-1">{item.name}</span>
                      <span className="text-[10px] text-slate-500 mt-1">Thả vào đây</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 pt-2">
              {dragItems.map(item => (
                <div
                  key={item.id}
                  draggable={!item.placed}
                  onDragStart={() => setActiveDragId(item.id)}
                  className={`px-4 py-3 rounded-2xl border flex items-center gap-2 cursor-grab active:cursor-grabbing select-none transition-all ${
                    item.placed
                      ? 'opacity-30 pointer-events-none bg-slate-800 border-slate-700'
                      : 'bg-white text-slate-900 border-slate-300 hover:border-amber-400 hover:shadow-lg'
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-bold">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode 6: Drag & Drop Environmental Recycling */}
        {isRecycle && (
          <div className="h-full flex flex-col justify-between p-6">
            <div className="text-xs text-center text-emerald-200 bg-emerald-950/80 px-4 py-2 rounded-xl mx-auto border border-emerald-700/60">
              🌱 Kéo rác ở dưới thả vào đúng 3 thùng: Hữu cơ (Vỏ chuối), Tái chế (Chai nhựa, giấy), Vô cơ (Túi nilon)!
            </div>

            {/* 3 Recycling Bins */}
            <div className="grid grid-cols-3 gap-6 p-4">
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDropRecycle('bin_organic')}
                className="h-32 rounded-2xl border-2 border-emerald-500 bg-emerald-950/40 text-center flex flex-col items-center justify-center p-3 hover:scale-102 transition-transform"
              >
                <div className="text-3xl mb-1">🥬 🗑️</div>
                <div className="text-xs font-bold text-emerald-300">Thùng Rác Hữu Cơ</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">Thức ăn thừa, hoa quả</div>
              </div>

              <div
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDropRecycle('bin_recycle')}
                className="h-32 rounded-2xl border-2 border-blue-500 bg-blue-950/40 text-center flex flex-col items-center justify-center p-3 hover:scale-102 transition-transform"
              >
                <div className="text-3xl mb-1">♻️ 🗑️</div>
                <div className="text-xs font-bold text-blue-300">Thùng Rác Tái Chế</div>
                <div className="text-[10px] text-blue-400 mt-0.5">Chai nhựa, giấy báo, kim loại</div>
              </div>

              <div
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDropRecycle('bin_inorganic')}
                className="h-32 rounded-2xl border-2 border-amber-500 bg-amber-950/40 text-center flex flex-col items-center justify-center p-3 hover:scale-102 transition-transform"
              >
                <div className="text-3xl mb-1">⛔ 🗑️</div>
                <div className="text-xs font-bold text-amber-300">Thùng Rác Vô Cơ</div>
                <div className="text-[10px] text-amber-400 mt-0.5">Túi nilon, đồ gốm sứ vỡ</div>
              </div>
            </div>

            {/* Draggable trash items */}
            <div className="flex justify-center gap-4 pt-2">
              {recycleItems.map(item => (
                <div
                  key={item.id}
                  draggable={!item.placed}
                  onDragStart={() => setActiveDragId(item.id)}
                  className={`px-4 py-3 rounded-2xl border flex items-center gap-2 cursor-grab active:cursor-grabbing select-none transition-all ${
                    item.placed
                      ? 'opacity-30 pointer-events-none bg-slate-800 border-slate-700'
                      : 'bg-white text-slate-900 border-slate-300 hover:border-emerald-400 hover:shadow-lg'
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-bold">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Victory Celebration Modal */}
      {isFinished && (
        <div className="p-6 bg-gradient-to-br from-amber-50 via-orange-50 to-white rounded-3xl border-2 border-amber-300 shadow-xl text-center animate-bounce-gentle">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Bàn tay vàng! Em điều khiển chuột siêu đỉnh!</h2>
          <p className="text-sm text-slate-600 mt-1">
            Tổng điểm đạt được: <strong className="text-amber-700 font-bold">{score} Điểm</strong>
          </p>

          <div className="flex justify-center gap-1.5 my-4">
            {[1, 2, 3].map(s => (
              <Star key={s} className="w-8 h-8 text-amber-400 fill-amber-400 animate-pulse" />
            ))}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={resetGame}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              Chơi lại lần nữa
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2 text-sm font-bold text-white bg-amber-600 rounded-xl hover:bg-amber-700 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Tiếp tục bài kế tiếp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
