// scripts/works-data.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const musicDir = path.join(rootDir, "content", "music");

function loadModules(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((fileName) => fileName.endsWith(".js") && !fileName.startsWith("_"))
    .sort()
    .map((fileName) => require(path.join(dirPath, fileName)));
}

const musicItems = loadModules(musicDir);
const worksIndex = require(path.join(rootDir, "content", "works-index.js"));

const indexSections = {};

for (const entry of worksIndex.entries || []) {
  if (!indexSections[entry.section]) {
    indexSections[entry.section] = [];
  }
  indexSections[entry.section].push(entry);
}

for (const entries of Object.values(indexSections)) {
  entries.sort((left, right) => (left.order || 0) - (right.order || 0));
}

const fineArtEntries = (indexSections["FINE ART"] || []).filter((entry) => typeof entry.column === "number");
const fineArtColumns = [0, 1, 2].map((columnIndex) =>
  fineArtEntries
    .filter((entry) => entry.column === columnIndex)
    .sort((left, right) => (left.columnOrder || 0) - (right.columnOrder || 0))
);

const musicColumns = [0, 1, 2].map((columnIndex) =>
  musicItems
    .filter((item) => item.column === columnIndex)
    .sort((left, right) => (left.order || 0) - (right.order || 0))
);

module.exports = {
  indexSections,
  fineArtColumns,
  musicColumns
};
