import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider, // Import GoogleAuthProvider
  signInWithPopup, // Import signInWithPopup for Google Sign-In
} from "firebase/auth";

// Existing sign up function for email/password
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Existing sign in function for email/password
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Existing sign out function
export const signOutUser = () => {
  return signOut(auth);
};

// Function for signing in with Google
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/fitness.activity.read");
  return signInWithPopup(auth, provider);
};



export const signInAuthGoogle = () =>{
  // Construct the Google Authorization URL
  const clientId = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
  const redirectUri = 'YOUR_REDIRECT_URI';
  const scope = 'email profile https://www.googleapis.com/auth/fitness.activity.read';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
 // Redirect to the Google Authorization URL
  window.location.href = authUrl;
}