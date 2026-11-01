import React from 'react';
import {
  Layers,
  Sparkles,
  BarChart2,
  Share2,
  ChevronDown,
  Eye,
  Edit3,
  Flame,
  Lock,
} from 'lucide-react';
import OrixMascot from './OrixMascot';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onOpenExport,
  onOpenFirebase,
  isCloudConnected,
  slug,
  viewMode,
  setViewMode,
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#070a14]/90 backdrop-blur-xl border-b border-[#818cf8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* LOGO & BRAND IDENTITY (ORIX CYBER OWL + OPIKZ) */}
        <div className="flex items-center gap-3">
          <OrixMascot className="w-10 h-10 shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white tracking-tight text-base">
                OPIKZ<span className="text-[#facc15] italic ml-0.5">STUDIO</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs bg-[#0f172a] text-[#cbd5e1] border border-[#818cf8]/30">
                <span className="text-[#e11d48]">[</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#facc15] animate-pulse"></span>
                <span className="text-[#facc15]">AUTO-SYNC</span>
                <span className="text-[#38bdf8]">]</span>
              </span>
            </div>
            <p className="text-[11px] text-[#cbd5e1] hidden sm:flex items-center gap-1.5">
              <span>
                opik.link/
                <span className="font-mono text-[#38bdf8] font-semibold">
                  @{slug}
                </span>
              </span>
              <span className="text-[#e11d48]">•</span>
              <span className="italic text-[#cbd5e1]/75 text-[10px]">
                "Hiduplah seperti Larry"
              </span>
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION (Pill-Shaped Sesuai Brand Guidelines) */}
        {viewMode === 'editor' ? (
          <nav className="flex items-center bg-[#0f172a]/90 p-1 rounded-full border border-[#818cf8]/25 shadow-inner">
            <button
              onClick={() => setActiveTab('links')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'links'
                  ? 'bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/60 shadow-[0_0_12px_rgba(250,204,21,0.2)]'
                  : 'text-[#cbd5e1] hover:text-white border border-transparent'
              }`}
            >
              <Layers className="w-4 h-4 text-[#38bdf8]" />
              <span>Tautan</span>
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'appearance'
                  ? 'bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/60 shadow-[0_0_12px_rgba(250,204,21,0.2)]'
                  : 'text-[#cbd5e1] hover:text-white border border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#facc15]" />
              <span>Tampilan & FX</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/60 shadow-[0_0_12px_rgba(250,204,21,0.2)]'
                  : 'text-[#cbd5e1] hover:text-white border border-transparent'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-[#818cf8]" />
              <span>Analitik</span>
            </button>
          </nav>
        ) : null}

        {/* RIGHT CONTROLS (Pill-Shaped Ghost Buttons with #facc15 Hover) */}
        <div className="flex items-center gap-2">
          {/* Toggle View Mode (Editor vs Live Bio) */}
          <button
            onClick={() => setViewMode(viewMode === 'editor' ? 'preview' : 'editor')}
            className="ghost-pill-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#cbd5e1] hover:text-[#facc15]"
            title={viewMode === 'editor' ? 'Lihat Halaman Publik Penuh' : 'Kembali ke Studio Editor'}
          >
            {viewMode === 'editor' ? (
              <>
                <Eye className="w-4 h-4 text-[#38bdf8]" />
                <span className="hidden md:inline">Mode Publik</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-[#facc15]" />
                <span className="hidden md:inline">Mode Editor</span>
              </>
            )}
          </button>

          {/* Cloud Database (Firebase) */}
          <button
            onClick={onOpenFirebase}
            className={`ghost-pill-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold ${
              isCloudConnected
                ? 'text-[#facc15] border-[#facc15]/40'
                : 'text-[#cbd5e1]'
            }`}
            title="Pengaturan Database Cloud Firestore"
          >
            <Flame className={`w-4 h-4 ${isCloudConnected ? 'text-[#facc15] fill-[#facc15]' : 'text-[#cbd5e1]'}`} />
            <span className="hidden md:inline">
              {isCloudConnected ? 'Cloud Aktif' : 'Hubungkan Cloud'}
            </span>
          </button>

          {/* User Account / Firebase Admin Login */}
          <button
            onClick={onOpenAuth}
            className={`ghost-pill-btn flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium ${
              currentUser
                ? 'text-white border-emerald-400/50'
                : 'text-[#cbd5e1]'
            }`}
            title={currentUser ? `Admin: ${currentUser.email}` : 'Masuk sebagai Admin'}
          >
            {currentUser ? (
              <>
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser.email}`}
                  alt="Avatar"
                  className="w-5 h-5 rounded-full bg-[#1f1430] border border-[#facc15] object-cover"
                />
                <span className="max-w-[110px] truncate hidden md:inline font-bold text-[#facc15]">
                  {currentUser.email.split('@')[0]}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="hidden md:inline font-semibold">Login Admin</span>
              </>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-[#cbd5e1]/60" />
          </button>

          {/* Export / Download */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs sm:text-sm font-bold transition shadow-[0_0_16px_rgba(250,204,21,0.3)] active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Publikasi & Download</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
