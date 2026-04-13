"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("cookie_consent");

  useEffect(() => {
    const consent = sessionStorage.getItem("cookie-consent");
    if (!consent) {
      // Show after 3 seconds
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary border-t border-border"
        >
          <div className="section-container py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-caption text-text-tertiary">{t("text")}</p>
            <div className="flex items-center gap-4 shrink-0">
              <button
                onClick={handleDecline}
                className="text-caption text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {t("decline")}
              </button>
              <button
                onClick={handleAccept}
                className="text-caption text-accent hover:text-accent-hover transition-colors font-medium"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
