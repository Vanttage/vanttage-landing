"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useRef } from "react";
import { notifyTeam } from "@/app/lib/notify";

const EASE = [0.22, 1, 0.36, 1] as const;

const trust = ["Sin compromiso", "Respuesta < 24h", "Propuesta clara"];

const stats = [
  { value: "+12", label: "Proyectos entregados" },
  { value: "100%", label: "Clientes satisfechos" },
  { value: "< 24h", label: "Tiempo de respuesta" },
];

export default function CTAFinal() {
  const sectionRef = useRef<HTMLElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  /* Glow que sigue el cursor */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  /* Magnet button — ref-based para no romper con hijos */
  const magnetX = useSpring(0, { stiffness: 160, damping: 12 });
  const magnetY = useSpring(0, { stiffness: 160, damping: 12 });

  const handleMagnet = (e: React.MouseEvent) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (!rect) return;
    magnetX.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    magnetY.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const resetMagnet = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="cta"
      ref={sectionRef}
      onMouseMove={handleMove}
      className="relative overflow-hidden bg-[#F8FAFC] py-32 px-6"
    >
      {/* Dot grid sutil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Fade sobre el grid en los bordes */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#F8FAFC_40%,transparent_100%)]" />

      {/* Glow que sigue el cursor */}
      <motion.div
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-violet-500/20 blur-[120px]"
        style={{ left: smoothX, top: smoothY, translateX: "-50%", translateY: "-50%" }}
      />

      {/* Glows fijos de esquina */}
      <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-indigo-400/15 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-blue-400/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1100px] text-center">

        {/* Badge con pulse dot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-4 py-2 text-xs tracking-[0.25em] text-violet-600 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          Aceptando proyectos · 2026
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#0A2540] md:text-6xl"
        >
          ¿Listo para que tu negocio
          <br />
          <motion.span
            className="bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: "linear-gradient(90deg, #7c3aed, #6366f1, #3b82f6, #7c3aed)",
              backgroundSize: "200% 200%",
            }}
          >
            brille en internet?
          </motion.span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-500"
        >
          Cuéntanos qué necesitas y te decimos exactamente cómo podemos
          ayudarte. Sin compromisos, sin tecnicismos.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-0 divide-x divide-slate-200"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex-1 px-6 text-center">
              <div className="text-2xl font-semibold text-[#0A2540]">{s.value}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {/* Botón magnético */}
          <motion.button
            ref={btnRef}
            onMouseMove={handleMagnet}
            onMouseLeave={resetMagnet}
            onClick={() => scrollTo("contact")}
            style={{ x: magnetX, y: magnetY }}
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-4 text-sm font-medium text-white shadow-xl shadow-violet-500/30"
          >
            <span className="relative z-10">Quiero mi página web</span>
            <ArrowRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>

          {/* Secundario */}
          <a
            href="mailto:vanttagectg@gmail.com"
            onClick={() => notifyTeam({ source: "Correo (CTA final)", once: "mail-cta" })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm text-slate-600 shadow-sm transition-colors duration-200 hover:bg-slate-50"
          >
            <Mail size={14} />
            Enviar correo
          </a>
        </motion.div>

        {/* Trust con separadores */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400"
        >
          {trust.map((item, i) => (
            <span key={item} className="flex items-center gap-2">
              {item}
              {i < trust.length - 1 && (
                <span className="text-slate-300">·</span>
              )}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
