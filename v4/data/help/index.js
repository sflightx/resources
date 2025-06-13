export default [
  {
    tag: "div",
    id: "step-1",
    class: "step",
    attributes: { indent: "all" },
    children: [
      {
        tag: "h1",
        class: "md-typescale-display-medium",
        children: [{ text: "Introduction" }]
      },
      {
        tag: "p",
        class: "md-typescale-title-medium",
        attributes: { indent: "vertical" },
        children: [
          { text: "In this simple tutorial, you will learn how to use the SFlightX App for your daily needs in our supported space games!" }
        ]
      },
      {
        tag: "md-chip-set",
        children: [
          { tag: "md-assist-chip", attributes: { label: "Spaceflight Simulator" } },
          { tag: "md-assist-chip", attributes: { label: "Juno: New Origins" } }
        ]
      },
      {
        tag: "iframe",
        attributes: { 
          src: "https://www.youtube.com/embed/7QPG5cTcvGY?si=7FD5tZwM6D0651ur",
          title: "YouTube video player",
          style: "width: 100%; height: 70vh; border-radius: 24px;"
        },
        children: []
      }
    ]
  },
  {
    tag: "div",
    id: "step-2",
    class: "step",
    attributes: { indent: "all" },
    children: [
      {
        tag: "h1",
        class: "md-typescale-display-medium",
        children: [{ text: "Getting Started" }]
      },
      {
        tag: "p",
        class: "md-typescale-title-medium",
        attributes: { indent: "vertical" },
        children: [
          { text: "Assuming that SFlightX App is already installed, we can now proceed. If not yet downoaded, you can click the link below." }
        ]
      },
      {
        tag: "div",
        children: [
          {
            tag: "md-outlined-button",
            attributes: {
              href: "https://github.com/sflightx/sflightx-app/releases"
            },
            children: [
              {
                tag: "p",
                class: "md-typescale-title-small",
                children: [{ text: "Download on GitHub" }]
              },
              {
                tag: "span",
                class: "material-symbols-rounded",
                attributes: {
                  slot: "icon",
                  style: "display: flex; align-items: center; height: 100%; width: 24px;"
                },
                children: [{ text: "download" }]
              }
            ]
          },
          {
            tag: "p",
            class: "md-typescale-body-large",
            attributes: { indent: "vertical" },
            children: [
              { text: "By using the app, you agree to our " },
              {
                tag: "span",
                children: [
                  {
                    tag: "a",
                    attributes: { href: "https://sflightx.com/legal/terms" },
                    children: [{ text: "Terms and Conditions" }]
                  }
                ]
              },
              { text: " and have read our " },
              {
                tag: "span",
                children: [
                  {
                    tag: "a",
                    attributes: { href: "https://sflightx.com/legal/privacy" },
                    children: [{ text: "Privacy Policy" }]
                  }
                ]
              },
              { text: "." }
            ]
          }
        ]
      }
    ]
  },
  {
    tag: "div",
    id: "cta",
    children: [
      {
        tag: "p",
        class: "md-typescale-title-medium",
        attributes: { indent: "vertical" },
        children: [{ text: "What would you like to do?" }]
      },
      {
        tag: "div",
        id: "flex",
        children: [
          {
            tag: "md-filled-tonal-button",
            attributes: {
              href: "https://help.sflightx.com/",
              style: "width: 100%;"
            },
            children: [
              {
                tag: "p",
                class: "md-typescale-title-small",
                children: [{ text: "Home" }]
              },
              {
                tag: "span",
                class: "material-symbols-rounded",
                attributes: {
                  slot: "icon",
                  style: "display: flex; align-items: center; height: 100%; width: 24px;"
                },
                children: [{ text: "arrow_back" }]
              }
            ]
          },
          {
            tag: "md-filled-button",
            attributes: {
              href: "https://help.sflightx.com/sflightx-app/",
              style: "width: 100%;"
            },
            children: [
              {
                tag: "p",
                class: "md-typescale-title-small",
                children: [{ text: "Downloading Content" }]
              },
              {
                tag: "span",
                class: "material-symbols-rounded",
                attributes: {
                  slot: "icon",
                  style: "display: flex; align-items: center; height: 100%; width: 24px;"
                },
                children: [{ text: "arrow_forward" }]
              }
            ]
          }
        ]
      }
    ]
  }
];
