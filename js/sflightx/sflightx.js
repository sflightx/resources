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

var ul = document.getElementById("nav_list");

// Add an event listener to the ul
ul.addEventListener("click", function() {
  // When the ul is clicked, change its display to 'none'
  ul.style.display = "none";
});

var menu = document.getElementById("menu");

// Add an event listener to the ul
menu.addEventListener("click", function() {
  // When the ul is clicked, change its display to 'none'
  ul.style.display = "block";
});

document.addEventListener('DOMContentLoaded', (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const link = urlParams.get('link');
  if (link) {
    document.title = link.charAt(0).toUpperCase() + link.slice(1); // Capitalize the first letter
    switch(link) {
      case 'youtube':
        window.location.href = "https://www.youtube.com/@sflightx";
        break;
      case 'discord':
        window.location.href = "https://discord.gg/sflightx";
        break;
      case 'twitter':
        window.location.href = "https://twitter.com/SFlightXJNO";
        break;
      case 'x':
        window.location.href = "https://x.com/SFlightXJNO";
        break;
      case 'facebook':
        window.location.href = "https://facebook.com/sflightx";
        break;
      case 'patreon':
        window.location.href = "https://patreon.com/sflightx";
        break;
      case 'jno':
        window.location.href = "https://www.simplerockets.com/u/sFlightX";
        break;
      // Add more cases as needed
  }
  }
});