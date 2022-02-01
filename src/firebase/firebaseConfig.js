import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBMQCJWc0wuiimJAHfAOzn1-wqMlWJjj74",
    authDomain: "react-journal-app-195ba.firebaseapp.com",
    projectId: "react-journal-app-195ba",
    storageBucket: "react-journal-app-195ba.appspot.com",
    messagingSenderId: "401779707185",
    appId: "1:401779707185:web:239f036760ab9532e4f410"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
};