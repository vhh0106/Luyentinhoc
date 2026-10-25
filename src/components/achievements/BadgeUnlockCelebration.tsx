import React, { useEffect, useRef } from 'react';
import { Achievement } from '../../types';
import { Sparkles, Trophy, Award, ArrowRight } from 'lucide-react';
import { soundService } from '../../services/sound';

interface BadgeUnlockCelebrationProps {
  unlockedAchievements: Achievement[];
  onClose: () => void;
  onViewShowcase?: () => void;
}

export const BadgeUnlockCelebration: React.FC<BadgeUnlockCelebrationProps> = ({
  unlockedAchievements,
  onClose,
  onViewShowcase
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Play sound and launch confetti
  useEffect(() => {
    soundService.playBadgeUnlock();

    // Canvas confetti animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      shape: 'circle' | 'rect' | 'star';
    }

    const colors = ['#f59e0b', '#3b82f6', '#ec4899', '#10b981', '#8b5cf6', '#ef4444', '#fbbf24'];
    const particles: Particle[] = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 12 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        shape: Math.random() > 0.5 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'star'
      });
    }

    let animationFrameId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          // star
          ctx.beginPath();
          for (let s = 0; s < 5; s++) {
            ctx.lineTo(Math.cos(((18 + s * 72) * Math.PI) / 180) * p.size, -Math.sin(((18 + s * 72) * Math.PI) / 180) * p.size);
            ctx.lineTo(Math.cos(((54 + s * 72) * Math.PI) / 180) * (p.size / 2), -Math.sin(((54 + s * 72) * Math.PI) / 180) * (p.size / 2));
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      if (frame < 160) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!unlockedAchievements || unlockedAchievements.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />

      {/* Main card */}
      <div className="relative z-20 bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-amber-300 p-6 md:p-8 text-center space-y-6 animate-scaleUp overflow-hidden">
        {/* Sparkle background orb */}
        <div className="absolute -top-16 -left-16 w-44 h-44 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Header Ribbon */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
            <Trophy className="w-4 h-4 text-amber-600 fill-amber-500 animate-bounce" />
            <span>VINH DANH THÀNH TÍCH MỚI!</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight pt-2">
            Chúc mừng em vừa mở khóa huy hiệu! 🎖️
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Sự nỗ lực của em đã được đền đáp với danh hiệu vinh quang trong chương trình Tin học Kết Nối Tri Thức!
          </p>
        </div>

        {/* Badges List */}
        <div className="space-y-3 max-h-64 overflow-y-auto px-1 py-1 scrollbar-thin">
          {unlockedAchievements.map(achievement => (
            <div
              key={achievement.id}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 shadow-sm flex items-center gap-4 text-left transition-all hover:scale-[1.02]"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md border-2 border-amber-300 flex items-center justify-center text-4xl shrink-0">
                {achievement.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">
                    {achievement.tier === 'gold' ? '🥇 Cấp Vàng' : achievement.tier === 'silver' ? '🥈 Cấp Bạc' : '🥉 Cấp Đồng'}
                  </span>
                  <span className="text-[11px] font-bold text-slate-700">Mới đạt được!</span>
                </div>
                <h4 className="text-base font-black text-slate-900 leading-tight">
                  {achievement.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {onViewShowcase && (
            <button
              onClick={() => {
                onClose();
                onViewShowcase();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Xem Kho Huy Hiệu</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Tuyệt vời! Tiếp tục làm bài</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
