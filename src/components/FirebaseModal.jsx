import React, { useState, useEffect } from 'react';
import { X, Flame, Check, RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { getStoredFirebaseConfig } from '../firebase/config';
import { saveBioToCloud } from '../firebase/bioService';
import { getCurrentFirebaseUser } from '../firebase/authService';

export default function FirebaseModal({ isOpen, onClose, currentState, showToast, onConnected, onOpenAuth }) {
  const [configText, setConfigText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [saving, setSaving] = useState(false);
  const currentUser = getCurrentFirebaseUser();

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
      try {
        parsed = JSON.parse(configText);
      } catch (err) {
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
      showToast('Konfigurasi Firebase tersimpan!');

      if (!getCurrentFirebaseUser()) {
        showToast('Konfigurasi siap! Silakan Login Admin untuk menyinkronkan data.');
        if (onConnected) onConnected();
        return;
      }

      setSaving(true);
      try {
        await saveBioToCloud(currentState, currentState.slug || 'lutfi');
        showToast('Data saat ini berhasil diunggah ke Cloud Firestore!');
        if (onConnected) onConnected();
      } catch (cloudErr) {
        console.error(cloudErr);
        showToast('Koneksi tersimpan, pastikan Rules Firestore mengizinkan write untuk akun yang login!');
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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="maghrib-glass tech-corner-box bg-[#070a14]/95 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#818cf8]/30 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/40 flex items-center justify-center">
              <Flame className="w-6 h-6 fill-[#facc15]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#facc15] tracking-tight italic">
                DATABASE CLOUD FIREBASE
              </h3>
              <p className="text-xs text-[#cbd5e1]">
                Sinkronkan perubahan profil seketika ke pengunjung publik.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#cbd5e1] hover:text-[#facc15] hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STATUS KONEKSI */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          isConnected
            ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-300'
            : 'bg-[#0f172a] border-[#818cf8]/25 text-[#cbd5e1]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]' : 'bg-slate-500'}`}></div>
            <div>
              <p className="text-xs font-bold text-white">
                {isConnected ? 'Terhubung ke Cloud Firestore' : 'Belum Terhubung ke Database'}
              </p>
              <p className="text-[11px] opacity-85">
                {isConnected
                  ? 'Data Firestore siap disinkronkan secara aman.'
                  : 'Publik masih membaca data lokal/baku bawaan.'}
              </p>
            </div>
          </div>
          {isConnected && (
            <button
              onClick={handleDisconnect}
              className="px-3 py-1 rounded-full text-xs font-semibold text-rose-300 border border-[#e11d48]/40 hover:bg-[#e11d48]/20 transition"
            >
              Putuskan
            </button>
          )}
        </div>

        {/* STATUS AUTH ADMIN */}
        <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
          currentUser
            ? 'bg-[#0f172a] border-[#facc15]/40 text-[#facc15]'
            : 'bg-[#e11d48]/10 border-[#e11d48]/40 text-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {currentUser ? (
              <ShieldCheck className="w-4 h-4 text-[#facc15]" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-[#e11d48]" />
            )}
            <span>
              {currentUser
                ? `Login sebagai Admin: ${currentUser.email}`
                : 'Belum Login Admin (Akses Tulis/Simpan Terkunci)'}
            </span>
          </div>
          {!currentUser && onOpenAuth && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="px-3 py-1 rounded-full bg-[#facc15] text-[#070a14] font-bold hover:bg-[#fde047] transition"
            >
              Login
            </button>
          )}
        </div>

        {/* FORM INPUT CONFIG */}
        <form onSubmit={handleSaveConfig} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#38bdf8] mb-1">
              Konfigurasi Firebase:
            </label>
            <textarea
              rows={6}
              value={configText}
              onChange={(e) => setConfigText(e.target.value)}
              placeholder={`{\n  "apiKey": "AIzaSy...",\n  "authDomain": "projek-anda.firebaseapp.com",\n  "projectId": "projek-anda",\n  "storageBucket": "projek-anda.appspot.com",\n  "messagingSenderId": "...",\n  "appId": "..."\n}`}
              className="w-full p-3 rounded-xl border border-[#818cf8]/30 text-xs font-mono bg-[#0f172a] text-[#cbd5e1] focus:text-white focus:outline-none focus:border-[#facc15] transition"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="ghost-pill-btn px-4 py-2 text-xs font-semibold text-[#cbd5e1]"
            >
              Tutup
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(250,204,21,0.3)] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Menyinkronkan...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
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
