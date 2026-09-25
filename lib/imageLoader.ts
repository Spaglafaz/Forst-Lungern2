// Bild-Loader für den statischen Export: wählt die passende vorab erzeugte WebP-Variante
// (siehe scripts/optimize-images.mjs). Andere Bilder werden unverändert ausgeliefert.
const WIDTHS = [640, 1280, 1920];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const m = src.match(/^(.*\/assets\/photos\/)([^/]+)\.(jpe?g|png)$/i);
  if (!m) return src + (src.includes('?') ? '&' : '?') + 'w=' + width;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${m[1]}${w}/${m[2]}.webp`;
}
