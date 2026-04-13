interface LeadEmailData {
  name: string;
  phone: string;
  email: string;
  preferred_contact: string;
  interest?: string;
  locale?: string;
}

export async function sendLeadEmail(lead: LeadEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "leads@beit-meir.co.il";
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.warn("[Resend] Missing credentials — skipping email");
    return;
  }

  const preferredMap: Record<string, string> = {
    whatsapp: "WhatsApp",
    phone: "שיחה טלפונית",
    email: "דואר אלקטרוני",
  };

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #0F0E0C; color: #F5F1EA; padding: 24px; }
    .card { background: #1A1815; border: 1px solid #2A2622; border-radius: 4px; padding: 24px; max-width: 480px; margin: 0 auto; }
    .label { color: #B8924A; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px; }
    .value { color: #F5F1EA; font-size: 16px; margin-bottom: 16px; }
    h1 { color: #B8924A; font-size: 24px; margin-bottom: 24px; }
    .divider { border: none; border-top: 1px solid #2A2622; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="card">
    <h1>🔔 ליד חדש מבית מאיר — ${lead.name}</h1>
    <hr class="divider" />
    <div class="label">שם מלא</div>
    <div class="value">${lead.name}</div>
    <div class="label">טלפון</div>
    <div class="value">${lead.phone}</div>
    <div class="label">דואר אלקטרוני</div>
    <div class="value">${lead.email}</div>
    <div class="label">אופן יצירת קשר מועדף</div>
    <div class="value">${preferredMap[lead.preferred_contact] || lead.preferred_contact}</div>
    ${
      lead.interest
        ? `<div class="label">מה מעניין אותם</div><div class="value">${lead.interest}</div>`
        : ""
    }
    <div class="label">שפה</div>
    <div class="value">${lead.locale === "en" ? "English" : "עברית"}</div>
    <hr class="divider" />
    <div style="color: #8A8275; font-size: 12px;">נשלח מ-beit-meir.co.il · ${new Date().toLocaleString("he-IL")}</div>
  </div>
</body>
</html>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `🔔 ליד חדש מבית מאיר — ${lead.name}`,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend error: ${response.status} — ${error}`);
  }
}
