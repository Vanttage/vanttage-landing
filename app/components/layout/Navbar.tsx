"use client";

import { useEffect, useRef, useState } from "react";
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
  const isPortal = pathname?.startsWith("/portal");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  /* ── Scroll: compacta la barra y la esconde al bajar (como Safari en iOS) ── */
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y <= 240) setHidden(false);
      lastY.current = y;
    };
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

  /* ── Menú móvil: Esc cierra, foco al botón cerrar y de vuelta a la hamburguesa ── */
  useEffect(() => {
    if (menuOpen) {
      wasOpen.current = true;
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  /* Navbar siempre oscura: legible sobre secciones claras y oscuras */
  const textColor    = "text-white";
  const subTextColor = "text-white/70";

  /* Anchors (#...) solo funcionan en el home; en otras páginas apuntan a "/#..." */
  const resolveHref = (href: string) =>
    href.startsWith("#") && !isHome ? `/${href}` : href;
  const ctaHref = isHome ? "#contact" : "/contacto";

  function handleLinkClick(e: React.MouseEvent, href: string) {
    if (href.startsWith("#") && isHome) {
      e.preventDefault();
      scrollToAnchor(href);
    }
  }

  if (isPortal) return null;

  return (
    <>
      <motion.nav
        aria-label="Principal"
        initial={false}
        animate={{ y: hidden && !menuOpen ? -96 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-4"
      >
        <div
          className={`mx-auto flex items-center justify-between rounded-full border border-white/10 bg-[#14141c]/75 pl-2 pr-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150 transition-[max-width,padding] duration-500 ${
            scrolled ? "max-w-[920px] py-1.5" : "max-w-[1080px] py-2"
          }`}
        >
          {/* ── Brand ── */}
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 ${textColor}`}
          >
            <span className="relative h-8 w-8 shrink-0">
              <Image
                src="/logo/logo.png"
                alt=""
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Vanttage</span>
          </Link>

          {/* ── Desktop links (control segmentado) ── */}
          <div className={`hidden items-center rounded-full bg-white/[0.04] p-1 text-[13.5px] md:flex ${subTextColor}`}>
            {links.map((l) => {
              const isPageLink = l.href.startsWith("/");
              const isActive = isPageLink
                ? pathname.startsWith(l.href)
                : isHome && active === l.href.replace("#", "");
              return (
                <Link
                  key={l.href}
                  href={resolveHref(l.href)}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  aria-current={isActive ? (isPageLink ? "page" : "location") : undefined}
                  className={`relative rounded-full px-4 py-2 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <Link
            href={ctaHref}
            onClick={(e) => handleLinkClick(e, ctaHref)}
            className="hidden items-center rounded-full bg-white px-5 py-2.5 text-[13.5px] font-medium text-[#06060C] transition-colors hover:bg-zinc-200 md:inline-flex"
          >
            Cotizar proyecto
          </Link>

          {/* ── Mobile hamburger ── */}
          <button
            ref={hamburgerRef}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white transition-colors duration-200 hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

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
              className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-md"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menú de navegación"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed inset-x-3 top-3 z-[60] flex origin-top flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#14141c]/85 shadow-2xl backdrop-blur-2xl backdrop-saturate-150"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between py-2 pl-5 pr-2">
                <span className="text-[15px] font-semibold text-white">Vanttage</span>
                <button
                  ref={closeRef}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] text-white hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col gap-1 px-3 pb-3 pt-2">
                {links.map((l, i) => {
                  const isPageLink = l.href.startsWith("/");
                  const isActive = isPageLink
                    ? pathname.startsWith(l.href)
                    : isHome && active === l.href.replace("#", "");
                  return (
                    <motion.div key={l.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}>
                      <Link
                        href={resolveHref(l.href)}
                        onClick={(e) => {
                          handleLinkClick(e, l.href);
                          setMenuOpen(false);
                        }}
                        aria-current={isActive ? (isPageLink ? "page" : "location") : undefined}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[17px] font-medium transition-colors duration-150 ${
                          isActive
                            ? "bg-white/[0.1] text-white"
                            : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        )}
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-white/10 px-4 py-4">
                <Link
                  href={ctaHref}
                  onClick={(e) => {
                    handleLinkClick(e, ctaHref);
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center rounded-full bg-white py-3.5 text-[15px] font-medium text-[#06060C]"
                >
                  Cotizar mi proyecto
                </Link>
                <p className="mt-3 text-center text-xs text-white/55">
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
