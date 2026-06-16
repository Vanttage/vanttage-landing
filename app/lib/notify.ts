"use client";

import emailjs from "@emailjs/browser";

/* ─────────── EmailJS ─────────── */
const EJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EJS_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const EJS_TEMPLATE =
  process.env.NEXT_PUBLIC_EMAILJS_LEAD_TEMPLATE_ID ??
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
  "";

/* A estos 3 correos llega TODA notificación de contacto del sitio.
   ⚠️ Para que llegue a los tres, el template de EmailJS debe tener
   el campo "To Email" = {{to_email}}. */
export const TEAM_EMAILS =
  "carforck@gmail.com,moisesruizruizsoraca@gmail.com,vanttagectg@gmail.com";

/* WhatsApp de Moisés (solo dígitos, con código de país) */
export const MOISES_WHATSAPP = "573226706385";

export interface NotifyInput {
  /** De dónde viene el contacto: "Chat (lead)", "WhatsApp", "Formulario", etc. */
  source: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  message?: string;
  /** Si se define, solo envía una vez por sesión con esa clave (evita spam de clics) */
  once?: string;
}

/**
 * Envía una notificación por correo a los 3 miembros del equipo.
 * Silencioso: nunca rompe la UX si el correo falla.
 */
export async function notifyTeam(input: NotifyInput): Promise<void> {
  if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) return;

  if (input.once) {
    try {
      const k = `notify:${input.once}`;
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, "1");
    } catch {
      /* sessionStorage no disponible: continúa y envía igual */
    }
  }

  const params = {
    title: `Nuevo contacto desde ${input.source} · Vanttage.com`,
    name: input.name || "Visitante",
    whatsapp: input.whatsapp || "—",
    email: input.email || "—",
    message: input.message || `Un visitante intentó contactarte vía ${input.source}.`,
    company: input.source,
    to_email: TEAM_EMAILS,
  };

  try {
    await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, params, { publicKey: EJS_KEY });
  } catch {
    /* silencioso */
  }
}
