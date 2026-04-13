import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import {
  Frank_Ruhl_Libre,
  Heebo,
  Cormorant_Garamond,
  Inter,
} from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import CookieConsent from "@/components/ui/CookieConsent";
import { HomeJsonLd } from "@/components/seo/JsonLd";
import { PlausibleAnalytics, MetaPixel } from "@/components/seo/Analytics";
import "@/app/globals.css";

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "700"],
  variable: "--font-frank-ruhl",
  display: "swap",
  preload: true,
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500"],
  variable: "--font-heebo",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.home" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beit-meir.co.il";

  return {
    title: {
      default: t("title"),
      template: `%s | ${locale === "he" ? "מושב בית מאיר" : "Moshav Beit Meir"}`,
    },
    description: t("description"),
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName: locale === "he" ? "מושב בית מאיר" : "Moshav Beit Meir",
      images: [
        {
          url: "/images/og/og-home.jpg",
          width: 1200,
          height: 630,
          alt: locale === "he" ? "מושב בית מאיר — קרקעות יוקרה בהרי ירושלים" : "Moshav Beit Meir — Luxury Land in the Judean Hills",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        he: "/he",
        en: "/en",
        "x-default": "/he",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const isRTL = locale === "he";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${frankRuhl.variable} ${heebo.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Preload hero display font for Hebrew — spec §10 */}
        {isRTL && (
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/frankruhllibre/v14/j8_y6-zQ3rXpceZj9cqnVhF5NH-iDy_qMkA.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        )}
        {/* Preload hero poster image */}
        <link
          rel="preload"
          href="/images/hero-poster.jpg"
          as="image"
          type="image/jpeg"
        />
        {/* Schema.org JSON-LD — spec §9.3 */}
        <HomeJsonLd locale={locale} />
        {/* Plausible Analytics — spec §3, deferred */}
        <PlausibleAnalytics />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <CookieConsent />
          {/* Meta Pixel — deferred after interaction or 3s — spec §10 */}
          <MetaPixel />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
