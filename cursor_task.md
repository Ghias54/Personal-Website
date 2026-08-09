# Cursor Task — Personal Website
Date: 2026-08-08 22:57:21
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: high

## Context
The earnings factor model case study was rewritten. The new copy is already in `src/content/work/earnings-factor-model.md` and contains four three-field `[IMAGE: /images/… | alt | caption]` placeholders. The figure syntax and rendering already support this form — it was built for the MOLL case study and is working in production. No parser or component work is needed.

Four screenshots were transferred to `public/images/` by scp:

- `fig1-dashboard-summary.png`
- `fig2-equity-drawdown.png`
- `fig3-yearly-quant-tier.png`
- `fig4-composite-scatter.png`

The old version of this case study claimed the strategy lost 70.85% across 58,710 trades. That configuration is no longer the one being reported. The home page card still cites the old number and must be brought in line, or the site will contradict itself between the home page and the case study.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: the MOLL case study, the certifications page, the resume page, the figure parser, the Figure component, any new CSS. Do not rewrite, reword, or "improve" any prose beyond the two specific edits below. The copy is final.

## Task
Do these in order. Stop and report if a verification step fails.

## 1. Verify the images exist

Confirm all four files are present in `public/images/` and non-zero:

- `fig1-dashboard-summary.png`
- `fig2-equity-drawdown.png`
- `fig3-yearly-quant-tier.png`
- `fig4-composite-scatter.png`

If any is missing, **STOP** and report. Do not proceed, do not rename anything, do not substitute a different file.

## 2. One copy change in `src/content/work/earnings-factor-model.md`

In the "How it works" section, in the paragraph beginning "The backtest simulates a real portfolio", replace:

`applies transaction costs on every round trip, and supports stop losses`

With:

`applies a 0.2% transaction cost to every trade, and supports stop losses`

Change nothing else in this file. The four `[IMAGE: …]` placeholders are already correct and must be left exactly as written.

## 3. Update the home page card

In `src/content/home.md`, the second card (href `/projects/earnings-factor-model`) currently has this summary:

`I built a research pipeline to test whether filtering earnings trades by company quality improves returns. Across 58,710 simulated trades, it doesn't. Here is how I know, and why I kept the result instead of tuning it until it looked good.`

Replace it with:

`I built a research pipeline to test whether filtering earnings trades by company quality improves returns. The best run gains 79%, and almost all of that comes from a single year and a handful of outlier trades. Here is how I know, and why I reported that instead of the headline number.`

Do not change the card's eyebrow, title, or href. Do not touch the first card. Do not touch the body prose below the frontmatter.

## 4. Build verification

- `npm run build` completes clean
- Confirm zero occurrences of the literal string `[IMAGE:` in `dist/projects/earnings-factor-model/index.html`. Paste the actual grep output.
- Confirm four `<img>` tags are present in that file, each with the correct `src`, a non-empty `alt`, and explicit `width` and `height` read from the real image files
- Confirm zero occurrences of `58,710` and `70.85` anywhere in `dist/`
- Confirm `dist/projects/die-cutter-capacity/index.html` and `dist/certifications/index.html` are unchanged from the previous build
- Confirm all four new images were copied into `dist/images/` at full size, and that the three MOLL images are still there
- Confirm zero client-side JS bundles
- Confirm page count is still 7

## 5. Commit and push

Commit with a message covering the earnings case study rewrite, the four figures, the transaction cost detail, and the home page card. Push to `main`. Do not force-push, do not rewrite history.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 6. Post-deploy verification

Against the live domain:

- `curl -sI` each of the four new image paths — expect 200 and `image/png`
- `curl -s https://rehanghias.com/projects/earnings-factor-model/ | grep -c "\[IMAGE:"` — expect 0
- `curl -s https://rehanghias.com/projects/earnings-factor-model/ | grep -o 'src="/images/[^"]*"'` — expect all four
- `curl -s https://rehanghias.com/ | grep -c "58,710"` — expect 0
- `curl -s https://rehanghias.com/projects/earnings-factor-model/ | grep -c "0.2%"` — expect at least 1

If the build has not finished, say so plainly rather than reporting stale results.

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

1. The four image files with byte sizes and intrinsic dimensions
2. The transaction cost sentence before and after
3. The home page card summary before and after
4. Grep output for `[IMAGE:` in the built earnings page — must be zero, paste actual output
5. The four `<img>` tags from the built HTML with src, alt, width, height
6. Confirmation zero occurrences of `58,710` and `70.85` anywhere in `dist/`
7. Confirmation the MOLL case study page is byte-identical to the previous build
8. Confirmation the certifications page is byte-identical to the previous build
9. Build result, page count, `dist/` size before and after, zero JS bundles
10. Confirmation `dist/images/` contains all seven images at full size
11. Commit hash and confirmation of push to `main`
12. Post-deploy curl results, or a plain statement that the build had not finished
13. An explicit "NEEDS HUMAN CHECK" section. Include: legibility of the four dashboard screenshots at display width, particularly the quant tier table in fig3 and the axis labels in fig4; mobile rendering of all four; and the fact that these are dark-background screenshots placed on a light page, which may need a border or background treatment that has not been applied.

## Status
[x] Complete
