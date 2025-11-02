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

    function createElementFromJson(json) {
        const el = document.createElement(json.type);

        for (const [key, value] of Object.entries(json)) {
            if (key === 'type' || key === 'children') continue;

            switch (key) {
                case 'slot':
                    el.setAttribute('slot', value);
                    break;
                case 'class':
                    el.className = value;
                    break;
                case 'style':
                    if (typeof value === 'object') {
                        for (const [styleKey, styleValue] of Object.entries(value)) {
                            el.style[styleKey] = styleValue;
                        }
                    }
                    break;
                case 'content':
                    if (typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value)) {
                        el.innerHTML = value;
                    } else {
                        el.textContent = value;
                    }
                    break;
                default:
                    el.setAttribute(key, value); // Handle arbitrary attributes like src, title, frameborder, etc.
                    break;
            }
        }

        const children = json.children || json.content || [];
        if (!Array.isArray(children)) {
            return el;
        }

        children.forEach(child => {
            const childElement = createElementFromJson(child);
            el.appendChild(childElement);
        });

        return el;
    }

    function renderArticle(content, containerId = 'article') {
        const container = document.getElementById(containerId);
        container.style.margin = "8px";

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

        // Check for Twitter embeds
        const checkEmbed = (node) => {
            if (node?.type === 'blockquote' && node?.class === 'twitter-tweet') {
                hasTwitterEmbed = true;
            }
            if (Array.isArray(node?.children)) {
                node.children.forEach(checkEmbed);
            }
        };
        if (Array.isArray(content)) {
            content.forEach(checkEmbed);
        } else {
            checkEmbed(content);
        }

        // Inject Twitter embed script if needed
        const ensureTwitterScript = () => {
            if (hasTwitterEmbed) {
                if (!window.twttr) {
                    const script = document.createElement('script');
                    script.id = 'twitter-widgets-script';
                    script.async = true;
                    script.src = "https://platform.twitter.com/widgets.js";
                    script.charset = "utf-8";
                    script.onload = () => {
                        if (window.twttr?.widgets?.load) {
                            window.twttr.widgets.load(container);
                        }
                    };
                    document.body.appendChild(script);
                } else if (window.twttr?.widgets?.load) {
                    window.twttr.widgets.load(container);
                }
            }
        };

        ensureTwitterScript();

        // After the Twitter embed script loads, update iframe src for dark mode if needed
        setTimeout(() => {
            const twitterTweets = container.querySelectorAll('.twitter-tweet');
            twitterTweets.forEach(tweet => {
                const iframe = tweet.querySelector('iframe');
                if (iframe && iframe.src && !iframe.src.includes('theme=dark')) {
                    iframe.src = iframe.src.replace(/theme=light/, 'theme=dark');
                }
                if (iframe) {
                    iframe.style.width = '480px';  // Set maximum width
                    iframe.style.height = 'auto';  // Ensure height adjusts accordingly
                    iframe.style.display = 'block';  // Make sure the iframe is a block-level element
                    iframe.style.margin = '0 auto';  // Center the iframe horizontally
                    iframe.style.boxSizing = 'border-box';  // Ensure padding and borders are included in the width calculation
                }
            });
        }, 1500);

        // Attempt to set iframe color scheme after a delay
        setTimeout(() => {
            const iframes = container.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                try {
                    iframe.contentWindow.document.documentElement.style.colorScheme = 'dark';
                } catch (e) {
                    // Cross-origin, expected
                }
            });
        }, 1500);
    }
});
