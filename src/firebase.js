// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6PVPM6k71QOUcF-WtBMppiy6cQqR6jZo",
    authDomain: "udemy-react-firebase-realtor.firebaseapp.com",
    projectId: "udemy-react-firebase-realtor",
    storageBucket: "udemy-react-firebase-realtor.appspot.com",
    messagingSenderId: "944670945649",
    appId: "1:944670945649:web:2b7921a895cf239674c6d0"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();
 export const auth = getAuth();
