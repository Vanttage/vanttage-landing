"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  FileText,
  Plus,
  ArrowUpRight,
  // Receipt, // (cuenta de cobro: oculta, no desplegada)
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/portal/clientes", label: "Contactos", icon: Users },
  { href: "/portal/cotizaciones", label: "Cotizaciones", icon: FileText },
  // Cuenta de cobro: oculta del menú (la página devuelve 404 en producción, ver
  // app/portal/cuenta-cobro/page.tsx). En local sigue disponible en /portal/cuenta-cobro.
  // Para mostrarla: descomentar el import Receipt + esta línea:
  // { href: "/portal/cuenta-cobro", label: "Cuenta de cobro", icon: Receipt },
];

export default function Sidebar({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "";
  const enCotizador = pathname.startsWith("/portal/cotizador");

  return (
    <aside
      aria-label="Menú del portal"
      className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden border-r border-[var(--pborder)] bg-[var(--psidebar)] px-3 pb-4 pt-5"
    >
      {/* Marca */}
      <Link
        href="/portal/dashboard"
        onClick={onNavigate}
        className={`mb-6 flex min-h-11 items-center gap-3 rounded-xl px-2 ${collapsed ? "justify-center" : ""}`}
        aria-label="Vanttage, ir al dashboard"
      >
        <Image src="/logo/logo.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" />
        {!collapsed && (
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold leading-tight tracking-tight">Vanttage</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-[var(--pfaint)]">Portal interno</span>
          </span>
        )}
      </Link>

      {/* Acción principal */}
      <Link
        href="/portal/cotizador"
        onClick={onNavigate}
        title="Nueva cotización"
        aria-current={enCotizador ? "page" : undefined}
        className={`mb-5 flex min-h-11 items-center gap-2.5 rounded-full bg-[var(--pbtn-bg)] text-sm font-medium text-[var(--pbtn-fg)] transition-colors hover:bg-[var(--pbtn-hover)] ${
          collapsed ? "mx-auto w-11 justify-center" : "px-4"
        }`}
      >
        <Plus size={17} className="shrink-0" aria-hidden />
        {collapsed ? <span className="sr-only">Nueva cotización</span> : <span className="truncate">Nueva cotización</span>}
      </Link>

      {!collapsed && <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--pfaint)]">Gestión</p>}
      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/portal/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              aria-current={active ? "page" : undefined}
              className={`group flex min-h-11 items-center gap-3 rounded-full text-sm transition-colors ${
                collapsed ? "mx-auto w-11 justify-center" : "px-3.5"
              } ${
                active
                  ? "bg-[var(--paccent-soft)] font-medium text-[var(--ptext)]"
                  : "text-[var(--pmuted)] hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)]"
              }`}
            >
              <Icon
                size={18}
                aria-hidden
                className={`shrink-0 ${active ? "text-[var(--paccent)]" : "text-[var(--pfaint)] group-hover:text-[var(--ptext)]"}`}
              />
              {collapsed ? <span className="sr-only">{label}</span> : <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Usuario y preferencias */}
      <div className="mt-4 space-y-1 border-t border-[var(--pborder)] pt-4">
        {!collapsed && (
          <div className="mb-2 flex items-center gap-3 rounded-2xl px-2 py-1.5">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--paccent-soft)] text-xs font-semibold text-[var(--paccent)]"
            >
              VT
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">Equipo Vanttage</span>
              <span className="block truncate text-xs text-[var(--pfaint)]">Administración</span>
            </span>
          </div>
        )}
        <ThemeToggle compact={collapsed} className={collapsed ? "mx-auto flex" : ""} />
        <Link
          href="/"
          onClick={onNavigate}
          title={collapsed ? "Ver el sitio" : undefined}
          className={`flex min-h-11 items-center gap-2.5 rounded-full text-sm text-[var(--pmuted)] transition-colors hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)] md:min-h-10 ${
            collapsed ? "mx-auto w-11 justify-center md:w-10" : "px-3"
          }`}
        >
          <ArrowUpRight size={16} className="shrink-0" aria-hidden />
          {collapsed ? <span className="sr-only">Ver el sitio</span> : <span>Ver el sitio</span>}
        </Link>
      </div>
    </aside>
  );
}
