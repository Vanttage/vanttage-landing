import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/*
  Prueba de envío de correo (Gmail SMTP · Nodemailer).
  Protegido por la clave del portal (proxy.ts cubre /api/portal/*).
  GET /api/portal/probar-correo         → envía la prueba a GMAIL_USER (a ti mismo)
  GET /api/portal/probar-correo?equipo=1 → envía a los 3 correos del equipo
*/

const TEAM_EMAILS = [
  "carforck@gmail.com",
  "moisesruizruizsoraca@gmail.com",
  "vanttagectg@gmail.com",
];

export async function GET(req: Request) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return NextResponse.json({
      ok: false,
      configurado: false,
      motivo:
        "Faltan GMAIL_USER y/o GMAIL_APP_PASSWORD en el entorno. Sin ellas, /api/lead guarda el contacto en el CRM pero NO envía correos.",
      pista: "Agrégalas en Vercel → Settings → Environment Variables (Production) y vuelve a desplegar.",
    });
  }

  const alEquipo = new URL(req.url).searchParams.get("equipo") === "1";
  const destino = alEquipo ? TEAM_EMAILS.join(", ") : user;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    // Valida credenciales/conexión antes de enviar (da un error claro si la App Password está mal)
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Vanttage Web (prueba)" <${user}>`,
      to: destino,
      subject: "✅ Prueba de envío — Vanttage",
      text: "Si recibes este correo, el envío por Gmail SMTP (Nodemailer) funciona correctamente.",
      html: `<div style="font-family:system-ui,Arial,sans-serif;max-width:520px;margin:0 auto">
        <div style="background:linear-gradient(90deg,#7c3aed,#4f46e5);padding:16px 20px;border-radius:12px 12px 0 0">
          <h2 style="color:#fff;margin:0;font-size:18px">✅ Prueba de envío</h2>
        </div>
        <div style="border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;padding:20px">
          <p>Si ves este correo, el envío por <b>Gmail SMTP (Nodemailer)</b> funciona correctamente.</p>
          <p style="color:#888;font-size:12px;margin-top:14px">Enviado desde <code>/api/portal/probar-correo</code></p>
        </div>
      </div>`,
    });

    return NextResponse.json({
      ok: true,
      configurado: true,
      enviadoA: destino,
      messageId: info.messageId,
      nota: alEquipo
        ? "Se envió a los 3 correos del equipo."
        : "Se envió solo a tu propio correo (GMAIL_USER). Usa ?equipo=1 para probar a los 3.",
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      configurado: true,
      error: String((e as Error)?.message || e),
      pista:
        "Suele ser App Password incorrecta o 2FA no activo en la cuenta de Gmail. Regenera la App Password en la cuenta de GMAIL_USER.",
    });
  }
}
