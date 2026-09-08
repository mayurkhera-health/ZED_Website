import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export type NavGroupItem = { to: string; label: string };

/**
 * A grouped navigation item — one trigger, a small panel of links.
 *
 * Built here rather than on the shipped radix DropdownMenu because that
 * primitive is a MENU: it takes over arrow keys, traps focus, sets
 * role="menu"/"menuitem" on its children and marks the page inert behind it.
 * All of that is right for a list of actions and wrong for two links, which a
 * screen-reader user should be able to reach by tabbing like any other link in
 * the nav. This is a disclosure — a button with aria-expanded, controlling a
 * plain list.
 *
 * Opens three ways, because a nav item that only responds to one input is
 * broken for somebody:
 *   - hover, but only for a real mouse (pointerType === "mouse"), so a tap on
 *     a touch device does not open-and-immediately-close
 *   - click, which toggles
 *   - keyboard focus into the trigger or the panel
 *
 * Closes on Escape, on pointer leave after a short grace period (the gap
 * between trigger and panel is real, and closing instantly makes the panel
 * impossible to reach diagonally), on focus leaving the whole group, and on
 * navigation.
 *
 * The trigger is not a link. "Company" is not a page — there is no /company —
 * and making it look clickable-through would promise one.
 */
export function NavGroup({ label, items }: { label: string; items: NavGroupItem[] }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = items.some((i) => pathname === i.to || pathname.startsWith(`${i.to}/`));

  // Close on navigation. Without this the panel stays open over the new page
  // after a link inside it is followed.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        // Return focus to the trigger, or the user is dropped at the top of
        // the document with no idea where they were.
        wrapRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrapRef}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        scheduleClose();
      }}
      onFocus={cancelClose}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 text-[0.9375rem] transition-colors hover:text-accent ${
          isActive ? "font-semibold text-accent" : "font-medium text-foreground"
        }`}
        style={{ transitionDuration: "var(--dur)", transitionTimingFunction: "var(--ease)" }}
      >
        {label}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transitionDuration: "var(--dur)",
            transitionTimingFunction: "var(--ease)",
          }}
          aria-hidden="true"
        />
      </button>

      {/* pt-3 on the panel wrapper, not margin: it makes the gap between the
          trigger and the panel part of the hover target, so the pointer can
          cross it without the panel closing underneath. */}
      {open && (
        <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
          <ul className="min-w-[11rem] rounded-xl border border-border bg-background p-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)]">
            {items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-secondary hover:text-accent"
                  activeProps={{
                    className:
                      "block rounded-lg px-3 py-2 text-[0.9375rem] font-semibold text-accent",
                  }}
                  style={{
                    transitionDuration: "var(--dur)",
                    transitionTimingFunction: "var(--ease)",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
