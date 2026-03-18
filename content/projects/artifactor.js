// content/projects/artifactor.js developed by Bob Tianqi Wei
module.exports = {
  slug: "artifactor",
  content: {
    title: "ArtiFactor",
    description: "An infinite-canvas creativity tool that uses multimodal AI and art history references as traceable creative materials.",
    hero: {
      headline: "AI as a creative medium for material interactions with art history.",
      metaLines: [
        "Creativity Support Tool",
        "UC Berkeley",
        "Shm Almeda, Bob Tianqi Wei, Ethan Tam, Sophia Liu, Bjoern Hartmann",
        "2024-2025"
      ],
      image: "/images/artifactor-cover.png"
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>ArtiFactor is a creativity support tool that treats multimodal AI as a material for thinking with art history, rather than just a black-box image generator. On an infinite canvas, users work with artifacts such as text prompts, generated images, retrieved artworks, and historical background, then reuse them as evolving materials in a creative process.</p><p>The system records derivations between artifacts so users can see how ideas evolve and how historical references shape final concepts. Instead of hiding process behind prompts, ArtiFactor makes creative lineage visible and shareable.</p>"
      },
      {
        title: "Motivation",
        bodyHtml: "<p>Text-to-image and vision-language models have changed how people create and discover media, but most interfaces still center around opaque prompting or chatting. That makes AI feel powerful yet shallow: users get impressive outputs, but little sense of where styles come from, how they relate to art history, or how to communicate process with collaborators.</p><p>ArtiFactor explores a different approach by turning artworks, texts, and generated outputs into traceable, recombinable materials for creative work.</p>"
      },
      {
        title: "Interaction Design",
        figure: "/images/uist25_teaser.jpg",
        bodyHtml: "<p>ArtiFactor presents an infinite canvas populated with multimodal artifacts: user-authored text, generated images, retrieved artworks, and lookup panels with historical context. Users can create and gather materials, explore related artworks, merge multiple artifacts into new concepts, and trace the lineage of each result through visible connections.</p><p>This interaction model shifts the focus from prompt hacking to building a visible, shareable history of ideas grounded in specific works and contexts.</p>"
      },
      {
        title: "Technical Implementation",
        bodyHtml: "<p><strong>Frontend:</strong> TypeScript, React, Vite, and Tailwind CSS, with custom node types for text, image, and synthesizer artifacts.</p><p><strong>Backend and knowledge server:</strong> Node-based services connected to a curated art history database for visual and semantic lookup.</p><p><strong>Multimodal AI pipeline:</strong> image generation, image description, and feature-embedding-based retrieval of visually similar historical works.</p><p><strong>Provenance tracking:</strong> each generation, lookup, and merge creates a new artifact and an edge to its parent, making process legible on the canvas.</p>"
      },
      {
        title: "Scenario and Impact",
        bodyHtml: "<p>In one pilot scenario, a writer and illustrator use ArtiFactor to build a graphic novel world about heroic mouse soldiers. The system generates concept images, retrieves related historical works, and surfaces background context that can be dragged onto the canvas as reusable material. By combining and reusing these artifacts, the team develops a more consistent and distinctive visual language than they would through isolated prompting.</p><p>Early feedback suggests that this workflow helps people move beyond generic AI-style outputs and engage more deeply with historical references and visual storytelling.</p>"
      },
      {
        title: "Publication and Links",
        bodyHtml: "<p><strong>Demonstration of ArtiFactor: AI as a Creative Medium for Material Interactions with Art History</strong><br>Shm Almeda, Bob Tianqi Wei, Ethan Tam, Sophia Liu, Bjoern Hartmann<br>In progress</p><p><a href=\"https://github.com/s-almeda/ArtiFactor\" target=\"_blank\" class=\"link-in-paragraph\">Source Code</a><br><a href=\"https://arti-factor.vercel.app/\" target=\"_blank\" class=\"link-in-paragraph\">Live Demo</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/artifactor/index.html",
      metaTitle: "ArtiFactor",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/artifactor/index.html",
      metaTitle: "ArtiFactor - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/artifactor/index.html",
      metaTitle: "ArtiFactor - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
