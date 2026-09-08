import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DraftBanner } from "@/components/draft-banner";
import { AboutBody } from "@/components/about-body";

const SITE = "https://screen-snap-magic-729.lovable.app";

/**
 * The copy on this page is now Mayur's own, supplied in the About page spec,
 * so the [CONFIRM] positioning line this flag originally guarded is gone.
 *
 * What is left is the hero photograph: three to five people talking over real
 * work, candid, nobody looking at the camera. It does not exist yet, and while
 * this flag is true the hero slot shows that brief instead. Setting it to false
 * removes the banner, the noindex AND the placeholder in one move — the hero
 * falls back to the single-column text layout, which reads correctly without a
 * photograph, so nothing breaks and no grey box can reach production.
 *
 * The other outstanding item is not a code gate: the team photograph in Our
 * Team shows identifiable employees and needs their agreement.
 */
export const DRAFT_ABOUT = true;

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
          <DraftBanner note="The copy here is yours. What is missing is the hero photograph — the brief is in the empty slot at the top right. Add the image, then set DRAFT_ABOUT to false." />
        )}
        <AboutBody showHeroPlaceholder={DRAFT_ABOUT} />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
