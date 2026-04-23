"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Globe2,
  RefreshCw,
  Wrench,
  Rocket,
  Search,
  Database,
  ArrowRight,
  MoveRight,
} from "lucide-react";

/* ================= DATA ================= */

const services = [
  {
    icon: Globe2,
    tag: "01",
    color: "#1EA7FF",
    title: "Desarrollo Web a medida",
    description:
      "Sitios construidos con precisión. Performance extremo y diseño que convierte.",
    detail:
      "Cada proyecto arranca desde cero — sin templates. Arquitectura moderna, carga ultrarrápida y experiencia diseñada para que cada visita cuente.",
  },
  {
    icon: RefreshCw,
    tag: "02",
    color: "#22c55e",
    title: "Migración de stack legacy",
    description: "Modernizamos tu web sin perder SEO ni autoridad de dominio.",
    detail:
      "Auditamos tu stack actual, trazamos la ruta de migración y ejecutamos el cambio sin downtime. Tu posicionamiento intacto, tu tecnología al día.",
  },
  {
    icon: Wrench,
    tag: "03",
    color: "#f59e0b",
    title: "Mantenimiento mensual",
    description: "Seguridad, updates y estabilidad continua para tu producto.",
    detail:
      "Monitoreo proactivo, parches de seguridad, backups automáticos y soporte prioritario. Tu plataforma siempre operativa, sin sorpresas.",
  },
  {
    icon: Rocket,
    tag: "04",
    color: "#a855f7",
    title: "Alto rendimiento",
    description: "Optimización profunda para proyectos de misión crítica.",
    detail:
      "Core Web Vitals en verde, tiempo de carga bajo 1s y arquitectura preparada para picos de tráfico. Velocidad que se traduce en conversión.",
  },
  {
    icon: Search,
    tag: "05",
    color: "#ec4899",
    title: "SEO técnico",
    description: "Estructura optimizada para dominar los motores de búsqueda.",
    detail:
      "Auditoría técnica completa, schema markup, sitemap, canonical tags y rendimiento de rastreo. Más visibilidad orgánica, menos dependencia de pauta.",
  },
  {
    icon: Database,
    tag: "06",
    color: "#06b6d4",
    title: "Sistemas internos",
    description: "Herramientas internas que escalan tus operaciones.",
    detail:
      "CRMs, dashboards, automatizaciones y portales personalizados. Menos procesos manuales, más tiempo para lo que realmente importa.",
  },
];

/* ================= SCOPED CURSOR ================= */

function ScopedCursor({ active }: { active: boolean }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{ x, y }}
      animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.5 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-5 w-5 rounded-full bg-white/80 mix-blend-difference"
    />
  );
}

/* ================= COMPONENT ================= */

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [hovering, setHovering] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  const x = useTransform(smooth, [0, 1], ["0%", "-83.3%"]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = smooth.on("change", (v) => {
      setActive(Math.round(v * (services.length - 1)));
    });
    return () => unsub();
  }, [smooth]);

  return (
    <>
      <ScopedCursor active={hovering} />

      <section
        id="services"
        ref={ref}
        className="relative h-[600vh] bg-[#020617]"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Progress indicator */}
          <div className="absolute top-8 right-10 z-20 flex items-center gap-3">
            {/* Dots */}
            <div className="flex gap-2">
              {services.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    width: i === active ? 20 : 6,
                    opacity: i === active ? 1 : 0.3,
                    backgroundColor: i === active ? services[i].color : "#fff",
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-[6px] rounded-full"
                />
              ))}
            </div>
            {/* Counter */}
            <span className="text-xs tracking-[0.2em] text-white/30">
              {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </span>
          </div>

          {/* Scroll hint — solo en primer slide */}
          <motion.div
            animate={{ opacity: active === 0 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-white/30 text-xs tracking-[0.2em] uppercase pointer-events-none"
          >
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              <MoveRight size={14} />
            </motion.span>
            Scroll para explorar
          </motion.div>

          {/* Slides */}
          <motion.div style={{ x }} className="flex h-full w-[600vw]">
            {services.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;

              return (
                <motion.div
                  key={i}
                  className="relative flex h-screen w-screen items-center justify-center px-10"
                  animate={{
                    opacity: isActive ? 1 : 0.25,
                    scale: isActive ? 1 : 0.92,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Glow dinámico */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
                    animate={{
                      background: `${s.color}28`,
                      scale: isActive ? 1.2 : 0.8,
                    }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Content */}
                  <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT */}
                    <div>
                      <p className="text-sm tracking-[0.35em] mb-4" style={{ color: s.color }}>
                        {s.tag}
                      </p>

                      <h2 className="text-5xl md:text-6xl font-semibold text-white leading-tight">
                        {s.title}
                      </h2>

                      <p className="mt-5 text-lg text-[#94A3B8] leading-relaxed max-w-xl">
                        {s.description}
                      </p>

                      <p className="mt-3 text-sm text-[#64748B] leading-relaxed max-w-xl">
                        {s.detail}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white"
                        style={{
                          backgroundColor: s.color,
                          boxShadow: `0 10px 40px ${s.color}40`,
                        }}
                      >
                        Explorar
                        <ArrowRight size={16} />
                      </motion.button>
                    </div>

                    {/* RIGHT */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                        className="absolute h-[260px] w-[260px] rounded-full border"
                        style={{ borderColor: `${s.color}30` }}
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
                        className="absolute h-[200px] w-[200px] rounded-full border border-dashed"
                        style={{ borderColor: `${s.color}20` }}
                      />
                      <motion.div
                        animate={{ scale: isActive ? 1.15 : 0.9 }}
                        className="flex h-28 w-28 items-center justify-center rounded-2xl backdrop-blur"
                        style={{ background: `${s.color}20`, color: s.color }}
                      >
                        <Icon size={42} />
                      </motion.div>
                    </div>
                  </div>

                  {/* Ghost number */}
                  <span className="absolute bottom-10 right-10 text-[220px] font-black text-white/[0.03] select-none leading-none">
                    {s.tag}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
