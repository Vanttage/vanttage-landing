"use client";

import { motion } from "framer-motion";
import { Bell, Clock, BarChart3, Zap, Globe } from "lucide-react";

const cards = [
  {
    icon: Bell,
    label: "Alertas",
    title: "Leads perdidos",
    body: "Cada minuto sin respuesta es un cliente que se va con la competencia.",
  },
  {
    icon: null,
    label: null,
    title: "24/7",
    body: "Tu IA nunca duerme. Siempre disponible para capturar demanda.",
    highlight: true,
  },
  {
    icon: Clock,
    label: "Velocidad",
    title: "Responde en 60s",
    body: "El tiempo de respuesta es el factor #1 en la tasa de conversión.",
  },
  {
    icon: Globe,
    label: "Alcance",
    title: "Presencia global",
    body: "Cobertura local con infraestructura que escala sin fricción.",
  },
  {
    icon: Zap,
    label: "Automatización",
    title: "Cero intervención manual",
    body: "La IA califica, responde y agenda reuniones automáticamente.",
  },
  {
    icon: BarChart3,
    label: "Rendimiento",
    title: "Métricas en tiempo real",
    stats: [
      { label: "+310 llamadas", time: "hace 10s" },
      { label: "+44 reuniones", time: "hace 1m" },
    ],
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative bg-[#F8FAFC] py-20 px-6 md:py-32"
    >
      {/* Glow estático */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200 blur-[160px] opacity-40" />

      <div className="relative mx-auto max-w-6xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-6 flex justify-center"
        >
          <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-xs tracking-[0.2em] uppercase text-purple-600">
            Impacto real, medido
          </span>
        </motion.div>

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-medium text-[#0A2540] mb-2">
            El impacto,
          </h2>

          {/* Big word + reflection */}
          <div className="relative inline-block w-full">
            <span
              className="block font-semibold leading-[0.85] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-violet-500 to-purple-700"
              style={{ fontSize: "clamp(2.4rem, 10.5vw, 9.5rem)" }}
            >
              Cuantificado
            </span>

            {/* Reflection */}
            <div className="pointer-events-none absolute left-0 right-0 top-full h-10 overflow-hidden">
              <span
                className="block font-semibold leading-[0.85] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-violet-500 to-purple-700 opacity-20 scale-y-[-1]"
                style={{ fontSize: "clamp(2.4rem, 10.5vw, 9.5rem)" }}
              >
                Cuantificado
              </span>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8FAFC]" />
            </div>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-20">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-purple-100/40 backdrop-blur-xl"
            >
              {"highlight" in card ? (
                <>
                  <h3 className="text-5xl font-semibold text-violet-600">24/7</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{card.body}</p>
                </>
              ) : "stats" in card ? (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    {card.icon && <card.icon size={16} className="text-violet-600" />}
                    <span className="text-[10px] tracking-[0.18em] uppercase text-violet-500">{card.label}</span>
                  </div>
                  <p className="mb-3 text-sm font-semibold text-[#0A2540]">{card.title}</p>
                  <div className="space-y-2">
                    {card.stats.map((s, j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <span className="text-gray-700">{s.label}</span>
                        <span className="text-gray-400 text-xs">{s.time}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 flex items-center gap-2">
                    {card.icon && <card.icon size={16} className="text-violet-600" />}
                    <span className="text-[10px] tracking-[0.18em] uppercase text-violet-500">{card.label}</span>
                  </div>
                  <p className="mb-2 text-sm font-semibold text-[#0A2540]">{card.title}</p>
                  <p className="text-sm leading-relaxed text-gray-500">{card.body}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
