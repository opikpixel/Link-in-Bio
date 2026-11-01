import React, { useState } from 'react';
import { X, Download, Copy, Check, Globe, Code2, FileJson, Upload, Edit3 } from 'lucide-react';

export default function ExportModal({
  isOpen,
  onClose,
  profile,
  appearance,
  links,
  slug,
  fullState,
  onImportConfig,
  showToast,
}) {
  const [copiedPublic, setCopiedPublic] = useState(false);
  const [copiedEditor, setCopiedEditor] = useState(false);

  if (!isOpen) return null;

  const publicUrl = window.location.origin + window.location.pathname;
  const editorUrl = publicUrl + (publicUrl.includes('?') ? '&' : '?') + 'edit=true';

  const handleCopyLink = (url, isPublic) => {
    navigator.clipboard.writeText(url);
    if (isPublic) {
      setCopiedPublic(true);
      setTimeout(() => setCopiedPublic(false), 2000);
    } else {
      setCopiedEditor(true);
      setTimeout(() => setCopiedEditor(false), 2000);
    }
    showToast('Tautan berhasil disalin!');
  };

  const handleDownloadBackup = () => {
    const dataStr = JSON.stringify(fullState || { profile, appearance, links, slug }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `opikz-config-${slug || 'backup'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File konfigurasi JSON berhasil diunduh!');
  };

  const handleUploadBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (onImportConfig) {
          onImportConfig(parsed);
          onClose();
        }
      } catch (err) {
        showToast('Gagal membaca file JSON!');
      }
    };
    reader.readAsText(file);
  };

  const downloadStandaloneHtml = () => {
    const activeLinks = links.filter((l) => l.enabled !== false);
    const bgStyle =
      appearance.bgMode === 'image' && appearance.customImageData
        ? `background: linear-gradient(rgba(7,10,20,${
            (appearance.imageOverlayOpacity || 45) / 100
          }), rgba(31,20,48,${
            (appearance.imageOverlayOpacity || 45) / 100
          })), url('${appearance.customImageData}'); background-size: cover; background-position: center; background-attachment: fixed;`
        : appearance.bgMode === 'solid'
        ? `background-color: ${appearance.solidBgColor || '#070a14'};`
        : `background: linear-gradient(180deg, #070a14 0%, #131129 50%, #1f1430 100%); background-size: 300% 300%; animation: aurora 12s ease infinite;`;

    const htmlStr = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name || 'Link in Bio'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      min-height: 100vh;
      color: ${appearance.textColor || '#FFFFFF'};
      ${bgStyle}
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px 16px;
    }
    @keyframes aurora {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .container {
      width: 100%;
      max-width: 420px;
      text-align: center;
    }
    .avatar {
      width: 96px;
      height: 96px;
      border-radius: 28px;
      object-fit: cover;
      margin-bottom: 16px;
      border: 2px solid #facc15;
      box-shadow: 0 0 25px rgba(250,204,21,0.25);
    }
    h1 {
      font-size: 22px;
      margin: 0 0 4px;
      color: #facc15;
      letter-spacing: -0.02em;
    }
    .role {
      font-size: 13px;
      color: #38bdf8;
      margin: 0 0 8px;
      font-family: monospace;
    }
    .bio {
      font-size: 13px;
      color: #cbd5e1;
      margin: 0 auto 32px;
      line-height: 1.5;
    }
    .links-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      text-align: left;
    }
    .link-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 14px 18px;
      border-radius: 9999px;
      background: rgba(15, 23, 42, 0.80);
      color: #FFFFFF;
      border: 1px solid rgba(129, 140, 248, 0.30);
      text-decoration: none;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.25s ease;
    }
    .link-card:hover {
      transform: translateY(-2px);
      border-color: #facc15;
      box-shadow: 0 0 18px rgba(250,204,21,0.25);
    }
    .link-title {
      font-weight: 700;
      font-size: 14px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-box {
      width: 34px;
      height: 34px;
      border-radius: 9999px;
      background: #070a14;
      border: 1px solid rgba(56,189,248,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      overflow: hidden;
    }
    .icon-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .arrow {
      color: #e11d48;
      font-family: monospace;
      font-weight: bold;
      font-size: 13px;
    }
    footer {
      margin-top: 48px;
      font-size: 11px;
      opacity: 0.6;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="${profile.avatar}" alt="${profile.name}" class="avatar">
    <h1>${profile.name}</h1>
    ${profile.role ? `<p class="role">&gt; ${profile.role}</p>` : ''}
    ${profile.bio ? `<p class="bio">${profile.bio}</p>` : ''}
    
    <div class="links-list">
      ${activeLinks
        .map(
          (l) => `
      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="link-card">
        <div class="icon-box">
          ${
            l.iconType === 'custom' && l.iconValue
              ? `<img src="${l.iconValue}" alt="icon">`
              : `<span>⚡</span>`
          }
        </div>
        <div class="link-title">${l.title}</div>
        <span class="arrow">[↗]</span>
      </a>`
        )
        .join('')}
    </div>

    <footer>
      <p>© ${new Date().getFullYear()} ${profile.name} • [ OPIKZ // ORIX STUDIO ]</p>
    </footer>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlStr], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `index.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File index.html berhasil diunduh!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="maghrib-glass tech-corner-box bg-[#070a14]/95 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#818cf8]/30 text-white max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#facc15] tracking-tight italic">
              PUBLIKASI & DOWNLOAD
            </h3>
            <p className="text-xs text-[#cbd5e1]">
              Opsi publikasi langsung atau ekspor file konfigurasi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#cbd5e1] hover:text-[#facc15] hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TAUTAN PUBLIK VS EDITOR */}
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-[#818cf8]/30 bg-[#0f172a]/85 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#facc15] flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#38bdf8]" />
                Tautan Profil Publik (Untuk Pengunjung / Bio)
              </label>
              <span className="text-[10px] font-mono bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/35 font-bold px-2 py-0.5 rounded-full">
                [PUBLIC]
              </span>
            </div>
            <p className="text-[11px] text-[#cbd5e1]">
              Bagikan link ini ke publik. Pengunjung otomatis melihat halaman profil tanpa panel editor.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 px-3 py-2 rounded-full bg-[#070a14] border border-[#818cf8]/30 text-xs font-mono text-[#38bdf8] outline-none"
              />
              <button
                onClick={() => handleCopyLink(publicUrl, true)}
                className="px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold flex items-center gap-1.5 transition shrink-0"
              >
                {copiedPublic ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPublic ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#818cf8]/20 bg-[#0f172a]/60 space-y-1.5">
            <label className="text-xs font-semibold text-[#cbd5e1] flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-[#facc15]" />
              Tautan Khusus Mode Editor (Untuk Anda Sendiri)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={editorUrl}
                className="flex-1 px-3 py-1.5 rounded-full bg-[#070a14] border border-[#818cf8]/25 text-xs font-mono text-[#cbd5e1] outline-none"
              />
              <button
                onClick={() => handleCopyLink(editorUrl, false)}
                className="ghost-pill-btn px-3.5 py-1.5 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0"
              >
                {copiedEditor ? <Check className="w-3.5 h-3.5 text-[#facc15]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEditor ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* CADANGKAN & PULIHKAN DATA JSON */}
        <div className="p-4 rounded-2xl border border-[#38bdf8]/30 bg-[#0f172a]/80 space-y-2">
          <div>
            <h4 className="text-xs font-bold text-[#38bdf8] flex items-center gap-1.5">
              <FileJson className="w-4 h-4 text-[#facc15]" />
              Cadangkan & Pulihkan Konfigurasi (.json)
            </h4>
            <p className="text-[11px] text-[#cbd5e1] mt-0.5">
              Pindahkan tampilan Anda antar-browser/perangkat dalam 1 klik tanpa hilang.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleDownloadBackup}
              className="ghost-pill-btn flex-1 py-2 px-3 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Unduh Cadangan (.json)</span>
            </button>

            <label className="ghost-pill-btn flex-1 py-2 px-3 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-[#facc15]" />
              <span>Pulihkan Cadangan</span>
              <input
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleUploadBackup}
              />
            </label>
          </div>
        </div>

        {/* DOWNLOAD STANDALONE HTML */}
        <div className="p-4 rounded-2xl border border-[#818cf8]/25 bg-[#0f172a]/75 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#facc15]" />
              Unduh Standalone HTML
            </h4>
            <p className="text-xs text-[#cbd5e1] mt-0.5">
              File HTML mandiri satu halaman yang siap di-hosting di mana saja.
            </p>
          </div>
          <button
            onClick={downloadStandaloneHtml}
            className="px-4 py-2 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold shrink-0 transition shadow-[0_0_12px_rgba(250,204,21,0.3)]"
          >
            Unduh HTML
          </button>
        </div>

        {/* PANDUAN GITHUB PAGES */}
        <div className="p-3.5 rounded-2xl bg-[#1f1430]/70 border border-[#818cf8]/30 text-xs text-[#cbd5e1] space-y-1">
          <p className="font-bold text-[#facc15] flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-[#38bdf8]" />
            Deploy Otomatis ke GitHub Pages:
          </p>
          <p>
            Jalankan <code className="bg-[#070a14] text-[#38bdf8] px-1.5 py-0.5 rounded font-mono">npm run deploy</code> untuk mempublikasikan ke branch <code className="bg-[#070a14] text-[#facc15] px-1.5 py-0.5 rounded font-mono">gh-pages</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
