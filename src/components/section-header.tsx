export function SectionHeader({
  eyebrow,
  heading,
  sub,
  align = "center",
  headingId,
}: {
  eyebrow: string;
  heading?: string;
  sub?: string;
  align?: "center" | "left";
  /** Lets a section point aria-labelledby at this visible heading instead of
   *  duplicating it in a screen-reader-only copy. */
  headingId?: string;
}) {
  const alignCls =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignCls}`}>
      <p className="eyebrow text-accent">{eyebrow}</p>
      {heading && (
        <h2
          id={headingId}
          className="font-display text-[2rem] leading-[1.08] tracking-[-0.02em] sm:text-[2.375rem] lg:text-[3.125rem] lg:leading-[1.05]"
        >
          {heading}
        </h2>
      )}
      {sub && <p className="text-[1.0625rem] leading-[1.6] text-muted-foreground">{sub}</p>}
    </div>
  );
}
