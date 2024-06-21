// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALwhedho_WUePlYsdA2Dc2FytZdG6ogx8",
  authDomain: "analtics-online.firebaseapp.com",
  projectId: "analtics-online",
  storageBucket: "analtics-online.appspot.com",
  messagingSenderId: "1063795465473",
  appId: "1:1063795465473:web:10722793bea3f2cd7d8f00"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);