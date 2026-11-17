// image-alt.js developed by Bob Tianqi Wei
function imageAlt(image, fallback = "") {
  const text = typeof image === "object" && image !== null
    ? image.alt ?? image.caption ?? image.captionHtml ?? fallback
    : fallback;

  return String(text)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/&(?!(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);)/gi, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = { imageAlt };
