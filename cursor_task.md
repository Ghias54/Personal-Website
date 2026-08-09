# Cursor Task — Personal Website
Date: 2026-08-08 22:27:34
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: medium

## Context
The six Coursera credential links are live on the certifications page and the mapping is correct. Two cosmetic problems remain.

1. Linked titles are underlined. The underline is heavy against the editorial type treatment and competes with the section rules. It should be replaced with a small external-link arrow after the title.
2. The Harnessing the Power of Data with Power BI entry reads `JULY 2025`. Every other entry uses a three-letter month abbreviation (`FEB 2026`, `AUG 2025`, `MAY 2025`, `JUN 2025`, `DEC 2025`). It should read `JUL 2025`.

The C++ Proficiency Certificate is deliberately unlinked. It must not receive an arrow. The arrow is the only remaining signal that distinguishes a linked credential from an unlinked one, which is exactly why the underline can be removed safely.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: changing the categories, order, badges, issuers, hrefs, or any other date. Do not touch any other page. Do not add an icon library or client-side JS.

## Task
Two changes to the certifications page only. Nothing else on the site.

## 1. Remove the underline, add an external-link arrow

On the six linked credential titles:

- Set `text-decoration: none` at rest
- Append a `↗` arrow immediately after the title text
- The arrow must be `aria-hidden="true"` so screen readers do not announce it, and must not be part of the link's accessible name
- Prevent the arrow from wrapping onto its own line. Use a non-breaking space before it, or make the trailing word and arrow a single inline-block unit.
- Size the arrow smaller than the title, roughly 0.7em, and set it in the muted foreground color rather than the title color so it reads as an affordance and not as punctuation
- Align it optically with the cap height, not the baseline. A small negative vertical offset is usually needed.

Insert the arrow via markup rather than a CSS `::after` on the anchor if the page uses a component that makes that straightforward. Either is acceptable, but if you use `::after`, confirm it does not end up inside the accessible name.

## 2. Hover state

With the underline gone, hovering needs to do something. Shift the title to the accent color already used for interactive elements elsewhere on the site, and move the arrow one or two pixels up and to the right. Use an existing transition duration token if one exists.

Do not reintroduce an underline on hover. Do not add a background fill, box shadow, or scale transform.

## 3. Focus state

Removing the underline must not remove keyboard focus visibility. Confirm a visible focus ring remains on tab, using the site's existing focus treatment. If the page has no focus style, add `:focus-visible` with the existing accent color as an outline. This is not optional.

## 4. The C++ entry stays bare

The C++ Proficiency Certificate has no verification URL. It must remain unlinked, with no arrow and no hover state. Confirm explicitly.

## 5. Date fix

Change `JULY 2025` to `JUL 2025` on the Harnessing the Power of Data with Power BI entry. Change no other date.

## 6. Verification

- `npm run build` completes clean
- Confirm no `text-decoration: underline` applies to the credential links in any state
- Confirm exactly six arrows appear in `dist/certifications/index.html`, one per linked credential
- Confirm the C++ entry contains no arrow character and no anchor tag
- Confirm all six hrefs are unchanged from the previous build
- Confirm zero client-side JS bundles and page count still 7
- Diff the built page against the previous build and confirm the only changes are the arrows, the link styling, and the one date

## 7. Commit and push

Commit covering the link treatment and the date fix. Push to `main`.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 8. Post-deploy

- `curl -sI https://rehanghias.com/certifications/` — expect 200
- `curl -s https://rehanghias.com/certifications/ | grep -c '↗'` — expect 6
- `curl -s https://rehanghias.com/certifications/ | grep -o 'href="https://coursera.org/share/[^"]*"'` — expect the same six as before

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

1. The CSS before and after for the credential link
2. Confirmation `text-decoration` is `none` at rest and that no underline appears in any state
3. What the hover state does instead
4. How the arrow is inserted and how it is hidden from screen readers
5. Confirmation the arrow cannot wrap onto its own line
6. Confirmation the C++ entry has no arrow and no anchor
7. Confirmation the Harnessing date now reads `JUL 2025` and no other date changed
8. Confirmation the six hrefs are byte-identical to before
9. Build result, page count, zero JS bundles
10. Commit hash and confirmation of push to `main`
11. Post-deploy curl confirming the page returns 200 and the six hrefs are unchanged
12. A "NEEDS HUMAN CHECK" section covering arrow size and alignment, hover appearance, and mobile rendering.

## Status
[x] Complete
