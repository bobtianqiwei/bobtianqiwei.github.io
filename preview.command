#!/bin/zsh

set -euo pipefail

cd "/Volumes/Disk/Programming/bobtianqiwei.github.io"

PORT="${1:-8000}"

echo "Starting local preview server..."
echo "Project: /Volumes/Disk/Programming/bobtianqiwei.github.io"
echo "URL: http://localhost:${PORT}/"
echo "Stop with Ctrl+C"
echo

python3 -m http.server "$PORT" >/tmp/bobtianqiwei-github-io-preview.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' INT TERM EXIT

sleep 1
open "http://localhost:${PORT}/"

wait "$SERVER_PID"
