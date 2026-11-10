import { chromium } from 'playwright';

const base = 'http://localhost:4321';
const browser = await chromium.launch();
const errors = [];
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

await page.goto(base + '/', { waitUntil: 'load' });
await page.locator('.menu-toggle').click();
await page.waitForTimeout(200);
const menuOpen = await page.locator('#mobile-nav').isVisible();
await page.keyboard.press('Escape');
await page.locator('.menu-toggle').click();
const menuClosed = await page.locator('#mobile-nav').isHidden();

await page.goto(base + '/meow/', { waitUntil: 'load' });
await page.locator('.shot').first().click();
await page.waitForTimeout(300);
const dialogOpen = await page.locator('#lightbox').evaluate((d) => d.open);
await page.locator('.lightbox__close').click();
await page.waitForTimeout(200);
const dialogClosed = await page.locator('#lightbox').evaluate((d) => !d.open);

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base + '/', { waitUntil: 'load' });
await page.evaluate(() => window.scrollTo(0, 400));
await page.waitForTimeout(300);
const stuck = await page.locator('.site-header').evaluate((h) => h.classList.contains('is-stuck'));

console.log(JSON.stringify({ menuOpen, menuClosed, dialogOpen, dialogClosed, stuck, errors }, null, 2));
await browser.close();
