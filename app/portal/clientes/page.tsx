import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import ContactosTable, { type Cliente } from "./ContactosTable";

export const dynamic = "force-dynamic";

export default async function ClientesPage() {
  const db = supabaseAdmin();
  let rows: Cliente[] = [];
  let error = "";

  if (!db) {
    error = "La base de datos aún no está conectada.";
  } else {
    const { data, error: e } = await db
      .from("clientes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (e) error = e.message;
    else rows = (data as Cliente[]) ?? [];
  }

  return (
    <PortalShell title="Contactos" subtitle={`${rows.length} en el CRM`}>
      {error ? (
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      ) : (
        <ContactosTable initial={rows} />
      )}
    </PortalShell>
  );
}
