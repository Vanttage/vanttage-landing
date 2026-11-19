"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

/* Tabla de contenido: resalta la sección que se está leyendo. */
export default function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const onScroll = () => {
      // Activa el último encabezado que ya pasó el 30% superior de la pantalla
      const line = window.innerHeight * 0.3;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="En este artículo">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">En este artículo</p>
      <ol className="mt-4 border-l border-white/10">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex min-h-11 items-center border-l py-2 pl-4 text-sm leading-snug transition-colors ${
                  on ? "border-violet-300 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
