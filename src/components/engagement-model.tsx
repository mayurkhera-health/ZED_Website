import type { EngagementBlock } from "@/lib/service-pages";

/**
 * Engagement — how much we own, and where the people sit.
 *
 * This replaces two sections that were six cards between them: three
 * engagement options and three deployment models, each with its own eyebrow,
 * heading, sub, card anatomy and footer label ("Best when" / "Suits"). Roughly
 * 600 words to answer two questions.
 *
 * The two questions are INDEPENDENT — any operating model can run with any
 * team shape — and that is the one useful thing neither section said. Stacked
 * as two grids of three they read as one taxonomy, or worse, as an implied
 * pairing where "Dedicated team" belongs with "Hybrid" and the other rows line
 * up beneath. Side by side under a shared heading, with one sentence saying
 * they combine freely, the relationship is the point rather than a thing the
 * reader has to work out.
 *
 * The layout is deliberately the homepage Global Delivery component's: two
 * groups, a vertical rule between them, one container. Same problem, same
 * shape, and the site gains a pattern rather than a third variation.
 *
 * DROPPED IN THE MERGE, and the space is why this fits:
 *   - the little org-tree diagrams. Three boxes under one box says nothing the
 *     label does not, and they cost more vertical space than any other element
 *     on the page.
 *   - the "Best when" and "Suits" footers. Both said the same kind of thing in
 *     the same place; the fit is now a clause in the body copy, where it reads
 *     as part of the description rather than as a repeated device.
 *   - one eyebrow, one heading, one sub, and three of the six card frames.
 *
 * The red dot marks the two choices most engagements start from. It is
 * explained once at the bottom rather than carried as a badge on each, and it
 * is a starting point, not a recommendation or a price tier.
 */
export function EngagementModel({ data }: { data: EngagementBlock }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-background px-6 py-7 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {data.groups.map((group, gi) => (
          <div
            key={group.label}
            className={
              gi > 0 ? "border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0" : ""
            }
          >
            <p className="text-[0.625rem] font-semibold uppercase leading-none tracking-[0.06em] text-subtle-foreground">
              {group.label}
            </p>
            <p className="mt-1.5 text-[0.875rem] leading-[1.4] text-muted-foreground">
              {group.note}
            </p>

            <ul className="mt-6 space-y-5">
              {group.options.map((o, oi) => (
                <li key={o.title} className="relative border-t border-border pl-5 pt-4">
                  {/* Left column only: a red segment laid over the hairline,
                      growing with each option, so increasing ZED ownership is
                      visible without a chart or a second explanation. The
                      right column keeps the plain hairline — those three are
                      alternatives, and ranking them would be wrong. */}
                  {gi === 0 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[-1px] h-px bg-primary"
                      style={{ width: `${30 + oi * 36}px` }}
                    />
                  )}
                  {/* The marker sits in the gutter so the three titles stay on
                      one optical line whether or not a row carries it. */}
                  {o.common && (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[22px] h-[7px] w-[7px] rounded-full bg-primary"
                    />
                  )}
                  <h4 className="text-[1.0625rem] font-bold leading-[1.25] sm:text-[1.125rem]">
                    {o.title}
                  </h4>
                  <p className="mt-1.5 max-w-[26rem] text-[0.875rem] leading-[1.55] text-muted-foreground">
                    {o.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-start gap-2.5 border-t border-border pt-6">
        <span
          aria-hidden="true"
          className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-primary"
        />
        <p className="max-w-[46rem] text-[0.9375rem] leading-[1.5] text-muted-foreground">
          {data.closing}
        </p>
      </div>
    </div>
  );
}
