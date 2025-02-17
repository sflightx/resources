document.addEventListener("DOMContentLoaded", function() {
    
    // Get the key from the URL (e.g., ?key=article1)
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");
    const baseUrl = "https://sflightx.com/article/launch/";

    // Load the snippet into the specified <div>
    const articleDiv = document.querySelector(".article");
    const snippetFilename = `${baseUrl}${key}.html`; // Assuming filenames match keys

    fetch(snippetFilename)
    .then((response) => response.text())
    .then((html) => {
        articleDiv.innerHTML = html;
        const preformattedText = key.replaceAll("-", " ");
        const formattedText = preformattedText.replaceAll("_", "-")
            .replace(/\b\w/g, char => char.toUpperCase());
        console.log(formattedText);
        document.getElementById('feature-article-title').textContent = formattedText;
    }).catch((error) => {
        articleDiv.innerHTML = "Error loading article.";
        console.log(error);
    });

});



