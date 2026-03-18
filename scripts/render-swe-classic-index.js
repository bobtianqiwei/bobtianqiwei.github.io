// scripts/render-swe-classic-index.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");
const sweIndex = require("../content/swe-index");

const repoRoot = path.resolve(__dirname, "..");
const templatePath = path.join(repoRoot, "templates", "swe-classic-index-shell.html");
const outputPath = path.join(repoRoot, "swe", "classic", "index.html");

function isExternal(href) {
  return /^https?:\/\//.test(href);
}

function renderTrustedBy() {
  return `          <div class="box" id="trusted">
            <div class="box-title">Trusted By</div>
            <div class="box-body">
              <div class="trust-grid">
${sweIndex.trustedBy.map((item) => `                <a class="trust-item" href="${item.href}" target="_blank"><img${item.imageClass ? ` class="${item.imageClass}"` : ""} src="${item.image}" alt="${item.alt}"></a>`).join("\n")}
              </div>
            </div>
          </div>`;
}

function renderEssentials() {
  return `          <div class="box" id="essentials">
            <div class="box-title">Essentials</div>
            <div class="box-body">
              <table class="feature-table">
${sweIndex.essentials.map((item) => `                <tr>
                  <td class="thumb"><a href="${item.href}"${isExternal(item.href) ? ' target="_blank"' : ""}><img src="${item.image}" alt="${item.alt}"></a></td>
                  <td>
                    <p class="project-title"><a href="${item.href}"${isExternal(item.href) ? ' target="_blank"' : ""}>${item.title}</a></p>
                    <p class="project-meta">${item.meta}</p>
                    <p>${item.description}</p>
                  </td>
                </tr>`).join("\n")}
              </table>
            </div>
          </div>`;
}

function renderSelectedProjects() {
  return `          <div class="box" id="projects">
            <div class="box-title">Selected Projects</div>
            <div class="box-body">
              <table class="project-table">
${sweIndex.selectedProjects.map((item) => `                <tr>
                  <td><p class="project-title"><a href="${item.href}"${isExternal(item.href) ? ' target="_blank"' : ""}>${item.title}</a></p><p>${item.description}</p></td>
                </tr>`).join("\n")}
              </table>
            </div>
          </div>`;
}

function main() {
  const shell = fs.readFileSync(templatePath, "utf8");
  const startMarker = '          <div class="box" id="trusted">';
  const endMarker = "\n        </td>\n      </tr>";
  const startIndex = shell.indexOf(startMarker);
  const endIndex = shell.indexOf(endMarker, startIndex);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Unable to locate dynamic region in SWE classic index shell.");
  }

  const dynamicHtml = `${renderTrustedBy()}\n\n${renderEssentials()}\n\n${renderSelectedProjects()}`;
  const output = `${shell.slice(0, startIndex)}${dynamicHtml}${shell.slice(endIndex)}`;
  fs.writeFileSync(outputPath, output);
}

main();
