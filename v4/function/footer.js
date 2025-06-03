class SFlightXFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
      <footer>
    <div class="footer-container" indent="all">
        <a href="https://sflightx.com">
            <img id="footer-logo" src="https://sflightx.com/resources/v4/database/logo/logo.png" alt="sFlightX Logo" />
        </a>
        <p class="md-typescale-body-large">
            SFlightX is not affiliated with Spaceflight Simulator or Juno: New Origins. This website is not
            affiliated with Space Exploration Technologies (SpaceX).
        </p>
        <p class="md-typescale-body-medium">© 2021-2025 SFlightX. All rights reserved.</p>


        <div class="footer-container">
            <div>
                <ul id="social">
                    <li>
                        <a href="https://x.com/SFlightXJNO" slot="start">
                            <img src="https://img.icons8.com/?size=100&id=Q33YQBzI2lZs&format=png&color=FFFFFF"
                                class="link-img" alt="X" />
                        </a>
                    </li>
                    <li>
                        <a href="https://youtube.com/@sflightx" slot="start">
                            <img src="https://img.icons8.com/?size=100&id=85162&format=png&color=FFFFFF"
                                class="link-img" alt="YouTube" />
                        </a>
                    </li>
                    <li>
                        <a href="https://facebook.com/sflightx" slot="start">
                            <img src="https://img.icons8.com/?size=100&id=85126&format=png&color=FFFFFF"
                                class="link-img" alt="Facebook" />
                        </a>
                    </li>
                    <li>
                        <a href="https://bsky.app/profile/sflightx.com" slot="start">
                            <img src="https://img.icons8.com/?size=100&id=MGqlXOe8ksH0&format=png&color=FFFFFF"
                                class="link-img" alt="Bluesky" />
                        </a>
                    </li>
                    <li>
                        <a href="https://simplerockets.com/u/sflightx" slot="start">
                            <img src="https://img.icons8.com/?size=100&id=COgXDnufRVRP&format=png&color=FFFFFF"
                                class="link-img" alt="SimpleRockets" />
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <ul id="legal-link">
                    <li>
                        <a href="https://sflightx.com/legal/terms" target="_self">Terms of Service</a>
                    </li>
                    <li>
                        <a href="https://sflightx.com/legal/privacy" target="_self">Privacy Policy</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-container" id="resources" indent="all">
        <div>
            <p class="md-typescale-title-small">Resources</p>
            <ul>
                <li><a href="https://sflightx.com/" target="_self">Home</a></li>
                <li><a href="https://sflightx.com/launches" target="_self">Launches</a></li>
                <li><a href="https://sflightx.com/vehicle" target="_self">Vehicle</a></li>

            </ul>
        </div>
        <div>
            <p class="md-typescale-title-small">OmegaLink</p>
            <ul>
                <li><a href="https://sflightx.com/invite/" target="_self">Homepage</a></li>
                <li><a href="https://sflightx.com/invite/" target="_self">Bid Contract</a></li>
            </ul>
        </div>
        <div>
            <p class="md-typescale-title-small">SFlightX App</p>
            <ul>
                <li><a href="https://app.sflightx.com/" target="_self">Homepage</a></li>
                <li><a href="https://sflightx.com/launches" target="_self">Tutorials</a></li>
                <li><a href="https://app.sflightx.com/bp" target="_self">Download Blueprints</a></li>
            </ul>
        </div>
        <div>
            <p class="md-typescale-title-small">SFlightX Bot</p>
            <ul>
                <li><a href="https://sflightx.com/invite/" target="_self">Homepage</a></li>
                <li><a href="https://sflightx.com/invite/" target="_self">Add to Discord</a></li>
                <li><a href="https://help.sflightx.com/" target="_self">FAQs</a></li>
            </ul>
        </div>
    </div>
</footer>
    `;
    }
}

customElements.define('sflightx-footer', SFlightXFooter);
