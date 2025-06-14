import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// DOM References
const detailContainer = document.createElement("div");
const dataContainer = document.getElementById("data");
const contentContainer = document.getElementById("item");

const errorMessage = document.getElementById("errormsg");

const descriptionContainer = document.createElement("div");
const downloadContainer = document.createElement("div");
const authorContainer = document.createElement("div");

contentContainer.setAttribute("indent", "all");
contentContainer.setAttribute("stat", "");
contentContainer.id = "grid";

descriptionContainer.className = "container";
descriptionContainer.style.borderRadius = "0px";
descriptionContainer.style.background = "color-mix(in srgb, var(--md-sys-color-surface-container-low) 50%, transparent)";
descriptionContainer.style.margin = "0px";
descriptionContainer.style.height = "100%";
descriptionContainer.style.display = "flex";
descriptionContainer.style.justifyContent = "space-between";
descriptionContainer.style.flexDirection = "column";

downloadContainer.style.display = "flex";
downloadContainer.style.justifyContent = "end";
downloadContainer.style.padding = "32px";

detailContainer.style.padding = "32px";

const title = document.getElementById("app-bar-title");
const loadingMessage = document.createElement("p");
loadingMessage.textContent = "Loading blueprint...";

// Blueprint Fetching
async function fetchBlueprint(key) {
    detailContainer.innerHTML = "";
    detailContainer.appendChild(loadingMessage);

    const blueprintRef = ref(db, `upload/blueprint/${key}`);

    try {
        const snapshot = await get(blueprintRef);
        if (snapshot.exists()) {
            let data = snapshot.val();
            
            // If the data is an array, reverse it.
            if (Array.isArray(data)) {
                data = data.reverse();
            }
            // If it's an object, reverse the entries (key-value pairs)
            else if (typeof data === 'object') {
                data = Object.entries(data).reverse().reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
            }

            renderBlueprint(data, key);
        } else {
            loadingMessage.textContent = `No blueprint found for key: ${key}`;
            errorMessage.appendChild(loadingMessage);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        loadingMessage.textContent = "Error loading blueprint data.";
        errorMessage.appendChild(loadingMessage);
    }
}


// Blueprint Rendering
function renderBlueprint(data, key) {
    // Background image setup
    dataContainer.style.backgroundImage = `url(${data.image_url || "https://sflightx.com/resources/image/blueprint.png"})`;   
    dataContainer.style.backgroundSize = "cover";
    dataContainer.style.backgroundPosition = "center top";
    dataContainer.style.width = "100%";

    // Title
    title.textContent = data.name || "Unnamed Blueprint";

    // Blueprint Details
    detailContainer.innerHTML = `
        <h5 class="md-typescale-headline-medium" id="title">${data.name || "Unknown Blueprint"}</h5>
        <p class="md-typescale-title-medium" indent="top">${data.desc || "No description available."}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;" indent="vertical">
            <md-suggestion-chip label="${data.req_game}" class="md3-chip"></md-suggestion-chip>
            <md-suggestion-chip label="${data.req_type}" class="md3-chip"></md-suggestion-chip>
        </div>
        <div style="display: flex; gap: 24px; text-align: center;">
            <div style="display: flex; gap: 8px; align-items: center;">
                <md-icon><span class="material-symbols-rounded">download</span></md-icon>
                <p class="md-typescale-title-small">${data.downloads ?? 0}</p>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <md-icon><span class="material-symbols-rounded">star</span></md-icon>
                <p class="md-typescale-title-small">${(data.ratings ?? 0).toFixed(1)}</p>
            </div>
        </div>
    `;

    // Download and Share Section
    downloadContainer.innerHTML = `
        <div id="cta">
            <md-outlined-button id="copy-link-button">
                Share
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e3e3e3">
                    <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"/>
                </svg>
            </md-outlined-button>
            <md-filled-button href="${data.file_link}" target="_blank">
                Download for SFS Android
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                    <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5Z"/>
                </svg>
            </md-filled-button>
            <md-filled-tonal-button href="${data.file_link}" target="_blank">
                Download for SFS PC
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                    <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5Z"/>
                </svg>
            </md-filled-tonal-button>
        </div>
    `;

    // Copy to clipboard (with safety check)
    const copyLinkButton = downloadContainer.querySelector("#copy-link-button");
    if (copyLinkButton) {
        copyLinkButton.addEventListener("click", () => {
            const link = `https://sflightx.com/bp/${key}`;
            navigator.clipboard.writeText(link)
                .then(() => alert("Link copied to clipboard!"))
                .catch(err => console.error("Failed to copy link: ", err));
        });
    }

    // Author Info
    const uid = data.author;
    const dateString = new Date(data.date).toLocaleDateString() || "Unknown";

    function renderAuthor(username = "Unknown", profile = "null", uid = "null") {
        authorContainer.innerHTML = `
            <div class="container" style="display: flex; align-items: center; width: 100%; height: 50%; border-radius: 0; background: none; box-shadow: none; padding: 0; margin: 0;">
            <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                ${profile
                ? `<img src="${profile}" alt="Profile" style="width: 100%; max-width: 96px; height: 64px; object-fit: cover; border-radius: 16px;">`
                : `<md-icon><span class="material-symbols-rounded">person</span></md-icon>`
                }
                <p style="padding: 0; margin: 0;">${username}</p>
            </div>
            <div style="display: flex; align-items: center; justify-content: flex-end;">
                <md-outlined-button href="https://sflightx.com/u/${uid}">View Profile</md-outlined-button>
            </div>
            </div>
        `;
        // Ensure authorContainer takes full width and half the parent height
        authorContainer.style.width = "100%";
        authorContainer.style.height = "50%";
        authorContainer.style.borderRadius = "0";
        authorContainer.style.margin = "0";
        authorContainer.style.padding = "0";
    }

    if (!uid) {
        renderAuthor();
    } else {
        const userRef = ref(db, `userdata/${uid}`);
        get(userRef)
            .then(snapshot => {
                const { username = "Unknown", profile = "" } = snapshot.val() || {};
                renderAuthor(username, profile, uid);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                renderAuthor();
            });
    }

    contentContainer.innerHTML = "";
    

    // Append all rendered parts
    descriptionContainer.innerHTML = ""; // Clear before appending
    const div = document.createElement("div");
    div.appendChild(detailContainer);

    descriptionContainer.appendChild(div);
    descriptionContainer.appendChild(downloadContainer);
    dataContainer.innerHTML = ""; // Clear previous
    dataContainer.appendChild(descriptionContainer);

    const contentDiv = document.createElement("div");

    contentDiv.appendChild(authorContainer);

    contentContainer.appendChild(contentDiv);
}

// On Load
document.addEventListener("DOMContentLoaded", () => {
    const key = new URLSearchParams(window.location.search).get("id");
    if (key) {
        fetchBlueprint(key);
    } else {
        // Load the home page script dynamically
        const script = document.createElement("script");
        script.src = "https://sflightx.com/resources/v4/function/bp/home.js"; // change this path to match your actual home script file
        script.type = "module";  // if your script uses ES modules
        script.onload = () => {
            console.log("Home page script loaded.");
        };
        script.onerror = () => {
            detailContainer.innerHTML = `<p>Failed to load homepage script.</p>`;
        };

        document.body.appendChild(script);
    }
});
