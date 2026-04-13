"use client";
// Spec §6.1 Section 3: Two-column, Mapbox dark mini-map left, distances right
// Kotel row is featured/centered visually with diamond ornament and brass treatment

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

// Dynamic import to avoid SSR issues with Mapbox GL
const MapboxMap = dynamic(() => import("@/components/map/MapboxMap"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full rounded-sm border border-border"
      style={{ background: "linear-gradient(135deg, #1A1815 0%, #252220 50%, #2D3320 100%)" }}
    />
  ),
});

interface Distance {
  km: string;
  label: string;
  time: string;
  featured: boolean;
}

export default function LocationPreview() {
  const locale = useLocale();
  const t = useTranslations("location_preview");
  const isRTL = locale === "he";

  const distances: Distance[] = t.raw("distances") as Distance[];

  return (
    <section
      className="py-24 md:py-40 bg-bg-secondary border-y border-border"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Mapbox mini-map — spec §6.1 Section 3 */}
          <RevealOnScroll direction={isRTL ? "right" : "left"}>
            <Link
              href={`/${locale}/location`}
              className="block relative aspect-square max-w-lg w-full group"
              aria-label={isRTL ? "מפה מלאה" : "Full map"}
            >
              <div className="w-full h-full rounded-sm overflow-hidden border border-border group-hover:border-accent/40 transition-colors duration-500">
                <MapboxMap interactive={false} className="w-full h-full" />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 pointer-events-none">
                <span className="overline-label bg-bg-primary/90 border border-accent/30 px-4 py-2">
                  {t("map_cta")}
                </span>
              </div>
            </Link>
          </RevealOnScroll>

          {/* Right: Distances */}
          <RevealOnScroll direction={isRTL ? "left" : "right"} delay={0.2}>
            <div className="flex flex-col gap-4">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="brass-rule" />
                  <span className="overline-label">{t("overline")}</span>
                </div>
                <h2
                  className="text-display-md text-text-primary"
                  style={{
                    fontFamily: isRTL
                      ? "var(--font-frank-ruhl), serif"
                      : "var(--font-cormorant), serif",
                  }}
                >
                  {t("heading")}
                  <br />
                  <span className="text-text-secondary">{t("subheading")}</span>
                </h2>
              </div>

              {/* Distance rows — spec §6.1 Section 3 */}
              <div className="flex flex-col divide-y divide-border">
                {distances.map((d, i) => (
                  <RevealOnScroll key={i} delay={0.08 * i} direction="none">
                    <div
                      className={cn(
                        "relative flex items-center justify-between py-5 px-4 transition-colors duration-300",
                        d.featured
                          ? "bg-bg-tertiary/60"
                          : "hover:bg-bg-secondary/50"
                      )}
                    >
                      {/* Featured diamond ornament — spec §6.1 Section 3 */}
                      {d.featured && (
                        <div
                          className={cn(
                            "absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rotate-45",
                            isRTL ? "right-0" : "left-0"
                          )}
                        />
                      )}

                      {/* Distance number */}
                      <div className={cn("flex flex-col", isRTL ? "items-end" : "items-start")}>
                        <span
                          className={cn(
                            "text-display-md font-bold leading-none",
                            d.featured ? "text-accent" : "text-text-primary"
                          )}
                          style={{ fontFamily: "var(--font-heebo), sans-serif" }}
                          dir="ltr"
                        >
                          {d.km}
                          <span className="text-heading ms-1">
                            {isRTL ? 'ק"מ' : "km"}
                          </span>
                        </span>
                        <span
                          className={cn(
                            "text-caption mt-1",
                            d.featured ? "text-accent" : "text-text-tertiary"
                          )}
                        >
                          {d.label}
                        </span>
                      </div>

                      {/* Time */}
                      <div className={cn("flex flex-col", isRTL ? "items-start" : "items-end")}>
                        <span
                          className={cn(
                            "text-subheading font-medium",
                            d.featured ? "text-accent" : "text-text-secondary"
                          )}
                          dir="ltr"
                        >
                          {d.time}
                        </span>
                        {/* Featured brass underline rule — spec §6.1 Section 3 */}
                        {d.featured && (
                          <div className="mt-1.5 w-full h-px bg-accent/60" />
                        )}
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              <div className="mt-4">
                <Link
                  href={`/${locale}/location`}
                  className="overline-label text-accent hover:text-accent-hover transition-colors duration-300 flex items-center gap-2"
                >
                  {t("map_cta")}
                  <span className={isRTL ? "rotate-180" : ""}>→</span>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
