import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import {
  capabilityLabel,
  formatDate,
  readingMinutes,
  relatedArticles,
  type Article,
  type Block,
  type Timeline,
} from "@/lib/insights";
import { InsightCard } from "@/components/insight-card";
import { ConversationCta } from "@/components/conversation-cta";

/**
 * THE ARTICLE TEMPLATE.
 *
 * Every Insights post renders through this one file. To publish a new post you
 * add an object to ARTICLES in lib/insights.ts and touch nothing here.
 *
 * ---------------------------------------------------------------------------
 * WHY ONE TEMPLATE AND NOT ONE FILE PER POST
 *
 * The brief asked for a template that future posts copy — duplicate the file,
 * swap the text. That gets you the first two posts quickly and then costs you
 * for years: with ten posts, changing the pull-quote colour is ten edits, and
 * the tenth is the one somebody forgets. It is the same problem the three
 * pasted section mastheads had before they became PageMasthead.
 *
 * This gets the same outcome the brief actually wants — a new post is
 * mechanical, no design decisions, no layout work — from the other direction.
 * The layout lives in one place; the posts are data. Swapping "text/timeline
 * content" is editing an object rather than a component, and the design can
 * never drift between posts because there is only one of it.
 *
 * ---------------------------------------------------------------------------
 * THE SHAPE, TOP TO BOTTOM
 *
 *   1. Header — red bar, eyebrow, title, dek, meta row.
 *   2. Timeline card, when the post has one.
 *   3. Body, in a narrow measure.
 *   4. CTA card.
 *   5. Back to index.
 *
 * lang="en" sits on the reading content, not the page: the chrome around it is
 * translated and this is not, so a screen reader should not announce French
 * navigation in an English voice.
 */
export function ArticleTemplate({ article: a }: { article: Article }) {
  const { t } = useLanguage();
  const related = relatedArticles(a.slug);

  return (
    <>
      {/* ONE SECTION, NOT TWO.
          The header and the body used to be separate <section>s, each with
          section-y padding. Stacked, that put 40px of nothing between the
          meta line and the timeline for no reason other than that two
          containers happened to meet there. Merging them makes every gap on
          this page a deliberate number rather than the sum of two. */}
      <section className="bg-background">
        <div className="container-page py-7 sm:py-8">
          {/* ONE LEFT EDGE.
              The header was flush left and the body was centred, which left a
              wide empty gutter beside the prose and an empty half beside the
              title, and made the two look like parts of different pages. Now
              everything shares a column and an edge.

              The blocks below the header carry a TRANSPARENT 4px left border
              and the same padding as the header's red one. Same box model, so
              their text lines up exactly under the title rather than being
              nudged by however wide the rule happens to be. */}
          <div className="max-w-[43.75rem]">
            <div className="border-l-4 border-primary pl-5 sm:pl-7">
              <p className="text-[0.6875rem] font-bold uppercase tracking-[0.1em]">
                <span className="text-accent">{a.contentType}</span>
                {a.capability && (
                  <>
                    <span className="mx-1.5 text-border-strong" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-subtle-foreground">{capabilityLabel(a.capability)}</span>
                  </>
                )}
              </p>
              <h1
                lang="en"
                className="font-display h1-page mt-2 max-w-[26ch] [overflow-wrap:anywhere]"
              >
                {a.title}
              </h1>
              <p
                lang="en"
                className="mt-3 text-[1.125rem] leading-[1.5] text-muted-foreground sm:text-[1.25rem]"
              >
                {a.standfirst}
              </p>
              <p className="mt-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-subtle-foreground">
                {formatDate(a.published)}
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                {readingMinutes(a)} {t.insights.minRead}
              </p>
            </div>

            {a.timeline && <TimelineCard {...a.timeline} />}

            {/* 3 — BODY
              40rem is about 72 characters at this size, which is where
              sustained reading stops costing effort. Line-height came down
              from 1.75 to 1.6 when Mayur asked for this tighter: 1.75 is a
              generous setting that reads as air on a short article. */}
            <article lang="en" className="mt-7 border-l-4 border-transparent pl-5 sm:pl-7">
              {a.body.map((b, i) => (
                <BlockView key={i} block={b} first={i === 0} />
              ))}
            </article>

            {/* 4 — CTA CARD
              A card rather than a button dropped under the last paragraph, so
              the end of the argument and the ask are visibly separate things. */}
            <div className="mt-8 ml-6 rounded-2xl border border-border bg-surface p-5 sm:ml-8 sm:p-6">
              <p
                lang="en"
                className="text-[1.0625rem] font-semibold leading-[1.6] text-foreground sm:text-[1.125rem]"
              >
                {a.closing.text}
              </p>
              <Link to={a.closing.ctaTo} className="btn btn-primary mt-4 h-10 px-[18px] text-sm">
                {a.closing.ctaLabel}
                <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* 5 — BACK */}
            <div className="mt-5 border-l-4 border-transparent pl-5 sm:pl-7">
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {t.insights.backLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6 — RELATED
          Same topic first, then recent. relatedArticles() returns nothing when
          fewer than two qualify, so this band disappears rather than offering
          one unrelated article under the word "Related". With a single
          published post that is exactly what happens. */}
      {related.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="px-5 py-7 sm:px-8 sm:py-8">
            <div className="mx-auto max-w-6xl">
              <p className="eyebrow text-subtle-foreground">{t.insights.relatedLabel}</p>
              <ul className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {related.map((r) => (
                  <li key={r.slug} className="flex">
                    <InsightCard article={r} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <ConversationCta />
    </>
  );
}

/**
 * 2 — THE TIMELINE CARD.
 *
 * One column, read top to bottom. The version this replaces was two columns —
 * a headline on the left, the steps on the right — which on a phone collapsed
 * into a headline followed by an unrelated-looking list, and asked the reader
 * to work out that the two halves were one statement.
 *
 * The rail is a border on the list; each step hangs a dot on it. The final
 * step is the point of the whole figure, so it takes the accent: a filled red
 * dot, red label, and its text set bold. Everything above it is deliberately
 * quiet — the argument is that all of those steps went fine.
 *
 * Not aria-hidden. Unlike the image it replaces, this is real text and reads
 * out in order, so a screen reader user gets the sequence rather than one long
 * alt string.
 */
function TimelineCard({ eyebrow, title, steps }: Timeline) {
  return (
    <figure className="mt-7 ml-6 rounded-2xl border border-border bg-surface p-5 sm:ml-8 sm:p-6">
      <p className="eyebrow text-accent">{eyebrow}</p>
      <p className="font-display mt-1.5 text-[1.25rem] leading-[1.2] tracking-[-0.02em] sm:text-[1.4375rem]">
        {title}
      </p>

      <ol className="mt-4">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={`${s.label}-${s.text}`} className="relative pl-7 pb-3.5 last:pb-0">
              {/* The rail. Drawn per step and omitted on the last one, so the
                  line stops at the final dot instead of trailing past it. */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute left-[5px] top-[1.5em] bottom-0 w-px bg-border-strong"
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[1.15em] h-[11px] w-[11px] rounded-full ${
                  s.breaking ? "bg-primary" : "border border-border-strong bg-background"
                }`}
              />
              <p
                className={`text-[0.6875rem] font-bold uppercase tracking-[0.1em] ${
                  s.breaking ? "text-accent" : "text-subtle-foreground"
                }`}
              >
                {s.label}
              </p>
              <p
                className={`mt-0.5 text-[1.0625rem] leading-[1.4] ${
                  s.breaking ? "font-bold text-accent" : "text-foreground"
                }`}
              >
                {s.text}
              </p>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

/**
 * One body block.
 *
 * An H2 gets a hairline above it and a large gap, so a subsection announces
 * itself before you read the words. That pairing is the whole mechanism for
 * breaking up a wall of paragraphs — the divider does the work the extra
 * whitespace alone cannot.
 */
function BlockView({ block, first }: { block: Block; first: boolean }) {
  if (block.kind === "h2") {
    return (
      <h2 className="font-display mt-8 border-t border-border pt-4 text-[1.3125rem] leading-[1.25] tracking-[-0.02em] sm:text-[1.4375rem]">
        {block.text}
      </h2>
    );
  }

  if (block.kind === "quote") {
    return (
      <blockquote className="my-6 border-l-4 border-primary pl-5">
        <p className="font-display text-[1.25rem] leading-[1.3] tracking-[-0.01em] text-foreground sm:text-[1.4375rem]">
          {block.text}
        </p>
      </blockquote>
    );
  }

  if (block.kind === "h3") {
    return (
      <h3 className="font-display mt-6 text-[1.0625rem] font-bold leading-[1.35] sm:text-[1.125rem]">
        {block.text}
      </h3>
    );
  }

  if (block.kind === "callout") {
    return (
      <aside className="my-6 rounded-xl border border-border bg-surface p-5">
        {block.heading && (
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-accent">
            {block.heading}
          </p>
        )}
        <p className={`text-[1rem] leading-[1.6] text-foreground ${block.heading ? "mt-2" : ""}`}>
          {block.text}
        </p>
      </aside>
    );
  }

  if (block.kind === "olist") {
    return (
      <ol className="mt-3.5 space-y-1.5">
        {block.items.map((item, i) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-foreground"
          >
            <span className="mt-[0.05em] shrink-0 font-bold text-accent" aria-hidden="true">
              {i + 1}.
            </span>
            {item}
          </li>
        ))}
      </ol>
    );
  }

  if (block.kind === "list") {
    return (
      <ul className="mt-3.5 space-y-1.5">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-[1.0625rem] leading-[1.6] text-foreground"
          >
            <span
              className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={`text-[1.0625rem] leading-[1.6] text-muted-foreground ${first ? "" : "mt-4"}`}>
      {block.text}
    </p>
  );
}
