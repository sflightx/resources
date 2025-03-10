document.addEventListener("DOMContentLoaded", function() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var uid = user.uid;
        } else {
          var loggedContent = document.getElementById('logged-content');
            loggedContent.style.display = 'none';
        }
    });
});
