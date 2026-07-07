import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabaseAdmin } from "../../_lib/supabase-admin";
import PortalShell from "../../_components/PortalShell";
import ClienteDetalle from "./ClienteDetalle";

export const dynamic = "force-dynamic";

export default async function FichaCliente({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = supabaseAdmin();

  if (!db) {
    return (
      <PortalShell title="Cliente">
        <p className="text-sm text-amber-200">Base de datos no conectada.</p>
      </PortalShell>
    );
  }

  const { data: cliente } = await db.from("clientes").select("*").eq("id", id).single();
  if (!cliente) {
    return (
      <PortalShell title="Cliente">
        <p className="text-sm text-[var(--pmuted)]">No se encontró el cliente.</p>
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
    <PortalShell title={cliente.nombre} subtitle={cliente.empresa || "Ficha de cliente"}>
      <Link href="/portal/clientes" className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--pmuted)] hover:text-[var(--ptext)]">
        <ArrowLeft size={15} /> Contactos
      </Link>
      <ClienteDetalle
        cliente={cliente}
        interacciones={interacciones ?? []}
        cotizaciones={cotizaciones ?? []}
      />
    </PortalShell>
  );
}
