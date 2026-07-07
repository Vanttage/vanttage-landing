import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { supabaseAdmin } from "@/app/portal/_lib/supabase-admin";

export const runtime = "nodejs";

const TEAM_EMAILS = [
  "carforck@gmail.com",
  "moisesruizruizsoraca@gmail.com",
  "vanttagectg@gmail.com",
];

function esc(s: string) {
  return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function origenDe(source: string) {
  const s = source.toLowerCase();
  if (s.includes("chat")) return "Chat";
  if (s.includes("formulario")) return "Formulario";
  if (s.includes("whatsapp")) return "WhatsApp";
  if (s.includes("correo")) return "Correo";
  return "Landing";
}

async function guardarLead(data: Record<string, string>) {
  const db = supabaseAdmin();
  if (!db) return;

  const name = (data.name || "").trim();
  const whatsapp = (data.whatsapp || "").replace(/^—$/, "").trim();
  const email = (data.email || "").replace(/^—$/, "").trim();
  const hasData = (name && name !== "Visitante") || whatsapp || (email && email.includes("@"));
  if (!hasData) return; // clics de WhatsApp sin datos: no crean contacto

  const origen = origenDe(data.source || "");

  // Dedupe: por whatsapp, luego email, luego nombre
  let cliente_id: string | null = null;
  for (const [col, val] of [["whatsapp", whatsapp], ["email", email], ["nombre", name]] as const) {
    if (!val) continue;
    const { data: hit } = await db.from("clientes").select("id").eq(col, val).limit(1).maybeSingle();
    if (hit) { cliente_id = hit.id; break; }
  }

  if (!cliente_id) {
    const { data: nuevo } = await db
      .from("clientes")
      .insert({ nombre: name || "Contacto web", whatsapp: whatsapp || null, email: email || null, origen, etapa: "Prospecto" })
      .select("id")
      .single();
    cliente_id = nuevo?.id ?? null;
  }

  if (cliente_id) {
    await db.from("interacciones").insert({
      cliente_id,
      canal: origen,
      detalle: `Llegó por ${data.source || "el sitio"}: ${data.message || "(sin mensaje)"}`,
      autor: null,
    });
  }
}

async function enviarCorreo(data: Record<string, string>) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return;

  const source = data.source || "Sitio web";
  const html = `
    <div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:linear-gradient(90deg,#7c3aed,#4f46e5);padding:18px 22px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:18px">📥 Nuevo contacto · Vanttage.com</h2>
        <p style="color:#e9d5ff;margin:4px 0 0;font-size:13px">Origen: ${esc(source)}</p>
      </div>
      <div style="border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;padding:22px">
        <p><strong>Nombre:</strong> ${esc(data.name || "Visitante")}</p>
        <p><strong>WhatsApp:</strong> ${esc(data.whatsapp || "—")}</p>
        <p><strong>Correo:</strong> ${esc(data.email || "—")}</p>
        <p><strong>Mensaje:</strong><br/>${esc(data.message || "—")}</p>
      </div>
    </div>`;
  const transporter = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user, pass } });
  await transporter.sendMail({
    from: `"Vanttage Web" <${user}>`,
    to: TEAM_EMAILS.join(", "),
    replyTo: data.email && data.email.includes("@") ? data.email : undefined,
    subject: `📥 Nuevo contacto desde ${source} — ${data.name || "Visitante"}`,
    text: `Origen: ${source}\nNombre: ${data.name}\nWhatsApp: ${data.whatsapp}\nCorreo: ${data.email}\nMensaje: ${data.message}`,
    html,
  });
}

export async function POST(req: NextRequest) {
  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    /* body vacío */
  }

  const results = await Promise.allSettled([guardarLead(data), enviarCorreo(data)]);
  const ok = results.some((r) => r.status === "fulfilled");
  return Response.json({ ok, saved: results[0].status === "fulfilled", mailed: results[1].status === "fulfilled" });
}
