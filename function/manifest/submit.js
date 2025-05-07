import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, push, update } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

function writeNewPost() {
    const missionName = document.getElementById('mission-name').value.trim();
    const missionKey = missionName.toLowerCase().replace(/-/g, '_').replace(/ /g, '-');
    const thumbnailUrl = document.getElementById('img-url').value.trim();
    const companyId = document.getElementById("company-id").value;

    // Generate new post key using push()
    const newPostRef = push(ref(db, '/launch_manifest/upcoming'));
    const postKey = newPostRef.key;

    const postData = {
        name: missionName,
        key: missionKey,
        thumbnail: thumbnailUrl,
        postKey: postKey,
        companyId: companyId
    };

    const updates = {};
    updates['/launch_manifest/upcoming/' + postKey] = postData;

    // Clear input fields
    document.getElementById('mission-name').value = '';
    document.getElementById('img-url').value = '';

    return update(ref(db), updates)
        .then(() => {
            console.log('Post successfully written!');
        })
        .catch((error) => {
            console.error('Error writing post:', error);
        });
}

// Attach event listener
document.getElementById("submit-post").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    writeNewPost();
});
