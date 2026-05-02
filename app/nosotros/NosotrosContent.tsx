"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Users, Zap, Shield, Heart, Star, MapPin } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "+12", label: "Proyectos entregados" },
  { value: "100%", label: "Clientes satisfechos" },
  { value: "< 24h", label: "Tiempo de respuesta" },
  { value: "3+", label: "Años de experiencia" },
];

const steps = [
  { num: "01", text: "Analizamos tu negocio y tus objetivos" },
  { num: "02", text: "Diseñamos tu identidad visual única" },
  { num: "03", text: "Desarrollamos con tecnología de primera" },
  { num: "04", text: "Lanzamos y te acompañamos siempre" },
];

const values = [
  {
    icon: Users,
    title: "Trato directo, sin intermediarios",
    desc: "Somos un equipo pequeño y enfocado. Cada proyecto lo trabajamos nosotros mismos. Hablas directamente con quienes construyen tu web — sin burocracia ni subcontratación.",
    result: "Atención personalizada siempre",
    wide: true,
  },
  {
    icon: Zap,
    title: "Diseño único, nunca plantillas",
    desc: "Cada página la diseñamos desde cero, adaptada a tu marca, industria y clientes. Tu negocio es único — su web también debería serlo.",
    result: "Tu identidad, no una copia",
  },
  {
    icon: Star,
    title: "Páginas que venden de verdad",
    desc: "No solo se ve bien — cada elemento está pensado para guiar a tu visitante hacia la acción: llamarte, escribirte o comprarte.",
    result: "Más clientes, no solo visitas",
  },
  {
    icon: Shield,
    title: "Proceso claro de principio a fin",
    desc: "Diseño, desarrollo y lanzamiento sin sorpresas. Te explicamos cada paso en lenguaje sencillo para que siempre sepas en qué punto vamos.",
    result: "Sin enredos ni tecnicismos",
  },
  {
    icon: Heart,
    title: "Soporte post-lanzamiento incluido",
    desc: "Una vez que tu página está lista, seguimos contigo. Actualizaciones, soporte y mejoras continuas para que tu presencia digital siga creciendo.",
    result: "Soporte continuo garantizado",
  },
];

export default function NosotrosContent() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ── Header oscuro ── */}
      <section className="relative overflow-hidden bg-[#061729] px-6 pb-24 pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[140px]" />
          <div className="absolute -right-[10%] bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />
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
            Sobre Vanttage
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            El equipo detrás
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              de tu página web
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
          >
            Somos Vanttage, un equipo boutique de Cartagena, Colombia. Creamos páginas
            web profesionales con trato directo, diseño único y resultados reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur"
          >
            <MapPin size={14} className="text-violet-400" />
            Cartagena, Colombia
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white px-6 py-10 shadow-sm">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap items-center justify-center divide-x divide-slate-200"
          >
            {stats.map((s) => (
              <div key={s.label} className="min-w-[120px] flex-1 px-8 py-4 text-center">
                <div className="text-3xl font-semibold text-[#0A2540]">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-slate-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-violet-500">Nuestra historia</p>
              <h2 className="text-3xl font-semibold leading-tight text-[#0A2540] md:text-4xl">
                No somos una fábrica de webs
              </h2>
              <p className="mt-5 leading-relaxed text-[#475569]">
                Vanttage nació con una idea clara: en Colombia hay miles de negocios increíbles
                que merecen una presencia digital que los represente de verdad. No plantillas.
                No soluciones genéricas. Sino algo construido específicamente para ellos.
              </p>
              <p className="mt-4 leading-relaxed text-[#475569]">
                Somos un equipo pequeño y eso es intencional. Nos permite conocer a fondo
                cada proyecto, trabajar con atención al detalle y mantener una comunicación
                directa contigo desde el primer mensaje hasta el lanzamiento y más allá.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="space-y-3"
            >
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: EASE }}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                >
                  <span className="text-[11px] font-bold tabular-nums text-violet-400">{step.num}</span>
                  <span className="text-sm text-[#0A2540]">{step.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-violet-500">Lo que nos diferencia</p>
            <h2 className="text-3xl font-semibold text-[#0A2540] md:text-4xl">
              Por qué elegirnos y no a cualquiera
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#F8FAFC] p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl ${
                  v.wide ? "sm:col-span-2" : ""
                }`}
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <v.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-[#0A2540]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#64748B]">{v.desc}</p>
                <p className="mt-4 text-sm font-medium text-violet-500">{v.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h2 className="text-3xl font-semibold text-[#0A2540] md:text-4xl">
              ¿Listo para trabajar juntos?
            </h2>
            <p className="mt-4 text-lg text-[#475569]">
              Cuéntanos qué necesitas y te respondemos con una propuesta clara en menos de 24 horas.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-4 text-sm font-medium text-white shadow-xl shadow-violet-500/30 transition hover:scale-[1.04]"
              >
                Hablemos de tu proyecto
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/proyectos"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm text-slate-600 shadow-sm transition hover:bg-slate-50"
              >
                Ver proyectos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
