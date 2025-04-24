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
            console.log('articleContent:', module.default);


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
            }

            else if (key === 'content') {
                if (typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value)) {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }

        }

        const children = article.children || article.content || [];
        if (!Array.isArray(children)) {
            console.error("renderArticle error: content is not an array", children);
            return;
        }
        children.forEach(child => {
            const childElement = createElementFromJson(child);
            container.appendChild(childElement);
        });
        

        return el;
    }

    function renderArticle(content, containerId = 'article') {
        const container = document.getElementById(containerId);
        
        // Ensure content is an array or object with a 'children' array property
        if (Array.isArray(content)) {
            content.forEach(item => {
                const el = createElementFromJson(item);
                container.appendChild(el);
            });
        } else if (content && Array.isArray(content.children)) {
            content.children.forEach(item => {
                const el = createElementFromJson(item);
                container.appendChild(el);
            });
        } else {
            console.error("renderArticle error: content is not an array or doesn't contain a 'children' property", content);
            container.textContent = "Error: Article failed to load.";
            return;
        }
    
        let hasTwitterEmbed = false;
    
        // Check for twitter embeds
        content.forEach(item => {
            if (item.type === 'blockquote' && item.class === 'twitter-tweet') {
                hasTwitterEmbed = true;
            }
        });
    
        // Inject Twitter embed script if needed
        if (hasTwitterEmbed && !document.getElementById('twitter-widgets-script')) {
            const script = document.createElement('script');
            script.id = 'twitter-widgets-script';
            script.async = true;
            script.src = "https://platform.twitter.com/widgets.js";
            script.charset = "utf-8";
            document.body.appendChild(script);
        }
    
        // Ensure dark mode inside blockquote iframe (after Twitter loads)
        setTimeout(() => {
            const iframes = container.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    iframe.contentWindow.document.documentElement.style.colorScheme = 'dark';
                } catch (e) {
                    // Cross-origin iframe – cannot access, expected for Twitter
                }
            });
        }, 1500);
    }    
    
});
