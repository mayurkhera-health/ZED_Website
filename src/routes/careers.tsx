import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { DraftBanner } from "@/components/draft-banner";
import { LegalBlocks } from "@/components/careers-legal";
import { CareersWhy } from "@/components/careers-why";
import { CareersProcess } from "@/components/careers-process";
import { DRAFT_CAREERS, OPEN_POSTINGS, formatPay } from "@/lib/careers";

const SITE = "https://screen-snap-magic-729.lovable.app";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — ZEDventures" },
      {
        name: "description",
        content:
          "Open roles at ZEDventures. Engineering, SAP, analytics and systems analysis positions in San Jose, California.",
      },
      ...(DRAFT_CAREERS ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: "Careers — ZEDventures" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/careers` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/careers` }],
  }),
  component: CareersPage,
});

function CareersPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        {DRAFT_CAREERS && (
          <DraftBanner note="These postings were read off the current live site, not transcribed from the filings, and the pay ranges are placeholders. This page is noindex until both are fixed." />
        )}
        <CareersBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function CareersBody() {
  const { t } = useLanguage();
  const c = t.careersPage;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page section-y section-y-card">
          <SectionHeader align="left" eyebrow={c.eyebrow} heading={c.heading} sub={c.sub} />
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page section-y section-y-card">
          {OPEN_POSTINGS.length === 0 ? (
            <p className="max-w-[46rem] text-[1.0625rem] leading-[1.6] text-muted-foreground">
              {c.noRoles}
            </p>
          ) : (
            <ul>
              {OPEN_POSTINGS.map((p) => {
                const pay = formatPay(p);
                return (
                  <li
                    key={p.slug}
                    className="border-t border-border first:border-t-0 last:border-b"
                  >
                    {/* The whole row is the link, not just the "View role" text —
                        this is a scan list, and a 900px-wide row with a 90px
                        target at the end of it is a worse hit area than the row
                        itself. min-h keeps the tap target above 44px on phones
                        even when a role has no job code. */}
                    <Link
                      to="/careers/$slug"
                      params={{ slug: p.slug }}
                      className="group grid min-h-[3.5rem] gap-x-8 gap-y-3 py-6 transition-colors hover:bg-secondary sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_auto] sm:items-baseline sm:py-[26px]"
                      style={{
                        transitionDuration: "var(--dur)",
                        transitionTimingFunction: "var(--ease)",
                      }}
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                          <h2 className="text-[1.1875rem] font-bold leading-[1.25] tracking-[-0.019em]">
                            {p.title}
                          </h2>
                          {p.jobCode && (
                            <span className="rounded-[4px] bg-muted px-1.5 py-0.5 text-[0.6875rem] font-semibold tracking-[0.02em] text-subtle-foreground">
                              {c.jobCodeLabel} {p.jobCode}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-sm leading-[1.5] text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                          {p.locations[0]}
                        </span>
                        <span className="mt-1 block">
                          {p.employmentType} · {pay ?? c.payTbd}
                        </span>
                      </div>

                      <span className="flex items-center gap-1.5 text-sm font-bold text-accent group-hover:underline underline-offset-4">
                        {c.viewRole}
                        <ArrowUpRight className="arrow-shift h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <CareersWhy />

      <CareersProcess />

      <LegalBlocks />
    </>
  );
}
