"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Gauge, Globe } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const pains = [
  {
    icon: Globe,
    title: "Tu sitio se ve de 2015",
    description:
      "Diseño envejecido, sin mobile, tecnología obsoleta. Los clientes lo notan antes de leer una línea y se van.",
  },
  {
    icon: Gauge,
    title: "Carga lento y Google te castiga",
    description:
      "Cada segundo de espera cuesta conversiones. Un stack moderno carga en milisegundos y mejora tu SEO automáticamente.",
  },
  {
    icon: Clock,
    title: "Dependes de alguien para cambiar texto",
    description:
      "Actualizaciones que deberían tomar minutos terminan en tickets y esperas. Tu web debe ser tuya.",
  },
  {
    icon: AlertTriangle,
    title: "Sin analytics, sin SEO, sin tracción",
    description:
      "Meta-tags por defecto, Google Analytics sin configurar, sin schema. Eres invisible donde más importa.",
  },
];

export default function Problem() {
  return (
    <section className="section-shell overflow-hidden bg-[#0F172A]">
      <div className="divider-top" />
      <div className="elec-glow left-1/2 top-1/2 h-[28rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-30" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="section-kicker justify-center mb-5">Cuándo nos llaman</p>
          <h2 className="section-title">
            Tu web debería abrir puertas,
            <br />
            <span className="text-[#94A3B8]">no disculparse por existir.</span>
          </h2>
          <p className="section-copy mx-auto mt-6 max-w-2xl">
            Muchas empresas tienen un producto excelente y una presencia digital
            que lo contradice. Aquí entra Vanttage.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {pains.map((pain, i) => {
            const Icon = pain.icon;
            return (
              <motion.article
                key={pain.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                viewport={{ once: true }}
                className="glass-card group rounded-2xl p-7"
              >
                <div className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#1EA7FF]/15 bg-[#1EA7FF]/10 transition-colors group-hover:bg-[#1EA7FF]/18">
                    <Icon size={20} className="text-[#1EA7FF]" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">{pain.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-[#94A3B8]">{pain.description}</p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/8 px-6 py-3">
            <span className="pulse-dot-gold" />
            <span className="text-[13px] text-[#F2D77B]">
              Si alguno aplica, hay espacio para mejorar.{" "}
              <span className="font-semibold">Diagnosticamos en menos de 48h.</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
