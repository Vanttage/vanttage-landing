"use client";

import { motion, useReducedMotion } from "framer-motion";
import CountUp from "@/app/components/CountUp";

export type Cite = {
  /** Quién publica el dato (p. ej. "Unbounce") */
  who: string;
  /** Nombre del estudio o informe */
  work?: string;
  /** Año del estudio original */
  year: string;
  /** Medio por el que se consulta, si no es la fuente original */
  via?: string;
  href: string;
};

export function CiteLine({ cite, className = "" }: { cite: Cite; className?: string }) {
  return (
    <p className={`text-[13px] leading-relaxed text-zinc-400 ${className}`}>
      <span className="font-medium text-zinc-300">Fuente:</span>{" "}
      <a
        href={cite.href}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-sm text-violet-300 underline decoration-violet-300/40 underline-offset-[3px] transition-colors hover:text-white hover:decoration-white/60"
      >
        {cite.who}
        {cite.work ? `, ${cite.work}` : ""} ({cite.year})
        {cite.via ? `, vía ${cite.via}` : ""}
      </a>
    </p>
  );
}

/* Bloque de cita: cifra grande con contador, la frase y la fuente a la vista.
   Aparece al hacer scroll; con reduced motion se muestra quieto. */
export default function StatQuote({
  figure,
  text,
  cite,
  note,
  delay = 0,
}: {
  figure: string;
  text: string;
  cite: Cite;
  /** Aclaración corta (antigüedad, país, muestra) */
  note?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
    >
      <p className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
        <CountUp value={figure} />
      </p>
      <span className="mt-4 block h-px w-10 bg-violet-300/70" aria-hidden />
      <blockquote className="mt-4 text-[15px] leading-relaxed text-zinc-300">{text}</blockquote>
      {note && <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{note}</p>}
      <figcaption className="mt-auto pt-4">
        <CiteLine cite={cite} className="border-t border-white/10 pt-3" />
      </figcaption>
    </motion.figure>
  );
}
