import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_KEY,
  authDomain: "sync-spr1nt.firebaseapp.com",
  projectId: "sync-spr1nt",
  storageBucket: "sync-spr1nt.firebasestorage.app",
  messagingSenderId: "706312730906",
  appId: "1:706312730906:web:4fa30845df4e796e0194a3",
  measurementId: "G-4J320Z7ZHJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);