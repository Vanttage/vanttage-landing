"use client";

import { MotionConfig } from "framer-motion";

/* Respeta prefers-reduced-motion en todas las animaciones de Framer Motion:
   desactiva transformaciones/desplazamientos y deja solo cambios de opacidad. */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
