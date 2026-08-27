// about-album-loader.js developed by Bob Tianqi Wei
(function () {
  const template = document.getElementById("about-album-template");
  const container = document.getElementById("about-album-content");

  if (!template || !container) {
    return;
  }

  let requested = false;
  const loadColumn = function (column) {
    const images = Array.from(column.querySelectorAll("img"));
    let index = 0;

    const loadNext = function () {
      const image = images[index];
      index += 1;

      if (!image) {
        return;
      }

      image.addEventListener("load", loadNext, { once: true });
      image.addEventListener("error", loadNext, { once: true });
      image.loading = "eager";

      if (image.dataset.albumSizes) {
        image.setAttribute("sizes", image.dataset.albumSizes);
      }

      if (image.dataset.albumSrcset) {
        image.setAttribute("srcset", image.dataset.albumSrcset);
      }

      image.setAttribute("src", image.dataset.albumSrc);
    };

    loadNext();
  };

  const loadAlbum = function () {
    if (requested) {
      return;
    }

    requested = true;
    Promise.resolve(window.aboutPortraitFramesReady).then(function () {
      const album = template.content.cloneNode(true);
      Array.from(album.querySelectorAll("img")).forEach(function (image) {
        image.dataset.albumSrc = image.getAttribute("src") || "";
        image.dataset.albumSrcset = image.getAttribute("srcset") || "";
        image.dataset.albumSizes = image.getAttribute("sizes") || "";
        image.removeAttribute("src");
        image.removeAttribute("srcset");
        image.removeAttribute("sizes");
      });

      container.appendChild(album);
      template.remove();
      Array.from(container.querySelectorAll(".columns-4 > .w-col")).forEach(loadColumn);
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
