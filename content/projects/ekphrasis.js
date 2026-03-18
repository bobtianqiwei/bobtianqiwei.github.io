// content/projects/ekphrasis.js developed by Bob Tianqi Wei
module.exports = {
  slug: "ekphrasis",
  content: {
    title: "EKPHRASIS",
    description: "An interactive educational system that helps students understand graphic design language through AI-generated visual aids.",
    hero: {
      headline: "An AI-assisted learning system for making abstract graphic design terminology more concrete, visual, and teachable.",
      metaLines: [
        "Bob Tianqi Wei and Shayne Shen, Shm Almeda, Bjoern Hartmann",
        "UC Berkeley",
        "2024"
      ],
      image: {
        src: "/images/teaser.png"
      }
    },
    sections: [
      {
        title: "Publications",
        video: {
          youtubeId: "z9hrltHGZ-E",
          title: "EKPHRASIS LBW video",
          caption: "Video"
        },
        bodyHtml: "<p><a href=\"https://dl.acm.org/doi/10.1145/3706599.3719807\" target=\"_blank\" class=\"link-in-paragraph\"><strong>Generating Visual Aids to Help Students Understand Graphic Design with EKPHRASIS</strong></a><br>Bob Tianqi Wei and Shayne Shen, Shm Almeda, Bjoern Hartmann<br>CHI 2025<br>https://doi.org/10.1145/3706599.3719807<br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ekphrasis/chiea25-326.pdf\" target=\"_blank\" class=\"link-in-paragraph\">PDF</a></p><p><strong class=\"italic-bold-in-research-title\">ABSTRACT</strong><br>Graphic design relies on complex language that creates significant barriers in design education, especially for students from non-design backgrounds or those with language barriers. Our interview with 11 design educators and professional designers confirmed that this specialized language, characterized by jargon, ambiguous terminology, and underspecified words, operates within insular communities, making it challenging for learners to decode and internalize its meaning. To address this challenge, we developed EKPHRASIS, an interactive educational system powered by a machine-learning model that provides real-time and actionable visual aids to support students' subjective understanding of design language. Preliminary user testing with novice participants suggests that EKPHRASIS enhances intuitive, multi-modal learning and teaching in graphic design. Through EKPHRASIS, we explore the potential for AI technologies to democratize design pedagogy with real-time, context-aware multi-modal learning support.</p>"
      },
      {
        title: "Presentation Slides",
        bodyHtml: "<p><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ekphrasis/ekphrasis_wei_shen.pdf\" target=\"_blank\" class=\"link-in-paragraph\">EKPHRASIS: Demystify Abstract Terminologies in Graphic Design Through Human-AI Co-Practice</a></p>"
      },
      {
        title: "Source Code (interface + ML model), Dataset",
        bodyHtml: "<p><a href=\"https://github.com/bobtianqiwei/EKPHRASIS\" target=\"_blank\" class=\"link-in-paragraph\">github.com/bobtianqiwei/EKPHRASIS</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/ekphrasis/index.html",
      metaTitle: "EKPHRASIS",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    }
  }
};
