#!/usr/bin/env bash
# Server-side deploy. Invoked by .github/workflows/deploy.yml via:
#   ssh ... bash -s < deploy/server-deploy.sh
# with these env vars set:
#
#   APP_DIR    - absolute path to the checkout on the server
#   GIT_REMOTE - https URL of the repo
#   GIT_REF    - branch name (usually "main")
#   GIT_SHA    - commit SHA being deployed
#
# Strategy: this repo ships a docker-compose.yml + multi-stage Dockerfile
# that does `npm ci && npm run build` inside the build stage and serves
# dist/ via nginx in the runtime stage. So the host only needs to pull
# the latest sources and `docker compose up -d --build` — no host-side
# Node, no PM2, no Vite required.

set -Eeuo pipefail

: "${APP_DIR:?APP_DIR required}"
: "${GIT_REMOTE:?GIT_REMOTE required}"
: "${GIT_REF:=main}"
: "${GIT_SHA:=}"

SERVICE_NAME="landing"
CONTAINER_NAME="aura-landing"
PUBLIC_PORT="7001"

log()  { printf '\n\033[1;36m→ %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m✓ %s\033[0m\n' "$*"; }
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

# --- Pick a compose CLI --------------------------------------------------
if ! command -v docker >/dev/null 2>&1; then
  warn "docker not installed on server"
  exit 1
fi

compose() {
  if docker compose version >/dev/null 2>&1; then
    docker compose "$@"
  elif command -v docker-compose >/dev/null 2>&1; then
    docker-compose "$@"
  else
    warn "no docker compose CLI found"
    return 127
  fi
}

# --- Remove obsolete pm2 process from earlier deploy iterations ---------
if command -v pm2 >/dev/null 2>&1 && pm2 describe "$CONTAINER_NAME-page" >/dev/null 2>&1; then
  log "Removing obsolete pm2 process (now using docker)"
  pm2 delete "$CONTAINER_NAME-page" >/dev/null 2>&1 || true
  pm2 save >/dev/null 2>&1 || true
fi

# --- Rebuild + roll the container ---------------------------------------
log "docker compose build $SERVICE_NAME (npm ci + vite build run inside the build stage)"
compose build "$SERVICE_NAME"

log "docker compose up -d $SERVICE_NAME (recreate container)"
compose up -d "$SERVICE_NAME"

# Free disk from the previous image layer
docker image prune -f >/dev/null 2>&1 || true

# --- Wait for healthy ---------------------------------------------------
log "Waiting for container healthcheck"
state="unknown"
for _ in $(seq 1 30); do
  state=$(docker inspect -f '{{.State.Health.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "unknown")
  case "$state" in
    healthy) break ;;
    unhealthy) break ;;
  esac
  sleep 2
done
if [ "$state" = "healthy" ]; then
  ok "Container healthy"
else
  warn "Container state: $state — dumping recent logs"
  docker logs --tail 40 "$CONTAINER_NAME" 2>&1 | sed 's/^/    /' || true
fi

# --- Verify the new version is actually being served --------------------
log "Verifying http://127.0.0.1:$PUBLIC_PORT/version.json"
curl -fsS --max-time 5 "http://127.0.0.1:${PUBLIC_PORT}/version.json" | sed 's/^/    /' || warn "version.json fetch failed"

ok "Deploy complete (sha: $(git rev-parse --short HEAD))"
