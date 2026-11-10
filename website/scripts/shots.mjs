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
    await page.goto(base + route, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1200);
    await page.evaluate(async () => {
      const height = document.body.scrollHeight;
      for (let y = 0; y < height; y += window.innerHeight * 0.8) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: `shots/${name}-${label}.png`,
      fullPage: label === 'desktop',
      timeout: 30000,
    });
    console.log('shot', name, label);
    await page.close();
  }
}

await browser.close();
