// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
let app;
if (getApp.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export const auth = getAuth(app);
