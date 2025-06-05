import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', function () {
    const path = 'launch_manifest/launches';
    const layout = document.getElementById('scroll-grid');

    const databaseRef = ref(db, path);

    get(databaseRef).then(snapshot => {
        if (snapshot.exists()) {
            const data = [];
            snapshot.forEach(child => {
                data.push(child.val());
            });

            const div = document.createElement('div');
            div.classList.add('banner');
            div.id = 'grid';

            data.reverse();
            console.log('Data received from getLaunches:', data);
            data.forEach(childData => {


                const container = document.createElement('div');
                container.classList.add('container');
                container.style.margin = '0';

                const img = document.createElement('img');
                img.src = childData.thumbnail;
                container.appendChild(img);

                const title = document.createElement('h1');
                title.textContent = childData.name;
                title.classList.add('md-typescale-headline-large');
                container.appendChild(title);

                const learnMoreButton = document.createElement('md-filled-tonal-button');

                learnMoreButton.addEventListener('click', function () {
                    window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                });

                const button_txt = document.createElement('h3');
                button_txt.textContent = 'View Mission';

                learnMoreButton.appendChild(button_txt);
                container.appendChild(learnMoreButton);

                div.appendChild(container);

                layout.appendChild(div);
            });
        } else {
            console.log('No data available');
        }
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
});