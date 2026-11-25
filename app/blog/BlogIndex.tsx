"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "./_components/PostCard";
import QuoteCta from "./_components/QuoteCta";
import { posts } from "./_components/posts";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BlogIndex() {
  const reduce = useReducedMotion();
  const [featured, ...rest] = posts;

  const reveal = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  return (
    <main className="min-h-screen bg-transparent text-zinc-300">
      {/* ── Cabecera ── */}
      <header className="relative overflow-hidden px-4 pb-14 pt-32 sm:px-6 md:pb-20 md:pt-40">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] max-w-full -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.12), transparent)" }}
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.5fr_1fr] md:items-end">
          <motion.div {...reveal()}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-300">Blog</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl">
              Consejos para que te encuentren en internet
            </h1>
          </motion.div>
          <motion.p {...reveal(0.1)} className="max-w-md text-lg leading-relaxed text-zinc-400 md:justify-self-end">
            Guías sobre páginas web, precios y posicionamiento en Google, escritas para dueños de negocios y sin lenguaje técnico. Cada cifra lleva su fuente.
          </motion.p>
        </div>
      </header>

      {/* ── Destacado ── */}
      <section aria-labelledby="destacado" className="px-4 sm:px-6">
        <motion.div {...reveal(0.05)} className="mx-auto max-w-6xl border-t border-white/10 pt-10 md:pt-14">
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid gap-8 rounded-2xl outline-offset-4 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-14"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <Image
                src={featured.cover}
                alt={featured.coverAlt}
                fill
                priority
                sizes="(min-width: 1024px) 680px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            <div>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em]">
                <span className="font-medium text-white">Destacado</span>
                <span className="h-1 w-1 rounded-full bg-zinc-600" aria-hidden />
                <span className="font-medium text-violet-300">{featured.category}</span>
              </p>
              <h2
                id="destacado"
                className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white transition-colors group-hover:text-violet-200 md:text-5xl"
              >
                {featured.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-zinc-300">{featured.excerpt}</p>
              <p className="mt-6 text-sm text-zinc-400">
                {featured.date} · {featured.readTime} de lectura
              </p>
              <span className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white">
                Leer el artículo
                <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
              </span>
            </div>
          </Link>
        </motion.div>
      </section>

      {/* ── Resto ── */}
      <section aria-labelledby="mas-articulos" className="px-4 pb-24 pt-20 sm:px-6 md:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-10">
            <h2 id="mas-articulos" className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
              Más artículos
            </h2>
            <p className="text-sm text-zinc-400">{posts.length} guías publicadas</p>
          </div>
          <ul className="mt-10 grid gap-14 md:grid-cols-2 md:gap-10">
            {rest.map((post, i) => (
              <motion.li key={post.slug} {...reveal(i * 0.1)}>
                <PostCard post={post} />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteCta
        kicker="¿Tienes un proyecto?"
        title="Si prefieres hablarlo, te cotizamos tu caso"
        text="Trabajamos desde Cartagena con negocios de cualquier país. Cuéntanos qué necesitas y te respondemos con una propuesta clara en menos de 24 horas."
      />
    </main>
  );
}
