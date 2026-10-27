import React, { useEffect, useRef, useState, useCallback } from 'react';
import { SubjectId } from '../../types';

export type ArcadeGameId = 'space-typing' | 'cyber-shield' | 'robo-maze';
type GameShellState = 'TITLE_SCREEN' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'GAME_OVER';

export interface ArcadeGameCenterProps {
  initialGameId?: ArcadeGameId;
  studentName?: string;
  classCode?: string;
  defaultGrade?: 3 | 4 | 5;
  onExit: () => void;
  onGameComplete?: (gameId: ArcadeGameId, subjectId: SubjectId, score: number, accuracy: number, timeSpentSeconds: number) => void;
}

interface GameCatalogItem {
  id: ArcadeGameId;
  title: string;
  subtitle: string;
  subjectId: SubjectId;
  accentHex: string;
  secondaryHex: string;
  objective: string;
  controlsHint: string;
}

export const ARCADE_GAMES_CATALOG: GameCatalogItem[] = [
  {
    id: 'space-typing',
    title: 'Chiến Binh Bàn Phím Vũ Trụ',
    subtitle: 'Luyện gõ 10 ngón · Phản xạ từ khóa Tin học',
    subjectId: 'go',
    accentHex: '#38BDF8',
    secondaryHex: '#F59E0B',
    objective: 'Gõ chính xác các chữ cái và thuật ngữ Tin học trên thiên thạch để bắn tia Laser bảo vệ Trạm Vũ Trụ.',
    controlsHint: 'Gõ phím chữ Bắn tia Laser · Mũi tên Trái/Phải Di chuyển · Space Sóng xung kích · Esc Tạm dừng'
  },
  {
    id: 'cyber-shield',
    title: 'Lá Chắn An Toàn Mạng',
    subtitle: 'Công dân số · Thu thập dữ liệu sạch & Diệt Virus',
    subjectId: 'cdso',
    accentHex: '#10B981',
    secondaryHex: '#06B6D4',
    objective: 'Điều khiển Hiệp sĩ Mạng thu thập gói tin An toàn (màu xanh) và bắn hạ Virus/Link lừa đảo (màu đỏ có tia cảnh báo).',
    controlsHint: 'WASD / Phím mũi tên Di chuyển · Space / Nhấp chuột Bắn xung nhịp · Shift Lướt tốc hành · Esc Tạm dừng'
  },
  {
    id: 'robo-maze',
    title: 'Mê Cung Thuật Toán Robot',
    subtitle: 'Tư duy Thuật toán · Giải mã cổng Logic & Săn Sao',
    subjectId: 'thuat-toan',
    accentHex: '#A855F7',
    secondaryHex: '#F43F5E',
    objective: 'Điều khiển Robot vượt qua các Bọ Lỗi tuần tra, kích hoạt Xung Logic mở cổng từ trường và thu thập đủ Sao Năng Lượng.',
    controlsHint: 'WASD / Phím mũi tên Di chuyển · Space Phát xung Logic làm choáng Bọ Lỗi · Esc Tạm dừng'
  }
];

// Grade-specific typing words (no accents for fast primary school keyboard practice + core informatics terms)
const TYPING_WORDS_BY_GRADE: Record<3 | 4 | 5, string[]> = {
  3: [
    'A', 'S', 'D', 'F', 'J', 'K', 'L', 'CHUOT', 'PHIM', 'MANHINH',
    'LOA', 'THUMUC', 'TEPTIN', 'MAYtinh', 'ANHKHUNG', 'VE', 'LUU', 'MO'
  ].map(w => w.toUpperCase()),
  4: [
    'WORD', 'INTERNET', 'TIMKIEM', 'BANQUYEN', 'THONGTIN', 'VANBAN',
    'TRINHCHIEU', 'SLIDE', 'FONTCHU', 'CANLE', 'CHENANH', 'ANTOAN', 'MATKHAU'
  ],
  5: [
    'THUATTOAN', 'VONGLAP', 'DIEUKIEN', 'RENHANH', 'BIENSO', 'EXCEL',
    'CONGTHUC', 'SCRATCH', 'LAPTRINH', 'CONGDANSO', 'TRITUENHANTAO', 'DAMMAY'
  ]
};

const SAFE_PACKETS = [
  'Mật khẩu mạnh',
  'Hỏi ý kiến bố mẹ',
  'Phần mềm bản quyền',
  'Không chia sẻ PIN',
  'Kiểm tra nguồn tin',
  'Sao lưu dữ liệu',
  'Tôn trọng bạn bè',
  'Cài phần mềm diệt Virus'
];

const HAZARD_THREATS = [
  'Link Lừa Đảo!',
  'Virus Trojan!',
  'Khoe mật khẩu!',
  'Tải tệp lạ .exe!',
  'Tin giả mạo!',
  'Spam trúng thưởng!'
];

interface Particle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

interface FloatingText {
  x: number;
  y: number;
  vy: number;
  text: string;
  color: string;
  life: number;
  maxLife: number;
}

interface LaserBeam {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  life: number;
  maxLife: number;
}

interface SpaceEnemy {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  word: string;
  typedIndex: number;
  radius: number;
  kind: 'scout' | 'cruiser' | 'boss';
  hp: number;
  maxHp: number;
  windupTimer: number;
  isDashing: boolean;
  flashTimer: number;
  angle: number;
}

interface CyberEntity {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  kind: 'safe' | 'hazard' | 'charger';
  hp: number;
  windupTimer: number;
  targetX: number;
  targetY: number;
  flashTimer: number;
  pulsePhase: number;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
}

interface MazeCrystal {
  x: number;
  y: number;
  collected: boolean;
  bitValue: '0' | '1';
  pulse: number;
}

interface MazeBug {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  stunTimer: number;
  windupTimer: number;
  isCharging: boolean;
  label: string;
}

interface MazeWall {
  x: number;
  y: number;
  w: number;
  h: number;
  isGate?: boolean;
  gateOpen?: boolean;
}

export const ArcadeGameCenter: React.FC<ArcadeGameCenterProps> = ({
  initialGameId = 'space-typing',
  studentName = 'Học sinh',
  classCode = 'Tự do',
  defaultGrade = 3,
  onExit,
  onGameComplete
}) => {
  const [selectedGameId, setSelectedGameId] = useState<ArcadeGameId>(initialGameId);
  const [selectedGrade, setSelectedGrade] = useState<3 | 4 | 5>(defaultGrade);
  const [shellState, setShellState] = useState<GameShellState>('TITLE_SCREEN');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Low-frequency HUD integers (only updated when changed)
  const [hudScore, setHudScore] = useState<number>(0);
  const [hudHealth, setHudHealth] = useState<number>(100);
  const [hudWave, setHudWave] = useState<number>(1);
  const [hudCombo, setHudCombo] = useState<number>(0);
  const [hudEnergy, setHudEnergy] = useState<number>(100);
  const [hudAccuracy, setHudAccuracy] = useState<number>(100);
  const [hudBannerText, setHudBannerText] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isMutedRef = useRef<boolean>(false);
  const shellStateRef = useRef<GameShellState>('TITLE_SCREEN');
  const selectedGameRef = useRef<ArcadeGameId>(initialGameId);
  const selectedGradeRef = useRef<3 | 4 | 5>(defaultGrade);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    shellStateRef.current = shellState;
  }, [shellState]);

  useEffect(() => {
    selectedGameRef.current = selectedGameId;
  }, [selectedGameId]);

  useEffect(() => {
    selectedGradeRef.current = selectedGrade;
  }, [selectedGrade]);

  // Procedural Web Audio API Synthesizer for crisp arcade game feel
  const playSynth = useCallback(
    (type: 'laser' | 'hit' | 'pickup' | 'explosion' | 'emp' | 'hurt' | 'victory' | 'gameover') => {
      if (isMutedRef.current) return;
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'laser') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(760, now);
          osc.frequency.exponentialRampToValueAtTime(220, now + 0.09);
          gain.gain.setValueAtTime(0.14, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
          osc.start(now);
          osc.stop(now + 0.09);
        } else if (type === 'hit') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(520, now);
          osc.frequency.exponentialRampToValueAtTime(880, now + 0.07);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
          osc.start(now);
          osc.stop(now + 0.07);
        } else if (type === 'pickup') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, now);
          osc.frequency.setValueAtTime(880, now + 0.06);
          gain.gain.setValueAtTime(0.16, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
          osc.start(now);
          osc.stop(now + 0.16);
        } else if (type === 'explosion') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(38, now + 0.24);
          gain.gain.setValueAtTime(0.22, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
          osc.start(now);
          osc.stop(now + 0.24);
        } else if (type === 'emp') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(240, now);
          osc.frequency.exponentialRampToValueAtTime(960, now + 0.28);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc.start(now);
          osc.stop(now + 0.28);
        } else if (type === 'hurt') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(190, now);
          osc.frequency.linearRampToValueAtTime(95, now + 0.18);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.start(now);
          osc.stop(now + 0.18);
        } else if (type === 'victory') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(523.25, now);
          osc.frequency.setValueAtTime(659.25, now + 0.1);
          osc.frequency.setValueAtTime(783.99, now + 0.2);
          osc.frequency.setValueAtTime(1046.5, now + 0.32);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
          osc.start(now);
          osc.stop(now + 0.55);
        } else if (type === 'gameover') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.linearRampToValueAtTime(120, now + 0.4);
          gain.gain.setValueAtTime(0.18, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.start(now);
          osc.stop(now + 0.4);
        }
      } catch {
        // Ignore audio context restrictions
      }
    },
    []
  );

  // Mutable simulation state isolated from React re-renders
  const simRef = useRef({
    width: 1280,
    height: 720,
    time: 0,
    playStartTime: 0,
    hitstopTimer: 0,
    shakeMagnitude: 0,
    score: 0,
    health: 100,
    wave: 1,
    maxWaves: 3,
    combo: 0,
    energy: 100,
    totalActions: 0,
    successfulActions: 0,

    // Player state
    playerX: 640,
    playerY: 600,
    playerVx: 0,
    playerVy: 0,
    playerAngle: -Math.PI / 2,
    playerScaleX: 1,
    playerScaleY: 1,
    playerFlash: 0,
    dashTimer: 0,
    dashCooldown: 0,
    dashBufferTimer: 0,

    // Input state: continuous held vs edge-triggered justPressed
    heldKeys: new Set<string>(),
    pointerX: 640,
    pointerY: 360,
    pointerDown: false,
    justPressedSpace: false,
    justPressedShift: false,
    typedCharsQueue: [] as string[],

    // Pooled particles (160 slots)
    particles: Array.from({ length: 160 }, (): Particle => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: 3,
      color: '#38BDF8',
      alpha: 1,
      life: 0,
      maxLife: 0.5
    })),
    particleCursor: 0,
    floatingTexts: [] as FloatingText[],
    lasers: [] as LaserBeam[],
    stars: Array.from({ length: 90 }, () => ({
      x: Math.random() * 1600,
      y: Math.random() * 1000,
      size: 1 + Math.random() * 2.2,
      speed: 14 + Math.random() * 36,
      alpha: 0.35 + Math.random() * 0.65
    })),

    // Game 1: Space Typing state
    spaceEnemies: [] as SpaceEnemy[],
    lockedEnemyId: null as number | null,
    spawnTimer: 0,
    enemiesSpawnedInWave: 0,
    enemiesDefeatedInWave: 0,
    nextEntityId: 1,

    // Game 2: Cyber Shield state
    cyberEntities: [] as CyberEntity[],
    projectiles: [] as Projectile[],
    fireCooldown: 0,
    safeCollectedInWave: 0,

    // Game 3: Robo Maze state
    mazeCrystals: [] as MazeCrystal[],
    mazeBugs: [] as MazeBug[],
    mazeWalls: [] as MazeWall[],
    pulseWaveRadius: 0,
    pulseWaveActive: false
  });

  const spawnParticleBurst = useCallback((x: number, y: number, color: string, count = 18, speedScale = 1) => {
    const sim = simRef.current;
    for (let i = 0; i < count; i++) {
      const p = sim.particles[sim.particleCursor];
      sim.particleCursor = (sim.particleCursor + 1) % sim.particles.length;
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = (65 + Math.random() * 190) * speedScale;
      p.active = true;
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.size = 2.5 + Math.random() * 4.5;
      p.color = color;
      p.alpha = 1;
      p.life = 0;
      p.maxLife = 0.32 + Math.random() * 0.35;
    }
  }, []);

  const addFloatingText = useCallback((x: number, y: number, text: string, color: string) => {
    const sim = simRef.current;
    sim.floatingTexts.push({
      x,
      y,
      vy: -55,
      text,
      color,
      life: 0,
      maxLife: 0.85
    });
  }, []);

  const setupMazeWave = useCallback((wave: number, w: number, h: number) => {
    const sim = simRef.current;
    sim.playerX = w * 0.14;
    sim.playerY = h * 0.5;
    sim.playerVx = 0;
    sim.playerVy = 0;
    sim.pulseWaveActive = false;
    sim.pulseWaveRadius = 0;

    // Build responsive circuit arena walls & logic gates
    const cx = w * 0.5;
    const cy = h * 0.5;
    sim.mazeWalls = [
      { x: cx - 180, y: cy - 150, w: 22, h: 120 },
      { x: cx - 180, y: cy + 30, w: 22, h: 120 },
      { x: cx + 150, y: cy - 150, w: 22, h: 120 },
      { x: cx + 150, y: cy + 30, w: 22, h: 120 },
      { x: cx - 70, y: cy - 16, w: 140, h: 24, isGate: true, gateOpen: false }
    ];

    // Spawn 6 + wave*2 energy stars
    const totalStars = 5 + wave * 2;
    sim.mazeCrystals = [];
    for (let i = 0; i < totalStars; i++) {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const sx = w * 0.28 + col * (w * 0.22) + (Math.random() - 0.5) * 45;
      const sy = h * 0.22 + (row % 3) * (h * 0.26) + (Math.random() - 0.5) * 35;
      sim.mazeCrystals.push({
        x: Math.max(90, Math.min(w - 90, sx)),
        y: Math.max(100, Math.min(h - 90, sy)),
        collected: false,
        bitValue: i % 2 === 0 ? '1' : '0',
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Spawn patrol bug-bots
    const bugCount = 2 + wave;
    const bugNames = ['Bug Vòng Lặp', 'Lỗi Cú Pháp', 'Lỗi Biến Số', 'Lỗi Logic', 'Bug Đệ Quy'];
    sim.mazeBugs = [];
    for (let i = 0; i < bugCount; i++) {
      const angle = (Math.PI * 2 * i) / bugCount;
      const speed = 95 + wave * 22;
      sim.mazeBugs.push({
        x: Math.max(180, Math.min(w - 140, w * 0.4 + Math.cos(angle) * 220)),
        y: Math.max(120, Math.min(h - 120, h * 0.5 + Math.sin(angle) * 160)),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 22,
        stunTimer: 0,
        windupTimer: 0,
        isCharging: false,
        label: bugNames[i % bugNames.length]
      });
    }
  }, []);

  // Start or restart active game
  const startNewGame = useCallback(
    (gameId?: ArcadeGameId) => {
      const activeGame = gameId || selectedGameRef.current;
      if (gameId) {
        setSelectedGameId(gameId);
        selectedGameRef.current = gameId;
      }

      const sim = simRef.current;
      const w = sim.width || 1280;
      const h = sim.height || 720;

      sim.time = 0;
      sim.playStartTime = performance.now();
      sim.hitstopTimer = 0;
      sim.shakeMagnitude = 0;
      sim.score = 0;
      sim.health = 100;
      sim.wave = 1;
      sim.combo = 0;
      sim.energy = 100;
      sim.totalActions = 0;
      sim.successfulActions = 0;
      sim.heldKeys.clear();
      sim.typedCharsQueue = [];
      sim.justPressedSpace = false;
      sim.justPressedShift = false;
      sim.floatingTexts = [];
      sim.lasers = [];
      sim.spaceEnemies = [];
      sim.lockedEnemyId = null;
      sim.spawnTimer = 0.4;
      sim.enemiesSpawnedInWave = 0;
      sim.enemiesDefeatedInWave = 0;
      sim.cyberEntities = [];
      sim.projectiles = [];
      sim.safeCollectedInWave = 0;

      if (activeGame === 'space-typing') {
        sim.playerX = w * 0.5;
        sim.playerY = h - 78;
        setHudBannerText('Gõ các chữ cái trên thiên thạch để bắn tia Laser! Nhấn Space khi đầy năng lượng để kích hoạt Sóng Xung Kích!');
      } else if (activeGame === 'cyber-shield') {
        sim.playerX = w * 0.5;
        sim.playerY = h * 0.55;
        setHudBannerText('Thu thập Gói Tin An Toàn (Xanh) · Bắn hạ hoặc né Virus có vạch cảnh báo Đỏ!');
      } else {
        setupMazeWave(1, w, h);
        setHudBannerText('Thu thập đủ Sao Năng Lượng · Nhấn Space để phát xung Logic mở cổng và làm choáng Bọ Lỗi!');
      }

      setHudScore(0);
      setHudHealth(100);
      setHudWave(1);
      setHudCombo(0);
      setHudEnergy(100);
      setHudAccuracy(100);
      setShellState('PLAYING');
      shellStateRef.current = 'PLAYING';
      playSynth('pickup');
    },
    [playSynth, setupMazeWave]
  );

  const finishGameSession = useCallback(
    (finalState: 'VICTORY' | 'GAME_OVER') => {
      const sim = simRef.current;
      setShellState(finalState);
      shellStateRef.current = finalState;
      playSynth(finalState === 'VICTORY' ? 'victory' : 'gameover');

      const elapsedSec = Math.max(5, Math.round((performance.now() - sim.playStartTime) / 1000));
      const acc =
        sim.totalActions > 0
          ? Math.min(100, Math.max(40, Math.round((sim.successfulActions / sim.totalActions) * 100)))
          : 100;
      const normalizedScore = finalState === 'VICTORY'
        ? Math.min(100, Math.max(85, Math.round(sim.score / 12)))
        : Math.min(95, Math.max(50, Math.round(sim.score / 15)));

      setHudAccuracy(acc);

      if (onGameComplete) {
        const gameMeta = ARCADE_GAMES_CATALOG.find(g => g.id === selectedGameRef.current) || ARCADE_GAMES_CATALOG[0];
        onGameComplete(gameMeta.id, gameMeta.subjectId, normalizedScore, acc, elapsedSec);
      }
    },
    [onGameComplete, playSynth]
  );

  // Keyboard & Blur Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const sim = simRef.current;
      const state = shellStateRef.current;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (state === 'PLAYING') {
          setShellState('PAUSED');
          shellStateRef.current = 'PAUSED';
          sim.heldKeys.clear();
        } else if (state === 'PAUSED') {
          setShellState('PLAYING');
          shellStateRef.current = 'PLAYING';
        }
        return;
      }

      if (state === 'TITLE_SCREEN') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startNewGame();
        }
        return;
      }

      if (state === 'VICTORY' || state === 'GAME_OVER') {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startNewGame();
        }
        return;
      }

      if (state !== 'PLAYING') return;

      if (!e.repeat) {
        if (e.code === 'Space') {
          e.preventDefault();
          sim.justPressedSpace = true;
        }
        if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
          sim.justPressedShift = true;
          sim.dashBufferTimer = 0.15;
        }
      }

      sim.heldKeys.add(e.code);

      // Edge-triggered character typing for Space Typing game
      if (selectedGameRef.current === 'space-typing' && e.key.length === 1 && /^[a-zA-Z0-9]$/.test(e.key)) {
        sim.typedCharsQueue.push(e.key.toUpperCase());
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      simRef.current.heldKeys.delete(e.code);
    };

    const handleBlur = () => {
      simRef.current.heldKeys.clear();
      simRef.current.pointerDown = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [startNewGame]);

  // Isolated 60fps Canvas Simulation & Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let lastTime = performance.now();

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      simRef.current.width = w;
      simRef.current.height = h;
      if (selectedGameRef.current === 'space-typing') {
        simRef.current.playerY = h - 78;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const stepSimulation = (dt: number) => {
      const sim = simRef.current;
      const w = sim.width;
      const h = sim.height;
      sim.time += dt;

      // Always drift background stars for atmospheric title screen & active play
      for (let i = 0; i < sim.stars.length; i++) {
        const st = sim.stars[i];
        st.y += st.speed * dt;
        if (st.y > h) {
          st.y = -5;
          st.x = Math.random() * w;
        }
      }

      if (shellStateRef.current !== 'PLAYING') {
        return;
      }

      // Hitstop freeze for heavy impact feel (30-80ms)
      if (sim.hitstopTimer > 0) {
        sim.hitstopTimer = Math.max(0, sim.hitstopTimer - dt);
        return;
      }

      // Decaying camera shake
      if (sim.shakeMagnitude > 0) {
        sim.shakeMagnitude = Math.max(0, sim.shakeMagnitude - dt * 28);
      }

      // Squash & stretch recovery
      sim.playerScaleX += (1 - sim.playerScaleX) * Math.min(1, dt * 14);
      sim.playerScaleY += (1 - sim.playerScaleY) * Math.min(1, dt * 14);
      if (sim.playerFlash > 0) sim.playerFlash = Math.max(0, sim.playerFlash - dt);

      // Update pooled particles
      for (let i = 0; i < sim.particles.length; i++) {
        const p = sim.particles[i];
        if (!p.active) continue;
        p.life += dt;
        if (p.life >= p.maxLife) {
          p.active = false;
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha = 1 - p.life / p.maxLife;
      }

      // Update floating texts
      for (let i = sim.floatingTexts.length - 1; i >= 0; i--) {
        const ft = sim.floatingTexts[i];
        ft.life += dt;
        ft.y += ft.vy * dt;
        if (ft.life >= ft.maxLife) {
          sim.floatingTexts.splice(i, 1);
        }
      }

      // Update laser beams
      for (let i = sim.lasers.length - 1; i >= 0; i--) {
        const l = sim.lasers[i];
        l.life += dt;
        if (l.life >= l.maxLife) {
          sim.lasers.splice(i, 1);
        }
      }

      const activeGame = selectedGameRef.current;
      const grade = selectedGradeRef.current;

      // ========================================================================
      // GAME 1: SPACE TYPING DEFENDER
      // ========================================================================
      if (activeGame === 'space-typing') {
        const moveLeft = sim.heldKeys.has('ArrowLeft') || sim.heldKeys.has('KeyA');
        const moveRight = sim.heldKeys.has('ArrowRight') || sim.heldKeys.has('KeyD');
        const shipSpeed = 380;
        if (moveLeft) sim.playerX -= shipSpeed * dt;
        if (moveRight) sim.playerX += shipSpeed * dt;
        sim.playerX = Math.max(70, Math.min(w - 70, sim.playerX));
        sim.playerY = h - 78;

        // Recharge EMP energy slowly
        sim.energy = Math.min(100, sim.energy + dt * 6);

        // Space EMP Shockwave when energy >= 50
        if (sim.justPressedSpace) {
          sim.justPressedSpace = false;
          if (sim.energy >= 50 && sim.spaceEnemies.length > 0) {
            sim.energy = Math.max(0, sim.energy - 50);
            sim.hitstopTimer = 0.055;
            sim.shakeMagnitude = 11;
            sim.playerScaleX = 1.32;
            sim.playerScaleY = 0.72;
            playSynth('emp');
            addFloatingText(sim.playerX, sim.playerY - 40, 'SÓNG XUNG KÍCH EMP!', '#38BDF8');

            // Damage all active enemies on screen
            for (let i = sim.spaceEnemies.length - 1; i >= 0; i--) {
              const en = sim.spaceEnemies[i];
              en.flashTimer = 0.18;
              spawnParticleBurst(en.x, en.y, '#38BDF8', 12, 0.9);
              if (en.kind !== 'boss') {
                sim.score += 30;
                sim.enemiesDefeatedInWave += 1;
                if (sim.lockedEnemyId === en.id) sim.lockedEnemyId = null;
                sim.spaceEnemies.splice(i, 1);
              } else {
                en.typedIndex = Math.min(en.word.length - 1, en.typedIndex + 2);
              }
            }
          }
        }

        // Process typed characters queue
        while (sim.typedCharsQueue.length > 0) {
          const ch = sim.typedCharsQueue.shift()!;
          sim.totalActions += 1;

          let target: SpaceEnemy | undefined;
          if (sim.lockedEnemyId !== null) {
            target = sim.spaceEnemies.find(e => e.id === sim.lockedEnemyId);
            if (!target) sim.lockedEnemyId = null;
          }

          if (!target) {
            // Find lowest enemy whose next needed character matches `ch`
            const candidates = sim.spaceEnemies
              .filter(e => e.word[e.typedIndex] === ch)
              .sort((a, b) => b.y - a.y);
            if (candidates.length > 0) {
              target = candidates[0];
              sim.lockedEnemyId = target.id;
            }
          }

          if (target && target.word[target.typedIndex] === ch) {
            sim.successfulActions += 1;
            target.typedIndex += 1;
            target.flashTimer = 0.12;
            sim.combo += 1;
            sim.energy = Math.min(100, sim.energy + 4);
            sim.playerScaleX = 1.18;
            sim.playerScaleY = 0.84;

            // Gently slide ship toward target X for dynamic feel
            sim.playerX += (target.x - sim.playerX) * 0.18;

            sim.lasers.push({
              x1: sim.playerX,
              y1: sim.playerY - 22,
              x2: target.x,
              y2: target.y,
              color: target.kind === 'boss' ? '#F59E0B' : '#38BDF8',
              life: 0,
              maxLife: 0.14
            });

            if (target.typedIndex >= target.word.length) {
              // Enemy destroyed!
              const pts = (target.word.length * 15 + sim.combo * 5) * (target.kind === 'boss' ? 3 : 1);
              sim.score += pts;
              sim.enemiesDefeatedInWave += 1;
              sim.lockedEnemyId = null;
              sim.hitstopTimer = target.kind === 'boss' ? 0.065 : 0.035;
              sim.shakeMagnitude = target.kind === 'boss' ? 12 : 5;
              spawnParticleBurst(
                target.x,
                target.y,
                target.kind === 'boss' ? '#F59E0B' : '#38BDF8',
                target.kind === 'boss' ? 28 : 16,
                target.kind === 'boss' ? 1.3 : 1
              );
              addFloatingText(target.x, target.y, `+${pts} · ${target.word}`, '#38BDF8');
              playSynth('explosion');
              const idx = sim.spaceEnemies.findIndex(e => e.id === target!.id);
              if (idx >= 0) sim.spaceEnemies.splice(idx, 1);
            } else {
              spawnParticleBurst(target.x, target.y, '#38BDF8', 6, 0.5);
              playSynth('laser');
            }
          } else {
            // Miss key
            sim.combo = 0;
            sim.shakeMagnitude = 3;
            playSynth('hurt');
          }
        }

        // Spawn enemies for current wave
        const quotaForWave = 5 + sim.wave * 3;
        sim.spawnTimer -= dt;
        if (sim.spawnTimer <= 0 && sim.enemiesSpawnedInWave < quotaForWave) {
          const wordPool = TYPING_WORDS_BY_GRADE[grade];
          const word = wordPool[Math.floor(Math.random() * wordPool.length)];
          const isBoss = sim.enemiesSpawnedInWave === quotaForWave - 1;
          const isCruiser = !isBoss && sim.enemiesSpawnedInWave % 3 === 2;
          const kind: SpaceEnemy['kind'] = isBoss ? 'boss' : isCruiser ? 'cruiser' : 'scout';
          const baseSpeed = (34 + sim.wave * 9 + (grade - 3) * 7) * (isBoss ? 0.65 : isCruiser ? 0.85 : 1);

          sim.spaceEnemies.push({
            id: sim.nextEntityId++,
            x: 110 + Math.random() * Math.max(200, w - 220),
            y: -40,
            vx: (Math.random() - 0.5) * 24,
            vy: baseSpeed,
            word,
            typedIndex: 0,
            radius: isBoss ? 42 : isCruiser ? 30 : 24,
            kind,
            hp: word.length,
            maxHp: word.length,
            windupTimer: isCruiser ? 2.4 : 0,
            isDashing: false,
            flashTimer: 0,
            angle: 0
          });
          sim.enemiesSpawnedInWave += 1;
          sim.spawnTimer = Math.max(1.1, 2.3 - sim.wave * 0.25);
        }

        // Update enemies
        for (let i = sim.spaceEnemies.length - 1; i >= 0; i--) {
          const en = sim.spaceEnemies[i];
          if (en.flashTimer > 0) en.flashTimer = Math.max(0, en.flashTimer - dt);
          en.angle += dt * 1.2;

          // Cruiser telegraph & dash boost
          if (en.kind === 'cruiser' && !en.isDashing && en.y > h * 0.22) {
            en.windupTimer -= dt;
            if (en.windupTimer <= 0) {
              en.isDashing = true;
              en.vy *= 1.65;
            }
          }

          en.x += en.vx * dt;
          en.y += en.vy * dt;
          if (en.x < 80 || en.x > w - 80) en.vx *= -1;

          // Reached station defense line
          if (en.y >= h - 90) {
            sim.health = Math.max(0, sim.health - (en.kind === 'boss' ? 30 : 18));
            sim.combo = 0;
            sim.shakeMagnitude = 10;
            sim.hitstopTimer = 0.045;
            spawnParticleBurst(en.x, h - 85, '#F43F5E', 18, 1);
            addFloatingText(en.x, h - 105, '-18 GIÁP TRẠM!', '#F43F5E');
            playSynth('hurt');
            if (sim.lockedEnemyId === en.id) sim.lockedEnemyId = null;
            sim.spaceEnemies.splice(i, 1);

            if (sim.health <= 0) {
              finishGameSession('GAME_OVER');
              return;
            }
          }
        }

        // Check wave completion
        if (sim.enemiesSpawnedInWave >= quotaForWave && sim.spaceEnemies.length === 0) {
          if (sim.wave < sim.maxWaves) {
            sim.wave += 1;
            sim.enemiesSpawnedInWave = 0;
            sim.enemiesDefeatedInWave = 0;
            sim.spawnTimer = 1.0;
            sim.score += 150;
            addFloatingText(w * 0.5, h * 0.4, `ĐỢT ${sim.wave} BẮT ĐẦU! +150 ĐIỂM`, '#F59E0B');
            playSynth('pickup');
          } else {
            sim.score += 300;
            finishGameSession('VICTORY');
            return;
          }
        }
      }

      // ========================================================================
      // GAME 2: CYBER SHIELD (AN TOÀN MẠNG)
      // ========================================================================
      else if (activeGame === 'cyber-shield') {
        const up = sim.heldKeys.has('ArrowUp') || sim.heldKeys.has('KeyW');
        const down = sim.heldKeys.has('ArrowDown') || sim.heldKeys.has('KeyS');
        const left = sim.heldKeys.has('ArrowLeft') || sim.heldKeys.has('KeyA');
        const right = sim.heldKeys.has('ArrowRight') || sim.heldKeys.has('KeyD');

        let ix = (right ? 1 : 0) - (left ? 1 : 0);
        let iy = (down ? 1 : 0) - (up ? 1 : 0);
        const len = Math.hypot(ix, iy);
        if (len > 0) {
          ix /= len;
          iy /= len;
          sim.playerAngle = Math.atan2(iy, ix);
        } else {
          // Aim toward pointer
          sim.playerAngle = Math.atan2(sim.pointerY - sim.playerY, sim.pointerX - sim.playerX);
        }

        // Dash buffering & cooldown
        if (sim.dashCooldown > 0) sim.dashCooldown = Math.max(0, sim.dashCooldown - dt);
        if (sim.dashBufferTimer > 0) sim.dashBufferTimer = Math.max(0, sim.dashBufferTimer - dt);

        if ((sim.justPressedShift || sim.dashBufferTimer > 0) && sim.dashCooldown <= 0) {
          sim.justPressedShift = false;
          sim.dashBufferTimer = 0;
          sim.dashTimer = 0.18;
          sim.dashCooldown = 1.1;
          sim.playerScaleX = 1.35;
          sim.playerScaleY = 0.72;
          spawnParticleBurst(sim.playerX, sim.playerY, '#06B6D4', 12, 0.8);
          playSynth('emp');
        }

        const moveSpeed = sim.dashTimer > 0 ? 640 : 295;
        if (sim.dashTimer > 0) {
          sim.dashTimer = Math.max(0, sim.dashTimer - dt);
          sim.playerX += Math.cos(sim.playerAngle) * moveSpeed * dt;
          sim.playerY += Math.sin(sim.playerAngle) * moveSpeed * dt;
        } else {
          sim.playerX += ix * moveSpeed * dt;
          sim.playerY += iy * moveSpeed * dt;
        }

        sim.playerX = Math.max(60, Math.min(w - 60, sim.playerX));
        sim.playerY = Math.max(85, Math.min(h - 65, sim.playerY));

        // Fire data pulse projectile with Space or Pointer click
        if (sim.fireCooldown > 0) sim.fireCooldown = Math.max(0, sim.fireCooldown - dt);
        if ((sim.justPressedSpace || sim.pointerDown) && sim.fireCooldown <= 0) {
          sim.justPressedSpace = false;
          sim.fireCooldown = 0.22;
          sim.totalActions += 1;
          const pSpeed = 680;
          sim.projectiles.push({
            x: sim.playerX + Math.cos(sim.playerAngle) * 26,
            y: sim.playerY + Math.sin(sim.playerAngle) * 26,
            vx: Math.cos(sim.playerAngle) * pSpeed,
            vy: Math.sin(sim.playerAngle) * pSpeed,
            radius: 7,
            color: '#38BDF8',
            life: 1.2
          });
          sim.playerScaleX = 1.22;
          sim.playerScaleY = 0.82;
          playSynth('laser');
        }

        // Update projectiles
        for (let i = sim.projectiles.length - 1; i >= 0; i--) {
          const pr = sim.projectiles[i];
          pr.x += pr.vx * dt;
          pr.y += pr.vy * dt;
          pr.life -= dt;
          if (pr.life <= 0 || pr.x < 0 || pr.x > w || pr.y < 0 || pr.y > h) {
            sim.projectiles.splice(i, 1);
          }
        }

        // Spawn safe packets & virus threats
        sim.spawnTimer -= dt;
        if (sim.spawnTimer <= 0 && sim.cyberEntities.length < 7 + sim.wave * 2) {
          const isSafe = Math.random() < 0.48;
          const edge = Math.floor(Math.random() * 4);
          let sx = Math.random() * (w - 160) + 80;
          let sy = Math.random() * (h - 180) + 90;
          if (edge === 0) sy = 85;
          else if (edge === 1) sy = h - 70;
          else if (edge === 2) sx = 70;
          else sx = w - 70;

          // Keep away from immediate player position
          if (Math.hypot(sx - sim.playerX, sy - sim.playerY) < 160) {
            sx = (sx + 260) % (w - 140) + 70;
          }

          const angleToCenter = Math.atan2(h * 0.5 - sy, w * 0.5 - sx) + (Math.random() - 0.5) * 0.7;
          const speed = isSafe ? 65 + sim.wave * 12 : 85 + sim.wave * 18;
          const kind: CyberEntity['kind'] = isSafe ? 'safe' : Math.random() < 0.45 ? 'charger' : 'hazard';

          sim.cyberEntities.push({
            id: sim.nextEntityId++,
            x: sx,
            y: sy,
            vx: Math.cos(angleToCenter) * speed,
            vy: Math.sin(angleToCenter) * speed,
            radius: isSafe ? 26 : 28,
            label: isSafe
              ? SAFE_PACKETS[Math.floor(Math.random() * SAFE_PACKETS.length)]
              : HAZARD_THREATS[Math.floor(Math.random() * HAZARD_THREATS.length)],
            kind,
            hp: kind === 'charger' ? 2 : 1,
            windupTimer: kind === 'charger' ? 1.1 : 0,
            targetX: sim.playerX,
            targetY: sim.playerY,
            flashTimer: 0,
            pulsePhase: Math.random() * Math.PI * 2
          });
          sim.spawnTimer = Math.max(0.75, 1.45 - sim.wave * 0.18);
        }

        // Update Cyber Entities
        for (let i = sim.cyberEntities.length - 1; i >= 0; i--) {
          const ent = sim.cyberEntities[i];
          ent.pulsePhase += dt * 4;
          if (ent.flashTimer > 0) ent.flashTimer = Math.max(0, ent.flashTimer - dt);

          if (ent.kind === 'charger') {
            if (ent.windupTimer > 0) {
              ent.windupTimer -= dt;
              ent.targetX = sim.playerX;
              ent.targetY = sim.playerY;
              if (ent.windupTimer <= 0) {
                const ang = Math.atan2(ent.targetY - ent.y, ent.targetX - ent.x);
                const lungeSpeed = 260 + sim.wave * 30;
                ent.vx = Math.cos(ang) * lungeSpeed;
                ent.vy = Math.sin(ang) * lungeSpeed;
              }
            }
          }

          if (ent.kind !== 'charger' || ent.windupTimer <= 0) {
            ent.x += ent.vx * dt;
            ent.y += ent.vy * dt;
          }

          if (ent.x < 55 || ent.x > w - 55) ent.vx *= -1;
          if (ent.y < 80 || ent.y > h - 60) ent.vy *= -1;

          // Check projectile collisions with hazards
          if (ent.kind !== 'safe') {
            let destroyed = false;
            for (let j = sim.projectiles.length - 1; j >= 0; j--) {
              const pr = sim.projectiles[j];
              if (Math.hypot(pr.x - ent.x, pr.y - ent.y) <= pr.radius + ent.radius) {
                sim.projectiles.splice(j, 1);
                sim.successfulActions += 1;
                ent.hp -= 1;
                ent.flashTimer = 0.14;
                if (ent.hp <= 0) {
                  sim.score += 45 + sim.combo * 5;
                  sim.combo += 1;
                  sim.safeCollectedInWave += 1;
                  sim.hitstopTimer = 0.045;
                  sim.shakeMagnitude = 7;
                  spawnParticleBurst(ent.x, ent.y, '#F43F5E', 18, 1);
                  addFloatingText(ent.x, ent.y, `ĐÃ DIỆT: ${ent.label}`, '#10B981');
                  playSynth('explosion');
                  sim.cyberEntities.splice(i, 1);
                  destroyed = true;
                } else {
                  playSynth('hit');
                }
                break;
              }
            }
            if (destroyed) continue;
          }

          // Check player collision
          const distToPlayer = Math.hypot(ent.x - sim.playerX, ent.y - sim.playerY);
          if (distToPlayer <= ent.radius + 24) {
            if (ent.kind === 'safe') {
              sim.score += 60 + sim.combo * 5;
              sim.combo += 1;
              sim.safeCollectedInWave += 1;
              sim.successfulActions += 1;
              sim.totalActions += 1;
              sim.energy = Math.min(100, sim.energy + 12);
              spawnParticleBurst(ent.x, ent.y, '#10B981', 16, 0.9);
              addFloatingText(ent.x, ent.y, `+60 · ${ent.label}`, '#10B981');
              playSynth('pickup');
              sim.cyberEntities.splice(i, 1);
            } else if (sim.dashTimer > 0) {
              // Firewall Dash parry destroys threat!
              sim.score += 80;
              sim.combo += 2;
              sim.safeCollectedInWave += 1;
              sim.hitstopTimer = 0.055;
              sim.shakeMagnitude = 9;
              spawnParticleBurst(ent.x, ent.y, '#06B6D4', 22, 1.1);
              addFloatingText(ent.x, ent.y, 'LÁ CHẮN TƯỜNG LỬA +80!', '#06B6D4');
              playSynth('explosion');
              sim.cyberEntities.splice(i, 1);
            } else {
              sim.health = Math.max(0, sim.health - 20);
              sim.combo = 0;
              sim.playerFlash = 0.25;
              sim.hitstopTimer = 0.05;
              sim.shakeMagnitude = 11;
              spawnParticleBurst(sim.playerX, sim.playerY, '#F43F5E', 18, 1);
              addFloatingText(sim.playerX, sim.playerY - 25, `CẢNH BÁO: ${ent.label}`, '#F43F5E');
              playSynth('hurt');
              sim.cyberEntities.splice(i, 1);
              if (sim.health <= 0) {
                finishGameSession('GAME_OVER');
                return;
              }
            }
          }
        }

        // Wave progression for Cyber Shield
        const waveGoal = 6 + sim.wave * 3;
        if (sim.safeCollectedInWave >= waveGoal) {
          if (sim.wave < sim.maxWaves) {
            sim.wave += 1;
            sim.safeCollectedInWave = 0;
            sim.score += 150;
            addFloatingText(w * 0.5, h * 0.35, `CẤP ĐỘ BẢO MẬT ${sim.wave}! +150 ĐIỂM`, '#10B981');
            playSynth('pickup');
          } else {
            sim.score += 300;
            finishGameSession('VICTORY');
            return;
          }
        }
      }

      // ========================================================================
      // GAME 3: ROBO-CODE MAZE RUNNER (MÊ CUNG THUẬT TOÁN)
      // ========================================================================
      else if (activeGame === 'robo-maze') {
        const up = sim.heldKeys.has('ArrowUp') || sim.heldKeys.has('KeyW');
        const down = sim.heldKeys.has('ArrowDown') || sim.heldKeys.has('KeyS');
        const left = sim.heldKeys.has('ArrowLeft') || sim.heldKeys.has('KeyA');
        const right = sim.heldKeys.has('ArrowRight') || sim.heldKeys.has('KeyD');

        let ix = (right ? 1 : 0) - (left ? 1 : 0);
        let iy = (down ? 1 : 0) - (up ? 1 : 0);
        const len = Math.hypot(ix, iy);
        if (len > 0) {
          ix /= len;
          iy /= len;
          sim.playerAngle = Math.atan2(iy, ix);
        }

        const roboSpeed = 285;
        const nextX = Math.max(60, Math.min(w - 60, sim.playerX + ix * roboSpeed * dt));
        const nextY = Math.max(85, Math.min(h - 65, sim.playerY + iy * roboSpeed * dt));

        // Check wall collisions
        let blockedX = false;
        let blockedY = false;
        for (const wall of sim.mazeWalls) {
          if (wall.isGate && wall.gateOpen) continue;
          const r = 20;
          if (
            nextX + r > wall.x &&
            nextX - r < wall.x + wall.w &&
            sim.playerY + r > wall.y &&
            sim.playerY - r < wall.y + wall.h
          ) {
            blockedX = true;
          }
          if (
            sim.playerX + r > wall.x &&
            sim.playerX - r < wall.x + wall.w &&
            nextY + r > wall.y &&
            nextY - r < wall.y + wall.h
          ) {
            blockedY = true;
          }
        }

        if (!blockedX) sim.playerX = nextX;
        if (!blockedY) sim.playerY = nextY;

        sim.energy = Math.min(100, sim.energy + dt * 18);

        // Space triggers Logic Pulse: toggles gates & stuns nearby bug-bots
        if (sim.justPressedSpace) {
          sim.justPressedSpace = false;
          if (sim.energy >= 35) {
            sim.energy -= 35;
            sim.pulseWaveActive = true;
            sim.pulseWaveRadius = 20;
            sim.playerScaleX = 1.3;
            sim.playerScaleY = 0.75;
            sim.totalActions += 1;
            sim.successfulActions += 1;
            playSynth('emp');

            for (const wall of sim.mazeWalls) {
              if (wall.isGate) wall.gateOpen = !wall.gateOpen;
            }
            for (const bug of sim.mazeBugs) {
              if (Math.hypot(bug.x - sim.playerX, bug.y - sim.playerY) <= 230) {
                bug.stunTimer = 2.6;
                sim.score += 35;
                spawnParticleBurst(bug.x, bug.y, '#A855F7', 14, 0.9);
                addFloatingText(bug.x, bug.y - 20, 'ĐÓNG BĂNG BUG! +35', '#A855F7');
              }
            }
          }
        }

        if (sim.pulseWaveActive) {
          sim.pulseWaveRadius += dt * 520;
          if (sim.pulseWaveRadius > 240) {
            sim.pulseWaveActive = false;
          }
        }

        // Collect Energy Stars
        let remainingCrystals = 0;
        for (const cr of sim.mazeCrystals) {
          if (cr.collected) continue;
          remainingCrystals += 1;
          cr.pulse += dt * 4;
          if (Math.hypot(cr.x - sim.playerX, cr.y - sim.playerY) <= 36) {
            cr.collected = true;
            remainingCrystals -= 1;
            sim.score += 75 + sim.combo * 10;
            sim.combo += 1;
            sim.totalActions += 1;
            sim.successfulActions += 1;
            spawnParticleBurst(cr.x, cr.y, '#F59E0B', 18, 1);
            addFloatingText(cr.x, cr.y, `BIT ${cr.bitValue} · +75 ĐIỂM`, '#F59E0B');
            playSynth('pickup');
          }
        }

        // Update Bug-Bots
        for (const bug of sim.mazeBugs) {
          if (bug.stunTimer > 0) {
            bug.stunTimer = Math.max(0, bug.stunTimer - dt);
            continue;
          }

          const dist = Math.hypot( sim.playerX - bug.x, sim.playerY - bug.y );
          if (dist < 210 && !bug.isCharging) {
            bug.windupTimer += dt;
            if (bug.windupTimer >= 0.65) {
              bug.isCharging = true;
              const ang = Math.atan2(sim.playerY - bug.y, sim.playerX - bug.x);
              const spd = 210 + sim.wave * 25;
              bug.vx = Math.cos(ang) * spd;
              bug.vy = Math.sin(ang) * spd;
            }
          } else if (dist >= 240) {
            bug.windupTimer = 0;
            bug.isCharging = false;
          }

          bug.x += bug.vx * dt;
          bug.y += bug.vy * dt;

          if (bug.x < 70 || bug.x > w - 70) bug.vx *= -1;
          if (bug.y < 90 || bug.y > h - 70) bug.vy *= -1;

          if (dist <= bug.radius + 20) {
            sim.health = Math.max(0, sim.health - 20);
            sim.combo = 0;
            bug.stunTimer = 1.4;
            sim.hitstopTimer = 0.05;
            sim.shakeMagnitude = 10;
            spawnParticleBurst(sim.playerX, sim.playerY, '#F43F5E', 18, 1);
            addFloatingText(sim.playerX, sim.playerY - 25, `VA CHẠM ${bug.label}!`, '#F43F5E');
            playSynth('hurt');
            if (sim.health <= 0) {
              finishGameSession('GAME_OVER');
              return;
            }
          }
        }

        if (remainingCrystals === 0) {
          if (sim.wave < sim.maxWaves) {
            sim.wave += 1;
            sim.score += 180;
            setupMazeWave(sim.wave, w, h);
            addFloatingText(w * 0.5, h * 0.35, `MÊ CUNG CẤP ${sim.wave}! +180 ĐIỂM`, '#A855F7');
            playSynth('pickup');
          } else {
            sim.score += 350;
            finishGameSession('VICTORY');
            return;
          }
        }
      }

      // Sync integer HUD values without causing 60fps React re-renders
      const nextScore = Math.round(sim.score);
      const nextHealth = Math.round(sim.health);
      const nextWave = sim.wave;
      const nextCombo = sim.combo;
      const nextEnergy = Math.round(sim.energy);

      setHudScore(prev => (prev !== nextScore ? nextScore : prev));
      setHudHealth(prev => (prev !== nextHealth ? nextHealth : prev));
      setHudWave(prev => (prev !== nextWave ? nextWave : prev));
      setHudCombo(prev => (prev !== nextCombo ? nextCombo : prev));
      setHudEnergy(prev => (prev !== nextEnergy ? nextEnergy : prev));
    };

    const renderScene = () => {
      const sim = simRef.current;
      const w = sim.width;
      const h = sim.height;
      const activeGame = selectedGameRef.current;

      ctx.save();

      // Apply decaying camera shake
      if (sim.shakeMagnitude > 0.2 && shellStateRef.current === 'PLAYING') {
        const dx = (Math.random() - 0.5) * sim.shakeMagnitude * 2;
        const dy = (Math.random() - 0.5) * sim.shakeMagnitude * 2;
        ctx.translate(dx, dy);
      }

      // 1. Deep space / cyber circuit backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (activeGame === 'space-typing') {
        bgGrad.addColorStop(0, '#050814');
        bgGrad.addColorStop(0.55, '#0B132B');
        bgGrad.addColorStop(1, '#111C38');
      } else if (activeGame === 'cyber-shield') {
        bgGrad.addColorStop(0, '#041318');
        bgGrad.addColorStop(0.55, '#072227');
        bgGrad.addColorStop(1, '#0A2E36');
      } else {
        bgGrad.addColorStop(0, '#0E0720');
        bgGrad.addColorStop(0.55, '#190E36');
        bgGrad.addColorStop(1, '#24144A');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle perspective grid
      ctx.strokeStyle =
        activeGame === 'space-typing'
          ? 'rgba(56, 189, 248, 0.07)'
          : activeGame === 'cyber-shield'
          ? 'rgba(16, 185, 129, 0.08)'
          : 'rgba(168, 85, 247, 0.08)';
      ctx.lineWidth = 1;
      const gridStep = 64;
      const offsetY = (sim.time * 22) % gridStep;
      for (let x = 0; x < w; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = offsetY; y < h; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Twinkling stars
      for (let i = 0; i < sim.stars.length; i++) {
        const st = sim.stars[i];
        ctx.fillStyle = `rgba(226, 232, 240, ${st.alpha})`;
        ctx.beginPath();
        ctx.arc(st.x % w, st.y % h, st.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // If on Title Screen, draw an atmospheric live-world centerpiece preview
      if (shellStateRef.current === 'TITLE_SCREEN') {
        const cx = w * 0.5;
        const cy = h * 0.5;
        const orbitR = Math.min(w, h) * 0.34;
        for (let i = 0; i < 6; i++) {
          const ang = sim.time * 0.45 + (i * Math.PI) / 3;
          const ox = cx + Math.cos(ang) * orbitR;
          const oy = cy + Math.sin(ang) * (orbitR * 0.55);
          ctx.fillStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.25)' : 'rgba(245, 158, 11, 0.25)';
          ctx.beginPath();
          ctx.arc(ox, oy, 18, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        return;
      }

      // ======================================================================
      // RENDER GAME 1: SPACE TYPING DEFENDER
      // ======================================================================
      if (activeGame === 'space-typing') {
        // Defense line at bottom
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.moveTo(40, h - 85);
        ctx.lineTo(w - 40, h - 85);
        ctx.stroke();
        ctx.setLineDash([]);

        // Laser beams
        for (const l of sim.lasers) {
          const alpha = 1 - l.life / l.maxLife;
          ctx.strokeStyle = l.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.moveTo(l.x1, l.y1);
          ctx.lineTo(l.x2, l.y2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Enemies with word plates
        for (const en of sim.spaceEnemies) {
          const isLocked = sim.lockedEnemyId === en.id;

          // Cruiser windup telegraph ring
          if (en.kind === 'cruiser' && !en.isDashing && en.windupTimer > 0 && en.windupTimer < 1.0) {
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(en.x, en.y, en.radius + 8 + Math.sin(sim.time * 24) * 4, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Enemy body
          ctx.save();
          ctx.translate(en.x, en.y);
          ctx.rotate(en.angle);
          ctx.fillStyle =
            en.flashTimer > 0
              ? '#FFFFFF'
              : en.kind === 'boss'
              ? '#F59E0B'
              : en.kind === 'cruiser'
              ? '#A855F7'
              : '#38BDF8';
          ctx.beginPath();
          const sides = en.kind === 'boss' ? 8 : en.kind === 'cruiser' ? 6 : 5;
          for (let s = 0; s < sides; s++) {
            const a = (s * Math.PI * 2) / sides;
            const px = Math.cos(a) * en.radius;
            const py = Math.sin(a) * en.radius;
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
          ctx.lineWidth = isLocked ? 3 : 1.5;
          ctx.strokeStyle = isLocked ? '#FDE047' : '#E2E8F0';
          ctx.stroke();
          ctx.restore();

          // Word label above meteor
          const typedPart = en.word.slice(0, en.typedIndex);
          const untypedPart = en.word.slice(en.typedIndex);
          ctx.font = 'bold 16px "JetBrains Mono", monospace';
          const totalWidth = ctx.measureText(en.word).width;
          const boxW = totalWidth + 20;
          const boxH = 28;
          const bx = en.x - boxW / 2;
          const by = en.y - en.radius - 36;

          ctx.fillStyle = isLocked ? '#0F172A' : 'rgba(15, 23, 42, 0.92)';
          ctx.strokeStyle = isLocked ? '#F59E0B' : '#38BDF8';
          ctx.lineWidth = isLocked ? 2.5 : 1.5;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(bx, by, boxW, boxH, 8);
          } else {
            ctx.rect(bx, by, boxW, boxH);
          }
          ctx.fill();
          ctx.stroke();

          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          const textStartX = en.x - totalWidth / 2;
          if (typedPart) {
            ctx.fillStyle = '#10B981';
            ctx.fillText(typedPart, textStartX, by + boxH / 2);
          }
          const typedWidth = ctx.measureText(typedPart).width;
          ctx.fillStyle = '#F8FAFC';
          ctx.fillText(untypedPart, textStartX + typedWidth, by + boxH / 2);
        }

        // Player Starfighter
        ctx.save();
        ctx.translate(sim.playerX, sim.playerY);
        ctx.scale(sim.playerScaleX, sim.playerScaleY);
        ctx.fillStyle = '#38BDF8';
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(24, 20);
        ctx.lineTo(0, 10);
        ctx.lineTo(-24, 20);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#E0F2FE';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      // ======================================================================
      // RENDER GAME 2: CYBER SHIELD
      // ======================================================================
      else if (activeGame === 'cyber-shield') {
        // Projectiles
        for (const pr of sim.projectiles) {
          ctx.fillStyle = pr.color;
          ctx.beginPath();
          ctx.arc(pr.x, pr.y, pr.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Cyber Entities
        for (const ent of sim.cyberEntities) {
          // Charger telegraph warning line
          if (ent.kind === 'charger' && ent.windupTimer > 0) {
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.65)';
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 6]);
            ctx.beginPath();
            ctx.moveTo(ent.x, ent.y);
            ctx.lineTo(ent.targetX, ent.targetY);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          const r = ent.radius + Math.sin(ent.pulsePhase) * 2;
          ctx.fillStyle =
            ent.flashTimer > 0
              ? '#FFFFFF'
              : ent.kind === 'safe'
              ? '#10B981'
              : ent.kind === 'charger'
              ? '#F59E0B'
              : '#F43F5E';
          ctx.beginPath();
          ctx.arc(ent.x, ent.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = ent.kind === 'safe' ? '#A7F3D0' : '#FECDD3';
          ctx.stroke();

          ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(ent.kind === 'safe' ? '✓ AN TOÀN' : '⚠ NGUY HIỂM', ent.x, ent.y);

          // Floating caption below orb
          ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = ent.kind === 'safe' ? '#6EE7B7' : '#FDA4AF';
          ctx.fillText(ent.label, ent.x, ent.y + r + 15);
        }

        // Player Cyber Guardian Bot
        ctx.save();
        ctx.translate(sim.playerX, sim.playerY);
        ctx.rotate(sim.playerAngle);
        ctx.scale(sim.playerScaleX, sim.playerScaleY);
        if (sim.dashTimer > 0) {
          ctx.strokeStyle = '#06B6D4';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(0, 0, 32, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = sim.playerFlash > 0 ? '#F43F5E' : '#06B6D4';
        ctx.beginPath();
        ctx.arc(0, 0, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#CFFAFE';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // Turret nozzle
        ctx.fillStyle = '#E2E8F0';
        ctx.fillRect(14, -5, 14, 10);
        ctx.restore();
      }

      // ======================================================================
      // RENDER GAME 3: ROBO-CODE MAZE RUNNER
      // ======================================================================
      else if (activeGame === 'robo-maze') {
        // Logic Pulse expanding ring
        if (sim.pulseWaveActive) {
          ctx.strokeStyle = '#A855F7';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(sim.playerX, sim.playerY, sim.pulseWaveRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Maze walls & logic gates
        for (const wall of sim.mazeWalls) {
          if (wall.isGate) {
            ctx.fillStyle = wall.gateOpen ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.85)';
            ctx.strokeStyle = wall.gateOpen ? '#10B981' : '#FDE047';
          } else {
            ctx.fillStyle = '#312E81';
            ctx.strokeStyle = '#818CF8';
          }
          ctx.lineWidth = 2;
          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(wall.x, wall.y, wall.w, wall.h, 6);
          } else {
            ctx.rect(wall.x, wall.y, wall.w, wall.h);
          }
          ctx.fill();
          ctx.stroke();

          if (wall.isGate) {
            ctx.font = 'bold 11px "JetBrains Mono", monospace';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText(
              wall.gateOpen ? 'CỔNG LOGIC: MỞ (1)' : 'CỔNG LOGIC: ĐÓNG (0) · NHẤN SPACE',
              wall.x + wall.w / 2,
              wall.y + wall.h / 2 + 4
            );
          }
        }

        // Energy Crystals (Binary Stars)
        for (const cr of sim.mazeCrystals) {
          if (cr.collected) continue;
          const r = 16 + Math.sin(cr.pulse) * 2.5;
          ctx.fillStyle = '#F59E0B';
          ctx.beginPath();
          ctx.arc(cr.x, cr.y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FEF08A';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.font = 'bold 14px "JetBrains Mono", monospace';
          ctx.fillStyle = '#0F172A';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(cr.bitValue, cr.x, cr.y);
        }

        // Patrol Bug-Bots
        for (const bug of sim.mazeBugs) {
          if (bug.windupTimer > 0 && !bug.isCharging && bug.stunTimer <= 0) {
            ctx.strokeStyle = '#F43F5E';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(bug.x, bug.y, bug.radius + 9, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = bug.stunTimer > 0 ? '#38BDF8' : bug.isCharging ? '#E11D48' : '#F43F5E';
          ctx.beginPath();
          ctx.arc(bug.x, bug.y, bug.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFE4E6';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.fillText(bug.stunTimer > 0 ? 'ĐÓNG BĂNG' : bug.label, bug.x, bug.y - bug.radius - 10);
        }

        // Player Mecha-Bot
        ctx.save();
        ctx.translate(sim.playerX, sim.playerY);
        ctx.scale(sim.playerScaleX, sim.playerScaleY);
        ctx.fillStyle = '#A855F7';
        ctx.beginPath();
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(-20, -20, 40, 40, 10);
        } else {
          ctx.rect(-20, -20, 40, 40);
        }
        ctx.fill();
        ctx.strokeStyle = '#F3E8FF';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        // Robot eyes
        ctx.fillStyle = '#38BDF8';
        ctx.fillRect(-10, -6, 7, 7);
        ctx.fillRect(3, -6, 7, 7);
        ctx.restore();
      }

      // Render Pooled Particles
      for (let i = 0; i < sim.particles.length; i++) {
        const p = sim.particles[i];
        if (!p.active) continue;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Render Floating Score/Combat Callouts
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      for (const ft of sim.floatingTexts) {
        const alpha = 1 - ft.life / ft.maxLife;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, ft.x, ft.y);
      }
      ctx.globalAlpha = 1;

      ctx.restore();
    };

    const loop = (now: number) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      stepSimulation(dt);
      renderScene();

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [addFloatingText, finishGameSession, playSynth, setupMazeWave, spawnParticleBurst]);

  // Pointer handlers on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    simRef.current.pointerX = e.clientX - rect.left;
    simRef.current.pointerY = e.clientY - rect.top;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    simRef.current.pointerX = e.clientX - rect.left;
    simRef.current.pointerY = e.clientY - rect.top;
    simRef.current.pointerDown = true;
  };

  const handlePointerUp = () => {
    simRef.current.pointerDown = false;
  };

  const currentGameMeta = ARCADE_GAMES_CATALOG.find(g => g.id === selectedGameId) || ARCADE_GAMES_CATALOG[0];

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-slate-950 text-white select-none z-50">
      {/* Isolated 60fps Canvas Container */}
      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="block w-full h-full cursor-crosshair"
      />

      {/* ====================================================================
          PERIMETER HUD OVERLAY (Pointer-Events None, >85% Unobstructed Playfield, No Backdrop Filter)
          ==================================================================== */}
      {shellState === 'PLAYING' && (
        <div className="fixed inset-0 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
          {/* Top Perimeter Bar */}
          <div className="flex items-start justify-between gap-4">
            {/* Left Cluster: Back Button + Game Title, Wave & Health */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShellState('TITLE_SCREEN');
                  shellStateRef.current = 'TITLE_SCREEN';
                }}
                className="pointer-events-auto px-3.5 py-2.5 rounded-2xl bg-slate-900/95 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-colors whitespace-nowrap shrink-0 shadow-lg cursor-pointer"
                title="Quay lại màn hình chọn trò chơi"
              >
                ← Quay lại
              </button>

              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
                  <svg className="w-5 h-5 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400">ĐIỂM SỐ</div>
                    <div className="text-lg font-black text-amber-400 font-mono tabular-nums leading-none">
                      {hudScore}
                    </div>
                  </div>
                </div>

                {/* Health Readout */}
                <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
                  <svg className="w-5 h-5 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-400">GIÁP BẢO VỆ</div>
                    <div className="text-sm font-black text-emerald-400 font-mono tabular-nums leading-none">
                      {hudHealth}% · {hudHealth >= 50 ? 'ỔN ĐỊNH' : 'CẢNH BÁO'}
                    </div>
                  </div>
                </div>

                {/* Wave & Combo Readout */}
                <div className="flex items-center gap-3 text-xs font-mono tabular-nums">
                  <div>
                    <span className="text-slate-400">ĐỢT: </span>
                    <strong className="text-white">{hudWave}/3</strong>
                  </div>
                  <span>·</span>
                  <div>
                    <span className="text-slate-400">CHUỖI: </span>
                    <strong className="text-sky-400">x{hudCombo}</strong>
                  </div>
                  <span>·</span>
                  <div>
                    <span className="text-slate-400">NĂNG LƯỢNG: </span>
                    <strong className="text-amber-300">{hudEnergy}%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cluster: Mute, Pause & Exit (pointer-events-auto) */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsMuted(m => !m)}
                className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isMuted ? '🔇 Đã tắt tiếng' : '🔊 Âm thanh'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShellState('PAUSED');
                  shellStateRef.current = 'PAUSED';
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Tạm dừng (Esc)
              </button>
              <button
                type="button"
                onClick={onExit}
                className="px-3.5 py-2 rounded-xl bg-rose-950/90 hover:bg-rose-900 border border-rose-800 text-xs font-bold text-rose-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                ← Thoát Game
              </button>
            </div>
          </div>

          {/* Bottom Perimeter Instruction Line */}
          <div className="flex items-center justify-between gap-4 text-xs text-slate-300">
            <div className="bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl truncate max-w-2xl">
              {hudBannerText}
            </div>
            <div className="hidden md:block bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl font-mono text-[11px] text-slate-400 whitespace-nowrap shrink-0">
              {currentGameMeta.controlsHint}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          TITLE SCREEN OVERLAY (30-40% Negative Space + Bespoke SVG Lockup)
          ==================================================================== */}
      {shellState === 'TITLE_SCREEN' && (
        <div className="fixed inset-0 flex flex-col justify-between p-6 sm:p-10 z-20 overflow-y-auto">
          {/* Top Bar inside Game Shell */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
              >
                ← Quay lại
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                <span>Đấu Trường Trò Chơi Tin Học Tiểu Học</span>
                <span>·</span>
                <span className="text-sky-400 font-bold">Học sinh: {studentName}</span>
                <span>·</span>
                <span>Lớp {classCode}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsMuted(m => !m)}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isMuted ? '🔇 Bật âm thanh' : '🔊 Tắt âm thanh'}
              </button>
              <button
                type="button"
                onClick={onExit}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                ← Quay về trang học tập
              </button>
            </div>
          </div>

          {/* Center Hero Lockup */}
          <div className="my-auto max-w-5xl w-full mx-auto space-y-8 py-6">
            <div className="text-center space-y-3">
              {/* Bespoke Inline SVG Title Emblem */}
              <div className="inline-flex items-center justify-center">
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                  <rect x="6" y="10" width="52" height="44" rx="12" fill="#0F172A" stroke={currentGameMeta.accentHex} strokeWidth="3" />
                  <path d="M20 32H28M24 28V36" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="41" cy="29" r="3" fill="#F59E0B" />
                  <circle cx="47" cy="35" r="3" fill="#10B981" />
                  <path d="M22 46L32 42L42 46" stroke={currentGameMeta.secondaryHex} strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <div className="text-xs font-semibold text-sky-400 tracking-wide">
                TRÒ CHƠI GIÁO DỤC TƯƠNG TÁC · KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {currentGameMeta.title}
              </h1>

              <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {currentGameMeta.objective}
              </p>
            </div>

            {/* 3 Selectable Games Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ARCADE_GAMES_CATALOG.map((game, index) => {
                const isSelected = selectedGameId === game.id;
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() => setSelectedGameId(game.id)}
                    className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-sky-400 ring-2 ring-sky-400/30 shadow-xl'
                        : 'bg-slate-900/75 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-slate-400">
                        0{index + 1} · {game.subtitle}
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {game.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                        {game.objective}
                      </p>
                    </div>
                    <div className="text-xs font-bold text-sky-400 flex items-center justify-between pt-2 border-t border-slate-800">
                      <span>{isSelected ? 'Đang chọn trò chơi này' : 'Chọn trò chơi'}</span>
                      <span>→</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Grade Difficulty Selector + Primary Start CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-1 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
                {([3, 4, 5] as const).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                      selectedGrade === g
                        ? 'bg-sky-500 text-slate-950'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Cấp độ Lớp {g}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => startNewGame()}
                className="px-8 py-3.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-sm shadow-lg transition-transform active:scale-95 whitespace-nowrap shrink-0"
              >
                Bắt Đầu Chơi Ngay (Enter / Space) →
              </button>
            </div>
          </div>

          {/* Single Flat Control-Hint Footer Line */}
          <div className="text-center text-xs font-mono text-slate-400">
            {currentGameMeta.controlsHint}
          </div>
        </div>
      )}

      {/* ====================================================================
          PAUSE / VICTORY / GAME OVER MODAL
          ==================================================================== */}
      {(shellState === 'PAUSED' || shellState === 'VICTORY' || shellState === 'GAME_OVER') && (
        <div className="fixed inset-0 bg-slate-950/85 flex items-center justify-center p-6 z-30">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl">
            <div className="space-y-2">
              <div className="text-xs font-bold text-sky-400">
                {shellState === 'PAUSED'
                  ? 'TẠM DỪNG TRÒ CHƠI'
                  : shellState === 'VICTORY'
                  ? 'CHIẾN THẮNG XUẤT SẮC!'
                  : 'KẾT THÚC LƯỢT CHƠI'}
              </div>
              <h2 className="text-2xl font-black text-white">
                {currentGameMeta.title}
              </h2>
              <p className="text-xs text-slate-400">
                {shellState === 'PAUSED'
                  ? 'Em có thể tiếp tục màn chơi hoặc chọn trò chơi khác.'
                  : shellState === 'VICTORY'
                  ? 'Chúc mừng em đã vượt qua cả 3 đợt thử thách và ghi điểm vào bảng thành tích!'
                  : 'Đừng nản lòng, hãy thử lại để lập kỷ lục cao hơn nhé!'}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono tabular-nums">
              <div>
                <div className="text-[11px] text-slate-400">Điểm số</div>
                <div className="text-lg font-black text-amber-400">{hudScore}</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Đợt vượt qua</div>
                <div className="text-lg font-black text-sky-400">{hudWave}/3</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Độ chính xác</div>
                <div className="text-lg font-black text-emerald-400">{hudAccuracy}%</div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {shellState === 'PAUSED' ? (
                <button
                  type="button"
                  onClick={() => {
                    setShellState('PLAYING');
                    shellStateRef.current = 'PLAYING';
                  }}
                  className="w-full py-3 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-black text-xs transition-colors"
                >
                  Tiếp Tục Chơi (Esc)
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => startNewGame()}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors"
              >
                Chơi Lại Từ Đầu (Enter)
              </button>

              <button
                type="button"
                onClick={() => {
                  setShellState('TITLE_SCREEN');
                  shellStateRef.current = 'TITLE_SCREEN';
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
              >
                Đổi Trò Chơi Khác
              </button>

              <button
                type="button"
                onClick={onExit}
                className="w-full py-2.5 rounded-xl bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white font-semibold text-xs transition-colors"
              >
                Quay Về Trang Học Tập
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
