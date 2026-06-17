"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { allProjects, type Project } from "@/app/components/sections/Portafolio";

/* ─────────── CONFIG ─────────── */

const CATEGORIES = ["Todos", "Página Web", "Tienda Virtual", "Rediseño Web", "Aplicación Web"];
const EASE = [0.22, 1, 0.36, 1] as const;
const IFRAME_W = 1440;
const VISIBLE_H = 220;

/* ─────────── GRADIENT MOCKUP ─────────── */

function GradientMockup({ project }: { project: Project }) {
  return (
    <div className={`h-full w-full bg-gradient-to-br ${project.mockupGradient} p-5`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="h-2.5 w-14 rounded-full opacity-70" style={{ background: project.accent }} />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => <div key={i} className="h-2 w-7 rounded-full bg-white/20" />)}
        </div>
      </div>
      <div className="mb-3 space-y-2">
        <div className="h-3.5 w-3/4 rounded-full bg-white/60" />
        <div className="h-3.5 w-1/2 rounded-full bg-white/40" />
        <div className="h-2.5 w-full rounded-full bg-white/15" />
        <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full" style={{ background: `${project.accent}bb` }} />
        <div className="h-6 w-16 rounded-full bg-white/10" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => <div key={i} className="h-12 rounded-lg bg-white/8" />)}
      </div>
    </div>
  );
}

/* ─────────── BROWSER PREVIEW ─────────── */

function BrowserPreview({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [status, setStatus] = useState<"loading" | "live" | "fallback">(
    project.url ? "loading" : "fallback"
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / IFRAME_W);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (status !== "loading") return;
    const t = setTimeout(() => setStatus("fallback"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  function handleLoad(e: React.SyntheticEvent<HTMLIFrameElement>) {
    try {
      const href = e.currentTarget.contentWindow?.location.href;
      if (!href || href === "about:blank") setStatus("fallback");
      else setStatus("fallback");
    } catch {
      setStatus("live");
    }
  }

  const iframeH = Math.ceil(VISIBLE_H / scale);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex h-9 items-center gap-3 border-b border-white/10 bg-[#0d1117] px-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full opacity-50" style={{ background: project.accent }} />
          <span className="truncate text-[10px] text-white/35">
            {project.url ? project.url.replace(/^https?:\/\//, "") : "vanttagetech.com"}
          </span>
          {status === "loading" && (
            <span className="ml-auto h-1.5 w-1.5 animate-ping rounded-full bg-white/30" />
          )}
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-hidden bg-[#0d1117]" style={{ height: VISIBLE_H }}>
        {project.previewImage && (
          <img src={project.previewImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover object-top" />
        )}
        {!project.previewImage && status !== "live" && (
          <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity: status === "loading" ? 0.4 : 1 }}>
            <GradientMockup project={project} />
          </div>
        )}
        {project.url && (
          <iframe
            src={project.url}
            title={project.title}
            loading="lazy"
            onLoad={handleLoad}
            style={{
              position: "absolute", top: 0, left: 0,
              width: IFRAME_W, height: iframeH,
              transform: `scale(${scale})`, transformOrigin: "top left",
              pointerEvents: "none", border: "none",
              opacity: status === "live" ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#020617] to-transparent" />
        {status === "live" && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="text-[9px] uppercase tracking-wider text-white/70">En vivo</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────── PROJECT CARD ─────────── */

function ProjectCard({ project, i }: { project: Project; i: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
    >
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 30% 20%, ${project.accent}18, transparent 65%)` }}
      />

      <div className="relative z-10 p-5">
        <BrowserPreview project={project} />

        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{ color: project.accent, borderColor: `${project.accent}40`, background: `${project.accent}12` }}
            >
              {project.category}
            </span>
            <span className="text-xs text-white/20">{project.year}</span>
          </div>

          <h3 className="mb-2 text-[18px] font-semibold leading-snug text-white">{project.title}</h3>
          <p className="text-sm leading-relaxed text-white/50">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/30">
                {t}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-white/30 transition-colors duration-300 group-hover:text-white"
            >
              Ver sitio en vivo
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── PAGE ─────────── */

export default function ProyectosPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered =
    activeFilter === "Todos"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#020617] text-white">

      {/* Background glows */}
      <div className="pointer-events-none fixed left-1/4 top-0 h-[600px] w-[600px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.10), transparent)" }} />
      <div className="pointer-events-none fixed right-0 top-1/2 h-[400px] w-[400px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(79,70,229,0.10), transparent)" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-32 pt-36">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} />
            Volver al inicio
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/30">
            Portafolio
          </p>
          <h1 className="mb-5 text-5xl font-semibold leading-tight md:text-6xl">
            Proyectos que
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              hablan por sí solos
            </span>
          </h1>
          <p className="max-w-xl text-[16px] leading-relaxed text-white/50">
            Cada proyecto nace de entender el negocio del cliente. Aquí mostramos
            el resultado — diseño, funcionalidad y resultados reales.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
          className="mb-10 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "border-violet-500 bg-violet-500/15 text-violet-300"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {cat}
              {cat === "Todos" && (
                <span className="ml-2 text-xs opacity-50">{allProjects.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center text-white/30"
          >
            No hay proyectos en esta categoría todavía.
          </motion.div>
        )}

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-20 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-10 text-center backdrop-blur-xl"
        >
          <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-white/30">
            ¿Listo para empezar?
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
            Tu proyecto puede ser el próximo
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/40">
            Cuéntanos qué necesitas y te decimos cómo podemos ayudarte. Sin compromisos.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.03]"
          >
            Hablemos de tu proyecto
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
