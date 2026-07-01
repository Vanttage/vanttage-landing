"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone, Instagram, Linkedin, MessageCircle, Lock } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { notifyTeam } from "@/app/lib/notify";

const EASE = [0.22, 1, 0.36, 1] as const;

const navLinks = [
  { label: "Inicio",     href: "#hero" },
  { label: "Servicios",  href: "#services" },
  { label: "Proyectos",  href: "#portfolio" },
  { label: "Nosotros",   href: "#about" },
  { label: "Contacto",   href: "#contact" },
];

const contacts = [
  { icon: Mail,   label: "Correo",    value: "vanttagectg@gmail.com", href: "mailto:vanttagectg@gmail.com" },
  { icon: Phone,  label: "Teléfono",  value: "+57 322 670 6385",      href: "tel:+573226706385" },
  { icon: MapPin, label: "Ubicación", value: "Edificio Territorio Mío, Torre 3 · Sector Providencia, Cartagena de Indias, Bolívar, Colombia", href: "https://maps.google.com/?q=Edificio+Territorio+M%C3%ADo+Sector+Providencia+Cartagena" },
];

const socials = [
  { icon: Instagram,      label: "Instagram", href: "https://instagram.com/vanttage" },
  { icon: Linkedin,       label: "LinkedIn",  href: "https://linkedin.com/company/vanttage" },
  { icon: MessageCircle,  label: "WhatsApp",  href: "https://wa.me/573226706385" },
];

function scrollTo(href: string) {
  const id = href.replace("#", "");
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/portal")) return null;

  return (
    <footer className="relative overflow-hidden bg-[#F1F5F9] px-6 pb-10 pt-24">

      {/* Glow top */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full" style={{ background: "radial-gradient(closest-side, rgba(167,139,250,0.12), transparent)" }} />
        <div className="absolute bottom-0 right-0 h-[200px] w-[400px] rounded-full" style={{ background: "radial-gradient(closest-side, rgba(165,180,252,0.12), transparent)" }} />
      </div>

      {/* Texto decorativo de fondo */}
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[clamp(5rem,16vw,14rem)] font-black tracking-[-0.04em] text-[#0A2540]/[0.04]"
        aria-hidden
      >
        Vanttage.
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative mx-auto max-w-6xl"
      >
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr]">

          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5 flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0">
                <Image src="/logo/logo.png" alt="Vanttage logo" fill sizes="44px" className="object-contain" priority />
              </div>
              <div>
                <p className="text-[18px] font-semibold leading-none text-[#0A2540]">Vanttage.</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.26em] text-[#94A3B8]">Software Boutique</p>
              </div>
            </div>

            <p className="max-w-sm text-[15px] leading-[1.8] text-[#475569]">
              Diseñamos y construimos productos digitales con estándares altos.
              Para empresas que entienden que su web es parte del negocio, no un accesorio.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-md transition hover:scale-[1.04]"
              >
                Empezar proyecto
                <ArrowUpRight size={13} />
              </a>
              <a
                href="mailto:vanttagectg@gmail.com"
                onClick={() => notifyTeam({ source: "Correo (footer)", once: "mail-footer" })}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A2540] transition hover:bg-gray-50"
              >
                Escribir correo
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() =>
                    label === "WhatsApp" &&
                    notifyTeam({ source: "WhatsApp (footer)", once: "wa-footer" })
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#64748B] shadow-sm transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navegación ── */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
              Navegación
            </p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                  className="group flex items-center gap-1.5 text-[14px] text-[#64748B] transition-colors duration-200 hover:text-[#0A2540]"
                >
                  <span className="h-[1px] w-0 bg-violet-500 transition-all duration-300 group-hover:w-3" />
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* ── Contacto ── */}
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#94A3B8]">
              Contacto
            </p>
            <div className="space-y-3">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition hover:border-violet-200 hover:shadow-md"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 transition group-hover:bg-violet-500 group-hover:text-white">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#94A3B8]">{label}</p>
                    <p className="mt-0.5 text-[13px] text-[#0A2540]">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 flex flex-col items-center gap-3 border-t border-gray-200 pt-6 text-[12px] text-[#94A3B8] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Vanttage. Todos los derechos reservados.</p>

          <div className="flex items-center gap-4">
            <span className="text-[#0A2540] font-medium tracking-tight">
              Construido con precisión.
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
            <span>Cartagena · Colombia</span>
            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
            <a
              href="/portal"
              aria-label="Portal interno"
              title="Portal interno"
              className="inline-flex items-center gap-1 text-[#CBD5E1] transition-colors hover:text-violet-500"
            >
              <Lock size={12} />
              <span className="text-[11px]">Portal</span>
            </a>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
