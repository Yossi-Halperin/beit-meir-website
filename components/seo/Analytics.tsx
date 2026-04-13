"use client";
// Spec §3 & §10: Plausible + Meta Pixel, deferred after interaction or 3s timeout
// Plausible: privacy-friendly, no cookie banner needed
// Meta Pixel: deferred, loaded only after cookie consent

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function PlausibleAnalytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;

    // Deferred load — after 3s or first user interaction
    const loadPixel = () => {
      if (window.fbq) return; // already loaded

      // Inline Meta Pixel init
      const n = function (...args: unknown[]) {
        (n as unknown as { q: unknown[] }).q = (n as unknown as { q: unknown[] }).q || [];
        (n as unknown as { q: unknown[] }).q.push(args);
      };
      (n as unknown as { q: unknown[] }).q = [];
      (n as unknown as { loaded: boolean }).loaded = true;
      (n as unknown as { version: string }).version = "2.0";
      window.fbq = n as (...args: unknown[]) => void;
      window._fbq = n;

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(script);

      window.fbq("init", pixelId);
      window.fbq("track", "PageView");
    };

    const timer = setTimeout(loadPixel, 3000);
    const events = ["mousedown", "touchstart", "keydown", "scroll"];
    const onInteraction = () => {
      clearTimeout(timer);
      loadPixel();
      events.forEach((e) => window.removeEventListener(e, onInteraction));
    };
    events.forEach((e) => window.addEventListener(e, onInteraction, { passive: true }));

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, onInteraction));
    };
  }, [pixelId]);

  return null;
}
