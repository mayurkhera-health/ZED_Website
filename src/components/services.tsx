import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { VISIBLE_SERVICE_ENTRIES } from "@/lib/service-pages";

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" aria-labelledby="services-heading" className="border-t border-border">
      <div className="container-page section-y section-y-card">
        <div className="flex justify-center">
          <SectionHeader
            headingId="services-heading"
            eyebrow={t.services.eyebrow}
            heading={t.services.heading}
            sub={t.services.sub}
          />
        </div>
        <ul className="mt-8">
          {VISIBLE_SERVICE_ENTRIES.map(({ index, slug }) => {
            const item = t.services.items[index];
            if (!item) return null;

            const inner = (
              <div className="grid grid-cols-1 items-baseline gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:gap-x-8">
                {/* S26 sets 27-32px here — a deliberate step down from the
                    previous 30/36/48, so seven rows read as a scannable index
                    rather than seven headlines. */}
                <h3 className="font-display flex items-center gap-2.5 text-[1.625rem] leading-[1.1] tracking-[-0.02em] transition-[color,transform] group-hover:text-accent sm:text-[1.75rem] lg:text-[2rem] motion-safe:group-hover:translate-x-1">
                  {item.title}
                  {slug && (
                    <ArrowRight
                      className="h-5 w-5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  )}
                </h3>
                <p className="max-w-[27.5rem] text-[0.9375rem] leading-[1.5] text-muted-foreground sm:text-base">
                  {item.desc}
                </p>
              </div>
            );

            return (
              <li key={item.title} className="border-t border-border last:border-b">
                {/* S28: the whole row is the link, and the hover wash is
                    --surface (#FBFBFA) rather than the spec's #F8F8F6 — the red
                    row number only clears 4.5:1 on the lighter of the two washes.
                    A service with no page yet renders as a plain row rather than
                    a link to nowhere, so adding an eighth capability to i18n
                    without a page degrades instead of breaking. */}
                {slug ? (
                  <Link
                    to="/services/$slug"
                    params={{ slug }}
                    className="group block py-7 transition-colors hover:bg-surface sm:min-h-[8.25rem] sm:py-8"
                    style={{
                      transitionDuration: "var(--dur)",
                      transitionTimingFunction: "var(--ease)",
                    }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="group py-7 sm:min-h-[8.25rem] sm:py-8">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
