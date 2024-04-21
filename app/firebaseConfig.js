// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvI2aVAc5r7QpZH5wwrhvm2bA3iCUh8Ig",
  authDomain: "next-movie-b3eec.firebaseapp.com",
  projectId: "next-movie-b3eec",
  storageBucket: "next-movie-b3eec.appspot.com",
  messagingSenderId: "335445044599",
  appId: "1:335445044599:web:bc66364fa4160ca64bc572",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
