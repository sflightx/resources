document.getElementById("embedForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const data = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      color: document.getElementById("color").value,
      footerText: document.getElementById("footerText").value,
      imageUrl: document.getElementById("imageUrl").value,
      authorName: document.getElementById("authorName").value
    };
  
    const res = await fetch("/send-embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    alert(res.ok ? "Embed sent!" : "Error sending embed.");
  });
  