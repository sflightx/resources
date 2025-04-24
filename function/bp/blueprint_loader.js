// blueprint-loader.js

function getBlueprintKeyFromUrl() {
    const segments = window.location.pathname.split("/");
    return segments[2] || null; // returns null if no key
  }
  
  function loadLatestReleaseIfNoKey() {
    const key = getBlueprintKeyFromUrl();
  
    if (key) return; // Do nothing if key is present
  
    const versionHeader = document.getElementById("version-header");
    const latestRelease = document.getElementById("latest-release");
  
    if (!versionHeader || !latestRelease) return;
  
    const db = firebase.database();
    const ref = db.ref("upload/blueprints");
  
    ref.limitToLast(1).once("value")
      .then(snapshot => {
        const val = snapshot.val();
        if (!val) {
          latestRelease.innerHTML = "<p class='error'>❌ No blueprints found.</p>";
          return;
        }
  
        const [id, data] = Object.entries(val)[0];
  
        versionHeader.textContent = `🚀 SFlightX — ${data.title || "New Release"}`;
  
        latestRelease.innerHTML = `
          <p><strong>Version:</strong> ${data.version || "Unknown"}</p>
          <p><strong>Status:</strong> ${data.status || "Stable"}</p>
          <p>${data.description || "No description."}</p>
          <a href="/bp/${id}" class="button">🔗 View Blueprint</a>
        `;
      })
      .catch(err => {
        console.error("Firebase error:", err);
        latestRelease.innerHTML = "<p class='error'>🔥 Failed to load latest release.</p>";
      });
  }
  