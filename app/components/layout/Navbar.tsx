"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const pageLinks = [{ name: "Servicios", href: "/servicios", isPage: true }];

const sectionLinks = [
  { name: "Proyectos", id: "portfolio" },
  { name: "Proceso", id: "process" },
  { name: "Nosotros", id: "about" },
];

const allMobileLinks = [
  { name: "Servicios", href: "/servicios", isPage: true },
  { name: "Proyectos", id: "portfolio", isPage: false },
  { name: "Proceso", id: "process", isPage: false },
  { name: "Nosotros", id: "about", isPage: false },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 50));

  useEffect(() => {
    if (!isHome) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sectionLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  const scrollTo = (id: string) => {
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4 md:pt-5"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          className={`relative flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-5 ${
            scrolled
              ? "border border-white/10 bg-[#061729]/90 shadow-[0_16px_48px_rgba(2,6,23,0.6)] backdrop-blur-2xl"
              : "border border-transparent bg-transparent"
          }`}
        >
          {scrolled && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(30,167,255,0.04), transparent)",
              }}
            />
          )}

          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center gap-3 transition-opacity hover:opacity-85"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#1EA7FF]/20 bg-[#1EA7FF]/10">
              <span className="font-display text-lg font-bold text-[#1EA7FF]">
                V
              </span>
              <div className="absolute inset-0 rounded-xl bg-[#1EA7FF]/15 blur-md" />
            </div>
            <div className="hidden sm:block">
              <span className="font-display block text-[15px] font-bold uppercase tracking-[0.16em] text-white">
                <p
                  className="font-display text-transparent"
                  style={{
                    background: "linear-gradient(90deg, #1EA7FF, #D4AF37)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Vanttage.
                </p>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.26em] text-[#94A3B8]">
                Ingeniería web
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="relative z-10 hidden items-center gap-0.5 lg:flex">
            {/* Servicios → página */}
            <li className="relative">
              <Link
                href="/servicios"
                className={`relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                  pathname === "/servicios"
                    ? "text-white"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Servicios
                {pathname === "/servicios" && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                  />
                )}
              </Link>
            </li>

            {/* Sections scroll */}
            {sectionLinks.map(({ name, id }) => (
              <li key={id} className="relative">
                <button
                  type="button"
                  onClick={() => scrollTo(id)}
                  className={`relative rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                    active === id
                      ? "text-white"
                      : "text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {name}
                  {active === id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-[#1EA7FF]/25 bg-[#1EA7FF]/10"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.55,
                      }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="relative z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn-electric hidden items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white md:inline-flex"
            >
              <span className="relative z-10">Hablemos</span>
              <ArrowUpRight size={13} className="relative z-10" />
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="btn-ghost inline-flex h-10 w-10 items-center justify-center rounded-xl lg:hidden"
              aria-expanded={open}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#020617]/95 px-4 pt-24 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mx-auto max-w-md rounded-3xl border border-white/8 bg-[#0A2540]/80 p-5 shadow-[0_32px_80px_rgba(2,6,23,0.6)]"
            >
              <p className="font-display mb-4 text-xl font-bold text-white">
                Navegación
              </p>
              <div className="space-y-2">
                {allMobileLinks.map((link) =>
                  link.isPage ? (
                    <Link
                      key={link.href}
                      href={link.href!}
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-between rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/6 px-4 py-4"
                    >
                      <span className="font-display text-base font-semibold text-white">
                        {link.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                        Página
                      </span>
                    </Link>
                  ) : (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => {
                        scrollTo(link.id!);
                        setOpen(false);
                      }}
                      className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4 transition-colors hover:border-[#1EA7FF]/30"
                    >
                      <span className="font-display text-base font-semibold text-white">
                        {link.name}
                      </span>
                      <ArrowUpRight size={14} className="text-[#94A3B8]" />
                    </button>
                  ),
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  scrollTo("contact");
                  setOpen(false);
                }}
                className="btn-electric mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-[0.14em] text-white"
              >
                <span className="relative z-10">Agendar diagnóstico</span>
                <ArrowUpRight size={15} className="relative z-10" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
