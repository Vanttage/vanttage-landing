"use client";

import { motion } from "framer-motion";
import { Code2, Scale, Target } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    icon: Target,
    title: "Criterio antes que código",
    description:
      "Resolver el problema correcto importa más que escribir mucho código. Antes de construir, entendemos.",
  },
  {
    icon: Code2,
    title: "Estándares de producción",
    description:
      "TypeScript, testing, CI/CD, accesibilidad. No entregamos demos, entregamos software que aguanta.",
  },
  {
    icon: Scale,
    title: "Honestidad técnica",
    description:
      "Si tu proyecto no nos necesita, te lo decimos. Construimos confianza, no dependencia artificial.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-shell scroll-mt-24 overflow-hidden bg-[#F8FAFC]">
      <div className="section-inner">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-20">

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            viewport={{ once: true }}
          >
            <p className="section-kicker-gold mb-5">Sobre nosotros</p>
            <h2 className="section-title-light">
              Un estudio pequeño,
              <br />
              <span
                className="text-transparent"
                style={{
                  background: "linear-gradient(90deg, #0D8AE6, #0A2540)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                con estándares grandes.
              </span>
            </h2>

            <div className="mt-7 space-y-5 text-[16px] leading-[1.8] text-[#334155]">
              <p>
                Somos dos fundadores de Cartagena convencidos de que la web
                colombiana merece sitios más rápidos, mejor pensados y con
                código que no se cae en seis meses.
              </p>
              <p>
                Venimos del desarrollo de software empresarial — y llevamos esa
                disciplina al mundo web, donde muchas veces hace falta.
              </p>
              <p className="font-semibold text-[#0A2540]">
                Trabajamos con pocos clientes a la vez. Eso nos deja cuidar cada detalle.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { value: "2", label: "Fundadores" },
                { value: "+5", label: "Años experiencia" },
                { value: "100%", label: "Código propio" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-4xl font-extrabold text-[#0A2540]">{value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[#64748B]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <div className="space-y-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.article
                  key={v.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.09, ease: EASE }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-5 rounded-2xl border border-[#E2E8F0] bg-white p-7 transition-all duration-300 hover:border-[#0D8AE6]/30 hover:shadow-[0_12px_40px_rgba(13,138,230,0.1)]"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E2E8F0] bg-[#EFF6FF] text-[#0D8AE6] transition-colors group-hover:bg-[#0A2540] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0A2540]">{v.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-[#64748B]">{v.description}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
