import React from 'react';
import { Upload, Image as ImageIcon, Palette, Sparkles } from 'lucide-react';
import { AURORA_PRESETS, compressImageFile } from '../data/defaultState';

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

  return (
    <section className="space-y-5">
      {/* IDENTITAS PROFIL */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-zinc-900">Identitas Profil</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-16 h-16 rounded-2xl object-cover border border-zinc-200 bg-zinc-100 shrink-0 shadow-2xs"
          />
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap gap-2">
              <label className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 transition shadow-xs">
                <Upload className="w-3.5 h-3.5" />
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
                className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium transition"
              >
                Acak Avatar
              </button>
            </div>
            <p className="text-[11px] text-zinc-500">
              Disarankan rasio 1:1 format JPG/PNG. Otomatis dikompresi untuk loading kilat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Nama Tampilan
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">
              Role / Tagline Singkat
            </label>
            <input
              type="text"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 mb-1">
            Bio Singkat
          </label>
          <textarea
            rows="2"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900"
          ></textarea>
        </div>
      </div>

      {/* LATAR BELAKANG HALAMAN */}
      <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs space-y-5">
        <div>
          <h2 className="text-base font-bold text-zinc-900">Latar Belakang Halaman</h2>
          <p className="text-xs text-zinc-500">
            Pilih gradasi aurora animasi, gambar wallpaper kustom, atau warna solid minimalis.
          </p>
        </div>

        {/* MODE SELECTOR */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100 rounded-xl border border-zinc-200/70">
          <button
            onClick={() => setAppearance({ ...appearance, bgMode: 'aurora' })}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              appearance.bgMode === 'aurora'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Aurora Animasi</span>
          </button>
          <button
            onClick={() => setAppearance({ ...appearance, bgMode: 'image' })}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              appearance.bgMode === 'image'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Upload Gambar</span>
          </button>
          <button
            onClick={() => setAppearance({ ...appearance, bgMode: 'solid' })}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
              appearance.bgMode === 'solid'
                ? 'bg-white text-zinc-900 shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Warna Solid</span>
          </button>
        </div>

        {/* PANEL: AURORA */}
        {appearance.bgMode === 'aurora' && (
          <div className="space-y-3">
            <label className="block text-xs font-medium text-zinc-700">
              Pilih Palet Aurora Gerak:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AURORA_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => selectPreset(preset)}
                  style={{ background: preset.previewGradient }}
                  className={`h-24 rounded-2xl p-3 flex flex-col justify-end text-left transition relative overflow-hidden border-2 ${
                    appearance.auroraClass === preset.class
                      ? 'border-zinc-900 shadow-md ring-2 ring-zinc-900/20'
                      : 'border-transparent hover:border-zinc-300'
                  }`}
                >
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
            <div className="border-2 border-dashed border-zinc-300 rounded-2xl p-6 text-center bg-zinc-50/60">
              <label className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 transition shadow-xs">
                <Upload className="w-4 h-4" />
                <span>Pilih Gambar Wallpaper</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBgImageUpload}
                />
              </label>
              <p className="text-xs text-zinc-500 mt-2">
                Format JPG/PNG. Lapisan gelap otomatis diterapkan agar teks tetap terbaca tajam.
              </p>
            </div>

            {appearance.customImageData && (
              <div className="space-y-3">
                <div className="text-xs font-medium text-zinc-700">
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
                  className="w-full accent-zinc-900"
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
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Warna Latar Belakang
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={appearance.solidBgColor || '#090D16'}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        solidBgColor: e.target.value,
                      })
                    }
                    className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200"
                  />
                  <input
                    type="text"
                    value={appearance.solidBgColor || '#090D16'}
                    onChange={(e) =>
                      setAppearance({
                        ...appearance,
                        solidBgColor: e.target.value,
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
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
                    className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-200"
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
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm font-mono"
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
