document.addEventListener('DOMContentLoaded', () => {
    customElements.whenDefined('md-switch').then(() => {
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
        if (themeToggle.selected) {
          body.classList.add('dark-theme');
          body.classList.remove('light-theme');
          localStorage.setItem('theme', 'dark');
        } else {
          body.classList.add('light-theme');
          body.classList.remove('dark-theme');
          localStorage.setItem('theme', 'light');
        }
      });
    });
  });
  