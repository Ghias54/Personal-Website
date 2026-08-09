# Cursor Output — Resume PDF update
Date: 2026-08-09

## 1. `public/resume.pdf`

- Size: **80,458 bytes**
- mtime: **2026-08-09 18:21** (local)
- Previous committed size was 79,991 bytes — this is a real replacement, not a stub

## 2. Text layer

Verified with `pdftotext` and `pdffonts`:

- Three embedded subsetted TrueType fonts (Arial Bold/Regular/Italic)
- Extractable text includes `linkedin.com/in/rehanghias` (count: 1)
- Also shows name, contact line, education, experience sections

## 3. Producer

From `pdfinfo` (no install required):

- **Producer:** `Skia/PDF m151`
- **Creator:** Chrome/151.0.0.0
- **Pages:** 1
- **Page size:** 612 × 792 pts (letter)

## 4. `git status` before committing

```
modified:   cursor_task.md
modified:   public/resume.pdf
```

`public/resume.pdf` was the only project-content change (79,991 → 80,458).  
`cursor_task.md` was dirty because this task file was replaced by the orchestrator — reported here; the resume commit staged **only** `public/resume.pdf`.

## 5. Build

- Clean: **7 page(s)**
- Client-side JS: **0**

## 6. `dist/resume.pdf`

Byte-identical to `public/resume.pdf` (`filecmp` True, 80,458 bytes).

## 7. Images in `dist/images/`

All seven present at full size:

| File | Bytes |
|---|---|
| fig1-dashboard-summary.png | 164,354 |
| fig1-whiteboard.jpg | 28,726 |
| fig2-equity-drawdown.png | 111,681 |
| fig2-eventlog.png | 123,630 |
| fig3-summary.png | 34,228 |
| fig3-yearly-quant-tier.png | 81,820 |
| fig4-composite-scatter.png | 51,626 |

## 8. Commit / push

- Hash: `a2a05b370cc1bbf05b197636bb9de082bfd4f722`
- Pushed to `main` (Cloudflare Workers Build; no wrangler pages deploy)
- Commit contained only `public/resume.pdf`

## 9. Post-deploy

`curl -sI https://rehanghias.com/resume.pdf`:

- **HTTP/2 200**
- **content-type: application/pdf**
- `content-length` header omitted by Cloudflare; downloaded body is **80,458 bytes** and **byte-identical** to local (`md5 e7cbce5a43563c5a85715bc34df736a6`)

`curl -sI https://rehanghias.com/` → **HTTP/2 200**

## 10. NEEDS HUMAN CHECK

- Open `https://rehanghias.com/resume.pdf` once in a browser and confirm it is the intended one-page Chrome export (byte size alone does not prove visual content)
- Confirm `/resume` iframe still embeds cleanly
