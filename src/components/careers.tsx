import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { ArrowUpRight } from "lucide-react";
import { OPEN_POSTINGS, SHOW_CAREERS } from "@/lib/careers";

/**
 * The homepage hiring strip.
 *
 * Hidden with the rest of Careers. The site should not advertise a section its
 * own navigation hides, and the previous line — "We're hiring across every team
 * on this page" — claimed more than four postings establish.
 */
export function Careers() {
  const { t } = useLanguage();

  if (!SHOW_CAREERS) return null;

  return (
    <section id="careers" className="section-dark border-b border-border">
      <div className="container-page section-y">
        <div className="flex justify-center">
          <SectionHeader eyebrow={t.careers.eyebrow} heading={t.careers.line} />
        </div>
        {/* Was href="#". Now points at the real careers index, and says how many
            roles are open so the link is worth following. */}
        <Link
          to="/careers"
          className="mx-auto mt-8 flex w-fit items-center gap-1.5 text-sm font-bold text-accent underline-offset-4 hover:underline"
        >
          {OPEN_POSTINGS.length > 0 ? `${t.careers.cta} (${OPEN_POSTINGS.length})` : t.careers.cta}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
