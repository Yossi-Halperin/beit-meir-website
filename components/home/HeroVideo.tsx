"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

export default function HeroVideo() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const isRTL = locale === "he";

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ minHeight: "700px" }}
      aria-label={isRTL ? "גיבור האתר" : "Hero section"}
    >
      {/* Background video / image */}
      <div className="absolute inset-0 z-0">
        {/* TODO: Replace with Bunny.net video URL */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
        >
          {/* Placeholder: will be replaced with actual drone footage */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,14,12,0.4) 0%, rgba(15,14,12,0.85) 100%)",
          }}
        />
        {/* Fallback gradient when no video */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(135deg, #0F0E0C 0%, #1A1815 40%, #252220 70%, #2D3320 100%)",
          }}
        />
      </div>

      {/* Content — bottom-aligned 25% from bottom */}
      <div className="relative z-10 section-container pb-[25vh] pt-32">
        <motion.div
          className={`flex flex-col gap-6 max-w-3xl ${isRTL ? "items-end text-right" : "items-start text-left"}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="overline-label">{t("overline")}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-display-xl text-text-primary leading-[1.05]"
            style={{
              fontFamily: isRTL
                ? "var(--font-frank-ruhl), serif"
                : "var(--font-cormorant), serif",
              fontWeight: 700,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t("headline1")}
            <br />
            <span className="text-accent">{t("headline2")}</span>
            {t("headline3")}
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            className="text-body-lg text-text-secondary max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            {t("subline")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <Link href={`/${locale}/contact`} className="btn-primary">
              {t("cta_primary")}
            </Link>
            <Link href={`/${locale}/about`} className="btn-ghost">
              {t("cta_secondary")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
