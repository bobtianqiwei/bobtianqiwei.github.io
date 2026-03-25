// vision/vision-library-render.js developed by Bob Tianqi Wei
(function () {
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

  var data = window.VISION_LIBRARY_DATA || {};
  renderList("vision-reading-list", data.furtherReading);
  renderList("vision-reflection-list", data.reflections);
})();
