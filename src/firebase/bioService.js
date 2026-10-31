import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getFirebaseDb, isFirebaseConfigured } from './config';

const COLLECTION_NAME = 'linkinbio';

/**
 * Mengambil data bio dari Firebase Firestore
 */
export async function fetchBioFromCloud(slug = 'lutfi') {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const docRef = doc(db, COLLECTION_NAME, slug.toLowerCase().trim());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error('Error fetching bio from Firestore:', error);
    return null;
  }
}

/**
 * Menyimpan data bio ke Firebase Firestore
 */
export async function saveBioToCloud(data, slug = 'lutfi') {
  const db = getFirebaseDb();
  if (!db) {
    throw new Error('Firebase belum dikonfigurasi!');
  }

  const cleanSlug = (slug || 'lutfi').toLowerCase().trim();
  const docRef = doc(db, COLLECTION_NAME, cleanSlug);

  const payload = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(docRef, payload, { merge: true });
  return payload;
}

/**
 * Listener real-time agar halaman publik otomatis terupdate saat ada perubahan di editor
 */
export function subscribeBioFromCloud(slug = 'lutfi', onUpdate) {
  const db = getFirebaseDb();
  if (!db) return () => {};

  try {
    const cleanSlug = (slug || 'lutfi').toLowerCase().trim();
    const docRef = doc(db, COLLECTION_NAME, cleanSlug);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        onUpdate(docSnap.data());
      }
    }, (error) => {
      console.warn('Firestore onSnapshot listener error:', error);
    });

    return unsubscribe;
  } catch (err) {
    console.error('Failed to subscribe to Firestore:', err);
    return () => {};
  }
}
