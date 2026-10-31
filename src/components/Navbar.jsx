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
  ShieldCheck,
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
    <header className="sticky top-0 z-30 bg-[#F4F3EF]/90 backdrop-blur-md border-b border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* LOGO & STATUS */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-lg tracking-tight shadow-sm">
            O<span className="font-serif italic font-normal text-amber-300">L</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-900 tracking-tight text-base">
                OpikLink
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>{' '}
                Tersimpan Otomatis
              </span>
            </div>
            <p className="text-xs text-zinc-500 hidden sm:block">
              opik.link/
              <span className="font-mono text-zinc-800 font-medium">
                @{slug}
              </span>
            </p>
          </div>
        </div>

        {/* TAB NAVIGATION (Hanya tampil di mode Editor) */}
        {viewMode === 'editor' ? (
          <nav className="flex items-center bg-zinc-200/70 p-1 rounded-xl border border-zinc-300/60">
            <button
              onClick={() => setActiveTab('links')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'links'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Tautan</span>
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'appearance'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tampilan</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'analytics'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Analitik</span>
            </button>
          </nav>
        ) : null}

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Toggle View Mode (Editor vs Live Bio) */}
          <button
            onClick={() => setViewMode(viewMode === 'editor' ? 'preview' : 'editor')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 text-xs sm:text-sm font-medium text-zinc-800 transition"
            title={viewMode === 'editor' ? 'Lihat Halaman Publik Penuh' : 'Kembali ke Studio Editor'}
          >
            {viewMode === 'editor' ? (
              <>
                <Eye className="w-4 h-4 text-purple-600" />
                <span className="hidden md:inline">Mode Publik</span>
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4 text-zinc-800" />
                <span className="hidden md:inline">Mode Editor</span>
              </>
            )}
          </button>

          {/* Cloud Database (Firebase) */}
          <button
            onClick={onOpenFirebase}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-semibold transition ${
              isCloudConnected
                ? 'bg-amber-500/10 border-amber-300 text-amber-800 hover:bg-amber-500/20 shadow-2xs'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-2xs'
            }`}
            title="Pengaturan Database Cloud Firestore"
          >
            <Flame className={`w-4 h-4 ${isCloudConnected ? 'text-amber-500 fill-amber-500' : 'text-zinc-400'}`} />
            <span className="hidden md:inline">
              {isCloudConnected ? 'Cloud Aktif' : 'Hubungkan Cloud'}
            </span>
          </button>

          {/* User Account / Firebase Admin Login */}
          <button
            onClick={onOpenAuth}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition shadow-2xs ${
              currentUser
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 hover:bg-emerald-100/70'
                : 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
            }`}
            title={currentUser ? `Admin: ${currentUser.email}` : 'Masuk sebagai Admin'}
          >
            {currentUser ? (
              <>
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser.email}`}
                  alt="Avatar"
                  className="w-5 h-5 rounded-full bg-emerald-200 object-cover"
                />
                <span className="max-w-[110px] truncate hidden md:inline font-bold">
                  {currentUser.email.split('@')[0]}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-zinc-500" />
                <span className="hidden md:inline font-semibold">Login Admin</span>
              </>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Export / Download */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-medium transition shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Publikasi & Download</span>
            <span className="sm:hidden">Share</span>
          </button>
        </div>
      </div>
    </header>
  );
}
