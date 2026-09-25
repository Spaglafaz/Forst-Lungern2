// Erzeugt WebP-Varianten der Fotos für den statischen Export (GitHub Pages hat keine Bildoptimierung).
// Aufruf: npm run images   → public/assets/photos/<breite>/<name>.webp
import sharp from 'sharp';
import { mkdirSync, readdirSync } from 'node:fs';
import { join, parse } from 'node:path';

export const WIDTHS = [640, 1280, 1920];
const dir = 'public/assets/photos';

for (const file of readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const { name } = parse(file);
  const { width } = await sharp(join(dir, file)).metadata();
  for (const w of WIDTHS) {
    mkdirSync(join(dir, String(w)), { recursive: true });
    await sharp(join(dir, file))
      .resize({ width: Math.min(w, width), withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(join(dir, String(w), name + '.webp'));
  }
  console.log('✓', file);
}
