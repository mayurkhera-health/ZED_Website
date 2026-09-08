import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DraftBanner } from "@/components/draft-banner";
import { AboutBody } from "@/components/about-body";

const SITE = "https://screen-snap-magic-729.lovable.app";

/**
 * The copy here is Mayur's own, from the About page spec, and the hero image is
 * in place, so the [CONFIRM] positioning line this flag originally guarded is
 * gone and so is the placeholder.
 *
 * The banner and the page-level noindex are off at Mayur's direction.
 *
 * [CONFIRM] The photograph in Our Team shows eleven identifiable employees and
 * their agreement is still outstanding. Nothing here enforces it. The site-wide
 * noindex in __root.tsx still covers every non-production environment, so the
 * page is not crawlable until the production domain exists — clear consent
 * before then.
 */
export const DRAFT_ABOUT = false;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ZEDventures | Enterprise technology services" },
      {
        name: "description",
        content:
          "ZEDventures is an enterprise technology services company working across SAP, Analytics & AI, GIS & Geospatial, Digital Engineering and global delivery.",
      },
      // Not indexed while the hero photograph is still a brief.
      ...(DRAFT_ABOUT ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:title", content: "About ZEDventures" },
      {
        property: "og:description",
        content: "Technology is what we do. How we work matters just as much.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/about` },
      { name: "twitter:card", content: "summary_large_image" },
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
          <DraftBanner note="Copy and images are in place. The one thing outstanding is consent from the eleven people in the team photograph further down this page — nothing in the code enforces it. Clear that, then set DRAFT_ABOUT to false." />
        )}
        <AboutBody showHeroPlaceholder={DRAFT_ABOUT} />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
