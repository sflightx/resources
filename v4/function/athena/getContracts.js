document.addEventListener('DOMContentLoaded', function() {
    const path = 'athena/contract';
    const layout = document.getElementById('horizontal-scroll-grid');

    const database = firebase.database();
    const databaseRef = database.ref(path);

    databaseRef.once('value', snapshot => {
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        console.log('Data received from getContracts:', data);
        data.forEach(childData => {
            const div = document.createElement('div');
            div.classList.add('grid-child');
            div.id = 'bg-dark';
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'center';

            if (childData.thumbnail === undefined || childData.thumbnail === null) {

            } else {
                const img = document.createElement('img');
                img.src = childData.thumbnail;
                div.appendChild(img);
            }

            const title = document.createElement('h1');
            title.textContent = childData.title;
            title.style.textAlign = 'center';
            title.style.fontSize = '4vw';
            div.appendChild(title);

            const learnMoreButton = document.createElement('button');

            learnMoreButton.addEventListener('click', function() {
                window.open(`https://athena.sflightx.com/contracts/?id=${childData.key}`, '_blank');
            });

            const button_txt = document.createElement('h4');
            button_txt.textContent = 'Apply Now';

            learnMoreButton.appendChild(button_txt);
            div.appendChild(learnMoreButton);

            layout.appendChild(div);
        });
    });
});