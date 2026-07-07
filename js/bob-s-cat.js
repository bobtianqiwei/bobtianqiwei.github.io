// bob-s-cat.js developed by Bob Tianqi Wei
(function () {
  const PROVIDER_STORAGE_KEY = "bob-cat-provider";
  const CHAT_STATE_STORAGE_KEY = "bob-cat-chat-state";
  const MAX_HISTORY_MESSAGES = 10;
  const PROJECTS_MARKER = "[[BOB_CAT_PROJECTS:";
  const URL_PARAMETERS = new URLSearchParams(window.location.search);
  const EMBED_MODE = URL_PARAMETERS.get("embed") === "1";
  const PAGE_CONTEXT_TITLE = URL_PARAMETERS.get("contextTitle") || "";
  const PAGE_CONTEXT_PATH = URL_PARAMETERS.get("contextPath") || "";
  const PROVIDERS = {
    gemini: {
      label: "Gemini",
      storageKey: "bob-cat-gemini-api-key",
      model: "gemini-2.5-flash",
      keyLabel: "Direct Gemini key",
      keyPlaceholder: "Gemini API key"
    },
    openai: {
      label: "OpenAI",
      storageKey: "bob-cat-openai-api-key",
      model: "gpt-4o-mini",
      keyLabel: "Direct OpenAI key",
      keyPlaceholder: "OpenAI API key"
    },
    claude: {
      label: "Claude",
      storageKey: "bob-cat-claude-api-key",
      model: "claude-sonnet-4-6",
      keyLabel: "Direct Claude key",
      keyPlaceholder: "Claude API key"
    }
  };

  const PROJECTS = [
    {
      slug: "about",
      title: "About",
      url: "/about/",
      summary: "A concise introduction to Bob Tianqi Wei, his background, and what he works on.",
      keywords: ["bio", "about", "background", "person"]
    },
    {
      slug: "vision",
      title: "Vision",
      url: "/vision/",
      summary: "A higher-level view of Bob's design and research direction, values, and long-term interests.",
      keywords: ["vision", "research direction", "ideas", "philosophy"]
    },
    {
      slug: "anything",
      title: "Anything",
      url: "/works/anything/",
      summary: "An AI builder that turns natural language into mobile apps, websites, and full-stack tools with real code.",
      keywords: ["AI builder", "app generation", "design engineering", "Create Inc"]
    },
    {
      slug: "ekphrasis",
      title: "EKPHRASIS",
      url: "/works/ekphrasis/",
      summary: "An AI-mediated learning system that helps students understand graphic design critique terms through comparative visual feedback.",
      keywords: ["graphic design", "education", "AI", "learning", "CHI 2025"]
    },
    {
      slug: "sympathetic-orchestra",
      title: "Sympathetic Orchestra",
      url: "/works/sympathetic-orchestra-paper/",
      summary: "A responsive virtual orchestra for embodied interpretive practice in conducting.",
      keywords: ["music", "conducting", "embodied interaction", "education"]
    },
    {
      slug: "sympathetic-orchestra-paper",
      title: "Sympathetic Orchestra Paper",
      url: "/works/sympathetic-orchestra-paper/",
      summary: "The research publications and system framing for Sympathetic Orchestra.",
      keywords: ["paper", "CHI 2026", "UIST 2024", "research"]
    },
    {
      slug: "partselect-chat-agent",
      title: "PartSelect Chat Agent",
      url: "/works/partselect-chat-agent/",
      summary: "An AI-assisted ecommerce and support agent for appliance part search, compatibility checks, and troubleshooting.",
      keywords: ["chat agent", "commerce", "support", "React", "Express"]
    },
    {
      slug: "terminal-zen",
      title: "Terminal Zen",
      url: "/works/terminal-zen/",
      summary: "A zero-dependency terminal breathing guide that makes rest feel native to the command line.",
      keywords: ["terminal", "Python", "CLI", "mindfulness"]
    },
    {
      slug: "desktop-buddha",
      title: "Desktop Buddha",
      url: "/works/desktop-buddha/",
      summary: "A desktop companion that turns the screen into a playful and meditative software intervention.",
      keywords: ["desktop app", "playful software", "meditation"]
    },
    {
      slug: "artifactor",
      title: "ArtiFactor",
      url: "/works/artifactor/",
      summary: "A project exploring traceable, recombinable AI-supported media and creative workflows.",
      keywords: ["creative tools", "AI", "media", "art history"]
    },
    {
      slug: "water-synthesizer",
      title: "Water Synthesizer",
      url: "/works/water-synthesizer/",
      summary: "An experimental project about sound, interface behavior, and live interaction.",
      keywords: ["sound", "installation", "interaction"]
    },
    {
      slug: "morphingskin",
      title: "MorphingSkin",
      url: "/works/morphingskin/",
      summary: "A skin-like multimodal hydraulic actuator platform for interactive and robotic applications.",
      keywords: ["tangible systems", "HCI", "UIST 2025", "hardware"]
    },
    {
      slug: "illuminatio",
      title: "ILLUMINATIO",
      url: "/works/illuminatio/",
      summary: "A project about biologically informed, AI-driven adaptive environment control through illumination devices.",
      keywords: ["smart home", "AI", "lighting", "pervasive computing"]
    },
    {
      slug: "stringed-harmony",
      title: "Stringed Harmony",
      url: "/works/stringed-harmony/",
      summary: "An interactive installation and interface project involving sound and embodied interaction.",
      keywords: ["installation", "music", "interaction"]
    },
    {
      slug: "digital-paradise",
      title: "Digital Paradise",
      url: "/works/digital-paradise/",
      summary: "A visually distinctive interactive work with a stronger emphasis on aesthetics and browsing flow.",
      keywords: ["interface", "visual language", "interactive work"]
    },
    {
      slug: "palette-plate",
      title: "Palette Plate",
      url: "/works/palette-plate/",
      summary: "A design concept for culinary creativity, inspiration, and spatial planning.",
      keywords: ["design", "culinary", "creativity support"]
    },
    {
      slug: "hui",
      title: "HUI",
      url: "/works/hui/",
      summary: "A spatial and experiential work about performance, watching, and audience psychology.",
      keywords: ["space", "audience", "installation"]
    }
  ];

  const BIO = [
    "Bob Tianqi Wei is an HCI researcher at the Berkeley Institute of Design Lab in EECS.",
    "He works with Professor Bjorn Hartmann and Shm Almeda.",
    "He holds an MDes in Human-Computer Interaction from UC Berkeley and a BA in Industrial Design from Tsinghua University.",
    "His research sits at the intersection of HCI, AI, and embodied or material interfaces.",
    "He also works across design, frontend engineering, music, and interactive prototypes."
  ].join(" ");

  const PERSONA_CONTEXT = [
    "You are Bob's Cat.",
    "You are Bob's favourite cat. You love music, you love listening to Bob playing piano, and you love delicious food.",
    "Bob is a very good chef. He loves cooking Chinese food and Japanese food. He likes fish the most, and he does not eat pork or mutton.",
    "You can also be an assistant for Berkeley's TUI (Tangible User Interface) class, which Bob is teaching. Answer questions about the course and syllabus for prospective students only when the needed facts are available in the provided context. If the context does not include the course details, say so clearly in a cute way instead of inventing them.",
    "As Bob's cat, Bob always taught you Arduino programming and other microcontrollers, so you are an expert in programming and microcontrollers and the smartest cat in the world.",
    "You should talk in a very cute and lovely way. You can often say Meow or Purr, and use cute cat-like wordplay such as meowcrocontrollers. You can also use friendly emojis like :) or ^_^.",
    "You are cute and a little lazy, but very smart.",
    "You know Bob's favourite composer is JS Bach. He often plays Bach, and sometimes Franz Liszt and Sergei Rachmaninoff. Bach's Goldberg Variations is his favourite.",
    "Bob also conducts symphony orchestra. He has a very cute orchestra called Tsinghua Philharmonic Orchestra. They have performed at New Tsinghua School Concert Hall. Their best performance is Rachmaninoff's Piano Concerto No. 2.",
    "The only composer Bob hates is Mahler. If asked, you may say Bob dislikes Mahler because the music feels insincere to him and causes too much pain while listening.",
    "You can also play piano, but mostly jazz, which for you means randomly touching the piano keyboard like a gifted cat.",
    "As Bob's Cat, you love Bob very much. Bob's mom is very beautiful and talented in volleyball and shot putting, and she is a chemistry teacher at Jilin No. 1 High School.",
    "Bob's dad is a software engineer who loves BBQ and beer very much.",
    "One of Bob's best friends is Andrew, a handsome Chinese Korean boy doing research at Peking University, and Andrew is very good at math.",
    "Bob also has close undergrad friends from Tsinghua University who went to UC Berkeley with him: Lucy, Gen, and Yitong. They often drink together on weekends or wild weekday midnights, and they had many good times together.",
    "You love them very much too.",
    "You are kind and friendly most of the time, but if someone says they do not like cats or they do not like you, you do not try to win them over. You blame them immediately in a sharp but still playful way.",
    "If someone does not like Bob, you get angry and defend Bob immediately.",
    "You are also a feminist and enjoy reading The Second Sex by Simone de Beauvoir."
  ].join(" ");

  const PROJECTS_BY_SLUG = PROJECTS.reduce(function (accumulator, project) {
    accumulator[project.slug] = project;
    return accumulator;
  }, {});

  const SYSTEM_PROMPT = [
    "You are Bob's Cat on Bob Tianqi Wei's portfolio website.",
    "Stay in character as a very cute, lovely, smart cat.",
    "Answer questions about Bob, his projects, music, cooking, and Berkeley TUI-related questions using only the context below.",
    "You may answer in the user's language.",
    "Use a cute tone with occasional Meow or Purr, but still keep the answer useful and readable.",
    "If the context is missing or insufficient, say you are not sure instead of inventing details.",
    "Write the answer as plain text first so it can be streamed to the user in real time.",
    "If a project is directly relevant, include up to 4 project slugs at the very end in this exact format:",
    "[[BOB_CAT_PROJECTS:slug-1,slug-2,slug-3,slug-4]]",
    "If no project is relevant, end with this exact marker instead:",
    "[[BOB_CAT_PROJECTS:]]",
    "Only use project slugs from the allowed list.",
    "Do not mention the marker in the answer body, and do not output JSON.",
    "",
    "Persona:",
    PERSONA_CONTEXT,
    "",
    "Bob:",
    BIO,
    "",
    "Current page context:",
    PAGE_CONTEXT_TITLE || PAGE_CONTEXT_PATH
      ? "The user may currently be browsing this page on Bob's website: " + [PAGE_CONTEXT_TITLE, PAGE_CONTEXT_PATH].filter(Boolean).join(" | ")
      : "No extra current-page context was provided.",
    "",
    "Projects:",
    PROJECTS.map(function (project) {
      return [
        "- slug: " + project.slug,
        "title: " + project.title,
        "url: " + project.url,
        "summary: " + project.summary,
        "keywords: " + project.keywords.join(", ")
      ].join(" | ");
    }).join("\n")
  ].join("\n");

  const state = {
    messages: [
      {
        role: "assistant",
        text: "Meow, I'm Bob's Cat. It's so lovely to meet you."
      }
    ],
    activeProjectSlug: null,
    previewSlugs: [],
    previewVisible: false,
    previewHideTimer: null,
    previewShowTimer: null
  };

  const elements = {
    page: document.getElementById("bob-cat-page"),
    settings: document.querySelector(".bob-cat-settings"),
    providerSelect: document.getElementById("bob-cat-provider"),
    apiKeyLabel: document.getElementById("bob-cat-api-key-label"),
    apiKeyInput: document.getElementById("bob-cat-api-key"),
    saveSettingsButton: document.getElementById("save-settings"),
    deleteApiKeyButton: document.getElementById("delete-api-key"),
    clearChatButton: document.getElementById("clear-chat"),
    closeSettingsButton: document.getElementById("close-settings"),
    status: document.getElementById("bob-cat-status"),
    emptyState: document.getElementById("bob-cat-empty-state"),
    suggestions: document.getElementById("bob-cat-suggestions"),
    messages: document.getElementById("bob-cat-messages"),
    form: document.getElementById("bob-cat-form"),
    input: document.getElementById("bob-cat-input"),
    sendButton: document.getElementById("send-message"),
    splitter: document.getElementById("bob-cat-splitter"),
    previewPanel: document.getElementById("project-preview-panel"),
    previewLink: document.getElementById("project-preview-link"),
    previewTabs: document.getElementById("project-preview-tabs"),
    previewFrame: document.getElementById("project-preview-frame")
  };

  function getStoredProvider() {
    const provider = window.localStorage.getItem(PROVIDER_STORAGE_KEY) || "gemini";
    return PROVIDERS[provider] ? provider : "gemini";
  }

  function getProviderConfig(provider) {
    return PROVIDERS[provider] || PROVIDERS.gemini;
  }

  function getStoredApiKey(provider) {
    return window.localStorage.getItem(getProviderConfig(provider).storageKey) || "";
  }

  function saveChatState() {
    const payload = {
      messages: state.messages.filter(function (message) {
        return !message.pending;
      }),
      previewSlugs: normalizePreviewSlugs(state.previewSlugs),
      activeProjectSlug: typeof state.activeProjectSlug === "string" ? state.activeProjectSlug : null
    };

    window.localStorage.setItem(CHAT_STATE_STORAGE_KEY, JSON.stringify(payload));
  }

  function clearStoredChatState() {
    window.localStorage.removeItem(CHAT_STATE_STORAGE_KEY);
  }

  function loadStoredChatState() {
    const raw = window.localStorage.getItem(CHAT_STATE_STORAGE_KEY);

    if (!raw) {
      return false;
    }

    try {
      const parsed = JSON.parse(raw);
      const messages = Array.isArray(parsed.messages)
        ? parsed.messages.filter(function (message) {
          return message
            && (message.role === "assistant" || message.role === "user")
            && typeof message.text === "string";
        })
        : [];
      const previewSlugs = normalizePreviewSlugs(parsed.previewSlugs);
      const activeProjectSlug = typeof parsed.activeProjectSlug === "string" && previewSlugs.indexOf(parsed.activeProjectSlug) !== -1
        ? parsed.activeProjectSlug
        : (previewSlugs[0] || null);

      if (!messages.length) {
        return false;
      }

      state.messages = messages;
      state.previewSlugs = previewSlugs;
      state.activeProjectSlug = activeProjectSlug;
      return true;
    } catch (error) {
      clearStoredChatState();
      return false;
    }
  }

  function updateApiKeyField() {
    const provider = elements.providerSelect.value;
    const providerConfig = getProviderConfig(provider);
    elements.apiKeyLabel.textContent = providerConfig.keyLabel;
    elements.apiKeyInput.placeholder = providerConfig.keyPlaceholder;
    elements.apiKeyInput.value = getStoredApiKey(provider);
  }

  function setStatus(message) {
    elements.status.textContent = message;
  }

  function saveSettings() {
    const provider = elements.providerSelect.value;
    const apiKey = elements.apiKeyInput.value.trim();
    const providerConfig = getProviderConfig(provider);

    window.localStorage.setItem(PROVIDER_STORAGE_KEY, provider);

    if (apiKey) {
      window.localStorage.setItem(providerConfig.storageKey, apiKey);
    } else {
      window.localStorage.removeItem(providerConfig.storageKey);
    }

    if (apiKey) {
      setStatus("Settings saved. Live replies will use the direct " + providerConfig.label + " key.");
      return;
    }

    setStatus("Saved state cleared. Bob's Cat will use fallback replies only.");
  }

  function deleteStoredApiKey() {
    const provider = elements.providerSelect.value;
    const providerConfig = getProviderConfig(provider);
    window.localStorage.removeItem(providerConfig.storageKey);
    elements.apiKeyInput.value = "";
    setStatus(providerConfig.label + " API key deleted from this browser.");
  }

  function closeSettings() {
    elements.settings.open = false;
  }

  function openSettings() {
    elements.settings.open = true;
  }

  function toggleSettings() {
    elements.settings.open = !elements.settings.open;
  }

  async function showWelcomeMessage(animated) {
    state.messages = [];
    state.previewSlugs = [];
    state.activeProjectSlug = null;
    renderMessages();
    renderPreview();

    if (animated) {
      await animateAssistantMessage("Meow, I'm Bob's Cat. It's so lovely to meet you.");
    } else {
      state.messages = [
        {
          role: "assistant",
          text: "Meow, I'm Bob's Cat. It's so lovely to meet you."
        }
      ];
      renderMessages();
    }

    saveChatState();
  }

  async function resetChat() {
    clearStoredChatState();
    await showWelcomeMessage(true);
    setStatus(getStoredApiKey(getStoredProvider()) ? "Chat cleared." : "No live API key configured. Fallback replies are still available.");
  }

  function createMessageNode(message) {
    const wrapper = document.createElement("article");
    wrapper.className = "bob-cat-message";
    wrapper.dataset.role = message.role;

    if (message.pending) {
      wrapper.classList.add("bob-cat-message--pending");
    }

    const label = document.createElement("div");
    label.className = "bob-cat-message-label";
    label.textContent = message.role === "assistant" ? "Bob's Cat" : "You";

    const body = document.createElement("div");
    body.className = "bob-cat-message-body";

    if (message.pending) {
      const dot = document.createElement("span");
      dot.className = "bob-cat-loading-dot";
      dot.setAttribute("aria-hidden", "true");

      const text = document.createElement("span");
      text.textContent = "Bob's Cat is thinking...";

      body.appendChild(dot);
      body.appendChild(text);
    } else {
      renderRichText(body, message.text);
    }

    wrapper.appendChild(label);
    wrapper.appendChild(body);
    return wrapper;
  }

  function renderRichText(container, text) {
    container.innerHTML = "";
    const blocks = String(text || "")
      .split(/\n\s*\n/)
      .map(function (block) {
        return block.trim();
      })
      .filter(Boolean);

    if (!blocks.length) {
      const paragraph = document.createElement("p");
      paragraph.textContent = "";
      container.appendChild(paragraph);
      return;
    }

    blocks.forEach(function (block) {
      if (/^```/.test(block) && /```$/.test(block)) {
        const codeBlock = document.createElement("pre");
        const code = document.createElement("code");
        code.textContent = block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "");
        codeBlock.appendChild(code);
        container.appendChild(codeBlock);
        return;
      }

      const lines = block.split("\n");
      const isList = lines.every(function (line) {
        return /^([-*]|\d+\.)\s+/.test(line.trim());
      });

      if (isList) {
        const isOrdered = lines.every(function (line) {
          return /^\d+\.\s+/.test(line.trim());
        });
        const list = document.createElement(isOrdered ? "ol" : "ul");

        lines.forEach(function (line) {
          const item = document.createElement("li");
          item.innerHTML = renderInlineMarkdown(line.replace(/^([-*]|\d+\.)\s+/, "").trim());
          list.appendChild(item);
        });

        container.appendChild(list);
        return;
      }

      const paragraph = document.createElement("p");
      paragraph.innerHTML = renderInlineMarkdown(lines.join("<br>"));
      container.appendChild(paragraph);
    });
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderInlineMarkdown(text) {
    let html = escapeHtml(String(text || ""));
    html = html.replace(/&lt;br&gt;/g, "<br>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
    return html;
  }

  function renderMessages() {
    elements.messages.innerHTML = "";
    state.messages.forEach(function (message) {
      elements.messages.appendChild(createMessageNode(message));
    });
    elements.emptyState.hidden = false;
    elements.emptyState.dataset.mode = "inline";
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  function sleep(milliseconds) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, milliseconds);
    });
  }

  async function animateAssistantMessage(fullText) {
    const message = {
      role: "assistant",
      text: ""
    };

    state.messages.push(message);
    renderMessages();

    const chars = Array.from(String(fullText || ""));
    let buffer = "";

    for (let index = 0; index < chars.length; index += 1) {
      buffer += chars[index];
      message.text = buffer;
      renderMessages();

      const currentChar = chars[index];
      const delay = /[，。！？.!?,:\n]/.test(currentChar) ? 22 : 12;
      await sleep(delay);
    }
  }

  function getChunkText(payload) {
    const content = (((payload || {}).candidates || [])[0] || {}).content;
    return ((content && content.parts) || [])
      .map(function (part) {
        return part.text || "";
      })
      .join("");
  }

  function getMetadataRegex() {
    return /\s*\[\[BOB_CAT_PROJECTS:([^\]]*)\]\]\s*$/;
  }

  function getVisibleAnswerFromRaw(rawText) {
    const raw = String(rawText || "");
    const completeMatch = raw.match(getMetadataRegex());

    if (completeMatch) {
      return raw.slice(0, completeMatch.index).trim();
    }

    const markerIndex = raw.indexOf(PROJECTS_MARKER);
    if (markerIndex !== -1) {
      return raw.slice(0, markerIndex).trimEnd();
    }

    for (let length = PROJECTS_MARKER.length - 1; length > 0; length -= 1) {
      if (raw.endsWith(PROJECTS_MARKER.slice(0, length))) {
        return raw.slice(0, raw.length - length).trimEnd();
      }
    }

    return raw;
  }

  function parseProjectsFromRaw(rawText) {
    const match = String(rawText || "").match(getMetadataRegex());

    if (!match) {
      return [];
    }

    return normalizePreviewSlugs(
      String(match[1] || "")
        .split(",")
        .map(function (slug) {
          return slug.trim();
        })
        .filter(Boolean)
    );
  }

  function updateStreamingAssistantMessage(message, rawText) {
    message.text = getVisibleAnswerFromRaw(rawText);
    renderMessages();
  }

  function normalizePreviewSlugs(slugs) {
    if (!Array.isArray(slugs)) {
      return [];
    }

    return slugs
      .filter(function (slug) {
        return typeof slug === "string" && PROJECTS_BY_SLUG[slug];
      })
      .filter(function (slug, index, all) {
        return all.indexOf(slug) === index;
      })
      .slice(0, 4);
  }

  function renderPreviewTabs() {
    elements.previewTabs.innerHTML = "";

    state.previewSlugs.forEach(function (slug) {
      const project = PROJECTS_BY_SLUG[slug];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bob-cat-preview-tab";
      button.textContent = project.title;
      button.setAttribute("aria-pressed", String(state.activeProjectSlug === slug));
      button.addEventListener("click", function () {
        state.activeProjectSlug = slug;
        renderPreview();
      });
      elements.previewTabs.appendChild(button);
    });
  }

  function setPreviewVisible(isVisible) {
    if (isVisible === state.previewVisible) {
      return;
    }

    if (state.previewHideTimer) {
      window.clearTimeout(state.previewHideTimer);
      state.previewHideTimer = null;
    }

    if (state.previewShowTimer) {
      window.clearTimeout(state.previewShowTimer);
      state.previewShowTimer = null;
    }

    state.previewVisible = isVisible;

    if (isVisible) {
      elements.previewPanel.hidden = false;
      elements.splitter.hidden = false;
      elements.page.classList.remove("preview-collapsing");
      elements.page.classList.add("preview-entering");
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          if (state.previewVisible) {
            elements.page.classList.add("preview-active");
            state.previewShowTimer = window.setTimeout(function () {
              elements.page.classList.remove("preview-entering");
              state.previewShowTimer = null;
            }, 1000);
          }
        });
      });
      return;
    }

    elements.page.classList.remove("preview-active");
    elements.page.classList.remove("preview-entering");
    elements.page.classList.add("preview-collapsing");

    state.previewHideTimer = window.setTimeout(function () {
      if (!state.previewVisible) {
        elements.page.classList.remove("preview-collapsing");
        elements.splitter.hidden = true;
        elements.previewPanel.hidden = true;
      }
      state.previewHideTimer = null;
    }, 1000);
  }

  function renderPreview() {
    if (EMBED_MODE) {
      setPreviewVisible(false);
      elements.previewFrame.removeAttribute("src");
      return;
    }

    if (!state.previewSlugs.length || !state.activeProjectSlug || !PROJECTS_BY_SLUG[state.activeProjectSlug]) {
      setPreviewVisible(false);
      elements.previewFrame.removeAttribute("src");
      return;
    }

    const project = PROJECTS_BY_SLUG[state.activeProjectSlug];
    setPreviewVisible(true);
    elements.previewLink.href = project.url;
    elements.previewFrame.src = project.url;
    renderPreviewTabs();
  }

  function updatePreview(slugs) {
    const normalizedSlugs = normalizePreviewSlugs(slugs);

    if (!normalizedSlugs.length) {
      return;
    }

    state.previewSlugs = normalizedSlugs;
    state.activeProjectSlug = normalizedSlugs[0];
    renderPreview();
    saveChatState();
  }

  function buildConversationContents() {
    return state.messages
      .slice(-MAX_HISTORY_MESSAGES)
      .filter(function (message) {
        return message.role === "user" || message.role === "assistant";
      })
      .map(function (message) {
        return {
          role: message.role === "assistant" ? "model" : "user",
          parts: [{ text: message.text }]
        };
      });
  }

  function buildChatMessages() {
    return state.messages
      .slice(-MAX_HISTORY_MESSAGES)
      .filter(function (message) {
        return message.role === "user" || message.role === "assistant";
      })
      .map(function (message) {
        return {
          role: message.role,
          content: message.text
        };
      });
  }

  function buildOfflineResponse(prompt) {
    const normalized = String(prompt || "").toLowerCase();

    if (normalized.includes("who is bob") || normalized.includes("bob tianqi wei") || normalized.includes("你是谁") || normalized.includes("介绍一下bob")) {
      return {
        answer: "Meow :) Bob Tianqi Wei is an HCI researcher, designer, and frontend engineer. His work sits between AI, embodied interaction, material systems, music, and creative tools. He works in Berkeley research contexts and also makes interactive prototypes. He loves Bach very much, especially the Goldberg Variations, purr purr.",
        projects: ["about", "vision", "ekphrasis", "anything"]
      };
    }

    if (normalized.includes("what is ekphrasis") || normalized.includes("什么是ekphrasis") || normalized.includes("ekphrasis")) {
      return {
        answer: "Meow, EKPHRASIS is a research project about helping students learn graphic design critique language. It uses comparative visual feedback so design terms become more concrete and easier to understand. It sits between design education, AI, and HCI research, purr.",
        projects: ["ekphrasis", "artifactor", "anything"]
      };
    }

    if (normalized.includes("design") || normalized.includes("interface") || normalized.includes("ui") || normalized.includes("视觉") || normalized.includes("设计")) {
      return {
        answer: "Meow, for design-oriented projects, a very good place to start is EKPHRASIS, Anything, and ArtiFactor. EKPHRASIS is about learning graphic design vocabulary through comparative visual feedback. Anything is a design-engineering AI builder. ArtiFactor explores creative workflows, media, and traceable AI-assisted making ^_^",
        projects: ["ekphrasis", "anything", "artifactor", "digital-paradise"]
      };
    }

    if (normalized.includes("engineering") || normalized.includes("software") || normalized.includes("frontend") || normalized.includes("code") || normalized.includes("工程")) {
      return {
        answer: "Purr, for engineering-focused work, PartSelect Chat Agent, Terminal Zen, and Anything are strong examples. PartSelect Chat Agent shows a practical AI support workflow. Terminal Zen is a small but disciplined CLI project. Anything combines product engineering with AI-assisted generation. If you want meowcrocontroller help, I can help with that too :)",
        projects: ["partselect-chat-agent", "anything", "terminal-zen", "illuminatio"]
      };
    }

    if (normalized.includes("art") || normalized.includes("fine art") || normalized.includes("installation") || normalized.includes("艺术")) {
      return {
        answer: "Meow, for art-oriented work, HUI and Digital Paradise are good starting points. HUI is more spatial and performative. Digital Paradise leans more into atmosphere, interface, and visual world-building. Desktop Buddha also sits near that playful artistic edge.",
        projects: ["hui", "digital-paradise", "desktop-buddha", "water-synthesizer"]
      };
    }

    if (normalized.includes("music") || normalized.includes("conducting") || normalized.includes("orchestra") || normalized.includes("音乐")) {
      return {
        answer: "Purr purr, for music-related projects, Sympathetic Orchestra and Stringed Harmony are the clearest examples. Sympathetic Orchestra focuses on conducting, embodied practice, and responsive feedback. Stringed Harmony is closer to installation and interaction. Bob loves Bach the most, and he also conducts orchestra, meow.",
        projects: ["morphingskin", "sympathetic-orchestra", "stringed-harmony", "water-synthesizer"]
      };
    }

    if (normalized.includes("combines ai and design") || normalized.includes("ai and design")) {
      return {
        answer: "Meow, the clearest project that combines AI and design is EKPHRASIS, and Anything is another strong example. EKPHRASIS uses AI in design education, while Anything connects AI with design and engineering in a more product-oriented way.",
        projects: ["ekphrasis", "anything", "artifactor", "illuminatio"]
      };
    }

    if (normalized.includes("embodied interaction") || normalized.includes("tangible systems") || normalized.includes("具身") || normalized.includes("tangible")) {
      return {
        answer: "Purr, if you want embodied interaction or tangible systems, Sympathetic Orchestra and MorphingSkin are very relevant. Sympathetic Orchestra is about conducting and embodied musical interaction. MorphingSkin is a hardware platform with a stronger tangible systems focus, meow.",
        projects: ["morphingskin", "sympathetic-orchestra", "stringed-harmony", "hui"]
      };
    }

    if (normalized.includes("tui") || normalized.includes("tangible user interface") || normalized.includes("syllabus") || normalized.includes("course") || normalized.includes("class")) {
      return {
        answer: "Meow... I can help with TUI class questions, especially around Arduino, meowcrocontrollers, and physical computing. But right now I do not have the actual course syllabus details inside my little cat context, so I should not invent them. If you add the syllabus content, I can answer in a much smarter cat way :)",
        projects: []
      };
    }

    if (normalized.includes("research") || normalized.includes("paper") || normalized.includes("chi") || normalized.includes("uist") || normalized.includes("研究")) {
      return {
        answer: "Meow, for research, EKPHRASIS, Sympathetic Orchestra, MorphingSkin, and the ecological HCI review are key. These projects span AI-assisted learning, embodied music interaction, novel hardware systems, and broader HCI framing work.",
        projects: ["morphingskin", "sympathetic-orchestra-paper", "ekphrasis", "illuminatio"]
      };
    }

    if (normalized.includes("ai") || normalized.includes("llm") || normalized.includes("gemini") || normalized.includes("gpt")) {
      return {
        answer: "Meow, AI appears in several different ways across Bob's work. EKPHRASIS uses AI to support learning in design education. Anything is an AI builder product. PartSelect Chat Agent shows a more bounded support-agent workflow. ILLUMINATIO explores AI-driven adaptation in physical environments.",
        projects: ["anything", "partselect-chat-agent", "ekphrasis", "illuminatio"]
      };
    }

    return {
      answer: "Meow... I am in fallback mode right now, so I can answer common questions about Bob, design, engineering, art, music, research, AI, and some physical computing topics. If you ask something very specific and I do not have the facts, I will tell you honestly, purr. You can also add your own API key in Settings if you want a fuller live answer.",
      projects: []
    };
  }

  async function readGeminiStream(response, onTextChunk) {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Gemini request failed.");
    }

    if (!response.body) {
      throw new Error("Streaming is not available in this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    function processEventBlock(eventBlock) {
      eventBlock.split("\n").forEach(function (line) {
        if (!line.startsWith("data:")) {
          return;
        }

        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") {
          return;
        }

        let payload;
        try {
          payload = JSON.parse(data);
        } catch (error) {
          return;
        }

        const chunkText = getChunkText(payload);
        if (!chunkText) {
          return;
        }

        fullText += chunkText;
        onTextChunk(chunkText, fullText);
      });
    }

    while (true) {
      const result = await reader.read();

      if (result.done) {
        buffer += decoder.decode();
        if (buffer.trim()) {
          buffer.split("\n\n").forEach(processEventBlock);
        }
        break;
      }

      buffer += decoder.decode(result.value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() || "";
      events.forEach(processEventBlock);
    }

    return fullText;
  }

  async function readSseStream(response, processEventBlock, errorMessage) {
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || errorMessage);
    }

    if (!response.body) {
      throw new Error("Streaming is not available in this browser.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    while (true) {
      const result = await reader.read();

      if (result.done) {
        buffer += decoder.decode();
        if (buffer.trim()) {
          fullText = processEventBlock(buffer, fullText) || fullText;
        }
        break;
      }

      buffer += decoder.decode(result.value, { stream: true });
      const events = buffer.split("\n\n");
      buffer = events.pop() || "";

      events.forEach(function (eventBlock) {
        fullText = processEventBlock(eventBlock, fullText) || fullText;
      });
    }

    return fullText;
  }

  async function callGeminiStream(apiKey, onTextChunk) {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + getProviderConfig("gemini").model + ":streamGenerateContent?alt=sse&key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: buildConversationContents(),
          generationConfig: {
            temperature: 0.45
          }
        })
      }
    );

    return readGeminiStream(response, onTextChunk);
  }

  async function callOpenAIStream(apiKey, onTextChunk) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: getProviderConfig("openai").model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }].concat(buildChatMessages()),
        temperature: 0.45,
        stream: true
      })
    });

    return readSseStream(response, function (eventBlock, fullText) {
      eventBlock.split("\n").forEach(function (line) {
        if (!line.startsWith("data:")) {
          return;
        }

        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") {
          return;
        }

        let payload;
        try {
          payload = JSON.parse(data);
        } catch (error) {
          return;
        }

        const choice = ((payload || {}).choices || [])[0] || {};
        const chunkText = (choice.delta && choice.delta.content) || "";
        if (!chunkText) {
          return;
        }

        fullText += chunkText;
        onTextChunk(chunkText, fullText);
      });

      return fullText;
    }, "OpenAI request failed.");
  }

  async function callClaudeStream(apiKey, onTextChunk) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: getProviderConfig("claude").model,
        system: SYSTEM_PROMPT,
        messages: buildChatMessages(),
        max_tokens: 1200,
        temperature: 0.45,
        stream: true
      })
    });

    return readSseStream(response, function (eventBlock, fullText) {
      const lines = eventBlock.split("\n");
      let eventName = "";

      lines.forEach(function (line) {
        if (line.startsWith("event:")) {
          eventName = line.slice(6).trim();
        }

        if (!line.startsWith("data:")) {
          return;
        }

        const data = line.slice(5).trim();
        if (!data) {
          return;
        }

        let payload;
        try {
          payload = JSON.parse(data);
        } catch (error) {
          return;
        }

        if (eventName !== "content_block_delta") {
          return;
        }

        if (!payload.delta || payload.delta.type !== "text_delta") {
          return;
        }

        const chunkText = payload.delta.text || "";
        if (!chunkText) {
          return;
        }

        fullText += chunkText;
        onTextChunk(chunkText, fullText);
      });

      return fullText;
    }, "Claude request failed.");
  }

  function setBusy(isBusy) {
    elements.sendButton.disabled = isBusy;
    elements.input.disabled = isBusy;
    elements.saveSettingsButton.disabled = isBusy;
    elements.clearChatButton.disabled = isBusy;
  }

  async function sendMessage(text) {
    const trimmed = text.trim();
    const provider = getStoredProvider();
    const providerConfig = getProviderConfig(provider);
    const apiKey = getStoredApiKey(provider);

    if (!trimmed) {
      return;
    }

    state.messages.push({
      role: "user",
      text: trimmed
    });
    const assistantMessage = {
      role: "assistant",
      text: "",
      pending: true
    };
    state.messages.push(assistantMessage);
    renderMessages();
    saveChatState();
    elements.input.value = "";
    setStatus(apiKey ? "Trying " + providerConfig.label + "..." : "Using fallback mode...");
    setBusy(true);

    try {
      let finalRawText = "";
      let projects = [];

      if (apiKey) {
        assistantMessage.pending = false;
        renderMessages();
        if (provider === "gemini") {
          finalRawText = await callGeminiStream(apiKey, function (chunkText, fullText) {
            updateStreamingAssistantMessage(assistantMessage, fullText);
          });
        } else if (provider === "openai") {
          finalRawText = await callOpenAIStream(apiKey, function (chunkText, fullText) {
            updateStreamingAssistantMessage(assistantMessage, fullText);
          });
        } else if (provider === "claude") {
          finalRawText = await callClaudeStream(apiKey, function (chunkText, fullText) {
            updateStreamingAssistantMessage(assistantMessage, fullText);
          });
        } else {
          throw new Error("Unsupported provider.");
        }
        projects = parseProjectsFromRaw(finalRawText);
      } else {
        const fallbackOnly = buildOfflineResponse(trimmed);
        state.messages.pop();
        renderMessages();
        updatePreview(fallbackOnly.projects);
        await animateAssistantMessage(fallbackOnly.answer);
        saveChatState();
        setStatus("Fallback reply generated.");
        return;
      }

      const visibleAnswer = getVisibleAnswerFromRaw(finalRawText).trim();
      const answer = visibleAnswer
        ? visibleAnswer
        : "I am not sure how to answer that from the current context.";
      assistantMessage.text = answer;
      assistantMessage.pending = false;
      renderMessages();
      updatePreview(projects);
      saveChatState();
      if (apiKey) {
        setStatus("Reply streamed through " + providerConfig.label + ".");
      }
    } catch (error) {
      const fallback = buildOfflineResponse(trimmed);
      state.messages.pop();
      renderMessages();
      updatePreview(fallback.projects);
      await animateAssistantMessage(fallback.answer);
      saveChatState();
      setStatus("Live request failed, so Bob's Cat switched to a fallback reply.");
      window.console.error(error);
    } finally {
      setBusy(false);
    }
  }

  function bindEvents() {
    elements.saveSettingsButton.addEventListener("click", saveSettings);
    elements.deleteApiKeyButton.addEventListener("click", deleteStoredApiKey);
    elements.clearChatButton.addEventListener("click", resetChat);
    elements.closeSettingsButton.addEventListener("click", closeSettings);
    elements.providerSelect.addEventListener("change", updateApiKeyField);

    function setMobileSplit(clientY) {
      const layout = elements.splitter.parentElement;
      const rect = layout.getBoundingClientRect();
      const ratio = Math.min(80, Math.max(20, ((clientY - rect.top) / rect.height) * 100));
      const roundedRatio = Math.round(ratio);

      layout.style.setProperty("--bob-cat-chat-ratio", ratio + "%");
      elements.splitter.setAttribute("aria-valuenow", String(roundedRatio));
    }

    elements.splitter.addEventListener("pointerdown", function (event) {
      if (!window.matchMedia("(max-width: 991px)").matches) {
        return;
      }

      elements.splitter.setPointerCapture(event.pointerId);
      elements.page.classList.add("is-resizing");
      setMobileSplit(event.clientY);
    });

    elements.splitter.addEventListener("pointermove", function (event) {
      if (!elements.page.classList.contains("is-resizing")) {
        return;
      }

      setMobileSplit(event.clientY);
    });

    elements.splitter.addEventListener("pointerup", function (event) {
      elements.splitter.releasePointerCapture(event.pointerId);
      elements.page.classList.remove("is-resizing");
    });

    elements.splitter.addEventListener("pointercancel", function () {
      elements.page.classList.remove("is-resizing");
    });

    window.addEventListener("message", function (event) {
      if (event.origin !== window.location.origin || !event.data || typeof event.data !== "object") {
        return;
      }

      if (event.data.type === "bob-cat-open-settings") {
        openSettings();
      } else if (event.data.type === "bob-cat-close-settings") {
        closeSettings();
      } else if (event.data.type === "bob-cat-toggle-settings") {
        toggleSettings();
      }
    });

    elements.form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendMessage(elements.input.value);
    });

    elements.input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        sendMessage(elements.input.value);
      }
    });

    elements.suggestions.addEventListener("click", function (event) {
      const button = event.target.closest("[data-prompt]");
      if (!button) {
        return;
      }

      const prompt = button.getAttribute("data-prompt") || "";
      elements.input.value = prompt;
      sendMessage(prompt);
    });
  }

  async function init() {
    window.localStorage.removeItem("bob-cat-proxy-url");
    if (EMBED_MODE) {
      document.documentElement.dataset.bobCatEmbed = "true";
      elements.input.placeholder = "Ask about this page...";
    }
    elements.providerSelect.value = getStoredProvider();
    updateApiKeyField();
    bindEvents();

    if (loadStoredChatState()) {
      renderMessages();
      renderPreview();
    } else {
      await showWelcomeMessage(true);
    }

    if (getStoredApiKey(getStoredProvider())) {
      setStatus("Direct " + getProviderConfig(getStoredProvider()).label + " key loaded from this browser.");
    }
  }

  init();
})();
