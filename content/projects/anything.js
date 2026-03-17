// content/projects/anything.js developed by Bob Tianqi Wei
module.exports = {
  slug: "anything",
  content: {
    title: "Anything",
    description: "Anything is an AI builder that turns natural language into working mobile apps, websites, and full-stack tools—built with real code. You can add GPT-5 and 40+ integrations in one click. It supports on-device preview with Expo Go and publishing to the web and iOS App Store, with databases, auth, storage, and payments included. For harder tasks, Max is an autonomous agent that runs your app in a browser, writes code and tests, and ships fixes/features by itself.",
    hero: {
      headline: "Text to App: Turn your words into mobile apps, sites, tools, and products.",
      metaLines: [
        "AI Software · Design Engineering",
        "Anything (Create, Inc.)",
        "Jul - Sep 2025"
      ],
      video: {
        youtubeId: "wsR_YeWuIGw",
        title: "Anything demo",
        caption: "Video"
      }
    },
    sections: {
      overview: {
        title: "What Anything Is",
        bodyHtml: "<p>Anything is an AI builder that turns natural language into working mobile apps, websites, and full-stack tools—built with real code. You can add GPT-5 and 40+ integrations in one click. It supports on-device preview with Expo Go and publishing to the web and iOS App Store, with databases, auth, storage, and payments included. For harder tasks, Max is an autonomous agent that runs your app in a browser, writes code and tests, and ships fixes/features by itself.</p>",
        extraVideo: {
          youtubeId: "rVz6Pc1rhxQ",
          title: "Anything product demo",
          caption: "Product Demo"
        }
      },
      primary: {
        title: "What I Did",
        blocks: [
          {
            title: "Website & Narrative",
            bodyHtml: "<p>Shipped high-fidelity marketing sites for the Anything AI app builder; collaborated with design and founding team. Converted Figma specs into pixel-accurate, responsive React UI.</p>",
            cardGroup: "website"
          },
          {
            title: "Internal AI Design Pipeline",
            bodyHtml: "<p>Engineered a screenshot-to-UI flow that mirrors human design practice: section clustering, grid/ hierarchy detection, component detection, scaffold-first layout, font classification for typography match, token normalization, and quality gates with retry/rollback, to improve first-pass alignment and cut manual edits.</p><p><a href=\"https://huggingface.co/AnythingAI/font-classifier-v4\" target=\"_blank\">Anything AI: Open Source Font Classifier (Hugging Face)</a></p>"
          }
        ]
      }
    },
    cardGroups: {
      website: [
        {
          href: "https://www.createanything.com/",
          title: "Site: createanything.com",
          image: "/images/createanything.com.jpg"
        },
        {
          href: "https://anythingmarketing.created.app/affiliate",
          title: "Anything Affiliate Program Page",
          image: "/images/anything-affiliate-program.jpg"
        },
        {
          href: "https://brandresources.created.app/",
          title: "Anything Brand Resources Page",
          image: "/images/brandresources.created.app_.png"
        }
      ]
    }
  },
  views: {
    works: {
      outputPath: "works/anything/index.html",
      metaTitle: "Anything",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/anything/index.html",
      metaTitle: "Anything - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO",
      focusNote: "This is the design-oriented version of the same shared project content."
    },
    swe: {
      outputPath: "swe/classic/anything/index.html",
      metaTitle: "Anything - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO",
      focusNote: "This is the software-engineering-oriented version of the same shared project content."
    }
  }
};
