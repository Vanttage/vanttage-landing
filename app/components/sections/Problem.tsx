"use client";

import { motion } from "framer-motion";
import { Globe, Clock, Star, ShoppingBag, Users, TrendingUp } from "lucide-react";

const cards = [
  {
    icon: Globe,
    label: "Visibilidad",
    title: "Si no apareces en Google, no te encuentran",
    body: "Tus clientes buscan en Google antes de comprar. Si no tienes web, esa búsqueda termina en tu competencia.",
    accent: "violet",
  },
  {
    icon: Clock,
    label: "Disponibilidad",
    title: "Tu negocio abierto las 24 horas",
    body: "Aunque tengas el local cerrado, la gente puede ver lo que ofreces y escribirte o comprarte a cualquier hora.",
    accent: "violet",
    highlight: true,
  },
  {
    icon: Star,
    label: "Confianza",
    title: "Primera impresión que vende",
    body: "Antes de escribirte, la gente busca tu negocio. Si encuentra una web bien hecha, confía más en ti y te escribe.",
    accent: "violet",
  },
  {
    icon: ShoppingBag,
    label: "Ventas",
    title: "Muestra lo que vendes, y véndelo",
    body: "Pon tus productos, servicios y precios a la vista, con un botón para que te escriban o te compren ahí mismo.",
    accent: "violet",
  },
  {
    icon: Users,
    label: "Alcance",
    title: "Llega a más clientes",
    body: "Ya no dependes solo de quienes te conocen. Con una web te encuentran clientes de otras ciudades de Colombia y de afuera.",
    accent: "violet",
  },
  {
    icon: TrendingUp,
    label: "Crecimiento",
    title: "Compite con los grandes",
    body: "Con una web bien hecha, un negocio pequeño se ve igual de serio que una empresa grande. Eso pesa a la hora de elegir.",
    accent: "violet",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Problem() {
  return (
    <section
      id="solutions"
      className="surface-light relative bg-[#F8FAFC] py-20 px-6 md:py-32"
    >
      {/* Glow estático */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(233,213,255,0.5), transparent)" }}
      />

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
            ¿Por qué necesitas una página web?
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
            Tu negocio merece
          </h2>

          {/* Big word */}
          <div className="relative inline-block w-full">
            <span
              className="block font-semibold leading-[0.85] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-b from-violet-500 to-purple-700"
              style={{ fontSize: "clamp(2.4rem, 10.5vw, 9.5rem)" }}
            >
              Presencia real
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-gray-500"
          >
            Casi todos tus clientes te buscan en el celular antes de llamarte.
            Lo que encuentren ahí decide si te escriben o se van con otro.
          </motion.p>
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
              className={`rounded-2xl border p-6 shadow-lg backdrop-blur-xl transition-shadow hover:shadow-purple-200/60 ${
                "highlight" in card
                  ? "border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 shadow-purple-100/60"
                  : "border-white/60 bg-white/80 shadow-purple-100/40"
              }`}
            >
              <div className="mb-4 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${"highlight" in card ? "bg-violet-100" : "bg-purple-50"}`}>
                  <card.icon size={16} className="text-violet-600" />
                </div>
                <span className="text-[10px] tracking-[0.18em] uppercase text-violet-600">
                  {card.label}
                </span>
              </div>
              <p className={`mb-2 text-sm font-semibold ${"highlight" in card ? "text-violet-700" : "text-[#0A2540]"}`}>
                {card.title}
              </p>
              <p className="text-sm leading-relaxed text-gray-500">{card.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA subtle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-14 flex justify-center"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-violet-200 bg-white px-7 py-3 text-sm font-medium text-violet-600 shadow-sm transition-all hover:bg-violet-50 hover:shadow-violet-200/60"
          >
            Quiero mi página web →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
