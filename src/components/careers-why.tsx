import { Globe, Layers, Route } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

/**
 * "Why join us" — three claims about working here.
 *
 * PLACEHOLDER CONTENT. The three lines in i18n.tsx are bracketed markers, not
 * copy. They have to be replaced with claims that are true of every role and
 * every location, because a candidate reads them as promises: the postings
 * cover San Jose plus "various unanticipated client locations," so anything
 * tied to one office or one team is wrong for most of the people reading it.
 *
 * Delete this section rather than launch it with the markers showing.
 *
 * Hairline-divided columns, no card borders or shadows, per the design spec.
 * Icons are stroke line icons at 20px — no emoji anywhere on this page.
 */
const ICONS = [Layers, Globe, Route];

export function CareersWhy() {
  const { t } = useLanguage();
  const c = t.careersPage;

  return (
    <section className="border-b border-border" aria-labelledby="careers-why">
      <div className="container-page section-y section-y-card">
        <p className="eyebrow text-accent">{c.whyEyebrow}</p>
        <h2
          id="careers-why"
          className="font-display mt-3 max-w-[22ch] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]"
        >
          {c.whyHeading}
        </h2>

        {/* Stacks to one column under 768px per the spec's responsive note.
            Dividers switch from horizontal rules to vertical ones at the same
            breakpoint, so the hairline always separates along the stacking axis. */}
        <ul className="mt-8 grid gap-px overflow-hidden bg-border md:grid-cols-3">
          {c.why.map((item, i) => {
            const Icon = ICONS[i] ?? Layers;
            return (
              <li key={item.title} className="bg-background py-6 md:px-7 md:first:pl-0">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" strokeWidth={1.75} />
                <h3 className="mt-4 text-[0.9375rem] font-bold leading-[1.35]">{item.title}</h3>
                <p className="mt-1.5 max-w-[30rem] text-sm leading-[1.55] text-muted-foreground">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
