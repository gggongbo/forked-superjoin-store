import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY as string,
  authDomain: 'peeps-business.firebaseapp.com',
  projectId: 'peeps-business',
  storageBucket: 'peeps-business.appspot.com',
  messagingSenderId: '58864711977',
  appId: '1:58864711977:web:5b3824124c060f69a31f38',
  measurementId: 'G-167LQDWY1R',
};

const app = initializeApp(firebaseConfig, { name: 'client' });
const db = getFirestore(app);

export { db };
