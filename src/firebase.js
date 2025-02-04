import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig1 = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const firebaseConfig2 = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};


// Initialize Firebase apps with unique names
const app1 = getApps().length === 0 ? initializeApp(firebaseConfig1) : getApp(); // Default app
const app2 = !getApps().some(app => app.name === "app2") ? initializeApp(firebaseConfig2, "app2") : getApp("app2");

export const auth1 = getAuth(app1);
export const auth2 = getAuth(app2);

export const db = getFirestore(app2)
export const storage = getStorage(app2)

export const googleProvider1 = new GoogleAuthProvider();
export const googleProvider2 = new GoogleAuthProvider();