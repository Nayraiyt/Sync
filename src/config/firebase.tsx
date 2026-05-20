// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi-4BQsiQ6nNFVjvu2vDu3p1zG2Nz4Q0I",
  authDomain: "sync-spr1nt.firebaseapp.com",
  projectId: "sync-spr1nt",
  storageBucket: "sync-spr1nt.firebasestorage.app",
  messagingSenderId: "706312730906",
  appId: "1:706312730906:web:4fa30845df4e796e0194a3",
  measurementId: "G-4J320Z7ZHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const database = getFirestore(app);