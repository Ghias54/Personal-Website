# Cursor Output — /work → /projects
Date: 2026-08-05

## Files renamed
- `src/pages/work/index.astro` → `src/pages/projects/index.astro` (WORK label removed; list starts directly)
- `src/pages/work/die-cutter-capacity.astro` → `src/pages/projects/die-cutter-capacity.astro`
- `src/pages/work/earnings-factor-model.astro` → `src/pages/projects/earnings-factor-model.astro`

## Files changed
- `src/components/Nav.astro` — Projects href `/projects`
- `src/content/home.md` — card hrefs → `/projects/...`
- `docs/case-study-moll.md`, `docs/case-study-earnings-model.md`, `docs/home-page-copy.md`, `docs/Cursor Build Task.md` — slug/link docs updated

## `/work` references updated
| Location | Change |
|---|---|
| Nav Projects link | `/work` → `/projects` |
| home.md card 1 | `/work/die-cutter-capacity` → `/projects/die-cutter-capacity` |
| home.md card 2 | `/work/earnings-factor-model` → `/projects/earnings-factor-model` |
| docs slug/copy mentions | updated to `/projects/...` |

## Remaining `/work` string matches (not route links)
- `src/content/work/*.md` — content folder path; imports from project pages still use `../../content/work/...` (filesystem, not a public URL)
- `cursor_task.md` — this task’s instructions describing the rename
- `package-lock.json` — unrelated `tests/projects/workspace/...` path fragment

No live site hrefs still point at `/work`. Old routes 404.

## Confirmations
- Projects index: no WORK label; list margin 0 (same band→content spacing pattern as experience)
- Home PROJECTS SectionHeader unchanged
- All nav items + both project links from home and `/projects` resolve 200
- `npm run build` — clean (7 pages under `/projects/...`)

## Commit

Pending push.
