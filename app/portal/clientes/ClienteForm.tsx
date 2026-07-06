"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";

export default function ClienteForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState({ nombre: "", empresa: "", whatsapp: "", email: "", notas: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.nombre.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/portal/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, origen: "manual" }),
      });
      if (res.ok) {
        setF({ nombre: "", empresa: "", whatsapp: "", email: "", notas: "" });
        setOpen(false);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white"
      >
        <Plus size={15} /> Nuevo cliente
      </button>
    );
  }

  const input =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-violet-400/50";

  return (
    <form onSubmit={submit} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input className={input} placeholder="Nombre *" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />
        <input className={input} placeholder="Empresa" value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} />
        <input className={input} placeholder="WhatsApp" value={f.whatsapp} onChange={(e) => setF({ ...f, whatsapp: e.target.value })} />
        <input className={input} placeholder="Correo" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      </div>
      <input className={`${input} mt-3`} placeholder="Notas" value={f.notas} onChange={(e) => setF({ ...f, notas: e.target.value })} />
      <div className="mt-3 flex gap-2">
        <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : "Guardar"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 hover:bg-white/5">
          Cancelar
        </button>
      </div>
    </form>
  );
}
