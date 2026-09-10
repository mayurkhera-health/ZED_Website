import { createFileRoute, notFound } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleTemplate } from "@/components/article-template";
import { getArticle } from "@/lib/insights";

const SITE = "https://screen-snap-magic-729.lovable.app";

/**
 * One article.
 *
 * This file is routing and metadata only. Everything visible lives in
 * components/article-template.tsx, so the layout is defined once for every
 * post rather than copied per post.
 */
export const Route = createFileRoute("/insights_/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) return {};
    const url = `${SITE}/insights/${a.slug}`;
    return {
      meta: [
        { title: a.seoTitle },
        { name: "description", content: a.seoDescription },
        { property: "og:title", content: a.seoTitle },
        { property: "og:description", content: a.seoDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        // Still a raster 1200x630, because a social scraper cannot render the
        // page's timeline. This is now the only place the image is used.
        { property: "og:image", content: `${SITE}${a.image.ogSrc}` },
        { property: "og:image:alt", content: a.image.alt },
        { property: "article:published_time", content: a.published },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: `${SITE}${a.image.ogSrc}` },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const article = getArticle(slug);
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">{article && <ArticleTemplate article={article} />}</main>
      <Footer />
    </LanguageProvider>
  );
}
