document.addEventListener("DOMContentLoaded", function () {
    const navData = [
      {
        href: "https://sflightx.com/launches",
        headline: "Contracts",
      },
      {
        href: "https://sflightx.com/missions",
        headline: "Events",
      },
      {
        href: "https://sflightx.com/vehicle/maya",
        headline: "Companies",
      },
    ];
  
    const navContainer = document.getElementById("navItems");
  
    const mdList = document.createElement("md-list");
  
    navData.forEach(item => {
      const mdListItem = document.createElement("md-list-item");
      mdListItem.setAttribute("type", "link");
      mdListItem.setAttribute("href", item.href);
      mdListItem.onclick = toggleDrawer;
      mdListItem.setAttribute("target", "_self");
  
      const headlineDiv = document.createElement("div");
      headlineDiv.setAttribute("slot", "headline");
      headlineDiv.textContent = item.headline;
  
      if (!item.supportingText === undefined) {
        const supportingDiv = document.createElement("div");
        supportingDiv.setAttribute("slot", "supporting-text");
        supportingDiv.textContent = item.supportingText;
        mdListItem.appendChild(supportingDiv);
      }
  
  
      mdListItem.appendChild(headlineDiv);
  
      mdList.appendChild(mdListItem);
    });
  
    navContainer.appendChild(mdList);
  
  });