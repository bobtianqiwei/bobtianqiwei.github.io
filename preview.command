#!/bin/zsh

set -euo pipefail

cd "/Volumes/Disk/Programming/bobtianqiwei.github.io"

PORT="${1:-8000}"

echo "Starting local preview server..."
echo "Project: /Volumes/Disk/Programming/bobtianqiwei.github.io"
echo "URL: http://localhost:${PORT}/"
echo "Stop with Ctrl+C"
echo

python3 -m http.server "$PORT"
