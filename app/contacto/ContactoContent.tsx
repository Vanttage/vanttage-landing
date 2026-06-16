"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Mail, MapPin, Phone, Send,
  CheckCircle2, AlertCircle, RotateCcw, ChevronDown, MessageCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { TEAM_EMAILS, notifyTeam } from "@/app/lib/notify";

const EJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJS_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

const WHATSAPP =
  "https://wa.me/573226706385?text=Hola%20Vanttage%2C%20me%20interesa%20una%20p%C3%A1gina%20web%20para%20mi%20negocio";

const EASE = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

const contactDetails = [
  { icon: Phone,  title: "Teléfono",   lines: ["+57 322 670 6385", "+57 310 508 0356"] },
  { icon: Mail,   title: "Correo",     lines: ["vanttagectg@gmail.com"] },
  { icon: MapPin, title: "Ubicación",  lines: ["Cartagena · Colombia"] },
];

import { faqs } from "./faqs";

/* ── FAQ item con acordeón ── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-[#0A2540]">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="shrink-0 text-violet-500" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-[#64748B]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Pantalla de éxito ── */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[400px] flex-col items-center justify-center gap-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
        className="relative flex h-20 w-20 items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-violet-100" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-violet-400"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 1.6, delay: 0.4 }}
        />
        <CheckCircle2 size={38} className="relative text-violet-500" />
      </motion.div>
      <div>
        <h3 className="text-2xl font-semibold text-[#0A2540]">¡Mensaje enviado!</h3>
        <p className="mt-2 text-[#64748B]">Recibimos tu mensaje. Te respondemos en menos de 24h.</p>
      </div>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm text-[#64748B] transition hover:bg-gray-50"
      >
        <RotateCcw size={13} />
        Enviar otro mensaje
      </button>
    </motion.div>
  );
}

/* ── Componente principal ── */
export default function ContactoContent() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      title:    "Nuevo Proyecto desde Vanttage.com/contacto",
      name:     fd.get("name")    as string,
      company:  fd.get("company") as string,
      email:    fd.get("email")   as string,
      message:  fd.get("message") as string,
      to_email: TEAM_EMAILS,
    };
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, payload, { publicKey: EJS_KEY });
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* ── Header oscuro ── */}
      <section className="relative overflow-hidden bg-[#061729] px-6 pb-24 pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-violet-500/15 blur-[140px]" />
          <div className="absolute -right-[5%] bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white">
              <ArrowLeft size={15} />
              Volver al inicio
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
            className="mb-4 text-[11px] uppercase tracking-[0.3em] text-violet-400"
          >
            Contacto
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            Hablemos de
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              tu proyecto
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            Cuéntanos qué necesita tu negocio y te respondemos con una propuesta
            clara en menos de 24 horas. Sin compromisos, sin tecnicismos.
          </motion.p>
        </div>
      </section>

      {/* ── Formulario + info ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">

            {/* Columna izquierda — info */}
            <div className="space-y-4">
              {["Respuesta real en menos de 24h.", "Te ayudamos a aterrizar la idea.", "Si no somos fit, te lo decimos claro."].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: EASE }}
                  className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
                >
                  <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                  <span className="text-sm text-[#475569]">{text}</span>
                </motion.div>
              ))}

              <div className="space-y-3 pt-2">
                {contactDetails.map(({ icon: Icon, title, lines }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.32 + i * 0.08, duration: 0.5, ease: EASE }}
                    className="group rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">{title}</p>
                        {lines.map((l) => (
                          <p key={l} className="mt-1 text-sm text-[#0A2540]">{l}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => notifyTeam({ source: "WhatsApp (contacto)", once: "wa-contacto" })}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
                className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm transition hover:bg-green-100"
              >
                <MessageCircle size={20} className="shrink-0 text-green-600" />
                <div>
                  <p className="font-medium text-green-700">Hablar por WhatsApp</p>
                  <p className="text-[11px] text-green-600">Respuesta inmediata</p>
                </div>
              </motion.a>
            </div>

            {/* Columna derecha — formulario */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative rounded-3xl border border-gray-200 bg-white p-8 shadow-xl"
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-transparent" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessScreen key="success" onReset={() => setStatus("idle")} />
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                      >
                        <AlertCircle size={16} className="shrink-0" />
                        <span>Algo salió mal. Intenta de nuevo o escríbenos directamente.</span>
                        <button onClick={() => setStatus("idle")} className="ml-auto shrink-0 font-medium underline">
                          Reintentar
                        </button>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="relative z-10 grid gap-5 md:grid-cols-2">
                      {[
                        { name: "name",    label: "Nombre",  placeholder: "Tu nombre completo" },
                        { name: "company", label: "Empresa", placeholder: "Nombre de tu empresa" },
                        { name: "email",   label: "Correo",  placeholder: "tu@correo.com", full: true, type: "email" },
                      ].map(({ name, label, placeholder, full, type }) => (
                        <label key={name} className={full ? "md:col-span-2" : ""}>
                          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748B]">{label}</span>
                          <input
                            name={name}
                            type={type ?? "text"}
                            placeholder={placeholder}
                            required
                            className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-[#0A2540] outline-none placeholder:text-slate-400 transition-all duration-200 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/20"
                          />
                        </label>
                      ))}

                      <label className="md:col-span-2">
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748B]">Cuéntanos tu proyecto</span>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          placeholder="Ej: Necesito una página web para mi restaurante con menú y formulario de contacto…"
                          className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-[#0A2540] outline-none placeholder:text-slate-400 transition-all duration-200 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/20"
                        />
                      </label>

                      <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
                        <p className="text-xs text-[#94A3B8]">Te respondemos personalmente.</p>
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.04] active:scale-[0.98] disabled:opacity-60"
                        >
                          {status === "loading" ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                              />
                              Enviando…
                            </>
                          ) : (
                            <>
                              Enviar
                              <Send size={13} className="transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-violet-500">Preguntas frecuentes</p>
            <h2 className="text-3xl font-semibold text-[#0A2540]">Resolvemos tus dudas</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="rounded-2xl border border-gray-200 bg-[#F8FAFC] px-6"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}
