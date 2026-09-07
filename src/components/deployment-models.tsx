import { Building2, Globe, Network, User, Users } from "lucide-react";
import type { DeploymentModels as DeploymentModelsData } from "@/lib/service-pages";

/**
 * Deployment models — how a team is shaped, and where the people sit.
 *
 * Rebuilt from a supplied slide rather than placed as the image. The image was
 * 2000px of typeset text: at 390px those labels fall below 5px, the French page
 * would have shown English, screen readers would have got the alt text and
 * nothing else, and the logo in it carries a tagline the site no longer uses.
 * Everything here is real text in the site's own type and tokens.
 *
 * TWO THINGS ARE DELIBERATELY NOT CARRIED OVER FROM THE SLIDE.
 *
 * The cost rows — "lowest cost option", "higher cost per hour", "best value
 * and lower cost per hour" — and the risk ranking that sat beside them. Spec
 * §17 is explicit that cost is a supporting benefit and not the website
 * proposition, and a page whose Why ZED section argues accountability cannot
 * also open a price comparison three sections earlier. In their place each
 * model carries a fit statement: the kind of work it suits. That is the
 * question a buyer is actually asking of this block.
 *
 * Self-ranking the risk of your own offshore model on your own site is the
 * other reason. "Highest risk for deployment" is an argument against a service
 * ZED sells, made by ZED, on the page selling it.
 *
 * This sits inside the engagement-options section but under its own heading,
 * because it answers a DIFFERENT question. Engagement options are about how
 * much ownership ZED takes; deployment models are about where the people sit.
 * Three cards above and three columns below, unlabelled, would read as one
 * taxonomy and invite the reader to line "Hybrid" up against "Dedicated team",
 * which does not correspond to anything.
 */

const MODEL_ICONS = {
  offshore: Globe,
  hybrid: Network,
  onsite: Building2,
} as const;

export function DeploymentModels({ data }: { data: DeploymentModelsData }) {
  return (
    <div className="mt-14 border-t border-border pt-10">
      <p className="eyebrow text-subtle-foreground">{data.eyebrow}</p>
      <h3 className="font-display mt-3 max-w-[26ch] text-[1.5rem] leading-[1.15] tracking-[-0.025em] sm:text-[1.75rem]">
        {data.heading}
      </h3>
      <p className="mt-3 max-w-[46rem] text-[0.9375rem] leading-[1.6] text-muted-foreground">
        {data.sub}
      </p>

      {/* Subgrid, so the four bands line up across all three cards: header,
          diagram, the space that absorbs the difference, and the footer.
          Without it the cards only agreed at top and bottom — the hybrid's
          two-line subtitle pushed its diagram down, and the rule above SUITS
          sat at three different heights because the fit lines run to two or
          three lines. */}
      <ul className="mt-8 grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr_auto]">
        {data.models.map((m) => {
          const Icon = MODEL_ICONS[m.key];
          return (
            <li
              key={m.key}
              className={`flex flex-col rounded-2xl border border-border bg-background p-6 sm:p-7 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0 ${
                m.emphasis ? "border-t-2 border-t-primary" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-accent"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <h4 className="font-display text-[1.0625rem] leading-[1.2] tracking-[-0.015em] sm:text-[1.125rem]">
                    {m.title}
                  </h4>
                  <p className="mt-1 text-[0.8125rem] leading-[1.3] text-subtle-foreground">
                    {m.sub}
                  </p>
                </div>
              </div>

              <Diagram clientLabel={m.clientLabel} tiers={m.tiers} />

              {/* The flexible band. Empty on purpose — it is row 3 of the
                  subgrid and exists so the footers align. */}
              <div aria-hidden="true" />

              <div className="mt-auto pt-6 lg:mt-0">
                <div className="border-t border-border pt-4">
                  <p className="text-[0.625rem] font-bold uppercase leading-none tracking-[0.1em] text-subtle-foreground">
                    {data.fitLabel}
                  </p>
                  <p className="mt-2 text-[0.875rem] leading-[1.5] text-muted-foreground">
                    {m.fit}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * The little org tree: one client node, a bus, three branches, and for the
 * hybrid model a second row hanging off each branch.
 *
 * Drawn in CSS rather than SVG so the labels are ordinary text — they wrap,
 * they translate, they scale with the user's font size, and they are read in
 * order by a screen reader. An SVG would have needed hand-positioned tspans
 * per locale, and French is longer than English in every one of these labels.
 *
 * The diagram is aria-hidden and the same structure is stated in the fit line
 * and the model title, so nothing here is the only place a fact appears.
 */
function Diagram({ clientLabel, tiers }: { clientLabel: string; tiers: string[] }) {
  const branches = [0, 1, 2];
  const [first, second] = tiers;

  return (
    <div className="mt-6" aria-hidden="true">
      <div className="flex justify-center">
        <Node label={clientLabel} icon="user" />
      </div>

      {/* stem down from the client node */}
      <div className="mx-auto h-4 w-px bg-border-strong" />

      {/* the bus: three equal cells, each split in half so the rule stops at
          the outer branches instead of running past them */}
      <div className="flex">
        {branches.map((i) => (
          <div key={i} className="flex flex-1">
            <div className={`h-px flex-1 ${i > 0 ? "bg-border-strong" : ""}`} />
            <div className={`h-px flex-1 ${i < branches.length - 1 ? "bg-border-strong" : ""}`} />
          </div>
        ))}
      </div>

      {/* stubs down to each branch */}
      <div className="flex">
        {branches.map((i) => (
          <div key={i} className="flex flex-1 justify-center">
            <div className="h-3 w-px bg-border-strong" />
          </div>
        ))}
      </div>

      <div className="flex gap-1.5">
        {branches.map((i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col items-center">
            <Node label={first ?? ""} icon={second ? "user" : "team"} />
            {second && (
              <>
                <div className="h-3 w-px bg-border-strong" />
                <Node label={second} icon="team" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Node({ label, icon }: { label: string; icon: "user" | "team" }) {
  const Glyph = icon === "user" ? User : Users;
  return (
    /* min-w-0 on the flex child and overflow-wrap on the label are both
       load-bearing. Without them the branch columns refuse to shrink below
       their longest word and the whole page overflowed by 61px at 320. */
    <div className="flex w-full min-w-0 max-w-[9.5rem] items-center justify-center gap-1.5 rounded-lg border border-border bg-surface px-1.5 py-2 text-center">
      <Glyph className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.75} />
      <span className="min-w-0 text-[0.6875rem] font-semibold leading-[1.25] text-foreground [overflow-wrap:anywhere]">
        {label}
      </span>
    </div>
  );
}
