import Link from "next/link";
import { UserX } from "lucide-react";
import { supabaseAdmin } from "../../_lib/supabase-admin";
import PortalShell from "../../_components/PortalShell";
import { DbNotice, EmptyState, btnSecondary } from "../../_components/ui";
import ClienteDetalle from "./ClienteDetalle";

export const dynamic = "force-dynamic";

export default async function FichaCliente({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = supabaseAdmin();

  if (!db) {
    return (
      <PortalShell kicker="Ficha de cliente" title="Cliente" subtitle="Datos, cotizaciones e historial de contacto." backHref="/portal/clientes" backLabel="Contactos">
        <DbNotice />
      </PortalShell>
    );
  }

  const { data: cliente } = await db.from("clientes").select("*").eq("id", id).single();
  if (!cliente) {
    return (
      <PortalShell kicker="Ficha de cliente" title="Cliente" backHref="/portal/clientes" backLabel="Contactos">
        <EmptyState
          icon={UserX}
          title="No encontramos este cliente"
          text="Puede que se haya eliminado o que el enlace esté incompleto."
          action={
            <Link href="/portal/clientes" className={btnSecondary}>
              Volver a Contactos
            </Link>
          }
        />
      </PortalShell>
    );
  }

  const { data: interacciones } = await db
    .from("interacciones")
    .select("id,canal,detalle,autor,created_at")
    .eq("cliente_id", id)
    .order("created_at", { ascending: false });

  const { data: cotizaciones } = await db
    .from("cotizaciones")
    .select("id,numero,consecutivo,total,estado,created_at")
    .eq("cliente_id", id)
    .order("consecutivo", { ascending: false });

  return (
    <PortalShell kicker="Ficha de cliente" title={cliente.nombre} subtitle={cliente.empresa || "Sin empresa registrada"} backHref="/portal/clientes" backLabel="Contactos">
      <ClienteDetalle
        cliente={cliente}
        interacciones={interacciones ?? []}
        cotizaciones={cotizaciones ?? []}
      />
    </PortalShell>
  );
}
