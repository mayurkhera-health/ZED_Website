# Environments and deploying

Three copies of this site. Work flows one way — **local → staging → production**
— so that a mistake is found by someone who is not a customer.

| | Where | Who sees it | Deploy command |
|---|---|---|---|
| **local** | your laptop | you | `npm run dev` |
| **staging** | Fly app `zedventures-test` | you, anyone you send the link to | `fly deploy -c fly.staging.toml` |
| **production** | Fly app named in `fly.production.toml` | customers | `fly deploy -c fly.production.toml` |

**There is no `fly.toml` in this repo, on purpose.** A bare `fly deploy` fails
with "Could not find a fly.toml" instead of guessing which app to send your
changes to. Guessing is how a test change reaches a live site — it has already
happened once on another project. You must name the target every time.

---

## Making a change — the loop

**Every block in this file is safe to paste.** No inline `#` comments — zsh
does not treat `#` as a comment when typed interactively, so a commented
command line gets passed to the program as arguments and fails.

1. Pull, in case main moved:

```
git pull
```

2. Make the change and watch it at http://localhost:8080:

```
npm run dev
```

3. In a second terminal, check the types:

```
npx tsc --noEmit
```

4. Commit and push, so it exists somewhere other than this laptop:

```
git add -A
git commit -m "what changed and why"
git push origin main
```

5. Deploy to staging and look at it:

```
fly deploy -c fly.staging.toml
```

6. Only once staging looks right:

```
fly deploy -c fly.production.toml
```

Steps 2 and 6 are the ones that were missing before. Every change used to go
straight from an editor to a deployed site, which is why a broken logo and a
fake phone number sat live for weeks and a contact form failure had to be
debugged by reading server logs.

Two habits worth keeping:

**Look at the badge before you touch anything.** Bottom-left corner. `local`,
`staging`, or nothing at all — and nothing at all means you are on production.

**Never type `fly deploy` without `-c`.** There is no fly.toml, so it will
refuse rather than guess, but the habit is what protects you on the projects
that still have one.

---

## Local

```
npm install          # once, or after package.json changes
npm run dev          # http://localhost:8080 (port comes from the Lovable vite preset,
                     # not from us; 3000 is the CONTAINER port on Fly)
```

Edit a file and the page reloads. Nothing here reaches anyone. This is where
bugs should be found and where you should reproduce anything that looks wrong
on staging before touching a deployment.

Before you push, two checks that take seconds:

```
npx tsc --noEmit     # types
npm run lint
```

## Staging

```
fly deploy -c fly.staging.toml
```

Deploy `main` here freely — that is what it is for. The build stamps
`VITE_SITE_ENV=staging`, which does two things automatically:

- every page emits `<meta name="robots" content="noindex, nofollow">`, and the
  image ships a `robots.txt` that disallows everything, so staging can never
  appear in a search result competing with the real site;
- a **STAGING** badge sits in the bottom-left corner of every page, so nobody
  ever has to read the URL to know which copy they are looking at.

Staging scales to zero when idle, so it costs almost nothing and the first hit
after a quiet spell takes a second or two to wake.

## Production

Not created yet. Before the first deploy:

1. Choose the app name, `fly apps create <name>`, and put it in
   `fly.production.toml` in place of `CHANGEME-zedventures-production`.
2. Set the real secrets (see below).
3. Point the domain at it: `fly certs add zedventures.com -a <name>`.

```
fly deploy -c fly.production.toml
```

**Only deploy a commit here that is already running on staging.** That is the
entire point of having two. Production keeps one machine always running rather
than scaling to zero, so a customer never waits for a cold start.

---

## Secrets

Set per app, never committed. The two environments must not share them.

The contact form sends through Google Workspace SMTP, so the credential is a
Google **App Password** — not your account password, and not a third-party API
key. App Passwords only exist once 2-Step Verification is on for that account:
Google Account -> Security -> App passwords. It is sixteen characters, shown
once, displayed in four groups of four. The spaces are stripped in code, so
paste it either way; keep the quotes so your shell does not split it.

**Substitute your own values. Do not paste the lines below as they stand.** The
placeholders are not credentials, and setting one makes the form worse than
leaving it unset: a present-but-wrong credential fails at the mail server and
shows the visitor a red error, where an absent one falls back cleanly to their
own mail client. This has already happened once.

Staging, pointed at your own inbox:

```
fly secrets set SMTP_USER=YOUR_ADDRESS SMTP_PASS='YOUR APP PASSWORD' CONTACT_TO=YOUR_OWN_INBOX -a zedventures-test
```

Production, pointed at the real inbox:

```
fly secrets set SMTP_USER=YOUR_ADDRESS SMTP_PASS='YOUR APP PASSWORD' CONTACT_TO=info@zedventures.com -a PRODUCTION_APP
```

Why separate: if staging shares production's mail settings, testing the contact
form emails a real prospect from a half-finished site.

`fly secrets list -a <app>` shows what is set (names only, never values).

### Checking it actually works

Submitting the form is the only way to know. Deploy, fill it in, read the panel:

- **"Message sent"** — SMTP worked.
- **"Your message is ready to send"** and your mail client opens — the
  fallback. `SMTP_USER` or `SMTP_PASS` is missing.
- **"That didn't go through"** — the credential is set but wrong, or Google
  refused it. `fly logs -a <app>`, look for `[contact] smtp send failed`.

Rotating the App Password: revoke the old one in Google Account settings, then
`fly secrets set SMTP_PASS='...'`. Revoking alone does not stop the site trying
to send until the secret is replaced.

## Which environment am I looking at?

- A badge in the bottom-left corner says `local` or `staging`.
- **No badge means production.** If you are about to change something and there
  is no badge, stop and check where you are.

That check is keyed on "is this production", not "is this staging", so a typo in
the build argument fails safe: an unrecognised value is treated as
not-production, meaning noindex and a visible badge. The failure mode is an ugly
production site, not an indexed staging site.

## Verifying a deploy

```
fly logs -a <app>              # server output, including [contact] errors
fly status -a <app>            # machines, health
fly releases -a <app>          # what was deployed and when
```

---

## Notes on the build

- **npm, not bun.** `bun.lock` pins `culori` to Lovable's private registry,
  which returns 403 outside their sandbox. `package-lock.json` resolves
  everything from registry.npmjs.org.
- **`npm install`, not `npm ci`.** This dependency tree resolves two ajv majors,
  which `npm ci` rejects as "lock file out of sync" even on a lockfile npm has
  just generated. Verified from a clean checkout.
- **`NITRO_PRESET=node-server`.** The Vite config defaults Nitro to the
  Cloudflare Workers target; Fly runs a plain container. The Dockerfile sets
  this. Without it the build produces a Workers bundle and `process.env` does
  not behave the way the server code expects.
