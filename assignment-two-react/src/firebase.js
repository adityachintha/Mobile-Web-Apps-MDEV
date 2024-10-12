// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YAIzaSyDAz9Ni4l6RABqhOrEPqcIAyJqA2WO9Vm0",
  authDomain: "web-apps-6adb3.firebaseapp.com",
  projectId: "web-apps-6adb3",
  storageBucket: "web-apps-6adb3.appspot.com",
  messagingSenderId: "592723119087",
  appId: "1:592723119087:web:e888504e2716eac0b0841a",
  measurementId: "G-GHLPYMX6WL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
