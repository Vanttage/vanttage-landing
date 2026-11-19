"use client";

/* Servicios: lista de servicios + un proyecto real como ejemplo de cada uno.
   Escritorio: al pasar el mouse o enfocar una fila, a la derecha se ve la
   captura del proyecto (escritorio + celular). Móvil: acordeón con la captura dentro. */

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ─────────── DATA ─────────── */

type Example = {
  name: string;
  url: string;
  shot: string; // captura escritorio (1200x750)
  shotMobile: string; // captura celular (390x844)
};

const services: {
  title: string;
  description: string;
  detail: string;
  example: Example;
}[] = [
  {
    title: "Páginas web profesionales",
    description:
      "Una web que muestra bien tu negocio y hace que los clientes te escriban.",
    detail:
      "Hacemos tu página desde cero, con un diseño propio que va con tu marca. Carga rápido y queda lista para aparecer en Google.",
    example: {
      name: "SOTEC",
      url: "https://www.sotecse.com/",
      shot: "/previews/sotec.webp",
      shotMobile: "/previews/sotec-m.webp",
    },
  },
  {
    title: "Tiendas virtuales y marketplaces",
    description: "Vende tus productos a cualquier hora, sin depender del local.",
    detail:
      "Catálogo que tú mismo actualizas, carrito, pagos en línea y un proceso de compra sencillo para el cliente.",
    example: {
      name: "Co-Workers Cloud",
      url: "https://cloud.kelab.com.co/",
      shot: "/previews/coworkers.webp",
      shotMobile: "/previews/coworkers-m.webp",
    },
  },
  {
    title: "Rediseño de tu web actual",
    description: "Actualiza tu página sin perder lo que ya tienes.",
    detail:
      "Si tu web se ve vieja o no te está trayendo clientes, la rehacemos con un diseño actual y cuidando lo que ya tienes posicionado en Google.",
    example: {
      name: "ALZAK Foundation",
      url: "https://www.alzakfoundation.org/",
      shot: "/previews/alzak.webp",
      shotMobile: "/previews/alzak-m.webp",
    },
  },
  {
    title: "Hosting, dominio y mantenimiento",
    description:
      "Nosotros cuidamos tu página para que no se caiga ni se quede vieja.",
    detail:
      "Migramos tu sitio, configuramos el dominio sin tocar tu correo, sacamos copias de respaldo y mantenemos todo actualizado.",
    example: {
      name: "DAGAR Soluciones",
      url: "https://www.dagarsoluciones.com.co/",
      shot: "/previews/dagar.webp",
      shotMobile: "/previews/dagar-m.webp",
    },
  },
  {
    title: "Posicionamiento en Google",
    description:
      "Aparece cuando tus clientes te buscan, antes que la competencia.",
    detail:
      "Trabajamos la estructura, la velocidad y el contenido de tu web para que suba en Google sin pagar por cada clic.",
    example: {
      name: "R&R Kelab",
      url: "https://www.kelab.com.co/",
      shot: "/previews/kelab.webp",
      shotMobile: "/previews/kelab-m.webp",
    },
  },
  {
    title: "Aplicaciones web a medida",
    description:
      "Software hecho para tu negocio, para que dejes de hacer a mano las tareas repetitivas.",
    detail:
      "Formatos digitales, reservas, inventario o facturación. Lo armamos según la forma en que ya trabaja tu equipo, y funciona en el celular.",
    example: {
      name: "ControlOne by SOTEC",
      url: "https://controlone.sotecse.com/",
      shot: "/previews/controlone.webp",
      shotMobile: "/previews/controlone-m.webp",
    },
  },
];

/* ─────────── VISTA DEL EJEMPLO ─────────── */

function ExampleShot({ ex, compact = false }: { ex: Example; compact?: boolean }) {
  return (
    <figure>
      <div className="relative">
        {/* Escritorio */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111118]">
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="ml-3 truncate text-[11px] text-white/50">
              {ex.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          </div>
          <Image
            src={ex.shot}
            alt={`Página de ${ex.name}`}
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 560px, 100vw"
            className="block h-auto w-full"
          />
        </div>
        {/* Celular */}
        {!compact && (
          <div className="absolute -bottom-8 -right-4 w-[26%] overflow-hidden rounded-[1.1rem] border-[3px] border-[#1c1c24] bg-black shadow-2xl">
            <Image
              src={ex.shotMobile}
              alt=""
              width={390}
              height={844}
              sizes="150px"
              className="block h-auto w-full"
            />
          </div>
        )}
      </div>
      <figcaption
        className={`${compact ? "mt-3" : "mt-12"} flex items-center justify-between gap-4 text-sm`}
      >
        <span className="text-zinc-400">
          Proyecto real: <span className="text-white">{ex.name}</span>
        </span>
        <a
          href={ex.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-zinc-300 underline-offset-4 hover:text-white hover:underline"
        >
          Ver sitio <ArrowUpRight size={14} />
          <span className="sr-only">(abre en una pestaña nueva)</span>
        </a>
      </figcaption>
    </figure>
  );
}

/* ─────────── MAIN ─────────── */

/** Tiempo que se muestra cada servicio antes de pasar al siguiente */
const SLIDE_MS = 6000;

export default function Services() {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const current = services[active];
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  /** Si el usuario elige un servicio, esperamos un rato antes de seguir solos */
  const holdNext = useRef(false);
  const autoplay = !reduce && inView && !hovering;

  useEffect(() => {
    if (!autoplay) return;
    const wait = holdNext.current ? 15000 : SLIDE_MS;
    holdNext.current = false;
    const id = setTimeout(() => setActive((a) => (a + 1) % services.length), wait);
    return () => clearTimeout(id);
  }, [active, autoplay]);

  const pick = (i: number, hold: boolean) => {
    if (hold) holdNext.current = true;
    setActive(i);
  };

  const goContact = () =>
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-roledescription="carrusel"
      className="relative bg-[#06060C] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-violet-300">
              Servicios
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Lo que hacemos, con ejemplos de verdad
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-zinc-400 md:justify-self-end">
            Cada servicio viene con un proyecto que ya está en línea. Ábrelo y
            mira cómo quedó.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Lista */}
          <ul
            className="border-t border-white/10"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.title} className="relative border-b border-white/10">
                  <button
                    type="button"
                    onMouseEnter={() => pick(i, false)}
                    onFocus={() => pick(i, true)}
                    onClick={() => pick(i, true)}
                    aria-pressed={isActive}
                    className="group flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span
                      className={`w-6 text-sm tabular-nums transition-colors ${
                        isActive ? "text-violet-300" : "text-zinc-500"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-lg font-medium tracking-tight transition-colors md:text-2xl ${
                        isActive
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                    >
                      {s.title}
                    </span>
                    <Plus
                      size={18}
                      className={`shrink-0 transition-transform duration-300 lg:hidden ${
                        isActive ? "rotate-45 text-white" : "text-zinc-500"
                      }`}
                    />
                  </button>

                  {/* Progreso del autoplay */}
                  {isActive && (
                    <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px overflow-hidden">
                      <motion.span
                        key={`${active}-${autoplay}`}
                        className="block h-full origin-left bg-violet-400"
                        initial={{ scaleX: autoplay ? 0 : 1 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: autoplay ? SLIDE_MS / 1000 : 0, ease: "linear" }}
                      />
                    </span>
                  )}

                  {/* Acordeón (móvil y tablet) */}
                  <div className="lg:hidden">
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-7 pl-11">
                            <p className="text-base leading-relaxed text-zinc-200">
                              {s.description}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                              {s.detail}
                            </p>
                            <div className="mt-5">
                              <ExampleShot ex={s.example} compact />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Detalle (escritorio) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, x: reduce ? 0 : 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ExampleShot ex={current.example} />
                  <p className="mt-6 text-lg leading-relaxed text-zinc-200">
                    {current.description}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {current.detail}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            ¿No sabes cuál necesitas? Cuéntanos qué quieres lograr y te decimos.
          </p>
          <button
            type="button"
            onClick={goContact}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#06060C] transition-colors hover:bg-zinc-200"
          >
            Cotizar mi proyecto
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
