// --- Configuration ---
const API_BASE = "https://api.sflightx.com/app/user/"; // base API link
const TEST_UID = auth.currentUser?.uid; // replace or make dynamic

// --- Main UI rendering ---
async function renderProfile() {
  const profileDiv = document.getElementById("profile");
  profileDiv.innerHTML = "";

  const user = await getCurrentUserProfile();

  if (user) {
    // Show user displayName or email, fallback to icon if not available
    if (user.photoURL) {
      profileDiv.innerHTML = `<img src="${user.photoURL}" class="profile-img" alt="Profile" style="cursor:pointer;">`;
    } else {
      profileDiv.innerHTML = `<md-filled-button id="account-details-btn">Sign In</md-filled-button>`;
    }
  } else {
    profileDiv.innerHTML = `<md-filled-button href="https://auth.sflightx.com" id="account-details-btn">Sign In</md-filled-button>`;
  }
}

renderProfile();

// --- Fetch user profile via API ---
async function getCurrentUserProfile() {
  try {
    // For now, always fetch by known UID; later replace with dynamic one
    const res = await fetch(`${API_BASE}${TEST_UID}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    const user = await res.json();
    return user;
  } catch (err) {
    console.error("❌ Failed to get user profile:", err);
    return null;
  }
}

// --- Material 3 menu for profile ---
let profileMenu;
const profileDiv = document.getElementById("profile");

// Store the latest user object
let currentUser = null;

// Fetch user once on load and store it
(async () => {
  currentUser = await getCurrentUserProfile();
})();

// Disable focus ring for md-menu and support profileDiv as anchor
profileDiv.addEventListener("click", async (e) => {
  if (profileMenu) {
    profileMenu.remove();
    profileMenu = null;
    return;
  }

  const user = currentUser;

  // Create custom sticky profile menu
  profileMenu = document.createElement("div");
  profileMenu.id = "profile-menu";
  profileMenu.setAttribute("indent", "all");
  profileMenu.style.position = "fixed";
  profileMenu.style.top = `${profileDiv.getBoundingClientRect().bottom + 8}px`;
  profileMenu.style.right = "24px";
  profileMenu.style.zIndex = "1000";
  profileMenu.style.background = "var(--md-sys-color-surface-container-high)";
  profileMenu.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
  profileMenu.style.borderRadius = "16px";
  profileMenu.style.display = "flex";
  profileMenu.style.flexDirection = "column";
  profileMenu.style.alignItems = "center";
  profileMenu.style.gap = "12px";

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (
      profileMenu &&
      !profileMenu.contains(event.target) &&
      !profileDiv.contains(event.target)
    ) {
      profileMenu.remove();
      profileMenu = null;
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };
  setTimeout(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, 0);

  if (user) {
    profileMenu.innerHTML = `
      <div id="profile-items" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div indent="all">
          <h5 class="md-typescale-headline-medium">Hello, ${user.displayName || user.email || "User"}</h5>
          <p class="md-typescale-body-small" style="color: var(--md-sys-color-on-surface-variant)">UID: ${user.uid}</p>
        </div>
        <md-filled-tonal-button id="account-details-btn">Manage Account</md-filled-tonal-button>
        <md-outlined-button id="logout-btn">Log Out</md-outlined-button>
      </div>
    `;

    document.body.appendChild(profileMenu);
    profileMenu.open = true;

    profileMenu.addEventListener("closed", () => {
      profileMenu.remove();
      profileMenu = null;
    });

    profileMenu.querySelector("#account-details-btn").addEventListener("click", () => {
      window.location.href = "https://account.sflightx.com/";
    });

    profileMenu.querySelector("#logout-btn").addEventListener("click", async () => {
      // In API mode, just clear UI or redirect — no Firebase signOut
      currentUser = null;
      profileDiv.innerHTML = `<md-filled-button href="https://auth.sflightx.com" id="account-details-btn">Sign In</md-filled-button>`;
      profileMenu.remove();
      profileMenu = null;
    });
  }
});
