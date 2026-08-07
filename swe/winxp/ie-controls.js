// ie-controls.js developed by Bob Tianqi Wei
(function () {
  "use strict";

  var HOME_URL = "/swe/classic/";
  var FAVORITES_KEY = "swe-winxp-ie-favorites";

  function bindInternetExplorerControls() {
    var iframe = document.querySelector('.ie__content iframe[src="/swe/classic/"]');
    var toolbar = document.querySelector(".ie__function_bar");
    var addressText = document.querySelector(".ie__address_bar__content__text");
    var addressDropdown = document.querySelector(".ie__address_bar__content__img:last-child");
    var goButton = document.querySelector(".ie__address_bar__go");
    var linksButton = document.querySelector(".ie__address_bar__links");
    var content = document.querySelector(".ie__content");
    var statusText = document.querySelector(".ie__footer__status__text");
    var historyEntries = [];
    var historyIndex = -1;
    var historyNavigation = false;
    var editMode = false;
    var buttons;

    if (!iframe || !toolbar || !addressText || !addressDropdown || !goButton || !linksButton || !content) {
      return false;
    }

    if (toolbar.dataset.controlsBound === "true") {
      return true;
    }

    buttons = Array.prototype.filter.call(toolbar.children, function (item) {
      return item.className.indexOf("ie__function_bar__button") !== -1;
    });

    if (buttons.length < 12) {
      return false;
    }

    toolbar.dataset.controlsBound = "true";
    addressText.setAttribute("contenteditable", "true");
    addressText.setAttribute("role", "textbox");
    addressText.setAttribute("aria-label", "Address");
    addressText.setAttribute("spellcheck", "false");

    function setStatus(message) {
      if (statusText) {
        statusText.textContent = message;
      }
    }

    function bindActionKey(element, handler) {
      element.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handler();
        }
      });
    }

    function getCurrentUrl() {
      try {
        return iframe.contentWindow.location.href;
      } catch (error) {
        return iframe.src;
      }
    }

    function getCurrentTitle() {
      try {
        return iframe.contentDocument.title || getCurrentUrl();
      } catch (error) {
        return getCurrentUrl();
      }
    }

    function updateNavigationButtons() {
      buttons[0].className = historyIndex > 0
        ? "ie__function_bar__button"
        : "ie__function_bar__button--disable";
      buttons[1].className = historyIndex < historyEntries.length - 1
        ? "ie__function_bar__button"
        : "ie__function_bar__button--disable";
    }

    function syncAddress() {
      addressText.textContent = getCurrentUrl();
    }

    function closePanel() {
      var panel = content.querySelector(".ie-enhanced-panel");

      if (panel) {
        panel.remove();
      }

      [buttons[5], buttons[6], buttons[7]].forEach(function (button) {
        button.classList.remove("ie__function_bar__button--active");
      });
    }

    function renderPanel(title, bodyHtml, activeButton) {
      var panel;

      closePanel();
      panel = document.createElement("aside");
      panel.className = "ie-enhanced-panel";
      panel.innerHTML =
        '<div class="ie-enhanced-panel__header">' +
          '<span class="ie-enhanced-panel__title"></span>' +
          '<button class="ie-enhanced-panel__close" type="button" aria-label="Close">×</button>' +
        "</div>" +
        '<div class="ie-enhanced-panel__body">' + bodyHtml + "</div>";
      panel.querySelector(".ie-enhanced-panel__title").textContent = title;
      panel.querySelector(".ie-enhanced-panel__close").addEventListener("click", closePanel);
      content.appendChild(panel);

      if (activeButton) {
        activeButton.classList.add("ie__function_bar__button--active");
      }

      return panel;
    }

    function normalizeAddress(value) {
      var trimmed = value.trim();

      if (!trimmed || trimmed === "about:home") {
        return new URL(HOME_URL, window.location.href);
      }

      if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
        return new URL(trimmed);
      }

      if (trimmed.charAt(0) === "/") {
        return new URL(trimmed, window.location.origin);
      }

      if (trimmed.indexOf(".") !== -1 && trimmed.indexOf(" ") === -1) {
        return new URL("https://" + trimmed);
      }

      return new URL("https://www.google.com/search?q=" + encodeURIComponent(trimmed));
    }

    function navigate(value) {
      var destination;

      try {
        destination = normalizeAddress(value);
      } catch (error) {
        setStatus("Invalid address");
        return;
      }

      closePanel();

      if (destination.origin !== window.location.origin) {
        window.open(destination.href, "_blank", "noopener");
        setStatus("Opened in a new tab");
        syncAddress();
        return;
      }

      setStatus("Opening page...");
      iframe.src = destination.href;
    }

    function goBack() {
      if (historyIndex <= 0) {
        return;
      }

      historyIndex -= 1;
      historyNavigation = true;
      iframe.src = historyEntries[historyIndex].url;
      updateNavigationButtons();
      setStatus("Opening page...");
    }

    function goForward() {
      if (historyIndex >= historyEntries.length - 1) {
        return;
      }

      historyIndex += 1;
      historyNavigation = true;
      iframe.src = historyEntries[historyIndex].url;
      updateNavigationButtons();
      setStatus("Opening page...");
    }

    function stopLoading() {
      try {
        iframe.contentWindow.stop();
      } catch (error) {
      }
      setStatus("Stopped");
    }

    function refreshPage() {
      closePanel();
      setStatus("Refreshing...");
      try {
        iframe.contentWindow.location.reload();
      } catch (error) {
        iframe.src = iframe.src;
      }
    }

    function showSearch() {
      var panel = renderPanel(
        "Search",
        '<label class="ie-enhanced-panel__label" for="ie-page-search">Find text on this page:</label>' +
          '<form class="ie-enhanced-panel__form">' +
            '<input class="ie-enhanced-panel__input" id="ie-page-search" type="search" autocomplete="off">' +
            '<button class="ie-enhanced-panel__button" type="submit">Find Next</button>' +
          "</form>" +
          '<p class="ie-enhanced-panel__empty" aria-live="polite"></p>',
        buttons[5]
      );
      var form = panel.querySelector("form");
      var input = panel.querySelector("input");
      var result = panel.querySelector("p");

      form.addEventListener("submit", function (event) {
        var found = false;
        event.preventDefault();

        if (!input.value.trim()) {
          result.textContent = "Enter text to search for.";
          return;
        }

        try {
          found = iframe.contentWindow.find(input.value, false, false, true, false, true, false);
        } catch (error) {
        }

        result.textContent = found ? "Match found." : "No more matches were found.";
      });

      input.focus();
    }

    function loadFavorites() {
      try {
        return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) || "[]");
      } catch (error) {
        return [];
      }
    }

    function saveFavorites(items) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
      } catch (error) {
      }
    }

    function addFavorite() {
      var items = loadFavorites();
      var url = getCurrentUrl();

      if (!items.some(function (item) { return item.url === url; })) {
        items.unshift({ title: getCurrentTitle(), url: url });
        saveFavorites(items.slice(0, 20));
        setStatus("Added to Favorites");
      } else {
        setStatus("Already in Favorites");
      }

      showFavorites();
    }

    function showLinkList(title, items, activeButton, addButton) {
      var body = addButton
        ? '<button class="ie-enhanced-panel__button" type="button" data-add-favorite="true">Add current page</button>'
        : "";

      body += '<div class="ie-enhanced-panel__list">';
      body += items.length ? items.map(function (item) {
        return '<button class="ie-enhanced-panel__link" type="button" data-url="' +
          encodeURIComponent(item.url) + '"></button>';
      }).join("") : '<p class="ie-enhanced-panel__empty">No items yet.</p>';
      body += "</div>";

      var panel = renderPanel(title, body, activeButton);
      var linkButtons = panel.querySelectorAll("[data-url]");

      Array.prototype.forEach.call(linkButtons, function (button, index) {
        button.textContent = items[index].title || items[index].url;
        button.title = items[index].url;
        button.addEventListener("click", function () {
          navigate(decodeURIComponent(button.getAttribute("data-url")));
        });
      });

      if (addButton) {
        panel.querySelector("[data-add-favorite]").addEventListener("click", addFavorite);
      }
    }

    function showFavorites() {
      showLinkList("Favorites", [
        { title: "SWE Home", url: HOME_URL },
        { title: "Modern Portfolio", url: "/swe/modern/" },
        { title: "Resume", url: "/engresume/" }
      ].concat(loadFavorites()), buttons[6], true);
    }

    function showHistory() {
      showLinkList("History", historyEntries.slice().reverse(), buttons[7], false);
    }

    function showLinks() {
      showLinkList("Links", [
        { title: "SWE Home", url: HOME_URL },
        { title: "Modern Portfolio", url: "/swe/modern/" },
        { title: "Resume", url: "/engresume/" },
        { title: "GitHub", url: "https://github.com/bobtianqiwei" },
        { title: "LinkedIn", url: "https://www.linkedin.com/in/bobtianqiwei/" }
      ], null, false);
    }

    function sendMail() {
      var subject = encodeURIComponent(getCurrentTitle());
      var body = encodeURIComponent(getCurrentUrl());
      setStatus("Opening mail...");
      window.location.href = "mailto:?subject=" + subject + "&body=" + body;
    }

    function printPage() {
      try {
        setStatus("Printing...");
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (error) {
        setStatus("Unable to print this page");
      }
    }

    function toggleEditMode() {
      try {
        editMode = !editMode;
        iframe.contentDocument.designMode = editMode ? "on" : "off";
        buttons[10].classList.toggle("ie__function_bar__button--active", editMode);
        buttons[10].classList.remove("ie__function_bar__button--disable");
        setStatus(editMode ? "Editing page" : "Done");
      } catch (error) {
        setStatus("Editing is unavailable for this page");
      }
    }

    function openBobCat() {
      var params = new URLSearchParams();
      params.set("embed", "1");
      params.set("contextPath", getCurrentUrl());
      params.set("contextTitle", getCurrentTitle());
      navigate("/works/bobscat/?" + params.toString());
    }

    function selectAll() {
      try {
        iframe.contentWindow.focus();
        iframe.contentDocument.execCommand("selectAll", false, null);
      } catch (error) {
      }
    }

    function savePage() {
      try {
        var blob = new Blob([iframe.contentDocument.documentElement.outerHTML], { type: "text/html" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "page.html";
        link.click();
        window.setTimeout(function () { URL.revokeObjectURL(link.href); }, 0);
      } catch (error) {
        setStatus("Unable to save this page");
      }
    }

    function viewSource() {
      try {
        var blob = new Blob([iframe.contentDocument.documentElement.outerHTML], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        window.open(url, "_blank", "noopener");
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
      } catch (error) {
        setStatus("Unable to view source");
      }
    }

    function toggleFullScreen() {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    }

    function handleMenuCommand(event) {
      var textElement = event.target.closest(".ie__options .drop-down__text");
      var command;

      if (!textElement || textElement.parentElement.querySelector(":scope > .drop-down__arrow")) {
        return;
      }

      command = textElement.textContent.trim();

      switch (command) {
        case "Back": goBack(); break;
        case "Forward": goForward(); break;
        case "Home Page": navigate(HOME_URL); break;
        case "Stop": stopLoading(); break;
        case "Refresh": refreshPage(); break;
        case "Search": showSearch(); break;
        case "Favorites": showFavorites(); break;
        case "History": showHistory(); break;
        case "Add to Favorites...": addFavorite(); break;
        case "Open...": addressText.focus(); document.execCommand("selectAll", false, null); break;
        case "Save As...": savePage(); break;
        case "Print...":
        case "Print Preview...": printPage(); break;
        case "Select All": selectAll(); break;
        case "Find (on This Page)...": showSearch(); break;
        case "Source": viewSource(); break;
        case "Full Screen": toggleFullScreen(); break;
        case "Page by E-mail...":
        case "Link by E-mail...":
        case "New Message...": sendMail(); break;
        case "MSN.com":
        case "Bob's Cat": openBobCat(); break;
        default: return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }

    [
      goBack,
      goForward,
      stopLoading,
      refreshPage,
      function () { navigate(HOME_URL); },
      showSearch,
      showFavorites,
      showHistory,
      sendMail,
      printPage,
      toggleEditMode,
      openBobCat
    ].forEach(function (handler, index) {
      var labels = ["Back", "Forward", "Stop", "Refresh", "Home", "Search", "Favorites", "History", "Mail", "Print", "Edit", "MSN - Bob's Cat"];
      buttons[index].title = labels[index];
      buttons[index].setAttribute("role", "button");
      buttons[index].setAttribute("aria-label", labels[index]);
      buttons[index].setAttribute("tabindex", "0");
      buttons[index].addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        handler();
      }, true);
      buttons[index].addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handler();
        }
      });
    });

    function renameMsnMenuItems() {
      Array.prototype.forEach.call(document.querySelectorAll(".ie__options .drop-down__text"), function (item) {
        if (item.textContent.trim() === "MSN.com") {
          item.textContent = "Bob's Cat";
        }
      });
    }

    new MutationObserver(renameMsnMenuItems).observe(document.querySelector(".ie__options"), {
      childList: true,
      subtree: true
    });

    goButton.title = "Go";
    goButton.setAttribute("role", "button");
    goButton.setAttribute("tabindex", "0");
    goButton.addEventListener("click", function () { navigate(addressText.textContent); });
    bindActionKey(goButton, function () { navigate(addressText.textContent); });
    addressDropdown.title = "Address history";
    addressDropdown.setAttribute("role", "button");
    addressDropdown.setAttribute("tabindex", "0");
    addressDropdown.addEventListener("click", function (event) {
      event.stopPropagation();
      showHistory();
    });
    bindActionKey(addressDropdown, showHistory);
    linksButton.title = "Links";
    linksButton.setAttribute("role", "button");
    linksButton.setAttribute("tabindex", "0");
    linksButton.addEventListener("click", showLinks);
    bindActionKey(linksButton, showLinks);
    addressText.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        navigate(addressText.textContent);
      }
    });
    addressText.addEventListener("focus", function () {
      window.setTimeout(function () { document.execCommand("selectAll", false, null); }, 0);
    });

    iframe.addEventListener("load", function () {
      var currentUrl = getCurrentUrl();
      var currentTitle = getCurrentTitle();

      if (historyNavigation) {
        historyNavigation = false;
      } else if (!historyEntries[historyIndex] || historyEntries[historyIndex].url !== currentUrl) {
        historyEntries = historyEntries.slice(0, historyIndex + 1);
        historyEntries.push({ title: currentTitle, url: currentUrl });
        historyIndex = historyEntries.length - 1;
      } else {
        historyEntries[historyIndex].title = currentTitle;
      }

      editMode = false;
      buttons[10].classList.remove("ie__function_bar__button--active");
      buttons[10].classList.remove("ie__function_bar__button--disable");
      syncAddress();
      updateNavigationButtons();
      setStatus("Done");
    });

    var initialUrl = getCurrentUrl();
    if (initialUrl && initialUrl !== "about:blank") {
      historyEntries.push({ title: "SWE Home", url: initialUrl });
      historyIndex = 0;
    }
    buttons[10].classList.remove("ie__function_bar__button--disable");
    syncAddress();
    updateNavigationButtons();
    document.querySelector(".ie__options").addEventListener("click", handleMenuCommand, true);
    return true;
  }

  if (!bindInternetExplorerControls()) {
    var observer = new MutationObserver(function () {
      if (bindInternetExplorerControls()) {
        observer.disconnect();
      }
    });

    observer.observe(document.getElementById("root"), {
      childList: true,
      subtree: true
    });
  }
}());
