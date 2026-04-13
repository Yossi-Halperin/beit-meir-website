import Image from "next/image";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  overline: string;
  heading: string;
  subheading?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function PageHero({
  overline,
  heading,
  subheading,
  imageSrc,
  imageAlt = "",
  className,
}: PageHeroProps) {
  const locale = useLocale();
  const isRTL = locale === "he";

  return (
    <section
      className={cn(
        "relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden",
        className
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background image */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,14,12,0.6) 0%, rgba(15,14,12,0.9) 100%)",
            }}
          />
        </div>
      )}

      {/* Fallback gradient */}
      {!imageSrc && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #0F0E0C 0%, #1A1815 50%, #252220 100%)",
          }}
        />
      )}

      <div className="relative z-10 section-container">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-accent" />
          <span className="text-overline uppercase tracking-widest text-accent font-medium">
            {overline}
          </span>
        </div>
        <h1
          className="text-display-lg text-text-primary max-w-3xl"
          style={{
            fontFamily: isRTL
              ? "var(--font-frank-ruhl), serif"
              : "var(--font-cormorant), serif",
          }}
        >
          {heading}
        </h1>
        {subheading && (
          <p className="text-body-lg text-text-secondary mt-6 max-w-prose-sm">
            {subheading}
          </p>
        )}
      </div>
    </section>
  );
}
