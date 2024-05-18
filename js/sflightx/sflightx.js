var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector("header").style.top = "0";
  } else {
    document.querySelector("header").style.top = "-7.2rem";
  }
  prevScrollpos = currentScrollPos;

  // Change background if scroll is beyond 100vh
  if (currentScrollPos > window.innerHeight) {
    document.querySelector("header").style.backgroundColor = "rgba(0,0,0,1)";
  } else {
    document.querySelector("header").style.backgroundColor = "rgba(0,0,0,0)";
  }
}