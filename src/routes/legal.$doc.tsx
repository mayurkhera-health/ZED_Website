import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DraftBanner } from "@/components/draft-banner";

const SITE = "https://screen-snap-magic-729.lovable.app";

/**
 * Privacy policy and terms of use, from one template.
 *
 * A drafted doc carries the banner and its own noindex. Terms is still
 * drafted: its warranty, liability and governing-law sections are notes to
 * counsel rather than clauses, so it cannot be shown to anyone.
 */
/**
 * Split from one flag into two. The pages were gated together, but they are
 * not in the same state: Privacy is finished prose with one open fact, while
 * Terms still has three sections whose entire body is a note to counsel.
 * Publishing them as a pair meant the finished one waited on the unfinished.
 */
export const DRAFT_PRIVACY = false;
export const DRAFT_TERMS = true;

function isDocDraft(doc: string): boolean {
  return doc === "terms" ? DRAFT_TERMS : DRAFT_PRIVACY;
}

const DOCS = ["privacy", "terms"] as const;
type Doc = (typeof DOCS)[number];
const isDoc = (v: string): v is Doc => (DOCS as readonly string[]).includes(v);

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    if (!isDoc(params.doc)) throw notFound();
    return { doc: params.doc as Doc };
  },
  head: ({ params }) => {
    if (!isDoc(params.doc)) return {};
    const title = params.doc === "privacy" ? "Privacy policy" : "Terms of use";
    const url = `${SITE}/legal/${params.doc}`;
    return {
      meta: [
        { title: `${title} — ZEDventures` },
        { name: "description", content: `${title} for zedventures.com.` },
        ...(isDocDraft(params.doc) ? [{ name: "robots", content: "noindex, nofollow" }] : []),
        { property: "og:title", content: `${title} — ZEDventures` },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: LegalPage,
});

function LegalPage() {
  const { doc } = Route.useLoaderData();
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        {isDocDraft(doc) && (
          <DraftBanner note="The warranty, liability and governing-law sections below are notes to counsel rather than clauses. This page is noindex until they are written." />
        )}
        <LegalBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function LegalBody() {
  const { doc } = Route.useLoaderData();
  const { t } = useLanguage();
  const L = t.legalPages;
  const d = doc === "privacy" ? L.privacy : L.terms;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page section-y">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            ZEDventures
          </Link>
          <p className="eyebrow mt-8 text-accent">{d.eyebrow}</p>
          <h1 className="font-display mt-3 max-w-[20ch] text-[2.5rem] leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {d.heading}
          </h1>
          <p className="mt-6 max-w-[44rem] text-[1.0625rem] leading-[1.6] text-muted-foreground sm:text-[1.125rem]">
            {d.sub}
          </p>
          <p className="mt-6 text-[0.8125rem] text-subtle-foreground">
            {L.lastUpdatedLabel}: {L.lastUpdated}
          </p>
        </div>
      </section>

      {/* Single measured column — legal text is read, not scanned, so it gets a
          reading measure rather than the site's wider editorial grid. */}
      <section className="border-b border-border">
        <div className="container-page section-y">
          <div className="max-w-[42rem]">
            {d.sections.map((s, i) => (
              <section key={s.heading} className={i === 0 ? "" : "mt-10"}>
                <h2 className="font-display text-[1.375rem] leading-[1.2] tracking-[-0.02em] sm:text-2xl">
                  {s.heading}
                </h2>
                <p className="mt-3 text-[1.0625rem] leading-[1.7] text-muted-foreground">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
