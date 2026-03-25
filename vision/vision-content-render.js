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

    var link = document.createElement("a");
    link.className = "vision-resource-link";
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    var title = document.createElement("div");
    title.className = "vision-resource-title";
    title.textContent = item.title;

    var author = document.createElement("div");
    author.className = "vision-resource-meta";
    author.textContent = item.author;

    link.appendChild(title);
    link.appendChild(author);
    article.appendChild(link);
    return article;
  }

  function renderList(containerId, items) {
    var container = document.getElementById(containerId);
    if (!container || !Array.isArray(items)) {
      return;
    }

    container.innerHTML = "";
    items.forEach(function (item) {
      container.appendChild(buildCard(item));
    });
  }

  var data = window.VISION_CONTENT_DATA || {};
  renderVisionSection(data.visionSection);
  renderList("vision-reading-list", data.furtherReading);
  renderList("vision-reflection-list", data.reflections);
})();
