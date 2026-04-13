import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(
      /^(\+972|972|0)(5[0-9]|[23489])[0-9]{7}$/,
      "Invalid Israeli phone number"
    ),
  email: z.string().email("Invalid email address"),
  preferred_contact: z.enum(["whatsapp", "phone", "email"]),
  interest: z.string().max(500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Consent is required" }),
  }),
  // Honeypot — must be empty
  website: z.string().max(0).optional(),
  // UTM / meta
  locale: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  referrer: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;
