import React from 'react';

/**
 * MAGHRIB TWILIGHT SCENIC WALLPAPER
 * Pemandangan senja sesuai Brand Identity (#070a14 -> #1f1430):
 * - Langit malam/senja Maghrib dengan pendaran cahaya lembut
 * - Bulan bercahaya indah & bintang-bintang halus
 * - Siluet pegunungan berlapis berkabut
 * - Siluet pepohonan rindang & cemara di bukit kiri-kanan
 */
export default function MaghribLandscapeWallpaper({ className = 'fixed inset-0 pointer-events-none z-0' }) {
  return (
    <div className={`${className} overflow-hidden select-none bg-[#070a14]`}>
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sky Gradient: Maghrib Twilight (#070a14 -> #141229 -> #1f1430 -> warm dusk horizon) */}
          <linearGradient id="maghribSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#070a14" />
            <stop offset="45%" stopColor="#0f1328" />
            <stop offset="78%" stopColor="#1f1430" />
            <stop offset="95%" stopColor="#2d193c" />
            <stop offset="100%" stopColor="#3b1d42" />
          </linearGradient>

          {/* Horizon Warm Glow */}
          <radialGradient id="horizonGlow" cx="50%" cy="82%" r="60%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#e11d48" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#070a14" stopOpacity="0" />
          </radialGradient>

          {/* Moon Outer Halo */}
          <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#facc15" stopOpacity="0.14" />
            <stop offset="70%" stopColor="#818cf8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#070a14" stopOpacity="0" />
          </radialGradient>

          {/* Moon Surface Gradient */}
          <linearGradient id="moonSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#fef9c3" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>

          {/* Mountain Gradients */}
          <linearGradient id="farMount" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b38" />
            <stop offset="100%" stopColor="#121024" />
          </linearGradient>

          <linearGradient id="midMount" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#151329" />
            <stop offset="100%" stopColor="#0b0d1b" />
          </linearGradient>

          <linearGradient id="nearHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0c0f1d" />
            <stop offset="100%" stopColor="#05070f" />
          </linearGradient>

          {/* Valley Mist */}
          <linearGradient id="mistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#070a14" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Sky Base */}
        <rect width="1440" height="900" fill="url(#maghribSky)" />

        {/* 2. Horizon Sunset Ambience */}
        <rect width="1440" height="900" fill="url(#horizonGlow)" />

        {/* 3. Subtle Starfield */}
        <g fill="#ffffff" opacity="0.65">
          <circle cx="140" cy="90" r="1.2" />
          <circle cx="260" cy="150" r="0.9" />
          <circle cx="390" cy="70" r="1.4" opacity="0.8" />
          <circle cx="540" cy="130" r="1" />
          <circle cx="680" cy="65" r="1.2" />
          <circle cx="820" cy="110" r="0.9" />
          <circle cx="960" cy="75" r="1.5" fill="#fef08a" />
          <circle cx="1290" cy="95" r="1.2" />
          <circle cx="1360" cy="170" r="1" />
          <circle cx="190" cy="240" r="1.1" fill="#38bdf8" />
          <circle cx="620" cy="210" r="0.8" />
          <circle cx="880" cy="220" r="1.1" />
          <circle cx="1050" cy="290" r="0.9" />
          {/* Twinkle Star Crosses */}
          <path d="M390 64 L390 76 M384 70 L396 70" stroke="#ffffff" strokeWidth="0.7" opacity="0.6" />
          <path d="M960 68 L960 82 M953 75 L967 75" stroke="#fef08a" strokeWidth="0.8" opacity="0.7" />
        </g>

        {/* 4. Glowing Moon (Bulan Purnama / Sabit Kemilau) */}
        <g transform="translate(1130, 175)">
          {/* Outer Halo */}
          <circle cx="0" cy="0" r="190" fill="url(#moonHalo)" />
          <circle cx="0" cy="0" r="95" fill="#fef08a" opacity="0.12" />
          {/* Moon Body */}
          <circle cx="0" cy="0" r="52" fill="url(#moonSurface)" />
          {/* Subtle Moon Craters / Texture */}
          <circle cx="-14" cy="-12" r="9" fill="#facc15" opacity="0.18" />
          <circle cx="18" cy="10" r="13" fill="#facc15" opacity="0.15" />
          <circle cx="-6" cy="22" r="6" fill="#facc15" opacity="0.15" />
        </g>

        {/* 5. Soft Twilight Clouds */}
        <g fill="#818cf8" opacity="0.06">
          <path d="M920 210 C960 195, 1020 195, 1060 210 C1100 200, 1150 205, 1180 220 L900 220 Z" />
          <path d="M180 290 C230 275, 310 275, 360 292 C400 282, 450 285, 480 298 L160 298 Z" />
        </g>

        {/* 6. Distant Mountain Range (Pegunungan Jauh) */}
        <path
          d="M0 680 L0 540 L110 470 L230 535 L380 430 L520 520 L670 445 L830 530 L990 420 L1140 505 L1290 440 L1440 510 L1440 900 L0 900 Z"
          fill="url(#farMount)"
        />

        {/* Mist Layer 1 */}
        <rect x="0" y="490" width="1440" height="120" fill="url(#mistGrad)" />

        {/* 7. Midground Mountain Range */}
        <path
          d="M0 720 L0 590 L160 525 L310 595 L490 500 L660 605 L810 535 L980 610 L1170 515 L1330 585 L1440 545 L1440 900 L0 900 Z"
          fill="url(#midMount)"
        />

        {/* 8. Foreground Hills (Bukit Kiri & Kanan) */}
        <path
          d="M0 640 Q 260 615, 520 685 T 1040 670 Q 1260 630, 1440 655 L1440 900 L0 900 Z"
          fill="url(#nearHill)"
        />

        {/* 9. Artistic Silhouette Trees - LEFT HILL (Pohon Rindang & Cemara) */}
        <g fill="#04060d">
          {/* Left Deciduous Canopy Tree (Pohon Bercabang Indah di Bukit Kiri) */}
          <path
            d="M85 655 L85 520 L60 485 M85 545 L115 505 M85 530 L72 475"
            stroke="#04060d"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <ellipse cx="55" cy="480" rx="34" ry="22" />
          <ellipse cx="90" cy="465" rx="42" ry="26" />
          <ellipse cx="122" cy="498" rx="30" ry="20" />
          <ellipse cx="75" cy="498" rx="35" ry="20" />

          {/* Tall Pine Trees Left */}
          <polygon points="185,535 162,590 208,590" />
          <polygon points="185,565 156,625 214,625" />
          <polygon points="185,595 150,660 220,660" />

          <polygon points="235,565 218,610 252,610" />
          <polygon points="235,590 212,640 258,640" />
          <polygon points="235,615 207,670 263,670" />

          <polygon points="25,550 5,605 45,605" />
          <polygon points="25,580 0,645 52,645" />
        </g>

        {/* 10. Artistic Silhouette Trees - RIGHT HILL (Bawah Bulan) */}
        <g fill="#04060d">
          {/* Right Graceful Tree Under the Moon */}
          <path
            d="M1320 660 L1320 510 L1285 470 M1320 540 L1355 495 M1320 520 L1330 465"
            stroke="#04060d"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <ellipse cx="1280" cy="465" rx="38" ry="24" />
          <ellipse cx="1325" cy="450" rx="46" ry="28" />
          <ellipse cx="1362" cy="488" rx="34" ry="22" />
          <ellipse cx="1310" cy="485" rx="36" ry="22" />

          {/* Right Pine Trees */}
          <polygon points="1215,545 1192,600 1238,600" />
          <polygon points="1215,575 1185,635 1245,635" />
          <polygon points="1215,605 1180,670 1250,670" />

          <polygon points="1395,555 1375,605 1415,605" />
          <polygon points="1395,585 1368,645 1422,645" />
          <polygon points="1395,615 1362,675 1428,675" />
        </g>

        {/* 11. Subtle Golden Fireflies Near the Trees */}
        <g fill="#facc15">
          <circle cx="145" cy="540" r="2" opacity="0.75" />
          <circle cx="115" cy="450" r="1.5" opacity="0.6" />
          <circle cx="210" cy="570" r="1.8" opacity="0.5" />
          <circle cx="1260" cy="520" r="2.2" opacity="0.8" />
          <circle cx="1350" cy="440" r="1.6" opacity="0.65" />
          <circle cx="1180" cy="580" r="1.5" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
