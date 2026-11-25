import Link from "next/link";
import { Plus, FileStack } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import { btnPrimary, DbNotice, EmptyState, Notice } from "../_components/ui";
import CotizacionesTable, { type Cot } from "./CotizacionesTable";

export const dynamic = "force-dynamic";

export default async function CotizacionesPage() {
  const db = supabaseAdmin();
  let rows: Cot[] = [];
  let error = "";
  let sinDb = false;

  if (!db) {
    sinDb = true;
    error = "La base de datos aún no está conectada.";
  } else {
    const { data, error: e } = await db
      .from("cotizaciones")
      .select("id,consecutivo,numero,cliente_nombre,proyecto,total,estado,created_at")
      .order("consecutivo", { ascending: false })
      .limit(2000);
    if (e) error = e.message;
    else rows = (data as Cot[]) ?? [];
  }

  const nueva = (
    <Link href="/portal/cotizador" className={btnPrimary}>
      <Plus size={16} aria-hidden /> Nueva cotización
    </Link>
  );

  return (
    <PortalShell
      kicker="Ventas"
      title="Cotizaciones"
      subtitle={error ? "Historial de cotizaciones y propuestas." : `${rows.length} en el historial.`}
      actions={nueva}
    >
      {error ? (
        <div className="space-y-6">
          {sinDb ? <DbNotice /> : <Notice tone="red" title="No se pudieron cargar las cotizaciones" text={error} />}
          <EmptyState icon={FileStack} title="Sin historial para mostrar" text="Puedes seguir creando documentos en el cotizador y descargarlos en PDF." />
        </div>
      ) : rows.length === 0 ? (
        <EmptyState icon={FileStack} title="Aún no hay cotizaciones" text="Crea la primera desde una plantilla o desde cero." action={nueva} />
      ) : (
        <CotizacionesTable initial={rows} />
      )}
    </PortalShell>
  );
}
