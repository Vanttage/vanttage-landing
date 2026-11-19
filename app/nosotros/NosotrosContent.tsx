"use client";

import BgVideo from "@/app/components/BgVideo";
import CountUp from "@/app/components/CountUp";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { value: "+12", label: "Proyectos entregados" },
  { value: "100%", label: "Clientes satisfechos" },
  { value: "< 24h", label: "Tiempo de respuesta" },
  { value: "3+", label: "Años de experiencia" },
];

const steps = [
  {
    title: "Entendemos tu negocio",
    text: "Una llamada o una conversación por WhatsApp para saber qué vendes, a quién y qué necesitas que haga la página.",
  },
  {
    title: "Diseñamos la imagen",
    text: "Te mostramos cómo se va a ver antes de programar. Ajustamos hasta que te guste.",
  },
  {
    title: "Programamos",
    text: "Construimos la página, la tienda o la aplicación. Te vamos contando en qué vamos.",
  },
  {
    title: "Publicamos y seguimos pendientes",
    text: "La ponemos en línea y nos quedamos para los cambios, las dudas y el soporte.",
  },
];

const principles = [
  {
    title: "Trato directo",
    text: "Cada proyecto lo hacemos nosotros, sin subcontratar. Hablas con las personas que programan tu web.",
  },
  {
    title: "Diseño propio",
    text: "Diseñamos cada página desde cero, pensando en tu marca y en el cliente que quieres atraer. No usamos plantillas compradas.",
  },
  {
    title: "Pensada para que te contacten",
    text: "Cada parte de la página lleva al visitante a algo concreto: llamarte, escribirte o comprarte.",
  },
  {
    title: "Proceso claro",
    text: "En cada paso te contamos en palabras sencillas qué estamos haciendo y qué sigue.",
  },
  {
    title: "Soporte después de publicar",
    text: "Cuando la página sale al aire seguimos disponibles para actualizaciones y cambios.",
  },
];

const cities = [
  "Cartagena",
  "Barranquilla",
  "Bogotá",
  "Nilo",
  "Castilla La Nueva",
  "Estados Unidos",
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

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs uppercase tracking-[0.2em] text-violet-300">{children}</p>
  );
}

function PrimaryCta() {
  return (
    <Link
      href="/contacto"
      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#06060C] transition-colors hover:bg-zinc-200"
    >
      Cotizar mi proyecto
      <ArrowRight size={16} aria-hidden />
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center text-sm text-zinc-300 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
    >
      {children}
    </Link>
  );
}

/* ─────────── HERO ─────────── */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // La foto sube un poco más lento que el texto; el texto gigante, más lento aún
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const wordY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);

  const intro = (i: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.08 * i, ease: EASE },
        };

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden px-6 pt-28 md:pt-32 lg:min-h-[100svh]"
    >
      {/* Texto gigante detrás de la foto */}
      <motion.p
        aria-hidden
        style={{ y: wordY }}
        className="pointer-events-none absolute inset-x-0 top-[30%] -z-10 hidden select-none whitespace-nowrap text-center text-[17vw] font-semibold leading-none tracking-tighter text-white/[0.035] lg:block"
      >
        VANTTAGE
      </motion.p>

      <div className="mx-auto grid max-w-6xl items-end gap-8 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        {/* Texto */}
        <div className="relative z-10 pb-4 lg:pb-28">
          <motion.p {...intro(0)} className="mb-6 text-xs uppercase tracking-[0.2em] text-violet-300">
            Nosotros
          </motion.p>
          <motion.h1
            {...intro(1)}
            className="text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Hablas con quien programa tu proyecto.
          </motion.h1>
          <motion.p {...intro(2)} className="mt-8 max-w-md text-lg leading-relaxed text-zinc-400">
            Somos Moisés y Carlos. Fundamos Vanttage en Cartagena y hacemos páginas web,
            tiendas virtuales y aplicaciones a medida para negocios de Colombia y de otros
            países.
          </motion.p>
          <motion.div {...intro(3)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PrimaryCta />
            <SecondaryLink href="/proyectos">Ver proyectos</SecondaryLink>
          </motion.div>
        </div>

        {/* Foto recortada, integrada al fondo */}
        <motion.div
          style={{ y: photoY }}
          className="relative mx-auto -mt-4 w-full max-w-[400px] sm:max-w-[460px] lg:mt-0 lg:max-w-[540px] lg:self-end"
        >
          {/* En móvil el texto gigante va detrás de la foto, no del titular */}
          <motion.p
            aria-hidden
            style={{ y: wordY }}
            className="pointer-events-none absolute left-1/2 top-[16%] -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-semibold leading-none tracking-tighter text-white/[0.05] lg:hidden"
          >
            VANTTAGE
          </motion.p>
          {/* Resplandor detrás de los dos */}
          <div
            aria-hidden
            className="absolute inset-x-[-15%] top-[8%] bottom-[10%] -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(139,92,246,0.28), rgba(139,92,246,0.08) 55%, transparent)",
            }}
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.2 : 1, delay: reduce ? 0 : 0.15, ease: EASE }}
            className="[mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
          >
            <Image
              src="/founders/founders-cut.webp"
              alt="Moisés y Carlos, fundadores de Vanttage, de espaldas y con los brazos cruzados"
              width={880}
              height={1206}
              priority
              sizes="(min-width: 1024px) 540px, (min-width: 640px) 460px, 400px"
              className="h-auto w-full [filter:drop-shadow(0_0_1px_rgba(196,181,253,0.35))]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Fundido inferior hacia la siguiente sección */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06060C] to-transparent"
      />
    </section>
  );
}

/* ─────────── PÁGINA ─────────── */

export default function NosotrosContent() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#06060C] text-white">
      <Hero />

      {/* ── Cifras ── */}
      <section aria-label="Vanttage en cifras" className="px-6">
        <Reveal className="mx-auto max-w-6xl">
          <dl className="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse gap-2 py-8 md:py-10 ${
                  i % 2 === 1 ? "border-l border-white/10 pl-6" : ""
                } ${i >= 2 ? "border-t border-white/10 md:border-t-0" : ""} ${
                  i === 2 ? "md:border-l md:pl-6" : ""
                } ${i === 0 ? "" : "md:pl-8"}`}
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-zinc-400">{s.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight tabular-nums text-white md:text-5xl">
                  <CountUp value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ── Historia ── */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal>
            <Kicker>Nuestra historia</Kicker>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Un equipo pequeño, a propósito
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-zinc-300 md:pt-10">
            <p>
              Vanttage arrancó porque veíamos negocios buenos con páginas hechas a la
              carrera, o sin página. Queríamos hacerles webs desde cero, pensadas para cada
              uno, que mostraran bien lo que hacen.
            </p>
            <p className="text-zinc-400">
              Somos dos y así lo queremos. Nosotros tomamos el requerimiento, diseñamos,
              programamos y publicamos. No hay vendedores en el medio ni proyectos que pasan
              a otro equipo, así que la persona que te responde el primer mensaje es la misma
              que te acompaña después de publicar.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Cómo trabajamos ── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 md:mb-16">
            <Kicker>Cómo trabajamos</Kicker>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Cuatro pasos, y siempre sabes en cuál vamos
            </h2>
          </Reveal>
          <ol className="border-t border-white/10">
            {steps.map((s, i) => (
              <li key={s.title} className="border-b border-white/10">
                <Reveal
                  delay={i * 0.05}
                  className="grid gap-3 py-8 md:grid-cols-[6rem_1fr_1.3fr] md:items-baseline md:gap-8 md:py-10"
                >
                  <span className="text-sm tabular-nums text-zinc-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {s.title}
                  </h3>
                  <p className="max-w-md leading-relaxed text-zinc-400">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Principios ── */}
      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <Kicker>Lo que no negociamos</Kicker>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Por qué trabajar con nosotros
            </h2>
          </Reveal>
          <dl className="border-t border-white/10">
            {principles.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.04}
                className="grid gap-2 border-b border-white/10 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8"
              >
                <dt className="font-medium text-white">{p.title}</dt>
                <dd className="leading-relaxed text-zinc-400">{p.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Desde Cartagena ── */}
      <section className="relative isolate overflow-hidden border-y border-white/10">
        <div aria-hidden className="absolute inset-0 -z-10">
          <BgVideo src="/media/video/cartagena" className="opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06060C] via-[#06060C]/80 to-[#06060C]/40" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <Reveal>
            <Kicker>Desde Cartagena</Kicker>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              Trabajamos desde Cartagena para clientes de cualquier país
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-300">
              Las reuniones son por videollamada y el día a día por WhatsApp. La distancia
              no cambia cómo trabajamos.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-400">
              Hemos trabajado con clientes en
            </p>
            <ul className="flex flex-wrap gap-x-3 gap-y-2 text-xl font-medium tracking-tight text-white md:text-2xl">
              {cities.map((c, i) => (
                <li key={c} className="flex items-center gap-3">
                  {c}
                  {i < cities.length - 1 && (
                    <span aria-hidden className="text-zinc-600">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="px-6 py-24 md:py-36">
        <Reveal className="mx-auto max-w-6xl">
          <Kicker>Siguiente paso</Kicker>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
            Cuéntanos qué necesitas.
          </h2>
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
            <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
              Te respondemos en menos de 24 horas con una propuesta clara: qué haríamos,
              cuánto cuesta y en cuánto tiempo.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:justify-self-end">
              <PrimaryCta />
              <SecondaryLink href="/proyectos">Ver proyectos</SecondaryLink>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
