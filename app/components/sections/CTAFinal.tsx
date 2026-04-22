"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const trust = ["Sin compromiso inicial", "Respuesta en < 24 h", "Propuesta real para tu caso"];

export default function CTAFinal() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="section-shell overflow-hidden bg-[#020617]">
      <div className="divider-top" />
      <div className="section-inner">
        <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/15 bg-gradient-to-br from-[#0A2540] via-[#061729] to-[#020617] px-6 py-16 text-center md:px-12 md:py-20">

          {/* Background decoration */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div className="gold-glow -left-20 -top-20 h-64 w-64" />
          <div className="elec-glow -right-20 -bottom-20 h-64 w-64 opacity-50" />
          <div className="gold-glow left-1/2 top-0 h-48 w-96 -translate-x-1/2 opacity-50" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            className="relative mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/8 px-4 py-2"
          >
            <span className="pulse-dot-gold" />
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F2D77B]">
              Aceptando proyectos · 2026
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            viewport={{ once: true }}
            className="relative font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] text-white md:text-6xl"
          >
            Cuéntanos qué tienes en mente
            <br />
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(90deg, #D4AF37, #F2D77B, #1EA7FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              y te proponemos el camino.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
            viewport={{ once: true }}
            className="relative mx-auto mt-6 max-w-2xl text-lg leading-[1.75] text-[#94A3B8]"
          >
            No necesitas llegar con una especificación técnica perfecta. Basta
            con tener claro qué quieres lograr. Lo demás lo ordenamos juntos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
            viewport={{ once: true }}
            className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-gold group inline-flex items-center justify-center gap-2 rounded-full px-9 py-4 text-[13px] uppercase tracking-[0.16em]"
            >
              Agendar diagnóstico
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="mailto:vanttagectg@gmail.com"
              className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-medium uppercase tracking-[0.16em]"
            >
              <Mail size={14} />
              Escribir por correo
            </a>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            viewport={{ once: true }}
            className="relative mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-[#475569]"
          >
            {trust.map((item, i) => (
              <span key={item} className="flex items-center gap-8">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-white/20" />}
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
