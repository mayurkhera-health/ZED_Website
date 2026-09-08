import type { SystemMap as SystemMapData } from "@/lib/service-pages";

/**
 * One platform at the centre, four systems around it.
 *
 * The argument this picture makes is the page's centrepiece: the platform is
 * one part of an environment, and most of the difficulty in a programme lives
 * at the edges rather than in the core. So the centre node is emphasised but
 * NOT oversized — making it dominate would say the opposite of the sentence
 * above it.
 *
 * Drawn in CSS rather than SVG so the labels are ordinary text: they wrap,
 * they translate, they scale with the reader's font size, and a screen reader
 * gets them in order. An SVG would have needed hand-positioned tspans per
 * locale, and French is longer than English in every one of these labels.
 *
 * Desktop is a three-column row — two satellites, the centre, two satellites —
 * with the connectors as plain hairlines. Below 1024px it becomes a single
 * column with the centre first, because a four-way diagram shrunk to phone
 * width is unreadable at any size that still fits. The spec asks for exactly
 * that: simplify rather than shrink.
 *
 * The whole figure is aria-hidden. Every relationship it draws is stated in
 * the paragraph beside it, so nothing here is the only place a fact appears.
 */
export function SystemMap({ centre, satellites }: SystemMapData) {
  const left = satellites.slice(0, 2);
  const right = satellites.slice(2, 4);

  return (
    <figure className="mt-9" aria-hidden="true">
      {/* Phones: the centre, then everything it connects to, as a list. */}
      <div className="lg:hidden">
        <Node label={centre} centre />
        <div className="mt-4 grid grid-cols-2 gap-3">
          {satellites.map((s) => (
            <Node key={s} label={s} />
          ))}
        </div>
      </div>

      <div className="hidden items-center gap-0 lg:flex">
        {/* items-end / items-start, and nodes sized to their label. Stretched
            to the column width the boxes ran 450px with the text at one end,
            which read as four empty rectangles rather than four systems. */}
        <div className="flex flex-1 flex-col items-end gap-5">
          {left.map((s) => (
            <Node key={s} label={s} />
          ))}
        </div>
        <Connector />
        <div className="shrink-0">
          <Node label={centre} centre />
        </div>
        <Connector />
        <div className="flex flex-1 flex-col items-start gap-5">
          {right.map((s) => (
            <Node key={s} label={s} />
          ))}
        </div>
      </div>
    </figure>
  );
}

function Connector() {
  return (
    <span className="relative mx-3 hidden h-px w-14 shrink-0 bg-border-strong lg:block">
      <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
    </span>
  );
}

function Node({ label, centre = false }: { label: string; centre?: boolean }) {
  if (centre) {
    return (
      <div className="rounded-xl border border-border-strong bg-background px-6 py-4 text-center">
        <span className="text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-foreground">
          {label}
        </span>
      </div>
    );
  }
  return (
    <div className="w-fit rounded-lg border border-border bg-background px-4 py-2.5">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
