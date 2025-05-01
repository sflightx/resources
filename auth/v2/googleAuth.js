const provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
    auth.signInWithPopup(provider)
        .then((result) => {
            alert("Signed in as " + result.user.displayName);
            window.location.href = "https://manifest.sflightx.com/discord/"; // or wherever you want
        })
        .catch((error) => {
            document.getElementById("error-message").textContent = error.message;
        });
}