"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Pencil, Trash2, Loader2, Users, SearchX, Building2, MessageCircle, Mail } from "lucide-react";
import { toast } from "sonner";
import OrigenBadge from "./OrigenBadge";
import Modal from "../_components/Modal";
import { NUEVO_CONTACTO_EVENT } from "./NuevoContactoButton";
import {
  ETAPAS,
  EtapaBadge,
  EmptyState,
  btnPrimary,
  btnSecondary,
  btnGhostIcon,
  btnDangerIcon,
  inputCls,
  labelCls,
  cardCls,
} from "../_components/ui";

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

  // Auto-refresco cada 25s (se pausa mientras el modal está abierto para no pisar la edición)
  useEffect(() => {
    if (modal) return;
    const t = setInterval(refetch, 25000);
    return () => clearInterval(t);
  }, [modal]);

  // El botón "Nuevo contacto" del encabezado abre el modal
  useEffect(() => {
    const abrir = () => setModal({ ...empty });
    window.addEventListener(NUEVO_CONTACTO_EVENT, abrir);
    return () => window.removeEventListener(NUEVO_CONTACTO_EVENT, abrir);
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

  const editar = (c: Cliente) =>
    setModal({
      ...empty,
      ...c,
      empresa: c.empresa || "",
      whatsapp: c.whatsapp || "",
      email: c.email || "",
      notas: c.notas || "",
      etapa: c.etapa || "Prospecto",
    });

  const columns = useMemo<ColumnDef<Cliente>[]>(
    () => [
      {
        accessorKey: "nombre",
        header: "Nombre",
        cell: (i) => (
          <Link href={`/portal/clientes/${i.row.original.id}`} className="font-medium text-[var(--ptext)] hover:text-[var(--paccent)] hover:underline">
            {i.getValue() as string}
          </Link>
        ),
      },
      { accessorKey: "empresa", header: "Empresa", cell: (i) => <span className="text-[var(--pmuted)]">{(i.getValue() as string) || "Sin empresa"}</span> },
      { accessorKey: "whatsapp", header: "WhatsApp", cell: (i) => <span className="tabular-nums text-[var(--pmuted)]">{(i.getValue() as string) || "Sin dato"}</span> },
      { accessorKey: "email", header: "Correo", cell: (i) => <span className="text-[var(--pmuted)]">{(i.getValue() as string) || "Sin dato"}</span> },
      { accessorKey: "etapa", header: "Etapa", cell: (i) => <EtapaBadge etapa={i.getValue() as string} /> },
      { accessorKey: "origen", header: "Origen", cell: (i) => <OrigenBadge origen={i.getValue() as string} /> },
      {
        id: "acciones",
        header: () => <span className="sr-only">Acciones</span>,
        enableSorting: false,
        cell: (i) => (
          <div className="flex justify-end gap-0.5">
            <button type="button" onClick={() => editar(i.row.original)} className={btnGhostIcon} title="Editar" aria-label={`Editar ${i.row.original.nombre}`}>
              <Pencil size={15} aria-hidden />
            </button>
            <button type="button" onClick={() => borrar(i.row.original)} className={btnDangerIcon} title="Eliminar" aria-label={`Eliminar ${i.row.original.nombre}`}>
              <Trash2 size={15} aria-hidden />
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

  const rows = table.getRowModel().rows;

  const vacio = (
    <EmptyState
      icon={Users}
      title="Aún no hay contactos"
      text="Se agregan solos al guardar cotizaciones o al llegar mensajes del sitio. También puedes crearlos a mano."
      action={
        <button type="button" onClick={() => setModal({ ...empty })} className={btnPrimary}>
          Crear contacto
        </button>
      }
    />
  );

  return (
    <div>
      {data.length === 0 ? vacio : (
      <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="buscar-contactos" className="sr-only">
            Buscar contactos
          </label>
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--pfaint)]" aria-hidden />
          <input
            id="buscar-contactos"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, empresa o correo"
            className={`${inputCls} pl-10`}
          />
        </div>
        {q && (
          <p className="text-sm text-[var(--pfaint)]" aria-live="polite">
            {rows.length} {rows.length === 1 ? "resultado" : "resultados"}
          </p>
        )}
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
                    <th
                      key={h.id}
                      scope="col"
                      className="px-4 py-3 font-medium first:pl-5"
                      aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                    >
                      {h.isPlaceholder ? null : h.column.getCanSort() ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded uppercase tracking-[0.14em] hover:text-[var(--ptext)]"
                          onClick={h.column.getToggleSortingHandler()}
                        >
                          {flexRender(h.column.columnDef.header, h.getContext())}
                          {sorted === "asc" ? (
                            <ArrowUp size={12} aria-hidden />
                          ) : sorted === "desc" ? (
                            <ArrowDown size={12} aria-hidden />
                          ) : (
                            <ArrowUpDown size={12} className="opacity-50" aria-hidden />
                          )}
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
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[var(--pborder)] transition-colors first:border-0 hover:bg-[var(--pcardhover)]">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2.5 first:pl-5 last:pr-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="p-4">
            <EmptyState compact icon={SearchX} title="Sin resultados" text="Prueba con otro nombre, empresa o correo." />
          </div>
        )}
      </div>

      {/* Tarjetas (móvil) */}
      <ul className="space-y-2 md:hidden">
        {rows.map((row) => {
          const c = row.original;
          return (
            <li key={row.id} className={`${cardCls} p-4`}>
              <div className="flex items-start justify-between gap-3">
                <Link href={`/portal/clientes/${c.id}`} className="min-w-0 py-1">
                  <span className="block truncate font-medium">{c.nombre}</span>
                  {c.empresa && (
                    <span className="mt-1 flex items-center gap-1.5 truncate text-xs text-[var(--pmuted)]">
                      <Building2 size={12} aria-hidden /> {c.empresa}
                    </span>
                  )}
                </Link>
                <div className="-mr-2 -mt-1 flex shrink-0">
                  <button type="button" onClick={() => editar(c)} className={btnGhostIcon} aria-label={`Editar ${c.nombre}`}>
                    <Pencil size={16} aria-hidden />
                  </button>
                  <button type="button" onClick={() => borrar(c)} className={btnDangerIcon} aria-label={`Eliminar ${c.nombre}`}>
                    <Trash2 size={16} aria-hidden />
                  </button>
                </div>
              </div>
              {(c.whatsapp || c.email) && (
                <div className="mt-2 space-y-1 text-xs text-[var(--pfaint)]">
                  {c.whatsapp && (
                    <p className="flex items-center gap-1.5 tabular-nums">
                      <MessageCircle size={12} aria-hidden /> {c.whatsapp}
                    </p>
                  )}
                  {c.email && (
                    <p className="flex items-center gap-1.5 truncate">
                      <Mail size={12} aria-hidden /> {c.email}
                    </p>
                  )}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5">
                <EtapaBadge etapa={c.etapa} />
                <OrigenBadge origen={c.origen} />
              </div>
            </li>
          );
        })}
        {rows.length === 0 && (
          <li>
            <EmptyState compact icon={SearchX} title="Sin resultados" text="Prueba con otro nombre, empresa o correo." />
          </li>
        )}
      </ul>

      </>
      )}

      {/* Modal crear/editar */}
      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.id ? "Editar contacto" : "Nuevo contacto"}
        description={modal?.id ? "Actualiza los datos y la etapa del contacto." : "Los campos con asterisco son obligatorios."}
        footer={
          <>
            <button type="button" onClick={() => setModal(null)} className={btnSecondary}>
              Cancelar
            </button>
            <button type="submit" form="form-contacto" disabled={busy} className={btnPrimary}>
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden /> Guardando
                </>
              ) : (
                "Guardar"
              )}
            </button>
          </>
        }
      >
        {modal && (
          <form
            id="form-contacto"
            onSubmit={(e) => {
              e.preventDefault();
              guardar();
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label htmlFor="c-nombre" className={labelCls}>
                Nombre <span aria-hidden>*</span>
              </label>
              <input id="c-nombre" data-autofocus required autoComplete="off" className={inputCls} value={modal.nombre} onChange={(e) => setModal({ ...modal, nombre: e.target.value })} />
            </div>
            <div>
              <label htmlFor="c-empresa" className={labelCls}>Empresa</label>
              <input id="c-empresa" autoComplete="off" className={inputCls} value={modal.empresa} onChange={(e) => setModal({ ...modal, empresa: e.target.value })} />
            </div>
            <div>
              <label htmlFor="c-etapa" className={labelCls}>Etapa</label>
              <select id="c-etapa" className={inputCls} value={modal.etapa} onChange={(e) => setModal({ ...modal, etapa: e.target.value })}>
                {ETAPAS.map((x) => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-whatsapp" className={labelCls}>WhatsApp</label>
              <input id="c-whatsapp" type="tel" inputMode="tel" autoComplete="off" placeholder="+57 300 000 0000" className={inputCls} value={modal.whatsapp} onChange={(e) => setModal({ ...modal, whatsapp: e.target.value })} />
            </div>
            <div>
              <label htmlFor="c-email" className={labelCls}>Correo</label>
              <input id="c-email" type="email" inputMode="email" autoComplete="off" className={inputCls} value={modal.email} onChange={(e) => setModal({ ...modal, email: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-notas" className={labelCls}>Notas</label>
              <textarea id="c-notas" rows={3} className={`${inputCls} py-2.5`} value={modal.notas} onChange={(e) => setModal({ ...modal, notas: e.target.value })} />
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
