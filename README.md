# Aura Landing Page

Public marketing/landing website for Aura. The app is built with React + Vite
and is served in production by nginx.

## Local Development

```sh
npm install
npm run dev
```

## Docker

Build and run the standalone landing page container:

```sh
docker compose up --build -d
```

Default host URL:

```txt
http://localhost:3000
```

Override the published host port if needed:

```sh
LANDING_PORT=8080 docker compose up --build -d
```

The container serves the built Vite app on internal port `80` and exposes a
health endpoint at `/healthz`.
