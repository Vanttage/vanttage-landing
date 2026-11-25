"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone, Mail, Users2, StickyNote, Send, Loader2, Pencil, Building2, FileText, History, X } from "lucide-react";
import { toast } from "sonner";
import {
  ETAPAS as ETAPAS_UI,
  EstadoBadge,
  EtapaBadge,
  EmptyState,
  btnPrimary,
  btnSecondary,
  inputCls,
  labelCls,
  cardCls,
  kickerCls,
} from "../../_components/ui";

export const ETAPAS = ETAPAS_UI;
const CANALES = ["WhatsApp", "Llamada", "Correo", "Reunión", "Nota"] as const;
const AUTORES = ["Carlos", "Moisés"];

const canalIcon: Record<string, typeof MessageCircle> = {
  WhatsApp: MessageCircle, Llamada: Phone, Correo: Mail, Reunión: Users2, Nota: StickyNote,
};
const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fechaHora = (s: string) =>
  new Date(s).toLocaleString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "America/Bogota" });

interface Cliente { id: string; nombre: string; empresa: string | null; whatsapp: string | null; email: string | null; notas: string | null; etapa: string | null; }
interface Inter { id: string; canal: string; detalle: string; autor: string | null; created_at: string; }
interface Cot { id: string; numero: string | null; consecutivo: number; total: number; estado: string; created_at: string; }

export default function ClienteDetalle({ cliente, interacciones, cotizaciones }: { cliente: Cliente; interacciones: Inter[]; cotizaciones: Cot[]; }) {
  const router = useRouter();
  const [etapa, setEtapa] = useState(cliente.etapa || "Prospecto");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    empresa: cliente.empresa || "", whatsapp: cliente.whatsapp || "", email: cliente.email || "", notas: cliente.notas || "",
  });
  const [canal, setCanal] = useState<string>("WhatsApp");
  const [autor, setAutor] = useState("Carlos");
  const [detalle, setDetalle] = useState("");
  const [busy, setBusy] = useState(false);

  async function patchCliente(body: Record<string, unknown>) {
    const r = await fetch(`/api/portal/clientes/${cliente.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (!r.ok) throw new Error();
    router.refresh();
  }

  async function cambiarEtapa(e: string) {
    const anterior = etapa;
    setEtapa(e);
    try {
      await patchCliente({ etapa: e });
      toast.success(`Etapa: ${e}`);
    } catch {
      setEtapa(anterior);
      toast.error("No se pudo cambiar la etapa");
    }
  }

  async function guardarDatos() {
    setBusy(true);
    try {
      await patchCliente(form);
      setEditing(false);
      toast.success("Datos actualizados");
    } catch {
      toast.error("No se pudieron guardar los datos");
    } finally {
      setBusy(false);
    }
  }

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    if (!detalle.trim()) return;
    setBusy(true);
    try {
      const r = await fetch("/api/portal/interacciones", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente_id: cliente.id, canal, autor, detalle }),
      });
      if (!r.ok) throw new Error();
      setDetalle("");
      toast.success("Interacción registrada");
      router.refresh();
    } catch {
      toast.error("No se pudo registrar la interacción");
    } finally {
      setBusy(false);
    }
  }

  const datos = [
    { icon: Building2, label: "Empresa", value: cliente.empresa },
    { icon: MessageCircle, label: "WhatsApp", value: cliente.whatsapp },
    { icon: Mail, label: "Correo", value: cliente.email },
    { icon: StickyNote, label: "Notas", value: cliente.notas },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-5">
      {/* Columna izquierda: datos + etapa + cotizaciones */}
      <div className="space-y-4 lg:space-y-5">
        <section className={`${cardCls} p-5`} aria-labelledby="datos-titulo">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 id="datos-titulo" className={kickerCls}>Datos de contacto</h2>
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              aria-expanded={editing}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-[var(--pmuted)] transition-colors hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)] md:min-h-9"
            >
              {editing ? <X size={14} aria-hidden /> : <Pencil size={14} aria-hidden />} {editing ? "Cancelar" : "Editar"}
            </button>
          </div>

          <div className="mb-5">
            <label htmlFor="etapa-cliente" className={labelCls}>Etapa del pipeline</label>
            <div className="flex items-center gap-3">
              <select id="etapa-cliente" value={etapa} onChange={(e) => cambiarEtapa(e.target.value)} className={inputCls}>
                {ETAPAS.map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
              <span className="hidden shrink-0 sm:block"><EtapaBadge etapa={etapa} /></span>
            </div>
          </div>

          {editing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                guardarDatos();
              }}
              className="space-y-3"
            >
              <div>
                <label htmlFor="d-empresa" className={labelCls}>Empresa</label>
                <input id="d-empresa" className={inputCls} value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
              </div>
              <div>
                <label htmlFor="d-whatsapp" className={labelCls}>WhatsApp</label>
                <input id="d-whatsapp" type="tel" inputMode="tel" className={inputCls} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
              </div>
              <div>
                <label htmlFor="d-email" className={labelCls}>Correo</label>
                <input id="d-email" type="email" inputMode="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label htmlFor="d-notas" className={labelCls}>Notas</label>
                <textarea id="d-notas" rows={3} className={`${inputCls} py-2.5`} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} />
              </div>
              <div className="flex gap-2 pt-1">
                <button type="submit" disabled={busy} className={btnPrimary}>
                  {busy && <Loader2 size={15} className="animate-spin motion-reduce:animate-none" aria-hidden />} Guardar cambios
                </button>
                <button type="button" onClick={() => setEditing(false)} className={btnSecondary}>Cancelar</button>
              </div>
            </form>
          ) : (
            <dl className="divide-y divide-[var(--pborder)] border-t border-[var(--pborder)]">
              {datos.map((d) => (
                <div key={d.label} className="flex items-start gap-3 py-3">
                  <d.icon size={16} className="mt-0.5 shrink-0 text-[var(--pfaint)]" aria-hidden />
                  <dt className="w-20 shrink-0 text-sm text-[var(--pfaint)]">{d.label}</dt>
                  <dd className={`min-w-0 flex-1 break-words text-sm ${d.value ? "text-[var(--ptext)]" : "text-[var(--pfaint)]"}`}>
                    {d.value || "Sin dato"}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </section>

        <section className={`${cardCls} p-5`} aria-labelledby="cots-titulo">
          <h2 id="cots-titulo" className={`${kickerCls} mb-3`}>Cotizaciones ({cotizaciones.length})</h2>
          {cotizaciones.length === 0 ? (
            <EmptyState
              compact
              icon={FileText}
              title="Sin cotizaciones"
              action={<Link href="/portal/cotizador" className={btnSecondary}>Crear cotización</Link>}
            />
          ) : (
            <ul className="space-y-2">
              {cotizaciones.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/portal/cotizador?id=${c.id}`}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[var(--pborder)] px-3.5 py-2.5 text-sm transition-colors hover:border-[var(--pborder-strong)] hover:bg-[var(--pcardhover)]"
                  >
                    <span className="font-medium tabular-nums">{c.numero || `#${c.consecutivo}`}</span>
                    <span className="ml-auto tabular-nums text-[var(--pmuted)]">{fmt(c.total)}</span>
                    <EstadoBadge estado={c.estado} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Columna derecha: registrar + timeline */}
      <div className="space-y-4 lg:space-y-5">
        <form onSubmit={registrar} className={`${cardCls} p-5`} aria-labelledby="registrar-titulo">
          <h2 id="registrar-titulo" className={`${kickerCls} mb-4`}>Registrar interacción</h2>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="i-canal" className={labelCls}>Canal</label>
              <select id="i-canal" value={canal} onChange={(e) => setCanal(e.target.value)} className={inputCls}>
                {CANALES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="i-autor" className={labelCls}>Quién</label>
              <select id="i-autor" value={autor} onChange={(e) => setAutor(e.target.value)} className={inputCls}>
                {AUTORES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <label htmlFor="i-detalle" className={labelCls}>Qué se hizo</label>
          <div className="flex gap-2">
            <input
              id="i-detalle"
              className={inputCls}
              placeholder="Ej.: le envié la cotización por WhatsApp"
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
            />
            <button type="submit" disabled={busy || !detalle.trim()} aria-label="Registrar interacción" className={`${btnPrimary} w-11 shrink-0 px-0 md:w-10`}>
              {busy ? <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden /> : <Send size={16} aria-hidden />}
            </button>
          </div>
        </form>

        <section className={`${cardCls} p-5`} aria-labelledby="historial-titulo">
          <h2 id="historial-titulo" className={`${kickerCls} mb-4`}>Historial ({interacciones.length})</h2>
          {interacciones.length === 0 ? (
            <EmptyState compact icon={History} title="Sin interacciones registradas" text="Anota llamadas, mensajes o reuniones para no perder el hilo." />
          ) : (
            <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-[var(--pborder)]">
              {interacciones.map((it) => {
                const Icon = canalIcon[it.canal] || StickyNote;
                return (
                  <li key={it.id} className="relative flex gap-3">
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--pborder)] bg-[var(--pelev)] text-[var(--paccent)]">
                      <Icon size={14} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1 pt-1">
                      <p className="text-sm text-[var(--ptext)]">{it.detalle}</p>
                      <p className="mt-0.5 text-xs text-[var(--pfaint)]">
                        {it.canal}{it.autor ? ` · ${it.autor}` : ""} · {fechaHora(it.created_at)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
