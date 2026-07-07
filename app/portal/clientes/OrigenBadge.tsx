const colors: Record<string, string> = {
  Chat: "#a78bfa",
  Formulario: "#60a5fa",
  WhatsApp: "#34d399",
  Correo: "#f59e0b",
  Landing: "#f472b6",
  cotizador: "#818cf8",
  manual: "#94a3b8",
};

export default function OrigenBadge({ origen }: { origen: string | null }) {
  const o = origen || "manual";
  const c = colors[o] || "#94a3b8";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
      style={{ background: `${c}22`, color: c }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {o}
    </span>
  );
}
