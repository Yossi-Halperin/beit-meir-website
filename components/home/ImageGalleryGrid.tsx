import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// Unsplash placeholder images — TODO: Replace with real photography
const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
    alt: "Judean Hills forest — Jerusalem pine trees",
    className: "col-span-2 row-span-2",
    priority: true,
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Jerusalem stone wall detail",
    className: "col-span-1 row-span-1",
    priority: false,
  },
  {
    src: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&q=80",
    alt: "Olive grove golden hour",
    className: "col-span-1 row-span-1",
    priority: false,
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    alt: "Aerial view of Israeli hills at golden hour",
    className: "col-span-3 row-span-1",
    priority: false,
  },
];

export default function ImageGalleryGrid() {
  const locale = useLocale();
  const t = useTranslations("gallery");
  const isRTL = locale === "he";

  return (
    <section
      className="py-24 md:py-40 bg-bg-primary"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="section-container">
        {/* Section header */}
        <RevealOnScroll>
          <div className="flex items-center gap-3 mb-12">
            <div className="brass-rule" />
            <span className="overline-label">{t("overline")}</span>
          </div>
        </RevealOnScroll>

        {/* Asymmetric photo grid */}
        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-4 mb-16 aspect-[16/10]">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden ${img.className} group`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                  priority={img.priority}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Prose block */}
        <RevealOnScroll delay={0.2}>
          <div className="max-w-prose-sm mx-auto text-center">
            <h2
              className="text-display-md text-text-primary mb-8"
              style={{
                fontFamily: isRTL
                  ? "var(--font-frank-ruhl), serif"
                  : "var(--font-cormorant), serif",
              }}
            >
              {t("heading")}
            </h2>
            <div className="flex flex-col gap-5 text-body text-text-secondary leading-relaxed">
              <p>{t("para1")}</p>
              <p>{t("para2")}</p>
              <p>{t("para3")}</p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
