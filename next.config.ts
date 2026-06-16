import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options",    value: "nosniff" },
        { key: "X-Frame-Options",           value: "DENY" },
        { key: "X-XSS-Protection",          value: "1; mode=block" },
        { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
      ],
    },
  ],

  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // Cachear las imágenes ya optimizadas en el edge (31 días) para que no se
    // regeneren en cada visita. Sin esto el optimizador responde MISS/max-age=0
    // y vuelve a generar la imagen del hero (LCP) en cada carga.
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
