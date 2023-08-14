// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZbUcckxMjyjCWtH5CWOLqX3fCc9GUH84",
  authDomain: "crimesense.firebaseapp.com",
  projectId: "crimesense",
  storageBucket: "crimesense.appspot.com",
  messagingSenderId: "25671504046",
  appId: "1:25671504046:web:078cdafe3deffc37da9d3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
