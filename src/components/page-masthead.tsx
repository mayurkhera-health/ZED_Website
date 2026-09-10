/**
 * The masthead on a section index — Services, Case Studies, Insights.
 *
 * ---------------------------------------------------------------------------
 * WHY IT IS A COMPONENT
 *
 * The same block was pasted into three routes. When Mayur asked for the
 * heading to come down "on this page and all other pages", that was three
 * edits that had to agree, and the next change would have been three more.
 * One component, so they cannot drift apart again.
 *
 * ---------------------------------------------------------------------------
 * THE SIZE
 *
 * It was 36 / 72 / 96 / 128px across the breakpoints. 128px is more than twice
 * the largest heading anywhere else on the site — SectionHeader tops out at
 * 50px, and a service page's own H1 uses that. A section index shouting two
 * and a half times louder than the page it leads to is what read as odd.
 *
 * Now 40 / 52 / 64px. Still clearly a masthead, still a step above
 * SectionHeader, but inside the same type system rather than beside it.
 *
 * Leading came up with it. 0.9 is a display setting: at 128px the gap between
 * two lines still looks generous, at 64px the same ratio jams the descenders
 * of one line into the caps of the next. 1.02 at the top end, a little looser
 * below, where headings wrap more often.
 */
export function PageMasthead({
  eyebrow,
  heading,
  sub,
}: {
  eyebrow: string;
  heading: string;
  sub?: string | undefined;
}) {
  return (
    <section className="border-b border-border bg-background px-5 py-7 sm:px-8 sm:py-8 xl:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="border-l-4 border-primary pl-5 sm:pl-8 md:pl-12">
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h1 className="font-display mt-[1.25rem] max-w-[20ch] text-[2.5rem] leading-[1.05] tracking-[-0.02em] [overflow-wrap:anywhere] sm:text-[3.25rem] sm:leading-[1.03] lg:text-[4rem] lg:leading-[1.02]">
            {heading}
          </h1>
          {sub && (
            <p className="mt-5 max-w-[52rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {sub}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
