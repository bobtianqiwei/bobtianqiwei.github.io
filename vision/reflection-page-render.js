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

    return '<section class="vision-reflection-section">' +
      heading +
      paragraphs +
      video +
      audio +
      "</section>";
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
})();
