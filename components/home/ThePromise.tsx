import { useLocale, useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function ThePromise() {
  const locale = useLocale();
  const t = useTranslations("promise");
  const isRTL = locale === "he";

  return (
    <section
      className="py-24 md:py-40 bg-bg-primary"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <RevealOnScroll>
          <div className="max-w-prose mx-auto text-center">
            {/* Overline */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="brass-rule" />
              <span className="overline-label">{t("overline")}</span>
              <div className="brass-rule" />
            </div>

            {/* First two lines — large, serif */}
            <div
              className="text-display-md text-text-primary mb-6 leading-snug"
              style={{
                fontFamily: isRTL
                  ? "var(--font-frank-ruhl), serif"
                  : "var(--font-cormorant), serif",
              }}
            >
              <p className="text-text-secondary mb-2">{t("line1")}</p>
              <p>
                <span className="text-accent font-bold">
                  {isRTL ? "בית מאיר" : "Beit Meir"}
                </span>{" "}
                {isRTL ? "הוא לא אחד מהם." : "is not one of them."}
              </p>
            </div>

            {/* Body paragraph */}
            <RevealOnScroll delay={0.2}>
              <p className="text-body-lg text-text-secondary leading-relaxed max-w-prose-sm mx-auto">
                {t("body")}
              </p>
            </RevealOnScroll>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
