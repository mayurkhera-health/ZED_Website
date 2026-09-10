import { useLanguage } from "@/lib/i18n";

/**
 * Hero card — the dense panel that sits beside the headline.
 *
 * Everything in it is checkable: the offices come from the same list the
 * contact and about pages render, and the platform row names capabilities the
 * site documents. Deliberately NOT a status/uptime display: a card that looks
 * like live monitoring while showing invented figures is a claim the company
 * would have to defend, and there is no data source behind it.
 *
 * If real monitoring is ever wired up, this is the component to replace.
 */
export function HeroCard({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const offices = t.contact.page.offices;

  return (
    <aside
      className={`w-full max-w-[21rem] overflow-hidden rounded-xl border border-border bg-card ${className}`}
      style={{ boxShadow: "var(--shadow-e1)" }}
      aria-label={t.hero.cardTitle}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-[7px] w-[7px] rounded-full bg-border-strong" />
          <span className="h-[7px] w-[7px] rounded-full bg-border-strong" />
          <span className="h-[7px] w-[7px] rounded-full bg-border-strong" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-subtle-foreground">
          {t.hero.cardTitle}
        </span>
      </div>

      <div className="p-[18px]">
        {/* Offices — rendered from the same source as /contact and /about, so a
            location can never be right in one place and stale here. */}
        <ul className="flex flex-col gap-3">
          {offices.map((office) => (
            <li key={office.city} className="flex items-baseline justify-between gap-3">
              <span className="text-[0.9375rem] font-bold text-foreground">{office.city}</span>
              <span className="text-right text-[0.6875rem] leading-tight text-muted-foreground">
                {office.region}
              </span>
            </li>
          ))}
        </ul>

        {/* Counts that are true of this site and verifiable by scrolling it. */}
        <div className="mt-[18px] grid grid-cols-2 gap-2.5">
          <div className="rounded-md bg-surface p-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.06em] text-subtle-foreground">
              {t.hero.cardCapabilities}
            </p>
            <p className="font-display mt-1 text-[1.125rem] leading-none tabular-nums">
              {t.services.items.length}
            </p>
          </div>
          <div className="rounded-md bg-surface p-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.06em] text-subtle-foreground">
              {t.hero.cardLocations}
            </p>
            <p className="font-display mt-1 text-[1.125rem] leading-none tabular-nums">
              {offices.length}
            </p>
          </div>
        </div>

        <ul className="mt-[18px] flex flex-wrap gap-1.5 border-t border-border pt-[18px]">
          {["SAP", "Guidewire", "Azure", "GCP", "Databricks"].map((p) => (
            <li
              key={p}
              className="rounded border border-border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.04em] text-muted-foreground"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
