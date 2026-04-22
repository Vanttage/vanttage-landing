"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const links = [
  { label: "Servicios", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Proceso", href: "#process" },
  { label: "Proyectos", href: "#portfolio" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

const contacts = [
  {
    icon: Mail,
    label: "Correo",
    value: "vanttagectg@gmail.com",
    href: "mailto:vanttagectg@gmail.com",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+57 322 670 6385",
    href: "tel:+573226706385",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Cartagena · Colombia",
    href: "#contact",
  },
];

export default function Footer() {
  return (
    <footer className="section-shell overflow-hidden border-t border-white/6 bg-[#020617] pb-10">
      <div className="elec-glow left-1/2 top-0 h-48 w-[36rem] -translate-x-1/2 opacity-25" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        viewport={{ once: true }}
        className="section-inner"
      >
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.9fr]">
          {/* Brand */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#1EA7FF]/20 bg-[#1EA7FF]/10">
                <span className="font-display text-xl font-bold text-[#1EA7FF]">
                  V
                </span>
                <div className="absolute inset-0 rounded-xl bg-[#1EA7FF]/15 blur-md" />
              </div>
              <div>
                <p className="font-display text-xl font-bold text-white">
                  Vanttage
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-[0.26em] text-[#475569]">
                  Ingeniería web · Cartagena
                </p>
              </div>
            </div>

            <p className="max-w-md text-[15px] leading-[1.8] text-[#64748B]">
              Diseñamos, construimos y migramos sitios web profesionales. Un
              estudio técnico con estándares altos, enfocado en empresas que
              quieren una presencia digital a la altura de lo que ofrecen.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="btn-electric inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-white"
              >
                <span className="relative z-10">Agendar diagnóstico</span>
                <ArrowUpRight size={14} className="relative z-10" />
              </a>
              <a
                href="mailto:vanttagectg@gmail.com"
                className="btn-ghost inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.14em]"
              >
                Escribir correo
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-display mb-4 text-base font-bold text-white">
              Navegación
            </p>
            <div className="mb-5 h-px w-8 bg-[#1EA7FF]/40" />
            <nav className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center gap-2 text-[#64748B] transition-colors hover:text-white"
                >
                  <span className="h-px w-3 bg-[#334155] transition-all group-hover:w-5 group-hover:bg-[#1EA7FF]" />
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-display mb-4 text-base font-bold text-white">
              Contacto
            </p>
            <div className="mb-5 h-px w-8 bg-[#D4AF37]/50" />
            <div className="space-y-3">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/12"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#1EA7FF]/15 bg-[#1EA7FF]/8 text-[#1EA7FF]">
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#334155]">
                      {label}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-5 text-[#94A3B8]">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/6 pt-7 text-[13px] text-[#334155] md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <span className="pulse-dot" />© {new Date().getFullYear()} Vanttage
            · Ingeniería web boutique, Cartagena.
          </p>
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
        </div>
      </motion.div>
    </footer>
  );
}
