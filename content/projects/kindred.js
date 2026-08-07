// content/projects/kindred.js developed by Bob Tianqi Wei
module.exports = {
  slug: "kindred",
  content: {
    title: "Kindred",
    description: "Kindred is a private iPhone journal for relationships, intimate moments, and reflection over time.",
    hero: {
      headline: "A private iPhone journal for relationships, intimate moments, and reflection over time.",
      metaLines: [
        "Bob Tianqi Wei",
        "Independent Product · Product Design · iOS Development · 2026",
        "In development"
      ]
    },
    sections: [
      {
        bodyHtml: "<p>Kindred helps people preserve meaningful experiences with the context needed to revisit them later. Each entry combines personal writing with people, activities, time, place, feelings, photos, and optional health details.</p><div class=\"project-app-store-cta\"><a href=\"https://apps.apple.com/app/kindred-private-journal/id6792446484\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"project-app-store-button\" aria-label=\"Download Kindred on the App Store\"><svg viewBox=\"0 0 384 512\" aria-hidden=\"true\" class=\"project-app-store-icon\"><path d=\"M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-77.7-19.7C63.3 141.2 4 183.5 4 269.5c0 25.5 4.6 51.6 13.9 78.3 12.4 35.5 57.1 122.5 103.8 121.1 24.4-.6 41.7-17.3 73.5-17.3 30.8 0 46.9 17.3 74.1 17.3 47.1-.7 87.7-79.8 99.5-115.4-63.1-29.7-59.8-83-50.1-84.8zM260.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 68.6-34.3z\"></path></svg><span>Download on the App Store</span></a></div>"
      },
      {
        title: "The problem",
        bodyHtml: "<div class=\"kindred-text-columns kindred-text-columns-three\"><section class=\"dear-interaction-item\"><img src=\"/images/kindred-context-disappears.png\" loading=\"lazy\" alt=\"Context markers becoming buried between journal pages\" class=\"kindred-column-illustration\"><h3 class=\"dear-interaction-title\">Context disappears</h3><p class=\"dear-interaction-description\">General-purpose journals preserve a story, but people, activities, places, and feelings remain buried in unstructured notes.</p></section><section class=\"dear-interaction-item\"><img src=\"/images/kindred-memories-disconnected.png\" loading=\"lazy\" alt=\"Photo, calendar, and conversation records separated by a broken connection\" class=\"kindred-column-illustration\"><h3 class=\"dear-interaction-title\">Memories stay disconnected</h3><p class=\"dear-interaction-description\">Photos, calendar events, messages, and private reflections live in separate places, making a relationship difficult to revisit as a whole.</p></section><section class=\"dear-interaction-item\"><img src=\"/images/kindred-sensitive-material.png\" loading=\"lazy\" alt=\"A private letter protected inside a soft cover\" class=\"kindred-column-illustration\"><h3 class=\"dear-interaction-title\">The material is sensitive</h3><p class=\"dear-interaction-description\">Intimate records require clear controls, restrained language, and a data model designed around privacy from the start.</p></section></div>"
      },
      {
        title: "How it works",
        bodyHtml: [
          "<p>A Moment connects personal writing with people and context, then carries that record into five focused views.</p>",
          "<div class=\"dear-interaction-flow\"><div class=\"dear-interaction-grid\">",
          "<article class=\"dear-interaction-item\"><img src=\"/images/kindred-add-moment.png\" loading=\"lazy\" alt=\"Kindred Add Moment editor\" class=\"kindred-feature-image\"><h3 class=\"dear-interaction-title\">Add Moment</h3><p class=\"dear-interaction-description\">Record what happened and the details worth keeping.</p></article>",
          "<article class=\"dear-interaction-item\"><img src=\"/images/kindred-journal.png\" loading=\"lazy\" alt=\"Kindred Journal timeline\" class=\"kindred-feature-image\"><h3 class=\"dear-interaction-title\">Journal</h3><p class=\"dear-interaction-description\">Read moments as a private chronological story.</p></article>",
          "<article class=\"dear-interaction-item\"><img src=\"/images/kindred-calendar.png\" loading=\"lazy\" alt=\"Kindred Calendar view\" class=\"kindred-feature-image\"><h3 class=\"dear-interaction-title\">Calendar</h3><p class=\"dear-interaction-description\">See experiences across days and months.</p></article>",
          "<article class=\"dear-interaction-item\"><img src=\"/images/kindred-people.png\" loading=\"lazy\" alt=\"Kindred People view\" class=\"kindred-feature-image\"><h3 class=\"dear-interaction-title\">People</h3><p class=\"dear-interaction-description\">Keep each relationship and its shared history together.</p></article>",
          "<article class=\"dear-interaction-item\"><img src=\"/images/kindred-insights.png\" loading=\"lazy\" alt=\"Kindred Insights view\" class=\"kindred-feature-image\"><h3 class=\"dear-interaction-title\">Insights</h3><p class=\"dear-interaction-description\">Review gentle patterns without scores or judgment.</p></article>",
          "</div><div class=\"dear-interaction-item kindred-demo-note\"><p class=\"dear-interaction-description\">All people, names, portraits, and journal entries shown are fictional AI-generated examples created to demonstrate Kindred's features.</p></div></div>"
        ].join("")
      },
      {
        title: "Design approach",
        bodyHtml: [
          "<div class=\"kindred-design-grid\">",
          "<section class=\"dear-interaction-item\"><div class=\"kindred-design-visual kindred-structure-visual\" aria-hidden=\"true\"><div class=\"kindred-editor-header\"><span class=\"kindred-glass-control\">Cancel</span><strong>Add Moment</strong><span class=\"kindred-glass-control is-disabled\">Save</span></div><div class=\"kindred-editor-section-head\"><strong>What happened?</strong><span><i class=\"kindred-app-icon kindred-icon-edit\"></i>Edit</span></div><div class=\"kindred-mini-tags\"><span>Date</span><span>Conversation</span><span>Kiss</span><span>+ Add</span></div></div><h3 class=\"dear-interaction-title\">Structured and personal</h3><p class=\"dear-interaction-description\">Optional fields add people, activities, place, and feelings while free-form writing remains central.</p></section>",
          "<section class=\"dear-interaction-item\"><div class=\"kindred-design-visual kindred-disclosure-visual\" aria-hidden=\"true\"><div class=\"kindred-settings-header\"><span class=\"kindred-glass-control kindred-glass-icon\"><i class=\"kindred-app-icon kindred-icon-caret-left\"></i></span><strong>Privacy</strong></div><span class=\"kindred-settings-label\">Face ID</span><div class=\"kindred-settings-row\"><span>App Lock with Face ID</span><i class=\"kindred-native-switch is-off\"></i></div><div class=\"kindred-settings-row is-secondary\"><span>Lock after</span><span>1 minute</span></div></div><h3 class=\"dear-interaction-title\">Privacy controls</h3><p class=\"dear-interaction-description\">Optional Face ID App Lock and a configurable timeout keep access protection clear and under the user's control.</p></section>",
          "<section class=\"dear-interaction-item\"><div class=\"kindred-design-visual kindred-language-visual\" aria-hidden=\"true\"><span class=\"kindred-glass-control kindred-filter-control\">Filter</span><div class=\"kindred-journal-row\"><img src=\"/images/kindred-julian-avatar.jpg\" alt=\"\" class=\"kindred-journal-avatar\"><div><strong>Conversation <em>with Julian</em></strong><small>Jul 24 · 10:00 AM</small><p>I took the morning for myself.</p></div></div></div><h3 class=\"dear-interaction-title\">Calm, direct language</h3><p class=\"dear-interaction-description\">Neutral labels and descriptive insights support reflection without rating a person's experiences.</p></section>",
          "<section class=\"dear-interaction-item\"><div class=\"kindred-design-visual kindred-native-visual\" aria-hidden=\"true\"><div class=\"kindred-native-content\"><span></span><span></span><span></span></div><div class=\"kindred-tab-controls\"><div class=\"kindred-glass-control kindred-tab-bar\"><i class=\"kindred-app-icon kindred-icon-journal is-active\"></i><i class=\"kindred-app-icon kindred-icon-calendar\"></i><i class=\"kindred-app-icon kindred-icon-people\"></i><i class=\"kindred-app-icon kindred-icon-person\"></i></div><span class=\"kindred-glass-control kindred-tab-add\"><i class=\"kindred-app-icon kindred-icon-add\"></i></span></div></div><h3 class=\"dear-interaction-title\">Native interaction</h3><p class=\"dear-interaction-description\">iOS 26 navigation and controls provide Liquid Glass, motion, contrast, and accessibility automatically.</p></section>",
          "</div>"
        ].join("")
      },
      {
        title: "Privacy by design",
        bodyHtml: "<div class=\"kindred-text-columns kindred-text-columns-three\"><section class=\"dear-interaction-item\"><img src=\"/images/kindred-private-storage.png\" loading=\"lazy\" alt=\"A locked journal stored inside a cloud\" class=\"kindred-column-illustration\"><h3 class=\"dear-interaction-title\">Private storage</h3><p class=\"dear-interaction-description\">SwiftData keeps records on the device and CloudKit can sync them through the user's private iCloud database. Kindred has no separate account, advertising, or third-party analytics SDK.</p></section><section class=\"dear-interaction-item\"><img src=\"/images/kindred-explicit-protection.png\" loading=\"lazy\" alt=\"A shield with a checkmark and privacy control\" class=\"kindred-column-illustration\"><h3 class=\"dear-interaction-title\">Explicit protection</h3><p class=\"dear-interaction-description\">App Lock uses Face ID, Touch ID, or the device passcode. Apple Health access remains optional and each Health sync is controlled by the user.</p></section><section class=\"dear-interaction-item\"><img src=\"/images/kindred-data-ownership.png\" loading=\"lazy\" alt=\"A record box with export and restore arrows\" class=\"kindred-column-illustration\"><h3 class=\"dear-interaction-title\">Data ownership</h3><p class=\"dear-interaction-description\">Complete backup, restore, and deletion controls make personal records portable and removable.</p></section></div>"
      },
      {
        title: "What's next",
        bodyHtml: "<p>I plan to explore optional partner collaboration while preserving the privacy and individual control at the center of Kindred. If you have feedback or ideas, I would be glad to hear from you at <a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a>.</p>"
      },
      {
        title: "Project Links",
        bodyHtml: "<p><a href=\"/works/kindred/privacy/\" class=\"link-in-paragraph\">Privacy Policy</a></p><p><a href=\"/works/kindred/support/\" class=\"link-in-paragraph\">Support</a></p>"
      }
    ]
  },
  views: {
    works: {
      outputPath: "works/kindred/index.html",
      metaTitle: "Kindred",
      backHref: "/works/",
      backLabel: "ALL WORKS",
      layout: "works-case-study"
    },
    design: {
      outputPath: "design/kindred/index.html",
      metaTitle: "Kindred - Design Portfolio",
      backHref: "/design/",
      backLabel: "BACK TO DESIGN",
      layout: "design-case-study",
      eyebrow: "DESIGN PORTFOLIO"
    },
    swe: {
      outputPath: "swe/classic/kindred/index.html",
      metaTitle: "Kindred - Software Engineering Portfolio",
      backHref: "/swe/classic/",
      backLabel: "BACK TO SOFTWARE ENGINEERING",
      layout: "swe-classic-case-study",
      eyebrow: "SOFTWARE ENGINEERING PORTFOLIO"
    }
  },
  childPages: [
    {
      slug: "privacy",
      content: {
        title: "Kindred Privacy Policy",
        description: "Privacy Policy for Kindred.",
        hero: {
          headline: "",
          metaLines: ["Last updated: July 18, 2026"]
        },
        sections: [
          {
            bodyHtml: "<p>Kindred is a private iPhone journal for dating, intimacy, and relationships. This Privacy Policy explains how Kindred handles information when you use the app.</p><p>Kindred does not require a separate account. We do not sell your data, use it for advertising, or track you across apps or websites.</p>"
          },
          {
            title: "1. Information you add",
            bodyHtml: "<p>Kindred stores the information you choose to add, which may include:</p><ul><li>Your profile name, nickname, and photo</li><li>People, relationship types, avatars, and private notes</li><li>Moments, dates, times, activities, journal entries, feelings, private tags, and daily reflections</li><li>Photos and selected place information</li><li>Optional intimacy details, including protection status, how an experience felt, specific activities, and private notes</li><li>App preferences and links to Apple Health records</li></ul><p>This information can be highly sensitive. You control what you enter into Kindred.</p>"
          },
          {
            title: "2. Storage and iCloud sync",
            bodyHtml: "<p>Kindred stores app data on your device using Apple's SwiftData framework. Data is configured to sync through the private CloudKit database associated with your Apple Account. Photos and profile information may also sync through Kindred's private iCloud container and Apple's iCloud key-value storage.</p><p>Kindred does not operate its own account system or data server. iCloud storage and sync are provided by Apple and are subject to your Apple Account, device settings, and Apple's privacy practices.</p>"
          },
          {
            title: "3. Photos, camera, and places",
            bodyHtml: "<p>Kindred accesses photos only when you choose photos to add. It may access the camera when you choose to take a profile or person photo. Selected photos are copied into storage managed by the app.</p><p>If you search for or select a place, Kindred saves the place name, address, and coordinates with your Moment. Place search is provided through Apple's MapKit services.</p>"
          },
          {
            title: "4. Apple Health",
            bodyHtml: "<p>Apple Health integration is optional. With your permission, Kindred can read or write Sexual Activity records. Imported records may include the date, time, and protection status supported by Apple Health. When you choose to sync a Moment, Kindred sends only the relevant date, time, and protection status to Apple Health.</p><p>Kindred does not send people, relationship details, journal text, photos, feelings, private tags, locations, or other activities to Apple Health. The app may store the identifier of a related HealthKit record so it can manage records it created.</p><p>You can manage Health permissions in iOS Settings or the Health app. Deleting data from Kindred does not delete existing records from Apple Health.</p>"
          },
          {
            title: "5. App Lock",
            bodyHtml: "<p>If you enable App Lock, Kindred uses Apple's LocalAuthentication framework to ask for Face ID, Touch ID, or your device passcode. Kindred does not receive or store your biometric data.</p>"
          },
          {
            title: "6. Analytics, advertising, and tracking",
            bodyHtml: "<p>Kindred does not include advertising SDKs or third-party analytics SDKs. It does not create a social profile and does not track you across other companies' apps or websites.</p>"
          },
          {
            title: "7. Backups and sharing",
            bodyHtml: "<p>You can export a complete ZIP backup containing your Kindred data and original photos. The exported file may contain highly sensitive information and is not encrypted by Kindred at the app level. Store it only in a location you trust.</p><p>Kindred does not upload your backup to a developer-operated server. If you save or share it through another app or service, that provider's privacy practices apply.</p>"
          },
          {
            title: "8. Deleting your data",
            bodyHtml: "<p>You can delete individual Moments and people in the app. The Delete All Data feature removes people, Moments, daily reflections, journal photos, and profile photos from Kindred. These deletions sync through iCloud to other devices using the same Apple Account.</p><p>Delete All Data does not remove your profile name, app settings, exported backup files, or records already stored in Apple Health. Deleting the app from one device may not delete data stored in iCloud.</p>"
          },
          {
            title: "9. Changes to this policy",
            bodyHtml: "<p>We may update this Privacy Policy when Kindred changes. The updated policy will be posted on this page with a new Last updated date.</p>"
          },
          {
            title: "10. Contact",
            bodyHtml: "<p>For privacy questions or support, contact:</p><p><a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a></p>"
          }
        ]
      },
      views: {
        works: {
          outputPath: "works/kindred/privacy/index.html",
          metaTitle: "Kindred - Privacy",
          layout: "plain-text-page"
        }
      }
    },
    {
      slug: "support",
      content: {
        title: "Kindred Support",
        description: "Support for Kindred.",
        hero: {
          headline: "",
          metaLines: []
        },
        sections: [
          {
            bodyHtml: "<p>For support, questions, feedback, or privacy requests, contact:</p><p><a href=\"mailto:roberttqwei@gmail.com\" class=\"link-in-paragraph\">roberttqwei@gmail.com</a></p><p>When reporting a problem, please include your iPhone model, iOS version, Kindred version, and a brief description of what happened. Please do not email private journal content, intimate details, or unredacted personal photos.</p>"
          },
          {
            title: "Common questions",
            blocks: [
              {
                title: "What devices does Kindred support?",
                bodyHtml: "<p>Kindred supports iPhone in portrait orientation and requires iOS 17 or later.</p>"
              },
              {
                title: "Where is my data stored?",
                bodyHtml: "<p>Kindred stores data on your iPhone and uses your private iCloud account to sync supported data between your devices. Kindred does not use a separate account or developer-operated data server.</p>"
              },
              {
                title: "Does Kindred include advertising or analytics?",
                bodyHtml: "<p>No. Kindred has no advertising SDK or third-party analytics SDK and does not track you across apps or websites.</p>"
              },
              {
                title: "How do I protect the app with Face ID or Touch ID?",
                bodyHtml: "<p>Open Settings in Kindred and enable App Lock. Depending on your device, iOS may use Face ID, Touch ID, or the device passcode.</p>"
              },
              {
                title: "How does Apple Health integration work?",
                bodyHtml: "<p>Apple Health integration is optional. In Kindred Settings, you can request permission to read, write, or read and write Sexual Activity records. You can also choose whether an individual Moment is written to Apple Health.</p>"
              },
              {
                title: "What information is sent to Apple Health?",
                bodyHtml: "<p>Kindred sends only the date, time, and supported protection status for a Sexual Activity record you choose to sync. People, notes, photos, feelings, private tags, locations, and other activities are not sent to Apple Health.</p>"
              },
              {
                title: "Why can Kindred not confirm Health read access?",
                bodyHtml: "<p>Apple does not reveal the complete read authorization status to apps. A completed permission request does not always mean that every requested read permission was granted. You can review access in iOS Settings or the Health app.</p>"
              },
              {
                title: "How do I make a backup?",
                bodyHtml: "<p>Open Settings, go to Data, and choose Export Complete Backup. Kindred creates a ZIP file containing your records and original photos. Keep this file in a trusted location because it may contain sensitive information.</p>"
              },
              {
                title: "How do I restore a backup?",
                bodyHtml: "<p>Open Settings, go to Data, and choose Restore from ZIP. Review the preview carefully before confirming. Restoring replaces the current Kindred data with the contents of the backup.</p>"
              },
              {
                title: "How do I delete my data?",
                bodyHtml: "<p>You can delete individual records in the app. To remove Kindred's people, Moments, reflections, and stored photos, open Settings, go to Data, and choose Delete All Data. This action cannot be undone and syncs to other devices through iCloud. It does not delete Apple Health records, exported backups, your profile name, or app settings.</p>"
              },
              {
                title: "What languages are available?",
                bodyHtml: "<p>Kindred supports English, French, Spanish, Simplified Chinese, and Traditional Chinese. You can follow the system language or choose a language in the app.</p>"
              },
              {
                title: "Where can I read the Privacy Policy?",
                bodyHtml: "<p>Read the <a href=\"/works/kindred/privacy/\" class=\"link-in-paragraph\">Kindred Privacy Policy</a>.</p>"
              }
            ]
          }
        ]
      },
      views: {
        works: {
          outputPath: "works/kindred/support/index.html",
          metaTitle: "Kindred - Support",
          layout: "plain-text-page"
        }
      }
    }
  ]
};
