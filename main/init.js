document.addEventListener("DOMContentLoaded", function() {
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
