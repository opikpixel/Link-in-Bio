import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SocialIcon from './SocialIcon';
import OrixMascot from './OrixMascot';
import {
  ParticleEffectLayer,
  TypewriterRole,
  KineticHeader,
  InfiniteMottoTicker,
  BracketTechBadge,
} from './SpecialEffects';

export default function PhonePreview({
  profile,
  appearance,
  links,
  onLinkClick,
}) {
  const activeLinks = links.filter((l) => l.enabled !== false);
  const particleMode = appearance.particleEffect || 'cyber-fireflies';
  const isPillGhost = (appearance.buttonStyle || 'pill-ghost') === 'pill-ghost';
  const isTypewriterOn = appearance.enableTypewriter !== false;
  const isKineticOn = Boolean(appearance.enableKineticHeader);
  const isTechBracketsOn = appearance.enableTechBrackets !== false;
  const isMottoTickerOn = appearance.enableMottoTicker !== false;
  const isOrixBadgeOn = appearance.showOrixBadge !== false;

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
    <div className="flex flex-col items-center">
      <div className="mb-3 flex items-center gap-2 text-xs font-mono font-bold text-[#cbd5e1]">
        <BracketTechBadge accent="yellow">LIVE // PREVIEW</BracketTechBadge>
      </div>

      {/* PHONE FRAME */}
      <div className="w-[345px] h-[690px] rounded-[48px] p-3 bg-[#070a14] shadow-[0_0_40px_rgba(99,102,241,0.18)] border-2 border-[#818cf8]/35 relative select-none">
        {/* DYNAMIC SCREEN */}
        <div
          className={`w-full h-full rounded-[38px] overflow-y-auto relative flex flex-col justify-between transition-all ${getBackgroundClass()}`}
          style={{
            ...getBackgroundStyle(),
            color: appearance.textColor || '#FFFFFF',
          }}
        >
          {/* Particle Effect Layer */}
          <ParticleEffectLayer mode={particleMode} compact={true} />

          {/* Custom Image Wallpaper Layer */}
          {appearance.bgMode === 'image' && appearance.customImageData && (
            <div
              className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(7,10,20,${
                  (appearance.imageOverlayOpacity || 45) / 100
                }), rgba(31,20,48,${
                  (appearance.imageOverlayOpacity || 45) / 100
                })), url('${appearance.customImageData}')`,
              }}
            ></div>
          )}

          {/* SCREEN CONTENT */}
          <div className="relative z-10 px-4 pt-8 pb-6 flex-1 flex flex-col items-center text-center">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-[#070a14]/70 backdrop-blur-md border border-[#818cf8]/25 rounded-full mb-5 flex items-center justify-center">
              <div className="w-10 h-1 bg-[#38bdf8]/50 rounded-full"></div>
            </div>

            {/* Avatar + Orix Cyber Owl Badge */}
            <div className="relative mb-3 group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-[0_0_20px_rgba(250,204,21,0.2)] border-2 border-[#facc15]/60 bg-white/10"
              />
              {isOrixBadgeOn && (
                <div
                  className="absolute -bottom-2 -right-2"
                  title="ORIX - The Cyber Owl"
                >
                  <OrixMascot className="w-7 h-7" />
                </div>
              )}
            </div>

            {/* Nama (Kinetic Header atau Standar) */}
            <KineticHeader
              text={profile.name || 'Lutfi Alhamsyah'}
              enabled={isKineticOn}
              size="sm"
            />

            {/* Role (Typewriter Indicator) */}
            {profile.role && (
              <div className="mt-1">
                <TypewriterRole
                  roleText={profile.role}
                  enabled={isTypewriterOn}
                  className="text-[11px] font-medium opacity-90"
                />
              </div>
            )}

            {/* Infinite Seamless Looping Motto Ticker */}
            <InfiniteMottoTicker
              text={
                appearance.mottoText ||
                'HIDUPLAH SEPERTI LARRY • THE SAGE & THE CREATOR • ANALITIS • VISIONER • EKSEKUTOR'
              }
              enabled={isMottoTickerOn}
              compact={true}
            />

            {/* Bio */}
            {profile.bio && (
              <p className="text-xs opacity-80 mt-1.5 max-w-[260px] leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Links List */}
            <div className="w-full mt-5 space-y-2.5 text-left">
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
                    className={`glass-btn flex items-center gap-3 w-full py-2.5 px-3.5 transition-all duration-200 active:scale-[0.98] group ${
                      isPillGhost
                        ? 'ghost-pill-btn rounded-full'
                        : `rounded-2xl hover:-translate-y-0.5 hover:border-[#facc15] ${
                            isTechBracketsOn ? 'tech-corner-box' : ''
                          }`
                    }`}
                  >
                    {/* Icon Box */}
                    <div
                      className={`w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden border border-[#38bdf8]/35 bg-[#070a14]/70 text-[#38bdf8] group-hover:text-[#facc15] group-hover:border-[#facc15]/60 transition ${
                        isPillGhost ? 'rounded-full' : 'rounded-xl'
                      }`}
                    >
                      <SocialIcon
                        type={item.iconType}
                        value={item.iconValue}
                        className="w-4 h-4"
                      />
                    </div>

                    {/* Title */}
                    <div className="font-semibold text-xs sm:text-sm truncate flex-1 group-hover:text-[#facc15] transition">
                      {item.title}
                    </div>

                    {/* Bracket Accent or Arrow */}
                    {isTechBracketsOn && isPillGhost ? (
                      <span className="text-[10px] font-mono text-[#e11d48] group-hover:text-[#facc15] transition">
                        [↗]
                      </span>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-[#facc15] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition shrink-0" />
                    )}
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Footer in phone */}
          <div className="relative z-10 pb-4 text-center text-[10px] font-mono opacity-45">
            [ OPIKZ // ORIX SYSTEM ]
          </div>
        </div>
      </div>
    </div>
  );
}
