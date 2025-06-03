const scripts = [
    "https://sflightx.com/resources/function/drawer.js",
    "https://sflightx.com/resources/function/scroll.js",
    "https://sflightx.com/resources/function/theme-mode.js"
  ];

  scripts.forEach(src => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    document.head.appendChild(script);
  });