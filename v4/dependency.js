const scripts = [
  "../resources/v4/function/drawer.js",
  "../resources/v4/function/theme-mode.js",
  "../resources/v4/function/footer.js",
  "../resources/v4/data/drawer/nav-loader.js",
  "../resources/v4/function/element/dialog.js"
];

scripts.forEach(src => {
  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  script.defer = true;
  document.head.appendChild(script);
});