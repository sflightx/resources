import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = 'launch_manifest/upcoming';
    const layout = document.getElementById('full');

    const databaseRef = ref(db, path);

    get(databaseRef)
        .then(snapshot => {
            const data = [];
            snapshot.forEach(child => data.push(child.val()));
            data.reverse();
            data.forEach(childData => {
                layout.style.backgroundImage = `url(${childData.thumbnail})`;
                layout.style.backgroundSize = 'cover';
                layout.style.backgroundPosition = 'center';
                layout.style.display = 'flex';
                layout.style.flexDirection = 'column';
                layout.style.justifyContent = 'flex-end';

                const secondaryDiv = document.createElement('div');
                secondaryDiv.classList.add('container');
                secondaryDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

                const title = document.createElement('h1');
                title.textContent = childData.name;
                title.classList.add('md-typescale-display-large');
                secondaryDiv.appendChild(title);

                const details = document.createElement('p');
                details.textContent = childData.desc;
                details.classList.add('md-typescale-title-medium');
                secondaryDiv.appendChild(details);

                const learnMoreButton = document.createElement('md-filled-tonal-button');
                learnMoreButton.innerHTML = '<h3>Learn More</h3>';
                learnMoreButton.addEventListener('click', () => {
                    window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                });
                secondaryDiv.appendChild(learnMoreButton);

                layout.appendChild(secondaryDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
