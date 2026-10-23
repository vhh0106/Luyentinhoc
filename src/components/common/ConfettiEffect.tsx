import React, { useEffect, useRef } from 'react';

interface ConfettiEffectProps {
  durationMs?: number;
}

export const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ durationMs = 3500 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const colors = [
      '#3B82F6', '#60A5FA', '#10B981', '#34D399',
      '#F59E0B', '#FBBF24', '#EF4444', '#EC4899', '#8B5CF6'
    ];

    const particles: Array<{
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      color: string;
      tilt: number;
      tiltAngle: number;
      tiltAngleInc: number;
      shape: 'circle' | 'rect' | 'star';
    }> = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.3 - 50,
        r: Math.random() * 6 + 4,
        dx: (Math.random() - 0.5) * 4,
        dy: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: Math.random() * Math.PI,
        tiltAngleInc: (Math.random() * 0.07) + 0.04,
        shape: i % 3 === 0 ? 'star' : i % 2 === 0 ? 'rect' : 'circle'
      });
    }

    let animationId: number;
    const startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.tiltAngle) + p.dy);
        p.x += Math.sin(p.tiltAngle) * 2 + p.dx;
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.fillStyle = p.color;
        ctx.beginPath();

        if (p.shape === 'rect') {
          ctx.fillRect(p.x, p.y, p.r * 1.5, p.r);
        } else if (p.shape === 'circle') {
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw star
          drawStar(ctx, p.x, p.y, 5, p.r, p.r / 2);
        }
      });

      if (Date.now() - startTime < durationMs) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    function drawStar(
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fill();
    }

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, [durationMs]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
