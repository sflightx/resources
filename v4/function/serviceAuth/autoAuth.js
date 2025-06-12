import { auth, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js";

document.addEventListener('DOMContentLoaded', function () {
    if (!auth) {
        console.log('Auth failed to load.');
        return;
    }

    document.querySelector('#login-form md-filled-button').addEventListener('click', async (e) => {
        e.preventDefault();

        const emailField = document.querySelector('#login-form md-outlined-text-field[type="email"]');
        const passwordField = document.getElementById('passwordField');
        const emailInput = emailField.shadowRoot.querySelector('input').value.trim();
        const passwordInput = passwordField.shadowRoot.querySelector('input').value;

        if (!emailInput || !passwordInput) {
            console.log('Please enter both email/username and password.');
            return;
        }

        let emailToUse = emailInput;

        // If input is not an email, try to resolve username to email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
            try {
                const res = await fetch(`/api/resolve-username?username=${encodeURIComponent(emailInput)}`);
                if (!res.ok) throw new Error('Username not found');
                const data = await res.json();
                emailToUse = data.email;
            } catch (err) {
                console.log('Username not found. Please sign up.');
                window.location.href = '#signup';
                return;
            }
        }

        try {
            // Check if user exists by fetching sign-in methods for the email
            const signInMethods = await fetchSignInMethodsForEmail(auth, emailToUse);
            if (!signInMethods || signInMethods.length === 0) {
                console.log('Account does not exist. Redirecting to sign up.');
                window.location.href = '#signup';
                return;
            }

            // Try to sign in
            await signInWithEmailAndPassword(auth, emailToUse, passwordInput);
            window.location.href = 'https://app.sflightx.com/bp';
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                console.log('Account does not exist. Redirecting to sign up.');
                window.location.href = '#signup';
            } else if (error.code === 'auth/wrong-password') {
                console.log('Incorrect password.');
            } else {
                console.log(error.message);
            }
        }
    });
});