import * as firebaseui from 'firebaseui';
import { auth } from './firebase-config.js';

console.log(auth)

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    // your providers
    auth.app.firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    auth.app.firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {
      // Handle sign-in success
      return false; // Avoid redirect
    },
  },
};

const ui = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig };