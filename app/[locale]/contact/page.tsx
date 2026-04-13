import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import LeadForm from "@/components/lead/LeadForm";

export function generateStaticParams() {
  return [{ locale: "he" }, { locale: "en" }];
}


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = (messages as any).contact_page;
  const isRTL = locale === "he";

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972500000000";
  const whatsappMsg = encodeURIComponent(
    isRTL
      ? "שלום, אני מעוניין לקבל פרטים על רכישת קרקע במושב בית מאיר."
      : "Hello, I am interested in receiving details about land acquisition in Moshav Beit Meir."
  );

  return (
    <>
      <PageHero
        overline={t.hero_overline}
        heading={t.hero_heading}
        subheading={t.hero_subheading}
      />

      <section
        className="py-20 md:py-32 bg-bg-primary"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Form */}
            <RevealOnScroll direction={isRTL ? "right" : "left"}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-px bg-accent" />
                  <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                    {t.form_overline}
                  </span>
                </div>
                <h2
                  className="text-display-md text-text-primary mb-8"
                  style={{
                    fontFamily: isRTL
                      ? "var(--font-frank-ruhl), serif"
                      : "var(--font-cormorant), serif",
                  }}
                >
                  {t.form_heading}
                </h2>
                <div className="bg-bg-secondary border border-border p-8">
                  <LeadForm variant="full" />
                </div>
              </div>
            </RevealOnScroll>

            {/* Right: Contact info */}
            <RevealOnScroll direction={isRTL ? "left" : "right"} delay={0.2}>
              <div className="flex flex-col gap-12">
                {/* Contact details */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-accent" />
                    <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                      {t.info_overline}
                    </span>
                  </div>

                  <div className="flex flex-col gap-6">
                    {/* Phone */}
                    <div>
                      <div className="text-overline uppercase tracking-widest text-accent font-medium text-xs mb-2">
                        {t.phone_label}
                      </div>
                      <a
                        href={`tel:${process.env.NEXT_PUBLIC_PHONE || "+972500000000"}`}
                        className="text-body-lg text-text-primary hover:text-accent transition-colors duration-300"
                        dir="ltr"
                      >
                        {process.env.NEXT_PUBLIC_PHONE || "TBD"}
                      </a>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <div className="text-overline uppercase tracking-widest text-accent font-medium text-xs mb-2">
                        WhatsApp
                      </div>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-body-lg text-text-primary hover:text-accent transition-colors duration-300"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-accent"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {t.whatsapp_cta}
                      </a>
                    </div>

                    {/* Email */}
                    <div>
                      <div className="text-overline uppercase tracking-widest text-accent font-medium text-xs mb-2">
                        {t.email_label}
                      </div>
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_EMAIL || "info@beit-meir.co.il"}`}
                        className="text-body-lg text-text-primary hover:text-accent transition-colors duration-300"
                        dir="ltr"
                      >
                        {process.env.NEXT_PUBLIC_EMAIL || "info@beit-meir.co.il"}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-border" />

                {/* Process steps */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-px bg-accent" />
                    <span className="text-overline uppercase tracking-widest text-accent font-medium text-xs">
                      {t.process_overline}
                    </span>
                  </div>
                  <div className="flex flex-col gap-6">
                    {t.process_steps.map(
                      (step: { num: string; title: string; body: string }, i: number) => (
                        <div key={i} className="flex gap-4 items-start">
                          <div className="text-accent font-medium text-sm min-w-[24px]">
                            {step.num}
                          </div>
                          <div>
                            <div className="text-body text-text-primary font-medium mb-1">
                              {step.title}
                            </div>
                            <div className="text-caption text-text-secondary">
                              {step.body}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
