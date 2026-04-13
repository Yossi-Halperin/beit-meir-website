interface WhatsAppLeadData {
  name: string;
  phone: string;
  preferred_contact: string;
}

export async function sendWhatsAppNotification(
  lead: WhatsAppLeadData
): Promise<void> {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  const phone = process.env.CALLMEBOT_PHONE;

  if (!apiKey || !phone) {
    console.warn("[CallMeBot] Missing credentials — skipping WhatsApp ping");
    return;
  }

  const preferredMap: Record<string, string> = {
    whatsapp: "WA",
    phone: "Phone",
    email: "Email",
  };

  const message = encodeURIComponent(
    `ליד חדש: ${lead.name} | ${lead.phone} | מעדיף: ${preferredMap[lead.preferred_contact] || lead.preferred_contact}`
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`CallMeBot error: ${response.status}`);
  }
}
