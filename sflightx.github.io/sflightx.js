document.addEventListener('DOMContentLoaded', (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  const link = urlParams.get('link');
  if (link) {
    document.title = link.charAt(0).toUpperCase() + link.slice(1); // Capitalize the first letter
    switch(link) {
      case 'youtube':
        window.location.href = "https://www.youtube.com/@sflightx";
        break;
      case 'discord':
        window.location.href = "https://discord.gg/sflightx";
        break;
      case 'twitter':
        window.location.href = "https://twitter.com/SFlightXJNO";
        break;
      case 'x':
        window.location.href = "https://x.com/SFlightXJNO";
        break;
      case 'facebook':
        window.location.href = "https://facebook.com/sflightx";
        break;
      case 'patreon':
        window.location.href = "https://patreon.com/sflightx";
        break;
      case 'jno':
        window.location.href = "https://www.simplerockets.com/u/sFlightX";
        break;
      // Add more cases as needed
  }
  }
});