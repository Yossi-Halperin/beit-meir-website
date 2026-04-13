import { useLocale, useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function OpportunityCTA() {
  const locale = useLocale();
  const t = useTranslations("opportunity");
  const isRTL = locale === "he";

  return (
    <section
      className="py-24 md:py-40 bg-bg-secondary border-y border-border"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="max-w-prose-xs mx-auto text-center">
          <RevealOnScroll>
            {/* Overline */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="brass-rule" />
              <span className="overline-label">{t("overline")}</span>
              <div className="brass-rule" />
            </div>

            {/* Heading */}
            <h2
              className="text-display-lg text-text-primary mb-8"
              style={{
                fontFamily: isRTL
                  ? "var(--font-frank-ruhl), serif"
                  : "var(--font-cormorant), serif",
              }}
            >
              {t("heading")}
            </h2>

            {/* Body */}
            <p className="text-body-lg text-text-secondary leading-relaxed mb-10">
              {t("body")}
            </p>

            {/* Arrow to form */}
            <a
              href="#lead-form"
              className="inline-flex flex-col items-center gap-3 text-accent hover:text-accent-hover transition-colors duration-300 group"
              aria-label={t("cta")}
            >
              <span className="overline-label">{t("cta")}</span>
              <div className="relative w-px h-12 bg-accent/30 overflow-hidden">
                <div
                  className="absolute top-0 w-full h-1/2 bg-accent group-hover:translate-y-full transition-transform duration-500"
                />
              </div>
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
