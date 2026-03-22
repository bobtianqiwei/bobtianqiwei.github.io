// content/projects/website-templates.js developed by Bob Tianqi Wei
module.exports = {
  slug: "website-templates",
  content: {
    title: "Website Templates",
    description: "A growing collection of reusable website templates, starting with Retroframe and a modular file management system for multi-page publishing.",
    hero: {
      headline: "A growing collection of reusable website templates for polished, expressive web experiences.",
      metaLines: [
        "Frontend Engineering · Web Templates",
        "Independent Project",
        "2026 - Ongoing"
      ],
      image: {
        src: "/images/projects/website-templates/retroframecover.png",
        alt: "Retroframe template cover",
        caption: "Retroframe cover"
      }
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p><strong>Website Templates</strong> is a growing collection of reusable web templates and interface systems. Right now it starts with <a href=\"https://github.com/bobtianqiwei/retroframe\" target=\"_blank\">Retroframe</a>, a retro-inspired website framework built for expressive personal sites, portfolio pages, and themed web experiences.</p><p>I plan to expand this collection with more templates over time, but for now this page highlights the first public template in the series.</p>"
      },
      {
        title: "Current Template",
        blocks: [
          {
            title: "Retroframe",
            bodyHtml: "<p><a href=\"https://github.com/bobtianqiwei/retroframe\" target=\"_blank\">Retroframe</a> is the current template in this collection. It is designed for fast setup, strong visual identity, and highly customizable retro web presentation. I will later add a public demo page on this site so visitors can browse and preview it directly.</p>",
            cardGroup: "templates",
            cardColumns: 1
          },
          {
            title: "File Management System",
            bodyHtml: "<p>I designed the template around a simple file management system so a site can scale beyond a single landing page. Shared chrome, page variants, and project data stay separated: reusable assets and scripts live in stable locations, while page content can be generated or edited independently. That makes it easier to add new templates, publish multiple page styles, and keep updates consistent without manually rewriting every page.</p><p>For this website, the same approach lets me keep a retro-styled homepage, generate related subpages, and later plug in dedicated demo pages without restructuring the whole site.</p>"
          }
        ]
      }
    ],
    cardGroups: {
      templates: [
        {
          href: "https://github.com/bobtianqiwei/retroframe",
          title: "Retroframe",
          image: "/images/projects/website-templates/retroframe.png"
        }
      ]
    }
  },
  views: {
    swe: {
      outputPath: "swe/classic/website-templates/index.html",
      metaTitle: "Website Templates - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
