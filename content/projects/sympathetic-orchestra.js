// content/projects/sympathetic-orchestra.js developed by Bob Tianqi Wei
module.exports = {
  slug: "sympathetic-orchestra",
  content: {
    title: "Sympathetic Orchestra (beta)",
    description: "An early interactive conducting system that used motion tracking, Processing, and multitrack orchestral audio to explore responsive conducting practice.",
    hero: {
      headline: "An early virtual orchestra system for conducting practice, built before the later research paper version and focused on direct motion-to-sound interaction.",
      metaLines: [
        "Tianqi Wei",
        "Interactive program · individual work",
        "January 2022 - April 2022"
      ],
      image: "/images/Sympathetic-Orchestra-new.jpg"
    },
    sections: [
      {
        title: "Overview",
        video: {
          src: "https://www.youtube.com/embed/uEb_TV-SRRc",
          title: "Sympathetic Orchestra beta demo",
          caption: "Demo"
        },
        bodyHtml: "<p>This beta version of Sympathetic Orchestra was an early attempt to make conducting practice more responsive than simply following a fixed recording. Instead of asking students to imagine how an ensemble might react, the system let motion input shape the behavior of a virtual orchestra through both sound and interface feedback.</p><p>It matters because it already contains the seed of what later became the research direction: conducting is not only about beat patterns, but about learning through a perception-action loop in which gesture, musical response, and interpretation continuously shape one another.</p><p><a href=\"/works/sympathetic-orchestra-paper/\" class=\"link-in-paragraph\">See the later research papers and updated system framing</a></p>"
      },
      {
        title: "Inspiration",
        rows: [
          {
            left: {
              figure: {
                src: "/images/conduct2.png"
              }
            },
            right: {
              figure: {
                src: "/images/conducting1.png"
              }
            }
          },
          {
            left: {
              bodyHtml: "<p>I wanted to develop a tool to assist in conducting practice. The sensor recognizes movement, and the virtual band in the computer plays according to the motion while also giving feedback through images and sound.</p>"
            },
            right: {
              figure: {
                src: "/images/Conducting_Design-Positioning.png"
              }
            }
          },
          {
            full: {
              bodyHtml: "<p>The project came from a practical frustration in conducting education. Even serious students often practice by following static recordings while reading full scores, which means they do not get responsive ensemble feedback. This beta prototype asked whether a virtual orchestra could become a more active practice partner.</p><p>That question is what makes the project interesting. It is not only a music interface. It is an attempt to give conductors a way to rehearse tacit skills that normally depend on live musicians being present.</p>"
            }
          }
        ]
      },
      {
        title: "Core Ambition",
        bodyHtml: "<p><strong>I wanted to conduct a virtual orchestra on my computer just like a real symphony orchestra.</strong></p>"
      },
      {
        title: "Research and Divergence",
        rows: [
          {
            left: {
              figure: {
                src: "/images/Conducting_Input_blk.png",
                caption: "The project explored how hand motion could be captured without asking conductors to abandon natural gestures."
              }
            },
            right: {
              figure: {
                src: "/images/Conducting_source_blk.png",
                caption: "The audio system relied on separately prepared parts that could be processed in real time."
              }
            }
          },
          {
            left: {
              title: "Input",
              bodyHtml: "<p>The conductor uses hand gestures to give instructions to the band, and the band adjusts the performance according to the motion. To simulate real practice, the sensing setup had to recognize hand movement without forcing conductors to change their habitual gestures.</p>"
            },
            right: {
              title: "Source of Audio",
              bodyHtml: "<p>It would be ideal to operate expression directly in MIDI inside a DAW, but that pipeline did not offer a practical real-time interface for this prototype. Instead, the system used separately prepared parts and adjusted them in real time to simulate an orchestra responding to the conductor.</p>"
            }
          },
          {
            left: {
              figure: {
                src: "/images/Conducting_sensor_blk.png",
                caption: "Leap Motion, Processing, and multitrack playback formed the core beta stack."
              }
            },
            right: {
              figure: {
                src: "/images/Conducting_Feedback.png",
                caption: "Visual and auditory feedback helped users understand part states and musical response."
              }
            }
          },
          {
            left: {
              title: "Sensor and Interaction",
              bodyHtml: "<p>The implementation combined Leap Motion for sensing, Processing for the interaction logic, and a screen-based interface that displayed part states and hand cursors. This kept the beta focused on a believable perception-action loop rather than a full orchestral simulation stack.</p>"
            },
            right: {
              title: "Feedback",
              bodyHtml: "<p>Cursors for hand movements and band parts were displayed on screen, while speakers or headphones played the multitrack output. Together, the visual and auditory layers let the user hear and see how each section of the orchestra was responding.</p>"
            }
          }
        ]
      },
      {
        title: "Why This Beta Still Matters",
        bodyHtml: "<p>This early version is valuable because it shows the system before the later academic framing tightened the research question. The beta is rougher, but it makes the core ambition very visible: to create a virtual orchestra that does not just play back music, but reacts enough to help a conductor think, listen, and adjust in real time.</p><p>Seen this way, the beta is not just a precursor. It is the place where the central idea was tested in direct interactive form.</p>"
      },
      {
        title: "Source Code",
        bodyHtml: "<p>The original beta page included embedded code excerpts from the Processing implementation. I restored representative sections here as local code panels so the page no longer depends on the old external styling.</p>",
        codeBlocks: [
          {
            title: "Core Setup and Ensemble Layout",
            language: "Java / Processing",
            code: `/* --- Sympathetic Orchestra by Bob Tianqi Wei, 2022 --- */
import processing.sound.*;
import de.voidplus.leapmotion.*;

static final int n_parts = 18;
static final int n_grid_X = 16, n_grid_Y = 7;
static final int sizeX = 1920, sizeY = 1080;
static final int globalX = 50, globalY = 50;

static SoundFile soundfilePtr[] = new SoundFile[n_parts];
static Amplitude ampPtr[] = new Amplitude[n_parts];
public static int[][] unitAttributes = new int[n_parts][4];
public static float[][] textAttributes = new float[n_parts][2];

public final static String[] texts = {
  "Flute", "Oboe", "Clarinet", "Bassoon",
  "French Horns", "Trumpets", "Trombones", "Tuba",
  "Timpani", "Percussion", "Piano", "Violin 1",
  "Violin 2", "Viola", "Cello", "Bass", "Harp", "Conductor"
};`,
            caption: "Excerpt from the original Processing code that defined the orchestral layout and rendering structure."
          },
          {
            title: "Playback and Gesture Processing",
            language: "Java / Processing",
            code: `private static void playAll() {
  if (isPlaying) return;
  for (int i = soundfilePtr.length - 1; i > -1; --i) {
    if (!muted[i]) soundfilePtr[i].play();
  }
  isPlaying = true;
}

private static int _isPointingAt(Hand hand) {
  ArrayList<Finger> fingers = hand.getOutstretchedFingers();
  if (fingers.size() > 2 || fingers.size() == 0) return -1;
  int X = int(_normalize(fingers.get(0).getPosition().array()[0], minX, maxX, 0, n_grid_X));
  int Y = int(_normalize(fingers.get(0).getPosition().array()[1], minY, maxY, 0, n_grid_Y));
  return lookupTable[Y][X];
}

private static boolean isOpen(Hand hand) {
  return hand.getGrabStrength() <= releaseThreshold;
}`,
            caption: "Excerpt from the original motion-to-audio interaction logic."
          }
        ]
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"/works/sympathetic-orchestra-paper/\" class=\"link-in-paragraph\">Sympathetic Orchestra research papers</a></p>"
      }
    ]
  },
  views: {}
};
