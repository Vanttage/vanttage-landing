"use client";

/* Video de fondo en bucle, sin sonido.
   - Muestra el póster hasta que el video puede reproducirse.
   - No reproduce si el usuario pide menos movimiento o activa ahorro de datos.
   - Se pausa cuando sale de pantalla para no gastar batería. */

import { useEffect, useRef } from "react";

type Props = {
  /** Ruta base sin extensión, p. ej. "/media/video/hero-code" */
  src: string;
  className?: string;
  /** En sliders: solo el slide activo se reproduce (los demás ni se descargan) */
  active?: boolean;
};

export default function BgVideo({ src, className = "", active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;
    // Con preload="none" el video no se descarga hasta que llamamos play()
    if (reduce || saveData) return;
    if (!active) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [active]);

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={`${src}-poster.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      tabIndex={-1}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
