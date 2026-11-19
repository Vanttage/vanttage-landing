import type { ReactNode } from "react";
import { LINK } from "./prose";

/* Enlace externo dentro del texto (fuentes y citas). */
export default function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK}>
      {children}
    </a>
  );
}
