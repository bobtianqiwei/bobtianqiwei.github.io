// scripts/sync-site-chrome.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");
const { inferCurrentSection, renderFooter, renderNav } = require("./site-chrome");

const repoRoot = path.resolve(__dirname, "..");
const navMarker = '<div data-collapse="small" data-animation="over-right" data-duration="400" id="navigation"';
const footerMarker = '<div class="footer-wrap">';
const skipDirs = new Set([".git", "node_modules"]);

function walkHtmlFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    if (skipDirs.has(entry.name)) {
      return;
    }

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(absolutePath));
      return;
    }

    if (entry.isFile() && absolutePath.endsWith(".html")) {
      files.push(absolutePath);
    }
  });

  return files;
}

function findMatchingDivEnd(html, startIndex) {
  const tagPattern = /<div\b|<\/div>/g;
  tagPattern.lastIndex = startIndex;
  let depth = 0;
  let match = null;

  while ((match = tagPattern.exec(html))) {
    if (match[0] === "<div") {
      depth += 1;
      continue;
    }

    depth -= 1;
    if (depth === 0) {
      return tagPattern.lastIndex;
    }
  }

  throw new Error("Could not find matching closing </div> tag.");
}

function replaceDivBlock(html, marker, replacement) {
  const startIndex = html.indexOf(marker);
  if (startIndex === -1) {
    return { html, changed: false };
  }

  const endIndex = findMatchingDivEnd(html, startIndex);
  return {
    html: `${html.slice(0, startIndex)}${replacement}${html.slice(endIndex)}`,
    changed: true
  };
}

function syncFile(absolutePath) {
  const originalHtml = fs.readFileSync(absolutePath, "utf8");
  const relativePath = path.relative(repoRoot, absolutePath);
  const currentSection = inferCurrentSection(relativePath);

  let nextHtml = originalHtml;
  let changed = false;

  const navResult = replaceDivBlock(nextHtml, navMarker, renderNav(currentSection));
  nextHtml = navResult.html;
  changed = changed || navResult.changed;

  const footerResult = replaceDivBlock(nextHtml, footerMarker, renderFooter());
  nextHtml = footerResult.html;
  changed = changed || footerResult.changed;

  if (!changed || nextHtml === originalHtml) {
    return false;
  }

  fs.writeFileSync(absolutePath, nextHtml);
  return true;
}

const updatedFiles = walkHtmlFiles(repoRoot).filter(syncFile);
console.log(`Synced shared navigation/footer in ${updatedFiles.length} file(s).`);
