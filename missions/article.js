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
    const upcomingRef = database.ref('launch_manifest/upcoming');

    upcomingRef.once('value', snapshot => {
        console.log('Data snapshot received:', snapshot.val());
        var grid = document.getElementById('grid');
        var data = [];
        snapshot.forEach(child => {
            data.push(child.val());
        });
        data.reverse();
        data.forEach(childData => {

            const img = document.createElement('img');
            img.src = childData.thumbnail;
            img.style.width = '100%';
            img.style.height = '25vh';
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';
            img.style.borderRadius = '25px';

            const desc = document.createElement('p');
            desc.id = 'subtext';
            desc.textContent = childData.desc;

            const company = document.createElement('h2');
            company.id = 'company';
            getCompany(childData.companyId);

            grid.appendChild(desc);
            grid.appendChild(company);
            articleHeader.appendChild(img);
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

grid.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
grid.style.margin = '20px 50px';
grid.style.borderRadius = '25px';
