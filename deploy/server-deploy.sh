#!/usr/bin/env bash
# Server-side deploy script. Invoked by .github/workflows/deploy.yml via
# `ssh ... bash -s < deploy/server-deploy.sh` with these env vars set:
#
#   APP_DIR    - absolute path to the checkout on the server
#   GIT_REMOTE - https URL of the repo
#   GIT_REF    - branch name being deployed (usually "main")
#   GIT_SHA    - commit SHA being deployed
#
# Safe to re-run. If APP_DIR does not exist, the repo is cloned. If PM2
# is installed, the aura-landing-page process is reloaded (or started on
# first deploy). If PM2 is absent, the build still completes — start
# your serving process however you like.

set -Eeuo pipefail

: "${APP_DIR:?APP_DIR required}"
: "${GIT_REMOTE:?GIT_REMOTE required}"
: "${GIT_REF:=main}"
: "${GIT_SHA:=}"

PM2_APP_NAME="aura-landing-page"
SERVE_PORT="7001"

log() { printf '\n\033[1;36m→ %s\033[0m\n' "$*"; }
ok()  { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m! %s\033[0m\n' "$*" >&2; }

# --- Sync sources --------------------------------------------------------
if [ ! -d "$APP_DIR/.git" ]; then
  log "Cloning $GIT_REMOTE into $APP_DIR"
  mkdir -p "$(dirname "$APP_DIR")"
  git clone --branch "$GIT_REF" "$GIT_REMOTE" "$APP_DIR"
fi

cd "$APP_DIR"

log "Fetching latest from origin"
git remote set-url origin "$GIT_REMOTE"
git fetch --all --prune --tags

TARGET="${GIT_SHA:-origin/$GIT_REF}"
log "Resetting to $TARGET"
git reset --hard "$TARGET"
git clean -fd

# --- Install + build -----------------------------------------------------
if ! command -v node >/dev/null 2>&1; then
  warn "node not found on server. Install Node 20+ and re-run."
  exit 1
fi

log "Installing dependencies (npm ci)"
npm ci --no-audit --no-fund

log "Building"
npm run build

# --- Restart server process ---------------------------------------------
if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
    log "Reloading PM2 process: $PM2_APP_NAME"
    pm2 reload "$PM2_APP_NAME" --update-env
  else
    log "Starting PM2 process: $PM2_APP_NAME (serve dist on :$SERVE_PORT)"
    pm2 start npx --name "$PM2_APP_NAME" -- serve -s dist -l "$SERVE_PORT"
    pm2 save || true
  fi
else
  warn "pm2 not installed — built dist/ but did NOT restart any server process."
  warn "To set up serving:  npm i -g pm2 serve  &&  pm2 start npx --name $PM2_APP_NAME -- serve -s dist -l $SERVE_PORT"
fi

ok "Deploy complete (sha: $(git rev-parse --short HEAD))"
