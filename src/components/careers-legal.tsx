import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";

/**
 * The statements the careers page carries alongside every posting: benefits,
 * equal opportunity, reasonable accommodation, work authorization,
 * pre-employment checks and how an application is handled.
 *
 * Rendered on the careers index and on every posting detail page, so a candidate
 * who arrives on a role link from a recruiter sees them without having to find
 * the index first.
 *
 * ---------------------------------------------------------------------------
 * WHY THE PANELS USE `hidden` RATHER THAN CONDITIONAL RENDERING
 *
 * These are collapsed by default at the client's request. That is a real
 * trade-off: two of them are notices whose purpose is to be seen without being
 * sought — the accommodation notice tells an applicant who cannot use the
 * postal route that another one exists, and the CPRA expects a privacy notice
 * at or before the point an application is collected.
 *
 * So every panel's text is always present in the DOM and merely hidden. It ships
 * in the served HTML, it is found by the browser's in-page search, it prints,
 * and a crawler sees it. Rendering `{open && <p>}` instead would mean the words
 * genuinely are not on the page until someone clicks, which is a materially
 * weaker position to be in.
 *
 * Panels toggle independently — opening one does not close the others.
 *
 * ---------------------------------------------------------------------------
 * Removed at the client's request, not by oversight: recruitment fraud, and
 * unsolicited agency resumes.
 *
 * Placeholders remain in the privacy copy — search for "[" in i18n.tsx.
 */
export function LegalBlocks() {
  const { t } = useLanguage();
  const c = t.careersPage;
  const L = c.legal;

  const blocks = [
    { key: "benefits", heading: L.benefitsHeading, body: L.benefits },
    { key: "eeo", heading: L.eeoHeading, body: L.eeo },
    { key: "accommodation", heading: L.accommodationHeading, body: L.accommodation },
    { key: "auth", heading: L.authHeading, body: L.auth },
    { key: "screening", heading: L.screeningHeading, body: L.screening },
    { key: "privacy", heading: L.privacyHeading, body: L.privacy },
  ];

  return (
    <section className="border-b border-border bg-secondary" aria-labelledby="careers-legal">
      <div className="container-page section-y section-y-card">
        <SectionHeader
          align="left"
          eyebrow={c.eyebrow}
          heading={c.legalHeading}
          sub={c.legalHelper}
          headingId="careers-legal"
        />
        <div className="mt-8 border-t border-border">
          {blocks.map((b) => (
            <Disclosure key={b.key} heading={b.heading} body={b.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Disclosure({ heading, body }: { heading: string; body: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const Icon = open ? Minus : Plus;

  return (
    <div className="border-b border-border">
      {/* Native button so keyboard and screen-reader behaviour comes for free.
          min-h-[3.5rem] keeps the 44px tap target the spec asks for on phones. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full min-h-[3.5rem] items-center justify-between gap-6 py-4 text-left transition-colors hover:text-accent"
        style={{ transitionDuration: "var(--dur)", transitionTimingFunction: "var(--ease)" }}
      >
        <span className="text-base font-bold leading-[1.3]">{heading}</span>
        <Icon
          className="h-4 w-4 shrink-0 text-accent transition-transform motion-reduce:transition-none"
          style={{ transitionDuration: "var(--dur)", transitionTimingFunction: "var(--ease)" }}
          aria-hidden="true"
        />
      </button>
      {/* Always rendered; `hidden` toggles visibility. See the note above. */}
      <div id={panelId} hidden={!open}>
        <p className="max-w-[46rem] pb-6 text-[0.9375rem] leading-[1.65] text-muted-foreground">
          {body}
        </p>
      </div>
    </div>
  );
}
