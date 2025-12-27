import { db } from 'https://sflightx.com/resources/v4/function/serviceAuth/initializeFirebase.js';
import { ref, get } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = 'launch_manifest/upcoming';
    const mainContainer = document.getElementById('full-launch');

    const databaseRef = ref(db, path);

    // Map various launch states to appropriate colors
    function getStateColor(state) {
        if (!state) return 'var(--md-sys-color-error)';
        switch (String(state).toLowerCase()) {
            case '0':
            case '00':
            case '06':
                return '#4caf50'; // Green for Go
            case '01':
            case '03':
                return '#ff9800'; // Orange for Hold
            case '02':
            case 'fail':
                return '#f44336'; // Red for Fail
            case '04':
            case '05':
                return '#9e9e9e'; // Gray for Inactive/Unknown
            default:
                return 'var(--md-sys-color-error)';
        }
    }

    get(databaseRef)
        .then(snapshot => {
            const data = [];
            snapshot.forEach(child => data.push(child.val()));
            data.reverse(); // Reverse to display latest first

            // Clear existing content
            mainContainer.innerHTML = '';

            if (data.length === 1) {
                const childData = data[0];

                const stateDisplay = document.createElement('div');
                stateDisplay.id = 'state-display';
                stateDisplay.style.borderRadius = '1.5rem';
                stateDisplay.style.backgroundColor = getStateColor(childData.statusId);

                // Single launch style
                const launchSection = document.createElement('section');
                launchSection.style.backgroundImage = `url(${childData.thumbnail})`;
                launchSection.style.backgroundColor = 'var(--md-sys-color-surface-variant)';
                launchSection.style.backgroundSize = 'cover';
                launchSection.style.backgroundPosition = window.innerWidth > 1024 ? 'right' : 'center';
                launchSection.style.display = 'flex';
                launchSection.style.flexDirection = 'column';
                launchSection.style.justifyContent = 'flex-end';
                launchSection.style.height = '50vh';
                launchSection.style.borderRadius = '1rem';
                launchSection.style.overflow = 'hidden';
                launchSection.style.marginLeft = '0.5rem';

                const overlay = document.createElement('div');
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.35)';
                overlay.style.padding = '24px';
                overlay.style.height = '100%';
                overlay.style.alignContent = 'end';

                const title = document.createElement('h1');
                title.textContent = childData.name;
                title.classList.add('md-typescale-display-large');
                overlay.appendChild(title);

                const date = document.createElement('md-assist-chip');
                const dateObj = new Date(childData.net.start);
                const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
                date.textContent = formattedDate;
                date.classList.add('md-typescale-title-small');

                // Row container for date and countdown
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '12px';
                row.style.marginBottom = '16px';

                const countdown = document.createElement('div');
                countdown.classList.add('md-typescale-title-small');
                countdown.style.fontVariantNumeric = 'tabular-nums';
                countdown.setAttribute('aria-live', 'polite');

                row.appendChild(date);
                row.appendChild(countdown);
                overlay.appendChild(row);

                // Countdown based on returned timestamp from net.start
                const targetTime = dateObj.getTime();
                let countdownInterval;
                function updateCountdown() {
                    if (isNaN(targetTime)) { countdown.textContent = ''; return; }
                    const now = Date.now();
                    let diff = targetTime - now;
                    if (diff <= 0) {
                        countdown.textContent = 'Launched';
                        clearInterval(countdownInterval);
                        return;
                    }
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    diff -= days * (1000 * 60 * 60 * 24);
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    diff -= hours * (1000 * 60 * 60);
                    const minutes = Math.floor(diff / (1000 * 60));
                    diff -= minutes * (1000 * 60);
                    const seconds = Math.floor(diff / 1000);
                    const parts = [];
                    if (days) parts.push(days + 'd :');
                    parts.push(String(hours).padStart(2, '0') + ' :');
                    parts.push(String(minutes).padStart(2, '0') + ' :');
                    parts.push(String(seconds).padStart(2, '0'));
                    countdown.textContent = parts.join(' ');
                    countdown.style.color = days <= 1 ? 'var(--md-sys-color-tertiary)' : 'var(--md-sys-color-primary)';
                }
                updateCountdown();
                countdownInterval = setInterval(updateCountdown, 1000);

                const details = document.createElement('p');
                details.textContent = childData.desc;
                details.classList.add('md-typescale-title-small');
                details.style.width = window.innerWidth > 1024 ? '50%' : '100%';
                overlay.appendChild(details);

                const informationRow = document.createElement('div');
                informationRow.style.display = 'flex';
                informationRow.style.flexWrap = 'wrap';
                informationRow.style.gap = '8px';
                informationRow.style.marginTop = '16px';

                const locationDiv = document.createElement('div');
                locationDiv.style.display = 'flex';
                locationDiv.style.alignItems = 'center';
                locationDiv.style.gap = '4px';
                locationDiv.style.backgroundColor = 'var(--md-sys-color-surface-container-highest)';
                locationDiv.style.padding = '16px 24px';
                locationDiv.style.borderRadius = '16px';
                locationDiv.style.height = 'fit-content';

                const locationIcon = document.createElement('span');
                locationIcon.classList.add('material-symbols-rounded');
                locationIcon.textContent = 'location_on';
                locationIcon.style.fontSize = '2.5rem';
                locationIcon.style.color = 'var(--md-sys-color-on-surface)';
                locationDiv.appendChild(locationIcon);

                const locationText = document.createElement('p');
                locationText.textContent = childData.launch_site.address;
                locationText.classList.add('md-typescale-body-medium');
                locationDiv.appendChild(locationText);
                informationRow.appendChild(locationDiv);

                locationDiv.appendChild(locationIcon);
                locationDiv.appendChild(locationText);
                informationRow.appendChild(locationDiv);

                const learnMoreButton = document.createElement('md-filled-tonal-button');
                learnMoreButton.innerHTML = '<span class="material-symbols-rounded">open_in_new</span>';
                learnMoreButton.addEventListener('click', () => {
                    window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                });

                informationRow.appendChild(learnMoreButton);
                overlay.appendChild(informationRow);

                launchSection.appendChild(overlay);
                stateDisplay.appendChild(launchSection);
                mainContainer.appendChild(stateDisplay);

            } else if (data.length > 1) {

                // Multiple launches style (scroll container)
                const scrollWrapper = document.createElement('div');
                scrollWrapper.style.display = 'flex';
                scrollWrapper.style.overflowX = 'auto';
                scrollWrapper.style.gap = '1rem';
                scrollWrapper.style.padding = '1rem';
                scrollWrapper.style.scrollSnapType = 'x mandatory';

                data.forEach(childData => {
                    const launchCard = document.createElement('div');
                    launchCard.style.minWidth = '35vw';
                    launchCard.style.height = '25vh';
                    launchCard.style.backgroundImage = `url(${childData.thumbnail})`;
                    launchCard.style.backgroundSize = 'cover';
                    launchCard.style.backgroundPosition = 'center';
                    launchCard.style.display = 'flex';
                    launchCard.style.flexDirection = 'column';
                    launchCard.style.justifyContent = 'flex-end';
                    launchCard.style.padding = '1rem';
                    launchCard.style.borderRadius = '1rem';
                    launchCard.style.overflow = 'hidden';
                    launchCard.style.scrollSnapAlign = 'start';

                    const overlay = document.createElement('div');
                    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                    overlay.style.padding = '0.5rem';
                    overlay.style.borderRadius = '0.5rem';

                    const title = document.createElement('h2');
                    title.textContent = childData.name;
                    title.classList.add('md-typescale-title-large');
                    overlay.appendChild(title);

                    const details = document.createElement('p');
                    details.textContent = childData.desc;
                    details.classList.add('md-typescale-body-medium');
                    overlay.appendChild(details);

                    const learnMoreButton = document.createElement('md-filled-tonal-button');
                    learnMoreButton.innerHTML = '<span>Learn More</span>';
                    learnMoreButton.addEventListener('click', () => {
                        window.open(`https://sflightx.com/missions/?id=${childData.key}`, '_blank');
                    });
                    overlay.appendChild(learnMoreButton);

                    launchCard.appendChild(overlay);
                    scrollWrapper.appendChild(launchCard);
                });

                mainContainer.appendChild(scrollWrapper);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
