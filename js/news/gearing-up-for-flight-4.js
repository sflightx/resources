document.addEventListener("DOMContentLoaded", function() {
    var publicationDateElement = document.getElementById("publication-date");
    var publishedDate = new Date(publicationDateElement.getAttribute("data-published"));
    var localPublishedDate = publishedDate.toLocaleString(undefined, {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone});

    publicationDateElement.textContent = "Published: " + localPublishedDate;
});