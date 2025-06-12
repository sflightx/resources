document.addEventListener('DOMContentLoaded', () => {
  customElements.whenDefined('md-switch').then(() => {
    const logo = document.getElementById("logo");
    const footer_logo = document.getElementById("footer_logo");
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      themeToggle.selected = true;
    } else {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      themeToggle.selected = false;
    }

    themeToggle.addEventListener('change', () => {
      const isDark = themeToggle.selected;

      body.classList.toggle('dark-theme', isDark);
      body.classList.toggle('light-theme', !isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      const logoSrc = isDark
        ? "https://sflightx.com/resources/v4/database/logo/logo.png"
        : "https://sflightx.com/resources/v4/database/logo/logo-dark.png";

      const logo = document.getElementById("logo");
      const footer_logo = document.getElementById("footer_logo");

      if (logo) logo.src = logoSrc;
      if (footer_logo) footer_logo.src = logoSrc;
    });


  });
});
