// content/projects/morphingskin.js developed by Bob Tianqi Wei
module.exports = {
  slug: "morphingskin",
  content: {
    title: "MorphingSkin",
    description: "A soft, skin-like interface platform integrating multimodal hydraulic actuation for future wearables and robotics.",
    hero: {
      headline: "A soft, skin-like interface that changes shape, weight, light, and force for future wearables and robotics.",
      metaLines: [
        "Soft Robotics · Multimodal Interaction · Material Design",
        "Morphing Matter Lab",
        "2024-2025"
      ],
      video: {
        youtubeId: "p1xUDjtR8d4",
        title: "MorphingSkin UIST2025 video figure",
        caption: "Video"
      }
    },
    sections: [
      {
        title: "Publications",
        bodyHtml: "<p><a href=\"https://dl.acm.org/doi/10.1145/3746059.3747685\" target=\"_blank\" class=\"link-in-paragraph\"><strong>MorphingSkin: A skin-like platform that integrates multimodal hydraulic actuators based on flexible electroosmotic pumps</strong></a><br>Tianyu Yu, Peisheng He, Bob Tianqi Wei, Chenyuheng Wang, Xueqing Li, Xuezhu Wang, Yao Lu, Wei Yue, Megan Teng, Zihan Wang, Liwei Lin, Haipeng Mi, Qi Lu, Lining Yao<br>UIST 2025 <strong class=\"best-paper-award\">BEST PAPER AWARD</strong><br>https://doi.org/10.1145/3746059.3747685<br><a href=\"https://bobtianqiwei.github.io/website_files/PDF/other_papers/MprphingSkin.pdf\" target=\"_blank\" class=\"link-in-paragraph\">PDF</a></p><p><strong class=\"italic-bold-in-research-title\">ABSTRACT</strong><br>Interactive surfaces have garnered significant attention in Human-Computer Interaction, with fluid-driven actuators being a promising actuation technology due to their flexible form factors and multimodal interactivities. However, traditional fluid-driven systems typically rely on bulky and noisy electromechanical hardware, limiting their portability and practicality. In this work, we present MorphingSkin, a skin-like platform that integrates multiple, multimodal hydraulic actuators using flexible EOPs as lightweight and self-contained fluidic actuators. We introduce the architecture of MorphingSkin and its versatile design space for multimodal actuation in force, shape, and optical domains, and demonstrate interactive and robotic applications that integrate multiple actuators working collectively within a single MorphingSkin device.</p>",
        figure: {
          src: "/images/Figure-1.jpg",
          caption: "MorphingSkin is a soft, skin-like interface that changes shape, weight, light, and force for future wearables and robotics."
        }
      },
      {
        title: "How MorphingSkin Is Built",
        bodyHtml: "<p>Most wearable interfaces and robots are rigid and limited in expression. We explored how a soft, fluidic surface could expand interactive possibilities.</p>",
        blocks: [
          {
            title: "Key Components",
            bodyHtml: "<p><strong>EOP Layer (Center)</strong>: The engine. This layer pumps fluid when electricity is applied.<br><strong>Output Layer (Pink)</strong>: Where the visible action happens; this layer inflates, moves, or changes shape.<br><strong>Reservoir Layer (Blue)</strong>: Stores extra fluid for use when needed.<br><strong>Connection Layer</strong>: Channels that guide fluid between layers.<br><strong>Working Fluid Path</strong>: Fluid moves between layers to create actuation.<br>All layers are soft and stretchable, allowing the whole system to bend and conform to surfaces.</p>",
            figure: {
              src: "/images/structure-composition.png"
            }
          },
          {
            title: "Fluid Flow Configurations",
            bodyHtml: "<p>We designed three layout styles for how fluid can move between the layers: <strong>Collinear</strong>, where layers are stacked; <strong>Coplanar-Front</strong>, where output and reservoir are on the same side; and <strong>Coplanar-Rear</strong>, where the output layer can be placed more freely for design flexibility.</p>"
          }
        ]
      },
      {
        title: "Design Space",
        bodyHtml: "<p>MorphingSkin can create different types of physical effects, all using fluid inside soft layers. We designed and tested actuation in force, shape, optics, and weight domains.</p>",
        blocks: [
          {
            title: "Multimodal Actuation",
            bodyHtml: "<p><strong>Force</strong>: extrusion and suction. <strong>Shape</strong>: kinematic motion and kirigami surface change. <strong>Optics</strong>: reflection and refraction. <strong>Weight</strong>: internal fluid transfer that shifts balance.</p>",
            figure: {
              src: "/images/Multimodal-Interaction-Design-Space.jpg"
            }
          },
          {
            title: "Adaptive Robot Gripper Skin",
            bodyHtml: "<p>We used MorphingSkin to cover the inside of a robot gripper's fingers. Each finger contains four soft actuators that can inflate, deflate, or stay neutral, enabling soft contact for fragile items, suction for hard-to-grip objects, and hard contact for heavier items.</p>",
            figure: {
              src: "/images/application-gripper.jpg"
            }
          },
          {
            title: "Desktop Companion Robot",
            bodyHtml: "<p>We built a small desktop robot using MorphingSkin as its soft outer shell. Soft actuators around its body let the robot show emotions through motion, including calm breathing, frightened shrinking, playful rolling, and mischievous object interaction.</p>",
            figure: {
              src: "/images/application-robots.jpg"
            }
          },
          {
            title: "Multimodal Wearable Wristband",
            bodyHtml: "<p>We designed a soft, flexible wristband that combines haptic feedback, visual feedback, and sensors in one device. It supports scenarios such as yoga, meditation, and cycling through patterned pressure, fluid-based displays, and embedded sensing.</p>",
            figure: {
              src: "/images/application-glove.jpg"
            }
          },
          {
            title: "Interactive Magic Page for Educational Books",
            bodyHtml: "<p>We created a flexible, animated page insert for anatomy books using MorphingSkin. It brings static diagrams to life with movement and light effects, helping users learn through touch and motion.</p>",
            figure: {
              src: "/images/application-book.jpg"
            }
          },
          {
            title: "Dynamic Lampshade with Light-Shaping Skin",
            bodyHtml: "<p>We designed a soft, responsive lampshade that wraps around a light source and uses inflatable lenses to control how light moves and looks, including projection, diffuser animation, and kirigami texture effects.</p>",
            figure: {
              src: "/images/application-lamp.jpg"
            }
          }
        ]
      },
      {
        title: "Fabrication, Implementation & Technical Evaluation",
        blocks: [
          {
            title: "Fabrication",
            bodyHtml: "<p>We fabricated flexible EOP circuits, elastic shells, and bonded multi-layer assemblies to create MorphingSkin devices that remain stretchable and self-contained.</p><div class=\"_3-columns w-row\"><div class=\"w-col w-col-4\"><img src=\"/images/fab1.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">(a-c) Assembling the flexible EOP circuit. (d) Cross-section photography of the coated EOP layer. (e) Cross-section illustration of a single layer of EOP electrode.</p><img src=\"/images/fab2.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">Coating the EOP layer with (a-f) silicone material and (g-i) VHB tape.</p></div><div class=\"w-col w-col-4\"><img src=\"/images/fab3.1.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">Design and fabrication of the elastic shells.</p><img src=\"/images/fab3.2.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">Bonding of the elastic shells.</p></div><div class=\"w-col w-col-4\"><img src=\"/images/fab4.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">Design and fabrication of the elastic shells.</p><p class=\"big-title-3\"><strong>Driving hardware system</strong></p><img src=\"/images/hardware.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">Driving hardware system that contains 16 programmable output ports with pre-set output voltages ranging from 150V to 250V, enabling untethered operation of MorphingSkin devices.</p></div></div>"
          },
          {
            title: "Technical Evaluation",
            bodyHtml: "<p>We evaluated open flow rate, blocked pressure, power consumption, heat generation, durability, and stretchability across representative MorphingSkin devices.</p><div class=\"_3-columns w-row\"><div class=\"w-col w-col-4\"><img src=\"/images/technical-evaluation-1.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">The open flow rate and the blocked pressure of the EOP device.</p></div><div class=\"w-col w-col-4\"><img src=\"/images/technical-evaluation-2.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">The power consumption, heat generation, and durability of a typical and simple MorphingSkin test device.</p></div><div class=\"w-col w-col-4\"><img src=\"/images/technical-evaluation-3.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"><p class=\"image-description\">The stretchability and the failure test of a typical MorphingSkin test device.</p></div></div><div class=\"_2-columns w-row\"><div class=\"w-col w-col-6\"><img src=\"/images/morphingskin-group-pic.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"></div><div class=\"w-col w-col-6\"><img src=\"/images/MorphingSkin-Award.jpg\" loading=\"lazy\" alt=\"\" class=\"image-100\"></div></div>"
          }
        ]
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/morphingskin/index.html",
      metaTitle: "MorphingSkin",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    }
  }
};
