"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown, Code2, Globe, Zap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const capabilities = [
  { icon: Globe, label: "Desarrollo Web" },
  { icon: Code2, label: "Migración de stack" },
  { icon: Zap, label: "Alto rendimiento" },
];

const stats = [
  { value: "+20", label: "Proyectos" },
  { value: "<48h", label: "Diagnóstico" },
  { value: "95+", label: "Lighthouse" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-20 pb-12 md:pt-24"
    >
      {/* Parallax background */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #020617 0%, #061729 40%, #0A2540 70%, #1B3F6B 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="elec-glow -left-32 top-10 h-[32rem] w-[32rem]" />
        <div className="gold-glow -right-24 bottom-0 h-[24rem] w-[24rem]" />
        <div className="elec-glow left-1/2 top-[15%] h-[20rem] w-[44rem] -translate-x-1/2 opacity-50" />
      </motion.div>

      <div className="section-inner grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        {/* ── Left ──────────────────────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur"
          >
            <span className="pulse-dot" />
            <span className="font-display text-[11px] uppercase tracking-[0.28em] text-[#94A3B8]">
              Cartagena · Colombia · 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="font-display text-5xl font-extrabold leading-[1.0] tracking-[-0.05em] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            Código que
            <br />
            <span
              className="inline-block text-transparent"
              style={{
                background:
                  "linear-gradient(90deg, #1EA7FF 0%, #4FC3FF 60%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              escala tu marca.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
            className="mt-6 max-w-xl text-[17px] leading-[1.75] text-[#94A3B8]"
          >
            Diseñamos y construimos sitios web profesionales, migramos proyectos
            legacy a tecnologías modernas y mantenemos lo que ya funciona.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {capabilities.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-[#94A3B8]"
              >
                <Icon size={13} className="text-[#1EA7FF]" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.52 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-electric group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white"
            >
              <span className="relative z-10">Agendar diagnóstico</span>
              <ArrowRight
                size={15}
                className="relative z-10 transition-transform group-hover:translate-x-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("portfolio")}
              className="btn-ghost inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.16em]"
            >
              Ver proyectos
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.64 }}
            className="mt-12 flex items-center gap-8"
          >
            {stats.map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-8">
                {i > 0 && <span className="h-8 w-px bg-white/10" />}
                <div>
                  <p className="font-display text-3xl font-extrabold text-white">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: founders portrait ──── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.38, ease: EASE }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          <div className="absolute -left-5 -top-5 h-16 w-16 border-l-2 border-t-2 border-[#1EA7FF]/50" />
          <div className="absolute -bottom-5 -right-5 h-16 w-16 border-b-2 border-r-2 border-[#D4AF37]/50" />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(2,6,23,0.7)]">
            <div className="relative aspect-[4/5] w-full">
              <img
                src="/founders/founders.png"
                alt="Equipo Vanttage"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Placeholder */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(145deg, #061729 0%, #0A2540 50%, #1B3F6B 100%)",
                }}
              >
                <div className="elec-glow left-1/2 top-1/4 h-64 w-64 -translate-x-1/2" />
                <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                  <div className="rounded-2xl border border-[#1EA7FF]/20 bg-[#1EA7FF]/10 p-5">
                    <Code2 size={36} className="text-[#1EA7FF]" />
                  </div>
                  <p className="font-display text-lg font-bold text-white/80">
                    El equipo Vanttage
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#475569]">
                    Agrega /public/founders/founders.jpg
                  </p>
                </div>
              </div>
              {/* Bottom overlay */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p className="font-display text-lg font-bold text-white">
                    Vanttage Studio
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-[#94A3B8]">
                    Fundadores · Ingeniería web
                  </p>
                </div>
                <div className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F2D77B]">
                  Desde 2024
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/8 bg-[#0A2540]/60 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-2">
                <span className="pulse-dot" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-[#94A3B8]">
                  Cartagena · CO
                </span>
              </div>
              <span
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-transparent"
                style={{
                  background: "linear-gradient(90deg, #1EA7FF, #D4AF37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Vanttage.
              </span>
            </div>
          </div>

          {/* Floating chips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute -right-8 top-10 hidden rounded-xl border border-white/10 bg-[#0A2540]/90 px-4 py-3 shadow-xl backdrop-blur md:block"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#94A3B8]">
              Enfoque
            </p>
            <p className="font-display mt-1 text-sm font-bold text-white">
              Web boutique
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="absolute -left-10 bottom-24 hidden rounded-xl border border-[#1EA7FF]/20 bg-[#0A2540]/90 px-4 py-3 shadow-xl backdrop-blur md:block"
          >
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#94A3B8]">
              Stack
            </p>
            <p className="font-display mt-1 text-sm font-bold text-[#1EA7FF]">
              Next · React · Node
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        onClick={() => scrollTo("services")}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#475569] transition-colors hover:text-[#94A3B8]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
