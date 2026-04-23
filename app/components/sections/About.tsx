"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Animación 1: Terminal de código (card grande) ── */
const TerminalAnim = () => {
  const lines = [
    { text: "> proyecto iniciado...", color: "#94a3b8" },
    { text: "> arquitectura definida ✓", color: "#7c3aed" },
    { text: "> componentes creados  ✓", color: "#7c3aed" },
    { text: "> deploy exitoso       ✓", color: "#22c55e" },
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
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
        className="inline-block h-[14px] w-[7px] bg-violet-400 align-middle"
      />
    </div>
  );
};

/* ── Animación 2: Órbitas (equipo enfocado) ── */
const OrbitAnim = () => (
  <div className="relative flex h-20 items-center justify-center">
    <div className="z-10 h-5 w-5 rounded-full bg-violet-500" />
    {[38, 62].map((r, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-violet-200"
        style={{ width: r * 2, height: r * 2 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 7 + i * 5, ease: "linear" }}
      >
        <div
          className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-violet-400"
          style={{ top: -6, left: "50%" }}
        />
      </motion.div>
    ))}
  </div>
);

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

/* ── Animación 4: Nodos de automatización ── */
const FlowAnim = () => {
  const nodes = ["Proceso", "IA", "Listo"];
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
const HeartbeatAnim = () => (
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
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.2 }}
        />
      </svg>
    </div>
    <div className="text-right">
      <div className="text-xl font-semibold text-violet-600">99.9%</div>
      <div className="text-[10px] uppercase tracking-widest text-gray-400">uptime</div>
    </div>
  </div>
);

/* ── Data ── */
const cards = [
  {
    title: "Boutique, no agencia masiva",
    desc: "Somos un equipo pequeño y enfocado. Cada proyecto es trabajado por desarrolladores senior — sin delegarlo a juniors ni perderse en burocracia. Atención directa, sin intermediarios.",
    result: "Trato directo garantizado",
    visual: <TerminalAnim />,
    large: true,
  },
  {
    title: "Código limpio, sin atajos",
    desc: "Nada de templates ni soluciones genéricas. Cada línea es intencional, mantenible y construida sobre arquitectura moderna.",
    result: "Cero deuda técnica",
    visual: <OrbitAnim />,
  },
  {
    title: "Diseño que convierte",
    desc: "No solo se ve bien — está diseñado para guiar al usuario hacia la acción. CRO integrado desde el primer wireframe.",
    result: "+3× conversión promedio",
    visual: <BarAnim />,
  },
  {
    title: "Automatizamos lo repetitivo",
    desc: "Identificamos los procesos manuales que frenan tu operación y los convertimos en flujos automáticos que corren solos.",
    result: "−15h/semana en promedio",
    visual: <FlowAnim />,
  },
  {
    title: "No desaparecemos al lanzar",
    desc: "Después del launch somos tu equipo técnico. Mantenimiento, iteraciones y soporte continuo para que tu producto siga evolucionando.",
    result: "Soporte post-lanzamiento",
    visual: <HeartbeatAnim />,
  },
];

/* ── Component ── */
export default function About() {
  return (
    <section id="about" className="w-full bg-[#F8FAFC] py-28 px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-violet-500">
            Sobre nosotros
          </p>
          <h2 className="text-4xl font-semibold leading-tight text-[#0A2540] md:text-5xl">
            Un equipo pequeño
            <br />
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              con resultados grandes
            </span>
          </h2>
          <p className="mt-5 text-lg text-[#475569]">
            Construimos software, automatizamos procesos y diseñamos experiencias
            digitales que convierten — con precisión boutique.
          </p>
        </motion.div>

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
              <p className="mt-4 text-sm font-medium text-violet-500">
                {card.result}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
