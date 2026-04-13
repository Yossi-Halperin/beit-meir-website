"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  email: z.string().email(),
  preferred_contact: z.enum(["whatsapp", "phone", "email"]),
  interest: z.string().max(500).optional(),
  consent: z.boolean().refine((v) => v === true),
  website: z.string().max(0).optional(), // honeypot
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  variant?: "inline" | "full";
  className?: string;
}

export default function LeadForm({ variant = "inline", className }: LeadFormProps) {
  const locale = useLocale();
  const t = useTranslations("lead_form");
  const isRTL = locale === "he";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferred_contact: "whatsapp",
    },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          locale,
          referrer: typeof window !== "undefined" ? document.referrer : "",
          utm_source:
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("utm_source") || ""
              : "",
          utm_medium:
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("utm_medium") || ""
              : "",
          utm_campaign:
            typeof window !== "undefined"
              ? new URLSearchParams(window.location.search).get("utm_campaign") || ""
              : "",
        }),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError(
        isRTL
          ? "אירעה שגיאה. אנא נסו שנית או צרו קשר ישיר."
          : "An error occurred. Please try again or contact us directly."
      );
    }
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "972500000000";
  const whatsappMsg = encodeURIComponent(
    isRTL
      ? "שלום, אני מעוניין לקבל פרטים על רכישת קרקע במושב בית מאיר."
      : "Hello, I am interested in receiving details about land acquisition in Moshav Beit Meir."
  );

  if (submitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center text-center gap-6 py-16",
          className
        )}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="w-12 h-px bg-accent mx-auto" />
        <h3
          className="text-display-md text-text-primary"
          style={{
            fontFamily: isRTL
              ? "var(--font-frank-ruhl), serif"
              : "var(--font-cormorant), serif",
          }}
        >
          {t("success.heading")}
        </h3>
        <p className="text-body-lg text-text-secondary">{t("success.body")}</p>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-2 flex items-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {t("success.whatsapp_cta")}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      dir={isRTL ? "rtl" : "ltr"}
      noValidate
    >
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name */}
      <div className="flex flex-col gap-2">
        <label className="overline-label text-accent/80">
          {t("fields.name")}
        </label>
        <input
          type="text"
          {...register("name")}
          placeholder={t("fields.name_placeholder")}
          className={cn("input-base", errors.name && "border-error")}
          autoComplete="name"
        />
        {errors.name && (
          <span className="text-caption text-error">{t("errors.name_min")}</span>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="overline-label text-accent/80">
          {t("fields.phone")}
        </label>
        <input
          type="tel"
          {...register("phone")}
          placeholder={t("fields.phone_placeholder")}
          className={cn("input-base", errors.phone && "border-error")}
          dir="ltr"
          autoComplete="tel"
        />
        {errors.phone && (
          <span className="text-caption text-error">{t("errors.phone_invalid")}</span>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="overline-label text-accent/80">
          {t("fields.email")}
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder={t("fields.email_placeholder")}
          className={cn("input-base", errors.email && "border-error")}
          dir="ltr"
          autoComplete="email"
        />
        {errors.email && (
          <span className="text-caption text-error">{t("errors.email_invalid")}</span>
        )}
      </div>

      {/* Preferred contact */}
      <div className="flex flex-col gap-3">
        <label className="overline-label text-accent/80">
          {t("fields.preferred_contact")}
        </label>
        <div className="flex flex-wrap gap-4">
          {(["whatsapp", "phone", "email"] as const).map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                value={option}
                {...register("preferred_contact")}
                className="sr-only"
              />
              <div className="w-4 h-4 rounded-full border border-border-strong group-has-[:checked]:border-accent group-has-[:checked]:bg-accent transition-colors duration-200 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-bg-primary opacity-0 group-has-[:checked]:opacity-100" />
              </div>
              <span className="text-caption text-text-secondary group-has-[:checked]:text-accent transition-colors duration-200">
                {t(`fields.${option === "email" ? "email_contact" : option === "phone" ? "phone_call" : "whatsapp"}`)}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Interest (optional) */}
      <div className="flex flex-col gap-2">
        <label className="overline-label text-accent/80">
          {t("fields.interest")}
        </label>
        <textarea
          {...register("interest")}
          placeholder={t("fields.interest_placeholder")}
          rows={variant === "full" ? 5 : 3}
          className={cn("input-base resize-none", errors.interest && "border-error")}
        />
        {errors.interest && (
          <span className="text-caption text-error">{t("errors.interest_max")}</span>
        )}
      </div>

      {/* Consent */}
      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register("consent")}
            className="sr-only"
          />
          <div
            className={cn(
              "mt-0.5 w-4 h-4 shrink-0 border transition-colors duration-200 flex items-center justify-center",
              errors.consent ? "border-error" : "border-border-strong group-has-[:checked]:border-accent group-has-[:checked]:bg-accent"
            )}
          >
            <svg
              className="w-2.5 h-2.5 text-bg-primary opacity-0 group-has-[:checked]:opacity-100"
              viewBox="0 0 10 8"
              fill="none"
            >
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-caption text-text-secondary leading-relaxed">
            {t("fields.consent")}
          </span>
        </label>
        {errors.consent && (
          <span className="text-caption text-error">{t("errors.consent_required")}</span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-caption text-error bg-error/10 border border-error/20 px-4 py-3">
          {error}
        </p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        loading={isSubmitting}
        size="lg"
        className="w-full md:w-auto"
      >
        {isSubmitting ? t("fields.submitting") : t("fields.submit")}
      </Button>
    </form>
  );
}
