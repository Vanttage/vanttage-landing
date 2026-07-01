"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck } from "lucide-react";
import { createClient } from "../_lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      router.replace("/portal/panel");
      router.refresh();
    } catch {
      setError("No se pudo conectar. Intenta de nuevo.");
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      {/* glow de fondo */}
      <div
        className="pointer-events-none fixed left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.28), transparent)" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/30">
            <ShieldCheck size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold">Portal interno · Vanttage</h1>
          <p className="mt-1 text-sm text-white/50">Acceso solo para administradores</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
        >
          <label className="mb-1.5 block text-xs font-medium text-white/60">Correo</label>
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
            <Mail size={16} className="text-white/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@gmail.com"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30"
            />
          </div>

          <label className="mb-1.5 block text-xs font-medium text-white/60">Contraseña</label>
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
            <Lock size={16} className="text-white/40" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/30">Vanttage · Cartagena, Colombia</p>
      </div>
    </main>
  );
}
