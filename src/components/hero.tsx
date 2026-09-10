import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { HeroMark } from "@/components/hero-mark";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--color-secondary)_0%,transparent_65%)] opacity-60 sm:-top-32 sm:h-[56rem] sm:w-[56rem]"
      />

      {/* Two columns from 1024px up: the text column no longer has to stretch
          to justify the container width, and the right column carries a mark
          instead of 360px of nothing. Below 1024px the mark is dropped rather
          than stacked — on a phone it would push the CTA below the fold to buy
          decoration. */}
      <div className="container-page section-y relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
        <div>
          <div className="relative inline-block">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-3xl bg-[var(--color-secondary)]/40 sm:-inset-8"
            />
            {/* Measure narrows at lg because the headline now shares the row
                with the mark. Weight stays 800 (.font-display) — the heavy
                editorial display type is what keeps this from looking like a
                template. */}
            <h1 className="ink-type font-display max-w-[13ch] text-[2.625rem] leading-[1.02] tracking-[-0.025em] sm:max-w-[20ch] sm:text-5xl md:text-[3.25rem] lg:max-w-[16ch] lg:text-[3.75rem] lg:leading-[1.0] lg:tracking-[-0.03em]">
              {t.hero.headline}
            </h1>
          </div>

          {/* Body sized up to 17-18px per S8; measure held near 60ch per S12. */}
          <p className="mt-6 max-w-[42rem] text-[1.0625rem] leading-[1.6] text-muted-foreground sm:mt-8 sm:text-[1.125rem]">
            {t.hero.subhead}
          </p>

          {/* One visual weight class per action: a single filled button, and the
              secondary action as a text link. Two equal-weight buttons make the
              visitor choose between them instead of following the primary path.
              The link keeps a 48px tap target on phones. */}
          <div className="mt-8 flex flex-col items-start gap-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:gap-7">
            <Link to="/contact" className="btn btn-primary w-full min-[480px]:w-auto">
              {t.hero.ctaPrimary}
              <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex h-12 items-center gap-1.5 text-[0.9375rem] font-semibold text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
              style={{ transitionDuration: "var(--dur)", transitionTimingFunction: "var(--ease)" }}
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="arrow-shift h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {/* S21 trust line. Every item names a capability the site actually
              documents — nothing here is a claim that cannot be substantiated. */}
          <p className="mt-6 max-w-[42rem] text-sm leading-relaxed text-subtle-foreground">
            {t.hero.trustLine}
          </p>
        </div>

        {/* The mark, not the card. Chosen deliberately: the card's only
            unique content was the office list, which /about already carries,
            so nothing checkable is lost by showing the drawing instead.
            hero-card.tsx stays in the repo, unimported, if that reverses. */}
        <HeroMark className="hidden w-full max-w-[22rem] justify-self-end lg:block" />
      </div>
    </section>
  );
}
