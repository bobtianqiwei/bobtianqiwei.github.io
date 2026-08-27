// about-album-loader.js developed by Bob Tianqi Wei
(function () {
  const template = document.getElementById("about-album-template");
  const container = document.getElementById("about-album-content");

  if (!template || !container) {
    return;
  }

  let requested = false;
  const loadAlbum = function () {
    if (requested) {
      return;
    }

    requested = true;
    Promise.resolve(window.aboutPortraitFramesReady).then(function () {
      container.appendChild(template.content.cloneNode(true));
      template.remove();
    });
  };

  if (!("IntersectionObserver" in window)) {
    loadAlbum();
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    if (!entries.some(function (entry) { return entry.isIntersecting; })) {
      return;
    }

    observer.disconnect();
    loadAlbum();
  }, { rootMargin: "300px 0px" });

  observer.observe(container);
})();
