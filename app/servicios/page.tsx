"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe2, RefreshCw, Wrench, Rocket, Search, Database,
  ArrowUpRight, ArrowRight, CheckCircle2,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: Globe2,
    number: "01",
    title: "Desarrollo Web a medida",
    tagline: "Construido desde cero para durar.",
    description:
      "Diseñamos y desarrollamos sitios institucionales, landing pages y plataformas web con Next.js, React y TypeScript. Cada proyecto parte de un brief claro, pasa por diseño aprobado en Figma y se entrega con performance, SEO y accesibilidad correctos desde el día uno.",
    bullets: [
      "Diseño exclusivo — nada de templates",
      "Next.js 16 + React 19 + TypeScript",
      "Performance 90+ en Google Lighthouse",
      "SEO técnico desde el inicio",
      "Responsive, accesible, WCAG AA",
      "CMS headless opcional (Sanity, Strapi)",
    ],
    color: "#1EA7FF",
    featured: true,
  },
  {
    icon: RefreshCw,
    number: "02",
    title: "Migración de stack legacy",
    tagline: "Tu web moderna sin empezar de cero.",
    description:
      "WordPress, PHP antiguo, HTML estático o cualquier tecnología que ya no te acompaña. Migramos a stacks modernos preservando SEO, historial de dominio, contenido y funcionalidad. Sin downtime, sin sorpresas.",
    bullets: [
      "Auditoría completa del sitio actual",
      "Plan de migración con prioridades",
      "Preservación total del SEO",
      "Migración sin tiempo de caída",
      "Redirecciones y canonicals",
      "Entrenamiento al equipo",
    ],
    color: "#4FC3FF",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Mantenimiento mensual",
    tagline: "Tu web siempre al día, sin que lo notes.",
    description:
      "Actualizaciones de seguridad, monitoreo de uptime, respaldos automáticos y cambios menores gestionados por nosotros. Paquetes desde básico hasta prioritario con SLA definido.",
    bullets: [
      "Actualizaciones de seguridad",
      "Monitoreo 24/7 de uptime",
      "Respaldos automáticos",
      "Cambios menores incluidos",
      "Reporte mensual de métricas",
      "Soporte por WhatsApp / correo",
    ],
    color: "#D4AF37",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Sitios de alto rendimiento",
    tagline: "Cuando cada milisegundo y cada conversión cuentan.",
    description:
      "E-commerce, portales corporativos y plataformas SaaS donde la velocidad impacta directamente el negocio. Optimización profunda de Core Web Vitals, CDN global y estrategia de cache avanzada.",
    bullets: [
      "Core Web Vitals en verde",
      "CDN global (Cloudflare / Vercel Edge)",
      "Image optimization automática",
      "Estrategia de cache multicapa",
      "A/B testing de performance",
      "Auditorías mensuales",
    ],
    color: "#F2D77B",
  },
  {
    icon: Search,
    number: "05",
    title: "SEO & posicionamiento técnico",
    tagline: "Aparecer donde tus clientes te buscan.",
    description:
      "Auditorías técnicas completas, implementación de schema markup, sitemaps, optimización on-page y estrategia de contenido alineada con tu negocio. No vendemos humo, entregamos posiciones.",
    bullets: [
      "Auditoría técnica completa",
      "Schema.org / structured data",
      "Google Search Console & GA4",
      "Optimización de Core Web Vitals",
      "Estrategia de palabras clave",
      "Reporte mensual de posiciones",
    ],
    color: "#1EA7FF",
  },
  {
    icon: Database,
    number: "06",
    title: "Sistemas & paneles internos",
    tagline: "Software interno que el equipo realmente usa.",
    description:
      "CRMs a medida, dashboards operativos, paneles de administración y herramientas internas para empresas que ya superaron las hojas de cálculo. Construidos con el mismo rigor técnico que un producto público.",
    bullets: [
      "Diseño UX orientado a operación",
      "Roles y permisos granulares",
      "Integraciones con APIs existentes",
      "Reportes y exportaciones",
      "Auditoría de acciones",
      "Documentación incluida",
    ],
    color: "#D4AF37",
  },
];

const stack = [
  { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Express", "Prisma ORM", "PostgreSQL", "REST & GraphQL"] },
  { group: "Infra", items: ["Vercel", "AWS", "Docker", "GitHub Actions", "Cloudflare"] },
  { group: "CMS", items: ["Sanity", "Strapi", "WordPress", "Shopify", "Supabase"] },
];

const faqs = [
  {
    q: "¿Cuánto tarda un proyecto web típico?",
    a: "Un sitio institucional bien hecho tarda 4–8 semanas desde kick-off hasta producción. Proyectos más complejos como e-commerce o sistemas internos pueden tomar 10–16 semanas. Todo parte de un diagnóstico que define tiempos reales.",
  },
  {
    q: "¿Trabajan con empresas fuera de Cartagena?",
    a: "Sí. La mayoría de nuestros clientes están en otras ciudades. Todo el proceso es remoto — diagnóstico, diseño, revisiones y entrega. Usamos Figma, Notion y video llamadas para mantener todo claro.",
  },
  {
    q: "¿Qué pasa si ya tengo diseño o marca?",
    a: "Perfecto, trabajamos con lo que tienes. Si tienes guía de marca, colores y tipografía, los respetamos al construir el sitio. Si solo tienes el logo, también podemos partir de ahí.",
  },
  {
    q: "¿Incluyen mantenimiento después de entregar?",
    a: "No está incluido automáticamente, pero ofrecemos planes de mantenimiento mensual desde el momento en que entregamos. Es opcional y se contrata por separado.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#020617] pt-24">

      {/* ── Hero de página ─────────────────── */}
      <section className="section-shell overflow-hidden bg-gradient-to-br from-[#061729] via-[#0A2540] to-[#020617] pb-0">
        <div className="absolute inset-0 -z-10 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="elec-glow left-0 top-0 h-96 w-96 opacity-40" />
        <div className="gold-glow right-0 bottom-0 h-72 w-72 opacity-50" />

        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto max-w-4xl text-center"
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[#94A3B8] transition-colors hover:text-white"
            >
              ← Volver al inicio
            </Link>

            <p className="section-kicker justify-center mb-6">Servicios</p>
            <h1 className="section-title text-5xl md:text-6xl lg:text-7xl">
              Lo que hacemos
              <br />
              <span
                className="text-transparent"
                style={{
                  background: "linear-gradient(90deg, #1EA7FF 0%, #4FC3FF 50%, #D4AF37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                y cómo lo hacemos.
              </span>
            </h1>
            <p className="section-copy mx-auto mt-6 max-w-2xl text-lg">
              Cada servicio tiene alcance claro, proceso definido y entregables que puedes
              tocar. Sin promesas vagas ni presupuestos sorpresa.
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-4"
          >
            {[
              { value: "+20", label: "Proyectos entregados" },
              { value: "95+", label: "Lighthouse promedio" },
              { value: "<48h", label: "Diagnóstico inicial" },
              { value: "100%", label: "Código propio" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-[#0A2540]/60 px-6 py-8 text-center backdrop-blur">
                <p
                  className="font-display text-3xl font-extrabold text-transparent"
                  style={{
                    background: "linear-gradient(135deg, #1EA7FF, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </p>
                <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-[#64748B]">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Service cards ───────────────────── */}
      <section className="section-shell">
        <div className="section-inner space-y-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isEven = i % 2 === 0;
            return (
              <motion.article
                key={s.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: i * 0.06, ease: EASE }}
                viewport={{ once: true }}
                className={`glass-card group relative overflow-hidden rounded-2xl ${
                  s.featured
                    ? "border-[#1EA7FF]/25 bg-gradient-to-br from-[#0A2540] to-[#061729]"
                    : ""
                }`}
              >
                {/* Accent bar */}
                <div
                  className="absolute inset-y-0 left-0 w-1 rounded-full"
                  style={{ background: s.color }}
                />
                {/* Ghost number */}
                <span
                  className="font-display absolute right-6 top-4 text-[7rem] font-black leading-none opacity-[0.04] md:top-1/2 md:-translate-y-1/2"
                  style={{ color: s.color }}
                >
                  {s.number}
                </span>

                <div className={`relative z-10 grid gap-10 p-7 md:p-10 ${isEven ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"} lg:items-start`}>
                  {/* Left */}
                  <div>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border"
                        style={{ borderColor: `${s.color}25`, background: `${s.color}12` }}
                      >
                        <Icon size={24} style={{ color: s.color }} />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: s.color }}>
                          {s.number}
                        </p>
                        <h2 className="font-display mt-1 text-2xl font-bold text-white md:text-3xl">
                          {s.title}
                        </h2>
                        <p className="mt-1 text-[14px]" style={{ color: `${s.color}bb` }}>
                          {s.tagline}
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 text-[15px] leading-[1.8] text-[#94A3B8]">{s.description}</p>
                  </div>

                  {/* Right — bullets */}
                  <div className={isEven ? "" : "lg:order-first"}>
                    <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#475569]">
                      Qué incluye
                    </p>
                    <ul className="space-y-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[14.5px] text-[#94A3B8]">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: s.color }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact-cta"
                      className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors"
                      style={{ color: s.color }}
                    >
                      Quiero este servicio <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Stack ───────────────────────────── */}
      <section className="section-shell bg-[#0A2540]">
        <div className="divider-top" />
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="section-kicker justify-center mb-5">Tecnologías</p>
            <h2 className="section-title">Nuestro stack</h2>
            <p className="section-copy mx-auto mt-4 max-w-xl">
              Elegido por criterio, no por moda. Cada herramienta resuelve un problema real.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((g, i) => (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <p className="font-display mb-1 text-lg font-bold text-white">{g.group}</p>
                <div className="mb-4 h-px w-6 bg-[#1EA7FF]/50" />
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-[12px] text-[#94A3B8]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ────────────────────────────── */}
      <section className="section-shell bg-[#061729]">
        <div className="divider-top" />
        <div className="section-inner">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="section-kicker justify-center mb-5">Preguntas frecuentes</p>
            <h2 className="section-title">Lo que suelen preguntar</h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-7"
              >
                <p className="font-display text-lg font-bold text-white">{faq.q}</p>
                <div className="mt-3 h-px w-8 bg-[#1EA7FF]/35" />
                <p className="mt-4 text-[15px] leading-7 text-[#94A3B8]">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA final ───────────────────────── */}
      <section id="contact-cta" className="section-shell bg-[#020617]">
        <div className="divider-top" />
        <div className="section-inner">
          <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#0A2540] to-[#020617] px-6 py-16 text-center md:py-20">
            <div className="gold-glow left-1/2 top-0 h-48 w-80 -translate-x-1/2" />
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
              className="relative font-display text-4xl font-extrabold text-white md:text-5xl"
            >
              ¿Listo para empezar?
            </motion.h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[16px] leading-7 text-[#94A3B8]">
              Cuéntanos en qué servicio estás pensando y te respondemos con un diagnóstico real.
            </p>
            <div className="relative mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/#contact"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-[13px] uppercase tracking-[0.16em]"
              >
                Solicitar diagnóstico <ArrowRight size={15} />
              </Link>
              <Link
                href="/"
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-4 text-[13px] font-medium uppercase tracking-[0.16em]"
              >
                Ver proyectos <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
