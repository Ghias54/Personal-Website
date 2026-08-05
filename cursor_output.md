# Cursor Output — Projects + Experience
Date: 2026-08-05

## Files created
- `src/components/SectionHeader.astro` — reusable section header (rule + label)

## Files changed
- `src/pages/index.astro` — WORK → PROJECTS via SectionHeader; EXPERIENCE section with 4 entries; experience data array in page frontmatter
- `cursor_task.md` — status

## Confirmations
- **Section headers identical** — Projects and Experience both: 48px top margin, 1px `#E1E4EA` rule, 14px gap, label 13px / 500 / 0.06em / uppercase / `#4A5064`, 20px below label
- **Custom bullets** — `list-style: none`; middot `::before` in `#7A8195`; hanging indent via padding-left — not browser default discs
- **Order** — About → Seeking → Contact → Projects → Experience
- **375px** — no horizontal overflow
- **`npm run build`** — clean

## Commit

`46cfc95fca850496dcebad8831c528866849495f`
