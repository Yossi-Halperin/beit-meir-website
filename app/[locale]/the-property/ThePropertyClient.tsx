'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Watermark overlay component ───────────────────────────────────────────
function RenderingWatermark({ locale }: { locale: string }) {
  return (
    <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
      <span className="text-white/60 text-xs tracking-widest font-light bg-black/30 px-3 py-1 rounded-sm backdrop-blur-sm">
        {locale === 'he' ? "הדמיה בלבד / Artist's impression only" : "Artist's impression only / הדמיה בלבד"}
      </span>
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const renderings = [
  { src: '/images/property/render-01-aerial.jpg', labelHe: 'מבט אווירי — הוילה המוגמרת', labelEn: 'Aerial View — Completed Villa' },
  { src: '/images/property/render-02-front.jpg', labelHe: 'חזית הוילה — שעת הזהב', labelEn: 'Villa Facade — Golden Hour' },
  { src: '/images/property/render-03-pool.jpg', labelHe: 'בריכת האינפיניטי והטרסה', labelEn: 'Infinity Pool & Terrace' },
  { src: '/images/property/render-04-yard-day.jpg', labelHe: 'נוף מהחצר — אחר הצהריים', labelEn: 'Garden View — Afternoon' },
  { src: '/images/property/render-05-yard-sunset.jpg', labelHe: 'נוף מהחצר — שקיעה', labelEn: 'Garden View — Sunset' },
  { src: '/images/property/render-06-guest.jpg', labelHe: 'בית האורחים (בכפוף לאישור תכנוני)', labelEn: 'Guest Cabin (subject to planning approval)' },
];

const plans = [
  { src: '/images/plans/plan-page-09.jpg', labelHe: 'תכנית מגרש', labelEn: 'Site Plan' },
  { src: '/images/plans/plan-page-10.jpg', labelHe: 'תכנית קומת קרקע', labelEn: 'Ground Floor Plan' },
  { src: '/images/plans/plan-page-11.jpg', labelHe: 'תכנית קומה א׳', labelEn: 'First Floor Plan' },
  { src: '/images/plans/plan-page-12.jpg', labelHe: 'קומת מרתף + קומה ב׳', labelEn: 'Basement + Second Floor' },
  { src: '/images/plans/plan-page-13.jpg', labelHe: 'חתך A-A', labelEn: 'Section A-A' },
];

const programData = {
  public: [
    { he: 'חניה ל-2 רכבים', en: '2-car parking', sqm: 39 },
    { he: 'חדר שירות', en: 'Service room', sqm: 5 },
    { he: 'משרד', en: 'Office', sqm: 16 },
    { he: 'כניסה', en: 'Entrance hall', sqm: 8 },
    { he: 'מטבח (שולחן 8 אנשים)', en: 'Kitchen (8-person table)', sqm: 20 },
    { he: 'פינת אוכל ל-16', en: '16-person dining room', sqm: 15 },
    { he: 'סלון + פסנתר', en: 'Living room + piano', sqm: 50 },
    { he: 'אח', en: 'Fireplace', sqm: 10 },
    { he: 'חדר משפחה', en: 'Family room', sqm: 20 },
    { he: 'שירותי אורחים', en: 'Guest toilet', sqm: 4 },
    { he: 'מעלית', en: 'Elevator', sqm: 4 },
    { he: 'מדרגות', en: 'Stairs', sqm: 15 },
  ],
  private: [
    { he: 'חדר שינה ראשי + חדר רחצה + ארון', en: 'Master bedroom + bathroom + walk-in', sqm: 40 },
    { he: 'חדר משפחה', en: 'Family room', sqm: 20 },
    { he: 'חדר שינה (נתן)', en: "Bedroom (Natan's)", sqm: 16 },
    { he: 'חדר רחצה', en: 'Bathroom', sqm: 6 },
    { he: 'חדר שינה (אליהו, שרה, שמואל)', en: 'Bedroom (Eliyahu, Sara, Shmuel)', sqm: 25 },
    { he: 'חדר רחצה', en: 'Bathroom', sqm: 6 },
    { he: 'מדרגות', en: 'Stairs', sqm: 15 },
    { he: 'מעלית', en: 'Elevator', sqm: 4 },
  ],
  service: [
    { he: 'חדר שירות (כביסה וכו׳)', en: 'Service room (laundry, etc.)', sqm: 12 },
    { he: 'חדר אורחים', en: 'Guest room', sqm: 16 },
    { he: 'חדר עוזרת בית', en: 'Housemaid room', sqm: 16 },
    { he: 'מטבחון', en: 'Kitchenette', sqm: 8 },
    { he: 'ממ"ד', en: 'Safe room (Mamad)', sqm: 14 },
    { he: 'חדר משחקים', en: 'Playroom', sqm: 15 },
  ],
};

const factRows = [
  { labelHe: 'מיקום', labelEn: 'Location', valueHe: 'מושב בית מאיר, הרי יהודה', valueEn: 'Moshav Beit Meir, Judean Hills' },
  { labelHe: 'שטח מגרש', labelEn: 'Plot Size', valueHe: 'כ-2,500 מ"ר', valueEn: 'approx. 2,500 sqm' },
  { labelHe: 'שטח בנייה מאושר', labelEn: 'Approved Build Area', valueHe: '419 מ"ר (3 קומות)', valueEn: '419 sqm (3 levels)' },
  { labelHe: 'כיוון', labelEn: 'Orientation', valueHe: 'מדרון מערבי — שקיעה מלאה', valueEn: 'West-facing slope — full sunset' },
  { labelHe: 'גישה', labelEn: 'Access', valueHe: 'שני כניסות — עפר עליון + אספלט תחתון', valueEn: 'Two entrances — upper dirt + lower asphalt' },
  { labelHe: 'עצים קיימים', labelEn: 'Existing Trees', valueHe: '15+ עצים בוגרים לשימור', valueEn: '15+ mature trees to preserve' },
  { labelHe: 'אדריכל', labelEn: 'Architect', valueHe: 'לינברג רוזן אדריכלים', valueEn: 'Linenberg Rozen Architects' },
  { labelHe: 'מרחק מהכותל', labelEn: 'Distance to Western Wall', valueHe: '20 דקות נסיעה', valueEn: '20 minutes drive' },
  { labelHe: 'מרחק מירושלים', labelEn: 'Distance to Jerusalem', valueHe: '15 דקות', valueEn: '15 minutes' },
  { labelHe: 'בריכה', labelEn: 'Pool', valueHe: 'בריכת אינפיניטי 20×5 מ׳', valueEn: '20×5m infinity pool' },
];

// ─── Main Client Component ───────────────────────────────────────────────────
export default function ThePropertyClient({ locale }: { locale: string }) {
  const isHe = locale === 'he';
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState(0);

  return (
    <main className="bg-obsidian text-ivory min-h-screen" dir={isHe ? 'rtl' : 'ltr'}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/property/render-02-front.jpg"
            alt={isHe ? 'הנכס בבית מאיר' : 'The Property at Beit Meir'}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="text-brass tracking-[0.3em] uppercase text-xs mb-4 font-light">
              {isHe ? 'בית מאיר, הרי יהודה' : 'Beit Meir, Judean Hills'}
            </p>
            <h1 className="font-display text-5xl md:text-7xl text-ivory leading-tight mb-6">
              {isHe ? (
                <>הנכס<br /><span className="text-brass">שלך</span></>
              ) : (
                <>Your<br /><span className="text-brass">Property</span></>
              )}
            </h1>
            <p className="text-ivory/70 text-lg max-w-xl leading-relaxed">
              {isHe
                ? 'מגרש ייחודי על המדרון המערבי של מושב בית מאיר — עם תוכנית אדריכלית מאושרת ל-419 מ"ר, נוף פנורמי לשרון ולהרי יהודה, ו-20 דקות מהכותל.'
                : 'A unique plot on the western slope of Moshav Beit Meir — with an approved architectural plan for 419 sqm, panoramic views of the Sharon Plain and Judean Hills, 20 minutes from the Western Wall.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: FULL-BLEED PANORAMA ──────────────────────────────── */}
      <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
        <Image
          src="/images/property/property-view-panorama.jpg"
          alt={isHe ? 'הנוף הפנורמי מהנכס' : 'Panoramic view from the property'}
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <span className="text-white/80 text-xs tracking-[0.3em] uppercase bg-black/40 px-4 py-2 backdrop-blur-sm">
            {isHe ? 'הנוף האמיתי מהנכס' : 'Actual view from the property'}
          </span>
        </div>
      </section>

      {/* ── SECTION 3: DRONE + FACT TABLE ────────────────────────────────── */}
      <section className="py-20 container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: isHe ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/property/property-aerial-drone.png"
                alt={isHe ? 'צילום דרון של המגרש' : 'Aerial drone photo of the plot'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-ivory/40 text-xs mt-2 text-center tracking-widest uppercase">
              {isHe ? 'צילום דרון — המגרש הנוכחי' : 'Drone photo — Current plot'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isHe ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-brass tracking-[0.3em] uppercase text-xs mb-3 font-light">
              {isHe ? 'נתוני הנכס' : 'Property Details'}
            </p>
            <h2 className="font-display text-4xl text-ivory mb-8">
              {isHe ? 'כל מה שצריך לדעת' : 'Everything You Need to Know'}
            </h2>
            <div className="space-y-0 border-t border-brass/10">
              {factRows.map((row, i) => (
                <div key={i} className="grid grid-cols-2 py-3 border-b border-brass/10">
                  <span className="text-ivory/50 text-sm">{isHe ? row.labelHe : row.labelEn}</span>
                  <span className="text-ivory text-sm font-medium">{isHe ? row.valueHe : row.valueEn}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: SOFT GATE + RENDERINGS ───────────────────────────── */}
      <section className="py-20 bg-charcoal/30">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-brass tracking-[0.3em] uppercase text-xs mb-3 font-light">
              {isHe ? 'הדמיות אדריכליות' : 'Architectural Renderings'}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory">
              {isHe ? 'ראה את הבית שיכול להיות' : 'See the Home That Could Be'}
            </h2>
          </div>

          <div className="space-y-6">
            {renderings.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative group cursor-pointer overflow-hidden"
                onClick={() => setLightboxImg(r.src)}
              >
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={r.src}
                    alt={isHe ? r.labelHe : r.labelEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                  <RenderingWatermark locale={locale} />
                  <div className="absolute bottom-8 left-6 right-6">
                    <p className="text-ivory/80 text-sm tracking-wide">{isHe ? r.labelHe : r.labelEn}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 border border-white/40 rounded-sm flex items-center justify-center bg-black/30 backdrop-blur-sm">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: ARCHITECTURAL PLANS ──────────────────────────────── */}
      <section className="py-20 container mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <p className="text-brass tracking-[0.3em] uppercase text-xs mb-3 font-light">
            {isHe ? 'לינברג רוזן אדריכלים' : 'Linenberg Rozen Architects'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
            {isHe ? 'תוכניות אדריכליות' : 'Architectural Plans'}
          </h2>
          <p className="text-ivory/50 max-w-xl mx-auto text-sm leading-relaxed">
            {isHe
              ? 'ניתוח אתר מקצועי ותוכניות מפורטות שהוכנו על ידי משרד לינברג רוזן אדריכלים, ירושלים.'
              : 'Professional site analysis and detailed plans prepared by Linenberg Rozen Architects, Jerusalem.'}
          </p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 justify-center flex-wrap">
          {plans.map((p, i) => (
            <button
              key={i}
              onClick={() => setActivePlan(i)}
              className={`px-4 py-2 text-xs tracking-widest uppercase whitespace-nowrap transition-colors border ${
                activePlan === i
                  ? 'bg-brass text-obsidian border-brass'
                  : 'bg-transparent text-ivory/50 border-brass/20 hover:border-brass/50'
              }`}
            >
              {isHe ? p.labelHe : p.labelEn}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePlan}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full bg-white rounded-sm overflow-hidden cursor-pointer"
            onClick={() => setLightboxImg(plans[activePlan].src)}
          >
            <Image
              src={plans[activePlan].src}
              alt={isHe ? plans[activePlan].labelHe : plans[activePlan].labelEn}
              width={2000}
              height={1182}
              className="w-full h-auto"
              unoptimized
            />
            <div className="absolute bottom-3 right-3 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 border border-obsidian/40 rounded-sm flex items-center justify-center bg-white/70 backdrop-blur-sm">
                <svg className="w-4 h-4 text-obsidian" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-6">
          <a
            href="/documents/linenberg-rozen-study.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brass border border-brass/30 px-6 py-3 text-xs tracking-widest uppercase hover:bg-brass/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {isHe ? 'הורד תיק אדריכלי מלא (PDF)' : 'Download Full Architectural Study (PDF)'}
          </a>
        </div>
      </section>

      {/* ── SECTION 6: PROGRAM TABLE ─────────────────────────────────────── */}
      <section className="py-20 bg-charcoal/20">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-brass tracking-[0.3em] uppercase text-xs mb-3 font-light">
              {isHe ? 'תוכנית הבנייה' : 'Building Program'}
            </p>
            <h2 className="font-display text-4xl text-ivory">
              {isHe ? '419 מ"ר — 3 קומות' : '419 sqm — 3 Levels'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { titleHe: 'קומה ציבורית', titleEn: 'Public Level', total: 206, items: programData.public },
              { titleHe: 'קומה פרטית', titleEn: 'Private Level', total: 132, items: programData.private },
              { titleHe: 'קומת שירות', titleEn: 'Service Level', total: 81, items: programData.service },
            ].map((level, li) => (
              <div key={li} className="border border-brass/10 p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-brass/20">
                  <h3 className="font-display text-xl text-brass">{isHe ? level.titleHe : level.titleEn}</h3>
                  <span className="text-ivory/50 text-sm">{level.total} m²</span>
                </div>
                <div className="space-y-2">
                  {level.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-ivory/70">{isHe ? item.he : item.en}</span>
                      <span className="text-ivory/40">{item.sqm}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-brass/10 p-6">
            <h3 className="font-display text-xl text-brass mb-4">{isHe ? 'חוץ' : 'Outdoor'}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { he: 'בריכת שחייה 20×5 מ׳', en: '20×5m swimming pool' },
                { he: 'מגרש כדורסל', en: 'Basketball court' },
                { he: 'מטבח חוץ', en: 'Outdoor kitchen' },
                { he: 'דק עץ', en: 'Wood decking' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-ivory/70">
                  <span className="w-1 h-1 bg-brass rounded-full flex-shrink-0" />
                  {isHe ? item.he : item.en}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: ZONING REALITY ────────────────────────────────────── */}
      <section className="py-20 container mx-auto px-6 lg:px-16 max-w-3xl text-center">
        <p className="text-brass tracking-[0.3em] uppercase text-xs mb-6 font-light">
          {isHe ? 'מציאות תכנונית' : 'Planning Reality'}
        </p>
        <blockquote className="font-display text-3xl md:text-4xl text-ivory leading-snug mb-8">
          {isHe
            ? '"קרקע במושב כזה לא עומדת בשוק החופשי."'
            : '"Land in a moshav like this does not come to the open market."'}
        </blockquote>
        <p className="text-ivory/60 leading-relaxed text-base">
          {isHe
            ? 'מושב בית מאיר הוא ישוב חקלאי שיתופי. רוב הקרקעות בו מוחזקות על ידי המינהל ומשפחות ותיקות. הזדמנות לרכוש מגרש בנוי עם תוכנית אדריכלית מאושרת — נדירה ביותר. זוהי אחת מהן.'
            : 'Moshav Beit Meir is a cooperative agricultural village. Most of its land is held by the Israel Land Authority and longstanding families. The opportunity to acquire a buildable plot with an approved architectural plan is exceptionally rare. This is one of them.'}
        </p>
        <p className="text-ivory/40 text-xs mt-6 leading-relaxed max-w-lg mx-auto">
          {isHe
            ? '* הדמיות לצורך המחשה בלבד. כל הבנייה כפופה לאישורי הרשויות המוסמכות. בית האורחים כפוף לאישור תכנוני נפרד.'
            : '* Renderings for illustration purposes only. All construction subject to approval by competent authorities. Guest cabin subject to separate planning approval.'}
        </p>
      </section>

      {/* ── SECTION 8: CTA ───────────────────────────────────────────────── */}
      <section className="py-24 bg-charcoal/40 border-t border-brass/10">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <p className="text-brass tracking-[0.3em] uppercase text-xs mb-4 font-light">
            {isHe ? 'הצעד הבא' : 'Next Step'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory mb-4">
            {isHe ? 'מוכן לשיחה?' : 'Ready to Talk?'}
          </h2>
          <p className="text-ivory/60 mb-10 max-w-md mx-auto">
            {isHe
              ? 'לתיאום ביקור בנכס, שיחת ייעוץ, או לקבלת מידע נוסף — צור קשר ישיר.'
              : 'To schedule a property visit, consultation call, or receive further information — contact us directly.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/972501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-[#20bd5a] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="tel:+972501234567"
              className="inline-flex items-center justify-center gap-3 border border-brass text-brass px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-brass/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
              </svg>
              {isHe ? 'התקשר' : 'Call'}
            </a>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImg(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-6xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={lightboxImg}
                alt="Full view"
                width={2000}
                height={1200}
                className="w-full h-auto max-h-[85vh] object-contain"
                unoptimized
              />
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 w-10 h-10 border border-white/30 rounded-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors bg-black/40 text-xl"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
