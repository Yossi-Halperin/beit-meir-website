import { useLocale, useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

interface PullQuoteProps {
  quoteKey?: string;
  authorKey?: string;
  quote?: string;
  author?: string;
}

export default function PullQuote({ quote, author }: PullQuoteProps) {
  const locale = useLocale();
  const isRTL = locale === "he";

  return (
    <RevealOnScroll>
      <div
        className="relative py-16 md:py-24 text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Large quotation mark */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 text-accent/20 select-none pointer-events-none"
          style={{
            fontSize: "12rem",
            lineHeight: 1,
            fontFamily: isRTL
              ? "var(--font-frank-ruhl), serif"
              : "var(--font-cormorant), serif",
          }}
          aria-hidden="true"
        >
          "
        </div>

        <div className="relative z-10 max-w-prose-sm mx-auto">
          <blockquote
            className="text-display-md text-text-primary italic leading-snug mb-6"
            style={{
              fontFamily: isRTL
                ? "var(--font-frank-ruhl), serif"
                : "var(--font-cormorant), serif",
            }}
          >
            {quote}
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-accent" />
            <cite className="text-caption text-text-tertiary not-italic">
              {author}
            </cite>
            <div className="w-8 h-px bg-accent" />
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
