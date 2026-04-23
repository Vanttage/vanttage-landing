"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  number: string;
  tag: string;
  title: string;
  description: string;
  detail?: string;
  metric: string;
  metricLabel: string;
  secondary?: string;
  tech: string[];
  accent: string;
  large?: boolean;
}

const projects: Project[] = [
  {
    number: "01",
    tag: "Migración",
    title: "4× más velocidad sin perder SEO",
    description:
      "Migración completa desde WordPress legacy a Next.js con SSR, optimización de imágenes y caching estratégico.",
    detail:
      "Ocho años de contenido migrado en tres semanas — cero downtime, rankings intactos.",
    metric: "1.4s",
    metricLabel: "tiempo de carga",
    secondary: "+40% retención",
    tech: ["Next.js", "Vercel", "Contentful"],
    accent: "#7c3aed",
    large: true,
  },
  {
    number: "02",
    tag: "Conversión",
    title: "Landing que convierte tráfico en clientes",
    description:
      "Rediseño con enfoque en intención de usuario, CRO y arquitectura de conversión probada.",
    metric: "3×",
    metricLabel: "leads cualificados",
    tech: ["React", "Framer Motion"],
    accent: "#1EA7FF",
  },
  {
    number: "03",
    tag: "Sistema interno",
    title: "Dashboard que elimina procesos manuales",
    description:
      "Panel de control con datos en tiempo real, roles granulares y automatización operativa.",
    metric: "−15h",
    metricLabel: "por semana",
    tech: ["Next.js", "Supabase"],
    accent: "#22c55e",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#020617] py-28 px-6 text-white"
    >
      {/* Background glows */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[45%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-violet-500/15 blur-[160px]"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-[10%] -top-[10%] h-[400px] w-[400px] bg-indigo-500/15 blur-[140px]"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-[10%] -bottom-[10%] h-[400px] w-[400px] bg-purple-500/15 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/30">
              Proyectos
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
              Resultados que
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                generan impacto real
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/40">
            Cada proyecto tiene un objetivo claro: más velocidad, más conversión
            y sistemas que escalan contigo.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl ${
                p.large ? "md:col-span-2" : ""
              }`}
            >
              {/* Accent top border */}
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${p.accent}, transparent)`,
                }}
              />

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${p.accent}18, transparent 65%)`,
                }}
              />

              <div
                className={`relative z-10 p-7 md:p-9 ${
                  p.large
                    ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
                    : ""
                }`}
              >
                {/* Main content */}
                <div>
                  {/* Tag + number */}
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em]"
                      style={{
                        color: p.accent,
                        borderColor: `${p.accent}40`,
                        background: `${p.accent}12`,
                      }}
                    >
                      {p.tag}
                    </span>
                    <span className="text-xs tracking-widest text-white/15">
                      {p.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-semibold leading-snug text-white md:text-3xl">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-lg text-[15px] leading-relaxed text-white/50">
                    {p.description}
                  </p>

                  {"detail" in p && (
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/25">
                      {p.detail}
                    </p>
                  )}

                  {/* Tech chips */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] tracking-wide text-white/35"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-1.5 text-sm text-white/35 transition-colors duration-300 group-hover:text-white">
                    Ver caso
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>

                {/* Metric */}
                <div
                  className={
                    p.large
                      ? "mt-8 flex items-center justify-center lg:mt-0"
                      : "mt-6 flex items-end gap-4 border-t border-white/[0.06] pt-6"
                  }
                >
                  <div className={p.large ? "text-center" : ""}>
                    <div
                      className={`font-semibold leading-none tracking-tight ${
                        p.large ? "text-[80px] md:text-[100px]" : "text-[52px]"
                      }`}
                      style={{ color: p.accent }}
                    >
                      {p.metric}
                    </div>
                    <p className="mt-1 text-sm text-white/30">
                      {p.metricLabel}
                    </p>
                  </div>

                  {"secondary" in p && (
                    <div className="mb-2">
                      <div className="text-lg font-semibold text-white/40">
                        {p.secondary}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-sm text-white/30"
        >
          ¿Listo para ser el próximo caso de éxito?{" "}
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-violet-400 underline underline-offset-2 transition-colors hover:text-violet-300"
          >
            Hablemos
          </button>
        </motion.p>
      </div>
    </section>
  );
}
