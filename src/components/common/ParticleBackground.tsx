import React, { useEffect, useRef } from 'react';

// Confetti pieces floating at top of page continuously
export const ConfettiRain: React.FC = () => {
  const colors = ['#f43f5e','#a855f7','#3b82f6','#10b981','#f59e0b','#ec4899','#06b6d4','#ffffff'];
  const shapes = ['▲','★','●','■','♦','♥','✦'];
  const pieces = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    shape: shapes[i % shapes.length],
    left: `${(i * 3.6) + Math.random() * 3}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${-Math.random() * 8}s`,
    size: `${10 + Math.floor(Math.random() * 12)}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece absolute top-0 select-none"
          style={{
            left: p.left,
            color: p.color,
            fontSize: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        >
          {p.shape}
        </div>
      ))}
    </div>
  );
};

// Floating balloons in corners
export const FloatingBalloons: React.FC = () => {
  const balloons = [
    { emoji: '🎈', pos: 'bottom-12 left-4', anim: 'animate-balloon', size: 'text-5xl', delay: '0s' },
    { emoji: '🎀', pos: 'bottom-24 left-12', anim: 'animate-balloon-slow', size: 'text-3xl', delay: '-1s' },
    { emoji: '🎊', pos: 'bottom-8 right-4', anim: 'animate-balloon-fast', size: 'text-4xl', delay: '-2s' },
    { emoji: '🎉', pos: 'bottom-20 right-14', anim: 'animate-balloon', size: 'text-3xl', delay: '-0.5s' },
    { emoji: '⭐', pos: 'top-20 left-8', anim: 'animate-balloon-slow', size: 'text-2xl', delay: '-3s' },
    { emoji: '✨', pos: 'top-32 right-6', anim: 'animate-balloon', size: 'text-3xl', delay: '-1.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {balloons.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.pos} ${b.anim} ${b.size} select-none opacity-60`}
          style={{ animationDelay: b.delay }}
        >
          {b.emoji}
        </div>
      ))}
    </div>
  );
};

// Canvas star particles
export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const palette = [
      'rgba(244,63,94,',   // rose
      'rgba(168,85,247,',  // purple
      'rgba(245,158,11,',  // gold
      'rgba(59,130,246,',  // blue
      'rgba(16,185,129,',  // emerald
      'rgba(255,255,255,', // white
    ];

    const count = Math.min(Math.floor(w * h / 9000), 80);
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.05),
      op: Math.random() * 0.7 + 0.2,
      ps: Math.random() * 0.018 + 0.004,
      col: palette[Math.floor(Math.random() * palette.length)],
    }));

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.op += Math.sin(Date.now() * p.ps) * 0.005;
        if (p.y < 0) { p.y = h; p.x = Math.random() * w; }
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        const o = Math.max(0.08, Math.min(0.9, p.op));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.col}${o})`; ctx.fill();
        if (p.r > 1.8) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.col}${o * 0.12})`; ctx.fill();
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-80" />;
};
