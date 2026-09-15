import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
const root = new URL('../public/assets/generated/', import.meta.url).pathname;
const expected = { cards: '0 0 1024 1024', biome: null, ui: null };
let failed = false;
for (const [folder, viewBox] of Object.entries(expected)) for (const name of await readdir(join(root, folder))) { const file = join(root, folder, name); const svg = await readFile(file, 'utf8'); const size = (await stat(file)).size; const requiredViewBox = folder === 'biome' && ['biome-background.svg', 'ground.svg'].includes(name) ? '0 0 2048 1152' : viewBox; const unsafe = /<script|foreignObject|<iframe|(?:href|xlink:href)=["'](?:https?:|javascript:)|data:image/i.test(svg); if (!svg.startsWith('<svg') || unsafe || size > 100_000 || (requiredViewBox && !svg.includes(`viewBox="${requiredViewBox}"`))) { console.error(`Invalid SVG: ${folder}/${name}`); failed = true; } }
if (failed) process.exit(1); console.log('Assets valid.');
