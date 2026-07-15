// vision/reflection-page-render.js developed by Bob Tianqi Wei
(function () {
  function joinParagraphs(paragraphs) {
    if (!Array.isArray(paragraphs) || !paragraphs.length) {
      return "";
    }

    return paragraphs.map(function (paragraph) {
      return "<p>" + paragraph + "</p>";
    }).join("");
  }

  function renderVideo(video) {
    if (!video || !video.src) {
      return "";
    }

    var caption = video.caption ? '<p class="vision-reflection-media-caption">' + video.caption + "</p>" : "";
    var allow = video.allow || "autoplay; encrypted-media";

    return '<div class="vision-reflection-media-block">' +
      '<div class="vision-reflection-video-frame">' +
      '<iframe src="' + video.src + '" frameborder="0" allow="' + allow + '" allowfullscreen="" title="' + (video.title || "Reflection video") + '"></iframe>' +
      "</div>" +
      caption +
      "</div>";
  }

  function renderAudio(audio) {
    if (!audio || !audio.src) {
      return "";
    }

    var caption = audio.caption ? '<p class="vision-reflection-media-caption">' + audio.caption + "</p>" : "";

    return '<div class="vision-reflection-media-block">' +
      '<audio class="vision-reflection-audio" controls preload="metadata" aria-label="' + (audio.title || "Reflection audio") + '">' +
      '<source src="' + audio.src + '">' +
      "Your browser does not support the audio element." +
      "</audio>" +
      caption +
      "</div>";
  }

  function renderBlock(block) {
    if (!block || !block.type) {
      return "";
    }

    if (block.type === "paragraph") {
      return "<p>" + (block.text || "") + "</p>";
    }

    if (block.type === "quote") {
      return '<blockquote class="vision-reflection-quote"><p>' + (block.text || "") + "</p></blockquote>";
    }

    if (block.type === "heading") {
      return '<h2 class="vision-reflection-section-heading vision-reflection-block-heading">' + (block.text || "") + "</h2>";
    }

    if (block.type === "subheading") {
      return '<h3 class="vision-reflection-subheading">' + (block.text || "") + "</h3>";
    }

    if (block.type === "list") {
      var listTag = block.ordered ? "ol" : "ul";
      var items = Array.isArray(block.items) ? block.items : [];

      return "<" + listTag + ' class="vision-reflection-list">' + items.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("") + "</" + listTag + ">";
    }

    if (block.type === "imagePlaceholder") {
      var placeholders = Array.isArray(block.items) && block.items.length ? block.items : ["PHOTO"];
      var columnCount = Math.min(placeholders.length, 3);

      return '<figure class="vision-reflection-placeholder-group">' +
        '<div class="vision-reflection-placeholder-grid vision-reflection-placeholder-grid-' + columnCount + '">' +
        placeholders.map(function (label) {
          return '<div class="vision-reflection-placeholder">' + label + "</div>";
        }).join("") +
        "</div>" +
        (block.caption ? '<figcaption class="vision-reflection-placeholder-caption">' + block.caption + "</figcaption>" : "") +
        "</figure>";
    }

    if (block.type === "images") {
      var images = Array.isArray(block.items) ? block.items : [];
      var imageColumnCount = Math.min(Math.max(images.length, 1), 3);

      return '<figure class="vision-reflection-placeholder-group">' +
        '<div class="vision-reflection-placeholder-grid vision-reflection-placeholder-grid-' + imageColumnCount + '">' +
        images.map(function (image) {
          return '<img class="vision-reflection-image" src="' + image.src + '" alt="' + (image.alt || "") + '" loading="lazy" decoding="async">';
        }).join("") +
        "</div>" +
        (block.caption ? '<figcaption class="vision-reflection-placeholder-caption">' + block.caption + "</figcaption>" : "") +
        "</figure>";
    }

    return "";
  }

  function renderBlocks(blocks) {
    return Array.isArray(blocks) ? blocks.map(renderBlock).join("") : "";
  }

  function renderSection(section) {
    var heading = section.heading ? '<h2 class="vision-reflection-section-heading">' + section.heading + "</h2>" : "";
    var paragraphs = joinParagraphs(section.paragraphs);
    var blocks = renderBlocks(section.blocks);
    var video = renderVideo(section.video);
    var audio = renderAudio(section.audio);
    var language = section.language
      ? ' data-reflection-language="' + section.language + '" lang="' + section.language + '"'
      : "";

    return '<section class="vision-reflection-section"' + language + ">" +
      heading +
      paragraphs +
      blocks +
      video +
      audio +
      "</section>";
  }

  function renderLanguageSwitch(languages, defaultLanguage, sections, title) {
    if (!Array.isArray(languages) || languages.length < 2 || !sections) {
      return;
    }

    var options = languages.filter(function (language) {
      return language && language.code && language.label;
    });

    if (options.length < 2) {
      return;
    }

    var selectedLanguage = options.some(function (language) {
      return language.code === defaultLanguage;
    }) ? defaultLanguage : options[0].code;
    var firstLanguageSection = sections.querySelector("[data-reflection-language]");
    var switcher = document.createElement("div");

    if (!firstLanguageSection) {
      return;
    }

    switcher.className = "vision-reflection-language-switch";
    switcher.setAttribute("role", "group");
    switcher.setAttribute("aria-label", "Article language");

    function selectLanguage(languageCode) {
      var selectedIndex = options.findIndex(function (language) {
        return language.code === languageCode;
      });
      var selectedOption = options[selectedIndex];
      var isFirstActiveSection = true;

      if (selectedOption.title && title) {
        title.textContent = selectedOption.title;
        document.title = selectedOption.title + " - Bob Tianqi Wei";
      }

      switcher.style.setProperty("--vision-reflection-language-offset", selectedIndex * 40 + "px");
      switcher.querySelectorAll("button").forEach(function (button) {
        button.setAttribute("aria-pressed", button.dataset.language === languageCode ? "true" : "false");
      });

      sections.querySelectorAll("[data-reflection-language]").forEach(function (section) {
        var isActive = section.dataset.reflectionLanguage === languageCode;
        var paragraphIndex = 0;

        Array.prototype.forEach.call(section.children, function (child) {
          if (child.tagName === "P") {
            child.style.setProperty("--vision-reflection-language-delay", paragraphIndex * 45 + "ms");
            paragraphIndex += 1;
          }
        });

        section.hidden = !isActive;
        section.classList.toggle("is-language-active", isActive);
        section.classList.toggle("is-language-first", isActive && isFirstActiveSection);

        if (isActive) {
          isFirstActiveSection = false;
        }
      });
    }

    options.forEach(function (language) {
      var button = document.createElement("button");

      button.type = "button";
      button.className = "vision-reflection-language-button";
      button.dataset.language = language.code;
      button.textContent = language.label;
      button.addEventListener("click", function () {
        selectLanguage(language.code);
      });
      switcher.appendChild(button);
    });

    sections.classList.add("vision-reflection-has-language-switch");
    sections.insertBefore(switcher, firstLanguageSection);
    selectLanguage(selectedLanguage);
  }

  function loadLanguageFonts(languages) {
    var usesChinese = Array.isArray(languages) && languages.some(function (language) {
      return language && typeof language.code === "string" && language.code.indexOf("zh") === 0;
    });

    if (usesChinese && window.WebFont) {
      window.WebFont.load({
        google: {
          families: ["Noto Sans SC:300,400"]
        }
      });
    }
  }

  var data = window.VISION_REFLECTION_CONTENT || {};
  var title = document.querySelector("[data-reflection-title]");
  var subtitle = document.querySelector("[data-reflection-subtitle]");
  var intro = document.querySelector("[data-reflection-intro]");
  var sections = document.querySelector("[data-reflection-sections]");

  if (data.title) {
    document.title = data.title + " - Bob Tianqi Wei";
  }

  if (title) {
    title.textContent = data.title || "";
  }

  if (subtitle) {
    subtitle.textContent = [data.author, data.date].filter(Boolean).join(" · ");
  }

  if (intro) {
    intro.innerHTML = joinParagraphs(data.intro);
  }

  if (sections) {
    sections.innerHTML = Array.isArray(data.sections)
      ? data.sections.map(renderSection).join("")
      : "";
  }

  loadLanguageFonts(data.languages);
  renderLanguageSwitch(data.languages, data.defaultLanguage, sections, title);
})();
