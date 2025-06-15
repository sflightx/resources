import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, push, update } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

export function writeNewPost(
    name = null,
    desc = null,
    key = null,
    ls = null,
    link = null,
    start = null,
    end = null,
    payload = null,
    thumbnailUrl = null,
    companyId = null,
    statusId = null,
    vehicleId = null
) {
    const postRef = push(ref(db, '/launch_manifest/upcoming'));
    const postKey = postRef.key;
    const year_timestamp = new Date().getFullYear();
    const net = {
        start: start,
        end: end
    }

    if (name == null) {
        document.getElementById("text_field_name").setAttribute("error", "true");
        document.getElementById("text_field_name").setAttribute("error-text", "This field is required.");
        return;
    }

    const postData = {
        name: name,
        description: desc,
        key: key,
        launch_site: ls,
        link: link,
        net: net,
        payload: payload,
        thumbnail: thumbnailUrl,
        postKey: postKey,
        companyId: companyId,
        statusId: statusId,
        vehicleId: vehicleId,
        y_ts: year_timestamp
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
    const name = document.getElementById("text_field_name").value;
    event.preventDefault(); // Prevent form submission
    writeNewPost(name);
});
