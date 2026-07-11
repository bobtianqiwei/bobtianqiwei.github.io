// content/projects/ekphrasis.js developed by Bob Tianqi Wei
module.exports = {
  slug: "ekphrasis",
  content: {
    title: "EKPHRASIS",
    description: "An AI-mediated learning system that helps students interpret abstract graphic design vocabulary through comparative visual feedback.",
    hero: {
      headline: "An AI-mediated design learning platform that makes tacit graphic design vocabulary concrete through comparative feedback and turn-taking interaction.",
      metaLines: [
        "Bob Tianqi Wei and Shayne Shen, Shm Almeda, Bjoern Hartmann",
        "UC Berkeley",
        "CHI 2025, full paper in progress"
      ],
      image: {
        src: "/images/teaser.png"
      }
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>EKPHRASIS is an AI-mediated learning system for graphic design education. It helps students interpret abstract critique terms such as <em>visual harmony</em>, <em>balance</em>, or <em>rhythm</em> by situating them in the learner's own composition and returning comparative visual feedback rather than only verbal explanation.</p><p>The central idea is that many design terms are hard to learn not because students have never heard them, but because they struggle to translate them into visible attributes and concrete next moves. EKPHRASIS addresses that gap by turning critique into an inspectable comparison between the learner's current design, a less aligned variation, and a more aligned variation.</p>"
      },
      {
        title: "Why This Problem Is Hard",
        bodyHtml: "<p>The new full-paper framing sharpens the research question behind EKPHRASIS: graphic design critique is often difficult for novices because its language is specialized, multiply interpretable, and underspecified until it is grounded in visual context.</p><p>Formative interviews with 11 graphic design educators and professionals surfaced three recurring barriers. <strong>Jargon</strong> makes critique feel insider-only, especially for learners from outside design or across language backgrounds. <strong>Ambiguity</strong> means a term like <em>contrast</em> may point to several different visual operations at once. <strong>Vagueness</strong> means words such as <em>harmony</em> can be recognizable in use while still resisting fixed rules.</p><p>These findings motivated EKPHRASIS as a system that makes design vocabulary inspectable rather than merely definable.</p>"
      },
      {
        title: "Two Learning Interactions",
        bodyHtml: "<p>EKPHRASIS explores two complementary interaction models for learning abstract design concepts: comparative visual feedback and turn-taking practice on a shared canvas.</p>",
        blocks: [
          {
            title: "Comparative Visual Feedback",
            bodyHtml: "<p>Learners create a composition and compare it with less aligned and more aligned variations generated around their own work. This makes abstract vocabulary inspectable through visible differences and supports reflection before revision.</p>",
            video: {
              youtubeId: "z9hrltHGZ-E",
              title: "EKPHRASIS LBW video",
              caption: "Video"
            }
          },
          {
            title: "Turn-Taking Practice: EKPHRASIS Chess",
            bodyHtml: "<p>EKPHRASIS Chess extends comparative feedback into an ongoing shared-canvas interaction. The learner and AI take turns adding blocks to the same composition while working with a selected target concept. In Help mode, the AI moves the composition toward the concept. In Oppose mode, it creates resistance while the learner continues trying to reach or maintain the target. In Random mode, it introduces an open-ended alternative. When the composition reaches a model-confidence threshold, the system pauses and asks the learner to inspect the result and explain whether they agree.</p>",
            video: {
              src: "https://www.youtube.com/embed/0tgsTTini3w?si=Fkp1sO06eVpoWSRY",
              title: "EKPHRASIS Chess video",
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            }
          }
        ]
      },
      {
        title: "System Overview",
        bodyHtml: "<p>The current system records the learner's composition, generates candidate variations by perturbing block positions and sizes, and uses a criterion-specific model to rank results into a comparative spectrum. The interface then presents the learner's original composition together with less aligned and more aligned examples.</p><p>The model is an enabling component inside the feedback loop, not the main contribution by itself. The research contribution lies in how comparative visual feedback can help learners connect abstract terminology to visible attributes, compositional differences, and actionable design decisions.</p>",
        figure: {
          src: "/images/ekphrasis-system.png",
          caption: "System overview from the current full-paper draft: user composition, generated variations, classifier-assisted ranking, and comparative feedback."
        }
      },
      {
        title: "Current Prototype",
        blocks: [
          {
            title: "Visual Aids",
            bodyHtml: "<p>Learners create a composition, request visual feedback, and inspect less aligned and more aligned examples around their own artifact. The interface keeps the learner's work in the middle and returns comparative examples rather than a single corrected answer, making the target term easier to inspect and debate.</p>",
            figure: {
              src: "/images/ekphrasis-visual-aids.png",
              caption: "Visual Aids mode: the learner's composition is contextualized by less aligned and more aligned examples for the target vocabulary."
            }
          },
          {
            title: "EKPHRASIS Chess",
            bodyHtml: "<p>The learner and AI take turns adding blocks to a shared composition while practicing a selected design concept through support, resistance, or open-ended variation.</p>",
            figure: {
              src: "/images/ekphrasis-chess.png",
              caption: "EKPHRASIS Chess supports turn-taking practice through Help, Oppose, and Random modes."
            }
          },
          {
            title: "Study and Analytics",
            bodyHtml: "<p>The prototype now includes dedicated study instrumentation. In Study mode, compositions, returned feedback, and event logs are saved by user and session; Analytics mode supports filtering, summaries, event timelines, and replay-oriented inspection of study traces. This makes the system usable not only as a learning interface, but also as a research instrument for studying iteration and reflection over time.</p>",
            figures: [
              {
                src: "/images/ekphrasis-analytics.png",
                caption: "Analytics mode: filtered timelines, event summaries, and artifact inspection support study analysis."
              }
            ]
          },
          {
            title: "Supporting Tools",
            bodyHtml: "<p>Test Model supports inspecting predictions across uploaded examples, and Label Data supports collecting new labeled compositions to extend the dataset.</p>",
            images: [
              "/images/ekphrasis-test-model.png",
              "/images/ekphrasis-label-data.png"
            ],
            imageColumns: 2
          }
        ]
      },
      {
        title: "Research Trajectory",
        bodyHtml: "<p>The published CHI 2025 work introduced EKPHRASIS through comparative visual aids. The ongoing full paper develops this direction through a stronger formative study, pilot observations, and a controlled-study plan. EKPHRASIS Chess explores a complementary turn-taking interaction in which learners practice design concepts through support, resistance, and reflection on a shared canvas.</p>"
      },
      {
        title: "Publications",
        publications: [
          {
            title: "Generating Visual Aids to Help Students Understand Graphic Design with EKPHRASIS",
            href: "https://dl.acm.org/doi/10.1145/3706599.3719807",
            authors: "Bob Tianqi Wei and Shayne Shen, Shm Almeda, Bjoern Hartmann",
            venue: "CHI 2025",
            links: [
              {
                href: "https://doi.org/10.1145/3706599.3719807",
                label: "https://doi.org/10.1145/3706599.3719807"
              },
              {
                href: "https://bobtianqiwei.github.io/website_files/PDF/ekphrasis/chiea25-326.pdf",
                label: "PDF"
              }
            ],
            abstract: "Graphic design relies on complex language that creates significant barriers in design education, especially for students from non-design backgrounds or those with language barriers. Our interview with 11 design educators and professional designers confirmed that this specialized language, characterized by jargon, ambiguous terminology, and underspecified words, operates within insular communities, making it challenging for learners to decode and internalize its meaning. To address this challenge, we developed EKPHRASIS, an interactive educational system powered by a machine-learning model that provides real-time and actionable visual aids to support students' subjective understanding of design language. Preliminary user testing with novice participants suggests that EKPHRASIS enhances intuitive, multi-modal learning and teaching in graphic design. Through EKPHRASIS, we explore the potential for AI technologies to democratize design pedagogy with real-time, context-aware multi-modal learning support."
          },
          {
            title: "EKPHRASIS: Comparative Visual Feedback for Learning Tacit Graphic Design Vocabulary",
            authors: "Bob Tianqi Wei and Shayne Shen, Shm Almeda, Bjoern Hartmann",
            venue: "Full paper",
            status: "IN PROGRESS",
            abstract: "Graphic design critique relies on tacit and ambiguous vocabulary that novices often struggle to translate into concrete visual decisions, especially outside established design communities or across language backgrounds. To better understand this barrier, we interviewed 11 graphic design educators and professionals and identified three recurring linguistic challenges in design critique: jargon, ambiguity, and vagueness. In response, we developed EKPHRASIS, an AI-mediated visual feedback system that helps learners build subjective understanding of graphic design vocabulary through comparative visual aids grounded in their own compositions. Rather than presenting a single ideal answer, the system juxtaposes less aligned and more aligned variations to support interpretation, reflection, and iteration. This paper reports the formative study, describes the system design, and summarizes pilot observations with two novice participants that establish feasibility and motivate a larger controlled study. Together, these elements position comparative visual feedback as a promising interface for learning tacit graphic design vocabulary."
          },
          {
            title: "EKPHRASIS Chess: A Turn-Taking AI Canvas for Graphic Design Concept Learning",
            authors: "Bob Tianqi Wei and Shayne Shen, Shm Almeda, Dor Abrahamson, Bjoern Hartmann",
            venue: "UIST 2026 demo",
            status: "IN PROGRESS",
            abstract: "Graphic design education often relies on examples and critique to teach abstract visual concepts such as balance and hierarchy. However, novices may struggle to translate these vague concepts into concrete visual actions, especially because the reasoning behind visual decisions is often tacit. We present a demonstration of EKPHRASIS Chess, an interactive design learning system that uses a simplified shared canvas to help learners explore the relationship between visual concepts and compositional changes. A user first places a basic visual element, such as a block, and an AI agent responds by adding another element according to a selected target concept. The system supports three response modes: Help, in which the AI moves the composition toward the concept; Oppose, in which the AI acts as a contrastive opponent that tries to destabilize the target concept while the learner attempts to maintain or recover it; and Random, in which it produces an unrelated alternative. By comparing these contrasting responses, learners can observe how specific changes in position, scale, color, and visual relation affect the expression of an abstract design concept. This demonstration invites attendees to explore how human-AI turn-taking can make tacit design knowledge visible and support reflection, experimentation, and concept learning in graphic design education."
          }
        ]
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"https://bobtianqiwei.github.io/website_files/PDF/ekphrasis/ekphrasis_wei_shen.pdf\" target=\"_blank\" class=\"link-in-paragraph\">Presentation slides</a></p><p><a href=\"https://github.com/bobtianqiwei/EKPHRASIS\" target=\"_blank\" class=\"link-in-paragraph\">github.com/bobtianqiwei/EKPHRASIS</a></p>"
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
    },
    design: {
      outputPath: "design/ekphrasis/index.html",
      metaTitle: "EKPHRASIS - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/ekphrasis/index.html",
      metaTitle: "EKPHRASIS - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
