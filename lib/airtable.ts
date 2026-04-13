interface LeadRecord {
  name: string;
  phone: string;
  email: string;
  preferred_contact: string;
  interest?: string;
  locale?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  user_agent?: string;
}

export async function saveLeadToAirtable(lead: LeadRecord): Promise<void> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

  if (!apiKey || !baseId) {
    console.warn("[Airtable] Missing credentials — skipping Airtable write");
    return;
  }

  const response = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Name: lead.name,
          Phone: lead.phone,
          Email: lead.email,
          "Preferred Contact": lead.preferred_contact,
          Interest: lead.interest || "",
          Locale: lead.locale || "",
          "UTM Source": lead.utm_source || "",
          "UTM Medium": lead.utm_medium || "",
          "UTM Campaign": lead.utm_campaign || "",
          Referrer: lead.referrer || "",
          "User Agent": lead.user_agent || "",
          "Created At": new Date().toISOString(),
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Airtable error: ${response.status} — ${error}`);
  }
}
