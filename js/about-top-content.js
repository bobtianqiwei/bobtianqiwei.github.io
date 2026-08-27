// about-top-content.js developed by Bob Tianqi Wei
(function () {
  function renderProfile(profile) {
    if (!profile) {
      return;
    }

    const nameElement = document.getElementById("about-profile-name");
    const pronounsElement = document.getElementById("about-profile-pronouns");
    const bioElement = document.getElementById("about-profile-bio");
    const linksElement = document.getElementById("about-profile-links");
    const portraitElement = document.getElementById("about-profile-portrait");
    const portraitCaptionElement = document.getElementById("about-profile-portrait-caption");

    if (nameElement) {
      nameElement.innerHTML = profile.nameHtml || "";
    }

    if (pronounsElement) {
      pronounsElement.innerHTML = profile.pronounsHtml || "";
    }

    if (bioElement) {
      bioElement.innerHTML = profile.bioHtml || "";
    }

    if (linksElement) {
      const links = Array.isArray(profile.links) ? profile.links : [];
      linksElement.innerHTML = links.map(function (item) {
        return '<a href="' + item.href + '" target="_blank" class="about-button w-button">' + item.label + "</a>";
      }).join("");
    }

    if (portraitElement && profile.portrait) {
      const portrait = profile.portrait;
      const front = portrait.front || {};
      const frames = Array.isArray(portrait.frames) ? portrait.frames : [];
      portraitElement.innerHTML = '<img src="' + (front.src || "") + '" loading="eager" fetchpriority="high" sizes="' + (front.sizes || "") + '" srcset="' + (front.srcset || "") + '" alt="" class="image-about-animation">';

      if (frames.length) {
        portraitElement.style.backgroundImage = 'url("' + frames[0] + '")';

        window.aboutPortraitFramesReady = Promise.all(frames.map(function (src) {
          return new Promise(function (resolve) {
            const image = new Image();
            image.fetchPriority = "high";
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
            image.src = src;
          });
        }));

        let currentFrame = 0;
        const updateFrame = function (event) {
          const bounds = portraitElement.getBoundingClientRect();
          const x = event.clientX - bounds.left - bounds.width / 2;
          const y = event.clientY - bounds.top - bounds.height / 2;

          if (x === 0 && y === 0) {
            return;
          }

          const angle = (Math.atan2(x, -y) + Math.PI * 2) % (Math.PI * 2);
          const frame = Math.round(angle / (Math.PI * 2 / frames.length)) % frames.length;

          if (frame !== currentFrame) {
            currentFrame = frame;
            portraitElement.style.backgroundImage = 'url("' + frames[frame] + '")';
          }
        };

        portraitElement.addEventListener("pointerenter", updateFrame);
        portraitElement.addEventListener("pointermove", updateFrame);
      }
    }

    if (portraitCaptionElement && profile.portrait) {
      portraitCaptionElement.textContent = profile.portrait.caption || "";
    }
  }

  function renderCollaborations(containerId, items) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = items.map(function (item) {
      if (item.image) {
        return '<a href="' + item.href + '" target="_blank" class="friends-link-block w-inline-block"><img src="' + item.image.src + '" loading="lazy" alt="" class="' + item.image.className + '"></a>';
      }

      const contentClass = item.customClass || "friends-name";
      const description = item.descriptionHtml ? '<div class="friends-description">' + item.descriptionHtml + "</div>" : "";
      return '<a href="' + item.href + '" target="_blank" class="friends-link-block w-inline-block"><div class="' + contentClass + '">' + item.nameHtml + "</div>" + description + "</a>";
    }).join("");
  }

  function renderFriends(containerId, items) {
    const container = document.getElementById(containerId);

    if (!container) {
      return;
    }

    container.innerHTML = items.map(function (item) {
      return '<a href="' + item.href + '" target="_blank" class="friends-link-block w-inline-block"><div class="friends-name">' + item.name + '</div><div class="friends-description">' + item.descriptionHtml + "</div></a>";
    }).join("");
  }

  function renderNews(container, items, expanded) {
    const visibleCount = expanded ? items.length : Math.min(items.length, 5);
    const visibleItems = items.slice(0, visibleCount);
    const newsHtml = visibleItems.map(function (item) {
      if (typeof item === "string") {
        return item;
      }

      return '<span class="about-news-date">' + item.date + '</span> - ' + item.textHtml;
    }).join("<br>");

    if (items.length <= 5) {
      container.innerHTML = newsHtml;
      return;
    }

    const buttonText = expanded ? "Show less" : "Show more";
    const buttonIconClass = expanded ? "about-news-toggle-icon is-up" : "about-news-toggle-icon";
    container.innerHTML = newsHtml + '<br><button type="button" id="about-news-toggle" class="about-news-toggle"><span>' + buttonText + '</span><span class="' + buttonIconClass + '" aria-hidden="true"></span></button>';

    const toggle = document.getElementById("about-news-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        renderNews(container, items, !expanded);
      });
    }
  }

  const newsContainer = document.getElementById("about-news-list");
  const news = Array.isArray(window.aboutNewsItems) ? window.aboutNewsItems : [];
  const collaborations = Array.isArray(window.aboutCollaborations) ? window.aboutCollaborations : [];
  const friends = Array.isArray(window.aboutFriends) ? window.aboutFriends : [];
  const mentorship = Array.isArray(window.aboutMentorship) ? window.aboutMentorship : [];

  renderProfile(window.aboutProfile || null);

  if (newsContainer) {
    renderNews(newsContainer, news, false);
  }

  renderCollaborations("about-collaborations-list", collaborations);
  renderFriends("about-friends-list", friends);
  renderFriends("about-mentorship-list", mentorship);
})();
