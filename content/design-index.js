// content/design-index.js developed by Bob Tianqi Wei
const worksIndex = require("./works-index");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function fromIndex({ href, section, contentHtml }) {
  const entry = worksIndex.entries.find((item) => {
    if (section && item.section !== section) {
      return false;
    }
    if (href && item.href !== href) {
      return false;
    }
    if (contentHtml && item.contentHtml !== contentHtml) {
      return false;
    }
    return true;
  });

  if (!entry) {
    throw new Error(`Missing design index entry for href="${href || ""}" content="${contentHtml || ""}" section="${section || ""}"`);
  }

  return clone(entry);
}

function fromLegacy(fileName) {
  const legacy = require(`./works/${fileName}.js`);
  const entry = legacy.entries?.[0];

  if (!entry) {
    throw new Error(`Missing legacy work entry in ${fileName}.js`);
  }

  return clone(entry);
}

module.exports = {
  sections: [
    {
      id: "design-id",
      title: "OBJECTS",
      featureRows: [
        [
          fromIndex({ href: "/works/morphingskin/", section: "ESSENTIALS" }),
          fromIndex({ href: "/works/illuminatio/", section: "ESSENTIALS" })
        ],
        [
          fromIndex({ href: "/works/floro/", section: "ESSENTIALS" }),
          fromLegacy("palette-plate")
        ]
      ],
      columns: [
        [
          fromIndex({ href: "/works/xiao-in/", section: "TANGIBLE SYSTEMS" }),
          fromLegacy("cosmic-cup-dish-set"),
          fromLegacy("instruments-for-vr-music-games"),
          fromLegacy("espresso-machine-and-quick-capsule-case")
        ],
        [
          fromIndex({ href: "/works/hook-loop-units/", section: "TANGIBLE SYSTEMS" }),
          fromLegacy("computer-aided-design-coursework"),
          fromLegacy("plano"),
          fromLegacy("gentlegrip-brews")
        ],
        [
          fromIndex({ href: "/works/a-fish-in-the-northern-ocean/", section: "TANGIBLE SYSTEMS" }),
          fromLegacy("tangible-peripheral-for-computer"),
          fromIndex({ href: "/works/memory-lacing-system/", section: "TANGIBLE SYSTEMS" })
        ]
      ]
    },
    {
      id: "design-software",
      title: "INTERFACES",
      featureRows: [
        [
          {
            ...fromIndex({ href: "/works/anything/", section: "ESSENTIALS" }),
            href: "/design/anything/"
          },
          {
            ...fromLegacy("sympathetic-orchestra"),
            href: "/works/sympathetic-orchestra/"
          }
        ],
        [
          fromLegacy("partselect-chat-agent"),
          {
            ...fromIndex({ href: "/works/ekphrasis/", section: "RESEARCH" }),
            contentHtml: "EKPHRASIS",
            className: "work-image-link w-inline-block"
          }
        ]
      ],
      columns: [
        [
          fromLegacy("anything-affiliate-program-page"),
          {
            ...fromIndex({ href: "https://github.com/s-almeda/ArtiFactor", section: "DIGITAL INTERFACES" }),
            href: "/works/artifactor/"
          },
          fromIndex({ href: "/works/desktop-buddha/", section: "DIGITAL INTERFACES" })
        ],
        [
          fromLegacy("anything-brand-resources-page"),
          fromLegacy("tao"),
          fromIndex({ href: "/works/digital-paradise/", section: "DIGITAL INTERFACES" })
        ],
        [
          fromLegacy("terminal-zen"),
          fromLegacy("bob-s-cat")
        ]
      ]
    },
    {
      id: "design-installations",
      title: "INSTALLATIONS",
      columns: [
        [
          fromIndex({ href: "/works/water-synthesizer/", section: "TANGIBLE SYSTEMS" }),
          fromLegacy("stringed-harmony")
        ],
        [
          fromIndex({ href: "/works/nnmplifier/", section: "TANGIBLE SYSTEMS" }),
          fromLegacy("plano")
        ],
        [
          fromIndex({ href: "/works/a-fish-in-the-northern-ocean/", section: "TANGIBLE SYSTEMS" })
        ]
      ]
    }
  ]
};
