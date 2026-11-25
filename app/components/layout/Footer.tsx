"use client";

import {
  Lock,
  ArrowRight,
  ArrowUpRight,
  Instagram,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { notifyTeam } from "@/app/lib/notify";

const pages = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

const phones = [
  { name: "Carlos Carranza", value: "+57 310 508 0356", tel: "+573105080356" },
  { name: "Moisés Ruiz", value: "+57 322 670 6385", tel: "+573226706385" },
];

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/vanttage",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/company/vanttage",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/573226706385",
  },
];

const MAPS =
  "https://maps.google.com/?q=Edificio+Territorio+M%C3%ADo+Sector+Providencia+Cartagena";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/portal")) return null;
  /* En el home y en /contacto el formulario ya está justo arriba */
  const showCta = pathname !== "/" && pathname !== "/contacto";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#06060C] px-6 pb-10 pt-20 text-zinc-400">
      {/* Marca gigante de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(5rem,18vw,16rem)] font-semibold leading-none tracking-[-0.05em] text-white/[0.03]"
      >
        Vanttage
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* CTA */}
        {showCta && (
          <div className="flex flex-col gap-6 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-violet-300">
                ¿Tienes un proyecto?
              </p>
              <p className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                Cuéntanos qué necesitas y te respondemos en menos de 24 horas.
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-medium text-[#06060C] transition-colors hover:bg-zinc-200 md:self-auto"
            >
              Cotizar mi proyecto
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Columnas */}
        <div
          className={`grid gap-12 pb-14 ${showCta ? "pt-14" : "pt-0"} sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr]`}
        >
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <span className="relative h-9 w-9 shrink-0">
                <Image
                  src="/logo/logo.png"
                  alt=""
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </span>
              <span className="text-lg font-semibold tracking-tight text-white">
                Vanttage
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed">
              Software boutique en Cartagena. Hacemos páginas web, tiendas
              virtuales y aplicaciones web para negocios de cualquier país.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (abre en una pestaña nueva)`}
                  onClick={() =>
                    label === "WhatsApp" &&
                    notifyTeam({
                      source: "WhatsApp (footer)",
                      once: "wa-footer",
                    })
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-violet-400/50 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Páginas */}
          <nav aria-label="Páginas del sitio">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Páginas
            </p>
            <ul className="space-y-1">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-9 items-center text-sm text-zinc-300 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Teléfonos */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Llámanos
            </p>
            <ul className="space-y-4">
              {phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group block">
                    <span className="block text-base font-medium text-white transition-colors group-hover:text-violet-200">
                      {p.value}
                    </span>
                    <span className="text-xs text-zinc-500">{p.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Correo y ubicación */}
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-zinc-500">
              Escríbenos
            </p>
            <a
              href="mailto:vanttagectg@gmail.com"
              onClick={() =>
                notifyTeam({ source: "Correo (footer)", once: "mail-footer" })
              }
              className="inline-flex min-h-9 items-center gap-1 text-base font-medium text-white transition-colors hover:text-violet-200"
            >
              vanttagectg@gmail.com
              <ArrowUpRight size={14} />
            </a>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block text-sm leading-relaxed text-zinc-400 transition-colors hover:text-zinc-200"
            >
              Edificio Territorio Mío, Torre 3
              <br />
              Sector Providencia, Cartagena de Indias
              <br />
              Bolívar, Colombia
            </a>
          </div>
        </div>

        {/* Franja inferior */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Vanttage. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-4">
            <p>Cartagena · Colombia · Clientes en cualquier país</p>
            <Link
              href="/portal/login"
              rel="nofollow"
              aria-label="Acceso del equipo Vanttage"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-zinc-400 transition-colors hover:border-violet-400/40 hover:text-violet-200"
            >
              <Lock size={12} aria-hidden />
              Equipo
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
