import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/portal/_lib/supabase-admin";

export const runtime = "nodejs";

/* Abrir una cotización (para editar) */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });
  const { data, error } = await db
    .from("cotizaciones")
    .select("id,consecutivo,numero,datos")
    .eq("id", id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

/* Actualizar una cotización existente (conserva consecutivo y número) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body inválido" }, { status: 400 });

  // ── Caso 1: cambiar solo el estado (aprobar/rechazar/etc.) ──
  if (body.estado && !body.datos) {
    const { data: cot, error } = await db
      .from("cotizaciones")
      .update({ estado: body.estado })
      .eq("id", id)
      .select("cliente_id")
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Al aprobar, mover al cliente a la etapa "Aprobado"
    if (body.estado === "aprobada" && cot?.cliente_id) {
      await db.from("clientes").update({ etapa: "Aprobado" }).eq("id", cot.cliente_id);
    }
    return NextResponse.json({ ok: true });
  }

  // ── Caso 2: actualizar el contenido de la cotización ──
  if (!body.datos) return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  const d = body.datos;

  const { error } = await db
    .from("cotizaciones")
    .update({
      cliente_nombre: (d.cliente || "").trim() || null,
      proyecto: d.proyecto || null,
      subtotal: Number(body.subtotal) || 0,
      descuento: Number(d.descuento) || 0,
      total: Number(body.total) || 0,
      datos: d,
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id });
}
