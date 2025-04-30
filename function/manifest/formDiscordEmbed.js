document.getElementById("embedForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const data = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      color: document.getElementById("color").value,
      imageUrl: document.getElementById("imageUrl").value,
      authorName: "SFlightX",
      footerText: "SFlightX | Launch Manifest",
    };
  
    const res = await fetch("/send-embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    alert(res.ok ? "Embed sent!" : "Error sending embed.");
  });
  