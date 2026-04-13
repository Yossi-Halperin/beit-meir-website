import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface SectionHeadingProps {
  overline?: string;
  heading: string;
  subheading?: string;
  align?: "start" | "center" | "end";
  size?: "lg" | "md" | "sm";
  className?: string;
  accentWord?: string;
}

export default function SectionHeading({
  overline,
  heading,
  subheading,
  align = "start",
  size = "md",
  className,
  accentWord,
}: SectionHeadingProps) {
  const locale = useLocale();
  const isRTL = locale === "he";

  const alignClass = {
    start: isRTL ? "text-right" : "text-left",
    center: "text-center",
    end: isRTL ? "text-left" : "text-right",
  }[align];

  const headingSize = {
    lg: "text-display-lg",
    md: "text-display-md",
    sm: "text-heading",
  }[size];

  const fontFamily = isRTL
    ? "var(--font-frank-ruhl), serif"
    : "var(--font-cormorant), serif";

  // Render heading with optional accent word
  const renderHeading = () => {
    if (!accentWord) return heading;
    const parts = heading.split(accentWord);
    if (parts.length < 2) return heading;
    return (
      <>
        {parts[0]}
        <span className="text-accent">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={cn("flex flex-col gap-4", alignClass, className)}>
      {overline && (
        <div className="flex items-center gap-3" style={{ justifyContent: align === "center" ? "center" : undefined }}>
          {align !== "center" && !isRTL && <div className="brass-rule" />}
          <span className="overline-label">{overline}</span>
          {align !== "center" && isRTL && <div className="brass-rule" />}
          {align === "center" && <div className="brass-rule" />}
        </div>
      )}
      <h2
        className={cn(headingSize, "text-text-primary")}
        style={{ fontFamily }}
      >
        {renderHeading()}
      </h2>
      {subheading && (
        <p className="text-body-lg text-text-secondary max-w-prose-sm">
          {subheading}
        </p>
      )}
    </div>
  );
}
