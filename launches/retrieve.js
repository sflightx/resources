document.addEventListener("DOMContentLoaded", function() {
    const database = firebase.database();
    const recentRef = database.ref('launch_manifest/launches');
    const upcomingRef = database.ref('launch_manifest/upcoming');

    recentRef.once('value', snapshot => {
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
    upcomingRef.once('value', snapshot => {
        console.log('Upcoming data snapshot received:', snapshot.val());
        var layout = document.getElementById('upcoming-container')
        snapshot.forEach(child => {
            const childData = child.val();

            // Create a new div
            const div = document.createElement('div');
            div.classList.add('upcoming-grid-child');

            // Display the image
            const img = document.createElement('img');
            img.src = childData.thumbnail; // Replace with your image URL
            div.appendChild(img);

            const childDiv = document.createElement('div');
            childDiv.classList.add('upcoming-grid-child-container');

            // Display the title
            const title = document.createElement('p');
            title.classList.add('upcoming-title');
            title.textContent = childData.name; // Replace with your title property
            childDiv.appendChild(title);

            const subtitle = document.createElement('p');
            subtitle.textContent = "Upcoming Launch"; // Replace with your title property
            childDiv.appendChild(subtitle);

            // Create a "Learn More" button
            const learnMoreButton = document.createElement('button');
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.addEventListener('click', function() {
                window.open('https://sflightx.com/missions/?id=' + childData.key, '_blank'); // Replace with your link URL
            });
            childDiv.appendChild(learnMoreButton);

            div.appendChild(childDiv);

            layout.appendChild(div);
        });
    });
});
