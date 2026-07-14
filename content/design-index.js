// content/design-index.js developed by Bob Tianqi Wei
const worksIndex = require("./works-index");
const designLegacyItems = require("./design-legacy-items");

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

function fromLegacy(slug) {
  const entry = designLegacyItems[slug];

  if (!entry) {
    throw new Error(`Missing design legacy item for slug="${slug}"`);
  }

  return clone(entry);
}

function forDesign(entry, slug) {
  return {
    ...entry,
    href: `/design/${slug}/`
  };
}

module.exports = {
  sections: [
    {
      id: "design-id",
      title: "OBJECTS",
      featureRows: [
        [
          forDesign(fromIndex({ href: "/works/morphingskin/", section: "ESSENTIALS" }), "morphingskin"),
          fromIndex({ href: "/works/illuminatio/", section: "TANGIBLE SYSTEMS" })
        ],
        [
          fromIndex({ href: "/works/floro/", section: "TANGIBLE SYSTEMS" }),
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
          forDesign(fromIndex({ href: "/works/hook-loop-units/", section: "TANGIBLE SYSTEMS" }), "hook-loop-units"),
          fromLegacy("computer-aided-design-coursework"),
          fromLegacy("plano"),
          fromLegacy("gentlegrip-brews")
        ],
        [
          forDesign(fromIndex({ href: "/works/a-fish-in-the-northern-ocean/", section: "TANGIBLE SYSTEMS" }), "a-fish-in-the-northern-ocean"),
          fromLegacy("tangible-peripheral-for-computer"),
          forDesign(fromIndex({ href: "/works/memory-lacing-system/", section: "TANGIBLE SYSTEMS" }), "memory-lacing-system")
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
            href: "/design/sympathetic-orchestra-paper/",
            contentHtml: "Sympathetic Orchestra"
          }
        ],
        [
          {
            ...fromLegacy("partselect-chat-agent"),
            href: "/design/partselect-chat-agent/"
          },
          {
            ...fromIndex({ href: "/works/ekphrasis/", section: "RESEARCH" }),
            href: "/design/ekphrasis/",
            contentHtml: "EKPHRASIS",
            className: "work-image-link w-inline-block"
          }
        ]
      ],
      columns: [
        [
          {
            ...fromIndex({ href: "/works/dear___/", section: "ESSENTIALS" }),
            href: "/design/dear___/"
          },
          {
            ...fromIndex({ href: "https://github.com/s-almeda/ArtiFactor", section: "DIGITAL INTERFACES" }),
            href: "/design/artifactor/"
          },
          forDesign(fromIndex({ href: "/works/desktop-buddha/", section: "DIGITAL INTERFACES" }), "desktop-buddha")
        ],
        [
          {
            ...fromLegacy("tao"),
            href: "/design/tao/"
          },
          forDesign(fromIndex({ href: "/works/digital-paradise/", section: "DIGITAL INTERFACES" }), "digital-paradise")
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
          {
            ...fromIndex({ href: "/works/water-synthesizer/", section: "TANGIBLE SYSTEMS" }),
            href: "/design/water-synthesizer/"
          },
          forDesign(fromLegacy("stringed-harmony"), "stringed-harmony")
        ],
        [
          forDesign(fromIndex({ href: "/works/nnmplifier/", section: "TANGIBLE SYSTEMS" }), "nnmplifier"),
          fromLegacy("plano")
        ],
        [
          forDesign(fromIndex({ href: "/works/a-fish-in-the-northern-ocean/", section: "TANGIBLE SYSTEMS" }), "a-fish-in-the-northern-ocean")
        ]
      ]
    }
  ]
};
