// works/experiments/buddha-machine/buddha-machine.js developed by Bob Tianqi Wei
const audio = document.querySelector("[data-audio]");
const playButton = document.querySelector("[data-play]");
const knob = document.querySelector("[data-knob]");
const rateOutput = document.querySelector("[data-rate]");
const art = document.querySelector("[data-art]");
const buddhaLines = document.querySelector("[data-buddha-source]").textContent.trimEnd().split("\n");

const minRate = 0.5;
const maxRate = 1.5;
const rateStep = 0.01;
let rate = 1;
let dragStartY = 0;
let dragStartRate = rate;
let lastRayFrame = 0;
let lastRayTimestamp = 0;
let rayRotation = 0;
let rayAnimationFrame = 0;
let measuredCellWidth = 0;

audio.preservesPitch = false;
audio.webkitPreservesPitch = false;

function setRate(value) {
  rate = Math.min(maxRate, Math.max(minRate, Math.round(value / rateStep) * rateStep));
  const angle = -135 + ((rate - minRate) / (maxRate - minRate)) * 270;
  const label = `${rate.toFixed(2)}×`;

  audio.playbackRate = rate;
  knob.style.setProperty("--angle", `${angle}deg`);
  knob.setAttribute("aria-valuenow", rate.toFixed(2));
  knob.setAttribute("aria-valuetext", `${rate.toFixed(2)} times`);
  rateOutput.textContent = label;
}

function showMissingAudio() {
  rateOutput.textContent = "NO AUDIO";
  window.setTimeout(() => {
    rateOutput.textContent = `${rate.toFixed(2)}×`;
  }, 1600);
}

function rayCharacter(angle, distance, rayIndex) {
  const direction = ((angle % Math.PI) + Math.PI) % Math.PI;
  const pulse = Math.floor(distance / 4 + rayIndex) % 5;

  if (pulse === 0) {
    return ".";
  }

  if (direction < Math.PI / 8 || direction > Math.PI * 7 / 8) {
    return "-";
  }

  if (direction < Math.PI * 3 / 8) {
    return "\\";
  }

  if (direction < Math.PI * 5 / 8) {
    return "|";
  }

  return "/";
}

function characterWidth(character) {
  return character.codePointAt(0) > 255 ? 2 : 1;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function measureCellWidth(fontSize) {
  if (measuredCellWidth) {
    return measuredCellWidth;
  }

  const probe = document.createElement("span");
  probe.textContent = "MMMMMMMMMMMMMMMM";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.whiteSpace = "pre";
  art.appendChild(probe);
  measuredCellWidth = probe.getBoundingClientRect().width / probe.textContent.length;
  probe.remove();

  return measuredCellWidth || fontSize * 0.6;
}

function renderGrid(grid, buddhaCells) {
  return grid.map((row, rowIndex) => {
    let html = "";
    let text = "";
    let isBuddha = false;

    function flush() {
      if (!text) {
        return;
      }

      const escapedText = escapeHtml(text);
      html += isBuddha ? `<span class="buddha-text">${escapedText}</span>` : escapedText;
      text = "";
    }

    row.forEach((character, columnIndex) => {
      if (buddhaCells[rowIndex][columnIndex] === 2) {
        return;
      }

      const nextIsBuddha = buddhaCells[rowIndex][columnIndex] === 1;

      if (nextIsBuddha !== isBuddha) {
        flush();
        isBuddha = nextIsBuddha;
      }

      text += character;
    });

    flush();
    return html;
  }).join("\n");
}

function renderArt(showRays, rotation = 0) {
  const styles = window.getComputedStyle(art);
  const fontSize = parseFloat(styles.fontSize);
  const lineHeight = parseFloat(styles.lineHeight) || fontSize * 1.24;
  const cellWidth = measureCellWidth(fontSize);
  const visibleColumns = window.innerWidth / cellWidth;
  const visibleRows = window.innerHeight / lineHeight;
  const columns = Math.ceil(visibleColumns) + 4;
  const rows = Math.ceil(visibleRows) + 2;
  const centerX = Math.round(visibleColumns / 2);
  const centerY = Math.round(visibleRows / 2);
  const rayCount = 28;
  const grid = Array.from({ length: rows }, () => Array(columns).fill(" "));
  const buddhaCells = Array.from({ length: rows }, () => Array(columns).fill(0));
  const horizontalReach = Math.max(centerX, columns - centerX) / 1.9;
  const verticalReach = Math.max(centerY, rows - centerY);
  const length = Math.hypot(horizontalReach, verticalReach) + 4;

  if (showRays) {
    for (let rayIndex = 0; rayIndex < rayCount; rayIndex += 1) {
      const angle = rotation + (rayIndex * Math.PI * 2) / rayCount;

      for (let distance = 1.5; distance < length; distance += 0.34) {
        if ((Math.floor(distance * 1.4) + rayIndex * 3) % 17 === 0) {
          continue;
        }

        const x = Math.round(centerX + Math.cos(angle) * distance * 1.9);
        const y = Math.round(centerY + Math.sin(angle) * distance);

        if (x < 0 || x >= columns || y < 0 || y >= rows) {
          continue;
        }

        grid[y][x] = rayCharacter(angle, distance, rayIndex);
      }
    }
  }

  const buddhaTop = centerY - Math.floor(buddhaLines.length / 2);
  const buddhaWidth = Math.max(...buddhaLines.map((line) => (
    Array.from(line).reduce((width, character) => width + characterWidth(character), 0)
  )));
  const buddhaLeft = centerX - Math.floor(buddhaWidth / 2);
  const firstBlankLine = buddhaLines.findIndex((line) => line.trim() === "");
  const bodyLineCount = firstBlankLine === -1 ? buddhaLines.length : firstBlankLine;

  buddhaLines.forEach((line, lineIndex) => {
    let column = buddhaLeft;
    const row = buddhaTop + lineIndex;

    if (row < 0 || row >= rows) {
      return;
    }

    const characters = Array.from(line);

    if (lineIndex < bodyLineCount) {
      let maskColumn = buddhaLeft;
      let maskStart = -1;
      let maskEnd = -1;

      characters.forEach((character) => {
        const width = characterWidth(character);

        if (character !== " ") {
          maskStart = maskStart === -1 ? maskColumn : maskStart;
          maskEnd = maskColumn + width - 1;
        }

        maskColumn += width;
      });

      for (let maskIndex = Math.max(0, maskStart); maskIndex <= Math.min(columns - 1, maskEnd); maskIndex += 1) {
        grid[row][maskIndex] = " ";
      }
    }

    characters.forEach((character) => {
      const width = characterWidth(character);

      if (character !== " " && column >= 0 && column < columns) {
        grid[row][column] = character;
        buddhaCells[row][column] = 1;

        if (width === 2 && column + 1 < columns) {
          grid[row][column + 1] = "";
          buddhaCells[row][column + 1] = 2;
        }
      }

      column += width;
    });
  });

  art.innerHTML = renderGrid(grid, buddhaCells);
}

function animateRays(timestamp) {
  if (lastRayTimestamp) {
    const elapsed = Math.min(timestamp - lastRayTimestamp, 100);
    rayRotation += elapsed * 0.00005 * rate;
  }

  lastRayTimestamp = timestamp;

  if (timestamp - lastRayFrame > 90) {
    renderArt(true, rayRotation);
    lastRayFrame = timestamp;
  }

  rayAnimationFrame = window.requestAnimationFrame(animateRays);
}

function startRays() {
  renderArt(true, rayRotation);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || rayAnimationFrame) {
    return;
  }

  lastRayTimestamp = 0;
  rayAnimationFrame = window.requestAnimationFrame(animateRays);
}

function stopRays() {
  window.cancelAnimationFrame(rayAnimationFrame);
  rayAnimationFrame = 0;
  lastRayTimestamp = 0;
  renderArt(false, rayRotation);
}

playButton.addEventListener("click", async () => {
  if (!audio.paused) {
    audio.pause();
    return;
  }

  try {
    await audio.play();
  } catch (error) {
    showMissingAudio();
  }
});

audio.addEventListener("play", () => {
  playButton.dataset.state = "playing";
  playButton.setAttribute("aria-label", "Pause the Great Compassion Mantra");
  startRays();
});

audio.addEventListener("pause", () => {
  playButton.dataset.state = "paused";
  playButton.setAttribute("aria-label", "Play the Great Compassion Mantra");
  stopRays();
});

audio.addEventListener("ended", () => {
  playButton.dataset.state = "paused";
  stopRays();
});

knob.addEventListener("pointerdown", (event) => {
  dragStartY = event.clientY;
  dragStartRate = rate;
  knob.setPointerCapture(event.pointerId);
});

knob.addEventListener("pointermove", (event) => {
  if (!knob.hasPointerCapture(event.pointerId)) {
    return;
  }

  setRate(dragStartRate + (dragStartY - event.clientY) / 120);
});

knob.addEventListener("wheel", (event) => {
  event.preventDefault();
  setRate(rate + (event.deltaY < 0 ? rateStep : -rateStep));
}, { passive: false });

knob.addEventListener("keydown", (event) => {
  if (["ArrowUp", "ArrowRight"].includes(event.key)) {
    event.preventDefault();
    setRate(rate + rateStep);
  }

  if (["ArrowDown", "ArrowLeft"].includes(event.key)) {
    event.preventDefault();
    setRate(rate - rateStep);
  }
});

setRate(rate);
renderArt(false);

window.addEventListener("resize", () => {
  measuredCellWidth = 0;
  renderArt(!audio.paused, rayRotation);
});
