import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, push, update } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

function writeNewPost() {
    const launchSiteName = document.getElementById('launch-site-name').value.trim();
    const launchSiteDescription = document.getElementById('launch-site-description').value.trim();
    const launchSiteThumbnailUrl = document.getElementById('launch-site-img-url').value.trim();

    const LSlatitude = document.getElementById('lat').value.trim();
    const LSlongitude = document.getElementById('long').value.trim();
    const LSaltitude = document.getElementById('agl').value.trim();

    // Generate new post key using push()
    const newPostRef = push(ref(db, '/static/launch_site/'));
    const postKey = newPostRef.key;

    const coordinates = {
        latitude: LSlatitude,
        longitude: LSlongitude,
        altitude: LSaltitude
    }

    const postData = {
        name: launchSiteName,
        description: launchSiteDescription,
        key: postKey,
        thumbnail: launchSiteThumbnailUrl,
        coordinates: coordinates,
        status: "active",
    };

    const updates = {};
    updates['/static/launch_site/' + postKey] = postData;

    document.getElementById('launch-site-name').value = '';
    document.getElementById('launch-site-description').value = '';
    document.getElementById('launch-site-img-url').value = '';
    document.getElementById('lat').value = '';
    document.getElementById('long').value = '';
    document.getElementById('agl').value = '';

    return update(ref(db), updates)
        .then(() => {
            console.log('Post successfully written!');
        })
        .catch((error) => {
            console.error('Error writing post:', error);
        });
}

document.getElementById("submit-post").addEventListener("click", (event) => {
    event.preventDefault();
    writeNewPost();
});
