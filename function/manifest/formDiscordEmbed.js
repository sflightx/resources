import { auth } from 'https://sflightx.com/resources/serviceAuth/initializeFirebase.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

window.sendEmbed = async function sendEmbed() {
    const user = auth.currentUser;
    // Get the selected chip's color dynamically
    const chipSet = document.getElementById('status-chips');
    let selectedColor = "#000000"; // Default color if no chip is selected

    const selectedChip = chipSet.querySelector('md-filter-chip[selected]');
    if (selectedChip) {
        const value = selectedChip.getAttribute('label');
        const statusColors = {
            "TBD": "#9E9E9E",
            "TBC": "#607D8B",
            "GO": "#4CAF50",
            "HOLD": "#FFC107",
            "SCRUB": "#FF5722",
            "FAILURE": "#F44336"
        };
        selectedColor = statusColors[value] || "#000000";
    }

    const payloadList = document.getElementById("payload-list");
    const payloads = [];
    payloadList.querySelectorAll('md-list-item').forEach((item) => {
        payloads.push(item.textContent.trim());
    });

    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        color: selectedColor,
        imageUrl: document.getElementById("imageUrl").value,

        author: user ? user.displayName : "Anonymous",
        authorIconUrl: "",
        authorUrl: user ? user.photoURL : "",
        thumbnail: "",
        fields: payloads.map((payload, i) => ({
            name: `Payload ${i + 1}`,
            value: payload,
            inline: true
        })),
        footer: "Updated by SFlightX Bot",
        footerUrl: ""
    };

    try {
        const res = await fetch("https://api.sflightx.com/discord/postManifest", {  // Adjust URL to your production backend
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            alert("✅ Embed sent!");
        } else {
            const errorData = await res.json();
            alert("❌ Failed to send embed: " + errorData.error);
        }
    } catch (err) {
        alert("❌ Error sending embed: " + err.message);
        console.error(err);
    }
}
