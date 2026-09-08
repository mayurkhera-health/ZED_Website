import type { CSSProperties } from "react";
import type { ColumnSet } from "@/lib/service-pages";

/**
 * Editorial columns — three or four short entries side by side, separated by
 * hairlines rather than boxed as cards.
 *
 * This is the site's treatment for a group of peers that are not products and
 * not steps: the Offshore page's "when it fits", the Guidewire page's three
 * Guidewire products, and its four reasons to work with ZED. Boxing any of
 * them turns a principle into a feature card and puts it in competition with
 * the capability grid above; numbering them implies a sequence none of them
 * has. Each entry takes a short red rule instead, the same mark every other
 * column group on the site uses.
 *
 * The column count comes from the data rather than the caller's classes, so a
 * three-item set and a four-item set share one component instead of drifting
 * into two. Two columns below 1024px, one on phones.
 *
 * It was `WhenItFits`, hard-wired to four columns and named after the one
 * section that used it. Generalised when the Guidewire page needed the same
 * treatment twice at different widths — which is what §21 of that spec asks
 * for: reuse the component, don't clone the CSS.
 */
export function EditorialColumns({ data }: { data: ColumnSet }) {
  const cols = Math.min(Math.max(data.items.length, 2), 4);

  return (
    <ol
      className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
      style={{ "--cols": cols } as CSSProperties}
    >
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
          <h3 className="mt-4 max-w-[18ch] text-[1.0625rem] font-bold leading-[1.25] sm:text-[1.125rem]">
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
