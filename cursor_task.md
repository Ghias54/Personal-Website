# Cursor Task — Personal Website
Date: 2026-08-05 22:57:28
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: high

## Context
Pre-deploy hardening pass on the personal website (Astro static site, deploys to Cloudflare Pages at rehanghias.com, which is already registered on Cloudflare).

Covers Linear issues SIDE-6 (unfinished acceptance criteria) and SIDE-14 (responsive + semantics + SEO).

Current state: six routes live — `/`, `/projects`, `/projects/die-cutter-capacity`, `/projects/earnings-factor-model`, `/experience`, `/certifications`, `/resume`. Design tokens are already centralised in `src/styles/global.css` and pages reference them via CSS custom properties — do not introduce raw hex values.

IMPORTANT STANDING CONSTRAINT: you cannot visually verify this work. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed. Report what you changed in code and explicitly list what still needs a human visual check.

Explicitly out of scope, do not add: blog, CMS, dark mode toggle, animation libraries, analytics, contact form, client-side JavaScript frameworks.

## Task
Five separate pieces of work. Do them in order and keep them as separate commits where practical.

---

## 1. Self-host fonts (SIDE-6 acceptance criteria, currently unmet)

`src/layouts/BaseLayout.astro` loads Manrope and IBM Plex Mono from the Google Fonts CDN. The issue required self-hosting. Fix it:

- `npm i @fontsource/manrope @fontsource/ibm-plex-mono`
- Import only the weights actually used. Check `src/styles/global.css` for which weights are referenced before importing — currently the CDN call requests Manrope 400/500/600/700 and IBM Plex Mono 400/500, but verify against real usage and import only what is used.
- Delete from `BaseLayout.astro`: both `<link rel="preconnect">` tags and the `<link href="https://fonts.googleapis.com/...">` stylesheet tag.
- Verify no other file references a font CDN.

**Done when:** a production build contains zero references to `fonts.googleapis.com` or `fonts.gstatic.com`, and both typefaces still render.

---

## 2. Set the site URL

`astro.config.mjs` is currently an empty `defineConfig({})`. Set:

```js
site: 'https://rehanghias.com'
```

This is a prerequisite for canonical URLs and the sitemap below.

---

## 3. SEO and metadata pass (SIDE-14)

All of this belongs in `BaseLayout.astro` so every route inherits it.

- **Canonical URL** per page, built from `Astro.site` and `Astro.url.pathname`.
- **Open Graph tags:** `og:title`, `og:description`, `og:type`, `og:url`, `og:site_name`, `og:image`.
- **Twitter card:** `twitter:card` as `summary_large_image`, plus title/description/image.
- **OG image:** generate a simple static 1200x630 PNG or SVG at `public/og-image.png` using the existing design tokens — off-white background, name in Manrope, `DATA & OPERATIONS ANALYSIS` in IBM Plex Mono beneath it. Keep it plain; no photos, no logos, no third-party assets.
- **Sitemap:** `npx astro add sitemap`, wire the integration.
- **robots.txt** in `public/`, referencing the sitemap URL.
- Confirm every route passes a real, distinct `description` to the layout. Several pages may currently be relying on defaults — check each one and write a specific description where missing.

---

## 4. Temporary noindex

The resume PDF does not exist yet, so `/resume` currently renders a placeholder state. Until that is resolved, the site must not be indexed.

- Add `<meta name="robots" content="noindex, nofollow" />` to `BaseLayout.astro`.
- Put it behind a single named constant at the top of the layout, e.g. `const NOINDEX = true;`, so removing it later is a one-line change.
- Add a brief comment stating that this comes off once `public/resume.pdf` exists.
- Set `robots.txt` to disallow all while this is in place.

---

## 5. Semantics and responsive audit (SIDE-14)

Audit, then fix what is broken. Do not restyle anything that is already correct.

**Semantics:**
- Exactly one `h1` per route. Report any route that has zero or more than one.
- No skipped heading levels.
- Landmarks present: `<header>`, `<main>`, `<nav>`, `<footer>` as appropriate. `main` should be a single element per page.
- A skip-to-content link as the first focusable element, visible on focus.
- All interactive elements reachable by keyboard with a visible focus indicator that meets contrast. Check that no rule sets `outline: none` without a replacement.
- `aria-current="page"` on the active nav item — verify this is working, it appears to be implemented in `Nav.astro`.
- Every `img` has meaningful `alt`; decorative images get `alt=""`.

**Responsive:**
- Check every route at 360px, 390px, 768px, 1440px widths in code terms — no fixed widths or min-widths that would force horizontal scroll.
- The five-item nav in `Nav.astro` is the main risk at 360px. It currently wraps via flex-wrap with reduced gap under 700px. Verify it cannot overflow; if it can, fix it without adding a JavaScript hamburger menu — wrapping or a smaller mono size is fine.
- Tap targets at least 44x44px effective area on mobile.
- Body text must not drop below 16px on mobile.
- The `/resume` iframe uses `calc(100vh - 320px)` — confirm this does not collapse to near-zero height on short mobile viewports, and set a sensible `min-height` if it can.

**Colour contrast:**
- Check `--color-dimmed` and `--color-label` against their backgrounds for WCAG AA (4.5:1 body, 3:1 large text). Report any failures with measured ratios. Do not silently change token values — report first, and only fix if a token clearly fails.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Astro static site, deploys to Cloudflare on push to main
- Use page copy exactly as written — do not rewrite or paraphrase
- Do not add a nav bar, analytics, animation libraries, or a CMS
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Write cursor_output.md covering:

1. Confirmation that `npm run build` completes clean, with the page count.
2. Confirmation that grepping the built `dist/` output returns ZERO matches for `fonts.googleapis.com` and `fonts.gstatic.com`.
3. The exact list of `@fontsource` weights imported, and confirmation they match the weights actually referenced in `global.css`.
4. Which font files landed in the build output.
5. A table of every route with the canonical URL and OG image path it now emits.
6. Confirmation that `noindex` is present on every page, and the exact one-line instruction for how to remove it later.
7. Heading hierarchy per route (list the h1 and h2s found) so nesting can be reviewed without opening a browser.
8. An explicit "NEEDS HUMAN VISUAL CHECK" section listing everything you could not verify.
9. Any place where you found the existing code already satisfied a requirement, so no redundant change was made.
10. Commit hash.

## Status
[x] Complete
