"use client";

/* Cifra que cuenta desde 0 cuando entra en pantalla.
   Acepta textos como "+12", "100%", "3+" o "< 24h": anima el número y
   conserva lo que va antes y después. Con reduced motion muestra el valor final. */

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    if (!el || !m || !inView || reduce) return;
    const [, pre, num, post] = m;
    const target = Number(num);
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${pre}${Math.round(v)}${post}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, duration, value]);

  // SSR / sin JS: valor final, para que nunca se vea un 0
  return (
    <span ref={ref} className={className} aria-label={value}>
      {value}
    </span>
  );
}
