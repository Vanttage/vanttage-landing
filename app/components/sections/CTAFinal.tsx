"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const trustPoints = [
  "Sin compromiso inicial",
  "Diagnóstico claro en menos de 48h",
  "Propuesta aterrizada al problema real",
];

export default function CTAFinal() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="section-shell overflow-hidden bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1EA7FF]/20 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[24rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1EA7FF]/10 blur-[140px]" />

      <div className="section-inner">
        <div className="surface-panel mx-auto max-w-5xl rounded-[2.25rem] px-6 py-12 text-center md:px-10 md:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="eyebrow-pill mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
          >
            <ShieldCheck size={13} className="text-[#1EA7FF]" />
            <span className="text-[11px] uppercase tracking-[0.26em] text-[#D9F2FF]">
              Proyectos de alto impacto
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl"
          >
            Cuéntanos dónde está la fricción
            <br />
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(90deg, #1EA7FF, #8AD8FF)",
                WebkitBackgroundClip: "text",
              }}
            >
              y te proponemos el sistema correcto.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]"
          >
            No necesitas llegar con una especificación técnica perfecta. Basta
            con tener claro qué hoy está costando tiempo, control o capacidad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={scrollToContact}
            className="btn-electric group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all hover:scale-[1.02]"
          >
            Agendar diagnóstico
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>

            <a
              href="mailto:vanttagectg@gmail.com"
              className="btn-ghost-dark inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-[#1EA7FF]/30 hover:text-[#D9F2FF]"
            >
              Escribir por correo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:flex-wrap"
          >
            {trustPoints.map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
