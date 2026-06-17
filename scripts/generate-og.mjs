import sharp from "sharp";
import { readFileSync, statSync } from "node:fs";

const W = 1200, H = 630;
const logoB64 = readFileSync("public/logo/logo.png").toString("base64");

/* ---------- 1) Fondo + texto (estilo hero) ---------- */
const bg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06060C"/>
      <stop offset="55%" stop-color="#0A0A18"/>
      <stop offset="100%" stop-color="#0f0a1f"/>
    </linearGradient>
    <linearGradient id="violet" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="55%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="170" cy="120" r="340" fill="url(#glow)"/>
  <circle cx="1000" cy="540" r="320" fill="url(#glow)"/>

  <!-- Marca -->
  <image x="78" y="64" width="76" height="76" xlink:href="data:image/png;base64,${logoB64}"/>
  <text x="166" y="116" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="700" fill="#ffffff">Vanttage</text>

  <!-- Eyebrow -->
  <text x="80" y="248" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" letter-spacing="3.5" fill="#a78bfa">DISEÑO WEB PROFESIONAL · CARTAGENA, COLOMBIA</text>

  <!-- Headline -->
  <text x="78" y="338" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="#ffffff">Tu página web,</text>
  <text x="78" y="412" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="800" fill="url(#violet)">tu mejor vendedor.</text>

  <!-- Subtítulo -->
  <text x="80" y="470" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="500" fill="#cbd5e1">Páginas web · Tiendas online · Software a la medida</text>

  <!-- Footer -->
  <rect x="80" y="556" width="13" height="13" rx="3" fill="#a78bfa"/>
  <text x="102" y="568" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff">vanttagetech.com</text>
  <text x="80" y="600" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#94a3b8">Cotización gratis · Respuesta en 24h</text>
</svg>`;

/* ---------- 2) Foto del equipo con esquinas redondeadas ---------- */
const PW = 340, PH = 460, PX = 790, PY = 88;
const mask = `<svg width="${PW}" height="${PH}"><rect width="${PW}" height="${PH}" rx="28" ry="28" fill="#fff"/></svg>`;
const photo = await sharp("public/founders/founders.webp")
  .resize(PW, PH, { fit: "cover", position: "top" })
  .composite([{ input: Buffer.from(mask), blend: "dest-in" }])
  .png()
  .toBuffer();

/* borde sutil + degradado inferior sobre la foto, y chips flotantes (como el hero) */
function chip(x, y, w, label) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="${w}" height="46" rx="23"
            fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.18)" stroke-width="1"/>
      <rect x="${x + 20}" y="${y + 18}" width="10" height="10" rx="2" transform="rotate(45 ${x + 25} ${y + 23})" fill="#a78bfa"/>
      <text x="${x + 42}" y="${y + 30}" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" fill="#ffffff">${label}</text>
    </g>`;
}
const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="28" ry="28"
        fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
  ${chip(880, 120, 250, "Diseño a tu medida")}
  ${chip(690, 330, 210, "Rápida y segura")}
  ${chip(740, 560, 180, "Lista en días")}
</svg>`;

/* ---------- 3) Composición final ---------- */
await sharp(Buffer.from(bg))
  .composite([
    { input: photo, top: PY, left: PX },
    { input: Buffer.from(overlay), top: 0, left: 0 },
  ])
  .png({ quality: 90 })
  .toFile("public/og.png");

await sharp("public/og.png").jpeg({ quality: 88 }).toFile("public/og.jpg");

const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";
console.log("public/og.png ->", kb("public/og.png"));
console.log("public/og.jpg ->", kb("public/og.jpg"));
