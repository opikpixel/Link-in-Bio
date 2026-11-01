import React from 'react';
import {
  Upload,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Wand2,
  Terminal,
  Type,
  Cpu,
  Repeat,
  Shield,
} from 'lucide-react';
import { AURORA_PRESETS, PARTICLE_PRESETS, compressImageFile } from '../data/defaultState';
import { BracketTechBadge } from './SpecialEffects';
import OrixMascot from './OrixMascot';

export default function AppearanceEditor({
  profile,
  setProfile,
  appearance,
  setAppearance,
  showToast,
}) {
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    compressImageFile(file, 320, 0.85, (b64) => {
      setProfile({ ...profile, avatar: b64 });
      showToast('Foto profil berhasil diperbarui');
    });
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    compressImageFile(file, 1000, 0.75, (b64) => {
      setAppearance({
        ...appearance,
        bgMode: 'image',
        customImageData: b64,
      });
      showToast('Gambar wallpaper berhasil diunggah');
    });
  };

  const selectPreset = (preset) => {
    setAppearance({
      ...appearance,
      bgMode: 'aurora',
      auroraClass: preset.class,
      textColor: preset.textColor,
      cardBgColor: preset.cardBgColor,
      cardTextColor: preset.cardTextColor,
    });
    showToast(`Tema ${preset.name} dipilih`);
  };

  const applyOpikzSignatureBrand = () => {
    setAppearance({
      ...appearance,
      bgMode: 'aurora',
      auroraClass: 'aurora-maghrib',
      solidBgColor: '#070a14',
      textColor: '#FFFFFF',
      cardBgColor: 'rgba(15, 23, 42, 0.80)',
      cardTextColor: '#FFFFFF',
      buttonStyle: 'pill-ghost',
      particleEffect: 'cyber-fireflies',
      enableTypewriter: true,
      enableKineticHeader: true,
      enableTechBrackets: true,
      enableMottoTicker: true,
      showOrixBadge: true,
      mottoText:
        appearance.mottoText ||
        'HIDUPLAH SEPERTI LARRY • THE SAGE & THE CREATOR • ANALITIS • VISIONER • EKSEKUTOR',
    });
    showToast('Identitas Brand Maghrib Twilight (Opikz) diterapkan!');
  };

  const currentParticle = appearance.particleEffect || 'cyber-fireflies';
  const currentButtonStyle = appearance.buttonStyle || 'pill-ghost';
  const isTypewriterOn = appearance.enableTypewriter !== false;
  const isKineticOn = Boolean(appearance.enableKineticHeader);
  const isTechBracketsOn = appearance.enableTechBrackets !== false;
  const isMottoTickerOn = appearance.enableMottoTicker !== false;
  const isOrixBadgeOn = appearance.showOrixBadge !== false;

  return (
    <section className="space-y-6">
      {/* 1. IDENTITAS PROFIL */}
      <div className="maghrib-glass tech-corner-box rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <BracketTechBadge accent="yellow">IDENTITY // CORE</BracketTechBadge>
              <h2 className="text-base sm:text-lg font-extrabold text-[#facc15] tracking-tight italic">
                IDENTITAS PROFIL
              </h2>
            </div>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              Atur foto profil, nama, peran (role), dan deskripsi bio Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={applyOpikzSignatureBrand}
            className="ghost-pill-btn px-3.5 py-1.5 text-xs font-bold text-[#facc15] flex items-center gap-1.5 self-start sm:self-auto"
            title="Aktifkan semua pengaturan ciri khas Brand Lutfi (Opikz)"
          >
            <Wand2 className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Preset Brand Opikz</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
          <div className="relative">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#facc15]/50 bg-[#070a14] shrink-0 shadow-[0_0_15px_rgba(250,204,21,0.15)]"
            />
            {isOrixBadgeOn && (
              <div className="absolute -bottom-1.5 -right-1.5">
                <OrixMascot className="w-6 h-6" showGlow={false} />
              </div>
            )}
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap gap-2">
              <label className="px-4 py-1.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition shadow-[0_0_12px_rgba(250,204,21,0.25)]">
                <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Upload Foto Profil</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  const seed = Math.random().toString(36).substring(7);
                  setProfile({
                    ...profile,
                    avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`,
                  });
                  showToast('Avatar acak dibuat!');
                }}
                className="ghost-pill-btn px-3.5 py-1.5 text-[#cbd5e1] hover:text-[#facc15] text-xs font-semibold"
              >
                Acak Avatar
              </button>
            </div>
            <p className="text-[11px] text-[#cbd5e1]/75">
              Disarankan rasio 1:1 format JPG/PNG. Otomatis dikompresi untuk loading kilat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-[#facc15] mb-1">
              Nama Tampilan
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#070a14]/90 border border-[#818cf8]/30 text-sm text-white focus:outline-none focus:border-[#facc15] transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#38bdf8] mb-1">
              Role / Peran (Pisahkan dengan | untuk efek ketik)
            </label>
            <input
              type="text"
              value={profile.role}
              placeholder="IT Project Manager | IT Cloud | Informatics Student"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#070a14]/90 border border-[#818cf8]/30 text-sm text-white focus:outline-none focus:border-[#38bdf8] transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
            Bio Singkat
          </label>
          <textarea
            rows="2"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-[#070a14]/90 border border-[#818cf8]/30 text-sm text-white focus:outline-none focus:border-[#facc15] transition"
          ></textarea>
        </div>
      </div>

      {/* 2. EFEK KHUSUS & CIRI KHAS FUNGSIONAL (SIGNATURE FEATURES & PARTICLES) */}
      <div className="maghrib-glass tech-corner-box rounded-3xl p-5 sm:p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <BracketTechBadge accent="rose">SIGNATURE // FX</BracketTechBadge>
            <h2 className="text-base sm:text-lg font-extrabold text-[#facc15] tracking-tight italic">
              EFEK KHUSUS & CIRI KHAS BRAND
            </h2>
          </div>
          <p className="text-xs text-[#cbd5e1] mt-0.5">
            Kustomisasi partikel latar, animasi Typewriter, Kinetic Typography, dan elemen Sci-Fi Opikz.
          </p>
        </div>

        {/* PILIHAN EFEK PARTIKEL */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
            1. Efek Partikel Latar Belakang (Particle System)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PARTICLE_PRESETS.map((p) => {
              const active = currentParticle === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setAppearance({ ...appearance, particleEffect: p.id });
                    showToast(`Efek partikel: ${p.name}`);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-start justify-between gap-2 ${
                    active
                      ? 'bg-[#facc15]/10 border-[#facc15] shadow-[0_0_15px_rgba(250,204,21,0.15)]'
                      : 'bg-[#070a14]/70 border-[#818cf8]/25 hover:border-[#38bdf8]/60'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className={`w-3.5 h-3.5 ${active ? 'text-[#facc15]' : 'text-[#38bdf8]'}`} />
                      <span>{p.name}</span>
                    </div>
                    <p className="text-[11px] text-[#cbd5e1]/80 mt-0.5 leading-snug">
                      {p.desc}
                    </p>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                      active ? 'bg-[#facc15] shadow-[0_0_8px_#facc15]' : 'bg-slate-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* BENTUK & GAYA TOMBOL TAUTAN */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
            2. Bentuk & Gaya Tombol Tautan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setAppearance({ ...appearance, buttonStyle: 'pill-ghost' })}
              className={`p-3 rounded-full border text-center transition-all ${
                currentButtonStyle === 'pill-ghost'
                  ? 'bg-[#0f172a] border-[#facc15] text-[#facc15] shadow-[0_0_14px_rgba(250,204,21,0.2)]'
                  : 'bg-[#070a14]/70 border-[#818cf8]/25 text-[#cbd5e1] hover:border-[#facc15]/50'
              }`}
            >
              <div className="text-xs font-bold">Oval / Pill Ghost (#facc15 Glow)</div>
              <div className="text-[10px] opacity-80">Sesuai Brand Identity Lutfi (Rounded-Full)</div>
            </button>

            <button
              type="button"
              onClick={() => setAppearance({ ...appearance, buttonStyle: 'glass' })}
              className={`p-3 rounded-2xl border text-center transition-all ${
                currentButtonStyle === 'glass'
                  ? 'bg-[#0f172a] border-[#facc15] text-[#facc15] shadow-[0_0_14px_rgba(250,204,21,0.2)]'
                  : 'bg-[#070a14]/70 border-[#818cf8]/25 text-[#cbd5e1] hover:border-[#facc15]/50'
              }`}
            >
              <div className="text-xs font-bold">Maghrib Glass Card (Rounded-2xl)</div>
              <div className="text-[10px] opacity-80">Kartu kaca frosted persegi membulat</div>
            </button>
          </div>
        </div>

        {/* TOGGLES CIRI KHAS FUNGSIONAL ALA LUTFI */}
        <div className="space-y-2.5">
          <label className="block text-xs font-bold text-[#38bdf8] uppercase tracking-wider font-mono">
            3. Fitur "Tanda Tangan" (Signature Features)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Toggle 1: Typewriter Role Indicator */}
            <button
              type="button"
              onClick={() =>
                setAppearance({ ...appearance, enableTypewriter: !isTypewriterOn })
              }
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                isTypewriterOn
                  ? 'bg-[#0f172a]/90 border-[#facc15]/60 text-white'
                  : 'bg-[#070a14]/60 border-[#818cf8]/20 text-[#cbd5e1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className={`w-4 h-4 shrink-0 ${isTypewriterOn ? 'text-[#facc15]' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-bold">Typewriter Role Indicator</div>
                  <div className="text-[10px] text-[#cbd5e1]/75">Animasi ketik peran + kursor berkedip</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isTypewriterOn ? 'bg-[#facc15] text-[#070a14]' : 'bg-slate-800 text-slate-400'
              }`}>
                {isTypewriterOn ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Toggle 2: Kinetic Typography Header */}
            <button
              type="button"
              onClick={() =>
                setAppearance({ ...appearance, enableKineticHeader: !isKineticOn })
              }
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                isKineticOn
                  ? 'bg-[#0f172a]/90 border-[#facc15]/60 text-white'
                  : 'bg-[#070a14]/60 border-[#818cf8]/20 text-[#cbd5e1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Type className={`w-4 h-4 shrink-0 ${isKineticOn ? 'text-[#facc15]' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-bold">Kinetic Typography 3-Lapis</div>
                  <div className="text-[10px] text-[#cbd5e1]/75">Nama 3 layer outline + glitch halus</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isKineticOn ? 'bg-[#facc15] text-[#070a14]' : 'bg-slate-800 text-slate-400'
              }`}>
                {isKineticOn ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Toggle 3: Bracket Tech-Badges */}
            <button
              type="button"
              onClick={() =>
                setAppearance({ ...appearance, enableTechBrackets: !isTechBracketsOn })
              }
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                isTechBracketsOn
                  ? 'bg-[#0f172a]/90 border-[#facc15]/60 text-white'
                  : 'bg-[#070a14]/60 border-[#818cf8]/20 text-[#cbd5e1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Cpu className={`w-4 h-4 shrink-0 ${isTechBracketsOn ? 'text-[#38bdf8]' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-bold">Bracket Tech-Badges</div>
                  <div className="text-[10px] text-[#cbd5e1]/75">Aksen kurung siku Sci-Fi [ ... ]</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isTechBracketsOn ? 'bg-[#facc15] text-[#070a14]' : 'bg-slate-800 text-slate-400'
              }`}>
                {isTechBracketsOn ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Toggle 4: Maskot Orix Cyber Owl */}
            <button
              type="button"
              onClick={() =>
                setAppearance({ ...appearance, showOrixBadge: !isOrixBadgeOn })
              }
              className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                isOrixBadgeOn
                  ? 'bg-[#0f172a]/90 border-[#facc15]/60 text-white'
                  : 'bg-[#070a14]/60 border-[#818cf8]/20 text-[#cbd5e1]/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className={`w-4 h-4 shrink-0 ${isOrixBadgeOn ? 'text-[#facc15]' : 'text-slate-500'}`} />
                <div>
                  <div className="text-xs font-bold">Emblem "ORIX" Cyber Owl</div>
                  <div className="text-[10px] text-[#cbd5e1]/75">Tampilkan maskot burung hantu siber</div>
                </div>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isOrixBadgeOn ? 'bg-[#facc15] text-[#070a14]' : 'bg-slate-800 text-slate-400'
              }`}>
                {isOrixBadgeOn ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          {/* Toggle 5: Infinite Seamless Looping Motto Ticker */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Repeat className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Infinite Seamless Looping Ticker (Motto Berjalan)</span>
              </label>
              <button
                type="button"
                onClick={() =>
                  setAppearance({ ...appearance, enableMottoTicker: !isMottoTickerOn })
                }
                className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full transition ${
                  isMottoTickerOn
                    ? 'bg-[#facc15] text-[#070a14]'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isMottoTickerOn ? 'AKTIF' : 'NONAKTIF'}
              </button>
            </div>
            {isMottoTickerOn && (
              <input
                type="text"
                value={
                  appearance.mottoText ??
                  'HIDUPLAH SEPERTI LARRY • THE SAGE & THE CREATOR • ANALITIS • VISIONER • EKSEKUTOR'
                }
                onChange={(e) =>
                  setAppearance({ ...appearance, mottoText: e.target.value })
                }
                placeholder="Pisahkan dengan tanda •"
                className="w-full px-3.5 py-2 rounded-xl bg-[#070a14]/90 border border-[#818cf8]/30 text-xs font-mono text-[#facc15] focus:outline-none focus:border-[#facc15]"
              />
            )}
          </div>
        </div>
      </div>

      {/* 3. LATAR BELAKANG HALAMAN */}
      <div className="maghrib-glass tech-corner-box rounded-3xl p-5 sm:p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <BracketTechBadge accent="indigo">PALETTE // BACKGROUND</BracketTechBadge>
            <h2 className="text-base sm:text-lg font-extrabold text-[#facc15] tracking-tight italic">
              LATAR BELAKANG HALAMAN
            </h2>
          </div>
          <p className="text-xs text-[#cbd5e1] mt-0.5">
            Pilih gradasi Maghrib Twilight, aurora animasi, gambar wallpaper kustom, atau warna solid.
          </p>
        </div>

        {/* MODE SELECTOR (PILL SHAPED) */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-[#070a14]/90 rounded-full border border-[#818cf8]/25">
          <button
            onClick={() => setAppearance({ ...appearance, bgMode: 'aurora' })}
            className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              appearance.bgMode === 'aurora'
                ? 'bg-[#facc15] text-[#070a14] shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                : 'text-[#cbd5e1] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aurora / Twilight</span>
          </button>
          <button
            onClick={() => setAppearance({ ...appearance, bgMode: 'image' })}
            className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              appearance.bgMode === 'image'
                ? 'bg-[#facc15] text-[#070a14] shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                : 'text-[#cbd5e1] hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Gambar</span>
          </button>
          <button
            onClick={() => setAppearance({ ...appearance, bgMode: 'solid' })}
            className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              appearance.bgMode === 'solid'
                ? 'bg-[#facc15] text-[#070a14] shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                : 'text-[#cbd5e1] hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Warna Solid</span>
          </button>
        </div>

        {/* PANEL: AURORA */}
        {appearance.bgMode === 'aurora' && (
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#cbd5e1]">
              Pilih Palet Tema & Aurora:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AURORA_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => selectPreset(preset)}
                  style={{ background: preset.previewGradient }}
                  className={`h-24 rounded-2xl p-3 flex flex-col justify-between text-left transition relative overflow-hidden border-2 ${
                    appearance.auroraClass === preset.class
                      ? 'border-[#facc15] shadow-[0_0_16px_rgba(250,204,21,0.3)]'
                      : 'border-[#818cf8]/20 hover:border-[#38bdf8]/60'
                  }`}
                >
                  {preset.badge ? (
                    <span className="self-start text-[9px] font-mono font-black px-1.5 py-0.5 rounded bg-[#facc15] text-[#070a14]">
                      {preset.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    style={{ color: preset.textColor }}
                    className="text-xs font-bold drop-shadow-sm"
                  >
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PANEL: IMAGE */}
        {appearance.bgMode === 'image' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-[#818cf8]/35 rounded-2xl p-6 text-center bg-[#070a14]/60">
              <label className="px-5 py-2.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(250,204,21,0.25)]">
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Pilih Gambar Wallpaper</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBgImageUpload}
                />
              </label>
              <p className="text-xs text-[#cbd5e1]/80 mt-2">
                Format JPG/PNG. Lapisan gelap otomatis diterapkan agar teks tetap terbaca tajam.
              </p>
            </div>

            {appearance.customImageData && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#facc15]">
                  Transparansi Lapisan Gelap ({appearance.imageOverlayOpacity || 45}%)
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={appearance.imageOverlayOpacity || 45}
                  onChange={(e) =>
                    setAppearance({
                      ...appearance,
                      imageOverlayOpacity: Number(e.target.value),
                    })
                  }
                  className="w-full accent-[#facc15]"
                />
              </div>
            )}
          </div>
        )}

        {/* PANEL: SOLID */}
        {appearance.bgMode === 'solid' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#facc15] mb-1">
                  Warna Latar Belakang (Default #070a14)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={appearance.solidBgColor || '#070a14'}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        solidBgColor: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded-xl cursor-pointer border border-[#818cf8]/40 bg-[#070a14]"
                  />
                  <input
                    type="text"
                    value={appearance.solidBgColor || '#070a14'}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        solidBgColor: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl bg-[#070a14] border border-[#818cf8]/30 text-sm font-mono text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#38bdf8] mb-1">
                  Warna Teks Profil
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={appearance.textColor || '#FFFFFF'}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        textColor: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded-xl cursor-pointer border border-[#818cf8]/40 bg-[#070a14]"
                  />
                  <input
                    type="text"
                    value={appearance.textColor || '#FFFFFF'}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        textColor: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-xl bg-[#070a14] border border-[#818cf8]/30 text-sm font-mono text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
