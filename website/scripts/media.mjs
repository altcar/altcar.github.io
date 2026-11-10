/**
 * One-off media prep: hover previews + social image.
 * Run with: node scripts/media.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const previews = [
  ['work/vapedrop.jpg', 'vapedrop.webp'],
  ['work/ukseds.jpg', 'ukseds.webp'],
];

await mkdir('public/img', { recursive: true });

for (const [source, name] of previews) {
  await sharp(`src/assets/${source}`)
    .resize(1000, 750, { fit: 'cover', position: 'attention' })
    .webp({ quality: 76 })
    .toFile(`public/img/${name}`);
  console.log('wrote public/img/' + name);
}

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b0a18"/>
      <stop offset="0.55" stop-color="#07070d"/>
      <stop offset="1" stop-color="#050507"/>
    </linearGradient>
    <radialGradient id="a" cx="0.1" cy="0.0" r="0.85">
      <stop offset="0" stop-color="#6f5cff" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#6f5cff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="b" cx="1.0" cy="0.45" r="0.6">
      <stop offset="0" stop-color="#5ee7c6" stop-opacity="0.32"/>
      <stop offset="1" stop-color="#5ee7c6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="ink" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.55" stop-color="#d7d1ff"/>
      <stop offset="1" stop-color="#9ff5df"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>

  <circle cx="1050" cy="120" r="190" fill="none" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5"/>
  <circle cx="1050" cy="120" r="120" fill="none" stroke="#9b8cff" stroke-opacity="0.25" stroke-width="1.5"/>
  <circle cx="1050" cy="120" r="18" fill="url(#ink)" opacity="0.9"/>

  <text x="80" y="250" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" letter-spacing="8" fill="#918fa3">ROBOTICS · CONTROL · SOFTWARE</text>
  <text x="74" y="400" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="128" font-weight="700" letter-spacing="-6" fill="url(#ink)">Shalev Lau</text>
  <text x="80" y="486" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="32" fill="#c9c7d6">Bristol · co-founder at METER · BRL</text>
  <text x="80" y="566" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="25" fill="#6f6d82">shalev.eu.org</text>
</svg>`;

await sharp(Buffer.from(og)).png({ quality: 92 }).toFile('public/og.png');
console.log('wrote public/og.png');
