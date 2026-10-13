/**
 * Which legal documents are finished. Lives here and not in the route
 * because the footer needs it too, and the route renders <Footer/> - that
 * import would be a cycle.
 *
 * A drafted doc: noindex, a visible banner, no footer link, and a 404 in
 * production. TO PUBLISH TERMS: write the warranty, liability and
 * governing-law sections, then set DRAFT_TERMS to false.
 */

export const DRAFT_PRIVACY = false;
export const DRAFT_TERMS = true;

export function isLegalDocDraft(doc: string): boolean {
  return doc === "terms" ? DRAFT_TERMS : DRAFT_PRIVACY;
}
