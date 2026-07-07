import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/portal/_lib/supabase-admin";

export const runtime = "nodejs";

/* Registrar una interacción con un cliente */
export async function POST(req: NextRequest) {
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });

  const b = await req.json().catch(() => null);
  if (!b?.cliente_id || !b?.detalle) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const { data, error } = await db
    .from("interacciones")
    .insert({
      cliente_id: b.cliente_id,
      canal: b.canal || "Nota",
      detalle: String(b.detalle).trim(),
      autor: b.autor || null,
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}
