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

const nav = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/pipeline", label: "Pipeline", icon: KanbanSquare },
  { href: "/portal/clientes", label: "Contactos", icon: Users },
  { href: "/portal/cotizaciones", label: "Cotizaciones", icon: FileText },
  { href: "/portal/cotizador", label: "Nueva cotización", icon: FilePlus2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="no-print sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-white/10 bg-[#0A0A14] px-3 py-5">
      <Link href="/portal/dashboard" className="mb-6 flex items-center gap-2.5 px-2">
        <Image src="/logo/logo.png" alt="Vanttage" width={32} height={32} className="h-8 w-8 object-contain" />
        <div>
          <p className="text-sm font-semibold leading-none text-white">Vanttage</p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/40">Portal interno</p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/portal/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? "bg-violet-500/15 font-medium text-violet-200"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/40 hover:text-white/70"
      >
        <ExternalLink size={14} /> Ver el sitio
      </Link>
    </aside>
  );
}
