
import { initializeApp } from 'firebase/app';
import {
  getFirestore, connectFirestoreEmulator,
} from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0AwFrt6g538nTTWBjK41svpnjZkbyeck",
  authDomain: "naveen-portfolio-blog.firebaseapp.com",
  projectId: "naveen-portfolio-blog",
  storageBucket: "naveen-portfolio-blog.firebasestorage.app",
  messagingSenderId: "373115473066",
  appId: "1:373115473066:web:87d2577ec2a32a4df454d3",
  measurementId: "G-9DFKCCZ4KD"
};

// Initialize Firebase
const app      = initializeApp(firebaseConfig);
export const db     = getFirestore(app);
export const auth   = getAuth(app);
export const storage = getStorage(app);

/**
 * Use emulators only when BOTH conditions are true:
 *  1. we’re running the dev build  AND
 *  2. we’re on localhost (so the emulators are reachable)
 */
const onLocalhost = window.location.hostname === 'localhost';
const devBuild    = import.meta.env.MODE === 'development';   // Vite / Next
// const devBuild = process.env.NODE_ENV === 'development';   // CRA / Webpack

if (devBuild && onLocalhost) {
  connectAuthEmulator(auth,    'http://127.0.0.1:9099');  // default port
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectStorageEmulator(storage, '127.0.0.1', 9199);
}

export default app;