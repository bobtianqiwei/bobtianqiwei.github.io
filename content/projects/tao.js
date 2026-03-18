// content/projects/tao.js developed by Bob Tianqi Wei
module.exports = {
  slug: "tao",
  content: {
    title: "Tao",
    description: "A Flutter puzzle game that combines Chinese philosophy, minimalist interface design, and multiple autoplay strategies.",
    hero: {
      headline: "A minimalist puzzle game that merges five-element characters into Dao through grid logic, adaptive UI, and multiple AI play modes.",
      metaLines: [
        "Bob Tianqi Wei",
        "Flutter, Dart, Provider",
        "June 2025"
      ],
      image: "/images/Tao-beta-2.png"
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>Tao is a minimalist puzzle game inspired by 2048. Instead of numbered tiles, the game uses Chinese characters based on the five elements and their progression, eventually synthesizing into <em>道</em>. The project combines game logic, multilingual interface concerns, and a deliberately restrained visual system.</p><p>As a software project, Tao explores how a small interaction design can still support multiple layers of engineering work: game-state management, adaptive layout, animation, cross-platform deployment, and multiple autoplay strategies.</p>"
      },
      {
        title: "Interaction and Interface",
        bodyHtml: "<p>The interface is intentionally minimal: black and white presentation, a typography-forward visual identity, and a grid-centered layout that keeps attention on the board state. The game supports multiple board sizes, keyboard play, theme switching, and bilingual presentation in English and Chinese.</p><p>This visual restraint is part of the engineering story, not separate from it. The system has to preserve legibility and interaction clarity while scaling from compact boards to large ones and while rendering complex character transitions cleanly across platforms.</p>"
      },
      {
        title: "Game Logic and AI Modes",
        bodyHtml: "<p>The core mechanics handle tile spawning, directional movement, merging rules, score updates, win detection, and restart logic. On top of that, Tao includes several autoplay strategies, ranging from random play to multiple heuristic and model-inspired policies such as corner, snake, greedy, conservative, and advanced modes.</p><p>These autoplay modes turn the project from a simple puzzle clone into a small experimentation environment. They make it possible to compare strategies, inspect behavior, and treat the game as a space for lightweight AI-assisted interaction rather than only manual play.</p>"
      },
      {
        title: "Technical Implementation",
        bodyHtml: "<p>The project is built with Flutter and Dart, using the Provider pattern for central game-state management. The codebase is organized around a small set of responsibilities: tile and character models, a game provider for movement and scoring logic, a main game screen, and reusable board and tile widgets.</p><p>That architecture keeps rendering, state changes, and interaction handling relatively clean while still supporting animation, responsive scaling, theme handling, and cross-platform deployment. In practical terms, Tao demonstrates careful frontend engineering in Flutter rather than backend integration work.</p>"
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"https://github.com/bobtianqiwei/Tao\" target=\"_blank\" class=\"link-in-paragraph\">GitHub repository</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/tao/index.html",
      metaTitle: "Tao",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/tao/index.html",
      metaTitle: "Tao - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/tao/index.html",
      metaTitle: "Tao - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
