import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

async function getContracts() {
    const path = 'athena/contract';

    const blueprintRef = ref(db, path);
    try {
        const snapshot = await get(blueprintRef);
        if (snapshot.exists()) {
            let data = snapshot.val();
            console.log("Contracts data:", data);
            renderContracts(data);
        } else {
            loadingMessage.textContent = `No contracts found at path: ${path}`;
            errorMessage.appendChild(loadingMessage);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        loadingMessage.textContent = "Error loading contracts data.";
        errorMessage.appendChild(loadingMessage);
    }
}

function renderContracts(data) {
    const layout = document.getElementById('contracts');

    for (const [key, childData] of Object.entries(data)) {
        if (childData === null || childData === undefined) continue;

        // Create a new div for each contract
        const div = document.createElement('div');
        div.classList.add('container');
        div.setAttribute('indent', 'all');
        div.setAttribute('shape', 'rounded');
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'end';

        if (childData.thumbnail !== undefined && childData.thumbnail !== null) {
            const img = document.createElement('img');
            img.src = childData.thumbnail;
            img.style.aspectRatio = '16/9';
            img.style.width = '100%';
            img.style.objectFit = 'cover';
            div.appendChild(img);
        }

        const title = document.createElement('h4');
        title.textContent = childData.title;
        title.classList.add('md-typescale-headline-large');
        div.appendChild(title);

        const learnMoreButton = document.createElement('md-filled-tonal-button');

        learnMoreButton.addEventListener('click', function () {
            window.open(`https://athena.sflightx.com/contracts/?id=${key}`, '_blank');
        });

        const button_txt = document.createElement('h4');
        button_txt.textContent = 'Apply Now';

        learnMoreButton.appendChild(button_txt);
        div.appendChild(learnMoreButton);

        layout.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getContracts();
});