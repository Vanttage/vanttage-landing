/*
  Curvas de nivel tenues (misma generación que app/components/SiteBackground.tsx, copiada aquí
  para no tocar ese archivo). Usa la clase .topo-drift de globals.css (quieta con movimiento reducido).
*/
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
    pts.push(`${(cx + Math.cos(a) * r * k).toFixed(1)},${(cy + Math.sin(a) * r * k * 0.8).toFixed(1)}`);
  }
  return "M" + pts.join("L") + "Z";
}

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

export default function TopoBackground({ opacity = 0.6 }: { opacity?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" style={{ opacity }}>
      <svg viewBox="0 0 1600 1100" preserveAspectRatio="xMidYMid slice" className="topo-drift h-full w-full">
        {topoPaths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke="var(--ptopo, #a78bfa)" strokeOpacity={p.o} strokeWidth={1} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
