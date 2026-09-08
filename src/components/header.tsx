import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HeaderRule } from "@/components/header-rule";
import { NavGroup } from "@/components/nav-group";

/**
 * Served straight from public/. The previous source was a Lovable asset-manifest
 * JSON whose url pointed at /__l5e/assets-v1/... — a path that only resolves on
 * the Lovable preview host, so the logo rendered as alt text on every other
 * deploy, in both the header and the footer.
 *
 * The file is 798x208 RGB with no alpha channel, so it carries a white
 * background. That is why the footer keeps it on a white chip rather than
 * placing it directly on the dark ground. Width and height are declared to stop
 * the header reflowing while it loads.
 */
const LOGO_SRC = "/zedventures-logo.png";
const LOGO_W = 798;
const LOGO_H = 208;

/**
 * Navigation, in order.
 *
 * "Company" is a group, not a page — there is no /company route. About and
 * Case Studies moved under it; Leadership joins them when it exists, which is
 * the reason for grouping now rather than when the third item arrives.
 *
 * Careers stays top level deliberately. It is the one destination a visitor
 * arrives looking for, often from outside the site, and burying it one level
 * down to tidy the nav costs more than the tidiness is worth.
 */
const NAV = [
  { kind: "link", to: "/services", key: "services" },
  { kind: "group", key: "company", items: ["/about", "/case-studies"] },
  { kind: "link", to: "/careers", key: "careers" },
] as const;

const GROUP_LABELS: Record<string, "about" | "caseStudies"> = {
  "/about": "about",
  "/case-studies": "caseStudies",
};

export function Header() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // S16: the hairline and blur only appear once the page has moved, so the
  // header sits flush against the hero at rest instead of drawing a line
  // across the top of the design.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-200 ${
        scrolled ? "bg-background/92 backdrop-blur-[16px]" : "bg-background"
      }`}
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="flex shrink-0 items-center">
          <img
            src={LOGO_SRC}
            alt={t.a11y.logoAlt}
            width={LOGO_W}
            height={LOGO_H}
            className={`w-auto transition-[height] duration-200 ${scrolled ? "h-9 sm:h-10" : "h-10 sm:h-12"}`}
            style={{ transitionTimingFunction: "var(--ease)" }}
          />
        </Link>

        {/* Desktop navigation — collapses into the sheet below ~640px, where the
            logo plus links plus toggle no longer fit on one line. */}
        <nav className="hidden items-center gap-7 sm:flex lg:gap-8" aria-label="Main navigation">
          {NAV.map((item) =>
            item.kind === "group" ? (
              <NavGroup
                key={item.key}
                label={t.nav[item.key]}
                items={item.items.map((to) => ({ to, label: t.nav[GROUP_LABELS[to]!] }))}
              />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-[0.9375rem] font-medium text-foreground transition-colors hover:text-accent"
                activeProps={{ className: "text-[0.9375rem] font-semibold text-accent" }}
                style={{
                  transitionDuration: "var(--dur)",
                  transitionTimingFunction: "var(--ease)",
                }}
              >
                {t.nav[item.key]}
              </Link>
            ),
          )}
          <LanguageToggle />
          {/* S15: Contact becomes a modest CTA. Deliberately shorter than the
              48px hero buttons so it reads as navigation, not a hero action. */}
          <Link to="/contact" className="btn btn-primary h-10 px-[18px] text-sm">
            {t.nav.talk}
            <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>

        {/* Mobile: language stays visible (a primary affordance on a bilingual
            site); the links move behind the menu button. */}
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={t.a11y.openMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:text-accent"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background">
              <SheetTitle className="eyebrow text-accent">{t.a11y.menuTitle}</SheetTitle>
              <nav className="mt-8 flex flex-col gap-6" aria-label="Main navigation">
                {/* No disclosure on mobile. The sheet has the room to show all
                    of it at once, and a tap-to-expand here would hide two
                    links behind an interaction for no gain. The group becomes
                    a label with its links beneath it. */}
                {NAV.map((item) =>
                  item.kind === "group" ? (
                    <div key={item.key}>
                      <p className="eyebrow text-subtle-foreground">{t.nav[item.key]}</p>
                      <div className="mt-3 flex flex-col gap-4 border-l border-border pl-4">
                        {item.items.map((to) => (
                          <Link
                            key={to}
                            to={to}
                            onClick={() => setOpen(false)}
                            className="font-display text-2xl text-foreground transition-colors hover:text-accent"
                            activeProps={{ className: "font-display text-2xl text-accent" }}
                          >
                            {t.nav[GROUP_LABELS[to]!]}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl text-foreground transition-colors hover:text-accent"
                      activeProps={{ className: "font-display text-2xl text-accent" }}
                    >
                      {t.nav[item.key]}
                    </Link>
                  ),
                )}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary mt-2 w-full"
                >
                  {t.nav.talk}
                  <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <HeaderRule scrolled={scrolled} />
    </header>
  );
}
