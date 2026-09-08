import type { LocationPair } from "@/lib/service-pages";

/**
 * North America ●————————● India.
 *
 * Two labels with the connector spanning the gap between them, rather than a
 * connector parked beside one of them. The line IS the claim — two places, one
 * company — so it has to reach across.
 *
 * Lifted out of about-body.tsx when the Guidewire page needed the same thing.
 * One component, so the two pages cannot drift into two slightly different
 * versions of the same statement.
 *
 * No map, no flags, no globe. Canada is inside "North America" and is never
 * named: the site's position is that North America is the client market, and
 * calling Canada out here would turn a delivery statement into an expansion
 * announcement.
 *
 * Stacks below 640px, where a rule that long has nothing to span.
 */
export function LocationLine({ places, note }: LocationPair) {
  const [left, right] = places;
  if (!left || !right) return null;

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-6">
        <Place {...left} />
        <span aria-hidden="true" className="relative hidden h-px flex-1 bg-border-strong sm:block">
          <span className="absolute left-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-primary" />
          <span className="absolute right-0 top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-primary" />
        </span>
        <Place {...right} align="right" />
      </div>
      <p className="mt-6 text-center text-[0.8125rem] font-semibold leading-[1.4] text-subtle-foreground">
        {note}
      </p>
    </div>
  );
}

function Place({
  place,
  role,
  align = "left",
}: {
  place: string;
  role: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "sm:text-right" : ""}>
      <p className="text-[0.6875rem] font-bold uppercase leading-none tracking-[0.08em] text-foreground">
        {place}
      </p>
      <p className="mt-1.5 text-[0.875rem] leading-[1.4] text-muted-foreground">{role}</p>
    </div>
  );
}
