"use client";

import { motion } from "framer-motion";
import { Compass, PenTool, Hammer, TrendingUp } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const phases = [
  {
    number: "01",
    icon: Compass,
    color: "#1EA7FF",
    title: "Diagnóstico",
    subtitle: "Entendemos antes de proponer",
    description:
      "Revisamos tu sitio, competencia y objetivos. Te entregamos un mapa claro de oportunidades y prioridades.",
    duration: "24–48 horas",
    deliverable: "Mapa de oportunidades",
  },
  {
    number: "02",
    icon: PenTool,
    color: "#4FC3FF",
    title: "Diseño",
    subtitle: "La forma que comunica lo correcto",
    description:
      "Mockups y prototipos navegables. Iteramos contigo hasta que cada sección transmita exactamente lo que necesitas.",
    duration: "1–2 semanas",
    deliverable: "Diseño aprobado",
  },
  {
    number: "03",
    icon: Hammer,
    color: "#D4AF37",
    title: "Construcción",
    subtitle: "Código limpio, pensado para durar",
    description:
      "Desarrollo con Next.js y las mejores prácticas. Entregas iterativas cada sprint para que veas el avance real.",
    duration: "Sprints de 2 semanas",
    deliverable: "Sitio funcional en staging",
  },
  {
    number: "04",
    icon: TrendingUp,
    color: "#F2D77B",
    title: "Lanzamiento & soporte",
    subtitle: "No te dejamos solo el día del launch",
    description:
      "Puesta en producción, analytics, SEO on-page y acompañamiento continuo. Tu web evoluciona con el negocio.",
    duration: "Ciclo continuo",
    deliverable: "Sitio en producción",
  },
];

export default function Process() {
  return (
    <section id="process" className="section-shell scroll-mt-24 overflow-hidden bg-[#061729]">
      <div className="divider-top" />
      <div className="elec-glow -right-20 top-1/4 h-[28rem] w-[28rem] opacity-25" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="section-kicker justify-center mb-5">Metodología</p>
          <h2 className="section-title">
            Proceso claro.{" "}
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(90deg, #1EA7FF, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cero improvisación.
            </span>
          </h2>
          <p className="section-copy mx-auto mt-6 max-w-2xl">
            La confianza viene de saber exactamente qué va a pasar, cuándo y por qué.
          </p>
        </motion.div>

        <div className="space-y-4">
          {phases.map((phase, i) => {
            const Icon = phase.icon;
            return (
              <motion.article
                key={phase.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
                viewport={{ once: true }}
                className="glass-card group relative overflow-hidden rounded-2xl"
              >
                {/* Left accent bar */}
                <div
                  className="absolute inset-y-0 left-0 w-1 rounded-full"
                  style={{ background: phase.color }}
                />

                {/* Ghost number */}
                <span
                  className="font-display absolute right-4 top-2 text-[6rem] font-black leading-none opacity-[0.03] md:top-1/2 md:-translate-y-1/2 md:text-[8rem]"
                  style={{ color: phase.color }}
                >
                  {phase.number}
                </span>

                <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:pl-8 md:pr-8 md:py-8">
                  {/* Icon + number */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-xl border"
                      style={{
                        borderColor: `${phase.color}25`,
                        background: `${phase.color}12`,
                      }}
                    >
                      <Icon size={22} style={{ color: phase.color }} />
                    </div>
                    <span
                      className="font-display text-4xl font-black opacity-40"
                      style={{ color: phase.color }}
                    >
                      {phase.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B]">{phase.subtitle}</p>
                    <h3 className="font-display mt-2 text-2xl font-bold text-white md:text-3xl">{phase.title}</h3>
                    <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#94A3B8]">{phase.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="grid gap-3 md:min-w-[14rem]">
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#475569]">Tiempo</p>
                      <p className="font-display mt-1 text-sm font-semibold text-white">{phase.duration}</p>
                    </div>
                    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-[#475569]">Entregable</p>
                      <p className="font-display mt-1 text-sm font-semibold" style={{ color: phase.color }}>
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
