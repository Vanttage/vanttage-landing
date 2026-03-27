"use client";

import { useEffect, useEffectEvent, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Servicios", id: "services" },
  { name: "Proyectos", id: "portfolio" },
  { name: "Proceso", id: "process" },
  { name: "Contacto", id: "contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const handleIntersect = useEffectEvent(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
  );

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -35% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4 md:pt-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav
          className={`relative flex w-full max-w-6xl items-center justify-between rounded-[1.75rem] px-4 py-3 transition-all duration-500 md:px-5 ${
            scrolled
              ? "border border-white/10 bg-[#020617]/85 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
              : "border border-white/0 bg-transparent"
          }`}
        >
          {scrolled && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-0"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(30,167,255,0.05), transparent)",
              }}
            />
          )}

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="relative z-10 flex items-center gap-3 rounded-full pr-3 text-left transition-opacity hover:opacity-90"
            aria-label="Ir al inicio"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-[#1EA7FF]/20 bg-[#1EA7FF]/10">
              <span className="font-display text-lg font-bold text-[#1EA7FF]">
                V
              </span>
              <div className="absolute inset-0 rounded-2xl bg-[#1EA7FF]/20 blur-md" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display block text-sm font-bold uppercase tracking-[0.18em] text-white">
                Vanttage
              </span>
              <span className="block text-[10px] uppercase tracking-[0.24em] text-[#94A3B8]">
                Software boutique
              </span>
            </div>
          </button>

          <ul className="relative z-10 hidden items-center gap-1 rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <button
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`relative z-10 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-all duration-300 ${
                    activeSection === link.id
                      ? "text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {link.name}
                </button>

                {activeSection === link.id && (
                  <motion.div
                    layoutId="nav-active-bg"
                    className="absolute inset-0 rounded-full border border-[#1EA7FF]/30 bg-[#1EA7FF]/10"
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="hidden rounded-full border border-[#1EA7FF]/35 bg-[#1EA7FF]/10 px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-all hover:scale-[1.02] hover:border-[#1EA7FF]/55 hover:bg-[#1EA7FF]/15 md:block"
            >
              Hablemos
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:border-white/20 lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#020617]/92 px-4 pt-28 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(2,6,23,0.45)]"
            >
              <div className="mb-4">
                <p className="font-display text-xl font-bold text-white">
                  Navegación
                </p>
                <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                  Accede rápido a las secciones clave de la landing.
                </p>
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="flex w-full items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left transition-colors hover:border-[#1EA7FF]/30 hover:bg-[#1EA7FF]/8"
                  >
                    <span className="font-display text-base font-semibold text-white">
                      {link.name}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-[#94A3B8]">
                      Ir
                    </span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="mt-4 flex w-full items-center justify-center rounded-2xl bg-[#1EA7FF] px-4 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#020617]"
              >
                Solicitar diagnóstico
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
