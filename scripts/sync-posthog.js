// scripts/sync-posthog.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");

const scriptTag = '  <script async src="/js/posthog.js"></script>';

function withPostHog(html) {
  if (!/<head\b[^>]*>/i.test(html) || html.includes('src="/js/posthog.js"')) return html;
  return html.replace(/<\/head>/i, `${scriptTag}\n</head>`);
}

function syncDirectory(directory) {
  let updated = 0;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      updated += syncDirectory(filePath);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const original = fs.readFileSync(filePath, "utf8");
      const next = withPostHog(original);
      if (next !== original) {
        fs.writeFileSync(filePath, next);
        updated += 1;
      }
    }
  }
  return updated;
}

if (require.main === module) {
  console.log(`Added PostHog to ${syncDirectory(path.resolve(__dirname, ".."))} HTML file(s).`);
}

module.exports = { withPostHog };
