// firebaseConfig.js
/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1GK_crBQhnKxG84KwbHGR-7HobHF4EmE",
  authDomain: "mywebsiteisawe.firebaseapp.com",
  projectId: "mywebsiteisawe",
  storageBucket: "mywebsiteisawe.firebasestorage.app",
  messagingSenderId: "109060293279",
  appId: "1:109060293279:web:9f07d1827c305ddb7d58aa",
  measurementId: "G-RG5MCZ9ETE"
};
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: "G-RG5MCZ9ETE"
// };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


import { getAnalytics, isSupported } from "firebase/analytics";

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { db };