import { db, auth } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

document.addEventListener("DOMContentLoaded", () => {
    const selectVehicle = document.getElementById("vehicle-id");
    const selectlaunchSite = document.getElementById("launch-site-id");

    onAuthStateChanged(auth, async user => {
        if (!user) {
            console.warn("User not logged in.");
            return;
        }

        const company = document.getElementById("company");
        company.textContent = "Company for " + (user.displayName || "No name set");

        try {
            // 1. Get user's companyId
            const userCompanyRef = ref(db, `userdata/${user.uid}/companyId`);
            const companyIdSnap = await get(userCompanyRef);

            if (!companyIdSnap.exists()) {
                console.warn("No companyId set for this user.");
                return;
            }

            const companyId = companyIdSnap.val();

            // 2. Get vehicle IDs under company
            const vehicleKeysRef = ref(db, `static/company/${companyId}/vehicle`);
            const vehicleKeysSnap = await get(vehicleKeysRef);

            if (!vehicleKeysSnap.exists()) {
                console.warn("No vehicles found under this company.");
                return;
            }

            const launchSiteKeysRef = ref(db, `static/company/${companyId}/launch_site`);
            const launchSiteKeysSnap = await get(launchSiteKeysRef);

            if (!launchSiteKeysSnap.exists()) {
                console.warn("No launch sites found under this company.");
                return;
            }

            const vehicleIds = Object.values(vehicleKeysSnap.val());
            const launchSiteIds = Object.values(launchSiteKeysSnap.val());

            // 3. Fetch full vehicle data from static/vehicle/<vehicleId>
            const vehicleFetches = vehicleIds.map(vehicleId => {
                const vehicleRef = ref(db, `static/vehicle/${vehicleId}`);
                return get(vehicleRef);
            });

            const vehicleResults = await Promise.all(vehicleFetches);
            const vehicles = vehicleResults
                .filter(snap => snap.exists())
                .map(snap => snap.val());

            console.log("Vehicles for user’s company:", vehicles);

            vehicles.forEach(vehicle => {
                const option = document.createElement("md-select-option");
                const nameWithVersion = vehicle.version
                    ? `${vehicle.name} ${vehicle.version}`
                    : vehicle.name;
                option.value = vehicle.key;
                option.innerHTML = `<div slot="headline">${nameWithVersion}</div>`;
                selectVehicle.appendChild(option);
            });




            const launchSiteFetches = launchSiteIds.map(launchSiteId => {
                const launchSiteRef = ref(db, `static/launch_site/${launchSiteId}`);
                return get(launchSiteRef);
            });

            const launchSiteResults = await Promise.all(launchSiteFetches);
            const launchSite = launchSiteResults
                .filter(snap => snap.exists())
                .map(snap => snap.val());

            console.log("Launch Site(s) for user’s company:", launchSite);

            launchSite.forEach(launchSite => {
                const option = document.createElement("md-select-option");
                option.value = launchSite.key;
                option.innerHTML = `<div slot="headline">${launchSite.name}</div>`;
                selectlaunchSite.appendChild(option);
            });
            

        } catch (error) {
            console.error("Error loading company vehicles:", error);
        }
    });
});
