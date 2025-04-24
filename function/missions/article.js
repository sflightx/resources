document.addEventListener("DOMContentLoaded", function () {
    // Get the `key` from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");

    if (!key) {
        document.getElementById('article').textContent = "No article key provided.";
        return;
    }

    // Dynamic import from your CDN or server
    import(`https://sflightx.com/article/${key}.js`)
        .then(module => {
            renderArticle(module.default);
        })
        .catch(error => {
            console.error("Error loading article:", error);
            document.getElementById('article').textContent = "Failed to load article.";
        });

    // Convert JSON to DOM
    function createElementFromJson(json) {
        const el = document.createElement(json.type);

        if (json.class) el.className = json.class;
        if (json.id) el.id = json.id;
        if (json.style) {
            for (const [key, value] of Object.entries(json.style)) {
                el.style[key] = value;
            }
        }
        if (json.content) el.textContent = json.content;

        if (json.children && Array.isArray(json.children)) {
            json.children.forEach(child => {
                el.appendChild(createElementFromJson(child));
            });
        }

        return el;
    }

    // Append to container
    function renderArticle(content, containerId = 'app') {
        const container = document.getElementById(containerId);
        content.forEach(item => {
            const el = createElementFromJson(item);
            container.appendChild(el);
        });
    }
});
