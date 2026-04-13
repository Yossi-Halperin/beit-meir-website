import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.lifestyle" });
  return { title: t("title"), description: t("description") };
}

const LIFESTYLE_IMAGES = [
  "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&q=80",
];

export default async function LifestylePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = (messages as any).lifestyle_page;
  const isRTL = locale === "he";

  const sections = [
    {
      overline: t.climate_overline,
      heading: t.climate_heading,
      body: t.climate_body,
      imageIndex: 0,
      reverse: false,
    },
    {
      overline: t.nature_overline,
      heading: t.nature_heading,
      body: t.nature_body,
      imageIndex: 1,
      reverse: true,
    },
    {
      overline: t.wine_overline,
      heading: t.wine_heading,
      body: t.wine_body,
      imageIndex: 2,
      reverse: false,
    },
    {
      overline: t.day_overline,
      heading: t.day_heading,
      body: t.day_body,
      imageIndex: 3,
      reverse: true,
    },
    {
      overline: t.air_overline,
      heading: t.air_heading,
      body: t.air_body,
      imageIndex: 0,
      reverse: false,
    },
  ];

  return (
    <>
      <PageHero
        overline={t.hero_overline}
        heading={t.hero_heading}
        imageSrc="https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=1600&q=80"
        imageAlt="Beit Meir lifestyle"
      />

      {/* Sections */}
      {sections.map((section, i) => (
        <section
          key={i}
          className={`py-20 md:py-32 ${i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="section-container">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}
            >
              <RevealOnScroll
                direction={
                  section.reverse
                    ? isRTL
                      ? "left"
                      : "right"
                    : isRTL
                    ? "right"
                    : "left"
                }
                className={section.reverse ? "lg:order-2" : ""}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-accent" />
                    <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                      {section.overline}
                    </span>
                  </div>
                  <h2
                    className="text-display-md text-text-primary"
                    style={{
                      fontFamily: isRTL
                        ? "var(--font-frank-ruhl), serif"
                        : "var(--font-cormorant), serif",
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll
                direction={
                  section.reverse
                    ? isRTL
                      ? "right"
                      : "left"
                    : isRTL
                    ? "left"
                    : "right"
                }
                delay={0.2}
                className={section.reverse ? "lg:order-1" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={LIFESTYLE_IMAGES[section.imageIndex % LIFESTYLE_IMAGES.length]}
                    alt={section.heading}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      ))}

      {/* Pull quote */}
      <section className="py-20 md:py-32 bg-bg-secondary border-y border-border" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="max-w-prose-xs mx-auto text-center">
              <div
                className="text-accent/20 text-[8rem] leading-none font-serif mb-4"
                aria-hidden="true"
              >
                "
              </div>
              <blockquote
                className="text-display-md text-text-primary italic mb-6"
                style={{
                  fontFamily: isRTL
                    ? "var(--font-frank-ruhl), serif"
                    : "var(--font-cormorant), serif",
                }}
              >
                {t.day_body}
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-8 h-px bg-accent" />
                <cite className="text-caption text-text-tertiary not-italic">
                  {isRTL ? "בוקר בבית מאיר" : "Morning in Beit Meir"}
                </cite>
                <div className="w-8 h-px bg-accent" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <PageCTA heading={t.cta_heading} body={t.cta_body} />
    </>
  );
}
