import React from 'react';
import {
  Upload,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Wand2,
  Moon,
} from 'lucide-react';
import { AURORA_PRESETS, PARTICLE_PRESETS, compressImageFile } from '../data/defaultState';
import { SectionPillTag, CardStepHeader } from './SpecialEffects';

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
      showScenicLandscape: true,
      solidBgColor: '#070a14',
      textColor: '#FFFFFF',
      cardBgColor: 'rgba(15, 23, 42, 0.80)',
      cardTextColor: '#FFFFFF',
      buttonStyle: 'pill-ghost',
      particleEffect: 'cyber-fireflies',
      enableTypewriter: true,
      enableKineticHeader: false,
      showOrixPet: true,
    });
    showToast('Preset Brand Maghrib Twilight diterapkan!');
  };

  const currentParticle = appearance.particleEffect || 'cyber-fireflies';
  const isPillGhost = (appearance.buttonStyle || 'pill-ghost') === 'pill-ghost';
  const isTypewriterOn = appearance.enableTypewriter !== false;
  const isKineticOn = Boolean(appearance.enableKineticHeader);
  const isOrixPetOn = appearance.showOrixPet !== false;
  const isScenicOn = appearance.showScenicLandscape !== false;

  return (
    <section className="space-y-6">
      {/* SECTION HEADER (Mengacu pada Referensi Minimalis) */}
      <div className="space-y-2">
        <SectionPillTag code="02" label="DESAIN & IDENTITAS" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Tampilan & Efek Visual
            </h1>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              Atur profil, latar pemandangan senja, partikel, dan maskot interaktif Orix.
            </p>
          </div>
          <button
            type="button"
            onClick={applyOpikzSignatureBrand}
            className="px-3.5 py-1.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] border-2 border-[#070a14] shadow-[2px_2px_0px_#04060e] text-xs font-bold inline-flex items-center gap-1.5 self-start sm:self-auto transition"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Reset ke Default Brand</span>
          </button>
        </div>
      </div>

      {/* 01 // IDENTITAS PROFIL */}
      <div className="maghrib-card rounded-3xl p-5 sm:p-6 space-y-4">
        <CardStepHeader number="01" category="IDENTITAS PROFIL" status="AKTIF" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#facc15] bg-[#070a14] shrink-0 shadow-[3px_3px_0px_#04060e]"
          />
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap gap-2">
              <label className="px-4 py-1.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] border-2 border-[#070a14] shadow-[2px_2px_0px_#04060e] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Upload Foto</span>
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
                className="ghost-pill-btn px-3.5 py-1.5 text-[#cbd5e1] hover:text-white text-xs font-semibold"
              >
                Acak Avatar
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Rasio 1:1 format JPG/PNG. Otomatis dikompresi agar ringan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
              Nama Tampilan
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#facc15]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
              Role / Peran (Pisahkan dengan | untuk efek ketik)
            </label>
            <input
              type="text"
              value={profile.role}
              placeholder="IT Project Manager | IT Cloud | Informatics Student"
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#facc15]"
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
            className="w-full px-3.5 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#facc15]"
          ></textarea>
        </div>
      </div>

      {/* 02 // LATAR BELAKANG & PEMANDANGAN SENJA */}
      <div className="maghrib-card rounded-3xl p-5 sm:p-6 space-y-5">
        <CardStepHeader number="02" category="LATAR BELAKANG & PEMANDANGAN" status="DIPILIH" statusColor="yellow" />

        {/* KATEGORI MODE LATAR (Gaya Kartu Referensi) */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setAppearance({ ...appearance, bgMode: 'aurora' })}
            className={`p-3 rounded-2xl text-left transition-all flex flex-col justify-between gap-2 ${
              appearance.bgMode === 'aurora' ? 'tactile-tab-active' : 'tactile-tab-inactive'
            }`}
          >
            <div className="flex items-center justify-between">
              <Sparkles className="w-4 h-4" />
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border border-current opacity-80">
                TEMA
              </span>
            </div>
            <div className="text-xs font-bold">Senja & Aurora</div>
          </button>

          <button
            type="button"
            onClick={() => setAppearance({ ...appearance, bgMode: 'image' })}
            className={`p-3 rounded-2xl text-left transition-all flex flex-col justify-between gap-2 ${
              appearance.bgMode === 'image' ? 'tactile-tab-active' : 'tactile-tab-inactive'
            }`}
          >
            <div className="flex items-center justify-between">
              <ImageIcon className="w-4 h-4" />
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border border-current opacity-80">
                FOTO
              </span>
            </div>
            <div className="text-xs font-bold">Gambar Kustom</div>
          </button>

          <button
            type="button"
            onClick={() => setAppearance({ ...appearance, bgMode: 'solid' })}
            className={`p-3 rounded-2xl text-left transition-all flex flex-col justify-between gap-2 ${
              appearance.bgMode === 'solid' ? 'tactile-tab-active' : 'tactile-tab-inactive'
            }`}
          >
            <div className="flex items-center justify-between">
              <Palette className="w-4 h-4" />
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border border-current opacity-80">
                HEX
              </span>
            </div>
            <div className="text-xs font-bold">Warna Solid</div>
          </button>
        </div>

        {/* TOGGLE PEMANDANGAN BULAN & POHON SENJA */}
        <div className="tactile-box p-3.5 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#070a14] border border-slate-700 flex items-center justify-center text-[#facc15]">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                Ilustrasi Pemandangan Senja (Bulan, Pohon & Gunung)
              </div>
              <div className="text-[11px] text-slate-400">
                Tampilkan siluet pepohonan, bulan purnama, dan pegunungan di halaman publik
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setAppearance({ ...appearance, showScenicLandscape: !isScenicOn })
            }
            className={`px-3 py-1 rounded-md text-[10px] font-mono font-bold border transition shrink-0 ${
              isScenicOn
                ? 'bg-[#facc15] text-[#070a14] border-[#070a14]'
                : 'bg-slate-900 text-slate-400 border-slate-700'
            }`}
          >
            {isScenicOn ? 'AKTIF' : 'OFF'}
          </button>
        </div>

        {/* PANEL: AURORA */}
        {appearance.bgMode === 'aurora' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {AURORA_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => selectPreset(preset)}
                style={{ background: preset.previewGradient }}
                className={`h-20 rounded-2xl p-3 flex flex-col justify-between text-left transition relative overflow-hidden border-2 ${
                  appearance.auroraClass === preset.class
                    ? 'border-[#facc15] shadow-[3px_3px_0px_#04060e]'
                    : 'border-slate-700/80 hover:border-slate-500'
                }`}
              >
                {preset.badge ? (
                  <span className="self-start text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#facc15] text-[#070a14]">
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
        )}

        {/* PANEL: IMAGE */}
        {appearance.bgMode === 'image' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center bg-[#070a14]/60">
              <label className="px-5 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition">
                <Upload className="w-4 h-4 stroke-[2.5]" />
                <span>Pilih Gambar Wallpaper</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBgImageUpload}
                />
              </label>
              <p className="text-xs text-slate-400 mt-2">
                Format JPG/PNG. Lapisan gelap otomatis diterapkan agar teks terbaca.
              </p>
            </div>

            {appearance.customImageData && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#cbd5e1]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                Warna Latar Belakang
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
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-[#070a14]"
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
                  className="flex-1 px-3 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm font-mono text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
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
                  className="w-10 h-10 rounded-xl cursor-pointer border border-slate-700 bg-[#070a14]"
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
                  className="flex-1 px-3 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm font-mono text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 03 // EFEK PARTIKEL & PET INTERAKTIF ORIX */}
      <div className="maghrib-card rounded-3xl p-5 sm:p-6 space-y-5">
        <CardStepHeader number="03" category="PARTIKEL & MASKOT INTERAKTIF" status="CUSTOM" />

        {/* PILIHAN PARTIKEL (Gaya Kartu Minimalis Mengacu pada Referensi) */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Pilih Efek Partikel Latar
          </div>
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
                  className={`p-3.5 rounded-2xl text-left transition-all ${
                    active ? 'tactile-tab-active' : 'tactile-box text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold">{p.name}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                        active
                          ? 'border-[#070a14] bg-[#070a14]/10 text-[#070a14]'
                          : 'border-slate-700 text-slate-400'
                      }`}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] mt-1 leading-snug ${
                      active ? 'text-[#070a14]/80 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {p.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FITUR INTERAKTIF & GAYA TOMBOL */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            Fitur Halaman Publik
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* 1. Pet Interaktif Orix */}
            <button
              type="button"
              onClick={() => setAppearance({ ...appearance, showOrixPet: !isOrixPetOn })}
              className="tactile-box p-3.5 rounded-2xl text-left flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-white">🦉 Pet Interaktif "Orix"</div>
                <div className="text-[11px] text-slate-400">
                  Burung hantu yang bisa melirik kursor & disapa pengunjung
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${
                  isOrixPetOn
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {isOrixPetOn ? 'AKTIF' : 'OFF'}
              </span>
            </button>

            {/* 2. Typewriter Role Indicator */}
            <button
              type="button"
              onClick={() => setAppearance({ ...appearance, enableTypewriter: !isTypewriterOn })}
              className="tactile-box p-3.5 rounded-2xl text-left flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-white">⌨️ Typewriter Role</div>
                <div className="text-[11px] text-slate-400">
                  Animasi mengetik peran otomatis + kursor berkedip
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${
                  isTypewriterOn
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {isTypewriterOn ? 'AKTIF' : 'OFF'}
              </span>
            </button>

            {/* 3. Bentuk Tombol Pill vs Rounded */}
            <button
              type="button"
              onClick={() =>
                setAppearance({
                  ...appearance,
                  buttonStyle: isPillGhost ? 'glass' : 'pill-ghost',
                })
              }
              className="tactile-box p-3.5 rounded-2xl text-left flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-white">💊 Tombol Oval (Pill Ghost)</div>
                <div className="text-[11px] text-slate-400">
                  Bentuk tombol melingkar penuh dengan sorot kuning
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${
                  isPillGhost
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {isPillGhost ? 'PILL' : 'CARD'}
              </span>
            </button>

            {/* 4. Kinetic Header 3-Lapis */}
            <button
              type="button"
              onClick={() =>
                setAppearance({ ...appearance, enableKineticHeader: !isKineticOn })
              }
              className="tactile-box p-3.5 rounded-2xl text-left flex items-center justify-between gap-3"
            >
              <div>
                <div className="text-xs font-bold text-white">✨ Judul Kinetic 3-Lapis</div>
                <div className="text-[11px] text-slate-400">
                  Efek teks nama bertumpuk outline tipis
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border shrink-0 ${
                  isKineticOn
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-700'
                }`}
              >
                {isKineticOn ? 'AKTIF' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
