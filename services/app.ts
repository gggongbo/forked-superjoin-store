import { initializeApp, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const storeFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY as string,
  authDomain: 'peeps-store-22f24.firebaseapp.com',
  projectId: 'peeps-store-22f24',
  storageBucket: 'peeps-store-22f24.appspot.com',
  messagingSenderId: '260208879136',
  appId: '1:260208879136:web:30aaea5c3c42377c04fe45',
  measurementId: 'G-K6JLR9GG38',
};

const businessFirebaseConfig = {
  apiKey: 'AIzaSyCG4K72fSes1zjUxie3WrcnNEJPANOmGoA',
  authDomain: 'peeps-business.firebaseapp.com',
  databaseURL: 'https://peeps-business-default-rtdb.firebaseio.com',
  projectId: 'peeps-business',
  storageBucket: 'peeps-business.appspot.com',
  messagingSenderId: '58864711977',
  appId: '1:58864711977:web:5b3824124c060f69a31f38',
  measurementId: 'G-167LQDWY1R',
};

try {
  initializeApp(storeFirebaseConfig, 'store');
  initializeApp(businessFirebaseConfig, 'business');
} catch (e) {
  /* empty */
}

const app = getApp('store');
const businessApp = getApp('business');
const db = getFirestore(app);
const businessDb = getFirestore(businessApp);
const auth = getAuth(app);
const functions = getFunctions(app);

if (process.env.NODE_ENV === 'development') {
  try {
    connectFirestoreEmulator(db, 'localhost', 8280);
    connectFunctionsEmulator(functions, 'localhost', 5201);
    connectAuthEmulator(auth, 'http://localhost:9399');
  } catch (e) {
    // no logic
  }
}

export { db, functions, auth, businessDb };
