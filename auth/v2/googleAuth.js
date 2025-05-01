import { auth, GoogleAuthProvider } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';

const provider = new GoogleAuthProvider();

function googleLogin() {
    auth.signInWithPopup(provider)
        .then((result) => {
            alert("Signed in as " + result.user.displayName);
            window.location.href = "https://manifest.sflightx.com/discord/";
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
}
