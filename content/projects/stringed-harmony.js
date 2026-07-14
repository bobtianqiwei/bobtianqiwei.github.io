// content/projects/stringed-harmony.js developed by Bob Tianqi Wei
module.exports = {
  slug: "stringed-harmony",
  content: {
    title: "Stringed Harmony",
    description: "An electronic instrument design and performance project combining wearable conductive rubber sensors, microcontrollers, Max MSP, movement, and live musical expression.",
    hero: {
      headline: "An electronic instrument design and performance project built around wearable conductive sensors and live musical interaction.",
      metaLines: [
        "Bob Tianqi Wei",
        "Individual Project",
        'Advisor: <a href="https://www.andrewblanton.com/" target="_blank" class="link-in-paragraph">Andrew Blanton</a>',
        "UC Berkeley",
        "2024"
      ]
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p class=\"paragraph-light\">Stringed Harmony is an innovative electronic instrument design and performance project, utilize wearable conductive rubber sensors connected to a microcontroller to generate music. The project is programmed using Max MSP, allowing for a seamless integration of sound and movement.<br><br>Performances 0-3 include the artist&#x27;s original musical performance, dance by a friend, a tribute to Marina Abramovic, and the interaction between electronic music and nature.<br><br>Currently, we are collaborating with a theater group in New York to create an engaging musical theater production that further explores the boundaries of this unique artistic expression.</p>"
      },
      {
        title: "Performances",
        videos: [
          "https://www.youtube.com/embed/uWRTUTg2k2o?si=GeUme4ZCI9g9pcHc",
          "https://www.youtube.com/embed/T34LZY9zvQQ?si=FkoaF9xz1uA7mKtp",
          "https://www.youtube.com/embed/v0HVmx4NcQw?si=sP9sHc2T0istgXc4",
          "https://www.youtube.com/embed/meEh3Ejt1-Y?si=CHS8vnm9F-y2uhdN"
        ]
      },
      {
        title: "Gallery",
        slides: [
          "/images/stringed-harmony-1-2.jpg",
          "/images/stringed-harmony-1-1.jpg",
          "/images/stringed-harmony-2-1.jpg",
          "/images/stringed-harmony-2-2.jpg",
          "/images/stringed-harmony-2-5.jpg",
          "/images/stringed-harmony-2-6.jpg",
          "/images/stringed-harmony-2-3.jpg",
          "/images/stringed-harmony-2-4.jpg",
          "/images/stringed-harmony-2-7.jpg",
          "/images/stringed-harmony-2-8.jpg",
          "/images/stringed-harmony-3-1.jpg",
          "/images/stringed-harmony-3-2.jpg"
        ]
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/stringed-harmony/index.html",
      metaTitle: "Stringed Harmony",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/stringed-harmony/index.html",
      metaTitle: "Stringed Harmony - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    }
  }
};
