"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, Search, Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import OrigenBadge from "./OrigenBadge";

const ETAPAS = ["Prospecto", "Contactado", "Cotizado", "Aprobado", "En desarrollo", "Entregado", "Perdido"];

export interface Cliente {
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

const empty = { id: "", nombre: "", empresa: "", whatsapp: "", email: "", notas: "", etapa: "Prospecto" };

export default function ContactosTable({ initial }: { initial: Cliente[] }) {
  const [data, setData] = useState<Cliente[]>(initial);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState<null | typeof empty>(null);
  const [busy, setBusy] = useState(false);

  async function refetch() {
    try {
      const r = await fetch("/api/portal/clientes");
      if (r.ok) setData((await r.json()).clientes ?? []);
    } catch {}
  }

  // Auto-refresco cada 25s (sensación en vivo sin recargar)
  useEffect(() => {
    const t = setInterval(refetch, 25000);
    return () => clearInterval(t);
  }, []);

  async function guardar() {
    if (!modal?.nombre.trim()) return toast.error("El nombre es obligatorio");
    setBusy(true);
    const isEdit = !!modal.id;
    const res = await fetch(isEdit ? `/api/portal/clientes/${modal.id}` : "/api/portal/clientes", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modal),
    });
    setBusy(false);
    if (res.ok) {
      toast.success(isEdit ? "Contacto actualizado" : "Contacto creado");
      setModal(null);
      refetch();
    } else {
      toast.error("No se pudo guardar");
    }
  }

  async function borrar(c: Cliente) {
    if (!confirm(`¿Eliminar a ${c.nombre}? Esto también borra sus cotizaciones e interacciones.`)) return;
    const res = await fetch(`/api/portal/clientes/${c.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Contacto eliminado");
      setData((d) => d.filter((x) => x.id !== c.id));
    } else toast.error("No se pudo eliminar");
  }

  const columns = useMemo<ColumnDef<Cliente>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
        cell: (i) => (
          <a href={`/portal/clientes/${i.row.original.id}`} className="font-medium text-violet-300 hover:text-violet-200">
            {i.getValue() as string}
          </a>
        ),
      },
      { accessorKey: "empresa", header: "Empresa", cell: (i) => (i.getValue() as string) || "—" },
      { accessorKey: "whatsapp", header: "WhatsApp", cell: (i) => (i.getValue() as string) || "—" },
      { accessorKey: "email", header: "Correo", cell: (i) => (i.getValue() as string) || "—" },
      { accessorKey: "etapa", header: "Etapa", cell: (i) => (i.getValue() as string) || "Prospecto" },
      { accessorKey: "origen", header: "Origen", cell: (i) => <OrigenBadge origen={i.getValue() as string} /> },
      {
        id: "acciones",
        header: "",
        enableSorting: false,
        cell: (i) => (
          <div className="flex justify-end gap-1">
            <button onClick={() => setModal({ ...empty, ...i.row.original, empresa: i.row.original.empresa || "", whatsapp: i.row.original.whatsapp || "", email: i.row.original.email || "", notas: i.row.original.notas || "", etapa: i.row.original.etapa || "Prospecto" })} className="rounded p-1.5 text-[var(--pmuted)] hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)]" title="Editar">
              <Pencil size={14} />
            </button>
            <button onClick={() => borrar(i.row.original)} className="rounded p-1.5 text-[var(--pmuted)] hover:bg-red-500/10 hover:text-red-400" title="Eliminar">
              <Trash2 size={14} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: q },
    onSortingChange: setSorting,
    onGlobalFilterChange: setQ,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const inp = "w-full rounded-lg border border-[var(--pborder)] bg-[var(--pinput)] px-3 py-2 text-sm outline-none placeholder:text-[var(--pfaint)] focus:border-violet-400/50";

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--pfaint)]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className={`${inp} pl-9`} />
        </div>
        <button onClick={() => setModal({ ...empty })} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white">
          <Plus size={15} /> Nuevo
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--pborder)]">
        <table className="w-full text-sm">
          <thead className="bg-[var(--pcard)] text-left text-xs uppercase tracking-wider text-[var(--pfaint)]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-4 py-3">
                    {h.isPlaceholder ? null : (
                      <button
                        className={`inline-flex items-center gap-1 ${h.column.getCanSort() ? "hover:text-[var(--ptext)]" : "cursor-default"}`}
                        onClick={h.column.getToggleSortingHandler()}
                      >
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
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2.5">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-[var(--pmuted)]">Sin resultados.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal crear/editar */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setModal(null)}>
          <div className="w-full max-w-md rounded-2xl border border-[var(--pborder)] bg-[var(--psidebar)] p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">{modal.id ? "Editar contacto" : "Nuevo contacto"}</h3>
              <button onClick={() => setModal(null)} className="text-[var(--pmuted)] hover:text-[var(--ptext)]"><X size={18} /></button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input className={inp} placeholder="Nombre *" value={modal.nombre} onChange={(e) => setModal({ ...modal, nombre: e.target.value })} />
              <input className={inp} placeholder="Empresa" value={modal.empresa} onChange={(e) => setModal({ ...modal, empresa: e.target.value })} />
              <input className={inp} placeholder="WhatsApp" value={modal.whatsapp} onChange={(e) => setModal({ ...modal, whatsapp: e.target.value })} />
              <input className={inp} placeholder="Correo" value={modal.email} onChange={(e) => setModal({ ...modal, email: e.target.value })} />
              <select className={inp} value={modal.etapa} onChange={(e) => setModal({ ...modal, etapa: e.target.value })}>
                {ETAPAS.map((x) => <option key={x} value={x} className="bg-[var(--psidebar)]">{x}</option>)}
              </select>
            </div>
            <input className={`${inp} mt-3`} placeholder="Notas" value={modal.notas} onChange={(e) => setModal({ ...modal, notas: e.target.value })} />
            <button onClick={guardar} disabled={busy} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
              {busy ? <Loader2 size={15} className="animate-spin" /> : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
