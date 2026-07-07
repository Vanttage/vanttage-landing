import Link from "next/link";
import { Plus } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import CotizacionesTable, { type Cot } from "./CotizacionesTable";

export const dynamic = "force-dynamic";

export default async function CotizacionesPage() {
  const db = supabaseAdmin();
  let rows: Cot[] = [];
  let error = "";

  if (!db) {
    error = "La base de datos aún no está conectada.";
  } else {
    const { data, error: e } = await db
      .from("cotizaciones")
      .select("id,consecutivo,numero,cliente_nombre,proyecto,total,estado,created_at")
      .order("consecutivo", { ascending: false })
      .limit(300);
    if (e) error = e.message;
    else rows = (data as Cot[]) ?? [];
  }

  return (
    <PortalShell title="Cotizaciones" subtitle={`${rows.length} en el historial`}>
      {error ? (
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-xl border border-[var(--pborder)] bg-[var(--pinput)] px-4 py-8 text-center text-sm text-[var(--pmuted)]">
          Aún no hay cotizaciones.{" "}
          <Link href="/portal/cotizador" className="inline-flex items-center gap-1 text-violet-300">
            <Plus size={13} /> Crear una
          </Link>
        </p>
      ) : (
        <CotizacionesTable initial={rows} />
      )}
    </PortalShell>
  );
}
