# Cursor Output — Work list layout fix
Date: 2026-08-05
Status: Complete

## Commit
`74e6a48b8e2306f684b3ce6442f4fb4e9116cdf7` (`74e6a48`)

## Build
`npm run build` compiles clean. 6 pages built.

## What was wrong
`WorkListItem.astro` source had already been changed to `display: block`, but the Vite dev server was still injecting a **stale stylesheet** for the component that kept:

```css
.work-link {
  display: grid;
  grid-template-columns: var(--rail-width) minmax(0, 1fr);
}
```

That put the eyebrow and summary into the 96px first column and only the title into the wide column. Because those stale rules also lacked `font-family` on the eyebrow, it inherited Manrope from `body`.

## What changed
Rewrote `WorkListItem.astro` with new class names (`work-entry-link`, `eyebrow`, `title`, `summary`) and an explicit stacked block layout — no flex, no grid, no fixed-width children. Eyebrow forced to `"IBM Plex Mono", monospace`. Cleared Vite cache so the stale module could not linger.

## Browser verification
| Check | Home | /work |
| --- | --- | --- |
| Link `display` | `block` | `block` |
| Link `grid-template-columns` | `none` | `none` |
| Eyebrow font | IBM Plex Mono | IBM Plex Mono |
| Summary width | 560px (~56ch) | 560px (~56ch) |
| WORK label left = ABOUT rail left | yes (304px) | n/a |

## Files changed
- `src/components/WorkListItem.astro`
