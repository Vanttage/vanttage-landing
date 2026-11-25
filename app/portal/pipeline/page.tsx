import Link from "next/link";
import { KanbanSquare, Users } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import { btnSecondary, DbNotice, EmptyState } from "../_components/ui";
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
    <PortalShell
      kicker="Seguimiento"
      title="Pipeline"
      subtitle="Mueve cada contacto a la etapa en la que está."
      actions={
        <Link href="/portal/clientes" className={btnSecondary}>
          <Users size={16} aria-hidden /> Ver contactos
        </Link>
      }
    >
      {error ? (
        <div className="space-y-6">
          <DbNotice />
          <EmptyState
            icon={KanbanSquare}
            title="El tablero está vacío"
            text="Con la base conectada verás aquí las columnas del embudo con tus contactos."
          />
        </div>
      ) : clientes.length === 0 ? (
        <EmptyState
          icon={KanbanSquare}
          title="Aún no hay contactos"
          text="Se agregan al guardar cotizaciones o desde Contactos."
          action={
            <Link href="/portal/clientes" className={btnSecondary}>
              Ir a Contactos
            </Link>
          }
        />
      ) : (
        <Pipeline clientes={clientes} />
      )}
    </PortalShell>
  );
}
