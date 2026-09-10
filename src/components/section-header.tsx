export function SectionHeader({
  eyebrow,
  heading,
  sub,
  align = "center",
  as: Tag = "h2",
  headingId,
}: {
  eyebrow: string;
  heading?: string | undefined;
  sub?: string | undefined;
  align?: "center" | "left";
  /** "h1" for the block that is the page's title. Default "h2".
   *  Contact and Careers were rendering their page title as an H2, which left
   *  both pages with no H1 at all. */
  as?: "h1" | "h2";
  /** Lets a section point aria-labelledby at this visible heading instead of
   *  duplicating it in a screen-reader-only copy. */
  headingId?: string;
}) {
  const alignCls =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    /* The cap moved off this wrapper and onto the two children.
       max-w-2xl (672px) was applied to heading and sub together, which is a
       reasonable measure for 17px body copy and far too narrow for a 50px
       display face: it broke "One ZED team, across locations." across two
       lines with 300px of empty column beside it, and did the same to seven
       other headings.

       Headings now run to 74rem. At the 50px display size that is about 41
       characters, which is inside the range a display line stays readable,
       and it is the width at which the seven worst cases resolve to one
       line or to two balanced ones. Body copy stays at 44rem, where 17px
       prose is comfortable — the two want different measures, which is
       exactly what one shared cap could not give them.
       In a narrow column the column still wins — these are maxima. */
    <div className={`flex flex-col ${alignCls}`}>
      <p className="eyebrow text-accent">{eyebrow}</p>
      {heading && (
        <Tag
          id={headingId}
          /* When this renders as the page's H1 it takes the site-wide h1-page
             scale, so /contact and /careers match every other page title
             rather than keeping SectionHeader's own section-heading size. */
          className={`font-display mt-3 max-w-[74rem] ${
            Tag === "h1"
              ? "h1-page"
              : "text-[2rem] leading-[1.08] tracking-[-0.02em] sm:text-[2.375rem] lg:text-[3.125rem] lg:leading-[1.05]"
          }`}
        >
          {heading}
        </Tag>
      )}
      {sub && (
        <p className="mt-4 max-w-[44rem] text-[1.0625rem] leading-[1.6] text-muted-foreground">
          {sub}
        </p>
      )}
    </div>
  );
}
