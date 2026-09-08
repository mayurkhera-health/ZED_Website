import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zedventures" },
      {
        name: "description",
        content:
          "Reach Zedventures by email, phone, or our contact form. Offices in San Jose, Dallas, and Hyderabad.",
      },
      { property: "og:title", content: "Contact — Zedventures" },
      {
        property: "og:description",
        content:
          "Reach Zedventures by email, phone, or our contact form. Offices in San Jose, Dallas, and Hyderabad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        <ContactPageBody />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function ContactPageBody() {
  const { t } = useLanguage();
  const p = t.contact.page;

  return (
    <>
      <section className="border-b border-border">
        <div className="container-page section-y section-y-card">
          <SectionHeader align="left" eyebrow={p.eyebrow} heading={p.heading} sub={p.sub} />

          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            <a
              href={`mailto:${p.email}`}
              className="group flex items-start gap-4 bg-card p-6 transition-colors hover:bg-muted"
            >
              <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {p.emailLabel}
                </span>
                <span className="mt-1 block font-display text-lg group-hover:text-accent">
                  {p.email}
                </span>
              </span>
            </a>
            <a
              href={`tel:${p.phone.replace(/[^+\d]/g, "")}`}
              className="group flex items-start gap-4 bg-card p-6 transition-colors hover:bg-muted"
            >
              <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {p.phoneLabel}
                </span>
                <span className="mt-1 block font-display text-lg group-hover:text-accent">
                  {p.phone}
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container-page section-y section-y-card">
          <p className="text-xs font-bold uppercase tracking-widest text-accent">
            {p.officesEyebrow}
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {p.offices.map((office, i) => (
              <div key={office.city} className="bg-card p-6">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                <p className="font-display mt-4 text-2xl">{office.city}</p>
                <p className="mt-1 text-sm text-muted-foreground">{office.region}</p>
                <p className="mt-4 text-xs text-muted-foreground/70">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page section-y grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            align="left"
            eyebrow={t.contact.eyebrow}
            heading={t.contact.line}
            sub={t.contact.sub}
          />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
