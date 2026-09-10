import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  capabilityLabel,
  formatDate,
  readingMinutes,
  summaryOf,
  type Article,
} from "@/lib/insights";

/**
 * Insight cards — one component, two sizes.
 *
 * `featured` is the large editorial card directly under the hero; the default
 * is the standard listing card. Same structure and the same rules in both, so
 * the two can't drift into different ideas of what an Insight looks like.
 *
 * ---------------------------------------------------------------------------
 * THE ORDER, AND WHY IT CHANGED
 *
 * The first version put "1 MIN READ" alone at the top in bold caps, which made
 * reading time the loudest thing on the card. Nobody chooses an article by how
 * long it is. Type and topic lead now — what kind of thing this is and what
 * it's about — and reading time sits beside the date at the foot where it is
 * reference rather than headline.
 *
 * ---------------------------------------------------------------------------
 * RED, USED SPARINGLY
 *
 * The earlier card wore a 3px red rule across its whole top edge. With a wall
 * of cards that reads as decoration, and it spends the accent on nothing. Red
 * now marks three small things: the content type, the arrow, and the headline
 * on hover.
 *
 * ---------------------------------------------------------------------------
 * ONE LINK, WHOLE CARD
 *
 * The card is the anchor. A separate "Read insight" control would give a
 * keyboard user two stops for one destination, and hover would be the only
 * hint that the rest of the card does anything. The visible focus ring is not
 * optional here: it is the only non-hover signal that this is interactive.
 */
export function InsightCard({
  article: a,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: a.slug }}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0 ${
        featured ? "p-5 sm:p-6 lg:p-7" : "p-5"
      }`}
    >
      {/* A short red segment let into the top edge, not laid across it.
          The spec rules out a full-width red rule — with a grid of cards that
          reads as decoration and spends the accent on nothing. A 40px segment
          marks the card as ZED's and leaves the rest of the border quiet. It
          lengthens slightly on hover, which is a second non-colour signal
          that the whole card is a link. */}
      <span
        aria-hidden="true"
        className="absolute left-5 top-0 h-[3px] w-10 rounded-b-full bg-primary transition-[width] duration-150 group-hover:w-16 motion-reduce:group-hover:w-10 sm:left-6"
      />
      {/* 1 — type · topic. The separator is only drawn when there is a topic
          to separate from, so a missing one can never leave "FROM THE FIELD ·"
          dangling. */}
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

      {/* 2 — headline. Capped in ch rather than px so the limit follows the
          type size instead of fighting it at each breakpoint.

          44ch lands around 680px, inside the spec's 600-750px. It was 26ch,
          which held the headline to roughly a third of the card and left the
          right-hand side empty — the box was shrinking to fit the text
          instead of the text using the box. */}
      <h3
        className={`font-display mt-2 tracking-[-0.02em] transition-colors group-hover:text-accent ${
          featured
            ? "max-w-[44ch] text-[1.375rem] leading-[1.2] sm:text-[1.5625rem] lg:text-[1.75rem]"
            : "text-[1.0625rem] leading-[1.3]"
        }`}
      >
        {a.title}
      </h3>

      {/* 3 — summary. Three lines maximum on a listing card so a long one
          cannot push the row's cards out of alignment. */}
      <p
        className={`text-muted-foreground ${
          featured
            ? "mt-2 max-w-[44rem] text-[1rem] leading-[1.55]"
            : "mt-2 line-clamp-3 text-[0.9375rem] leading-[1.5]"
        }`}
      >
        {summaryOf(a)}
      </p>

      {/* 4 + 5 — pushed to the foot by mt-auto, so metadata and the link sit
          on one line across a row however long the headlines are. */}
      <div className="mt-auto pt-4">
        <p className="text-[0.78125rem] font-semibold text-subtle-foreground">
          {formatDate(a.published)}
          <span className="mx-1.5" aria-hidden="true">
            ·
          </span>
          {readingMinutes(a)} min read
        </p>
        <span className="mt-2.5 inline-flex items-center gap-1.5 text-[0.875rem] font-bold text-accent">
          Read insight
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
