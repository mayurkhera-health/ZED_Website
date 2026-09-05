import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  Box,
  CircleCheck,
  Clock,
  Cloud,
  Compass,
  Database,
  Gauge,
  Globe,
  Layers,
  LayoutDashboard,
  Map,
  MapPin,
  MessagesSquare,
  PieChart,
  Plug,
  Rocket,
  Satellite,
  Server,
  ShieldCheck,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
  Workflow,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import {
  CAPABILITY_ICONS,
  isServiceDraft,
  SERVICE_PAGES,
  SHOW_SERVICE_PROOF,
  type CapabilityIcon,
  type ServiceSlug,
  type TechIcon,
} from "@/lib/service-pages";

/**
 * Category icons. Lucide, not Ionicons — the site already ships lucide and
 * adding a second icon library for six glyphs is weight for nothing.
 */
/**
 * Row accents for the platform table.
 *
 * The values live in styles.css as --tone-a..d, not here: they are a secondary
 * palette for the site, not a detail of this component, and the measured
 * contrast table for all four is recorded beside them.
 *
 * Applied only to the 13px category icon and the 4px chip dot. Both are
 * decorative and carry no text, so no contrast requirement is involved.
 * --tone-d fails AA as text on every ground the site uses; if any of these is
 * ever used for type, read the table in styles.css first.
 */
const ROW_TONES = [
  "var(--tone-a)",
  "var(--tone-b)",
  "var(--tone-c)",
  "var(--tone-d)",
] as const;

const TECH_ICONS: Record<TechIcon, typeof BarChart3> = {
  chart: BarChart3,
  cube: Box,
  cloud: Cloud,
  layers: Layers,
  plug: Plug,
  shield: ShieldCheck,
};

/**
 * Capability card icons. Same library as everything else on the site — no
 * emoji, which would be the first on the page and would render as a different
 * typeface, at a different weight, in a different colour per platform.
 */
const CAPABILITY_GLYPHS: Record<CapabilityIcon, typeof BarChart3> = {
  compass: Compass,
  "trending-up": TrendingUp,
  "arrow-left-right": ArrowLeftRight,
  dashboard: LayoutDashboard,
  "pie-chart": PieChart,
  gauge: Gauge,
  map: Map,
  shield: ShieldCheck,
  "map-pin": MapPin,
  alert: TriangleAlert,
  satellite: Satellite,
  plug: Plug,
  layers: Layers,
  sliders: SlidersHorizontal,
  cloud: Cloud,
  server: Server,
  blocks: Blocks,
  sparkles: Sparkles,
  database: Database,
  workflow: Workflow,
  check: CircleCheck,
  rocket: Rocket,
  users: Users,
  globe: Globe,
  clock: Clock,
  shuffle: Shuffle,
  messages: MessagesSquare,
};

/**
 * Service detail page — spec v1.2.
 *
 * One template, seven records. This is the whole layout; nothing about it is
 * per-service except the data it reads. A service that has not had its v1.2
 * copy written keeps the older template (see services_.$slug.tsx), so the
 * seven convert one at a time rather than drifting apart.
 *
 * Six sections, answering the five buyer questions in the order they are asked:
 *
 *   01 HERO           white     am I in the right place (copy + one image)
 *   02 SITUATION      surface   do they understand my situation
 *   03 CAPABILITIES   white     can they do this
 *   04 TECHNOLOGY     surface   ...with what
 *   05 WHY ZED        #0a0a0b   why them specifically
 *   06 PROOF + NEXT   white     have they done it / what happens if I write
 *
 * The background rhythm is load-bearing (S3). One dark band, and it is the
 * page's only visual event; a second one at the bottom would spend it. That is
 * why section 06 is white even though a dark closing band is the more common
 * pattern.
 *
 * Colour constraints on this page are measured, not chosen (S38):
 *   #E31937 on #FFFFFF   4.71  eyebrows allowed
 *   #E31937 on #FBFBFA   4.55  eyebrows allowed
 *   #E31937 on #F7F7F5   4.39  FAILS — --secondary carries no red small text
 *   #E31937 on #0A0A0B   4.20  FAILS — dark band uses --dark-lead instead
 */
export function ServicePageV12({ slug }: { slug: ServiceSlug }) {
  const { t, lang } = useLanguage();
  const s = SERVICE_PAGES[lang][slug];
  const study = s.proof ? t.caseStudies.items[s.proof.index - 1] : undefined;

  // Guaranteed by the caller, which only renders this template for a service
  // that has whyPillars. Narrowed here so the JSX does not need optional chains.
  const groups = s.technologyGroups ?? [];
  const pillars = s.whyPillars ?? [];

  // Right-hand hero column exists when there is a real image, or while the
  // page is still a draft and a placeholder is useful. Never otherwise.
  const showImageSlot = Boolean(s.heroImage) || isServiceDraft(slug);

  return (
    <>
      {/* ---------------------------------------------------------------
          01 — HERO

          Two columns: copy left, one image right, tops aligned.

          items-start, not items-center. The text column runs roughly 500px
          and the image 318px, so centring the two left the image floating
          with unequal space above and below it and no shared line anywhere
          on the row. Top-aligned, the eyebrow and the image edge start
          together and the leftover space collects in one place at the
          bottom, which reads as composition rather than as drift.

          The image slot resolves three ways, and the third is the point:

            heroImage set            -> the real image
            no image, draft on       -> a labelled placeholder naming the
                                        subject to source
            no image, draft OFF      -> nothing; the hero returns to the
                                        single-column text-led layout

          A placeholder that renders unconditionally is how a grey box ends
          up on a production page. Tying it to the draft list means
          turning the draft flag off either reveals real images or quietly
          restores a hero that still reads correctly without them.
          --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="container-page section-y">
          {/* The headline spans the full width; the intro, CTA and image sit
              in two columns beneath it.

              Previously the H1 shared a column with the intro and the image
              sat beside all of it. That works when the headline is three
              lines and breaks when it is five: "Get AI out of the
              proof-of-concept stage and into systems your business can
              depend on" pushed the image into the lower right corner with a
              350px hole above it, and no amount of aligning fixed a layout
              where one column carried twice the content of the other.

              Spanning the headline makes the hero independent of how long it
              is. The two columns below it now hold comparable amounts —
              three or four lines of intro plus a button against a 16:9 image
              — which is why they line up on every service rather than on the
              ones whose headline happens to be short. */}
          <h1 className="font-display max-w-[26ch] text-[2.5rem] leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {s.outcome}
          </h1>

          <div
            className={`mt-10 ${
              showImageSlot
                ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14"
                : ""
            }`}
          >
            <div>
              <p className="max-w-[42rem] text-[1.0625rem] leading-[1.55] text-muted-foreground sm:text-[1.1875rem]">
                {s.intro}
              </p>
              <Link to="/contact" className="btn btn-wrap btn-primary mt-8">
                {t.services.heroCtaBefore} {s.name} {t.services.heroCtaAfter}
                <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {s.heroImage ? (
              <img
                src={s.heroImage.src}
                alt={s.heroImage.alt}
                width={1280}
                height={720}
                loading="eager"
                /* A 1px frame, not decoration. These images are light at the
                   edges — the AI one is almost white in its top-left corner —
                   and on a white page an unframed photograph bleeds into the
                   ground and stops reading as an object. */
                className="aspect-[16/9] w-full rounded-2xl border border-border-strong object-cover"
              />
            ) : (
              showImageSlot && (
                <div
                  className="flex aspect-[16/9] w-full flex-col justify-end rounded-2xl border border-dashed border-border-strong bg-secondary p-6"
                  role="note"
                  aria-label="Hero image not yet supplied"
                >
                  <p className="eyebrow text-subtle-foreground">Hero image</p>
                  <p className="mt-2 max-w-[34ch] text-sm leading-[1.5] text-muted-foreground">
                    {s.heroImageHint}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          02 — THE SITUATION (S11-S12)
          The client's world before they called. No ZED, no product names,
          no capability list. This is the one section that cannot be drafted
          from the service description, and the only one a competitor could
          not have written.
          --------------------------------------------------------------- */}
      <section className="border-b border-border bg-surface">
        <div className="container-page section-y split">
          <SectionHeader
            align="left"
            eyebrow={t.services.situationEyebrow}
            heading={t.services.situationHeading}
          />
          {/* Blank line separates paragraphs. Most services need one; SAP's
              runs to two, because the second is the consequence and the first
              does not land without it. Splitting here rather than storing
              markup keeps the data record plain text. */}
          <div className="max-w-[38rem] space-y-4">
            {(s.situation ?? "").split("\n\n").map((para) => (
              <p
                key={para.slice(0, 24)}
                className="text-[1.0625rem] leading-[1.65] text-muted-foreground sm:text-[1.125rem]"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          03 — WHAT WE HELP YOU DO (S13-S18)

          Cards, per the card-grid spec, replacing the editorial hairline
          grid that spec v1.0 §15/§43 and v1.2 §15 asked for. That is a
          reversal and it is recorded as one: the earlier rule was written
          against "six large boxed SaaS cards", and the objection was to
          the weight, not the box. These are quiet — white ground, one
          hairline, 12px radius, no shadow, no lift — so the section still
          reads as one list rather than six announcements.

          Two columns, not the spec's 2x2: three of the seven services have
          six capabilities, and a grid fixed at four would strand them.

          Rows are not links. There is nowhere to send the reader, and a
          hover that implies navigation and delivers none is worse than no
          hover at all (S17) — so the only hover here is the border, which
          promises nothing.
          --------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="container-page section-y">
          <SectionHeader
            align="left"
            eyebrow={t.services.buildEyebrow}
            heading={t.services.buildHeading}
          />
          {/* No numerals — these are things we do, not steps, and the count
              read as a sequence it does not have. */}
          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {s.capabilities.map((c, i) => {
              const Glyph = CAPABILITY_GLYPHS[CAPABILITY_ICONS[slug][i] ?? "layers"];
              return (
                <li
                  key={c.title}
                  className="rounded-xl border border-border bg-background p-6 transition-colors hover:border-border-strong"
                  style={{
                    transitionDuration: "var(--dur)",
                    transitionTimingFunction: "var(--ease)",
                  }}
                >
                  {/* Decoration. The heading below carries the meaning, so
                      the badge is hidden from assistive tech rather than
                      given a label that would only repeat it. */}
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-accent"
                  >
                    <Glyph size={18} strokeWidth={1.75} />
                  </span>
                  {/* No max-w on the title. The card is already the measure;
                      a 22ch cap on top of it broke two-word headings onto a
                      second line with half the card empty beside them. */}
                  <h3 className="font-display mt-3.5 text-[1.25rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.3125rem]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.55] text-muted-foreground">
                    {c.desc}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------------
          04 — PLATFORMS WE WORK WITH (S19-S23)
          Text, not logo tiles. Tiles cost a licensing question per mark,
          imply partner status that may not exist, and turn the section
          into the logo wall the spec warns against. Three columns of names
          at 15px say the same thing in a tenth of the markup.
          --------------------------------------------------------------- */}
      {groups.length > 0 && (
        <section className="border-b border-border bg-surface">
          <div className="container-page section-y">
            <SectionHeader
              align="left"
              eyebrow={t.services.platformsEyebrow}
              heading={t.services.platformsHeading}
              sub={s.platformsSub ?? t.services.platformsSub}
            />
            {/* One card, three rows, flat dot-marked chips.
                Adapted from the chip spec: 170px label column, 12px/18px row
                padding, 5px chip radius, no chip border, 6px chip gap, leading
                dot bullet. Denser than the rounded pills it replaces, and a
                flat chip reads as a label rather than as a button nobody can
                press.

                Its colours are NOT adopted. That spec is FuelUp Youth's
                system — #064E3B, #1B4332, #40916C, #F7FAF5 are a green
                palette belonging to a different brand. Everything here maps to
                ZEDventures tokens instead: chip ground --secondary, chip text
                --foreground, label --subtle-foreground, dot and icon --accent.

                Colour carries the grouping. A 3px rail on the left edge of
                each row and a 12% wash behind that row's chips, both from the
                same tone — the 4px dot alone was correct in principle and
                invisible in practice at real viewing size.

                Four places carry the tone now: a 4px rail on the row's left
                edge, the category label, the chip dot, and a 16% wash with a
                32% border behind each chip.

                Chip text stays #111111 and measures better than 14:1 on every
                wash, so nothing readable depends on the tone. The labels DO
                depend on it: at 10px they are small text and need 4.5:1 on
                white, which is why --tone-d was darkened from #b4651a (4.36,
                failing) to #8f4e12 (6.43). Measured on white: red 4.71, green
                6.02, blue 6.46, amber 6.43.

                Still names only, no logos: no licensing question per mark and
                no implied partner status. */}
            {/* Two border weights, and both are heavier than the site's content
                dividers. The --border / --border-strong tokens are tuned for
                hairlines *inside* prose, where barely-there is right; this
                card is a discrete object sitting on a tinted band and has to
                hold its own edge, so it takes its own values.

                Measured against the card ground (#ffffff):
                  #e7e7e4  1.24  --border, the content hairline
                  #d8d8d5  1.43  --border-strong
                  #c2c2be  1.79  <- row dividers
                  #a8a8a3  2.39  <- card frame
                  #8e8e89  3.29  reads as a drawn box, too heavy here

                The frame stays a step above the dividers so the card still
                reads as one object rather than three stacked strips. */}
            <dl className="mt-7 max-w-[54rem] overflow-hidden rounded-xl border border-[#a8a8a3] bg-background">
              {groups.map((g, i) => {
                const Icon = g.icon ? TECH_ICONS[g.icon] : null;
                const tone = ROW_TONES[i % ROW_TONES.length];
                return (
                  <div
                    key={g.label}
                    className={`grid gap-2 border-l-4 py-3 pl-4 pr-4 sm:pl-[15px] sm:pr-[18px] lg:grid-cols-[minmax(0,170px)_minmax(0,1fr)] lg:items-center lg:gap-3 ${
                      i > 0 ? "border-t border-t-[#c2c2be]" : ""
                    }`}
                    style={{ borderLeftColor: tone }}
                  >
                    <dt className="flex items-center gap-1.5">
                      {Icon && (
                        <Icon
                          className="h-[13px] w-[13px] shrink-0"
                          style={{ color: tone }}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className="text-[10px] font-bold uppercase leading-none tracking-[0.1em]"
                        style={{ color: tone }}
                      >
                        {g.label}
                      </span>
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-[5px] py-1 pl-[7px] pr-[9px] text-[12.5px] font-semibold leading-[1.5] text-foreground"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${tone} 16%, #ffffff)`,
                            border: `1px solid color-mix(in srgb, ${tone} 32%, #ffffff)`,
                          }}
                        >
                          <span
                            className="h-1 w-1 shrink-0 rounded-full"
                            style={{ backgroundColor: tone }}
                            aria-hidden="true"
                          />
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          05 — WHY ZED (S24-S29)
          The page's one dark band. Eyebrow and pillar numerals use
          --dark-lead (#c7c7ca, 11.73:1) rather than brand red, which
          measures 4.20:1 here and fails AA. The red survives as a short
          decorative rule beside each numeral, which is not load-bearing
          text (S27).
          --------------------------------------------------------------- */}
      {pillars.length > 0 && (
        <section className="section-dark">
          <div className="container-page section-y">
            <p className="eyebrow text-dark-lead">{t.services.whyEyebrow}</p>
            <h2 className="font-display mt-3 max-w-[20ch] text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.75rem]">
              {t.services.whyHeading} {s.name}
            </h2>
            {s.whyIntro && (
              <p className="mt-5 max-w-[47rem] text-[1.0625rem] leading-[1.55] text-dark-lead sm:text-[1.125rem]">
                {s.whyIntro}
              </p>
            )}

            {/* The red rule stays, the numeral does not. Three reasons why us
                are not ranked, and numbering them implied they were. */}
            <ol className="mt-12 grid gap-px overflow-hidden bg-border lg:grid-cols-3">
              {pillars.map((pillar) => (
                <li
                  key={pillar.title}
                  className="bg-background py-7 lg:px-8 lg:py-0 lg:first:pl-0"
                >
                  <span className="block h-px w-8 bg-primary" aria-hidden="true" />
                  <h3 className="font-display mt-5 max-w-[18ch] text-[1.375rem] leading-[1.15] tracking-[-0.02em] sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 max-w-[30rem] text-[0.9375rem] leading-[1.6] text-muted-foreground">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          06A — PROOF (S31-S33)

          Currently hidden site-wide by SHOW_SERVICE_PROOF; see the note on
          that flag in service-pages.ts. When it is on, the block still
          renders only where a real case study exists - no empty card, no
          "coming soon", no unrelated project.
          --------------------------------------------------------------- */}
      {SHOW_SERVICE_PROOF && study && s.proof && (
        <section className="border-b border-border" aria-label={t.services.proofEyebrow}>
          <div className="container-page section-y">
            {/* Eyebrow only, no H2. A heading here ("We've done this.") narrated
                the card immediately below it without adding anything the card
                does not already say, and put a claim in ZED's voice directly
                above the client's evidence. The eyebrow labels the section and
                the case study speaks for itself. */}
            <SectionHeader align="left" eyebrow={t.services.proofEyebrow} />
            <Link
              to="/case-studies"
              hash={`case-${s.proof.index}`}
              className="group mt-7 flex max-w-[52rem] flex-col gap-4 border-l-[3px] border-l-primary bg-surface py-7 pl-7 pr-7 transition-colors hover:bg-secondary"
              style={{ transitionDuration: "var(--dur)", transitionTimingFunction: "var(--ease)" }}
            >
              <p className="font-display text-[1.375rem] leading-[1.2] tracking-[-0.02em] sm:text-2xl">
                {study.title}
              </p>
              <p className="font-display text-lg leading-[1.25] tracking-[-0.015em] text-accent">
                {s.proof.headline}
              </p>
              <p className="text-sm leading-[1.55] text-muted-foreground">
                {study.stack.join(" · ")}
              </p>
              <span className="flex items-center gap-1.5 text-sm font-bold text-accent">
                {t.services.proofCta}
                <ArrowUpRight className="arrow-shift h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------------
          06B — WHAT HAPPENS NEXT

          One sentence. No heading, no button, no eyebrow.

          The headline is back. It came off when the button below it read
          "Discuss your analytics priorities" and the two were the same
          sentence twice; the button now reads "Start a conversation", so they
          are not. Both are per-service and optional, and a service without
          them falls back to the shared wording.

          The line under the headline is the part no competitor service page
          reviewed for this project provides: a statement of what actually
          happens after someone writes.

          The button is deliberately labelled differently from the header's
          "Let's talk" — same destination, but two controls carrying identical
          words read as one repeated element rather than two chances to act.
          --------------------------------------------------------------- */}
      <section aria-label={t.contact.eyebrow}>
        <div className="container-page section-y grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
          <div className="max-w-[36rem]">
            {s.finalCta?.title && (
              <h2 className="font-display max-w-[20ch] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]">
                {s.finalCta.title}
              </h2>
            )}
            <p
              className={`text-[1.0625rem] leading-[1.6] text-muted-foreground ${
                s.finalCta?.title ? "mt-4" : ""
              }`}
            >
              {t.services.startNext}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link to="/contact" className="btn btn-wrap btn-primary">
              {s.finalCta?.buttonLabel ?? t.services.startNextCta}
              <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
