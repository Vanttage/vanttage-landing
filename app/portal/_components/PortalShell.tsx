"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Sidebar from "./Sidebar";

export default function PortalShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--pbg)] text-[var(--ptext)]">
      {/* Sidebar escritorio (colapsable) */}
      <div className={`hidden shrink-0 transition-all duration-300 md:block ${collapsed ? "w-16" : "w-60"}`}>
        <div className="sticky top-0">
          <Sidebar collapsed={collapsed} />
        </div>
      </div>

      {/* Drawer móvil (superpuesto) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-[var(--pborder)] bg-[var(--pbg)]/80 px-4 py-3.5 backdrop-blur md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
              className="rounded-lg p-1.5 text-[var(--pmuted)] hover:bg-[var(--pcardhover)] md:hidden"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setCollapsed((v) => !v)}
              aria-label="Contraer menú"
              className="hidden rounded-lg p-1.5 text-[var(--pmuted)] hover:bg-[var(--pcardhover)] md:block"
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold">{title}</h1>
              {subtitle && <p className="truncate text-sm text-[var(--pfaint)]">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
        <main className="px-4 py-6 md:px-6">{children}</main>
      </div>
    </div>
  );
}
