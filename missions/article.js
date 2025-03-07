document.addEventListener("DOMContentLoaded", function() {
    
    // Get the key from the URL (e.g., ?key=article1)
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");
    const baseUrl = "https://sflightx.com/article/launch/";
    var articleTitle = document.createElement('h1');

    const snippetFilename = `${baseUrl}${key}.html`; // Assuming filenames match keys

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

                const img = document.createElement('img');
                img.src = childData.thumbnail;
                img.classList.add('header-thumbnail');

                const nextIcon = document.createElement('span');
                nextIcon.classList.add('material-symbols-outlined');
                nextIcon.textContent = 'arrow_forward_ios';

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

                grid.appendChild(col1);
                grid.appendChild(col2);
                articleHeader.appendChild(img);
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
        console.log(formattedText);
        articleTitle.textContent = formattedText;
    }).catch((error) => {
        articleTitle = 'Article Not Found';
        article.innerHTML = "Error loading article.";
        console.log(error);
    });
    
    console.log(articleTitle);

    articleHeader.appendChild(articleTitle);
    articleHeader.appendChild(grid);

});

let getCompany = (companyId) => {
    const database = firebase.database();
    const companyRef = database.ref('static/company');
    var company = '';
    companyRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val());
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
        console.log(company); // Moved inside the callback
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
        button.href = links[key];
        const button_txt = document.createElement('h4');
        button_txt.textContent = key;
        button.addEventListener('click', function() {
            window.open('https://sflightx.com/missions/?id=' + links[key], '_blank');
        });
        button.appendChild(button_txt);
        button.target = '_blank';
        div.appendChild(button);
    });
    return div;
}

grid.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
grid.style.margin = '20px 50px';
grid.style.padding = '20px';
grid.style.borderRadius = '25px';
grid.style.minHeight = '12.5vh';
