import { NextRequest } from "next/server";
import nodemailer from "nodemailer";

/* nodemailer (SMTP) requiere runtime Node, no edge */
export const runtime = "nodejs";

/* A estos 3 correos llega TODA notificación de contacto del sitio */
const TEAM_EMAILS = [
  "carforck@gmail.com",
  "moisesruizruizsoraca@gmail.com",
  "vanttagectg@gmail.com",
];

function esc(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return Response.json(
      { error: "GMAIL_USER / GMAIL_APP_PASSWORD no configurados" },
      { status: 500 },
    );
  }

  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    /* body vacío */
  }

  const source = data.source || "Sitio web";
  const name = data.name || "Visitante";
  const whatsapp = data.whatsapp || "—";
  const email = data.email || "—";
  const message = data.message || `Un visitante intentó contactarte vía ${source}.`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:linear-gradient(90deg,#7c3aed,#4f46e5);padding:18px 22px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:18px">📥 Nuevo contacto · Vanttage.com</h2>
        <p style="color:#e9d5ff;margin:4px 0 0;font-size:13px">Origen: ${esc(source)}</p>
      </div>
      <div style="border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;padding:22px">
        <p style="margin:0 0 10px"><strong>Nombre:</strong> ${esc(name)}</p>
        <p style="margin:0 0 10px"><strong>WhatsApp:</strong> ${esc(whatsapp)}</p>
        <p style="margin:0 0 10px"><strong>Correo:</strong> ${esc(email)}</p>
        <p style="margin:0 0 10px"><strong>Necesidad / mensaje:</strong><br/>${esc(message)}</p>
        <hr style="border:0;border-top:1px solid #eee;margin:18px 0"/>
        <p style="color:#888;font-size:12px;margin:0">Notificación automática del sitio. Responde rápido para no perder el lead.</p>
      </div>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"Vanttage Web" <${user}>`,
      to: TEAM_EMAILS.join(", "),
      replyTo: email && email.includes("@") ? email : undefined,
      subject: `📥 Nuevo contacto desde ${source} — ${name}`,
      text: `Origen: ${source}\nNombre: ${name}\nWhatsApp: ${whatsapp}\nCorreo: ${email}\nNecesidad: ${message}`,
      html,
    });
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "fallo al enviar" },
      { status: 502 },
    );
  }
}
