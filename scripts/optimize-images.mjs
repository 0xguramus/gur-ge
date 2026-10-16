// Build-time: creates responsive WebP variants of public/images/* in public/_img/ (git-ignored).
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
const SRC = 'public/images', OUT = 'public/_img', WIDTHS = [480, 960, 1440];
await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
for (const f of files) {
  const base = f.replace(/\.[^.]+$/, ''), src = path.join(SRC, f);
  const meta = await sharp(src).metadata();
  for (const w of WIDTHS) {
    const out = path.join(OUT, `${base}-${w}.webp`);
    try { if ((await stat(out)).mtimeMs > (await stat(src)).mtimeMs) continue; } catch {}
    await sharp(src).resize({ width: Math.min(w, meta.width || w), withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
  }
}
console.log(`optimize-images: ${files.length} file(s)`);
