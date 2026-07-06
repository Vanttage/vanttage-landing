import Link from "next/link";
import { ArrowLeft, Users } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import ClienteForm from "./ClienteForm";

export const dynamic = "force-dynamic";

interface Cliente {
  id: string;
  nombre: string;
  empresa: string | null;
  whatsapp: string | null;
  email: string | null;
  notas: string | null;
  origen: string | null;
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
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/portal/panel" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Panel
      </Link>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
            <Users size={18} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Clientes (CRM)</h1>
            <p className="text-sm text-white/40">{rows.length} contactos</p>
          </div>
        </div>
        <ClienteForm />
      </div>

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
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map((c) => (
            <div key={c.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-white">{c.nombre}</p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                  {c.origen || "—"}
                </span>
              </div>
              {c.empresa && <p className="text-sm text-white/60">{c.empresa}</p>}
              <div className="mt-2 space-y-0.5 text-sm text-white/50">
                {c.whatsapp && <p>📱 {c.whatsapp}</p>}
                {c.email && <p>✉️ {c.email}</p>}
                {c.notas && <p className="text-white/40">📝 {c.notas}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
