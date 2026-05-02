"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe2, ShoppingBag, RefreshCw, Wrench, Search, Cpu,
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, MessageCircle,
} from "lucide-react";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
  {
    icon: Globe2,
    number: "01",
    title: "Páginas Web Profesionales",
    tagline: "Construida para representar y vender tu negocio.",
    description:
      "Diseñamos y desarrollamos tu sitio web desde cero — sin plantillas. Cada página está pensada para generar confianza en tus clientes, mostrarte profesional y traerte más consultas. Responsive, rápida y lista para Google.",
    bullets: [
      "Diseño 100% único, adaptado a tu marca",
      "Responsive en móvil, tablet y escritorio",
      "SEO básico desde el inicio",
      "Formulario de contacto incluido",
      "Revisiones hasta quedar satisfecho",
      "Entrega en 7 a 15 días hábiles",
    ],
    featured: true,
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Tiendas Virtuales",
    tagline: "Vende en internet, las 24 horas del día.",
    description:
      "Tu tienda online con catálogo de productos, pagos en línea seguros y gestión de pedidos. Tus clientes compran desde cualquier dispositivo y tú administras todo desde un panel sencillo.",
    bullets: [
      "Catálogo de productos con filtros",
      "Pagos online (PSE, tarjetas, Nequi)",
      "Panel de administración incluido",
      "Gestión de pedidos y stock",
      "Diseño optimizado para compras",
      "Entrega en 3 a 4 semanas",
    ],
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "Rediseño de Web Existente",
    tagline: "Tu web actualizada sin perder lo que ya tienes.",
    description:
      "¿Tu página actual se ve antigua o no genera resultados? Modernizamos tu sitio con diseño nuevo, mejor experiencia de usuario y tecnología actualizada — sin perder tu dominio ni tu historial.",
    bullets: [
      "Diagnóstico del sitio actual",
      "Nuevo diseño adaptado a tu marca",
      "Migración sin caída del sitio",
      "Preservación del SEO acumulado",
      "Velocidad optimizada",
      "Entrega en 1 a 2 semanas",
    ],
  },
  {
    icon: Wrench,
    number: "04",
    title: "Mantenimiento Mensual",
    tagline: "Tu página siempre actualizada y segura.",
    description:
      "Nos encargamos de que tu web funcione perfectamente: actualizaciones, copias de seguridad, monitoreo de disponibilidad y cambios menores. Tú te dedicas a tu negocio, nosotros a tu página.",
    bullets: [
      "Actualizaciones de seguridad",
      "Copias de seguridad automáticas",
      "Monitoreo de disponibilidad 24/7",
      "Cambios menores incluidos",
      "Reporte mensual de métricas",
      "Soporte por WhatsApp y correo",
    ],
  },
  {
    icon: Search,
    number: "05",
    title: "Posicionamiento en Google (SEO)",
    tagline: "Aparece cuando tus clientes te buscan.",
    description:
      "Optimizamos tu página para que aparezca en los primeros resultados de Google cuando alguien busca tu servicio en tu ciudad. Más visitas orgánicas, más clientes potenciales, sin pagar por anuncios.",
    bullets: [
      "Auditoría técnica completa",
      "Optimización de palabras clave locales",
      "Google Search Console y Analytics",
      "Contenido optimizado para búsqueda",
      "Mejora de velocidad y Core Web Vitals",
      "Reporte mensual de posiciones",
    ],
  },
  {
    icon: Cpu,
    number: "06",
    title: "Aplicaciones Web a Medida",
    tagline: "Software hecho exactamente para tu negocio.",
    description:
      "¿Necesitas algo más que una página web? Desarrollamos sistemas de reservas, CRM, dashboards, portales de clientes o cualquier herramienta digital que tu operación necesite. Cotización según el alcance.",
    bullets: [
      "Levantamiento de requerimientos",
      "Diseño de interfaces (UX/UI)",
      "Desarrollo a medida sin plantillas",
      "Integraciones con sistemas existentes",
      "Panel de administración incluido",
      "Documentación y capacitación",
    ],
  },
];

const faqs = [
  {
    q: "¿Los precios son negociables?",
    a: "Los precios indicados son el punto de partida. El costo final depende del alcance específico de tu proyecto. Siempre te damos un presupuesto exacto antes de empezar — sin sorpresas.",
  },
  {
    q: "¿Qué necesito tener listo para empezar?",
    a: "Solo necesitas contarnos qué hace tu negocio, qué quieres lograr con la página y tener tu logo o los colores de tu marca. Nosotros nos encargamos del resto.",
  },
  {
    q: "¿Puedo ver avances durante el proceso?",
    a: "Sí. Te mostramos el diseño antes de desarrollarlo y tienes revisiones incluidas. No avanzamos a la siguiente fase sin tu aprobación.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Incluimos rondas de revisión hasta que el resultado te satisfaga. No te entregamos algo con lo que no estés conforme.",
  },
  {
    q: "¿Trabajan con empresas fuera de Cartagena?",
    a: "Sí. Trabajamos con clientes de todo Colombia de forma completamente remota. La comunicación es por WhatsApp o videollamada — fluida y directa.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-[#0A2540]">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="shrink-0 text-violet-500" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-[#64748B]">{a}</p>
      </motion.div>
    </div>
  );
}

export default function ServiciosContent() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ── Header oscuro ── */}
      <section className="relative overflow-hidden bg-[#061729] px-6 pb-24 pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-violet-500/15 blur-[140px]" />
          <div className="absolute -right-[5%] bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
              <ArrowLeft size={15} />
              Volver al inicio
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="mb-4 text-[11px] uppercase tracking-[0.3em] text-violet-400"
          >
            Nuestros servicios
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            Todo lo que necesita
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              tu negocio en internet
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
          >
            Precios claros, procesos definidos y entregables reales. Sin promesas vagas,
            sin presupuestos sorpresa.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-0 divide-x divide-white/10"
          >
            {[
              { value: "+12", label: "Proyectos entregados" },
              { value: "100%", label: "Diseño único" },
              { value: "< 24h", label: "Primera respuesta" },
            ].map((s) => (
              <div key={s.label} className="px-8 py-2 first:pl-0 text-center">
                <div className="text-2xl font-semibold text-white">{s.value}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-white/40">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Tarjetas de servicios ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
                className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ${
                  s.featured ? "border-violet-200" : "border-gray-200"
                }`}
              >
                {/* Barra lateral de acento */}
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {s.featured && (
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500" />
                )}

                {/* Número fantasma */}
                <span className="pointer-events-none absolute right-6 top-4 text-[7rem] font-black leading-none text-slate-100 select-none md:top-1/2 md:-translate-y-1/2">
                  {s.number}
                </span>

                <div className="relative z-10 grid gap-8 p-7 md:p-10 lg:grid-cols-2 lg:items-start">
                  {/* Izquierda */}
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-violet-400">{s.number}</p>
                        <h2 className="mt-0.5 text-xl font-semibold text-[#0A2540] md:text-2xl">{s.title}</h2>
                        <p className="mt-1 text-sm text-violet-500">{s.tagline}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-[#64748B]">{s.description}</p>

                    {/* Micro CTA */}
                    <Link
                      href="/contacto"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-100"
                    >
                      <MessageCircle size={14} />
                      Pedir cotización gratis
                    </Link>
                  </div>

                  {/* Derecha — bullets */}
                  <div>
                    <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-slate-400">Qué incluye</p>
                    <ul className="space-y-2.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-sm text-[#475569]">
                          <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-violet-400" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contacto"
                      className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-violet-500 transition-colors hover:text-violet-700"
                    >
                      Quiero este servicio <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Garantías ── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-violet-500">Nuestro compromiso</p>
            <h2 className="text-3xl font-semibold text-[#0A2540] md:text-4xl">Lo que siempre incluye trabajar con nosotros</h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { emoji: "✦", title: "Diseño exclusivo", desc: "Nunca plantillas. Cada proyecto es único." },
              { emoji: "✦", title: "Revisiones incluidas", desc: "Hasta que estés completamente satisfecho." },
              { emoji: "✦", title: "Trato directo", desc: "Hablas con quien hace el trabajo, siempre." },
              { emoji: "✦", title: "Soporte post-entrega", desc: "No desaparecemos al lanzar tu proyecto." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-6 text-center"
              >
                <span className="text-2xl text-violet-400">{item.emoji}</span>
                <h3 className="mt-3 font-semibold text-[#0A2540]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#64748B]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-violet-500">Preguntas frecuentes</p>
            <h2 className="text-3xl font-semibold text-[#0A2540]">Lo que suelen preguntar</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="rounded-2xl border border-gray-200 bg-white px-6"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 px-8 py-16 text-center shadow-2xl shadow-violet-500/20"
          >
            {/* Glow interior */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-[80px]" />
            </div>

            <div className="relative z-10">
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/70">Sin compromiso</p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">¿Listo para empezar?</h2>
              <p className="mx-auto mt-4 max-w-md text-white/70">
                Cuéntanos qué necesitas y te respondemos con una propuesta clara en menos de 24 horas.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-violet-600 shadow-lg transition hover:scale-[1.04]"
                >
                  Solicitar presupuesto
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/proyectos"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm text-white/80 transition hover:bg-white/10"
                >
                  Ver proyectos
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
