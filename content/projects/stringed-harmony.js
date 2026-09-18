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
        bodyHtml: "<p>Stringed Harmony is a wearable electronic instrument that transforms bodily movement into live musical expression. Conductive rubber sensors worn on the body capture stretching and deformation, while an Arduino and Max/MSP translate these signals into changing pitch, harmony, dynamics, and timbre.</p>"
      },
      {
        title: "Performances",
        bodyHtml: `<p>Across four performances, musical agency shifts from the self, to another body, to the tension between bodies, and finally to the surrounding environment.</p>
        <p><em>Where does musical expression begin: in the instrument, the body, the relationship between bodies, or the environment?</em></p>`,
        blocks: [
          {
            title: "0. Body as Instrument",
            videoFirst: true,
            video: {
              src: "https://www.youtube.com/embed/uWRTUTg2k2o?si=GeUme4ZCI9g9pcHc",
              title: "0. Body as Instrument"
            },
            bodyHtml: `<p><em>Improvisation at CNMAT, UC Berkeley</em></p><p>I use my own body as the instrument, with stretching and movement continuously reshaping the sound. An eight-channel spatial audio setup extends these gestures into the surrounding acoustic space.</p>`
          },
          {
            title: "1. Body as Choreography",
            videoFirst: true,
            video: {
              src: "https://www.youtube.com/embed/T34LZY9zvQQ?si=FkoaF9xz1uA7mKtp",
              title: "1. Body as Choreography"
            },
            bodyHtml: `<p><em>Performance with Yanru Qian</em></p><p>In collaboration with dancer Yanru Qian, movement becomes both choreography and musical composition. Instead of dancing to a predetermined soundtrack, her gestures generate and transform the music: music → dance becomes dance → music.</p>`
          },
          {
            title: "2. Tension Between Bodies",
            videoFirst: true,
            video: {
              src: "https://www.youtube.com/embed/v0HVmx4NcQw?si=sP9sHc2T0istgXc4",
              title: "2. Tension Between Bodies"
            },
            bodyHtml: `<p><em>Inspired by Marina Abramović and Ulay&#x27;s Rest Energy (1980)</em></p><p>This performance replaces the bow and arrow with the conductive rubber instrument. Physical tension between two bodies becomes sonic tension, making an otherwise invisible force audible.</p>`
          },
          {
            title: "3. Beyond the Human Body",
            videoFirst: true,
            video: {
              src: "https://www.youtube.com/embed/meEh3Ejt1-Y?si=CHS8vnm9F-y2uhdN",
              title: "3. Beyond the Human Body"
            },
            bodyHtml: `<p><em>Wind and Tree Experiment</em></p><p>In this experiment, the instrument is attached to a tree rather than a human performer. Wind moves the branches, stretching the sensors and generating sound. Musical agency becomes distributed across the tree, wind, sensor, and computational system.</p>`
          }
        ]
      },
      {
        title: "Embodied Interaction",
        bodyHtml: "<p>Stringed Harmony treats the body itself as a musical interface, allowing posture, tension, and movement to shape sound in real time.</p><p>Because the performer can feel each movement and immediately hear its musical consequence, playing creates a continuous loop between bodily perception, action, and sound. The instrument becomes an extension of movement.</p>"
      },
      {
        title: "System",
        bodyHtml: `<div class="stringed-system" aria-label="System flow from body movement through sensing and software to musical sound">
          <div class="stringed-system-node"><strong>Body Movement</strong><span>stretch, posture, tension</span></div>
          <span class="stringed-system-arrow" aria-hidden="true">→</span>
          <div class="stringed-system-node"><strong>Conductive Rubber Sensors</strong><span>changing electrical resistance</span></div>
          <span class="stringed-system-arrow" aria-hidden="true">→</span>
          <div class="stringed-system-node"><strong>Arduino MKR1000</strong><span>analog sensing + smoothing</span></div>
          <span class="stringed-system-arrow" aria-hidden="true">→</span>
          <div class="stringed-system-node"><strong>Serial Data</strong><span>continuous sensor values</span></div>
          <span class="stringed-system-arrow" aria-hidden="true">→</span>
          <div class="stringed-system-node"><strong>Max/MSP</strong><span>mapping and synthesis</span></div>
          <span class="stringed-system-arrow" aria-hidden="true">→</span>
          <div class="stringed-system-node"><strong>Musical Mapping &amp; Sound</strong><span>pitch, harmony, dynamics, envelope</span></div>
        </div>`
      },
      {
        title: "Technical Details",
        bodyHtml: `<p><strong>Sensing:</strong> Four wearable conductive rubber sensors<br>
          <strong>Microcontroller:</strong> Arduino MKR1000<br>
          <strong>Signal Processing:</strong> Moving-average smoothing of analog sensor readings<br>
          <strong>Communication:</strong> Serial communication at 9600 baud<br>
          <strong>Software:</strong> Max/MSP<br>
          <strong>Audio Output:</strong> Eight-channel spatial audio for the CNMAT performance</p>
        <p><strong>Implementation note:</strong> The Arduino firmware supports up to five analog channels and applies a 50-sample moving average, with updated values streamed approximately every 20 ms.</p>`,
        figure: {
          src: "/images/stringed-harmony-max-patch.png",
          caption: "Original Max/MSP patch used for sensor calibration, musical mapping, and real-time sound generation.",
          href: "/images/stringed-harmony-max-patch.png"
        }
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
