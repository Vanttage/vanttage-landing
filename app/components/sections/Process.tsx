"use client";

import { motion } from "framer-motion";
import { Hammer, Search, TrendingUp } from "lucide-react";

const phases = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    subtitle: "Entendemos antes de construir",
    description:
      "Analizamos flujos, herramientas y cuellos de botella para entender exactamente qué está generando fricción y qué merece atención primero.",
    duration: "< 48 horas",
    deliverable: "Mapa de fricción operativa",
  },
  {
    number: "02",
    icon: Hammer,
    title: "Construcción",
    subtitle: "Arquitectura antes que parche",
    description:
      "Diseñamos el sistema desde el problema real, con entregas iterativas y decisiones técnicas alineadas con la operación que debe sostener.",
    duration: "Sprints de 2 semanas",
    deliverable: "Sistema funcional en producción",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Optimización",
    subtitle: "Entrega con seguimiento real",
    description:
      "Medimos adopción, impacto y nuevas necesidades para que el sistema evolucione como una pieza activa de tu negocio, no como un proyecto congelado.",
    duration: "Ciclo continuo",
    deliverable: "Ajustes y mejoras priorizadas",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="section-shell scroll-mt-28 overflow-hidden bg-[#020617]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute -left-28 top-1/2 -z-10 h-[32rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#0A2540]/55 blur-[130px]" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="section-kicker">Metodología</p>
          <h2 className="section-title text-white">
            Proceso claro.
            <br />
            <span className="text-[#1EA7FF]">Cero improvisación.</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            La confianza no viene solo del resultado final. También viene de
            saber cómo se va a pensar, construir y validar cada etapa.
          </p>
        </motion.div>

        <div className="space-y-5">
          {phases.map((phase, index) => {
            const Icon = phase.icon;

            return (
              <motion.article
                key={phase.number}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="surface-panel group relative overflow-hidden rounded-[1.9rem]"
              >
                <span className="font-display absolute right-4 top-4 text-[5.5rem] font-black leading-none text-white/[0.04] md:right-8 md:top-1/2 md:-translate-y-1/2 md:text-[10rem]">
                  {phase.number}
                </span>

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,rgba(30,167,255,0.08),transparent_55%)]" />
                </div>

                <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:p-9">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1EA7FF]/18 bg-[#1EA7FF]/10">
                      <Icon size={20} className="text-[#1EA7FF]" />
                    </div>
                    <span className="font-display text-4xl font-black text-[#1EA7FF]/35">
                      {phase.number}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#94A3B8]">
                      {phase.subtitle}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold text-white md:text-3xl">
                      {phase.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A3B8] md:text-[15px]">
                      {phase.description}
                    </p>
                  </div>

                  <div className="grid gap-4 md:min-w-[14rem]">
                    <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#64748B]">
                        Tiempo
                      </p>
                      <p className="mt-1 text-sm font-medium text-white">
                        {phase.duration}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#64748B]">
                        Entregable
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#D6F0FF]">
                        {phase.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
