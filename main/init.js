document.addEventListener("DOMContentLoaded", function() {
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
    if (!firebase.apps.length) {
        // Initialize Firebase
        console.log("Initializing Firebase...");
        const app = firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth(app);
    } else {
        // Use the existing Firebase app
        console.log("Firebase already initialized.");
        firebase.app();
    }

    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector("header").style.top = "0";
        } else {
            document.querySelector("header").style.top = "-15rem";
        }
        prevScrollpos = currentScrollPos;

        // Change background if scroll is beyond 100vh
        if (currentScrollPos > window.innerHeight) {
            document.querySelector("header").style.backgroundColor = "rgba(0,0,0,1)";
        } else {
            document.querySelector("header").style.backgroundColor = "rgba(0,0,0,0)";
        }
    }

    const screenWidth = window.innerWidth;
    const breakpoint = 768;

    if (screenWidth < breakpoint) {
        var ul = document.getElementById("nav_list");
        // Add an event listener to the ul
        ul.addEventListener("click", function() {
            // When the ul is clicked, change its display to 'none'
            ul.style.display = "none";
        });

        var menu = document.getElementById("menu");
        menu.addEventListener("click", function() {
            // When the ul is clicked, change its display to 'none'
            ul.style.display = "block";
        });
    }
});
