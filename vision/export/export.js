// vision/export/export.js developed by Bob Tianqi Wei
(function () {
  var controls = document.getElementById("export-controls");
  var articleSelect = document.getElementById("article");
  var frame = document.getElementById("export-frame");
  var generateButton = controls.querySelector(".export-generate");
  var progress = document.getElementById("export-progress");
  var results = document.getElementById("export-results");
  var resultGrid = document.getElementById("export-grid");
  var resultCount = document.getElementById("export-count");
  var downloadAllButton = document.getElementById("download-all");
  var generatedFiles = [];

  function wait(milliseconds) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, milliseconds);
    });
  }

  function nextFrame(documentWindow) {
    return new Promise(function (resolve) {
      documentWindow.requestAnimationFrame(function () {
        documentWindow.requestAnimationFrame(resolve);
      });
    });
  }

  function loadArticle(url) {
    return new Promise(function (resolve, reject) {
      var timeout = window.setTimeout(function () {
        reject(new Error("The article took too long to load."));
      }, 15000);

      frame.onload = function () {
        window.clearTimeout(timeout);
        resolve();
      };
      frame.src = url + "?export=" + Date.now();
    });
  }

  function splitImageGroup(node) {
    var grid = node.querySelector(".vision-reflection-placeholder-grid");
    var items = grid ? Array.from(grid.querySelectorAll(":scope > .vision-reflection-image-item")) : [];

    if (items.length < 2) {
      return [node.cloneNode(true)];
    }

    return items.map(function (item) {
      var figure = node.cloneNode(false);
      var singleGrid = grid.cloneNode(false);

      singleGrid.className = singleGrid.className.replace(/vision-reflection-placeholder-grid-[123]/g, "");
      singleGrid.classList.add("vision-reflection-placeholder-grid-1");
      singleGrid.appendChild(item.cloneNode(true));
      figure.appendChild(singleGrid);
      return figure;
    });
  }

  async function waitForImages(articleDocument, section) {
    var images = Array.from(section.querySelectorAll("img"));

    images.forEach(function (image) {
      image.loading = "eager";
    });

    await Promise.all(images.map(function (image) {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise(function (resolve) {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    }));

    if (articleDocument.fonts) {
      await Promise.race([articleDocument.fonts.ready, wait(2000)]);
    }
  }

  async function paginate(theme) {
    var articleDocument = frame.contentDocument;
    var articleWindow = frame.contentWindow;
    var chineseButton = articleDocument.querySelector('[data-language="zh"]');

    if (!chineseButton) {
      throw new Error("This article does not have a Chinese version.");
    }

    chineseButton.click();
    articleDocument.documentElement.dataset.theme = theme;
    articleDocument.documentElement.lang = "zh-CN";
    await wait(350);

    var activeSection = articleDocument.querySelector('[data-reflection-language="zh"]');
    var sourceHeader = articleDocument.querySelector(".vision-reflection-shell > header");
    var sourceDivider = articleDocument.querySelector(".vision-reflection-shell > .vision-reflection-divider");

    if (!activeSection || !sourceHeader) {
      throw new Error("The Vision article layout could not be found.");
    }

    await waitForImages(articleDocument, activeSection);

    var style = articleDocument.createElement("style");
    style.textContent = [
      "html,body{width:360px!important;height:640px!important;margin:0!important;overflow:hidden!important;background:var(--theme-bg)!important;}",
      ".xhs-pages{width:360px;height:640px;}",
      ".xhs-page{position:relative;width:360px;height:640px;padding:32px 20px 36px;box-sizing:border-box;overflow:hidden;background:var(--theme-bg);color:var(--theme-text);}",
      ".xhs-page-content{height:572px;overflow:hidden;}",
      ".xhs-flow{width:320px;height:572px;column-width:320px;column-gap:40px;column-fill:auto;transition:none!important;}",
      ".xhs-flow.vision-reflection-section{margin:0;}",
      ".xhs-page-number{position:absolute;right:20px;bottom:13px;color:var(--theme-muted);font-family:Montserrat,sans-serif;font-size:9px;font-weight:400;letter-spacing:.08em;}",
      ".vision-reflection-section.is-language-active>p{animation:none!important;}",
      ".xhs-flow>header,.xhs-flow>.vision-reflection-divider,.vision-reflection-placeholder-group{break-inside:avoid-column;}",
      ".xhs-flow>h2,.xhs-flow>h3{break-after:avoid-column;}",
      ".vision-reflection-image{width:100%;height:auto;}",
      ".vision-reflection-related,.all-works-section,.footer-wrap,#navigation{display:none!important;}"
    ].join("");
    articleDocument.head.appendChild(style);

    var blocks = [];
    Array.from(activeSection.children).forEach(function (child) {
      if (child.matches(".vision-reflection-placeholder-group")) {
        blocks.push.apply(blocks, splitImageGroup(child));
      } else {
        blocks.push(child.cloneNode(true));
      }
    });

    articleDocument.body.innerHTML = "";
    var pages = articleDocument.createElement("main");
    pages.className = "xhs-pages";
    articleDocument.body.appendChild(pages);

    var page = articleDocument.createElement("section");
    var content = articleDocument.createElement("div");
    var flow = articleDocument.createElement("div");

    page.className = "xhs-page";
    content.className = "xhs-page-content";
    flow.className = "xhs-flow vision-reflection-section is-language-active";
    flow.dataset.reflectionLanguage = "zh";
    flow.lang = "zh";
    content.appendChild(flow);
    page.appendChild(content);
    pages.appendChild(page);

    flow.appendChild(sourceHeader.cloneNode(true));
    if (sourceDivider) {
      flow.appendChild(sourceDivider.cloneNode(true));
    }

    blocks.forEach(function (block) {
      flow.appendChild(block);
    });

    var pageNumber = articleDocument.createElement("div");
    pageNumber.className = "xhs-page-number";
    page.appendChild(pageNumber);

    await nextFrame(articleWindow);
    var pageCount = Math.max(1, Math.round((flow.scrollWidth + 40) / 360));
    pageNumber.textContent = "1 / " + pageCount;

    return {
      flow: flow,
      page: page,
      pageCount: pageCount,
      pageNumber: pageNumber,
      window: articleWindow
    };
  }

  function canvasToBlob(canvas) {
    return new Promise(function (resolve) {
      canvas.toBlob(resolve, "image/png");
    });
  }

  function addResult(file, index) {
    var card = document.createElement("article");
    var image = document.createElement("img");
    var meta = document.createElement("div");
    var number = document.createElement("span");
    var download = document.createElement("a");

    card.className = "export-card";
    meta.className = "export-card-meta";
    image.src = file.url;
    image.alt = "Exported page " + (index + 1);
    number.textContent = String(index + 1).padStart(2, "0");
    download.href = file.url;
    download.download = file.name;
    download.textContent = "DOWNLOAD";
    meta.appendChild(number);
    meta.appendChild(download);
    card.appendChild(image);
    card.appendChild(meta);
    resultGrid.appendChild(card);
  }

  function clearResults() {
    generatedFiles.forEach(function (file) {
      URL.revokeObjectURL(file.url);
    });
    generatedFiles = [];
    resultGrid.innerHTML = "";
    results.hidden = true;
  }

  controls.addEventListener("submit", async function (event) {
    event.preventDefault();
    clearResults();
    generateButton.disabled = true;
    progress.textContent = "LOADING ARTICLE";

    try {
      var theme = controls.elements.theme.value;
      var slug = articleSelect.value.split("/").filter(Boolean).pop();
      await loadArticle(articleSelect.value);
      var layout = await paginate(theme);

      for (var index = 0; index < layout.pageCount; index += 1) {
        progress.textContent = "GENERATING " + (index + 1) + " / " + layout.pageCount;
        layout.flow.style.transform = "translateX(" + (-360 * index) + "px)";
        layout.pageNumber.textContent = (index + 1) + " / " + layout.pageCount;
        await nextFrame(layout.window);
        var canvas = await window.html2canvas(layout.page, {
          backgroundColor: theme === "dark" ? "#141414" : "#ffffff",
          logging: false,
          scale: 3,
          useCORS: true,
          width: 360,
          height: 640
        });
        var blob = await canvasToBlob(canvas);
        var filename = slug + "-" + String(index + 1).padStart(2, "0") + ".png";
        var file = { name: filename, blob: blob, url: URL.createObjectURL(blob) };

        generatedFiles.push(file);
        addResult(file, index);
      }

      resultCount.textContent = layout.pageCount + " IMAGES · 1080 × 1920";
      results.hidden = false;
      progress.textContent = "READY";
    } catch (error) {
      progress.textContent = error.message.toUpperCase();
    } finally {
      generateButton.disabled = false;
    }
  });

  downloadAllButton.addEventListener("click", async function () {
    if (!generatedFiles.length) {
      return;
    }

    downloadAllButton.disabled = true;
    downloadAllButton.textContent = "PREPARING";

    try {
      var archive = new window.JSZip();
      generatedFiles.forEach(function (file) {
        archive.file(file.name, file.blob);
      });
      var blob = await archive.generateAsync({ type: "blob" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      var slug = articleSelect.value.split("/").filter(Boolean).pop();

      link.href = url;
      link.download = slug + "-xiaohongshu.zip";
      link.click();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    } finally {
      downloadAllButton.disabled = false;
      downloadAllButton.textContent = "DOWNLOAD ALL";
    }
  });
})();
