// content/projects/water-synthesizer.js developed by Bob Tianqi Wei
module.exports = {
  slug: "water-synthesizer",
  content: {
    title: "Water Synthesizer",
    description: "A musical installation where water movement reshapes sound in real time through sensors, a microcontroller, and a digital synthesizer pipeline.",
    hero: {
      headline: "A musical installation that turns water movement into live sound modulation.",
      metaLines: [
        "Musical Installation",
        "Group work (academic)",
        "Tianqi (Bob) Wei, Junjie Li, Kanchan Pathak",
        "Tutor: Jeffrey Lubow, Thomas McLeish, Sudhu Tewari, Shm Almeda",
        "2023"
      ],
      video: {
        src: "https://www.youtube.com/embed/uKELzy_5S88?si=F1zaUExyEzjK2R-c",
        title: "Water Synthesizer demo",
        caption: "Demo"
      }
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>Water Synthesizer is a musical device consisting of a water tank fitted with sensors, microcontroller, computer, and MIDI keyboard. When performers interact with the water while playing music, wave data is used to process the sound and adjust synthesizer parameters in real time, creating expressive changes in timbre and behavior.</p><p>The water tank was made using laser-cut acrylic sheets. The microcontroller was a Particle Photon P2, and the sensing setup used four photoresistors and an ultrasonic distance sensor. The program that processes the MIDI signals was written with p5.js.</p>"
      },
      {
        title: "Gallery",
        slides: [
          "/images/IMG_1826.JPG",
          "/images/water-synth.jpg",
          "/images/IMG_6436.jpg",
          "/images/IMG_6359.jpg",
          "/images/257938840caba5cf8301f21f55847abd-2_1.jpg"
        ]
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/water-synthesizer/index.html",
      metaTitle: "Water Synthesizer",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/water-synthesizer/index.html",
      metaTitle: "Water Synthesizer - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/water-synthesizer/index.html",
      metaTitle: "Water Synthesizer - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
