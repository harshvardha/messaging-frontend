// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBuBUHoBXT12cmXBX9ewviGgizbfLKsC5A",
    authDomain: "messaging-54beb.firebaseapp.com",
    projectId: "messaging-54beb",
    storageBucket: "messaging-54beb.appspot.com",
    messagingSenderId: "514808205500",
    appId: "1:514808205500:web:0e0d414339679bfbcb00b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;