# Cursor Output — Go public (SIDE-17 / SIDE-15)
Date: 2026-08-06

## 1. `public/resume.pdf`

- Present: **yes**
- Size: **79,991 bytes**
- `pdffonts` — embedded fonts listed:
  - `AAAAAA+Arial-BoldMT` (CID TrueType, emb yes)
  - `BAAAAA+ArialMT` (CID TrueType, emb yes)
  - `CAAAAA+Arial-ItalicMT` (CID TrueType, emb yes)
- `pdftotext public/resume.pdf - | wc -c` → **2991** characters (≥ 2,900) — real text layer confirmed

## 2. NOINDEX

- `src/layouts/BaseLayout.astro`: `const NOINDEX = false;`
- Built HTML: robots meta tag **absent** on checked pages

## 3. `robots.txt` after change

```
User-agent: *
Allow: /

Sitemap: https://rehanghias.com/sitemap-index.xml
```

## 4. `grep -ri "noindex" dist/`

```
$ grep -ri "noindex" dist/
(exit code 1 — zero matches)
```

No output; zero matches.

## 5. `/resume` renders the real embed

In `dist/resume/index.html`:

- Present: `<iframe class="resume-frame" src="/resume.pdf" title="Rehan Ghias resume PDF" …>`
- Present: download link `href="/resume.pdf" download="Rehan-Ghias-Resume.pdf"`
- Absent: `"PDF not uploaded yet"`
- Absent: resume-placeholder markup in the body

## 6. Build

- `npm run build` — clean
- **7 page(s)** built
- `dist/` total size: **924K** (75 files)
- Client-side JS bundles: **none** (`find dist -name '*.js' -o -name '*.mjs'` returned empty)

## 7. `dist/resume.pdf`

Present in `dist/` at **79,991 bytes** (copied with the build).

## 8. Sitemap URLs (`dist/sitemap-0.xml`)

1. `https://rehanghias.com/`
2. `https://rehanghias.com/certifications/`
3. `https://rehanghias.com/experience/`
4. `https://rehanghias.com/projects/`
5. `https://rehanghias.com/projects/die-cutter-capacity/`
6. `https://rehanghias.com/projects/earnings-factor-model/`
7. `https://rehanghias.com/resume/`

Spot-check: `/` and `/experience/` canonicals + `og:image` point at `https://rehanghias.com/...`.

## 9. Deploy status

**Could not authenticate. Stopped.**

Exact error from `npx wrangler pages deploy dist --project-name=personal-website`:

```
✘ [ERROR] In a non-interactive environment, it's necessary to set a CLOUDFLARE_API_TOKEN environment variable for wrangler to work. Please go to https://developers.cloudflare.com/fundamentals/api/get-started/create-token/ for instructions on how to create an api token, and assign its value to CLOUDFLARE_API_TOKEN.
```

No workaround attempted. No credentials requested or stored. Post-deploy curl checks were **not** run.

To finish deploy after auth is available:

```
npx wrangler pages deploy dist --project-name=personal-website
```

DNS / custom domain left untouched (manual step for Rehan).

## 10. NEEDS HUMAN CHECK

- Authenticate wrangler / set `CLOUDFLARE_API_TOKEN` and run the deploy command
- Confirm live Pages URL returns 200 for all routes, `robots.txt` Allow, sitemap XML, and `/resume.pdf` as `application/pdf`
- Visual check that `/resume` shows the PDF iframe (not verifiable from this environment)
- Point `rehanghias.com` at the Pages project in the Cloudflare dashboard when ready

## 11. Commit hash

`229373b2ed710873e9a3f07c4873a727dbec429e`
