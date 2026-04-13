import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { saveLeadToAirtable } from "@/lib/airtable";
import { sendLeadEmail } from "@/lib/resend";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

// Simple in-memory rate limiter (per IP, 5 per hour)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true;
  }

  if (entry.count >= 5) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests" },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json();

    // Honeypot check — if 'website' field is filled, silently discard
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    // Validate with zod
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const lead = parsed.data;
    const userAgent = request.headers.get("user-agent") || "";

    // Parallel writes — each wrapped in try/catch so one failure doesn't break others
    await Promise.allSettled([
      (async () => {
        try {
          await saveLeadToAirtable({
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            preferred_contact: lead.preferred_contact,
            interest: lead.interest,
            locale: lead.locale,
            utm_source: lead.utm_source,
            utm_medium: lead.utm_medium,
            utm_campaign: lead.utm_campaign,
            referrer: lead.referrer,
            user_agent: userAgent,
          });
        } catch (err) {
          console.error("[Lead API] Airtable error:", err);
        }
      })(),
      (async () => {
        try {
          await sendLeadEmail({
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            preferred_contact: lead.preferred_contact,
            interest: lead.interest,
            locale: lead.locale,
          });
        } catch (err) {
          console.error("[Lead API] Resend error:", err);
        }
      })(),
      (async () => {
        try {
          await sendWhatsAppNotification({
            name: lead.name,
            phone: lead.phone,
            preferred_contact: lead.preferred_contact,
          });
        } catch (err) {
          console.error("[Lead API] WhatsApp error:", err);
        }
      })(),
    ]);

    // Always return 200 — don't expose internal errors to client
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Lead API] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
