# Cursor Output — Type scale bump
Date: 2026-08-05
Status: Complete

## Commit
`87daa6abbcdb8d29a171733f473ddee7e3ea8e16` (`87daa6a`)

## Build
`npm run build` compiles clean. 6 pages built.

## What changed
Added `--font-size-body` (17px), `--font-size-lead` (19px), `--font-size-meta` (12px) in `global.css` and wired body / `.meta` / prose section headers through them.

| Area | Change |
| --- | --- |
| Body | 16 → 17px |
| Home lead paragraph | 18 → 19px |
| Metadata (`.meta`, prose h2, nav links) | 11 → 12px |
| RG wordmark | 13 → 14px |
| Card title / summary | 17 → 18px / 15 → 16px |
| Cert name / issuer meta | 15 → 17px / 10 → 11px |
| Cert group label & count | 11 → 12px |
| Cert row padding | 18px vertical |
| Logo slot | 34 → 38px (glyph 20px, monogram 12px) |

## 375px check
- Nav: `flex-wrap` still allows RG + links to wrap to a second row; no horizontal overflow.
- Cert meta lines: `.cert-text` keeps `min-width: 0` so long issuer/date strings wrap inside the row instead of pushing past the card edge.
- Group headers: label stays `nowrap`; the flex hairline absorbs width so the count stays on the right without overflow.

## Files changed
- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/certifications.astro`
- `src/components/Nav.astro`
- `src/components/CaseStudyCard.astro`
- `src/components/IssuerLogo.astro`
