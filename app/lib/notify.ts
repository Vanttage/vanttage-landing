"use client";

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
 * Notifica al equipo (los 3 correos) vía el endpoint propio /api/lead (SMTP servidor).
 * Silencioso: nunca rompe la UX si el correo falla.
 */
export async function notifyTeam(input: NotifyInput): Promise<boolean> {
  if (input.once) {
    try {
      const k = `notify:${input.once}`;
      if (sessionStorage.getItem(k)) return true;
      sessionStorage.setItem(k, "1");
    } catch {
      /* sessionStorage no disponible: continúa y envía igual */
    }
  }

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: input.source,
        name: input.name ?? "",
        whatsapp: input.whatsapp ?? "",
        email: input.email ?? "",
        message: input.message ?? "",
      }),
      keepalive: true, // permite que el envío sobreviva si la página navega (clic a WhatsApp)
    });
    return res.ok;
  } catch {
    return false;
  }
}
