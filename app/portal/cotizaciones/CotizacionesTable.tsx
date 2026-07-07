"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel,
  flexRender, type ColumnDef, type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, Search, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export interface Cot {
  id: string; consecutivo: number; numero: string | null;
  cliente_nombre: string | null; proyecto: string | null;
  total: number; estado: string; created_at: string;
}

const ESTADOS = ["borrador", "enviada", "aprobada", "rechazada"];
const FILTROS = [{ k: "", l: "Todas" }, { k: "enviada", l: "Enviadas" }, { k: "aprobada", l: "Aprobadas" }, { k: "rechazada", l: "Rechazadas" }];
const estadoColor: Record<string, string> = { borrador: "#94a3b8", enviada: "#60a5fa", aprobada: "#34d399", rechazada: "#f87171" };
const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fecha = (s: string) => new Date(s).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });

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
    if (r.ok) toast.success(estado === "aprobada" ? "Aprobada ✓ (cliente movido a Aprobado)" : "Estado actualizado");
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
    { accessorKey: "numero", header: "N°", cell: (i) => <span className="font-medium text-violet-300">{i.row.original.numero || `#${i.row.original.consecutivo}`}</span> },
    { accessorKey: "cliente_nombre", header: "Cliente", cell: (i) => (i.getValue() as string) || "—" },
    { accessorKey: "proyecto", header: "Proyecto", cell: (i) => <span className="block max-w-[220px] truncate text-[var(--pmuted)]">{(i.getValue() as string) || "—"}</span> },
    { accessorKey: "total", header: "Total", cell: (i) => fmt(i.getValue() as number) },
    {
      accessorKey: "estado", header: "Estado", cell: (i) => (
        <select value={i.getValue() as string} onChange={(e) => cambiarEstado(i.row.original.id, e.target.value)}
          className="rounded-full border border-[var(--pborder)] bg-[var(--pinput)] px-2 py-1 text-xs capitalize outline-none"
          style={{ color: estadoColor[i.getValue() as string] || "var(--ptext)" }}>
          {ESTADOS.map((e) => <option key={e} value={e} className="bg-[var(--psidebar)] text-[var(--ptext)]">{e}</option>)}
        </select>
      ),
    },
    { accessorKey: "created_at", header: "Fecha", cell: (i) => <span className="text-[var(--pfaint)]">{fecha(i.getValue() as string)}</span> },
    {
      id: "acciones", header: "", enableSorting: false, cell: (i) => (
        <div className="flex justify-end gap-1">
          <Link href={`/portal/cotizador?id=${i.row.original.id}`} className="rounded p-1.5 text-[var(--pmuted)] hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)]" title="Editar"><Pencil size={14} /></Link>
          <button onClick={() => borrar(i.row.original)} className="rounded p-1.5 text-[var(--pmuted)] hover:bg-red-500/10 hover:text-red-400" title="Eliminar"><Trash2 size={14} /></button>
        </div>
      ),
    },
  ], []);

  const table = useReactTable({
    data: rows, columns, state: { sorting, globalFilter: q },
    onSortingChange: setSorting, onGlobalFilterChange: setQ,
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(),
  });

  const inp = "rounded-lg border border-[var(--pborder)] bg-[var(--pinput)] px-3 py-2 text-sm outline-none placeholder:text-[var(--pfaint)] focus:border-violet-400/50";

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative max-w-xs flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--pfaint)]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className={`${inp} w-full pl-9`} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTROS.map((f) => (
            <button key={f.k} onClick={() => setFiltro(f.k)} className={`rounded-full px-3 py-1.5 text-xs transition ${filtro === f.k ? "bg-violet-500/20 text-violet-200" : "border border-[var(--pborder)] text-[var(--pmuted)] hover:bg-[var(--pcardhover)]"}`}>{f.l}</button>
          ))}
        </div>
        <Link href="/portal/cotizador" className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"><Plus size={15} /> Nueva</Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--pborder)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--pcard)] text-left text-xs uppercase tracking-wider text-[var(--pfaint)]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3">
                    {h.isPlaceholder ? null : (
                      <button className={`inline-flex items-center gap-1 ${h.column.getCanSort() ? "hover:text-[var(--ptext)]" : "cursor-default"}`} onClick={h.column.getToggleSortingHandler()}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {h.column.getCanSort() && <ArrowUpDown size={11} className="opacity-50" />}
                      </button>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--pborder)] hover:bg-[var(--pcardhover)]">
                {row.getVisibleCells().map((cell) => <td key={cell.id} className="px-4 py-2.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--pmuted)]">Sin cotizaciones.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
