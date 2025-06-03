import { db } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { ref, get, query, orderByChild, limitToLast, endAt } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const dataContainer = document.getElementById("data");
const banner = document.getElementById("full");
banner.style.height = "auto";

let lastKey = null;
let isLoading = false;
let isDone = false;
const PAGE_SIZE = 25;

async function fetchBlueprintsPage() {
    if (isLoading || isDone) return;
    isLoading = true;
    dataContainer.innerHTML += `<p id="loading" style="padding: 24px;">Loading...</p>`;

    try {
        const baseRef = ref(db, "upload/blueprint");
        const blueprintQuery = !lastKey
            ? query(baseRef, orderByChild("date"), limitToLast(PAGE_SIZE))
            : query(baseRef, orderByChild("date"), endAt(lastKey - 1), limitToLast(PAGE_SIZE));

        const snapshot = await get(blueprintQuery);
        document.getElementById("loading")?.remove();

        if (snapshot.exists()) {
            const blueprints = snapshot.val();
            const entries = Object.entries(blueprints).sort((a, b) => b[1].date - a[1].date);

            if (entries.length < PAGE_SIZE) isDone = true;
            if (entries.length > 0) lastKey = entries[entries.length - 1][1].date;

            renderBlueprintGrid(entries);
        } else {
            isDone = true;
            if (!lastKey) dataContainer.innerHTML = `<p style="padding: 24px;">No blueprints found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching blueprints:", error);
        document.getElementById("loading")?.remove();
        if (!lastKey) dataContainer.innerHTML = `<p>Failed to load blueprints.</p>`;
    } finally {
        isLoading = false;
    }
}

async function fetchUserData(uid) {
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

async function renderBlueprintGrid(entries) {
    const grid = dataContainer.querySelector(".grid") || (() => {
        const newGrid = document.createElement("div");
        newGrid.className = "grid";
        newGrid.style.display = "grid";
        newGrid.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
        newGrid.style.gap = "16px";
        newGrid.style.padding = "24px";
        dataContainer.appendChild(newGrid);
        return newGrid;
    })();

    const authorPromises = [];

    // Render blueprints and collect author promises
    entries.forEach(([key, data]) => {
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
        const authorContainer = document.createElement("div");

        async function renderAuthor(username = "Unknown", profile = "") {
            authorContainer.innerHTML = `
                <div>
                    <div style="display: flex; gap: 8px; align-items: center; width: 100%;">
                        ${profile
                            ? `<img src="${profile}" alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;">`
                            : `<md-icon><span class="material-symbols-rounded">person</span></md-icon>`}
                        <p>${username}</p>
                    </div>
                </div>
            `;
            description.appendChild(authorContainer);
        }

        const uid = data.author;
        if (uid) {
            // Fetch user data only once and render
            authorPromises.push(fetchUserData(uid).then(user => renderAuthor(user.username, user.profile)));
        } else {
            renderAuthor(); // No user data, fallback to defaults
        }

        card.addEventListener("click", () => {
            window.location.href = `?id=${key}`;
        });

        grid.appendChild(card);
    });

    // Wait for all author data to be fetched before rendering
    await Promise.all(authorPromises);
}

window.addEventListener("scroll", () => {
    const scrollThreshold = 300;
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold) {
        fetchBlueprintsPage();
    }
});

fetchBlueprintsPage();
