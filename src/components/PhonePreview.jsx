import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SocialIcon from './SocialIcon';

export default function PhonePreview({
  profile,
  appearance,
  links,
  onLinkClick,
}) {
  const activeLinks = links.filter((l) => l.enabled !== false);

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
    <div className="flex flex-col items-center">
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-zinc-500">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Live Mobile Preview</span>
      </div>

      {/* PHONE FRAME */}
      <div className="w-[340px] h-[680px] rounded-[48px] p-3 bg-zinc-900 shadow-2xl border-4 border-zinc-800 relative select-none">
        {/* DYNAMIC SCREEN */}
        <div
          className={`w-full h-full rounded-[38px] overflow-y-auto relative flex flex-col justify-between transition-all ${getBackgroundClass()}`}
          style={{
            ...getBackgroundStyle(),
            color: appearance.textColor || '#FFFFFF',
          }}
        >
          {/* Custom Image Wallpaper Layer */}
          {appearance.bgMode === 'image' && appearance.customImageData && (
            <div
              className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,${
                  (appearance.imageOverlayOpacity || 45) / 100
                }), rgba(0,0,0,${
                  (appearance.imageOverlayOpacity || 45) / 100
                })), url('${appearance.customImageData}')`,
              }}
            ></div>
          )}

          {/* SCREEN CONTENT */}
          <div className="relative z-10 px-5 pt-10 pb-8 flex-1 flex flex-col items-center text-center">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-zinc-900/60 backdrop-blur-md rounded-full mb-6 flex items-center justify-center">
              <div className="w-10 h-1 bg-zinc-700 rounded-full"></div>
            </div>

            {/* Avatar */}
            <div className="relative mb-3 group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white/20 bg-white/10"
              />
            </div>

            {/* Nama & Role */}
            <h1 className="text-lg font-bold tracking-tight">
              {profile.name || 'Nama Anda'}
            </h1>
            {profile.role && (
              <p className="text-xs font-medium opacity-80 mt-0.5">
                {profile.role}
              </p>
            )}

            {/* Bio */}
            {profile.bio && (
              <p className="text-xs opacity-75 mt-2 max-w-[260px] leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Links List */}
            <div className="w-full mt-6 space-y-2.5 text-left">
              {activeLinks.length === 0 ? (
                <div className="text-xs opacity-50 py-8 text-center">
                  Belum ada tautan aktif
                </div>
              ) : (
                activeLinks.map((item, idx) => (
                  <a
                    key={item.id || idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (onLinkClick) onLinkClick(item.id);
                    }}
                    style={{
                      background: appearance.cardBgColor || 'rgba(255,255,255,0.12)',
                      color: appearance.cardTextColor || '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.20)',
                    }}
                    className="glass-btn flex items-center gap-3 w-full py-3 px-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-sm group"
                  >
                    {/* Icon Box */}
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0 overflow-hidden border border-white/20 group-hover:bg-white/25 transition">
                      <SocialIcon
                        type={item.iconType}
                        value={item.iconValue}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* Title */}
                    <div className="font-semibold text-xs sm:text-sm truncate flex-1">
                      {item.title}
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Footer in phone */}
          <div className="relative z-10 pb-5 text-center text-[10px] opacity-40">
            Dibuat dengan OpikLink
          </div>
        </div>
      </div>
    </div>
  );
}
