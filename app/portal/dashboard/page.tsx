import Link from "next/link";
import { Users, FileText, CheckCircle2, TrendingUp } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fecha = (s: string) =>
  new Date(s).toLocaleDateString("es-CO", { day: "2-digit", month: "short" });

export default async function DashboardPage() {
  const db = supabaseAdmin();

  let contactos = 0;
  let cots: { id: string; numero: string | null; consecutivo: number; cliente_nombre: string | null; total: number; estado: string; created_at: string }[] = [];
  let dbError = "";

  if (!db) {
    dbError = "Base de datos no conectada.";
  } else {
    const { count } = await db.from("clientes").select("*", { count: "exact", head: true });
    contactos = count ?? 0;
    const { data } = await db
      .from("cotizaciones")
      .select("id,numero,consecutivo,cliente_nombre,total,estado,created_at")
      .order("consecutivo", { ascending: false });
    cots = data ?? [];
  }

  const total = cots.length;
  const aprobadas = cots.filter((c) => c.estado === "aprobada");
  const valorGanado = aprobadas.reduce((s, c) => s + (c.total || 0), 0);
  const valorCotizado = cots.reduce((s, c) => s + (c.total || 0), 0);
  const conversion = total ? Math.round((aprobadas.length / total) * 100) : 0;

  const kpis = [
    { label: "Contactos", value: contactos, icon: Users, color: "#a78bfa" },
    { label: "Cotizaciones", value: total, icon: FileText, color: "#60a5fa" },
    { label: "Aprobadas", value: aprobadas.length, icon: CheckCircle2, color: "#34d399" },
    { label: "Valor ganado", value: fmt(valorGanado), icon: TrendingUp, color: "#f59e0b" },
  ];

  return (
    <PortalShell title="Dashboard" subtitle="Resumen del CRM">
      {dbError && (
        <div className="mb-4 rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{dbError}</div>
      )}

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-[var(--pborder)] bg-[var(--pcard)] p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${k.color}22`, color: k.color }}>
              <k.icon size={18} />
            </div>
            <p className="text-2xl font-semibold">{k.value}</p>
            <p className="text-sm text-[var(--pfaint)]">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Segunda fila */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[var(--pborder)] bg-[var(--pcard)] p-5">
          <p className="text-sm text-[var(--pfaint)]">Valor total cotizado</p>
          <p className="mt-1 text-xl font-semibold">{fmt(valorCotizado)}</p>
        </div>
        <div className="rounded-2xl border border-[var(--pborder)] bg-[var(--pcard)] p-5">
          <p className="text-sm text-[var(--pfaint)]">Tasa de conversión</p>
          <p className="mt-1 text-xl font-semibold">{conversion}%</p>
        </div>
        <div className="rounded-2xl border border-[var(--pborder)] bg-[var(--pcard)] p-5">
          <p className="text-sm text-[var(--pfaint)]">Enviadas / pendientes</p>
          <p className="mt-1 text-xl font-semibold">{cots.filter((c) => c.estado === "enviada").length}</p>
        </div>
      </div>

      {/* Recientes */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Cotizaciones recientes</h2>
          <Link href="/portal/cotizaciones" className="text-sm text-violet-300 hover:text-violet-200">Ver todas →</Link>
        </div>
        {cots.length === 0 ? (
          <p className="rounded-xl border border-[var(--pborder)] bg-[var(--pinput)] px-4 py-8 text-center text-sm text-[var(--pmuted)]">
            Aún no hay cotizaciones. Crea una en “Nueva cotización”.
          </p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-[var(--pborder)]">
            <table className="w-full text-sm">
              <tbody>
                {cots.slice(0, 6).map((c) => (
                  <tr key={c.id} className="border-t border-[var(--pborder)] first:border-0 hover:bg-[var(--pcardhover)]">
                    <td className="px-4 py-3 font-medium text-violet-300">{c.numero || `#${c.consecutivo}`}</td>
                    <td className="px-4 py-3">{c.cliente_nombre || "—"}</td>
                    <td className="px-4 py-3 text-right">{fmt(c.total)}</td>
                    <td className="px-4 py-3"><span className="rounded-full bg-[var(--pchip)] px-2 py-0.5 text-xs text-[var(--pmuted)]">{c.estado}</span></td>
                    <td className="px-4 py-3 text-[var(--pfaint)]">{fecha(c.created_at)}</td>
                    <td className="px-4 py-3 text-right"><Link href={`/portal/cotizador?id=${c.id}`} className="text-xs text-violet-300 hover:text-violet-200">Abrir</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
