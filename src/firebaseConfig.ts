// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8JAyHuOIb0VW58mGj2UZyErPxq4yRHs8",
  authDomain: "note-app-50cc5.firebaseapp.com",
  projectId: "note-app-50cc5",
  storageBucket: "note-app-50cc5.appspot.com",
  messagingSenderId: "367936934393",
  appId: "1:367936934393:web:5512dccd20f1ad5a9aad28",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
