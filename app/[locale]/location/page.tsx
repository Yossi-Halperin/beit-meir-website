import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import DistanceTable from "@/components/distance/DistanceTable";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

// Dynamic import for Mapbox — no SSR
const MapboxMapFull = dynamic(() => import("@/components/map/MapboxMapFull"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full aspect-[16/7] rounded-sm border border-border"
      style={{ background: "linear-gradient(135deg, #1A1815 0%, #252220 50%, #2D3320 100%)" }}
    />
  ),
});

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.location" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beit-meir.co.il";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/location`,
      languages: {
        he: "/he/location",
        en: "/en/location",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: [{ url: `${baseUrl}/images/og/og-home.jpg`, width: 1200, height: 630 }],
    },
  };
}

export default async function LocationPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = (messages as any).location_page;
  const isRTL = locale === "he";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beit-meir.co.il";

  const breadcrumbs = [
    { name: isRTL ? "בית" : "Home", url: `${baseUrl}/${locale}` },
    { name: isRTL ? "מיקום" : "Location", url: `${baseUrl}/${locale}/location` },
  ];

  return (
    <>
      {/* Breadcrumb JSON-LD — spec §9.3 */}
      <BreadcrumbJsonLd locale={locale} breadcrumbs={breadcrumbs} />

      <PageHero
        overline={t.hero_overline}
        heading={t.hero_heading}
        subheading={t.hero_subheading}
        imageSrc="/images/gallery/gallery-1.jpg"
        imageAlt={isRTL ? "נוף הרי ירושלים מהאוויר" : "Judean Hills aerial view"}
      />

      {/* Full interactive Mapbox map — spec §6.3 */}
      <section className="py-20 md:py-32 bg-bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="mb-8 text-center">
              <h2
                className="text-display-md text-text-primary mb-3"
                style={{
                  fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif",
                }}
              >
                {t.map_heading}
              </h2>
              <p className="text-body-lg text-text-secondary max-w-xl mx-auto">
                {t.map_subheading}
              </p>
            </div>
            {/* Full interactive map */}
            <MapboxMapFull className="mb-4" />
            <p className="text-caption text-text-tertiary text-center">
              {isRTL
                ? "מושב בית מאיר · 31.7898°N 35.0356°E · גובה ~650 מטר"
                : "Moshav Beit Meir · 31.7898°N 35.0356°E · Elevation ~650m"}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Distance table — spec §6.3 (8 destinations) */}
      <section className="py-16 md:py-24 bg-bg-secondary border-y border-border" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="brass-rule" />
                <span className="overline-label">{t.distances_overline}</span>
              </div>
              <h2
                className="text-display-md text-text-primary"
                style={{
                  fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif",
                }}
              >
                {t.distances_heading}
              </h2>
            </div>
            <DistanceTable
              distances={t.distances}
              isRTL={isRTL}
              headingDestination={isRTL ? "יעד" : "Destination"}
              headingKm={isRTL ? 'מרחק' : "Distance"}
              headingTime={isRTL ? "זמן נסיעה" : "Drive Time"}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* How to get here — spec §6.3 */}
      <section className="py-16 md:py-24 bg-bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="brass-rule" />
                  <span className="overline-label">{t.how_overline}</span>
                </div>
                <h2
                  className="text-display-md text-text-primary mb-6"
                  style={{
                    fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif",
                  }}
                >
                  {t.how_heading}
                </h2>
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  {t.how_body}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* What's around you — spec §6.3 */}
      <section className="py-16 md:py-24 bg-bg-secondary border-t border-border" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="brass-rule" />
                <span className="overline-label">{t.around_overline}</span>
              </div>
              <h2
                className="text-display-md text-text-primary"
                style={{
                  fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif",
                }}
              >
                {t.around_heading}
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t.around as Array<{ name: string; description: string }>).map(
              (item, i) => (
                <RevealOnScroll key={i} delay={0.1 * i}>
                  <div className="border border-border bg-bg-tertiary/40 p-6 hover:border-accent/30 transition-colors duration-300">
                    {/* Diamond accent */}
                    <div className="w-1.5 h-1.5 bg-accent rotate-45 mb-4" />
                    <h3
                      className="text-heading text-text-primary mb-3"
                      style={{
                        fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-body text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </div>
      </section>

      <PageCTA
        heading={t.cta_heading}
        body={t.cta_body}
      />
    </>
  );
}
