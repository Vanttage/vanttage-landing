import Link from "next/link";
import { Users, FileText, CheckCircle2, TrendingUp, Plus, ArrowRight, FileStack } from "lucide-react";
import { supabaseAdmin } from "../_lib/supabase-admin";
import PortalShell from "../_components/PortalShell";
import { btnPrimary, cardCls, kickerCls, DbNotice, EmptyState, EstadoBadge } from "../_components/ui";

export const dynamic = "force-dynamic";

const fmt = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fecha = (s: string) =>
  new Date(s).toLocaleDateString("es-CO", { day: "2-digit", month: "short", timeZone: "America/Bogota" });

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
  const pendientes = cots.filter((c) => c.estado === "enviada").length;

  const kpis = [
    { label: "Contactos", value: String(contactos), icon: Users, href: "/portal/clientes" },
    { label: "Cotizaciones", value: String(total), icon: FileText, href: "/portal/cotizaciones" },
    { label: "Aprobadas", value: String(aprobadas.length), icon: CheckCircle2, href: "/portal/cotizaciones" },
    { label: "Valor ganado", value: fmt(valorGanado), icon: TrendingUp, href: "/portal/cotizaciones" },
  ];

  const recientes = cots.slice(0, 6);

  return (
    <PortalShell
      kicker="Resumen"
      title="Dashboard"
      subtitle="Estado general de contactos y cotizaciones."
      actions={
        <Link href="/portal/cotizador" className={btnPrimary}>
          <Plus size={16} aria-hidden /> Nueva cotización
        </Link>
      }
    >
      {dbError && (
        <div className="mb-6">
          <DbNotice />
        </div>
      )}

      {/* KPIs */}
      <section aria-label="Indicadores" className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className={`${cardCls} group flex flex-col justify-between p-4 transition-colors hover:border-[var(--pborder-strong)] hover:bg-[var(--pcardhover)] md:p-5`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className={kickerCls}>{k.label}</p>
              <k.icon size={16} className="shrink-0 text-[var(--pfaint)] transition-colors group-hover:text-[var(--paccent)]" aria-hidden />
            </div>
            <p className="mt-5 truncate text-2xl font-semibold tracking-tight tabular-nums md:mt-6 md:text-[30px] md:leading-none">
              {k.value}
            </p>
          </Link>
        ))}
      </section>

      {/* Rendimiento */}
      <section aria-label="Rendimiento" className={`${cardCls} mt-3 grid divide-y divide-[var(--pborder)] md:mt-4 md:grid-cols-3 md:divide-x md:divide-y-0`}>
        <div className="p-4 md:p-5">
          <p className="text-sm text-[var(--pmuted)]">Valor total cotizado</p>
          <p className="mt-1.5 text-xl font-semibold tracking-tight tabular-nums">{fmt(valorCotizado)}</p>
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[var(--pmuted)]">Tasa de conversión</p>
            <p className="text-xl font-semibold tracking-tight tabular-nums">{conversion}%</p>
          </div>
          <div
            className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--pchip)]"
            role="progressbar"
            aria-label="Tasa de conversión"
            aria-valuenow={conversion}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-full rounded-full bg-[var(--paccent)]" style={{ width: `${conversion}%` }} />
          </div>
        </div>
        <div className="p-4 md:p-5">
          <p className="text-sm text-[var(--pmuted)]">Enviadas sin respuesta</p>
          <p className="mt-1.5 text-xl font-semibold tracking-tight tabular-nums">{pendientes}</p>
        </div>
      </section>

      {/* Recientes */}
      <section aria-labelledby="recientes-titulo" className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 id="recientes-titulo" className="text-lg font-semibold tracking-tight">
              Cotizaciones recientes
            </h2>
            <p className="text-sm text-[var(--pfaint)]">Las últimas seis por número.</p>
          </div>
          {recientes.length > 0 && (
            <Link
              href="/portal/cotizaciones"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-1 text-sm font-medium text-[var(--paccent)] hover:underline md:min-h-9"
            >
              Ver todas <ArrowRight size={15} aria-hidden />
            </Link>
          )}
        </div>

        {recientes.length === 0 ? (
          <EmptyState
            icon={FileStack}
            title="Aún no hay cotizaciones"
            text={dbError ? "Cuando la base esté conectada verás aquí las últimas cotizaciones." : "Crea la primera desde una plantilla o desde cero."}
            action={
              !dbError && (
                <Link href="/portal/cotizador" className={btnPrimary}>
                  <Plus size={16} aria-hidden /> Nueva cotización
                </Link>
              )
            }
          />
        ) : (
          <>
            {/* Tabla (escritorio) */}
            <div className={`${cardCls} hidden overflow-hidden md:block`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--pborder)] text-left text-[11px] uppercase tracking-[0.14em] text-[var(--pfaint)]">
                    <th scope="col" className="px-5 py-3 font-medium">N.º</th>
                    <th scope="col" className="px-5 py-3 font-medium">Cliente</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Total</th>
                    <th scope="col" className="px-5 py-3 font-medium">Estado</th>
                    <th scope="col" className="px-5 py-3 font-medium">Fecha</th>
                    <th scope="col" className="px-5 py-3"><span className="sr-only">Acciones</span></th>
                  </tr>
                </thead>
                <tbody>
                  {recientes.map((c) => (
                    <tr key={c.id} className="border-t border-[var(--pborder)] first:border-0 transition-colors hover:bg-[var(--pcardhover)]">
                      <td className="px-5 py-3.5 font-medium tabular-nums">{c.numero || `#${c.consecutivo}`}</td>
                      <td className="px-5 py-3.5 text-[var(--pmuted)]">{c.cliente_nombre || "Sin cliente"}</td>
                      <td className="px-5 py-3.5 text-right tabular-nums">{fmt(c.total)}</td>
                      <td className="px-5 py-3.5"><EstadoBadge estado={c.estado} /></td>
                      <td className="px-5 py-3.5 text-[var(--pfaint)]">{fecha(c.created_at)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <Link href={`/portal/cotizador?id=${c.id}`} className="text-sm font-medium text-[var(--paccent)] hover:underline">
                          Abrir
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tarjetas (móvil) */}
            <ul className="space-y-2 md:hidden">
              {recientes.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/portal/cotizador?id=${c.id}`}
                    className={`${cardCls} flex items-center justify-between gap-3 p-4 transition-colors active:bg-[var(--pcardhover)]`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{c.cliente_nombre || "Sin cliente"}</span>
                      <span className="mt-0.5 block text-xs text-[var(--pfaint)] tabular-nums">
                        {c.numero || `#${c.consecutivo}`} · {fecha(c.created_at)}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="text-sm font-medium tabular-nums">{fmt(c.total)}</span>
                      <EstadoBadge estado={c.estado} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </PortalShell>
  );
}
