// content/projects/hui.js developed by Bob Tianqi Wei
module.exports = {
  slug: "hui",
  content: {
    title: "HUI（回）",
    description: "A public sculpture project exploring how spatial form shapes attention, posture, and social behavior.",
    hero: {
      headline: "",
      metaLines: [
        "Public Sculpture",
        "individual work (academic)",
        "Tianqi Wei",
        "Tutor: Lintao Tang",
        "10.2021-12.2021"
      ]
    },
    sections: [
      {
        lead: "How can space subliminally affect human emotions and behavior?",
        bodyHtml: "<p>The public sculpture HUI（回） consists of a square plane and stairs that enclose the plane.</p>",
        images: [
          "/images/模型渲染.147.png",
          "/images/模型渲染.149.png"
        ],
        imageColumns: 2,
        blocks: [
          {
            bodyHtml: "<p><strong>The surrounding structure will draw the attention from people on the stairs to those on the bottom plane.</strong></p><p>The plane at the center of the sculpture is a <strong>more open</strong> space facing the surrounding steps, while the steps, because of their fixed orientation allowing people to sit and lean in the direction of the middle plane, are a <strong>relatively private</strong> space. Those who enter the space are given the psychological state of the viewer and audience by the area they are in.</p>",
            images: [
              "/images/Screenshot-2022-11-07-at-15.36.20.jpg",
              "/images/hui.png",
              "/images/HUI_sight.jpg"
            ],
            imageColumns: 3
          },
          {
            bodyHtml: "<p>There are only two areas within it, and the form of the space itself is the only structure. The entire sculpture is pure white, allowing the <strong>people in the space</strong> and the <strong>actions</strong> taking place to be the focus of attention.</p>",
            figure: {
              src: "/images/HUI_height4.jpg"
            }
          },
          {
            bodyHtml: "<p>The <strong>scale of the space</strong> is designed for the <strong>human body</strong>.</p>",
            images: [
              "/images/回-沙漠.228.png",
              "/images/回-沙漠.227.png"
            ],
            imageColumns: 2
          },
          {
            bodyHtml: "<p>The height of the steps is similar to the height of a person, isolating the person inside from the outside environment.</p>",
            images: [
              "/images/回-沙漠.226.png",
              "/images/回-沙漠.225.jpg"
            ],
            imageColumns: 2
          },
          {
            bodyHtml: "<p>The steps are for walking and sitting. The square planes offer the possibility of activities.</p>",
            figure: {
              src: "/images/回-沙漠.224.jpg"
            }
          },
          {
            bodyHtml: "<p><strong>It provides only an affordance for people to perform, watch, communicate, and leads people to naturally generate their own psychology of being a viewer or audience in the space, and to engage in behaviors that conform to such a state of mind.</strong></p>",
            figure: {
              src: "/images/IMG_0565.jpg"
            }
          },
          {
            bodyHtml: "",
            quote: {
              eyebrow: "Quote from <a href=\"https://mp.weixin.qq.com/s/dKOs5dMvNWdcUpRz7PKwvg\" target=\"_blank\" class=\"link-in-paragraph\"><em>Lintao Tang, Design for Affordance: Teaching Reform Practices of Academy of Arts &amp; Design at Tsinghua University's &quot;Social Science and Product Innovation&quot; Course</em></a>",
              bodyHtml: "Wei Tianqi: The Affordance of Steps<br><br>Wei Tianqi's work, titled &quot;HUI&quot;, is a square white space surrounded by seven steps, as shown in the picture. In addition to leading to another space, the steps also have a variety of affordances such as sitting and lying down. The Scalinata della Trinità dei Monti (Spanish Steps) in Rome is a good example of this, serving as both a stage and a grandstand. The &quot;HUI&quot; sets the scale of the steps to enclose the space according to the modulus of the human body. The height of the top can block the view of a person of 175 centimeters in height, separating the space into inside and outside, giving openness to the outside space and privacy to the inside space. The top bar is not only reclinable, but also gives a wider view to those sitting on it. One climbs up from the outside, reaches the top and overlooks the square space in the center like a stage, and then descends steps to reach the center of the space. The inward, funnel-shaped centripetal space guides people to sit, lie down, and talk; the outwardly unfolding steps are the centrifugal space, where people gather and stay to watch the crowds of people coming and going on the street.<br><br>HUI is a moving and experiencing thing like the Architectural Promenade. People move through the space to perceive the field force of different places and explore where they should go and stay. Relationships in space are instantly recognized without signs. The force of social relations created by physical space pulls people's behaviors beyond their perception of structure and form, and achieves the relative transparency of material entities in perception. The design concept of HUI does not lie in how it becomes an object that attracts attention, but as a trigger that provokes and unites various interactions. Like Pike and Hepburn's date on the Spanish Steps in <em>Roman Holiday</em>, students can meet their friends on the outside of the UI, then climb to the inside for quiet conversation. The seven steps change the boundaries between public and private, allowing dynamic subjects to generate their own space at will."
            }
          }
        ]
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/hui/index.html",
      metaTitle: "HUI（回） by Bob Tianqi Wei",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/hui/index.html",
      metaTitle: "HUI（回） - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    }
  }
};
