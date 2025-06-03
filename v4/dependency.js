const scripts = [
    "https://sflightx.com/resources/v4/function/drawer.js",
    "https://sflightx.com/resources/v4/function/scroll.js",
    "https://sflightx.com/resources/v4/function/theme-mode.js",
    "https://sflightx.com/resources/v4/function/footer.js"
  ];

  scripts.forEach(src => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.head.appendChild(script);
  });