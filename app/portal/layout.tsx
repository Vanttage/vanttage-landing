import type { Metadata } from "next";
import ThemedToaster from "./_components/ThemedToaster";

export const metadata: Metadata = {
  title: "Portal Interno · Vanttage",
  robots: { index: false, follow: false },
};

/* Fija el tema ANTES de pintar para evitar el parpadeo (FOUC) en la primera carga */
const THEME_SCRIPT = `try{var t=localStorage.getItem('ptheme');document.documentElement.setAttribute('data-ptheme',t==='light'?'light':'dark');}catch(e){}`;

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--pbg)] text-[var(--ptext)]">
      <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      {children}
      <ThemedToaster />
    </div>
  );
}
