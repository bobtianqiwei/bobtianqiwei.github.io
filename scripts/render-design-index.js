// scripts/render-design-index.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");
const designIndex = require("../content/design-index");

const repoRoot = path.resolve(__dirname, "..");
const templatePath = path.join(repoRoot, "templates", "design-index-shell.html");
const outputPath = path.join(repoRoot, "design", "index.html");

function normalizeLightbox(lightbox) {
  if (!lightbox) {
    return null;
  }

  const clone = JSON.parse(JSON.stringify(lightbox));
  clone.items = (clone.items || []).map((item) => {
    const nextItem = { ...item };

    if (typeof nextItem.url === "string") {
      nextItem.url = nextItem.url.replace(/^(\.\.\/)?images\//, "/images/");
    }

    return nextItem;
  });

  return clone;
}

function renderImage(src, extraClass) {
  return `<img src="${src}" loading="lazy" alt="" class="${extraClass}">`;
}

function renderLinkStart(item, className, hrefOverride) {
  const href = hrefOverride || item.href;
  const target = /^https?:\/\//.test(href) ? ' target="_blank"' : "";

  if (item.lightbox) {
    return `<a href="#" class="lightbox-link w-inline-block w-lightbox">`;
  }

  return `<a href="${href}"${target} class="${className}">`;
}

function renderLightboxScript(item) {
  const lightbox = normalizeLightbox(item.lightbox);
  return lightbox
    ? `\n            <script type="application/json" class="w-json">${JSON.stringify(lightbox, null, 2)}</script>`
    : "";
}

function renderFeatureCard(item) {
  const imageClass = item.imageClass || "image-100";
  return `        <div class="work-column w-col w-col-6">
          ${renderLinkStart(item, "work-image-link w-inline-block")}
            <div class="w-layout-blockcontainer w-container">${renderImage(item.image, imageClass)}
              <div class="project-name-link">${item.contentHtml}</div>
            </div>${renderLightboxScript(item)}
          </a>
        </div>`;
}

function renderProjectCard(item) {
  const imageClass = item.imageClass || "image-38";
  return `        <div class="w-container">
          ${renderLinkStart(item, "project-link-block w-inline-block")}
            ${renderImage(item.image, imageClass)}
            <div class="work-page-project-name">${item.contentHtml}</div>${renderLightboxScript(item)}
          </a>
        </div>`;
}

function renderFeatureRows(rows) {
  return rows.length
    ? `    <div class="work-essentials-copy">
${rows.map((row) => `      <div class="work-essentials-columns w-row">
${row.map((item) => renderFeatureCard(item)).join("\n")}
      </div>`).join("\n")}
    </div>\n`
    : "";
}

function renderColumns(columns) {
  const columnClasses = ["column-13", "column-14", "column-15"];
  return `    <div class="work-columns w-row">
${columns.map((items, index) => `      <div class="${columnClasses[index] || ""} w-col w-col-4">
${items.map((item) => renderProjectCard(item)).join("\n")}
      </div>`).join("\n")}
    </div>`;
}

function renderSections() {
  return designIndex.sections.map((section) => {
    const featureRows = renderFeatureRows(section.featureRows || []);
    const columns = renderColumns(section.columns || [[], [], []]);
    return `    <h1 id="${section.id}" class="works-page-heading">${section.title}</h1>
${featureRows}${columns}`;
  }).join("\n");
}

function main() {
  const shell = fs.readFileSync(templatePath, "utf8");
  const startMarker = '    <h1 id="design-id" class="works-page-heading">OBJECTS</h1>';
  const endMarker = '    <section class="design-testimonials">';
  const startIndex = shell.indexOf(startMarker);
  const endIndex = shell.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Unable to locate dynamic region in design index shell.");
  }

  const output = `${shell.slice(0, startIndex)}${renderSections()}\n${shell.slice(endIndex)}`;
  fs.writeFileSync(outputPath, output);
}

main();
