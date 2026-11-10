/**
 * Turns captured site screenshots into portfolio assets.
 * Run with: node scripts/project-shots.mjs
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const shots = [
  ['wizzibiz', 'wizzibiz'],
  ['gcf', 'gcf'],
  ['rask', 'rask'],
  ['ats', 'ats'],
  ['bus', 'bus'],
  ['learntk', 'learntk'],
  ['ttsky', 'ttsky'],
];

await mkdir('src/assets/projects', { recursive: true });

for (const [source, name] of shots) {
  await sharp(`shots/sites/${source}.png`)
    .resize(1600, 1000, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(`src/assets/projects/${name}.webp`);
  console.log('wrote src/assets/projects/' + name + '.webp');
}
