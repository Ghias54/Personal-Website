# Cursor Task — Personal Website
Date: 2026-08-08 23:17:16
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: medium

## Context
The experience page now has five bullets on Glitz Decor and Kumon, four on Machine Operator, and five on the Truly Engaging analyst entry. Machine Operator reads thin next to its neighbours and is also the only entry missing the promotion arc that appears elsewhere on the site.

This task rewrites the Machine Operator bullets only. The file is `src/pages/experience.astro` and the bullets live in the `experience` data array, rendered through `ExperienceItem.astro`. Bullets carry no trailing periods — match that.

Explicitly unchanged: the Truly Engaging analyst entry, Glitz Decor, Kumon, all titles, employers, locations, date ranges, entry order, and every other page on the site.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: new CSS, new components, restructuring, links, icons, client-side JS.

## Task
One change to `src/pages/experience.astro`. Nothing else.

## 1. Machine Operator — replace the four bullets with these five

- Started in general assembly supporting machine operators, then trained to run CNC and die cutters
- Operate CNC and die-cutting equipment through peak production season
- Troubleshoot machine issues and assist other operators
- Handle packaging and shipping through FedEx, UPS and USPS systems
- Lead small teams to keep production moving

Keep the title, employer, location, and date range exactly as they are.

## 2. Use the copy as written

Do not reword, shorten, expand, or reorder these bullets. No trailing periods, matching the existing convention.

## 3. Touch nothing else

The Truly Engaging analyst entry, Glitz Decor, and Kumon are out of scope. Confirm explicitly that all three are unchanged.

## 4. Verification

- `npm run build` completes clean
- Confirm the Machine Operator entry has exactly five bullets
- Confirm the other three entries are byte-identical to the previous build
- Confirm no new CSS rules were added
- Diff the built experience page against the previous build. The only change should be the Machine Operator bullet list. Paste the diff.
- Confirm no other file in `dist/` changed
- Confirm zero client-side JS bundles and page count still 7

## 5. Commit and push

Commit covering the Machine Operator bullet expansion. Push to `main`.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 6. Post-deploy

- `curl -sI https://rehanghias.com/experience/` — expect 200
- `curl -s https://rehanghias.com/experience/ | grep -c "general assembly"` — expect 1

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

1. The Machine Operator bullets before and after
2. Confirmation the entry now has exactly five bullets
3. Confirmation no bullet has a trailing period
4. Confirmation the analyst, Glitz Decor, and Kumon entries are byte-identical to the previous build
5. Confirmation all titles, employers, locations, dates, and entry order are unchanged
6. Confirmation no new CSS rules were added
7. Diff of the built experience page against the previous build, confirming only the Machine Operator bullet list changed
8. Confirmation no other file in `dist/` changed
9. Build result, page count, zero JS bundles
10. Commit hash and confirmation of push to `main`
11. Post-deploy curl output
12. A "NEEDS HUMAN CHECK" section covering mobile wrapping on the longer first bullet.

## Status
[x] Complete
