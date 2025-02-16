import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';


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

console.log(firebaseApp)

const uiConfig = {
  signInFlow: 'popup',
   signInSuccessUrl: '/',
  signInOptions: [
    // your providers
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {
      // Handle sign-in success
      return false; // Avoid redirect
    },
  },
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export { ui, uiConfig };