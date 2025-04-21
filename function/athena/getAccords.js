document.addEventListener('DOMContentLoaded', function() {
    const path = 'athena/accords';
    const layout = document.getElementById('scroll-grid');
    layout.style.display = 'flex';
    layout.style.flexWrap = 'wrap';
    layout.style.justifyContent = 'space-between';
    layout.style.alignItems = 'center';

    const database = firebase.database();
    const databaseRef = database.ref(path);

    databaseRef.once('value', snapshot => {
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        console.log('Data received from getAccords:', data);
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

            const name = document.createElement('h1');
            name.textContent = childData.name;
            name.style.textAlign = 'center';
            name.style.margin = '10px';
            name.style.fontSize = '4vw';
            div.appendChild(name);

            const learnMoreButton = document.createElement('button');
            learnMoreButton.setAttribute('class', 'material-symbols-outlined');
            learnMoreButton.textContent = 'visibility';
            learnMoreButton.style.fontSize = '24px';
            learnMoreButton.style.padding = '10px';
            learnMoreButton.addEventListener('click', function() {
                window.open(`https://athena.sflightx.com/c/?id=${childData.key}`, '_blank');
            });

            div.appendChild(learnMoreButton);

            layout.appendChild(div);
        });
    });
});