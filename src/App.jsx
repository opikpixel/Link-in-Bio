import React, { useState, useEffect } from 'react';
import { DEFAULT_STATE } from './data/defaultState';
import Navbar from './components/Navbar';
import LinksEditor from './components/LinksEditor';
import AppearanceEditor from './components/AppearanceEditor';
import AnalyticsView from './components/AnalyticsView';
import PhonePreview from './components/PhonePreview';
import PublicBioPage from './components/PublicBioPage';
import AuthModal from './components/AuthModal';
import ExportModal from './components/ExportModal';
import Toast from './components/Toast';

export default function App() {
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

  // Auto-save to localStorage whenever state or userEmail changes
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

  const handleLogin = (email) => {
    setUserEmail(email);
    localStorage.setItem('opiklink_active_user', email);
    const saved = localStorage.getItem(getStorageKey(email));
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    showToast(`Tersambung ke ${email}`);
  };

  const handleLogout = () => {
    setUserEmail('');
    localStorage.removeItem('opiklink_active_user');
    setState(JSON.parse(JSON.stringify(DEFAULT_STATE)));
    showToast('Telah keluar dari akun');
  };

  const handleImportConfig = (newConfig) => {
    if (!newConfig || !newConfig.profile || !newConfig.links) {
      showToast('Format file JSON tidak valid!');
      return;
    }
    setState(newConfig);
    showToast('Konfigurasi berhasil dipulihkan!');
  };

  // IF IN FULL PUBLIC BIO PREVIEW MODE
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

  // STUDIO EDITOR MODE
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F3EF] selection:bg-zinc-900 selection:text-white">
      {/* NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userEmail={userEmail}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        slug={state.slug || 'lutfi'}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* WORKSPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: EDITORS (Tautan, Tampilan, Analitik) */}
        <div className="lg:col-span-7 space-y-6">
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
        userEmail={userEmail}
        onLogin={handleLogin}
        onLogout={handleLogout}
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

      <Toast message={toastMessage} />
    </div>
  );
}
