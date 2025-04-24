// initializeFirebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Always call getAuth(app) and getDatabase(app) directly
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
export default app; // Export the app instance for use in other modules