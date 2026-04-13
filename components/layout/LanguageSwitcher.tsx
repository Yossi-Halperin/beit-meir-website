"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "header" | "footer";
}

export default function LanguageSwitcher({
  className,
  variant = "header",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;
    // Replace the current locale prefix with the new one
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  if (variant === "footer") {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <button
          onClick={() => switchLocale("he")}
          className={cn(
            "text-caption transition-colors duration-300",
            locale === "he"
              ? "text-accent"
              : "text-text-tertiary hover:text-text-secondary"
          )}
          aria-label="Switch to Hebrew"
        >
          עברית
        </button>
        <span className="text-border-strong text-caption">|</span>
        <button
          onClick={() => switchLocale("en")}
          className={cn(
            "text-caption transition-colors duration-300",
            locale === "en"
              ? "text-accent"
              : "text-text-tertiary hover:text-text-secondary"
          )}
          aria-label="Switch to English"
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => switchLocale("he")}
        className={cn(
          "text-[0.8rem] font-medium tracking-wide transition-colors duration-300",
          locale === "he"
            ? "text-accent"
            : "text-text-tertiary hover:text-text-secondary"
        )}
        aria-label="Switch to Hebrew"
        dir="rtl"
      >
        עברית
      </button>
      <span className="text-border-strong text-xs">|</span>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "text-[0.8rem] font-medium tracking-wide transition-colors duration-300",
          locale === "en"
            ? "text-accent"
            : "text-text-tertiary hover:text-text-secondary"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
