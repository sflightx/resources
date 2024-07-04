document.addEventListener("DOMContentLoaded", function() {
    
    // Get the key from the URL (e.g., ?key=article1)
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");
    const baseUrl = "https://sflightx.com/rs/missions/launch/";

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
        const preformattedText = key.replaceAll("-", " ");
        const formattedText = preformattedText.replaceAll("_", "-");
        console.log(formattedText);
        document.getElementById('feature-article-title').textContent = formattedText;
    }).catch((error) => {
        articleDiv.innerHTML = "Error loading article.";
    });
});



