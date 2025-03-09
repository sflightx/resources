document.addEventListener("DOMContentLoaded", function() {
    const database = firebase.database();
    const recentRef = database.ref('athena/contract');

    recentRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val());
        var layout = document.getElementById('news-container');
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        data.forEach(childData => {
            const div = document.createElement('div');
            div.classList.add('grid-child');
            const img = document.createElement('img');
            img.style.display = 'none';
            if (!childData.thumbnail == null) {
                img.src = childData.thumbnail;
                img.style.display = 'block';
            }
            div.appendChild(img);

            const title = document.createElement('h1');
            title.textContent = childData.title;
            div.appendChild(title);

            const description = document.createElement('p');
            description.textContent = childData.desc;
            description.id = 'subtext'
            div.appendChild(description);

            const learnMoreButton = document.createElement('button');
            
            learnMoreButton.addEventListener('click', function() {
                window.open('https://athena.sflightx.com/contract/?id=' + childData.key, '_blank');
            });

            const button_txt = document.createElement('h4');
            button_txt.textContent = 'Apply';

            learnMoreButton.appendChild(button_txt);
            div.appendChild(learnMoreButton);

            layout.appendChild(div);
        });
    });
});
