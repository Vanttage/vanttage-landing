"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const contactDetails = [
  { icon: Phone, title: "Teléfono", lines: ["+57 322 670 6385", "+57 310 508 0356"] },
  { icon: Mail, title: "Correo", lines: ["vanttagectg@gmail.com"] },
  { icon: MapPin, title: "Ubicación", lines: ["Cartagena · Colombia"] },
];

const expectations = [
  "Te respondemos con contexto, no con plantilla genérica.",
  "Podemos aterrizar el alcance aunque todavía esté difuso.",
  "Si no somos la mejor ruta, también te lo decimos.",
];

export default function Contact() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name")?.toString().trim() ?? "";
    const company = fd.get("company")?.toString().trim() ?? "";
    const email = fd.get("email")?.toString().trim() ?? "";
    const project = fd.get("project")?.toString().trim() ?? "";

    const subject = encodeURIComponent(`Consulta Vanttage${company ? ` · ${company}` : ""}`);
    const body = encodeURIComponent(
      [`Nombre: ${name || "No especificado"}`, `Empresa: ${company || "No especificada"}`,
       `Correo: ${email || "No especificado"}`, "", "Contexto:", project || "Sin detalles."].join("\n"),
    );
    window.location.href = `mailto:vanttagectg@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-shell scroll-mt-24 overflow-hidden bg-[#061729]">
      <div className="divider-top" />
      <div className="elec-glow right-0 top-1/2 h-[30rem] w-[28rem] -translate-y-1/2 opacity-25" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="section-kicker justify-center mb-5">Contacto</p>
          <h2 className="section-title">
            Hablemos del proyecto
            <br />
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(90deg, #1EA7FF, #4FC3FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              que tienes en mente.
            </span>
          </h2>
          <p className="section-copy mx-auto mt-6 max-w-2xl">
            Si ya sabes qué quieres construir, avanzamos rápido. Si todavía
            estás ordenando el problema, también podemos ayudarte.
          </p>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-7 md:p-9"
          >
            <p className="text-[11px] uppercase tracking-[0.24em] text-[#475569]">Lo que puedes esperar</p>
            <div className="mt-5 h-px w-8 bg-[#1EA7FF]/40" />
            <div className="mt-6 space-y-3">
              {expectations.map((item) => (
                <div key={item} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4 text-[14.5px] leading-7 text-[#94A3B8]">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {contactDetails.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#1EA7FF]/15 bg-[#1EA7FF]/10 text-[#1EA7FF]">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#475569]">{title}</p>
                      {lines.map((line) => (
                        <p key={line} className="mt-1 text-[14px] leading-6 text-white">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-3xl p-7 md:p-9"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {[
                { name: "name", label: "Nombre", placeholder: "Tu nombre", full: false },
                { name: "company", label: "Empresa", placeholder: "Nombre de tu empresa", full: false },
                { name: "email", label: "Correo electrónico", placeholder: "tu@empresa.com", full: true },
              ].map(({ name, label, placeholder, full }) => (
                <label key={name} className={`block ${full ? "md:col-span-2" : ""}`}>
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#475569]">
                    {label}
                  </span>
                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-[#334155] focus:border-[#1EA7FF]/45 focus:bg-[#1EA7FF]/5"
                  />
                </label>
              ))}

              <label className="block md:col-span-2">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-[#475569]">
                  Cuéntanos el contexto
                </span>
                <textarea
                  rows={6}
                  name="project"
                  placeholder="Qué quieres lograr, qué tienes hoy, qué mejorar..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-[#334155] focus:border-[#1EA7FF]/45 focus:bg-[#1EA7FF]/5"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-[13px] leading-6 text-[#475569]">
                Abre tu cliente de correo con el mensaje listo para enviar.
              </p>
              <button
                type="submit"
                className="btn-electric inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white"
              >
                <span className="relative z-10">Enviar mensaje</span>
                <Send size={14} className="relative z-10" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
