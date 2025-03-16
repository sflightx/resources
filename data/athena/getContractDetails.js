const serviceAccount = 'https://sflightx.com/resources/serviceAuth/credential.json';

const db = firebase.database();
const app = firebase.initializeApp(serviceAccount);

if (!firebase.apps.length) {
    console.log("Initializing Firebase...");
    const auth = firebase.auth(app);
} else {
    console.log("Firebase already initialized.");
    firebase.app();
}

document.addEventListener('DOMContentLoaded', async () => {
    async function getContractDetails(key) {
        try {
            const ref = db.ref(key);
            const snapshot = await ref.once('value');
            const data = snapshot.val();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error retrieving data:', error);
            throw error;
        }
    }

    // Example usage
    const pathKey = 'path/to/your/data';
    await getContractDetails(pathKey);
});