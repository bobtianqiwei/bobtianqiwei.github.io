// js/site-chrome.js developed by Bob Tianqi Wei
(function () {
  const navSelector = ".navigation.w-nav";
  const footerSelector = ".footer-wrap";
  const worksPath = "/works/";
  const themeStorageKey = "site-theme-preference";
  const themeStylesheetPath = "/css/theme-toggle.css";
  const themeStylesheetId = "site-theme-stylesheet";
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
    document.documentElement.dataset.siteChromeContext = getCurrentSection(window.location.pathname) || "page";
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
    const toggle = document.querySelector("[data-theme-toggle]");
    if (!toggle) {
      return;
    }

    const eligible = document.documentElement.dataset.themeEnabled === "true";
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
    const toggle = root.querySelector("[data-theme-toggle]");
    if (!toggle || toggle.dataset.bound === "true") {
      return;
    }

    toggle.dataset.bound = "true";
    toggle.addEventListener("click", toggleThemePreference);
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

  systemDarkMode.addEventListener("change", function () {
    if (!getStoredTheme()) {
      applyThemeState();
      updateThemeToggle();
    }
  });
})();
