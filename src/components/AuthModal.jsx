import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, ShieldAlert, LogOut, Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginWithFirebase, logoutFromFirebase } from '../firebase/authService';

export default function AuthModal({ isOpen, onClose, currentUser, showToast }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Harap isi email dan kata sandi.');
      return;
    }

    setLoading(true);
    try {
      await loginWithFirebase(email.trim(), password);
      showToast?.(`Berhasil masuk sebagai ${email.trim()}`);
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      const code = err.code || '';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setErrorMessage('Email atau kata sandi salah. Pastikan sudah sesuai dengan yang dibuat di Firebase Console.');
      } else if (code === 'auth/invalid-email') {
        setErrorMessage('Format alamat email tidak valid.');
      } else if (code === 'auth/too-many-requests') {
        setErrorMessage('Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat.');
      } else {
        setErrorMessage(err.message || 'Gagal masuk. Periksa koneksi internet Anda.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutFromFirebase();
      showToast?.('Anda telah keluar dari akun Admin.');
      onClose();
    } catch (err) {
      console.error('Logout error:', err);
      showToast?.('Gagal keluar.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl transition-all">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              currentUser
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
            }`}>
              {currentUser ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                {currentUser ? 'Akun Admin Terverifikasi' : 'Login Admin Studio'}
              </h3>
              <p className="text-xs text-zinc-500">
                {currentUser
                  ? 'Anda memiliki hak akses penuh untuk mengubah profil'
                  : 'Masuk dengan akun Firebase untuk mengedit & menyimpan'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* JIKA SUDAH LOGIN */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser.email}`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full bg-zinc-200 border-2 border-emerald-500 object-cover shadow-xs"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      ADMIN AKTIF
                    </span>
                  </div>
                  <p className="text-sm font-bold text-zinc-900 truncate mt-0.5">
                    {currentUser.email}
                  </p>
                  <p className="text-[11px] text-zinc-500">
                    UID: <span className="font-mono text-zinc-600">{currentUser.uid.slice(0, 10)}...</span>
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-200 text-[11px] text-emerald-800 leading-relaxed">
                Perubahan yang Anda lakukan di editor akan otomatis tersimpan dan disinkronkan ke halaman publik secara real-time.
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition shadow-2xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar Akun (Logout)</span>
              </button>
            </div>
          </div>
        ) : (
          /* FORM LOGIN */
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Email Admin
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-300 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition"
                    autoFocus
                  />
                  <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-zinc-300 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 transition"
                  />
                  <Lock className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-[11px] text-zinc-500 leading-relaxed">
              Gunakan email & kata sandi yang telah Anda daftarkan di menu <strong>Authentication</strong> pada Firebase Console.
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-100 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition shadow-xs flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Masuk ke Studio</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
