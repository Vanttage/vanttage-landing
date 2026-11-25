"use client";

import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { usePortalTheme, setPortalTheme, applyStoredTheme } from "./usePortalTheme";

/* Sincroniza data-ptheme con localStorage al montar (navegación del cliente) */
export function ThemeSync() {
  useEffect(() => {
    applyStoredTheme();
  }, []);
  return null;
}

export default function ThemeToggle({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const theme = usePortalTheme();
  const light = theme === "light";
  const label = light ? "Cambiar a tema oscuro" : "Cambiar a tema claro";

  return (
    <button
      type="button"
      onClick={() => setPortalTheme(light ? "dark" : "light")}
      aria-label={label}
      title={label}
      className={`inline-flex min-h-11 items-center gap-2.5 rounded-full text-sm text-[var(--pmuted)] transition-colors hover:bg-[var(--pcardhover)] hover:text-[var(--ptext)] md:min-h-10 ${
        compact ? "w-11 justify-center md:w-10" : "w-full px-3"
      } ${className}`}
    >
      {light ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
      {!compact && <span>{light ? "Tema oscuro" : "Tema claro"}</span>}
    </button>
  );
}
