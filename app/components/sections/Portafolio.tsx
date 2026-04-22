"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    title: "Plataforma corporativa — migración Next.js",
    description: "Rediseño completo desde WordPress legacy. Velocidad 4× mayor, CMS propio y SEO técnico sólido.",
    tag: "Rediseño + Migración",
    year: "2025",
    bg: "from-[#0A2540] to-[#061729]",
    accentColor: "#1EA7FF",
    scope: ["Next.js", "Sanity CMS", "SEO", "CI/CD"],
    outcome: "95+ Lighthouse · +40% tiempo en sitio",
    large: true,
  },
  {
    title: "Landing premium B2B",
    description: "Sitio para firma de servicios financieros. Diseño editorial y estrategia de conversión.",
    tag: "Landing Page",
    year: "2025",
    bg: "from-[#061729] to-[#0F172A]",
    accentColor: "#4FC3FF",
    scope: ["React", "Tailwind", "GA4"],
    outcome: "+3× leads cualificados",
  },
  {
    title: "Panel operativo interno",
    description: "Dashboard que reemplazó hojas de cálculo dispersas. Roles, reportes en tiempo real.",
    tag: "Sistema interno",
    year: "2024",
    bg: "from-[#0F172A] to-[#0A2540]",
    accentColor: "#D4AF37",
    scope: ["Next.js", "Prisma", "PostgreSQL"],
    outcome: "−15 h/semana al equipo",
  },
  {
    title: "E-commerce especializado",
    description: "Tienda online con checkout optimizado, pagos integrados e inventario en tiempo real.",
    tag: "E-commerce",
    year: "2024",
    bg: "from-[#061729] to-[#0A2540]",
    accentColor: "#F2D77B",
    scope: ["Shopify", "Stripe"],
    outcome: "Checkout 2.3s · Conversión +28%",
  },
  {
    title: "Portal institucional renovado",
    description: "Migración desde PHP 2016. Accesibilidad WCAG AA, multi-idioma, diseño moderno.",
    tag: "Modernización",
    year: "2025",
    bg: "from-[#0F172A] to-[#061729]",
    accentColor: "#1EA7FF",
    scope: ["Next.js", "i18n", "WCAG AA"],
    outcome: "0 errores en auditoría",
  },
];

function ProjectCard({
  title, description, tag, year, bg, accentColor, scope, outcome, large = false, index,
}: (typeof projects)[number] & { index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE }}
      viewport={{ once: true }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${bg} border border-white/8 transition-all duration-300 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(2,6,23,0.5)] ${
        large ? "p-8 md:p-10 lg:col-span-2 lg:min-h-[28rem]" : "p-6 md:p-7"
      }`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${accentColor}10, transparent 55%)`,
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span
              className="inline-block rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{
                borderColor: `${accentColor}30`,
                background: `${accentColor}12`,
                color: accentColor,
              }}
            >
              {tag}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#475569]">{year}</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#64748B] transition-all group-hover:border-white/25 group-hover:text-white">
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* Content */}
        <div className={`${large ? "mt-12" : "mt-8"} flex-1`}>
          <h3
            className={`font-display font-bold leading-tight text-white ${
              large ? "text-3xl md:text-[2.2rem]" : "text-xl"
            }`}
          >
            {title}
          </h3>
          <p className={`mt-4 leading-7 text-[#94A3B8] ${large ? "max-w-2xl text-base" : "text-[14px]"}`}>
            {description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {scope.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[#64748B]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div
          className="mt-8 rounded-xl border-l-2 px-4 py-3"
          style={{
            borderColor: accentColor,
            background: `${accentColor}08`,
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: accentColor }}>
            Resultado
          </p>
          <p className="mt-1 text-[14px] font-semibold text-white">{outcome}</p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-shell scroll-mt-24 overflow-hidden bg-[#020617]">
      <div className="divider-top" />
      <div className="elec-glow left-1/2 top-0 h-[24rem] w-[52rem] -translate-x-1/2 opacity-40" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mb-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <div>
            <p className="section-kicker mb-5">Proyectos</p>
            <h2 className="section-title">
              Trabajo que
              <br />
              <span
                className="text-transparent"
                style={{
                  background: "linear-gradient(90deg, #1EA7FF, #4FC3FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                habla por sí solo.
              </span>
            </h2>
          </div>
          <p className="section-copy max-w-xl">
            Una muestra del tipo de retos que resolvemos. Cada proyecto tiene
            una historia de problema → decisión técnica → resultado medible.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} index={i} {...p} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#contact"
            className="btn-ghost group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-medium uppercase tracking-[0.14em]"
          >
            Conversemos sobre tu caso
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
