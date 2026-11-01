import React, { useState } from 'react';
import { ArrowUpRight, Share2, Check, SlidersHorizontal } from 'lucide-react';
import SocialIcon from './SocialIcon';
import OrixMascot from './OrixMascot';
import {
  ParticleEffectLayer,
  TypewriterRole,
  KineticHeader,
  InfiniteMottoTicker,
} from './SpecialEffects';

export default function PublicBioPage({
  profile,
  appearance,
  links,
  onLinkClick,
  onBackToEditor,
}) {
  const [copied, setCopied] = useState(false);
  const activeLinks = links.filter((l) => l.enabled !== false);

  const particleMode = appearance.particleEffect || 'cyber-fireflies';
  const isPillGhost = (appearance.buttonStyle || 'pill-ghost') === 'pill-ghost';
  const isTypewriterOn = appearance.enableTypewriter !== false;
  const isKineticOn = Boolean(appearance.enableKineticHeader);
  const isTechBracketsOn = appearance.enableTechBrackets !== false;
  const isMottoTickerOn = appearance.enableMottoTicker !== false;
  const isOrixBadgeOn = appearance.showOrixBadge !== false;

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
      return `aurora-bg ${appearance.auroraClass || 'aurora-maghrib'}`;
    }
    return '';
  };

  const getBackgroundStyle = () => {
    if (appearance.bgMode === 'solid') {
      return { backgroundColor: appearance.solidBgColor || '#070a14' };
    }
    return {};
  };

  return (
    <div
      className={`min-h-screen w-full relative flex flex-col justify-between items-center px-4 py-10 transition-all overflow-hidden ${getBackgroundClass()}`}
      style={{
        ...getBackgroundStyle(),
        color: appearance.textColor || '#FFFFFF',
      }}
    >
      {/* Background Particle Layer */}
      <ParticleEffectLayer mode={particleMode} compact={false} />

      {/* Background Image Layer */}
      {appearance.bgMode === 'image' && appearance.customImageData && (
        <div
          className="fixed inset-0 bg-cover bg-center z-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(7,10,20,${
              (appearance.imageOverlayOpacity || 45) / 100
            }), rgba(31,20,48,${
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
            className="ghost-pill-btn px-3.5 py-1.5 text-xs font-semibold text-[#cbd5e1] hover:text-[#facc15] flex items-center gap-1.5 shadow-sm"
            title="Masuk ke Mode Studio Editor"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Studio</span>
          </button>
        ) : (
          <div></div>
        )}

        <button
          onClick={handleShare}
          className="ghost-pill-btn p-2.5 text-white hover:text-[#facc15] shadow-sm"
          title="Bagikan Tautan Profil"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4 text-[#38bdf8]" />
          )}
        </button>
      </div>

      {/* MAIN CONTAINER (Hero-Centric Approach) */}
      <main className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center text-center">
        {/* Avatar + Orix Cyber Owl Mascot Badge */}
        <div className="relative mb-4 group">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-3xl object-cover shadow-[0_0_28px_rgba(250,204,21,0.22)] border-2 border-[#facc15]/60 bg-white/10"
          />
          {isOrixBadgeOn && (
            <div
              className="absolute -bottom-2 -right-2"
              title="ORIX - The Cyber Owl"
            >
              <OrixMascot className="w-9 h-9" />
            </div>
          )}
        </div>

        {/* Nama (Kinetic Header atau Standar) */}
        <KineticHeader
          text={profile.name}
          enabled={isKineticOn}
          size="md"
        />

        {/* Role (Typewriter Role Indicator) */}
        {profile.role && (
          <div className="mt-1.5">
            <TypewriterRole
              roleText={profile.role}
              enabled={isTypewriterOn}
              className="text-xs sm:text-sm font-medium opacity-90"
            />
          </div>
        )}

        {/* Infinite Seamless Looping Ticker */}
        <InfiniteMottoTicker
          text={
            appearance.mottoText ||
            'HIDUPLAH SEPERTI LARRY • THE SAGE & THE CREATOR • ANALITIS • VISIONER • EKSEKUTOR'
          }
          enabled={isMottoTickerOn}
          compact={false}
        />

        {/* Bio */}
        {profile.bio && (
          <p className="text-xs sm:text-sm opacity-85 mt-2 max-w-sm leading-relaxed px-2">
            {profile.bio}
          </p>
        )}

        {/* Links List */}
        <div className="w-full mt-7 space-y-3 text-left">
          {activeLinks.map((item, idx) => (
            <a
              key={item.id || idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (onLinkClick) onLinkClick(item.id);
              }}
              style={
                isPillGhost
                  ? {
                      background: 'rgba(15, 23, 42, 0.80)',
                      color: appearance.cardTextColor || '#FFFFFF',
                    }
                  : {
                      background: appearance.cardBgColor || 'rgba(15, 23, 42, 0.75)',
                      color: appearance.cardTextColor || '#FFFFFF',
                      border: '1px solid rgba(129, 140, 248, 0.25)',
                    }
              }
              className={`glass-btn flex items-center justify-between gap-3 w-full p-3.5 sm:p-4 transition-all duration-300 active:scale-[0.98] group ${
                isPillGhost
                  ? 'ghost-pill-btn rounded-full'
                  : `rounded-2xl hover:-translate-y-1 hover:border-[#facc15] hover:shadow-xl ${
                      isTechBracketsOn ? 'tech-corner-box' : ''
                    }`
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 bg-[#070a14]/75 flex items-center justify-center shrink-0 overflow-hidden border border-[#38bdf8]/35 text-[#38bdf8] group-hover:text-[#facc15] group-hover:border-[#facc15]/60 transition ${
                    isPillGhost ? 'rounded-full' : 'rounded-xl'
                  }`}
                >
                  <SocialIcon
                    type={item.iconType}
                    value={item.iconValue}
                    className="w-5 h-5"
                  />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-sm sm:text-base truncate group-hover:text-[#facc15] transition">
                    {item.title}
                  </h2>
                </div>
              </div>

              {isTechBracketsOn && isPillGhost ? (
                <span className="text-xs font-mono font-bold text-[#e11d48] group-hover:text-[#facc15] pr-1 transition">
                  [↗]
                </span>
              ) : (
                <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:text-[#facc15] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
              )}
            </a>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 mt-12 text-center text-xs opacity-60 space-y-1">
        <p className="font-semibold">© {new Date().getFullYear()} {profile.name}</p>
        <p className="text-[10px] font-mono text-[#38bdf8]">
          [ OPIKZ // ORIX CYBER STUDIO ]
        </p>
      </footer>
    </div>
  );
}
