// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLSfN1cQ7IPJROslL3MaTNF65TlnX0Gjk",
  authDomain: "expense-tracker-app-c27f6.firebaseapp.com",
  projectId: "expense-tracker-app-c27f6",
  storageBucket: "expense-tracker-app-c27f6.firebasestorage.app",
  messagingSenderId: "396037366122",
  appId: "1:396037366122:web:e310a5e318332960868513"
};

// Initialize Firebase
 const  app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
