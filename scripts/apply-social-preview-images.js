// scripts/apply-social-preview-images.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");
const worksIndex = require("../content/works-index.js");
const visionContent = require("../vision/vision-content-data.js");

const repoRoot = path.resolve(__dirname, "..");
const siteOrigin = "https://bobtianqiwei.github.io";

function getImageSource(image) {
  if (typeof image === "string") {
    return image;
  }

  return image && typeof image.src === "string" ? image.src : "";
}

function toAbsoluteUrl(imageSource) {
  if (!imageSource) {
    return "";
  }

  return new URL(imageSource, siteOrigin).href;
}

function routeToFilePath(route) {
  const cleanRoute = route.split(/[?#]/)[0];
  const relativePath = cleanRoute.replace(/^\//, "").replace(/\/$/, "/index.html");
  return path.join(repoRoot, relativePath);
}

function filePathToRoute(filePath) {
  const relativePath = path.relative(repoRoot, filePath).split(path.sep).join("/");
  return "/" + relativePath.replace(/index\.html$/, "");
}

function findIndexFiles(directory) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(function (entry) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return findIndexFiles(entryPath);
    }

    return entry.name === "index.html" ? [entryPath] : [];
  });
}

function upsertSocialImageMeta(filePath, imageSource) {
  const absoluteImageUrl = toAbsoluteUrl(imageSource);

  if (!absoluteImageUrl || !fs.existsSync(filePath)) {
    return false;
  }

  const originalHtml = fs.readFileSync(filePath, "utf8");
  const withoutExistingTags = originalHtml
    .replace(/^[ \t]*<meta\b[^>]*(?:property|name)=["']og:image["'][^>]*>[ \t]*(?:\r?\n)?/gim, "")
    .replace(/^[ \t]*<meta\b[^>]*(?:property|name)=["']twitter:image["'][^>]*>[ \t]*(?:\r?\n)?/gim, "")
    .replace(/(<\/title>)\r?\n(?:[ \t]*\r?\n)+/i, "$1\n")
    .replace(/\r?\n[ \t]*\r?\n(?=[ \t]*<meta\b)/g, "\n");
  const hasTwitterCard = /<meta\b[^>]*name=["']twitter:card["'][^>]*>/i.test(withoutExistingTags);
  const socialTags = [
    `  <meta property="og:image" content="${absoluteImageUrl}">`,
    `  <meta name="twitter:image" content="${absoluteImageUrl}">`,
    hasTwitterCard ? "" : '  <meta name="twitter:card" content="summary_large_image">'
  ].filter(Boolean).join("\n");
  const updatedHtml = withoutExistingTags.replace(/(<title>[\s\S]*?<\/title>)/i, "$1\n" + socialTags);

  if (updatedHtml === originalHtml) {
    return false;
  }

  fs.writeFileSync(filePath, updatedHtml);
  return true;
}

const worksCoverByRoute = new Map();

for (const entry of worksIndex.entries || []) {
  const imageSource = getImageSource(entry.image);

  if (typeof entry.href === "string" && entry.href.startsWith("/works/") && imageSource && !worksCoverByRoute.has(entry.href)) {
    worksCoverByRoute.set(entry.href, imageSource);
  }
}

worksCoverByRoute.set("/works/music-technology/", "/images/IMG_0470-2.jpg");

const changedFiles = [];
const skippedRoutes = [];

for (const item of visionContent.reflections || []) {
  const imageSource = getImageSource(item.image);
  const filePath = routeToFilePath(item.href || "");

  if (imageSource && upsertSocialImageMeta(filePath, imageSource)) {
    changedFiles.push(path.relative(repoRoot, filePath));
  }
}

for (const filePath of findIndexFiles(path.join(repoRoot, "works"))) {
  const route = filePathToRoute(filePath);

  if (route === "/works/") {
    continue;
  }

  const matchingRoute = Array.from(worksCoverByRoute.keys())
    .filter(function (candidateRoute) {
      return route === candidateRoute || route.startsWith(candidateRoute);
    })
    .sort(function (left, right) {
      return right.length - left.length;
    })[0];
  const imageSource = matchingRoute ? worksCoverByRoute.get(matchingRoute) : "";

  if (!imageSource) {
    skippedRoutes.push(route);
    continue;
  }

  if (upsertSocialImageMeta(filePath, imageSource)) {
    changedFiles.push(path.relative(repoRoot, filePath));
  }
}

console.log(`Social preview images updated in ${changedFiles.length} page${changedFiles.length === 1 ? "" : "s"}.`);

if (skippedRoutes.length) {
  console.log(`No cover image configured for: ${skippedRoutes.join(", ")}`);
}
