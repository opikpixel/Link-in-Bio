import React, { useState, useEffect, useRef } from 'react';
import { DEFAULT_STATE } from './data/defaultState';
import Navbar from './components/Navbar';
import LinksEditor from './components/LinksEditor';
import AppearanceEditor from './components/AppearanceEditor';
import AnalyticsView from './components/AnalyticsView';
import PhonePreview from './components/PhonePreview';
import PublicBioPage from './components/PublicBioPage';
import AuthModal from './components/AuthModal';
import ExportModal from './components/ExportModal';
import FirebaseModal from './components/FirebaseModal';
import Toast from './components/Toast';
import { ShieldAlert, Lock } from 'lucide-react';
import { isFirebaseConfigured } from './firebase/config';
import { fetchBioFromCloud, saveBioToCloud, subscribeBioFromCloud } from './firebase/bioService';
import { subscribeFirebaseUser } from './firebase/authService';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('opiklink_active_user') || '';
  });

  const getStorageKey = (email) => {
    return email
      ? `opiklink_state_${email.toLowerCase().trim()}`
      : 'opiklink_state_guest';
  };

  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(getStorageKey(userEmail));
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved state', e);
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  });

  const [activeTab, setActiveTab] = useState('links');
  const [viewMode, setViewMode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    // Jika URL mengandung ?edit=true atau #edit, masuk ke Editor
    if (
      params.get('edit') === 'true' ||
      params.get('mode') === 'editor' ||
      hash === '#edit' ||
      hash === '#editor'
    ) {
      return 'editor';
    }
    // Default untuk publik/pengunjung: Halaman Profil Link-in-Bio
    return 'preview';
  });

  const [toastMessage, setToastMessage] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isFirebaseOpen, setIsFirebaseOpen] = useState(false);
  const [isCloudConnected, setIsCloudConnected] = useState(() => isFirebaseConfigured());
  const isInitialCloudSyncDone = useRef(false);

  // Listener status login Firebase Auth
  useEffect(() => {
    const unsubscribeAuth = subscribeFirebaseUser((user) => {
      setCurrentUser(user);
      if (user) {
        setUserEmail(user.email || '');
        localStorage.setItem('opiklink_active_user', user.email || '');
      } else {
        setUserEmail('');
        localStorage.removeItem('opiklink_active_user');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Ambil data dari Firebase Firestore saat aplikasi pertama kali dimuat
  useEffect(() => {
    if (isFirebaseConfigured()) {
      setIsCloudConnected(true);
      const slug = state.slug || 'lutfi';

      // Subscribe perubahan secara real-time dari Cloud Firestore
      const unsubscribeCloud = subscribeBioFromCloud(slug, (cloudData) => {
        if (cloudData && cloudData.profile && cloudData.links) {
          setState((prev) => ({
            ...prev,
            ...cloudData,
          }));
          isInitialCloudSyncDone.current = true;
        }
      });

      return () => unsubscribeCloud();
    }
  }, [state.slug]);

  // Sinkronkan editan ke Cloud Firestore secara otomatis (Debounced 1.5s)
  // KEAMANAN: HANYA berjalan jika Admin TERAUTENTIKASI (Logged In)
  useEffect(() => {
    if (!isFirebaseConfigured() || !isInitialCloudSyncDone.current) return;
    if (!currentUser) return; // Pengunjung tanpa login tidak akan bisa memicu penulisan ke cloud

    const timer = setTimeout(() => {
      saveBioToCloud(state, state.slug || 'lutfi')
        .then(() => {
          console.log('Perubahan berhasil diunggah otomatis ke Cloud Firestore');
        })
        .catch((err) => {
          console.error('Gagal auto-save ke cloud:', err);
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, [state, currentUser]);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(getStorageKey(userEmail), JSON.stringify(state));
  }, [state, userEmail]);

  // Track page view once per session
  useEffect(() => {
    const hasCounted = sessionStorage.getItem('opiklink_view_counted');
    if (!hasCounted) {
      setState((prev) => ({
        ...prev,
        analytics: {
          ...prev.analytics,
          totalViews: (prev.analytics?.totalViews || 0) + 1,
        },
      }));
      sessionStorage.setItem('opiklink_view_counted', 'true');
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleLinkClick = (linkId) => {
    setState((prev) => ({
      ...prev,
      links: prev.links.map((link) =>
        link.id === linkId
          ? { ...link, clicks: (link.clicks || 0) + 1 }
          : link
      ),
    }));
  };

  const handleResetStats = () => {
    setState((prev) => ({
      ...prev,
      analytics: { totalViews: 1 },
      links: prev.links.map((l) => ({ ...l, clicks: 0 })),
    }));
    showToast('Statistik analitik telah di-reset');
  };

  const handleImportConfig = (newConfig) => {
    if (!newConfig || !newConfig.profile || !newConfig.links) {
      showToast('Format file JSON tidak valid!');
      return;
    }
    setState(newConfig);
    showToast('Konfigurasi berhasil dipulihkan!');
  };

  // JIKA DALAM MODE PUBLIK (DEFAULT HALAMAN PROFIL BIO)
  if (viewMode === 'preview') {
    return (
      <PublicBioPage
        profile={state.profile}
        appearance={state.appearance}
        links={state.links}
        onLinkClick={handleLinkClick}
        onBackToEditor={() => setViewMode('editor')}
      />
    );
  }

  // MODE STUDIO EDITOR
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F3EF] selection:bg-zinc-900 selection:text-white">
      {/* NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenFirebase={() => setIsFirebaseOpen(true)}
        isCloudConnected={isCloudConnected}
        slug={state.slug || 'lutfi'}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: EDITORS */}
        <div className="lg:col-span-7 space-y-6">
          {/* BANNER KEAMANAN: Jika belum login sebagai Admin */}
          {!currentUser && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold">Mode Pratinjau Editor (Tamu / Belum Login)</p>
                  <p className="text-[11px] text-amber-700 leading-tight">
                    Perubahan Anda hanya tersimpan lokal di browser ini. Masuk dengan akun Firebase untuk memperbarui link bio publik.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs shrink-0 self-end sm:self-auto"
              >
                Login Admin
              </button>
            </div>
          )}

          {activeTab === 'links' && (
            <LinksEditor
              links={state.links}
              setLinks={(newLinks) =>
                setState((prev) => ({ ...prev, links: newLinks }))
              }
              showToast={showToast}
            />
          )}

          {activeTab === 'appearance' && (
            <AppearanceEditor
              profile={state.profile}
              setProfile={(newProfile) =>
                setState((prev) => ({ ...prev, profile: newProfile }))
              }
              appearance={state.appearance}
              setAppearance={(newAppearance) =>
                setState((prev) => ({ ...prev, appearance: newAppearance }))
              }
              showToast={showToast}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              links={state.links}
              analytics={state.analytics}
              onResetStats={handleResetStats}
            />
          )}
        </div>

        {/* RIGHT COLUMN: LIVE PHONE PREVIEW */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex justify-center">
          <PhonePreview
            profile={state.profile}
            appearance={state.appearance}
            links={state.links}
            onLinkClick={handleLinkClick}
          />
        </div>
      </main>

      {/* MODALS & NOTIFICATIONS */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        showToast={showToast}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        profile={state.profile}
        appearance={state.appearance}
        links={state.links}
        slug={state.slug || 'lutfi'}
        fullState={state}
        onImportConfig={handleImportConfig}
        showToast={showToast}
      />

      <FirebaseModal
        isOpen={isFirebaseOpen}
        onClose={() => setIsFirebaseOpen(false)}
        currentState={state}
        showToast={showToast}
        onConnected={() => setIsCloudConnected(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <Toast message={toastMessage} />
    </div>
  );
}
