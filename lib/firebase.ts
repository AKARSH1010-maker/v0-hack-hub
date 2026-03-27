import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDBSg3st-olAfGTPrIbwsKKu2kuERxV5qY",
  authDomain: "hackhub-5cdc0.firebaseapp.com",
  projectId: "hackhub-5cdc0",
  storageBucket: "hackhub-5cdc0.firebasestorage.app",
  messagingSenderId: "544423456644",
  appId: "1:544423456644:web:858020649c47cbdc12f7d1",
  measurementId: "G-QDQ7W7Z12T"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export default app