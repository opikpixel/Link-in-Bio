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

    const count = compact ? 18 : 34;
    const colors = ['#facc15', '#38bdf8', '#818cf8', '#ffffff'];

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * (mode === 'starfield' ? 0.12 : 0.35),
      vy: mode === 'cyber-fireflies' ? -(Math.random() * 0.4 + 0.12) : (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * 0.015 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.pulse;
        if (p.alpha > 0.8 || p.alpha < 0.15) p.pulse = -p.pulse;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowBlur = mode === 'cyber-fireflies' ? 8 : 3;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (mode === 'neural-matrix') {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = compact ? 60 : 90;
            if (dist < maxDist) {
              ctx.save();
              ctx.strokeStyle = '#38bdf8';
              ctx.globalAlpha = (1 - dist / maxDist) * 0.18;
              ctx.lineWidth = 0.6;
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
 */
export function TypewriterRole({ roleText = '', enabled = true, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <span>{displayText}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </p>
  );
}

/**
 * 3. KINETIC TYPOGRAPHY HEADER
 */
export function KineticHeader({ text, enabled = false, size = 'md' }) {
  if (!enabled) {
    return (
      <h1
        className={
          size === 'sm'
            ? 'text-lg font-bold tracking-tight'
            : 'text-xl sm:text-2xl font-bold tracking-tight'
        }
      >
        {text}
      </h1>
    );
  }

  const textSizeClass = size === 'sm' ? 'text-lg' : 'text-xl sm:text-2xl';

  return (
    <div className="relative inline-flex flex-col items-center justify-center select-none py-0.5">
      <span
        aria-hidden="true"
        className={`kinetic-outline-text font-black uppercase tracking-wider leading-none ${
          size === 'sm' ? 'text-[10px] -mb-1' : 'text-xs -mb-1.5'
        } opacity-40`}
      >
        {text}
      </span>
      <h1
        className={`kinetic-title font-black tracking-tight text-[#facc15] relative z-10 ${textSizeClass}`}
      >
        {text}
      </h1>
      <span
        aria-hidden="true"
        className={`kinetic-outline-text font-black uppercase tracking-wider leading-none ${
          size === 'sm' ? 'text-[10px] -mt-1' : 'text-xs -mt-1.5'
        } opacity-40`}
      >
        {text}
      </span>
    </div>
  );
}

/**
 * 4. MINIMALIST SECTION PILL (Sesuai Referensi Screenshot: "01 // TAUTAN" di dalam pill kuning bersih)
 */
export function SectionPillTag({ code = '01', label = 'SECTION' }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#facc15] text-[#070a14] border-2 border-[#070a14] shadow-[2px_2px_0px_#070a14] text-[10px] font-mono font-bold tracking-wider uppercase">
      <span>{code}</span>
      <span>//</span>
      <span>{label}</span>
    </span>
  );
}

/**
 * 5. CARD HEADER NUMBER & STATUS (Sesuai Referensi Screenshot: Nomor [01] + Label + Status [AKTIF])
 */
export function CardStepHeader({ number = '01', category = 'MODULE', status = 'AKTIF', statusColor = 'emerald' }) {
  const badgeStyle =
    statusColor === 'yellow'
      ? 'bg-[#facc15]/20 text-[#facc15] border-[#facc15]/50'
      : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5">
        <span className="px-2 py-0.5 rounded-full bg-[#facc15] text-[#070a14] text-[10px] font-mono font-extrabold">
          {number}
        </span>
        <span className="text-[11px] font-mono font-semibold tracking-widest uppercase text-[#cbd5e1]">
          {category}
        </span>
      </div>
      {status && (
        <span
          className={`px-2.5 py-0.5 rounded-md border text-[10px] font-mono font-bold tracking-wider uppercase ${badgeStyle}`}
        >
          {status}
        </span>
      )}
    </div>
  );
}
