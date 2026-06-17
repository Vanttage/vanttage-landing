import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";

const W = 1200, H = 630;

// Logo embebido como base64 para que renderice en el SVG
const logoB64 = readFileSync("public/logo/logo.png").toString("base64");

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#061729"/>
      <stop offset="55%" stop-color="#0A2540"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="violet" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1020" cy="120" r="340" fill="url(#glow)"/>
  <circle cx="120" cy="560" r="280" fill="url(#glow)"/>

  <!-- Marca -->
  <image x="80" y="70" width="84" height="84" xlink:href="data:image/png;base64,${logoB64}"/>
  <text x="178" y="128" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#ffffff">Vanttage</text>

  <!-- Eyebrow -->
  <text x="82" y="250" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" letter-spacing="4" fill="#a78bfa">SOFTWARE BOUTIQUE · CARTAGENA, COLOMBIA</text>

  <!-- Headline -->
  <text x="80" y="345" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="#ffffff">Tu página web,</text>
  <text x="80" y="430" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="800" fill="url(#violet)">tu mejor vendedor.</text>

  <!-- Subtítulo -->
  <text x="82" y="495" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="500" fill="#cbd5e1">Páginas web · Tiendas online · Software a la medida</text>

  <!-- Footer -->
  <rect x="80" y="545" width="14" height="14" rx="3" fill="#a78bfa"/>
  <text x="104" y="558" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" fill="#ffffff">vanttagetech.com</text>
  <text x="${W - 80}" y="558" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#94a3b8">Cotización gratis · Respuesta en 24h</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile("public/og.png");
// JPG también (algunos clientes lo prefieren y pesa menos)
await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile("public/og.jpg");

const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";
console.log("public/og.png ->", kb("public/og.png"));
console.log("public/og.jpg ->", kb("public/og.jpg"));
