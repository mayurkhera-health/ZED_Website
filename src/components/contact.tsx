import { useLanguage } from "@/lib/i18n";
import { SectionHeader } from "@/components/section-header";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-dark border-t border-border">
      <div className="container-page section-y grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader
            align="left"
            eyebrow={t.contact.eyebrow}
            heading={t.contact.line}
            sub={t.contact.sub}
          />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
