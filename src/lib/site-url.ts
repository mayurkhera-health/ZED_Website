/**
 * The site's canonical origin.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS A CONSTANT AND NOT TWELVE STRING LITERALS
 *
 * This URL was hard-coded in nine route files, twelve times over, still
 * pointing at the Lovable preview the site was first built on. Every page told
 * search engines that the real version of itself lived on a domain ZEDventures
 * does not control. Changing the domain meant finding all twelve and getting
 * every one right.
 *
 * ---------------------------------------------------------------------------
 * WHY THE APEX AND NOT www
 *
 * Measured, not assumed. The live WordPress site declares
 * `rel="canonical" href="https://zedventures.com/"` on its homepage, and every
 * URL in its sitemap is on the apex. So the apex is what Google has indexed
 * and what inbound links point at; staying on it means the cutover is
 * invisible to search rather than a site-wide redirect.
 *
 * To move to www later, change this one line and add a redirect from the apex.
 * Nothing else in the codebase knows the difference.
 */
export const SITE_URL = "https://zedventures.com";

/** Absolute URL for a path. Pass a leading slash; "/" gives the origin. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}
