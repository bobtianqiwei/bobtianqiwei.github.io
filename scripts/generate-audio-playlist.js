// generate-audio-playlist.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const audioDirectory = path.join(repoRoot, "content", "audio");
const playlistPath = path.join(audioDirectory, "playlist.js");
const winampBundlePath = path.join(repoRoot, "swe", "winxp", "static", "js", "main.df788235.js");
const audioExtensions = new Set([".aac", ".flac", ".m4a", ".mp3", ".ogg", ".wav"]);
const sharedPlaylistExpression = "Or=(window.siteAudioLibrary||[]).map(function(e){return{url:e.url,metaData:{title:e.title,artist:e.artist}}})";

function getTrack(filename) {
  const extension = path.extname(filename);
  const name = path.basename(filename, extension);
  const separatorIndex = name.lastIndexOf(" - ");
  const title = separatorIndex === -1 ? name : name.slice(0, separatorIndex);
  const artist = separatorIndex === -1 ? "" : name.slice(separatorIndex + 3);

  return {
    url: `/content/audio/${encodeURIComponent(filename)}`,
    title,
    artist
  };
}

const tracks = fs.readdirSync(audioDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && audioExtensions.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .map(getTrack)
  .sort((a, b) => {
    const aIsRobertWei = a.artist.toLowerCase() === "robert wei";
    const bIsRobertWei = b.artist.toLowerCase() === "robert wei";

    if (aIsRobertWei !== bIsRobertWei) {
      return aIsRobertWei ? -1 : 1;
    }

    return a.title.localeCompare(b.title, "en", { numeric: true, sensitivity: "base" });
  });

const output = `// playlist.js developed by Bob Tianqi Wei\nwindow.siteAudioLibrary = ${JSON.stringify(tracks, null, 2)};\n`;

fs.writeFileSync(playlistPath, output);

const winampBundle = fs.readFileSync(winampBundlePath, "utf8");

if (!winampBundle.includes(sharedPlaylistExpression)) {
  const playlistStart = winampBundle.indexOf("Or=[{url:");
  const playlistEnd = winampBundle.indexOf("];var Nr=", playlistStart);

  if (playlistStart === -1 || playlistEnd === -1) {
    throw new Error("Unable to locate the Winamp playlist in the active bundle.");
  }

  const updatedBundle = `${winampBundle.slice(0, playlistStart)}${sharedPlaylistExpression}${winampBundle.slice(playlistEnd + 1)}`;
  fs.writeFileSync(winampBundlePath, updatedBundle);
}

console.log(`Generated ${tracks.length} track${tracks.length === 1 ? "" : "s"} in content/audio/playlist.js.`);
