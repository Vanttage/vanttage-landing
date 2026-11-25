"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Eye, EyeOff, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { createClient } from "../_lib/supabase-browser";
import ThemeToggle from "../_components/ThemeToggle";
import Wordmark from "@/app/components/Wordmark";
import TopoBackground from "../_components/TopoBackground";
import { inputCls, labelCls, kickerCls } from "../_components/ui";

export default function LoginPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) {
        setError("Correo o contraseña incorrectos.");
        setLoading(false);
        return;
      }
      router.replace("/portal/dashboard");
      router.refresh();
    } catch {
      setError("No se pudo conectar. Intenta de nuevo.");
      setLoading(false);
    }
  }

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <main className="grid min-h-[100dvh] bg-[var(--pbg)] lg:grid-cols-[1.05fr_1fr]">
      {/* ── Panel de marca: logo + palabra animada ── */}
      <section
        aria-label="Vanttage Tech"
        className="relative isolate flex flex-col overflow-hidden border-b border-[var(--pborder)] bg-[var(--plogin-panel)] px-6 pb-9 pt-5 sm:px-10 lg:min-h-[100dvh] lg:border-b-0 lg:border-r lg:px-14 lg:py-10"
      >
        <TopoBackground opacity={0.55} />
        {/* Brillo violeta muy sutil solo detrás de la palabra */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[40%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.16), transparent)" }}
        />

        {/* Marca discreta */}
        <div className="flex items-center gap-2.5">
          <Image src="/logo/logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" />
          <span className="text-sm font-medium tracking-tight text-[var(--ptext)]">Portal interno</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center pt-8 lg:pt-0">
          <Wordmark className="w-full max-w-[900px]" />
          <motion.p
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 8 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const },
                })}
            className="mt-6 max-w-md text-balance text-center text-sm text-[var(--pmuted)] lg:mt-10 lg:text-lg"
          >
            Clientes, cotizaciones y seguimiento en un solo lugar.
          </motion.p>
        </div>

        <p className="hidden text-xs text-[var(--pfaint)] lg:block">Cartagena, Colombia</p>
      </section>

      {/* ── Formulario ── */}
      <section className="relative flex flex-col px-5 pb-10 pt-6 sm:px-10 lg:min-h-[100dvh] lg:px-16 lg:py-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full pr-3 text-sm text-[var(--pmuted)] transition-colors hover:text-[var(--ptext)]"
          >
            <ArrowLeft size={16} aria-hidden /> Volver al sitio
          </Link>
          <ThemeToggle compact />
        </div>

        <div className="flex flex-1 items-center justify-center py-8 lg:py-0">
          <motion.div {...fade(0.05)} className="w-full max-w-[380px]">
            <p className={kickerCls}>Acceso del equipo</p>
            <h1 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight">Ingresa al portal</h1>
            <p className="mt-2 text-sm text-[var(--pmuted)]">
              Usa el correo y la contraseña de tu cuenta de administrador.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" aria-describedby={error ? "login-error" : undefined}>
              <div>
                <label htmlFor="login-email" className={labelCls}>
                  Correo
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  placeholder="nombre@vanttagetech.com"
                  className={`${inputCls} min-h-12 md:min-h-12`}
                />
              </div>

              <div>
                <label htmlFor="login-password" className={labelCls}>
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    name="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={error ? true : undefined}
                    className={`${inputCls} min-h-12 pr-12 md:min-h-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                    aria-pressed={showPass}
                    aria-controls="login-password"
                    className="absolute right-0.5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-[var(--pfaint)] transition-colors hover:text-[var(--ptext)]"
                  >
                    {showPass ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  id="login-error"
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-sm"
                  style={{
                    color: "var(--pt-red)",
                    borderColor: "color-mix(in srgb, var(--pt-red) 30%, transparent)",
                    background: "color-mix(in srgb, var(--pt-red) 8%, transparent)",
                  }}
                >
                  <AlertCircle size={17} className="mt-px shrink-0" aria-hidden />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--pbtn-bg)] px-6 text-sm font-medium text-[var(--pbtn-fg)] transition-colors hover:bg-[var(--pbtn-hover)] disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin motion-reduce:animate-none" aria-hidden /> Ingresando
                  </>
                ) : (
                  "Ingresar"
                )}
              </button>
            </form>

            <p className="mt-8 border-t border-[var(--pborder)] pt-5 text-xs leading-relaxed text-[var(--pfaint)]">
              Acceso restringido al equipo de Vanttage. Si no puedes entrar, pide al administrador que revise tu cuenta.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
