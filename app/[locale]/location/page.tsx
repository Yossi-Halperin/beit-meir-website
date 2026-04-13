import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PageCTA from "@/components/ui/PageCTA";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.location" });
  return { title: t("title"), description: t("description") };
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

  return (
    <>
      <PageHero
        overline={t.hero_overline}
        heading={t.hero_heading}
        subheading={t.hero_subheading}
        imageSrc="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80"
        imageAlt="Judean Hills aerial view"
      />

      {/* Map section */}
      <section
        className="py-20 md:py-32 bg-bg-primary"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="section-container">
          <RevealOnScroll>
            {/* Map placeholder — full width dark styled */}
            <div
              className="relative w-full aspect-[16/7] rounded-sm overflow-hidden border border-border mb-8"
              style={{
                background:
                  "linear-gradient(135deg, #1A1815 0%, #252220 50%, #2D3320 100%)",
              }}
            >
              {/* Topographic map visualization */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                viewBox="0 0 1200 500"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
              >
                {/* Contour lines */}
                <ellipse cx="600" cy="250" rx="500" ry="200" stroke="#B8924A" strokeWidth="0.5" />
                <ellipse cx="600" cy="250" rx="400" ry="160" stroke="#B8924A" strokeWidth="0.5" />
                <ellipse cx="600" cy="250" rx="300" ry="120" stroke="#B8924A" strokeWidth="0.5" />
                <ellipse cx="600" cy="250" rx="200" ry="80" stroke="#B8924A" strokeWidth="0.5" />
                <ellipse cx="600" cy="250" rx="100" ry="40" stroke="#B8924A" strokeWidth="0.5" />
                {/* Roads */}
                <path d="M0 200 Q300 180 600 250 Q900 320 1200 280" stroke="#6B5D4A" strokeWidth="2" />
                <path d="M0 350 Q200 320 400 300 Q600 280 800 260 Q1000 240 1200 220" stroke="#6B5D4A" strokeWidth="1.5" />
                <path d="M600 0 Q580 100 600 250 Q620 400 600 500" stroke="#6B5D4A" strokeWidth="1.5" />
              </svg>

              {/* Grid */}
              <div className="absolute inset-0 opacity-5">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full border-t border-text-tertiary" style={{ top: `${(i + 1) * 10}%` }} />
                ))}
                {[...Array(12)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full border-l border-text-tertiary" style={{ left: `${(i + 1) * 8.33}%` }} />
                ))}
              </div>

              {/* Center pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="w-5 h-5 rounded-full bg-accent border-2 border-bg-primary shadow-lg shadow-accent/40" />
                <div className="w-px h-8 bg-accent" />
                <div className="bg-bg-secondary/95 border border-accent/40 px-4 py-2 text-sm text-accent whitespace-nowrap">
                  {t.map_heading}
                </div>
              </div>

              {/* TODO badge */}
              <div className="absolute bottom-4 end-4 bg-bg-primary/80 px-3 py-1.5 text-caption text-text-tertiary border border-border">
                TODO: Mapbox interactive map
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 start-4 text-caption text-text-tertiary">
                {t.map_subheading}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Distances table */}
      <section
        className="py-20 md:py-32 bg-bg-secondary border-y border-border"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="section-container">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent" />
              <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                {t.distances_overline}
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
              {t.distances_heading}
            </h2>
          </RevealOnScroll>

          <div className="flex flex-col divide-y divide-border max-w-3xl">
            {t.distances.map(
              (
                d: {
                  destination: string;
                  km: string;
                  time: string;
                  featured: boolean;
                },
                i: number
              ) => (
                <RevealOnScroll key={i} delay={0.07 * i}>
                  <div
                    className={cn(
                      "flex items-center justify-between py-5 px-4 transition-colors duration-300",
                      d.featured
                        ? "bg-bg-tertiary/60 border-s-2 border-accent"
                        : "hover:bg-bg-tertiary/30"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {d.featured && (
                        <div className="w-1.5 h-1.5 bg-accent rotate-45 shrink-0" />
                      )}
                      <span
                        className={cn(
                          "text-body font-medium",
                          d.featured ? "text-accent" : "text-text-primary"
                        )}
                      >
                        {d.destination}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-end" dir="ltr">
                      <span className="text-caption text-text-tertiary">
                        {d.km} km
                      </span>
                      <span
                        className={cn(
                          "text-body font-medium min-w-[80px]",
                          d.featured ? "text-accent" : "text-text-secondary"
                        )}
                      >
                        {d.time}
                      </span>
                    </div>
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </div>
      </section>

      {/* How to get here */}
      <section
        className="py-20 md:py-32 bg-bg-primary"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <RevealOnScroll>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                    {t.how_overline}
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
                  {t.how_heading}
                </h2>
                <p className="text-body text-text-secondary leading-relaxed">
                  {t.how_body}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                    {t.around_overline}
                  </span>
                </div>
                <h2
                  className="text-display-md text-text-primary mb-8"
                  style={{
                    fontFamily: isRTL
                      ? "var(--font-frank-ruhl), serif"
                      : "var(--font-cormorant), serif",
                  }}
                >
                  {t.around_heading}
                </h2>
                <div className="flex flex-col gap-4">
                  {t.around.map(
                    (item: { name: string; desc: string }, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="mt-2 w-1.5 h-1.5 bg-accent rotate-45 shrink-0" />
                        <div>
                          <span className="text-body text-text-primary font-medium">
                            {item.name}
                          </span>
                          <span className="text-caption text-text-tertiary ms-2">
                            — {item.desc}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <PageCTA heading={t.cta_heading} body={t.cta_body} />
    </>
  );
}
