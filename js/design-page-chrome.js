// js/design-page-chrome.js developed by Bob Tianqi Wei
(function () {
  var pageRoot = document.querySelector(".design-project-page");
  if (!pageRoot) {
    return;
  }

  var themeStorageKey = "site-theme-preference";
  var systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

  function injectStyles() {
    if (document.getElementById("design-page-chrome-styles")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "design-page-chrome-styles";
    style.textContent = `
      .design-page-modal-overlay {
        position: fixed;
        inset: 0;
        z-index: 1200;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px;
        background: rgba(17, 17, 17, 0.18);
        opacity: 0;
        pointer-events: none;
        transition: opacity .22s ease;
      }

      .design-page-modal-overlay.show {
        opacity: 1;
        pointer-events: auto;
      }

      .design-page-about-modal,
      .design-page-cv-modal {
        position: relative;
        width: min(760px, calc(100% - 120px));
        max-height: min(82vh, 760px);
        overflow-y: auto;
        padding: 56px 56px 52px;
        border: 1px solid #ddd;
        border-radius: 12px;
        background: #fff;
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.08);
        box-sizing: border-box;
      }

      .design-page-modal-close {
        position: absolute;
        top: 12px;
        right: 12px;
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 8px;
        background: transparent;
        color: #666;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }

      .design-page-modal-close:hover {
        background: #f5f5f5;
        color: #111;
      }

      .design-page-about-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 56px;
        align-items: start;
      }

      .design-page-cv-grid {
        display: grid;
        grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        gap: 56px;
        align-items: start;
      }

      .design-page-about-name {
        margin: 0 0 10px;
        color: #222;
        font-size: 22px;
        font-weight: 300;
        line-height: 1.2;
      }

      .design-page-about-bio,
      .design-page-about-email,
      .design-page-about-link {
        margin: 0;
        color: #333;
        font-family: Open Sans, sans-serif;
        font-size: 15px;
        font-weight: 300;
        line-height: 1.55;
      }

      .design-page-about-email {
        margin-top: 18px;
      }

      .design-page-about-email a,
      .design-page-about-link a {
        color: inherit;
        text-decoration: none;
      }

      .design-page-about-link {
        margin-top: 10px;
      }

      .design-page-about-note {
        margin: 18px 0 0;
        color: #8a8a8a;
        font-family: Open Sans, sans-serif;
        font-size: 12px;
        font-weight: 300;
        line-height: 1.5;
      }

      .design-page-about-image {
        display: block;
        width: 100%;
        aspect-ratio: 4 / 5;
        object-fit: cover;
      }

      .design-page-cv-section {
        margin-bottom: 42px;
      }

      .design-page-cv-section:last-child {
        margin-bottom: 0;
      }

      .design-page-cv-section-title {
        margin: 0 0 26px;
        color: #222;
        font-size: 18px;
        font-weight: 300;
        letter-spacing: 0;
      }

      .design-page-cv-item {
        margin: 0 0 22px;
        color: #555;
        font-family: Manrope Variablefont Wght, Arial, sans-serif;
        font-size: 13px;
        font-weight: 200;
        line-height: 1.55;
      }

      .design-page-cv-item:last-child {
        margin-bottom: 0;
      }

      .design-page-cv-item strong {
        display: block;
        margin-bottom: 6px;
        color: #222;
        font-size: 15px;
        font-weight: 300;
        line-height: 1.35;
      }

      .design-page-cv-item-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 16px;
        align-items: baseline;
      }

      .design-page-cv-date {
        text-align: right;
        white-space: nowrap;
      }

      .design-page-cv-skills .design-page-cv-item {
        margin-bottom: 14px;
        color: #333;
        font-size: 14px;
        font-weight: 300;
        line-height: 1.35;
      }

      .design-page-theme-toggle-row {
        margin-top: 18px;
      }

      .design-page-theme-toggle {
        appearance: none;
        background: none;
        border: 0;
        cursor: pointer;
        margin: 0;
        padding: 0;
      }

      .design-page-theme-toggle-track {
        position: relative;
        display: flex;
        align-items: center;
        width: 52px;
        height: 28px;
        padding: 2px;
        border: 1px solid #ddd;
        border-radius: 999px;
        background: #f1f1f1;
        transition: background-color .25s ease, border-color .25s ease;
      }

      .design-page-theme-toggle-thumb {
        position: relative;
        z-index: 1;
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 999px;
        background: #9a9a9a;
        transition: transform .25s ease, background-color .25s ease;
      }

      .design-page-theme-toggle-icon {
        position: absolute;
        top: 50%;
        width: 12px;
        height: 12px;
        transform: translateY(-50%);
        z-index: 2;
      }

      .design-page-theme-toggle-icon svg {
        display: block;
        width: 100%;
        height: 100%;
      }

      .design-page-theme-toggle-icon.sun {
        left: 8px;
        color: #4f4f4f;
      }

      .design-page-theme-toggle-icon.moon {
        left: 30px;
        color: #7f7f7f;
      }

      html[data-theme="dark"] .design-page-theme-toggle-track {
        border-color: #383838;
        background: #2a2a2a;
      }

      html[data-theme="dark"] .design-page-theme-toggle-thumb {
        transform: translateX(24px);
        background: #b8b1aa;
      }

      html[data-theme="dark"] .design-page-theme-toggle-icon.sun {
        color: #b4aca4;
      }

      html[data-theme="dark"] .design-page-theme-toggle-icon.moon {
        color: #f1e9e0;
      }

      html[data-theme="dark"] .design-page-about-modal,
      html[data-theme="dark"] .design-page-cv-modal {
        border-color: #383838;
        background: #202020;
        box-shadow: 0 18px 60px rgba(0, 0, 0, 0.28);
      }

      html[data-theme="dark"] .design-page-about-name,
      html[data-theme="dark"] .design-page-cv-section-title,
      html[data-theme="dark"] .design-page-cv-item strong {
        color: #efebe6;
      }

      html[data-theme="dark"] .design-page-about-bio,
      html[data-theme="dark"] .design-page-about-email,
      html[data-theme="dark"] .design-page-about-link,
      html[data-theme="dark"] .design-page-cv-item,
      html[data-theme="dark"] .design-page-cv-skills .design-page-cv-item {
        color: #d3cdc6;
      }

      html[data-theme="dark"] .design-page-about-note {
        color: #918980;
      }

      html[data-theme="dark"] .design-page-modal-close {
        color: #b5aea6;
      }

      html[data-theme="dark"] .design-page-modal-close:hover {
        background: #262626;
        color: #efebe6;
      }

      @media screen and (max-width: 767px) {
        .design-page-modal-overlay {
          padding: 16px;
        }

        .design-page-about-modal,
        .design-page-cv-modal {
          width: min(100%, calc(100% - 32px));
          padding: 24px;
        }

        .design-page-cv-modal {
          padding: 32px 24px 28px;
        }

        .design-page-about-grid,
        .design-page-cv-grid {
          grid-template-columns: 1fr;
          gap: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function injectMarkup() {
    if (document.querySelector("[data-design-about-modal]")) {
      return;
    }

    var wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="design-page-modal-overlay" data-design-about-modal>
        <div class="design-page-about-modal" role="dialog" aria-modal="true" aria-labelledby="design-about-title">
          <button type="button" class="design-page-modal-close" aria-label="Close" data-design-about-close>&times;</button>
          <div class="design-page-about-grid">
            <div>
              <h2 id="design-about-title" class="design-page-about-name">Bob Tianqi Wei</h2>
              <p class="design-page-about-bio">Design engineer focused on digital and tangible interfaces for emerging technologies. I turn complex systems into clear, fast interfaces through prototyping, user research, and code. I work end to end from CAD / Figma to production with an eye for craft, accessibility, and performance.</p>
              <p class="design-page-about-email"><a href="mailto:bobtianqiwei@berkeley.edu">bobtianqiwei@berkeley.edu</a></p>
              <p class="design-page-about-link"><a href="https://bobtianqiwei.com" target="_blank">bobtianqiwei.com</a></p>
              <p class="design-page-about-note">This website and its contents are protected by copyright.</p>
              <div class="design-page-theme-toggle-row">
                <button type="button" class="design-page-theme-toggle" data-design-theme-toggle aria-label="Toggle dark mode" aria-pressed="false">
                  <span class="design-page-theme-toggle-track">
                    <span class="design-page-theme-toggle-icon sun" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="2.75" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M8 1.5V3.25M8 12.75V14.5M1.5 8H3.25M12.75 8H14.5M3.4 3.4L4.65 4.65M11.35 11.35L12.6 12.6M12.6 3.4L11.35 4.65M4.65 11.35L3.4 12.6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                      </svg>
                    </span>
                    <span class="design-page-theme-toggle-icon moon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.9 2.35C9.74 2.28 8.59 2.64 7.69 3.39C5.53 5.19 5.24 8.41 7.04 10.57C8.84 12.73 12.06 13.02 14.22 11.22C14.49 10.99 14.73 10.74 14.95 10.47C14.58 12.61 13.42 14.04 11.39 14.67C8.3 15.63 4.93 13.9 3.87 10.8C2.81 7.71 4.54 4.34 7.64 3.28C8.77 2.89 9.95 2.86 10.9 2.35Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span class="design-page-theme-toggle-thumb"></span>
                  </span>
                </button>
              </div>
            </div>
            <div>
              <img src="/images/IMG_0179.jpg" loading="lazy" sizes="(max-width: 767px) 100vw, 320px" srcset="/images/IMG_0179-p-500.jpg 500w, /images/IMG_0179-p-800.jpg 800w, /images/IMG_0179-p-1080.jpg 1080w, /images/IMG_0179.jpg 1429w" alt="Bob Tianqi Wei portrait" class="design-page-about-image">
            </div>
          </div>
        </div>
      </div>
      <div class="design-page-modal-overlay" data-design-cv-modal>
        <div class="design-page-cv-modal" role="dialog" aria-modal="true" aria-labelledby="design-cv-title">
          <button type="button" class="design-page-modal-close" aria-label="Close" data-design-cv-close>&times;</button>
          <div class="design-page-cv-grid">
            <div>
              <div class="design-page-cv-section">
                <h3 id="design-cv-title" class="design-page-cv-section-title">Education</h3>
                <p class="design-page-cv-item"><strong>Massachusetts Institute of Technology, Media Lab</strong><span class="design-page-cv-item-row"><span>M.S. in Human-Computer Interaction</span><span class="design-page-cv-date">2026 - 2028</span></span></p>
                <p class="design-page-cv-item"><strong>University of California, Berkeley</strong><span class="design-page-cv-item-row"><span>M.Des in Human-Computer Interaction</span><span class="design-page-cv-date">2023 - 2024</span></span></p>
                <p class="design-page-cv-item"><strong>Tsinghua University</strong><span class="design-page-cv-item-row"><span>B.A. in Industrial and Product Design</span><span class="design-page-cv-date">2019 - 2023</span></span></p>
              </div>
              <div class="design-page-cv-section">
                <h3 class="design-page-cv-section-title">Experience</h3>
                <p class="design-page-cv-item"><strong>eTopus Technology Inc.</strong><span class="design-page-cv-item-row"><span>Design Engineer</span><span class="design-page-cv-date">Oct 2025 - Jun 2026</span></span></p>
                <p class="design-page-cv-item"><strong>Create, Inc.</strong><span class="design-page-cv-item-row"><span>Frontend Engineer</span><span class="design-page-cv-date">Jul 2025 - Sep 2025</span></span></p>
                <p class="design-page-cv-item"><strong>Berkeley Institute of Design Lab</strong><span class="design-page-cv-item-row"><span>Research Assistant, UC Berkeley EECS</span><span class="design-page-cv-date">Nov 2023 - Jan 2026</span></span></p>
              </div>
            </div>
            <div class="design-page-cv-skills">
              <div class="design-page-cv-section">
                <h3 class="design-page-cv-section-title">Skillset</h3>
                <p class="design-page-cv-item">Interaction Design</p>
                <p class="design-page-cv-item">Product Thinking</p>
                <p class="design-page-cv-item">Design Systems</p>
                <p class="design-page-cv-item">Rapid Prototyping</p>
                <p class="design-page-cv-item">Advanced Prototyping</p>
                <p class="design-page-cv-item">Human-AI Interaction</p>
                <p class="design-page-cv-item">Creative Coding</p>
                <p class="design-page-cv-item">Front-End Prototyping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  function getStoredTheme() {
    var stored = window.localStorage.getItem(themeStorageKey);
    return stored === "light" || stored === "dark" ? stored : null;
  }

  function resolveTheme() {
    return getStoredTheme() || (systemDarkMode.matches ? "dark" : "light");
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    var toggle = document.querySelector("[data-design-theme-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  function toggleThemePreference() {
    var currentTheme = document.documentElement.dataset.theme || resolveTheme();
    var nextTheme = currentTheme === "dark" ? "light" : "dark";
    var systemTheme = systemDarkMode.matches ? "dark" : "light";

    if (nextTheme === systemTheme) {
      window.localStorage.removeItem(themeStorageKey);
    } else {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    }

    applyTheme(nextTheme);
  }

  function wireModal(openSelector, modalSelector, closeSelector) {
    var openTrigger = document.querySelector(openSelector);
    var modal = document.querySelector(modalSelector);
    var closeTrigger = document.querySelector(closeSelector);
    if (!openTrigger || !modal || !closeTrigger) {
      return;
    }

    openTrigger.addEventListener("click", function () {
      modal.classList.add("show");
    });

    closeTrigger.addEventListener("click", function () {
      modal.classList.remove("show");
    });

    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  injectStyles();
  injectMarkup();
  applyTheme(resolveTheme());
  wireModal("[data-design-about-open]", "[data-design-about-modal]", "[data-design-about-close]");
  wireModal("[data-design-cv-open]", "[data-design-cv-modal]", "[data-design-cv-close]");

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    document.querySelectorAll(".design-page-modal-overlay.show").forEach(function (modal) {
      modal.classList.remove("show");
    });
  });

  var themeToggle = document.querySelector("[data-design-theme-toggle]");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleThemePreference);
  }

  systemDarkMode.addEventListener("change", function () {
    if (getStoredTheme()) {
      return;
    }
    applyTheme(resolveTheme());
  });
})();
