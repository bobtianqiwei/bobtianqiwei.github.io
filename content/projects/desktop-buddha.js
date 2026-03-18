// content/projects/desktop-buddha.js developed by Bob Tianqi Wei
module.exports = {
  slug: "desktop-buddha",
  content: {
    title: "Desktop Buddha",
    description: "A desktop companion program that turns the screen into a playful, meditative intervention through animated overlays, sound, and custom imagery.",
    hero: {
      headline: "A desktop companion that blends humor, ritual, and screen-based presence into a small piece of everyday software theater.",
      metaLines: [
        "Bob Tianqi Wei",
        "Desktop application",
        "2022"
      ],
      video: {
        src: "https://www.youtube.com/embed/Xyr1fYO_7cs",
        title: "Desktop Buddha demo",
        caption: "Demo"
      }
    },
    sections: [
      {
        title: "Overview",
        bodyHtml: "<p>Desktop Buddha is a small desktop application inspired by the irreverent spirit of Desktop Goose but redirected toward a calmer and stranger mood. A translucent Buddha figure appears on the screen, emits light, and plays the Great Compassion Mantra, turning the desktop into a lightly theatrical meditative surface.</p><p>The project is memorable because it treats the desktop not as a neutral utility layer but as a stage. Software here is not just about productivity or efficiency. It becomes atmosphere, interruption, and character.</p>"
      },
      {
        title: "What Makes It Work",
        bodyHtml: "<p>The charm of Desktop Buddha comes from its contrast. It takes the chaotic desktop-companion format and steers it toward stillness, absurdity, and a soft form of companionship. It can also swap in custom images or funny emoticons, which keeps the system open to play rather than locking it into a single aesthetic register.</p><p>That makes the project more interesting than a joke app. It is a tiny experiment in how desktop software can shape affect, not just actions.</p>",
        images: [
          "/images/IMG_0585.jpg",
          "/images/Screenshot-2022-12-20-at-15.26.11-3.png"
        ]
      },
      {
        title: "Implementation",
        bodyHtml: "<p>The original page frames the project as a lightweight desktop program rather than a large engineering system, and that restraint suits it. The implementation is meant to create presence with minimal interface overhead: an on-screen figure, audio playback, and user-provided image swapping are enough to define the experience.</p><p>This economy is part of the appeal. Desktop Buddha succeeds because it does not overbuild the idea.</p>",
        codeBlocks: [
          {
            title: "Recovered Main Script",
            language: "Python / PyQt5",
            code: `# Desktop Buddha by Bob Tianqi Wei
# reference: GitHub@ShenYuhan

import sys
import os
from functools import partial
from PyQt5.QtGui import *
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5 import QtGui, QtCore, QtWidgets
import pygame

dbz = r"D:\\...\\desktopBuddha\\大悲咒佛教歌曲.mp3"
pygame.mixer.init()
track = pygame.mixer.music.load(dbz)
pygame.mixer.music.play()

class Qt_pet(QtWidgets.QWidget):
    def __init__(self):
        super(Qt_pet, self).__init__()
        self.dis_file = "img1"
        self.windowinit()
        self.icon_quit()

    def img_update(self):
        if self.img_num < len(self.dir2img[self.current_dir]) - 1:
            self.img_num += 1
        else:
            self.img_num = 0
        self.qpixmap = QtGui.QPixmap(
            os.path.join(self.current_dir, self.dir2img[self.current_dir][self.img_num])
        )
        self.lab.setPixmap(self.qpixmap)`,
            caption: "Recovered from the original Trinket embed. This restores the old external code panel as a local lightweight code block."
          }
        ]
      },
      {
        title: "Project Links",
        bodyHtml: "<p>The original page credits code reference to GitHub@ShenYuhan.</p>"
      }
    ]
  },
  views: {}
};
