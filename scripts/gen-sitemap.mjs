/**
 * Generates public/sitemap.xml.
 *
 * Runs from `npm run build` (see package.json "prebuild"), so the sitemap is
 * regenerated on every build rather than maintained by hand. A hand-written
 * sitemap is wrong the first time somebody adds a page and forgets, and the
 * failure is silent — Google simply never sees the new page.
 *
 * The lists below are read out of the source files rather than duplicated, so
 * a service or an article added to the data appears here automatically.
 *
 * DELIBERATELY EXCLUDED, because each is noindex or 404s:
 *   /services/product-engineering   hidden (HIDDEN_SERVICES)
 *   /careers and /careers/*         hidden and draft
 *   /legal/terms                    still a note to counsel
 */
import { readFileSync, writeFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const SITE = read("src/lib/site-url.ts").match(/SITE_URL = "([^"]+)"/)[1];

const slugBlock = read("src/lib/service-pages.ts");
const allServices = [...slugBlock.matchAll(/^\s{2}"([a-z-]+)",$/gm)].map((m) => m[1]);
const hidden = (slugBlock.match(/HIDDEN_SERVICES[^=]*=\s*\[([^\]]*)\]/s)?.[1] ?? "")
  .match(/"([a-z-]+)"/g)
  ?.map((s) => s.replaceAll('"', "")) ?? [];
const services = [...new Set(allServices)].filter((s) => !hidden.includes(s));

const articles = [...read("src/lib/insights.ts").matchAll(/^\s{4}slug: "([a-z0-9-]+)",$/gm)].map(
  (m) => m[1],
);

const paths = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s}`),
  "/insights",
  ...articles.map((a) => `/insights/${a}`),
  "/about",
  "/case-studies",
  "/contact",
  "/legal/privacy",
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => `  <url>\n    <loc>${SITE}${p === "/" ? "/" : p}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap: ${paths.length} urls -> ${SITE}`);
