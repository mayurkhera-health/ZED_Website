/**
 * The three belief marks.
 *
 * Drawn here as inline SVG rather than pulled from lucide, because none of the
 * three exists as an icon: they are a line that resolves into a check, two
 * circles that touch, and a line that carries on past a point. Each is a
 * picture of the sentence beside it, which is the only reason a mark earns
 * space in a section whose spec says typography should dominate.
 *
 * 32px, 1.5px strokes, one red accent each, aria-hidden throughout — the
 * heading says the thing, the mark punctuates it.
 */

const S = {
  width: 32,
  height: 32,
  viewBox: "0 0 32 32",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** A line running in and resolving into a check: work committed to, then done. */
export function MarkAccountable() {
  return (
    <svg {...S}>
      <path d="M1 19h9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M11 19l4.5 5L28 8" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

/** Two circles, touching rather than overlapping: two parties, one relationship. */
export function MarkPeople() {
  return (
    <svg {...S}>
      <circle cx="9" cy="16" r="6.5" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M15.5 16h1" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="23" cy="16" r="6.5" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

/** A line that carries on past the marked point: the project is not the end. */
export function MarkBeyond() {
  return (
    <svg {...S}>
      <path d="M1 16h9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="13" cy="16" r="3" fill="var(--accent)" />
      <path d="M17 16h9" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <path d="M23.5 12.5L27 16l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

export const BELIEF_MARKS = [MarkAccountable, MarkPeople, MarkBeyond] as const;
