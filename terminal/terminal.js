const historyEl = document.querySelector("[data-history]");
const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-input]");
const mode = document.body.dataset.mode || "interactive";
const currentPath = window.location.pathname === "/" ? "~/" : `~${window.location.pathname}`;
const lastUpdated = "March 12, 2026 at 10:52 PM PT";

const aboutLines = [
  "HCI researcher at UC Berkeley, working on creativity support tools, AI, and embodied interfaces.",
];

const responses = {
  help: [
    "Available commands:",
    "help    show this list",
    "about   bio, research, and current direction",
    "links   website, github, email",
    "updated show last update time",
    "home    open homepage",
    "clear   clear this terminal",
  ],
  about: aboutLines,
  updated: [`Last updated: ${lastUpdated}`],
};

const linksAll = [
  'website  <a href="https://bobtianqiwei.com">bobtianqiwei.com</a>',
  'github   <a href="https://github.com/bobtianqiwei">github.com/bobtianqiwei</a>',
  'email    <a href="mailto:bobwei3598@gmail.com">bobwei3598@gmail.com</a>',
];

const linksDefault = [
  '<a href="https://bobtianqiwei.com">bobtianqiwei.com</a>',
  '<a href="https://github.com/bobtianqiwei">github.com/bobtianqiwei</a>',
];

function appendEntry(command, lines, { html = false } = {}) {
  const entry = document.createElement("div");
  entry.className = "entry";

  const promptLine = document.createElement("div");
  promptLine.className = "prompt-line";
  promptLine.innerHTML = `<span class="prompt">bob@site:~$</span> ${command}`;
  entry.appendChild(promptLine);

  if (lines.length > 0) {
    const response = document.createElement("div");
    response.className = "response";
    if (html) {
      response.innerHTML = lines.join("\n");
    } else {
      response.textContent = lines.join("\n");
    }
    entry.appendChild(response);
  }

  historyEl.appendChild(entry);
}

function appendOutput(lines, { html = false } = {}) {
  const entry = document.createElement("div");
  entry.className = "entry";

  const response = document.createElement("div");
  response.className = "response";
  if (html) {
    response.innerHTML = lines.join("\n");
  } else {
    response.textContent = lines.join("\n");
  }

  entry.appendChild(response);
  historyEl.appendChild(entry);
}

function appendWelcome() {
  const welcome = document.createElement("div");
  welcome.className = "entry";
  welcome.innerHTML = [
    '<div class="response">',
    `<span class="muted">bob@site:${currentPath}</span><br>`,
    "Bob Tianqi Wei terminal<br>",
    "</div>",
  ].join("");
  historyEl.appendChild(welcome);
}

function appendDefaultContent() {
  appendOutput(aboutLines);
  appendOutput(linksDefault, { html: true });
  appendOutput([
    `Last updated: ${lastUpdated}`,
    'Type <span class="warning">help</span> to explore.',
  ], { html: true });
}

function handleCommand(rawValue) {
  const command = rawValue.trim().toLowerCase();

  if (!command) {
    appendEntry("", []);
    return;
  }

  if (command === "clear") {
    historyEl.innerHTML = "";
    appendWelcome();
    if (mode === "homepage") {
      appendDefaultContent();
    }
    return;
  }

  if (command === "home") {
    appendEntry(command, ["Opening homepage..."]);
    window.location.href = "/";
    return;
  }

  if (command === "links") {
    appendEntry(command, linksAll, { html: true });
    return;
  }

  if (responses[command]) {
    appendEntry(command, responses[command]);
    return;
  }

  appendEntry(command, ['Command not found. Type "help" to see available commands.']);
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = inputEl.value;
  handleCommand(value);
  inputEl.value = "";
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});

window.addEventListener("load", () => {
  appendWelcome();
  if (mode === "homepage") {
    appendDefaultContent();
  }
  inputEl.focus();
});

window.addEventListener("click", () => {
  inputEl.focus();
});
