import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { GlobalDelivery } from "@/components/global-delivery";
import { CaseStudies } from "@/components/case-studies";
import { Careers } from "@/components/careers";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZEDventures — AI, Data & Product Engineering Partner" },
      {
        name: "description",
        content:
          "ZEDventures designs, builds, and runs AI, analytics, and geospatial systems that hold up in production.",
      },
      { property: "og:title", content: "ZEDventures — Technology Partner" },
      {
        property: "og:description",
        content:
          "Engineering intelligence into every enterprise. AI & Data, Analytics, GIS, Guidewire, Product Engineering, Offshore & Nearshore Delivery.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <Header />
      <main className="pt-16 sm:pt-20">
        <Hero />
        <Services />
        {/* After Services, not before: the spec calls this a confidence
            point, and a confidence point lands once the visitor knows what
            the company does. */}
        <GlobalDelivery />
        <CaseStudies />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
