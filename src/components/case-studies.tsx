import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

export function CaseStudies() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.caseStudies.eyebrow} className="section-dark border-t border-border">
      <div className="container-page section-y">
        <div className="flex justify-center">
          <SectionHeader eyebrow={t.caseStudies.eyebrow} heading={t.caseStudies.heading} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-12 lg:gap-x-16">
          {t.caseStudies.items.map((cs, i) => (
            <article
              key={cs.title}
              aria-label={cs.title}
              className={`group relative flex flex-col border-t border-accent/30 pt-6 transition-all ${
                i % 2 === 1 ? "md:mt-20" : ""
              }`}
            >
              <header className="mb-8 flex items-baseline justify-between gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  {cs.tag}
                </span>
                <span className="text-right text-xs uppercase text-muted-foreground">
                  {[cs.client, cs.date].filter(Boolean).join(" · ")}
                </span>
              </header>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                <div className="lg:w-2/5">
                  <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tighter transition-all group-hover:italic group-hover:text-accent lg:text-5xl">
                    {cs.short.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                </div>
                <div className="lg:w-3/5">
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {cs.desc}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {cs.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-accent/20 px-3 py-1 text-[10px] uppercase tracking-wider text-muted-foreground"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
