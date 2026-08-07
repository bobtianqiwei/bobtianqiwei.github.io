// js/kindred-design-scale.js developed by Bob Tianqi Wei
(function () {
  const baseWidth = 220;

  function prepare(frame) {
    if (frame.classList.contains("is-scaled")) return;

    const canvas = document.createElement("div");
    canvas.className = "kindred-design-canvas";

    while (frame.firstChild) {
      canvas.appendChild(frame.firstChild);
    }

    frame.appendChild(canvas);
    frame.classList.add("is-scaled");

    function updateScale() {
      const width = frame.getBoundingClientRect().width;
      if (width > 0) {
        frame.style.setProperty("--kindred-design-scale", String(width / baseWidth));
      }
    }

    updateScale();

    if ("ResizeObserver" in window) {
      new ResizeObserver(updateScale).observe(frame);
    } else {
      window.addEventListener("resize", updateScale);
    }
  }

  document.querySelectorAll(".kindred-design-visual").forEach(prepare);
})();
