import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SocialIcon from './SocialIcon';
import OrixMascot from './OrixMascot';
import MaghribLandscapeWallpaper from './MaghribLandscapeWallpaper';
import {
  ParticleEffectLayer,
  TypewriterRole,
  KineticHeader,
  SectionPillTag,
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
  const isOrixPetOn = appearance.showOrixPet !== false;
  const isScenicOn = appearance.showScenicLandscape !== false;

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
      <div className="mb-3">
        <SectionPillTag code="LIVE" label="MOBILE PREVIEW" />
      </div>

      {/* PHONE FRAME */}
      <div className="w-[345px] h-[690px] rounded-[48px] p-3 bg-[#070a14] border-2 border-slate-700/80 shadow-[6px_6px_0px_#04060e] relative select-none">
        {/* DYNAMIC SCREEN */}
        <div
          className={`w-full h-full rounded-[38px] overflow-y-auto relative flex flex-col justify-between transition-all ${getBackgroundClass()}`}
          style={{
            ...getBackgroundStyle(),
            color: appearance.textColor || '#FFFFFF',
          }}
        >
          {/* Scenic Landscape (Moon, Trees & Mountains) */}
          {appearance.bgMode === 'aurora' && isScenicOn && (
            <MaghribLandscapeWallpaper className="absolute inset-0 pointer-events-none z-0 opacity-90" />
          )}

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
          <div className="relative z-10 px-4 pt-7 pb-6 flex-1 flex flex-col items-center text-center">
            {/* Phone Speaker Notch */}
            <div className="w-20 h-3.5 bg-[#070a14]/80 border border-slate-700/70 rounded-full mb-5 flex items-center justify-center">
              <div className="w-8 h-1 bg-slate-600 rounded-full"></div>
            </div>

            {/* Avatar (Bersih tanpa badge tempelan) */}
            <div className="relative mb-3">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-[#facc15] bg-[#070a14]"
              />
            </div>

            {/* Nama */}
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
                  className="text-[11px] font-medium text-[#cbd5e1]"
                />
              </div>
            )}

            {/* Bio */}
            {profile.bio && (
              <p className="text-xs opacity-80 mt-2 max-w-[255px] leading-relaxed">
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
                            background: 'rgba(15, 23, 42, 0.82)',
                            color: appearance.cardTextColor || '#FFFFFF',
                          }
                        : {
                            background: appearance.cardBgColor || 'rgba(15, 23, 42, 0.80)',
                            color: appearance.cardTextColor || '#FFFFFF',
                            border: '1.5px solid rgba(148, 163, 184, 0.28)',
                          }
                    }
                    className={`glass-btn flex items-center gap-3 w-full py-2.5 px-3.5 transition-all duration-200 active:scale-[0.98] group ${
                      isPillGhost
                        ? 'ghost-pill-btn rounded-full'
                        : 'rounded-2xl hover:border-[#facc15]'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center shrink-0 overflow-hidden border border-slate-700 bg-[#070a14]/80 text-[#38bdf8] group-hover:text-[#facc15] group-hover:border-[#facc15]/60 transition ${
                        isPillGhost ? 'rounded-full' : 'rounded-xl'
                      }`}
                    >
                      <SocialIcon
                        type={item.iconType}
                        value={item.iconValue}
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="font-semibold text-xs sm:text-sm truncate flex-1 group-hover:text-[#facc15] transition">
                      {item.title}
                    </div>

                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-[#facc15] transition shrink-0" />
                  </a>
                ))
              )}
            </div>

            {/* INTERACTIVE PET ORIX DI DALAM PREVIEW */}
            {isOrixPetOn && (
              <OrixMascot compact={true} customName={profile.name?.split(' ')[0]} />
            )}
          </div>

          {/* Footer in phone */}
          <div className="relative z-10 pb-4 text-center text-[10px] font-mono opacity-45">
            © {profile.name}
          </div>
        </div>
      </div>
    </div>
  );
}
