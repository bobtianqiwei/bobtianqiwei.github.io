// content/projects/illuminatio.js developed by Bob Tianqi Wei
module.exports = {
  slug: "illuminatio",
  content: {
    title: "ILLUMINATIO",
    description: "An AI-driven adaptive lighting prototype that combines biologically informed design, computer vision, and user modeling for responsive desktop illumination.",
    hero: {
      headline: "A biologically informed illumination device that learns from everyday lighting adjustments and adapts to work, reading, and rest.",
      metaLines: [
        "Bob Tianqi Wei, Shm Almeda, Zhendong Xiao, Lintao Tang",
        "UC Berkeley, Tsinghua University",
        "2022-2024"
      ],
      image: "/images/Illuminating-Product.jpg"
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>ILLUMINATIO began from a mismatch between what smart lighting systems usually do and what people actually need. Most consumer products rely on timers, simple sensor triggers, or manually saved scenes. This project instead asks what happens if a lighting device pays attention to biological rhythms, task context, and the user's own adjustment behavior.</p><p>The result is a desk-scale adaptive lighting prototype that combines computer vision, mechanical repositioning, and a lightweight learning model. Rather than forcing users to adapt to rigid presets, ILLUMINATIO tries to align with how they already work, read, rest, and transition through the day.</p><p><a href=\"/works/illuminatio-full-text/\" class=\"link-in-paragraph\"><strong>Full research text</strong></a><br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ILLUMINATIO/Illuminating%20Product%20-%20Tianqi%20(Bob)%20Wei.pdf\" target=\"_blank\" class=\"link-in-paragraph\">Original project PDF</a></p>"
      },
      {
        title: "Why It Is Interesting",
        figure: {
          src: "/images/ILLUMINATIO_bg.png",
          caption: "Biological and environmental lighting considerations that informed the system concept."
        },
        bodyHtml: "<p>The interesting part of ILLUMINATIO is not just that it is a smart lamp. It treats illumination as an adaptive environmental system shaped by circadian rhythm, mood, and work mode rather than as a decorative accessory. That moves the project away from generic home automation and toward a more situated form of responsive computing.</p><p>It is also a good example of how embodied product design and machine learning can meet in a modest physical object. The lamp has to sense, predict, move, and illuminate in ways that feel calm and useful instead of overly automated. That balance between intelligence and agency is the real design problem.</p>"
      },
      {
        title: "Daily Use Scenarios",
        bodyHtml: "<p>ILLUMINATIO was framed around transitions across a typical day. In the morning, it provides brighter and cooler light for focused work. When the user switches from screen-based work to reading, it recognizes the changed setup and redirects the projection. Later in the day, it shifts toward warmer and dimmer conditions to support rest.</p><p>These scenarios matter because adaptive lighting is only meaningful if it can handle the real texture of daily activity. The system is designed around transitions, not isolated presets.</p>",
        images: [
          "/images/usage1.png",
          "/images/usage2.png",
          "/images/usage3.png",
          "/images/usage4.png"
        ]
      },
      {
        title: "Prototype Development",
        blocks: [
          {
            title: "Mechanical and Industrial Design",
            bodyHtml: "<p>The prototype combines a Raspberry Pi 4, LEDs for task and ambient lighting, a camera, a light engine, and a four-servo mechanism that repositions the lamp. Drawings were developed in AutoCAD, while the form and structural integration were explored in Rhino. The final object balances a clean sculptural profile with practical routing for hardware and wiring.</p>",
            figures: [
              {
                src: "/images/Screenshot-2024-12-04-at-20.31.30.png",
                caption: "CAD planning and the functional hardware prototype."
              },
              {
                src: "/images/Screenshot-2024-12-04-at-20.27.56.png",
                caption: "Modeling, printing, and assembling the physical prototype."
              }
            ]
          },
          {
            title: "Form Exploration",
            bodyHtml: "<p>The physical design aimed to make the device feel architectural rather than gadget-like. Sketches and renders explored a square-to-circular transition, open structural supports, and a geometry that could house technical components while still feeling minimal and expressive.</p>",
            images: [
              "/images/sketches.png",
              "/images/Lighting-Robot-Render-67.jpg"
            ]
          }
        ]
      },
      {
        title: "Responsive Intelligence",
        blocks: [
          {
            title: "Vision-Guided Focus Mode",
            figure: {
              src: "/images/Screenshot-2024-12-04-at-20.28.12.png",
              caption: "Focus mode uses computer vision to detect reading material and redirect the light projection."
            },
            bodyHtml: "<p>OpenCV was used to analyze the desktop scene and identify objects such as books and screens. That information allowed the light source to change projection angle and lighting characteristics depending on what the user was doing. The point was not object recognition for its own sake, but using visual context to make illumination feel more attentive and less generic.</p>"
          },
          {
            title: "Learning Personal Preferences",
            bodyHtml: "<p>The learning layer uses a K-Nearest Neighbor model to infer preferred illuminance and direction from user adjustments over time. Even with a modest training history, the prediction error dropped quickly enough that the device could begin supporting the user's habits rather than simply reacting after every manual change.</p>",
            images: [
              "/images/Screenshot-2024-12-04-at-20.28.25.png",
              "/images/calculation.png"
            ]
          }
        ]
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"/works/illuminatio-full-text/\" class=\"link-in-paragraph\">Full research text</a><br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ILLUMINATIO/Illuminating%20Product%20-%20Tianqi%20(Bob)%20Wei.pdf\" target=\"_blank\" class=\"link-in-paragraph\">Original project PDF</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/illuminatio/index.html",
      metaTitle: "ILLUMINATIO",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/illuminatio/index.html",
      metaTitle: "ILLUMINATIO - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/illuminatio/index.html",
      metaTitle: "ILLUMINATIO - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
