import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const isRTL = locale === "he";

  const navLinks = [
    { href: `/${locale}/about`, label: nav("about") },
    { href: `/${locale}/location`, label: nav("location") },
    { href: `/${locale}/lifestyle`, label: nav("lifestyle") },
    { href: `/${locale}/community`, label: nav("community") },
    { href: `/${locale}/contact`, label: nav("contact") },
    { href: `/${locale}/privacy`, label: t("privacy") },
  ];

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972500000000";
  const whatsappMsg = encodeURIComponent(
    locale === "he"
      ? "שלום, אני מעוניין לקבל פרטים על רכישת קרקע במושב בית מאיר."
      : "Hello, I am interested in receiving details about land acquisition in Moshav Beit Meir."
  );

  return (
    <footer className="bg-bg-secondary border-t border-border" dir={isRTL ? "rtl" : "ltr"}>
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Brand */}
          <div>
            <div
              className="text-display-md text-text-primary mb-3"
              style={{ fontFamily: isRTL ? "var(--font-frank-ruhl), serif" : "var(--font-cormorant), serif" }}
            >
              בית מאיר
            </div>
            <p className="text-caption text-text-tertiary leading-relaxed">
              {t("tagline")}
            </p>
            <div className="mt-6 w-8 h-px bg-accent" />
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="overline-label mb-6">{t("links_heading")}</div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-caption text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Contact */}
          <div>
            <div className="overline-label mb-6">{t("contact_heading")}</div>
            <div className="flex flex-col gap-4">
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+972500000000"}`}
                className="text-caption text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2"
                dir="ltr"
              >
                <span className="text-accent text-xs uppercase tracking-wider">{t("phone")}</span>
                <span>{process.env.NEXT_PUBLIC_PHONE || "TBD"}</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-accent text-xs uppercase tracking-wider">WhatsApp</span>
                <span>{process.env.NEXT_PUBLIC_PHONE || "TBD"}</span>
              </a>
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "info@beit-meir.co.il"}`}
                className="text-caption text-text-secondary hover:text-accent transition-colors duration-300 flex items-center gap-2"
              >
                <span className="text-accent text-xs uppercase tracking-wider">{t("email")}</span>
                <span>{process.env.NEXT_PUBLIC_EMAIL || "info@beit-meir.co.il"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-border">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <p className="text-caption text-text-tertiary">{t("copyright")}</p>
              <LanguageSwitcher variant="footer" />
            </div>
            <p className="text-caption text-text-tertiary max-w-prose-sm leading-relaxed">
              {t("disclaimer")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
