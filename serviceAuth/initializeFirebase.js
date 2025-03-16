import firebase, { initializeApp } from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

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

initializeApp(firebaseConfig);

export default firebase;