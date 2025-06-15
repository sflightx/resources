import { auth } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';

async function renderProfile() {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = '';
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
auth.onAuthStateChanged(renderProfile);

async function getCurrentUserProfile() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            unsubscribe();
            if (user) {
                try {
                    resolve(user);
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve(null);
            }
        }, reject);
    });
}

// Material 3 menu for profile
let profileMenu;
const profileDiv = document.getElementById('profile');

// Store the latest user object
let currentUser = null;
auth.onAuthStateChanged(user => {
    currentUser = user;
});

// Disable focus ring for md-menu and support profileDiv as anchor
profileDiv.addEventListener('click', async (e) => {
    if (profileMenu) {
        profileMenu.remove();
        profileMenu = null;
        return;
    }
    // Use the latest user object
    const user = currentUser;

    // Create a custom sticky profile menu
    profileMenu = document.createElement('div');
    profileMenu.id = 'profile-menu';
    profileMenu.setAttribute('indent', 'all');
    profileMenu.style.position = 'fixed';
    profileMenu.style.top = `${profileDiv.getBoundingClientRect().bottom + 8}px`;
    profileMenu.style.right = '24px';
    profileMenu.style.zIndex = '1000';
    profileMenu.style.background = 'var(--md-sys-color-surface-container-high)';
    profileMenu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    profileMenu.style.borderRadius = '16px';
    profileMenu.style.display = 'flex';
    profileMenu.style.flexDirection = 'column';
    profileMenu.style.alignItems = 'center';
    profileMenu.style.gap = '12px';

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
        if (profileMenu && !profileMenu.contains(event.target) && !profileDiv.contains(event.target)) {
            profileMenu.remove();
            profileMenu = null;
            document.removeEventListener('mousedown', handleClickOutside);
        }
    };
    setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    if (user) {
        profileMenu.innerHTML = `
                <div id="profile-items" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                    <div indent="all">
                        <h5 class="md-typescale-headline-medium">Hello, ${user.displayName || user.email || 'User'}</h5>
                        <p class="md-typescale-body-small" style="color: var(--md-sys-color-on-surface-variant)">UID: ${user.uid}</p>
                    </div>
                    <md-filled-tonal-button id="account-details-btn">Manage Account</md-filled-tonal-button>
                    <md-outlined-button id="logout-btn">Log Out</md-outlined-button>
                </div>
                `;

        // Support div as anchor
        profileMenu.anchorElement = profileDiv;

        // Remove focus ring from all menu items after render
        setTimeout(() => {
            profileMenu.querySelectorAll('md-menu-item').forEach(item => {
                item.style.outline = 'none';
                item.style.boxShadow = 'none';
            });
        }, 0);

        document.body.appendChild(profileMenu);
        profileMenu.open = true;

        profileMenu.addEventListener('closed', () => {
            profileMenu.remove();
            profileMenu = null;
        });

        profileMenu.querySelector('#account-details-btn').addEventListener('click', () => {
            window.location.href = '/account/details';
        });

        profileMenu.querySelector('#logout-btn').addEventListener('click', async () => {
            await auth.signOut();
            window.location.reload();
        });
    }
});