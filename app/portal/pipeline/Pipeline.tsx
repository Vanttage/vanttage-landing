"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ETAPAS = ["Prospecto", "Contactado", "Cotizado", "Aprobado", "En desarrollo", "Entregado", "Perdido"];

interface C { id: string; nombre: string; empresa: string | null; whatsapp: string | null; etapa: string | null; }

export default function Pipeline({ clientes }: { clientes: C[] }) {
  const router = useRouter();
  const [items, setItems] = useState(clientes);

  async function mover(id: string, etapa: string) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, etapa } : c)));
    await fetch(`/api/portal/clientes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ etapa }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {ETAPAS.map((etapa) => {
        const cards = items.filter((c) => (c.etapa || "Prospecto") === etapa);
        return (
          <div key={etapa} className="w-64 shrink-0">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-sm font-medium text-white/70">{etapa}</p>
              <span className="rounded-full bg-white/10 px-2 text-xs text-white/50">{cards.length}</span>
            </div>
            <div className="space-y-2 rounded-xl border border-white/5 bg-white/[0.02] p-2 min-h-[120px]">
              {cards.map((c) => (
                <div key={c.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
                  <Link href={`/portal/clientes/${c.id}`} className="block">
                    <p className="text-sm font-medium text-white hover:text-violet-200">{c.nombre}</p>
                    {c.empresa && <p className="text-xs text-white/40">{c.empresa}</p>}
                    {c.whatsapp && <p className="mt-1 text-xs text-white/40">📱 {c.whatsapp}</p>}
                  </Link>
                  <select
                    value={etapa}
                    onChange={(e) => mover(c.id, e.target.value)}
                    className="mt-2 w-full rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70 outline-none focus:border-violet-400/50"
                  >
                    {ETAPAS.map((e) => <option key={e} value={e} className="bg-[#0A0A14]">{e}</option>)}
                  </select>
                </div>
              ))}
              {cards.length === 0 && <p className="px-1 py-4 text-center text-xs text-white/25">—</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
