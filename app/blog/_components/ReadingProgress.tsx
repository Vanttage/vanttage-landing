"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

/* Barra fina de progreso de lectura, medida sobre el cuerpo del artículo.
   Es decorativa (aria-hidden). Con reduced motion avanza sin suavizado. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 220, damping: 32, restDelta: 0.001 });

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const value = total > 0 ? (window.innerHeight * 0.4 - r.top) / total : 1;
      progress.set(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [targetId, progress]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-violet-300"
      style={{ scaleX: reduce ? progress : smooth }}
    />
  );
}
