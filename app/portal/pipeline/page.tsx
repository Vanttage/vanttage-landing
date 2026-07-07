import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import Pipeline from "./Pipeline";

export const dynamic = "force-dynamic";

export default async function PipelinePage() {
  const db = supabaseAdmin();
  let clientes: { id: string; nombre: string; empresa: string | null; whatsapp: string | null; etapa: string | null }[] = [];
  let error = "";

  if (!db) {
    error = "Base de datos no conectada.";
  } else {
    const { data } = await db
      .from("clientes")
      .select("id,nombre,empresa,whatsapp,etapa")
      .order("created_at", { ascending: false })
      .limit(1000);
    clientes = data ?? [];
  }

  return (
    <PortalShell title="Pipeline" subtitle="Arrastra tus clientes por las etapas del embudo">
      {error ? (
        <p className="text-sm text-amber-200">{error}</p>
      ) : clientes.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/50">
          Aún no hay contactos. Se agregan al guardar cotizaciones o desde “Contactos”.
        </p>
      ) : (
        <Pipeline clientes={clientes} />
      )}
    </PortalShell>
  );
}
