# Cursor Output — Nav alignment & /work
Date: 2026-08-05
Status: Complete

## Commit
`832a2abfcf6981dcfca7d4010fb8728d3e63d8fa` (`832a2ab`)

## Build
`npm run build` compiles clean. 6 pages built (including `/work`).

## What was done
1. **Alignment** — `--container-max` / `--container-pad-x` and a shared `.container` class. Nav, all pages, and resume use the same width and horizontal padding. Resume’s 900px override removed.
2. **Nav wordmark** — “Rehan Ghias” → “RG” (IBM Plex Mono, uppercase, letter-spacing 0.08em). Full name remains the home h1.
3. **/work** — Real Projects index with h1 “Projects”, mono “SELECTED WORK”, same two cards. Nav Projects → `/work`.
4. **CaseStudyCard** — Extracted to `src/components/CaseStudyCard.astro`; used on home and `/work`.
5. **Nav order** — Profile · Projects · Certifications · Resume.

## Files created
- `src/components/CaseStudyCard.astro`
- `src/pages/work/index.astro`

## Files changed
- `src/styles/global.css`
- `src/components/Nav.astro`
- `src/pages/index.astro`
- `src/pages/resume.astro`
- `src/pages/certifications.astro`
- `src/layouts/CaseStudyLayout.astro`
