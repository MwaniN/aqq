import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBTK2yFoiBFfO-rENxfZBIYxdICVcz4WQA",
  authDomain: "anime-quote-quiz.firebaseapp.com",
  projectId: "anime-quote-quiz",
  storageBucket: "anime-quote-quiz.firebasestorage.app",
  messagingSenderId: "660830718792",
  appId: "1:660830718792:web:3308cb7142ab30f88a017d",
  measurementId: "G-JYPQZ7KM1L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();

export { auth }