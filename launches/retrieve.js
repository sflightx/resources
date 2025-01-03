document.addEventListener("DOMContentLoaded", function() {
    const database = firebase.database();
    const recentRef = database.ref('launch_manifest/launches');
    const upcomingRef = database.ref('launch_manifest/upcoming');

    recentRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val());
        var layout = document.getElementById('scroll-grid');
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        data.forEach(childData => {
            const div = document.createElement('div');
            div.classList.add('grid-child');

            const img = document.createElement('img');
            img.src = childData.thumbnail;
            div.appendChild(img);

            const title = document.createElement('p');
            title.textContent = childData.name;
            div.appendChild(title);

            const learnMoreButton = document.createElement('button');
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.addEventListener('click', function() {
                window.open('https://sflightx.com/missions/?id=' + childData.key, '_blank');
            });
            div.appendChild(learnMoreButton);

            layout.appendChild(div);
        });
    });

    upcomingRef.once('value', snapshot => {
        console.log('Upcoming data snapshot received:', snapshot.val());
        var layout = document.getElementById('upcoming-container');
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        data.forEach(childData => {
            const div = document.createElement('div');
            div.classList.add('upcoming-grid-child');

            const img = document.createElement('img');
            img.src = childData.thumbnail;
            div.appendChild(img);

            const childDiv = document.createElement('div');
            childDiv.classList.add('upcoming-grid-child-container');

            const title = document.createElement('p');
            title.classList.add('upcoming-title');
            title.textContent = childData.name;
            childDiv.appendChild(title);

            const subtitle = document.createElement('p');
            subtitle.textContent = "Upcoming Launch";
            childDiv.appendChild(subtitle);

            const learnMoreButton = document.createElement('button');
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.addEventListener('click', function() {
                window.open('https://sflightx.com/missions/?id=' + childData.key, '_blank');
            });
            childDiv.appendChild(learnMoreButton);

            div.appendChild(childDiv);

            layout.appendChild(div);
        });
    });
});
