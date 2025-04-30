window.sendEmbed = async function sendEmbed() {
    const data = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        color: document.getElementById("color").value,
        url: document.getElementById("url")?.value || "",

        // Author block
        author: "SFlightX",
        authorIconUrl: document.getElementById("authorIconUrl")?.value || "",
        authorUrl: document.getElementById("authorUrl")?.value || "",

        // Thumbnail (top-right)
        thumbnail: document.getElementById("thumbnail")?.value || "",

        // Fields (example)
        fields: [
            { name: "Vehicle", value: "Falcon 9", inline: true },
            { name: "Payload", value: "Starlink Group 6-39", inline: true }
        ],

        // Main image
        imageUrl: document.getElementById("imageUrl").value,

        // Footer
        footer: "SFlightX | Launch Manifest",
        footerUrl: document.getElementById("footerUrl")?.value || ""
    };

    try {
        const res = await fetch("/send-embed", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        alert(res.ok ? "✅ Embed sent!" : "❌ Failed to send embed.");
    } catch (err) {
        alert("❌ Error sending embed: " + err.message);
        console.error(err);
    }
}