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
        setErrorMessage('Email atau kata sandi salah. Pastikan sesuai dengan yang dibuat di Firebase Console.');
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
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="maghrib-glass tech-corner-box bg-[#070a14]/95 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#818cf8]/30 text-white">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
              currentUser
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/40'
            }`}>
              {currentUser ? <ShieldCheck className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#facc15] tracking-tight italic">
                {currentUser ? 'AKUN ADMIN TERVERIFIKASI' : 'LOGIN ADMIN STUDIO'}
              </h3>
              <p className="text-xs text-[#cbd5e1]">
                {currentUser
                  ? 'Anda memiliki hak akses penuh untuk mengubah profil'
                  : 'Masuk dengan akun Firebase untuk mengedit & menyimpan'}
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

        {/* JIKA SUDAH LOGIN */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0f172a]/90 border border-[#818cf8]/25 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser.email}`}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full bg-[#1f1430] border-2 border-[#facc15] object-cover shadow-xs"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#facc15]/15 text-[#facc15] border border-[#facc15]/40">
                      [ADMIN AKTIF]
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white truncate mt-1">
                    {currentUser.email}
                  </p>
                  <p className="text-[11px] text-[#cbd5e1]/75 font-mono">
                    UID: <span className="text-[#38bdf8]">{currentUser.uid.slice(0, 10)}...</span>
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 leading-relaxed">
                Perubahan yang Anda lakukan di editor akan otomatis tersimpan dan disinkronkan ke halaman publik secara real-time.
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={onClose}
                className="ghost-pill-btn px-4 py-2 text-xs font-semibold text-[#cbd5e1]"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-full border border-[#e11d48]/50 bg-[#e11d48]/15 hover:bg-[#e11d48]/25 text-rose-300 text-xs font-bold flex items-center gap-1.5 transition"
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
              <div className="p-3 rounded-xl bg-[#e11d48]/15 border border-[#e11d48]/40 text-rose-200 text-xs flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-[#e11d48]" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#facc15] mb-1">
                  Email Admin
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0f172a] border border-[#818cf8]/30 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#facc15] transition"
                    autoFocus
                  />
                  <Mail className="w-4 h-4 text-[#38bdf8] absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#38bdf8] mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#0f172a] border border-[#818cf8]/30 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8] transition"
                  />
                  <Lock className="w-4 h-4 text-[#38bdf8] absolute left-3 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-[#facc15] transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0f172a]/80 border border-[#818cf8]/25 text-[11px] text-[#cbd5e1] leading-relaxed">
              Gunakan email & kata sandi yang telah Anda daftarkan di menu <strong className="text-[#facc15]">Authentication</strong> pada Firebase Console.
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="ghost-pill-btn px-4 py-2 text-xs font-semibold text-[#cbd5e1]"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 rounded-full bg-[#facc15] hover:bg-[#fde047] text-[#070a14] text-xs font-bold transition shadow-[0_0_15px_rgba(250,204,21,0.3)] flex items-center gap-2 disabled:opacity-50"
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
