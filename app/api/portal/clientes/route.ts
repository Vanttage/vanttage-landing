import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/portal/_lib/supabase-admin";

export const runtime = "nodejs";

/* Listar clientes (CRM) */
export async function GET() {
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });
  const { data, error } = await db
    .from("clientes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clientes: data });
}

/* Crear o actualizar un cliente */
export async function POST(req: NextRequest) {
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });

  const b = await req.json().catch(() => null);
  const nombre = String(b?.nombre || "").trim();
  if (!nombre) return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });

  const fields = {
    nombre,
    empresa: b.empresa?.trim() || null,
    whatsapp: b.whatsapp?.trim() || null,
    email: b.email?.trim() || null,
    notas: b.notas?.trim() || null,
    origen: b.origen || "manual",
  };

  if (b.id) {
    const { error } = await db.from("clientes").update(fields).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: b.id });
  }

  const { data, error } = await db.from("clientes").insert(fields).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}
