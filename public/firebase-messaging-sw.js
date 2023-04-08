importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

firebase.initializeApp({
  apiKey: 'AIzaSyD9UMmEqiCoTo-GHPWrvgynK88HKefTeLU',
  authDomain: 'peeps-store-22f24.firebaseapp.com',
  projectId: 'peeps-store-22f24',
  storageBucket: 'peeps-store-22f24.appspot.com',
  messagingSenderId: '260208879136',
  appId: '1:260208879136:web:30aaea5c3c42377c04fe45',
  measurementId: 'G-K6JLR9GG38',
});

const messaging = firebase.messaging();
