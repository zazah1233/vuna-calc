# ── Stage 1: Build & Test ──────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies (ci uses package-lock.json for reproducible builds)
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Run linting, tests, then build
RUN npm run lint && npm test && npm run build

# ── Stage 2: Production nginx image ───────────────────────────────────────
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
