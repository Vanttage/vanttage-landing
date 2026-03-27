"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const proofPoints = [
  "Plataformas internas a medida",
  "Automatización de procesos críticos",
  "Entregas iterativas con criterio técnico",
];

const metrics = [
  { value: "<48h", label: "Para diagnóstico inicial" },
  { value: "End-to-end", label: "Desde estrategia hasta implementación" },
  { value: "Alta claridad", label: "En alcance, tiempos y prioridades" },
];

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#020617] px-6 pb-16 pt-32 text-center md:pt-40">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #061729 0%, #0A2540 48%, #1B3F6B 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(30,167,255,0.16)_0%,transparent_72%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute left-1/2 top-[22%] h-[24rem] w-[50rem] -translate-x-1/2 rounded-full bg-[#1EA7FF]/10 blur-[140px]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="eyebrow-pill mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2"
        >
          <span className="h-2 w-2 rounded-full bg-[#1EA7FF]" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D9F2FF]">
            Tecnología · Estrategia · Crecimiento
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="font-display max-w-5xl text-5xl font-extrabold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl"
        >
          Sistemas que eliminan
          <br />
          <span
            className="inline-block text-transparent"
            style={{
              background: "linear-gradient(90deg, #1EA7FF, #8AD8FF)",
              WebkitBackgroundClip: "text",
            }}
          >
            fricción operativa.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.34}
          className="mt-6 max-w-3xl text-lg leading-8 text-[#94A3B8] md:text-xl"
        >
          Diseñamos plataformas internas, automatizaciones y productos digitales
          a medida para empresas que crecieron más rápido que sus procesos.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.44}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          {proofPoints.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#CBD5E1]"
            >
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.55}
          className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="btn-electric group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all hover:scale-[1.02]"
          >
            Solicitar diagnóstico
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("portfolio")}
            className="btn-ghost-dark inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-[#1EA7FF]/30 hover:text-[#D9F2FF]"
          >
            Ver trabajos y alcance
          </button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.66}
          className="surface-panel mt-14 grid w-full max-w-5xl gap-5 rounded-[2rem] border-[#1EA7FF]/10 p-5 text-left md:grid-cols-3 md:p-6"
        >
          {metrics.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-[1.5rem] border border-white/8 bg-black/10 px-5 py-5"
            >
              <p className="font-display text-2xl font-bold text-white">
                {value}
              </p>
              <p className="mt-2 text-sm leading-7 text-[#94A3B8]">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.6 }}
        onClick={() => scrollToSection("services")}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#475569] transition-colors hover:text-[#94A3B8]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
