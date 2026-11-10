import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const pages = [
  ['/', 'home'],
  ['/work/', 'work'],
  ['/meter/', 'meter'],
  ['/meow/', 'gallery'],
];

const browser = await chromium.launch();

for (const [route, name] of pages) {
  for (const [label, viewport] of [
    ['desktop', { width: 1440, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    // walk down the page so lazy images and reveals all trigger
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += Math.round(viewport.height * 0.7)) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => undefined)),
      );
    });
    await page.waitForTimeout(700);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `shots/${name}-${label}.png`,
      fullPage: label === 'desktop',
    });
    await page.close();
  }
}

await browser.close();
console.log('done');
