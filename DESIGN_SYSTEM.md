# ZEDventures — Design System

**Source of truth: `src/styles.css`.** This file describes what is in the code. If
the two disagree, the code is right and this file is stale. Every contrast ratio
below was measured, not estimated.

Last verified: 10 September 2026, against a running build at 1440px.

---

## 1. Colour

### Brand

| Token | Value | Use |
|---|---|---|
| `--primary` | `#E31937` | Filled buttons, rules, dots, active pills |
| `--primary-hover` | `#C31530` | Button hover only |
| `--accent` | `#E31937` | Red *text* — eyebrows, links, emphasis |
| `--primary-foreground` | `#FFFFFF` | Text on red |

**`#E31937` is the brand red and it was kept over the spec's `#ED1B35` on
measurement:** white-on-red scores **4.71** for `#E31937` and **4.37** for
`#ED1B35`, which fails AA on the very buttons the spec called for.

### The red's contrast ceiling — the one rule people break

Red small text is legal on white and on `--surface`, and illegal on `--secondary`:

| Ground | Ratio | Red small text? |
|---|---|---|
| `--background` `#FFFFFF` | **4.71** | Yes |
| `--surface` `#FBFBFA` | **4.55** | Yes |
| `--secondary` `#F7F7F5` | **4.39** | **No** — fails AA |

`--secondary` is for large decorative washes only. Never put a red eyebrow,
link or label on it.

### Surfaces (light)

| Token | Value | Use |
|---|---|---|
| `--background` | `#FFFFFF` | Page ground |
| `--surface` | `#FBFBFA` | Cards, callouts, alternating bands |
| `--secondary` | `#F7F7F5` | Decorative washes only (see above) |
| `--card` | `#FFFFFF` | Card ground |

### Text (light)

| Token | Value | On white | Use |
|---|---|---|---|
| `--foreground` | `#111111` | 18.9 | Headings, strong body |
| `--muted-foreground` | `#5F5F63` | **6.36** | Body copy |
| `--subtle-foreground` | `#6F6F74` | **5.00** | Meta, fine print |

The spec's muted grey `#85858A` scores **3.67** and fails its own AA rule. It is
not used. `#888888` (3.54) and `#999999` (2.85) also fail and are not used.

### Lines

| Token | Value |
|---|---|
| `--border` | `#E7E7E4` |
| `--border-strong` | `#D8D8D5` |
| `--input` | `#D8D8D5` |

### Secondary accents — a set of four, used as a set

Added for the platform table's per-row accents. These are the **only** other
colours in the site. Measured on white / `--surface` / `--secondary`:

| Token | Value | White | Surface | Secondary |
|---|---|---|---|---|
| `--tone-a` | `#E31937` | 4.71 | 4.55 | **4.39 fail** |
| `--tone-b` | `#1F6F5C` | 6.02 | 5.82 | 5.62 |
| `--tone-c` | `#2F5DA8` | 6.46 | 6.24 | 6.02 |
| `--tone-d` | `#8F4E12` | 6.43 | 6.20 | 5.99 |

`--tone-d` was `#B4651A` and measured 4.36; it was darkened when the platform
table began setting labels in these colours rather than only dots.

### The dark band (`.section-dark`)

The brand red **cannot** be used as text on dark: it reaches only 4.20 on
`#0A0A0B` and 3.57 on the deepest card surface.

| Token | Value | Note |
|---|---|---|
| `--background` | `#0A0A0B` | |
| `--surface` | `#111113` | |
| `--foreground` | `#F6F6F4` | |
| `--muted-foreground` | `#AAAAAE` | |
| `--subtle-foreground` | `#86868E` | Spec's `#77777C` scores 4.44 and fails |
| `--accent` | `#F4485B` | Red text on dark; 4.74 worst case |
| `--dark-lead` | `#C7C7CA` | 11.73 on `#0A0A0B` |

`--primary` is deliberately **not** lifted on dark: it paints surfaces that
white text sits on, and lightening it drops those below 4.5.

---

## 2. Typography

Two families, loaded from Google Fonts in `__root.tsx`.

| Role | Family | Where |
|---|---|---|
| Display | **Space Grotesk** 500/600/700 | `.font-display` — all headings |
| Reading | **IBM Plex Sans** 400/500/600/700 + 400i | `body` — everything else |

`.font-display` is **600, not 700**, with `letter-spacing: -0.015em`. Space
Grotesk carries more weight per unit than the face it replaced; 700 reads as
too heavy.

### Page title — one scale for the whole site

`.h1-page`. There were previously seven H1 declarations across seven files at
four different desktop sizes (56, 60, 64, 72). Nothing chose those numbers.

| Breakpoint | Size | Line height |
|---|---|---|
| base | 32px | 1.2 |
| ≥640px | 38px | 1.18 |
| ≥1024px | **44px** | 1.15 → 50.6px |

Letter-spacing `-0.02em` throughout. Leading tightens as size grows.

### Other measured values

| Element | Family | Size | Weight | Line height |
|---|---|---|---|---|
| Card title (featured) | Space Grotesk | 22 → 25 → 28px | 600 | 1.2 |
| Card title (grid) | Space Grotesk | 19px | 600 | 1.35 |
| Card summary | IBM Plex Sans | 14.5px | 400 | 1.6 |
| Body copy | IBM Plex Sans | 17px | 400 | 1.6 |
| Hero subhead | IBM Plex Sans | 18px | 400 | 1.6 |
| Article body | IBM Plex Sans | 17px | 400 | 1.6 |
| `.eyebrow` | IBM Plex Sans | 11px | 700 | uppercase, `0.12em` |

### Known inconsistency (open)

Measured at 1440px on 10 Sep 2026:

- Homepage `h1` — **60px**. Deliberately excluded from `.h1-page`; unresolved.
- Section `h2` ("Capabilities") — **50px**.

So the section heading currently outweighs every page H1 on the site (44px).
Not yet fixed.

---

## 3. Reading measure

| Context | Max width |
|---|---|
| Article body | `43.75rem` (700px, ~72 characters) |
| Card summary | `44ch` |
| Hero subhead / trust line | `42rem` |
| Masthead sub | `52rem` |
| Prose in `.split` body column | `38rem` |

72 characters is where sustained reading stops costing effort. Article body
line-height is 1.6, down from 1.75 — 1.75 reads as air on a short piece.

---

## 4. Layout

### Container

`.container-page` — `max-width: 84rem` (1344px), centred.

| Breakpoint | Inline padding |
|---|---|
| base | 20px |
| ≥640px | 32px |
| ≥1024px | 40px |
| ≥1280px | 64px |

Insights and the mastheads use `px-5 / sm:px-8` with an inner `max-w-6xl`
instead, so those bands share one left edge with Services and Case Studies.

### Section rhythm — the padding is HALF the seam

`.section-y`. Sections sit edge to edge, so each seam is a bottom padding plus a
top padding. **A 4px edit here moves every section boundary on the site by 8px.**

| Breakpoint | Padding | Resulting seam |
|---|---|---|
| base | 24px | 48px |
| ≥768px | 28px | 56px |
| ≥1280px | 32px | 64px |

`.section-y-card` trims the bottom padding where a section's last element is a
padded card, whose own bottom padding is already inside the seam. Apply it only
there; on a section ending in text it makes the seam too tight.

### Editorial split

`.split` — heading column `32rem`, body `1fr`, gap `4rem`, stacked below 1024px.
24rem and 28rem were both tried and broke headings across three lines.

---

## 5. Components

### Buttons

`.btn` — 48px tall, 24px inline padding, radius 10px, 15px/600, gap 8px.

- `.btn-primary` — red fill, white text.
- `.btn-secondary` — transparent, `--border-strong` outline.
- `.btn-wrap` — lets long service-page CTA labels wrap; keeps the 48px minimum
  target. Without it those labels overflow a 320px viewport.

Hover lifts 2px and adds `--shadow-cta`, **only** under
`(hover: hover) and (prefers-reduced-motion: no-preference)`. The colour change
alone carries the state for everyone else.

### Cards

Radius `rounded-2xl`, `border-border`, `bg-surface`. Insight cards carry a 40px
red segment let into the top edge that grows to 64px on hover.

### Radius

`--radius: 0.75rem` (12px). Buttons 10px, cards 14–18px, pills full.

### Elevation — used sparingly

- `--shadow-e1`: `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)`
- `--shadow-cta`: `0 8px 24px rgba(227,25,55,.18)`

### Motion

`--dur-fast` 140ms · `--dur` 200ms · `--dur-slow` 300ms ·
`--ease: cubic-bezier(.2,.8,.2,1)`.

`.arrow-shift` nudges an arrow 4px on hover. `.ink-type` runs a 13s colour sweep
through the hero headline via `background-clip: text`. Both are disabled
entirely under `prefers-reduced-motion: reduce` — dropped, not slowed, because
they are decorative.

### Focus

`:focus-visible` — 2px solid `--ring` (`#E31937`), 3px offset, 2px radius.
Applied globally. Every interactive control must keep it.

---

## 6. Rules that are not negotiable

1. **Measure before you add a colour.** Every value here has a ratio beside it
   because three earlier specs carried palettes that failed their own AA rule.
2. **No red small text on `--secondary`, and no brand red as text on dark.**
3. **One H1 per page**, using `.h1-page`.
4. **Light only.** There is no dark theme; `.section-dark` is a band, not a mode.
5. **No invented metrics.** Anything that looks like a number a buyer could
   check must come from the site's own data or not appear.
6. **Both languages.** Every string goes through `i18n`; EN and FR must render
   without overflow at 320px.
