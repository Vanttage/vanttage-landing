"use client";

import BgVideo from "@/app/components/BgVideo";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

/* Slides del hero: cada uno con su titular y su video de fondo.
   Se pasan solos cada SLIDE_MS; con reduced motion se quedan quietos. */
const SLIDE_MS = 7000;

const slides = [
  {
    key: "web",
    label: "Páginas web",
    video: "/media/video/slide-web",
    title: ["Tu página web,", "tu mejor vendedor."],
    text: "Hacemos páginas web profesionales para negocios en Colombia y en cualquier país. Tu página muestra lo que haces y recibe clientes a cualquier hora, incluso cuando tú no estás.",
  },
  {
    key: "shop",
    label: "Tiendas virtuales",
    video: "/media/video/slide-shop",
    title: ["Tu tienda abierta,", "aunque cierres el local."],
    text: "Montamos tu tienda en línea con pagos, un catálogo que tú mismo actualizas y una compra sencilla desde el celular.",
  },
  {
    key: "apps",
    label: "Aplicaciones a medida",
    video: "/media/video/slide-apps",
    title: ["Menos papel,", "más control del negocio."],
    text: "Hacemos el software que tu equipo usa todos los días: formatos, reservas, inventario o facturación, listo para usar desde el celular.",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplay = !reduceMotion && !paused;
  const slide = slides[index];

  useEffect(() => {
    if (!autoplay) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, autoplay]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* 🔥 BACKGROUND PREMIUM */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[#06060C]" />
        {slides.map((sl, i) => (
          <div
            key={sl.key}
            aria-hidden
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <BgVideo src={sl.video} active={i === index} className="opacity-80" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060C]/90 via-[#06060C]/60 to-[#06060C]/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06060C] to-transparent" />

        {/* Glow orbs — degradado radial en vez de filter:blur (mucho más liviano,
            sobre todo en Safari, que renderiza los blur grandes muy lento) */}
        <div
          className="absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(109,40,217,0.30), transparent)" }}
        />
        <div
          className="absolute right-[-10%] top-[20%] h-[28rem] w-[28rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(147,51,234,0.30), transparent)" }}
        />
        <div
          className="absolute left-1/2 top-[10%] h-[20rem] w-[40rem] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.22), transparent)" }}
        />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-violet-400" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-300">
              Vanttage · Cartagena, Colombia
            </span>
          </motion.div>

          <div aria-live="polite" className="min-h-[15rem] sm:min-h-[17rem] lg:min-h-[19rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.key}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                {index === 0 ? (
                  <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.5rem]">
                    {slide.title[0]}
                    <br />
                    <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent">
                      {slide.title[1]}
                    </span>
                  </h1>
                ) : (
                  <p className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.5rem]">
                    {slide.title[0]}
                    <br />
                    <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-violet-600 bg-clip-text text-transparent">
                      {slide.title[1]}
                    </span>
                  </p>
                )}
                <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-zinc-300">
                  {slide.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollTo("contact")}
              className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.03]"
            >
              Cotizar mi proyecto
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

          {/* Indicadores de slide */}
          <div
            className="mt-12 flex max-w-md gap-3"
            role="tablist"
            aria-label="Lo que hacemos"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {slides.map((sl, i) => (
              <button
                key={sl.key}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className="group flex flex-1 flex-col justify-start py-2 text-left"
              >
                <span className="block h-[3px] overflow-hidden rounded-full bg-white/15">
                  {i === index ? (
                    <motion.span
                      key={`${index}-${autoplay}`}
                      className="block h-full origin-left rounded-full bg-white"
                      initial={{ scaleX: autoplay ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: autoplay ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                    />
                  ) : (
                    <span className={`block h-full rounded-full ${i < index ? "bg-white/50" : ""}`} />
                  )}
                </span>
                <span
                  className={`mt-2 block text-xs transition-colors ${
                    i === index ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {sl.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("solutions")}
        aria-label="Bajar"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 p-3 text-zinc-500 hover:text-white"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={reduceMotion ? undefined : { repeat: Infinity, duration: 1.6 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
