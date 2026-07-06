import Link from "next/link";
import { ArrowLeft, FileText, Plus } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);

const fecha = (s: string) =>
  new Date(s).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

interface Row {
  id: string;
  consecutivo: number;
  numero: string | null;
  cliente_nombre: string | null;
  proyecto: string | null;
  total: number;
  estado: string;
  created_at: string;
}

export default async function CotizacionesPage() {
  const db = supabaseAdmin();
  let rows: Row[] = [];
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
    else rows = (data as Row[]) ?? [];
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link href="/portal/panel" className="mb-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white">
        <ArrowLeft size={15} /> Panel
      </Link>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
            <FileText size={18} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Cotizaciones</h1>
            <p className="text-sm text-white/40">{rows.length} en el historial</p>
          </div>
        </div>
        <Link
          href="/portal/cotizador"
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus size={15} /> Nueva
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      )}

      {!error && rows.length === 0 && (
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/50">
          Aún no hay cotizaciones guardadas. Crea una en el Cotizador y pulsa “Guardar”.
        </p>
      )}

      {rows.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/40">
              <tr>
                <th className="px-4 py-3">N°</th>
                <th className="px-4 py-3">Cliente</th>
                <th className="px-4 py-3">Proyecto</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-white/5 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-medium text-violet-300">
                    {r.numero || `#${r.consecutivo}`}
                  </td>
                  <td className="px-4 py-3">{r.cliente_nombre || "—"}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-white/60">{r.proyecto || "—"}</td>
                  <td className="px-4 py-3 text-right font-medium">{fmt(r.total)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/70">{r.estado}</span>
                  </td>
                  <td className="px-4 py-3 text-white/50">{fecha(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
