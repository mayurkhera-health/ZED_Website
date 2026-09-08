import { useLanguage } from "@/lib/i18n";

/**
 * "How hiring works" — the four steps between sending a resume and an offer.
 *
 * This section exists because it is the one thing candidates want from a
 * careers page that almost no consultancy actually provides. Several promise
 * "guidance on our interview process" in their opening paragraph and then
 * never say what the process is.
 *
 * [CONFIRM] Every step is a promise a candidate will hold us to, including the
 * closing line about telling people where they stand. Check the sequence
 * against how hiring is actually run before DRAFT_CAREERS comes off.
 *
 * Numerals rather than icons: the steps are ordered and the order is the
 * information, which a row of line icons would throw away. The number is set
 * in the display face at the same weight as a section heading so it reads as
 * structure rather than decoration.
 */
export function CareersProcess() {
  const { t } = useLanguage();
  const c = t.careersPage;

  return (
    <section className="border-b border-border bg-secondary" aria-labelledby="careers-process">
      <div className="container-page section-y section-y-card">
        <p className="eyebrow text-subtle-foreground">{c.processEyebrow}</p>
        <h2
          id="careers-process"
          className="font-display mt-3 max-w-[24ch] text-[1.75rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.125rem]"
        >
          {c.processHeading}
        </h2>
        <p className="mt-4 max-w-[46rem] text-[1.0625rem] leading-[1.6] text-muted-foreground">
          {c.processSub}
        </p>

        {/* An ordered list, because it is one. Steps stack on phones and run
            as four columns from 768px.

            No numerals. This one genuinely IS a sequence, so the count carried
            meaning here — but numbers came off site-wide, and a single
            numbered list left standing would read as an oversight rather than
            as a distinction. Order still comes from the ol element and from
            reading order; a short red rule marks each step. */}
        <ol className="mt-8 grid gap-px overflow-hidden bg-border md:grid-cols-4">
          {c.process.map((step) => (
            <li key={step.title} className="bg-secondary py-6 md:px-6 md:first:pl-0">
              <span className="block h-px w-7 bg-accent" aria-hidden="true" />
              <h3 className="mt-4 text-[0.9375rem] font-bold leading-[1.35]">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-[1.55] text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
