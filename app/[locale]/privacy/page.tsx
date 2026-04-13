import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return { title: t("title"), description: t("description") };
}

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = (messages as any).privacy_page;
  const isRTL = locale === "he";

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
              {t.overline}
            </span>
          </div>
          <h1
            className="text-display-lg text-text-primary"
            style={{
              fontFamily: isRTL
                ? "var(--font-frank-ruhl), serif"
                : "var(--font-cormorant), serif",
            }}
          >
            {t.heading}
          </h1>
          <p className="text-caption text-text-tertiary mt-4">
            {t.last_updated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 md:pb-40 bg-bg-primary" dir={isRTL ? "rtl" : "ltr"}>
        <div className="section-container">
          <div className="max-w-prose mx-auto flex flex-col gap-10">
            {t.sections.map(
              (
                section: { heading: string; body: string },
                i: number
              ) => (
                <RevealOnScroll key={i} delay={0.05 * i}>
                  <div className="flex flex-col gap-4 pb-8 border-b border-border last:border-0">
                    <h2
                      className="text-subheading text-text-primary"
                      style={{
                        fontFamily: isRTL
                          ? "var(--font-frank-ruhl), serif"
                          : "var(--font-cormorant), serif",
                      }}
                    >
                      {section.heading}
                    </h2>
                    <p className="text-body text-text-secondary leading-relaxed whitespace-pre-line">
                      {section.body}
                    </p>
                  </div>
                </RevealOnScroll>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
