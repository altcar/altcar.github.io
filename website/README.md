# shalev.eu.org

Personal site for Shalev Lau — robotics, control systems and software.

Astro 7, hand-written CSS, no UI framework. Static output deployed as a
Cloudflare Worker with static assets.

## Structure

```
website/
  src/
    pages/        index (home), work (all projects), meter (case study), meow (gallery), 404
    layouts/      Base.astro — head, nav, footer, tiny progressive-enhancement scripts
    components/   Nav, Footer, MeterVisual
    data/         site.ts (projects, experience, links), photos.ts
    styles/       global.css — design tokens, glass, layout, motion
    assets/       images processed by astro:assets into WebP + srcset
  public/         fonts, hover previews, og.png, favicon, vCard, robots.txt
  scripts/        media.mjs (regenerate previews + og image), shots.mjs (visual QA)
  wrangler.jsonc  Worker config: static assets + custom domain
```

## Local development

```bash
cd website
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve dist/
```

## Deploy

```bash
npm run deploy     # astro build && wrangler deploy
```

The Worker is `shalev-portfolio`:

- preview: https://shalev-portfolio.hheylau.workers.dev
- production: https://shalev.eu.org

### Custom domain

`shalev.eu.org` is attached to the Worker as a **custom domain** in the
dashboard (Workers & Pages → `shalev-portfolio` → Settings → Domains & Routes).
Cloudflare manages the DNS record and certificate for it.

The old Vercel deployment still owns the apex `A` record (`76.76.21.21`), so that
record has to be deleted before the custom domain can be added. Once removed,
Cloudflare creates the proxied record and issues the certificate automatically.

## Continuous deployment (Workers Builds)

Connected to `altcar/altcar.github.io`, root directory `website`:

| Setting        | Value           |
| -------------- | --------------- |
| Build command  | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `website`       |
| Build variable | `NODE_VERSION=22` |

Wrangler is pinned in `devDependencies` (`4.160.0`) so the build and local CLI
stay in sync.

## Media

Images live in `src/assets/` and are optimised at build time. Hover previews used
on the work list are pre-generated WebP files in `public/img/`:

```bash
node scripts/media.mjs   # rebuilds public/img/*.webp and public/og.png
```
