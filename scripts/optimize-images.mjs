import sharp from "sharp";
import { statSync } from "node:fs";

const kb = (p) => (statSync(p).size / 1024).toFixed(1) + " KB";

async function run() {
  // 1) Hero: founders.png (1.74MB) -> founders.webp (~920px ancho, retina del contenedor de 460px)
  const fIn = "public/founders/founders.png";
  const fOut = "public/founders/founders.webp";
  await sharp(fIn)
    .resize({ width: 920, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(fOut);
  console.log(`founders: ${kb(fIn)} -> ${kb(fOut)}  (${fOut})`);

  // 2) Logo: logo.svg (438KB, raster embebido) -> logo.png 256px transparente (se muestra a 44px)
  const lIn = "public/logo/logo.svg";
  const lOut = "public/logo/logo.png";
  await sharp(lIn, { density: 300 })
    .resize({ width: 256, height: 256, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(lOut);
  console.log(`logo:     ${kb(lIn)} -> ${kb(lOut)}  (${lOut})`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
