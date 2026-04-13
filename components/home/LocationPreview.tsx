"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";

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
          {/* Left: Map placeholder */}
          <RevealOnScroll direction={isRTL ? "right" : "left"}>
            <Link
              href={`/${locale}/location`}
              className="block relative aspect-square max-w-lg w-full group"
              aria-label={isRTL ? "מפה מלאה" : "Full map"}
            >
              {/* Map placeholder — dark styled */}
              <div
                className="w-full h-full rounded-sm overflow-hidden border border-border group-hover:border-accent/40 transition-colors duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, #1A1815 0%, #252220 50%, #2D3320 100%)",
                }}
              >
                {/* Mapbox will render here — placeholder for now */}
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* Grid lines simulating map */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`h-${i}`}
                        className="absolute w-full border-t border-text-tertiary"
                        style={{ top: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`v-${i}`}
                        className="absolute h-full border-l border-text-tertiary"
                        style={{ left: `${(i + 1) * 12.5}%` }}
                      />
                    ))}
                  </div>
                  {/* Topographic lines */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 400 400"
                    fill="none"
                  >
                    <ellipse cx="200" cy="200" rx="160" ry="120" stroke="#B8924A" strokeWidth="0.5" />
                    <ellipse cx="200" cy="200" rx="120" ry="85" stroke="#B8924A" strokeWidth="0.5" />
                    <ellipse cx="200" cy="200" rx="80" ry="55" stroke="#B8924A" strokeWidth="0.5" />
                    <ellipse cx="200" cy="200" rx="40" ry="28" stroke="#B8924A" strokeWidth="0.5" />
                    <path d="M60 280 Q120 240 200 220 Q280 200 340 160" stroke="#6B5D4A" strokeWidth="1" />
                    <path d="M40 320 Q100 290 180 270 Q260 250 360 210" stroke="#6B5D4A" strokeWidth="0.7" />
                  </svg>
                  {/* Brass pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-accent border-2 border-bg-primary shadow-lg shadow-accent/30" />
                    <div className="w-px h-6 bg-accent" />
                    <div className="mt-2 bg-bg-secondary/90 border border-accent/30 px-3 py-1.5 text-caption text-accent text-center">
                      {isRTL ? "מושב בית מאיר" : "Moshav Beit Meir"}
                    </div>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="overline-label bg-bg-primary/80 px-4 py-2">
                    {t("map_cta")}
                  </span>
                </div>
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

              {/* Distance rows */}
              <div className="flex flex-col divide-y divide-border">
                {distances.map((d, i) => (
                  <RevealOnScroll key={i} delay={0.1 * i} direction="none">
                    <div
                      className={cn(
                        "relative flex items-center justify-between py-5 px-4 transition-colors duration-300",
                        d.featured
                          ? "bg-bg-tertiary/60"
                          : "hover:bg-bg-secondary/50"
                      )}
                    >
                      {/* Featured diamond ornament */}
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
                        {d.featured && (
                          <div className="mt-1 w-full h-px bg-accent/60" />
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
