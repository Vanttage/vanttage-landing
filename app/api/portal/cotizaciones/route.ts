import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/portal/_lib/supabase-admin";

export const runtime = "nodejs";

/* Listar historial (más recientes primero) */
export async function GET() {
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });
  const { data, error } = await db
    .from("cotizaciones")
    .select("id,consecutivo,numero,cliente_nombre,proyecto,total,estado,created_at")
    .order("consecutivo", { ascending: false })
    .limit(2000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ cotizaciones: data });
}

/* Guardar una cotización (asigna consecutivo + guarda/actualiza el cliente) */
export async function POST(req: NextRequest) {
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });

  const body = await req.json().catch(() => null);
  if (!body?.datos) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });

  const d = body.datos;
  const nombre = String(d.cliente || "").trim();
  const empresa = String(d.empresa || "").trim() || null;
  const whatsapp = String(body.clienteWhatsapp || d.whatsapp || "").trim() || null;
  const email = String(d.email || d.contactoEmail || "").trim() || null;

  // Emparejar cliente para evitar duplicados: primero por WhatsApp/email
  // (identificador estable), luego por nombre sin distinguir mayúsculas.
  let cliente_id: string | null = null;
  if (nombre) {
    let exist: { id: string } | null = null;
    if (whatsapp) {
      ({ data: exist } = await db.from("clientes").select("id").eq("whatsapp", whatsapp).limit(1).maybeSingle());
    }
    if (!exist && email) {
      ({ data: exist } = await db.from("clientes").select("id").eq("email", email).limit(1).maybeSingle());
    }
    if (!exist) {
      // ilike sin comodines = comparación exacta pero insensible a mayúsculas
      ({ data: exist } = await db.from("clientes").select("id").ilike("nombre", nombre).limit(1).maybeSingle());
    }
    if (exist) {
      cliente_id = exist.id;
      const upd: Record<string, string> = {};
      if (empresa) upd.empresa = empresa;
      if (whatsapp) upd.whatsapp = whatsapp;
      if (email) upd.email = email;
      if (Object.keys(upd).length) await db.from("clientes").update(upd).eq("id", exist.id);
    } else {
      const { data: nuevo } = await db
        .from("clientes")
        .insert({ nombre, empresa, whatsapp, email, origen: "cotizador" })
        .select("id")
        .single();
      cliente_id = nuevo?.id ?? null;
    }
  }

  // Numeración que reinicia por año: COT-AAAA-### (### = cuántas van este año + 1)
  const year = new Date().getFullYear();
  const { count: previas } = await db
    .from("cotizaciones")
    .select("id", { count: "exact", head: true })
    .like("numero", `COT-${year}-%`);
  const numero = `COT-${year}-${String((previas ?? 0) + 1).padStart(3, "0")}`;

  const { data: cot, error } = await db
    .from("cotizaciones")
    .insert({
      cliente_id,
      cliente_nombre: nombre || null,
      numero,
      proyecto: d.proyecto || null,
      subtotal: Number(body.subtotal) || 0,
      descuento: Number(d.descuento) || 0,
      total: Number(body.total) || 0,
      estado: "enviada",
      datos: d,
    })
    .select("id,consecutivo")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: cot.id, consecutivo: cot.consecutivo, numero });
}
