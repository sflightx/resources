window.sendEmbed = async function sendEmbed() {
    const data = {
        // Getting values from the form fields
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        color: document.getElementById("color").value ? "#" + document.getElementById("color").value : "",
        imageUrl: document.getElementById("imageUrl").value,

        // Adding author, fields, footer, etc., can be done similarly
        author: "SFlightX",
        authorIconUrl: "",  // Add if you want an author icon
        authorUrl: "",  // Add if you want an author URL
        thumbnail: "",  // Add if you want a thumbnail
        fields: [
            { name: "Vehicle", value: "Falcon 9", inline: true },
            { name: "Payload", value: "Starlink Group 6-39", inline: true }
        ],
        footer: "SFlightX | Launch Manifest",
        footerUrl: ""  // Add if you want a footer URL
    };

    try {
        // Send the data to your backend POST endpoint
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
