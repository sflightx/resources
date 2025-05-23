document.addEventListener("DOMContentLoaded", function () {
    const navData = [
      {
        href: "#step-1",
        headline: "Introduction",
        supportingText: "Learn about the app before proceeding"
      },
      {
        href: "#step-2",
        headline: "Getting Started",
        supportingText: "Setting up the app"
      }
    ];

    const navContainer = document.getElementById("navItems");
    const locContainer = document.getElementById("locItems");

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

      const supportingDiv = document.createElement("div");
      supportingDiv.setAttribute("slot", "supporting-text");
      supportingDiv.textContent = item.supportingText;

      mdListItem.appendChild(headlineDiv);
      mdListItem.appendChild(supportingDiv);
      mdList.appendChild(mdListItem);
    });

    navContainer.appendChild(mdList);
    locContainer.appendChild(mdList.cloneNode(true));

  });