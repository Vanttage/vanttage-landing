"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const sectors = [
  { title: "Retail", description: "E-commerce, catálogos y sitios institucionales con performance y SEO sólidos." },
  { title: "Salud", description: "Portales de clínicas y consultorios con accesibilidad y confianza en cada pantalla." },
  { title: "Logística", description: "Webs y paneles para equipos distribuidos que necesitan coordinación." },
  { title: "Finanzas", description: "Landings donde la confianza se mide en segundos y el diseño no puede fallar." },
  { title: "Construcción", description: "Portafolios visuales de proyectos con gestión de contenido simple." },
  { title: "Servicios B2B", description: "Empresas que crecieron y necesitan una imagen digital a la altura." },
];

const stats = [
  { value: "+20", label: "Proyectos" },
  { value: "6", label: "Industrias" },
  { value: "95+", label: "Lighthouse" },
  { value: "<48h", label: "Diagnóstico" },
];

export default function Clients() {
  return (
    <section id="clients" className="section-shell scroll-mt-24 overflow-hidden bg-[#0A2540]">
      <div className="divider-top" />
      <div className="gold-glow left-0 bottom-0 h-[24rem] w-[24rem] opacity-35" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="section-kicker justify-center mb-5">Industrias</p>
          <h2 className="section-title">
            Retos distintos,{" "}
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(90deg, #1EA7FF, #D4AF37)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              criterio constante.
            </span>
          </h2>
          <p className="section-copy mx-auto mt-6 max-w-2xl">
            La industria cambia, pero los patrones del software bien hecho se
            repiten: velocidad, claridad y decisiones técnicas sólidas.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: EASE }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-7"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#475569]">Sector</p>
              <h3 className="font-display mt-3 text-2xl font-bold text-white">{s.title}</h3>
              <div className="mt-3 h-px w-8 bg-[#1EA7FF]/40" />
              <p className="mt-4 text-[15px] leading-7 text-[#94A3B8]">{s.description}</p>
            </motion.article>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-0 divide-x divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 xl:grid-cols-4 xl:divide-y-0"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white/[0.02] px-6 py-8 text-center">
              <p
                className="font-display text-4xl font-extrabold text-transparent"
                style={{
                  background: "linear-gradient(135deg, #1EA7FF, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {value}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
