import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageMasthead } from "@/components/page-masthead";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — ZEDventures" },
      {
        name: "description",
        content:
          "Real ZEDventures engagements and outcomes: AI help chat, event-driven sales intelligence, unified analytics, and cloud data migration for global enterprises.",
      },
      { property: "og:title", content: "Case Studies — ZEDventures" },
      {
        property: "og:description",
        content:
          "Real engagements, real outcomes — AI, data, and analytics systems running for global enterprises today.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://screen-snap-magic-729.lovable.app/case-studies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://screen-snap-magic-729.lovable.app/case-studies",
      },
    ],
  }),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        <CaseStudiesPageBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function CaseStudiesPageBody() {
  const { t } = useLanguage();
  const p = t.caseStudiesPage;
  const items = t.caseStudies.items;

  return (
    <>
      <PageMasthead eyebrow={p.eyebrow} heading={p.heading} sub={p.sub} />

      {items.map((item, i) => {
        const isDark = i % 2 === 0;
        return (
          <section
            key={item.tag}
            // Stable anchor so a service page can link straight to its proof.
            // Index-based rather than derived from the tag, because the tag is
            // translated and the anchor must be the same in both locales.
            id={`case-${i + 1}`}
            className={`scroll-mt-24 border-b border-border px-5 py-8 sm:px-8 sm:py-10 ${
              isDark ? "section-dark" : "bg-background"
            }`}
          >
            <div className="mx-auto max-w-6xl">
              <div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-muted-foreground">
                    {item.client} · {item.date}
                  </p>
                  <h2 className="font-display mt-1 text-2xl tracking-tight sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <p className="eyebrow text-accent">{p.outcomesLabel}</p>
                      <ul className="mt-3 space-y-2">
                        {item.outcomes.map((o) => (
                          <li
                            key={o}
                            className="flex items-start gap-2 text-sm leading-relaxed text-foreground"
                          >
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="eyebrow text-accent">{p.stackLabel}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.stack.map((sItem) => (
                          <span
                            key={sItem}
                            className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {sItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
