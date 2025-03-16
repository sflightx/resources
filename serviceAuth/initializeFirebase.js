import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyATiu2dMGbYxGYH0S_31J8XsK5OBpTLMfQ",
    authDomain: "sflight-x.firebaseapp.com",
    databaseURL: "https://sflight-x-default-rtdb.firebaseio.com",
    projectId: "sflight-x",
    storageBucket: "sflight-x.appspot.com",
    messagingSenderId: "219145189221",
    appId: "1:219145189221:web:4a94931b99d15659fe138c",
    measurementId: "G-813MEL2GZF"
};

const app = initializeApp(firebaseConfig);

if (!getAuth().app) {
    // Initialize Firebase
    console.log("Initializing Firebase...");
    const auth = getAuth(app);
} else {
    // Use the existing Firebase app
    console.log("Firebase already initialized.");
}

export { app, getAuth, getDatabase };
