// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "manish-projects-c95c4.firebaseapp.com",
  projectId: "manish-projects-c95c4",
  storageBucket: "manish-projects-c95c4.appspot.com",
  messagingSenderId: "148053869711",
  appId: "1:148053869711:web:cea80f3146314c199b5cfa",
  measurementId: "G-068DTNJGBF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
