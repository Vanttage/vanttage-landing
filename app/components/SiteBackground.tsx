"use client";

/* Fondo de curvas de nivel (topografía) para /servicios y el blog.
   Esas páginas tienen fondo transparente y lo dejan ver.
   Solo SVG + CSS; se queda quieto con prefers-reduced-motion (globals.css → .topo-drift). */

import { usePathname } from "next/navigation";

function contour(cx: number, cy: number, r: number, seed: number) {
  const pts: string[] = [];
  const N = 90;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const k =
      1 +
      0.18 * Math.sin(a * 3 + seed) +
      0.1 * Math.sin(a * 5 + seed * 1.7) +
      0.06 * Math.sin(a * 7 + seed * 0.6);
    pts.push(
      `${(cx + Math.cos(a) * r * k).toFixed(1)},${(cy + Math.sin(a) * r * k * 0.8).toFixed(1)}`,
    );
  }
  return "M" + pts.join("L") + "Z";
}

/* Cimas del relieve; cada una con 11 curvas concéntricas irregulares */
const peaks = [
  { x: 260, y: 220, s: 1.2 },
  { x: 1180, y: 640, s: 2.4 },
  { x: 760, y: 980, s: 3.1 },
  { x: 1500, y: 140, s: 0.7 },
];
const topoPaths = peaks.flatMap((p) =>
  Array.from({ length: 11 }, (_, i) => ({
    d: contour(p.x, p.y, 40 + i * 46, p.s + i * 0.15),
    o: 0.1 + (i % 4) * 0.03,
  })),
);

export default function SiteBackground() {
  const pathname = usePathname();
  /* Solo en /servicios y en el blog; el resto del sitio mantiene su fondo negro liso */
  const show = pathname?.startsWith("/servicios") || pathname?.startsWith("/blog");
  if (!show) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <svg
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="topo-drift h-full w-full"
      >
        {topoPaths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill="none"
            stroke="#a78bfa"
            strokeOpacity={p.o}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
