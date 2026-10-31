import React, { useState, useEffect } from 'react';
import { X, Flame, Check, AlertCircle, Database, ExternalLink, RefreshCw } from 'lucide-react';
import { getStoredFirebaseConfig, isFirebaseConfigured } from '../firebase/config';
import { saveBioToCloud } from '../firebase/bioService';

export default function FirebaseModal({ isOpen, onClose, currentState, showToast, onConnected }) {
  const [configText, setConfigText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredFirebaseConfig();
      if (stored) {
        setIsConnected(true);
        setConfigText(JSON.stringify(stored, null, 2));
      } else {
        setIsConnected(false);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!configText.trim()) return;

    try {
      let parsed = null;
      // 1. Coba parse JSON murni
      try {
        parsed = JSON.parse(configText);
      } catch (err) {
        // 2. Ekstrak field satu per satu jika user paste kode javascript
        const fields = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId', 'measurementId'];
        const extracted = {};
        for (const f of fields) {
          const regex = new RegExp(`['"]?${f}['"]?\\s*:\\s*['"]([^'"]+)['"]`);
          const m = configText.match(regex);
          if (m) {
            extracted[f] = m[1];
          }
        }
        if (extracted.apiKey && extracted.projectId) {
          parsed = extracted;
        }
      }

      if (!parsed || !parsed.apiKey || !parsed.projectId) {
        throw new Error('Config harus memiliki apiKey dan projectId!');
      }

      localStorage.setItem('opiklink_firebase_config', JSON.stringify(parsed));
      setIsConnected(true);
      showToast('Firebase berhasil dikonfigurasi!');

      // Langsung sinkronkan data saat ini ke cloud
      setSaving(true);
      try {
        await saveBioToCloud(currentState, currentState.slug || 'lutfi');
        showToast('Data saat ini berhasil diunggah ke Cloud Firestore!');
        if (onConnected) onConnected();
      } catch (cloudErr) {
        console.error(cloudErr);
        showToast('Koneksi tersimpan, tapi pastikan aturan Firestore Rules sudah dibuat!');
      } finally {
        setSaving(false);
      }
    } catch (err) {
      console.error(err);
      showToast('Gagal memproses konfigurasi Firebase! Pastikan format benar.');
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('opiklink_firebase_config');
    setIsConnected(false);
    setConfigText('');
    showToast('Koneksi Firebase telah diputuskan.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Database Cloud Firebase</h3>
              <p className="text-xs text-zinc-500">
                Sinkronkan perubahan dari editor langsung ke publik seketika.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STATUS KONEKSI */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isConnected
            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : 'bg-zinc-50 border-zinc-200 text-zinc-700'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`}></div>
            <div>
              <p className="text-xs font-bold">
                {isConnected ? 'Terhubung ke Cloud Firestore' : 'Belum Terhubung ke Database'}
              </p>
              <p className="text-[11px] opacity-80">
                {isConnected
                  ? 'Setiap editan Anda akan langsung tersinkron ke publik di seluruh dunia.'
                  : 'Publik masih membaca data lokal/baku bawaan.'}
              </p>
            </div>
          </div>
          {isConnected && (
            <button
              onClick={handleDisconnect}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-100/60 transition"
            >
              Putuskan
            </button>
          )}
        </div>

        {/* PANDUAN CEPAT (3 LANGKAH) */}
        <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 text-xs text-zinc-700 space-y-2">
          <p className="font-bold text-zinc-900 flex items-center gap-1.5">
            <Database className="w-4 h-4 text-amber-600" />
            Cara Dapatkan Firebase Config (Gratis 100%):
          </p>
          <ol className="list-decimal list-inside space-y-1 text-zinc-600 leading-relaxed">
            <li>
              Buka{' '}
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-amber-600 font-semibold underline inline-flex items-center gap-0.5"
              >
                Firebase Console <ExternalLink className="w-3 h-3 inline" />
              </a>{' '}
              dan buat proyek baru.
            </li>
            <li>Di menu kiri, buat <strong>Firestore Database</strong> (Pilih *Start in test mode*).</li>
            <li>Di *Project Settings* (ikon gerigi), klik tambah Web App (<strong>&lt;/&gt;</strong>) lalu salin <strong>firebaseConfig</strong>.</li>
          </ol>
        </div>

        {/* FORM INPUT CONFIG */}
        <form onSubmit={handleSaveConfig} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              Tempel (Paste) Firebase Config Anda di Sini:
            </label>
            <textarea
              rows={6}
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "projek-anda.firebaseapp.com",\n  "projectId": "projek-anda",\n  "storageBucket": "projek-anda.appspot.com",\n  "messagingSenderId": "...",\n  "appId": "..."\n}`}
              className="w-full p-3 rounded-xl border border-zinc-300 text-xs font-mono bg-zinc-50 focus:bg-white focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyinkronkan...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Simpan & Sinkronkan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
