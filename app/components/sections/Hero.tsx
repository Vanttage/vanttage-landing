"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroScene from "./HeroScene";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* 🔥 BACKGROUND PREMIUM */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[#06060C]" />
        <HeroScene />

        {/* Glow orbs */}
        <div className="absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-violet-700/30 blur-[120px]" />
        <div className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute left-1/2 top-[10%] h-[20rem] w-[40rem] -translate-x-1/2 bg-violet-500/20 blur-[140px]" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        {/* ───────── LEFT ───────── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400">
              Diseño Web Profesional · Colombia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.5rem]"
          >
            Tu página web,
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent">
              tu mejor vendedor.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-zinc-400"
          >
            Creamos páginas web profesionales que muestran tu negocio,
            generan confianza en tus clientes y trabajan por ti
            las&nbsp;24&nbsp;horas del día — todos los días.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.03]"
            >
              Quiero mi página web
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-white shadow-lg">
                <ArrowRight size={14} />
              </span>
            </button>

            <button
              onClick={() => scrollTo("portfolio")}
              className="rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-300 backdrop-blur hover:bg-white/5"
            >
              Ver ejemplos
            </button>
          </motion.div>
        </div>

        {/* ───────── RIGHT ───────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          {/* Imagen */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[4/5] w-full">
              <img
                src="/founders/founders.png"
                alt="Equipo"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
          </div>

          {/* FLOATING CHIPS 🔥 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute right-[-30px] top-10 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur md:block"
          >
            ✦ Diseño a tu medida
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute left-[-40px] top-40 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur md:block"
          >
            ✦ Rápida y segura
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-[-20px] left-10 hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur md:block"
          >
            ✦ Lista en días
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("services")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 hover:text-white"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
