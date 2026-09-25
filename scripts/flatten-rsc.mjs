// Next 16 exportiert Prefetch-Segmente verschachtelt (__next.a/b/__PAGE__.txt),
// der Client fragt sie aber flach an (__next.a.b.__PAGE__.txt). Auf statischem Hosting
// (GitHub Pages) legen wir deshalb flache Kopien daneben.
import { copyFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

let count = 0;
function collect(dir, parts, into) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collect(p, [...parts, name], into);
    else into.push({ file: p, flat: [...parts, name].join('.') });
  }
}
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue;
    if (name.startsWith('__next.')) {
      const files = [];
      collect(p, [name], files);
      for (const { file, flat } of files) {
        copyFileSync(file, join(dir, flat));
        count++;
      }
    } else walk(p);
  }
}
walk('out');
console.log(`flatten-rsc: ${count} Segment-Dateien kopiert`);
