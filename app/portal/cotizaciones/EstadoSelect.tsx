"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ESTADOS = ["borrador", "enviada", "aprobada", "rechazada"];
const color: Record<string, string> = {
  borrador: "#94a3b8",
  enviada: "#60a5fa",
  aprobada: "#34d399",
  rechazada: "#f87171",
};

export default function EstadoSelect({ id, estado }: { id: string; estado: string }) {
  const router = useRouter();
  const [val, setVal] = useState(estado);
  const [busy, setBusy] = useState(false);

  async function change(e: string) {
    setVal(e);
    setBusy(true);
    await fetch(`/api/portal/cotizaciones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: e }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <select
      value={val}
      disabled={busy}
      onChange={(e) => change(e.target.value)}
      className="rounded-full border border-[var(--pborder)] bg-[var(--pinput)] px-2 py-1 text-xs capitalize outline-none focus:border-violet-400/50"
      style={{ color: color[val] || "#fff" }}
    >
      {ESTADOS.map((e) => (
        <option key={e} value={e} className="bg-[var(--psidebar)] text-[var(--ptext)]">{e}</option>
      ))}
    </select>
  );
}
