import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";

/**
 * TWO LOGO FILES, AND THEY ARE NOT INTERCHANGEABLE.
 *
 *   /zedventures-logo.png            black wordmark, white background, no alpha
 *                                    -> light grounds only (the header)
 *   /zedventures-logo-knockout.png   white wordmark, red mark, transparent
 *                                    -> dark grounds only (anything .section-dark)
 *
 * Put the knockout on a light surface and the wordmark disappears, leaving three
 * red bars floating on their own. Put the original on a dark surface and you get
 * a white box. There is no single file that covers both, because the mark is
 * black-on-white and the site has no OS-driven dark mode — .section-dark is an
 * opt-in utility, so a component always knows which ground it is on.
 *
 * The knockout was derived from the original raster (798x208), not supplied by a
 * designer. If a real white or SVG version ever arrives, replace the file rather
 * than re-deriving it.
 */
const LOGO_KNOCKOUT_SRC = "/zedventures-logo-knockout.png";

export function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="section-dark border-t border-border pb-24 sm:pb-0">
      {/* Asymmetric on purpose, per the spacing spec: 48/56 at the top,
          32/36 at the bottom. It was 56/64 on both sides, and the even
          padding put more air under the copyright line than above the logo. */}
      <div className="container-page pb-8 pt-12 sm:pb-9 sm:pt-14">
        {/* The brand column is wider than the link columns: it carries the mark,
            the line and the language control, so it reads as the anchor rather
            than a fourth list of the same weight. */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-12">
          <div>
            <Link to="/" className="inline-flex">
              <img
                src={LOGO_KNOCKOUT_SRC}
                alt={t.a11y.logoAlt}
                width={798}
                height={208}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-[24rem] text-sm leading-relaxed text-muted-foreground">
              {f.tagline}
            </p>
            <div className="mt-6">
              <LanguageToggle dark />
            </div>
          </div>

          <FooterColumn heading={f.exploreHeading}>
            <li>
              <FooterLink to="/services">{t.nav.services}</FooterLink>
            </li>
            <li>
              <FooterLink to="/case-studies">{t.nav.caseStudies}</FooterLink>
            </li>
          </FooterColumn>

          <FooterColumn heading={f.companyHeading}>
            <li>
              <FooterLink to="/about">{t.nav.about}</FooterLink>
            </li>
            <li>
              <FooterLink to="/careers">{t.nav.careers}</FooterLink>
            </li>
            <li>
              <FooterLink to="/contact">{t.nav.contact}</FooterLink>
            </li>
          </FooterColumn>

          <FooterColumn heading={f.legalHeading}>
            <li>
              <Link to="/legal/$doc" params={{ doc: "privacy" }} className={LINK_CLS}>
                {f.privacy}
              </Link>
            </li>
            <li>
              <Link to="/legal/$doc" params={{ doc: "terms" }} className={LINK_CLS}>
                {f.terms}
              </Link>
            </li>
          </FooterColumn>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{f.rights}</p>
        </div>
      </div>
    </footer>
  );
}

/* min-h keeps every footer link a real tap target on a phone, where these are
   the last thing a visitor reaches for and the easiest to miss. */
const LINK_CLS =
  "inline-flex min-h-[1.75rem] items-center text-sm text-foreground transition-colors duration-200 hover:text-accent";

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.09em] text-subtle-foreground">
        {heading}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: "/services" | "/case-studies" | "/about" | "/careers" | "/contact";
  children: React.ReactNode;
}) {
  return (
    <Link to={to} className={LINK_CLS}>
      {children}
    </Link>
  );
}
