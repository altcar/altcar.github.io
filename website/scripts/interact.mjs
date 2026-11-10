import { chromium } from 'playwright';

const base = 'http://localhost:4321';
const browser = await chromium.launch();
const errors = [];

const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

await page.goto(base + '/', { waitUntil: 'networkidle' });

// mobile menu
const toggle = page.locator('.nav__toggle');
await toggle.click();
await page.waitForTimeout(250);
const menuOpen = await page.locator('#mobile-menu').isVisible();
await page.keyboard.press('Escape');
await page.waitForTimeout(250);
const menuClosed = await page.locator('#mobile-menu').isHidden();

// filters
await page.goto(base + '/work/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'AI', exact: true }).click();
await page.waitForTimeout(200);
const visibleCards = await page.locator('[data-group]:visible').count();
const countLabel = await page.locator('[data-count]').textContent();
await page.getByRole('button', { name: 'All', exact: true }).click();
await page.waitForTimeout(200);
const allCards = await page.locator('[data-group]:visible').count();

// lightbox
await page.goto(base + '/meow/', { waitUntil: 'networkidle' });
await page.locator('.shot').first().click();
await page.waitForTimeout(400);
const dialogOpen = await page.locator('#lightbox').evaluate((d) => d.open);
const lightboxSrc = await page.locator('#lightbox img').getAttribute('src');
await page.locator('.lightbox__close').click();
await page.waitForTimeout(300);
const dialogClosed = await page.locator('#lightbox').evaluate((d) => !d.open);

// copy button (clipboard may be denied headless; just ensure no crash)
await page.goto(base + '/', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(600);
await page.locator('[data-copy]').click();
await page.waitForTimeout(400);
const copyLabel = await page.locator('[data-copy-label]').textContent();

// nav stuck state
const stuck = await page.locator('.nav').evaluate((n) => n.classList.contains('is-stuck'));

console.log(
  JSON.stringify(
    { menuOpen, menuClosed, visibleCards, countLabel, allCards, dialogOpen, dialogClosed, copyLabel, stuck, errors },
    null,
    2,
  ),
);

await browser.close();
