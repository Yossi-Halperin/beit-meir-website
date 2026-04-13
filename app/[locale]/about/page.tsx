import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { useLocale } from "next-intl";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Image from "next/image";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description") };
}

const ABOUT_IMAGES = [
  {
    src: "/images/gallery/gallery-2.jpg",
    alt: "Ancient pine forest path in Martyrs Forest — morning light",
  },
  {
    src: "/images/gallery/gallery-1.jpg",
    alt: "Aerial view of Jerusalem Hills at golden hour",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    alt: "Sunset panorama over Jerusalem Hills with terraced olive groves",
  },
];

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = (messages as any).about;
  const isRTL = locale === "he";

  const sections = [
    {
      overline: t.founding_overline,
      heading: t.founding_heading,
      body: t.founding_body,
      image: ABOUT_IMAGES[0],
    },
    {
      overline: t.burma_overline,
      heading: t.burma_heading,
      body: t.burma_body,
      image: null,
    },
    {
      overline: t.land_overline,
      heading: t.land_heading,
      body: t.land_body,
      image: ABOUT_IMAGES[1],
    },
    {
      overline: t.nature_overline,
      heading: t.nature_heading,
      body: t.nature_body,
      image: null,
    },
    {
      overline: t.today_overline,
      heading: t.today_heading,
      body: t.today_body,
      image: ABOUT_IMAGES[2],
    },
  ];

  return (
    <>
      <PageHero
        overline={t.hero_overline}
        heading={t.hero_heading}
        imageSrc="/images/gallery/gallery-2.jpg"
        imageAlt="Beit Meir moshav in the Judean Hills"
      />

      <div dir={isRTL ? "rtl" : "ltr"}>
        {sections.map((section, i) => (
          <section
            key={i}
            className={`py-20 md:py-32 ${i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary"}`}
          >
            <div className="section-container">
              {section.image ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <RevealOnScroll direction={isRTL ? "right" : "left"}>
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
                  <RevealOnScroll direction={isRTL ? "left" : "right"} delay={0.2}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </RevealOnScroll>
                </div>
              ) : (
                <RevealOnScroll>
                  <div className="max-w-prose mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-px bg-accent" />
                      <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                        {section.overline}
                      </span>
                    </div>
                    <h2
                      className="text-display-md text-text-primary mb-6"
                      style={{
                        fontFamily: isRTL
                          ? "var(--font-frank-ruhl), serif"
                          : "var(--font-cormorant), serif",
                      }}
                    >
                      {section.heading}
                    </h2>
                    <p className="text-body-lg text-text-secondary leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                </RevealOnScroll>
              )}
            </div>
          </section>
        ))}

        {/* Institutions */}
        <section className="py-20 md:py-32 bg-bg-primary">
          <div className="section-container">
            <RevealOnScroll>
              <div className="max-w-prose mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                    {t.institutions_overline}
                  </span>
                </div>
                <h2
                  className="text-display-md text-text-primary mb-10"
                  style={{
                    fontFamily: isRTL
                      ? "var(--font-frank-ruhl), serif"
                      : "var(--font-cormorant), serif",
                  }}
                >
                  {t.institutions_heading}
                </h2>
                <div className="flex flex-col divide-y divide-border">
                  {t.institutions.map(
                    (inst: { name: string; desc: string }, i: number) => (
                      <RevealOnScroll key={i} delay={0.1 * i}>
                        <div className="py-4 flex items-start justify-between gap-4">
                          <span className="text-body text-text-primary font-medium">
                            {inst.name}
                          </span>
                          <span className="text-caption text-text-tertiary text-end">
                            {inst.desc}
                          </span>
                        </div>
                      </RevealOnScroll>
                    )
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </div>

      <PageCTA heading={t.cta_heading} body={t.cta_body} />
    </>
  );
}
