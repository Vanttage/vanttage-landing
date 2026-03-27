"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, FileSpreadsheet, RefreshCw } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Tiempo perdido en tareas manuales",
    description:
      "Tu equipo invierte horas en copiar datos, consolidar reportes o perseguir estados que deberían resolverse solos.",
  },
  {
    icon: FileSpreadsheet,
    title: "Hojas de cálculo como sistema central",
    description:
      'Cuando Excel termina siendo tu operación, un error humano o una versión incorrecta afecta decisiones importantes.',
  },
  {
    icon: AlertTriangle,
    title: "Procesos que dejan de escalar",
    description:
      "Lo que funcionaba con pocos usuarios se vuelve cuello de botella cuando la operación crece y pide más trazabilidad.",
  },
  {
    icon: RefreshCw,
    title: "Falta de visibilidad operativa",
    description:
      "No está claro qué etapa sigue, quién tiene la responsabilidad ni dónde se está frenando el flujo de trabajo.",
  },
];

export default function Problem() {
  return (
    <section className="section-shell overflow-hidden bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1EA7FF]/6 blur-[120px]" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <p className="section-kicker">El problema</p>
          <h2 className="section-title text-white">
            Tu operación ya te está
            <br />
            <span className="text-[#94A3B8]">pidiendo otro sistema.</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            La mayoría de empresas no tienen un problema de talento ni de
            esfuerzo. Tienen un problema de estructura operativa soportada por
            herramientas que se quedaron cortas.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {pains.map((pain, index) => {
            const Icon = pain.icon;
            return (
              <motion.article
                key={pain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="surface-panel group rounded-[1.75rem] p-6 md:p-7"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#1EA7FF]/16 bg-[#1EA7FF]/10 transition-colors group-hover:bg-[#1EA7FF]/14">
                    <Icon size={18} className="text-[#9FDBFF]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {pain.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#94A3B8] md:text-[15px]">
                      {pain.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <div className="rounded-[1.5rem] border border-[#1EA7FF]/18 bg-[#1EA7FF]/8 px-6 py-4 text-center">
            <p className="text-sm leading-7 text-[#C4E9FF]">
              Si alguno de estos síntomas ya impacta tiempos, errores o
              visibilidad, hay espacio claro para rediseñar el sistema.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
