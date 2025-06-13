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
          { text: "After you complete this tutorial, you can now share youe blueprints to your friends with ease!" }
        ]
      },
      {
        tag: "md-chip-set",
        children: [
          { tag: "md-assist-chip", attributes: { label: "Spaceflight Simulator" } },
          { tag: "md-assist-chip", attributes: { label: "Blueprint Sharing" } }
        ]
      },
      {
        tag: "div",
        attributes: { indent: "vertical" },
        children: [
          {
            tag: "md-outlined-button",
            attributes: {
              href: "https://youtube.com/shorts/z-HXpaBlvjA?si=xcKpCLrYLpO4R7QU"
            },
            children: [
              { text: "Video Tutorial (Optional)" },
              {
                tag: "span",
                class: "material-symbols-rounded",
                attributes: {
                  slot: "icon",
                  style: "display: flex; align-items: center; height: 100%; width: 24px;"
                },
                children: [{ text: "open_in_new" }]
              }
            ]
          }
        ]
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
    id: "step-3",
    class: "step",
    attributes: { indent: "all" },
    children: [
      {
        tag: "h1",
        class: "md-typescale-display-medium",
        children: [{ text: "Share from Spaceflight Simulator" }]
      }
    ]
  },
  {
    tag: "div",
    attributes: { indent: "all" },
    children: [
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [{ text: "→ Open " }, { tag: "b", children: [{ text: "Spaceflight Simulator" }] }]
      },
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [{ text: "→ Navigate your blueprints then load" }]
      },
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [{ text: "→ Share your blueprint with SFS" }]
      },
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [
          { text: "→ Once upload complete, a dialog appears. Share to " },
          { tag: "b", children: [{ text: "SFlightX App" }] },
          { text: "." }
        ]
      },
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [{ text: "→ Enter required details." }]
      },
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [{ text: "→ Once complete, the app closes and you will return to the game." }]
      },
      {
        tag: "p",
        class: "md-typescale-body-large",
        children: [{ text: "→ " }, { tag: "b", children: [{ text: "Upload is complete!" }] }]
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
