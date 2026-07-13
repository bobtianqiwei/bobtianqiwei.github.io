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

  function renderSection(section) {
    var heading = section.heading ? '<h2 class="vision-reflection-section-heading">' + section.heading + "</h2>" : "";
    var paragraphs = joinParagraphs(section.paragraphs);
    var video = renderVideo(section.video);
    var audio = renderAudio(section.audio);
    var language = section.language
      ? ' data-reflection-language="' + section.language + '" lang="' + section.language + '"'
      : "";

    return '<section class="vision-reflection-section"' + language + ">" +
      heading +
      paragraphs +
      video +
      audio +
      "</section>";
  }

  function renderLanguageSwitch(languages, defaultLanguage, sections) {
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

  renderLanguageSwitch(data.languages, data.defaultLanguage, sections);
})();
