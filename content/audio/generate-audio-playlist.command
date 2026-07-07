#!/bin/zsh
# generate-audio-playlist.command developed by Bob Tianqi Wei

set -euo pipefail

cd "${0:A:h}/../.."
node scripts/generate-audio-playlist.js

echo
echo "Audio playlist updated. You can close this window."
read -k 1 "?Press any key to close."
