"use client";

import { motion } from "framer-motion";

const items = [
  "Northwind", "Helix", "Parallax", "Atlas CRM", "Cadence",
  "Luminary", "Blueprint", "Monolith", "Vector", "Axiom",
];

function Sep() {
  return <span className="text-violet-500/50 select-none">✦</span>;
}

export default function Marquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/[0.06] bg-[#0A0A14] py-10">
      {/* Label */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-white/15" />
        <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">
          Empresas que confían en nosotros
        </p>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-white/15" />
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#0A0A14] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0A0A14] to-transparent z-10" />

      <motion.div
        className="flex items-center gap-14 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 35, repeat: Infinity }}
      >
        {loop.map((name, i) => (
          <div key={i} className="flex items-center gap-14">
            <span className="text-2xl font-semibold tracking-tight text-zinc-400 hover:text-zinc-200 transition-colors duration-300 cursor-default">
              {name}
            </span>
            <Sep />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
