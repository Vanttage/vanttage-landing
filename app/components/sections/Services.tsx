"use client";

import { motion } from "framer-motion";
import { Globe2, RefreshCw, Wrench, Rocket, Search, Database, ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: Globe2,
    tag: "01",
    title: "Desarrollo Web a medida",
    description:
      "Sitios institucionales, landings y plataformas construidas con Next.js y React. Performance, SEO técnico y diseño exclusivo desde el día uno.",
    highlights: ["Next.js · TypeScript", "Performance 90+ Lighthouse", "SEO técnico"],
    featured: true,
  },
  {
    icon: RefreshCw,
    tag: "02",
    title: "Migración de stack legacy",
    description:
      "WordPress, PHP viejo o HTML estático modernizado sin perder contenido, SEO ni historial de dominio.",
    highlights: ["Sin downtime", "SEO preservado", "Stack moderno"],
  },
  {
    icon: Wrench,
    tag: "03",
    title: "Mantenimiento mensual",
    description:
      "Actualizaciones, seguridad, respaldos y cambios menores. Tu web siempre al día sin que tengas que preocuparte.",
    highlights: ["Uptime 99.9%", "Soporte prioritario", "Reportes"],
  },
  {
    icon: Rocket,
    tag: "04",
    title: "Sitios de alto rendimiento",
    description:
      "E-commerce, portales y plataformas donde cada milisegundo y cada conversión cuentan. Optimización profunda.",
    highlights: ["Core Web Vitals", "CDN global", "Cache estratégica"],
  },
  {
    icon: Search,
    tag: "05",
    title: "SEO & posicionamiento técnico",
    description:
      "Auditorías, schema markup, sitemaps, optimización on-page. Aparecer donde tus clientes buscan.",
    highlights: ["Auditoría técnica", "Schema.org", "GA4"],
  },
  {
    icon: Database,
    tag: "06",
    title: "Sistemas & paneles internos",
    description:
      "CRMs, dashboards y herramientas a medida para empresas que ya superaron las hojas de cálculo.",
    highlights: ["Roles & permisos", "APIs", "Tiempo real"],
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Services() {
  return (
    <section id="services" className="section-shell scroll-mt-24 overflow-hidden bg-[#020617]">
      <div className="divider-top" />
      <div className="gold-glow -right-24 top-1/3 h-[30rem] w-[30rem] opacity-40" />

      <div className="section-inner">
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
          >
            <p className="section-kicker mb-5">Servicios</p>
            <h2 className="section-title">
              Todo lo que tu presencia
              <br />
              <span
                className="text-transparent"
                style={{
                  background: "linear-gradient(90deg, #1EA7FF, #4FC3FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                web necesita.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#64748B]">Ideal para</p>
            <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[#94A3B8]">
              <li className="flex gap-2"><span className="text-[#1EA7FF] shrink-0">—</span>Empresas con web vieja que necesita rediseño.</li>
              <li className="flex gap-2"><span className="text-[#1EA7FF] shrink-0">—</span>Proyectos que ya no caben en WordPress o Wix.</li>
              <li className="flex gap-2"><span className="text-[#D4AF37] shrink-0">—</span>Operaciones que necesitan software interno.</li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => {
            const Icon = s.icon;
            const featured = s.featured;
            return (
              <motion.article
                key={s.tag}
                variants={cardVariants}
                className={`group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 ${
                  featured
                    ? "border border-[#1EA7FF]/20 bg-gradient-to-br from-[#0A2540] to-[#061729] hover:border-[#1EA7FF]/40 hover:shadow-[0_20px_60px_rgba(30,167,255,0.15)]"
                    : "glass-card"
                }`}
              >
                {/* Numbered ghost */}
                <span className="font-display absolute right-4 top-3 text-[4.5rem] font-black leading-none text-white/[0.04]">
                  {s.tag}
                </span>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(30,167,255,0.08),transparent_55%)]" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col">
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${
                      featured
                        ? "border-[#1EA7FF]/25 bg-[#1EA7FF]/15 text-[#1EA7FF]"
                        : "border-[#1EA7FF]/12 bg-[#1EA7FF]/8 text-[#1EA7FF]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-[#94A3B8]">{s.description}</p>

                  <ul className="mt-5 space-y-1.5">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[12px] text-[#64748B]">
                        <span className="h-px w-4 bg-[#1EA7FF]/50" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {featured && (
                    <div className="mt-5 pt-4 border-t border-[#1EA7FF]/15">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1EA7FF] transition-colors hover:text-[#4FC3FF]"
                      >
                        Nuestro servicio estrella <ArrowUpRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
