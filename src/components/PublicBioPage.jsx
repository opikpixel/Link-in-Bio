import React, { useState } from 'react';
import { ArrowUpRight, Share2, Check, ExternalLink, SlidersHorizontal } from 'lucide-react';
import SocialIcon from './SocialIcon';

export default function PublicBioPage({
  profile,
  appearance,
  links,
  onLinkClick,
  onBackToEditor,
}) {
  const [copied, setCopied] = useState(false);
  const activeLinks = links.filter((l) => l.enabled !== false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: profile.name,
          text: profile.bio,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getBackgroundClass = () => {
    if (appearance.bgMode === 'aurora') {
      return `aurora-bg ${appearance.auroraClass || 'aurora-northern'}`;
    }
    return '';
  };

  const getBackgroundStyle = () => {
    if (appearance.bgMode === 'solid') {
      return { backgroundColor: appearance.solidBgColor || '#090D16' };
    }
    return {};
  };

  return (
    <div
      className={`min-h-screen w-full relative flex flex-col justify-between items-center px-4 py-12 transition-all ${getBackgroundClass()}`}
      style={{
        ...getBackgroundStyle(),
        color: appearance.textColor || '#FFFFFF',
      }}
    >
      {/* Background Image Layer */}
      {appearance.bgMode === 'image' && appearance.customImageData && (
        <div
          className="fixed inset-0 bg-cover bg-center z-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,${
              (appearance.imageOverlayOpacity || 45) / 100
            }), rgba(0,0,0,${
              (appearance.imageOverlayOpacity || 45) / 100
            })), url('${appearance.customImageData}')`,
          }}
        ></div>
      )}

      {/* FLOATING TOP ACTION (Studio Mode & Share) */}
      <div className="relative z-20 w-full max-w-md flex items-center justify-between mb-4">
        {onBackToEditor ? (
          <button
            onClick={onBackToEditor}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 transition active:scale-95 text-white/80 flex items-center gap-1.5 shadow-sm"
            title="Masuk ke Mode Studio Editor"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Studio</span>
          </button>
        ) : (
          <div></div>
        )}

        <button
          onClick={handleShare}
          className="p-2.5 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/15 transition active:scale-95 text-white shadow-sm"
          title="Bagikan Tautan Profil"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4 group">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-3xl object-cover shadow-2xl border-2 border-white/30 bg-white/10"
          />
        </div>

        {/* Nama & Tagline */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          {profile.name}
        </h1>
        {profile.role && (
          <p className="text-xs sm:text-sm font-medium opacity-85 mt-1">
            {profile.role}
          </p>
        )}

        {/* Bio */}
        {profile.bio && (
          <p className="text-xs sm:text-sm opacity-80 mt-2.5 max-w-sm leading-relaxed px-2">
            {profile.bio}
          </p>
        )}

        {/* Links List */}
        <div className="w-full mt-8 space-y-3 text-left">
          {activeLinks.map((item, idx) => (
            <a
              key={item.id || idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (onLinkClick) onLinkClick(item.id);
              }}
              style={{
                background: appearance.cardBgColor || 'rgba(255,255,255,0.12)',
                color: appearance.cardTextColor || '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
              className="glass-btn flex items-center justify-between gap-3 w-full p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98] group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 overflow-hidden border border-white/20 group-hover:bg-white/30 transition">
                  <SocialIcon
                    type={item.iconType}
                    value={item.iconValue}
                    className="w-5 h-5"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-sm sm:text-base truncate">
                    {item.title}
                  </h2>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
            </a>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 mt-12 text-center text-xs opacity-50 space-y-1">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p className="text-[10px]">Ditenagai oleh OpikLink Studio</p>
      </footer>
    </div>
  );
}
