import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjehWyPboEerHBy5NIfDs6TxPdj1AWk94",
  authDomain: "whatsapp-eca49.firebaseapp.com",
  projectId: "whatsapp-eca49",
  storageBucket: "whatsapp-eca49.appspot.com",
  messagingSenderId: "1094555325009",
  appId: "1:1094555325009:web:3a67448cfb7f6d12245e70",
};

// Initialize Firebase
const apps = getApps();
const app = !apps.length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
