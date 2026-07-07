// js/site-chrome.js developed by Bob Tianqi Wei
(function () {
  const navSelector = ".navigation.w-nav";
  const footerSelector = ".footer-wrap";
  const worksPath = "/works/";
  const bobCatPath = "/works/bobscat/";
  const themeStorageKey = "site-theme-preference";
  const bobCatWidgetEnabledStorageKey = "bob-cat-widget-enabled";
  const themeStylesheetPath = "/css/theme-toggle.css";
  const themeStylesheetId = "site-theme-stylesheet";
  const bobCatWidgetStyleId = "bob-cat-widget-styles";
  const utilityPanelAnimationMs = 520;
  const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

  function normalizePath(pathname) {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.endsWith("/") ? pathname : `${pathname}/`;
  }

  function getCurrentSection(pathname) {
    const normalizedPath = normalizePath(pathname);

    if (normalizedPath === "/") {
      return "home";
    }
    if (normalizedPath.startsWith("/vision/")) {
      return "vision";
    }
    if (normalizedPath.startsWith("/about/")) {
      return "about";
    }
    if (normalizedPath.startsWith(worksPath)) {
      return "works";
    }
    return null;
  }

  function ensureThemeStylesheet() {
    if (document.getElementById(themeStylesheetId)) {
      return;
    }

    const link = document.createElement("link");
    link.id = themeStylesheetId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = themeStylesheetPath;
    document.head.appendChild(link);
  }

  function isThemeEligible() {
    return !document.querySelector(".utility-page-wrap");
  }

  function applyChromeContext() {
    const root = document.documentElement;
    root.dataset.siteChromeContext = "page";

    if (normalizePath(window.location.pathname) === "/works/digital-paradise/") {
      root.dataset.pageTheme = "digital-paradise";
      return;
    }

    root.removeAttribute("data-page-theme");
  }

  function getStoredTheme() {
    const theme = window.localStorage.getItem(themeStorageKey);
    if (theme === "light" || theme === "dark") {
      return theme;
    }
    return null;
  }

  function getResolvedTheme() {
    return getStoredTheme() || (systemDarkMode.matches ? "dark" : "light");
  }

  function getBobCatWidgetEnabled() {
    const stored = window.localStorage.getItem(bobCatWidgetEnabledStorageKey);
    return stored === null ? true : stored === "true";
  }

  function setBobCatWidgetEnabled(isEnabled) {
    window.localStorage.setItem(bobCatWidgetEnabledStorageKey, isEnabled ? "true" : "false");
  }

  function applyThemeState() {
    const eligible = isThemeEligible();
    document.documentElement.dataset.themeEnabled = eligible ? "true" : "false";

    if (!eligible) {
      document.documentElement.removeAttribute("data-theme");
      return;
    }

    document.documentElement.dataset.theme = getResolvedTheme();
  }

  function updateThemeToggle() {
    const toggles = Array.from(document.querySelectorAll("[data-theme-toggle]"));
    if (toggles.length === 0) {
      return;
    }

    const eligible = document.documentElement.dataset.themeEnabled === "true";
    toggles.forEach(function (toggle) {
      if (toggle.classList.contains("site-utility-source")) {
        toggle.hidden = true;
        return;
      }

      toggle.hidden = !eligible;

      if (!eligible) {
        return;
      }

      const currentTheme = document.documentElement.dataset.theme || "light";
      const usingSystem = !getStoredTheme();
      toggle.setAttribute("aria-pressed", currentTheme === "dark" ? "true" : "false");
      toggle.setAttribute(
        "title",
        usingSystem
          ? `Following system (${currentTheme} mode). Click to switch manually.`
          : `Using ${currentTheme} mode. Click to switch.`
      );
    });
  }

  function toggleThemePreference() {
    const currentTheme = document.documentElement.dataset.theme || getResolvedTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const systemTheme = systemDarkMode.matches ? "dark" : "light";

    if (nextTheme === systemTheme) {
      window.localStorage.removeItem(themeStorageKey);
    } else {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    }

    applyThemeState();
    updateThemeToggle();
  }

  function wireThemeToggle(root) {
    root.querySelectorAll("[data-theme-toggle]").forEach(function (toggle) {
      if (toggle.dataset.bound === "true") {
        return;
      }

      toggle.dataset.bound = "true";
      toggle.addEventListener("click", toggleThemePreference);
    });
  }

  function wireBackToTop() {
    if (document.documentElement.dataset.backToTopBound === "true") {
      return;
    }

    document.documentElement.dataset.backToTopBound = "true";
    document.querySelectorAll(".back-to-top").forEach(function (trigger) {
      if (!trigger.getAttribute("title")) {
        trigger.setAttribute("title", "Back to top");
      }
      if (!trigger.getAttribute("aria-label")) {
        trigger.setAttribute("aria-label", "Back to top");
      }
    });
    document.addEventListener("click", function (event) {
      const trigger = event.target.closest(".back-to-top");
      if (
        !trigger ||
        trigger.classList.contains("site-settings-trigger") ||
        trigger.classList.contains("bob-cat-widget-trigger")
      ) {
        return;
      }

      event.preventDefault();
      animateScrollToTop(280);
    });
  }

  function ensureBobCatWidgetStyles() {
    if (document.getElementById(bobCatWidgetStyleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = bobCatWidgetStyleId;
    style.textContent = [
      ".site-utility-stack{position:fixed;z-index:10002;display:flex;flex-direction:column;gap:0;}",
      ".back-to-top.site-utility-source,.theme-toggle.site-utility-source{opacity:0 !important;pointer-events:none !important;}",
      ".site-utility-stack .site-utility-button{position:relative;inset:auto;bottom:auto;right:-11px;opacity:.5;padding-left:6px;padding-right:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;cursor:pointer;color:var(--theme-text);}",
      ".site-utility-stack .site-utility-button:hover{opacity:1;padding-left:11.5px;right:0;}",
      ".site-utility-stack .site-utility-button img.back-to-top-image{width:22px;height:22px;margin-top:11px;margin-right:0;margin-left:0;flex-shrink:0;}",
      ".site-utility-stack .site-utility-button.site-avatar-button img.back-to-top-image{object-fit:cover;filter:none !important;}",
      ".site-utility-stack .site-utility-icon{display:block;flex-shrink:0;width:22px;height:22px;margin-top:11px;margin-right:0;margin-left:0;position:relative;z-index:1;stroke:currentColor;fill:none;transition:color .48s ease,stroke .48s ease;}",
      ".site-utility-stack .site-settings-trigger .site-utility-icon{fill:none;stroke:currentColor;stroke-width:1.7;}",
      ".site-utility-panel{position:fixed;right:15px;border:1px solid rgba(23,23,23,.1);background:rgba(255,255,255,.96);box-shadow:0 18px 50px rgba(23,23,23,.12);backdrop-filter:blur(16px);opacity:0;transform:translateX(26px) scale(.985);transform-origin:bottom right;pointer-events:none;transition:opacity .52s cubic-bezier(.22,1,.36,1),transform .52s cubic-bezier(.22,1,.36,1);overflow:hidden;display:flex;flex-direction:column;will-change:opacity,transform;}",
      "html[data-theme='dark'] .site-utility-panel{border-color:rgba(255,255,255,.1);background:rgba(24,24,24,.96);box-shadow:0 18px 50px rgba(0,0,0,.28);}",
      ".site-utility-stack[data-bobcat-enabled='false'] .bob-cat-widget-trigger{display:none;}",
      ".site-utility-stack.is-bob-open .bob-cat-widget-panel,.site-utility-stack.is-settings-open .site-settings-panel{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}",
      ".bob-cat-widget-panel{width:min(390px,calc(100vw - 24px));height:min(560px,calc(100dvh - 72px));background:rgba(255,255,255,.72);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);}",
      "html[data-theme='dark'] .bob-cat-widget-panel{background:rgba(24,24,24,.72);}",
      ".site-panel-header{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 12px 10px;border-bottom:1px solid rgba(23,23,23,.1);}",
      "html[data-theme='dark'] .site-panel-header{border-bottom-color:rgba(255,255,255,.1);}",
      ".bob-cat-widget-title{display:flex;align-items:center;gap:10px;min-width:0;}",
      ".bob-cat-widget-title img{width:24px;height:24px;object-fit:cover;flex-shrink:0;}",
      ".bob-cat-widget-title span,.site-settings-title{font:400 17px/1 'Montserrat','Open Sans','Helvetica Neue',Arial,sans-serif;color:inherit;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
      ".site-panel-actions{display:flex;align-items:center;gap:6px;}",
      ".site-panel-actions button,.site-panel-actions a,.site-settings-option button{height:28px;padding:0 8px;border:1px solid rgba(23,23,23,.12);background:transparent;color:inherit;font:400 12px/1 'Open Sans','Helvetica Neue',Arial,sans-serif;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;}",
      "html[data-theme='dark'] .site-panel-actions button,html[data-theme='dark'] .site-panel-actions a,html[data-theme='dark'] .site-settings-option button{border-color:rgba(255,255,255,.14);}",
      ".bob-cat-widget-frame{flex:1 1 auto;border:0;width:100%;height:100%;background:transparent;}",
      ".site-settings-panel{width:max-content;max-width:calc(100vw - 24px);}",
      ".site-settings-body{padding:12px;display:flex;flex-direction:column;gap:12px;}",
      ".site-settings-option{display:flex;flex-direction:column;gap:7px;}",
      ".site-settings-label{font:400 11px/1 'Open Sans','Helvetica Neue',Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.7;}",
      ".site-settings-row{display:flex;gap:6px;flex-wrap:wrap;}",
      ".site-settings-option .theme-toggle{align-self:flex-start;}",
      ".site-settings-option .theme-toggle-track::before{content:'☀';}",
      ".site-settings-option .theme-toggle-track::after{content:'☾';}",
      ".site-settings-option .site-bobcat-toggle .theme-toggle-track::before,.site-settings-option .site-bobcat-toggle .theme-toggle-track::after{z-index:2;}",
      ".site-settings-option .site-bobcat-toggle .theme-toggle-track::before{content:'On';font-size:10px;letter-spacing:.02em;left:2px;}",
      ".site-settings-option .site-bobcat-toggle .theme-toggle-track::after{content:'Off';font-size:10px;letter-spacing:.02em;right:2px;}",
      ".site-settings-option .site-bobcat-toggle .theme-toggle-thumb{position:relative;z-index:1;}",
      "html[data-theme-enabled='true'] .site-settings-option .site-bobcat-toggle .theme-toggle-thumb{transform:translateX(24px) !important;}",
      "html[data-theme-enabled='true'] .site-settings-option .site-bobcat-toggle[aria-pressed='true'] .theme-toggle-thumb{transform:translateX(0) !important;}",
      "@media screen and (max-width:767px){.bob-cat-widget-panel{width:calc(100vw - 54px);height:min(64dvh,520px);}.site-settings-panel{right:9px;width:calc(100vw - 18px);}}"
    ].join("");
    document.head.appendChild(style);
  }

  function shouldShowBobCatWidget() {
    return normalizePath(window.location.pathname) !== bobCatPath && !!document.querySelector(".back-to-top");
  }

  function buildBobCatWidgetSrc() {
    const params = new URLSearchParams();
    params.set("embed", "1");
    params.set("contextPath", normalizePath(window.location.pathname));
    params.set("contextTitle", document.title || "Current page");
    return bobCatPath + "?" + params.toString();
  }

  function buildBobCatExpandHref() {
    const params = new URLSearchParams();
    params.set("contextPath", normalizePath(window.location.pathname));
    params.set("contextTitle", document.title || "Current page");
    return bobCatPath + "?" + params.toString();
  }

  function positionUtilityStack(root) {
    const backToTop = document.querySelector(".back-to-top");

    if (!root || !backToTop) {
      return;
    }

    const rect = backToTop.getBoundingClientRect();
    const buttonSize = 45;
    const buttonGap = 0;
    const panelGap = 8;
    const visibleButtonCount = getBobCatWidgetEnabled() ? 3 : 2;
    const right = Math.max(12, window.innerWidth - rect.right);
    const top = Math.max(12, rect.bottom - visibleButtonCount * buttonSize - (visibleButtonCount - 1) * buttonGap);
    const settingsPanel = root.querySelector(".site-settings-panel");
    const bobPanel = root.querySelector(".bob-cat-widget-panel");

    root.style.right = right + "px";
    root.style.top = top + "px";

    if (settingsPanel) {
      settingsPanel.style.right = right + "px";
      settingsPanel.style.bottom = Math.max(12, window.innerHeight - top + panelGap) + "px";
    }

    if (bobPanel) {
      bobPanel.style.right = "45px";
      bobPanel.style.bottom = "12px";
    }
  }

  function wireBobCatWidget() {
    if (!shouldShowBobCatWidget() || document.querySelector(".site-utility-stack")) {
      return;
    }

    ensureBobCatWidgetStyles();

    const root = document.createElement("div");
    root.className = "site-utility-stack";
    root.dataset.bobcatEnabled = getBobCatWidgetEnabled() ? "true" : "false";
    root.innerHTML = [
      '<button type="button" class="back-to-top site-utility-button site-back-to-top-trigger" aria-label="Back to top" title="Back to top">',
      '<img src="/images/回到顶部.png" alt="Back to top" class="back-to-top-image">',
      "</button>",
      '<button type="button" class="back-to-top site-utility-button site-settings-trigger" aria-label="Open settings" title="Open settings">',
      '<svg viewBox="0 0 24 24" aria-hidden="true" class="site-utility-icon" stroke-linecap="round" stroke-linejoin="round">',
      '<path d="M4.5 12a7.5 7.5 0 0 1 .16-1.53l-2-1.55 2-3.46 2.43.98a7.62 7.62 0 0 1 2.65-1.53L10.1 2.5h3.8l.37 2.39a7.62 7.62 0 0 1 2.65 1.53l2.43-.98 2 3.46-2 1.55c.1.5.16 1.01.16 1.53 0 .52-.06 1.03-.16 1.53l2 1.55-2 3.46-2.43-.98a7.62 7.62 0 0 1-2.65 1.53l-.37 2.39h-3.8l-.37-2.39a7.62 7.62 0 0 1-2.65-1.53l-2.43.98-2-3.46 2-1.55A7.5 7.5 0 0 1 4.5 12Z"></path>',
      '<circle cx="12" cy="12" r="3"></circle>',
      "</svg>",
      "</button>",
      '<button type="button" class="back-to-top site-utility-button site-avatar-button bob-cat-widget-trigger" aria-label="Open Bob\'s Cat" title="Open Bob\'s Cat">',
      '<img src="/images/projects/bobscat.jpg" alt="Bob\'s Cat" class="back-to-top-image">',
      "</button>",
      '<div class="site-utility-panel site-settings-panel" hidden>',
      '<div class="site-settings-body">',
      '<div class="site-settings-option"><div class="site-settings-label">Theme</div><button type="button" class="theme-toggle" data-theme-toggle aria-label="Toggle dark mode" aria-pressed="false" title="Toggle dark mode"><span class="theme-toggle-track"><span class="theme-toggle-thumb"></span></span></button></div>',
      '<div class="site-settings-option"><div class="site-settings-label">Bob\'s Cat</div><button type="button" class="theme-toggle site-bobcat-toggle" data-bobcat-toggle aria-label="Toggle Bob\'s Cat" aria-pressed="true" title="Toggle Bob\'s Cat"><span class="theme-toggle-track"><span class="theme-toggle-thumb"></span></span></button></div>',
      "</div>",
      "</div>",
      '<div class="site-utility-panel bob-cat-widget-panel" hidden>',
      '<div class="site-panel-header">',
      '<div class="bob-cat-widget-title"><img src="/images/projects/bobscat.jpg" alt="Bob\'s Cat"><span>Bob\'s Cat</span></div>',
      '<div class="site-panel-actions"><button type="button" class="bob-cat-widget-settings">Settings</button><a href="' + buildBobCatExpandHref() + '" class="bob-cat-widget-expand">Expand</a><button type="button" class="bob-cat-widget-close">Close</button></div>',
      "</div>",
      '<iframe class="bob-cat-widget-frame" title="Bob\'s Cat" loading="lazy" allowtransparency="true"></iframe>',
      "</div>"
    ].join("");

    document.body.appendChild(root);

    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      backToTop.classList.add("site-utility-source");
    }

    document.querySelectorAll("[data-theme-toggle]").forEach(function (themeToggle) {
      if (root.contains(themeToggle)) {
        return;
      }

      themeToggle.classList.add("site-utility-source");
      themeToggle.hidden = true;
    });

    wireThemeToggle(root);
    updateThemeToggle();

    const backToTopTrigger = root.querySelector(".site-back-to-top-trigger");
    const settingsTrigger = root.querySelector(".site-settings-trigger");
    const trigger = root.querySelector(".bob-cat-widget-trigger");
    const settingsPanel = root.querySelector(".site-settings-panel");
    const panel = root.querySelector(".bob-cat-widget-panel");
    const frame = root.querySelector(".bob-cat-widget-frame");
    const bobCatSettingsButton = root.querySelector(".bob-cat-widget-settings");
    const closeButton = root.querySelector(".bob-cat-widget-close");
    const bobCatToggle = root.querySelector("[data-bobcat-toggle]");

    function syncSettingsButtons() {
      const bobCatEnabled = getBobCatWidgetEnabled();

      if (bobCatToggle) {
        bobCatToggle.setAttribute("aria-pressed", bobCatEnabled ? "true" : "false");
        bobCatToggle.setAttribute("title", bobCatEnabled ? "Bob's Cat is on" : "Bob's Cat is off");
      }

      root.dataset.bobcatEnabled = bobCatEnabled ? "true" : "false";
    }

    function openPanel() {
      closeSettings();
      if (!frame.getAttribute("src")) {
        frame.setAttribute("src", buildBobCatWidgetSrc());
      }
      panel.hidden = false;
      void panel.offsetWidth;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          root.classList.add("is-bob-open");
        });
      });
      positionUtilityStack(root);
    }

    function closePanel() {
      root.classList.remove("is-bob-open");
      window.setTimeout(function () {
        if (!root.classList.contains("is-bob-open")) {
          panel.hidden = true;
        }
      }, utilityPanelAnimationMs);
    }

    function openSettings() {
      closePanel();
      syncSettingsButtons();
      settingsPanel.hidden = false;
      void settingsPanel.offsetWidth;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          root.classList.add("is-settings-open");
        });
      });
      positionUtilityStack(root);
    }

    function closeSettings() {
      root.classList.remove("is-settings-open");
      window.setTimeout(function () {
        if (!root.classList.contains("is-settings-open")) {
          settingsPanel.hidden = true;
        }
      }, utilityPanelAnimationMs);
    }

    backToTopTrigger.addEventListener("click", function () {
      animateScrollToTop(280);
    });

    settingsTrigger.addEventListener("click", function () {
      if (root.classList.contains("is-settings-open")) {
        closeSettings();
        return;
      }
      openSettings();
    });

    trigger.addEventListener("click", function () {
      if (!getBobCatWidgetEnabled()) {
        return;
      }

      if (root.classList.contains("is-bob-open")) {
        closePanel();
        return;
      }
      openPanel();
    });

    closeButton.addEventListener("click", closePanel);
    bobCatSettingsButton.addEventListener("click", function () {
      if (!frame.contentWindow) {
        return;
      }

      frame.contentWindow.postMessage({ type: "bob-cat-toggle-settings" }, window.location.origin);
    });

    if (bobCatToggle) {
      bobCatToggle.addEventListener("click", function () {
        const enabled = bobCatToggle.getAttribute("aria-pressed") !== "true";
        setBobCatWidgetEnabled(enabled);
        if (!enabled) {
          closePanel();
        }
        syncSettingsButtons();
        positionUtilityStack(root);
      });
    }

    document.addEventListener("click", function (event) {
      if (!root.classList.contains("is-bob-open") && !root.classList.contains("is-settings-open")) {
        return;
      }
      if (event.target.closest(".site-utility-stack")) {
        return;
      }
      closePanel();
      closeSettings();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && root.classList.contains("is-bob-open")) {
        closePanel();
      }
      if (event.key === "Escape" && root.classList.contains("is-settings-open")) {
        closeSettings();
      }
    });

    const reposition = function () {
      positionUtilityStack(root);
    };

    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, { passive: true });
    syncSettingsButtons();
    positionUtilityStack(root);
  }

  function animateScrollToTop(duration) {
    const startY = window.scrollY || document.documentElement.scrollTop || 0;
    if (startY <= 0) {
      return;
    }

    const startTime = performance.now();
    const easeOutCubic = function (t) {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = function (now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      window.scrollTo(0, Math.round(startY * (1 - eased)));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  function applyPageFade() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.dataset.pageFade = "done";
      return;
    }

    const selector = [
      "main > *",
      "article > *",
      ".section > *",
      ".work-detail-page-container > *",
      ".work-page-div-block > *",
      ".div-block-12 > *",
      ".div-block-5 > *",
      ".w-row > *",
      ".w-col > *",
      ".w-layout-grid > *",
      ".w-layout-hflex > *",
      "main img",
      "main h1",
      "main h2",
      "main h3",
      "main p",
      "main a",
      "article img",
      "article h1",
      "article h2",
      "article h3",
      "article p",
      "article a"
    ].join(", ");

    const items = Array.from(document.querySelectorAll(selector)).filter((element) => {
      if (element.closest(".navigation, .footer-wrap, .background-video, .w-nav-overlay")) {
        return false;
      }
      if (element.matches(".back-to-top, .back-to-top-image, .all-works-section")) {
        return false;
      }
      if (element.classList.contains("page-fade-item")) {
        return false;
      }
      return true;
    });

    items.forEach((element, index) => {
      element.classList.add("page-fade-item");
      element.style.transitionDelay = `${Math.min(index * 0.015, 0.18)}s`;
    });

    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        items.forEach((element) => {
          element.classList.add("is-visible");
        });
        document.documentElement.dataset.pageFade = "done";
        window.setTimeout(function () {
          items.forEach((element) => {
            element.style.transitionDelay = "";
          });
        }, 220);
      });
    });
  }

  function loadPartial(partialPath) {
    const request = new XMLHttpRequest();
    request.open("GET", partialPath, false);
    request.send(null);

    if (request.status >= 200 && request.status < 400) {
      return request.responseText;
    }

    return null;
  }

  function htmlToElement(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function clearCurrentState(navRoot) {
    navRoot.querySelectorAll(".navigation-item.w-nav-link").forEach((link) => {
      link.classList.remove("w--current");
      link.removeAttribute("aria-current");
    });

    const logoLink = navRoot.querySelector(".logo-link.w-nav-brand");
    if (logoLink) {
      logoLink.classList.remove("w--current");
      logoLink.removeAttribute("aria-current");
    }
  }

  function applyCurrentState(navRoot) {
    const currentSection = getCurrentSection(window.location.pathname);
    clearCurrentState(navRoot);

    const logoLink = navRoot.querySelector('.logo-link.w-nav-brand[href="/"]');
    if (currentSection === "home" && logoLink) {
      logoLink.classList.add("w--current");
      logoLink.setAttribute("aria-current", "page");
    }

    const currentHref = {
      home: "/",
      vision: "/vision/",
      works: worksPath,
      about: "/about/"
    }[currentSection];

    if (!currentHref) {
      return;
    }

    const currentLink = navRoot.querySelector(`.navigation-item.w-nav-link[href="${currentHref}"]`);
    if (currentLink) {
      currentLink.classList.add("w--current");
      currentLink.setAttribute("aria-current", "page");
    }
  }

  function replaceAll(selector, html, afterReplace) {
    if (!html) {
      return;
    }

    document.querySelectorAll(selector).forEach((node) => {
      const replacement = htmlToElement(html);
      if (!replacement) {
        return;
      }

      if (afterReplace) {
        afterReplace(replacement);
      }

      node.replaceWith(replacement);
    });
  }

  if (!document.querySelector(navSelector) && !document.querySelector(footerSelector)) {
    return;
  }

  ensureThemeStylesheet();
  applyChromeContext();
  applyThemeState();

  const navHtml = loadPartial("/partials/nav.html");
  const footerHtml = loadPartial("/partials/footer.html");

  replaceAll(navSelector, navHtml, applyCurrentState);
  replaceAll(footerSelector, footerHtml, wireThemeToggle);
  updateThemeToggle();
  wireBackToTop();
  wireBobCatWidget();
  applyPageFade();

  systemDarkMode.addEventListener("change", function () {
    if (!getStoredTheme()) {
      applyThemeState();
      updateThemeToggle();
    }
  });
})();
