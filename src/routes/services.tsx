import { SITE_URL as SITE } from "@/lib/site-url";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageMasthead } from "@/components/page-masthead";
import { VISIBLE_SERVICE_ENTRIES } from "@/lib/service-pages";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Enterprise Technology Services | ZEDventures" },
      {
        name: "description",
        content:
          "Explore ZEDventures' capabilities: AI & Data, Analytics, GIS & Geospatial, Guidewire, SAP, Product Engineering, and Offshore & Nearshore Delivery.",
      },
      { property: "og:title", content: "Enterprise Technology Services | ZEDventures" },
      {
        property: "og:description",
        content: "Engineering, data, and geospatial systems built to run.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/services` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: `${SITE}/services`,
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        <ServicesPageBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function ServicesPageBody() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <>
      <PageMasthead eyebrow={s.eyebrow} heading={s.heading} sub={s.sub} />

      {/* Each band links to its own service page.
          Until now this page described the seven services and linked to none
          of them: the header nav points here, so the route a visitor actually
          takes — click Services, then look for the one you want — was a dead
          end, and the detail pages were only reachable from the homepage. */}
      {VISIBLE_SERVICE_ENTRIES.map(({ index, slug }, position) => {
        const item = s.items[index];
        if (!item) return null;
        /* Alternation follows the position on screen, not the index in the
           data. Keyed to the data index, hiding one service would put two
           dark bands next to each other. */
        const isDark = position % 2 === 0;
        return (
          <section
            key={item.title}
            className={`border-b border-border ${isDark ? "section-dark" : "bg-background"}`}
          >
            {/* The whole band is the link, and it always was — the "View
                service" text under it was a second control for the same
                destination, which is why it read as the only clickable part.

                What replaces it is an affordance rather than a label: a
                persistent arrow at the right edge that moves on hover, the
                title shifting with it, and a ground change across the row.
                aria-label carries the service name so a screen reader hears
                "AI & Data, view service" rather than seven identical links. */}
            <Link
              to="/services/$slug"
              params={{ slug }}
              aria-label={`${item.title} — ${t.services.viewService}`}
              className="group block px-5 py-6 transition-colors hover:bg-secondary sm:px-8 sm:py-7"
              style={{ transitionDuration: "var(--dur)", transitionTimingFunction: "var(--ease)" }}
            >
              <div className="mx-auto flex max-w-6xl items-start gap-6">
                <div className="min-w-0 flex-1">
                  <h2
                    className="font-display text-2xl tracking-tight transition-transform group-hover:translate-x-1 sm:text-3xl"
                    style={{
                      transitionDuration: "var(--dur)",
                      transitionTimingFunction: "var(--ease)",
                    }}
                  >
                    {item.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
                <ArrowUpRight
                  className="arrow-shift mt-1 h-6 w-6 shrink-0 text-accent"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </section>
        );
      })}
    </>
  );
}
