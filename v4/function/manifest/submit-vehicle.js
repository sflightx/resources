import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, push, update } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

function writeNewPost() {
    const vehicleName = document.getElementById('vehicle-name').value.trim();
    const vehicleVersion = document.getElementById('vehicle-version').value.trim();
    const vehicleDescription = document.getElementById('vehicle-description').value.trim();
    const vehicleThumbnailUrl = document.getElementById('vehicle-img-url').value.trim();

    const height = document.getElementById('h').value.trim();
    const width = document.getElementById('w').value.trim();
    const length = document.getElementById('l').value.trim();

    const dry = document.getElementById('dry').value.trim();
    const wet = document.getElementById('wet').value.trim();

    // Generate new post key using push()
    const newPostRef = push(ref(db, '/static/vehicle/'));
    const postKey = newPostRef.key;

    const dimensions = {
        height: height,
        width: width,
        length: length
    }

    const mass = {
        dry_mass: dry,
        wet_mass: wet
    }

    const postData = {
        name: vehicleName,
        version: vehicleVersion,
        description: vehicleDescription,
        key: postKey,
        thumbnail: vehicleThumbnailUrl,
        dimensions: dimensions,
        mass: mass,
        status: "active",
    };

    const updates = {};
    updates['/static/vehicle/' + postKey] = postData;

    document.getElementById('vehicle-name').value = '';
    document.getElementById('vehicle-version').value = '';
    document.getElementById('vehicle-description').value = '';
    document.getElementById('vehicle-img-url').value = '';
    document.getElementById('h').value = '';
    document.getElementById('l').value = '';
    document.getElementById('w').value = '';
    document.getElementById('dry').value = '';
    document.getElementById('wet').value = '';

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
