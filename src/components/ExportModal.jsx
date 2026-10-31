import React, { useState } from 'react';
import { X, Download, Copy, Check, Globe, Code2 } from 'lucide-react';

export default function ExportModal({
  isOpen,
  onClose,
  profile,
  appearance,
  links,
  slug,
  showToast,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const publicUrl = window.location.origin + window.location.pathname;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    showToast('Tautan profil disalin!');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadStandaloneHtml = () => {
    const activeLinks = links.filter((l) => l.enabled !== false);
    const bgStyle =
      appearance.bgMode === 'image' && appearance.customImageData
        ? `background: linear-gradient(rgba(0,0,0,${
            (appearance.imageOverlayOpacity || 45) / 100
          }), rgba(0,0,0,${
            (appearance.imageOverlayOpacity || 45) / 100
          })), url('${appearance.customImageData}'); background-size: cover; background-position: center; background-attachment: fixed;`
        : appearance.bgMode === 'solid'
        ? `background-color: ${appearance.solidBgColor || '#090D16'};`
        : `background: linear-gradient(-45deg, #090D16, #0D3B2E, #1E1B4B, #064E3B, #311042); background-size: 300% 300%; animation: aurora 12s ease infinite;`;

    const htmlStr = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name || 'Link in Bio'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap" rel="stylesheet">
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
      border: 2px solid rgba(255,255,255,0.25);
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);
    }
    h1 {
      font-size: 22px;
      margin: 0 0 4px;
      letter-spacing: -0.02em;
    }
    .role {
      font-size: 13px;
      opacity: 0.85;
      margin: 0 0 8px;
    }
    .bio {
      font-size: 13px;
      opacity: 0.8;
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
      border-radius: 18px;
      background: ${appearance.cardBgColor || 'rgba(255,255,255,0.12)'};
      color: ${appearance.cardTextColor || '#FFFFFF'};
      border: 1px solid rgba(255,255,255,0.20);
      text-decoration: none;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .link-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }
    .link-card:active {
      transform: scale(0.98);
    }
    .link-title {
      font-weight: 600;
      font-size: 14px;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-box {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: rgba(255,255,255,0.18);
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
      opacity: 0.6;
      font-size: 16px;
    }
    footer {
      margin-top: 48px;
      font-size: 11px;
      opacity: 0.45;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="${profile.avatar}" alt="${profile.name}" class="avatar">
    <h1>${profile.name}</h1>
    ${profile.role ? `<p class="role">${profile.role}</p>` : ''}
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
              : `<span>🌐</span>`
          }
        </div>
        <div class="link-title">${l.title}</div>
        <span class="arrow">↗</span>
      </a>`
        )
        .join('')}
    </div>

    <footer>
      <p>© ${new Date().getFullYear()} ${profile.name}. Dibuat dengan OpikLink.</p>
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Publikasi & Download</h3>
            <p className="text-xs text-zinc-500">
              Opsi publikasi langsung atau ekspor file untuk GitHub Pages.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SALIN TAUTAN */}
        <div className="p-4 rounded-2xl border border-zinc-200/90 bg-zinc-50 space-y-2">
          <label className="text-xs font-semibold text-zinc-700 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-purple-600" />
            Tautan Profil Langsung
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={publicUrl}
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-zinc-300 text-xs font-mono text-zinc-600 outline-none"
            />
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
        </div>

        {/* DOWNLOAD STANDALONE HTML */}
        <div className="p-4 rounded-2xl border border-zinc-200/90 bg-zinc-50 flex items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-600" />
              Unduh Standalone HTML
            </h4>
            <p className="text-xs text-zinc-500 mt-0.5">
              File HTML mandiri satu halaman yang siap di-upload ke GitHub Pages tanpa konfigurasi tambahan.
            </p>
          </div>
          <button
            onClick={downloadStandaloneHtml}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shrink-0 transition shadow-xs"
          >
            Unduh HTML
          </button>
        </div>

        {/* PANDUAN GITHUB PAGES */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/70 text-xs text-purple-900 space-y-1.5">
          <p className="font-bold flex items-center gap-1.5">
            <Code2 className="w-4 h-4" />
            Deploy Otomatis ke GitHub Pages:
          </p>
          <p className="text-purple-800">
            Cukup jalankan <code className="bg-purple-200/60 px-1.5 py-0.5 rounded font-mono">npm run build</code> lalu upload folder <code className="bg-purple-200/60 px-1.5 py-0.5 rounded font-mono">dist</code> ke branch <code className="bg-purple-200/60 px-1.5 py-0.5 rounded font-mono">gh-pages</code> di repository GitHub Anda!
          </p>
        </div>
      </div>
    </div>
  );
}
