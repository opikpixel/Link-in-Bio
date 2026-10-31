import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Default static config resmi dari Firebase Console
export const HARDCODED_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCkNTZpA11YwycQptgwOhRK5VaBWA4HX8g",
  authDomain: "opik-link-in-bio.firebaseapp.com",
  projectId: "opik-link-in-bio",
  storageBucket: "opik-link-in-bio.firebasestorage.app",
  messagingSenderId: "866506510391",
  appId: "1:866506510391:web:d0da3387ea151e406cefb2",
  measurementId: "G-2EWXCLRK1H"
};

export const getStoredFirebaseConfig = () => {
  // Cek apakah hardcoded sudah diisi
  if (HARDCODED_FIREBASE_CONFIG.apiKey && HARDCODED_FIREBASE_CONFIG.projectId) {
    return HARDCODED_FIREBASE_CONFIG;
  }
  // Cek localStorage
  const saved = localStorage.getItem('opiklink_firebase_config');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) return parsed;
    } catch (e) {
      console.error('Error parsing stored firebase config', e);
    }
  }
  // Cek Vite environment variables jika ada
  if (import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID) {
    return {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    };
  }
  return null;
};

export const isFirebaseConfigured = () => {
  return getStoredFirebaseConfig() !== null;
};

let dbInstance = null;
let authInstance = null;

export const getFirebaseApp = () => {
  const config = getStoredFirebaseConfig();
  if (!config) return null;
  return getApps().length === 0 ? initializeApp(config) : getApp();
};

export const getFirebaseDb = () => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!dbInstance) {
    dbInstance = getFirestore(app);
  }
  return dbInstance;
};

export const getFirebaseAuth = () => {
  const app = getFirebaseApp();
  if (!app) return null;
  if (!authInstance) {
    authInstance = getAuth(app);
  }
  return authInstance;
};
