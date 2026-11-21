# XP desktop asset credits

`static/media/msn-reference.png` is the user-supplied MSN Messenger screenshot. `msn.css` uses CSS sprite regions of its toolbar and display pictures to preserve the supplied visual reference. MSN and its original artwork belong to Microsoft. The chat layout is standalone; responses use the existing Bob's Cat engine.

The scene now uses `static/media/soundsticks-transparent.png`. Built-in image editing prompt: remove all black/gray background and ground to transparent alpha; preserve the existing speaker composition, scale, perspective, drivers, bases and acrylic highlights. The image is positioned 20 pixels farther back without changing its horizontal alignment or size. The original generated asset is retained.

The existing desktop is based on [ShizukuIchi/winXP](https://github.com/ShizukuIchi/winXP).

`static/media/rover.gif` is the Rover animation distributed as `site/public/rover-hero.gif` in [youngjae99/rover-app](https://github.com/youngjae99/rover-app), downloaded November 19, 2026. Rover character artwork and animations are copyright Microsoft Corporation, originally shipped with Windows XP. The upstream project identifies these assets separately from its application code. No ownership of Microsoft artwork is claimed.

Window frames, dragging, resizing, focus, taskbar buttons, Explorer chrome, Internet Explorer, Winamp and power confirmation dialogs reuse the existing ShizukuIchi/winXP components. `scripts/patch-winxp-extras.js` adds a small dispatcher bridge to the vendored build.

Startup loader keyframes and shutdown/welcome screen structure are adapted from [ducbao414/win32.run](https://github.com/ducbao414/win32.run), commit `9ca31a7ff42e69b31cd64a6ff26d1c22d0bdb840`, specifically `src/routes/xp/starting.svelte`, `shutdown.svelte`, and `welcome.svelte`. Copyright (c) 2023 Bao Nguyen. The MIT license is retained in `WIN32-RUN-LICENSE.txt`.

`static/media/xp/` contains the XP startup, shutdown, logon and logoff recordings, logos, monitor graphic and selected icons from that same commit. These Microsoft Windows assets remain Microsoft Corporation's property; the code's MIT license does not establish a separate license to Microsoft's artwork or audio. No ownership or unrestricted redistribution rights are claimed. No third-party installers or binaries are executed.

Visual references: [GUIdebook Windows XP Professional screenshots](https://guidebookgallery.org/screenshots/winxppro/) (Run, Search, Display Properties, startup and shutdown).

Control Panel category layout reference: [HelpWithWindows, December 5, 2002](https://www.helpwithwindows.com/WindowsXP/start-02.html). Category icons and the replacement `Restart.png` are from the win32.run commit listed above. The category pages expose browser-supported portfolio settings, not host operating-system controls.

`static/media/soundsticks-speaker.png` was generated with the built-in image tool. Prompt: One isolated early-2000s Harman Kardon SoundSticks-style satellite speaker, clear acrylic tube with four silver drivers and a clear circular base, slightly elevated frontal studio view, transparent background, no tabletop, labels or subwoofer. The asset is used twice as a stereo pair. It is an illustrative reconstruction, not a manufacturer photograph. Design-era reference: [Harman Kardon SoundSticks history](https://in.harmankardon.com/blog-soundsticks.html).

`childhood.jpg`, `childhood-with-mom.jpg`, and `mom.jpg` are user-supplied personal photographs, copied without image alteration from IMG_9061.jpg, IMG_0733.JPG, and Gallery Image.JPG. They are displayed as interactive prints in the powered-off desk scene.

The final scene uses `static/media/soundsticks-set.png`, generated with the built-in image tool from the user's SoundSticks reference image. Prompt: Reconstruct the reference's clear cylindrical satellites, four small ring drivers, black tilted bases, and domed subwoofer with central bass port; dark transparent acrylic for a black-to-gray environment, restrained white highlights; asymmetric inward-facing satellites at opposite edges, subwoofer at left rear, empty center for the computer, slightly elevated shared camera perspective, transparent background. This replaces the earlier generic satellite treatment; it remains a generated reconstruction rather than an exact product photograph.

`static/media/vaio-pcv-w.png` is an AI-generated product reconstruction made with the built-in image generation tool, using a [Sony VAIO PCV-W500 reference photo](https://ameblo.jp/hasisaru/entry-10250449140.html) for the machine's industrial design. It is not an archival product photograph. Sony and VAIO branding belongs to its respective owners.

Image prompt: A centered, slightly elevated frontal studio reconstruction of the early-2000s Sony VAIO PCV-W all-in-one, silver widescreen bezel, side speakers, folding full-size keyboard and media controls, powered-off black screen, visible power button, transparent background, no room, mouse, cables, labels or UI. Preserve the reference machine's proportions and period design.
# MSN interface assets

Independent PNG icons and logo in `static/media/msn/` come from [ManzDev/twitch-msn-messenger](https://github.com/ManzDev/twitch-msn-messenger), commit `aa23be29778702a44bb43453c4f925f7816f0624`. Original MSN artwork belongs to Microsoft. No license file was present in that repository; non-commercial use does not itself grant a license. Screenshot crops are no longer used by the MSN interface.

