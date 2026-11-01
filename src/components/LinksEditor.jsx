import React, { useState } from 'react';
import {
  Plus,
  GripVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layers,
  Check,
  X,
} from 'lucide-react';
import SocialIcon from './SocialIcon';
import { SectionPillTag, CardStepHeader } from './SpecialEffects';
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
      {/* SECTION HEADER (Mengacu pada Referensi Desain Minimalis) */}
      <div className="space-y-2">
        <SectionPillTag code="01" label="MANAJEMEN TAUTAN" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Daftar Tautan & Navigasi
            </h1>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              Geser kartu untuk mengatur urutan, atau klik ikon untuk mengganti gambar logo.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0f172a]/90 border border-slate-700 text-xs font-mono text-[#cbd5e1] self-start sm:self-auto">
            <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{links.length} Tautan Tersimpan</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER CARD */}
      <div className="maghrib-card rounded-3xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <CardStepHeader number="01" category="DAFTAR ITEM TAUTAN" status="" />
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] border-2 border-[#070a14] shadow-[2px_2px_0px_#04060e] text-xs font-bold flex items-center gap-1.5 transition shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Tambah Tautan</span>
          </button>
        </div>

        {/* FORM TAMBAH TAUTAN BARU */}
        {showAddForm && (
          <form
            onSubmit={handleAddNew}
            className="tactile-box p-4 rounded-2xl space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                  Judul Tombol
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Portofolio GitHub"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#facc15]"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#cbd5e1] mb-1">
                  URL Tujuan
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/username"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#070a14] border border-slate-700 text-sm font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-[#facc15]"
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
                className="px-4 py-1.5 rounded-full bg-[#facc15] text-[#070a14] text-xs font-bold hover:bg-[#fde047]"
              >
                Simpan
              </button>
            </div>
          </form>
        )}

        {/* LIST TAUTAN */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs border border-dashed border-slate-700 rounded-2xl">
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
                className={`tactile-box rounded-2xl p-3.5 flex items-start sm:items-center gap-3 ${
                  draggedIndex === idx ? 'opacity-40 border-dashed border-[#facc15]' : ''
                }`}
              >
                {/* Drag Handle */}
                <div className="flex flex-col items-center gap-1 text-slate-500 shrink-0">
                  <span className="cursor-grab hover:text-[#facc15] transition" title="Geser urutan">
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
                  className="w-11 h-11 rounded-xl bg-[#070a14] border border-slate-700 flex items-center justify-center cursor-pointer overflow-hidden group/icon relative shrink-0 hover:border-[#facc15] transition"
                  title="Klik untuk ganti ikon"
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
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/80 hidden group-hover/icon:flex items-center justify-center text-[#facc15] text-[8px] font-mono font-bold">
                    EDIT
                  </div>
                </label>

                {/* Inputs: Title & URL */}
                <div className="flex-1 min-w-0 space-y-0.5">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateLink(idx, 'title', e.target.value)}
                    placeholder="Judul Tautan"
                    className="font-bold text-sm text-white bg-transparent focus:bg-[#070a14] focus:px-2 py-0.5 rounded-lg border border-transparent focus:border-[#facc15]/60 outline-none w-full transition"
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
                    className="text-xs text-slate-400 font-mono bg-transparent focus:bg-[#070a14] focus:px-2 py-0.5 rounded-lg border border-transparent focus:border-slate-600 outline-none w-full transition"
                  />
                </div>

                {/* Clicks & Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#070a14] border border-slate-800 text-[10px] font-mono text-slate-400">
                    {item.clicks || 0} klik
                  </span>

                  <button
                    onClick={() => updateLink(idx, 'enabled', !item.enabled)}
                    className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold border transition ${
                      item.enabled
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-500 border-slate-700'
                    }`}
                    title={item.enabled ? 'Klik untuk sembunyikan' : 'Klik untuk aktifkan'}
                  >
                    {item.enabled ? 'AKTIF' : 'OFF'}
                  </button>

                  <button
                    onClick={() => deleteLink(idx)}
                    className="text-slate-500 hover:text-[#e11d48] p-1.5 rounded-lg hover:bg-[#e11d48]/10 transition"
                    title="Hapus tautan"
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
