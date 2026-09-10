# Deploying to Fly.io

Everything below was verified from a clean checkout of this repo: `npm install`
→ `NITRO_PRESET=node-server vite build` → `node .output/server/index.mjs`, with
`/`, `/services` and `/contact` all returning 200.

## Step 0 — Fix the logo first (required)

`src/assets/zedventures-logo.png.asset.json` points at:

```
/__l5e/assets-v1/883225e3-675b-4a0a-8c77-20a9b61fb548/zedventures-logo.png
```

That path is served by Lovable's platform, not by this app. **Anywhere else —
Fly, Vercel, your laptop — it returns 404 and the logo renders as broken alt
text in the header and footer.** Confirmed against the production build.

1. Open the live Lovable preview, right-click the header logo, **Save image as…**
2. Save it as `public/zedventures-logo.png` in this repo.
3. Change the one line in `src/assets/zedventures-logo.png.asset.json`:

```diff
-  "url": "/__l5e/assets-v1/883225e3-675b-4a0a-8c77-20a9b61fb548/zedventures-logo.png",
+  "url": "/zedventures-logo.png",
```

Check it locally before deploying: `npm run dev`, then look at the header.

## Step 1 — Install the CLI and sign in

```bash
brew install flyctl          # macOS; see fly.io/docs/flyctl/install for others
fly auth login               # opens a browser
```

## Step 2 — Create the app

```bash
fly launch --no-deploy
```

Say **no** when it offers to overwrite the `fly.toml` in this repo — it is
already configured. Say **no** to Postgres, Redis and Upstash; this site has no
database.

`fly launch` will rename `app` in `fly.toml` to something globally unique.
Also change `primary_region` if `yyz` (Toronto) is not where you want it —
`sjc` for the Bay Area, `iad` for US East.

## Step 3 — Deploy

```bash
fly deploy
```

First build takes 3–5 minutes. Then:

```bash
fly open        # opens the site
fly logs        # if something looks wrong
```

## Redeploying after changes

```bash
git push        # if you use GitHub
fly deploy      # rebuilds and ships
```

## What the config does

- **`Dockerfile`** — two stages. Builds with Node 22 and `NITRO_PRESET=node-server`,
  then copies only `.output` into a slim runtime image. The Nitro node-server
  bundle is self-contained, so the runtime image carries no `node_modules`.
- **`fly.toml`** — one shared-cpu-1x machine with 512 MB, listening on port 3000,
  HTTPS forced. `min_machines_running = 0` with auto stop/start means the machine
  sleeps when nobody is looking at it, so a preview site costs close to nothing.
  The trade-off: the first request after an idle period takes a second or two
  to wake the machine.

## Two things that will bite you if you change them

- **`NITRO_PRESET=node-server` is not optional.** `vite.config.ts` uses
  `@lovable.dev/vite-tanstack-config`, which defaults Nitro to the **Cloudflare
  Workers** target. Without the env var the build produces a Worker bundle and
  there is no `.output/server/index.mjs` for the container to run.
- **The Dockerfile uses `npm`, not `bun`, on purpose.** `bun.lock` pins `culori`
  to Lovable's private registry (`europe-west4-npm.pkg.dev/lovable-core-prod/…`),
  which returns **403** outside their sandbox — `bun install --frozen-lockfile`
  fails in any external build. It also uses `npm install` rather than `npm ci`,
  because this tree resolves two major versions of `ajv` and `npm ci` rejects
  that as an out-of-sync lockfile even on a lockfile npm just wrote itself.

## Before this is a real production site, not just a preview

- The contact form hands the message to the visitor's mail client; there is
  still no backend receiving submissions.
- `src/lib/i18n.tsx` publishes `+1 (408) 555-0134` — that is a reserved
  fake-number range.
- The Careers CTA is still `href="#"`.
