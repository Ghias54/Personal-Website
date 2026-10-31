# Personal Website

Static personal site for Rehan Ghias — [rehanghias.com](https://rehanghias.com). Built with Astro and deployed on Cloudflare.

## What's on it

- **Home** — intro and links (`src/content/home.md`)
- **Projects** — five write-ups in `src/content/work/`:
  - Die-cutter capacity analysis
  - Earnings factor model
  - Stock database
  - Home research server
  - Local AI models
- **Resume** — embedded PDF (`public/resume.pdf`)

All content is markdown; figures live in `public/images/`.

## Stack

- [Astro](https://astro.build) 7, static output
- Manrope + IBM Plex Mono via Fontsource
- `@astrojs/sitemap`, `simple-icons`
- Cloudflare (static assets served from `dist/`, configured in `wrangler.jsonc`)

## Local development

Requires Node 22.12+.

```bash
npm install
npm run dev       # local dev server
npm run build     # build to ./dist
npm run preview   # preview the production build
```

## Adding a project

Drop a new markdown file in `src/content/work/` and any images in `public/images/`, then build.
