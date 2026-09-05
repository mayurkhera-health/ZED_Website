import { useLanguage } from "@/lib/i18n";

/**
 * Global delivery — homepage.
 *
 * Two groups, not three peers. The previous version put North America,
 * Americas and India on one connector, which read as a three-step process and
 * placed a client market and a delivery centre on the same conceptual level.
 * They are not the same kind of thing.
 *
 *   NORTH AMERICA  (client markets)   |   GLOBAL DELIVERY  (engineering)
 *   United States · Canada            |   India
 *
 * The vertical rule between them is the whole idea: proximity on one side,
 * depth on the other, one company across both.
 *
 * CANADA is present deliberately and carefully. "Growing market" is the only
 * claim made. The copy says "built to serve Canadian organizations", never
 * Canadian operations, office, delivery centre, local team or presence —
 * none of which is true today. The heading is written to become a link to a
 * /canada page later without the copy changing.
 *
 * NO map, globe, flags, country outlines, maple leaves, skylines, flight
 * paths, travelling dots or "24/7". Red is the eyebrow, the three nodes and
 * the growing-market label; nothing else.
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
          className="font-display mt-3 max-w-[24ch] text-[1.75rem] leading-[1.1] tracking-[-0.025em] sm:text-[2.125rem]"
        >
          {g.heading}
        </h2>
        <p className="mt-4 max-w-[46rem] text-[1.0625rem] leading-[1.55] text-muted-foreground">
          {g.sub}
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-background px-6 py-7 sm:px-8">
          {/* 64 / 36, with the rule between the two groups rather than around
              them. On phones the rule becomes a horizontal divider so the
              grouping survives the stack. */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,64fr)_minmax(0,36fr)] lg:gap-10">
            {/* ---- client markets ---- */}
            <div>
              <GroupLabel label={g.marketsLabel} note={g.marketsNote} />
              <div className="mt-6 grid gap-7 sm:grid-cols-2 sm:gap-8">
                {g.markets.map((m) => (
                  <Place key={m.place} {...m} />
                ))}
              </div>
            </div>

            {/* ---- delivery ---- */}
            <div className="border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <GroupLabel label={g.deliveryLabel} note={g.deliveryNote} />
              <div className="mt-6">
                <Place {...g.delivery} />
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-[0.9375rem] font-semibold leading-[1.4] text-foreground">
              {g.closing}
            </p>
            <p className="mt-1.5 max-w-[46rem] text-[0.875rem] leading-[1.5] text-muted-foreground">
              {g.closingSub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupLabel({ label, note }: { label: string; note: string }) {
  return (
    <div>
      <p className="text-[0.625rem] font-semibold uppercase leading-none tracking-[0.06em] text-subtle-foreground">
        {label}
      </p>
      <p className="mt-1.5 text-[0.875rem] leading-[1.4] text-muted-foreground">{note}</p>
    </div>
  );
}

function Place({
  place,
  role,
  desc,
  flag,
}: {
  place: string;
  role: string;
  desc: string;
  flag?: string;
}) {
  return (
    <div className="relative pl-5">
      {/* The node is punctuation, not information — every line here reads
          correctly with it ignored, which is why it is aria-hidden. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-[5px] h-[7px] w-[7px] rounded-full bg-primary"
      />
      {flag && (
        <p className="text-[0.5625rem] font-semibold uppercase leading-none tracking-[0.08em] text-accent">
          {flag}
        </p>
      )}
      <p
        className={`text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.06em] text-subtle-foreground ${
          flag ? "mt-2" : ""
        }`}
      >
        {place}
      </p>
      <h3 className="mt-2 max-w-[22ch] text-[1.0625rem] font-bold leading-[1.25] sm:text-[1.125rem]">
        {role}
      </h3>
      <p className="mt-2 max-w-[24rem] text-[0.875rem] leading-[1.55] text-muted-foreground">
        {desc}
      </p>
    </div>
  );
}
