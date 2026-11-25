"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, PanelLeftClose, PanelLeftOpen, ArrowLeft, X } from "lucide-react";
import Sidebar from "./Sidebar";
import { btnGhostIcon, kickerCls, Skeleton } from "./ui";

/*
  Marco común de todas las pantallas del portal.
  - variant "page": encabezado grande (kicker + título + subtítulo + acciones a la derecha).
  - variant "app": pantalla de trabajo a altura completa (cotizador); título y acciones van
    en la barra superior y el contenido ocupa el resto. En impresión todo el marco se oculta.
  Sin `title` muestra un esqueleto (lo usa loading.tsx).
*/
export default function PortalShell({
  title,
  subtitle,
  kicker,
  actions,
  backHref,
  backLabel = "Volver",
  variant = "page",
  defaultCollapsed = false,
  children,
}: {
  title?: string;
  subtitle?: string;
  kicker?: string;
  actions?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  variant?: "page" | "app";
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const isApp = variant === "app";

  /* Drawer móvil: Escape cierra, foco al primer enlace y devuelto al botón al cerrar */
  useEffect(() => {
    if (!mobileOpen) return;
    const btn = menuBtnRef.current;
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      btn?.focus();
    };
  }, [mobileOpen]);

  const backLink = backHref ? (
    <Link
      href={backHref}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-full pr-3 text-sm text-[var(--pmuted)] transition-colors hover:text-[var(--ptext)] md:min-h-9"
    >
      <ArrowLeft size={16} aria-hidden />
      {backLabel}
    </Link>
  ) : null;

  return (
    <div className="flex min-h-screen bg-[var(--pbg)] text-[var(--ptext)] print:block print:min-h-0 print:bg-white">
      {/* Sidebar escritorio (colapsable) */}
      <div
        className={`no-print sticky top-0 hidden h-screen shrink-0 transition-[width] duration-300 motion-reduce:transition-none md:block ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Drawer móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="no-print fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            <motion.div
              key="drawer"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menú"
              initial={reduce ? { opacity: 0 } : { x: "-100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "-100%" }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 36 }}
              className="no-print fixed inset-y-0 left-0 z-50 w-[82%] max-w-[300px] md:hidden"
            >
              <Sidebar onNavigate={() => setMobileOpen(false)} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
                className={`${btnGhostIcon} absolute right-2 top-4`}
              >
                <X size={18} aria-hidden />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenido */}
      <div
        className={`flex min-w-0 flex-1 flex-col print:block ${isApp ? "h-[100dvh] print:h-auto" : ""}`}
      >
        <header className="no-print sticky top-0 z-30 flex min-h-14 shrink-0 items-center gap-2 border-b border-[var(--pborder)] bg-[var(--pbg)]/85 px-3 backdrop-blur-xl md:min-h-16 md:px-5">
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            className={`${btnGhostIcon} md:hidden`}
          >
            <Menu size={20} aria-hidden />
          </button>
          <div className="hidden md:block">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Expandir menú lateral" : "Contraer menú lateral"}
            title={collapsed ? "Expandir menú" : "Contraer menú"}
            className={btnGhostIcon}
          >
            {collapsed ? <PanelLeftOpen size={18} aria-hidden /> : <PanelLeftClose size={18} aria-hidden />}
          </button>
          </div>

          {/* Marca en móvil (en escritorio ya está en el sidebar) */}
          {!isApp && (
            <Link href="/portal/dashboard" className="flex min-h-11 items-center gap-2 md:hidden" aria-label="Vanttage, ir al dashboard">
              <Image src="/logo/logo.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
              <span className="text-sm font-semibold tracking-tight">Vanttage</span>
            </Link>
          )}

          {isApp ? (
            <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
              {backHref && (
                <Link href={backHref} aria-label={backLabel} title={backLabel} className={btnGhostIcon}>
                  <ArrowLeft size={18} aria-hidden />
                </Link>
              )}
              <div className="min-w-0">
                {title ? (
                  <h1 className="truncate text-[15px] font-semibold tracking-tight md:text-base">{title}</h1>
                ) : (
                  <Skeleton className="h-4 w-40" />
                )}
                {subtitle && <p className="hidden truncate text-xs text-[var(--pfaint)] sm:block">{subtitle}</p>}
              </div>
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center md:flex">{backLink}</div>
          )}

          {isApp && actions && <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">{actions}</div>}
          {!isApp && <div className="flex-1 md:hidden" />}
        </header>

        {isApp ? (
          <main className="flex min-h-0 flex-1 flex-col print:block">
            {children}
          </main>
        ) : (
          <main className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-6 md:px-8 md:pt-8 print:p-0">
            {backHref && <div className="-ml-0.5 mb-2 md:hidden">{backLink}</div>}
            <div className="no-print mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-8">
              <div className="min-w-0">
                {kicker && <p className={`${kickerCls} mb-2`}>{kicker}</p>}
                {title ? (
                  <h1 className="text-2xl font-semibold tracking-tight md:text-[28px] md:leading-tight">{title}</h1>
                ) : (
                  <Skeleton className="h-8 w-56" />
                )}
                {subtitle ? (
                  <p className="mt-1.5 text-sm text-[var(--pmuted)]">{subtitle}</p>
                ) : (
                  !title && <Skeleton className="mt-3 h-4 w-72 max-w-full" />
                )}
              </div>
              {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
            </div>
            {children}
          </main>
        )}
      </div>
    </div>
  );
}
