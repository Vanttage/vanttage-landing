"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CiteLine, type Cite } from "./StatQuote";

type Bar = { label: string; value: number; display: string; highlight?: boolean };

/* Gráfico de barras horizontal en CSS. Los números van en texto al lado de cada
   barra, así que la información no depende del color ni de la animación. */
export default function BarChart({
  title,
  bars,
  max,
  cite,
  note,
}: {
  title: string;
  bars: Bar[];
  max?: number;
  cite: Cite;
  note?: string;
}) {
  const reduce = useReducedMotion();
  const top = max ?? Math.max(...bars.map((b) => b.value));
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="font-semibold tracking-tight text-white">{title}</p>
      <ul className="mt-6 space-y-5">
        {bars.map((b, i) => (
          <li key={b.label}>
            <div className="flex items-baseline justify-between gap-4 text-[15px]">
              <span className="text-zinc-300">{b.label}</span>
              <span className={`font-semibold tabular-nums ${b.highlight ? "text-violet-300" : "text-white"}`}>{b.display}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.07]" aria-hidden>
              <motion.div
                className={`h-full origin-left rounded-full ${b.highlight ? "bg-violet-400" : "bg-zinc-500"}`}
                style={{ width: `${Math.max((b.value / top) * 100, 1.5)}%` }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={reduce ? undefined : { scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </li>
        ))}
      </ul>
      {note && <p className="mt-5 text-[13px] leading-relaxed text-zinc-400">{note}</p>}
      <figcaption className="mt-4 border-t border-white/10 pt-3">
        <CiteLine cite={cite} />
      </figcaption>
    </figure>
  );
}
