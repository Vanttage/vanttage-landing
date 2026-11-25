"use client";

import { useReducedMotion } from "framer-motion";
import { WORDMARK_LETTERS, WORDMARK_TECH, WORDMARK_VIEWBOX } from "./wordmarkPaths";

/*
  Componente compartido (login del portal e IntroLoader del sitio).
  "Vanttage." con contornos reales de DM Sans 900 (ver wordmarkPaths.ts), animado en bucle tipo
  Lottie con SVG + CSS: cada letra dibuja su trazo (pathLength=1, escalonado) → se rellena →
  pausa → el relleno se va y el trazo se borra mientras un destello violeta lo recorre → repite.
  Ciclo de 7 s. mode="once": se dibuja y rellena una sola vez (~1.7 s), para la intro.
  Con movimiento reducido: palabra rellena y estática.
*/
const CYCLE = 7;
/* Cada contorno de un glifo (la "g" tiene varios) se anima por separado y a la vez */
const LETTERS = WORDMARK_LETTERS.map((l) => ({ ...l, parts: l.d.split(/(?=M)/).filter(Boolean) }));
const STAGGER = 0.12;
const STAGGER_ONCE = 0.05;

const CSS = `
.wm{ --wm-fill:#ffffff; --wm-accent:#c4b5fd; --wm-glow:#a78bfa; }
:root[data-ptheme="light"] .wm{ --wm-fill:#0A0F1F; --wm-accent:#6d28d9; --wm-glow:#7c3aed; }
.wm.wm-dark, :root[data-ptheme="light"] .wm.wm-dark{ --wm-fill:#ffffff; --wm-accent:#c4b5fd; --wm-glow:#a78bfa; }
.wm-f{ fill:var(--wm-fill); }
.wm-l{ fill:none; stroke:var(--wm-fill); stroke-width:2.4; stroke-linejoin:round; }
.wm-s{ fill:none; stroke:var(--wm-glow); stroke-width:3.4; stroke-linecap:round; stroke-linejoin:round; }
.wm-t{ fill:var(--wm-accent); }
.wm-anim .wm-f{ fill-opacity:0; animation: wm-fill ${CYCLE}s ease-in-out infinite both; }
.wm-anim .wm-l{ stroke-dasharray:1 1; stroke-dashoffset:1; animation: wm-cycle ${CYCLE}s cubic-bezier(.65,0,.35,1) infinite both; }
.wm-anim .wm-s{ stroke-dasharray:.07 .93; stroke-dashoffset:1; opacity:0; animation: wm-shine ${CYCLE}s linear infinite both; filter: drop-shadow(0 0 5px var(--wm-glow)); }
.wm-anim .wm-t{ animation: wm-tech ${CYCLE}s ease-in-out infinite both; }
.wm-static .wm-l{ display:none; }
.wm-static .wm-s{ display:none; }
@keyframes wm-cycle{
  0%   { stroke-dashoffset:1;  stroke-opacity:1; }
  32%  { stroke-dashoffset:0;  stroke-opacity:1; }
  44%  { stroke-dashoffset:0;  stroke-opacity:.2; }
  74%  { stroke-dashoffset:0;  stroke-opacity:.2; }
  84%  { stroke-dashoffset:0;  stroke-opacity:1; }
  100% { stroke-dashoffset:-1; stroke-opacity:1; }
}
@keyframes wm-fill{ 0%,32%{ fill-opacity:0; } 44%,74%{ fill-opacity:1; } 84%,100%{ fill-opacity:0; } }
@keyframes wm-shine{
  0%   { stroke-dashoffset:1;   opacity:0; }
  6%   { opacity:.95; }
  32%  { stroke-dashoffset:0;   opacity:.95; }
  40%  { opacity:0; }
  78%  { stroke-dashoffset:0; opacity:0; }
  84%  { opacity:.95; }
  100% { stroke-dashoffset:-1;  opacity:0; }
}
@keyframes wm-tech{ 0%,30%{ opacity:0; } 46%,80%{ opacity:1; } 94%,100%{ opacity:0; } }
.wm-once .wm-l{ stroke-dasharray:1 1; stroke-dashoffset:1; animation: wm-once-l 1.5s cubic-bezier(.65,0,.35,1) both; }
.wm-once .wm-f{ fill-opacity:0; animation: wm-once-f 1.5s ease-out both; }
.wm-once .wm-s{ stroke-dasharray:.07 .93; stroke-dashoffset:1; opacity:0; animation: wm-once-s 1.5s linear both; filter: drop-shadow(0 0 5px var(--wm-glow)); }
.wm-once .wm-t{ animation: wm-once-f 1.5s ease-out both; }
@keyframes wm-once-l{ 0%{ stroke-dashoffset:1; stroke-opacity:1; } 62%{ stroke-dashoffset:0; stroke-opacity:1; } 100%{ stroke-dashoffset:0; stroke-opacity:.15; } }
@keyframes wm-once-f{ 0%,50%{ fill-opacity:0; opacity:0; } 100%{ fill-opacity:1; opacity:1; } }
@keyframes wm-once-s{ 0%{ stroke-dashoffset:1; opacity:0; } 10%{ opacity:.95; } 62%{ stroke-dashoffset:0; opacity:.95; } 80%,100%{ stroke-dashoffset:0; opacity:0; } }
@media (prefers-reduced-motion: reduce){
  .wm-once .wm-l, .wm-once .wm-s{ display:none; }
  .wm-once .wm-f, .wm-once .wm-t{ animation:none; fill-opacity:1; opacity:1; }
  .wm-anim .wm-l{ display:none; }
  .wm-anim .wm-f{ animation:none; fill-opacity:1; }
  .wm-anim .wm-s{ display:none; }
  .wm-anim .wm-t{ animation:none; opacity:1; }
}
`;

export default function Wordmark({ className = "", mode = "loop", forceDark = false }: { className?: string; mode?: "loop" | "once"; forceDark?: boolean }) {
  const reduce = useReducedMotion();
  const { w, h } = WORDMARK_VIEWBOX;

  return (
    <div className={`wm ${forceDark ? "wm-dark" : ""} ${reduce ? "wm-static" : mode === "once" ? "wm-once" : "wm-anim"} ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <svg role="img" aria-label="Vanttage Tech" viewBox={`0 0 ${w} ${h}`} className="block h-auto w-full overflow-visible">
        {LETTERS.map((l, i) => (
          <g key={i}>
            {/* Relleno de la letra completa (respeta los huecos con la regla nonzero del glifo) */}
            <path d={l.d} className="wm-f" style={{ animationDelay: `${i * (mode === "once" ? STAGGER_ONCE : STAGGER)}s` }} />
            {l.parts.map((d, j) => (
              <path key={j} d={d} pathLength={1} className="wm-l" style={{ animationDelay: `${i * (mode === "once" ? STAGGER_ONCE : STAGGER)}s` }} />
            ))}
            {l.parts.map((d, j) => (
              <path key={`s${j}`} d={d} pathLength={1} className="wm-s" style={{ animationDelay: `${i * (mode === "once" ? STAGGER_ONCE : STAGGER)}s` }} />
            ))}
          </g>
        ))}
        {WORDMARK_TECH.map((l, i) => (
          <path key={`t${i}`} d={l.d} className="wm-t" />
        ))}
      </svg>
    </div>
  );
}
