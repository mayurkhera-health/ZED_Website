import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { BELIEF_MARKS } from "@/components/about-marks";

/**
 * About page — six sections, each answering exactly one question:
 *
 *   HERO         white    who is ZED
 *   WHY WE'RE HERE white  why does ZED exist
 *   WHAT WE BELIEVE surface  what principles guide it
 *   HOW WE WORK  dark     what is it like to work with ZED
 *   OUR TEAM     white    who and where are the people
 *   CTA          surface  what next
 *
 * The alternating ground is load-bearing: six white sections in a row would
 * read as one very long page rather than five arguments.
 *
 * Two spec items are deliberately not built.
 *
 * The optional capability strip (§22) is omitted. Its own condition was "if
 * the hero/service navigation already makes ZED's capabilities obvious" — the
 * header carries Services, and the hero paragraph names all five practices in
 * its first sentence. A strip repeating them would be there to fill space,
 * which the same section says not to do.
 *
 * The numerals (§13, §16) are not restored. Numbers came off the site, and
 * both sections describe unordered sets — three beliefs and three principles,
 * not steps. The short red rule marks each entry instead, matching every other
 * column group on the site.
 */
export function AboutBody({ showHeroPlaceholder }: { showHeroPlaceholder: boolean }) {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      {/* --------------------------------------------------------------
          01 — HERO
          Text left, one real photograph right. The headline spans neither
          column: it sets the page and the two columns beneath carry
          comparable weight, which is the same structure the service pages
          settled on after the hero there kept falling out of balance.
          -------------------------------------------------------------- */}
      <section className="border-b border-border">
        <div className="container-page section-y">
          <p className="eyebrow text-accent">{a.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-[22ch] text-[2.5rem] leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {a.heading}
          </h1>

          <div
            className={`mt-10 ${
              a.heroImage || showHeroPlaceholder
                ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14"
                : ""
            }`}
          >
            <div>
              <p className="max-w-[42rem] text-[1.0625rem] leading-[1.6] text-muted-foreground sm:text-[1.125rem]">
                {a.intro}
              </p>
              <p className="mt-4 max-w-[42rem] text-[1.0625rem] leading-[1.6] text-muted-foreground sm:text-[1.125rem]">
                {a.intro2}
              </p>
              {/* A text link, not a button. The page's one action is the
                  closing CTA; a second red button in the hero would compete
                  with it and pull people off the page before it has said
                  anything. */}
              <Link
                to="/services"
                className="group mt-7 inline-flex items-center gap-1.5 text-[0.9375rem] font-bold text-accent"
              >
                {a.servicesLink}
                <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* HERO PHOTOGRAPH — an override, recorded so nobody removes it
                later thinking it slipped through review.

                The About spec rules stock photography out of this slot twice:
                §5 ("real ZED photography, not generated or stock") and §26
                ("avoid stock photography, people posing around laptops,
                staged diversity imagery... a slightly imperfect real
                photograph is preferable to a perfect stock photograph on this
                particular page"). This image is stock, and it was chosen at
                Mayur's direction after that was put to him with both quotes.

                The cost, for whoever reads this next: the page opens on people
                who do not work here, two sections above a photograph of eleven
                who do. If a real candid shot ever turns up, it replaces this
                one and the heroImageHint above says what to take.

                The placeholder still renders when there is no image and the
                page is a draft, so the brief is not lost. */}
            {a.heroImage ? (
              <img
                src={a.heroImage.src}
                alt={a.heroImage.alt}
                width={1600}
                height={1067}
                loading="eager"
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            ) : (
              showHeroPlaceholder && (
                <div className="flex aspect-[4/3] w-full flex-col justify-end rounded-2xl border border-dashed border-border-strong bg-surface p-6">
                  <p className="text-[0.625rem] font-bold uppercase leading-none tracking-[0.1em] text-subtle-foreground">
                    Photograph to source
                  </p>
                  <p className="mt-2 max-w-[28rem] font-mono text-[0.8125rem] leading-[1.5] text-muted-foreground">
                    {a.heroImageHint}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------
          02 — WHY WE'RE HERE
          Heading left, copy and one small diagram right.
          -------------------------------------------------------------- */}
      <section className="border-b border-border" aria-labelledby="about-why">
        <div className="container-page section-y split">
          <SectionHeader
            align="left"
            eyebrow={a.whyEyebrow}
            heading={a.whyHeading}
            headingId="about-why"
          />
          <div>
            <div className="max-w-[40rem] space-y-4">
              {a.whyBody.map((para) => (
                <p
                  key={para.slice(0, 20)}
                  className="text-[1.0625rem] leading-[1.65] text-muted-foreground"
                >
                  {para}
                </p>
              ))}
            </div>
            <ChainDiagram labels={a.whyDiagram} note={a.whyDiagramNote} />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------
          03 — WHAT WE BELIEVE
          Editorial columns, not cards. Three boxed features here would make
          principles look like products.
          -------------------------------------------------------------- */}
      <section className="border-b border-border bg-surface" aria-labelledby="about-believe">
        <div className="container-page section-y">
          <SectionHeader
            align="left"
            eyebrow={a.believeEyebrow}
            heading={a.believeHeading}
            sub={a.believeIntro}
            headingId="about-believe"
          />
          <ul className="mt-8 grid gap-x-10 gap-y-9 md:grid-cols-3">
            {a.beliefs.map((b, i) => {
              const Mark = BELIEF_MARKS[i] ?? BELIEF_MARKS[0];
              return (
                <li key={b.title} className={i > 0 ? "md:border-l md:border-border md:pl-10" : ""}>
                  <span className="block h-px w-7 bg-primary" aria-hidden="true" />
                  <div className="mt-5 text-foreground">
                    <Mark />
                  </div>
                  <h3 className="font-display mt-4 max-w-[18ch] text-[1.375rem] leading-[1.15] tracking-[-0.02em]">
                    {b.title}
                  </h3>
                  <p className="mt-3 max-w-[26rem] text-[0.9375rem] leading-[1.6] text-muted-foreground">
                    {b.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------
          04 — HOW WE WORK
          The page's one dark band, and its only visual event.

          Two blocks with different jobs: the flow says what happens through
          an engagement, the three principles say how we behave while doing
          it. The flow is four words and four short phrases precisely so it
          cannot start restating the principles underneath it.
          -------------------------------------------------------------- */}
      <section className="section-dark border-b border-border" aria-labelledby="about-work">
        <div className="container-page section-y">
          <SectionHeader
            align="left"
            eyebrow={a.workEyebrow}
            heading={a.workHeading}
            sub={a.workIntro}
            headingId="about-work"
          />
          <ProcessFlow stages={a.workStages} />
          <ul className="mt-12 grid gap-x-10 gap-y-9 md:grid-cols-3">
            {a.workPrinciples.map((p) => (
              <li key={p.title}>
                <span className="block h-px w-7 bg-primary" aria-hidden="true" />
                <h3 className="font-display mt-4 max-w-[18ch] text-[1.25rem] leading-[1.2] tracking-[-0.02em] sm:text-[1.375rem]">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-[26rem] text-[0.9375rem] leading-[1.6] text-muted-foreground">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------------
          05 — OUR TEAM
          Photographs first, then one restrained location line.

          No offices grid here any more. Street addresses are on /contact,
          which is where someone looking for one goes, and repeating them
          made this section answer a question it was not asked.
          -------------------------------------------------------------- */}
      <section className="border-b border-border" aria-labelledby="about-team">
        <div className="container-page section-y">
          <SectionHeader
            align="left"
            eyebrow={a.teamEyebrow}
            heading={a.teamHeading}
            sub={a.teamBody}
            headingId="about-team"
          />

          {/* 60/40, and the two frames are deliberately different heights —
              4:3 beside 3:2 — because forcing a company photograph and a room
              photograph into identical boxes is what makes a page look like a
              template. */}
          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,6fr)_minmax(0,4fr)] lg:items-start">
            {a.teamPhotos.map((photo, i) => (
              <figure key={photo.src}>
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={1600}
                  height={1067}
                  loading="lazy"
                  /* Same ratio, different widths. At 4:3 beside 3:2 the left
                     frame ran 260px taller and the space under the right one
                     read as a hole rather than as composition. Both at 3:2,
                     the 60/40 split does the work and the difference in height
                     is obviously proportional. */
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                />
                <figcaption className="mt-3 text-[0.8125rem] leading-[1.4] text-subtle-foreground">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <LocationLine places={a.teamLocations} note={a.teamLocationsNote} />
        </div>
      </section>

      {/* --------------------------------------------------------------
          06 — CLOSING CTA
          -------------------------------------------------------------- */}
      <section className="bg-surface" aria-labelledby="about-cta">
        <div className="container-page section-y grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center">
          <div className="max-w-[36rem]">
            <h2
              id="about-cta"
              className="font-display max-w-[20ch] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]"
            >
              {a.ctaHeading}
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-[1.6] text-muted-foreground">{a.ctaBody}</p>
          </div>
          <div className="lg:justify-self-end">
            <Link to="/contact" className="btn btn-wrap btn-primary">
              {a.ctaButton}
              <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Client — ZED team — the work.
 *
 * Three boxes and two connectors. The whole point is how few boxes there are,
 * so anything that would make it look busier — icons, a fourth node, a legend
 * — defeats it. Horizontal from 640px, vertical below, where three labels on
 * one line stop fitting.
 */
function ChainDiagram({ labels, note }: { labels: string[]; note: string }) {
  return (
    <figure className="mt-9">
      <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
        {labels.map((label, i) => (
          <div
            key={label}
            className="flex flex-col items-stretch sm:flex-1 sm:flex-row sm:items-center"
          >
            {i > 0 && <Connector />}
            <div className="rounded-xl border border-border bg-background px-4 py-3 text-center sm:flex-1">
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-foreground">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-[0.8125rem] leading-[1.4] text-subtle-foreground">
        {note}
      </figcaption>
    </figure>
  );
}

/** One connector: a rule with a red node on it. Rotates with the layout. */
function Connector() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-auto flex h-6 w-px shrink-0 items-center justify-center bg-border-strong sm:mx-0 sm:h-px sm:w-8"
    >
      <span className="absolute h-[7px] w-[7px] rounded-full bg-primary" />
    </span>
  );
}

/**
 * Understand — recommend — build — stay involved.
 *
 * Horizontal on desktop, per the spec's preference; vertical below 768px
 * rather than shrunk, because four stage names plus four phrases on one line
 * at phone width is unreadable at any size that still fits.
 */
function ProcessFlow({ stages }: { stages: { title: string; note: string }[] }) {
  return (
    <ol className="mt-9 grid gap-y-6 md:grid-cols-4 md:gap-x-0">
      {stages.map((s, i) => (
        <li key={s.title} className="relative md:pr-8">
          {/* The rule runs between stages, not after the last one, so the flow
              reads as finished rather than trailing off. */}
          <div className="flex items-center gap-3 md:block">
            <span className="relative flex items-center">
              <span
                className="h-[9px] w-[9px] shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              {i < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="ml-2 hidden h-px w-full bg-border-strong md:block md:absolute md:left-4 md:right-[-2rem] md:ml-0 md:w-auto"
                />
              )}
            </span>
            <h3 className="text-[0.9375rem] font-bold leading-[1.3] md:mt-4">{s.title}</h3>
          </div>
          <p className="mt-1.5 max-w-[16rem] pl-[21px] text-[0.875rem] leading-[1.5] text-muted-foreground md:pl-0">
            {s.note}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * North America ●———● India.
 *
 * The restrained version, per the spec's own preference between the two it
 * drew. No map, no flags, no third node: the only claim is that there are
 * people in two places and they are one company.
 */
function LocationLine({
  places,
  note,
}: {
  places: { place: string; role: string }[];
  note: string;
}) {
  const [left, right] = places;
  if (!left || !right) return null;
  return (
    <div className="mt-10 border-t border-border pt-7">
      {/* Two labels with the connector spanning the gap between them, rather
          than a connector parked beside one of them. The line IS the claim —
          two places, one company — so it has to reach across. Stacks below
          640px, where a rule that long has nothing to span. */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6">
        <Place {...left} />
        <span aria-hidden="true" className="relative hidden h-px flex-1 bg-border-strong sm:block">
          <span className="absolute left-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-primary" />
          <span className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-primary" />
        </span>
        <Place {...right} align="right" />
      </div>
      <p className="mt-6 text-center text-[0.8125rem] font-semibold leading-[1.4] text-subtle-foreground">
        {note}
      </p>
    </div>
  );
}

function Place({
  place,
  role,
  align = "left",
}: {
  place: string;
  role: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "sm:text-right" : ""}>
      <p className="text-[0.6875rem] font-bold uppercase leading-none tracking-[0.08em] text-foreground">
        {place}
      </p>
      <p className="mt-1.5 text-[0.875rem] leading-[1.4] text-muted-foreground">{role}</p>
    </div>
  );
}
