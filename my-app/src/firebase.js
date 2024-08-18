// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore'; // Firestore fonksiyonlarını içe aktar

const firebaseConfig = {
  apiKey: "AIzaSyC5aU7iozchtUjgoivGKeLThEnrW7kfFrw",
  authDomain: "loginregisterproject-f592d.firebaseapp.com",
  projectId: "loginregisterproject-f592d",
  storageBucket: "loginregisterproject-f592d.appspot.com",
  messagingSenderId: "458011883030",
  appId: "1:458011883030:web:d4dd592f472f024ffce737",
  measurementId: "G-H6ETFEV546"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firestore'u başlat
const database = getFirestore(app);

export { database, collection, onSnapshot };
