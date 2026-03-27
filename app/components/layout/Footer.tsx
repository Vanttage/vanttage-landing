"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = [
  { label: "Servicios", href: "#services" },
  { label: "Proceso", href: "#process" },
  { label: "Portafolio", href: "#portfolio" },
  { label: "Contacto", href: "#contact" },
];

const contactItems = [
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
    value: "Cartagena, Colombia",
    href: "#contact",
  },
];

export default function Footer() {
  return (
    <footer className="section-shell overflow-hidden border-t border-white/8 bg-[#020617]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1EA7FF]/20 to-transparent" />
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-64 w-[36rem] rounded-full bg-[#1EA7FF]/6 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="section-inner"
      >
        <div className="surface-panel rounded-[2rem] p-6 md:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.85fr_0.9fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#1EA7FF]/20 bg-[#1EA7FF]/10">
                  <span className="font-display text-xl font-bold text-[#1EA7FF]">
                    V
                  </span>
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    Vanttage
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#94A3B8]">
                    Software boutique
                  </p>
                </div>
              </div>

              <p className="max-w-md text-base leading-8 text-[#94A3B8]">
                Diseñamos sistemas, plataformas y automatizaciones a medida para
                empresas que necesitan menos fricción operativa y más capacidad
                de ejecución.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="btn-electric inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  Solicitar diagnóstico
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="mailto:vanttagectg@gmail.com"
                  className="btn-ghost-dark inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white transition-colors hover:border-[#1EA7FF]/25 hover:text-[#D9F2FF]"
                >
                  Escribir por correo
                </a>
              </div>
            </div>

            <div>
              <p className="font-display mb-4 text-lg font-semibold text-white">
                Navegación
              </p>
              <nav className="space-y-3">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-[#94A3B8] transition-colors hover:border-[#1EA7FF]/25 hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="font-display mb-4 text-lg font-semibold text-white">
                Contacto
              </p>
              <div className="space-y-3">
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/15"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1EA7FF]/18 bg-[#1EA7FF]/10">
                      <Icon size={16} className="text-[#1EA7FF]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#64748B]">
                        {label}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-[#64748B] md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-2">
              <span className="signal-dot" />
              Vanttage. Ingeniería de software para operaciones que escalan.
            </p>
            <p>Diseñado para comunicar claridad, criterio y ejecución.</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
