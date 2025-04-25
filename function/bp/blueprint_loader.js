import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const detailContainer = document.createElement("div");
const dataContainer = document.getElementById("data");
const imageContainer = document.getElementById("image");

const descriptionContainer = document.createElement("div");
const downloadContainer = document.createElement("div");
descriptionContainer.className = "container";
downloadContainer.className = "container";
downloadContainer.style.padding = "16px";


const title = document.getElementById("app-bar-title");
var loadingMessage = document.createElement("p");
loadingMessage.textContent = "Loading blueprint...";

async function fetchBlueprint(key) {
    const blueprintRef = ref(db, `upload/blueprint/${key}`);


    try {
        const snapshot = await get(blueprintRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            renderBlueprint(data, key);
        } else {
            loadingMessage = `<p>No blueprint found for key: ${key}</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        loadingMessage = `<p>Error loading blueprint data.</p>`;
    }

    if (!loadingMessage === null) {
        detailContainer.innerHTML = loadingMessage;
    }
}

// 🧱 Render to HTML
function renderBlueprint(data, key) {
    imageContainer.style.backgroundImage = `url(${data.image_url || "https://sflightx.com/resources/image/blueprint.png"})`;
    imageContainer.style.borderRadius = "24px";
    title.innerHTML = `${data.name || "Unnamed Blueprint"}`;
    detailContainer.innerHTML = `
        <h5 class="md-typescale-headline-medium" id="secondary-title"> ${data.name || "Unknown Blueprint"}</h5>
        <p class="md-typescale-title-large"> ${data.desc || "No description available."}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
            <md-suggestion-chip class="md3-chip" id="bp-key" label="${data.req_game}" removable="false" selected="false"></md-suggestion-chip>
            <md-suggestion-chip class="md3-chip" id="bp-key" label="${data.req_type}" removable="false" selected="false"></md-suggestion-chip>
        </div>
        <div div style="display: flex; gap: 8px;">
            <md-filled-tonal-button href="${data.file_link}" target="_blank"> Download
                <svg slot="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-337q-8 0-15-2.5t-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z"/></svg>
            </md-filled-tonal-button>
            <md-outlined-button href="https://sflightx.com/bp/${key}" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z"/></svg>
            </md-outlined-button>
        </div>
    `;
    downloadContainer.innerHTML = `
        <div style="display: flex; justify-content: space-around; align-items: center; text-align: center;">
            <div>
                <md-icon><span class="material-symbols-rounded">download</span></md-icon>
                <p style="padding: 0;">${data.downloads?.toString() || "0"}</p>
            </div>
            <div>
                <md-icon><span class="material-symbols-rounded">star</span></md-icon>
                <p style="padding: 0;">${data.ratings?.toFixed(1) || "0.0"}</p>
            </div>
        </div>
    `;
    descriptionContainer.appendChild(detailContainer);
    
    dataContainer.appendChild(descriptionContainer);
    dataContainer.appendChild(downloadContainer);
}

// ✅ Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get("id");

    if (key) {
        fetchBlueprint(key);
    } else {
        loadingMessage = `<p>No key provided in URL.</p>`;
    }
    detailContainer.innerHTML = loadingMessage;
    dataContainer.appendChild(detailContainer);
});