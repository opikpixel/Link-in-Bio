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
    <header className="sticky top-0 z-30 bg-[#070a14]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* MINIMALIST BRAND LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#facc15] text-[#070a14] border-2 border-[#070a14] shadow-[2px_2px_0px_#04060e] flex items-center justify-center font-black text-base tracking-tight">
            OL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-tight text-base">
                OpikLink
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-900/90 text-[#cbd5e1] border border-slate-700/80">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Auto-Sync</span>
              </span>
            </div>
            <p className="text-[11px] text-[#cbd5e1]/75 hidden sm:block font-mono">
              opik.link/<span className="text-[#facc15]">@{slug}</span>
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION (Minimalist Tactile Tabs Mengacu pada Referensi) */}
        {viewMode === 'editor' ? (
          <nav className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('links')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'links'
                  ? 'tactile-tab-active'
                  : 'tactile-tab-inactive'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tautan</span>
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'appearance'
                  ? 'tactile-tab-active'
                  : 'tactile-tab-inactive'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tampilan</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'tactile-tab-active'
                  : 'tactile-tab-inactive'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Analitik</span>
            </button>
          </nav>
        ) : null}

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Toggle View Mode (Editor vs Live Bio) */}
          <button
            onClick={() => setViewMode(viewMode === 'editor' ? 'preview' : 'editor')}
            className="ghost-pill-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#cbd5e1] hover:text-white"
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
            className="ghost-pill-btn flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#cbd5e1] hover:text-white"
            title="Pengaturan Database Cloud Firestore"
          >
            <Flame className={`w-4 h-4 ${isCloudConnected ? 'text-[#facc15] fill-[#facc15]' : 'text-slate-400'}`} />
            <span className="hidden md:inline">
              {isCloudConnected ? 'Cloud' : 'Connect'}
            </span>
          </button>

          {/* User Account / Firebase Admin Login */}
          <button
            onClick={onOpenAuth}
            className="ghost-pill-btn flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-[#cbd5e1] hover:text-white"
            title={currentUser ? `Admin: ${currentUser.email}` : 'Masuk sebagai Admin'}
          >
            {currentUser ? (
              <>
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser.email}`}
                  alt="Avatar"
                  className="w-5 h-5 rounded-full bg-slate-800 border border-[#facc15] object-cover"
                />
                <span className="max-w-[90px] truncate hidden md:inline font-semibold text-white">
                  {currentUser.email.split('@')[0]}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#facc15]" />
                <span className="hidden md:inline font-semibold">Login</span>
              </>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Export / Download */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] border-2 border-[#070a14] shadow-[2px_2px_0px_#04060e] text-xs sm:text-sm font-bold transition active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Publikasi</span>
          </button>
        </div>
      </div>
    </header>
  );
}
