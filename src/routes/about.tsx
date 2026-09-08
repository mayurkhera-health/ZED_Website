import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { DraftBanner } from "@/components/draft-banner";

const SITE = "https://screen-snap-magic-729.lovable.app";

/**
 * The positioning line and two of the three "what makes us different" entries
 * are drafts marked [CONFIRM] — written from what this site already claims, not
 * from anything the company has stated. Until they are confirmed the page shows
 * a banner and is kept out of search results.
 *
 * This used to be gated on DRAFT_SERVICE_PAGES, which is a different page group
 * entirely: flipping that flag would have silently published this page, and
 * flipping this one would have had no effect on it. Separate concerns, separate
 * flags.
 */
export const DRAFT_ABOUT = true;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zed Ventures | Enterprise Engineering" },
      {
        name: "description",
        content:
          "Zed Ventures is an enterprise engineering firm working across AI, data, analytics, geospatial, SAP and Guidewire platforms.",
      },
      // Placeholder copy must not be indexed.
      ...(DRAFT_ABOUT ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: "About Zed Ventures" },
      {
        property: "og:description",
        content: "Engineering built around outcomes, not slide decks.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/about` },
      { name: "twitter:card", content: "summary_large_image" },
      ...(DRAFT_ABOUT ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: `${SITE}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        {DRAFT_ABOUT && (
          <DraftBanner note="The positioning line and two of the three What makes us different entries are marked [CONFIRM] — drafts written from what the site already claims, not from anything you have told us. Confirm or correct them, then set DRAFT_ABOUT to false." />
        )}
        <AboutBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function AboutBody() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page section-y">
          <div className="border-l-4 border-primary pl-6 sm:pl-8">
            <p className="eyebrow text-accent">{a.eyebrow}</p>
            <h1 className="font-display mt-3 max-w-[20ch] text-[2.5rem] leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              {a.heading}
            </h1>
            <p className="mt-6 max-w-[46rem] text-[1.0625rem] leading-[1.6] text-muted-foreground sm:text-[1.125rem]">
              {a.sub}
            </p>
          </div>
        </div>
      </section>

      <section className="section-dark border-b border-border">
        <div className="container-page section-y">
          <SectionHeader align="left" eyebrow={a.diffEyebrow} heading={a.diffHeading} />
          <ul className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {a.diffItems.map((d, i) => (
              <li key={d.title} className="border-t border-border pt-6">
                <h3 className="font-display text-[1.375rem] leading-[1.15] tracking-[-0.02em]">
                  {d.title}
                </h3>
                <p className="mt-3 text-base leading-[1.55] text-muted-foreground">{d.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page section-y section-y-card">
          <SectionHeader align="left" eyebrow={a.deliveryEyebrow} heading={a.deliveryHeading} />
          <p className="mt-8 max-w-[46rem] text-[1.0625rem] leading-[1.65] text-muted-foreground">
            {a.deliveryBody}
          </p>
          {/* Rendered from t.contact.page.offices, the same source the contact
              page uses. One list, so an address can never be right in one place
              and stale in the other. */}
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {t.contact.page.offices.map((office, i) => (
              <li key={office.city} className="flex flex-col bg-card p-7">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                <p className="font-display mt-4 text-2xl leading-[1.1] tracking-[-0.02em]">
                  {office.city}
                </p>
                <p className="mt-1 text-[0.9375rem] text-muted-foreground">{office.region}</p>
                <p className="mt-4 text-sm leading-relaxed text-subtle-foreground">
                  {office.address}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page section-y split">
          <SectionHeader align="left" eyebrow={t.contact.eyebrow} heading={a.ctaHeading} />
          <div className="lg:justify-self-end lg:pt-2">
            <Link to="/contact" className="btn btn-primary">
              {t.nav.talk}
              <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
