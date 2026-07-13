// content/projects/a-fish-in-the-northern-ocean.js developed by Bob Tianqi Wei
module.exports = {
  slug: "a-fish-in-the-northern-ocean",
  content: {
    title: "A Fish in The Northern Ocean",
    description: "",
    hero: {
      headline: "",
      metaLines: [
        "Mechanical Design & Installation Art",
        "Group work (academic, my work: music mechanics the Ocean)",
        "TianqiWei, Yumeng Bao, Wenjing Guo, Mingxin Zheng",
        "Tutor: Yang Yan, Yingliang Fan, York Gu",
        "04.2021-05.2021"
      ],
      image: "/images/9331623639553_.pic_hd.jpg"
    },
    sections: [
      {
        title: "Inspiration",
        bodyHtml: "<p>穷发之北，有冥海者，天池也。<br>有鱼焉，其广数千里，未有知其修者，其名为鲲。<br>有鸟焉，其名为鹏，背若泰山，翼若垂天之云；<br>抟扶摇羊角而上者九万里，绝云气，负青天。<br>In the barren north, there is a sea, the Celestial Lake.<br>In it there is a fish, Several thousand <em>li</em> in breadth, and no one knows how many <em>li</em> in length. Its name is the <em>kun</em>.<br>There is also a bird, named the <em>peng</em>, with a back like Mount Tai, and wings like clouds across the sky.<br>Upon a whirlwind it soars up to a height of ninety thousand <em>li</em>.<br>Beyond the clouds and atmosphere, with the blue sky above it.</p><p>藐姑射之山，有神人居焉，<br>肌肤若冰雪，淖约若处子；<br>不食五谷，吸风饮露；<br>乘云气，御飞龙，而游乎四海之外。<br>Far away on the mountain of Ku Yi, there lived a spiritual man.<br>His flesh and skin were like ice and snow. His manner was elegant and graceful as that of a maiden.<br>He did not eat any of the five grains, but inhaled the wind and drank the dew.<br>He rode on clouds, drove along the flying dragons, and thus rambled beyond the four seas.</p><p>夫天地者，万物之逆旅，<br>光阴者，百代之过客，<br>而浮生若梦，为欢几何？<br>The world is an inn for all creatures<br>and time is a passing traveler of endless generations.<br>The floating life is like a dream, and how brief the enjoyment is!</p><p class=\"paragraph-small\">Chuang-Tzu: <em>A Happy Excursion</em>   庄子《逍遥游》<br>Li Po: <em>Feasting in the Peach-plum Garden in Spring Night</em>   李白《春夜宴桃李园序》</p><p><em>A Happy Excursion</em> is a masterpiece by Zhuang Zhou (Chuang-Tzu), a philosopher of the Warring States period, which can be regarded as a representative of <em>Zhuangzi</em> in terms of thought and art. This essay draws comparisons with other animals, such as the roc fish (Kun), which can even travel on the wind, and explains the truth that &quot;the most powerful man has no self, the most divine man has no merit, and the sage has no name&quot;.<br>The mechanical design team and I were attracted by the novelty and romance of the imagery and wanted to use machinery to represent such a scene.</p>"
      },
      {
        title: "An Ocean of Music",
        blocks: [
          {
            mediaItems: [
              {
                video: {
                  src: "https://www.youtube.com/embed/GFlschIVLOo",
                  title: "An Ocean of Music"
                }
              },
              {
                src: "/images/IMG_8090-2.jpg",
                caption: "Philip Glass: <em>Opening</em>"
              }
            ]
          },
          {
            bodyHtml: "<p><strong>We wanted to depict the view of a Roc flying over the ocean of music.<br></strong>The Roc was made using LEGO Mindstorms. <em>Opening</em> by minimalist composer Philip Glass gives the impression of an ocean. Its repetitive structure allows it to be played through mechanical devices.<br>The synthesizer in GarageBand on the iPad was used as the source of sound.</p>"
          },
          {
            title: "Mechanical Construction",
            images: [
              {
                src: "/images/未命名作品.jpg",
                caption: "<strong>Sketch</strong>: design of cams based on the music score"
              },
              {
                src: "/images/IMG_8089-2.jpg"
              }
            ],
            imageLayout: "equal-height"
          },
          {
            mediaItems: [
              {
                src: "/images/Geneva-Drive1.png",
                caption: "Designing Structures with Fusion 360"
              },
              {
                src: "/images/Geneva-Drive.png",
                caption: "Switching Bars with <strong>Geneva Drive</strong>"
              },
              {
                video: {
                  src: "https://www.youtube.com/embed/qXCPUyBCYYQ",
                  title: "Mechanism video"
                },
                caption: "Mechanism (Video)"
              }
            ]
          },
          {
            title: "Assembly & Commissioning",
            images: [
              "/images/3741620912483_.pic_hd.jpg",
              "/images/3611620912459_.pic_hd.jpg",
              "/images/3661620912465_.pic_hd.jpg",
              "/images/3681620912477_.pic_hd.jpg"
            ],
            imageColumns: 4,
            imageLayout: "equal-height"
          },
          {
            images: [
              "/images/cam1.png",
              "/images/liangan2.png",
              "/images/liangan3.png",
              "/images/liangan1.png"
            ],
            imageColumns: 4,
            imageLayout: "equal-height"
          },
          {
            bodyHtml: "<p>Our first attempt found that <strong>wood</strong> or <strong>acrylic cams</strong> would not be detected by the capacitive touch screen and we came up with the idea of using tinfoil wrapped around the edge of the acrylic cam to make it detectable. However, this was not stable and not aesthetically pleasing enough.<br>We added <strong>a connecting rod</strong> to connect the cam to the iPad&#x27;s <strong>capacitive touch screen</strong>.</p>",
            video: {
              src: "https://www.youtube.com/embed/rDEM6A4i3Kg",
              title: "Assembly and commissioning video"
            }
          }
        ]
      },
      {
        title: "the <em>Peng</em>",
        blocks: [
          {
            images: [
              {
                src: "/images/kun.png",
                caption: "sketches： <em>Kun</em>"
              },
              {
                src: "/images/peng.png",
                caption: "sketches：<em> Peng</em>"
              }
            ],
            imageLayout: "equal-height"
          },
          {
            images: [
              {
                src: "/images/Picture-2.png",
                caption: "Converting rotary motion into linear motion"
              },
              "/images/wings.jpg",
              "/images/IMG_8118.GIF"
            ],
            imageColumns: 3,
            imageLayout: "equal-height"
          },
          {
            images: [
              {
                src: "/images/peng1-2.jpg",
                caption: "Building the skeleton"
              },
              {
                src: "/images/peng2.jpg",
                caption: "Making wings with tinfoil"
              },
              {
                src: "/images/peng1-3.jpg",
                caption: "Assembling"
              },
              {
                src: "/images/9301623639548_.pic_hd.jpg",
                caption: "Connecting the two parts"
              }
            ],
            imageColumns: 4,
            imageLayout: "equal-height"
          }
        ]
      },
      {
        title: "Final Output",
        blocks: [
          {
            images: [
              "/images/9381623639560_.pic_hd.jpg",
              "/images/9341623639555_.pic_hd.jpeg",
              "/images/WechatIMG951.jpeg",
              "/images/WechatIMG950.jpeg"
            ],
            imageColumns: 4,
            imageLayout: "equal-height"
          },
          {
            video: {
              src: "https://www.youtube.com/embed/LF9QwdTgLX8",
              title: "A Fish in The Northern Ocean final output"
            }
          }
        ]
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/a-fish-in-the-northern-ocean/index.html",
      layout: "works-case-study",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      metaTitle: "A Fish in the Northern Ocean （北冥有鱼） by Bob Tianqi Wei"
    }
  }
};
