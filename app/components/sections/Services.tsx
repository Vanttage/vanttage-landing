"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, LineChart, Zap } from "lucide-react";

const services = [
  {
    icon: Globe,
    tag: "01",
    title: "Desarrollo Web",
    description:
      "Aplicaciones web rápidas, seguras y mantenibles para productos digitales con ambición real de crecimiento.",
    highlights: [
      "Next.js y TypeScript",
      "Arquitectura escalable",
      "Experiencia web premium",
    ],
  },
  {
    icon: Cpu,
    tag: "02",
    title: "Sistemas Internos",
    description:
      "CRMs, ERPs, backoffices y plataformas operativas que reemplazan fricción manual por trazabilidad y control.",
    highlights: ["Roles y permisos", "Flujos operativos", "Data centralizada"],
  },
  {
    icon: Zap,
    tag: "03",
    title: "Automatización",
    description:
      "Integramos procesos, datos y acciones para que tu equipo deje de repetir trabajo que una arquitectura correcta puede absorber.",
    highlights: [
      "Integraciones API",
      "Webhooks y eventos",
      "Alertas y tareas automáticas",
    ],
  },
  {
    icon: LineChart,
    tag: "04",
    title: "Optimización de Procesos",
    description:
      "Detectamos dónde se pierde tiempo, consistencia o capacidad y lo convertimos en un sistema mejor diseñado.",
    highlights: [
      "Diagnóstico técnico",
      "Mapeo de fricción",
      "Roadmap de mejora",
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      className="section-shell scroll-mt-28 overflow-hidden bg-[#020617]"
    >
      <div className="absolute left-1/2 top-0 h-28 w-px -translate-x-1/2 bg-gradient-to-b from-[#1EA7FF]/30 to-transparent" />
      <div className="absolute right-0 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[#0A2540]/85 blur-[140px]" />

      <div className="section-inner">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="section-kicker">Servicios</p>
            <h2 className="section-title text-white">
              Ingeniería para ordenar,
              <br />
              <span className="text-[#1EA7FF]">simplificar y escalar.</span>
            </h2>
            <p className="section-copy mt-5 max-w-2xl">
              Vanttage interviene donde la operación necesita más estructura:
              producto, sistema interno, automatización o rediseño técnico del
              proceso completo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true }}
            className="surface-panel rounded-[1.75rem] p-6"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-[#64748B]">
              Ideal cuando
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#CBD5E1]">
              <p>Tu operación ya no cabe en herramientas improvisadas.</p>
              <p>
                Necesitas visibilidad, velocidad y menos dependencia manual.
              </p>
              <p>
                Quieres un partner técnico que piense en negocio y ejecución.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 md:grid-cols-2"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.tag}
                variants={item}
                className="surface-panel group relative overflow-hidden rounded-[1.75rem] p-6 transition-all duration-300 hover:border-[#1EA7FF]/24 hover:shadow-[0_12px_36px_rgba(30,167,255,0.12)] md:p-7"
              >
                <span className="font-display absolute right-5 top-4 text-[4.5rem] font-black leading-none text-white/[0.04]">
                  {service.tag}
                </span>

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(30,167,255,0.1),transparent_55%)]" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1EA7FF]/18 bg-[linear-gradient(135deg,rgba(13,138,230,0.28),rgba(30,167,255,0.18))] shadow-[0_0_24px_rgba(30,167,255,0.14)]">
                    <Icon size={20} className="text-[#1EA7FF]" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#94A3B8] md:text-[15px]">
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[#CBD5E1]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
