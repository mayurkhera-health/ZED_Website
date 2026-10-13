import pathlib, sys

CSS_ANCHOR = """  .eyebrow {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }"""

CSS_NEW = """  /* Heading ramp, desktop: 44 / 32 / 21 / 15. Before this existed there were
     2 H1 sizes, 6 H2 sizes and 8 H3 sizes, with H2 (50px) beating H1 (44px)
     on six pages. See DESIGN_SYSTEM.md. */

  .h2-section {
    font-size: 1.625rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  @media (min-width: 640px)  { .h2-section { font-size: 1.8125rem; line-height: 1.12; } }
  @media (min-width: 1024px) { .h2-section { font-size: 2rem;      line-height: 1.1;  } }

  .h2-card {
    font-size: 1.3125rem;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  @media (min-width: 640px) { .h2-card { font-size: 1.4375rem; line-height: 1.18; } }

  .h3-sub {
    font-size: 1.125rem;
    line-height: 1.3;
    letter-spacing: -0.015em;
  }
  @media (min-width: 640px)  { .h3-sub { font-size: 1.1875rem; } }
  @media (min-width: 1024px) { .h3-sub { font-size: 1.3125rem; line-height: 1.25; } }

  /* Deliberately NOT the display face: at 15px its tracking hurts legibility. */
  .h-label {
    font-family: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1.35;
    letter-spacing: normal;
  }

""" + CSS_ANCHOR

LEGAL_FLAGS = '''/**
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
'''

EDITS = [
 ("src/styles.css", CSS_ANCHOR, CSS_NEW, 1),

 ("src/components/section-header.tsx",
  ': "text-[2rem] leading-[1.08] tracking-[-0.02em] sm:text-[2.375rem] lg:text-[3.125rem] lg:leading-[1.05]"',
  ': "h2-section"', 1),
 ("src/components/careers-why.tsx",
  'className="font-display mt-3 max-w-[40rem] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]"',
  'className="font-display h2-section mt-3 max-w-[40rem]"', 1),
 ("src/components/careers-process.tsx",
  'className="font-display mt-3 max-w-[40rem] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]"',
  'className="font-display h2-section mt-3 max-w-[40rem]"', 1),
 ("src/components/global-delivery.tsx",
  'className="font-display mt-3 max-w-[40rem] text-[1.75rem] leading-[1.1] tracking-[-0.025em] sm:text-[2.125rem]"',
  'className="font-display h2-section mt-3 max-w-[40rem]"', 1),
 ("src/components/about-body.tsx",
  'className="font-display max-w-[40rem] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]"',
  'className="font-display h2-section max-w-[40rem]"', 1),
 ("src/components/service-page.tsx",
  '<h2 className="font-display mt-3 max-w-[46rem] text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-[2.75rem]">',
  '<h2 className="font-display h2-section mt-3 max-w-[46rem]">', 1),
 ("src/routes/services.tsx",
  'className="font-display text-2xl tracking-tight transition-transform group-hover:translate-x-1 sm:text-3xl"',
  'className="font-display h2-section transition-transform group-hover:translate-x-1"', 1),
 ("src/routes/case-studies.tsx",
  '<h2 className="font-display mt-1 text-2xl tracking-tight sm:text-3xl">',
  '<h2 className="font-display h2-section mt-1">', 1),
 ("src/routes/careers_.$slug.tsx",
  '<h2 className="font-display text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]">',
  '<h2 className="font-display h2-section">', 1),

 ("src/components/conversation-cta.tsx",
  '<h2 className="font-display text-[1.5rem] leading-[1.2] tracking-[-0.02em] sm:text-[1.75rem]">',
  '<h2 className="font-display h2-card">', 1),
 ("src/components/article-template.tsx",
  '<h2 className="font-display mt-8 border-t border-border pt-4 text-[1.3125rem] leading-[1.25] tracking-[-0.02em] sm:text-[1.4375rem]">',
  '<h2 className="font-display h2-card mt-8 border-t border-border pt-4">', 1),
 ("src/routes/legal.$doc.tsx",
  '<h2 className="font-display text-[1.375rem] leading-[1.2] tracking-[-0.02em] sm:text-2xl">',
  '<h2 className="font-display h2-card">', 1),
 ("src/routes/careers_.$slug.tsx",
  '<h2 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.75rem]">',
  '<h2 className="font-display h2-card">', 2),
 ("src/routes/careers.tsx",
  '<h2 className="text-[1.1875rem] font-bold leading-[1.25] tracking-[-0.019em]">',
  '<h2 className="font-display h2-card">', 1),

 ("src/components/case-studies.tsx",
  'className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tighter transition-all group-hover:italic group-hover:text-accent lg:text-5xl"',
  'className="font-display h3-sub font-extrabold uppercase leading-[1.05] tracking-tighter transition-all group-hover:italic group-hover:text-accent"', 1),
 ("src/components/services.tsx",
  'className="font-display flex items-center gap-2.5 text-[1.625rem] leading-[1.1] tracking-[-0.02em] transition-[color,transform] group-hover:text-accent sm:text-[1.75rem] lg:text-[2rem] motion-safe:group-hover:translate-x-1"',
  'className="font-display h3-sub flex items-center gap-2.5 transition-[color,transform] group-hover:text-accent motion-safe:group-hover:translate-x-1"', 1),
 ("src/components/service-page.tsx",
  '<h3 className="font-display mt-3.5 text-[1.25rem] leading-[1.15] tracking-[-0.02em] sm:text-[1.3125rem]">',
  '<h3 className="font-display h3-sub mt-3.5">', 1),
 ("src/components/service-page.tsx",
  '<h3 className="font-display mt-5 max-w-[18ch] text-[1.375rem] leading-[1.15] tracking-[-0.02em] sm:text-2xl">',
  '<h3 className="font-display h3-sub mt-5 max-w-[18ch]">', 1),
 ("src/components/about-body.tsx",
  '<h3 className="font-display mt-4 max-w-[18ch] text-[1.375rem] leading-[1.15] tracking-[-0.02em]">',
  '<h3 className="font-display h3-sub mt-4 max-w-[18ch]">', 1),
 ("src/components/about-body.tsx",
  '<h3 className="font-display mt-4 max-w-[18ch] text-[1.25rem] leading-[1.2] tracking-[-0.02em] sm:text-[1.375rem]">',
  '<h3 className="font-display h3-sub mt-4 max-w-[18ch]">', 1),
 ("src/routes/services_.$slug.tsx",
  '<h3 className="font-display text-[1.375rem] leading-[1.15] tracking-[-0.02em] sm:text-2xl">',
  '<h3 className="font-display h3-sub">', 2),
 ("src/routes/services_.$slug.tsx",
  '<h3 className="font-display text-xl leading-[1.15] tracking-[-0.02em]">',
  '<h3 className="font-display h3-sub">', 1),
 ("src/components/article-template.tsx",
  '<h3 className="font-display mt-6 text-[1.0625rem] font-bold leading-[1.35] sm:text-[1.125rem]">',
  '<h3 className="font-display h3-sub mt-6">', 1),

 ("src/components/careers-why.tsx",
  '<h3 className="mt-4 text-[0.9375rem] font-bold leading-[1.35]">',
  '<h3 className="h-label mt-4">', 1),
 ("src/components/careers-process.tsx",
  '<h3 className="mt-4 text-[0.9375rem] font-bold leading-[1.35]">',
  '<h3 className="h-label mt-4">', 1),
 ("src/components/about-body.tsx",
  '<h3 className="text-[0.9375rem] font-bold leading-[1.3] md:mt-4">',
  '<h3 className="h-label md:mt-4">', 1),
 ("src/components/editorial-columns.tsx",
  '<h3 className="mt-4 max-w-[18ch] text-[1.0625rem] font-bold leading-[1.25] sm:text-[1.125rem]">',
  '<h3 className="h-label mt-4 max-w-[18ch]">', 1),
 ("src/components/global-delivery.tsx",
  '<h3 className="mt-2 max-w-[22ch] text-[1.0625rem] font-bold leading-[1.25] sm:text-[1.125rem]">',
  '<h3 className="h-label mt-2 max-w-[22ch]">', 1),

 ("src/components/insight-card.tsx",
  '? "max-w-[44ch] text-[1.375rem] leading-[1.2] sm:text-[1.5625rem] lg:text-[1.75rem]"',
  '? "h2-card max-w-[44ch]"', 1),

 ("src/components/hero.tsx",
  'className="ink-type font-display max-w-[13ch] text-[2.625rem] leading-[1.02] tracking-[-0.025em] sm:max-w-[20ch] sm:text-5xl md:text-[3.25rem] lg:max-w-[16ch] lg:text-[3.75rem] lg:leading-[1.0] lg:tracking-[-0.03em]"',
  'className="ink-type font-display h1-page max-w-[13ch] sm:max-w-[20ch] lg:max-w-[16ch]"', 1),

 ("src/routes/legal.$doc.tsx",
  'import { DraftBanner } from "@/components/draft-banner";',
  'import { DraftBanner } from "@/components/draft-banner";\nimport { IS_PRODUCTION } from "@/lib/site-env";\nimport { DRAFT_PRIVACY, DRAFT_TERMS, isLegalDocDraft } from "@/lib/legal-flags";', 1),
 ("src/routes/legal.$doc.tsx",
  '''export const DRAFT_PRIVACY = false;
export const DRAFT_TERMS = true;

function isDocDraft(doc: string): boolean {
  return doc === "terms" ? DRAFT_TERMS : DRAFT_PRIVACY;
}''',
  '''export { DRAFT_PRIVACY, DRAFT_TERMS };

const isDocDraft = isLegalDocDraft;''', 1),
 ("src/routes/legal.$doc.tsx",
  '''  loader: ({ params }) => {
    if (!isDoc(params.doc)) throw notFound();
    return { doc: params.doc as Doc };
  },''',
  '''  loader: ({ params }) => {
    if (!isDoc(params.doc)) throw notFound();
    // Reviewable on staging, gone in production.
    if (IS_PRODUCTION && isLegalDocDraft(params.doc)) throw notFound();
    return { doc: params.doc as Doc };
  },''', 1),
 ("src/components/footer.tsx",
  '''            <li>
              <Link to="/legal/$doc" params={{ doc: "terms" }} className={LINK_CLS}>
                {f.terms}
              </Link>
            </li>''',
  '''            {/* Shown only once Terms is finished. */}
            {!DRAFT_TERMS && (
              <li>
                <Link to="/legal/$doc" params={{ doc: "terms" }} className={LINK_CLS}>
                  {f.terms}
                </Link>
              </li>
            )}''', 1),
 ("src/components/footer.tsx",
  'import { Link } from "@tanstack/react-router";',
  'import { Link } from "@tanstack/react-router";\nimport { DRAFT_TERMS } from "@/lib/legal-flags";', 1),
]

if not pathlib.Path("src/styles.css").exists():
    sys.exit("Run this from the repo root (src/styles.css not found).")

flags = pathlib.Path("src/lib/legal-flags.ts")
if flags.exists():
    print("SKIP  src/lib/legal-flags.ts already exists")
else:
    flags.write_text(LEGAL_FLAGS)
    print("NEW   src/lib/legal-flags.ts")

applied, missed = 0, []
for path, old, new, n in EDITS:
    p = pathlib.Path(path)
    if not p.exists():
        missed.append(path + ": file not found"); continue
    s = p.read_text()
    c = s.count(old)
    if c != n:
        missed.append(path + ": expected " + str(n) + ", found " + str(c) + " :: " + old[:64]); continue
    p.write_text(s.replace(old, new))
    applied += 1

print("\nAPPLIED " + str(applied) + " of " + str(len(EDITS)) + " edits")
if missed:
    print("\nMISSED:")
    for m in missed:
        print("  " + m)
    print("\nNothing was written for the missed edits. Send this list back.")
else:
    print("Clean. Next: npx tsc --noEmit")
