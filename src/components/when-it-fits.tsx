import type { WhenItFits as WhenItFitsData } from "@/lib/service-pages";

/**
 * When distributed delivery makes sense — an explanatory interlude.
 *
 * It answers a question the rest of the page assumes: why would anyone
 * consider this at all? Everything around it describes what ZED sells; this
 * describes the reader's situation, which is why it is deliberately lighter
 * than the sections either side of it.
 *
 * Editorial columns, not cards. Four boxed cards here would compete with the
 * six capability cards immediately above and read as a second product grid —
 * which is the one thing the spec for this section said not to do.
 *
 * No numerals, though the spec drew them as "01 02 03 04". Numbers came off
 * the site, and the same spec asks for a treatment "similar to the existing
 * Why ZED columns", which use a short red rule. The rule does the same job:
 * it marks the start of an entry without implying a sequence, and these four
 * are not steps.
 */
export function WhenItFits({ data }: { data: WhenItFitsData }) {
  return (
    <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {data.items.map((item, i) => (
        <li
          key={item.title}
          /* Dividers between columns, not around them: a left border from the
             second item on, suppressed at the start of each wrapped row so no
             rule ever hangs at the left edge of the grid. */
          className={
            i > 0
              ? "sm:border-l sm:border-border sm:pl-10 sm:odd:border-l-0 sm:odd:pl-0 lg:border-l lg:pl-10 lg:odd:border-l lg:odd:pl-10 lg:first:border-l-0 lg:first:pl-0"
              : ""
          }
        >
          <span className="block h-px w-7 bg-primary" aria-hidden="true" />
          <h3 className="mt-4 max-w-[16ch] text-[1.0625rem] font-bold leading-[1.25] sm:text-[1.125rem]">
            {item.title}
          </h3>
          <p className="mt-2 max-w-[24rem] text-[0.875rem] leading-[1.55] text-muted-foreground">
            {item.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
