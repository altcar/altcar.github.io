# shalev.eu.org

Personal site for Shalev Lau — robotics at Bristol, side projects, photographs.

Astro 7, hand-written CSS, static output on Cloudflare Workers. Light, image-first:
project screenshots and photos do most of the talking.

## Structure

```
website/
  src/
    pages/        index (home), work (all projects), meter (case study), meow (gallery), 404
    layouts/      Base.astro — head, header, footer, 20 lines of JS
    components/   ProjectCard, Strip (the scrolling image rows)
    data/         site.ts (projects + links), photos.ts
    styles/       global.css — one file, ~600 lines
    assets/       images processed by astro:assets into WebP + srcset
  public/         fonts, og.png, favicon, vCard, robots.txt, _headers
  scripts/        image + QA helpers (see below)
  wrangler.jsonc  Worker config: static assets
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

Worker `shalev-portfolio`:

- https://shalev-portfolio.hheylau.workers.dev
- production: https://shalev.eu.org (custom domain attached in the dashboard)

## Continuous deployment (Workers Builds)

Connected to `altcar/altcar.github.io`:

| Setting        | Value                 |
| -------------- | --------------------- |
| Root directory | `website`             |
| Build command  | `npm run build`       |
| Deploy command | `npx wrangler deploy` |
| Build variable | `NODE_VERSION=22`     |

Wrangler is pinned in `devDependencies` (`4.160.0`).

## Media

Project thumbnails are real screenshots of the live deployments.

```bash
node scripts/shots-sites.mjs   # capture live project sites into shots/sites/
node scripts/project-shots.mjs # crop/resize them into src/assets/projects/
node scripts/shots.mjs         # QA screenshots of every page (needs preview server)
node scripts/og.mjs            # social card from the homepage
```
