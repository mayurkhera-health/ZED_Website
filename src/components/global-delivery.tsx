import { useLanguage } from "@/lib/i18n";

/**
 * Global delivery — homepage.
 *
 * Three columns, one frame, joined by a hairline with a node above each.
 * Deliberately not three cards: three cards say "three capabilities", and the
 * claim here is one operating model with parts in different places.
 *
 * WHY THE COLUMNS ARE WHAT THEY ARE
 *
 * The spec this was built from used North America / India / Across time zones.
 * That was changed, because "across time zones" is not a place — it is the
 * consequence of the first two — and putting it on the same connector implied a
 * handoff to somewhere that does not exist.
 *
 * More importantly it dropped nearshore delivery, which the Offshore &
 * Nearshore service page claims ("nearshore across the Americas for
 * overlapping hours") and the About page lists alongside onsite and offshore.
 * A homepage that contradicts a service page is worse than no homepage
 * section, so the three columns are three real locations and the time-zone
 * benefit moved into the closing line, where it belongs.
 *
 * COLOUR
 * Red is the eyebrow and the three nodes, nothing else. The nodes are
 * decorative — every column is fully readable with them ignored, and the
 * connector is aria-hidden.
 *
 * NO MAP. No globe, no flags, no country outlines, no flight paths, no
 * pulsing pins, no "24/7" — the last of those because it is a contractual
 * claim ZEDventures has not made anywhere else on this site.
 */
export function GlobalDelivery() {
  const { t } = useLanguage();
  const g = t.globalDelivery;

  return (
    <section className="border-b border-border" aria-labelledby="global-delivery">
      <div className="container-page section-y">
        <p className="eyebrow text-accent">{g.eyebrow}</p>
        <h2
          id="global-delivery"
          className="font-display mt-3 max-w-[18ch] text-[1.75rem] leading-[1.1] tracking-[-0.025em] sm:text-[2.125rem]"
        >
          {g.heading}
        </h2>

        <div className="mt-8 rounded-2xl border border-border bg-background px-6 py-7 sm:px-8">
          {/* Desktop: one hairline across the row with a node above each
              column. Mobile: the same idea rotated — a vertical rule down the
              left with the nodes on it — so the connection survives the
              stack instead of disappearing into three paragraphs. */}
          <ol className="grid gap-7 lg:grid-cols-3 lg:gap-10">
            {g.stages.map((stage, i) => (
              <li
                key={stage.place}
                className="relative pl-7 lg:pl-0 lg:pt-6"
              >
                {/* vertical connector, mobile only */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[3px] top-2 w-px bg-border-strong lg:hidden ${
                    i === g.stages.length - 1 ? "h-0" : "h-[calc(100%+1.75rem)]"
                  }`}
                />
                {/* horizontal connector, desktop only */}
                <span
                  aria-hidden="true"
                  className={`absolute top-[3px] hidden h-px bg-border-strong lg:block ${
                    i === g.stages.length - 1 ? "left-0 w-0" : "left-0 w-[calc(100%+2.5rem)]"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full bg-primary lg:left-0"
                />

                <p className="text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.06em] text-subtle-foreground">
                  {stage.place}
                </p>
                <h3 className="mt-1.5 text-[1.0625rem] font-bold leading-[1.3] sm:text-[1.125rem]">
                  {stage.role}
                </h3>
                <p className="mt-2 max-w-[20rem] text-[0.875rem] leading-[1.5] text-muted-foreground">
                  {stage.desc}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-7 border-t border-border pt-6 text-[0.9375rem] leading-[1.5] text-foreground">
            {g.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
