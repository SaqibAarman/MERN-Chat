import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoUhl5r72MiV_bGODmmsWu4uO6Mxz65QU",
  authDomain: "social-media-b2451.firebaseapp.com",
  projectId: "social-media-b2451",
  storageBucket: "social-media-b2451.appspot.com",
  messagingSenderId: "926525602389",
  appId: "1:926525602389:web:a85ae380ac0b145cee72dc",
  measurementId: "G-M7MDVBRSX0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const faceBookProvider = new FacebookAuthProvider()
const db = getFirestore();

export { auth, provider, db, faceBookProvider };
