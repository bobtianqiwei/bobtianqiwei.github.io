// scripts/site-chrome.js developed by Bob Tianqi Wei
const worksIndexPath = "/works/";

function navLink({ href, label, isCurrent }) {
  const ariaCurrent = isCurrent ? ' aria-current="page"' : "";
  const currentClass = isCurrent ? " w--current" : "";
  return `          <a href="${href}"${ariaCurrent} class="navigation-item w-nav-link${currentClass}">${label}</a>`;
}

function renderNav(currentSection = null) {
  const isHome = currentSection === "home";
  return `  <div data-collapse="small" data-animation="over-right" data-duration="400" id="navigation" data-easing="ease" data-easing2="ease" role="banner" class="navigation w-nav">
    <div class="navigation-items">
      <a href="/"${isHome ? ' aria-current="page"' : ""} class="logo-link w-nav-brand${isHome ? " w--current" : ""}"><img src="/images/1b.png" width="42" height="Auto" alt="" sizes="(max-width: 479px) 100vw, 42px" srcset="/images/1b-p-500.png 500w, /images/1b.png 785w" class="logo-image"></a>
      <div class="navigation-wrap">
        <nav role="navigation" class="navigation-items w-nav-menu">
${[
  navLink({ href: "/", label: "Home", isCurrent: currentSection === "home" }),
  navLink({ href: "/vision/", label: "VISION", isCurrent: currentSection === "vision" }),
  navLink({ href: worksIndexPath, label: "WORKs", isCurrent: currentSection === "works" }),
  navLink({ href: "/about/", label: "About", isCurrent: currentSection === "about" })
].join("\n")}
        </nav>
        <div class="menu-button w-nav-button"><img src="/images/menu-icon_1menu-icon.png" width="22" alt="" class="menu-icon"></div>
      </div>
    </div>
  </div>`;
}

function renderFooter() {
  return `  <div class="footer-wrap">
    <div>
      <div>Bob Tianqi Wei&nbsp; 魏 天祺</div>
    </div>
    <div class="footer-links">
      <div class="text-block-83">Copyright © 2024 TIANQI&nbsp;ROBERT WEI. All rights reserved.</div>
    </div>
  </div>`;
}

function inferCurrentSection(relativePath) {
  if (relativePath === "index.html") {
    return "home";
  }
  if (relativePath.startsWith("vision/")) {
    return "vision";
  }
  if (relativePath.startsWith("about/")) {
    return "about";
  }
  if (relativePath.startsWith("works/")) {
    return "works";
  }
  return null;
}

module.exports = {
  inferCurrentSection,
  renderFooter,
  renderNav,
  worksIndexPath
};
