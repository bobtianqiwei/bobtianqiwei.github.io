// content/projects/illuminatio-full-text.js developed by Bob Tianqi Wei
module.exports = {
  slug: "illuminatio-full-text",
  content: {
    title: "ILLUMINATIO",
    description: "A full-text research page on biologically informed, AI-driven adaptive illumination devices.",
    hero: {
      headline: "Towards biologically informed, AI-driven adaptive environment control with a situated pervasive illumination device.",
      metaLines: [
        "Bob Tianqi Wei, Shm Almeda, Zhendong Xiao, Lintao Tang",
        "UC Berkeley, Tsinghua University",
        "2022-2024"
      ]
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p><a href=\"/works/illuminatio/\" class=\"link-in-paragraph\"><strong>--&gt; ILLUMINATIO</strong></a><br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ILLUMINATIO/Illuminating%20Product%20-%20Tianqi%20(Bob)%20Wei.pdf\" target=\"_blank\" class=\"link-in-paragraph\">--&gt; Intelligent Illuminating Product Design Based on Machine Learning (original version of ILLUMINATIO)</a></p><p>Environmental illumination plays a crucial role in human health and work efficiency, impacting mood and circadian rhythm. Advancements in computer vision and machine learning create new opportunities for designing adaptive pervasive computing devices situated in the home and workplace. In this work in progress, we apply literature on the human impact of lighting, identifying key design factors that we used to develop ILLUMINATIO: a pervasive computing artificial illumination device that utilizes live camera input and a biologically informed ML system to learn from user behaviors and autonomously adjust its lighting and projection configurations, offering the user engaged, yet adaptive control on the environment. The system centers alignment with users’ personalized habits while promoting key factors for wellbeing. Through this prototype, we explore the implications of designing for adaptive, situated, pervasive illumination devices with AI integrations, and consider the broader implications for smart home environments and ubiquitous computing lifestyles.</p>"
      },
      {
        title: "Introduction",
        bodyHtml: "<p>In smart homes, illumination significantly improves the convenience and comfort of family life. However, current smart home products are limited to basic functionalities, such as employing user-preset scenes and operating appliances based on sensor detection. AI, with its ability to dynamically adjust outcomes based on evolving data, holds considerable promise for surpassing the intelligence of current smart home automation.</p><p>Therefore, this project aims to explore an AI-driven adaptive illumination device to better support user health and productivity in a personalized manner. Following research into ubiquitous computing and illumination, we developed a prototype of ILLUMINATIO, utilizing AI-driven technology to adapt lighting to the user's circadian rhythm and meet the requirements of various scenarios.</p>"
      },
      {
        title: "Background & Related Work",
        bodyHtml: "<p><strong>Ubiquitous Computing / Smart Home</strong><br>There is a long history of HCI literature that merges digital interactions with physical environmental systems to improve user experiences in the home and workplace. These ideas motivate environmental control systems that are both intuitively adaptive and actively engageable, a promising application for AI-driven adaptive systems embedded into everyday objects like an artificial light source.</p><p><strong>Illumination</strong><br>Office productivity, mood, and circadian rhythm are all affected by illumination. A biologically informed artificial lighting system should adapt to the user’s circadian rhythm by supporting the processes that define the body’s active and rest phases, using both visual and non-visual light effects.</p><p><strong>Using AI-Driven Interactions for Responsive Devices</strong><br>Other ubiquitous computing products and prototypes have utilized AI and machine learning to drive more responsive and adaptable environmental interactions. This project leverages AI-driven, biologically informed adaptive interactions with environmental illumination, with a focus on dynamically adjusting the projection angle and lighting characteristics of a situated desktop artificial light source based on the user’s habits.</p>"
      },
      {
        title: "Usage Scenario",
        bodyHtml: "<p>Bob works from home. After over a month of use, ILLUMINATIO has learned his work habits and understands his circadian rhythm from the data recorded during his interactions with it, providing dynamically adjusted lighting throughout the day to enhance work efficiency and stabilize his biological clock.</p><p>In the morning, ILLUMINATIO captures the computer’s image and automatically provides bright, cool-toned lighting from an angle that avoids glare. During breaks it warms slightly to support relaxation; when Bob returns to work it shifts cooler again. When Bob places a book on the desk, ILLUMINATIO recognizes it and adjusts angle and color temperature to support reading. In the evening it gradually reduces brightness and warms color temperature to promote rest.</p>",
        images: [
          "/images/usage1.png",
          "/images/usage2.png",
          "/images/usage3.png",
          "/images/usage4.png"
        ]
      },
      {
        title: "Design Process",
        blocks: [
          {
            title: "Hardware Design of Intelligent Lighting Products",
            bodyHtml: "<p>We opted for a microcontroller to handle processing calculations and control the hardware. To cater to both desktop and ambient lighting needs, the ILLUMINATIO system incorporates two color LED lights, a camera for object recognition, a light engine for focus mode lighting, and four servo motors for multi-angle adjustment of the lamp arm.</p><p>To facilitate image capture and online calculation, we selected the Raspberry Pi 4 Model B. Four 30kg servos provide stable support and flexible rotation; additional hardware includes open-source LED modules and cameras, and the light engine is adapted from an existing mini projector. For ease of prototyping, we designed the drawings in AutoCAD and used laser cutting on 3mm aluminum plates to mount the hardware components and a 360-degree turntable for the base.</p>",
            figure: {
              src: "/images/Screenshot-2024-12-04-at-20.31.30.png"
            }
          },
          {
            title: "Form and Structure",
            bodyHtml: "<p>We modeled ILLUMINATIO with Rhino, focusing on advanced surfaces. The overall form is simple and elegant, with square tops and bottoms blending into a circular cross-section in the middle. The middle part of the lamp arm is hollowed out and supported by three dynamic G4 continuous curves, with wiring running through them and the microcontroller installed at the bottom.</p>",
            images: [
              "/images/sketches.png",
              "/images/Illuminating-Product.jpg"
            ]
          },
          {
            title: "Prototype Integration",
            figure: {
              src: "/images/Screenshot-2024-12-04-at-20.27.56.png"
            }
          }
        ]
      },
      {
        title: "Applying AI-Driven Technology for Responsive Design",
        blocks: [
          {
            title: "Focus Mode",
            bodyHtml: "<p>We used OpenCV for contour extraction from desktop images captured by the camera to identify the location of books and achieve accurate projection of the light source. Using an interface from Baidu and further processing the obtained information, a new image is created with a black background and the required color of light is drawn and output to the light engine.</p>",
            figure: {
              src: "/images/Screenshot-2024-12-04-at-20.28.12.png"
            }
          },
          {
            title: "Intelligent Illumination Adapted to User Work Habits and Needs",
            bodyHtml: "<p>To evaluate the algorithm, we created a partially synthetic dataset using data on the second author’s actual habits with a normal adjustable lamp. A K-Nearest Neighbor model forecasts both illuminance and direction. The training process emulates the device’s assimilation of user behavior patterns from streaming data, and the prediction error quickly diminished to a negligible level to the human eye after 16 rounds of updates.</p>",
            figures: [
              {
                src: "/images/Screenshot-2024-12-04-at-20.28.25.png"
              },
              {
                src: "/images/calculation.png"
              }
            ]
          }
        ]
      },
      {
        title: "Future Work",
        bodyHtml: "<p>Our future work will further explore how user behavior might be impacted by the presence of such adaptive, pervasive computing devices in their environment. As devices gradually learn users’ behavioral patterns, will they fade into invisibility as Weiser predicted, or will the messy unpredictability inherent to everyday life require users to remain engaged, continually taking intentional actions for devices to respond to and extend?</p>"
      },
      {
        title: "Conclusion",
        bodyHtml: "<p>In this project, we developed ILLUMINATIO and discovered the potential of AI-driven lighting systems in achieving adaptive environmental control based on biological information. By embedding an AI-driven learning system within an everyday object, we empower users with the choice to interact with the pervasive computing system and allow the device to learn their behavior patterns, exerting a positive, adaptive influence on life and wellbeing.</p><p><a href=\"/works/illuminatio/\" class=\"link-in-paragraph\"><strong>--&gt; ILLUMINATIO</strong></a><br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ILLUMINATIO/Illuminating%20Product%20-%20Tianqi%20(Bob)%20Wei.pdf\" target=\"_blank\" class=\"link-in-paragraph\">--&gt; Intelligent Illuminating Product Design Based on Machine Learning (original version of ILLUMINATIO)</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/illuminatio-full-text/index.html",
      metaTitle: "ILLUMINATIO Full Text",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    }
  }
};
