// content/projects/memory-lacing-system.js developed by Bob Tianqi Wei
module.exports = {
  slug: "memory-lacing-system",
  content: {
    title: "Memory Lacing System for Sneakers",
    description: "",
    hero: {
      headline: "",
      metaLines: [
        "Product Design",
        "October 2021"
      ],
      image: "/images/羽毛球鞋渲染.41.png"
    },
    sections: [
      {
        bodyHtml: "<p>Lacing up shoes is often considered a cumbersome process, and a comfortable lacing position is not easy to find for athletes. Sometimes the tightness of the laces on the left and right feet are different and need to be adjusted several times, which is very time consuming for the athletes.</p>",
        figure: "/images/Screenshot-2022-11-06-at-15.19.33.png"
      },
      {
        bodyHtml: "<p>The most advanced at the moment is the BOA lacing system, which uses a knob to adjust the lace tightness. This is how it is constructed.</p>",
        images: [
          {
            src: "/images/Screenshot-2022-11-06-at-15.28.09.jpg",
            captionHtml: "automatic umbrella structure<br><span>*bilibili：@方猫boom</span>"
          },
          {
            src: "/images/IMG_0552.jpg",
            caption: "sketch"
          },
          {
            src: "/images/lacing.png",
            caption: "functional model"
          },
          {
            src: "/images/Image-11-6-22-at-15.36.jpg",
            caption: "3D modeling"
          }
        ],
        imageColumns: 4
      },
      {
        bodyHtml: "<p>Inspired by the principle of automatic umbrella, I designed the lacing system with memory function. Pull on to tighten the laces and press the button to release them. Adjustment to a comfortable position can always be remembered.</p>",
        figure: "/images/Screenshot-2022-11-06-at-15.54.10.jpg"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/memory-lacing-system/index.html",
      layout: "works-case-study",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      metaTitle: "Memory Lacing System for Sneakers by Bob Tianqi Wei"
    }
  }
};
