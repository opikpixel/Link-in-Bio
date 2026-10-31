import React, { useState } from 'react';
import { X, Mail, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, userEmail, onLogin, onLogout }) {
  const [inputEmail, setInputEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    onLogin(inputEmail.trim());
    setInputEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl transition-all">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-zinc-900">Akun Pengguna</h3>
            <p className="text-xs text-zinc-500">
              Sinkronisasi data tautan dan kustomisasi Anda ke profil email.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {userEmail ? (
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/90 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${userEmail}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full bg-zinc-200 object-cover"
              />
              <div>
                <p className="text-xs text-zinc-500">Tersambung sebagai:</p>
                <p className="text-sm font-bold text-zinc-900">{userEmail}</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
              >
                Keluar Akun
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Alamat Email (Google)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="nama.anda@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:border-zinc-900 transition"
                  autoFocus
                />
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition shadow-xs"
            >
              Hubungkan & Simpan Data
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
