"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.2-4.24 9.44-9.45 9.44zm8.03-17.48A11.3 11.3 0 0 0 12.04.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.95 1.52 5.67L.58 23.6l6.02-1.58a11.3 11.3 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.36-11.36 0-3.03-1.18-5.89-3.33-8.03z" />
    </svg>
  );
}

const BTN =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/[0.04] hover:text-white";

/* Copiar enlace y compartir por WhatsApp. El estado se anuncia con aria-live. */
export default function ShareBar({
  url,
  title,
  compact = false,
  className = "",
}: {
  url: string;
  title: string;
  /** Etiquetas cortas para la columna lateral */
  compact?: boolean;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button type="button" onClick={copy} className={BTN}>
        {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
        {copied ? "Enlace copiado" : "Copiar enlace"}
      </button>
      <a href={wa} target="_blank" rel="noopener noreferrer" className={BTN}>
        <WhatsAppIcon />
        {compact ? <span>WhatsApp<span className="sr-only">: compartir el artículo</span></span> : "Compartir por WhatsApp"}
      </a>
      <span className="sr-only" aria-live="polite">
        {copied ? "Enlace copiado al portapapeles" : ""}
      </span>
    </div>
  );
}
