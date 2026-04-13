import { useLocale, useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// Minimal line icons — brass colored
const icons = {
  community: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  education: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  nature: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V12" />
      <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      <path d="M12 12a5 5 0 0 0 5-5c0-2-1.5-3.5-3-4.5a5 5 0 0 0-4 0C8.5 3.5 7 5 7 7a5 5 0 0 0 5 5z" />
    </svg>
  ),
};

interface Pillar {
  title: string;
  body: string;
}

export default function PillarsGrid() {
  const locale = useLocale();
  const t = useTranslations("community");
  const isRTL = locale === "he";
  const pillars: Pillar[] = t.raw("pillars") as Pillar[];
  const iconKeys = ["community", "education", "nature"] as const;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {pillars.map((pillar, i) => (
        <RevealOnScroll key={i} delay={0.15 * i}>
          <div className="flex flex-col gap-4 p-6 border border-border hover:border-accent/30 transition-colors duration-500 bg-bg-secondary/50">
            {/* Icon */}
            <div className="text-accent w-6 h-6">
              {icons[iconKeys[i]]}
            </div>

            {/* Heading */}
            <h3
              className="text-subheading text-text-primary"
              style={{
                fontFamily: isRTL
                  ? "var(--font-frank-ruhl), serif"
                  : "var(--font-cormorant), serif",
              }}
            >
              {pillar.title}
            </h3>

            {/* Body */}
            <p className="text-caption text-text-secondary leading-relaxed">
              {pillar.body}
            </p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
