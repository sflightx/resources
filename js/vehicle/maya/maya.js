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

// Get the video element
const video = document.getElementById('background-video');

// Define video sources for different screen sizes
const smallScreenSource = 'https://firebasestorage.googleapis.com/v0/b/sflight-x.appspot.com/o/static%2Fvid%2FMaya%20Static%20Fire%20Test%2FMaya%20Static%20Fire%20Test%20(720p).mp4?alt=media&token=4da11e1e-7e3e-45e9-80d4-3588296b5a63';
const mediumScreenSource = 'https://firebasestorage.googleapis.com/v0/b/sflight-x.appspot.com/o/static%2Fvid%2FMaya%20Static%20Fire%20Test%2FMaya%20Static%20Fire%20Test%20(1080p).mp4?alt=media&token=39ca9ee3-7f0f-4376-820f-021c7ea030f3';
const largeScreenSource = 'https://firebasestorage.googleapis.com/v0/b/sflight-x.appspot.com/o/static%2Fvid%2FMaya%20Static%20Fire%20Test%2FMaya%20Static%20Fire%20Test%20(4k).mp4?alt=media&token=ff4c16a6-7a5b-4544-864b-0c1ff6991f1b';

// Function to update video source based on screen width
function updateVideoSource() {
    if (window.innerWidth <= 768) {
      video.src = smallScreenSource;
    } else if (window.innerWidth >= 1200) {
      video.src = mediumScreenSource;
    } else if (window.innerWidth >= 2400) {
      video.src = largeScreenSource;
    }
    video.load();
    video.play();
}

// Initial call to set the video source
updateVideoSource();

// Listen for window resize events
window.addEventListener('resize', updateVideoSource);
