import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/portal/_lib/supabase-admin";

export const runtime = "nodejs";

/* Actualizar un cliente (datos o etapa del pipeline) */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const db = supabaseAdmin();
  if (!db) return NextResponse.json({ error: "DB no configurada" }, { status: 503 });

  const b = await req.json().catch(() => ({}));
  const upd: Record<string, unknown> = {};
  for (const k of ["nombre", "empresa", "whatsapp", "email", "notas", "etapa"]) {
    if (b[k] !== undefined) upd[k] = b[k] === "" ? null : b[k];
  }
  if (b.valor_estimado !== undefined) upd.valor_estimado = Number(b.valor_estimado) || 0;
  if (!Object.keys(upd).length) return NextResponse.json({ error: "Nada que actualizar" }, { status: 400 });

  const { error } = await db.from("clientes").update(upd).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
