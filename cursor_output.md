# Cursor Output — Earnings case study figures + home card
Date: 2026-08-08

## 1. Image files

| File | Bytes | Intrinsic size |
|---|---|---|
| `fig1-dashboard-summary.png` | 164,354 | 1916 × 987 |
| `fig2-equity-drawdown.png` | 111,681 | 1918 × 987 |
| `fig3-yearly-quant-tier.png` | 81,820 | 1455 × 838 |
| `fig4-composite-scatter.png` | 51,626 | 1437 × 580 |

Dimensions from PNG IHDR via Pillow / existing image reader.

## 2. Transaction cost sentence

**Before:** `applies transaction costs on every round trip, and supports stop losses`  
**After:** `applies a 0.2% transaction cost to every trade, and supports stop losses`

## 3. Home card summary (earnings-factor-model)

**Before:**  
`I built a research pipeline to test whether filtering earnings trades by company quality improves returns. Across 58,710 simulated trades, it doesn't. Here is how I know, and why I kept the result instead of tuning it until it looked good.`

**After:**  
`I built a research pipeline to test whether filtering earnings trades by company quality improves returns. The best run gains 79%, and almost all of that comes from a single year and a handful of outlier trades. Here is how I know, and why I reported that instead of the headline number.`

Eyebrow, title, href unchanged.

## 4. Grep `[IMAGE:` in built earnings page

```
$ grep -n '\[IMAGE:' dist/projects/earnings-factor-model/index.html
(no matches)
exit 1
```

## 5. Built `<img>` tags

```html
<img … src="/images/fig1-dashboard-summary.png" alt="Dashboard summary metrics panel showing 4,040 total trades, $17,906.23 final equity, 79.06% total return, 12.68% CAGR, 48.66% win rate, 1.18% average trade return, negative 0.35% median trade return, and negative 63.78% maximum drawdown" width="1916" height="987" loading="lazy" decoding="async" …>
<img … src="/images/fig2-equity-drawdown.png" alt="Equity curve and drawdown chart from 2021 to 2026, showing the portfolio falling from ten thousand dollars to roughly four thousand by 2022, drifting sideways below its starting value for three years, then rising sharply at the end of the window" width="1918" height="987" loading="lazy" decoding="async" …>
<img … src="/images/fig3-yearly-quant-tier.png" alt="Yearly returns bar chart from 2021 to 2026 with a single dominant positive bar in 2025, a monthly returns heatmap, and a performance table broken out by quant tier" width="1455" height="838" loading="lazy" decoding="async" …>
<img … src="/images/fig4-composite-scatter.png" alt="Scatter plot of composite rating against net return for every trade, showing a flat horizontal band with no visible slope, alongside a histogram of net returns clustered tightly around zero with a long right tail" width="1437" height="580" loading="lazy" decoding="async" …>
```

## 6. Old numbers gone from `dist/`

- `58,710`: **zero** files  
- `70.85`: **zero** files

## 7–8. Unchanged pages

- `dist/projects/die-cutter-capacity/index.html` byte-identical to previous build  
- `dist/certifications/index.html` byte-identical to previous build

## 9. Build

- Clean: **7 page(s)**
- `dist/` size: **1.2M → 1.6M**
- Client-side JS: **0**

## 10. `dist/images/` (seven files, full size)

| File | Bytes |
|---|---|
| fig1-dashboard-summary.png | 164,354 |
| fig1-whiteboard.jpg | 28,726 |
| fig2-equity-drawdown.png | 111,681 |
| fig2-eventlog.png | 123,630 |
| fig3-summary.png | 34,228 |
| fig3-yearly-quant-tier.png | 81,820 |
| fig4-composite-scatter.png | 51,626 |

## 11. Commit / push

Pending — filled after push.

## 12. Post-deploy

Pending — filled after Cloudflare Workers Build.

## 13. NEEDS HUMAN CHECK

- Legibility of the four dashboard screenshots at display width (especially fig3 quant tier table and fig4 axis labels)
- Mobile rendering of all four figures
- Dark-background screenshots on a light page — may need a border/background treatment that has not been applied
- Home card summary reads correctly against the case study
