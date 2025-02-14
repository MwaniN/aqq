import { firebaseAuth, analytics } from './firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();