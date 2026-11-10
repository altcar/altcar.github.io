/**
 * Social card: a real screenshot of the homepage.
 * Run with the preview server up: node scripts/og.mjs
 */
import { chromium } from 'playwright';
import sharp from 'sharp';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto(base + '/', { waitUntil: 'load' });
await page.waitForTimeout(1800);
const buffer = await page.screenshot({ type: 'png' });
await browser.close();

await sharp(buffer).resize(1200, 630).png({ quality: 90 }).toFile('public/og.png');
console.log('wrote public/og.png');
