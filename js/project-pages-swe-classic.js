// project-pages-swe-classic.js developed by Bob Tianqi Wei
(function () {
  function initSlider(root) {
    const slides = Array.from(root.querySelectorAll(".classic-slide"));
    const dots = Array.from(root.querySelectorAll(".classic-slider-dot"));
    const prev = root.querySelector("[data-classic-slider-prev]");
    const next = root.querySelector("[data-classic-slider-next]");

    if (slides.length <= 1) {
      if (prev) prev.hidden = true;
      if (next) next.hidden = true;
      return;
    }

    let index = 0;
    let timer = null;

    function render() {
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
    }

    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      render();
    }

    function restartAutoPlay() {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        show(index + 1);
      }, 4000);
    }

    if (prev) {
      prev.addEventListener("click", function () {
        show(index - 1);
        restartAutoPlay();
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        show(index + 1);
        restartAutoPlay();
      });
    }

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener("click", function () {
        show(dotIndex);
        restartAutoPlay();
      });
    });

    root.addEventListener("mouseenter", function () {
      window.clearInterval(timer);
    });

    root.addEventListener("mouseleave", function () {
      restartAutoPlay();
    });

    render();
    restartAutoPlay();
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-classic-slider]").forEach(initSlider);
  });
})();
