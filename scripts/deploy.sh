#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
NODE_OPTIONS=--max-old-space-size=512 npm ci --no-audit --no-fund --maxsockets=1
npm run lint
NODE_OPTIONS=--max-old-space-size=768 npm run build
sudo systemctl restart gavior
sudo systemctl is-active --quiet gavior
echo "Gavior is running at http://127.0.0.1:3000"
