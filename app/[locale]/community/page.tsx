import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
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
  const t = await getTranslations({ locale, namespace: "meta.community" });
  return { title: t("title"), description: t("description") };
}

export default async function CommunityPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = (messages as any).community_page;
  const isRTL = locale === "he";

  return (
    <>
      <PageHero
        overline={t.hero_overline}
        heading={t.hero_heading}
        subheading={t.hero_subheading}
        imageSrc="https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1600&q=80"
        imageAlt="Beit Meir community"
      />

      {/* Intro */}
      <section className="py-20 md:py-32 bg-bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="max-w-prose mx-auto">
              <p className="text-body-lg text-text-secondary leading-relaxed">
                {t.intro}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-20 md:py-32 bg-bg-secondary border-y border-border" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-px bg-accent" />
              <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                {t.values_overline}
              </span>
            </div>
            <h2
              className="text-display-md text-text-primary mb-12"
              style={{
                fontFamily: isRTL
                  ? "var(--font-frank-ruhl), serif"
                  : "var(--font-cormorant), serif",
              }}
            >
              {t.values_heading}
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.values.map(
              (
                value: { title: string; body: string; icon: string },
                i: number
              ) => (
                <RevealOnScroll key={i} delay={0.1 * i}>
                  <div className="p-6 border border-border hover:border-accent/30 transition-colors duration-500 bg-bg-primary/50 flex flex-col gap-4">
                    <div className="text-accent text-2xl">{value.icon}</div>
                    <h3
                      className="text-subheading text-text-primary"
                      style={{
                        fontFamily: isRTL
                          ? "var(--font-frank-ruhl), serif"
                          : "var(--font-cormorant), serif",
                      }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-caption text-text-secondary leading-relaxed">
                      {value.body}
                    </p>
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-px bg-accent" />
              <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                {t.testimonials_overline}
              </span>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.testimonials.map(
              (
                testimonial: { quote: string; name: string; origin: string },
                i: number
              ) => (
                <RevealOnScroll key={i} delay={0.15 * i}>
                  <div className="p-8 border border-border bg-bg-secondary flex flex-col gap-6">
                    <div className="text-accent/30 text-4xl font-serif leading-none">"</div>
                    <blockquote
                      className="text-body-lg text-text-primary italic"
                      style={{
                        fontFamily: isRTL
                          ? "var(--font-frank-ruhl), serif"
                          : "var(--font-cormorant), serif",
                      }}
                    >
                      {testimonial.quote}
                    </blockquote>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-6 h-px bg-accent" />
                      <div>
                        <div className="text-caption text-text-primary font-medium">
                          {testimonial.name}
                        </div>
                        <div className="text-caption text-text-tertiary">
                          {testimonial.origin}
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </div>
      </section>

      <PageCTA heading={t.cta_heading} body={t.cta_body} />
    </>
  );
}
