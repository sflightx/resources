body {
    background: black;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif; /* Set the preferred font */
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    max-width: 100vw;
}

.material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 240px;  /* Preferred icon size */
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
}

p, h1, h2, h3, h4, h5, h6 {
    color: white;
    line-height: 1.5;
}

header {
    position: fixed;
    top: 0px;
    margin: 0px;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
    padding: 8px;
    height: 5vh;
    display: flex;
    justify-content: space-around;
    align-items: center; /* Center align vertically*/
    transition: top 0.3s; /* Adding transition for smooth hide/show effect */
    z-index: 2;
}

.header-hide {
    top: -100px; /* Moves the header off-screen when scrolled down */
}

header img {
    display: block;
    max-height: 100%; /* Adjust as needed */
    max-width: 100%; /* Adjust as needed */
}

.lead img {
    max-width: 100vw;
}

.menuImage {
    max-height: 75%;
    max-width: 15vw;
}

.profileImage {
    right: 0px;
}

main {
    flex: 1;
    text-align: center;
}

* {
    font-family: 'Barlow Condensed';
    padding: 0;
    font-size: 3vw;
}

.banner {
    max-width: 100vw;
    max-height: 100vh;
}

.banner img {
    height: 100vh;
    width: 100%;
    object-fit: cover;
    z-index: 3;
}

.banner h1, .banner p {
    position: absolute;
    margin: 10px;
    color: white;    
}

.banner h1 {
    font-size: 3rem;
    margin-left: 30px;
    bottom: 20%;
}

.banner p {
    bottom: 10%;
}

.ticker {
    padding-top: 50px;
    padding-bottom: 25px;
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
}

.ticker div {
    padding: 1.5px 5px;
    min-width: 20vw;
    min-height: 15vh;
    background-color: rgba(255,255,255,0.1);
    border-radius: 5px;
    align-items: center;
}

.ticker p, .ticker h4 {
    margin: 0px;
}

.ticker p {
    font-size: 5rem;
}

#upcoming-container {
    width: 100vw;
    padding-top: 25px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap; /* Prevent items from wrapping */
}
.launch-card {
    position: relative;
    display: inline-block;
    text-align: left;
    background: black;
    width: 70vw; /* Adjusted width to account for scrollbar space */
    height: 50vh;
    margin: 3vw; /* Adjusted margin for better spacing */
}

.launch-image {
    width: 70vw;
    height: 100%; /* Adjust as needed */
    object-fit: cover;
}

.text-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 70%;
    padding: 20px 10px; /* Adjust padding as needed */
    background: linear-gradient(to top right, rgba(0, 0, 0, 0.5) 70%, rgba(0, 0, 0, 0) 10%); /* Adjust gradient direction */
}

.mission-name {
    font-size: 7vw;
}

.single-launch .launch-card {
    
}

.multiple-launches .launch-card {
    
}

.view-button {
    background-color: rgba(0, 0, 0, 0.5); /* Background with 0.5 transparency */
    color: white; /* Text color */
    border: 1px solid white; /* Black border with 0.25 transparency */
    border-radius: 5px; /* Border radius */
    padding: 5px 10px; /* Padding */
    cursor: pointer; /* Cursor style */
    transition: background-color 0.3s, border-color 0.3s, color 0.3s; /* Transition effect */
}

.view-button:hover {
    background-color: rgba(0, 0, 0, 0.7); /* Darker background on hover */
    border-color: rgba(255, 255, 255, 0.7); /* Darker border on hover */
}

footer {
    color: white;
    padding: 4vh;
    bottom: 0;
    width: 75vw;
    margin: 0px auto;
    text-align: center;
}

footer a {
    color: white;
    text-decoration: none;
    margin: 0 5px;
}

footer a:hover {
    text-decoration: underline;
}