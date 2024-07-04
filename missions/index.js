document.addEventListener("DOMContentLoaded", function() {
    var database_db = firebase.database();
    var ref = database_db.ref("launch_manifest/stats");
    var launchedElement = document.getElementById("launched");
    var recoveriesElement = document.getElementById("recovery");
    var deployedElement = document.getElementById("deployed");

    if (!launchedElement || !recoveriesElement || !deployedElement) {
        console.error("One or more elements not found.");
        return;
    }

    ref.once("value", function(snapshot) {
        var data = snapshot.val();
        if (data) {
            var totalLaunches = data.launched;
            var totalRecoveries = data.recovery;
            var payloadDeployed = data.deployed;

            // Update existing elements with the retrieved data
            launchedElement.textContent = totalLaunches;
            recoveriesElement.textContent = totalRecoveries;
            deployedElement.textContent = payloadDeployed;
        } else {
            console.error("Data not found.");
        }
    });

    var database = firebase.database();
    var ref = database.ref("launch_manifest/upcoming");
    var launchesContainer = document.getElementById("upcoming-container");

    if (!launchesContainer) {
        console.error("Launches container not found.");
        return;
    }

    ref.once("value", function(snapshot) {
        var launches = snapshot.val();
        var launchCount = Object.keys(launches).length;

        launchesContainer.classList.add(launchCount === 1 ? "single-launch" : "multiple-launches");

        var launchCardsContainer = document.createElement("div");
        launchCardsContainer.className = "launch-cards";

        for (var key in launches) {
            var launch = launches[key];
            var missionName = launch.mission;
            var imageUrl = launch.image_url;
            var nextTimestamp = parseInt(launch.net); // Convert to integer
            var articleId = launch.articlePostKey;

            var launchCard = document.createElement("div");
            launchCard.className = "launch-card";

            var textContainer = document.createElement("div");
            textContainer.classList.add("text-container");

            var nextTimestampElement = document.createElement("p");
            nextTimestampElement.textContent = new Date(nextTimestamp).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            nextTimestampElement.classList.add("launch-date");

            var missionNameElement = document.createElement("p");
            missionNameElement.textContent = missionName;
            missionNameElement.classList.add("mission-name");

            var viewButton = document.createElement("button");
            viewButton.textContent = "View";
            viewButton.classList.add("view-button");
            viewButton.addEventListener("click", function() {
                // Replace 'url' with your desired URL
                window.location.href = 'https://sflightx.github.io/missions/info?id=' + articleId;
            });

            textContainer.appendChild(nextTimestampElement);
            textContainer.appendChild(missionNameElement);
            textContainer.appendChild(viewButton); // Add the button to the text container

            var imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.classList.add("launch-image");

            launchCard.appendChild(imageElement);
            launchCard.appendChild(textContainer);

            launchCardsContainer.appendChild(launchCard);
        }

        launchesContainer.appendChild(launchCardsContainer);
    });
});