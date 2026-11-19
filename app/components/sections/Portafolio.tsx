"use client";

import { motion, useInView } from "framer-motion";
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

const projectsRaw: Project[] = [
  {
    id: "12",
    category: "Aplicación Web",
    title: "ControlOne by SOTEC",
    description:
      "Plataforma que reemplaza los formatos en papel de SOTEC: reportes técnicos con fotos, permisos de trabajo, legalización de gastos, cotizaciones y cuentas de cobro. El técnico los llena desde el celular con un asistente por pasos, firma en pantalla y el documento sale en PDF con el formato aprobado. Se instala como app y funciona sin conexión.",
    url: "https://controlone.sotecse.com/",
    previewImage: "/previews/controlone.webp",
    tags: ["App a la medida", "PWA", "Firmas digitales", "Supabase"],
    accent: "#92D050",
    year: "2026",
    mockupGradient: "from-zinc-900 via-neutral-800 to-lime-900",
    mockupHeaderColor: "#3F7A12",
  },
  {
    id: "13",
    category: "Aplicación Web",
    title: "MAR · GOYN Barranquilla",
    description:
      "Mapa de Actores y Resultados del Colaborativo GOYN Barranquilla. Reúne en un mapa y un directorio a las organizaciones que trabajan por los jóvenes de Barranquilla y su área metropolitana, y cada una actualiza sus programas e indicadores desde su panel. GOYN revisa los cambios antes de publicarlos.",
    url: "https://mar.goynbarranquilla.com/",
    previewImage: "/previews/mar-goyn.webp",
    tags: ["Plataforma Web", "Mapa interactivo", "Roles y permisos", "Supabase"],
    accent: "#9B00FF",
    year: "2026",
    mockupGradient: "from-purple-900 via-violet-800 to-fuchsia-900",
    mockupHeaderColor: "#7A00CC",
  },
  {
    id: "11",
    category: "Rediseño Web",
    title: "SOTEC",
    description:
      "Nuevo sitio para SOTEC, empresa de seguridad electrónica de Cartagena. Presenta sus servicios de videovigilancia, control de acceso, telecomunicaciones, energía solar y automatización, con galería de proyectos, mapa de cobertura y contacto directo por WhatsApp.",
    url: "https://www.sotecse.com/",
    previewImage: "/previews/sotec.webp",
    tags: ["Rediseño Web", "React", "WhatsApp"],
    accent: "#3BA30E",
    year: "2026",
    mockupGradient: "from-green-900 via-emerald-900 to-zinc-900",
    mockupHeaderColor: "#2C840B",
  },
  {
    id: "14",
    category: "Página Web",
    title: "Club Hunk Cartagena",
    description:
      "Sitio del Club Hunk Cartagena, un grupo de moteros que sale a rodar los jueves y domingos. Muestra las rodadas, los aliados del club y el camino para entrar, con solicitud en línea. Los miembros tienen un portal con sus datos, la ficha de emergencia con QR para el casco y el historial de rodadas.",
    url: "https://clubhunkctg.vercel.app/",
    previewImage: "/previews/club-hunk.webp",
    tags: ["Página Web", "Portal de miembros", "Formulario", "Comunidad"],
    accent: "#7B50DD",
    year: "2026",
    mockupGradient: "from-violet-950 via-purple-900 to-zinc-950",
    mockupHeaderColor: "#5634A7",
  },
  {
    id: "09",
    category: "Migración Web",
    title: "DAGAR Soluciones",
    description:
      "Llevamos la landing de DAGAR, empresa de climatización y mantenimiento de la Costa Caribe, de un hosting compartido a Vercel con Astro y despliegue automático desde GitHub. Apuntamos el dominio sin tocar su correo corporativo y publicamos su política de calidad en PDF.",
    url: "https://www.dagarsoluciones.com.co/",
    previewImage: "/previews/dagar.webp",
    tags: ["Migración", "Astro", "Dominio y DNS", "CI/CD"],
    accent: "#1FA8FC",
    year: "2026",
    mockupGradient: "from-sky-900 via-blue-800 to-cyan-900",
    mockupHeaderColor: "#2382C9",
  },
  {
    id: "08",
    category: "Experiencia Web",
    title: "Misión Mapache · Daz Ambiental",
    description:
      "Misión Mapache, un juego web para Daz Ambiental, consultora de manejo de fauna silvestre en Cartagena. En tres situaciones cortas enseña cómo convivir con los mapaches de la zona. Se juega desde el celular sin instalar nada.",
    url: "https://dazambiental.com",
    previewImage: "/previews/daz.webp",
    tags: ["Juego web", "Educación ambiental", "Celular"],
    accent: "#22c55e",
    year: "2026",
    mockupGradient: "from-green-900 via-emerald-800 to-teal-900",
    mockupHeaderColor: "#16a34a",
  },
  {
    id: "10",
    category: "Aplicación Web",
    title: "Transportes UP",
    description:
      "Aplicación interna para las bitácoras de transporte especial que Transportes UP Cartagena entrega a Salud Total EPS. Cada paciente se registra una vez, cada mes se marcan las fechas de servicio y la app arma el PDF con el formato oficial y la firma del acudiente ya anexada.",
    url: "https://transportesup.vercel.app/",
    previewImage: "/previews/transportesup.webp",
    tags: ["App a la medida", "PDF oficial", "Firmas digitales", "Tiempo real"],
    accent: "#E5177E",
    year: "2026",
    mockupGradient: "from-fuchsia-900 via-purple-900 to-pink-900",
    mockupHeaderColor: "#6E2A8E",
  },
  {
    id: "01",
    category: "Rediseño Web",
    title: "R&R Kelab S.A.S",
    description:
      "Rediseñamos el sitio de esta firma de consultoría en sostenibilidad y economía circular, con nueva imagen de marca y migración a tecnología actual. Quedó más rápido y mejor ubicado en Google.",
    url: "https://www.kelab.com.co/",
    previewImage: "/previews/kelab.webp",
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
      "Sitio web hecho desde cero para alquiler de fincas privadas de lujo en Castilla La Nueva y Nilo. Tiene sistema de reservas y lo pasamos a tecnología actual.",
    url: "https://www.andreasadventurescol.com/",
    previewImage: "/previews/andreas.webp",
    tags: ["Diseño desde cero", "Reservas Online", "Migración"],
    accent: "#f59e0b",
    year: "2025",
    mockupGradient: "from-amber-900 via-orange-800 to-yellow-900",
    mockupHeaderColor: "#d97706",
  },
  {
    id: "03",
    category: "Aplicación Web",
    title: "PlaticApp",
    description:
      "Aplicación web a la medida para control financiero personal. Registras gastos, ingresos e inversiones escribiéndole a un bot de Telegram (texto, audio o foto) y lo ves todo en un dashboard en tiempo real: patrimonio, gráficos y presupuestos.",
    url: "https://platicapp-web.vercel.app",
    previewImage: "/previews/platicapp.webp",
    tags: ["App a la medida", "Bot de Telegram", "Dashboard", "Tiempo real"],
    accent: "#0a84ff",
    year: "2026",
    mockupGradient: "from-blue-900 via-indigo-800 to-sky-900",
    mockupHeaderColor: "#0a84ff",
  },
  {
    id: "04",
    category: "Rediseño Web",
    title: "ALZAK Foundation",
    description:
      "Rediseño completo y nueva imagen para un centro de investigación científica en salud pública del Caribe colombiano. Sitio bilingüe, alineado con su visión 2030.",
    url: "https://www.alzakfoundation.org/",
    previewImage: "/previews/alzak.webp",
    tags: ["Rediseño", "Nueva Imagen", "Bilingüe"],
    accent: "#a855f7",
    year: "2026",
    mockupGradient: "from-violet-900 via-purple-800 to-indigo-900",
    mockupHeaderColor: "#7c3aed",
  },
  {
    id: "05",
    category: "Página Web",
    title: "EcoTruck",
    description:
      "Landing page para una plataforma de recolección inteligente de residuos en Cartagena. Hecha en React, con animaciones y enfocada en explicar el impacto ambiental del servicio.",
    url: "https://ecotruck-landing.vercel.app/",
    previewImage: "/previews/ecotruck.webp",
    tags: ["Diseño Web", "React", "Sostenibilidad"],
    accent: "#22c55e",
    year: "2025",
    mockupGradient: "from-green-900 via-teal-800 to-emerald-900",
    mockupHeaderColor: "#16a34a",
  },
  {
    id: "06",
    category: "Aplicación Web",
    title: "Co-Workers Cloud",
    description:
      "Marketplace de economía circular para R&R Kelab. Conecta a quienes producen, gestionan y transforman residuos aprovechables en una sola plataforma, única en Colombia.",
    url: "https://cloud.kelab.com.co/",
    previewImage: "/previews/coworkers.webp",
    tags: ["Marketplace", "App Web", "Economía Circular"],
    accent: "#06b6d4",
    year: "2025",
    mockupGradient: "from-cyan-900 via-teal-800 to-sky-900",
    mockupHeaderColor: "#0891b2",
  },
  {
    id: "07",
    category: "Página Web",
    title: "GIS Migration",
    description:
      "Sitio web hecho desde cero para una firma de asesoría migratoria en EE. UU. Está en varios idiomas, tiene formulario de contacto y recibe pagos internacionales.",
    url: "https://www.losgestores.com/",
    previewImage: "/previews/losgestores.webp",
    tags: ["Desarrollo desde cero", "Multilenguaje", "Formularios"],
    accent: "#1EA7FF",
    year: "2025",
    mockupGradient: "from-sky-900 via-blue-800 to-indigo-900",
    mockupHeaderColor: "#0284c7",
  },
];

/* Orden de exhibición: los más recientes primero (por año, descendente).
   El sort es estable, así que dentro de un mismo año se conserva el orden de arriba. */
export const allProjects: Project[] = [...projectsRaw].sort(
  (a, b) => Number(b.year) - Number(a.year),
);

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
  /* El iframe (sitio externo completo) solo se monta cuando la tarjeta está
     cerca del viewport, para no cargar 3 webs externas al abrir la página. */
  const inView = useInView(containerRef, { once: true, margin: "300px" });
  const [scale, setScale] = useState(0.28);
  const [status, setStatus] = useState<"loading" | "live" | "fallback">(
    project.url && !project.previewImage ? "loading" : "fallback",
  );

  /* Escala dinámica según el ancho real del contenedor */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      /* Con el contenedor oculto el ancho es 0 → no actualizar (evita height: Infinity) */
      if (w > 0) setScale(w / IFRAME_W);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  /* Timeout de seguridad: si el iframe no responde en 4s, fallback */
  useEffect(() => {
    if (status !== "loading" || !inView) return;
    const t = setTimeout(() => setStatus("fallback"), 4000);
    return () => clearTimeout(t);
  }, [status, inView]);

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

  /* Guardia: con scale = 0 la altura sería Infinity (error de consola) */
  const iframeH = scale ? Math.ceil(VISIBLE_H / scale) : VISIBLE_H;

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
          <span className="truncate text-[10px] text-white/60">
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

        {/* Iframe live — solo si hay URL y la tarjeta está cerca del viewport */}
        {project.url && !project.previewImage && inView && (
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#06060C] to-transparent" />

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
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl focus-within:ring-2 focus-within:ring-violet-400"
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
        }}
      />

      <div className="p-5">
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
            <span className="text-xs text-white/50">{project.year}</span>
          </div>

          <h3 className="mb-2 text-[18px] font-semibold leading-snug text-white">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} (abre en una pestaña nueva)`}
                className="outline-none after:absolute after:inset-0 after:z-10 after:content-['']"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>
          <p className="text-sm leading-relaxed text-white/50">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-white/60"
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div aria-hidden className="mt-4 flex items-center gap-1.5 text-sm text-white/70 transition-colors duration-300 group-hover:text-white">
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
      className="relative overflow-hidden bg-[#06060C] py-28 px-6 text-white"
    >
      {/* Background glows — CSS only, no Framer animate loop */}
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.12), transparent)" }}
      />
      <div
        className="pointer-events-none absolute -left-[10%] -top-[10%] h-[400px] w-[400px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(99,102,241,0.12), transparent)" }}
      />

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
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/60">
              Proyectos
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Proyectos que
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                ya están en línea
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Páginas web, tiendas y aplicaciones que hicimos para negocios en
            Colombia y Estados Unidos. Puedes abrirlas y verlas funcionando.
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
          <p className="text-xs text-white/60">
            {allProjects.length} proyectos completados
          </p>
        </motion.div>
      </div>
    </section>
  );
}
