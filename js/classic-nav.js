// classic-nav.js developed by Bob Tianqi Wei
(function () {
  var navRoots = document.querySelectorAll("[data-classic-nav]");

  if (!navRoots.length) {
    return;
  }

  var navHtml = [
    '<div class="nav">',
    '  <a href="/swe/classic/">Home</a>',
    '  <a href="/about/">About</a>',
    '  <a href="/works/">Works</a>',
    '  <a href="/engresume/">Resume</a>',
    '  <a href="https://github.com/bobtianqiwei" target="_blank" rel="noreferrer">GitHub</a>',
    '  <a href="https://www.linkedin.com/in/bobtianqiwei/" target="_blank" rel="noreferrer">LinkedIn</a>',
    '</div>'
  ].join("");

  navRoots.forEach(function (navRoot) {
    navRoot.innerHTML = navHtml;
  });
})();
