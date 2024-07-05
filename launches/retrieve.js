document.addEventListener("DOMContentLoaded", function() {
    const database = firebase.database();
    const companyRef = database.ref('launch_manifest/launches');

    companyRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val());
        var layout = document.getElementById('scroll-grid')
        snapshot.forEach(child => {
            const childData = child.val();

            // Create a new div
            const div = document.createElement('div');
            div.classList.add('grid-child');

            // Display the image
            const img = document.createElement('img');
            img.src = childData.thumbnail; // Replace with your image URL
            div.appendChild(img);

            // Display the title
            const title = document.createElement('p');
            title.textContent = childData.name; // Replace with your title property
            div.appendChild(title);

            // Create a "Learn More" button
            const learnMoreButton = document.createElement('button');
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.addEventListener('click', function() {
                window.open('https://sflightx.com/missions/?id=' + childData.key, '_blank'); // Replace with your link URL
            });
            div.appendChild(learnMoreButton);

            layout.appendChild(div);
        });
    });
});
