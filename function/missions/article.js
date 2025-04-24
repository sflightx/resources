document.addEventListener("DOMContentLoaded", function () {
    // Get the `key` from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");

    if (!key) {
        document.getElementById('article').textContent = "No article key provided.";
        return;
    }

    // Dynamic import from your CDN or server
    import(`https://sflightx.com/article/sflightx/${key}.js`)
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

        for (const [key, value] of Object.entries(json)) {
            if (key === 'type' || key === 'children') continue;
        
            if (key === 'class') {
                el.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                for (const [styleKey, styleValue] of Object.entries(value)) {
                    el.style[styleKey] = styleValue;
                }
            } else if (key === 'content') {
                el.textContent = value;
            } else {
                el.setAttribute(key, value);
            }
            if (key === 'innerHTML') {
                el.innerHTML = value;
            }
            
        }
        

        if (json.children && Array.isArray(json.children)) {
            json.children.forEach(child => {
                el.appendChild(createElementFromJson(child));
            });
        }

        return el;
    }

    function renderArticle(content, containerId = 'article') {
        const container = document.getElementById(containerId);
        let twitterScriptInjected = false;
    
        content.forEach(item => {
            const el = createElementFromJson(item);
            container.appendChild(el);
    
            // Check if the block is a Twitter tweet
            if (
                item.type === "blockquote" &&
                item.class === "twitter-tweet" &&
                !twitterScriptInjected
            ) {
                const script = document.createElement("script");
                script.async = true;
                script.src = "https://platform.twitter.com/widgets.js";
                script.charset = "utf-8";
                document.body.appendChild(script);
                twitterScriptInjected = true;
            }
        });
    }
    
});
