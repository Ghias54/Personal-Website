# Cursor Output — Pre-deploy hardening (SIDE-6 / SIDE-14)
Date: 2026-08-05

## 1. Build

`npm run build` completed clean: **7 page(s)** + `sitemap-index.xml` / `sitemap-0.xml`.

## 2. Font CDN check

Grepping `dist/` for `fonts.googleapis.com` and `fonts.gstatic.com`: **ZERO matches**.

## 3. `@fontsource` weights imported

Verified against real `font-weight` usage (400 / 500 / 600 / 700 for Manrope; 400 / 500 for IBM Plex Mono):

- `@fontsource/manrope/400.css`
- `@fontsource/manrope/500.css`
- `@fontsource/manrope/600.css`
- `@fontsource/manrope/700.css`
- `@fontsource/ibm-plex-mono/400.css`
- `@fontsource/ibm-plex-mono/500.css`

These match the weights referenced across `global.css` and components. No unused weights imported beyond what is used.

## 4. Font files in build output

Under `dist/_astro/`: Manrope and IBM Plex Mono `.woff2` / `.woff` subsets for latin, latin-ext, cyrillic, greek, vietnamese (and mono cyrillic-ext). Latin 400–700 (Manrope) and 400–500 (IBM Plex Mono) are present.

## 5. Canonical + OG image per route

| Route | Canonical | OG image |
|---|---|---|
| `/` | `https://rehanghias.com/` | `https://rehanghias.com/og-image.png` |
| `/projects/` | `https://rehanghias.com/projects/` | `https://rehanghias.com/og-image.png` |
| `/projects/die-cutter-capacity/` | `https://rehanghias.com/projects/die-cutter-capacity/` | `https://rehanghias.com/og-image.png` |
| `/projects/earnings-factor-model/` | `https://rehanghias.com/projects/earnings-factor-model/` | `https://rehanghias.com/og-image.png` |
| `/experience/` | `https://rehanghias.com/experience/` | `https://rehanghias.com/og-image.png` |
| `/certifications/` | `https://rehanghias.com/certifications/` | `https://rehanghias.com/og-image.png` |
| `/resume/` | `https://rehanghias.com/resume/` | `https://rehanghias.com/og-image.png` |

Every route emits a distinct `meta description` (already present; no new copy written).

## 6. Temporary noindex

- Every built page includes `<meta name="robots" content="noindex, nofollow" />`.
- `public/robots.txt` is `Disallow: /` (still lists the sitemap URL).
- **Remove later:** set `const NOINDEX = false;` in `src/layouts/BaseLayout.astro`, and change `robots.txt` back to allow crawling.

## 7. Heading hierarchy (from built HTML)

| Route | Headings |
|---|---|
| `/` | h1 Rehan A Ghias; h2 About, Seeking, Contact, Projects; h3 both project titles |
| `/projects/` | h1 Projects; h2 both project titles |
| `/projects/die-cutter-capacity/` | h1 case title; h2 The question, The problem with the data, What I found, What changed, What I would do differently |
| `/projects/earnings-factor-model/` | h1 case title; h2 The question, How it works, What I found, Running it, What I would do differently |
| `/experience/` | h1 Experience; h2 four role titles |
| `/certifications/` | h1 Certifications; h2 three skill groups |
| `/resume/` | h1 Resume only |

Exactly one `h1` per route. No skipped levels in the built output after fixes.

## 8. NEEDS HUMAN VISUAL CHECK

Cannot verify visually from this environment (Tailscale / IDE browser constraint). Please check:

- Fonts render as Manrope + IBM Plex Mono (not fallbacks) on all routes
- OG image (`/og-image.png`) looks correct when shared / opened directly
- Skip link appears on keyboard focus and jumps to `#main-content`
- Focus rings visible on dark header and light body links
- Nav at **360 / 390 / 768 / 1440** — wrapping, no horizontal scroll, readable
- Tap targets feel large enough on a real phone
- Resume placeholder/iframe height on a short mobile viewport
- Case study rail labels still look correct as `h2` (style should be unchanged)
- Overall spacing/layout regressions after heading-level markup changes

## 9. Already satisfied (no redundant change)

- `aria-current="page"` already implemented in `Nav.astro`
- No `outline: none` rules found anywhere in `src/`
- All routes already passed distinct `description` props into `BaseLayout`
- Issuer logos already `aria-hidden`; figure placeholders already use `aria-label`
- Body / body-sm already ≥ 16px (`17px` / `16px`)
- Landmarks: `<header>` (SiteHeader) + single `<main>` per page; no empty `<footer>` added (nothing to put there)
- Design tokens remain CSS variables — no new raw hex in components (OG PNG used token colors at generation time only)

## Colour contrast (reported, tokens unchanged)

| Pair | Ratio | Notes |
|---|---|---|
| `--color-dimmed` / `--color-label` `#4A5064` on `#FFFFFF` | **8.01:1** | Passes AA body |
| `#4A5064` on `--color-surface` `#FAFBFC` | **7.73:1** | Passes |
| `--color-muted` `#7A8195` on `#FFFFFF` | **3.89:1** | Fails AA for body text (4.5:1); used for cert counts + bullet middots, not body copy. Passes large-text 3:1. **Not changed.** |
| `--color-on-dark-muted` `#A9B6C2` on `#1F2A36` | **7.04:1** | Passes |

## Commits (in order)

1. `2efdae2` — Self-host fonts
2. `c324237` — Set `site` URL
3. `0dfbe62` — SEO / OG / sitemap / robots (initial allow)
4. `3c5d732` — Temporary noindex + robots disallow
5. `f79b424` — Semantics / responsive hardening

## Commit hash

`f79b424` (tip of hardening series; see follow-up if output commit is added)
