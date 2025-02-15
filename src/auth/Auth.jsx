import { ui, firebaseAuth } from './firebase.js'

export default function Auth () {

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      firebaseAuth.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseAuth.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });

}