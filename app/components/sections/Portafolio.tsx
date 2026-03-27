"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Sistema de Gestión Empresarial",
    description:
      "Centralización de procesos internos, aprobaciones y visibilidad operativa en una sola plataforma.",
    tag: "Caso principal",
    scope: ["Backoffice a medida", "Módulos por rol", "Reportes en tiempo real"],
    outcome: "Menos dependencia de procesos dispersos y mejor control diario.",
    large: true,
  },
  {
    title: "Plataforma Analítica",
    description:
      "Dashboards y visualización de datos para tomar decisiones con información consolidada.",
    tag: "Analytics",
    scope: ["KPIs centralizados", "Filtros avanzados"],
    outcome: "Mayor visibilidad y tiempos de lectura más cortos.",
  },
  {
    title: "Arquitectura Cloud",
    description:
      "Infraestructura preparada para despliegues confiables, escalabilidad y mantenimiento continuo.",
    tag: "Infraestructura",
    scope: ["CI/CD", "Contenedores", "Observabilidad"],
    outcome: "Base técnica más sólida para crecer sin fricción.",
  },
  {
    title: "Sistema de Facturación",
    description:
      "Flujos modernos de cobro, conciliación y trazabilidad financiera conectados al negocio.",
    tag: "Finanzas",
    scope: ["Pagos", "Automatización", "Backoffice"],
    outcome: "Menos tareas manuales y mejor seguimiento de ingresos.",
  },
  {
    title: "App Mobile Empresarial",
    description:
      "Herramienta móvil para operación distribuida, seguimiento remoto y coordinación entre equipos.",
    tag: "Mobile",
    scope: ["Operación en campo", "Sincronización", "Alertas"],
    outcome: "Más velocidad en la ejecución fuera de oficina.",
  },
];

function ProjectCard({
  title,
  description,
  tag,
  scope,
  outcome,
  large = false,
  index,
}: (typeof projects)[number] & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      viewport={{ once: true }}
      className={`surface-panel group relative overflow-hidden rounded-[1.85rem] ${
        large ? "p-7 md:p-9 lg:col-span-2 lg:min-h-[26rem]" : "p-6"
      }`}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(30,167,255,0.08),transparent_52%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-[#1EA7FF]/18 bg-[#1EA7FF]/8 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#C4E9FF]">
            {tag}
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-all group-hover:border-[#1EA7FF]/30 group-hover:text-white">
            <ArrowUpRight size={14} />
          </div>
        </div>

        <div className={`${large ? "mt-12" : "mt-8"} flex-1`}>
          <h3
            className={`font-display font-bold leading-tight text-white ${
              large ? "text-3xl md:text-4xl" : "text-xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`mt-4 leading-7 text-[#94A3B8] ${
              large ? "max-w-2xl text-base" : "text-sm"
            }`}
          >
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {scope.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-[#CBD5E1]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[1.4rem] border border-white/8 bg-black/10 px-4 py-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#64748B]">
            Resultado esperado
          </p>
          <p className="mt-2 text-sm leading-7 text-white/88">{outcome}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="section-shell scroll-mt-28 overflow-hidden bg-[#020617]"
    >
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="mt-12 h-[30rem] w-[52rem] rounded-full bg-[#1EA7FF]/6 blur-[160px]" />
      </div>

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <p className="section-kicker">Portafolio</p>
            <h2 className="section-title text-white">
              Problemas complejos.
              <br />
              <span className="text-[#1EA7FF]">Soluciones con criterio.</span>
            </h2>
          </div>
          <p className="section-copy max-w-xl lg:justify-self-end lg:text-right">
            Más que mostrar pantallas, esta sección comunica el tipo de retos que
            Vanttage puede estructurar y convertir en software útil para la
            operación.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm text-[#CBD5E1] transition-colors hover:border-[#1EA7FF]/25 hover:text-white"
          >
            Conversemos sobre un caso similar
            <ArrowUpRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
