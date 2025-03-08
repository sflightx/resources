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

            const title = document.createElement('h1');
            title.textContent = childData.name;
            div.appendChild(title);

            const learnMoreButton = document.createElement('button');
            
            learnMoreButton.addEventListener('click', function() {
                window.open('https://sflightx.com/missions/?y=' + childData.y_ts + '?id=' + childData.key, '_blank');
            });

            const button_txt = document.createElement('h4');
            button_txt.textContent = 'Learn More';

            learnMoreButton.appendChild(button_txt);
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

            const innerDiv = document.createElement('div');
            innerDiv.classList.add("banner")
            innerDiv.style.height = '50vh';
            innerDiv.style.paddingTop = '7.5vh';

            const image = document.createElement('div');
            image.classList.add('header-thumbnail');
            image.style.backgroundImage = 'url(' + childData.thumbnail + ')';
            image.style.height = '50vh';
            image.style.width = '100%';
            innerDiv.appendChild(image);

            const secondaryDiv = document.createElement('div');
            secondaryDiv.style.padding = '25px 50px';


            const title = document.createElement('p');
            title.classList.add('upcoming-title');
            title.textContent = childData.name;
            secondaryDiv.appendChild(title);

            const details = document.createElement('p');
            details.id = 'subtext';
            details.textContent = childData.desc;
            secondaryDiv.appendChild(details);

            const subtitle = document.createElement('h3');
            subtitle.textContent = "Upcoming Launch";
            secondaryDiv.appendChild(subtitle);

            const learnMoreButton = document.createElement('button');
            learnMoreButton.addEventListener('click', function() {
                window.open('https://sflightx.com/missions/?y=' + childData.y_ts + '?id=' + childData.key, '_blank');
            });

            const button_txt = document.createElement('h3');
            button_txt.textContent = 'Learn More';

            learnMoreButton.appendChild(button_txt);
            secondaryDiv.appendChild(learnMoreButton);

            layout.appendChild(innerDiv);
            layout.appendChild(secondaryDiv);
        });
    });
});
