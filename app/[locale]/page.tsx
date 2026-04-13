import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import HeroVideo from "@/components/home/HeroVideo";
import ThePromise from "@/components/home/ThePromise";
import LocationPreview from "@/components/home/LocationPreview";
import ImageGalleryGrid from "@/components/home/ImageGalleryGrid";
import PullQuote from "@/components/home/PullQuote";
import PillarsGrid from "@/components/home/PillarsGrid";
import OpportunityCTA from "@/components/home/OpportunityCTA";
import LeadForm from "@/components/lead/LeadForm";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const community = (messages as any).community;
  const leadForm = (messages as any).lead_form;
  const isRTL = locale === "he";

  return (
    <>
      {/* Section 1: Hero */}
      <HeroVideo />

      {/* Section 2: The Promise */}
      <ThePromise />

      {/* Section 3: Location Preview */}
      <LocationPreview />

      {/* Section 4: Gallery + Prose */}
      <ImageGalleryGrid />

      {/* Section 5: Community (Quote + Pillars) */}
      <section
        className="py-24 md:py-40 bg-bg-secondary border-y border-border"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="section-container">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-px bg-accent" />
              <span className="text-overline uppercase tracking-widest text-accent font-medium">
                {community.overline}
              </span>
            </div>
          </RevealOnScroll>

          {/* Pull quote */}
          <PullQuote
            quote={community.quote}
            author={community.quote_author}
          />

          {/* Pillars */}
          <div className="mt-16">
            <PillarsGrid />
          </div>
        </div>
      </section>

      {/* Section 6: Opportunity CTA */}
      <OpportunityCTA />

      {/* Section 7: Lead Form */}
      <section
        id="lead-form"
        className="py-24 md:py-40 bg-bg-primary"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="section-container">
          <div className="max-w-prose-sm mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-12 h-px bg-accent" />
                  <span className="text-overline uppercase tracking-widest text-accent font-medium">
                    {leadForm.overline}
                  </span>
                  <div className="w-12 h-px bg-accent" />
                </div>
                <h2
                  className="text-display-md text-text-primary mb-4"
                  style={{
                    fontFamily: isRTL
                      ? "var(--font-frank-ruhl), serif"
                      : "var(--font-cormorant), serif",
                  }}
                >
                  {leadForm.heading}
                </h2>
                <p className="text-body text-text-secondary">
                  {leadForm.subheading}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div className="bg-bg-secondary border border-border p-8 md:p-12">
                <LeadForm variant="inline" />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
