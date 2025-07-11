

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0AwFrt6g538nTTWBjK41svpnjZkbyeck",
  authDomain: "naveen-portfolio-blog.firebaseapp.com",
  projectId: "naveen-portfolio-blog",
  storageBucket: "naveen-portfolio-blog.appspot.com", // Fixed: removed .firebasestorage.app
  messagingSenderId: "373115473066",
  appId: "1:373115473066:web:87d2577ec2a32a4df454d3",
  measurementId: "G-9DFKCCZ4KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Only connect to emulators in development and if not already connected
if (process.env.NODE_ENV === 'development') {
  try {
    // Only connect if not already connected
    if (!auth._delegate?._config?.emulator) {
      connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }
  } catch (error) {
    console.log('Auth emulator already connected or not available');
  }
}

export default app;