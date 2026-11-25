import { Users } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import { DbNotice, EmptyState, Notice } from "../_components/ui";
import ContactosTable, { type Cliente } from "./ContactosTable";
import NuevoContactoButton from "./NuevoContactoButton";

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  const db = supabaseAdmin();
  let rows: Cliente[] = [];
  let error = "";
  let sinDb = false;

  if (!db) {
    sinDb = true;
    error = "La base de datos aún no está conectada.";
  } else {
    const { data, error: e } = await db
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);
    if (e) error = e.message;
    else rows = (data as Cliente[]) ?? [];
  }

  return (
    <PortalShell
      kicker="CRM"
      title="Contactos"
      subtitle={error ? "Personas y empresas con las que hablamos." : `${rows.length} ${rows.length === 1 ? "contacto" : "contactos"} en el CRM.`}
      actions={error ? undefined : <NuevoContactoButton />}
    >
      {error ? (
        <div className="space-y-6">
          {sinDb ? <DbNotice /> : <Notice tone="red" title="No se pudieron cargar los contactos" text={error} />}
          <EmptyState icon={Users} title="Sin contactos para mostrar" text="La lista aparecerá aquí cuando la conexión funcione." />
        </div>
      ) : (
        <ContactosTable initial={rows} />
      )}
    </PortalShell>
  );
}
