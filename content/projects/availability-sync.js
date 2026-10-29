// content/projects/availability-sync.js developed by Bob Tianqi Wei
module.exports = {
  "slug": "availability-sync",
  "content": {
    "title": "Availability Sync",
    "description": "A macOS app that copies events from personal calendars into a work calendar, with control over which details to share.",
    "hero": {
      "headline": "Share your availability across calendars. Keep personal details private.",
      "metaLines": [
        "Bob Tianqi Wei",
        "macOS Development · SwiftUI · EventKit · 2026"
      ]
    },
    "sections": [
      {
        "bodyHtml": "<p>Availability Sync brings busy time from your personal calendars into one work calendar so coworkers can see when you are available. It works with calendar accounts already added to macOS and lets you choose what each source calendar shares.</p><div class=\"project-app-store-cta\"><a href=\"https://github.com/bobtianqiwei/availability-sync/releases/latest/download/Availability-Sync.zip\" class=\"project-app-store-button\" aria-label=\"Download Availability Sync for macOS\"><svg viewBox=\"0 0 384 512\" aria-hidden=\"true\" class=\"project-app-store-icon\"><path d=\"M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-77.7-19.7C63.3 141.2 4 183.5 4 269.5c0 25.5 4.6 51.6 13.9 78.3 12.4 35.5 57.1 122.5 103.8 121.1 24.4-.6 41.7-17.3 73.5-17.3 30.8 0 46.9 17.3 74.1 17.3 47.1-.7 87.7-79.8 99.5-115.4-63.1-29.7-59.8-83-50.1-84.8zM260.5 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 68.6-34.3z\"></path></svg><span>Download for macOS</span></a></div><p>Requires macOS 14 or later. Unzip the download, move Availability Sync.app to Applications, and grant Full Calendar Access.</p>"
      },
      {
        "title": "How it works",
        "imageColumns": 3,
        "images": [
          {
            "src": "/images/availability-sync-calendars.png",
            "captionHtml": "<strong>Choose what to share</strong><br>Select a target calendar. Keep event titles, share only busy time, or ignore a source. Add buffers where needed."
          },
          {
            "src": "/images/availability-sync-rules.png",
            "captionHtml": "<strong>Set your sync rules</strong><br>Choose a date range and sync interval. Merge duplicate events, filter all-day events by keywords, and optionally clean up older synced events."
          },
          {
            "src": "/images/availability-sync-general.png",
            "captionHtml": "<strong>Keep it running</strong><br>Run from the menu bar and launch at login. Optionally sync general rules and calendar order across Macs with iCloud."
          }
        ]
      },
      {
        "title": "Privacy",
        "bodyHtml": "<p>Calendar processing runs locally through EventKit. Busy events omit titles, notes, locations, attendees, and account details. The app has no account, server, analytics, or telemetry. Optional iCloud sync shares settings without event data.</p><p><a href=\"https://github.com/bobtianqiwei/availability-sync\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"link-in-paragraph\">View source on GitHub</a></p>"
      }
    ]
  },
  "views": {
    "works": {
      "outputPath": "works/availability-sync/index.html",
      "metaTitle": "Availability Sync",
      "backHref": "/works/",
      "backLabel": "ALL WORKS",
      "layout": "works-case-study"
    },
    "design": {
      "outputPath": "design/availability-sync/index.html",
      "metaTitle": "Availability Sync - Design Portfolio",
      "backHref": "/design/",
      "backLabel": "BACK TO DESIGN",
      "layout": "design-case-study",
      "eyebrow": "DESIGN PORTFOLIO"
    },
    "swe": {
      "outputPath": "swe/classic/availability-sync/index.html",
      "metaTitle": "Availability Sync - Software Engineering Portfolio",
      "backHref": "/swe/classic/",
      "backLabel": "BACK TO SOFTWARE ENGINEERING",
      "layout": "swe-classic-case-study",
      "eyebrow": "SOFTWARE ENGINEERING PORTFOLIO"
    }
  }
};
