export function renderNavigation(navData) {
  const navContainer = document.getElementById("navItems");
  const locContainer = document.getElementById("locItems");

  const mdList = document.createElement("md-list");

  if (Array.isArray(navData) && navData) {
    navData.forEach(item => {
      const mdListItem = document.createElement("md-list-item");
      mdListItem.setAttribute("type", "link");
      mdListItem.setAttribute("href", item.href);
      if (typeof toggleDrawer === "function") {
        mdListItem.onclick = toggleDrawer;
      }
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
  }
}