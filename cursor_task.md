# Cursor Task — Personal Website
Date: 2026-08-08 22:35:13
From: Claude (claude.ai)
Repo: /home/rehan-ghias/personal-website
Priority: medium

## Context
The certifications page is in a finished state: six Coursera credentials linked with correct mapping, underlines replaced with `↗` arrows, hover and focus states in place, dates corrected. All of that work is complete and verified. Do not redo any of it.

The one remaining gap is the C++ Proficiency Certificate (College of DuPage, May 2026), which is currently the only unlinked credential on the page. It now has a verification URL.

After this change all seven credentials are linked, so the arrow becomes a uniform external-link indicator rather than a signal distinguishing linked from unlinked entries. No styling change is needed for that — it follows automatically once the seventh link exists.

STANDING CONSTRAINT: you cannot visually verify anything. Your IDE browser cannot reach the dev server over Tailscale. Do not report visual outcomes as confirmed.

Out of scope: link styling, hover, focus, arrows, dates, categories, order, badges, issuers, the six Coursera hrefs, and every other page on the site. This task adds one anchor.

## Task
One change to the certifications page. Nothing else.

## 1. Link the C++ certificate

The C++ Proficiency Certificate (College of DuPage, May 2026) is the only unlinked credential on the page. Add:

`https://www.parchment.com/lp/award/19e83acb-9c51-41ee-8de4-d4584467f6b5`

It must use the **exact same treatment as the six existing Coursera entries**. Read how one of those is marked up and mirror it:

- Same component or markup pattern
- Same classes
- `target="_blank"`, `rel="noopener noreferrer"`
- Link text is the full credential title, unchanged
- The `↗` arrow appears the same way it does on the other six, with the same `aria-hidden` handling

Write no new CSS. If you find yourself adding a style rule, you have diverged from the existing pattern and should stop and re-read how the Coursera entries are built.

Do not change the C++ entry's title, issuer, badge, category, or date.

## 2. Verification

- `npm run build` completes clean
- Confirm `dist/certifications/index.html` contains exactly seven credential anchors and seven arrows
- Confirm the Parchment href is present and character-for-character correct
- Confirm the six Coursera hrefs are byte-identical to the previous build
- Confirm no new CSS rules were added
- Confirm zero client-side JS bundles and page count still 7
- Diff the built page against the previous build. The only changes should be the C++ anchor and its arrow. Paste the diff.
- Confirm no other file in `dist/` changed

## 3. Commit and push

Commit covering the C++ credential link. Push to `main`.

Pushing triggers a Cloudflare Workers Build automatically. Do NOT run `npx wrangler pages deploy`. It fails with an opaque HTTP 500 because a Workers application named `personal-website` already exists on the account.

## 4. Post-deploy

- `curl -sI https://rehanghias.com/certifications/` — expect 200
- `curl -s https://rehanghias.com/certifications/ | grep -c '↗'` — expect 7
- `curl -s https://rehanghias.com/certifications/ | grep -o 'href="https://www.parchment.com/[^"]*"'` — expect one

Do NOT curl the parchment.com URL directly. It gates automated requests and a failure would tell you nothing about whether the link is correct.

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

1. The C++ entry's markup before and after
2. Confirmation it now uses the same component, classes, and arrow treatment as the six Coursera entries, with no bespoke styling
3. A table of all seven credential names against href from the built HTML
4. Confirmation the six Coursera hrefs are byte-identical to the previous build
5. The diff of the built certifications page against the previous build, confirming the C++ anchor and arrow are the only changes
6. Confirmation no other page in `dist/` changed
7. Build result, page count, zero JS bundles
8. Commit hash and confirmation of push to `main`
9. Post-deploy curl output
10. A "NEEDS HUMAN CHECK" section noting that the Parchment link must be opened in a private window to confirm it resolves publicly rather than behind a Parchment login.

## Status
[x] Complete
