import {
    auth,
    GoogleAuthProvider
  } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
  
  import { signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
  
  const provider = new GoogleAuthProvider();
  
  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Signed in as " + result.user.displayName);
        window.close();
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
        alert("Error during Google login: " + error.message);
      });
  }
  
  window.googleLogin = googleLogin;
  