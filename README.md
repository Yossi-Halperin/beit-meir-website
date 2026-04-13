# בית מאיר — Beit Meir Website

A world-class luxury marketing website for Moshav Beit Meir, targeting religious high-net-worth families seeking land in the Judean Hills, 20 minutes from Jerusalem.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · next-intl · react-hook-form · Zod

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Yossi-Halperin/beit-meir-website.git
cd beit-meir-website
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in all values:

```bash
cp .env.local.example .env.local
```

See `.env.local.example` for full documentation of each variable.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site defaults to `/he` (Hebrew).

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
beit-meir/
├── app/
│   ├── [locale]/          # All pages (he + en)
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── location/
│   │   ├── lifestyle/
│   │   ├── community/
│   │   ├── contact/
│   │   └── privacy/
│   ├── api/lead/          # Lead form API route
│   ├── sitemap.ts         # Auto-generated sitemap
│   └── robots.ts          # robots.txt
├── components/
│   ├── layout/            # Header, Footer, LanguageSwitcher
│   ├── home/              # All home page sections
│   ├── ui/                # Reusable UI components
│   ├── lead/              # Lead form
│   ├── map/               # Mapbox components
│   ├── distance/          # Distance list & table
│   └── seo/               # JSON-LD, Analytics
├── messages/
│   ├── he.json            # All Hebrew copy
│   └── en.json            # All English copy
├── content/
│   ├── distances.json     # 8 destinations data
│   └── pillars.json       # Community pillars
├── public/
│   ├── images/            # Local images
│   └── videos/            # Hero video placeholder
├── lib/                   # Airtable, Resend, WhatsApp, validation
├── .env.local.example     # Environment variables template
├── TODO.md                # What Yossi must provide before launch
└── photography-brief.md   # Photography art direction
```

---

## i18n

The site is fully bilingual:

| Language | URL | Direction |
|----------|-----|-----------|
| Hebrew (default) | `/he/...` | RTL |
| English | `/en/...` | LTR |

All copy lives in `messages/he.json` and `messages/en.json`. The language switcher preserves the current page (e.g., `/he/location` ↔ `/en/location`).

---

## Lead Form

The form at `/he/contact` and `/en/contact` (and inline on the home page) submits to `/api/lead`, which:

1. Validates with Zod (server-side)
2. Checks honeypot field
3. Rate-limits by IP (5 submissions/hour)
4. Writes to Airtable
5. Sends email notification via Resend
6. Sends WhatsApp ping via CallMeBot

All integrations are optional — the form still works if API keys are missing (graceful degradation).

---

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import `beit-meir-website`
3. Framework: **Next.js** (auto-detected)
4. Add all environment variables from `.env.local.example`
5. Deploy

### Custom Domain

In Vercel project settings → Domains:
- Add `beit-meir.co.il` → primary (redirects to `/he`)
- Add `beit-meir.com` → redirects to `/en`

---

## Before Launch Checklist

See `TODO.md` for the complete list of what must be provided before the site goes live.

---

*Built by Manus · April 2026 · Architect: Claude (Yossi's project)*
