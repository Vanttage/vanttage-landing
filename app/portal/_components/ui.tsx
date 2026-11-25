import type { LucideIcon } from "lucide-react";
import { DatabaseZap, AlertTriangle } from "lucide-react";

/* ─────────── Piezas visuales compartidas del portal ─────────── */

/* Clases de botones y campos (h-11 en móvil para áreas táctiles de 44px) */
export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--pbtn-bg)] px-5 text-sm font-medium text-[var(--pbtn-fg)] transition-colors hover:bg-[var(--pbtn-hover)] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-10";
export const btnSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--pborder)] px-4 text-sm font-medium text-[var(--ptext)] transition-colors hover:border-[var(--pborder-strong)] hover:bg-[var(--pcardhover)] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-10";
export const btnGhostIcon =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--pmuted)] transition-colors hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)] md:h-9 md:w-9";
export const btnDangerIcon =
  "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[var(--pmuted)] transition-colors hover:bg-red-500/10 hover:text-[var(--pt-red)] md:h-9 md:w-9";
export const inputCls =
  "w-full min-h-11 rounded-xl border border-[var(--pborder)] bg-[var(--pinput)] px-3.5 text-sm text-[var(--ptext)] outline-none transition-colors placeholder:text-[var(--pfaint)] hover:border-[var(--pborder-strong)] focus:border-[var(--paccent-line)] focus-visible:outline-none focus:ring-2 focus:ring-[var(--paccent-soft)] md:min-h-10";
export const labelCls = "mb-1.5 block text-xs font-medium text-[var(--pmuted)]";
export const kickerCls = "text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--pfaint)]";
export const cardCls = "rounded-2xl border border-[var(--pborder)] bg-[var(--pcard)]";

/* ─────────── Badges de estado (color + texto, nunca solo color) ─────────── */
export type Tone = "neutral" | "blue" | "violet" | "green" | "amber" | "red" | "pink";

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        color: `var(--pt-${tone})`,
        background: `color-mix(in srgb, var(--pt-${tone}) 13%, transparent)`,
      }}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--pt-${tone})` }} />
      {children}
    </span>
  );
}

export const ETAPAS = ["Prospecto", "Contactado", "Cotizado", "Aprobado", "En desarrollo", "Entregado", "Perdido"];

export const etapaTone: Record<string, Tone> = {
  Prospecto: "neutral",
  Contactado: "blue",
  Cotizado: "violet",
  Aprobado: "green",
  "En desarrollo": "amber",
  Entregado: "green",
  Perdido: "red",
};

export const estadoTone: Record<string, Tone> = {
  borrador: "neutral",
  enviada: "blue",
  aprobada: "green",
  rechazada: "red",
};

export const estadoLabel: Record<string, string> = {
  borrador: "Borrador",
  enviada: "Enviada",
  aprobada: "Aprobada",
  rechazada: "Rechazada",
};

export function EtapaBadge({ etapa }: { etapa: string | null }) {
  const e = etapa || "Prospecto";
  return <Badge tone={etapaTone[e] ?? "neutral"}>{e}</Badge>;
}

export function EstadoBadge({ estado }: { estado: string }) {
  return <Badge tone={estadoTone[estado] ?? "neutral"}>{estadoLabel[estado] ?? estado}</Badge>;
}

/* ─────────── Estados vacíos y avisos ─────────── */
export function EmptyState({
  icon: Icon,
  title,
  text,
  action,
  compact = false,
}: {
  icon: LucideIcon;
  title: string;
  text?: string;
  action?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--pborder)] text-center ${
        compact ? "px-5 py-8" : "px-6 py-14"
      }`}
    >
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--pborder)] bg-[var(--pcard)] text-[var(--paccent)]">
        <Icon size={20} aria-hidden />
      </span>
      <p className="text-sm font-medium text-[var(--ptext)]">{title}</p>
      {text && <p className="mt-1 max-w-sm text-sm text-[var(--pfaint)]">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Notice({
  title,
  text,
  tone = "amber",
  icon,
  action,
}: {
  title: string;
  text?: string;
  tone?: "amber" | "red";
  icon?: LucideIcon;
  action?: React.ReactNode;
}) {
  const Icon = icon ?? (tone === "amber" ? DatabaseZap : AlertTriangle);
  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-2xl border px-4 py-4 sm:flex-row sm:items-center sm:px-5"
      style={{
        borderColor: `color-mix(in srgb, var(--pt-${tone}) 28%, transparent)`,
        background: `color-mix(in srgb, var(--pt-${tone}) 7%, transparent)`,
      }}
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ color: `var(--pt-${tone})`, background: `color-mix(in srgb, var(--pt-${tone}) 14%, transparent)` }}
      >
        <Icon size={18} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[var(--ptext)]">{title}</p>
        {text && <p className="mt-0.5 text-sm text-[var(--pmuted)]">{text}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* Aviso estándar cuando faltan las variables de Supabase */
export function DbNotice({ detail }: { detail?: string }) {
  return (
    <Notice
      title="Base de datos no conectada"
      text={
        detail ||
        "Este entorno no tiene configuradas las variables de Supabase. Los datos aparecerán cuando se conecte la base."
      }
    />
  );
}

/* Bloque de esqueleto para estados de carga */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`portal-skeleton ${className}`} />;
}
