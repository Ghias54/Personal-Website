# Cursor Output — MOLL case study figures
Date: 2026-08-08

## 1. Source images in `public/images/`

| File | Bytes |
|---|---|
| `fig1-whiteboard.jpg` | 28,726 |
| `fig2-eventlog.png` | 123,630 |
| `fig3-summary.png` | 34,228 |

All three present before any edits.

## 2. `processMarkdownHtml.ts`

- Extended `figure` segment with optional `src?` and `alt?`
- Parser now reads the full `[IMAGE: …]` body and splits on `|`:
  - **3+ fields** → `{ src, alt, caption, description: alt }`
  - **2 fields** → placeholder form unchanged (`src` undefined)
- Confirmed two-field parse: `{ description: "whiteboard planning photo", caption: "Fig 1 — scoping" }`
- Confirmed Fig 3 three-field caption length **201** chars, not truncated (includes `14%` and commas)

## 3. Render component

- Updated `src/components/Figure.astro` (real `<img>` vs placeholder)
- Updated `src/components/MarkdownBody.astro` to pass `src` / `alt` / intrinsic dimensions
- Added `src/lib/imageSize.ts` to read PNG/JPEG headers from `public/`

## 4. Intrinsic dimensions

Read via `getPublicImageSize()` (PNG IHDR / JPEG SOF markers from file bytes):

| Image | Width | Height |
|---|---|---|
| `fig1-whiteboard.jpg` | 512 | 318 |
| `fig2-eventlog.png` | 1604 | 744 |
| `fig3-summary.png` | 1286 | 431 |

## 5. Grep `[IMAGE:` in built MOLL page

```
$ grep -n '\[IMAGE:' dist/projects/die-cutter-capacity/index.html
(exit code 1 — zero matches)
```

## 6. Built `<img>` tags

```html
<img class="figure-image" src="/images/fig1-whiteboard.jpg" alt="Whiteboard covered in handwritten notes grouping the analysis into changeovers, run and job length, machine speed, materials, sheet counts, and capacity by shift" width="512" height="318" loading="lazy" decoding="async" …>
<img class="figure-image" src="/images/fig2-eventlog.png" alt="Spreadsheet of timestamped machine events, showing Production rows of roughly 26 seconds alternating with Minor Stoppage rows, two consecutive Setup entries of 11 min 52 sec and 7 min 11 sec, and a job logged as NO READ" width="1604" height="744" loading="lazy" decoding="async" …>
<img class="figure-image" src="/images/fig3-summary.png" alt="Quarterly summary table of run times, changeover time, and sheet counts for April through June" width="1286" height="431" loading="lazy" decoding="async" …>
```

Fig 3 caption in HTML (full):  
`Fig 3 — Quarterly summary, April to June. Production run time was 222 hours against 1,552 hours of total available run time, or 14%. Changeovers consumed 428 hours, nearly twice the time spent cutting.`

## 7. Earnings case study

- `<img` count in `dist/projects/earnings-factor-model/index.html`: **0**
- `figure-placeholder` markup still present (two placeholders)
- Placeholders in `earnings-factor-model.md` left unchanged

## 8. Build

- Clean: **7 page(s)**
- `dist/` size: **924K → 1.1M**
- Client-side JS bundles: **0**

## 9. `dist/images/`

| File | Bytes |
|---|---|
| `fig1-whiteboard.jpg` | 28,726 |
| `fig2-eventlog.png` | 123,630 |
| `fig3-summary.png` | 34,228 |

Full sizes match `public/images/`.

## 10. Commit / push

Pending — filled after push.

## 11. Post-deploy

Pending — filled after Cloudflare Workers Build.

## 12. NEEDS HUMAN CHECK

- Image legibility at display width on desktop and mobile
- Whether Fig 2 spreadsheet / Fig 3 table text is readable without zoom
- Caption wrapping for the long Fig 3 caption
- Layout/spacing around the three figures in the case study
- Visual confirmation earnings placeholders still look correct
