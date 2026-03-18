// content/projects/terminal-zen.js developed by Bob Tianqi Wei
module.exports = {
  slug: "terminal-zen",
  content: {
    title: "Terminal Zen",
    description: "A zero-dependency terminal breathing guide that disguises rest as code and brings mindfulness into the command-line environment.",
    hero: {
      headline: "A terminal-based breathing guide that looks like just another script running, but quietly turns the coding environment into a place for pause.",
      metaLines: [
        "Bob Tianqi Wei",
        "Python, CLI design, zero-dependency tooling",
        "July 2025"
      ],
      image: "/images/terminal-zen-cover.png"
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>Terminal Zen began from a simple but sharp observation: software work often happens in the terminal for hours at a time, and that environment rarely offers any humane interruption. Instead of building another productivity tool, this project inserts a tiny moment of breathing and attention directly into the command line.</p><p>The result is a meditation guide that disguises itself as code. It looks familiar enough to belong in the terminal, but its real purpose is to make rest feel local to the place where exhaustion actually happens.</p>"
      },
      {
        title: "What Makes It Interesting",
        bodyHtml: "<p>The most interesting part of Terminal Zen is conceptual as much as technical. It does not fight the terminal by trying to escape it with a separate graphical interface. Instead, it accepts the terminal's visual language and repurposes it: progress bars become breathing cues, script output becomes a ritual structure, and command-line execution becomes a way to pause rather than accelerate.</p><p>That makes the project more than a utility script. It is a small intervention into work culture, one that treats the command line not only as a site of production but also as a site where care, slowness, and reflection can be designed.</p>"
      },
      {
        title: "Interaction Design",
        bodyHtml: "<p>The interaction is intentionally spare. Users can launch an interactive mode with preset sessions or specify custom breathing durations directly from the command line. During a session, ASCII progress bars fill and empty to represent inhale, hold, exhale, and pause phases, preserving the native aesthetics of terminal output while still giving clear embodied guidance.</p><p>The project also supports graceful exits, configurable timing, and completion messages drawn from philosophical traditions. These choices keep the experience lightweight while still making it feel intentional rather than novelty-driven.</p>",
        figure: {
          src: "/images/terminal-zen-cover.png",
          caption: "Terminal Zen uses ASCII progress bars and a command-line interface to turn terminal output into a guided breathing rhythm."
        }
      },
      {
        title: "Engineering Approach",
        bodyHtml: "<p>From a software engineering perspective, Terminal Zen is notable for how much it does with very little. It is implemented in Python with no external runtime dependencies, packaged as an installable command-line tool, and designed to work across macOS, Linux, and Windows. The code handles interactive mode selection, configurable breathing cycles, signal-based interruption, non-blocking key detection, and timing-sensitive progress updates inside a plain terminal session.</p><p>This minimalism is part of the engineering quality. The project avoids unnecessary infrastructure and instead focuses on reliability, portability, and fit with its environment. That restraint is what makes the concept land so cleanly.</p>"
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"https://github.com/bobtianqiwei/terminal-zen\" target=\"_blank\" class=\"link-in-paragraph\">GitHub repository</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/terminal-zen/index.html",
      metaTitle: "Terminal Zen",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/terminal-zen/index.html",
      metaTitle: "Terminal Zen - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/terminal-zen/index.html",
      metaTitle: "Terminal Zen - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
