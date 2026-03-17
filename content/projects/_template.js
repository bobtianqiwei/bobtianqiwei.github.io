// content/projects/_template.js developed by Bob Tianqi Wei
module.exports = {
  slug: "new-project",
  content: {
    title: "New Project",
    description: "A short shared description used across every page variant.",
    hero: {
      headline: "One canonical project headline.",
      metaLines: [
        "Discipline · Category",
        "Organization",
        "Date Range"
      ],
      video: {
        youtubeId: "VIDEO_ID",
        title: "Project demo",
        caption: "Video"
      }
    },
    sections: {
      overview: {
        title: "Overview",
        bodyHtml: "<p>Shared project overview content.</p>"
      },
      primary: {
        title: "Primary Section",
        blocks: [
          {
            title: "Block Title",
            bodyHtml: "<p>Shared content block.</p>"
          }
        ]
      }
    },
    cardGroups: {
      primary: [
        {
          href: "https://example.com",
          title: "Card Title",
          image: "/images/example.jpg"
        }
      ]
    }
  },
  views: {
    works: {
      outputPath: "works/new-project/index.html",
      metaTitle: "New Project",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/new-project/index.html",
      metaTitle: "New Project - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/new-project/index.html",
      metaTitle: "New Project - Software Engineering Portfolio",
      backHref: "/swe/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "portfolio-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
