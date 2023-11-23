// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDap2rULwIay3Va5OzKYS4q-hxc-fDOeIs",
  authDomain: "ssg-project-website.firebaseapp.com",
  projectId: "ssg-project-website",
  storageBucket: "ssg-project-website.appspot.com",
  messagingSenderId: "790742447428",
  appId: "1:790742447428:web:e6ecf04f63625fec3c5311",
  measurementId: "G-53BEBY9HV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
