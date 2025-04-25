import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const dataContainer = document.getElementById("data");
const banner = document.getElementById("full");
banner.style.height = "auto";
dataContainer.innerHTML = `<p style="padding: 24px;">Loading blueprints...</p>`;

// Fetch all blueprints
async function fetchBlueprints() {
    try {
        const blueprintRef = ref(db, "upload/blueprint");
        const snapshot = await get(blueprintRef);

        if (snapshot.exists()) {
            const blueprints = snapshot.val();
            renderBlueprintGrid(blueprints);
        } else {
            dataContainer.innerHTML = `<p>No blueprints found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching blueprints:", error);
        dataContainer.innerHTML = `<p>Failed to load blueprints.</p>`;
    }
}

// Render grid of blueprints
function renderBlueprintGrid(blueprints) {
    dataContainer.innerHTML = "";
    
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
    grid.style.gap = "16px";
    grid.style.padding = "24px";

    Object.entries(blueprints).forEach(([key, data]) => {
        const card = document.createElement("div");
        card.className = "md-surface";
        card.style.borderRadius = "16px";
        card.style.overflow = "hidden";
        card.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
        card.style.background = "#1e1e1e";
        card.style.color = "#fff";
        card.style.cursor = "pointer";
        card.style.transition = "transform 0.2s";
        card.onmouseover = () => card.style.transform = "scale(1.02)";
        card.onmouseout = () => card.style.transform = "scale(1)";

        card.innerHTML = `
            <img src="${data.image_url || "https://sflightx.com/resources/image/blueprint.png"}" 
                 alt="${data.name}" 
                 style="width: 100%; height: 160px; object-fit: cover;">
            <div style="padding: 16px;">
                <h3 style="margin: 0; font-size: 1.1rem;">${data.name || "Unnamed Blueprint"}</h3>
                <p style="margin: 8px 0 0; color: #aaa;">${data.desc || "No description"}</p>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `?id=${key}`;
        });

        grid.appendChild(card);
    });

    dataContainer.appendChild(grid);
}

// Init
fetchBlueprints();
