"use client";

import { motion } from "framer-motion";

const sectors = [
  {
    title: "Retail",
    description: "Operaciones con múltiples puntos, reportes y seguimiento diario.",
  },
  {
    title: "Salud",
    description: "Procesos sensibles donde la trazabilidad y el orden importan.",
  },
  {
    title: "Logística",
    description: "Flujos distribuidos que necesitan coordinación y visibilidad.",
  },
  {
    title: "Finanzas",
    description: "Procesos donde automatizar reduce errores y tiempo operativo.",
  },
  {
    title: "Construcción",
    description: "Equipos, aprobaciones y avance de proyectos con múltiples actores.",
  },
  {
    title: "Servicios B2B",
    description: "Empresas que crecieron y ahora necesitan estructura tecnológica.",
  },
];

const stats = [
  { value: "+20", label: "Proyectos entregados" },
  { value: "6", label: "Tipos de operación atendidos" },
  { value: "100%", label: "Foco en software útil para negocio" },
  { value: "<48h", label: "Para diagnosticar oportunidad inicial" },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="section-shell scroll-mt-28 overflow-hidden bg-[#020617]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -z-10 h-[18rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#1EA7FF]/6 blur-[120px]" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="section-kicker">Confianza</p>
          <h2 className="section-title text-white">
            Experiencia en operaciones
            <br />
            <span className="text-[#94A3B8]">
              con retos distintos, patrones similares.
            </span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            La industria cambia, pero la fricción suele repetirse: procesos
            manuales, poca visibilidad y sistemas que no acompañan el ritmo del
            negocio.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => (
            <motion.article
              key={sector.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="surface-panel rounded-[1.65rem] p-6"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-[#64748B]">
                Sector
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold text-white">
                {sector.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#94A3B8]">
                {sector.description}
              </p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          viewport={{ once: true }}
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-[1.65rem] border border-white/8 bg-white/[0.03] px-5 py-6 text-center"
            >
              <p className="font-display text-3xl font-bold text-white">{value}</p>
              <p className="mt-2 text-xs leading-6 text-[#94A3B8] uppercase tracking-[0.16em]">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
