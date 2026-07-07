import Link from "next/link";
import { supabaseAdmin } from "../_lib/supabase-admin";
import ClienteForm from "./ClienteForm";
import PortalShell from "../_components/PortalShell";

export const dynamic = "force-dynamic";

interface Cliente {
  id: string;
  nombre: string;
  empresa: string | null;
  whatsapp: string | null;
  email: string | null;
  notas: string | null;
  origen: string | null;
  etapa: string | null;
  created_at: string;
}

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
    <PortalShell title="Contactos" subtitle={`${rows.length} en el CRM`} actions={<ClienteForm />}>
      {error && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}

      {!error && rows.length === 0 && (
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/50">
          Aún no hay clientes. Se agregan solos al guardar cotizaciones, o créalos con “Nuevo cliente”.
        </p>
      )}

      {rows.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((c) => (
            <Link
              key={c.id}
              href={`/portal/clientes/${c.id}`}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-violet-400/40 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-white group-hover:text-violet-200">{c.nombre}</p>
                <span className="shrink-0 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-violet-300">
                  {c.etapa || "Prospecto"}
                </span>
              </div>
              {c.empresa && <p className="text-sm text-white/60">{c.empresa}</p>}
              <div className="mt-2 space-y-0.5 text-sm text-white/50">
                {c.whatsapp && <p>📱 {c.whatsapp}</p>}
                {c.email && <p>✉️ {c.email}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
