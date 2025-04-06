// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3TH_F5Wmyn411biN8jgdSo29Bjuctmdc",
  authDomain: "cloudgpus-04.firebaseapp.com",
  databaseURL: "https://cloudgpus-04-default-rtdb.firebaseio.com",
  projectId: "cloudgpus-04",
  storageBucket: "cloudgpus-04.firebasestorage.app",
  messagingSenderId: "390120650475",
  appId: "1:390120650475:web:829e6b0537ad356b7df0ae",
  measurementId: "G-BNV3Z5NERY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app;
