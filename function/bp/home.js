import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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
        card.style.backgroundImage = data.image_url ? `url(${data.image_url})` : "none";
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
        card.style.display = "flex";
        card.style.alignItems = "end";
        card.style.color = "var(--md-sys-color-on-surface)";
        card.style.cursor = "pointer";
        card.style.transition = "transform 0.2s";
        card.onmouseover = () => card.style.transform = "scale(1.02)";
        card.onmouseout = () => card.style.transform = "scale(1)";

        card.innerHTML = `
            <div id="description" style="padding: 16px; height: 50vh; width: 100%; align-content: end; background: rgba(0, 0, 0, 0.35);">
                <h3 style="margin: 0; padding: 0; font-size: 1.1rem;">${data.name || "Unnamed Blueprint"}</h3>
                <p style="margin: 0; color: #aaa;">${data.desc || "No description"}</p>
            </div>
        `;

        const description = card.querySelector("#description");
        const authorContainer = document.createElement("div"); // New container for each card

        // Author Info
        const uid = data.author;
        const dateString = new Date(data.date).toLocaleDateString() || "Unknown";

        function renderAuthor(username = "Unknown", profile = "null") {
            authorContainer.innerHTML = `
                <div>
                    <div style="display: flex; gap: 8px; text-align: center; align-items: anchor-center; width: 100%;">
                        ${profile
                            ? `<img src="${profile}" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">`
                            : `<md-icon><span class="material-symbols-rounded">person</span></md-icon>`
                        }
                        <p>${username}</p>
                    </div>
                </div>
            `;
            description.appendChild(authorContainer);
        }

        if (!uid) {
            renderAuthor();
        } else {
            const userRef = ref(db, `userdata/${uid}`);
            get(userRef)
                .then(snapshot => {
                    const { username = "Unknown", profile = "" } = snapshot.val() || {};
                    renderAuthor(username, profile);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    renderAuthor();
                });
        }

        card.addEventListener("click", () => {
            window.location.href = `?id=${key}`;
        });

        grid.appendChild(card);
    });

    dataContainer.appendChild(grid);
}

// Init
fetchBlueprints();
