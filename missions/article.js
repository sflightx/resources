document.addEventListener("DOMContentLoaded", function() {
    
    // Get the key from the URL (e.g., ?id=sky-shield-reaction-mission.html)
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");
    const baseUrl = "https://sflightx.com/article/launch/";
    var articleTitle = document.createElement('h1');

    const snippetFilename = `${baseUrl}${key}`; // Assuming filenames match keys
    console.log('Fetching article:', snippetFilename);
    const articleHeader = document.getElementById('article-header');
    const article = document.getElementById('article');

    const database = firebase.database();
    const upcomingRef = database.ref('launch_manifest/launches');

    upcomingRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val());
        var grid = document.getElementById('grid');
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        data.forEach(childData => {

            if (childData.key == key) {

                const desc = document.createElement('p');
                desc.id = 'subtext';
                desc.textContent = childData.desc;

                const company = document.createElement('h2');
                company.id = 'company';
                getCompany(childData.companyId);

                const link = document.createElement('div');
                link.style.padding = '10px';
                link.style.display = 'flex';
                getLink(childData, link);

                const metadata = document.createElement('div');
                metadata.id = 'grid';
                metadata.style.padding = '0px';
                metadata.style.backgroundColor = 'rgba(27, 27, 27, 1)';

                const img = document.createElement('img');
                img.src = childData.thumbnail;
                img.id = 'thumbnail';
                img.classList.add('header-thumbnail');

                const metadataDiv = document.createElement('div');
                metadataDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                metadataDiv.id = 'metadata';
                metadataDiv.classList.add('header-thumbnail');
                
                const data1 = document.createElement('div');
                data1.id = 'data';
                const icon1 = document.createElement('span');
                icon1.classList.add('material-symbols-outlined');
                icon1.textContent = 'location_on';
                icon1.id = 'small-icon';
                data1.appendChild(icon1);
                data1.appendChild(document.createTextNode(childData.launch_site.address));

                const data2 = document.createElement('div');
                data2.id = 'data';
                const icon2 = document.createElement('span');
                icon2.classList.add('material-symbols-outlined');
                icon2.textContent = 'location_on';
                icon2.id = 'small-icon';
                data2.appendChild(icon2);
                data2.appendChild(document.createTextNode(childData.launch_site.complex));

                const data3 = document.createElement('div');
                data3.id = 'data';
                const icon3 = document.createElement('span');
                icon3.classList.add('material-symbols-outlined');
                icon3.textContent = 'location_on';
                icon3.id = 'small-icon';
                data3.appendChild(icon3);
                data3.appendChild(document.createTextNode(childData.launch_site.pad));

                const nextIcon = document.createElement('span');
                nextIcon.classList.add('material-symbols-outlined');
                nextIcon.textContent = 'arrow_forward_ios';
                nextIcon.style.fontSize = '20px';

                const companyDiv = document.createElement('div');
                companyDiv.style.display = 'flex';
                companyDiv.style.alignItems = 'center';
                companyDiv.appendChild(company);
                companyDiv.appendChild(nextIcon);


                const col1 = document.createElement('div');
                col1.classList.add('col');
                col1.appendChild(desc);

                const col2 = document.createElement('div');
                col2.classList.add('col');
                
                col2.appendChild(companyDiv);
                col2.appendChild(link);

                metadataDiv.appendChild(data1);
                metadataDiv.appendChild(data2);
                metadataDiv.appendChild(data3);

                grid.appendChild(col1);
                grid.appendChild(col2);
                metadata.appendChild(img);
                metadata.appendChild(metadataDiv);
                articleHeader.appendChild(metadata);
                return;
            }            
        });
    });

    fetch(snippetFilename)
    .then((response) => response.text())
    .then((html) => {
        article.innerHTML = html;
        const preformattedText = key.replaceAll("-", " ");
        const formattedText = preformattedText.replaceAll("_", "-")
            .replace(/\b\w/g, char => char.toUpperCase());
        articleTitle.textContent = formattedText;
    }).catch((error) => {
        articleTitle = 'Article Not Found';
        article.innerHTML = "Error loading article.";
        console.log(error);
    });

    articleHeader.appendChild(articleTitle);
    articleHeader.appendChild(grid);

});

let getCompany = (companyId) => {
    const database = firebase.database();
    const companyRef = database.ref('static/company');
    var company = '';
    companyRef.once('value', snapshot => {
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        data.forEach(childData => {
            if (childData.key === companyId) {
                company = childData.name;
            }
        });
        companyText = document.getElementById('company');
        companyText.textContent = company; 
    });
    return company;
}

getLink = (data, div) => {
    const links = data.link;
    const keys = Object.keys(links);
    keys.forEach(key => {
        const button = document.createElement('button');
        button.style.margin = '10px';
        button.style.padding = '10px';
        button.setAttribute('data-link', links[key]);
        button.addEventListener('click', function() {
            window.open('https://' + button.getAttribute('data-link'), '_blank');
        });
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        const icon = document.createElement('h4');
        icon.classList.add('material-symbols-outlined');
        icon.textContent = checkIcon(key);
        icon.style.margin = '0px 10px 0px 0px';
        button.appendChild(icon);
        button.appendChild(document.createTextNode(' ' + key.toUpperCase()));
        button.target = '_blank';
        div.appendChild(button);
    });
    return div;
}

checkIcon = (key) => {
    switch (key) {
        case 'website':
            return 'public';
        case 'twitter':
            return 'twitter';
        case 'instagram':
            return 'instagram';
        case 'facebook':
            return 'facebook';
        case 'youtube':
            return 'youtube';
        default:
            return 'public';
    }
}

