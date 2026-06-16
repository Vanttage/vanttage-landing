import sharp from "sharp";
import { statSync } from "node:fs";

const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";
const SRC = "/tmp/logo_src.svg";

async function run() {
  // Favicon/icon moderno (transparente) referenciado en layout
  await sharp(SRC, { density: 300 })
    .resize({ width: 512, height: 512, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile("public/icon.png");
  console.log("icon.png            ->", kb("public/icon.png"));

  // Apple touch icon: iOS no soporta transparencia -> fondo oscuro de marca
  await sharp(SRC, { density: 300 })
    .resize({ width: 180, height: 180, fit: "contain", background: { r: 6, g: 6, b: 12, alpha: 1 } })
    .flatten({ background: { r: 6, g: 6, b: 12 } })
    .png({ compressionLevel: 9 })
    .toFile("public/apple-touch-icon.png");
  console.log("apple-touch-icon.png ->", kb("public/apple-touch-icon.png"));
}

run().catch((e) => { console.error(e); process.exit(1); });
