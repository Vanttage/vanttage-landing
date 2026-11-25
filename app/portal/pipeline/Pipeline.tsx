"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Building2, MessageCircle } from "lucide-react";
import { ETAPAS, etapaTone } from "../_components/ui";

interface C { id: string; nombre: string; empresa: string | null; whatsapp: string | null; etapa: string | null; }

export default function Pipeline({ clientes }: { clientes: C[] }) {
  const router = useRouter();
  const [items, setItems] = useState(clientes);

  async function mover(id: string, etapa: string) {
    const anterior = items.find((c) => c.id === id)?.etapa ?? "Prospecto";
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, etapa } : c)));
    try {
      const r = await fetch(`/api/portal/clientes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etapa }),
      });
      if (!r.ok) throw new Error();
      toast.success(`Movido a ${etapa}`);
      router.refresh();
    } catch {
      // Revertir si el servidor falla
      setItems((prev) => prev.map((c) => (c.id === id ? { ...c, etapa: anterior } : c)));
      toast.error("No se pudo mover el contacto");
    }
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8" tabIndex={0} aria-label="Columnas del pipeline, desplazable en horizontal">
      <div className="flex snap-x snap-mandatory gap-3 md:snap-none md:gap-4">
        {ETAPAS.map((etapa, idx) => {
          const cards = items.filter((c) => (c.etapa || "Prospecto") === etapa);
          const tone = etapaTone[etapa] ?? "neutral";
          return (
            <section
              key={etapa}
              aria-labelledby={`col-${idx}`}
              className="flex w-[82vw] max-w-[300px] shrink-0 snap-start flex-col rounded-2xl border border-[var(--pborder)] bg-[var(--pcard)] sm:w-72"
            >
              <header className="flex items-center justify-between gap-2 border-b border-[var(--pborder)] px-4 py-3">
                <h2 id={`col-${idx}`} className="flex items-center gap-2 text-sm font-medium">
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: `var(--pt-${tone})` }} />
                  {etapa}
                </h2>
                <span className="rounded-full bg-[var(--pchip)] px-2 py-0.5 text-xs tabular-nums text-[var(--pmuted)]" aria-label={`${cards.length} contactos`}>
                  {cards.length}
                </span>
              </header>
              <ul className="flex min-h-[140px] flex-1 flex-col gap-2 p-2.5">
                {cards.map((c) => (
                  <li
                    key={c.id}
                    className="rounded-xl border border-[var(--pborder)] bg-[var(--pelev)] p-3.5 shadow-sm shadow-black/5 transition-colors hover:border-[var(--pborder-strong)]"
                  >
                    <Link href={`/portal/clientes/${c.id}`} className="block rounded-md">
                      <p className="truncate text-sm font-medium text-[var(--ptext)] hover:text-[var(--paccent)]">{c.nombre}</p>
                      {c.empresa && (
                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[var(--pmuted)]">
                          <Building2 size={12} className="shrink-0" aria-hidden /> {c.empresa}
                        </p>
                      )}
                      {c.whatsapp && (
                        <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-[var(--pfaint)] tabular-nums">
                          <MessageCircle size={12} className="shrink-0" aria-hidden /> {c.whatsapp}
                        </p>
                      )}
                    </Link>
                    <label htmlFor={`etapa-${c.id}`} className="sr-only">
                      Cambiar etapa de {c.nombre}
                    </label>
                    <select
                      id={`etapa-${c.id}`}
                      value={etapa}
                      onChange={(e) => mover(c.id, e.target.value)}
                      className="mt-3 min-h-11 w-full cursor-pointer rounded-lg border border-[var(--pborder)] bg-[var(--pinput)] px-2.5 text-xs text-[var(--pmuted)] outline-none transition-colors hover:border-[var(--pborder-strong)] focus:border-[var(--paccent-line)] md:min-h-9"
                    >
                      {ETAPAS.map((e) => (
                        <option key={e} value={e}>
                          {e === etapa ? `En ${e}` : `Mover a ${e}`}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
                {cards.length === 0 && (
                  <li className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-[var(--pborder)] px-3 py-6 text-center text-xs text-[var(--pfaint)]">
                    Sin contactos en esta etapa
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
