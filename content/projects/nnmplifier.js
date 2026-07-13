// content/projects/nnmplifier.js developed by Bob Tianqi Wei
module.exports = {
  slug: "nnmplifier",
  content: {
    title: "NNMPLIFIER",
    description: "",
    hero: {
      headline: "",
      metaLines: [
        "Product design and fabrication",
        "Individual work (academic)",
        "Bob Tianqi Wei",
        "Tutor: Pierluigi Dalla Rosa",
        "2024.1-2024.2"
      ],
      video: {
        src: "https://www.youtube.com/embed/IQN6CBSjAMM?si=l3D4lSKeNXe3VXnn",
        title: "NNMPLIFIER video"
      }
    },
    sections: [
      {
        bodyHtml: "<p>Nnmplifier is an assignment for an old appliance remodeling project. I purchased a guitar amplifier at a thrift store and remodeled it to allow the use of nn~ to run sound related neural network models used to process audio in real time as an effector. For this project I used a microcontroller and Max MSP and 3D printed the product case.</p><p>In the video, I used a neural network model called wheel that can describe sounds in words and recite them phonetically. There are five wheels running locally via nn~ and three knobs that control the overall volume, the model output volume, and the number of models running simultaneously.</p><p>nn~ provides the basis for running many neural network models in this project, so I named this project Nnplifier.</p>"
      },
      {
        rows: [
          {
            left: {
              figure: "/images/IMG_8763-2.jpeg"
            },
            right: {
              bodyHtml: "<p>This is a guitar amp I purchased on theused market. In the DET class, our goal is to use emerging technologies totransform used appliances. I hope to transform this guitar amplifier.</p>"
            }
          },
          {
            left: {
              figure: "/images/IMG_9147.jpeg"
            },
            right: {
              bodyHtml: "<div class=\"project-image-grid\"><div class=\"project-image-card\"><img src=\"/images/IMG_9148.jpeg\" loading=\"lazy\" alt=\"\" class=\"project-image\"></div><div class=\"project-image-card\"><img src=\"/images/IMG_9150.jpeg\" loading=\"lazy\" alt=\"\" class=\"project-image\"></div></div><p>The disassembled structure is shown. Isoldered new potentiometers and installed new jacks on them, using amicrocontroller to send their serial data to the computer for the next step.</p>"
            }
          },
          {
            left: {
              figure: "/images/IMG_9151.jpeg"
            },
            right: {
              bodyHtml: "<p>Ultimately I decided to make this guitaramplifier capable of running neural network models used to process sound. Iused an external called nn~ on the max for running the modellocally in real time to process sounds. Here I used a model called wheel thatrecognizes the sounds and describes them in text, and the described text I readthem out immediately using machine speech. Interestingly, what they read aloudis not even a language, I processed it as a sound effect.</p>"
            }
          },
          {
            left: {
              figure: "/images/IMG_9172.jpeg"
            },
            right: {
              bodyHtml: "<p>I also modeled and printed an enclosurefor mounting this hardware. In the end, it looks great.</p>"
            }
          }
        ]
      },
      {
        figure: "/images/IMG_9213.jpg"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/nnmplifier/index.html",
      layout: "works-case-study",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      metaTitle: "Nnmplifier"
    }
  }
};
