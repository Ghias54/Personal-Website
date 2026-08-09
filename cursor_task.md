# Cursor Task — Personal Website
Date: 2026-08-08 21:35:53
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: high

## Context
Three image files were transferred to `public/images/` by scp and are already on disk. Verify they exist before doing anything else and STOP if any are missing:

- `public/images/fig1-whiteboard.jpg` (~28 KB)
- `public/images/fig2-eventlog.png` (~100 KB)
- `public/images/fig3-summary.png` (~34 KB)

The case study markdown currently contains `[IMAGE: description | caption]` placeholders. `src/lib/processMarkdownHtml.ts` parses these into a `figure` segment carrying only a description and a caption, and the case study page renders them as a placeholder box. There is no support for an actual image path. This task adds it.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed. Everything below is verifiable from the filesystem or the build output. Flag anything you could not verify.

Out of scope, do not add: lightbox, zoom, carousel, image CDN, analytics, client-side JS, blog, CMS. `earnings-factor-model.md` is NOT part of this task. Leave its two placeholders exactly as they are.

## Task
Do these in order. Stop and report if a verification step fails rather than continuing.

---

## 1. Extend the figure syntax to support a real image

In `src/lib/processMarkdownHtml.ts`:

Extend the `figure` variant of `HtmlSegment` with two optional fields:

```ts
| { type: "figure"; description: string; caption: string; src?: string; alt?: string }
```

Support a three-field form alongside the existing two-field form:

- Three fields: `[IMAGE: /images/file.png | alt text | caption]` produces `{ src, alt, caption, description: alt }`
- Two fields: `[IMAGE: description | caption]` is unchanged and still produces a placeholder with `src` undefined

Both forms must keep working. Do not delete the existing regex path, since the earnings case study still relies on it.

## 2. Render the image when a src is present

Find the component that consumes `splitFigures` and renders the `figure` segments. Update it so that:

- When `src` is present, render a real `<figure>` with an `<img>` and a `<figcaption>` carrying the caption
- When `src` is absent, the existing placeholder behaviour is unchanged

Requirements for the `<img>`:

- `alt` from the parsed alt field, never empty, never the filename
- `loading="lazy"` and `decoding="async"`
- Explicit `width` and `height` attributes so the page does not shift as images load. Read the real intrinsic dimensions off the files rather than guessing.
- `max-width: 100%` and `height: auto` in CSS so it scales down on mobile

Use existing design tokens from `src/styles/global.css` for any caption or border styling. Do not introduce raw hex values.

## 3. Replace the three placeholders in `src/content/work/die-cutter-capacity.md`

Replace each line exactly as given. Do not paraphrase the captions.

Replace:
`[IMAGE: whiteboard planning photo | Fig 1 — scoping the questions with the operations team]`

With:
`[IMAGE: /images/fig1-whiteboard.jpg | Whiteboard covered in handwritten notes grouping the analysis into changeovers, run and job length, machine speed, materials, sheet counts, and capacity by shift | Fig 1 — scoping the questions with the operations team]`

Replace:
`[IMAGE: raw data screenshot | Fig 2 — the event log as it came from the vendor's system]`

With:
`[IMAGE: /images/fig2-eventlog.png | Spreadsheet of timestamped machine events, showing Production rows of roughly 26 seconds alternating with Minor Stoppage rows, two consecutive Setup entries of 11 min 52 sec and 7 min 11 sec, and a job logged as NO READ | Fig 2 — the event log as it came from the vendor's system]`

Replace:
`[IMAGE: chart showing time breakdown or No Read by job type | Fig 3 — where the machine time actually went]`

With:
`[IMAGE: /images/fig3-summary.png | Quarterly summary table of run times, changeover time, and sheet counts for April through June | Fig 3 — Quarterly summary, April to June. Production run time was 222 hours against 1,552 hours of total available run time, or 14%. Changeovers consumed 428 hours, nearly twice the time spent cutting.]`

Note that the Fig 3 caption is long and contains commas and percent signs. Confirm the parser handles it and the caption is not truncated.

## 4. One copy change in the same file

In the "What I found" section, replace this paragraph:

`**The 1,200 sheets per hour standard was real, but almost never reached.** The machines rarely ran long enough in one stretch to get there. Capacity was not limited by how fast the machine could cut. It was limited by how often it had to stop.`

With:

`**The 1,200 sheets per hour standard was close to right for pure cutting time, and nowhere near the daily reality.** Across April through June, Machine 1 averaged about 920 sheets per hour during production run time, and 131 sheets per hour measured against all available run time. Capacity was not limited by how fast the machine could cut. It was limited by how often it had to stop.`

Change nothing else in the prose.

## 5. Build verification

- `npm run build` completes clean
- Confirm zero occurrences of the literal string `[IMAGE:` in `dist/projects/die-cutter-capacity/index.html`. Paste the actual grep output.
- Confirm the three `<img>` tags are present in that file with correct `src`, non-empty `alt`, and `width`/`height` set
- Confirm the earnings case study still renders its two placeholders. Grep `dist/projects/earnings-factor-model/index.html` and confirm the placeholder markup is intact and no `<img>` was introduced.
- Confirm all three image files were copied into `dist/images/` at their full byte sizes
- Confirm zero client-side JS bundles are emitted
- Report `dist/` total size before and after

## 6. Commit and push

Commit with a message covering the figure syntax extension, the three MOLL figures, and the sheets-per-hour copy change. Push to `main`. Do not force-push, do not rewrite history.

Pushing to `main` triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy` under any circumstances. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 7. Post-deploy verification

Wait for the build, then against the live domain:

- `curl -sI https://rehanghias.com/images/fig1-whiteboard.jpg` — expect 200 and an image content-type
- Same for `fig2-eventlog.png` and `fig3-summary.png`
- `curl -s https://rehanghias.com/projects/die-cutter-capacity/ | grep -c "\[IMAGE:"` — expect 0
- `curl -s https://rehanghias.com/projects/die-cutter-capacity/ | grep -o 'src="/images/[^"]*"'` — expect all three

If the build has not finished yet, say so plainly rather than reporting stale results.

## Rules
- Read existing files before editing
- Keep changes minimal and localized
- Astro static site, deploys to Cloudflare on push to main
- Use page copy exactly as written — do not rewrite or paraphrase
- Do not add a nav bar, analytics, animation libraries, or a CMS
- Run `npm run build` and confirm it compiles clean before finishing
- After completing, write results to cursor_output.md

## Expected Output in cursor_output.md
Write results to `cursor_output.md` covering:

1. Confirmation all three files exist in `public/images/` with byte sizes
2. The diff to `processMarkdownHtml.ts`, and confirmation the two-field form still parses
3. Which component you modified to render real images, and its path
4. The intrinsic width and height you read off each image, and how you read them
5. Grep output for `[IMAGE:` in the built MOLL page — must be zero, paste actual output
6. The three `<img>` tags as they appear in built HTML
7. Confirmation the earnings page placeholders are untouched and contain no `<img>`
8. Build result: clean or not, page count, `dist/` size before and after, zero JS bundles
9. Confirmation `dist/images/` contains all three at full size
10. Commit hash and confirmation of push to `main`
11. Post-deploy curl results, or a plain statement that the build had not finished
12. An explicit "NEEDS HUMAN CHECK" section. Visual rendering, image legibility at display size, and mobile layout all belong there, since you cannot see them.

## Status
[ ] Not started
