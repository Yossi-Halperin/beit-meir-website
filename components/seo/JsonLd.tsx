// JSON-LD structured data components for Schema.org
// Spec §9.3: RealEstateListing, Organization, BreadcrumbList

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface JsonLdProps {
  locale: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function HomeJsonLd({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://beit-meir.co.il";
  const isHe = locale === "he";

  const realEstateListing = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: isHe ? "מושב בית מאיר — קרקעות יוקרה" : "Moshav Beit Meir — Luxury Land",
    description: isHe
      ? "הזדמנות נדירה לרכישת קרקע במושב דתי יוקרתי, 20 דקות מירושלים, בלב יער הקדושים."
      : "A rare opportunity to acquire land in an exclusive religious moshav, 20 minutes from Jerusalem, in the heart of the Martyrs' Forest.",
    url: `${baseUrl}/${locale}`,
    image: `${baseUrl}/images/og/og-home.jpg`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.7898,
      longitude: 35.0356,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: isHe ? "מושב בית מאיר" : "Moshav Beit Meir",
      addressRegion: isHe ? "הרי ירושלים" : "Judean Hills",
      addressCountry: "IL",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/LimitedAvailability",
      priceCurrency: "ILS",
      description: isHe
        ? "פרטים על מחיר זמינים לאחר יצירת קשר אישי בלבד"
        : "Price details available upon personal inquiry only",
    },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: isHe ? "בית מאיר" : "Beit Meir",
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/images/og/og-home.jpg`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["Hebrew", "English"],
      email: "info@beit-meir.co.il",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: isHe ? "מושב בית מאיר" : "Moshav Beit Meir",
      addressRegion: isHe ? "הרי ירושלים" : "Judean Hills",
      addressCountry: "IL",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateListing) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  locale,
  breadcrumbs,
}: JsonLdProps & { breadcrumbs: BreadcrumbItem[] }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
