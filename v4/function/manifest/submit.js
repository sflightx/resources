import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, push, update } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

export async function writeNewPost(
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
    const companyKey = companyId ? companyId : null;
    console.log("Company Key:", companyKey);
    const postRef = push(ref(db, '/launch_manifest/upcoming'));
    const postKey = postRef.key;
    const year_timestamp = new Date().getFullYear();
    const net = {
        start: start,
        end: end
    };

    if (name == null) {
        const field = document.getElementById("text_field_name");
        field.setAttribute("error", "true");
        field.setAttribute("error-text", "This field is required.");
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

    // ✅ Only add static path if companyId is provided
    if (companyId) {
        updates[`/static/company/${companyId}/launch/${postKey}`] = postData;
    } else {
        console.warn("No companyId provided. Skipping /static/<companyId>/launch/ write.");
    }
    updates[`/launch_manifest/JNO/pending/${postKey}`] = postData;

    // Clear input fields
    document.getElementById('text_field_name').value = '';
    document.getElementById('img-url').value = '';

    return update(ref(db), updates)
        .then(() => {
            console.log('Post successfully written!');
        })
        .catch((error) => {
            console.error('Error writing post:', error);
        });
}