"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

/* ─────────── TYPES ─────────── */

export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  url?: string;
  previewImage?: string; // ruta a /public/previews/xxx.jpg si tienes screenshot real
  tags: string[];
  accent: string;
  year: string;
  /** CSS gradient para el mockup visual cuando no hay previewImage */
  mockupGradient: string;
  /** Colores del "header" del mockup */
  mockupHeaderColor: string;
}

/* ─────────── DATA (ajusta con tus proyectos reales) ─────────── */

export const allProjects: Project[] = [
  {
    id: "01",
    category: "Rediseño Web",
    title: "R&R Kelab S.A.S",
    description:
      "Rediseño completo, nueva imagen de marca y migración a tecnologías modernas para firma de consultoría en sostenibilidad y economía circular. Mejor diseño, mayor velocidad y posicionamiento optimizado en Google.",
    url: "https://www.kelab.com.co/",
    tags: ["Rediseño Web", "Migración", "SEO", "Branding"],
    accent: "#22c55e",
    year: "2024",
    mockupGradient: "from-green-900 via-emerald-800 to-teal-900",
    mockupHeaderColor: "#16a34a",
  },
  {
    id: "02",
    category: "Diseño Web",
    title: "Andreas Adventures",
    description:
      "Sitio web creado desde cero para alquiler de fincas privadas de lujo en Castilla La Nueva y Nilo. Diseño premium, sistema de reservas y migración a tecnología moderna.",
    url: "https://www.andreasadventurescol.com/",
    tags: ["Diseño desde cero", "Reservas Online", "Migración"],
    accent: "#f59e0b",
    year: "2025",
    mockupGradient: "from-amber-900 via-orange-800 to-yellow-900",
    mockupHeaderColor: "#d97706",
  },
  {
    id: "03",
    category: "Página Web",
    title: "GIS Migration",
    description:
      "Sitio web desarrollado desde cero para firma de asesoría migratoria en EE.UU. Diseño profesional, multilenguaje, formulario de contacto y gestión de pagos internacionales.",
    url: "https://www.losgestores.com/",
    tags: ["Desarrollo desde cero", "Multilenguaje", "Formularios"],
    accent: "#1EA7FF",
    year: "2025",
    mockupGradient: "from-sky-900 via-blue-800 to-indigo-900",
    mockupHeaderColor: "#0284c7",
  },
  {
    id: "04",
    category: "Rediseño Web",
    title: "ALZAK Foundation",
    description:
      "Rediseño completo y nueva imagen para centro de investigación científica en salud pública del Caribe colombiano. Sitio moderno, bilingüe y alineado con su visión 2030.",
    url: "https://www.alzakfoundation.org/",
    tags: ["Rediseño", "Nueva Imagen", "Bilingüe"],
    accent: "#a855f7",
    year: "2025",
    mockupGradient: "from-violet-900 via-purple-800 to-indigo-900",
    mockupHeaderColor: "#7c3aed",
  },
  {
    id: "05",
    category: "Página Web",
    title: "EcoTruck",
    description:
      "Landing page profesional para plataforma de recolección inteligente de residuos en Cartagena. Diseño visual de alto nivel, animaciones, stack tecnológico completo y enfoque en impacto sostenible.",
    url: "https://ecotruck-landing.vercel.app/",
    tags: ["Diseño Web", "React", "Sostenibilidad"],
    accent: "#22c55e",
    year: "2024",
    mockupGradient: "from-green-900 via-teal-800 to-emerald-900",
    mockupHeaderColor: "#16a34a",
  },
  {
    id: "06",
    category: "Aplicación Web",
    title: "Co-Workers Cloud",
    description:
      "Marketplace de economía circular para R&R Kelab. Plataforma que conecta productores, gestores y transformadores de residuos aprovechables en un ecosistema digital único en Colombia.",
    url: "https://cloud.kelab.com.co/",
    tags: ["Marketplace", "App Web", "Economía Circular"],
    accent: "#06b6d4",
    year: "2025",
    mockupGradient: "from-cyan-900 via-teal-800 to-sky-900",
    mockupHeaderColor: "#0891b2",
  },
  {
    id: "07",
    category: "Aplicación Web",
    title: "PlaticApp",
    description:
      "Aplicación web responsive hecha a la medida para control financiero personal: registra gastos, ingresos e inversiones hablándole a un bot de Telegram (texto, audio o foto) y visualízalo todo en un dashboard en tiempo real — patrimonio, gráficos y presupuestos.",
    url: "https://platicapp-web.vercel.app",
    tags: ["App a la medida", "Bot de Telegram", "Dashboard", "Tiempo real"],
    accent: "#0a84ff",
    year: "2025",
    mockupGradient: "from-blue-900 via-indigo-800 to-sky-900",
    mockupHeaderColor: "#0a84ff",
  },
];

/* ─────────── LIVE BROWSER PREVIEW ─────────── */

const IFRAME_W = 1440;
const VISIBLE_H = 210;

function GradientMockup({ project }: { project: Project }) {
  return (
    <div
      className={`h-full w-full bg-gradient-to-br ${project.mockupGradient} p-5`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div
          className="h-2.5 w-14 rounded-full opacity-70"
          style={{ background: project.accent }}
        />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 w-7 rounded-full bg-white/20" />
          ))}
        </div>
      </div>
      <div className="mb-3 space-y-2">
        <div className="h-3.5 w-3/4 rounded-full bg-white/60" />
        <div className="h-3.5 w-1/2 rounded-full bg-white/40" />
        <div className="h-2.5 w-full rounded-full bg-white/15" />
        <div className="h-2.5 w-4/5 rounded-full bg-white/10" />
      </div>
      <div className="flex gap-2">
        <div
          className="h-6 w-20 rounded-full"
          style={{ background: `${project.accent}bb` }}
        />
        <div className="h-6 w-16 rounded-full bg-white/10" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-lg bg-white/8" />
        ))}
      </div>
    </div>
  );
}

function BrowserPreview({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [status, setStatus] = useState<"loading" | "live" | "fallback">(
    project.url ? "loading" : "fallback",
  );

  /* Escala dinámica según el ancho real del contenedor */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / IFRAME_W);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* Timeout de seguridad: si el iframe no responde en 4s, fallback */
  useEffect(() => {
    if (status !== "loading") return;
    const t = setTimeout(() => setStatus("fallback"), 4000);
    return () => clearTimeout(t);
  }, [status]);

  /*
   * onLoad detecta si el sitio bloqueó el iframe con X-Frame-Options:
   * - Si la carga fue exitosa (cross-origin), acceder a contentWindow.location lanza SecurityError → "live"
   * - Si fue bloqueado, el iframe muestra about:blank y podemos leer href sin error → "fallback"
   */
  function handleLoad(e: React.SyntheticEvent<HTMLIFrameElement>) {
    try {
      const href = e.currentTarget.contentWindow?.location.href;
      // Podemos leer href → está vacío/blocked
      if (!href || href === "about:blank") setStatus("fallback");
      else setStatus("fallback"); // mismo origen pero raro, fallback seguro
    } catch {
      // SecurityError = cross-origin cargó bien ✓
      setStatus("live");
    }
  }

  const iframeH = Math.ceil(VISIBLE_H / scale);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      {/* Chrome bar */}
      <div className="flex h-9 items-center gap-3 border-b border-white/10 bg-[#0d1117] px-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full opacity-50"
            style={{ background: project.accent }}
          />
          <span className="truncate text-[10px] text-white/35">
            {project.url
              ? project.url.replace(/^https?:\/\//, "")
              : "vanttagetech.com"}
          </span>
          {status === "loading" && (
            <span className="ml-auto h-1.5 w-1.5 animate-ping rounded-full bg-white/30" />
          )}
        </div>
      </div>

      {/* Preview area */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-[#0d1117]"
        style={{ height: VISIBLE_H }}
      >
        {/* Imagen estática si existe */}
        {project.previewImage && (
          <img
            src={project.previewImage}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}

        {/* Fallback mockup */}
        {!project.previewImage && status !== "live" && (
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: status === "loading" ? 0.4 : 1 }}
          >
            <GradientMockup project={project} />
          </div>
        )}

        {/* Iframe live — solo si hay URL */}
        {project.url && (
          <iframe
            src={project.url}
            title={project.title}
            loading="lazy"
            onLoad={handleLoad}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: IFRAME_W,
              height: iframeH,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: "none",
              border: "none",
              opacity: status === "live" ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
          />
        )}

        {/* Fade inferior */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#020617] to-transparent" />

        {/* Badge "En vivo" */}
        {status === "live" && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <span className="text-[9px] uppercase tracking-wider text-white/70">
              En vivo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────── PROJECT CARD ─────────── */

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const EASE = [0.22, 1, 0.36, 1] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}18, transparent 65%)`,
        }}
      />

      <div className="relative z-10 p-5">
        {/* Browser preview */}
        <BrowserPreview project={project} />

        {/* Info */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em]"
              style={{
                color: project.accent,
                borderColor: `${project.accent}40`,
                background: `${project.accent}12`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-white/20">{project.year}</span>
          </div>

          <h3 className="mb-2 text-[18px] font-semibold leading-snug text-white">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/50">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/30"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex items-center gap-1.5 text-sm text-white/30 transition-colors duration-300 group-hover:text-white">
            Ver proyecto
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── SECTION ─────────── */

const EASE = [0.22, 1, 0.36, 1] as const;
const PREVIEW_COUNT = 3;

export default function Portfolio() {
  const featured = allProjects.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-[#020617] py-28 px-6 text-white"
    >
      {/* Background glows — CSS only, no Framer animate loop */}
      <div className="pointer-events-none absolute left-1/2 top-[45%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[160px]" />
      <div className="pointer-events-none absolute -left-[10%] -top-[10%] h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/30">
              Proyectos
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Trabajo real,
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                resultados comprobados
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/40">
            Páginas web, tiendas y aplicaciones que generan impacto real para
            negocios colombianos.
          </p>
        </motion.div>

        {/* Grid — 3 cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} />
          ))}
        </div>

        {/* Ver todos */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <Link
            href="/proyectos"
            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition-all hover:border-violet-500/50 hover:bg-violet-500/10"
          >
            Ver todos los proyectos
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/20 transition-all group-hover:bg-violet-500">
              <ArrowRight size={14} />
            </span>
          </Link>
          <p className="text-xs text-white/25">
            {allProjects.length} proyectos completados
          </p>
        </motion.div>
      </div>
    </section>
  );
}
