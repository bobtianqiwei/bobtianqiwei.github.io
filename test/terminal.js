const historyEl = document.querySelector("[data-history]");
const formEl = document.querySelector("[data-form]");
const inputEl = document.querySelector("[data-input]");

const responses = {
  help: [
    "Available commands:",
    "help    show this list",
    "about   bio, research, and current direction",
    "links   website, github, email",
    "home    open homepage",
    "clear   clear this terminal",
  ],
  about: [
    "I am an HCI researcher at the Berkeley Institute of Design Lab (BiD) in EECS, working with Professor Bjorn Hartmann and Shm Almeda. I hold an MDes in Human-Computer Interaction from the UC Berkeley College of Engineering and a BA in Industrial Design from Tsinghua University.",
    "My research sits at the intersection of human-computer interaction, AI, and embodied interfaces.",
    "I design and study systems that use AI and novel hardware to support tacit skill learning, creative work, and responsible automation. Outside of research, I am a classical musician, designer, and frontend engineer, and I often bring these practices into my teaching and interactive prototypes.",
    "In fall 2026, I will join the MIT Media Lab.",
  ],
};

const linkMarkup = [
  'website  <a href="https://bobtianqiwei.com">bobtianqiwei.com</a>',
  'github   <a href="https://github.com/bobtianqiwei">github.com/bobtianqiwei</a>',
  'email    <a href="mailto:bobwei3598@gmail.com">bobwei3598@gmail.com</a>',
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
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function appendWelcome() {
  const welcome = document.createElement("div");
  welcome.className = "entry";
  welcome.innerHTML = [
    '<div class="response">',
    '<span class="muted">bob@site:~/test</span><br>',
    'Bob Tianqi Wei terminal<br>',
    '<span class="muted">Type <span class="warning">help</span> to explore.</span>',
    "</div>",
  ].join("");
  historyEl.appendChild(welcome);
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
    return;
  }

  if (command === "home") {
    appendEntry(command, ["Opening homepage..."]);
    window.location.href = "/";
    return;
  }

  if (command === "links") {
    appendEntry(command, linkMarkup, { html: true });
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
});

window.addEventListener("load", () => {
  appendWelcome();
  inputEl.focus();
});

window.addEventListener("click", () => {
  inputEl.focus();
});
