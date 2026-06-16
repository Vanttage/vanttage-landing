"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* href que empieza con "/" es ruta de página; "#" es anchor en home */
const links = [
  { label: "Inicio",     href: "#hero" },
  { label: "Servicios",  href: "/servicios" },
  { label: "Proyectos",  href: "/proyectos" },
  { label: "Blog",       href: "/blog" },
  { label: "Nosotros",   href: "/nosotros" },
];

const SECTIONS = ["hero", "services", "portfolio", "solutions", "about", "contact"];

const EASE = [0.22, 1, 0.36, 1] as const;

function scrollToAnchor(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("hero");
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  /* ── Scroll state ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver (solo en home) ── */
  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  /* ── Lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* El navbar en páginas internas siempre tiene fondo blanco */
  const forceLight = !isHome;
  const isLight = scrolled || forceLight;
  const textColor    = isLight ? "text-[#0A2540]" : "text-white";
  const subTextColor = isLight ? "text-[#64748B]" : "text-white/70";

  function handleLinkClick(e: React.MouseEvent, href: string) {
    if (href.startsWith("#")) {
      e.preventDefault();
      if (isHome) {
        scrollToAnchor(href);
      } else {
        window.location.href = `/${href}`;
      }
    }
  }

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isLight
            ? "bg-white/80 py-4 shadow-[0_8px_30px_rgba(2,6,23,0.06)] backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 md:px-8">

          {/* ── Brand ── */}
          <Link
            href="/"
            className={`flex items-center gap-3 ${textColor}`}
          >
            <div className="relative h-11 w-11 shrink-0">
              <Image
                src="/logo/logo.png"
                alt="Vanttage logo"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[17px] font-semibold tracking-wide">
              Vanttage.
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className={`hidden items-center gap-7 text-[14px] md:flex ${subTextColor}`}>
            {links.map((l) => {
              const isPageLink = l.href.startsWith("/");
              const isActive = isPageLink
                ? pathname.startsWith(l.href)
                : active === l.href.replace("#", "");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  className={`relative py-1 transition-colors duration-200 ${
                    isLight
                      ? isActive ? "text-[#0A2540]" : "text-[#64748B] hover:text-[#0A2540]"
                      : isActive ? "text-white"    : "text-white/60 hover:text-white"
                  }`}
                >
                  {l.label}

                  {/* Underline animado */}
                  <motion.span
                    className="absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full bg-violet-500"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    style={{ originX: 0 }}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/contacto"
              className={`text-[14px] transition-colors duration-200 ${
                isLight
                  ? "text-[#475569] hover:text-[#0A2540]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Contacto
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-md transition hover:scale-[1.04] hover:shadow-violet-500/30"
            >
              Empezar
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200 md:hidden ${
              isLight
                ? "border-gray-200 text-[#0A2540] hover:bg-gray-50"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
            aria-label="Menú"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col bg-white shadow-2xl"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <span className="text-[16px] font-semibold text-[#0A2540]">Vanttage.</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 px-4 py-6">
                {links.map((l, i) => {
                  const isPageLink = l.href.startsWith("/");
                  const isActive = isPageLink
                    ? pathname.startsWith(l.href)
                    : active === l.href.replace("#", "");
                  return (
                    <motion.div key={l.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}>
                      <Link
                        href={l.href}
                        onClick={(e) => {
                          if (!isPageLink) {
                            e.preventDefault();
                            if (isHome) scrollToAnchor(l.href);
                            else window.location.href = `/${l.href}`;
                          }
                          setMenuOpen(false);
                        }}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors duration-150 ${
                          isActive
                            ? "bg-violet-50 text-violet-600"
                            : "text-[#475569] hover:bg-gray-50 hover:text-[#0A2540]"
                        }`}
                      >
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                        )}
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto border-t border-gray-100 px-6 py-6">
                <Link
                  href="/contacto"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 py-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-500/25"
                >
                  Empezar proyecto
                </Link>
                <p className="mt-4 text-center text-xs text-gray-400">
                  Respuesta en menos de 24h
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
