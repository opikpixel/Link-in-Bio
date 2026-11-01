import React, { useState, useEffect, useRef } from 'react';

const ORIX_MESSAGES = [
  'Hoot! Halo, aku Orix! Selamat datang di profil Lutfi 🦉✨',
  '"Hiduplah seperti Larry" — Eksekusi, Disiplin, Tangguh! ⚡',
  'Silakan pilih tautan di atas untuk terhubung langsung ya!',
  'Terima kasih sudah mampir & menyapaku! Semoga harimu cerah 🌟',
  'Sistem Observasi Orix aktif! Semua tautan siap dijelajahi 🚀',
];

/**
 * INTERACTIVE ORIX CYBER OWL PET
 * Maskot / Virtual Pet interaktif di tampilan publik:
 * - Mata heksagonal kuning (#facc15) mengikuti arah kursor/sentuhan
 * - Berkedip alami & mengepakkan sayap saat diklik/disapa
 * - Memunculkan balon sapaan interaktif & partikel reaksi
 */
export default function OrixMascot({ compact = false, customName = 'Lutfi' }) {
  const owlRef = useRef(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [petCount, setPetCount] = useState(0);

  // Eye tracking mengikuti posisi mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!owlRef.current) return;
      const rect = owlRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(2.6, Math.hypot(dx, dy) / 45);
      setPupilPos({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Kedipan mata alami setiap beberapa detik
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 4200);
    return () => clearInterval(blinkInterval);
  }, []);

  // Sapaan awal singkat saat halaman dimuat
  useEffect(() => {
    if (compact) return;
    const initTimer = setTimeout(() => {
      setShowBubble(true);
    }, 1200);
    const hideTimer = setTimeout(() => {
      setShowBubble(false);
    }, 6500);
    return () => {
      clearTimeout(initTimer);
      clearTimeout(hideTimer);
    };
  }, [compact]);

  const handleInteract = () => {
    setIsExcited(true);
    setPetCount((prev) => prev + 1);
    setShowBubble(true);
    setMsgIndex((prev) => (prev + 1) % ORIX_MESSAGES.length);

    setTimeout(() => {
      setIsExcited(false);
    }, 650);
  };

  const currentMessage = ORIX_MESSAGES[msgIndex].replace('Lutfi', customName || 'Lutfi');

  return (
    <div
      ref={owlRef}
      className={`relative inline-flex flex-col items-center select-none ${
        compact ? 'mt-3' : 'mt-5'
      }`}
    >
      {/* BALON DIALOG INTERAKTIF (SPEECH BUBBLE) */}
      {showBubble && (
        <div
          onClick={() => setShowBubble(false)}
          className={`mb-2 px-3.5 py-2 rounded-2xl bg-[#0f172a]/95 border-2 border-[#facc15] text-white shadow-[3px_3px_0px_#070a14] cursor-pointer transition-all animate-bounce ${
            compact ? 'max-w-[220px] text-[10px]' : 'max-w-[260px] text-xs'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="text-[10px] font-mono font-bold text-[#facc15] uppercase tracking-wider">
              ORIX // CYBER PET {petCount > 0 ? `• ♥ ${petCount}` : ''}
            </span>
            <span className="text-[10px] text-slate-400">×</span>
          </div>
          <p className="leading-snug text-[#cbd5e1] font-medium">{currentMessage}</p>
        </div>
      )}

      {/* TOMBOL / KARAKTER BURUNG HANTU ORIX */}
      <button
        type="button"
        onClick={handleInteract}
        title="Klik untuk menyapa Orix The Cyber Owl!"
        className={`group relative flex flex-col items-center focus:outline-none transition-transform duration-300 ${
          isExcited ? '-translate-y-2.5 scale-105' : 'hover:-translate-y-1'
        }`}
      >
        {/* Partikel Sparkle saat disapa */}
        {isExcited && (
          <div className="absolute -top-4 inset-x-0 flex justify-between px-2 pointer-events-none">
            <span className="text-xs text-[#facc15] animate-ping">✨</span>
            <span className="text-xs text-[#38bdf8] animate-bounce">⚡</span>
          </div>
        )}

        <svg
          viewBox="0 0 120 110"
          className={compact ? 'w-20 h-20' : 'w-24 h-24'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ambient Glow di belakang Orix */}
          <circle cx="60" cy="54" r="38" fill="#facc15" fillOpacity="0.08" />

          {/* Ranting Pohon Tempat Bertengger (Twilight Tree Branch) */}
          <path
            d="M14 92 Q 60 96, 106 89"
            stroke="#334155"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M90 90 L102 82 M24 92 L15 85"
            stroke="#334155"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Daun Kecil Bercahaya di Ranting */}
          <ellipse cx="104" cy="80" rx="5" ry="2.5" transform="rotate(-25 104 80)" fill="#38bdf8" fillOpacity="0.7" />
          <ellipse cx="13" cy="83" rx="4.5" ry="2" transform="rotate(20 13 83)" fill="#facc15" fillOpacity="0.7" />

          {/* Sayap Kiri (Mengepak saat diklik) */}
          <g
            style={{
              transform: isExcited ? 'rotate(18deg)' : 'rotate(0deg)',
              transformOrigin: '34px 55px',
              transition: 'transform 0.25s ease',
            }}
          >
            <path
              d="M32 46 C20 52, 18 70, 28 80 C32 76, 35 64, 34 46 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            {/* Pola Circuit Cyan di Sayap */}
            <path d="M25 60 L30 63 L27 71" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.75" />
          </g>

          {/* Sayap Kanan + Holographic Clipboard */}
          <g
            style={{
              transform: isExcited ? 'rotate(-20deg)' : 'rotate(0deg)',
              transformOrigin: '86px 55px',
              transition: 'transform 0.25s ease',
            }}
          >
            <path
              d="M88 46 C100 52, 102 70, 92 80 C88 76, 85 64, 86 46 Z"
              fill="#1e293b"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            <path d="M95 60 L90 63 L93 71" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.75" />

            {/* Mini Holographic Clipboard di Sayap Kanan */}
            <rect
              x="92"
              y="54"
              width="14"
              height="18"
              rx="2.5"
              fill="#38bdf8"
              fillOpacity="0.2"
              stroke="#38bdf8"
              strokeWidth="1.2"
            />
            <line x1="95" y1="59" x2="103" y2="59" stroke="#facc15" strokeWidth="1.2" />
            <line x1="95" y1="63" x2="101" y2="63" stroke="#38bdf8" strokeWidth="1" />
            <line x1="95" y1="67" x2="104" y2="67" stroke="#38bdf8" strokeWidth="1" />
          </g>

          {/* Tubuh Burung Hantu (Sturdy & Neat Charcoal Dark Grey) */}
          <path
            d="M32 36 C32 22, 88 22, 88 36 L90 74 C90 86, 76 91, 60 91 C44 91, 30 86, 30 74 Z"
            fill="#1e293b"
            stroke="#94a3b8"
            strokeWidth="1.6"
          />

          {/* Perut & 3 Lapisan Bulu Geometris Rapi */}
          <path
            d="M40 58 C40 50, 80 50, 80 58 L78 82 C78 88, 42 88, 42 82 Z"
            fill="#0f172a"
          />
          <path
            d="M46 64 L60 70 L74 64 M48 71 L60 77 L72 71 M51 78 L60 83 L69 78"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.65"
            strokeLinecap="round"
          />

          {/* Easter Egg "12" Kecil di Dada Kiri */}
          <text x="43" y="62" fill="#facc15" fontSize="6" fontFamily="monospace" fontWeight="bold">
            12
          </text>

          {/* Telinga / Tanduk Great Horned Owl dengan Ujung Perak Metalik */}
          <path d="M28 20 L44 31 L34 38 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.4" />
          <path d="M92 20 L76 31 L86 38 Z" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.4" />
          <path d="M28 20 L35 25 L31 28 Z" fill="#e2e8f0" />
          <path d="M92 20 L85 25 L89 28 Z" fill="#e2e8f0" />

          {/* Bingkai Wajah (Facial Disc) */}
          <path
            d="M33 40 L47 32 L60 38 L73 32 L87 40 L84 56 L60 62 L36 56 Z"
            fill="#070a14"
            stroke="#64748b"
            strokeWidth="1.4"
          />

          {/* MATA KIRI & KANAN (Hexagonal Glowing Neon Yellow #facc15) */}
          {isBlinking ? (
            <>
              <line x1="39" y1="46" x2="53" y2="46" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="67" y1="46" x2="81" y2="46" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Mata Kiri */}
              <polygon
                points="46,38 53,42 53,50 46,54 39,50 39,42"
                fill="#facc15"
              />
              {/* Pupil Heksagonal Mengikuti Kursor */}
              <circle
                cx={46 + pupilPos.x}
                cy={46 + pupilPos.y}
                r="3.2"
                fill="#070a14"
              />
              <circle
                cx={44.8 + pupilPos.x * 0.5}
                cy={44.5 + pupilPos.y * 0.5}
                r="1"
                fill="#ffffff"
              />

              {/* Mata Kanan */}
              <polygon
                points="74,38 81,42 81,50 74,54 67,50 67,42"
                fill="#facc15"
              />
              <circle
                cx={74 + pupilPos.x}
                cy={46 + pupilPos.y}
                r="3.2"
                fill="#070a14"
              />
              <circle
                cx={72.8 + pupilPos.x * 0.5}
                cy={44.5 + pupilPos.y * 0.5}
                r="1"
                fill="#ffffff"
              />
            </>
          )}

          {/* Visor Holografik Asimetris di Sebelah Kiri Mata Burung Hantu (Kanan Layar) */}
          <path
            d="M63 35 L91 33 L88 55 L64 55 Z"
            fill="#38bdf8"
            fillOpacity="0.24"
            stroke="#38bdf8"
            strokeWidth="1.4"
          />
          <line x1="67" y1="40" x2="85" y2="39" stroke="#38bdf8" strokeWidth="0.9" strokeOpacity="0.8" />
          <circle cx="90" cy="44" r="2.5" fill="#38bdf8" />

          {/* Paruh Gunmetal Melengkung Tajam */}
          <polygon points="56,49 64,49 60,59" fill="#475569" stroke="#e2e8f0" strokeWidth="1.2" />

          {/* Cakar Mencengkeram Ranting */}
          <path
            d="M47 89 L47 94 M50 89 L50 94 M70 89 L70 94 M73 89 L73 94"
            stroke="#facc15"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* Label Interaktif Kecil */}
        <span className=" -mt-1 px-2.5 py-0.5 rounded-full bg-[#0f172a]/90 border border-[#818cf8]/30 group-hover:border-[#facc15] text-[10px] font-mono text-[#cbd5e1] group-hover:text-[#facc15] transition shadow-xs">
          🦉 Orix • Klik untuk sapa
        </span>
      </button>
    </div>
  );
}
