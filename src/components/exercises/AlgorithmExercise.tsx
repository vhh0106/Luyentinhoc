import React, { useState, useEffect } from 'react';
import { Lesson, MazeConfig } from '../../types';
import { soundService } from '../../services/sound';
import { ConfettiEffect } from '../common/ConfettiEffect';
import { ArrowLeft, Play, RotateCcw, Trash2, Award, CheckCircle2, ChevronRight, Bot, Flag, Lightbulb } from 'lucide-react';

interface AlgorithmExerciseProps {
  lesson: Lesson;
  onComplete: (score: number, accuracy: number, timeSpentSeconds: number) => void;
  onBack: () => void;
}

type CommandType = 'forward' | 'turn_left' | 'turn_right';

export const AlgorithmExercise: React.FC<AlgorithmExerciseProps> = ({
  lesson,
  onComplete,
  onBack
}) => {
  const defaultMaze: MazeConfig = lesson.maze || {
    gridSize: 5,
    start: [0, 0],
    goal: [4, 4],
    walls: [[1, 1], [2, 1], [3, 1]],
    initialDirection: 'right'
  };

  const [commands, setCommands] = useState<CommandType[]>([]);
  const [robotPos, setRobotPos] = useState<[number, number]>(defaultMaze.start);
  const [robotDir, setRobotDir] = useState<'up' | 'down' | 'left' | 'right'>(defaultMaze.initialDirection);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Thêm khối lệnh và nhấn "Chạy thử"');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    resetMaze();
  }, [lesson.id]);

  const resetMaze = () => {
    setRobotPos(defaultMaze.start);
    setRobotDir(defaultMaze.initialDirection);
    setIsRunning(false);
    setActiveStep(null);
    setStatusMessage('Thêm khối lệnh và nhấn "Chạy thử"');
    setIsFinished(false);
  };

  const addCommand = (cmd: CommandType) => {
    if (isRunning) return;
    if (commands.length >= (defaultMaze.maxCommands || 10)) {
      setStatusMessage('Đã đạt giới hạn số khối lệnh tối đa cho bài này!');
      return;
    }
    soundService.playKeyCorrect();
    setCommands(prev => [...prev, cmd]);
  };

  const removeCommand = (index: number) => {
    if (isRunning) return;
    setCommands(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllCommands = () => {
    if (isRunning) return;
    setCommands([]);
    resetMaze();
  };

  const runAlgorithm = async () => {
    if (commands.length === 0 || isRunning) return;

    setIsRunning(true);
    setStatusMessage('Robot đang thực thi các bước...');

    let curPos: [number, number] = [...defaultMaze.start];
    let curDir = defaultMaze.initialDirection;

    setRobotPos(curPos);
    setRobotDir(curDir);

    const DIRS: Record<'up' | 'right' | 'down' | 'left', [number, number]> = {
      up: [-1, 0],
      right: [0, 1],
      down: [1, 0],
      left: [0, -1]
    };

    const TURN_LEFT: Record<'up' | 'right' | 'down' | 'left', 'up' | 'right' | 'down' | 'left'> = {
      up: 'left',
      left: 'down',
      down: 'right',
      right: 'up'
    };

    const TURN_RIGHT: Record<'up' | 'right' | 'down' | 'left', 'up' | 'right' | 'down' | 'left'> = {
      up: 'right',
      right: 'down',
      down: 'left',
      left: 'up'
    };

    for (let i = 0; i < commands.length; i++) {
      setActiveStep(i);
      const cmd = commands[i];

      if (cmd === 'turn_left') {
        curDir = TURN_LEFT[curDir];
        setRobotDir(curDir);
        soundService.playTypingSound();
      } else if (cmd === 'turn_right') {
        curDir = TURN_RIGHT[curDir];
        setRobotDir(curDir);
        soundService.playTypingSound();
      } else if (cmd === 'forward') {
        const delta = DIRS[curDir];
        const nextR = curPos[0] + delta[0];
        const nextC = curPos[1] + delta[1];

        // Check bounds
        if (nextR < 0 || nextR >= defaultMaze.gridSize || nextC < 0 || nextC >= defaultMaze.gridSize) {
          soundService.playKeyError();
          setStatusMessage('💥 Ái chà! Robot bị đâm vào tường rào bên ngoài!');
          setIsRunning(false);
          setActiveStep(null);
          return;
        }

        // Check walls
        const hitWall = defaultMaze.walls.some(([wr, wc]) => wr === nextR && wc === nextC);
        if (hitWall) {
          soundService.playKeyError();
          setStatusMessage('🪨 Ôi không! Robot va phải chướng ngại vật đá!');
          setIsRunning(false);
          setActiveStep(null);
          return;
        }

        curPos = [nextR, nextC];
        setRobotPos(curPos);
        soundService.playRobotStep();
      }

      // Check if goal reached
      if (curPos[0] === defaultMaze.goal[0] && curPos[1] === defaultMaze.goal[1]) {
        soundService.playSuccessCelebration();
        setStatusMessage('🎉 Tuyệt vời! Robot đã về đích an toàn!');
        setIsRunning(false);
        setActiveStep(null);
        setIsFinished(true);
        onComplete(100, 100, 45);
        return;
      }

      await new Promise(res => setTimeout(res, 550));
    }

    // Finished commands but not at goal
    soundService.playKeyError();
    setStatusMessage('Robot đã chạy hết lệnh nhưng chưa tới đích. Em hãy thêm lệnh nhé!');
    setIsRunning(false);
    setActiveStep(null);
  };

  const getDirArrow = (dir: string) => {
    switch (dir) {
      case 'up': return '▲';
      case 'right': return '►';
      case 'down': return '▼';
      case 'left': return '◄';
      default: return '►';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại bài học</span>
        </button>

        <button
          onClick={resetMaze}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại Robot
        </button>
      </div>

      {/* Lesson Description */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
            🤖 Tư duy thuật toán · Cấp {lesson.level} · Bài {lesson.id}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">{lesson.title}</h1>
          <p className="text-sm text-slate-600 mt-1">{lesson.desc}</p>
        </div>

        <div className="text-xs bg-purple-50 text-purple-800 px-4 py-2 rounded-xl border border-purple-200 font-medium">
          Tối đa: {defaultMaze.maxCommands || 8} lệnh
        </div>
      </div>

      {/* Interactive Two-Zone Sandbox */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Maze Grid Canvas (7 cols) */}
        <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-2">
            <span>SÂN ĐẤU MÊ CUNG LOGIC</span>
            <span>·</span>
            <span>Kích thước {defaultMaze.gridSize}x{defaultMaze.gridSize}</span>
          </div>

          <div
            className="grid gap-2 p-3 bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-inner"
            style={{
              gridTemplateColumns: `repeat(${defaultMaze.gridSize}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: defaultMaze.gridSize }).map((_, r) =>
              Array.from({ length: defaultMaze.gridSize }).map((_, c) => {
                const isRobot = robotPos[0] === r && robotPos[1] === c;
                const isGoal = defaultMaze.goal[0] === r && defaultMaze.goal[1] === c;
                const isWall = defaultMaze.walls.some(([wr, wc]) => wr === r && wc === c);

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-bold text-lg select-none transition-all duration-300 relative ${
                      isWall
                        ? 'bg-slate-700 text-slate-400 border border-slate-600 shadow-md'
                        : isGoal
                        ? 'bg-emerald-950/80 text-emerald-300 border-2 border-emerald-400'
                        : 'bg-slate-800/90 text-slate-600 border border-slate-700/50'
                    }`}
                  >
                    {isWall && <span className="text-2xl">🪨</span>}
                    {isGoal && !isRobot && (
                      <div className="flex flex-col items-center">
                        <Flag className="w-6 h-6 text-emerald-400 animate-bounce" />
                        <span className="text-[9px] text-emerald-300 font-bold">ĐÍCH</span>
                      </div>
                    )}
                    {isRobot && (
                      <div className="flex flex-col items-center text-blue-400 transform transition-transform">
                        <Bot className="w-7 h-7 text-cyan-300 drop-shadow" />
                        <span className="text-xs font-black text-amber-300 -mt-1">
                          {getDirArrow(robotDir)}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Status Bar */}
          <div className="mt-4 w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 text-center">
            {statusMessage}
          </div>
        </div>

        {/* Right: Code Block Palette & Sequence (5 cols) */}
        <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">
              1. Khối lệnh có sẵn (Nhấp để thêm)
            </h3>
            <div className="grid grid-cols-1 gap-2 mb-6">
              <button
                onClick={() => addCommand('forward')}
                disabled={isRunning}
                className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold flex items-center justify-between transition-colors disabled:opacity-50"
              >
                <span>🚶 Đi thẳng 1 bước</span>
                <span className="text-blue-500 font-mono">+ Thêm</span>
              </button>
              <button
                onClick={() => addCommand('turn_left')}
                disabled={isRunning}
                className="w-full py-2.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-xl text-xs font-bold flex items-center justify-between transition-colors disabled:opacity-50"
              >
                <span>↩️ Quay trái 90°</span>
                <span className="text-purple-500 font-mono">+ Thêm</span>
              </button>
              <button
                onClick={() => addCommand('turn_right')}
                disabled={isRunning}
                className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center justify-between transition-colors disabled:opacity-50"
              >
                <span>↪️ Quay phải 90°</span>
                <span className="text-amber-500 font-mono">+ Thêm</span>
              </button>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                2. Chương trình của em ({commands.length})
              </h3>
              {commands.length > 0 && (
                <button
                  onClick={clearAllCommands}
                  disabled={isRunning}
                  className="text-xs text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 font-medium disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Xóa hết
                </button>
              )}
            </div>

            <div className="min-h-[160px] max-h-[220px] overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
              {commands.length === 0 ? (
                <div className="h-28 flex items-center justify-center text-xs text-slate-400 italic">
                  Chưa có lệnh nào. Hãy nhấp các nút phía trên!
                </div>
              ) : (
                commands.map((cmd, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeStep === idx
                        ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-xs scale-102 font-bold ring-2 ring-amber-300'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span>
                        {cmd === 'forward' && '🚶 Đi thẳng'}
                        {cmd === 'turn_left' && '↩️ Quay trái'}
                        {cmd === 'turn_right' && '↪️ Quay phải'}
                      </span>
                    </div>
                    <button
                      onClick={() => removeCommand(idx)}
                      disabled={isRunning}
                      className="text-slate-400 hover:text-rose-600 px-1 font-bold disabled:opacity-50"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4">
            <button
              onClick={runAlgorithm}
              disabled={isRunning || commands.length === 0}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4 fill-white" />
              {isRunning ? 'Đang chạy mô phỏng...' : 'CHẠY THỬ CHƯƠNG TRÌNH'}
            </button>
          </div>
        </div>
      </div>

      {/* Victory Celebration */}
      {isFinished && (
        <>
          <ConfettiEffect durationMs={4500} />
          <div className="p-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-white rounded-3xl border-2 border-purple-300 shadow-xl text-center animate-bounce-gentle">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Tư duy logic tuyệt đỉnh!</h2>
          <p className="text-sm text-slate-600 mt-1">
            Robot đã giải xong mê cung với chuỗi {commands.length} khối lệnh chuẩn xác!
          </p>

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={resetMaze}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            >
              Thử lại thuật toán khác
            </button>
            <button
              onClick={onBack}
              className="px-5 py-2 text-sm font-bold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Tiếp tục bài kế tiếp
            </button>
          </div>
        </div>
      </>
    )}
    </div>
  );
};
