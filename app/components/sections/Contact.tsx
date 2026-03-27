"use client";

import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+57 322 670 6385", "+57 310 508 0356"],
  },
  {
    icon: Mail,
    title: "Correo",
    lines: ["vanttagectg@gmail.com"],
  },
  {
    icon: MapPin,
    title: "Ubicación",
    lines: ["Cartagena, Colombia"],
  },
];

const expectations = [
  "Te respondemos con contexto, no con una plantilla genérica.",
  "Podemos ayudarte a aterrizar alcance aunque todavía esté difuso.",
  "Si no somos la mejor ruta, también te lo diremos con honestidad.",
];

export default function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const company = formData.get("company")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const project = formData.get("project")?.toString().trim() ?? "";

    const subject = encodeURIComponent(
      `Consulta Vanttage${company ? ` - ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Nombre: ${name || "No especificado"}`,
        `Empresa: ${company || "No especificada"}`,
        `Correo: ${email || "No especificado"}`,
        "",
        "Contexto del proyecto:",
        project || "Sin detalles adicionales.",
      ].join("\n"),
    );

    window.location.href = `mailto:vanttagectg@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="section-shell scroll-mt-28 overflow-hidden bg-[#020617]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute right-0 top-1/2 -z-10 h-[30rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#1EA7FF]/7 blur-[130px]" />

      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="section-kicker">Contacto</p>
          <h2 className="section-title text-white">
            Hablemos de tu operación
            <br />
            <span className="text-[#1EA7FF]">y del sistema que necesita.</span>
          </h2>
          <p className="section-copy mx-auto mt-5 max-w-2xl">
            Si ya sabes qué quieres construir, avanzamos rápido. Si todavía estás
            ordenando el problema, también podemos ayudarte a darle forma.
          </p>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="surface-panel rounded-[2rem] p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">
              Lo que puedes esperar
            </p>

            <div className="mt-6 space-y-4">
              {expectations.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-white/8 bg-black/10 px-4 py-4 text-sm leading-7 text-[#CBD5E1]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              {contactDetails.map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1EA7FF]/18 bg-[#1EA7FF]/10">
                      <Icon size={16} className="text-[#1EA7FF]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#64748B]">
                        {title}
                      </p>
                      {lines.map((line) => (
                        <p key={line} className="mt-1 text-sm leading-7 text-white">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="surface-panel rounded-[2rem] p-6 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#64748B]">
                  Nombre
                </span>
                <input
                  type="text"
                  name="name"
                  placeholder="Tu nombre"
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-[#64748B] focus:border-[#1EA7FF]/45"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#64748B]">
                  Empresa
                </span>
                <input
                  type="text"
                  name="company"
                  placeholder="Nombre de tu empresa"
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-[#64748B] focus:border-[#1EA7FF]/45"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#64748B]">
                  Correo electrónico
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="tu@empresa.com"
                  className="w-full rounded-2xl border border-white/10 bg-black/10 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-[#64748B] focus:border-[#1EA7FF]/45"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#64748B]">
                  Cuéntanos el contexto
                </span>
                <textarea
                  rows={6}
                  name="project"
                  placeholder="Qué proceso te está frenando, qué necesitas mejorar o qué sistema quisieras construir."
                  className="w-full rounded-[1.5rem] border border-white/10 bg-black/10 px-4 py-3.5 text-white outline-none transition-colors placeholder:text-[#64748B] focus:border-[#1EA7FF]/45"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-sm leading-7 text-[#94A3B8]">
                Este formulario abre tu cliente de correo con el mensaje listo
                para enviarlo y mantener el contacto directo contigo.
              </p>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1EA7FF] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-[#020617] transition-all hover:scale-[1.02] hover:bg-[#59BEFF]"
              >
                Enviar mensaje
                <Send size={16} />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
