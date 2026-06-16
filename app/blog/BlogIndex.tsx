"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const posts = [
  {
    slug: "cuanto-cuesta-una-pagina-web-colombia",
    title: "¿Cuánto cuesta una página web en Colombia en 2025?",
    excerpt:
      "La pregunta que todos hacen. Te explicamos qué determina el precio, qué incluye cada tipo de proyecto y cómo no caer en manos equivocadas.",
    category: "Precios & Presupuesto",
    date: "Mayo 2025",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "por-que-necesitas-pagina-web-profesional",
    title: "5 señales de que tu página web está perdiendo clientes",
    excerpt:
      "Si tu web tarda en cargar, no se ve bien en celular o no aparece en Google, estás dejando dinero sobre la mesa cada día.",
    category: "Consejos & Estrategia",
    date: "Mayo 2025",
    readTime: "5 min",
    featured: false,
  },
];

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ── Header ── */}
      <section className="relative overflow-hidden bg-[#061729] px-6 pb-24 pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[140px]" />
          <div className="absolute -right-[5%] bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
              <ArrowLeft size={15} />
              Volver al inicio
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="mb-4 text-[11px] uppercase tracking-[0.3em] text-violet-400"
          >
            Blog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            Consejos para que
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              tu negocio brille en internet
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            Guías prácticas sobre páginas web, diseño y posicionamiento en Google — escritas para dueños de negocios, no para técnicos.
          </motion.p>
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                whileHover={{ y: -4 }}
                className={`group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl ${
                  post.featured ? "border-violet-200 md:col-span-2" : "border-gray-200"
                }`}
              >
                {/* Gradiente decorativo superior */}
                <div className="h-2 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />

                <div className={`p-8 ${post.featured ? "md:grid md:grid-cols-2 md:gap-10 md:items-center" : ""}`}>
                  <div>
                    {/* Categoría */}
                    <span className="inline-block rounded-full bg-violet-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-violet-500">
                      {post.category}
                    </span>

                    {/* Título */}
                    <h2 className={`mt-4 font-semibold leading-snug text-[#0A2540] transition-colors group-hover:text-violet-600 ${post.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-3 text-sm leading-relaxed text-[#64748B]">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className={post.featured ? "mt-6 md:mt-0" : "mt-6"}>
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {post.readTime} de lectura
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-md shadow-violet-500/25 transition hover:scale-[1.04]"
                    >
                      Leer artículo
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Próximamente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-10 text-center"
          >
            <p className="text-sm font-medium text-[#0A2540]">Más artículos próximamente</p>
            <p className="mt-2 text-sm text-[#64748B]">
              Estamos preparando guías sobre SEO local, tiendas virtuales y cómo elegir una agencia web en Colombia.
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
