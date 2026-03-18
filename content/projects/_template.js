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
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>Shared project overview content.</p>"
      },
      {
        title: "Primary Section",
        blocks: [
          {
            title: "Block Title",
            bodyHtml: "<p>Shared content block.</p>",
            cardGroup: "primary"
          }
        ]
      },
      {
        title: "Gallery",
        slides: [
          "/images/example-1.jpg",
          "/images/example-2.jpg"
        ]
      }
    ],
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
      outputPath: "swe/classic/new-project/index.html",
      metaTitle: "New Project - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  },
  notes: {
    // After adding or changing views, update every homepage/index entry that surfaces this project.
    // This includes repeated appearances across works sections and any design/swe homepage links.
    worksIndex: {
      section: "DIGITAL INTERFACES",
      order: 999,
      image: "/images/new-work-cover.jpg",
      contentHtml: "New Project"
    }
  }
};
