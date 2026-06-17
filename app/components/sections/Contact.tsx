"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { notifyTeam } from "@/app/lib/notify";

const EASE = [0.22, 1, 0.36, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

/* ── Data ── */
const contactDetails = [
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["+57 322 670 6385", "+57 310 508 0356"],
  },
  { icon: Mail, title: "Correo", lines: ["vanttagectg@gmail.com"] },
  { icon: MapPin, title: "Ubicación", lines: ["Cartagena · Colombia"] },
];

const expectations = [
  "Respuesta real en menos de 24h.",
  "Te ayudamos a aterrizar la idea.",
  "Si no somos fit, te lo decimos claro.",
];

const fields = [
  { name: "name", label: "Nombre", placeholder: "Tu nombre completo" },
  { name: "company", label: "Empresa", placeholder: "Nombre de tu empresa" },
  {
    name: "email",
    label: "Correo",
    placeholder: "tu@correo.com",
    full: true,
    type: "email",
  },
];

/* ── Success screen ── */
function SuccessScreen({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[480px] flex-col items-center justify-center gap-6 text-center"
    >
      {/* Circle check */}
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
        <h3 className="text-2xl font-semibold text-[#0A2540]">
          ¡Mensaje enviado!
        </h3>
        <p className="mt-2 text-[#64748B]">
          Recibimos tu mensaje. Te respondemos en menos de 24h.
        </p>
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

/* ── Error banner ── */
function ErrorBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
    >
      <AlertCircle size={16} className="shrink-0" />
      <span>Algo salió mal. Intenta de nuevo o escríbenos directamente.</span>
      <button
        onClick={onRetry}
        className="ml-auto shrink-0 font-medium underline"
      >
        Reintentar
      </button>
    </motion.div>
  );
}

/* ── Component ── */
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const company = (fd.get("company") as string) || "";

    const ok = await notifyTeam({
      source: "Formulario (home)",
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      message: `${fd.get("message") as string}${company ? `\n\nEmpresa: ${company}` : ""}`,
    });

    if (ok) {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F8FAFC] py-32 px-6"
    >
      {/* Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] top-[20%] h-[420px] w-[420px] rounded-full bg-violet-400/20 blur-[140px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-blue-400/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/10 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-violet-500">
            Contacto
          </p>
          <h2 className="text-5xl font-semibold leading-tight text-[#0A2540] md:text-6xl">
            Hablemos de tu página web
          </h2>
          <p className="mt-6 text-lg text-[#475569]">
            Cuéntanos qué necesita tu negocio y te respondemos con una propuesta clara.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="space-y-4"
          >
            {expectations.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.5,
                  ease: EASE,
                }}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm"
              >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                <span className="text-sm text-[#475569]">{text}</span>
              </motion.div>
            ))}

            <div className="space-y-3 pt-4">
              {contactDetails.map(({ icon: Icon, title, lines }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.35 + i * 0.08,
                    duration: 0.5,
                    ease: EASE,
                  }}
                  className="group rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]">
                        {title}
                      </p>
                      {lines.map((l) => (
                        <p key={l} className="mt-1 text-sm text-[#0A2540]">
                          {l}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — form */}
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
                <SuccessScreen
                  key="success"
                  onReset={() => setStatus("idle")}
                />
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {status === "error" && (
                    <ErrorBanner onRetry={() => setStatus("idle")} />
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="relative z-10 grid gap-5 md:grid-cols-2"
                  >
                    {/* Campo oculto — llena {{title}} en el subject del template */}
                    {fields.map(({ name, label, placeholder, full, type }) => (
                      <label key={name} className={full ? "md:col-span-2" : ""}>
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748B]">
                          {label}
                        </span>
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
                      <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#64748B]">
                        Cuéntanos tu proyecto
                      </span>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Ej: Necesito una página web para mi restaurante con menú y formulario de contacto…"
                        className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-[#0A2540] outline-none placeholder:text-slate-400 transition-all duration-200 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/20"
                      />
                    </label>

                    <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
                      <p className="text-xs text-[#94A3B8]">
                        Te respondemos personalmente.
                      </p>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-500/25 transition-all hover:scale-[1.04] active:scale-[0.98] disabled:opacity-60"
                      >
                        {status === "loading" ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                              className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white"
                            />
                            Enviando…
                          </>
                        ) : (
                          <>
                            Enviar
                            <Send
                              size={13}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
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
  );
}
