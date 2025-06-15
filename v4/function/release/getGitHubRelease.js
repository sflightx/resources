const owner = "sflightx";
const repo = "sflightx-app";

fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`)
  .then(response => response.json())
  .then(data => {
    const releaseDiv = document.getElementById('latest-release');
    const versionHeader = document.getElementById('version-header');
    versionHeader.textContent = `Download SFlightX App ${data.name}`;
    releaseDiv.style.display = 'flex';
    releaseDiv.style.flexDirection = 'column';
    releaseDiv.style.alignItems = 'start';
    releaseDiv.innerHTML = `
                <div style="width: 100%; text-align: left;">${marked.parse(data.body)}</div>
                <md-outlined-button style="margin: 24px 0px;" href="${data.html_url}" target="_blank">View on GitHub</md-outlined-button>
                `;
    if (data.assets.length > 0) {
      data.assets.forEach(asset => {
        const link = document.createElement('md-filled-tonal-button');
        link.href = asset.browser_download_url;
        link.textContent = `Download ${asset.name}`;
        link.target = '_blank';
        link.style.width = 50 %
          releaseDiv.appendChild(link);
        releaseDiv.appendChild(document.createElement('br'));
      });
    }
    
  })
  .catch(err => {
    console.error("Error loading release:", err);
  });