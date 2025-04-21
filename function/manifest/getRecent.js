document.addEventListener('DOMContentLoaded', function() {
    const path = 'launch_manifest/launches';
    const layout = document.getElementById('scroll-grid');

    const database = firebase.database();
    const databaseRef = database.ref(path);

    databaseRef.once('value', snapshot => {
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        console.log('Data received from getLaunches:', data);
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
                window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
            });

            const button_txt = document.createElement('h4');
            button_txt.textContent = 'Learn More';

            learnMoreButton.appendChild(button_txt);
            div.appendChild(learnMoreButton);

            layout.appendChild(div);
        });
    });
});