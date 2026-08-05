# Cursor Output — Experience page
Date: 2026-08-05

## Files created
- `src/pages/experience.astro` — `/experience` with band title Experience / meta Work History; list starts with no SectionHeader
- `src/components/ExperienceItem.astro` — entry layout (role, place, dates, middot bullets, between-item rules)

## Files changed
- `src/pages/index.astro` — removed Experience data, header, and entries; home ends after Projects
- `src/components/Nav.astro` — Experience added; order Profile · Projects · Experience · Certifications · Resume; tighter gaps + wrap on small screens

## Confirmations
- **Home ends cleanly** — About → Seeking → Contact → Projects → end; 2 project entries; no experience block; no trailing rule or empty wrapper after projects
- **Nav at 375px** — five links wrap to 2 rows with `gap: 8px 10px`; no horizontal overflow. At 1280px all five stay on one row (`gap: 10px 14px`)
- **`/experience`** — 4 entries; same padding/borders/bullets as before; no SectionHeader
- **`npm run build`** — clean

## Commit

Pending push.
