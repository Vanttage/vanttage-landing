"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone, Mail, Users2, StickyNote, Send, Loader2, Pencil } from "lucide-react";

export const ETAPAS = ["Prospecto", "Contactado", "Cotizado", "Aprobado", "En desarrollo", "Entregado", "Perdido"];
const CANALES = ["WhatsApp", "Llamada", "Correo", "Reunión", "Nota"] as const;
const AUTORES = ["Carlos", "Moisés"];

const canalIcon: Record<string, typeof MessageCircle> = {
  WhatsApp: MessageCircle, Llamada: Phone, Correo: Mail, Reunión: Users2, Nota: StickyNote,
};
const fmt = (n: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n || 0);
const fechaHora = (s: string) => new Date(s).toLocaleString("es-CO", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

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
    await fetch(`/api/portal/clientes/${cliente.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    router.refresh();
  }

  async function cambiarEtapa(e: string) { setEtapa(e); await patchCliente({ etapa: e }); }

  async function guardarDatos() {
    setBusy(true);
    await patchCliente(form);
    setEditing(false);
    setBusy(false);
  }

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    if (!detalle.trim()) return;
    setBusy(true);
    await fetch("/api/portal/interacciones", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cliente_id: cliente.id, canal, autor, detalle }),
    });
    setDetalle("");
    setBusy(false);
    router.refresh();
  }

  const input = "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-violet-400/50";

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
      {/* Columna izquierda: datos + etapa + cotizaciones */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-white/40">Etapa del pipeline</p>
            <button onClick={() => setEditing((v) => !v)} className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white">
              <Pencil size={12} /> {editing ? "Cerrar" : "Editar datos"}
            </button>
          </div>
          <select value={etapa} onChange={(e) => cambiarEtapa(e.target.value)} className={`${input} mb-4`}>
            {ETAPAS.map((e) => <option key={e} value={e} className="bg-[#0A0A14]">{e}</option>)}
          </select>

          {editing ? (
            <div className="space-y-2">
              <input className={input} placeholder="Empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
              <input className={input} placeholder="WhatsApp" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
              <input className={input} placeholder="Correo" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea className={input} placeholder="Notas" rows={2} value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })} />
              <button onClick={guardarDatos} disabled={busy} className="rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Guardar</button>
            </div>
          ) : (
            <div className="space-y-1 text-sm text-white/60">
              {cliente.empresa && <p>🏢 {cliente.empresa}</p>}
              {cliente.whatsapp && <p>📱 {cliente.whatsapp}</p>}
              {cliente.email && <p>✉️ {cliente.email}</p>}
              {cliente.notas && <p className="text-white/40">📝 {cliente.notas}</p>}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-3 text-xs uppercase tracking-wider text-white/40">Cotizaciones ({cotizaciones.length})</p>
          {cotizaciones.length === 0 ? (
            <p className="text-sm text-white/40">Sin cotizaciones.</p>
          ) : (
            <div className="space-y-2">
              {cotizaciones.map((c) => (
                <Link key={c.id} href={`/portal/cotizador?id=${c.id}`} className="flex items-center justify-between rounded-lg border border-white/5 px-3 py-2 text-sm hover:bg-white/5">
                  <span className="text-violet-300">{c.numero || `#${c.consecutivo}`}</span>
                  <span>{fmt(c.total)}</span>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">{c.estado}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Columna derecha: registrar + timeline */}
      <div className="space-y-5">
        <form onSubmit={registrar} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-3 text-xs uppercase tracking-wider text-white/40">Registrar interacción</p>
          <div className="mb-2 flex gap-2">
            <select value={canal} onChange={(e) => setCanal(e.target.value)} className={input}>
              {CANALES.map((c) => <option key={c} value={c} className="bg-[#0A0A14]">{c}</option>)}
            </select>
            <select value={autor} onChange={(e) => setAutor(e.target.value)} className={input}>
              {AUTORES.map((a) => <option key={a} value={a} className="bg-[#0A0A14]">{a}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <input className={input} placeholder="¿Qué se hizo? (ej: le envié la cotización por WhatsApp)" value={detalle} onChange={(e) => setDetalle(e.target.value)} />
            <button type="submit" disabled={busy} className="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 text-white disabled:opacity-50">
              {busy ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            </button>
          </div>
        </form>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <p className="mb-4 text-xs uppercase tracking-wider text-white/40">Historial ({interacciones.length})</p>
          {interacciones.length === 0 ? (
            <p className="text-sm text-white/40">Aún no hay interacciones registradas.</p>
          ) : (
            <div className="space-y-4">
              {interacciones.map((it) => {
                const Icon = canalIcon[it.canal] || StickyNote;
                return (
                  <div key={it.id} className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white/80">{it.detalle}</p>
                      <p className="text-xs text-white/40">
                        {it.canal}{it.autor ? ` · ${it.autor}` : ""} · {fechaHora(it.created_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
