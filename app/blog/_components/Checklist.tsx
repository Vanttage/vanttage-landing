"use client";

import { useState } from "react";

/* Autoevaluación con casillas reales: cuenta los "sí" y da un resultado.
   El resultado se anuncia con aria-live para lectores de pantalla. */
export default function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));
  const yes = checked.filter(Boolean).length;
  const missing = items.length - yes;

  const result =
    yes === 0
      ? "Marca las preguntas a las que respondes que sí."
      : missing === 0
        ? "Tu web cumple lo básico. El siguiente paso es medir cuántas visitas terminan en contacto."
        : `Te faltan ${missing} de ${items.length}. Cada punto que falla es un cliente que se puede estar yendo.`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <fieldset className="p-6">
        <legend className="sr-only">Evalúa tu web ahora mismo</legend>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300" aria-hidden>
          Autoevaluación
        </p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-white" aria-hidden>
          Evalúa tu web ahora mismo
        </p>
        <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
          {items.map((q, i) => (
            <li key={q}>
              <label className="flex min-h-12 cursor-pointer items-center gap-4 py-3 text-[15px] leading-snug text-zinc-300 transition-colors hover:text-white">
                <input
                  type="checkbox"
                  checked={checked[i]}
                  onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
                  className="h-5 w-5 shrink-0 accent-violet-400"
                />
                {q}
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-center gap-4">
          <span className="text-3xl font-semibold tabular-nums tracking-tight text-white">
            {yes}/{items.length}
          </span>
          <p className="text-[15px] leading-snug text-zinc-300" aria-live="polite">
            {result}
          </p>
        </div>
      </fieldset>
    </div>
  );
}
