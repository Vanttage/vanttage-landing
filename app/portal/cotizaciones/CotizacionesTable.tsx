"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel,
  flexRender, type ColumnDef, type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Pencil, Trash2, SearchX } from "lucide-react";
import { toast } from "sonner";
import { btnGhostIcon, btnDangerIcon, inputCls, cardCls, EmptyState, estadoTone, estadoLabel } from "../_components/ui";

export interface Cot {
  id: string; consecutivo: number; numero: string | null;
  cliente_nombre: string | null; proyecto: string | null;
  total: number; estado: string; created_at: string;
}

const ESTADOS = ["borrador", "enviada", "aprobada", "rechazada"];
const FILTROS = [{ k: "", l: "Todas" }, { k: "enviada", l: "Enviadas" }, { k: "aprobada", l: "Aprobadas" }, { k: "rechazada", l: "Rechazadas" }];
const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fecha = (s: string) =>
  new Date(s).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Bogota" });

/* Selector de estado con aspecto de badge (color + texto) */
function EstadoSelect({ c, onChange }: { c: Cot; onChange: (estado: string) => void }) {
  const tone = estadoTone[c.estado] ?? "neutral";
  return (
    <select
      value={c.estado}
      onChange={(e) => onChange(e.target.value)}
      aria-label={`Estado de ${c.numero || "#" + c.consecutivo}`}
      className="min-h-11 cursor-pointer rounded-full border px-3 md:min-h-9 text-xs font-medium outline-none transition-colors"
      style={{
        color: `var(--pt-${tone})`,
        borderColor: `color-mix(in srgb, var(--pt-${tone}) 30%, transparent)`,
        background: `color-mix(in srgb, var(--pt-${tone}) 10%, transparent)`,
      }}
    >
      {ESTADOS.map((e) => <option key={e} value={e}>{estadoLabel[e]}</option>)}
    </select>
  );
}

export default function CotizacionesTable({ initial }: { initial: Cot[] }) {
  const [data, setData] = useState<Cot[]>(initial);
  const [sorting, setSorting] = useState<SortingState>([{ id: "consecutivo", desc: true }]);
  const [q, setQ] = useState("");
  const [filtro, setFiltro] = useState("");

  async function refetch() {
    try { const r = await fetch("/api/portal/cotizaciones"); if (r.ok) setData((await r.json()).cotizaciones ?? []); } catch {}
  }
  useEffect(() => { const t = setInterval(refetch, 25000); return () => clearInterval(t); }, []);

  async function cambiarEstado(id: string, estado: string) {
    setData((d) => d.map((c) => (c.id === id ? { ...c, estado } : c)));
    const r = await fetch(`/api/portal/cotizaciones/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ estado }) });
    if (r.ok) toast.success(estado === "aprobada" ? "Aprobada. El cliente pasó a la etapa Aprobado." : "Estado actualizado");
    else toast.error("No se pudo actualizar");
  }
  async function borrar(c: Cot) {
    if (!confirm(`¿Eliminar la cotización ${c.numero || "#" + c.consecutivo}?`)) return;
    const r = await fetch(`/api/portal/cotizaciones/${c.id}`, { method: "DELETE" });
    if (r.ok) { toast.success("Cotización eliminada"); setData((d) => d.filter((x) => x.id !== c.id)); }
    else toast.error("No se pudo eliminar");
  }

  const rows = useMemo(() => (filtro ? data.filter((c) => c.estado === filtro) : data), [data, filtro]);

  const columns = useMemo<ColumnDef<Cot>[]>(() => [
    { accessorKey: "numero", header: "N.º", cell: (i) => <span className="font-medium tabular-nums">{i.row.original.numero || `#${i.row.original.consecutivo}`}</span> },
    { accessorKey: "cliente_nombre", header: "Cliente", cell: (i) => (i.getValue() as string) || <span className="text-[var(--pfaint)]">Sin cliente</span> },
    { accessorKey: "proyecto", header: "Proyecto", cell: (i) => <span className="block max-w-[240px] truncate text-[var(--pmuted)]">{(i.getValue() as string) || "Sin título"}</span> },
    { accessorKey: "total", header: "Total", cell: (i) => <span className="tabular-nums">{fmt(i.getValue() as number)}</span> },
    { accessorKey: "estado", header: "Estado", cell: (i) => <EstadoSelect c={i.row.original} onChange={(e) => cambiarEstado(i.row.original.id, e)} /> },
    { accessorKey: "created_at", header: "Fecha", cell: (i) => <span className="whitespace-nowrap text-[var(--pfaint)]">{fecha(i.getValue() as string)}</span> },
    {
      id: "acciones", header: () => <span className="sr-only">Acciones</span>, enableSorting: false, cell: (i) => (
        <div className="flex justify-end gap-0.5">
          <Link href={`/portal/cotizador?id=${i.row.original.id}`} className={btnGhostIcon} title="Editar" aria-label={`Editar ${i.row.original.numero || "cotización"}`}><Pencil size={15} aria-hidden /></Link>
          <button type="button" onClick={() => borrar(i.row.original)} className={btnDangerIcon} title="Eliminar" aria-label={`Eliminar ${i.row.original.numero || "cotización"}`}><Trash2 size={15} aria-hidden /></button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: rows, columns, state: { sorting, globalFilter: q },
    onSortingChange: setSorting, onGlobalFilterChange: setQ,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(),
  });
  const visibles = table.getRowModel().rows;

  const sinResultados = <EmptyState compact icon={SearchX} title="Sin resultados" text="Cambia el filtro o la búsqueda." />;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="buscar-cots" className="sr-only">Buscar cotizaciones</label>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--pfaint)]" aria-hidden />
          <input id="buscar-cots" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por cliente, número o proyecto" className={`${inputCls} pl-10`} />
        </div>
        <div role="group" aria-label="Filtrar por estado" className="flex flex-wrap gap-1.5">
          {FILTROS.map((f) => (
            <button
              key={f.k}
              type="button"
              onClick={() => setFiltro(f.k)}
              aria-pressed={filtro === f.k}
              className={`min-h-11 rounded-full px-4 text-sm transition-colors md:min-h-9 ${
                filtro === f.k
                  ? "bg-[var(--paccent-soft)] font-medium text-[var(--ptext)] ring-1 ring-inset ring-[var(--paccent-line)]"
                  : "border border-[var(--pborder)] text-[var(--pmuted)] hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)]"
              }`}
            >
              {f.l}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla (escritorio) */}
      <div className={`${cardCls} hidden overflow-x-auto md:block`}>
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="border-b border-[var(--pborder)] text-left text-[11px] uppercase tracking-[0.14em] text-[var(--pfaint)]">
                {hg.headers.map((h) => {
                  const sorted = h.column.getIsSorted();
                  return (
                    <th key={h.id} scope="col" className="px-4 py-3 font-medium first:pl-5" aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}>
                      {h.isPlaceholder ? null : h.column.getCanSort() ? (
                        <button type="button" className="inline-flex items-center gap-1 rounded uppercase tracking-[0.14em] hover:text-[var(--ptext)]" onClick={h.column.getToggleSortingHandler()}>
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {sorted === "asc" ? <ArrowUp size={12} aria-hidden /> : sorted === "desc" ? <ArrowDown size={12} aria-hidden /> : <ArrowUpDown size={12} className="opacity-50" aria-hidden />}
                        </button>
                      ) : (
                        flexRender(h.column.columnDef.header, h.getContext())
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {visibles.map((row) => (
              <tr key={row.id} className="border-t border-[var(--pborder)] transition-colors first:border-0 hover:bg-[var(--pcardhover)]">
                {row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-2.5 first:pl-5 last:pr-3">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {visibles.length === 0 && <div className="p-4">{sinResultados}</div>}
      </div>

      {/* Tarjetas (móvil) */}
      <ul className="space-y-2 md:hidden">
        {visibles.map((row) => {
          const c = row.original;
          return (
            <li key={row.id} className={`${cardCls} p-4`}>
              <div className="flex items-start justify-between gap-3">
                <Link href={`/portal/cotizador?id=${c.id}`} className="min-w-0 py-1">
                  <span className="block truncate font-medium">{c.cliente_nombre || "Sin cliente"}</span>
                  <span className="mt-0.5 block truncate text-xs text-[var(--pfaint)]">
                    {c.numero || `#${c.consecutivo}`} · {fecha(c.created_at)}
                  </span>
                  {c.proyecto && <span className="mt-1 block truncate text-xs text-[var(--pmuted)]">{c.proyecto}</span>}
                </Link>
                <span className="shrink-0 pt-1 text-sm font-medium tabular-nums">{fmt(c.total)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <EstadoSelect c={c} onChange={(e) => cambiarEstado(c.id, e)} />
                <div className="-mr-2 flex">
                  <Link href={`/portal/cotizador?id=${c.id}`} className={btnGhostIcon} aria-label={`Editar ${c.numero || "cotización"}`}><Pencil size={16} aria-hidden /></Link>
                  <button type="button" onClick={() => borrar(c)} className={btnDangerIcon} aria-label={`Eliminar ${c.numero || "cotización"}`}><Trash2 size={16} aria-hidden /></button>
                </div>
              </div>
            </li>
          );
        })}
        {visibles.length === 0 && <li>{sinResultados}</li>}
      </ul>
    </div>
  );
}
