// initializeFirebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider // Import EmailAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Export GoogleAuthProvider and EmailAuthProvider so other modules can use them
export { app, auth, db, GoogleAuthProvider, EmailAuthProvider };
export default app;
