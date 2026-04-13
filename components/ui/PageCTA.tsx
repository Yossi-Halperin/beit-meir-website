import Link from "next/link";
import { useLocale } from "next-intl";
import RevealOnScroll from "./RevealOnScroll";

interface PageCTAProps {
  heading: string;
  body: string;
  ctaLabel?: string;
}

export default function PageCTA({ heading, body, ctaLabel }: PageCTAProps) {
  const locale = useLocale();
  const isRTL = locale === "he";
  const label = ctaLabel || (isRTL ? "השאירו פרטים" : "Leave Your Details");

  return (
    <section
      className="py-20 md:py-32 bg-bg-secondary border-t border-border"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <RevealOnScroll>
          <div className="max-w-prose-xs mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <div className="w-1.5 h-1.5 bg-accent rotate-45" />
              <div className="w-8 h-px bg-accent" />
            </div>
            <h2
              className="text-display-md text-text-primary mb-4"
              style={{
                fontFamily: isRTL
                  ? "var(--font-frank-ruhl), serif"
                  : "var(--font-cormorant), serif",
              }}
            >
              {heading}
            </h2>
            <p className="text-body text-text-secondary mb-8">{body}</p>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {label}
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
