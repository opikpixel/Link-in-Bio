import React, { useState } from 'react';
import {
  Plus,
  GripVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  BarChart,
  Check,
  X,
} from 'lucide-react';
import SocialIcon from './SocialIcon';
import { BracketTechBadge } from './SpecialEffects';
import { autoDetectIcon, compressImageFile } from '../data/defaultState';

export default function LinksEditor({ links, setLinks, showToast }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) {
      showToast('Harap isi judul dan URL tujuan!');
      return;
    }

    let cleanUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const detected = autoDetectIcon(cleanUrl);

    const newLinkItem = {
      id: 'lnk-' + Date.now(),
      title: newTitle.trim(),
      url: cleanUrl,
      iconType: detected ? 'preset' : null,
      iconValue: detected || 'globe',
      enabled: true,
      clicks: 0,
    };

    setLinks([newLinkItem, ...links]);
    setNewTitle('');
    setNewUrl('');
    setShowAddForm(false);
    showToast('Tautan berhasil ditambahkan!');
  };

  const handleCustomLogoUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    compressImageFile(file, 160, 0.85, (base64) => {
      const updated = [...links];
      updated[index] = {
        ...updated[index],
        iconType: 'custom',
        iconValue: base64,
      };
      setLinks(updated);
      showToast('Logo kustom berhasil diunggah!');
    });
  };

  const updateLink = (index, field, value) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const deleteLink = (index) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
    showToast('Tautan telah dihapus');
  };

  const moveLink = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= links.length) return;
    const updated = [...links];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setLinks(updated);
  };

  // Drag and Drop handlers
  const onDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    moveLink(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  return (
    <section className="space-y-5">
      <div className="maghrib-glass tech-corner-box rounded-3xl p-5 sm:p-6 space-y-5">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <BracketTechBadge accent="sky">LINKS // SYSTEM</BracketTechBadge>
              <h2 className="text-base sm:text-lg font-extrabold text-[#facc15] tracking-tight italic">
                DAFTAR TAUTAN AKTIF
              </h2>
            </div>
            <p className="text-xs text-[#cbd5e1]">
              Geser kartu atau gunakan tombol panah untuk mengatur urutan. Klik ikon untuk upload logo kustom.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs sm:text-sm font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(250,204,21,0.3)] shrink-0 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Tautan</span>
          </button>
        </div>

        {/* FORM TAMBAH TAUTAN BARU */}
        {showAddForm && (
          <form
            onSubmit={handleAddNew}
            className="p-4 rounded-2xl bg-[#070a14]/80 border border-[#facc15]/40 space-y-3 transition-all shadow-inner"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#facc15] mb-1">
                  Judul Tombol
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Portofolio GitHub"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0f172a] border border-[#818cf8]/30 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#facc15] transition"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#38bdf8] mb-1">
                  URL Tujuan (Wajib https://)
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/username"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0f172a] border border-[#818cf8]/30 text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8] transition"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="ghost-pill-btn px-4 py-1.5 text-xs font-semibold text-[#cbd5e1]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-full bg-[#facc15] text-[#070a14] text-xs font-bold hover:bg-[#fde047] transition shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              >
                Simpan Tautan
              </button>
            </div>
          </form>
        )}

        {/* LIST TAUTAN */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-12 text-[#cbd5e1]/60 text-sm border border-dashed border-[#818cf8]/25 rounded-2xl">
              Belum ada tautan. Klik tombol <strong className="text-[#facc15]">+ Tambah Tautan</strong> di atas.
            </div>
          ) : (
            links.map((item, idx) => (
              <div
                key={item.id || idx}
                draggable
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, idx)}
                className={`group bg-[#0f172a]/75 hover:bg-[#0f172a] rounded-2xl p-3.5 border border-[#818cf8]/25 hover:border-[#facc15]/60 flex items-start sm:items-center gap-3 transition-all shadow-sm ${
                  draggedIndex === idx ? 'opacity-40 border-dashed border-[#facc15]' : ''
                }`}
              >
                {/* Drag Handle & Order Controls */}
                <div className="flex flex-col items-center gap-1 text-[#cbd5e1]/50 shrink-0">
                  <span className="cursor-grab hover:text-[#facc15] transition" title="Geser untuk atur urutan">
                    <GripVertical className="w-4 h-4" />
                  </span>
                  <div className="flex flex-col sm:hidden">
                    <button
                      onClick={() => moveLink(idx, idx - 1)}
                      disabled={idx === 0}
                      className="disabled:opacity-20 hover:text-[#facc15]"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveLink(idx, idx + 1)}
                      disabled={idx === links.length - 1}
                      className="disabled:opacity-20 hover:text-[#facc15]"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Upload / Ganti Logo */}
                <label
                  className="w-12 h-12 rounded-2xl bg-[#070a14] border border-[#38bdf8]/35 flex items-center justify-center cursor-pointer overflow-hidden group/icon relative shrink-0 shadow-inner hover:border-[#facc15] transition"
                  title="Klik untuk upload logo kustom"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCustomLogoUpload(e, idx)}
                  />
                  <div className="text-[#38bdf8] group-hover/icon:text-[#facc15] transition">
                    <SocialIcon
                      type={item.iconType}
                      value={item.iconValue}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[#070a14]/85 hidden group-hover/icon:flex items-center justify-center text-[#facc15] text-[9px] font-bold tracking-wider backdrop-blur-xs">
                    GANTI
                  </div>
                </label>

                {/* Inputs: Title & URL */}
                <div className="flex-1 min-w-0 space-y-1">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateLink(idx, 'title', e.target.value)}
                    placeholder="Judul Tautan"
                    className="font-bold text-sm text-white bg-transparent focus:bg-[#070a14] focus:px-2.5 py-0.5 rounded-lg border border-transparent focus:border-[#facc15]/60 outline-none w-full transition"
                  />
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => {
                      const newUrl = e.target.value;
                      const detected = autoDetectIcon(newUrl);
                      const updated = [...links];
                      updated[idx] = {
                        ...updated[idx],
                        url: newUrl,
                        iconType: detected && item.iconType !== 'custom' ? 'preset' : item.iconType,
                        iconValue: detected && item.iconType !== 'custom' ? detected : item.iconValue,
                      };
                      setLinks(updated);
                    }}
                    placeholder="https://..."
                    className="text-xs text-[#38bdf8]/90 font-mono bg-transparent focus:bg-[#070a14] focus:px-2.5 py-0.5 rounded-lg border border-transparent focus:border-[#38bdf8]/60 outline-none w-full transition"
                  />
                </div>

                {/* Stat Clicks & Action Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#070a14] text-[#cbd5e1] border border-[#818cf8]/25">
                    <BarChart className="w-3 h-3 text-[#facc15]" />
                    {item.clicks || 0} klik
                  </span>

                  {/* Toggle Active */}
                  <button
                    onClick={() => updateLink(idx, 'enabled', !item.enabled)}
                    className={`p-2 rounded-full text-xs border transition ${
                      item.enabled
                        ? 'text-emerald-300 bg-emerald-500/15 border-emerald-500/40 hover:border-[#facc15]'
                        : 'text-slate-500 bg-[#070a14] border-slate-700 hover:border-slate-500'
                    }`}
                    title={item.enabled ? 'Tautan Aktif' : 'Tautan Disembunyikan'}
                  >
                    {item.enabled ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteLink(idx)}
                    className="text-slate-400 hover:text-[#e11d48] p-2 rounded-full hover:bg-[#e11d48]/15 border border-transparent hover:border-[#e11d48]/40 transition"
                    title="Hapus tautan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
