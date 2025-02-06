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
        setTimeout(function() {
            var currentScrollPos = window.pageYOffset;
          prevScrollpos = currentScrollPos;

            if (currentScrollPos > window.innerHeight) {
                document.querySelector("header").style.backgroundColor = "rgba(0,0,0,1)";
           } else {
               document.querySelector("header").style.backgroundColor = "rgba(0,0,0,0)";
           }
        }, 100);
        
    }

    var menu = document.getElementById("menu");
    var nl = document.getElementById("nav_list");
    
    screenListener();
    window.addEventListener('resize', function(event) {
        screenListener();
    }, true);
    
    function screenListener () {
        const screenWidth = window.innerWidth;
        const breakpoint = 992;
        if (screenWidth < breakpoint) {
            nl.style.display = "none";
            menu.style.display = "block";
            menu.addEventListener("click", function() {
                nl.style.display = "block";
            });
            nl.addEventListener("click", function() {
                nl.style.display = "none";
                menu.style.display = "block";
            });
        } else {
            menu.style.display = "none";
            nl.style.display = "flex";
        }
    }
    
});
