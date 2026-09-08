import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DraftBanner } from "@/components/draft-banner";
import { LegalBlocks } from "@/components/careers-legal";
import { DRAFT_CAREERS, formatPay, getPosting, jobPostingJsonLd } from "@/lib/careers";

const SITE = "https://screen-snap-magic-729.lovable.app";

export const Route = createFileRoute("/careers_/$slug")({
  loader: ({ params }) => {
    const posting = getPosting(params.slug);
    if (!posting) throw notFound();
    return { slug: posting.slug };
  },
  head: ({ params }) => {
    const p = getPosting(params.slug);
    if (!p) return {};
    const url = `${SITE}/careers/${p.slug}`;
    const jsonLd = jobPostingJsonLd(p, url);
    return {
      meta: [
        { title: `${p.title} — Careers — ZEDventures` },
        {
          name: "description",
          content: `${p.title} at ZEDventures. ${p.locations[0]}. ${p.employmentType}, ${p.hoursPerWeek} hours per week.`,
        },
        ...(DRAFT_CAREERS ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        { property: "og:title", content: `${p.title} — ZEDventures` },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      // Google Jobs markup. jobPostingJsonLd returns null while the posting has
      // unverified fields, so incomplete salary data is never published.
      scripts: jsonLd ? [{ type: "application/ld+json", children: jsonLd }] : [],
    };
  },
  component: PostingPage,
});

function PostingPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        {DRAFT_CAREERS && (
          <DraftBanner note="This posting was read off the current live site, not transcribed from the filing, and the pay range is a placeholder. This page is noindex and emits no Google Jobs markup until both are fixed." />
        )}
        <PostingBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.09em] text-subtle-foreground">
        {label}
      </dt>
      <dd className="mt-1.5 text-[0.9375rem] leading-[1.5] text-foreground">{children}</dd>
    </div>
  );
}

function PostingBody() {
  const { slug } = Route.useLoaderData();
  const { t } = useLanguage();
  const c = t.careersPage;
  const p = getPosting(slug)!;
  const pay = formatPay(p);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page section-y">
          <Link
            to="/careers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {c.backToRoles}
          </Link>

          <p className="eyebrow mt-8 text-accent">{c.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-[18ch] text-[2.5rem] leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {p.title}
          </h1>

          <dl className="mt-8 grid max-w-[52rem] gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {p.jobCode && <Field label={c.jobCodeLabel}>{p.jobCode}</Field>}
            <Field label={c.locationLabel}>
              {p.locations.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </Field>
            <Field label={c.typeLabel}>{p.employmentType}</Field>
            <Field label={c.hoursLabel}>{p.hoursPerWeek} / week</Field>
            <Field label={c.payLabel}>
              {pay ?? <span className="text-subtle-foreground">{c.payTbd}</span>}
            </Field>
            <Field label={c.sponsorshipLabel}>
              {p.sponsorship ? c.sponsorshipYes : c.sponsorshipNo}
            </Field>
          </dl>
        </div>
      </section>

      {/* Posting text. Rendered from the data exactly as stored — see the
          verbatim warning at the top of src/lib/careers.ts. */}
      <section className="border-b border-border">
        <div className="container-page section-y grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.75rem]">
              {c.dutiesHeading}
            </h2>
            <p className="mt-4 max-w-[38rem] whitespace-pre-line text-[1.0625rem] leading-[1.65] text-muted-foreground">
              {p.duties}
            </p>
          </div>
          <div>
            <h2 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.75rem]">
              {c.requirementsHeading}
            </h2>
            <p className="mt-4 max-w-[38rem] whitespace-pre-line text-[1.0625rem] leading-[1.65] text-muted-foreground">
              {p.requirements}
            </p>
          </div>
          {p.sourceOfText === "filing" && (
            <p className="max-w-[38rem] text-[0.8125rem] leading-[1.55] text-subtle-foreground lg:col-span-2">
              {c.verbatimNote}
            </p>
          )}
        </div>
      </section>

      <section className="section-dark border-b border-border">
        <div className="container-page section-y">
          <h2 className="font-display text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]">
            {c.applyHeading}
          </h2>
          <p className="mt-4 max-w-[42rem] text-[1.0625rem] leading-[1.6] text-muted-foreground">
            {c.applyIntro}
          </p>
          <dl className="mt-8 grid max-w-[46rem] gap-x-10 gap-y-6 sm:grid-cols-2">
            {p.applyEmail && (
              <Field label={c.applyEmailLabel}>
                <a
                  href={`mailto:${p.applyEmail}?subject=${encodeURIComponent(
                    p.jobCode ? `${p.title} (${p.jobCode})` : p.title,
                  )}`}
                  className="inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {p.applyEmail}
                </a>
              </Field>
            )}
            <Field label={c.applyPostalLabel}>{p.applyPostal}</Field>
          </dl>
        </div>
      </section>

      <LegalBlocks />
    </>
  );
}
