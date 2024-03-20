// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT3w67nWLDO-9s4I7gpgvKRqjWUVgQaDI",
  authDomain: "my-next-2a309.firebaseapp.com",
  projectId: "my-next-2a309",
  storageBucket: "my-next-2a309.appspot.com",
  messagingSenderId: "862030199239",
  appId: "1:862030199239:web:b85c7f931e98b0373281e2",
  measurementId: "G-1KSRG5MWRF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Correctly initialize Auth using Modular SDK
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore
const analytics = getAnalytics(app); // Initialize Analytics

export { auth, provider }; // Export for use in your application
