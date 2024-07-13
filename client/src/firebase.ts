// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "blog-sbkashif.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "blog-sbkashif",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "blog-sbkashif.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID || "791154161079",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:791154161079:web:b48f9d938954630cb02432"
  };

// console.log("Firebase Config: ", firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

