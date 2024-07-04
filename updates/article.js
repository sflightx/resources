document.addEventListener("DOMContentLoaded", function() {
    
    // Get the key from the URL (e.g., ?key=article1)
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("articleKey");
    const baseUrl = "https://sflightx.com/rs/updates/article/";

    // Load the snippet into the specified <div>
    const articleDiv = document.querySelector(".article");
    const snippetFilename = `${baseUrl}${key}.html`; // Assuming filenames match keys

    fetch(snippetFilename)
        .then((response) => response.text())
        .then((html) => {
        articleDiv.innerHTML = html;
        const matchedImageURL = storedImages[key];
        if (matchedImageURL) {
            document.getElementById("bg-img").src = matchedImageURL;
        }else{
            console.log("Image not found for article: ", key);
        }
        const formattedText = key.replaceAll("-", " ");
        document.getElementById('feature-article-title').textContent = formattedText;
    }).catch((error) => {
        articleDiv.innerHTML = "Error loading article.";
    });
});

