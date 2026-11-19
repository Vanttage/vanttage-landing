"use client";

/* Página /servicios: mismo estilo del home (fondo #06060C, acento violeta,
   editorial). Hero tipográfico; cada servicio trae qué incluye, plazo y la
   ficha de un proyecto real con su captura de página completa. */

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Lock, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { faqs } from "./faqs";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────── DATA ─────────── */

type Example = {
  name: string;
  client: string;
  city: string;
  year: string;
  url: string;
  did: string[];
  tags: string[];
  shot: string; // página completa, 1200x3000
};

type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  termLabel: string;
  term: string;
  example: Example;
};

const services: Service[] = [
  {
    id: "paginas-web",
    title: "Páginas web profesionales",
    tagline: "Para que tu negocio se vea serio y venda más.",
    description:
      "Diseñamos y programamos tu sitio desde cero, sin plantillas. La página está pensada para que tus clientes confíen en ti y te escriban. Se ve bien en el celular, carga rápido y queda lista para Google.",
    includes: [
      "Diseño propio, hecho para tu marca",
      "Se adapta a celular, tablet y computador",
      "SEO básico desde el inicio",
      "Formulario de contacto",
      "Revisiones hasta que quedes conforme",
    ],
    termLabel: "Plazo",
    term: "7 a 15 días hábiles",
    example: {
      name: "SOTEC",
      client: "SOTEC",
      city: "Cartagena",
      year: "2026",
      url: "https://www.sotecse.com/",
      did: ["Diseño y desarrollo del sitio desde cero", "Galería de proyectos y mapa de cobertura", "Contacto directo por WhatsApp"],
      tags: ["React", "WhatsApp", "Diseño a medida"],
      shot: "/previews/sotec-full.webp",
    },
  },
  {
    id: "tiendas-virtuales",
    title: "Tiendas virtuales",
    tagline: "Vende en internet a cualquier hora.",
    description:
      "Tu tienda con catálogo de productos, pagos en línea y manejo de pedidos. Tus clientes compran desde el celular o el computador y tú manejas todo desde un panel sencillo.",
    includes: [
      "Catálogo de productos con filtros",
      "Pagos en línea (PSE, tarjetas, Nequi)",
      "Panel de administración",
      "Manejo de pedidos e inventario",
      "Proceso de compra corto y claro",
    ],
    termLabel: "Plazo",
    term: "3 a 4 semanas",
    example: {
      name: "Co-Workers Cloud",
      client: "R&R Kelab",
      city: "Bogotá",
      year: "2025",
      url: "https://cloud.kelab.com.co/",
      did: ["Marketplace con catálogo por tipo de material", "Tiendas de cada empresa dentro de la plataforma", "Conecta a quien produce, gestiona y transforma residuos"],
      tags: ["Marketplace", "App web", "Economía circular"],
      shot: "/previews/coworkers-full.webp",
    },
  },
  {
    id: "rediseno-web",
    title: "Rediseño de tu web actual",
    tagline: "Tu web al día sin perder lo que ya tienes.",
    description:
      "¿Tu página se ve vieja o no te trae clientes? La rehacemos con diseño nuevo, más fácil de usar y con tecnología actual, sin perder tu dominio ni lo que ya tienes ganado en Google.",
    includes: [
      "Diagnóstico del sitio actual",
      "Diseño nuevo adaptado a tu marca",
      "Cambio de sitio sin que se caiga",
      "Cuidamos el posicionamiento que ya tienes",
      "Mejoramos la velocidad de carga",
    ],
    termLabel: "Plazo",
    term: "1 a 2 semanas",
    example: {
      name: "ALZAK Foundation",
      client: "ALZAK Foundation",
      city: "Cartagena",
      year: "2026",
      url: "https://www.alzakfoundation.org/",
      did: ["Rediseño completo con nueva imagen", "Sitio en español e inglés", "Secciones de investigación y equipo científico"],
      tags: ["Rediseño", "Bilingüe", "Nueva imagen"],
      shot: "/previews/alzak-full.webp",
    },
  },
  {
    id: "mantenimiento",
    title: "Hosting, dominio y mantenimiento",
    tagline: "Tu página al día y protegida.",
    description:
      "Nos encargamos de que tu web funcione bien: actualizaciones, copias de seguridad, revisar que esté en línea y hacer cambios pequeños. Tú te ocupas de tu negocio.",
    includes: [
      "Actualizaciones de seguridad",
      "Copias de seguridad automáticas",
      "Monitoreo de disponibilidad 24/7",
      "Cambios menores incluidos",
      "Reporte mensual y soporte por WhatsApp o correo",
    ],
    termLabel: "Modalidad",
    term: "Plan mensual",
    example: {
      name: "DAGAR Soluciones",
      client: "DAGAR Soluciones",
      city: "Cartagena",
      year: "2026",
      url: "https://www.dagarsoluciones.com.co/",
      did: ["Migración de hosting compartido a Vercel con Astro", "Dominio apuntado sin tocar el correo corporativo", "Despliegue automático desde GitHub"],
      tags: ["Astro", "Vercel", "Dominio y DNS"],
      shot: "/previews/dagar-full.webp",
    },
  },
  {
    id: "seo",
    title: "Posicionamiento en Google (SEO)",
    tagline: "Aparece cuando tus clientes te buscan.",
    description:
      "Trabajamos tu página para que salga más arriba en Google cuando alguien busca tu servicio en tu ciudad. Así te llegan visitas sin pagar por anuncios.",
    includes: [
      "Auditoría técnica",
      "Palabras clave de tu ciudad y tu sector",
      "Google Search Console y Analytics",
      "Contenido pensado para búsquedas",
      "Velocidad y Core Web Vitals",
    ],
    termLabel: "Modalidad",
    term: "Mensual, con reporte de posiciones",
    example: {
      name: "R&R Kelab",
      client: "R&R Kelab",
      city: "Bogotá",
      year: "2024",
      url: "https://www.kelab.com.co/",
      did: ["Rediseño con nueva imagen de marca", "Migración a tecnología actual", "Sitio más rápido y mejor ubicado en Google"],
      tags: ["SEO", "Migración", "Branding"],
      shot: "/previews/kelab-full.webp",
    },
  },
  {
    id: "aplicaciones-web",
    title: "Aplicaciones web a medida",
    tagline: "Software hecho para la forma en que trabajas.",
    description:
      "¿Necesitas algo más que una página? Hacemos sistemas de reservas, CRM, dashboards, portales de clientes o la herramienta que tu operación necesite.",
    includes: [
      "Levantamiento de requerimientos",
      "Diseño de pantallas (UX/UI)",
      "Desarrollo a medida, sin plantillas",
      "Integración con los sistemas que ya usas",
      "Panel de administración, documentación y capacitación",
    ],
    termLabel: "Plazo",
    term: "Según el alcance",
    example: {
      name: "ControlOne by SOTEC",
      client: "SOTEC",
      city: "Cartagena",
      year: "2026",
      url: "https://controlone.sotecse.com/",
      did: ["Formatos que el técnico llena en el celular", "Firma en pantalla y PDF con el formato aprobado", "Se instala como app y funciona sin conexión"],
      tags: ["PWA", "Firmas digitales", "Supabase"],
      shot: "/previews/controlone-full.webp",
    },
  },
];

const commitments = [
  { title: "Diseño propio", text: "No usamos plantillas. Cada proyecto se diseña desde cero." },
  { title: "Revisiones incluidas", text: "Ajustamos el diseño hasta que quedes conforme." },
  { title: "Trato directo", text: "Hablas con quien hace el trabajo." },
  { title: "Soporte después de entregar", text: "Seguimos disponibles cuando tu web ya está publicada." },
];

/* ─────────── HELPERS ─────────── */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function PrimaryCta({ label = "Cotizar mi proyecto" }: { label?: string }) {
  return (
    <Link
      href="/contacto"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#06060C] transition-colors hover:bg-zinc-200"
    >
      {label}
      <ArrowRight size={16} aria-hidden />
    </Link>
  );
}

function domain(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");
}

/* Marco de navegador con la captura de página completa. Al pasar el cursor
   (o al enfocar el enlace del proyecto) la captura baja lento dentro del
   marco. La imagen mide 1200x3000 y el marco es 16:10, así que el recorrido
   es el 75 % de la altura de la imagen. Con movimiento reducido se queda
   quieta en la parte superior. */
function ProjectShowcase({ ex, index }: { ex: Example; index: number }) {
  const reduce = useReducedMotion();
  const scrollClasses = reduce
    ? ""
    : "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3/4 group-hover:duration-[9000ms] group-hover:ease-linear group-focus-within:-translate-y-3/4 group-focus-within:duration-[9000ms] group-focus-within:ease-linear";

  return (
    <figure className="group">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0D0D14]">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <div aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="mx-auto flex min-w-0 max-w-[60%] items-center gap-1.5 rounded-md bg-white/[0.05] px-3 py-1 text-[11px] text-zinc-400">
            <Lock size={10} aria-hidden className="shrink-0" />
            <span className="truncate">{domain(ex.url)}</span>
          </div>
          <span aria-hidden className="w-[42px]" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={ex.shot}
            alt={`Página de inicio de ${ex.name}`}
            width={1200}
            height={3000}
            sizes="(min-width: 1024px) 640px, 100vw"
            className={`block h-auto w-full will-change-transform ${scrollClasses}`}
          />
        </div>
      </div>

      <figcaption className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            Proyecto real · {String(index + 1).padStart(2, "0")}
          </p>
          {!reduce && (
            <p aria-hidden className="hidden text-xs text-zinc-500 [@media(hover:hover)]:block">
              Pasa el cursor para recorrer la página
            </p>
          )}
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{ex.name}</p>

        <dl className="mt-5 grid grid-cols-3 gap-4 border-y border-white/10 py-4 text-sm">
          <div className="min-w-0">
            <dt className="text-xs text-zinc-400">Cliente</dt>
            <dd className="mt-1 truncate text-zinc-200">{ex.client}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs text-zinc-400">Ciudad</dt>
            <dd className="mt-1 truncate text-zinc-200">{ex.city}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-xs text-zinc-400">Año</dt>
            <dd className="mt-1 tabular-nums text-zinc-200">{ex.year}</dd>
          </div>
        </dl>

        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-zinc-400">Qué hicimos</p>
        <ul className="mt-3 space-y-2">
          {ex.did.map((d) => (
            <li key={d} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
              <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-zinc-500" />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías y etiquetas">
            {ex.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
              >
                {t}
              </li>
            ))}
          </ul>
          <a
            href={ex.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            Visitar {domain(ex.url)} <ArrowUpRight size={15} aria-hidden />
            <span className="sr-only">(abre en una pestaña nueva)</span>
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  const btnId = `${id}-btn`;
  const panelId = `${id}-panel`;
  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="text-base font-medium text-white md:text-lg">{q}</span>
          <Plus
            size={18}
            aria-hidden
            className={`shrink-0 transition-transform duration-300 ${
              open ? "rotate-45 text-white" : "text-zinc-400"
            }`}
          />
        </button>
      </h3>
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        initial={false}
        animate={open ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
      >
        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-zinc-400 md:text-base">{a}</p>
      </motion.div>
    </div>
  );
}

/* ─────────── MAIN ─────────── */

export default function ServiciosContent() {
  const reduce = useReducedMotion();
  const intro = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : 0.6, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <main className="min-h-screen overflow-x-clip bg-[#06060C] text-white">
      {/* ── Hero tipográfico ── */}
      <section className="px-6 pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <motion.p {...intro(0)} className="mb-6 text-xs uppercase tracking-[0.2em] text-violet-300">
            Servicios
          </motion.p>
          <motion.h1
            {...intro(0.05)}
            className="max-w-5xl text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Todo lo que tu negocio necesita en internet
          </motion.h1>

          <motion.div
            {...intro(0.12)}
            className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:mt-16 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16"
          >
            <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
              Cotizamos cada proyecto según lo que necesitas. Desde el principio te
              decimos qué incluye, cuánto cuesta y cuándo lo entregamos. Trabajamos
              desde Cartagena con clientes de cualquier país.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-self-end">
              <PrimaryCta />
              <Link
                href="/proyectos"
                className="inline-flex min-h-11 items-center text-sm text-zinc-300 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
              >
                Ver proyectos
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Índice de servicios */}
        <motion.nav
          {...intro(0.18)}
          aria-label="Servicios en esta página"
          className="mx-auto mt-16 max-w-6xl md:mt-20"
        >
          <ol className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.id} className="border-b border-white/10">
                <a
                  href={`#${s.id}`}
                  className="group flex min-h-14 items-center gap-4 py-4 pr-4 text-left"
                >
                  <span className="w-6 text-sm tabular-nums text-zinc-500 transition-colors group-hover:text-violet-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-zinc-300 transition-colors group-hover:text-white">
                    {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>
      </section>

      {/* ── Servicios en detalle ── */}
      <section aria-labelledby="detalle-titulo" className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <h2 id="detalle-titulo" className="sr-only">
            Servicios en detalle
          </h2>
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.id}
                id={s.id}
                className={`scroll-mt-24 py-16 md:py-24 ${i === 0 ? "pt-8 md:pt-12" : "border-t border-white/10"}`}
              >
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                  <Reveal
                    className={`lg:col-span-5 ${flip ? "lg:order-2" : ""} lg:sticky lg:top-28 lg:self-start`}
                  >
                    <p className="flex items-baseline gap-3 text-xs uppercase tracking-[0.2em] text-violet-300">
                      <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden className="h-px w-8 bg-violet-300/50" />
                      <span className="text-zinc-400">Servicio</span>
                    </p>
                    <h3 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-lg text-zinc-300">{s.tagline}</p>
                    <p className="mt-5 leading-relaxed text-zinc-400">{s.description}</p>

                    <p className="mt-8 text-xs uppercase tracking-[0.2em] text-zinc-400">
                      Qué incluye
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                          <span aria-hidden className="mt-[0.6rem] h-px w-3 shrink-0 bg-violet-300" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-white/10 pt-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{s.termLabel}</p>
                        <p className="mt-1.5 text-base text-white">{s.term}</p>
                      </div>
                      <Link
                        href="/contacto"
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white underline decoration-violet-300/60 underline-offset-4 hover:decoration-white"
                      >
                        Cotizar este servicio <ArrowRight size={15} aria-hidden />
                      </Link>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1} className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                    <ProjectShowcase ex={s.example} index={i} />
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section aria-labelledby="faq-titulo" className="border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-violet-300">
              Preguntas frecuentes
            </p>
            <h2
              id="faq-titulo"
              className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
            >
              Lo que suelen preguntarnos
            </h2>
            <p className="mt-5 max-w-sm text-zinc-400">
              ¿Tienes otra duda? Escríbenos y te respondemos directamente.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="border-t border-white/10">
              {faqs.map((f) => (
                <FAQItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final + lo que incluye todo proyecto ── */}
      <section aria-labelledby="cta-titulo" className="px-6 pb-24 md:pb-32">
        <Reveal className="mx-auto max-w-6xl border-t border-white/10 pt-16 md:pt-20">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-violet-300">
                Sin compromiso
              </p>
              <h2
                id="cta-titulo"
                className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
              >
                Cuéntanos qué necesitas
              </h2>
              <p className="mt-5 max-w-lg text-zinc-400">
                Te respondemos con una propuesta clara en menos de 24 horas. La
                cotización no tiene costo.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-self-end">
              <PrimaryCta />
              <Link
                href="/proyectos"
                className="inline-flex min-h-11 items-center text-sm text-zinc-300 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
              >
                Ver proyectos
              </Link>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Incluido en todos los proyectos
            </h3>
            <ul className="mt-6 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {commitments.map((c, i) => (
                <li
                  key={c.title}
                  className={`border-b border-white/10 py-6 sm:pr-8 lg:border-b-0 ${
                    i > 0 ? "lg:border-l lg:pl-8" : ""
                  } ${i % 2 === 1 ? "sm:border-l sm:pl-8 lg:border-l" : ""}`}
                >
                  <p className="font-medium text-white">{c.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
