import * as firebaseui from 'firebaseui';
import { auth } from './firebase-config.js';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    // your providers
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