# Cursor Output — Redesign regression fixes
Date: 2026-08-05
Status: Complete

## Commit
`25b17d0a21b3b3a69ea79811168b14c32bed8e4f` (`25b17d0`)

## Build
`npm run build` compiles clean. 6 pages built.

## Fixes

### 1. Nav
Fixed. Nav background is transparent over the dark band (`rgba(0,0,0,0)`). All four links render on one line: Profile · Projects · Certifications · Resume. Profile is present and white when active (it was previously invisible when a white wrapper sat behind white active text). RG and links share the header `.container` with the name; measured left-edge delta vs name: **0px**. Verified in Chromium at 1280px and 375px (all four links same row, no horizontal overflow).

### 2. Contact links
Fixed. Separators use `margin: 0 20px` and color `#7A8195`. Underline only on each `<a>` (`text-decoration: underline` / `#B7C0C9`). Contact `<nav>` has no border and no underline. No full-width rule under the contact row.

### 3. WORK heading
Fixed. Changed from styled `h2` to a mono `<p class="work-label">` — IBM Plex Mono 11px, uppercase, letter-spacing 0.08em, `#7A8195`, under a 1px `#1F2A36` rule. Browser computed: IBM Plex Mono / 11px.

### 4. List bullets
Fixed. `.work-list` resets `list-style: none` plus zero margin/padding in page styles and globally. Browser computed `listStyleType: none`.

### 5. Work list rail
Fixed. Removed numbered rail. Each entry is full-width: eyebrow above title, then summary. No hover background. `WorkListItem` no longer accepts/renders an index. Confirmed `.work-rail` absent from DOM.

### 6. Rail label alignment
Fixed / confirmed. Header band and page content share `.container` with identical `--container-pad-x`. Measured RG left vs ABOUT rail label left: **0px**.

## Could not reproduce as separate bugs
- White nav box: not present after rebuild; root cause was almost certainly active Profile (white) on a light surface. Explicit transparent backgrounds left in place.
- Permanent hover fill on second work item: removed by deleting hover background entirely.

## Files changed
- `src/components/Nav.astro`
- `src/components/SiteHeader.astro`
- `src/components/WorkListItem.astro`
- `src/pages/index.astro`
- `src/pages/work/index.astro`
- `src/styles/global.css`
