// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/compat/app";
import { getAuth } from 'firebase/compat/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTK2yFoiBFfO-rENxfZBIYxdICVcz4WQA",
  authDomain: "anime-quote-quiz.firebaseapp.com",
  projectId: "anime-quote-quiz",
  storageBucket: "anime-quote-quiz.firebasestorage.app",
  messagingSenderId: "660830718792",
  appId: "1:660830718792:web:3308cb7142ab30f88a017d",
  measurementId: "G-JYPQZ7KM1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);