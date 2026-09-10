# syntax=docker/dockerfile:1

# ---- build ----------------------------------------------------------------
# npm, NOT bun. bun.lock pins culori to Lovable's private registry
# (europe-west4-npm.pkg.dev/lovable-core-prod/...), which returns 403 outside
# their sandbox, so `bun install --frozen-lockfile` cannot work in a build like
# this one. package-lock.json resolves everything from registry.npmjs.org.
FROM node:22-slim AS build
WORKDIR /app

# `npm install`, not `npm ci`: this dependency tree resolves two ajv majors,
# which npm ci rejects as "lock file out of sync" even on a lockfile npm has
# just generated itself. Verified from a clean checkout.
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .

# The Vite config defaults Nitro to the Cloudflare Workers target. Fly runs a
# plain container, so build the Node server preset instead — that is what
# produces .output/server/index.mjs.
ARG VITE_SITE_ENV=local
ENV VITE_SITE_ENV=$VITE_SITE_ENV
ENV NITRO_PRESET=node-server
RUN echo "Building with VITE_SITE_ENV=$VITE_SITE_ENV" && npm run build

# ---- run ------------------------------------------------------------------
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# The Nitro node-server bundle is self-contained: no node_modules needed.
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
