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
    .limit(300);
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

  // Upsert simple del cliente (por nombre)
  let cliente_id: string | null = null;
  if (nombre) {
    const { data: exist } = await db
      .from("clientes")
      .select("id")
      .eq("nombre", nombre)
      .limit(1)
      .maybeSingle();
    if (exist) {
      cliente_id = exist.id;
      if (empresa) await db.from("clientes").update({ empresa }).eq("id", exist.id);
    } else {
      const { data: nuevo } = await db
        .from("clientes")
        .insert({ nombre, empresa, origen: "cotizador" })
        .select("id")
        .single();
      cliente_id = nuevo?.id ?? null;
    }
  }

  const { data: cot, error } = await db
    .from("cotizaciones")
    .insert({
      cliente_id,
      cliente_nombre: nombre || null,
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

  const year = new Date().getFullYear();
  const numero = `COT-${year}-${String(cot.consecutivo).padStart(3, "0")}`;
  await db.from("cotizaciones").update({ numero }).eq("id", cot.id);

  return NextResponse.json({ id: cot.id, consecutivo: cot.consecutivo, numero });
}
