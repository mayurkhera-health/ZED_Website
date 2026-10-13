# ZEDVentures — Service Detail Page Specification

**Version 1.1** · Supersedes v1.0
**Applies to:** AI & Data, Analytics, GIS & Geospatial, Guidewire, SAP, Product Engineering, Offshore & Nearshore Delivery

---

## 0. What changed from v1.0, and why

v1.0 was structurally sound and is the basis for this document. Six changes were
made against it. Each one is here because it was measured or counted, not
because of taste.

| # | v1.0 said | v1.1 says | Reason |
|---|---|---|---|
| 1 | Five questions, all about ZED | Question 2 is about the client | v1.0's own §25 paragraph does this job but sits at position 4 of 6, after 8 capabilities and 18 product names |
| 2 | 8 capabilities, ~480 words/page | 6 capabilities, ~300 words/page | v1.0 specified roughly 3× the length of the page it was asked to replace |
| 3 | `#85858A` fine print | `#6F6F74` | 3.67:1 on white. Fails AA. Same value already rejected once |
| 4 | Red eyebrow on any ground | Red eyebrow on white / `#FBFBFA` only | 4.39:1 on `#F7F7F5`, 4.20:1 on `#0A0A0B`. Both fail AA |
| 5 | Logo tiles, 15–20 technologies | Text lists, 8–12 technologies | v1.0 §23 forbids listing what cannot be demonstrated; v1.0 §20 then lists it |
| 6 | Analytics events in scope | Deferred, gated on the privacy policy | Behavioural tracking before the disclosure exists is the wrong order in California |

Everything else in v1.0 — the visual rhythm, the anti-card principle, the
one-component data architecture, the content philosophy in its §58 — is kept and
restated below.

---

## 1. Purpose

One reusable template, seven data records. The page establishes competence in a
service area and produces a conversation. It is not a brochure and not a
capability catalogue.

### The five questions, in the order a buyer asks them

1. **Am I in the right place?** → name and outcome
2. **Do they understand my situation?** → the situation paragraph
3. **Can they actually do this?** → capabilities and platforms
4. **Have they done it before?** → proof
5. **What happens if I get in touch?** → a stated commitment, not a button

Question 2 is the one that separates this site from every competitor reviewed.
Four of the five questions any consultancy can answer with a list. Question 2
can only be answered by someone who has been in the room.

### The 60-second test

A prospect scanning without reading should be able to say what the service is,
that ZED has met their problem before, and what happens if they write. If a
section does not serve one of the five questions, it does not go on the page.

---

## 2. Page architecture

Six sections. The order is not negotiable — it is the order of the questions.

```
GLOBAL HEADER
01  HERO                     Q1  white
02  THE SITUATION            Q2  #FBFBFA
03  WHAT WE HELP YOU DO      Q3  white
04  PLATFORMS WE WORK WITH   Q3  #FBFBFA
05  WHY ZED FOR [SERVICE]    Q4  #0A0A0B   3 pillars
06  PROOF + NEXT STEP        Q4/Q5 white   hides proof when absent
GLOBAL FOOTER
```

**Background rhythm:** white → soft → white → soft → black → white. The single
black band is the page's one visual event. Two dark bands would spend it.

---

## 3. Content budget

Hard ceilings. A page over budget is rejected, not trimmed later.

| Component | Max |
|---|---|
| Hero outcome line | 12 words |
| Hero description | 40 words |
| Situation paragraph | 60 words |
| Capabilities | 6 |
| Capability description | 20 words |
| Technology categories | 3–4 |
| Technology entries | 8–12 |
| Why ZED pillars | exactly 3 |
| Pillar description | 35 words |
| Case studies | 1 |
| Next-step line | 25 words |

**Total: ~300 words per page, per language.**

### Content debt — read this before approving the build

Seven services × two languages requires:

- 14 hero outcome lines
- 14 situation paragraphs
- 84 capability descriptions
- 42 pillars
- 14 technology lists

**~2,000 words of copy that has to be true.** No template solves this. The
schedule risk on these pages is writing, not engineering, and copy written to
fill a slot becomes exactly the generic filler §12 forbids.

**Rule: a page ships when its copy is written, not when its layout is done.**
`DRAFT_SERVICE_PAGES` stays true and the page stays `noindex` until then.

---

## 4. Section 01 — Hero

**Ground:** `--background` (white)

| Element | Content | Type |
|---|---|---|
| Eyebrow | `WHAT WE DO` | 11px / 700 / 0.12em / uppercase / `--color-accent` |
| H1 | Outcome, not the service name | 40–46px mobile, 64–76px desktop / 700 / −0.03em / max 900px |
| Description | ≤40 words | 17–19px / 1.55 / `--color-muted-foreground` / max 720px |
| CTA | `Talk to our [service] team →` | `.btn-primary` |

The H1 states what the client gets, not what ZED sells:

- **Analytics** — Turn reporting nobody trusts into numbers leadership will decide on.
- **SAP** — Modernize SAP without stopping the business.
- **GIS** — Turn location data into an operational answer.

**No hero illustration.** Whitespace is the composition. An image added to fill
the right-hand column is a confession that the copy is thin.

**Dropped from v1.0 §13:** the bulleted keyword line under the CTA
(`Strategy • Modernization • Migration…`). It repeats section 03 twelve words
earlier, and v1.0 set it in `#85858A`, which measures **3.67:1** on white and
fails AA.

---

## 5. Section 02 — The situation

**Ground:** `--surface` (`#FBFBFA`)

This section is v1.0's §25 paragraph, moved from position 4 to position 2.

| Element | Content |
|---|---|
| Eyebrow | `THE SITUATION` — red is legible on `#FBFBFA` (4.55:1) |
| H2 | "What we usually walk into." |
| Body | One paragraph, ≤60 words, `--color-muted-foreground` |

### How to write it

Describe the client's world before they called. No capabilities, no product
names, no "we". Name the false solution and reject it — that sentence is what
signals experience.

> Every team reports its own numbers, and two of them rarely agree. Someone
> rebuilds the monthly pack by hand because the pipeline never landed, and by
> the time leadership sees a figure nobody is confident enough to decide on it.
> **The dashboard is not the problem.**

**This paragraph cannot be drafted from the service description.** It is the
one section on the page that has to come from someone who has done the work.

---

## 6. Section 03 — What we help you do

**Ground:** `--background` (white)

Eyebrow `WHAT WE DO`, H2 "What we help you do.", then **6 capabilities** in a
2-column editorial grid — hairline dividers, no card borders, no shadows.

```
01                              02
Analytics strategy              Platform migration
& assessment
                                Move fragmented BI environments
Evaluate the landscape,         to a modern platform without
identify gaps, define a         losing the reporting the
roadmap.                        business runs on.
─────────────────────────       ─────────────────────────
```

| Element | Style |
|---|---|
| Number | 11px / 700 / `--color-accent` |
| Title | 24–28px / 650–700 / `--color-foreground` / 1.15 |
| Description | 15–16px / 400 / `--color-muted-foreground` / 1.55 / max 480px |
| Divider | 1px `--color-border` |

**Six, not eight.** Capabilities 7 and 8 in v1.0 are "Governance" and "Managed
Support" — real work, but nobody arrives at a service page looking for the
seventh thing you do. Both belong in the sales conversation.

**Hover:** title shifts 4px right, number deepens, 180ms. Rows are not
clickable — there is nowhere to send the visitor, and a hover state that
promises a link and delivers nothing is worse than no hover state.

---

## 7. Section 04 — Platforms we work with

**Ground:** `--surface` (`#FBFBFA`)

Eyebrow `TECHNOLOGY`, H2 "Platforms we work with.", 3–4 named categories, 8–12
entries total, **set as text**.

```
BUSINESS INTELLIGENCE     DATA PLATFORMS        CLOUD
Power BI                  Snowflake             Microsoft Azure
SAP BusinessObjects       dbt                   SQL Server
```

### The honesty rule

**Only list what ZED can put a named engineer behind this quarter.**

v1.0 §23 states this and v1.0 §20 then lists Tableau, Qlik, Looker, Fabric,
Databricks, AWS, Oracle, SAP HANA and PostgreSQL for Analytics — against a live
site that names Power BI, Azure Data Factory, SQL Server, Snowflake, dbt and
Python. A CTO who asks about Looker and gets silence has learned more than the
longer list ever gained.

**No logo tiles.** They cost a licensing question per mark, imply partner status
that may not exist, and turn the section into the logo wall v1.0 §20 warns
against. Text at 15px in three columns says the same thing in a tenth of the
markup and reads as confidence rather than decoration.

---

## 8. Section 05 — Why ZED for [service]

**Ground:** `#0A0A0B` — the page's one dark band.

| Element | Style |
|---|---|
| Eyebrow | `WHY ZED` — **white or `#C7C7CA`, never red** (red is 4.20:1 here, fails AA) |
| H2 | "Why ZED for [service]" — `#F6F6F4` |
| Pillars | exactly 3, numbered, divided by 1px `rgba(255,255,255,.09)` |
| Pillar number | 11px / 700 / `--color-accent` — red on black at 4.20:1 is **decorative only**, never load-bearing text |
| Pillar heading | 24–28px / 650–700 / white |
| Pillar body | 15–16px / `#AAAAAE` (8.55:1, passes) / 1.6 |

v1.0's §25 intro paragraph has moved to section 02. This section is the three
pillars alone.

### The pillars must differ per service

Identical pillars across seven pages is what makes a site feel templated.
Starting points, to be replaced with real ones:

| Service | Pillars |
|---|---|
| Analytics | Modernize without starting over · Business + technology · Assessment to production |
| SAP | Business process + technology · Global rollout · Operational continuity |
| Guidewire | Insurance domain · Platform + integration · Implementation through production |
| GIS | Spatial + enterprise data · Operational GIS · Field to enterprise |
| Product Engineering | Product thinking + engineering · Built to scale · Build through operations |
| Offshore & Nearshore | Integrated teams, not staffing · Engineering accountability · Flexible global delivery |
| AI & Data | *(to be written)* |

**No proof bar.** v1.0 §32 offers an optional metrics strip and then forbids
inventing the numbers. There are no defensible numbers today, so the component
is not built. It can be added when there are.

---

## 9. Section 06 — Proof and next step

**Ground:** `--background` (white)

### 9a. Proof — renders only when a case study exists

```
PROOF
We have done this.

┌─ Unified analytics for multi-country operations
│  Real-time visibility across every country
│  SQL Azure · Azure Data Lake · Power BI
│  Read the case study →
```

One study. Links to `/case-studies#case-N`. When `proof` is absent from the
service record, **the block does not render** and the next step follows
directly. No filler.

**Open gap:** SAP, Guidewire, GIS and Offshore have no case study. With the
proof bar dropped, those four pages carry **no evidence at all**. That is a
case-study problem, not a design problem, and the design cannot hide it.

### 9b. Next step — the fifth question

Every competitor page reviewed ends with a button and no statement of what
follows it.

| Element | Content |
|---|---|
| H2 | "Let's talk about your next project." |
| Body | What actually happens — same line on every service page |
| CTA | `Talk to a specialist →` |

> A senior engineer reads it, not a form queue. You will hear back within one
> business day.

**This is a promise, and it is only worth making if it is kept.** Breaking it
once costs more than the section earns.

---

## 10. Design tokens

Use the tokens in `src/styles.css`. Do not introduce raw hex into components.

| Token | Value | Use |
|---|---|---|
| `--background` | `#FFFFFF` | hero, capabilities, proof |
| `--surface` | `#FBFBFA` | situation, platforms |
| `--secondary` | `#F7F7F5` | large washes with **no red small text** |
| `--foreground` | `#111111` | headings |
| `--muted-foreground` | `#5F5F63` | body (6.36:1) |
| `--subtle-foreground` | `#6F6F74` | fine print (5.00:1) |
| `--primary` / `--accent` | `#E31937` | eyebrows on white/`--surface`, CTAs |
| `--border` | `#E7E7E4` | dividers |
| `--radius` | `0.75rem` | buttons, tiles |

### Measured contrast — the values that constrain the design

| Pairing | Ratio | Verdict |
|---|---|---|
| `#E31937` on `#FFFFFF` | 4.71 | ✅ eyebrows allowed |
| `#E31937` on `#FBFBFA` | 4.55 | ✅ eyebrows allowed |
| `#E31937` on `#F7F7F5` | **4.39** | ❌ **no red small text** |
| `#E31937` on `#0A0A0B` | **4.20** | ❌ decorative numerals only |
| `#85858A` on `#FFFFFF` | **3.67** | ❌ do not use |
| `#5F5F63` on `#FFFFFF` | 6.36 | ✅ body |
| `#AAAAAE` on `#0A0A0B` | 8.55 | ✅ dark-band body |
| `#C7C7CA` on `#0A0A0B` | 11.73 | ✅ dark-band lead |

`--secondary` and `--surface` differ by one perceptual step and by whether red
small text is legal on them. Section 02 and 04 use `--surface` **for that
reason**, not by preference.

---

## 11. Data architecture

One component, seven records. Already implemented in
`src/lib/service-pages.ts`; this spec extends the existing type rather than
replacing it.

```ts
type ServiceContent = {
  name: string;
  outcome: string;          // H1
  intro: string;            // hero description, ≤40 words
  situation: string;        // §5, ≤60 words — required in v1.1
  capabilities: ServiceCapability[];   // exactly 6
  technologyGroups: { label: string; items: string[] }[];  // 3–4 groups
  whyPillars: { title: string; body: string }[];           // exactly 3
  proof?: ServiceProof;     // omit → section 9a does not render
  seoTitle: string;
  seoDescription: string;
};
```

Two changes to the current type: `technologies: string[]` becomes grouped, and
`whyPillars` is new. `problems: string[]` is removed — it duplicates `intro`
and `situation`.

**Rendering:** a service with `situation` renders this layout. Anything without
it keeps the legacy body, so services convert one at a time and can be compared
live.

---

## 12. Content philosophy

Do not prove expertise by saying more. Prove it by being specific.

**Weak:**

> ZED provides comprehensive end-to-end analytics solutions using
> industry-leading technologies to help clients achieve their digital
> transformation objectives.

**Strong:**

> We assess legacy BI environments, modernize reporting, migrate platforms,
> improve performance, establish governance, and support production analytics
> across Power BI, SAP BusinessObjects and modern data platforms.

The second is credible because only someone who has done the work could have
written it. **The test for every sentence: could a competitor paste it onto
their own site unchanged?** If yes, it is not saying anything.

---

## 13. URLs, SEO, navigation

Slugs already match and are implemented — no redirects required:

```
/services/ai-data          /services/guidewire
/services/analytics        /services/sap
/services/gis-geospatial   /services/product-engineering
/services/offshore-nearshore
```

Each page needs a **unique** title and meta description. One H1. Section
headings are H2, capability and pillar titles H3.

**Internal links:** service → its case study; case study → back to the service.
Skip "related capabilities" unless it can be added without lengthening the page.

**Navigation:** a seven-item dropdown under Services. Not a mega-menu.

---

## 14. Interaction and motion

| Element | Behaviour |
|---|---|
| Capability row | title +4px right, 180ms |
| Text link | arrow +4px right, colour → red |
| CTA | translateY(−2px), `--shadow-cta` |
| Reduced motion | all transforms suppressed; colour changes kept |

No scroll hijacking, parallax, counters, rotating logos or entrance animations.
Shadows appear on the primary CTA only.

---

## 15. Accessibility

Non-negotiable, and every item is verified by the Playwright audit before
commit:

- One H1; heading levels never skipped
- All text meets AA per the table in §10 — **measured, not assumed**
- Visible focus ring on every interactive element
- Interactive targets ≥44px
- No horizontal overflow at 320px
- `prefers-reduced-motion` honoured
- Both languages audited — French runs 15–20% longer and breaks layouts English does not

---

## 16. Deferred: analytics tracking

v1.0 §57 specified seven tracking events. **Deferred, and gated.**

Behavioural tracking with a service identifier is a disclosure obligation. The
privacy policy currently carries `[retention period]` and `[privacy email]`
placeholders and does not describe analytics at all. In California the
disclosure has to exist before the collection does.

**Precondition:** privacy policy placeholders filled and an analytics section
added. Then implement:

`service_page_view · hero_cta_click · technology_interaction · case_study_click ·
final_cta_click · contact_form_start · contact_form_submit`

---

## 17. Acceptance criteria

A service page is done only when **all** of the following hold.

**Content**

- [ ] Situation paragraph written by someone who has done the work — not drafted from the service description
- [ ] Exactly 6 capabilities, each ≤20 words
- [ ] Technology list contains only what a named engineer can cover this quarter
- [ ] Exactly 3 pillars, specific to this service, not shared with another page
- [ ] Total ≤300 words per language
- [ ] No sentence a competitor could paste onto their own site unchanged

**Build**

- [ ] Renders from the shared component; no bespoke markup
- [ ] One H1; H2/H3 hierarchy intact
- [ ] Proof block absent — not empty — when no case study exists
- [ ] Unique SEO title and meta description
- [ ] Internal links resolve in both directions

**Verified**

- [ ] Playwright audit: zero AA failures, both languages
- [ ] No horizontal overflow at 320px
- [ ] Keyboard path complete, focus ring visible throughout
- [ ] `prefers-reduced-motion` honoured
- [ ] French checked for layout breakage

**Launch gate**

- [ ] Every `[CONFIRM]` resolved
- [ ] Response-time commitment in §9b confirmed as something ZED will keep
- [ ] `DRAFT_SERVICE_PAGES` set to false only when all seven pages pass
