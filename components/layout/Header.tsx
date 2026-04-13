"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");
  const isRTL = locale === "he";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/location`, label: t("location") },
    { href: `/${locale}/the-property`, label: isRTL ? 'הנכס' : 'The Property' },
    { href: `/${locale}/lifestyle`, label: t("lifestyle") },
    { href: `/${locale}/community`, label: t("community") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-primary/95 backdrop-dark border-b border-accent/20 py-4"
            : "bg-transparent py-6"
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="text-heading font-frank-ruhl text-text-primary hover:text-accent transition-colors duration-300"
              style={{ fontFamily: "var(--font-frank-ruhl), serif" }}
            >
              בית מאיר
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-caption text-text-secondary hover:text-accent transition-colors duration-300 tracking-wide uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: lang + CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <LanguageSwitcher />
              <Link
                href={`/${locale}/contact`}
                className="btn-primary text-xs py-3 px-6"
              >
                {t("cta")}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <div className="flex lg:hidden items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => setMobileOpen(true)}
                className="text-text-primary hover:text-accent transition-colors duration-300"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-bg-primary flex flex-col"
          >
            <div className="section-container py-6 flex justify-between items-center">
              <Link
                href={`/${locale}`}
                onClick={() => setMobileOpen(false)}
                className="text-heading font-frank-ruhl text-text-primary"
                style={{ fontFamily: "var(--font-frank-ruhl), serif" }}
              >
                בית מאיר
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-primary hover:text-accent transition-colors duration-300"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav
              className="flex flex-col justify-center flex-1 section-container gap-2"
              dir={isRTL ? "rtl" : "ltr"}
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-display-md text-text-primary hover:text-accent transition-colors duration-300 py-3 border-b border-border"
                    style={{ fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  {t("cta")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
