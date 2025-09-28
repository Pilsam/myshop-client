
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC0uBOcSmEoDWJLjkhdd0J164cj3JmLsgo",
  authDomain: "ecommercereact-3c539.firebaseapp.com",
  projectId: "ecommercereact-3c539",
  storageBucket: "ecommercereact-3c539.appspot.com",
  messagingSenderId: "1049927114359",
  appId: "1:1049927114359:web:26bac549a2a70ec9e8f072"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);