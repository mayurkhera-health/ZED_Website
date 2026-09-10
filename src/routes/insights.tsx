import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageMasthead } from "@/components/page-masthead";
import { InsightCard } from "@/components/insight-card";
import { ConversationCta } from "@/components/conversation-cta";
import {
  ARTICLES,
  activeCapabilities,
  capabilityLabel,
  featuredArticle,
  layoutForCount,
  restOfArticles,
} from "@/lib/insights";
import { isServiceSlug, type ServiceSlug } from "@/lib/service-pages";

const SITE = "https://screen-snap-magic-729.lovable.app";
const TITLE = "Insights | ZEDventures";
const DESC =
  "Notes on delivery, data and enterprise systems from the people doing the work at ZEDventures.";

type Search = { topic?: ServiceSlug };

export const Route = createFileRoute("/insights")({
  /**
   * The selected topic lives in the URL, not in component state, so a
   * filtered view can be bookmarked, shared and reached with the back button.
   * An unknown or absent value falls through to "everything" rather than
   * erroring — a hand-typed ?topic=nonsense should show the page, not break.
   */
  validateSearch: (search: Record<string, unknown>): Search => {
    const t = search["topic"];
    return typeof t === "string" && isServiceSlug(t) ? { topic: t } : {};
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/insights` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/insights` }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        <InsightsBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

/**
 * The Insights index.
 *
 * ---------------------------------------------------------------------------
 * THE PAGE GROWS ITSELF
 *
 * What is on this page is a function of how much has been published, not a
 * layout somebody maintains:
 *
 *   1 article    hero, featured card, CTA. No grid, no filters, no headings
 *                over empty space.
 *   2-3          a two-column "More insights" row appears.
 *   4-6          it becomes three columns and is renamed "Latest insights".
 *   7+           topic filters appear above it.
 *
 * The thresholds live in layoutForCount() in lib/insights.ts, so this file
 * asks a question rather than counting things itself.
 *
 * ---------------------------------------------------------------------------
 * CONTAINER
 *
 * px-5/sm:px-8 with an inner max-w-6xl, matching PageMasthead exactly. The
 * card grid used to sit in container-page, which is 84rem with different
 * padding — the cards started 32px left of the hero above them. Every band on
 * this page now shares one left edge with Services and Case Studies.
 */
function InsightsBody() {
  const { t } = useLanguage();
  const navigate = useNavigate({ from: "/insights" });
  const { topic } = Route.useSearch();

  const featured = featuredArticle();
  const layout = layoutForCount(ARTICLES.length);
  const rest = restOfArticles();
  const shown = topic ? rest.filter((a) => a.capability === topic) : rest;

  const setTopic = (next: ServiceSlug | undefined) =>
    navigate({ search: next ? { topic: next } : {}, replace: true });

  return (
    <>
      <PageMasthead
        eyebrow={t.insights.eyebrow}
        heading={t.insights.heading}
        sub={t.insights.sub}
      />

      {/* No articles is a real state, not an impossible one. Better a plain
          sentence than a hero followed by nothing. */}
      {!featured && (
        <Band>
          <p className="text-[1.0625rem] text-muted-foreground">{t.insights.empty}</p>
        </Band>
      )}

      {featured && (
        <Band>
          <SectionEyebrow>{t.insights.latestLabel}</SectionEyebrow>
          <div className="mt-4">
            <InsightCard article={featured} featured />
          </div>
        </Band>
      )}

      {layout.showGrid && (
        <Band>
          {layout.showFilters && (
            <div className="mb-8">
              <SectionEyebrow>{t.insights.exploreLabel}</SectionEyebrow>
              {/* Scrolls sideways on a phone rather than wrapping into four
                  ragged rows. The scrollbar is hidden, the scrolling is not. */}
              <div
                role="group"
                aria-label={t.insights.filterLabel}
                className="-mx-5 mt-4 flex gap-2.5 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:flex-wrap lg:overflow-visible [&::-webkit-scrollbar]:hidden"
              >
                <Pill active={!topic} onClick={() => setTopic(undefined)}>
                  {t.insights.allLabel}
                </Pill>
                {activeCapabilities().map((c) => (
                  <Pill key={c} active={topic === c} onClick={() => setTopic(c)}>
                    {capabilityLabel(c)}
                  </Pill>
                ))}
              </div>
            </div>
          )}

          <SectionEyebrow>
            {layout.gridHeadingKey === "latest" ? t.insights.latestGrid : t.insights.moreGrid}
          </SectionEyebrow>

          <ul
            className={`mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7 ${
              layout.gridColumns === 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {shown.map((a) => (
              <li key={a.slug} className="flex">
                <InsightCard article={a} />
              </li>
            ))}
          </ul>

          {shown.length === 0 && (
            <p className="mt-6 text-[0.9375rem] text-muted-foreground">{t.insights.noneInTopic}</p>
          )}
        </Band>
      )}

      <ConversationCta />
    </>
  );
}

/** One horizontal band, on the same grid as PageMasthead. */
function Band({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-border bg-background">
      <div className="px-5 py-9 sm:px-8 sm:py-11">
        <div className="mx-auto max-w-6xl">{children}</div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow text-subtle-foreground">{children}</p>;
}

/**
 * A topic pill. Only ever rendered at seven or more articles.
 *
 * A real button with aria-pressed, and a visible focus ring — these change
 * what the page shows, so they must be reachable and announce their state.
 */
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 rounded-full px-[18px] py-[9px] text-[0.8125rem] font-bold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
        active
          ? "border border-primary bg-primary text-primary-foreground"
          : "border border-border-strong bg-background text-muted-foreground hover:border-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
