// content/projects/kindred.js developed by Bob Tianqi Wei
module.exports = {
  slug: "kindred",
  content: {
    title: "Kindred",
    description: "Kindred is a private iPhone journal for dating, intimacy, and relationships.",
    hero: {
      headline: "A private journal for dating, intimacy, and relationships.",
      metaLines: [
        "Bob Tianqi Wei",
        "Product Design · iOS Development · 2026",
        "In development"
      ]
    },
    sections: [
      {
        bodyHtml: "<p>Kindred helps people privately record meaningful moments by person, activity, time, place, and feeling while keeping free-form writing at the center. It is a native iPhone app built with SwiftUI and SwiftData.</p>"
      },
      {
        title: "Private by design",
        bodyHtml: "<p>Kindred has no separate account, advertising, social profile, or third-party analytics SDK. App data is stored on the device and synced through the user's private iCloud account. Optional Apple Health integration is controlled by the user.</p>"
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
