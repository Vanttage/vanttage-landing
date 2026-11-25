import type { Metadata } from "next";
import ThemedToaster from "./_components/ThemedToaster";
import { ThemeSync } from "./_components/ThemeToggle";

export const metadata: Metadata = {
  title: "Portal Interno · Vanttage",
  robots: { index: false, follow: false },
};

/* Fija el tema ANTES de pintar para evitar el parpadeo (FOUC) en la primera carga */
const THEME_SCRIPT = `try{var t=localStorage.getItem('ptheme');document.documentElement.setAttribute('data-ptheme',t==='light'?'light':'dark');}catch(e){}`;

/*
  Tokens propios del portal. Las variables base (--pbg, --ptext, etc.) viven en globals.css;
  aquí solo se ajustan dentro de .portal-root (contraste AA) y se añaden las nuevas:
  acento, botón primario, superficies elevadas y tonos de estado para ambos temas.
*/
const PORTAL_TOKENS = `
.portal-root{
  color-scheme: dark;
  --pmuted: rgba(255,255,255,0.7);
  --pfaint: rgba(255,255,255,0.56);
  --pcard: rgba(255,255,255,0.025);
  --pcardhover: rgba(255,255,255,0.055);
  --pinput: rgba(255,255,255,0.04);
  --pborder: rgba(255,255,255,0.1);
  --pborder-strong: rgba(255,255,255,0.18);
  --pelev: #0e0e17;
  --pcanvas: #0b0b12;
  --pskeleton: rgba(255,255,255,0.06);
  --paccent: #c4b5fd;
  --paccent-soft: rgba(167,139,250,0.13);
  --paccent-line: rgba(167,139,250,0.45);
  --pbtn-bg: #ffffff;
  --pbtn-fg: #06060c;
  --pbtn-hover: #e9e7f3;
  --pfocus: #a78bfa;
  --plogin-panel: #06060C;
  --ptopo: #a78bfa;
  --pt-neutral: #cbd5e1;
  --pt-blue: #93c5fd;
  --pt-violet: #c4b5fd;
  --pt-green: #6ee7b7;
  --pt-amber: #fcd34d;
  --pt-red: #fca5a5;
  --pt-pink: #f9a8d4;
}
:root[data-ptheme="light"] .portal-root{
  color-scheme: light;
  --pbg: #f5f5f7;
  --psidebar: #ffffff;
  --ptext: #0f0f1a;
  --pmuted: #3f4654;
  --pfaint: #5a6170;
  --pcard: #ffffff;
  --pcardhover: #f2f1f6;
  --pinput: #ffffff;
  --pchip: rgba(15,15,26,0.06);
  --pborder: rgba(15,15,26,0.1);
  --pborder-strong: rgba(15,15,26,0.2);
  --pelev: #ffffff;
  --pcanvas: #e9e9ef;
  --pskeleton: rgba(15,15,26,0.07);
  --paccent: #6d28d9;
  --paccent-soft: rgba(124,58,237,0.09);
  --paccent-line: rgba(124,58,237,0.4);
  --pbtn-bg: #0f0f1a;
  --pbtn-fg: #ffffff;
  --pbtn-hover: #2a2a3a;
  --pfocus: #7c3aed;
  --plogin-panel: #eeedf3;
  --ptopo: #7c3aed;
  --pt-neutral: #475569;
  --pt-blue: #1d4ed8;
  --pt-violet: #6d28d9;
  --pt-green: #047857;
  --pt-amber: #b45309;
  --pt-red: #b91c1c;
  --pt-pink: #be185d;
}
.portal-root :focus-visible{ outline: 2px solid var(--pfocus); outline-offset: 2px; }
.portal-root ::selection{ background: rgba(139,92,246,0.3); color: inherit; }
.portal-root option{ background: var(--pelev); color: var(--ptext); }
@keyframes pshimmer{ 0%{opacity:.55} 50%{opacity:1} 100%{opacity:.55} }
.portal-skeleton{ background: var(--pskeleton); border-radius: 0.5rem; animation: pshimmer 1.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce){ .portal-skeleton{ animation: none; } }
@media print{
  .portal-root{ background:#ffffff !important; color:#0a2540 !important; min-height:0 !important; }
}
`;

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="portal-root min-h-screen bg-[var(--pbg)] text-[var(--ptext)]">
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      <style dangerouslySetInnerHTML={{ __html: PORTAL_TOKENS }} />
      <ThemeSync />
      {children}
      <ThemedToaster />
    </div>
  );
}
