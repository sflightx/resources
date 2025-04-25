import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// DOM References
const detailContainer = document.createElement("div");
const dataContainer = document.getElementById("data");
const contentContainer = document.getElementById("grid");

const errorMessage = document.getElementById("errormsg");

const descriptionContainer = document.createElement("div");
const downloadContainer = document.createElement("div");
const authorContainer = document.createElement("div");

descriptionContainer.className = "container";
descriptionContainer.style.borderRadius = "0px";
descriptionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
descriptionContainer.style.margin = "0px";
descriptionContainer.style.height = "100%";
descriptionContainer.style.display = "flex";
descriptionContainer.style.justifyContent = "space-between";
descriptionContainer.style.flexDirection = "column";

downloadContainer.style.display = "flex";
downloadContainer.style.justifyContent = "end";
downloadContainer.style.padding = "32px";

detailContainer.style.padding = "32px";
authorContainer.className = "secondary-container";
authorContainer.style.margin = "0px";

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
            const data = snapshot.val();
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
    dataContainer.style.backgroundPosition = "top center";

    // Title
    title.textContent = data.name || "Unnamed Blueprint";

    // Blueprint Details
    detailContainer.innerHTML = `
        <h5 class="md-typescale-headline-medium" id="secondary-title">${data.name || "Unknown Blueprint"}</h5>
        <p class="md-typescale-title-large">${data.desc || "No description available."}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            <md-suggestion-chip label="${data.req_game}" class="md3-chip"></md-suggestion-chip>
            <md-suggestion-chip label="${data.req_type}" class="md3-chip"></md-suggestion-chip>
        </div>
        <div style="display: flex; gap: 24px; text-align: center;">
            <div style="display: flex; gap: 8px; align-items: center;">
                <md-icon><span class="material-symbols-rounded">download</span></md-icon>
                <p style="padding: 0;">${data.downloads ?? 0}</p>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
                <md-icon><span class="material-symbols-rounded">star</span></md-icon>
                <p style="padding: 0;">${(data.ratings ?? 0).toFixed(1)}</p>
            </div>
        </div>
    `;

    // Download and Share Section
    downloadContainer.innerHTML = `
        <div style="display: flex; gap: 8px;">
            <md-filled-tonal-button href="${data.file_link}" target="_blank">
                Download
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e3e3e3">
                    <path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5Z"/>
                </svg>
            </md-filled-tonal-button>
            <md-outlined-button id="copy-link-button">
                Share
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e3e3e3">
                    <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z"/>
                </svg>
            </md-outlined-button>
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
            <div style="display: flex; gap: 48px; text-align: center; justify-content: space-between; width: 100%;">
                <div>
                    ${profile
                        ? `<img src="${profile}" alt="Profile" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">`
                        : `<md-icon><span class="material-symbols-rounded">person</span></md-icon>`
                    }
                    <p style="padding: 0;">${username}</p>
                </div>
                <div style="display: flex; gap: 8px; align-items: end;">
                    <md-outlined-button href="https://sflightx.com/u/${uid}">View Profile</md-outlined-button>
                </div>
            </div>
        `;
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

    authorContainer.className = "container";
    contentDiv.appendChild(authorContainer);

    contentContainer.appendChild(contentDiv);
}

// On Load
document.addEventListener("DOMContentLoaded", () => {
    const key = new URLSearchParams(window.location.search).get("id");
    if (key) {
        fetchBlueprint(key);
    } else {
        // Optional: show loading message or fallback content
        detailContainer.innerHTML = `<p>Loading homepage...</p>`;
        dataContainer.appendChild(detailContainer);

        // Load the home page script dynamically
        const script = document.createElement("script");
        script.src = "../../resources/function/bp/home.js"; // change this path to match your actual home script file
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
