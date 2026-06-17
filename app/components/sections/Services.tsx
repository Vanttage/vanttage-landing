"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Globe2,
  ShoppingCart,
  RefreshCw,
  Wrench,
  Search,
  Code2,
  ArrowRight,
  MoveRight,
} from "lucide-react";

/* ─────────── DATA ─────────── */

const services = [
  {
    icon: Globe2,
    tag: "01",
    color: "#1EA7FF",
    title: "Páginas Web Profesionales",
    description:
      "Tu negocio en internet, diseñado para generar confianza y atraer clientes.",
    detail:
      "Creamos tu página desde cero con un diseño único y adaptado a tu marca. Rápida, segura y visible en Google desde el primer día.",
  },
  {
    icon: ShoppingCart,
    tag: "02",
    color: "#22c55e",
    title: "Tiendas Virtuales",
    description:
      "Vende tus productos las 24 horas del día, todos los días del año.",
    detail:
      "Tu tienda online lista para recibir pagos, gestionar productos y ofrecer una experiencia de compra fácil y profesional a tus clientes.",
  },
  {
    icon: RefreshCw,
    tag: "03",
    color: "#f59e0b",
    title: "Rediseño de tu Web Actual",
    description: "Moderniza tu página sin perder lo que ya construiste.",
    detail:
      "Si tu web se ve anticuada o no está funcionando, la renovamos por completo. Mejor diseño, más rápida y con mejor posicionamiento en Google.",
  },
  {
    icon: Wrench,
    tag: "04",
    color: "#a855f7",
    title: "Mantenimiento Mensual",
    description: "Tu página siempre al día, rápida y protegida.",
    detail:
      "Nos encargamos de las actualizaciones, seguridad y respaldo de tu web. Tú te dedicas a tu negocio, nosotros cuidamos tu presencia digital.",
  },
  {
    icon: Search,
    tag: "05",
    color: "#ec4899",
    title: "Posicionamiento en Google",
    description:
      "Aparece cuando tus clientes te buscan, antes que la competencia.",
    detail:
      "Optimizamos tu web para que Google la recomiende. Más visitas orgánicas, más clientes y menos dependencia de publicidad pagada.",
  },
  {
    icon: Code2,
    tag: "06",
    color: "#06b6d4",
    title: "Aplicaciones a Medida",
    description:
      "Software personalizado para automatizar y hacer crecer tu negocio.",
    detail:
      "Sistemas de reservas, gestión, facturación o lo que necesites. Herramientas hechas exactamente para cómo trabajas tú.",
  },
];

/* ─────────── MOBILE CARD ─────────── */

function MobileCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const Icon = s.icon;
  return (
    <div
      className="snap-center shrink-0 w-[80vw] max-w-[320px] rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      style={{ boxShadow: `0 0 40px ${s.color}18` }}
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ color: s.color }}
        >
          {s.tag}
        </span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${s.color}20`, color: s.color }}
        >
          <Icon size={20} />
        </div>
      </div>
      <h3 className="mb-2 text-lg font-semibold leading-snug text-white">
        {s.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#94A3B8]">{s.description}</p>
      <p className="mt-3 text-xs leading-relaxed text-[#64748B]">{s.detail}</p>
    </div>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  /* scroll-driven only on desktop */
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (isMobile) return;
    const next = Math.min(
      services.length - 1,
      Math.round(v * (services.length - 1)),
    );
    setActive((prev) => (prev !== next ? next : prev));
  });

  /* ── MOBILE: simple CSS snap carousel ── */
  if (isMobile) {
    return (
      <section id="services" className="bg-[#020617] py-20 px-6">
        {/* Header */}
        <div className="mb-10">
          <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#94A3B8]">
            Nuestros servicios
          </span>
          <h2 className="text-3xl font-semibold leading-tight text-white">
            Todo lo que tu negocio
            <br />
            <span className="text-[#1EA7FF]">necesita en internet</span>
          </h2>
        </div>

        {/* Snap carousel */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {services.map((s, i) => (
            <MobileCard key={i} s={s} i={i} />
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {services.map((s, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-white/20"
              style={{ width: 24 }}
            />
          ))}
        </div>
      </section>
    );
  }

  /* ── DESKTOP: scroll-driven horizontal ── */
  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-[600vh] bg-[#020617]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Progress dots + counter */}
        <div className="absolute top-8 right-10 z-20 flex items-center gap-3">
          <div className="flex gap-2">
            {services.map((s, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === active ? 20 : 6,
                  opacity: i === active ? 1 : 0.3,
                  backgroundColor: i === active ? s.color : "#ffffff",
                }}
                transition={{ duration: 0.35 }}
                className="h-[6px] rounded-full"
              />
            ))}
          </div>
          <span className="text-xs tracking-[0.2em] text-white/30">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(services.length).padStart(2, "0")}
          </span>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ opacity: active === 0 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/30"
        >
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <MoveRight size={14} />
          </motion.span>
          Scroll para explorar
        </motion.div>

        {/* Track — will-change + transform-gpu for compositor-only paint */}
        <motion.div
          style={{ x }}
          className="flex h-full w-[600vw] transform-gpu"
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;

            return (
              <div
                key={i}
                className="relative flex h-screen w-screen items-center justify-center px-10"
              >
                {/* Static glow — no animate, driven by opacity via CSS */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(closest-side, ${s.color}, transparent)`,
                    opacity: isActive ? 0.16 : 0,
                  }}
                />

                {/* Fade + scale via CSS transition (no Framer re-render) */}
                <div
                  className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-20 items-center transition-all duration-500"
                  style={{
                    opacity: isActive ? 1 : 0.18,
                    transform: isActive ? "scale(1)" : "scale(0.93)",
                  }}
                >
                  {/* LEFT */}
                  <div>
                    <p
                      className="mb-4 text-sm tracking-[0.35em]"
                      style={{ color: s.color }}
                    >
                      {s.tag}
                    </p>
                    <h2 className="text-5xl font-semibold leading-tight text-white md:text-6xl">
                      {s.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#94A3B8]">
                      {s.description}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#64748B]">
                      {s.detail}
                    </p>
                    <button
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                      style={{
                        backgroundColor: s.color,
                        boxShadow: `0 8px 30px ${s.color}38`,
                      }}
                    >
                      Lo quiero
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {/* RIGHT — rings only rendered when active to save GPU */}
                  <div className="relative flex items-center justify-center">
                    {isActive && (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 40,
                            ease: "linear",
                          }}
                          className="absolute h-[260px] w-[260px] rounded-full border"
                          style={{ borderColor: `${s.color}30` }}
                        />
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 28,
                            ease: "linear",
                          }}
                          className="absolute h-[200px] w-[200px] rounded-full border border-dashed"
                          style={{ borderColor: `${s.color}20` }}
                        />
                      </>
                    )}
                    <div
                      className="flex h-28 w-28 items-center justify-center rounded-2xl transition-transform duration-500"
                      style={{
                        background: `${s.color}20`,
                        color: s.color,
                        transform: isActive ? "scale(1.1)" : "scale(0.9)",
                      }}
                    >
                      <Icon size={42} />
                    </div>
                  </div>
                </div>

                {/* Ghost number */}
                <span className="pointer-events-none absolute bottom-10 right-10 select-none text-[220px] font-black leading-none text-white/[0.03]">
                  {s.tag}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
