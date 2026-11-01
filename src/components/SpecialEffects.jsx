import React, { useEffect, useRef, useState } from 'react';

/**
 * 1. PARTICLE EFFECT LAYER
 * Mendukung mode:
 * - 'cyber-fireflies': Partikel kuning emas (#facc15) & sky blue (#38bdf8) melayang lembut
 * - 'neural-matrix': Jaringan titik konstelasi siber (#38bdf8 & #818cf8)
 * - 'starfield': Bintang senja Maghrib berkedip (#ffffff & #facc15)
 * - 'none': Nonaktif
 */
export function ParticleEffectLayer({ mode = 'cyber-fireflies', compact = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!mode || mode === 'none') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth || 360;
        canvas.height = parent.clientHeight || 680;
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const count = compact ? 22 : 42;
    const colors = ['#facc15', '#38bdf8', '#818cf8', '#ffffff'];

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * (mode === 'starfield' ? 0.15 : 0.45),
      vy: mode === 'cyber-fireflies' ? -(Math.random() * 0.45 + 0.15) : (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.65 + 0.2,
      pulse: Math.random() * 0.02 + 0.008,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.pulse;
        if (p.alpha > 0.85 || p.alpha < 0.15) p.pulse = -p.pulse;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.9, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = mode === 'cyber-fireflies' ? 10 : 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Garis koneksi untuk mode neural-matrix
        if (mode === 'neural-matrix') {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = compact ? 65 : 95;
            if (dist < maxDist) {
              ctx.save();
              ctx.strokeStyle = '#38bdf8';
              ctx.globalAlpha = (1 - dist / maxDist) * 0.22;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mode, compact]);

  if (!mode || mode === 'none') return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/**
 * 2. TYPEWRITER ROLE INDICATOR
 * Menampilkan peran bergantian dengan animasi ketik otomatis + kursor kotak berkedip (#facc15).
 * Mendukung pemisah '|' atau ',' (misal: "IT Project Manager | IT Cloud | Informatics Student")
 */
export function TypewriterRole({ roleText = '', enabled = true, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pecah role berdasarkan '|' atau ',' jika ada lebih dari 1, atau gunakan default roles jika kosong
  const roles = React.useMemo(() => {
    if (!roleText || !roleText.trim()) {
      return ['IT Project Manager', 'IT Cloud', 'Informatics Student'];
    }
    if (roleText.includes('|')) {
      return roleText.split('|').map((s) => s.trim()).filter(Boolean);
    }
    if (roleText.includes(',')) {
      return roleText.split(',').map((s) => s.trim()).filter(Boolean);
    }
    return [roleText.trim()];
  }, [roleText]);

  useEffect(() => {
    if (!enabled) return;

    const currentFullText = roles[roleIndex % roles.length] || '';
    const typeSpeed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = currentFullText.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === currentFullText) {
          // Jika hanya 1 kalimat, tetap ketik ulang setelah jeda agak lama
          setTimeout(() => setIsDeleting(true), roles.length > 1 ? 1600 : 3500);
        }
      } else {
        const next = currentFullText.slice(0, displayText.length - 1);
        setDisplayText(next);
        if (next === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles, enabled]);

  if (!enabled) {
    return <p className={className}>{roleText}</p>;
  }

  return (
    <p className={`inline-flex items-center justify-center font-mono ${className}`}>
      <span className="text-[#38bdf8] mr-1.5 opacity-80">&gt;</span>
      <span>{displayText}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </p>
  );
}

/**
 * 3. KINETIC TYPOGRAPHY HEADER (3-Layer: Outline tipis - Solid tebal - Outline tipis)
 */
export function KineticHeader({ text, enabled = true, size = 'md' }) {
  if (!enabled) {
    return (
      <h1 className={size === 'sm' ? 'text-lg font-bold tracking-tight' : 'text-xl sm:text-2xl font-bold tracking-tight'}>
        {text}
      </h1>
    );
  }

  const textSizeClass = size === 'sm' ? 'text-lg' : 'text-xl sm:text-2xl';

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none py-0.5">
      {/* Layer 1: Top Thin Outline */}
      <span
        aria-hidden="true"
        className={`kinetic-outline-text font-black uppercase tracking-wider leading-none ${
          size === 'sm' ? 'text-[11px] -mb-1.5' : 'text-xs sm:text-sm -mb-2'
        } opacity-45`}
      >
        {text}
      </span>

      {/* Layer 2: Center Solid Cyber Yellow / White Glow */}
      <h1
        className={`kinetic-title font-black tracking-tight text-[#facc15] relative z-10 ${textSizeClass}`}
      >
        {text}
      </h1>

      {/* Layer 3: Bottom Thin Outline */}
      <span
        aria-hidden="true"
        className={`kinetic-outline-text font-black uppercase tracking-wider leading-none ${
          size === 'sm' ? 'text-[11px] -mt-1.5' : 'text-xs sm:text-sm -mt-2'
        } opacity-45`}
      >
        {text}
      </span>
    </div>
  );
}

/**
 * 4. INFINITE SEAMLESS LOOPING TICKER / CAROUSEL
 * Bergerak menggeser otomatis tanpa batas & berhenti (pause) saat disentuh kursor.
 */
export function InfiniteMottoTicker({
  text = 'HIDUPLAH SEPERTI LARRY • THE SAGE & THE CREATOR • ANALITIS • VISIONER • EKSEKUTOR',
  enabled = false,
  compact = false,
}) {
  if (!enabled) return null;

  const items = text
    .split('•')
    .map((s) => s.trim())
    .filter(Boolean);

  const repeated = [...items, ...items, ...items];

  return (
    <div
      className={`marquee-container w-full overflow-hidden rounded-full bg-[#070a14]/70 border border-[#818cf8]/25 backdrop-blur-md ${
        compact ? 'py-1 my-2' : 'py-1.5 my-3'
      }`}
      title="Sentuh untuk menghentikan putaran (Pause)"
    >
      <div className="marquee-track items-center gap-4">
        {repeated.map((item, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-2 font-mono font-bold tracking-widest uppercase ${
              compact ? 'text-[9px] px-1.5' : 'text-[10px] px-2'
            } text-[#cbd5e1]`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] shadow-[0_0_6px_#facc15]" />
            <span>{item}</span>
            <span className="text-[#e11d48] font-normal">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * 5. BRACKET TECH-BADGE
 * Label kategori dengan kurung siku tajam Sci-Fi & aksen #e11d48 / #38bdf8 / #facc15
 */
export function BracketTechBadge({ children, accent = 'yellow', className = '' }) {
  const colorMap = {
    yellow: 'text-[#facc15] border-[#facc15]/40 bg-[#facc15]/10',
    sky: 'text-[#38bdf8] border-[#38bdf8]/40 bg-[#38bdf8]/10',
    rose: 'text-[#e11d48] border-[#e11d48]/40 bg-[#e11d48]/10',
    indigo: 'text-[#818cf8] border-[#818cf8]/40 bg-[#818cf8]/10',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase border rounded-xs ${
        colorMap[accent] || colorMap.yellow
      } ${className}`}
    >
      <span className="text-[#e11d48] font-black">[</span>
      <span>{children}</span>
      <span className="text-[#38bdf8] font-black">]</span>
    </span>
  );
}
