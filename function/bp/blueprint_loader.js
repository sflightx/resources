import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const container = document.createElement("div");
const dataContainer  = document.getElementById("data");
const imageContainer = document.getElementById("image");
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
        container.innerHTML = loadingMessage;
    }
}

// 🧱 Render to HTML
function renderBlueprint(data, key) {
    imageContainer.style.backgroundImage = `url(${data.image_url || "https://sflightx.com/resources/image/blueprint.png"})`;
    const container = document.createElement("div");
    container.innerHTML = `
        <h2>${data.name || "Unnamed Blueprint"}</h2>
        <p><strong>Key:</strong> ${key}</p>
        <p><strong>Author:</strong> ${data.author || "Unknown"}</p>
        <p><strong>Description:</strong> ${data.description || "No description available."}</p>
    `;
    dataContainer.innerHTML = ""; // optional: clear previous contents
    dataContainer.appendChild(container);
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
    container.innerHTML = loadingMessage;
    dataContainer .appendChild(container);
});