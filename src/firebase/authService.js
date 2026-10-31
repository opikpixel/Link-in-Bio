import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirebaseAuth } from './config';

/**
 * Login dengan Email dan Password admin Firebase
 */
export async function loginWithFirebase(email, password) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth belum terkonfigurasi.');
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

/**
 * Logout dari sesi Firebase
 */
export async function logoutFromFirebase() {
  const auth = getFirebaseAuth();
  if (!auth) return;
  await signOut(auth);
}

/**
 * Listener status login pengguna secara real-time
 */
export function subscribeFirebaseUser(onUserChange) {
  const auth = getFirebaseAuth();
  if (!auth) {
    onUserChange(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    onUserChange(user);
  });
}

/**
 * Ambil data user yang sedang login saat ini
 */
export function getCurrentFirebaseUser() {
  const auth = getFirebaseAuth();
  return auth ? auth.currentUser : null;
}
