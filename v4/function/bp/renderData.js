import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

export async function renderHome(
    key,
    data,
    element = null,
    layout = "vertical"
) {
    const parentElement = element || document.querySelector("#mainDiv");

    if (layout === "horizontal") {
        parentElement.style.position = "relative";
        parentElement.style.display = "flex";
        parentElement.style.overflowX = "hidden";
        parentElement.style.scrollSnapType = "x mandatory";
        parentElement.style.gap = "16px";
        parentElement.style.padding = "8px";
        parentElement.style.scrollBehavior = "smooth";

        // Remove wheel scroll
        parentElement.onwheel = null;

        if (!document.querySelector(".scroll-btn-prev")) {
            const prevBtn = document.createElement("button");
            prevBtn.className = "scroll-btn-prev";
            prevBtn.innerHTML = "&#8249;";
            styleScrollButton(prevBtn, "left");
            prevBtn.addEventListener("click", () => {
                parentElement.scrollBy({
                    left: -parentElement.clientWidth * 0.6,
                    behavior: "smooth",
                });
            });

            const nextBtn = document.createElement("button");
            nextBtn.className = "scroll-btn-next";
            nextBtn.innerHTML = "&#8250;";
            styleScrollButton(nextBtn, "right");
            nextBtn.addEventListener("click", () => {
                parentElement.scrollBy({
                    left: parentElement.clientWidth * 0.6,
                    behavior: "smooth",
                });
            });

            parentElement.parentElement.style.position = "relative";
            parentElement.parentElement.appendChild(prevBtn);
            parentElement.parentElement.appendChild(nextBtn);
        }
    } else {
        parentElement.style.display = "block";
        parentElement.style.overflowX = "unset";
        parentElement.style.scrollSnapType = "unset";
        parentElement.style.gap = "unset";
        parentElement.style.padding = "unset";

        const prevBtn = document.querySelector(".scroll-btn-prev");
        const nextBtn = document.querySelector(".scroll-btn-next");
        if (prevBtn) prevBtn.remove();
        if (nextBtn) nextBtn.remove();
    }

    const card = document.createElement("div");
    card.setAttribute("data-key", key);
    card.className = "md-surface";

    if (layout === "horizontal") {
        card.style.width = window.innerWidth >= 768 ? "25vw" : "45vw";
        card.style.flex = "0 0 auto";
        card.style.scrollSnapAlign = "start";
    } else {
        card.style.width = "100%";
        card.style.flex = "initial";
        card.style.scrollSnapAlign = "none";
    }

    card.style.borderRadius = "16px";
    card.style.overflow = "hidden";
    card.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
    card.style.backgroundColor = "var(--md-sys-color-surface-container-high)";
    card.style.color = "var(--md-sys-color-on-surface)";
    card.style.cursor = "pointer";
    card.style.transition = "transform 0.2s ease";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.position = "relative";

    // Hover effect
    card.onmouseover = () => (card.style.transform = "scale(1.03)");
    card.onmouseout = () => (card.style.transform = "scale(1)");

    // Ripple effect
    card.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.4)";
        ripple.style.width = ripple.style.height = Math.max(
            card.offsetWidth,
            card.offsetHeight
        ) + "px";
        ripple.style.left = e.offsetX - card.offsetWidth / 2 + "px";
        ripple.style.top = e.offsetY - card.offsetHeight / 2 + "px";
        ripple.style.transform = "scale(0)";
        ripple.style.opacity = "0.6";
        ripple.style.pointerEvents = "none";
        ripple.style.transition =
            "transform 0.3s ease-out, opacity 0.3s ease-out";

        card.appendChild(ripple);
        requestAnimationFrame(() => {
            ripple.style.transform = "scale(1)";
            ripple.style.opacity = "0";
        });

        ripple.addEventListener("transitionend", () => {
            ripple.remove();
        });

        setTimeout(() => {
            window.location.href = `?id=${key}`;
        }, 250);

    });

    // Card content: Image + Text
    card.innerHTML = `
        <div style="
            width: 100%;
            aspect-ratio: 1 / 1;
            background-image: ${data.image_url ? `url(${data.image_url})` : "none"
        };
            background-size: cover;
            background-position: center;
        "></div>
        <div style="
            padding: 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        ">
            <h3 style="
                margin: 0; 
                font-size: 1rem;
                font-weight: 600;
                color: var(--md-sys-color-on-surface);
            ">
                ${data.name || "Unnamed Blueprint"}
            </h3>
            <div id="authorContainer" style="
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                <md-icon><span class="material-symbols-rounded">person</span></md-icon>
                <p style="margin: 0; font-size: 0.9rem; color: var(--md-sys-color-on-surface-variant);">
                    Loading...
                </p>
            </div>
        </div>
    `;

    const authorContainer = card.querySelector("#authorContainer");

    async function renderAuthor(username = "Unknown", profile = "") {
        authorContainer.innerHTML = `
            <div style="display: flex; gap: 8px; align-items: center;">
                ${profile
                ? `<img src="${profile}" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">`
                : `<md-icon><span class="material-symbols-rounded">person</span></md-icon>`
            }
                <p style="margin: 0; font-size: 0.9rem; color: var(--md-sys-color-on-surface-variant);">
                    ${username}
                </p>
            </div>
        `;
    }

    const uid = data.author;
    if (uid) {
        try {
            const user = await fetchUserData(uid);
            await renderAuthor(user.username, user.profile);
        } catch {
            await renderAuthor();
        }
    } else {
        await renderAuthor();
    }

    parentElement.appendChild(card);
    return card;
}

// Helper to style scroll buttons
function styleScrollButton(btn, side) {
    btn.style.position = "absolute";
    btn.style.top = "50%";
    btn.style[side] = "12px";
    btn.style.transform = "translateY(-50%)";
    btn.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "50%";
    btn.style.width = "60px";
    btn.style.height = "60px";
    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "1000";
    btn.style.fontSize = "2rem";
    btn.style.transition = "background-color 0.3s ease, transform 0.2s ease";
    btn.onmouseover = () => {
        btn.style.backgroundColor = "rgba(0,0,0,0.8)";
        btn.style.transform = "translateY(-50%) scale(1.1)";
    };
    btn.onmouseout = () => {
        btn.style.backgroundColor = "rgba(0,0,0,0.6)";
        btn.style.transform = "translateY(-50%) scale(1)";
    };
}

export async function renderBlueprint(key, data, element = null) {
    const parentElement = element || document.querySelector("#loader-page");

    const appBarTitle = document.querySelector("#app-bar-title");
    if (appBarTitle) {
        appBarTitle.textContent = data.name || "Blueprint Details";
    } else {
        console.warn("#app-bar-title not found in parentElement");
    }
    // Example: Set content dynamically
    const dataContainer = parentElement.querySelector("#-data");
    dataContainer.innerHTML = `
        <div style="height: 100%; background-color: var(--md-sys-color-primary-container); border-radius: 16px; ">
            <img src="${data.image_url}" alt="${data.name}" style="
            object-fit: scale-down;
            height: 100%;
            aspect-ratio: 16 / 9;
        ">
        </div>
    `;

    function formatDescription(text) {
        // 🔗 Detect URLs (skip if already inside <a>)
        const urlRegex = /((https?:\/\/[^\s]+)|(www\.[^\s]+))/gi;
        text = text.replace(urlRegex, (match) => {
            if (match.includes('<a')) return match; // skip if already linked
            const url = match.startsWith('http') ? match : `https://${match}`;
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${match}</a>`;
        });

        // 📧 Detect emails
        const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
        text = text.replace(emailRegex, `<a href="mailto:$1">$1</a>`);

        // 🙋 Detect mentions (@username)
        const mentionRegex = /(^|\s)(@\w+)/g;
        text = text.replace(mentionRegex, `$1<a href="/user/$2" class="mention" data-mention="$2">$2</a>`);

        // #️⃣ Detect hashtags (#topic)
        const hashtagRegex = /(^|\s)(#\w+)/g;
        text = text.replace(hashtagRegex, `$1<a href="/search?tag=$2" class="hashtag" data-hashtag="$2">$2</a>`);

        // 🔄 Convert newlines to <br>
        text = text.replace(/\n/g, "<br>");

        return text;
    }

    const formattedDesc = formatDescription(data.desc || "No description provided.");

    const itemContainer = parentElement.querySelector("#-item");

    try {
        const user = await fetchUserData(data.author);
        
        itemContainer.innerHTML = `
        <div class="-item-container" indent="all" style="display: flex; flex-direction: column; gap: 8px;">
            <h2 class="md-typescale-display-medium">${data.name || "Unnamed Blueprint"}</h2>
            <p class="md-typescale-body-medium">${formattedDesc}</p>
            <div row style="display: flex; gap: 10px; margin-top: 24px;">
                <md-filled-tonal-button id="share-btn"><span class="material-symbols-rounded">share</span></md-filled-tonal-button>
                <md-filled-button id="download-btn" style="display: inline-flex; align-items: center; gap: 8px;">
                <span class="material-symbols-rounded">download</span>Download</md-filled-button>
            </div>
        </div>
        <div class="-item-container" indent="all" style="display: flex; gap: 8px; width: fit-content;">
            <md-outlined-button id="share-btn"><span class="material-symbols-rounded">thumb_up</span></md-outlined-button>
            <md-outlined-button id="share-btn"><span class="material-symbols-rounded">thumb_down</span></md-outlined-button>
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${user.profile || "https://sflightx.com/resources/v4/database/logo/logo-full.png"}" alt="Author" style="width: 48px; height: 48px; border-radius: 50%;">
                <div>
                    <h5>${user.username}</h5>
                    <p style="opacity: 0.7;">Author</p>
                </div>
            </div>
        </div>
    `;
    } catch {
        itemContainer.innerHTML = `
            <p style="opacity: 0.7;">This post has either been malfunct, moved to other owner or author account was</p>
        `;
    }

    const shareButton = document.getElementById("share-btn");
    const downloadButton = document.getElementById("download-btn");

    shareButton.addEventListener("click", () => {
        const textToCopy = `https://sflightx.com/bp/${data.key}`; // 📝 Replace with your URL or text

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Copied to clipboard:", textToCopy);
                // ✅ Optional: show feedback
                shareButton.textContent = "Copied!";
                setTimeout(() => {
                    shareButton.innerHTML = '<span class="material-symbols-rounded" style="font-size: 20px;">share</span>';
                }, 1500);
            })
            .catch((err) => {
                console.error("Failed to copy:", err);
            });
    });

    downloadButton.addEventListener("click", () => {
        const downloadUrl = data.file_link || data.image_url;
        if (downloadUrl) {
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = data.name || "blueprint";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.warn("No download URL available for this blueprint.");
        }
    });

}

export async function getBlueprintById(key) {
    try {
        const blueprintRef = ref(db, `upload/blueprint/${key}`);
        const snapshot = await get(blueprintRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.warn(`No blueprint found for key: ${key}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching blueprint by ID:", error);
        throw error;
    }
}

export async function fetchUserData(uid) {
    try {
        const publicRef = ref(db, `userdata/${uid}`);
        const snapshot = await get(publicRef);
        const userData = snapshot.val();
        const { username = "Unknown", profile: profile = "" } = userData || {};
        return { username, profile };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { username: "Unknown", profile: "" };
    }
}