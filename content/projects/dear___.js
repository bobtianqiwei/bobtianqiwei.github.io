// content/projects/dear___.js developed by Bob Tianqi Wei
module.exports = {
  slug: "dear___",
  content: {
    title: "dear___",
    description: "",
    hero: {
      headline: "",
      metaLines: []
    },
    sections: [
      {
        title: "Links",
        bodyHtml: "<p><a href=\"/works/dear___/privacy/\" class=\"link-in-paragraph\">Privacy Policy</a></p><p><a href=\"/works/dear___/support/\" class=\"link-in-paragraph\">Support</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/dear___/index.html",
      metaTitle: "dear___",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    }
  },
  childPages: [
    {
      slug: "privacy",
      content: {
        title: "dear___ Privacy Policy",
        description: "Privacy Policy for dear___.",
        hero: {
          headline: "",
          metaLines: ["Last updated: June 11, 2026"]
        },
        sections: [
          {
            bodyHtml: "<p>dear___ is a private memory journaling app. This Privacy Policy explains how the app handles your photos, writings, music information, dates, and optional exhibition submissions.</p>"
          },
          {
            title: "1. Local memories",
            bodyHtml: "<p>By default, dear___ stores your memories locally on your device. These memories may include:</p><ul><li>Imported photos</li><li>Masks drawn over photos</li><li>Diary text</li><li>Photo dates and writing dates</li><li>Music titles or music-related notes</li><li>Exported memory cards</li></ul><p>We do not upload these memories to our server by default. We do not sell your data. We do not use your memories for advertising.</p>"
          },
          {
            title: "2. Photos and media access",
            bodyHtml: "<p>dear___ may ask for permission to access photos so you can import images into the app or save exported memory cards. The app uses this access only for features you choose to use.</p>"
          },
          {
            title: "3. Notifications",
            bodyHtml: "<p>dear___ may send optional reminders, such as on this day memories or weekly memory reminders. These notifications are based on your memories and settings. Notification content is designed to avoid showing private photo or diary details on the lock screen.</p><p>You can turn off notifications at any time in the app or in iOS Settings.</p>"
          },
          {
            title: "4. Exhibition submissions",
            bodyHtml: "<p>If you choose to submit memories to a dear___ exhibition, the app may prepare a submission package that includes selected materials, such as:</p><ul><li>Exported memory cards</li><li>Masked images</li><li>Optional original photos</li><li>Diary text</li><li>Date information</li><li>Music information</li><li>Consent information</li></ul><p>Submission is optional. Before submission, you will be shown what materials may be included. Original photos should not be submitted unless you explicitly choose to include them.</p><p>Exhibition submissions may be reviewed, stored, and displayed as part of the dear___ exhibition only according to the permissions you provide in the submission form.</p>"
          },
          {
            title: "5. Third-party services",
            bodyHtml: "<p>If you submit memories through a Google Form, email, or another external service, your submitted materials may also be handled according to that service's privacy policy.</p><p>dear___ does not use advertising SDKs and does not track you across apps or websites.</p>"
          },
          {
            title: "6. Data deletion",
            bodyHtml: "<p>You can delete local memories inside the app by deleting the relevant memory or removing the app from your device.</p><p>If you submitted materials to an exhibition and want to request deletion, contact us at <a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a>.</p>"
          },
          {
            title: "7. Children",
            bodyHtml: "<p>dear___ is not designed for children under 13. Please do not submit personal information from children without appropriate permission.</p>"
          },
          {
            title: "8. Changes to this policy",
            bodyHtml: "<p>We may update this Privacy Policy if the app changes. The updated version will be posted on this page with a new Last updated date.</p>"
          },
          {
            title: "9. Contact",
            bodyHtml: "<p>For privacy questions, deletion requests, or support, contact:</p><p><a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a></p>"
          }
        ]
      },
      views: {
        works: {
          outputPath: "works/dear___/privacy/index.html",
          metaTitle: "dear___ - Privacy",
          layout: "plain-text-page"
        }
      }
    },
    {
      slug: "support",
      content: {
        title: "Support",
        description: "Support for dear___.",
        hero: {
          headline: "",
          metaLines: []
        },
        sections: [
          {
            bodyHtml: "<p>For support, questions, feedback, privacy requests, or exhibition submission issues, contact:</p><p><a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a></p>"
          },
          {
            title: "Common questions",
            blocks: [
              {
                title: "Where are my memories stored?",
                bodyHtml: "<p>By default, memories are stored locally on your device.</p>"
              },
              {
                title: "Does dear___ upload my photos or diary text?",
                bodyHtml: "<p>Not by default. Your memories are only shared if you choose to export them or submit them to an exhibition.</p>"
              },
              {
                title: "How do I delete a memory?",
                bodyHtml: "<p>Open the memory in the app and delete it from your local library. You can also remove all local app data by deleting the app from your device.</p>"
              },
              {
                title: "How do exhibition submissions work?",
                bodyHtml: "<p>If you choose to submit to an exhibition, dear___ may create a submission package containing selected memory materials. You will be shown what may be included before submission.</p>"
              },
              {
                title: "How do I request removal of an exhibition submission?",
                bodyHtml: "<p>Email <a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a> with the submission information you want removed.</p>"
              },
              {
                title: "How do I turn off notifications?",
                bodyHtml: "<p>You can turn off memory reminders in the app settings or disable notifications for dear___ in iOS Settings.</p>"
              }
            ]
          }
        ]
      },
      views: {
        works: {
          outputPath: "works/dear___/support/index.html",
          metaTitle: "dear___ - Support",
          layout: "plain-text-page"
        }
      }
    }
  ]
};
