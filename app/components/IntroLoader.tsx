"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Wordmark from "./Wordmark";

/*
  Intro del sitio público: "Vanttage." se dibuja una vez y la capa se desvanece (≈2.2 s en total).
  - Solo la primera visita de la sesión (sessionStorage "vt-intro").
  - Nunca en /portal/**. No se muestra con prefers-reduced-motion (CSS).
  - Se renderiza en SSR para estar desde el primer frame; un script mínimo marca <html> con
    .vt-intro-skip si ya se vio en la sesión, y el CSS la oculta antes de pintar.
  - No bloquea: el contenido sigue debajo; clic o Esc la saltan.
*/
const KEY = "vt-intro";
const SKIP_SCRIPT = `try{if(sessionStorage.getItem('${KEY}'))document.documentElement.classList.add('vt-intro-skip')}catch(e){}`;
const CSS = `
#vt-intro{ position:fixed; inset:0; z-index:9999; display:flex; align-items:center; justify-content:center; background:#06060C; transition: opacity .4s ease, transform .4s ease; }
#vt-intro.vt-out{ opacity:0; transform: translateY(-2%); pointer-events:none; }
.vt-intro-skip #vt-intro{ display:none; }
@media (prefers-reduced-motion: reduce){ #vt-intro{ display:none; } }
`;

export default function IntroLoader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"show" | "out" | "gone">("show");

  useEffect(() => {
    if (pathname?.startsWith("/portal")) return;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (root.classList.contains("vt-intro-skip") || reduce) {
      const t = setTimeout(() => setPhase("gone"), 0);
      return () => clearTimeout(t);
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* almacenamiento bloqueado: la intro puede repetirse, no es grave */
    }
    const salir = () => setPhase((p) => (p === "show" ? "out" : p));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") salir();
    };
    window.addEventListener("keydown", onKey);
    const t1 = setTimeout(salir, 1800);
    return () => {
      clearTimeout(t1);
      window.removeEventListener("keydown", onKey);
    };
    // Solo en la carga inicial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "out") return;
    const t = setTimeout(() => setPhase("gone"), 420);
    return () => clearTimeout(t);
  }, [phase]);

  if (pathname?.startsWith("/portal") || phase === "gone") return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }} suppressHydrationWarning />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div id="vt-intro" aria-hidden className={phase === "out" ? "vt-out" : ""} onClick={() => setPhase("out")}>
        <Wordmark mode="once" forceDark className="w-[min(78vw,720px)]" />
      </div>
    </>
  );
}
