import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = 'launch_manifest/upcoming';
    const mainContainer = document.getElementById('full-launch');

    const databaseRef = ref(db, path);

    get(databaseRef)
        .then(snapshot => {
            const data = [];
            snapshot.forEach(child => data.push(child.val()));
            data.reverse();

            // Clear existing content
            mainContainer.innerHTML = '';

            if (data.length === 1) {
                const childData = data[0];

                // Single launch style
                const launchSection = document.createElement('section');
                launchSection.style.backgroundImage = `url(${childData.thumbnail})`;
                launchSection.style.backgroundSize = 'cover';
                launchSection.style.backgroundPosition = 'center';
                launchSection.style.display = 'flex';
                launchSection.style.flexDirection = 'column';
                launchSection.style.justifyContent = 'flex-end';
                launchSection.style.height = '50vh';
                launchSection.style.padding = '2rem';
                launchSection.style.borderRadius = '1rem';
                launchSection.style.overflow = 'hidden';

                const overlay = document.createElement('div');
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                overlay.style.padding = '1rem';
                overlay.style.borderRadius = '0.5rem';

                const title = document.createElement('h1');
                title.textContent = childData.name;
                title.classList.add('md-typescale-display-large');
                overlay.appendChild(title);

                const details = document.createElement('p');
                details.textContent = childData.desc;
                details.classList.add('md-typescale-title-medium');
                overlay.appendChild(details);

                const learnMoreButton = document.createElement('md-filled-tonal-button');
                learnMoreButton.innerHTML = '<h3>Learn More</h3>';
                learnMoreButton.addEventListener('click', () => {
                    window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                });
                overlay.appendChild(learnMoreButton);

                launchSection.appendChild(overlay);
                mainContainer.appendChild(launchSection);
            } else {
                // Scroll container for multiple launches
                const scrollWrapper = document.createElement('div');
                scrollWrapper.style.display = 'flex';
                scrollWrapper.style.overflowX = 'auto';
                scrollWrapper.style.gap = '1rem';
                scrollWrapper.style.padding = '1rem';
                scrollWrapper.style.scrollSnapType = 'x mandatory';

                data.forEach(childData => {
                    const launchCard = document.createElement('div');
                    launchCard.style.minWidth = '35vw';
                    launchCard.style.height = '25vh';
                    launchCard.style.backgroundImage = `url(${childData.thumbnail})`;
                    launchCard.style.backgroundSize = 'cover';
                    launchCard.style.backgroundPosition = 'center';
                    launchCard.style.display = 'flex';
                    launchCard.style.flexDirection = 'column';
                    launchCard.style.justifyContent = 'flex-end';
                    launchCard.style.padding = '1rem';
                    launchCard.style.borderRadius = '1rem';
                    launchCard.style.overflow = 'hidden';
                    launchCard.style.scrollSnapAlign = 'start';

                    const overlay = document.createElement('div');
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    overlay.style.padding = '0.5rem';
                    overlay.style.borderRadius = '0.5rem';

                    const title = document.createElement('h2');
                    title.textContent = childData.name;
                    title.classList.add('md-typescale-title-large');
                    overlay.appendChild(title);

                    const details = document.createElement('p');
                    details.textContent = childData.desc;
                    details.classList.add('md-typescale-body-medium');
                    overlay.appendChild(details);

                    const learnMoreButton = document.createElement('md-filled-tonal-button');
                    learnMoreButton.innerHTML = '<span>Learn More</span>';
                    learnMoreButton.addEventListener('click', () => {
                        window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                    });
                    overlay.appendChild(learnMoreButton);

                    launchCard.appendChild(overlay);
                    scrollWrapper.appendChild(launchCard);
                });

                mainContainer.appendChild(scrollWrapper);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
