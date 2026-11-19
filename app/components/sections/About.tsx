"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Animación 1: Terminal de código (card grande) ── */
const TerminalAnim = () => {
  const reduceMotion = useReducedMotion();
  const lines = [
    { text: "> analizamos tu negocio...", color: "#94a3b8" },
    { text: "> diseñamos tu identidad  ✓", color: "#a78bfa" },
    { text: "> desarrollamos tu web    ✓", color: "#a78bfa" },
    { text: "> salimos al aire        ✓", color: "#22c55e" },
  ];
  return (
    <div className="rounded-xl bg-[#0f0f1a] px-4 py-3 font-mono text-xs leading-7">
      {lines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.35, duration: 0.45, ease: EASE }}
          style={{ color: line.color }}
        >
          {line.text}
        </motion.p>
      ))}
      <motion.span
        animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
        transition={reduceMotion ? undefined : { repeat: Infinity, duration: 0.9 }}
        className="inline-block h-[14px] w-[7px] bg-violet-400 align-middle"
      />
    </div>
  );
};

/* ── Animación 2: Órbitas (equipo enfocado) ── */
const OrbitAnim = () => {
  const reduceMotion = useReducedMotion();
  return (
  <div className="relative flex h-20 items-center justify-center">
    <div className="z-10 h-5 w-5 rounded-full bg-violet-500" />
    {[38, 62].map((r, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-violet-200"
        style={{ width: r * 2, height: r * 2 }}
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion
            ? undefined
            : { repeat: Infinity, duration: 7 + i * 5, ease: "linear" }
        }
      >
        <div
          className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-violet-400"
          style={{ top: -6, left: "50%" }}
        />
      </motion.div>
    ))}
  </div>
  );
};

/* ── Animación 3: Barras de conversión ── */
const BarAnim = () => {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.75];
  return (
    <div className="flex h-16 items-end gap-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-violet-500 to-violet-300"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: EASE }}
          style={{ height: `${h * 100}%`, transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
};

/* ── Animación 4: Nodos de proceso ── */
const FlowAnim = () => {
  const nodes = ["Diseño", "Desarrollo", "Listo"];
  return (
    <div className="flex h-16 items-center justify-between">
      {nodes.map((label, i) => (
        <div key={i} className="flex flex-1 items-center">
          <div className="flex flex-1 flex-col items-center">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-violet-300 bg-violet-50 text-[9px] font-semibold text-violet-600"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25, duration: 0.4, ease: EASE }}
            >
              {label}
            </motion.div>
          </div>
          {i < nodes.length - 1 && (
            <motion.div
              className="h-[2px] flex-1 bg-gradient-to-r from-violet-400 to-violet-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.3, duration: 0.35 }}
              style={{ originX: 0 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* ── Animación 5: Heartbeat / uptime ── */
const HeartbeatAnim = () => {
  const reduceMotion = useReducedMotion();
  return (
  <div className="flex h-16 items-center gap-4">
    <div className="relative h-10 flex-1">
      <svg viewBox="0 0 120 40" className="h-full w-full">
        <motion.polyline
          points="0,20 18,20 28,6 38,34 48,20 68,20 78,9 88,31 98,20 120,20"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }
          }
        />
      </svg>
    </div>
    <div className="text-right">
      <div className="text-xl font-semibold text-violet-600">99.9%</div>
      <div className="text-[10px] uppercase tracking-widest text-slate-500">uptime</div>
    </div>
  </div>
  );
};

/* ── Data ── */
const cards = [
  {
    title: "Trato directo, sin intermediarios",
    desc: "Somos un equipo pequeño. Cada proyecto lo hacemos nosotros mismos, sin subcontratar. Hablas directamente con las personas que programan tu web.",
    result: "Hablas con quien hace el trabajo",
    visual: <TerminalAnim />,
    large: true,
  },
  {
    title: "Diseño único para tu negocio",
    desc: "No usamos plantillas compradas. Diseñamos cada página web desde cero, pensando en tu marca y en el cliente que quieres atraer.",
    result: "Hecha para tu marca",
    visual: <OrbitAnim />,
  },
  {
    title: "Páginas pensadas para vender",
    desc: "Además de verse bien, cada parte de la página lleva al visitante a hacer algo: llamarte, escribirte o comprarte.",
    result: "Pensada para que te contacten",
    visual: <BarAnim />,
  },
  {
    title: "Un proceso claro de principio a fin",
    desc: "Diseñamos, programamos y publicamos tu web, y en cada paso te contamos en palabras sencillas en qué vamos.",
    result: "Siempre sabes en qué va tu proyecto",
    visual: <FlowAnim />,
  },
  {
    title: "No desaparecemos después del lanzamiento",
    desc: "Cuando tu página sale al aire, seguimos pendientes. Hacemos actualizaciones, damos soporte y te ayudamos con los cambios que vayan saliendo.",
    result: "Soporte después de la entrega",
    visual: <HeartbeatAnim />,
  },
];

/* ── Cómo trabajamos ── */
const process = [
  { title: "Te escuchamos", text: "Nos cuentas qué vendes, a quién y qué necesitas que haga la web." },
  { title: "Diseñamos contigo", text: "Te mostramos cómo se va a ver antes de programar una sola línea." },
  { title: "La construimos", text: "Programamos tu página o aplicación y la vas viendo avanzar." },
  { title: "La publicamos y la cuidamos", text: "La revisamos contigo, la ponemos en línea y seguimos pendientes." },
];

/** Línea de tiempo que se llena a medida que haces scroll */
function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reached, setReached] = useState(reduce ? process.length : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setReached(Math.min(process.length, Math.floor(v * process.length + 0.35)));
  });

  return (
    <ol ref={ref} className="relative mb-20 grid gap-10 md:grid-cols-4 md:gap-6">
      {/* Riel: horizontal en escritorio, vertical en móvil */}
      <span aria-hidden className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-200 md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
      <motion.span
        aria-hidden
        style={{ scaleY: reduce ? 1 : fill }}
        className="absolute left-[11px] top-2 bottom-2 w-px origin-top bg-violet-600 md:hidden"
      />
      <motion.span
        aria-hidden
        style={{ scaleX: reduce ? 1 : fill }}
        className="absolute left-0 right-0 top-[11px] hidden h-px origin-left bg-violet-600 md:block"
      />
      {process.map((step, i) => {
        const on = i < reached;
        return (
          <li key={step.title} className="relative pl-10 md:pl-0 md:pt-10">
            <span
              aria-hidden
              className={`absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors duration-500 ${
                on
                  ? "border-violet-600 bg-violet-600 text-white"
                  : "border-slate-300 bg-[#F8FAFC] text-slate-500"
              }`}
            >
              {i + 1}
            </span>
            <p className="text-lg font-semibold tracking-tight text-[#0A2540]">{step.title}</p>
            <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-slate-600">{step.text}</p>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Component ── */
export default function About() {
  return (
    <section id="about" className="surface-light w-full bg-[#F8FAFC] py-28 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-violet-600">
            Sobre nosotros
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-[#0A2540] md:text-5xl">
            Por qué elegirnos
            <br />
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              y no a cualquiera
            </span>
          </h2>
          <p className="mt-5 text-lg text-[#475569]">
            Somos Vanttage, un equipo de Cartagena que hace páginas web
            profesionales y aplicaciones web para negocios como el tuyo.
          </p>
        </motion.div>

        {/* Fundadores */}
        <div className="mb-24 grid items-end gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative mx-auto w-full max-w-[420px] [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
            {/* Fondo: círculo violeta y texto tenue detrás de la foto */}
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-0 top-16 rounded-t-[999px] bg-gradient-to-b from-violet-600 via-violet-500 to-indigo-600"
            />
            <div
              aria-hidden
              className="absolute inset-x-6 bottom-0 top-16 rounded-t-[999px] bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.35),transparent_60%)]"
            />
            <div className="relative aspect-[880/1206]">
              <Image
                src="/founders/founders-cut.webp"
                alt="Moisés y Carlos, fundadores de Vanttage"
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(15,10,40,0.35)]"
              />
            </div>
          </div>
          <div className="pb-6">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-violet-600">
              Quiénes somos
            </p>
            <h3 className="text-3xl font-semibold leading-tight text-[#0A2540] md:text-4xl">
              Hablas con quienes programan tu proyecto
            </h3>
            <p className="mt-5 max-w-xl leading-relaxed text-[#475569]">
              Somos Moisés y Carlos, los socios que fundaron Vanttage en Cartagena.
              Desde la primera llamada hasta después de publicar, el proyecto lo
              llevamos nosotros, sin intermediarios.
            </p>
            <a
              href="/nosotros"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-violet-700 underline-offset-4 hover:underline"
            >
              Conoce al equipo
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        {/* Cómo trabajamos */}
        <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-violet-600">
          Cómo trabajamos
        </p>
        <ProcessTimeline />

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: EASE }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl ${
                card.large ? "sm:col-span-2" : ""
              }`}
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Visual */}
              <div className="mb-6">{card.visual}</div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0A2540]">
                {card.title}
              </h3>

              {/* Desc */}
              <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                {card.desc}
              </p>

              {/* Result */}
              <p className="mt-4 text-sm font-medium text-violet-600">
                {card.result}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
