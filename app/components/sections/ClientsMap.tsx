"use client";

/* Croquis de Colombia en puntos con las ciudades donde están nuestros clientes.
   La geometría viene precalculada en colombiaMap.ts (Natural Earth, dominio público). */

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import {
  CITY_POS,
  COLOMBIA_DOTS,
  COLOMBIA_OUTLINE,
  MAP_H,
  MAP_W,
  NEIGHBORS_OUTLINE,
} from "./colombiaMap";

type CityKey = keyof typeof CITY_POS;

const cities: {
  key: CityKey;
  name: string;
  region: string;
  clients: string[];
  labelSide: "left" | "right";
}[] = [
  {
    key: "cartagena",
    name: "Cartagena",
    region: "Bolívar · nuestra casa",
    clients: [
      "SOTEC",
      "ControlOne",
      "DAGAR Soluciones",
      "Transportes UP",
      "ALZAK Foundation",
      "Daz Ambiental",
      "EcoTruck",
      "Club Hunk",
    ],
    labelSide: "left",
  },
  {
    key: "barranquilla",
    name: "Barranquilla",
    region: "Atlántico",
    clients: ["GOYN Barranquilla"],
    labelSide: "right",
  },
  {
    key: "bogota",
    name: "Bogotá",
    region: "Bogotá D.C.",
    clients: ["R&R Kelab", "Co-Workers Cloud"],
    labelSide: "right",
  },
  {
    key: "nilo",
    name: "Nilo",
    region: "Cundinamarca",
    clients: ["Andreas Adventures"],
    labelSide: "left",
  },
  {
    key: "castilla",
    name: "Castilla La Nueva",
    region: "Meta",
    clients: ["Andreas Adventures"],
    labelSide: "right",
  },
];

const HQ = CITY_POS.cartagena;

/** Arco suave desde Cartagena hasta la ciudad */
function arc(to: { x: number; y: number }) {
  const mx = (HQ.x + to.x) / 2;
  const my = (HQ.y + to.y) / 2;
  const dx = to.x - HQ.x;
  const dy = to.y - HQ.y;
  const bend = 0.18;
  return `M${HQ.x} ${HQ.y} Q${mx - dy * bend} ${my + dx * bend} ${to.x} ${to.y}`;
}

export default function ClientsMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<CityKey | null>(null);

  const total = new Set(cities.flatMap((c) => c.clients)).size;

  return (
    <section
      id="clientes"
      aria-labelledby="clientes-title"
      className="relative overflow-hidden bg-[#06060C] px-6 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Texto + lista */}
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-violet-300">
            Clientes
          </p>
          <h2
            id="clientes-title"
            className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
          >
            Desde Cartagena, para todo el país
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400">
            Trabajamos con {total} empresas en {cities.length} municipios de
            Colombia, y con una firma en Estados Unidos. Si estás en otro país
            trabajamos igual, por videollamada y WhatsApp, en tu horario.
          </p>

          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {cities.map((c) => (
              <li
                key={c.key}
                onMouseEnter={() => setHover(c.key)}
                onMouseLeave={() => setHover(null)}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <div className="shrink-0">
                  <p
                    className={`font-medium transition-colors ${
                      hover === c.key ? "text-violet-200" : "text-white"
                    }`}
                  >
                    {c.name}
                  </p>
                  <p className="text-xs text-zinc-500">{c.region}</p>
                </div>
                <p className="text-right text-sm leading-relaxed text-zinc-400">
                  {c.clients.join(", ")}
                </p>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-6 py-4">
              <div className="shrink-0">
                <p className="font-medium text-white">Estados Unidos</p>
                <p className="text-xs text-zinc-500">Trabajo remoto</p>
              </div>
              <p className="text-right text-sm text-zinc-400">
                Los Gestores · GIS Migration
              </p>
            </li>
          </ul>
        </div>

        {/* Mapa */}
        <div ref={ref} className="relative order-first mx-auto w-full max-w-[520px] lg:order-none">
          <svg
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Mapa de Colombia con las ciudades donde tenemos clientes: Cartagena, Barranquilla, Bogotá, Nilo y Castilla La Nueva."
          >
            {/* Países vecinos, apenas visibles */}
            <path
              d={NEIGHBORS_OUTLINE}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
            {/* Colombia */}
            <path
              d={COLOMBIA_OUTLINE}
              fill="rgba(124,58,237,0.04)"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth={1}
            />
            <path
              d={COLOMBIA_DOTS}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={2.6}
              strokeLinecap="round"
            />

            {/* Arcos desde Cartagena */}
            {cities
              .filter((c) => c.key !== "cartagena")
              .map((c, i) => (
                <motion.path
                  key={c.key}
                  d={arc(CITY_POS[c.key])}
                  fill="none"
                  stroke={hover === c.key ? "#c4b5fd" : "#8b5cf6"}
                  strokeWidth={hover === c.key ? 1.8 : 1.2}
                  strokeOpacity={0.8}
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={inView || reduce ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.2, ease: "easeInOut" }}
                />
              ))}

            {/* Ciudades */}
            {cities.map((c, i) => {
              const p = CITY_POS[c.key];
              const big = c.key === "cartagena";
              const active = hover === c.key;
              const labelX = c.labelSide === "left" ? p.x - 12 : p.x + 12;
              return (
                <g
                  key={c.key}
                  onMouseEnter={() => setHover(c.key)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-default"
                >
                  {!reduce && (
                    <motion.circle
                      cx={p.x}
                      cy={p.y}
                      r={big ? 10 : 6}
                      fill="none"
                      stroke="#a78bfa"
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
                      style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={big ? 6.5 : active ? 5 : 4}
                    fill={big || active ? "#ffffff" : "#a78bfa"}
                    stroke="#06060C"
                    strokeWidth={2}
                  />
                  <text
                    x={labelX}
                    y={p.y + 4}
                    textAnchor={c.labelSide === "left" ? "end" : "start"}
                    className="select-none"
                    fill={active || big ? "#ffffff" : "rgba(255,255,255,0.7)"}
                    fontSize={big ? 15 : 12.5}
                    fontWeight={big ? 600 : 500}
                  >
                    {c.name}
                    {big ? ` · ${c.clients.length}` : ""}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
