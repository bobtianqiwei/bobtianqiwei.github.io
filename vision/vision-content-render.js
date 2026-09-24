// vision/vision-content-render.js developed by Bob Tianqi Wei
(function () {
  function renderVisionSection(sectionData) {
    var section = document.getElementById("shared-vision-section") || document.getElementById("design-vision");
    if (!section || !sectionData) {
      return;
    }

    var image = section.querySelector("[data-vision-image]");
    var caption = section.querySelector("[data-vision-caption]");
    var references = section.querySelector("[data-vision-references]");
    var heading = section.querySelector("[data-vision-heading]");
    var body = section.querySelector("[data-vision-body]");

    if (image && sectionData.image) {
      image.src = sectionData.image.src;
      image.sizes = sectionData.image.sizes;
      image.srcset = sectionData.image.srcset;
      image.alt = sectionData.image.alt;
    }

    if (caption) {
      caption.textContent = sectionData.caption || "";
    }

    if (references) {
      if (Array.isArray(sectionData.references)) {
        references.innerHTML = sectionData.references.join("<br>");
      } else {
        references.innerHTML = sectionData.referencesHtml || "";
      }
    }

    if (heading) {
      heading.textContent = sectionData.heading || "";
    }

    if (body) {
      if (Array.isArray(sectionData.bodyParagraphs)) {
        body.innerHTML = sectionData.bodyParagraphs.join("<br><br>");
      } else {
        body.innerHTML = sectionData.bodyHtml || "";
      }
    }
  }

  function buildCard(item) {
    var article = document.createElement("article");
    article.className = "vision-resource-card";
    article.classList.add(item.image ? "vision-resource-card-featured" : "vision-resource-card-compact");

    var link = document.createElement("a");
    link.className = "vision-resource-link";
    link.href = item.href;
    var isExternal = /^https?:\/\//.test(item.href || "");

    if (isExternal) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

    var title = document.createElement("div");
    title.className = "vision-resource-title";
    title.textContent = item.title;

    var author = document.createElement("div");
    author.className = "vision-resource-meta";
    author.textContent = [item.author, item.date].filter(Boolean).join(" · ");

    if (item.image) {
      var image = document.createElement("img");
      image.className = "vision-resource-image";
      image.src = item.image.src;
      image.alt = item.image.alt || "";
      image.loading = "lazy";
      image.decoding = "async";

      var copy = document.createElement("div");
      copy.className = "vision-resource-copy";
      copy.appendChild(title);
      copy.appendChild(author);

      link.classList.add("vision-resource-link-with-image");
      link.appendChild(image);
      link.appendChild(copy);
    } else {
      link.appendChild(title);
      link.appendChild(author);
    }
    article.appendChild(link);
    return article;
  }

  function updateDenseGrid(container) {
    var styles = window.getComputedStyle(container);
    var rowHeight = parseFloat(styles.gridAutoRows);
    var rowGap = parseFloat(styles.rowGap) || 0;
    var visualGap = parseFloat(styles.getPropertyValue("--vision-dense-gap")) || rowGap;
    var cards = Array.prototype.slice.call(container.children);
    var columnCount = styles.gridTemplateColumns.split(/\s+/).filter(Boolean).length;

    cards.forEach(function (card, index) {
      card.style.gridColumnStart = columnCount > 1
        ? String(index % columnCount + 1)
        : "";
    });

    if (!Number.isFinite(rowHeight)) {
      cards.forEach(function (card) {
        card.style.gridRowEnd = "";
      });
      return;
    }

    cards.forEach(function (card) {
      card.style.gridRowEnd = "auto";
    });

    cards.forEach(function (card) {
      var cardHeight = card.getBoundingClientRect().height;
      var rowSpan = Math.ceil((cardHeight + visualGap) / (rowHeight + rowGap));
      card.style.gridRowEnd = "span " + rowSpan;
    });
  }

  function initializeDenseGrid(container) {
    var update = function () {
      window.requestAnimationFrame(function () {
        updateDenseGrid(container);
      });
    };

    container.querySelectorAll("img").forEach(function (image) {
      if (!image.complete) {
        image.addEventListener("load", update, { once: true });
      }
    });

    window.addEventListener("resize", update);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update);
    }

    update();
  }

  function renderList(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container || !Array.isArray(items)) {
      return;
    }

    var listItems = items.slice();

    if (containerId === "vision-reflection-list") {
      listItems.sort(function (a, b) {
        var timeA = Date.parse(a.sortDate || a.date || "") || 0;
        var timeB = Date.parse(b.sortDate || b.date || "") || 0;
        return timeB - timeA;
      });
    }

    container.innerHTML = "";
    listItems.forEach(function (item) {
      container.appendChild(buildCard(item));
    });

    initializeDenseGrid(container);
  }

  var data = window.VISION_CONTENT_DATA || {};
  renderVisionSection(data.visionSection);
  renderList("vision-reading-list", data.furtherReading);
  renderList("vision-reflection-list", data.reflections);
})();
