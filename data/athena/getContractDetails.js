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