"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  FileText,
  FilePlus2,
  ExternalLink,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/portal/clientes", label: "Contactos", icon: Users },
  { href: "/portal/cotizaciones", label: "Cotizaciones", icon: FileText },
  { href: "/portal/cotizador", label: "Nueva cotización", icon: FilePlus2 },
];

export default function Sidebar({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-full flex-col overflow-hidden border-r border-[var(--pborder)] bg-[var(--psidebar)] px-3 py-5">
      <Link href="/portal/dashboard" onClick={onNavigate} className="mb-6 flex items-center gap-2.5 px-2">
        <Image src="/logo/logo.png" alt="Vanttage" width={32} height={32} className="h-8 w-8 shrink-0 object-contain" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-none">Vanttage</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[var(--pfaint)]">Portal interno</p>
          </div>
        )}
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/portal/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              title={label}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                collapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-violet-500/15 font-medium text-violet-300"
                  : "text-[var(--pmuted)] hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)]"
              }`}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-1 border-t border-[var(--pborder)] pt-2">
        {!collapsed && <ThemeToggle />}
        <Link
          href="/"
          title="Ver el sitio"
          onClick={onNavigate}
          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-[var(--pfaint)] hover:text-[var(--pmuted)] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <ExternalLink size={14} className="shrink-0" /> {!collapsed && "Ver el sitio"}
        </Link>
      </div>
    </aside>
  );
}
