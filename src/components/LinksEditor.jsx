import React, { useState } from 'react';
import {
  Plus,
  GripVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  BarChart,
  Check,
  X,
} from 'lucide-react';
import SocialIcon from './SocialIcon';
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
      <div className="bg-white rounded-2xl p-5 border border-zinc-200/80 shadow-2xs">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-zinc-900">Daftar Tautan</h2>
            <p className="text-xs text-zinc-500">
              Geser kartu atau gunakan tombol panah untuk mengatur urutan. Klik logo untuk ganti gambar.
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 transition shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Tautan</span>
          </button>
        </div>

        {/* FORM TAMBAH TAUTAN BARU */}
        {showAddForm && (
          <form
            onSubmit={handleAddNew}
            className="mb-5 p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-3 transition-all"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Judul Tombol
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Portofolio Terbaru"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 text-sm focus:outline-none focus:border-zinc-900"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  URL Tujuan (Wajib https://)
                </label>
                <input
                  type="text"
                  placeholder="https://instagram.com/username"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-zinc-300 text-sm font-mono focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:bg-zinc-200/60"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800"
              >
                Simpan Tautan
              </button>
            </div>
          </form>
        )}

        {/* LIST TAUTAN */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <div className="text-center py-12 text-zinc-400 text-sm">
              Belum ada tautan. Klik tombol <strong>+ Tambah Tautan</strong> di atas.
            </div>
          ) : (
            links.map((item, idx) => (
              <div
                key={item.id || idx}
                draggable
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, idx)}
                className={`group bg-zinc-50/70 hover:bg-white rounded-xl p-3 border border-zinc-200/90 flex items-start sm:items-center gap-3 transition shadow-2xs ${
                  draggedIndex === idx ? 'opacity-40 border-dashed border-zinc-400' : ''
                }`}
              >
                {/* Drag Handle & Order Controls */}
                <div className="flex flex-col items-center gap-1 text-zinc-400 shrink-0">
                  <span className="cursor-grab hover:text-zinc-700" title="Geser untuk atur urutan">
                    <GripVertical className="w-4 h-4" />
                  </span>
                  <div className="flex flex-col sm:hidden">
                    <button
                      onClick={() => moveLink(idx, idx - 1)}
                      disabled={idx === 0}
                      className="disabled:opacity-20 hover:text-zinc-800"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveLink(idx, idx + 1)}
                      disabled={idx === links.length - 1}
                      className="disabled:opacity-20 hover:text-zinc-800"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Upload / Ganti Logo */}
                <label
                  className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center cursor-pointer overflow-hidden group/icon relative shrink-0 shadow-2xs hover:border-zinc-400 transition"
                  title="Klik untuk upload logo kustom"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCustomLogoUpload(e, idx)}
                  />
                  <div className="text-zinc-700">
                    <SocialIcon
                      type={item.iconType}
                      value={item.iconValue}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 hidden group-hover/icon:flex items-center justify-center text-white text-[9px] font-bold tracking-wider backdrop-blur-xs">
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
                    className="font-semibold text-sm text-zinc-900 bg-transparent focus:bg-white focus:px-2 rounded border border-transparent focus:border-zinc-300 outline-none w-full transition"
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
                    className="text-xs text-zinc-500 font-mono bg-transparent focus:bg-white focus:px-2 rounded border border-transparent focus:border-zinc-300 outline-none w-full transition"
                  />
                </div>

                {/* Stat Clicks & Action Buttons */}
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-zinc-200/70 text-zinc-700">
                    <BarChart className="w-3 h-3 text-zinc-500" />
                    {item.clicks || 0} klik
                  </span>

                  {/* Toggle Active */}
                  <button
                    onClick={() => updateLink(idx, 'enabled', !item.enabled)}
                    className={`p-1.5 rounded-lg text-xs transition ${
                      item.enabled
                        ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                        : 'text-zinc-400 bg-zinc-100 hover:bg-zinc-200'
                    }`}
                    title={item.enabled ? 'Tautan Aktif' : 'Tautan Disembunyikan'}
                  >
                    {item.enabled ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteLink(idx)}
                    className="text-zinc-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition"
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
