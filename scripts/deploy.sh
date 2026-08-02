#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
npm ci
npm run lint
npm run build
sudo systemctl restart gavior
sudo systemctl is-active --quiet gavior
echo "Gavior is running at http://127.0.0.1:3000"
