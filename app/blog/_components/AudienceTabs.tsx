"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

/* Pestañas accesibles (patrón WAI-ARIA): flechas, Inicio y Fin para moverse,
   foco itinerante y paneles enlazados con aria-controls / aria-labelledby. */
export default function AudienceTabs({ tabs }: { tabs: { label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  function onKey(e: KeyboardEvent<HTMLButtonElement>) {
    const last = tabs.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Elige tu caso"
        className="flex gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      >
        {tabs.map((t, i) => (
          <button
            key={t.label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${base}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKey}
            className={`min-h-11 flex-1 rounded-full px-4 text-[15px] font-medium transition-colors ${
              active === i ? "bg-white text-[#06060C]" : "text-zinc-300 hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          id={`${base}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="mt-10 rounded-lg outline-offset-8"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
