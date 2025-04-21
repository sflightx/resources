document.addEventListener('DOMContentLoaded', () => {
    const path = 'launch_manifest/upcoming';
    const layout = document.getElementById('upcoming-container');
    layout.style.maxHeight = '100vh';

    const database = firebase.database();
    const databaseRef = database.ref(path);

    databaseRef.once('value')
        .then(snapshot => {
            const data = [];
            snapshot.forEach(child => data.push(child.val()));
            data.reverse();
            console.log('Data received from getUpcoming:', data);
            data.forEach(childData => {
                const innerDiv = document.createElement('div');
                innerDiv.classList.add('banner');
                innerDiv.style.height = '50vh';
                innerDiv.style.paddingTop = '7.5vh';

                const image = document.createElement('img');
                image.classList.add('header-thumbnail');
                image.src = childData.thumbnail;
                innerDiv.appendChild(image);

                const secondaryDiv = document.createElement('div');
                secondaryDiv.classList.add('secondary-div');
                secondaryDiv.style.padding = '50px';

                const title = document.createElement('p');
                title.textContent = childData.name;
                title.classList.add('upcoming-title');
                secondaryDiv.appendChild(title);

                const details = document.createElement('p');
                details.textContent = childData.desc;
                details.id = 'subtext';
                secondaryDiv.appendChild(details);

                const subtitle = document.createElement('h3');
                subtitle.textContent = 'Upcoming Launch';
                secondaryDiv.appendChild(subtitle);

                const learnMoreButton = document.createElement('button');
                learnMoreButton.innerHTML = '<h3>Learn More</h3>';
                learnMoreButton.addEventListener('click', () => {
                    window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                });
                secondaryDiv.appendChild(learnMoreButton);

                layout.appendChild(innerDiv);
                layout.appendChild(secondaryDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
