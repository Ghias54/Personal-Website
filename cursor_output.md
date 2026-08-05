# Cursor Output — Dark header + left-rail redesign
Date: 2026-08-05
Status: Complete

## Commit
`81ac5fd8ddc87eb7bb15fa5578b98dcc22764802` (`81ac5fd`)

## Build
`npm run build` compiles clean. 6 pages built.

## What shipped
1. **Palette** — Navy `#1F2A36` header, white page, greys only. Teal/mint removed. Cert group markers use navy / slate / muted greys. Radius capped at 4px (logos 2px).
2. **Header band** — Full-bleed dark band with nav + page title on every page via `SiteHeader.astro`. Home: two-line name, rule, degree meta. Other pages: title + rule + optional meta.
3. **Rail layout** — `RailSection.astro` (96px rail + 34px gap). Collapses to stacked label/content below 700px.
4. **Work list** — `WorkListItem.astro` replaces `CaseStudyCard.astro` on home and `/work`.
5. **Case studies** — Title/meta in band; markdown `h2`s become rail labels beside each section body.
6. **Certifications** — Title in band; card chrome replaced with top/bottom hairlines; group colors updated; logo radius 2px.
7. **Resume** — Title in band; download + embed in content column.

## 375px
- Rail collapses to single column (label above content, 8px gap).
- Home name stays 52px on two lines; fits within padded container.
- Non-home band titles scale to 30px below 700px so long case-study titles wrap cleanly.
- Nav links wrap under RG; work entry rails stack above titles.

## Spec conflicts / resolutions
- Prior sticky nav + warm off-white palette replaced entirely by the approved mockup system.
- Case study section labels can be longer than 96px (“What I would do differently”) — they wrap in the rail as allowed by the spec.
- Projects / Certifications / Resume have no secondary meta line in the band (only the rule under the title), since none was defined for those pages.

## Files created
- `src/components/SiteHeader.astro`
- `src/components/RailSection.astro`
- `src/components/WorkListItem.astro`
- `src/lib/processMarkdownHtml.ts`

## Files changed
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/layouts/CaseStudyLayout.astro`
- `src/components/Nav.astro`
- `src/components/MarkdownBody.astro`
- `src/components/IssuerLogo.astro`
- `src/pages/index.astro`
- `src/pages/work/index.astro`
- `src/pages/certifications.astro`
- `src/pages/resume.astro`

## Files deleted
- `src/components/CaseStudyCard.astro`
