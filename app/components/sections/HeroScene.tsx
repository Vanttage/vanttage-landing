"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

const COUNT = 110;
const W = 14, H = 8, D = 4;
const LINK_D2 = 2.8 * 2.8;
const MAX_SEGS = 600;

function Net() {
  const base = useMemo(() => {
    const a = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      a[i * 3]     = (Math.random() - 0.5) * W;
      a[i * 3 + 1] = (Math.random() - 0.5) * H;
      a[i * 3 + 2] = (Math.random() - 0.5) * D;
    }
    return a;
  }, []);

  const vel = useMemo(() => {
    const v = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      v[i * 3]     = (Math.random() - 0.5) * 0.004;
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return v;
  }, []);

  const ptsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(Float32Array.from(base), 3));
    return geo;
  }, [base]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(MAX_SEGS * 6), 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const mouse = useRef([0, 0]);

  useFrame(({ mouse: m }) => {
    mouse.current[0] += (m.x * 1.5 - mouse.current[0]) * 0.05;
    mouse.current[1] += (m.y * 0.8 - mouse.current[1]) * 0.05;

    // Step physics on base positions
    for (let i = 0; i < COUNT; i++) {
      base[i * 3]     += vel[i * 3];
      base[i * 3 + 1] += vel[i * 3 + 1];

      if (base[i * 3]     >  W / 2) base[i * 3]     = -W / 2;
      if (base[i * 3]     < -W / 2) base[i * 3]     =  W / 2;
      if (base[i * 3 + 1] >  H / 2) base[i * 3 + 1] = -H / 2;
      if (base[i * 3 + 1] < -H / 2) base[i * 3 + 1] =  H / 2;
    }

    // Write rendered positions = base + mouse parallax
    const p = ptsGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      p[i * 3]     = base[i * 3]     + mouse.current[0];
      p[i * 3 + 1] = base[i * 3 + 1] + mouse.current[1];
      p[i * 3 + 2] = base[i * 3 + 2];
    }
    ptsGeo.attributes.position.needsUpdate = true;

    // Build connection lines
    const lp = lineGeo.attributes.position.array as Float32Array;
    let n = 0;
    for (let i = 0; i < COUNT && n < MAX_SEGS; i++) {
      for (let j = i + 1; j < COUNT && n < MAX_SEGS; j++) {
        const dx = p[i * 3] - p[j * 3];
        const dy = p[i * 3 + 1] - p[j * 3 + 1];
        const dz = p[i * 3 + 2] - p[j * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < LINK_D2) {
          lp[n * 6]     = p[i * 3];     lp[n * 6 + 1] = p[i * 3 + 1]; lp[n * 6 + 2] = p[i * 3 + 2];
          lp[n * 6 + 3] = p[j * 3];     lp[n * 6 + 4] = p[j * 3 + 1]; lp[n * 6 + 5] = p[j * 3 + 2];
          n++;
        }
      }
    }
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.setDrawRange(0, n * 2);
  });

  return (
    <>
      <points geometry={ptsGeo}>
        <pointsMaterial size={0.05} color="#a78bfa" transparent opacity={0.5} sizeAttenuation />
      </points>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#8b5cf6" transparent opacity={0.12} />
      </lineSegments>
    </>
  );
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // 'always' mientras el hero es visible; 'never' cuando sale de pantalla o
  // la pestaña pasa a segundo plano. Evita gastar CPU/batería sin necesidad.
  const [frameloop, setFrameloop] = useState<"always" | "never">("never");
  // Si el usuario pidió menos movimiento, no montamos el canvas.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onMq = () => setReduced(mq.matches);
    mq.addEventListener("change", onMq);

    const el = wrapRef.current;
    let visible = false;
    const update = () =>
      setFrameloop(visible && !document.hidden ? "always" : "never");

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; update(); },
      { threshold: 0.01 },
    );
    if (el) io.observe(el);
    document.addEventListener("visibilitychange", update);

    return () => {
      mq.removeEventListener("change", onMq);
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  if (reduced) return null;

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop={frameloop}
      >
        <Net />
      </Canvas>
    </div>
  );
}
