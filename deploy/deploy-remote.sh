#!/usr/bin/env bash
# Runs on the EC2 host. Keep the previous Git revision live until the new
# application passes its local health check; rollback is automatic on failure.
set -Eeuo pipefail

APP_DIRECTORY="${1:?Usage: deploy-remote.sh <app-directory> <domain-name>}"
DOMAIN_NAME="${2:?Usage: deploy-remote.sh <app-directory> <domain-name>}"
HEALTH_URL="http://127.0.0.1:3000/"

rollback() {
  local exit_code=$?
  trap - ERR
  echo "Deployment failed; rolling back to ${PREVIOUS_REF}."
  git -C "$APP_DIRECTORY" reset --hard "$PREVIOUS_REF"
  npm --prefix "$APP_DIRECTORY" ci --no-audit --no-fund
  npm --prefix "$APP_DIRECTORY" run build
  pm2 reload "$APP_DIRECTORY/deploy/pm2/ecosystem.config.cjs" --only gavior --update-env
  pm2 save
  echo "Rollback completed."
  exit "$exit_code"
}

if [[ ! -d "$APP_DIRECTORY/.git" ]]; then
  echo "Expected a Git checkout at $APP_DIRECTORY." >&2
  exit 1
fi
PREVIOUS_REF="$(git -C "$APP_DIRECTORY" rev-parse HEAD)"
trap rollback ERR

echo "Deploying gavior to ${DOMAIN_NAME}; previous revision: ${PREVIOUS_REF}"
git -C "$APP_DIRECTORY" fetch --prune origin main
git -C "$APP_DIRECTORY" reset --hard origin/main
npm --prefix "$APP_DIRECTORY" ci --no-audit --no-fund
npm --prefix "$APP_DIRECTORY" run build

# reload is graceful and keeps active requests on the old process. The first
# deployment creates the process if it does not already exist.
if pm2 describe gavior >/dev/null 2>&1; then
  pm2 reload "$APP_DIRECTORY/deploy/pm2/ecosystem.config.cjs" --only gavior --update-env
else
  pm2 start "$APP_DIRECTORY/deploy/pm2/ecosystem.config.cjs" --only gavior
fi
pm2 save

for attempt in 1 2 3 4 5; do
  if curl --fail --silent --show-error --max-time 10 "$HEALTH_URL" >/dev/null; then
    echo "Deployment successful: ${DOMAIN_NAME} is responding locally."
    trap - ERR
    exit 0
  fi
  sleep 2
done

echo "Application health check failed."
false
