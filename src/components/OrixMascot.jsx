import React from 'react';

/**
 * ORIX - THE CYBER OWL (Cybernetic Great Horned Owl)
 * Maskot resmi Lutfi Alhamsyah (Opikz)
 * - Charcoal Dark Grey & Metallic Silver Tips
 * - Glowing Neon Yellow (#facc15) Hexagonal Eyes
 * - Asymmetric Holographic Cyan (#38bdf8) Visor di sisi kiri
 * - Gunmetal sharp beak
 */
export default function OrixMascot({ className = 'w-9 h-9', showGlow = true }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {showGlow && (
        <div className="absolute inset-0 rounded-full bg-[#facc15]/20 blur-md pointer-events-none" />
      )}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md"
      >
        {/* Background Shield / Hexagonal Base */}
        <polygon
          points="32,3 57,16 57,48 32,61 7,48 7,16"
          fill="#070a14"
          stroke="#818cf8"
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />

        {/* Circuit Lines on Background */}
        <path
          d="M12 22 L18 22 L22 26 M52 22 L46 22 L42 26"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />

        {/* Great Horned Owl Ear Tufts (Charcoal Dark Grey with Silver Tips) */}
        <path
          d="M14 14 L23 22 L17 27 Z"
          fill="#1e293b"
          stroke="#94a3b8"
          strokeWidth="1.2"
        />
        <path
          d="M50 14 L41 22 L47 27 Z"
          fill="#1e293b"
          stroke="#94a3b8"
          strokeWidth="1.2"
        />
        {/* Metallic Silver Tips on Horns */}
        <path d="M14 14 L18 17.5 L15.5 19.5 Z" fill="#e2e8f0" />
        <path d="M50 14 L46 17.5 L48.5 19.5 Z" fill="#e2e8f0" />

        {/* Owl Head & Geometric 3-Layered Body */}
        <path
          d="M16 24 C16 17 48 17 48 24 L50 45 C50 52 39 56 32 56 C25 56 14 52 14 45 Z"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="1.5"
        />

        {/* Geometric 3-Layered Wing / Chest Feathers */}
        <path
          d="M20 42 L32 47 L44 42 M22 46 L32 51 L42 46 M25 50 L32 54 L39 50"
          stroke="#38bdf8"
          strokeWidth="1.2"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />

        {/*Varsity "12" Easter Egg / Cyber Core Accent */}
        <circle cx="23" cy="48" r="1.3" fill="#facc15" />
        <circle cx="41" cy="48" r="1.3" fill="#e11d48" />

        {/* Facial Disc (Dark Charcoal Frame) */}
        <path
          d="M17 28 L25 23 L32 27 L39 23 L47 28 L45 38 L32 42 L19 38 Z"
          fill="#0f172a"
          stroke="#64748b"
          strokeWidth="1.2"
        />

        {/* Left Eye (Viewer's Left): Hexagonal Glowing Neon Yellow (#facc15) */}
        <polygon
          points="24,28 28,30 28,35 24,37 20,35 20,30"
          fill="#facc15"
        />
        <polygon
          points="24,30.5 26,31.5 26,33.5 24,34.5 22,33.5 22,31.5"
          fill="#070a14"
        />

        {/* Right Eye (Viewer's Right / Owl's Left): Hexagonal Glowing Neon Yellow */}
        <polygon
          points="40,28 44,30 44,35 40,37 36,35 36,30"
          fill="#facc15"
        />
        <polygon
          points="40,30.5 42,31.5 42,33.5 40,34.5 38,33.5 38,31.5"
          fill="#070a14"
        />

        {/* Asymmetric Sci-Fi Holographic Visor (Over Owl's Left Eye / Viewer's Right) */}
        <path
          d="M33 26 L51 25 L49 38 L34 38 Z"
          fill="#38bdf8"
          fillOpacity="0.28"
          stroke="#38bdf8"
          strokeWidth="1.3"
        />
        {/* Visor HUD Crosshair */}
        <line x1="36" y1="29" x2="47" y2="29" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.8" />
        <circle cx="51" cy="31" r="2" fill="#38bdf8" />

        {/* Gunmetal Sharp Beak */}
        <polygon
          points="29,35 35,35 32,43"
          fill="#334155"
          stroke="#cbd5e1"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
