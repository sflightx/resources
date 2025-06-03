
// Elements
const drawer = document.getElementById("drawer");
const side_sheet = document.getElementById("side-sheet");
const backdrop = document.getElementById("backdrop");

// Drawer toggle function
function toggleDrawer() {
    drawer.classList.toggle("open");       // Show/hide drawer
    backdrop.classList.toggle("hidden");   // Show/hide backdrop
}

function toggleSideSheet() {
    side_sheet.classList.toggle("open");       // Show/hide drawer
    backdrop.classList.toggle("hidden");   // Show/hide backdrop
}

// Expose to HTML onclick
window.toggleDrawer = toggleDrawer;
window.toggleSideSheet = toggleSideSheet;