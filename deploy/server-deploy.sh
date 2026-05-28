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

log "Installing dependencies (npm ci, including devDeps)"
# Force devDependencies on the server even if NODE_ENV=production or a
# host-level .npmrc sets production=true / omit=dev — vite is a devDep.
NODE_ENV=development npm ci --no-audit --no-fund --include=dev --production=false

if [ ! -x "node_modules/.bin/vite" ]; then
  warn "node_modules/.bin/vite still missing after npm ci — dumping npm config for diagnosis"
  echo "--- npm config ---"; npm config list -l 2>&1 | sed 's/^/    /'
  echo "--- vite package present? ---"; ls -la node_modules/vite 2>&1 | sed 's/^/    /' || true
  echo "--- .bin/ entries ---"; ls node_modules/.bin/ 2>&1 | sed 's/^/    /' || true
  warn "Attempting fallback: explicit install of vite"
  npm install --no-save --no-audit --no-fund vite @vitejs/plugin-react
fi

log "Building"
# Call vite directly (rather than via `npm run`) so we don't depend on
# whatever shell `npm run` spawns finding ./node_modules/.bin on PATH.
node ./scripts/sync-version.mjs
node ./node_modules/vite/bin/vite.js build

# --- Ensure pm2 + serve are installed -----------------------------------
ensure_pm2() {
  if command -v pm2 >/dev/null 2>&1 && command -v serve >/dev/null 2>&1; then
    return 0
  fi
  log "Installing pm2 + serve globally"
  if npm i -g pm2 serve >/dev/null 2>&1; then
    return 0
  fi
  if command -v sudo >/dev/null 2>&1 && sudo -n true >/dev/null 2>&1; then
    log "Retrying global install with sudo"
    sudo -n npm i -g pm2 serve
    return $?
  fi
  warn "Could not install pm2/serve globally (no passwordless sudo)."
  warn "Run once manually:  sudo npm i -g pm2 serve"
  return 1
}

# --- Restart server process ---------------------------------------------
if ensure_pm2; then
  if pm2 describe "$PM2_APP_NAME" >/dev/null 2>&1; then
    log "Reloading PM2 process: $PM2_APP_NAME"
    pm2 reload "$PM2_APP_NAME" --update-env
  else
    log "Starting PM2 process: $PM2_APP_NAME (serve dist on :$SERVE_PORT)"
    pm2 start "$(command -v serve)" --name "$PM2_APP_NAME" -- -s dist -l "$SERVE_PORT"
    pm2 save || true
    warn "First-time PM2 start: run \`pm2 startup\` once on the server (interactively) so the daemon survives reboots."
  fi
else
  warn "Skipped process restart — dist/ is built and ready at $APP_DIR/dist."
fi

ok "Deploy complete (sha: $(git rev-parse --short HEAD))"

# --- Diagnostics: what is actually serving :$SERVE_PORT? ----------------
log "Diagnosing serving on :$SERVE_PORT"

echo "--- :$SERVE_PORT listener (sudo -n ss -tlnp) ---"
sudo -n ss -tlnp 2>&1 | grep -E "[:.]${SERVE_PORT}\b" | sed 's/^/    /' || echo "    (none or sudo failed)"

echo "--- pm2 describe $PM2_APP_NAME ---"
pm2 describe "$PM2_APP_NAME" 2>&1 | grep -E "(pid|status|restarts|uptime|exec cwd|script args|exit code|out log path|error log path|created at)" | sed 's/^/    /' || true

echo "--- pm2 error log tail ---"
ERR_LOG="$HOME/.pm2/logs/${PM2_APP_NAME}-error.log"
if [ -f "$ERR_LOG" ]; then
  tail -30 "$ERR_LOG" 2>&1 | sed 's/^/    /'
else
  echo "    (no error log at $ERR_LOG)"
fi

echo "--- dist/version.json on disk ---"
cat "$APP_DIR/dist/version.json" 2>&1 | sed 's/^/    /' || echo "    (missing)"

echo "--- curl localhost:$SERVE_PORT/version.json ---"
curl -s --max-time 5 "http://127.0.0.1:${SERVE_PORT}/version.json" | sed 's/^/    /' || echo "    (curl failed)"

echo "--- nginx config grep for :$SERVE_PORT (sudo -n nginx -T) ---"
sudo -n nginx -T 2>&1 | grep -E "(listen .*${SERVE_PORT}|root |alias |proxy_pass )" | sed 's/^/    /' | head -40 || echo "    (sudo failed or nginx absent)"

echo "--- docker container publishing :$SERVE_PORT ---"
(docker ps --format 'table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Command}}' 2>&1 || sudo -n docker ps --format 'table {{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Command}}' 2>&1) | grep -E "(CONTAINER|${SERVE_PORT})" | sed 's/^/    /' || echo "    (docker inaccessible)"

echo "--- inspect: source path / volume / compose project of that container ---"
CID=$( (docker ps --format '{{.ID}} {{.Ports}}' 2>/dev/null || sudo -n docker ps --format '{{.ID}} {{.Ports}}' 2>/dev/null) | awk -v p="$SERVE_PORT" '$0 ~ ":"p"->" {print $1; exit}')
if [ -n "$CID" ]; then
  echo "    container id: $CID"
  (docker inspect "$CID" 2>/dev/null || sudo -n docker inspect "$CID" 2>/dev/null) | \
    grep -E "\"(Image|WorkingDir|Source|Destination|com.docker.compose.project|com.docker.compose.project.working_dir|com.docker.compose.service|com.docker.compose.config-hash)\"" | \
    sed 's/^/    /'
fi
